import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { arrayMove } from '@dnd-kit/sortable';
import { CourseCard, WAY_TAGS } from '../types';
import { ALL_TEST_GROUPS, SubjectArea, SINGLE_SELECT_AREAS } from '../data/testCredits';
import type { MajorConfig } from '../data/majorSchema';

interface Snapshot {
  cards: Record<string, CourseCard>;
  cardOrder: Record<string, string[]>;
}

interface TestCreditCheck {
  checked: boolean;
  selectedScore?: string;
}

export interface TransferCredit {
  id: string;
  name: string;
  courses: Array<{ dept: string; number: string; units?: number }>;
  units: number;
  waysTags?: string[];
}

export interface PlanSnapshot {
  cards: Record<string, CourseCard>;
  cardOrder: Record<string, string[]>;
  collapsedYears: number[];
  completedQuarters: string[];
  hideSummer: boolean;
  testCreditChecks: Record<string, TestCreditCheck>;
  transferCredits: TransferCredit[];
  selectedMajorId: string | null;
  userMajors: MajorConfig[];
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  // Minor support
  selectedMinorIds: string[];
  userMinors: MajorConfig[];
  manualMinorSlotFills: Record<string, Record<string, { checked: boolean; note: string }>>;
  // Coterm support
  isCoterm: boolean;
  showYear5: boolean;
  selectedCotermId: string | null;
  userCotermConfigs: MajorConfig[];
  // Additional major support (double / secondary)
  additionalMajors: Array<{ id: string; kind: 'double' | 'secondary' }>;
  manualAdditionalMajorSlotFills: Record<string, Record<string, { checked: boolean; note: string }>>;
  // Track selection (per program)
  selectedTracks: Record<string, string>;
  // Language requirement manual override
  manualLangFulfilled: boolean;
  // Whether this particular plan has already shown its completion celebration.
  congratsShown?: boolean;
}

export interface Scenario {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  data: PlanSnapshot;
}

export const SCENARIO_COLORS = ['#8C1515', '#1B5E8B', '#2D6A4F', '#6B3FA0', '#B87333', '#2E6B5E'];
export const MAX_SCENARIOS = 10;

function pickColor(existing: Scenario[]): string {
  const used = new Set(existing.map(s => s.color));
  return SCENARIO_COLORS.find(c => !used.has(c)) ?? SCENARIO_COLORS[existing.length % SCENARIO_COLORS.length];
}

const EMPTY_SNAPSHOT: PlanSnapshot = {
  cards: {},
  cardOrder: {},
  collapsedYears: [],
  completedQuarters: [],
  hideSummer: true,
  testCreditChecks: {},
  transferCredits: [],
  selectedMajorId: null,
  userMajors: [],
  manualSlotFills: {},
  selectedMinorIds: [],
  userMinors: [],
  manualMinorSlotFills: {},
  isCoterm: false,
  showYear5: false,
  selectedCotermId: null,
  userCotermConfigs: [],
  additionalMajors: [],
  manualAdditionalMajorSlotFills: {},
  selectedTracks: {},
  manualLangFulfilled: false,
  congratsShown: false,
};

export function toCourseKey(dept: string, num: string) {
  return `${dept.trim().toUpperCase()}:${num.trim().toUpperCase()}`;
}

export function orderedCardsFor(
  cards: Record<string, CourseCard>,
  cardOrder: Record<string, string[]>,
  containerId: string,
): CourseCard[] {
  const order = cardOrder[containerId] ?? [];
  const ordered = order.map(id => cards[id]).filter(Boolean) as CourseCard[];
  const orderSet = new Set(order);
  const unordered = Object.values(cards).filter(c => c.quarterId === containerId && !orderSet.has(c.id));
  return [...ordered, ...unordered];
}

