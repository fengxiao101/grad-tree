import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { usePlannerStore, type PlanSnapshot, toCourseKey } from '../store/usePlannerStore';
import { PlanDocumentContent } from './PrintView';

interface Props {
  onClose: () => void;
}

const COMPARE_OPTIONS = {
  showTags: true,
  showNotes: false,
  showMajor: false,
  showAdditionalMajors: false,
  showMinors: false,
  showCoterm: false,
  showWays: false,
  showGenEd: false,
  showTestCredits: false,
};

function keySet(snap: PlanSnapshot): Set<string> {
  return new Set(Object.values(snap.cards).map(c => toCourseKey(c.department, c.courseNumber)));
}

export function CompareView({ onClose }: Props) {
  const {
    scenarios, activeScenarioId,
    cards, cardOrder, collapsedYears, completedQuarters,
    hideSummer, testCreditChecks, transferCredits, selectedMajorId, userMajors, manualSlotFills,
    selectedMinorIds, userMinors, manualMinorSlotFills, isCoterm, showYear5, selectedCotermId, userCotermConfigs,
    additionalMajors, manualAdditionalMajorSlotFills, selectedTracks, manualLangFulfilled,
  } = usePlannerStore(useShallow(s => ({
    scenarios: s.scenarios,
    activeScenarioId: s.activeScenarioId,
    cards: s.cards,
    cardOrder: s.cardOrder,
    collapsedYears: s.collapsedYears,
    completedQuarters: s.completedQuarters,
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
  })));

  const liveSnap = useMemo<PlanSnapshot>(() => ({
    cards, cardOrder,
    collapsedYears: Array.from(collapsedYears),
    completedQuarters: Array.from(completedQuarters),
    hideSummer, testCreditChecks, transferCredits, selectedMajorId, userMajors, manualSlotFills,
    selectedMinorIds, userMinors, manualMinorSlotFills, isCoterm, showYear5, selectedCotermId, userCotermConfigs,
    additionalMajors, manualAdditionalMajorSlotFills, selectedTracks, manualLangFulfilled,
  }), [cards, cardOrder, collapsedYears, completedQuarters, hideSummer, testCreditChecks, transferCredits, selectedMajorId, userMajors, manualSlotFills, selectedMinorIds, userMinors, manualMinorSlotFills, isCoterm, showYear5, selectedCotermId, userCotermConfigs, additionalMajors, manualAdditionalMajorSlotFills, selectedTracks, manualLangFulfilled]);

  const [leftId, setLeftId] = useState(activeScenarioId);
  const [rightId, setRightId] = useState(
    scenarios.find(s => s.id !== activeScenarioId)?.id ?? scenarios[0].id
  );

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);
  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;
    const onLeft  = () => { if (!syncing.current) { syncing.current = true; right.scrollTop = left.scrollTop;  syncing.current = false; } };
    const onRight = () => { if (!syncing.current) { syncing.current = true; left.scrollTop  = right.scrollTop; syncing.current = false; } };
    left.addEventListener('scroll', onLeft);
    right.addEventListener('scroll', onRight);
    return () => { left.removeEventListener('scroll', onLeft); right.removeEventListener('scroll', onRight); };
  }, []);

  const leftSnap = useMemo(
    () => leftId === activeScenarioId ? liveSnap : (scenarios.find(s => s.id === leftId)?.data ?? liveSnap),
    [leftId, activeScenarioId, liveSnap, scenarios],
  );
  const rightSnap = useMemo(
    () => rightId === activeScenarioId ? liveSnap : (scenarios.find(s => s.id === rightId)?.data ?? liveSnap),
    [rightId, activeScenarioId, liveSnap, scenarios],
  );

  const leftKeys = useMemo(() => keySet(leftSnap), [leftSnap]);
  const rightKeys = useMemo(() => keySet(rightSnap), [rightSnap]);

  const onlyInLeft = useMemo(() => new Set([...leftKeys].filter(k => !rightKeys.has(k))), [leftKeys, rightKeys]);
  const onlyInRight = useMemo(() => new Set([...rightKeys].filter(k => !leftKeys.has(k))), [leftKeys, rightKeys]);
  const inBoth = useMemo(() => [...leftKeys].filter(k => rightKeys.has(k)).length, [leftKeys, rightKeys]);

  const leftLabel = scenarios.find(s => s.id === leftId)?.name ?? 'Plan A';
  const rightLabel = scenarios.find(s => s.id === rightId)?.name ?? 'Plan B';

  return (
    <div className="solid-ui fixed inset-0 z-50 flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-bold text-gray-900">Compare Plans</span>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 flex-wrap">
            {onlyInLeft.size > 0 && (
              <span className="text-red-600 font-medium">{onlyInLeft.size} only in {leftLabel}</span>
            )}
            {onlyInLeft.size > 0 && onlyInRight.size > 0 && <span>·</span>}
            {onlyInRight.size > 0 && (
              <span className="text-red-600 font-medium">{onlyInRight.size} only in {rightLabel}</span>
            )}
            {(onlyInLeft.size > 0 || onlyInRight.size > 0) && inBoth > 0 && <span>·</span>}
            {inBoth > 0 && <span className="text-gray-500">{inBoth} in both</span>}
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Scenario selectors */}
      <div className="grid grid-cols-2 border-b border-gray-100 shrink-0">
        {([['left', leftId, setLeftId, rightId] as const, ['right', rightId, setRightId, leftId] as const]).map(([side, val, set, otherId]) => (
          <div key={side} className={`px-4 py-2 flex items-center gap-2 ${side === 'right' ? 'border-l border-gray-100' : ''}`}>
            <span className="text-[11px] text-gray-400 shrink-0">{side === 'left' ? 'Left:' : 'Right:'}</span>
            <select
              value={val}
              onChange={e => set(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-0"
            >
              {scenarios.map(sc => (
                <option key={sc.id} value={sc.id} disabled={sc.id === otherId}>
                  {sc.name}{sc.id === activeScenarioId ? ' (current)' : ''}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Side-by-side content - reuses PlanDocumentContent exactly as in Print/PDF view */}
      <div className="grid grid-cols-2 flex-1 min-h-0 divide-x divide-gray-100">
        <div ref={leftRef} className="overflow-y-auto p-5 bg-gray-50">
          <div className="bg-white shadow-sm rounded-xl p-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <PlanDocumentContent
              mode="grid"
              options={COMPARE_OPTIONS}
              snapshot={leftSnap}
              highlightKeys={onlyInLeft}
              title={leftLabel}
            />
          </div>
        </div>
        <div ref={rightRef} className="overflow-y-auto p-5 bg-gray-50">
          <div className="bg-white shadow-sm rounded-xl p-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <PlanDocumentContent
              mode="grid"
              options={COMPARE_OPTIONS}
              snapshot={rightSnap}
              highlightKeys={onlyInRight}
              title={rightLabel}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-5 py-2 border-t border-gray-100 bg-white shrink-0 text-[11px] text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-red-50 border border-red-200" />
          Only in this plan (not in the other)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-white border border-gray-200" />
          In both plans
        </span>
      </div>
    </div>
  );
}
