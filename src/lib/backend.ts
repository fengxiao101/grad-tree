// All cloud/backend operations in one place.
// Swap only this file to migrate to a different backend (Supabase, custom API, etc.).

import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import {
  auth,
  authPersistenceReady,
  db,
  googleProvider,
  isFirebaseConfigured,
} from './firebase';

export { isFirebaseConfigured };
export type { User };

// ── Auth ──────────────────────────────────────────────────────────────────────

/** Subscribe to auth state changes. Returns an unsubscribe function. */
export function subscribeToAuth(cb: (user: User | null) => void): () => void {
  if (!auth) { cb(null); return () => {}; }
  return onAuthStateChanged(auth, cb);
}

export async function signIn(): Promise<UserCredential> {
  if (!auth) return Promise.reject(new Error('Firebase is not configured'));
  await authPersistenceReady;
  return signInWithPopup(auth, googleProvider);
}

export function signOutUser(): Promise<void> {
  return auth ? signOut(auth) : Promise.resolve();
}

// ── Plan storage ──────────────────────────────────────────────────────────────

export interface StoredPlan {
  plan_data: Record<string, unknown>;
  updated_at: string;
}

interface CloudScenario {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  data: Record<string, unknown>;
}

interface UserProfileDocument {
  storage_version: 2;
  active_plan_id: string;
  plan_order: string[];
  ignored_prereq_card_ids: string[];
  congrats_shown: boolean;
  banner_dismissed: boolean;
  onboarding_steps: string[];
  updated_at: string;
}

interface PlanDocument {
  name: string;
  color: string;
  created_at: string;
  data: Record<string, unknown>;
  updated_at: string;
}

const cloudState = new Map<string, {
  profileHash: string;
  scenarioHashes: Map<string, string>;
}>();

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function nonEmptyRecord(value: unknown): Record<string, unknown> | undefined {
  const record = asRecord(value);
  return Object.keys(record).length > 0 ? record : undefined;
}

/**
 * Strip fields whose defaults are restored by normalizePersisted/fromSnapshot.
 * Course cards and custom program configs remain lossless; only empty/default
 * values and device-specific display preferences are omitted.
 */
function compactScenarioData(value: unknown): Record<string, unknown> {
  const source = asRecord(value);
  const compact: Record<string, unknown> = {};
  const cards = nonEmptyRecord(source.cards);
  const cardOrder = nonEmptyRecord(source.cardOrder);
  const testCreditChecks = nonEmptyRecord(source.testCreditChecks);
  const manualSlotFills = nonEmptyRecord(source.manualSlotFills);
  const manualMinorSlotFills = nonEmptyRecord(source.manualMinorSlotFills);
  const selectedTracks = nonEmptyRecord(source.selectedTracks);

  if (cards) compact.cards = cards;
  if (cardOrder) compact.cardOrder = cardOrder;
  if (Array.isArray(source.completedQuarters) && source.completedQuarters.length) compact.completedQuarters = source.completedQuarters;
  if (testCreditChecks) compact.testCreditChecks = testCreditChecks;
  if (Array.isArray(source.transferCredits) && source.transferCredits.length) compact.transferCredits = source.transferCredits;
  if (typeof source.selectedMajorId === 'string') compact.selectedMajorId = source.selectedMajorId;
  if (manualSlotFills) compact.manualSlotFills = manualSlotFills;
  if (Array.isArray(source.selectedMinorIds) && source.selectedMinorIds.length) compact.selectedMinorIds = source.selectedMinorIds;
  if (manualMinorSlotFills) compact.manualMinorSlotFills = manualMinorSlotFills;
  if (source.isCoterm === true) compact.isCoterm = true;
  if (typeof source.selectedCotermId === 'string') compact.selectedCotermId = source.selectedCotermId;
  if (selectedTracks) compact.selectedTracks = selectedTracks;
  if (source.manualLangFulfilled === true) compact.manualLangFulfilled = true;
  if (source.congratsShown === true) compact.congratsShown = true;

  return compact;
}

function parseScenarios(planData: Record<string, unknown>): CloudScenario[] {
  if (!Array.isArray(planData.scenarios)) return [];
  return planData.scenarios.slice(0, 10).flatMap(raw => {
    const scenario = asRecord(raw);
    if (
      typeof scenario.id !== 'string'
      || typeof scenario.name !== 'string'
      || typeof scenario.color !== 'string'
      || typeof scenario.createdAt !== 'string'
    ) return [];
    return [{
      id: scenario.id,
      name: scenario.name,
      color: scenario.color,
      createdAt: scenario.createdAt,
      data: compactScenarioData(scenario.data),
    }];
  });
}

function makeProfile(planData: Record<string, unknown>, scenarios: CloudScenario[], updatedAt: string): UserProfileDocument {
  const requestedActive = typeof planData.activeScenarioId === 'string' ? planData.activeScenarioId : '';
  const activePlanId = scenarios.some(scenario => scenario.id === requestedActive)
    ? requestedActive
    : scenarios[0]?.id ?? '';
  return {
    storage_version: 2,
    active_plan_id: activePlanId,
    plan_order: scenarios.map(scenario => scenario.id),
    ignored_prereq_card_ids: asStringArray(planData.ignoredPrereqCardIds),
    congrats_shown: planData.congratsShown === true,
    banner_dismissed: planData.bannerDismissed === true,
    onboarding_steps: asStringArray(planData.onboardingSteps),
    updated_at: updatedAt,
  };
}