export function captureLiveSnapshot(s: {
  cards: Record<string, CourseCard>;
  cardOrder: Record<string, string[]>;
  collapsedYears: Set<number>;
  completedQuarters: Set<string>;
  hideSummer: boolean;
  testCreditChecks: Record<string, TestCreditCheck>;
  transferCredits: TransferCredit[];
  selectedMajorId: string | null;
  userMajors: MajorConfig[];
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  selectedMinorIds: string[];
  userMinors: MajorConfig[];
  manualMinorSlotFills: Record<string, Record<string, { checked: boolean; note: string }>>;
  isCoterm: boolean;
  showYear5: boolean;
  selectedCotermId: string | null;
  userCotermConfigs: MajorConfig[];
  additionalMajors: Array<{ id: string; kind: 'double' | 'secondary' }>;
  manualAdditionalMajorSlotFills: Record<string, Record<string, { checked: boolean; note: string }>>;
  selectedTracks: Record<string, string>;
  manualLangFulfilled: boolean;
  congratsShown: boolean;
}): PlanSnapshot {
  return {
    cards: s.cards,
    cardOrder: s.cardOrder,
    collapsedYears: Array.from(s.collapsedYears),
    completedQuarters: Array.from(s.completedQuarters),
    hideSummer: s.hideSummer,
    testCreditChecks: s.testCreditChecks,
    transferCredits: s.transferCredits,
    selectedMajorId: s.selectedMajorId,
    userMajors: s.userMajors,
    manualSlotFills: s.manualSlotFills,
    selectedMinorIds: s.selectedMinorIds,
    userMinors: s.userMinors,
    manualMinorSlotFills: s.manualMinorSlotFills,
    isCoterm: s.isCoterm,
    showYear5: s.showYear5,
    selectedCotermId: s.selectedCotermId,
    userCotermConfigs: s.userCotermConfigs,
    additionalMajors: s.additionalMajors,
    manualAdditionalMajorSlotFills: s.manualAdditionalMajorSlotFills,
    selectedTracks: s.selectedTracks,
    manualLangFulfilled: s.manualLangFulfilled,
    congratsShown: s.congratsShown,
  };
}

function fromSnapshot(d: Partial<PlanSnapshot>) {
  return {
    cards: d.cards ?? {},
    cardOrder: d.cardOrder ?? {},
    collapsedYears: new Set<number>(d.collapsedYears ?? []),
    completedQuarters: new Set<string>(d.completedQuarters ?? []),
    hideSummer: d.hideSummer ?? true,
    testCreditChecks: d.testCreditChecks ?? {},
    transferCredits: (d.transferCredits ?? []).map((tc) => {
      const raw = tc as unknown as Record<string, unknown>;
      return {
        id: tc.id,
        name: tc.name ?? '',
        units: tc.units ?? 0,
        courses: Array.isArray(raw.courses)
          ? raw.courses as Array<{ dept: string; number: string }>
          : (raw.dept && raw.number ? [{ dept: raw.dept as string, number: raw.number as string }] : []),
        waysTags: Array.isArray(raw.waysTags) ? raw.waysTags as string[] : [],
      };
    }),
    selectedMajorId: d.selectedMajorId ?? null,
    userMajors: d.userMajors ?? [],
    manualSlotFills: d.manualSlotFills ?? {},
    selectedMinorIds: d.selectedMinorIds ?? [],
    userMinors: d.userMinors ?? [],
    manualMinorSlotFills: d.manualMinorSlotFills ?? {},
    isCoterm: d.isCoterm ?? false,
    showYear5: d.showYear5 ?? false,
    selectedCotermId: d.selectedCotermId ?? null,
    userCotermConfigs: d.userCotermConfigs ?? [],
    additionalMajors: d.additionalMajors ?? [],
    manualAdditionalMajorSlotFills: d.manualAdditionalMajorSlotFills ?? {},
    selectedTracks: d.selectedTracks ?? {},
    manualLangFulfilled: d.manualLangFulfilled ?? false,
    congratsShown: d.congratsShown ?? false,
    past: [] as Snapshot[],
    future: [] as Snapshot[],
  };
}

export interface PlannerStore {
  cards: Record<string, CourseCard>;
  cardOrder: Record<string, string[]>;
  past: Snapshot[];
  future: Snapshot[];
  collapsedYears: Set<number>;
  completedQuarters: Set<string>;
  hideSummer: boolean;
  testCreditChecks: Record<string, TestCreditCheck>;
  transferCredits: TransferCredit[];
  selectedMajorId: string | null;
  userMajors: MajorConfig[];
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  // Minor support
  selectedMinorIds: string[];
  userMinors: MajorConfig[];
  manualMinorSlotFills: Record<string, Record<string, { checked: boolean; note: string }>>;
  // Coterm support
  isCoterm: boolean;
  showYear5: boolean;
  selectedCotermId: string | null;
  userCotermConfigs: MajorConfig[];
  // Additional major support (double / secondary)
  additionalMajors: Array<{ id: string; kind: 'double' | 'secondary' }>;
  manualAdditionalMajorSlotFills: Record<string, Record<string, { checked: boolean; note: string }>>;
  // Track selection (per program)
  selectedTracks: Record<string, string>;
  // Language requirement manual override
  manualLangFulfilled: boolean;
  // Prereq ignore - card IDs where the user dismissed the prereq warning
  ignoredPrereqCardIds: Set<string>;
  // UI state persisted across sessions
  congratsShown: boolean;
  bannerDismissed: boolean;
  onboardingSteps: string[]; // completed step IDs

