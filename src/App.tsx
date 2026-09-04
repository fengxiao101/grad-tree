import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
  type CollisionDetection,
} from '@dnd-kit/core';
import { Sun, Moon, ChevronDown, ChevronRight, Pencil, Trash2, Copy, Check, Loader2 } from 'lucide-react';
import {
  ALL_QUARTERS,
  CourseCard,
  SectionTag,
  WayTag,
  WritingTag,
  WAY_TAGS,
  type Affiliation,
  type Priority,
  type RequirementAssignment,
  type RequirementChoice,
} from './types';
import { usePlannerStore } from './store/usePlannerStore';
import { useHighlightStore } from './store/useHighlightStore';
import { useAuth } from './hooks/useAuth';
import { loadPlan, savePlan, signIn, signOutUser, isFirebaseConfigured } from './lib/backend';
import type { PlannerStore } from './store/usePlannerStore';
import { captureLiveSnapshot, MAX_SCENARIOS, normalizePersisted } from './store/usePlannerStore';
import { ALL_TEST_GROUPS } from './data/testCredits';
import { useProgramConfig, useProgramConfigs } from './hooks/useProgramConfigs';
import { computeTestCovered, computeTransferCovered, normalizeDept } from './data/testCreditUtils';
import { lookupCourse } from './data/catalog';
import { tagsFromCatalog, parseHighUnit } from './utils/catalogUtils';
import { getReadyToTake } from './utils/readyToTake';
import { getEffectiveProgramSections, matchesOption } from './utils/majorUtils';
import { Header } from './components/Header';
import { UnsortedPool } from './components/UnsortedPool';
import { QuarterGrid } from './components/QuarterGrid';
import { WaysSection } from './components/WaysSection';
import { WritingSection } from './components/WritingSection';
import { TestCreditSection } from './components/TestCreditSection';
import { MajorSection } from './components/MajorSection';
import { MissingRequirementsSection } from './components/MissingRequirementsSection';
import { CongratulationsModal } from './components/CongratulationsModal';
import { SectionTabs } from './components/SectionTabs';
import { ScenarioBar } from './components/ScenarioBar';
import { TermsModal } from './components/TermsModal';
import { PrivacyModal } from './components/PrivacyModal';
import { FearTheTree } from './components/FearTheTree';
import type { CatalogCourse } from './data/catalog';
import stanfordQuadBackground from '../stanford_quad_background_image.jpg';
import cardinalMemeBackground from '../cardinal_meme_background.png';

const PrintView = lazy(() => import('./components/PrintView').then(module => ({ default: module.PrintView })));
const CompareView = lazy(() => import('./components/CompareView').then(module => ({ default: module.CompareView })));
const AddClassModal = lazy(() => import('./components/AddClassModal').then(module => ({ default: module.AddClassModal })));
const CourseSearchModal = lazy(() => import('./components/CourseSearchModal').then(module => ({ default: module.CourseSearchModal })));

function ModalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="status" aria-live="polite">
      <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-xl">Loading course catalog…</div>
    </div>
  );
}

const CONTAINER_IDS = new Set(['unsorted', ...ALL_QUARTERS.map(q => q.id)]);

type CatalogQuarter = 'Aut' | 'Win' | 'Spr' | 'Sum';

function extractPlanData(s: PlannerStore) {
  const liveSnapshot = captureLiveSnapshot(s);
  const scenarios = s.scenarios.map(sc =>
    sc.id === s.activeScenarioId ? { ...sc, data: liveSnapshot } : sc
  );
  return {
    scenarios,
    activeScenarioId: s.activeScenarioId,
    ignoredPrereqCardIds: Array.from(s.ignoredPrereqCardIds),
    congratsShown: s.congratsShown,
    bannerDismissed: s.bannerDismissed,
    onboardingSteps: s.onboardingSteps,
  };
}

function hydrateStore(p: Record<string, unknown>) {
  usePlannerStore.setState({
    ...normalizePersisted(p),
    ignoredPrereqCardIds: new Set<string>(
      Array.isArray(p.ignoredPrereqCardIds) ? p.ignoredPrereqCardIds as string[] : [],
    ),
    congratsShown: (p.congratsShown as boolean | undefined) ?? false,
    bannerDismissed: (p.bannerDismissed as boolean | undefined) ?? false,
    onboardingSteps: (Array.isArray(p.onboardingSteps) ? p.onboardingSteps : []) as string[],
  });
}

function resetToGuestPlan() {
  hydrateStore({});
}

function firebaseErrMsg(err: unknown): string {
  const code = (err as { code?: string })?.code;
  if (code === 'permission-denied') return 'Firestore rules are blocking saves: set rules to allow authenticated writes.';
  if (code === 'unavailable') return 'Firestore unavailable: check your connection.';
  if (code) return `Cloud error: ${code}`;
  return 'Cloud save failed: see browser console for details.';
}

const SEASON_TO_CATALOG: Record<string, CatalogQuarter> = {
  AUT: 'Aut', WIN: 'Win', SPR: 'Spr', SUM: 'Sum',
};

type CourseSearchParams = { defaultTag?: SectionTag; filterQuarter?: CatalogQuarter; targetQuarterId?: string; anyApprovedSlotId?: string; defaultAffiliation?: Affiliation; requirementProgramId?: string };

type ModalState =
  | { type: 'add'; quarterId: string; defaultTags?: SectionTag[]; prefillCourse?: CatalogCourse; committedWay?: WayTag; defaultAffiliation?: Affiliation; anyApprovedSlotId?: string; requirementProgramId?: string; fromSearchParams?: CourseSearchParams }
  | { type: 'edit'; card: CourseCard }
  | { type: 'course-search'; defaultTag?: SectionTag; filterQuarter?: CatalogQuarter; targetQuarterId?: string; anyApprovedSlotId?: string; defaultAffiliation?: Affiliation; requirementProgramId?: string }
  | null;