function scenarioDocument(scenario: CloudScenario, updatedAt: string): PlanDocument {
  return {
    name: scenario.name,
    color: scenario.color,
    created_at: scenario.createdAt,
    data: scenario.data,
    updated_at: updatedAt,
  };
}

function stableScenarioHash(scenario: CloudScenario): string {
  return JSON.stringify({
    name: scenario.name,
    color: scenario.color,
    created_at: scenario.createdAt,
    data: scenario.data,
  });
}

function stableProfileHash(profile: UserProfileDocument): string {
  const { updated_at: _updatedAt, ...stable } = profile;
  return JSON.stringify(stable);
}

async function loadVersionTwo(userId: string): Promise<StoredPlan | null> {
  if (!db) return null;
  const profileSnap = await getDoc(doc(db, 'users', userId));
  if (!profileSnap.exists()) return null;

  const profile = profileSnap.data() as UserProfileDocument;
  if (profile.storage_version !== 2) return null;

  const planSnaps = await getDocs(collection(db, 'users', userId, 'plans'));
  const plansById = new Map<string, CloudScenario>();
  const scenarioHashes = new Map<string, string>();
  planSnaps.forEach(planSnap => {
    const value = planSnap.data() as PlanDocument;
    const scenario: CloudScenario = {
      id: planSnap.id,
      name: value.name,
      color: value.color,
      createdAt: value.created_at,
      data: asRecord(value.data),
    };
    plansById.set(planSnap.id, scenario);
    scenarioHashes.set(planSnap.id, stableScenarioHash(scenario));
  });

  const ordered = [
    ...profile.plan_order.map(id => plansById.get(id)).filter((scenario): scenario is CloudScenario => Boolean(scenario)),
    ...Array.from(plansById.values()).filter(scenario => !profile.plan_order.includes(scenario.id)),
  ].slice(0, 10);
  if (ordered.length === 0) return null;

  cloudState.set(userId, {
    profileHash: stableProfileHash(profile),
    scenarioHashes,
  });

  return {
    plan_data: {
      scenarios: ordered,
      activeScenarioId: ordered.some(scenario => scenario.id === profile.active_plan_id)
        ? profile.active_plan_id
        : ordered[0].id,
      ignoredPrereqCardIds: profile.ignored_prereq_card_ids ?? [],
      congratsShown: profile.congrats_shown ?? false,
      bannerDismissed: profile.banner_dismissed ?? false,
      onboardingSteps: profile.onboarding_steps ?? [],
    },
    updated_at: profile.updated_at,
  };
}

async function saveVersionTwo(userId: string, planData: Record<string, unknown>): Promise<void> {
  if (!db) throw new Error('Backend not configured');
  const scenarios = parseScenarios(planData);
  if (scenarios.length === 0 || scenarios.length > 10) throw new Error('A user must have between 1 and 10 plans');

  const updatedAt = new Date().toISOString();
  const profile = makeProfile(planData, scenarios, updatedAt);
  const profileHash = stableProfileHash(profile);
  const previous = cloudState.get(userId);
  const nextHashes = new Map<string, string>();
  const batch = writeBatch(db);
  let hasWrites = false;

  if (!previous || previous.profileHash !== profileHash) {
    batch.set(doc(db, 'users', userId), profile);
    hasWrites = true;
  }

  for (const scenario of scenarios) {
    const hash = stableScenarioHash(scenario);
    nextHashes.set(scenario.id, hash);
    if (!previous || previous.scenarioHashes.get(scenario.id) !== hash) {
      batch.set(doc(db, 'users', userId, 'plans', scenario.id), scenarioDocument(scenario, updatedAt));
      hasWrites = true;
    }
  }

  for (const oldId of previous?.scenarioHashes.keys() ?? []) {
    if (!nextHashes.has(oldId)) {
      batch.delete(doc(db, 'users', userId, 'plans', oldId));
      hasWrites = true;
    }
  }

  if (hasWrites) await batch.commit();
  cloudState.set(userId, { profileHash, scenarioHashes: nextHashes });
}

async function loadLegacy(userId: string): Promise<StoredPlan | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, 'plans', userId));
  return snap.exists() ? snap.data() as StoredPlan : null;
}

async function saveLegacy(userId: string, planData: Record<string, unknown>): Promise<void> {
  if (!db) throw new Error('Backend not configured');
  await setDoc(
    doc(db, 'plans', userId),
    {
      plan_data: planData,
      updated_at: new Date().toISOString(),
      share_token: deleteField(),
    },
    { merge: true },
  );
}

export async function loadPlan(userId: string): Promise<StoredPlan | null> {
  const current = await loadVersionTwo(userId);
  if (current) return current;

  const legacy = await loadLegacy(userId);
  if (!legacy) return null;

  // Migrate only after the complete private replacement has been committed.
  // If the new rules have not been deployed yet, continue using the legacy
  // owner-only document rather than blocking the user from their saved plan.
  try {
    await saveVersionTwo(userId, legacy.plan_data);
    if (db) await deleteDoc(doc(db, 'plans', userId));
  } catch (error) {
    console.warn('[backend] private plan migration deferred:', error);
  }
  return legacy;
}

export async function savePlan(userId: string, planData: Record<string, unknown>): Promise<void> {
  try {
    await saveVersionTwo(userId, planData);
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code !== 'permission-denied') throw error;
    // Safe rollout fallback: old deployments remain usable until the owner-only
    // /users rules are deployed. Remove this fallback after migration settles.
    await saveLegacy(userId, planData);
  }
}