  // Scenarios
  scenarios: Scenario[];
  activeScenarioId: string;

  // Transient UI state - not persisted
  pendingDuplicate: (() => void) | null;
  confirmDuplicate: () => void;
  cancelDuplicate: () => void;

  addCard: (card: Omit<CourseCard, 'id'>, opts?: { force?: boolean }) => void;
  updateCard: (id: string, updates: Partial<Omit<CourseCard, 'id'>>) => void;
  removeCard: (id: string) => void;
  moveCard: (id: string, toQuarterId: string) => void;
  reorderCard: (containerId: string, activeId: string, overId: string) => void;
  toggleYear: (year: number) => void;
  toggleHideSummer: () => void;
  toggleQuarterComplete: (quarterId: string) => void;
  setTestCreditCheck: (id: string, check: Partial<TestCreditCheck>, singleSelectArea?: SubjectArea) => void;
  addTransferCredit: () => void;
  updateTransferCredit: (id: string, updates: Partial<Omit<TransferCredit, 'id'>>) => void;
  removeTransferCredit: (id: string) => void;
  setMajor: (majorId: string | null) => void;
  addUserMajor: (config: MajorConfig) => void;
  removeUserMajor: (majorId: string) => void;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  // Minor actions
  addMinor: (minorId: string) => void;
  removeMinor: (minorId: string) => void;
  addUserMinor: (config: MajorConfig) => void;
  removeUserMinor: (minorId: string) => void;
  setManualMinorSlotFill: (minorId: string, slotId: string, fill: { checked?: boolean; note?: string }) => void;
  // Additional major actions
  addAdditionalMajor: (id: string, kind: 'double' | 'secondary') => void;
  removeAdditionalMajor: (id: string) => void;
  setAdditionalMajorKind: (id: string, kind: 'double' | 'secondary') => void;
  setManualAdditionalMajorSlotFill: (majorId: string, slotId: string, fill: { checked?: boolean; note?: string }) => void;
  // Coterm actions
  toggleCoterm: () => void;
  toggleShowYear5: () => void;
  setCoterm: (cotermId: string | null) => void;
  addUserCotermConfig: (config: MajorConfig) => void;
  removeUserCotermConfig: (cotermId: string) => void;
  setTrack: (programId: string, trackId: string | null) => void;
  ignoreCardPrereq: (cardId: string) => void;
  setManualLangFulfilled: (val: boolean) => void;
  setCongratsShown: (val: boolean) => void;
  setBannerDismissed: (val: boolean) => void;
  completeOnboardingStep: (stepId: string) => void;
  undo: () => void;
  redo: () => void;
  getOrderedCards: (containerId: string) => CourseCard[];