function QuarterSectionHeader({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const hideSummer = usePlannerStore(s => s.hideSummer);
  const toggleHideSummer = usePlannerStore(s => s.toggleHideSummer);
  const showYear5 = usePlannerStore(s => s.showYear5);
  const toggleShowYear5 = usePlannerStore(s => s.toggleShowYear5);
  const isCoterm = usePlannerStore(s => s.isCoterm);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <button onClick={onToggle} className="min-h-11 sm:min-h-0 flex items-center gap-1.5 hover:opacity-70 transition-opacity">
          {collapsed ? <ChevronRight size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          <h2 className="font-serif font-semibold text-[17px] text-gray-900">Quarter by Quarter</h2>
        </button>
        <div className="flex items-center gap-1.5">
          {(showYear5 || isCoterm) && (
            <button
              onClick={toggleShowYear5}
              className={`min-h-11 sm:min-h-0 flex items-center gap-1.5 text-xs px-3 sm:px-2 py-2 sm:py-1 rounded border transition-colors
                ${showYear5
                  ? 'border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100'
                  : 'border-gray-400 bg-white/60 text-gray-700 hover:text-gray-900 hover:border-gray-500'}`}
            >
              {showYear5 ? 'Hide year 5' : 'Show year 5'}
            </button>
          )}
          <button
            onClick={toggleHideSummer}
            className={`min-h-11 sm:min-h-0 flex items-center gap-1.5 text-xs px-3 sm:px-2 py-2 sm:py-1 rounded border transition-colors
              ${hideSummer
                ? 'border-gray-400 bg-white/60 text-gray-700 hover:text-gray-900 hover:border-gray-500'
                : 'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100'}`}
          >
            <Sun size={12} />
            {hideSummer ? 'Show summer' : 'Hide summer'}
          </button>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-gray-300 to-transparent mt-2" />
    </div>
  );
}

export default function App() {
  const cards = usePlannerStore(s => s.cards);
  const addCard = usePlannerStore(s => s.addCard);
  const moveCard = usePlannerStore(s => s.moveCard);
  const reorderCard = usePlannerStore(s => s.reorderCard);
  const getOrderedCards = usePlannerStore(s => s.getOrderedCards);
  const testCreditChecks = usePlannerStore(s => s.testCreditChecks);
  const transferCredits = usePlannerStore(s => s.transferCredits);
  const completedQuarters = usePlannerStore(s => s.completedQuarters);
  const undo = usePlannerStore(s => s.undo);
  const redo = usePlannerStore(s => s.redo);
  const selectedMajorId = usePlannerStore(s => s.selectedMajorId);
  const userMajors = usePlannerStore(s => s.userMajors);
  const selectedMinorIds = usePlannerStore(s => s.selectedMinorIds);
  const userMinors = usePlannerStore(s => s.userMinors);
  const selectedCotermId = usePlannerStore(s => s.selectedCotermId);
  const userCotermConfigs = usePlannerStore(s => s.userCotermConfigs);
  const updateCard = usePlannerStore(s => s.updateCard);
  const renameScenario = usePlannerStore(s => s.renameScenario);
  const deleteScenario = usePlannerStore(s => s.deleteScenario);
  const duplicateScenario = usePlannerStore(s => s.duplicateScenario);
  const scenarioCount = usePlannerStore(s => s.scenarios.length);
  const activeScenarioId = usePlannerStore(s => s.activeScenarioId);
  const hideSummer = usePlannerStore(s => s.hideSummer);
  const showYear5 = usePlannerStore(s => s.showYear5);
  const manualSlotFills = usePlannerStore(s => s.manualSlotFills);
  const selectedTracks = usePlannerStore(s => s.selectedTracks);
  const congratsShown = usePlannerStore(s => s.congratsShown);
  const setCongratsShown = usePlannerStore(s => s.setCongratsShown);
  const bannerDismissed = usePlannerStore(s => s.bannerDismissed);
  const setBannerDismissed = usePlannerStore(s => s.setBannerDismissed);
  const onboardingSteps = usePlannerStore(s => s.onboardingSteps);
  const completeOnboardingStep = usePlannerStore(s => s.completeOnboardingStep);

  const pendingDuplicate = usePlannerStore(s => s.pendingDuplicate);
  const confirmDuplicate = usePlannerStore(s => s.confirmDuplicate);
  const cancelDuplicate = usePlannerStore(s => s.cancelDuplicate);

  const [modal, setModal] = useState<ModalState>(null);
  const [activeCard, setActiveCard] = useState<CourseCard | null>(null);
  const [quartersCollapsed, setQuartersCollapsed] = useState(false);
  const [planNameEditing, setPlanNameEditing] = useState(false);
  const [planNameVal, setPlanNameVal] = useState('');
  const [showDeletePlanConfirm, setShowDeletePlanConfirm] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const planNameInputRef = useRef<HTMLInputElement>(null);

  const enrolledCards = useMemo(() => Object.values(cards), [cards]);
  const testCoveredCourses = useMemo(() => {
    const s = computeTestCovered(testCreditChecks);
    computeTransferCovered(transferCredits).forEach(k => s.add(k));
    return s;
  }, [testCreditChecks, transferCredits]);

  const additionalMajors = usePlannerStore(s => s.additionalMajors);

  const majorConfig = useProgramConfig(selectedMajorId, userMajors);
  const minorConfigs = useProgramConfigs(selectedMinorIds, userMinors);
  const cotermConfig = useProgramConfig(selectedCotermId, userCotermConfigs);
  const additionalMajorIds = useMemo(() => additionalMajors.map(am => am.id), [additionalMajors]);
  const additionalMajorConfigs = useProgramConfigs(additionalMajorIds, userMajors);

  // Feeds the READY TO TAKE panel, which is commented out in the JSX below.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const readySuggestions = useMemo(() => {
    if (!majorConfig || enrolledCards.length === 0) return [];
    const trackId = selectedMajorId ? (selectedTracks[selectedMajorId] ?? null) : null;
    return getReadyToTake(majorConfig, enrolledCards, manualSlotFills, trackId, testCoveredCourses, 8);
  }, [majorConfig, enrolledCards, manualSlotFills, selectedTracks, selectedMajorId, testCoveredCourses]);

  const computeHighlight = useHighlightStore(s => s.computeHighlight);
  const clearHighlight = useHighlightStore(s => s.clearHighlight);
  const centerId = useHighlightStore(s => s.centerId);

  const handleDoubleClickCard = useCallback((card: CourseCard) => {
    if (centerId === card.id) { clearHighlight(); return; }
    computeHighlight(card, enrolledCards);
  }, [centerId, computeHighlight, clearHighlight, enrolledCards]);

  const testCreditUnits = useMemo(() => {
    let physicsUnits = 0;
    let otherUnits = 0;
    for (const group of ALL_TEST_GROUPS) {
      const check = testCreditChecks[group.id];
      if (!check?.checked) continue;
      const units = group.scoreOptions.length === 1
        ? group.scoreOptions[0].units
        : (check.selectedScore ? (group.scoreOptions.find(o => o.score === check.selectedScore)?.units ?? 0) : 0);
      if (group.area === 'Physics') physicsUnits += units;
      else otherUnits += units;
    }
    const transferUnits = transferCredits.reduce((sum, tc) => sum + (tc.units ?? 0), 0);
    return Math.min(Math.min(physicsUnits, 8) + otherUnits + transferUnits, 45);
  }, [testCreditChecks, transferCredits]);

  const isCoterm = usePlannerStore(s => s.isCoterm);
  const activeColor = usePlannerStore(s =>
    s.scenarios.find(sc => sc.id === s.activeScenarioId)?.color ?? '#8C1515'
  );
  const activePlanName = usePlannerStore(s =>
    s.scenarios.find(sc => sc.id === s.activeScenarioId)?.name ?? 'My Plan'
  );

  const totalUnits = useMemo(
    () => enrolledCards.reduce((sum, c) => sum + (c.units ?? 0), 0) + testCreditUnits,
    [enrolledCards, testCreditUnits],
  );

  const cotermUnits = useMemo(
    () => enrolledCards
      .filter(c => c.affiliation === 'co-term')
      .reduce((sum, c) => sum + (
        c.units
        ?? parseHighUnit(lookupCourse(c.department, c.courseNumber)?.units ?? '')
        ?? 0
      ), 0),
    [enrolledCards],
  );

  const ugUnits = totalUnits - cotermUnits;

  const handleCompletionStatusChange = useCallback((complete: boolean) => {
    if (complete && !congratsShown) {
      setCongratsShown(true);
      setShowCongrats(true);
    }
  }, [congratsShown, setCongratsShown]);

  // Auto-tag existing cards with the internal 'co-term' value when the coterm program changes
  const enrolledCardsRef = useRef(enrolledCards);
  // Deliberate render-phase ref write: the effect below must see the value
  // from this render. Moving it into an effect would reorder the two.
  // eslint-disable-next-line react-hooks/refs
  enrolledCardsRef.current = enrolledCards;
  useEffect(() => {
    if (!cotermConfig) return;
    for (const card of enrolledCardsRef.current) {
      if (card.affiliation === 'major' || card.affiliation === 'minor') continue;
      const key = `${normalizeDept(card.department)}:${card.courseNumber.toUpperCase()}`;
      const matches = cotermConfig.sections.some(sec =>
        sec.slots.some(slot =>
          slot.options.some(o => `${normalizeDept(o.dept)}:${o.number.toUpperCase()}` === key),
        ),
      );
      if (matches && card.affiliation !== 'co-term') {
        updateCard(card.id, { affiliation: 'co-term' });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cotermConfig, updateCard]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && centerId && !modal) { clearHighlight(); return; }
      if (modal) return;
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') { e.preventDefault(); redo(); }
      if (e.key === 'n' && !e.metaKey && !e.ctrlKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
          e.preventDefault();
          setModal({ type: 'add', quarterId: 'unsorted' });
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modal, centerId, clearHighlight, undo, redo]);

  const collisionDetection: CollisionDetection = (args) => {
    const pointer = pointerWithin(args);
    return pointer.length > 0 ? pointer : rectIntersection(args);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const card = cards[event.active.id as string];
    if (card) setActiveCard(card);
  }, [cards]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedCard = cards[active.id as string];
    if (!draggedCard) return;

    const overId = over.id as string;
    const isContainer = CONTAINER_IDS.has(overId);

    if (isContainer) {
      moveCard(draggedCard.id, overId);
      return;
    }

    const overCard = cards[overId];
    if (!overCard) return;

    if (overCard.quarterId === draggedCard.quarterId) {
      // Same container - reorder
      reorderCard(draggedCard.quarterId, draggedCard.id, overCard.id);
    } else {
      // Different container - move
      moveCard(draggedCard.id, overCard.quarterId);
    }
  }, [cards, moveCard, reorderCard]);

  const openAdd = (quarterId: string, defaultTags?: SectionTag[], prefillCourse?: CatalogCourse, committedWay?: WayTag, defaultAffiliation?: Affiliation, anyApprovedSlotId?: string, requirementProgramId?: string, fromSearchParams?: CourseSearchParams) =>
    setModal({ type: 'add', quarterId, defaultTags, prefillCourse, committedWay, defaultAffiliation, anyApprovedSlotId, requirementProgramId, fromSearchParams });
  const openEdit = (card: CourseCard) => setModal({ type: 'edit', card });
  const openCourseSearch = (defaultTag?: SectionTag, filterQuarter?: CatalogQuarter, targetQuarterId?: string, anyApprovedSlotId?: string, defaultAffiliation?: Affiliation, requirementProgramId?: string) =>
    setModal({ type: 'course-search', defaultTag, filterQuarter, targetQuarterId, anyApprovedSlotId, defaultAffiliation, requirementProgramId });

  const courseInConfig = useCallback((dept: string, num: string, config: typeof majorConfig) => {
    if (!config) return false;
    const key = `${normalizeDept(dept)}:${num.toUpperCase()}`;
    return config.sections.some(sec =>
      sec.slots.some(slot =>
        slot.options.some(o => `${normalizeDept(o.dept)}:${o.number.toUpperCase()}` === key)
      )
    );
  }, []);

  const detectAffiliation = useCallback((dept: string, num: string): 'major' | 'minor' | 'co-term' | undefined => {
    if (courseInConfig(dept, num, majorConfig)) return 'major';
    const minorMatch = minorConfigs.some(config => {
      const key = `${normalizeDept(dept)}:${num.toUpperCase()}`;
      return config.sections.some(sec => sec.slots.some(slot =>
        slot.options.some(o => `${normalizeDept(o.dept)}:${o.number.toUpperCase()}` === key)
      ));
    });
    if (minorMatch) return 'minor';
    if (cotermConfig) {
      const key = `${normalizeDept(dept)}:${num.toUpperCase()}`;
      if (cotermConfig.sections.some(sec => sec.slots.some(slot =>
        slot.options.some(o => `${normalizeDept(o.dept)}:${o.number.toUpperCase()}` === key)
      ))) return 'co-term';
    }
    return undefined;
  }, [courseInConfig, majorConfig, minorConfigs, cotermConfig]);

  // Chip click in major section - add directly, no modal
  const affiliationForRequirement = useCallback((target?: RequirementAssignment): Affiliation | undefined => {
    if (!target) return undefined;
    if (target.programId === majorConfig?.id) return 'major';
    if (minorConfigs.some(config => config.id === target.programId)) return 'minor';
    if (target.programId === cotermConfig?.id) return 'co-term';
    const am = additionalMajors.find(a => a.id === target.programId);
    if (am) return am.kind === 'double' ? 'double-major' : 'secondary-major';
    return undefined;
  }, [majorConfig?.id, minorConfigs, cotermConfig?.id, additionalMajors]);

  const requirementTargetForSlot = useCallback((
    slotId?: string,
    affiliation?: Affiliation,
    programId?: string,
  ): RequirementAssignment | undefined => {
    if (!slotId || !affiliation) return undefined;
    if (programId) return { programId, slotId };
    if (affiliation === 'major' && majorConfig) return { programId: majorConfig.id, slotId };
    if (affiliation === 'co-term' && cotermConfig) return { programId: cotermConfig.id, slotId };
    if (affiliation === 'minor') {
      const minor = minorConfigs.find(config => {
        const allSections = [
          ...config.sections,
          ...(config.tracks?.flatMap(track => track.sections) ?? []),
        ];
        return allSections.some(section =>
          [...section.slots, ...(section.pickOneGroup?.flatMap(group => group.slots) ?? [])]
            .some(slot => slot.id === slotId),
        );
      });
      if (minor) return { programId: minor.id, slotId };
    }
    return undefined;
  }, [majorConfig, minorConfigs, cotermConfig]);

  const requirementSlot = useCallback((target: RequirementAssignment) => {
    const config = target.programId === majorConfig?.id
      ? majorConfig
      : target.programId === cotermConfig?.id
        ? cotermConfig
        : minorConfigs.find(candidate => candidate.id === target.programId)
          ?? additionalMajorConfigs.find(candidate => candidate.id === target.programId);
    if (!config) return undefined;
    const sections = [
      ...config.sections,
      ...(config.tracks?.flatMap(track => track.sections) ?? []),
    ];
    return sections.flatMap(section => [
      ...section.slots,
      ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
    ]).find(slot => slot.id === target.slotId);
  }, [majorConfig, minorConfigs, cotermConfig, additionalMajorConfigs]);

  const handleAddCourseFromMajor = useCallback((course: CatalogCourse, target?: RequirementAssignment) => {
    const dept = course.depts[0] ?? '';
    const num  = course.numbers[0] ?? '';
    const existingMatches = Object.values(cards).filter(c =>
      matchesOption(c.department, c.courseNumber, { dept, number: num }),
    );
    const slot = target ? requirementSlot(target) : undefined;
    const pinnedRepeatCount = target ? existingMatches.filter(card =>
        card.requirementAssignment?.programId === target.programId
        && card.requirementAssignment.slotId === target.slotId
      ).length : 0;
    const repeatedTargetNeedsAnotherCard = Boolean(target && (slot?.times ?? 1) > 1
      && pinnedRepeatCount > 0
      && pinnedRepeatCount < (slot?.times ?? 1));
    const alreadyExists = repeatedTargetNeedsAnotherCard
      ? undefined
      : existingMatches.find(card => !card.requirementAssignment) ?? existingMatches[0];
    const targetAffiliation = affiliationForRequirement(target);
    const catalogEntry = lookupCourse(dept, num);
    const affiliation = targetAffiliation ?? detectAffiliation(dept, num);
    // 'required' only when the slot has exactly one option (no real choice); otherwise 'want'
    const priority: Priority = (slot && slot.options.length === 1) ? 'required' : 'want';
    const freshTags = tagsFromCatalog(catalogEntry ?? course);
    const cardArgs = {
      department: dept, courseNumber: num,
      courseName: course.title ?? '',
      units: parseHighUnit(catalogEntry?.units ?? ''),
      priority,
      affiliation,
      requirementAssignment: target,
      tags: freshTags,
      notes: '', quarterId: 'unsorted',
    };
    if (alreadyExists) {
      if (target) {
        updateCard(alreadyExists.id, {
          requirementAssignment: target,
          affiliation: targetAffiliation ?? alreadyExists.affiliation,
          tags: freshTags.length > 0 ? freshTags : alreadyExists.tags,
          priority: (slot && slot.options.length === 1) ? 'required' : alreadyExists.priority,
        });
        return;
      }
      // no target - fall through to addCard which will detect the duplicate and show the warning
    }
    addCard(cardArgs);
  }, [cards, addCard, detectAffiliation, affiliationForRequirement, updateCard, requirementSlot]);

  // Requirement choices for the 'add' modal when opened from within a program section
  const addRequirementChoices = useMemo<RequirementChoice[]>(() => {
    if (modal?.type !== 'add' || !modal.requirementProgramId || !modal.prefillCourse) return [];
    const dept = modal.prefillCourse.depts[0] ?? '';
    const num  = modal.prefillCourse.numbers[0] ?? '';
    const programs: { config: NonNullable<typeof majorConfig>; affiliation: Affiliation }[] = [
      ...(majorConfig ? [{ config: majorConfig, affiliation: 'major' as const }] : []),
      ...minorConfigs.map(config => ({ config, affiliation: 'minor' as const })),
      ...(cotermConfig ? [{ config: cotermConfig, affiliation: 'co-term' as const }] : []),
      ...additionalMajors.flatMap(am => {
        const config = additionalMajorConfigs.find(c => c.id === am.id);
        if (!config) return [];
        const affiliation: Affiliation = am.kind === 'double' ? 'double-major' : 'secondary-major';
        return [{ config, affiliation }];
      }),
    ].filter(({ config }) => config.id === modal.requirementProgramId);
    return programs.flatMap(({ config, affiliation }) => {
      const sections = getEffectiveProgramSections(config, selectedTracks);
      return sections.flatMap(section => {
        const slots = [
          ...section.slots,
          ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
        ];
        return slots
          .filter(slot => slot.options.some(option => matchesOption(dept, num, option)))
          .map(slot => ({
            programId: config.id,
            slotId: slot.id,
            affiliation,
            label: `${config.name}: ${section.name}: ${slot.label}`,
          }));
      });
    });
  }, [modal, majorConfig, minorConfigs, cotermConfig, additionalMajors, additionalMajorConfigs, selectedTracks]);

  const editRequirementChoices = useMemo<RequirementChoice[]>(() => {
    if (modal?.type !== 'edit') return [];
    const card = modal.card;
    const programs: { config: NonNullable<typeof majorConfig>; affiliation: Affiliation }[] = [
      ...(majorConfig ? [{ config: majorConfig, affiliation: 'major' as const }] : []),
      ...minorConfigs.map(config => ({ config, affiliation: 'minor' as const })),
      ...(cotermConfig ? [{ config: cotermConfig, affiliation: 'co-term' as const }] : []),
      ...additionalMajors.flatMap(am => {
        const config = additionalMajorConfigs.find(c => c.id === am.id);
        if (!config) return [];
        const affiliation: Affiliation = am.kind === 'double' ? 'double-major' : 'secondary-major';
        return [{ config, affiliation }];
      }),
    ];
    return programs.flatMap(({ config, affiliation }) => {
      const sections = getEffectiveProgramSections(config, selectedTracks);
      return sections.flatMap(section => {
        const slots = [
          ...section.slots,
          ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
        ];
        return slots
          .filter(slot => slot.options.some(option =>
            matchesOption(card.department, card.courseNumber, option),
          ))
          .map(slot => ({
            programId: config.id,
            slotId: slot.id,
            affiliation,
            label: `${config.name}: ${section.name}: ${slot.label}`,
          }));
      });
    });
  }, [modal, majorConfig, minorConfigs, cotermConfig, additionalMajors, additionalMajorConfigs, selectedTracks]);

  const startPlanNameEdit = () => {
    setPlanNameVal(activePlanName);
    setPlanNameEditing(true);
    setTimeout(() => { planNameInputRef.current?.select(); }, 0);
  };
  const commitPlanNameEdit = () => {
    if (planNameVal.trim()) renameScenario(activeScenarioId, planNameVal.trim());
    setPlanNameEditing(false);
  };

  const { user, loading: authLoading } = useAuth();
  const syncingFromCloud = useRef(false);
  const prevUserId = useRef<string | null>(null);
  const lastSavedPlanJson = useRef<string | null>(null);

  // Cloud sync UI state, surfaced by the status toast near the bottom of the tree.
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [cloudSaved, setCloudSaved] = useState(false);
  const [cloudError, setCloudError] = useState<string | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSaved = () => {
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    setCloudSaved(true);
    savedTimerRef.current = setTimeout(() => setCloudSaved(false), 4000);
  };

  // Load plan on login; auto-save store changes back to cloud.
  useEffect(() => {
    if (!user) {
      if (prevUserId.current !== null) {
        // Account data must never remain visible or become another account's
        // guest seed after sign-out.
        resetToGuestPlan();
        setCloudSaved(false);
        setCloudSyncing(false);
        setCloudLoading(false);
        setCloudError(null);
        lastSavedPlanJson.current = null;
      }
      prevUserId.current = null;
      return;
    }

    // @stanford.edu gate - set VITE_REQUIRE_STANFORD_EMAIL=true to enforce
    const email = user.email ?? '';
    if (import.meta.env.VITE_REQUIRE_STANFORD_EMAIL === 'true' && !email.endsWith('@stanford.edu')) {
      signOutUser();
      setCloudError('Please sign in with your @stanford.edu Google account.');
      return;
    }

    prevUserId.current = user.uid;

    // Block the subscription while we're loading so cloud data doesn't
    // immediately trigger a write back.
    syncingFromCloud.current = true;
    setCloudLoading(true);
    setCloudError(null);

    loadPlan(user.uid)
      .then(stored => {
        setCloudLoading(false);

        if (!stored) {
          syncingFromCloud.current = false;
          // First sign-in adopts the complete guest plan, even if it contains
          // selections or manual inputs but no course cards.
          const planData = extractPlanData(usePlannerStore.getState());
          const planJson = JSON.stringify(planData);
          setCloudSyncing(true);
          savePlan(user.uid, planData)
            .then(() => {
              lastSavedPlanJson.current = planJson;
              setCloudSyncing(false);
              showSaved();
            })
            .catch((err) => { console.error('[backend] initial push failed:', err); setCloudSyncing(false); setCloudError(firebaseErrMsg(err)); });
          return;
        }

        // An existing account always uses Firestore as ground truth, including
        // an intentionally empty plan. Guest content is adopted only when the
        // account has no plan document at all (handled above).
        hydrateStore(stored.plan_data);
        lastSavedPlanJson.current = JSON.stringify(extractPlanData(usePlannerStore.getState()));
        const hydratedState = usePlannerStore.getState();
        const hasSavedCourses =
          Object.keys(hydratedState.cards).length > 0 ||
          hydratedState.scenarios.some(scenario => Object.keys(scenario.data.cards).length > 0);
        if (hasSavedCourses && !hydratedState.bannerDismissed) {
          // Returning users with an established plan no longer need the
          // first-time setup banner, even if they never dismissed it manually.
          hydratedState.setBannerDismissed(true);
        }
        setTimeout(() => { syncingFromCloud.current = false; }, 0);
        showSaved();
      })
      .catch((err) => {
        console.error('[backend] load failed:', err);
        setCloudLoading(false);
        syncingFromCloud.current = false;
        setCloudError(firebaseErrMsg(err));
      });

    let timer: ReturnType<typeof setTimeout>;
    const unsub = usePlannerStore.subscribe(() => {
      if (syncingFromCloud.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const planData = extractPlanData(usePlannerStore.getState());
        const planJson = JSON.stringify(planData);
        if (planJson === lastSavedPlanJson.current) return;
        setCloudSyncing(true);
        savePlan(user.uid, planData)
          .then(() => {
            lastSavedPlanJson.current = planJson;
            setCloudSyncing(false);
            showSaved();
          })
          .catch((err) => {
            console.error('[backend] auto-save failed:', err);
            setCloudSyncing(false);
            setCloudError(firebaseErrMsg(err));
          });
      }, 5000);
    });

    return () => { unsub(); clearTimeout(timer); };
  }, [user?.uid]);

  const [termsAccepted, setTermsAccepted] = useState(() => {
    try { return window.localStorage.getItem('cardinal-planner-terms-accepted') === 'true'; } catch { return false; }
  });
  const [showSignInGate, setShowSignInGate] = useState(false);
  const [signInGateChecked, setSignInGateChecked] = useState(false);
  const [signInGateError, setSignInGateError] = useState<string | null>(null);
  const [signInGateLoading, setSignInGateLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [introOpen, setIntroOpen] = useState(false);
  const [setupHelpRequested, setSetupHelpRequested] = useState(false);
  const [setupSignInError, setSetupSignInError] = useState<string | null>(null);
  const [memeMode, setMemeMode] = useState(() => {
    try {
      return window.localStorage.getItem('cardinal-planner-meme-mode') === 'true';
    } catch {
      return false;
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = window.localStorage.getItem('cardinal-planner-color-mode');
      if (saved) return saved === 'dark';
      return true;
    } catch {
      return false;
    }
  });
  const [printOpen, setPrintOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [moveTarget, setMoveTarget] = useState<CourseCard | null>(null);

  const effectiveActiveColor = useMemo(() => {
    if (!darkMode) return activeColor;
    const r = parseInt(activeColor.slice(1, 3), 16);
    const g = parseInt(activeColor.slice(3, 5), 16);
    const b = parseInt(activeColor.slice(5, 7), 16);
    const mix = (c: number) => Math.round(c * 0.55 + 255 * 0.45);
    return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
  }, [activeColor, darkMode]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
  };

  const handleSignInWithTermsCheck = () => {
    if (termsAccepted) return true; // AuthButton proceeds normally
    setShowSignInGate(true);
    setSignInGateChecked(false);
    setSignInGateError(null);
    return false; // tells AuthButton to abort its own sign-in flow
  };

  const setupSteps = [
    { id: 'test-credits', label: '📝 Enter test credits', sub: 'AP, IB, and other exams count automatically', action: () => scrollToSection('section-test-credits') },
    { id: 'major', label: '🎓 Select a major', sub: 'Track requirements and add courses from your major', action: () => scrollToSection('section-major') },
    { id: 'search', label: '🔍 Search & add classes', sub: 'Browse 7,000+ courses, drag into quarters', action: () => openCourseSearch() },
    ...(isFirebaseConfigured && !user ? [{ id: 'sign-in', label: '🔐 Sign in to sync', sub: 'Sign in to save your planning', action: async () => { handleSignInWithTermsCheck(); } }] : []),
  ];
  const remainingSetupSteps = setupSteps.filter(step => !onboardingSteps.includes(step.id));
  const visibleSetupSteps = setupHelpRequested ? setupSteps : remainingSetupSteps;
  const showSetupBanner = setupHelpRequested || (!bannerDismissed && remainingSetupSteps.length > 0);

  const handleSetupStep = async (step: (typeof setupSteps)[number]) => {
    setSetupSignInError(null);
    try {
      await step.action();
      completeOnboardingStep(step.id);
    } catch (error) {
      const code = typeof error === 'object' && error && 'code' in error
        ? String(error.code)
        : '';
      setSetupSignInError(
        code === 'auth/unauthorized-domain'
          ? `Google sign-in is not enabled for ${window.location.hostname}.`
          : code === 'auth/popup-blocked'
            ? 'Your browser blocked the Google sign-in window. Allow popups for this site and try again.'
            : code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request'
              ? null
              : 'Google sign-in could not be completed. Please try again.',
      );
      console.error('[auth] Onboarding sign-in failed:', error);
    }
  };

  useEffect(() => {
    document.body.classList.toggle('meme-mode-active', memeMode);
    try {
      window.localStorage.setItem('cardinal-planner-meme-mode', String(memeMode));
    } catch {
      // The visual preference can remain session-only when storage is unavailable.
    }
    return () => document.body.classList.remove('meme-mode-active');
  }, [memeMode]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode-active', darkMode);
    try {
      window.localStorage.setItem('cardinal-planner-color-mode', darkMode ? 'dark' : 'light');
    } catch {
      // The visual preference can remain session-only when storage is unavailable.
    }
    return () => document.body.classList.remove('dark-mode-active');
  }, [darkMode]);

  const detectAffiliationRef = useRef(detectAffiliation);
  useEffect(() => { detectAffiliationRef.current = detectAffiliation; }, [detectAffiliation]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { dept, number, name } = (e as CustomEvent<{ dept: string; number: string; name?: string }>).detail;
      const synthetic: CatalogCourse = {
        depts: [dept], numbers: [number],
        title: name ?? `${dept} ${number}`,
        units: '', terms: [], ways: [], writing: null,
        college: false, language: false, needsApplication: false,
      };
      const affiliation = detectAffiliationRef.current(dept, number);
      openAdd('unsorted', undefined, synthetic, undefined, affiliation);
    };
    window.addEventListener('grad-tree:add-manually', handler);
    return () => window.removeEventListener('grad-tree:add-manually', handler);
  }, []);

  const bgColor = useMemo(() => {
    const r = parseInt(activeColor.slice(1, 3), 16);
    const g = parseInt(activeColor.slice(3, 5), 16);
    const b = parseInt(activeColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.05)`;
  }, [activeColor]);

  return (
    <div
      className={`app-background min-h-screen overflow-x-clip ${memeMode ? 'meme-mode' : ''}`}
      style={{
        '--app-background-color': bgColor,
        '--app-background-image': `url(${memeMode ? cardinalMemeBackground : stanfordQuadBackground})`,
      } as CSSProperties}
    >
      {memeMode && <FearTheTree />}
      <Header
        totalUnits={totalUnits}
        isCoterm={isCoterm}
        cotermUnits={cotermUnits}
        onBrowseCatalog={() => openCourseSearch()}
        onPrint={() => setPrintOpen(true)}
        user={user}
        authLoading={authLoading}
        onBeforeSignIn={handleSignInWithTermsCheck}
      />
      <ScenarioBar onCompare={() => setCompareOpen(true)} />
      <SectionTabs />

      <main className="px-3 sm:px-6 lg:px-10 py-3 sm:py-6 pb-8">

        {/* Plan name - inline editable */}
        <div className="mb-3 sm:mb-5 flex items-center gap-1.5 sm:gap-2 group/planname">
          <div className="active-plan-dot w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" style={{ backgroundColor: effectiveActiveColor }} />
          {planNameEditing ? (
            <input
              ref={planNameInputRef}
              autoFocus
              value={planNameVal}
              onChange={e => setPlanNameVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') commitPlanNameEdit(); if (e.key === 'Escape') setPlanNameEditing(false); }}
              onBlur={commitPlanNameEdit}
              title="Press Escape to cancel"
              className="active-plan-title font-serif font-bold text-lg sm:text-[20px] outline-none border-b-2 bg-transparent min-w-[120px] w-auto"
              style={{ color: effectiveActiveColor, borderColor: effectiveActiveColor }}
            />
          ) : (
            <button
              onClick={startPlanNameEdit}
              className="active-plan-title font-serif font-bold text-lg sm:text-[20px] hover:opacity-80 transition-opacity text-left"
              style={{ color: effectiveActiveColor }}
            >
              {activePlanName}
            </button>
          )}
          {!planNameEditing && !showDeletePlanConfirm && (
            <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover/planname:opacity-100 transition-opacity">
              <button
                onClick={startPlanNameEdit}
                title="Rename plan"
                aria-label="Rename plan"
                className="w-7 h-7 sm:w-auto sm:h-auto p-1 sm:p-1 text-gray-500 hover:text-gray-700 rounded flex items-center justify-center"
              >
                <Pencil size={12} />
              </button>
              <button
                onClick={() => {
                  const newId = duplicateScenario(activeScenarioId);
                  if (!newId) return;
                  setPlanNameVal(`${activePlanName} (copy)`);
                  setPlanNameEditing(true);
                  setTimeout(() => planNameInputRef.current?.select(), 0);
                }}
                disabled={scenarioCount >= MAX_SCENARIOS}
                title={scenarioCount >= MAX_SCENARIOS ? 'Maximum of 10 plans reached' : 'Duplicate plan'}
                aria-label="Duplicate plan"
                className="w-7 h-7 sm:w-auto sm:h-auto p-1 sm:p-1 text-gray-500 hover:text-gray-700 rounded flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Copy size={12} />
              </button>
              {scenarioCount > 1 && (
                <button
                  onClick={() => setShowDeletePlanConfirm(true)}
                  title="Delete plan"
                  aria-label="Delete plan"
                  className="w-7 h-7 sm:w-auto sm:h-auto p-1 sm:p-1 text-gray-500 hover:text-red-600 rounded flex items-center justify-center"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          )}
          {showDeletePlanConfirm && (
            <div className="flex items-center gap-2 text-[12px]">
              <span className="text-gray-500">Delete &ldquo;{activePlanName}&rdquo;?</span>
              <button
                onClick={() => { deleteScenario(activeScenarioId); setShowDeletePlanConfirm(false); }}
                className="px-2 py-0.5 rounded bg-red-500 text-white hover:bg-red-600 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeletePlanConfirm(false)}
                className="px-2 py-0.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Onboarding prompt - shown until all steps completed or dismissed */}
        {showSetupBanner && (
            <div className="onboarding-glass mb-3 sm:mb-6 rounded-lg sm:rounded-xl bg-cardinal-700 text-white px-3 sm:px-5 py-2.5 sm:py-4">
              <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div>
                  <p className="font-semibold text-sm">Welcome! Here's how to get started:</p>
                  {!setupHelpRequested && (
                    <p className="sm:hidden mt-0.5 text-xs text-white/75">Step {setupSteps.length - remainingSetupSteps.length + 1} of {setupSteps.length}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setBannerDismissed(true);
                    setSetupHelpRequested(false);
                    setSetupSignInError(null);
                  }}
                  className="h-7 sm:h-auto text-white/80 hover:text-white transition-colors text-[11px] sm:text-xs px-2 py-1 shrink-0"
                >
                  Dismiss setup
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {visibleSetupSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => void handleSetupStep(step)}
                    className={`${index > 0 ? 'hidden sm:block' : ''} w-full sm:flex-1 sm:min-w-[130px] bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg px-2.5 sm:px-3 py-2 sm:py-3 text-left transition-colors`}
                  >
                    <p className="font-semibold text-[12px]">{step.label}</p>
                    <p className="text-xs text-white/80 mt-0.5">{step.sub}</p>
                  </button>
                ))}
              </div>
              {setupSignInError && (
                <p role="alert" className="mt-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-xs text-white">
                  {setupSignInError}
                </p>
              )}
            </div>
        )}

        {/* Intro / help panel */}
        <div className="intro-panel planner-glass planner-border mb-3 sm:mb-6 rounded-lg sm:rounded-xl border shadow-sm overflow-hidden backdrop-blur-[2px]">
          <div className="flex items-center">
            <button
              onClick={() => setIntroOpen(v => !v)}
              className="intro-panel-trigger min-w-0 flex-1 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 text-left transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-[16px] sm:text-[17px] font-semibold leading-tight text-gray-800">
                  Plan your entire Stanford degree, not just next quarter
                </span>
                <span className="mt-0.5 text-[11px] sm:text-xs font-medium leading-snug text-gray-600">
                  All quarters, Gen Eds, degrees, and external credits in one place.
                </span>
              </div>
              {introOpen ? <ChevronDown size={14} className="text-gray-400 shrink-0" /> : <ChevronRight size={14} className="text-gray-400 shrink-0" />}
            </button>
            {!showSetupBanner && (
              <button
                onClick={() => {
                  setSetupHelpRequested(true);
                  setSetupSignInError(null);
                }}
                className="mr-2 shrink-0 rounded-md border border-gray-200 px-2 py-1 text-[10px] font-medium text-gray-600 hover:bg-gray-50 hover:text-cardinal-700 transition-colors"
              >
                Setup help
              </button>
            )}
          </div>
          {introOpen && (
            <div className="px-5 pb-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 text-[12px] leading-relaxed text-gray-600">
                <div className="flex flex-col">
                  <p className="py-2"><span className="font-semibold text-gray-800">All quarters at once:</span> drag courses between quarters, search within any quarter, or leave them unscheduled.</p>
                  <p className="py-2"><span className="font-semibold text-gray-800">Automatic requirement tracking:</span> major, minor, coterm, Ways, COLLEGE, Language, and Writing requirements update as you plan.</p>
                  <p className="py-2"><span className="font-semibold text-gray-800">Powerful course search:</span> browse 7,363 courses by department, Way, units, quarter, or requirement.</p>
                  <p className="py-2"><span className="font-semibold text-gray-800">Explore major courses:</span> each major, minor, or coterm requirement slot shows courses that can fulfill it.</p>
                </div>
                <div className="flex flex-col">
                  <p className="py-2"><span className="font-semibold text-gray-800">External test credits:</span> add approved AP, IB, or other exams; eligible units and requirements apply automatically.</p>
                  <p className="py-2"><span className="font-semibold text-gray-800">Prerequisite checks:</span> cards flag missing prerequisites and out-of-order scheduling. Double-click to see what a course requires and unlocks.</p>
                  <p className="py-2"><span className="font-semibold text-gray-800">Compare multiple plans:</span> duplicate and compare different majors, minors, coterms, or course sequences.</p>
                  <p className="py-2"><span className="font-semibold text-gray-800">Sync across devices:</span> plans save locally in your browser; sign in to access them anywhere.</p>
                </div>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                <p className="intro-shortcuts text-[11px] font-medium">
                  Shortcuts: <kbd className="rounded px-1 py-0.5">N</kbd> add course &nbsp;·&nbsp; <kbd className="rounded px-1 py-0.5">⌘Z</kbd> undo &nbsp;·&nbsp; <kbd className="rounded px-1 py-0.5">⌘⇧Z</kbd> / <kbd className="rounded px-1 py-0.5">⌘Y</kbd> redo &nbsp;·&nbsp; <kbd className="rounded px-1 py-0.5">Esc</kbd> clear highlight
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDarkMode(value => !value)}
                    aria-pressed={darkMode}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/60 px-2.5 py-1 text-[11px] font-semibold text-gray-500 transition-colors hover:border-cardinal-200 hover:text-cardinal-700"
                  >
                    {darkMode ? <Sun size={12} /> : <Moon size={12} />}
                    {darkMode ? 'Light mode' : 'Dark mode'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMemeMode(value => !value)}
                    aria-pressed={memeMode}
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      memeMode
                        ? 'border-cardinal-300 bg-cardinal-100 text-cardinal-800 hover:bg-cardinal-200'
                        : 'border-gray-200 bg-white/60 text-gray-500 hover:border-cardinal-200 hover:text-cardinal-700'
                    }`}
                  >
                    Meme mode {memeMode ? 'on' : 'off'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <MissingRequirementsSection
            cards={enrolledCards}
            undergraduateUnits={ugUnits}
            onCompletionStatusChange={handleCompletionStatusChange}
          />

          <section id="section-quarters" className="mb-10 sm:mb-14">
            <QuarterSectionHeader collapsed={quartersCollapsed} onToggle={() => setQuartersCollapsed(v => !v)} />
            {!quartersCollapsed && (<>
            <UnsortedPool
              cards={getOrderedCards('unsorted')}
              onAddClick={() => openCourseSearch(undefined, undefined, 'unsorted')}
              onEditCard={openEdit}
              onDoubleClickCard={handleDoubleClickCard}
              onMoveCard={setMoveTarget}
            />
            <QuarterGrid
              cards={enrolledCards}
              onAddClick={(qId, season) => openCourseSearch(undefined, SEASON_TO_CATALOG[season], qId)}
              onEditCard={openEdit}
              onDoubleClickCard={handleDoubleClickCard}
              onMoveCard={setMoveTarget}
            />
            </>)}
          </section>

          <DragOverlay>
            {activeCard && (() => {
              const dragCatalog = lookupCourse(activeCard.department, activeCard.courseNumber);
              const dragTerms = (dragCatalog?.terms ?? []) as string[];
              const ALL_TERMS = ['Aut', 'Win', 'Spr', 'Sum'] as const;
              return (
                <div className="shadow-xl w-52">
                  <div className="rounded border px-2.5 py-1.5 bg-white border-gray-300 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-gray-500">{activeCard.department} {activeCard.courseNumber}</span>
                      {activeCard.courseName && <span className="text-[11px] text-gray-700 truncate max-w-[120px]">{activeCard.courseName}</span>}
                      {activeCard.units !== null && <span className="text-[10px] text-gray-400 ml-auto">{activeCard.units} units</span>}
                    </div>
                    {dragTerms.length > 0 && (
                      <div className="flex gap-1">
                        {ALL_TERMS.filter(t => dragTerms.includes(t)).map(t => (
                          <span key={t} className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-100 text-red-700">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </DragOverlay>
        </DndContext>

        {/* Bottom popup showing available quarters while dragging */}
        {activeCard && (() => {
          const catalog = lookupCourse(activeCard.department, activeCard.courseNumber);
          const terms = catalog?.terms ?? [];
          const ALL_TERMS = ['Aut', 'Win', 'Spr', 'Sum'] as const;
          if (!catalog) return null;
          return (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <div className="bg-gray-900/90 backdrop-blur-sm text-white rounded-xl px-4 py-2.5 shadow-2xl flex items-center gap-3">
                <span className="text-[11px] font-semibold text-gray-300">Offered:</span>
                <div className="flex items-center gap-1.5">
                  {ALL_TERMS.map(t => (
                    <span key={t} className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-all ${
                      terms.includes(t)
                        ? 'bg-white text-gray-900'
                        : 'bg-white/10 text-white/30'
                    }`}>{t}</span>
                  ))}
                </div>
                {terms.length === 0 && <span className="text-[11px] text-white/50 italic">unknown</span>}
              </div>
            </div>
          );
        })()}

        {/* READY TO TAKE section - hidden for now
        {readySuggestions.length > 0 && (
          <section id="section-suggestions" className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold tracking-[.12em] uppercase text-gray-500">Ready to take</span>
              <span className="text-[10px] text-gray-400">prereqs satisfied by your current plan</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {readySuggestions.map((s: ReadySuggestion) => (
                <button
                  key={`${s.dept}-${s.number}`}
                  onClick={() => {
                    const cat = lookupCourse(s.dept, s.number);
                    if (cat) { handleAddCourseFromMajor(cat); return; }
                    addCard({ department: s.dept, courseNumber: s.number, courseName: s.name ?? '', units: null, priority: 'want' as const, affiliation: 'major' as const, tags: [], notes: '', quarterId: 'unsorted' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-cardinal-300 hover:text-cardinal-700 hover:bg-cardinal-50 transition-colors shadow-sm"
                >
                  <span className="font-mono text-gray-400 text-[10px]">{s.dept} {s.number}</span>
                  {s.name && <span className="text-gray-600 max-w-[120px] truncate">{s.name}</span>}
                  <span className="text-[9px] text-gray-400 ml-1">{s.sectionName}</span>
                </button>
              ))}
            </div>
          </section>
        )}
        */}

        <div className="mb-2 px-0.5">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <span className="font-medium text-gray-500">Unofficial planning tool.</span>{' '}
            Requirements may change or vary by student. Always verify degree and major requirements with official Stanford sources and your department.
          </p>
        </div>

        <div id="section-major">
          <MajorSection
            cards={enrolledCards}
            onAddCourse={handleAddCourseFromMajor}
            onOpenSearch={(slotId, affil, programId) => openCourseSearch(undefined, undefined, 'unsorted', slotId, affil, programId)}
          />
        </div>

        <div id="section-ways">
          <WaysSection
            cards={enrolledCards}
            onAddClick={(way: WayTag) => openCourseSearch(way)}
            onEditCard={openEdit}
            onDoubleClickCard={handleDoubleClickCard}
            completedQuarters={completedQuarters}
          />
        </div>

        <div id="section-writing">
          <WritingSection
            cards={enrolledCards}
            onAddClick={(tag: WritingTag | 'COLLEGE' | 'LANG') => openCourseSearch(tag)}
            onEditCard={openEdit}
            onDoubleClickCard={handleDoubleClickCard}
            completedQuarters={completedQuarters}
            wimCourses={majorConfig?.wimCourses}
            onAddCourse={handleAddCourseFromMajor}
          />
        </div>

        <div id="section-test-credits">
          <TestCreditSection totalTestUnits={testCreditUnits} />
        </div>

        <footer className="mt-12 mb-8 border-t border-gray-200 pt-6 px-2 text-[11px] text-gray-400 leading-relaxed space-y-1.5">
          <p className="font-medium text-gray-500">Planning aid: not an official Stanford record</p>
          <p>For authoritative degree requirements and academic policies, rely on your advisor and Stanford's official resources, including the <a href="https://bulletin.stanford.edu" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Stanford Bulletin</a> and <a href="https://registrar.stanford.edu" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Office of the Registrar</a>.</p>
          <p>
            <button onClick={() => setShowTermsModal(true)} className="underline hover:text-gray-600 transition-colors">Terms of Use</button>
            {' · '}
            <button onClick={() => setShowPrivacyModal(true)} className="underline hover:text-gray-600 transition-colors">Privacy Policy</button>
          </p>
          <p className="text-gray-300">Grad Tree is an independent student project and is not affiliated with, endorsed by, or operated by Stanford University.</p>
        </footer>
      </main>

      <Suspense fallback={<ModalLoading />}>
      {modal?.type === 'add' && (
        <AddClassModal
          defaultQuarterId={modal.quarterId}
          defaultTags={modal.defaultTags}
          prefillCourse={modal.prefillCourse}
          committedWay={modal.committedWay}
          defaultAffiliation={modal.defaultAffiliation}
          defaultRequirementAssignment={requirementTargetForSlot(
            modal.anyApprovedSlotId,
            modal.defaultAffiliation,
            modal.requirementProgramId,
          )}
          requirementChoices={addRequirementChoices.length > 0 ? addRequirementChoices : undefined}
          onReturnToSearch={modal.fromSearchParams ? () => {
            const p = modal.fromSearchParams!;
            setModal({ type: 'course-search', defaultTag: p.defaultTag, filterQuarter: p.filterQuarter, targetQuarterId: p.targetQuarterId, anyApprovedSlotId: p.anyApprovedSlotId, defaultAffiliation: p.defaultAffiliation, requirementProgramId: p.requirementProgramId });
          } : undefined}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === 'edit' && (
        <AddClassModal
          editCard={modal.card}
          requirementChoices={editRequirementChoices}
          onClose={() => setModal(null)}
          onMove={() => { setModal(null); setMoveTarget(modal.card); }}
        />
      )}
      {modal?.type === 'course-search' && (
        <CourseSearchModal
          defaultTag={modal.defaultTag}
          defaultQuarter={modal.filterQuarter}
          activeProgramId={modal.requirementProgramId}
          onSelect={course => {
            const defaultTag = modal.defaultTag;
            const committedWay =
              defaultTag && (WAY_TAGS as string[]).includes(defaultTag) && new Set(course.ways).size > 1
                ? defaultTag as WayTag
                : undefined;
            const detectedAffil = detectAffiliation(course.depts[0] ?? '', course.numbers[0] ?? '');
            const affiliation = modal.defaultAffiliation ?? detectedAffil;
            openAdd(modal.targetQuarterId ?? 'unsorted', undefined, course, committedWay, affiliation, modal.anyApprovedSlotId, modal.requirementProgramId, { defaultTag: modal.defaultTag, filterQuarter: modal.filterQuarter, targetQuarterId: modal.targetQuarterId, anyApprovedSlotId: modal.anyApprovedSlotId, defaultAffiliation: modal.defaultAffiliation, requirementProgramId: modal.requirementProgramId });
          }}
          onClose={() => setModal(null)}
          onManualAdd={() => openAdd(
            modal.targetQuarterId ?? 'unsorted',
            undefined,
            undefined,
            undefined,
            modal.defaultAffiliation,
            modal.anyApprovedSlotId,
            modal.requirementProgramId,
            { defaultTag: modal.defaultTag, filterQuarter: modal.filterQuarter, targetQuarterId: modal.targetQuarterId, anyApprovedSlotId: modal.anyApprovedSlotId, defaultAffiliation: modal.defaultAffiliation, requirementProgramId: modal.requirementProgramId },
          )}
        />
      )}
      </Suspense>
      {/* Sign-in terms gate - shown when sign-in is triggered before terms are accepted */}
      {showSignInGate && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="solid-ui bg-white rounded-xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
            <div>
              <h2 className="font-serif font-semibold text-[17px] text-gray-900 mb-1">Sign in to Grad Tree</h2>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Before signing in, please review and agree to the terms below.
              </p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={signInGateChecked}
                onChange={e => setSignInGateChecked(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-cardinal-700 cursor-pointer"
              />
              <span className="text-[13px] text-gray-700 leading-relaxed">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-cardinal-700 underline hover:text-cardinal-800 font-medium"
                >
                  Terms of Use
                </button>
                {' '}and understand that Grad Tree is an unofficial planning tool. I am responsible for verifying academic requirements with official Stanford sources.
              </span>
            </label>
            {signInGateError && (
              <p role="alert" className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {signInGateError}
              </p>
            )}
            <button
              disabled={!signInGateChecked || signInGateLoading}
              onClick={async () => {
                try { window.localStorage.setItem('cardinal-planner-terms-accepted', 'true'); } catch { /* ok */ }
                setTermsAccepted(true);
                setSignInGateLoading(true);
                setSignInGateError(null);
                try {
                  await signIn();
                  setShowSignInGate(false);
                } catch (error) {
                  const code = typeof error === 'object' && error && 'code' in error ? String((error as {code:string}).code) : '';
                  if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') {
                    setSignInGateError(
                      code === 'auth/unauthorized-domain'
                        ? `Google sign-in is not enabled for ${window.location.hostname}.`
                        : code === 'auth/popup-blocked'
                          ? 'Your browser blocked the sign-in window. Allow popups for this site and try again.'
                          : 'Google sign-in could not be completed. Please try again.',
                    );
                  } else {
                    setShowSignInGate(false);
                  }
                } finally {
                  setSignInGateLoading(false);
                }
              }}
              className="w-full py-2.5 rounded-lg bg-cardinal-700 text-white font-semibold text-sm transition-colors hover:bg-cardinal-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {signInGateLoading ? 'Signing in…' : 'Sign in with Google'}
            </button>
            <button
              onClick={() => setShowSignInGate(false)}
              className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
      {printOpen && <Suspense fallback={null}><PrintView onClose={() => setPrintOpen(false)} /></Suspense>}
      {showCongrats && <CongratulationsModal onClose={() => setShowCongrats(false)} />}
      {compareOpen && <Suspense fallback={null}><CompareView onClose={() => setCompareOpen(false)} /></Suspense>}

      {/* Mobile tap-to-move quarter picker */}
      {moveTarget && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={() => setMoveTarget(null)}>
          <div className="bg-white rounded-t-2xl w-full pb-8 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>
            <div className="px-4 pt-2 pb-4">
              <p className="font-semibold text-gray-900 mb-1 text-sm">
                Move {[moveTarget.department, moveTarget.courseNumber].filter(Boolean).join(' ') || moveTarget.courseName || 'course'} to…
              </p>
              <button
                onClick={() => { moveCard(moveTarget.id, 'unsorted'); setMoveTarget(null); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors mb-3"
              >
                Unscheduled
              </button>
              {([1, 2, 3, 4, ...(showYear5 || isCoterm ? [5] : [])] as const).map(year => {
                const quarters = ALL_QUARTERS.filter(q => q.year === year && (!hideSummer || q.season !== 'SUM'));
                return (
                  <div key={year} className="mb-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                      Year {year}{year === 5 ? ': Coterm' : ''}
                    </p>
                    <div className={`grid gap-1.5 ${hideSummer ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {quarters.map(q => (
                        <button
                          key={q.id}
                          onClick={() => { moveCard(moveTarget.id, q.id); setMoveTarget(null); }}
                          className={`py-2 rounded-lg text-xs font-medium transition-colors
                            ${moveTarget.quarterId === q.id
                              ? 'bg-cardinal-700 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-700 active:bg-cardinal-100'}`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => setMoveTarget(null)}
                className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate course warning */}
      {pendingDuplicate && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="solid-ui bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
            <p className="text-gray-900 text-[15px] leading-snug">This course is already in your plan.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDuplicate}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel add
              </button>
              <button
                onClick={confirmDuplicate}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-cardinal-600 text-white hover:bg-cardinal-700 transition-colors"
              >
                Add a duplicate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cloud sync status. Yields the slot to the error toast below, which
          takes priority whenever a save or load has actually failed. */}
      {user && !cloudError && (cloudLoading || cloudSyncing || cloudSaved) && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-gray-900/90 text-white text-xs px-3 py-2 rounded-xl shadow-xl"
        >
          {cloudLoading ? (
            <><Loader2 size={12} className="animate-spin shrink-0" /><span>Loading your plan</span></>
          ) : cloudSyncing ? (
            <><Loader2 size={12} className="animate-spin shrink-0" /><span>Saving</span></>
          ) : (
            <><Check size={12} className="text-green-400 shrink-0" /><span>Saved</span></>
          )}
        </div>
      )}

      {/* Cloud error toast */}
      {cloudError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl max-w-sm">
          <span className="flex-1">⚠ {cloudError}</span>
          {user && (
            <button
              onClick={() => {
                setCloudError(null);
                setCloudSyncing(true);
                savePlan(user.uid, extractPlanData(usePlannerStore.getState()))
                  .then(() => { setCloudSyncing(false); showSaved(); })
                  .catch((err) => { setCloudSyncing(false); setCloudError(firebaseErrMsg(err)); });
              }}
              className="text-cardinal-300 hover:text-white text-xs font-medium border border-white/20 px-2 py-1 rounded shrink-0"
            >
              Retry
            </button>
          )}
          <button onClick={() => setCloudError(null)} className="text-white/60 hover:text-white text-lg leading-none shrink-0">×</button>
        </div>
      )}

      {/* Sticky footer */}
      <footer className="fixed bottom-0 inset-x-0 z-30 text-center text-[10px] text-gray-400 py-1.5 bg-[var(--glass-chrome)] backdrop-blur-sm border-t border-gray-200/40 pointer-events-none select-none">
        © 2026 Grace Y. Lee. All rights reserved.
      </footer>
    </div>
  );
}