  // Scenario actions
  switchScenario: (id: string) => void;
  addScenario: (name?: string) => string | null;
  duplicateScenario: (id: string) => string | null;
  deleteScenario: (id: string) => void;
  renameScenario: (id: string, name: string) => void;
  reorderScenarios: (orderedIds: string[]) => void;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizePersisted(p: Record<string, any> | null) {
  if (!p || !Array.isArray(p.scenarios) || p.scenarios.length === 0) {
    const snapshot: PlanSnapshot = {
      cards: p?.cards ?? {},
      cardOrder: p?.cardOrder ?? {},
      collapsedYears: p === null ? [2, 3, 4] : (p?.collapsedYears ?? []),
      completedQuarters: p?.completedQuarters ?? [],
      hideSummer: p?.hideSummer ?? true,
      testCreditChecks: p?.testCreditChecks ?? {},
      transferCredits: p?.transferCredits ?? [],
      selectedMajorId: p?.selectedMajorId ?? null,
      userMajors: p?.userMajors ?? [],
      manualSlotFills: p?.manualSlotFills ?? {},
      selectedMinorIds: p?.selectedMinorIds ?? [],
      userMinors: p?.userMinors ?? [],
      manualMinorSlotFills: p?.manualMinorSlotFills ?? {},
      isCoterm: p?.isCoterm ?? false,
      showYear5: p?.showYear5 ?? false,
      selectedCotermId: p?.selectedCotermId ?? null,
      userCotermConfigs: p?.userCotermConfigs ?? [],
      additionalMajors: p?.additionalMajors ?? [],
      manualAdditionalMajorSlotFills: p?.manualAdditionalMajorSlotFills ?? {},
      selectedTracks: p?.selectedTracks ?? {},
      manualLangFulfilled: p?.manualLangFulfilled ?? false,
      congratsShown: p?.congratsShown ?? false,
    };
    return {
      ...fromSnapshot(snapshot),
      scenarios: [{ id: DEFAULT_SCENARIO_ID, name: 'My Plan', color: SCENARIO_COLORS[0], createdAt: new Date().toISOString(), data: snapshot }],
      activeScenarioId: DEFAULT_SCENARIO_ID,
    };
  }
  const rawScenarios = p.scenarios as Scenario[];
  const scenarios = rawScenarios.map((sc, i) => ({
    ...sc,
    color: sc.color ?? SCENARIO_COLORS[i % SCENARIO_COLORS.length],
    data: {
      ...sc.data,
      congratsShown: sc.data?.congratsShown
        ?? (sc.id === p.activeScenarioId ? Boolean(p.congratsShown) : false),
    },
  }));
  const activeSc = scenarios.find(sc => sc.id === p.activeScenarioId) ?? scenarios[0];
  return {
    ...fromSnapshot(activeSc?.data ?? EMPTY_SNAPSHOT),
    scenarios,
    activeScenarioId: activeSc?.id ?? DEFAULT_SCENARIO_ID,
  };
}

function toggleSetItem<T>(s: Set<T>, item: T): Set<T> {
  const next = new Set(s);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

const snap = (cards: Record<string, CourseCard>, cardOrder: Record<string, string[]>): Snapshot => ({
  cards: JSON.parse(JSON.stringify(cards)),
  cardOrder: JSON.parse(JSON.stringify(cardOrder)),
});

const pushSnap = (past: Snapshot[], cards: Record<string, CourseCard>, cardOrder: Record<string, string[]>) => ({
  past: [...past.slice(-19), snap(cards, cardOrder)],
  future: [] as Snapshot[],
});

const DEFAULT_SCENARIO_ID = 'scenario-default';

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set, get) => ({
      cards: {},
      cardOrder: {},
      past: [],
      future: [],
      collapsedYears: new Set<number>(),
      completedQuarters: new Set<string>(),
      hideSummer: true,
      testCreditChecks: {},
      transferCredits: [],
      selectedMajorId: null,
      userMajors: [],
      manualSlotFills: {},
      selectedMinorIds: [],
      userMinors: [],
      manualMinorSlotFills: {},
      isCoterm: false,
      showYear5: false,
      selectedCotermId: null,
      userCotermConfigs: [],
      additionalMajors: [],
      manualAdditionalMajorSlotFills: {},
      selectedTracks: {},
      manualLangFulfilled: false,
      ignoredPrereqCardIds: new Set<string>(),
      congratsShown: false,
      bannerDismissed: false,
      onboardingSteps: [],
      scenarios: [{ id: DEFAULT_SCENARIO_ID, name: 'My Plan', color: SCENARIO_COLORS[0], createdAt: new Date().toISOString(), data: EMPTY_SNAPSHOT }],
      activeScenarioId: DEFAULT_SCENARIO_ID,
      pendingDuplicate: null,

      confirmDuplicate: () => {
        const { pendingDuplicate } = get();
        set({ pendingDuplicate: null });
        pendingDuplicate?.();
      },

      cancelDuplicate: () => set({ pendingDuplicate: null }),

      addCard: (cardData, opts) => {
        if (!opts?.force) {
          const { cards, addCard } = get();
          const dept = cardData.department.toUpperCase();
          const num = cardData.courseNumber.toUpperCase();
          if (Object.values(cards).some(c =>
            c.department.toUpperCase() === dept && c.courseNumber.toUpperCase() === num
          )) {
            set({ pendingDuplicate: () => addCard(cardData, { force: true }) });
            return;
          }
        }
        const { cards, cardOrder, past, collapsedYears } = get();
        const id = `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const qId = cardData.quarterId;
        const yearMatch = qId.match(/^Y(\d)/);
        const year = yearMatch ? parseInt(yearMatch[1]) : null;
        const newCollapsed = year && collapsedYears.has(year)
          ? new Set([...collapsedYears].filter(y => y !== year))
          : collapsedYears;
        set({
          cards: { ...cards, [id]: { ...cardData, id } },
          cardOrder: { ...cardOrder, [qId]: [...(cardOrder[qId] ?? []), id] },
          collapsedYears: newCollapsed,
          ...pushSnap(past, cards, cardOrder),
        });
      },

      updateCard: (id, updates) => {
        const { cards, cardOrder, past } = get();
        if (!cards[id]) return;
        const merged = { ...cards[id], ...updates };
        const wayCount = merged.tags.filter((t: string) => (WAY_TAGS as string[]).includes(t)).length;
        const updated = wayCount < 2 ? { ...merged, committedWay: undefined } : merged;
        let newOrder = cardOrder;
        if (updates.quarterId && updates.quarterId !== cards[id].quarterId) {
          const oldQ = cards[id].quarterId;
          const newQ = updates.quarterId;
          newOrder = {
            ...cardOrder,
            [oldQ]: (cardOrder[oldQ] ?? []).filter(i => i !== id),
            [newQ]: [...(cardOrder[newQ] ?? []), id],
          };
        }
        set({ cards: { ...cards, [id]: updated }, cardOrder: newOrder, ...pushSnap(past, cards, cardOrder) });
      },

      removeCard: (id) => {
        const { cards, cardOrder, past } = get();
        const qId = cards[id]?.quarterId;
        const next = { ...cards };
        delete next[id];
        const newOrder = qId
          ? { ...cardOrder, [qId]: (cardOrder[qId] ?? []).filter(i => i !== id) }
          : cardOrder;
        set({ cards: next, cardOrder: newOrder, ...pushSnap(past, cards, cardOrder) });
      },

      moveCard: (id, toQuarterId) => {
        const { cards, cardOrder, past, collapsedYears } = get();
        if (!cards[id]) return;
        const fromQ = cards[id].quarterId;
        if (fromQ === toQuarterId) return;
        const yearMatch = toQuarterId.match(/^Y(\d)/);
        const year = yearMatch ? parseInt(yearMatch[1]) : null;
        const newCollapsed = year && collapsedYears.has(year)
          ? new Set([...collapsedYears].filter(y => y !== year))
          : collapsedYears;
        set({
          cards: { ...cards, [id]: { ...cards[id], quarterId: toQuarterId } },
          cardOrder: {
            ...cardOrder,
            [fromQ]: (cardOrder[fromQ] ?? []).filter(i => i !== id),
            [toQuarterId]: [...(cardOrder[toQuarterId] ?? []), id],
          },
          collapsedYears: newCollapsed,
          ...pushSnap(past, cards, cardOrder),
        });
      },

      reorderCard: (containerId, activeId, overId) => {
        const { cards, cardOrder, past } = get();
        const order = cardOrder[containerId] ?? [];
        const oldIdx = order.indexOf(activeId);
        const newIdx = order.indexOf(overId);
        if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return;
        set({
          cardOrder: { ...cardOrder, [containerId]: arrayMove(order, oldIdx, newIdx) },
          ...pushSnap(past, cards, cardOrder),
        });
      },

      toggleYear: (year) => {
        set(s => ({ collapsedYears: toggleSetItem(s.collapsedYears, year) }));
      },

      toggleHideSummer: () => set(s => ({ hideSummer: !s.hideSummer })),

      toggleQuarterComplete: (quarterId) => {
        set(s => ({ completedQuarters: toggleSetItem(s.completedQuarters, quarterId) }));
      },

      addUserMajor: (config) => {
        const { userMajors } = get();
        const id = config.id.startsWith('user-') ? config.id : `user-${config.id}`;
        const safeConfig = { ...config, id };
        if (userMajors.some(m => m.id === id)) return;
        set({ userMajors: [...userMajors, safeConfig] });
      },

      setManualSlotFill: (slotId, fill) => {
        const { manualSlotFills } = get();
        const current = manualSlotFills[slotId] ?? { checked: false, note: '' };
        set({ manualSlotFills: { ...manualSlotFills, [slotId]: { ...current, ...fill } } });
      },

      removeUserMajor: (majorId) => {
        const { userMajors, selectedMajorId } = get();
        set({
          userMajors: userMajors.filter(m => m.id !== majorId),
          selectedMajorId: selectedMajorId === majorId ? null : selectedMajorId,
        });
      },

      // ── Minor actions ──

      addMinor: (minorId) => {
        const { selectedMinorIds } = get();
        if (selectedMinorIds.includes(minorId)) return;
        set({ selectedMinorIds: [...selectedMinorIds, minorId] });
      },

      removeMinor: (minorId) => {
        const { selectedMinorIds, manualMinorSlotFills } = get();
        const next = { ...manualMinorSlotFills };
        delete next[minorId];
        set({ selectedMinorIds: selectedMinorIds.filter(id => id !== minorId), manualMinorSlotFills: next });
      },

      addUserMinor: (config) => {
        const { userMinors } = get();
        const id = config.id.startsWith('user-') ? config.id : `user-minor-${config.id}`;
        const safeConfig = { ...config, id, category: 'minor' as const };
        if (userMinors.some(m => m.id === id)) return;
        set({ userMinors: [...userMinors, safeConfig] });
      },

      removeUserMinor: (minorId) => {
        const { userMinors, selectedMinorIds, manualMinorSlotFills } = get();
        const next = { ...manualMinorSlotFills };
        delete next[minorId];
        set({
          userMinors: userMinors.filter(m => m.id !== minorId),
          selectedMinorIds: selectedMinorIds.filter(id => id !== minorId),
          manualMinorSlotFills: next,
        });
      },

      setManualMinorSlotFill: (minorId, slotId, fill) => {
        const { manualMinorSlotFills } = get();
        const minorFills = manualMinorSlotFills[minorId] ?? {};
        const current = minorFills[slotId] ?? { checked: false, note: '' };
        set({
          manualMinorSlotFills: {
            ...manualMinorSlotFills,
            [minorId]: { ...minorFills, [slotId]: { ...current, ...fill } },
          },
        });
      },

      // ── Additional major actions ──

      addAdditionalMajor: (id, kind) => {
        const { additionalMajors } = get();
        if (additionalMajors.some(am => am.id === id)) return;
        set({ additionalMajors: [...additionalMajors, { id, kind }] });
      },

      removeAdditionalMajor: (id) => {
        const { additionalMajors, manualAdditionalMajorSlotFills, selectedTracks } = get();
        const next = { ...manualAdditionalMajorSlotFills };
        delete next[id];
        const nextTracks = { ...selectedTracks };
        for (const key of Object.keys(nextTracks)) {
          if (key === id || key.startsWith(`${id}:`)) delete nextTracks[key];
        }
        set({
          additionalMajors: additionalMajors.filter(am => am.id !== id),
          manualAdditionalMajorSlotFills: next,
          selectedTracks: nextTracks,
        });
      },

      setAdditionalMajorKind: (id, kind) => {
        const { additionalMajors } = get();
        set({ additionalMajors: additionalMajors.map(am => am.id === id ? { ...am, kind } : am) });
      },

      setManualAdditionalMajorSlotFill: (majorId, slotId, fill) => {
        const { manualAdditionalMajorSlotFills } = get();
        const majorFills = manualAdditionalMajorSlotFills[majorId] ?? {};
        const current = majorFills[slotId] ?? { checked: false, note: '' };
        set({
          manualAdditionalMajorSlotFills: {
            ...manualAdditionalMajorSlotFills,
            [majorId]: { ...majorFills, [slotId]: { ...current, ...fill } },
          },
        });
      },

      // ── Coterm actions ──

      toggleCoterm: () => {
        const { isCoterm, showYear5 } = get();
        const next = !isCoterm;
        // Auto-show year 5 when enabling coterm; hide it when disabling (unless manually shown)
        set({ isCoterm: next, showYear5: next ? true : showYear5 });
      },

      toggleShowYear5: () => set(s => ({ showYear5: !s.showYear5 })),

      setCoterm: (cotermId) => {
        const { showYear5 } = get();
        set({
          selectedCotermId: cotermId,
          isCoterm: cotermId !== null,
          showYear5: cotermId !== null ? true : showYear5,
        });
      },

      addUserCotermConfig: (config) => {
        const { userCotermConfigs } = get();
        const id = config.id.startsWith('user-') ? config.id : `user-coterm-${config.id}`;
        const safeConfig = { ...config, id, category: 'coterm' as const };
        if (userCotermConfigs.some(m => m.id === id)) return;
        set({ userCotermConfigs: [...userCotermConfigs, safeConfig] });
      },

      removeUserCotermConfig: (cotermId: string) => {
        const { userCotermConfigs, selectedCotermId, showYear5 } = get();
        set({
          userCotermConfigs: userCotermConfigs.filter(m => m.id !== cotermId),
          ...(selectedCotermId === cotermId ? { selectedCotermId: null, isCoterm: false, showYear5 } : {}),
        });
      },

      setTrack: (programId, trackId) => {
        const { selectedTracks } = get();
        if (trackId === null) {
          const next = { ...selectedTracks };
          delete next[programId];
          set({ selectedTracks: next });
        } else {
          set({ selectedTracks: { ...selectedTracks, [programId]: trackId } });
        }
      },

      ignoreCardPrereq: (cardId) => {
        const next = new Set(get().ignoredPrereqCardIds);
        next.add(cardId);
        set({ ignoredPrereqCardIds: next });
      },

      setManualLangFulfilled: (val) => set({ manualLangFulfilled: val }),
      setCongratsShown: (val) => set({ congratsShown: val }),
      setBannerDismissed: (val) => set({ bannerDismissed: val }),
      completeOnboardingStep: (stepId) => set(s => ({
        onboardingSteps: s.onboardingSteps.includes(stepId) ? s.onboardingSteps : [...s.onboardingSteps, stepId],
      })),

      setMajor: (majorId) => {
        set({ selectedMajorId: majorId });
      },

      setTestCreditCheck: (id, check, singleSelectArea) => {
        const { testCreditChecks } = get();
        let next = { ...testCreditChecks, [id]: { ...(testCreditChecks[id] ?? { checked: false }), ...check } };
        if (singleSelectArea && SINGLE_SELECT_AREAS.includes(singleSelectArea) && check.checked) {
          for (const group of ALL_TEST_GROUPS) {
            if (group.area === singleSelectArea && group.id !== id && next[group.id]?.checked) {
              next = { ...next, [group.id]: { checked: false } };
            }
          }
        }
        set({ testCreditChecks: next });
      },

      addTransferCredit: () => {
        const id = `tc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        set(s => ({ transferCredits: [...s.transferCredits, { id, name: '', courses: [], units: 0 }] }));
      },

      updateTransferCredit: (id, updates) => {
        set(s => ({ transferCredits: s.transferCredits.map(tc => tc.id === id ? { ...tc, ...updates } : tc) }));
      },

      removeTransferCredit: (id) => {
        set(s => ({ transferCredits: s.transferCredits.filter(tc => tc.id !== id) }));
      },

      undo: () => {
        const { past, cards, cardOrder, future } = get();
        if (past.length === 0) return;
        const prev = past[past.length - 1];
        set({
          cards: prev.cards,
          cardOrder: prev.cardOrder,
          past: past.slice(0, -1),
          future: [snap(cards, cardOrder), ...future.slice(0, 19)],
        });
      },

      redo: () => {
        const { future, cards, cardOrder, past } = get();
        if (future.length === 0) return;
        const next = future[0];
        set({
          cards: next.cards,
          cardOrder: next.cardOrder,
          future: future.slice(1),
          past: [...past.slice(-19), snap(cards, cardOrder)],
        });
      },

      getOrderedCards: (containerId) => {
        const { cards, cardOrder } = get();
        return orderedCardsFor(cards, cardOrder, containerId);
      },

      // ── Scenario management ──

      switchScenario: (newId) => {
        const s = get();
        if (s.activeScenarioId === newId) return;
        const currentSnapshot = captureLiveSnapshot(s);
        const updatedScenarios = s.scenarios.map(sc =>
          sc.id === s.activeScenarioId ? { ...sc, data: currentSnapshot } : sc
        );
        const target = updatedScenarios.find(sc => sc.id === newId);
        if (!target) return;
        set({ scenarios: updatedScenarios, activeScenarioId: newId, ...fromSnapshot(target.data) });
      },

      addScenario: (name = 'New Plan') => {
        const s = get();
        if (s.scenarios.length >= MAX_SCENARIOS) return null;
        const newId = `scenario-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        const currentSnapshot = captureLiveSnapshot(s);
        const updatedScenarios = s.scenarios.map(sc => sc.id === s.activeScenarioId ? { ...sc, data: currentSnapshot } : sc);
        set({
          scenarios: [
            ...updatedScenarios,
            { id: newId, name, color: pickColor(updatedScenarios), createdAt: new Date().toISOString(), data: EMPTY_SNAPSHOT },
          ],
          activeScenarioId: newId,
          ...fromSnapshot(EMPTY_SNAPSHOT),
        });
        return newId;
      },

      duplicateScenario: (id) => {
        const s = get();
        if (s.scenarios.length >= MAX_SCENARIOS) return null;
        const newId = `scenario-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        const currentSnapshot = captureLiveSnapshot(s);
        const withSaved = s.scenarios.map(sc =>
          sc.id === s.activeScenarioId ? { ...sc, data: currentSnapshot } : sc
        );
        const source = withSaved.find(sc => sc.id === id);
        if (!source) return newId;
        const sourceData = {
          ...(id === s.activeScenarioId ? currentSnapshot : source.data),
          congratsShown: false,
        };
        const newScenario: Scenario = {
          id: newId,
          name: `${source.name} (copy)`,
          color: pickColor(withSaved),
          createdAt: new Date().toISOString(),
          data: sourceData,
        };
        const srcIdx = withSaved.findIndex(sc => sc.id === id);
        const allScenarios = [
          ...withSaved.slice(0, srcIdx + 1),
          newScenario,
          ...withSaved.slice(srcIdx + 1),
        ];
        set({ scenarios: allScenarios, activeScenarioId: newId, ...fromSnapshot(sourceData) });
        return newId;
      },

      deleteScenario: (id) => {
        const s = get();
        if (s.scenarios.length <= 1) return;
        const currentSnapshot = captureLiveSnapshot(s);
        const remaining = s.scenarios
          .map(sc => sc.id === s.activeScenarioId ? { ...sc, data: currentSnapshot } : sc)
          .filter(sc => sc.id !== id);
        if (s.activeScenarioId === id) {
          const newActive = remaining[0];
          set({ scenarios: remaining, activeScenarioId: newActive.id, ...fromSnapshot(newActive.data) });
        } else {
          set({ scenarios: remaining });
        }
      },

      renameScenario: (id, name) => {
        set(s => ({ scenarios: s.scenarios.map(sc => sc.id === id ? { ...sc, name } : sc) }));
      },

      reorderScenarios: (orderedIds) => {
        set(s => {
          const map = Object.fromEntries(s.scenarios.map(sc => [sc.id, sc]));
          const reordered = orderedIds.map(id => map[id]).filter(Boolean);
          // Append any scenarios not in orderedIds (safety net)
          const missing = s.scenarios.filter(sc => !orderedIds.includes(sc.id));
          return { scenarios: [...reordered, ...missing] };
        });
      },
    }),
    {
      name: 'stanford-planner-v2',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => {
        // Always flush live cards into the active scenario's data before writing to storage,
        // so normalizePersisted can restore them correctly on next load.
        const liveSnap = captureLiveSnapshot(state);
        const scenarios = state.scenarios.map(sc =>
          sc.id === state.activeScenarioId ? { ...sc, data: liveSnap } : sc,
        );
        return {
          cards: state.cards,
          cardOrder: state.cardOrder,
          collapsedYears: Array.from(state.collapsedYears),
          completedQuarters: Array.from(state.completedQuarters),
          hideSummer: state.hideSummer,
          testCreditChecks: state.testCreditChecks,
          transferCredits: state.transferCredits,
          selectedMajorId: state.selectedMajorId,
          userMajors: state.userMajors,
          manualSlotFills: state.manualSlotFills,
          scenarios,
          activeScenarioId: state.activeScenarioId,
          ignoredPrereqCardIds: Array.from(state.ignoredPrereqCardIds),
          congratsShown: state.congratsShown,
          bannerDismissed: state.bannerDismissed,
          onboardingSteps: state.onboardingSteps,
        };
      },
      merge: (persisted: unknown, current) => {
        const p = persisted as Record<string, unknown> | null;
        return {
          ...current,
          ...normalizePersisted(p),
          ignoredPrereqCardIds: new Set<string>(Array.isArray(p?.ignoredPrereqCardIds) ? p.ignoredPrereqCardIds as string[] : []),
          congratsShown: (p?.congratsShown as boolean | undefined) ?? false,
          bannerDismissed: (p?.bannerDismissed as boolean | undefined) ?? false,
          onboardingSteps: (Array.isArray(p?.onboardingSteps) ? p.onboardingSteps : []) as string[],
        };
      },
    }
  )
);
