import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  GraduationCap, ChevronDown, ChevronRight, CheckCircle2, CheckSquare, Square, Circle,
  Info, ChevronUp, X, BookMarked, Layers, Loader2, ExternalLink,
} from 'lucide-react';
import { lookupCourse, type CatalogCourse } from '../data/catalog';
import { EMPTY_FILL, getAccent, renderNoteWithLinks } from './major/helpers';
import { CollapsibleHeader } from './major/CollapsibleHeader';
import { useDarkMode } from '../hooks/useDarkMode';
import { OptionsPopover, PinnedCardChip } from './major/CourseChips';
import { usePlannerStore } from '../store/usePlannerStore';
import {
  BUILT_IN_COTERM_OPTIONS,
  BUILT_IN_MAJOR_OPTIONS,
  BUILT_IN_MINOR_OPTIONS,
  type ProgramSummary,
} from '../data/programRegistry';
import { useProgramConfig, useProgramConfigs } from '../hooks/useProgramConfigs';
import { getTestCreditSatisfiers, getTransferSatisfiers } from '../data/testCreditUtils';
import { parseHighUnit } from '../utils/catalogUtils';
import { getRequirementStateStyles, REQUIREMENT_STATE_STYLES } from '../utils/requirementStyles';
import {
  getPendingRequirementReveal,
  onRequirementReveal,
  requirementElementId,
  type RequirementArea,
} from '../utils/requirementNavigation';
import type { Satisfier } from '../data/testCreditUtils';
import type { MajorConfig, MajorSection as MajorSectionType, MetaRequirement, Slot, Track } from '../data/majorSchema';
import {
  type Affiliation,
  type CourseCard,
  type RequirementAssignment,
} from '../types';
import {
  calculateRequirementUnits,
  computeAssignments,
  countSectionSlots,
  calculateSectionUnits,
  calculateProgramAssignedUnits,
  isSectionVerificationComplete,
  countSections,
  countSlots,
  getExcludeCardIds,
  getPinnedShareableCardIds,
  getShareableCardIds,
  getManualExcludeCardIds,
  getManualSlotCourseCards,
  getMetaRequirementCounts,
  getMetaRequirementPresentation,
  getProgramRequirementDisplayItems,
  getProgramMetaRequirements,
  getProgramSections,
  getEffectiveProgramSections,
  matchesOption,
  metaRequirementToSection,
  sectionHasRequirement,
} from '../utils/majorUtils';

// ── Helpers ───────────────────────────────────────────────────────────────────


// ── Shared accent color classes ───────────────────────────────────────────────


// ── Collapsible section header ────────────────────────────────────────────────


// ── Course hover card portal ──────────────────────────────────────────────────


// ── Course chip ───────────────────────────────────────────────────────────────




// ── Slot row ──────────────────────────────────────────────────────────────────



// onUnpinCard is threaded down from ProgramBlock but not consumed here yet:
// pinned chips are unpinned through CourseChipHoverCard's own Delete action.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SlotRow({ slot, assigned, fill, setManualSlotFill, onSelect, onOpenSearch, onUnpinCard, bulletinUrl, showCourseProgress = true, showSlotExceptions = false }: {
  slot: Slot;
  assigned: Satisfier[];
  fill: { checked: boolean; note: string };
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (c: CatalogCourse, slotId: string) => void;
  onOpenSearch?: (slotId: string) => void;
  onUnpinCard?: (cardId: string) => void;
  bulletinUrl?: string;
  showCourseProgress?: boolean;
  showSlotExceptions?: boolean;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const needed = slot.times ?? slot.count ?? 1;
  const filled = assigned.length;
  const hasRequirement = needed > 0;

  // isUnitMinSlot: pick-from-list with minUnits and no count - unit progress is the sole badge
  const isUnitMinSlot = slot.type === 'pick-from-list' && slot.minUnits != null && slot.count == null && slot.times == null;
  // unitTotal: computed whenever minUnits is set, for any slot type
  const unitTotal = useMemo(() => {
    if (slot.minUnits == null) return null;
    const seenGroups = new Set<string>();
    return assigned.reduce((sum, s) => {
      if (s.kind === 'test' || s.kind === 'transfer') {
        if (seenGroups.has(s.groupId)) return sum;
        seenGroups.add(s.groupId);
        return sum + s.units;
      }
      return sum + (s.card.units ?? 0);
    }, 0);
  }, [slot.minUnits, assigned]);

  const handleMouseEnter = useCallback(() => {
    if (slot.options.length === 0) return;
    hoverTimer.current = setTimeout(() => setShowOptions(true), 120);
  }, [slot.options.length]);
  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  if (slot.type === 'manual') {
    const isComplete = fill.checked;
    const rowClass = isComplete
      ? REQUIREMENT_STATE_STYLES.complete.row
      : slot.optional ? REQUIREMENT_STATE_STYLES.neutral.row : REQUIREMENT_STATE_STYLES.incomplete.row;
    return (
      <div className={`rounded-lg px-3 py-2 ${rowClass}`}>
        <button
          type="button"
          onClick={() => setManualSlotFill(slot.id, { checked: !fill.checked })}
          className="flex w-full items-start gap-2.5 text-left"
          aria-pressed={fill.checked}
        >
          <span className="shrink-0 mt-0.5">
            {isComplete
              ? <CheckCircle2 size={14} className="text-green-500" />
              : <Circle size={14} className="text-gray-400" />}
          </span>
          <span className="flex-1 min-w-0">
            <span className={`block font-medium text-[13px] ${isComplete ? 'text-green-800' : 'text-gray-700'}`}>
              {slot.label}
            </span>
            {slot.note && (
              <span className="flex items-start gap-1 mt-0.5 text-[10px] text-gray-400 leading-relaxed">
                <Info size={9} className="shrink-0 mt-0.5" />
                <span>{renderNoteWithLinks(slot.note)}</span>
              </span>
            )}
          </span>
          <span className={`shrink-0 text-[10px] font-semibold ${isComplete ? 'text-green-600' : 'text-gray-400'}`}>
            {isComplete ? 'Completed' : 'Mark complete'}
          </span>
        </button>
        {isComplete && (
          <input
            type="text"
            value={fill.note}
            onChange={e => setManualSlotFill(slot.id, { note: e.target.value })}
            placeholder="Optional note"
            aria-label={`${slot.label} completion note`}
            className="mt-1.5 w-full text-[11px] border border-gray-200 rounded px-2 py-1 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-green-300 bg-white"
          />
        )}
      </div>
    );
  }

  if (slot.type === 'any-approved') {
    const filledCount = assigned.length;
    const automaticallyVerified = assigned.length > 0
      && slot.options.length > 0
      && assigned.every(satisfier => {
        const [dept, number] = satisfier.kind === 'card'
          ? [satisfier.card.department, satisfier.card.courseNumber]
          : [satisfier.dept, satisfier.number];
        return slot.options.some(option => matchesOption(dept, number, option));
      });
    const verified = Boolean(fill?.checked || automaticallyVerified);
    const unitsMet = slot.minUnits == null || (unitTotal != null && unitTotal >= slot.minUnits);
    const isComplete = filledCount >= needed && verified && unitsMet;
    const rowClass = isComplete
      ? REQUIREMENT_STATE_STYLES.complete.row
      : slot.optional ? REQUIREMENT_STATE_STYLES.neutral.row : REQUIREMENT_STATE_STYLES.incomplete.row;
    return (
      <div className={`rounded-lg text-sm px-3 py-2 flex items-start gap-2.5 ${rowClass}`}>
        <div className="shrink-0 mt-0.5">
          {isComplete
            ? <CheckCircle2 size={14} className="text-green-500" />
            : <Circle size={14} className={slot.optional ? 'text-gray-300' : 'text-gray-400'} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-medium text-[13px] ${isComplete ? 'text-green-800' : 'text-gray-700'}`}>
              {slot.label}
            </span>
            {showCourseProgress && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {filledCount}/{needed} {needed === 1 ? 'course' : 'courses'}
              </span>
            )}
            {slot.minUnits != null && unitTotal !== null && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${(unitTotal ?? 0) >= slot.minUnits ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {unitTotal}/{slot.minUnits} units
              </span>
            )}
            {slot.minLevel && (
              <span className="text-[9px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-1 py-0.5">{slot.minLevel}+ level</span>
            )}
            {(slot.listUrl ?? bulletinUrl) && (
              <a
                href={slot.listUrl ?? bulletinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                className="text-[10px] font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-1.5 py-0.5 transition-colors"
              >
                View official bulletin rules →
              </a>
            )}
            {onOpenSearch && (
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); onOpenSearch(slot.id); }}
                className="text-[10px] font-medium text-cardinal-600 hover:text-cardinal-800 border border-cardinal-200 rounded px-1.5 py-0.5 transition-colors"
              >
                Search &amp; add →
              </button>
            )}
            {slot.options.length > 0 && (
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); setShowOptions(value => !value); }}
                className="text-[10px] font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded px-1.5 py-0.5 transition-colors"
              >
                {showOptions ? 'Hide' : 'View'} approved courses ({slot.options.length}){onOpenSearch ? ': Not exhaustive' : ''}
              </button>
            )}
          </div>
          {assigned.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {assigned.map(s => s.kind === 'card' ? (
                <PinnedCardChip key={s.card.id} card={s.card} forceDuplicate={(slot.times ?? 1) > 1} />
              ) : (
                <span key={s.id} className={`text-[10px] font-medium px-1.5 py-0.5 rounded ring-1 ${s.kind === 'transfer' ? 'bg-sky-50 text-sky-700 ring-sky-200' : 'bg-green-50 text-green-700 ring-green-200'}`} title={`${s.dept} ${s.number}`}>
                  {s.label}
                </span>
              ))}
            </div>
          )}
          {onOpenSearch && (
            <div className="flex items-center gap-1.5 mt-1">
              <button
                onPointerDown={e => e.stopPropagation()}
                onClick={e => {
                  e.stopPropagation();
                  if (!automaticallyVerified) setManualSlotFill(slot.id, { checked: !fill.checked });
                }}
                className="shrink-0 text-gray-400 hover:text-green-600 transition-colors"
                aria-label={automaticallyVerified ? 'Approved courses verified automatically' : 'Verify courses satisfy this requirement'}
              >
                {verified
                  ? <CheckSquare size={13} className="text-green-500" />
                  : <Square size={13} />}
              </button>
              <p className="text-[11px] text-red-700 leading-tight">
                Verify {needed === 1 ? 'this course satisfies' : 'these courses satisfy'} the requirement before checking.
              </p>
            </div>
          )}
          {slot.note && (
            <p className="text-[11px] text-red-700 mt-0.5 leading-relaxed flex items-start gap-1">
              <Info size={9} className="shrink-0 mt-0.5" />
              <span>{renderNoteWithLinks(slot.note)}</span>
            </p>
          )}
          {showOptions && slot.options.length > 0 && (
            <div className="mt-2">
              <OptionsPopover options={slot.options} onSelect={course => onSelect?.(course, slot.id)} />
              {onOpenSearch && (
                <p className="mt-1.5 text-[10px] font-bold text-red-600">
                  Not exhaustive. Search &amp; Add to include other courses.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const unitsMet = slot.minUnits == null || slot.type !== 'pick-from-list' || (unitTotal ?? 0) >= slot.minUnits;
  const complete = hasRequirement && filled >= needed && unitsMet;
  const hasOptions = slot.options.length > 0;
  const inlineLabel = slot.options.length === 1
    ? `${slot.options[0].dept} ${slot.options[0].number}${slot.options[0].name ? `: ${slot.options[0].name}` : ''}`
    : slot.options.length <= 4
      ? slot.options.map(o => `${o.dept} ${o.number}`).join(' or ')
      : null;
  const rowClass = !hasRequirement
    ? REQUIREMENT_STATE_STYLES.neutral.row
    : complete
      ? REQUIREMENT_STATE_STYLES.complete.row
      : slot.optional ? REQUIREMENT_STATE_STYLES.neutral.row : REQUIREMENT_STATE_STYLES.incomplete.row;

  return (
    <div
      className={`rounded-lg text-sm ${rowClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => hasOptions && setShowOptions(v => !v)}
        className={`w-full flex items-start gap-2.5 py-2 px-3 text-left rounded-lg transition-colors
          ${hasOptions ? 'hover:bg-gray-50/80 cursor-pointer' : 'cursor-default'}`}
      >
        <div className="shrink-0 mt-0.5">
          {complete
            ? <CheckCircle2 size={14} className="text-green-500" />
            : <Circle size={14} className={slot.optional ? 'text-gray-300' : 'text-gray-400'} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className={`font-medium text-[13px] ${complete ? 'text-green-800' : slot.optional ? 'text-gray-400' : 'text-gray-700'}`}>
              {slot.label}
            </span>
            {slot.minLevel && (
              <span className="text-[9px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-1 py-0.5">{slot.minLevel}+ level</span>
            )}
            {slot.optional && <span className="text-[10px] text-gray-400 italic">optional</span>}
            {inlineLabel && (
              <span className="text-[11px] text-gray-400">
                {inlineLabel}{(slot.times ?? 0) > 1 ? ` ×${slot.times}` : ''}
              </span>
            )}
            {(slot.times ?? 0) > 1 && !complete && (
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded px-1.5 py-0.5 shrink-0">
                Add {slot.times}× separately
              </span>
            )}
            {(slot.type === 'pick-from-list' || (slot.times ?? 0) > 1) && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full
                ${complete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {!hasRequirement ? 'optional' : isUnitMinSlot ? `${unitTotal ?? 0}/${slot.minUnits} units` : `${filled}/${needed}`}
              </span>
            )}
            {/* Companion unit badge for pick-from-list with both count and minUnits */}
            {!isUnitMinSlot && slot.type === 'pick-from-list' && slot.minUnits != null && unitTotal !== null && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full
                ${(unitTotal ?? 0) >= slot.minUnits ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {unitTotal}/{slot.minUnits} units
              </span>
            )}
          </div>

          {assigned.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {assigned.map(s => s.kind === 'card' ? (
                <PinnedCardChip key={s.card.id} card={s.card} forceDuplicate={(slot.times ?? 1) > 1} />
              ) : (
                <span key={s.id} className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${s.kind === 'transfer' ? 'bg-sky-100 text-sky-700' : 'bg-indigo-100 text-indigo-700'}`} title={`${s.dept} ${s.number}`}>
                  {s.label} ✓ {s.kind === 'transfer' ? 'transfer' : 'test'}
                </span>
              ))}
            </div>
          )}

          {slot.note && (
            <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed flex items-start gap-1">
              <Info size={9} className="shrink-0 mt-0.5" />
              <span>{renderNoteWithLinks(slot.note)}</span>
            </p>
          )}
        </div>

        {hasOptions && (
          <div className="shrink-0 mt-0.5">
            {showOptions
              ? <ChevronUp size={12} className="text-gray-400" />
              : <ChevronDown size={12} className="text-gray-400" />}
          </div>
        )}
      </button>

      {showOptions && slot.options.length > 0 && (
        <div className="px-3 pb-2">
          <OptionsPopover options={slot.options} onSelect={course => onSelect?.(course, slot.id)} />
        </div>
      )}

      {showSlotExceptions && (
        <div className="px-3 pb-1.5">
          <button
            onClick={() => setManualSlotFill(slot.id, { checked: !fill.checked })}
            className={`flex items-center gap-1.5 text-[10px] transition-colors ${
              fill.checked ? 'text-orange-600 font-medium' : 'text-gray-400 hover:text-orange-500'
            }`}
          >
            {fill.checked
              ? <CheckSquare size={11} className="text-orange-500" />
              : <Square size={11} />}
            <span>{fill.checked ? 'Exception: overlap accepted' : 'Exception to accept overlap'}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Pick-one-group section ────────────────────────────────────────────────────

function PickOneGroupSection({
  section,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  onUnpinCard,
  bulletinUrl,
  showSlotExceptions = false,
}: {
  section: MajorSectionType;
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (c: CatalogCourse, slotId: string) => void;
  onOpenSearch?: (slotId: string) => void;
  onUnpinCard?: (cardId: string) => void;
  bulletinUrl?: string;
  showSlotExceptions?: boolean;
}) {
  const groups = section.pickOneGroup!;
  const requiredCount = section.pickGroupCount ?? 1;
  const groupProgress = groups.map(group => {
    const { needed, filled } = countSlots(group.slots, assignments, manualSlotFills);
    return { group, needed, filled, complete: needed > 0 && filled >= needed };
  });
  const completedCount = groupProgress.filter(g => g.complete).length;
  const sectionDone = completedCount >= requiredCount;
  // pick-1-of-N: fade incomplete groups once one is done
  // pick-N-of-M: never fade; show each group independently
  const fadeIncomplete = requiredCount === 1 && sectionDone;

  return (
    <div className="flex flex-col gap-1.5">
      {requiredCount > 1 && (
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            sectionDone ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
          }`}>
            {completedCount}/{requiredCount} areas complete
          </span>
        </div>
      )}
      {groupProgress.map(({ group, needed, filled, complete }, idx) => (
        <React.Fragment key={group.id}>
          {requiredCount === 1 && idx > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          )}
          <div className={`rounded border px-3 py-2 ${
            complete
              ? 'border-green-200 bg-green-50/40'
              : fadeIncomplete
                ? 'border-gray-100 opacity-50'
                : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              {complete
                ? <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                : <Circle size={12} className="text-gray-300 shrink-0" />}
              <span className={`text-[12px] font-semibold ${complete ? 'text-green-800' : 'text-gray-600'}`}>
                {group.name}
              </span>
              {needed > 1 && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ml-auto ${
                  complete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {filled}/{needed}
                </span>
              )}
            </div>
            {group.note && (
              <p className="text-[10px] text-gray-400 mb-1.5 leading-relaxed flex items-start gap-1">
                <Info size={9} className="shrink-0 mt-0.5" />
                <span>{renderNoteWithLinks(group.note)}</span>
              </p>
            )}
            <div className="flex flex-col gap-0.5 pl-2 border-l-2 border-gray-100">
              {group.slots.map(slot => (
                <SlotRow
                  key={slot.id}
                  slot={slot}
                  assigned={assignments.get(slot.id) ?? []}
                  fill={manualSlotFills[slot.id] ?? EMPTY_FILL}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={slot.type === 'any-approved' ? onOpenSearch : undefined}
                  onUnpinCard={onUnpinCard}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions && slot.type !== 'manual' && slot.type !== 'any-approved'}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Section panel ─────────────────────────────────────────────────────────────

function SectionPanel({
  programId,
  programArea,
  section,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  onUnpinCard,
  cards,
  bulletinUrl,
  headerDetail,
  showSlotExceptions = false,
}: {
  programId: string;
  programArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'>;
  section: MajorSectionType;
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (c: CatalogCourse, slotId: string) => void;
  onOpenSearch?: (slotId: string) => void;
  onUnpinCard?: (cardId: string) => void;
  cards: CourseCard[];
  bulletinUrl?: string;
  headerDetail?: string;
  showSlotExceptions?: boolean;
}) {
  const [open, setOpen] = useState(section.phase !== 'pre-major');
  const selectedTracks = usePlannerStore(s => s.selectedTracks);
  const setTrack = usePlannerStore(s => s.setTrack);
  const sectionSelectorKey = `${programId}:${section.id}`;
  const selectedSectionOption = section.selectorOptions?.find(
    option => option.id === selectedTracks[sectionSelectorKey],
  );
  const selectedOptionSections = selectedSectionOption?.sections ?? [];

  useEffect(() => {
    const revealIfMatching = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.programId === programId && detail.requirementId === section.id) setOpen(true);
    };
    revealIfMatching(getPendingRequirementReveal());
    return onRequirementReveal(revealIfMatching);
  }, [programId, section.id]);

  const ownProgress = countSectionSlots(section, assignments, manualSlotFills);
  const selectedOptionProgress = countSections(selectedOptionSections, assignments, manualSlotFills);
  const totalNeeded = ownProgress.needed + selectedOptionProgress.needed;
  const totalFilled = ownProgress.filled + selectedOptionProgress.filled;

  const actualUnits = useMemo(
    () => section.minUnits
      ? calculateSectionUnits(section, assignments, manualSlotFills, cards)
      : 0,
    [section, assignments, manualSlotFills, cards],
  );
  const selectedOptionUnits = useMemo(
    () => selectedSectionOption?.minUnits
      ? calculateRequirementUnits(selectedOptionSections, assignments, manualSlotFills, cards)
      : 0,
    [selectedSectionOption, selectedOptionSections, assignments, manualSlotFills, cards],
  );

  if (section.slots.length === 0 && !section.pickOneGroup?.length && !section.selectorOptions?.length) {
    if (!section.note) return null;
    return (
      <div className="theme-note-panel rounded border px-4 py-3">
        <div className="theme-note-title flex items-center gap-2 text-sm font-semibold">
          <Info size={13} />
          <span>{section.name}</span>
        </div>
        <p className="theme-note-text text-[11px] mt-1 leading-relaxed">{renderNoteWithLinks(section.note)}</p>
      </div>
    );
  }

  const hasRequirement = sectionHasRequirement(section) || Boolean(section.selectorOptions?.length);
  const slotsComplete = totalNeeded === 0 || totalFilled >= totalNeeded;
  const unitsComplete = !section.minUnits || actualUnits >= section.minUnits;
  const selectedOptionComplete = !section.selectorOptions?.length || Boolean(
    selectedSectionOption
    && (!selectedSectionOption.minUnits || selectedOptionUnits >= selectedSectionOption.minUnits),
  );
  const verificationComplete = isSectionVerificationComplete(section, assignments, manualSlotFills);
  const complete = hasRequirement && slotsComplete && unitsComplete && selectedOptionComplete && verificationComplete;
  const stateStyles = getRequirementStateStyles(hasRequirement ? complete : null);

  return (
    <div
      id={requirementElementId({
        area: programArea,
        programId,
        requirementId: section.id,
        fallbackSectionId: 'section-major',
      })}
      data-requirement-program={programId}
      data-requirement-id={section.id}
      className={`requirement-glass rounded border overflow-hidden ${stateStyles.panel}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown size={13} className="text-gray-400" /> : <ChevronRight size={13} className="text-gray-400" />}
          <span className={`text-sm font-semibold ${stateStyles.title}`}>
            {section.name}
          </span>
          {headerDetail && (
            <span className="text-[11px] font-normal text-gray-500">{headerDetail}</span>
          )}
          {section.phase === 'pre-major' && (
            <span className="text-[9px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1 py-0.5">pre-major</span>
          )}
          {section.allowDoubleCount && (
            <span className="text-[9px] text-gray-400 bg-gray-100 rounded px-1 py-0.5">can double-count</span>
          )}
          {section.maxOverlapUnits != null && (
            <span className="text-[9px] text-gray-400 bg-gray-100 rounded px-1 py-0.5">≤{section.maxOverlapUnits} units overlap</span>
          )}
          {section.minUnits && (
            <span className="text-[10px] text-gray-400">
              {section.unitOnly
                ? `${actualUnits}/${section.minUnits} units`
                : `${section.minUnits} units min${actualUnits > 0 ? ` · ${actualUnits} earned` : ''}`}
            </span>
          )}
          {selectedSectionOption?.minUnits && (
            <span className="text-[10px] text-gray-400">
              {selectedOptionUnits}/{selectedSectionOption.minUnits} units
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {totalNeeded > 0 && (
            <span className={`text-[11px] font-semibold ${stateStyles.count}`}>
              {totalFilled}/{totalNeeded}
            </span>
          )}
          {complete && <CheckCircle2 size={13} className={stateStyles.check} />}
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3 flex flex-col gap-0.5">
          {section.selectorOptions && section.selectorOptions.length > 0 && (
            <div className="px-1 pb-2">
              <select
                aria-label={section.selectorLabel ?? `Select an option for ${section.name}`}
                value={selectedSectionOption?.id ?? ''}
                onChange={event => setTrack(sectionSelectorKey, event.target.value || null)}
                className="w-full text-sm border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
              >
                <option value="">{section.selectorLabel ?? 'Select an option'}</option>
                {section.selectorOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          )}
          {section.pickOneGroup?.length
            ? (
              <>
                {section.note && (
                  <p className="text-[10px] text-gray-400 mb-1 leading-relaxed flex items-start gap-1 px-1">
                    <Info size={9} className="shrink-0 mt-0.5" />
                    <span>{renderNoteWithLinks(section.note)}</span>
                  </p>
                )}
                <PickOneGroupSection
                  section={section}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={onUnpinCard}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              </>
            )
            : section.slots.map(slot => (
              <SlotRow
                key={slot.id}
                slot={slot}
                assigned={assignments.get(slot.id) ?? []}
                fill={manualSlotFills[slot.id] ?? EMPTY_FILL}
                setManualSlotFill={setManualSlotFill}
                onSelect={onSelect}
                onOpenSearch={slot.type === 'any-approved' ? onOpenSearch : undefined}
                onUnpinCard={onUnpinCard}
                bulletinUrl={bulletinUrl}
                showCourseProgress={!(section.unitOnly || (
                  section.minUnits != null
                  && section.minCourses == null
                  && slot.count == null
                  && slot.times == null
                ))}
                showSlotExceptions={showSlotExceptions && slot.type !== 'manual' && slot.type !== 'any-approved'}
              />
            ))
          }
          {selectedSectionOption && selectedOptionSections.length > 0 && (
            <div className="space-y-2 pt-1">
              {selectedSectionOption.note && (
                <p className="text-[10px] text-gray-400 px-1">{selectedSectionOption.note}</p>
              )}
              {selectedOptionSections.map(optionSection => (
                <SectionPanel
                  key={optionSection.id}
                  programId={programId}
                  programArea={programArea}
                  section={optionSection}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={onUnpinCard}
                  cards={cards}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Track-selector depth section ──────────────────────────────────────────────

function TrackDepthSection({
  programId,
  programArea,
  section,
  tracks,
  activeTrack,
  onSelectTrack,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  onUnpinCard,
  cards,
  accentColor = 'green',
  bulletinUrl,
  showSlotExceptions = false,
}: {
  programId: string;
  programArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'>;
  section: MajorSectionType;
  tracks: Track[];
  activeTrack: Track | null;
  onSelectTrack: (id: string | null) => void;
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (c: CatalogCourse, slotId: string) => void;
  onOpenSearch?: (slotId: string) => void;
  onUnpinCard?: (cardId: string) => void;
  cards: CourseCard[];
  accentColor?: 'green' | 'teal' | 'sky';
  bulletinUrl?: string;
  showSlotExceptions?: boolean;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const revealIfMatching = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.programId === programId && detail.requirementId === section.id) setOpen(true);
    };
    revealIfMatching(getPendingRequirementReveal());
    return onRequirementReveal(revealIfMatching);
  }, [programId, section.id]);

  const { needed, filled } = useMemo(() => {
    if (!activeTrack) return { needed: 0, filled: 0 };
    return countSections(activeTrack.sections, assignments, manualSlotFills);
  }, [activeTrack, assignments, manualSlotFills]);

  const trackUnits = useMemo(() => {
    if (!activeTrack?.minUnits) return 0;
    const assignedCardIds = new Set<string>();
    const seenTestGroups = new Set<string>();
    let testUnits = 0;
    for (const trackSection of activeTrack.sections) {
      const allSlots = [
        ...trackSection.slots,
        ...(trackSection.pickOneGroup?.flatMap(group => group.slots) ?? []),
      ];
      for (const slot of allSlots) {
        for (const satisfier of assignments.get(slot.id) ?? []) {
          if (satisfier.kind === 'card') assignedCardIds.add(satisfier.card.id);
          else if (!seenTestGroups.has(satisfier.groupId)) {
            seenTestGroups.add(satisfier.groupId);
            testUnits += satisfier.units;
          }
        }
        if (slot.type === 'any-approved') {
          for (const card of getManualSlotCourseCards(manualSlotFills[slot.id], cards)) assignedCardIds.add(card.id);
        }
      }
    }
    const cardUnits = cards
      .filter(card => assignedCardIds.has(card.id))
      .reduce((sum, card) => sum + (card.units ?? parseHighUnit(lookupCourse(card.department, card.courseNumber)?.units ?? '') ?? 0), 0);
    return cardUnits + testUnits;
  }, [activeTrack, assignments, manualSlotFills, cards]);

  const unitsComplete = !activeTrack?.minUnits || trackUnits >= activeTrack.minUnits;
  const verificationComplete = activeTrack?.sections.every(section =>
    isSectionVerificationComplete(section, assignments, manualSlotFills)
  ) ?? true;
  const complete = needed > 0 && filled >= needed && unitsComplete && verificationComplete;

  const accent = getAccent(accentColor);
  const stateStyles = getRequirementStateStyles(complete);

  return (
    <div
      id={requirementElementId({
        area: programArea,
        programId,
        requirementId: section.id,
        fallbackSectionId: 'section-major',
      })}
      className={`requirement-glass rounded border overflow-hidden ${stateStyles.panel}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown size={13} className="text-gray-400" /> : <ChevronRight size={13} className="text-gray-400" />}
          <span className={`text-sm font-semibold ${stateStyles.title}`}>
            {section.name}
          </span>
          {activeTrack && (
            <span className="text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">{activeTrack.name}</span>
          )}
          {activeTrack?.minUnits && (
            <span className="text-[10px] text-gray-400">
              {trackUnits}/{activeTrack.minUnits} units
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {needed > 0 && (
            <span className={`text-[11px] font-semibold ${stateStyles.count}`}>
              {filled}/{needed}
            </span>
          )}
          {complete && <CheckCircle2 size={13} className={stateStyles.check} />}
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2.5">
          {section.note && (
            <p className="text-[10px] text-gray-400 leading-relaxed flex items-start gap-1 px-1 pt-0.5">
              <Info size={9} className="shrink-0 mt-0.5" />
              <span>{section.note}</span>
            </p>
          )}

          <select
            aria-label={`Select a track for ${section.name}`}
            value={activeTrack?.id ?? ''}
            onChange={e => onSelectTrack(e.target.value || null)}
            className={`w-full text-sm border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 ${accent.select}`}
          >
            <option value="">Select a track / concentration</option>
            {tracks.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          {activeTrack && (
            <div className="space-y-2">
              {activeTrack.sections.map(s => (
                <SectionPanel
                  key={s.id}
                  programId={programId}
                  programArea={programArea}
                  section={s}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={onUnpinCard}
                  cards={cards}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetaRequirementsPanel({
  programId,
  programArea,
  requirements,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  cards,
  bulletinUrl,
}: {
  programId: string;
  programArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'>;
  requirements: MetaRequirement[];
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (course: CatalogCourse) => void;
  onOpenSearch?: (slotId: string) => void;
  cards: CourseCard[];
  bulletinUrl?: string;
}) {
  return (
    <>
      {requirements.map(meta => {
        const presentation = getMetaRequirementPresentation(meta);
        return (
          <SectionPanel
            key={meta.id}
            programId={programId}
            programArea={programArea}
            section={metaRequirementToSection(meta)}
            assignments={assignments}
            manualSlotFills={manualSlotFills}
            setManualSlotFill={setManualSlotFill}
            onSelect={onSelect}
            onOpenSearch={onOpenSearch}
            cards={cards}
            bulletinUrl={bulletinUrl}
            headerDetail={presentation.subtitle}
          />
        );
      })}
    </>
  );
}

// ── Dark mode detection & color utilities ─────────────────────────────────────


function lightenHex(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c * 0.55 + 255 * 0.45);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

// ── Program block ─────────────────────────────────────────────────────────────

interface ProgramBlockProps {
  config: MajorConfig;
  cards: CourseCard[];
  testSatisfiers: Satisfier[];
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onAddCourse?: (course: CatalogCourse, target?: RequirementAssignment) => void;
  onOpenSearch?: (slotId: string) => void;
  precomputedAssignments?: Map<string, Satisfier[]>;
  excludeCardIds?: Set<string>;
  shareableCardIds?: Set<string>;
  allowedAffiliations?: Set<Affiliation>;
  headerColor?: 'cardinal' | 'teal' | 'sky';
  accentHex?: string;
  onRemove?: () => void;
  showSlotExceptions?: boolean;
}

function ProgramBlock({
  config,
  cards,
  testSatisfiers,
  manualSlotFills,
  setManualSlotFill,
  onAddCourse,
  onOpenSearch,
  precomputedAssignments,
  excludeCardIds,
  shareableCardIds,
  allowedAffiliations,
  headerColor = 'cardinal',
  accentHex,
  onRemove,
  showSlotExceptions = false,
}: ProgramBlockProps) {
  const isDark = useDarkMode();
  const effectiveAccent = accentHex ? (isDark ? lightenHex(accentHex) : accentHex) : undefined;
  const [open, setOpen] = useState(true);
  const navigationArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'> =
    config.category === 'coterm' ? 'coterm' : config.category === 'minor' ? 'minor' : 'major';
  const selectedTracks = usePlannerStore(s => s.selectedTracks);
  const setTrack = usePlannerStore(s => s.setTrack);
  const updateCard = usePlannerStore(s => s.updateCard);
  const handleUnpinCard = useCallback((cardId: string) => {
    updateCard(cardId, { requirementAssignment: undefined });
  }, [updateCard]);

  useEffect(() => {
    const revealIfMatching = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.programId === config.id) setOpen(true);
    };
    revealIfMatching(getPendingRequirementReveal());
    return onRequirementReveal(revealIfMatching);
  }, [config.id]);

  const activeTrack = config.tracks
    ? (config.tracks.find(t => t.id === selectedTracks[config.id]) ?? null)
    : null;

  // Combine base sections + active track sections for assignment computation
  const effectiveSections = useMemo(
    () => getEffectiveProgramSections(config, selectedTracks),
    [config, selectedTracks],
  );

  const effectiveConfig = useMemo(() => ({ ...config, sections: effectiveSections }), [config, effectiveSections]);
  const selectForRequirement = useCallback(
    (course: CatalogCourse, slotId: string) => onAddCourse?.(course, { programId: config.id, slotId }),
    [config.id, onAddCourse],
  );

  const assignments = useMemo(
    () => precomputedAssignments ?? computeAssignments(effectiveConfig, cards, testSatisfiers, excludeCardIds, allowedAffiliations, shareableCardIds),
    [precomputedAssignments, effectiveConfig, cards, testSatisfiers, excludeCardIds, allowedAffiliations, shareableCardIds],
  );

  const slotProgress = countSections(effectiveSections, assignments, manualSlotFills);
  const selectableSections = useMemo(
    () => [...getProgramSections(config), ...(activeTrack?.sections ?? [])]
      .filter(section => section.selectorOptions?.length),
    [config, activeTrack],
  );
  const selectorNeeded = selectableSections.length;
  const selectorFilled = selectableSections.filter(section =>
    section.selectorOptions?.some(option =>
      option.id === selectedTracks[`${config.id}:${section.id}`]
    )
  ).length;
  const metaRequirements = useMemo(() => getProgramMetaRequirements(config), [config]);
  const metaSatisfied = useMemo(
    () => getMetaRequirementCounts(metaRequirements, assignments),
    [metaRequirements, assignments],
  );
  const metaNeeded = metaRequirements.reduce((sum, meta) => sum + meta.minCount, 0);
  const metaFilled = metaRequirements.reduce(
    (sum, meta) => sum + Math.min(metaSatisfied[meta.id] ?? 0, meta.minCount),
    0,
  );
  const totalNeeded = slotProgress.needed + metaNeeded + selectorNeeded;
  const totalFilled = slotProgress.filled + metaFilled + selectorFilled;

  const unitMinimumPending = useMemo(() => {
    const sectionPending = effectiveSections.some(section =>
      !isSectionVerificationComplete(section, assignments, manualSlotFills)
      || Boolean(section.minUnits && calculateRequirementUnits([section], assignments, manualSlotFills, cards, allowedAffiliations) < section.minUnits)
    );
    const trackPending = Boolean(activeTrack?.minUnits
      && calculateRequirementUnits(activeTrack.sections, assignments, manualSlotFills, cards, allowedAffiliations) < activeTrack.minUnits);
    const selectorPending = selectableSections.some(section => {
      const option = section.selectorOptions?.find(candidate =>
        candidate.id === selectedTracks[`${config.id}:${section.id}`]
      );
      return !option || Boolean(
        option.minUnits
        && calculateRequirementUnits(option.sections ?? [], assignments, manualSlotFills, cards, allowedAffiliations) < option.minUnits
      );
    });
    return sectionPending || trackPending || selectorPending;
  }, [effectiveSections, activeTrack, assignments, manualSlotFills, cards, allowedAffiliations, selectableSections, selectedTracks, config.id]);

  const totalAssignedUnits = useMemo(
    () => config.totalMinUnits ? calculateProgramAssignedUnits(effectiveConfig, assignments, cards) : 0,
    [assignments, cards, config.totalMinUnits, effectiveConfig],
  );

  const colors = {
    cardinal: { dot: 'bg-cardinal-600', countText: 'text-cardinal-700' },
    teal:     { dot: 'bg-teal-600',     countText: 'text-teal-700' },
    sky:      { dot: 'bg-sky-500',       countText: 'text-sky-600' },
  }[headerColor];

  const accentColor = headerColor === 'cardinal' ? 'green' : headerColor === 'teal' ? 'teal' : 'sky';
  const displayedSections = getProgramSections(config);
  const requirementItems = getProgramRequirementDisplayItems(config, displayedSections, metaRequirements.length > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen(v => !v)}
          className="h-8 sm:h-auto flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          {open ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
          {effectiveAccent
            ? <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: effectiveAccent }} />
            : <span className={`w-2 h-2 rounded-full ${colors.dot}`} />}
          <span className="font-semibold text-[14px] text-gray-900">{config.name}</span>
          {totalNeeded > 0 && (
            <span
              className={effectiveAccent ? 'text-xs font-semibold ml-1' : `text-xs font-semibold ml-1 ${colors.countText}`}
              style={effectiveAccent ? { color: effectiveAccent } : undefined}
            >{totalFilled}/{totalNeeded} requirements</span>
          )}
          {(config.totalMinUnits != null || activeTrack?.minUnits != null) && (
            <span
              className={effectiveAccent ? 'text-xs font-semibold' : `text-xs font-semibold ${colors.countText}`}
              style={effectiveAccent ? { color: effectiveAccent } : undefined}
            >
              · {totalAssignedUnits}/{config.totalMinUnits ?? activeTrack?.minUnits} units
            </span>
          )}
          {unitMinimumPending && (
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
              unit minimum pending
            </span>
          )}
        </button>
        {onRemove && (
          <button onClick={onRemove} title="Remove" aria-label={`Remove ${config.name}`} className="w-7 h-7 sm:w-auto sm:h-auto p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex items-center justify-center">
            <X size={13} />
          </button>
        )}
      </div>

      {totalNeeded > 0 && totalFilled < totalNeeded && (() => {
        const incompleteSections = effectiveSections.filter(sec => {
          const { needed, filled } = countSectionSlots(sec, assignments, manualSlotFills);
          return (needed > 0 && filled < needed)
            || !isSectionVerificationComplete(sec, assignments, manualSlotFills);
        });
        const incomplete = [
          ...incompleteSections.map(section => ({ id: `section:${section.id}`, label: section.name })),
          ...metaRequirements
            .filter(meta => (metaSatisfied[meta.id] ?? 0) < meta.minCount)
            .map(meta => ({ id: `meta:${meta.id}`, label: meta.label })),
        ];
        const accent = getAccent(accentColor);
        return incomplete.length > 0 ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-gray-400">Still needed:</span>
            {incomplete.map(item => (
              <span key={item.id} className={`text-[10px] font-medium rounded px-1.5 py-0.5 ${accent.pill}`}>
                {item.label}
              </span>
            ))}
          </div>
        ) : null;
      })()}

      {open && (
        <>
          <p className="text-[11px] text-gray-400 px-1">
            Hover a requirement to see approved courses · Hover a code for details and to add it
          </p>

          <div className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded px-2.5 py-2 flex flex-col gap-1">
            {config.bulletinUrl && (
              <a
                href={config.bulletinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium w-fit"
              >
                <ExternalLink size={11} />
                Link to Official Bulletin
              </a>
            )}
            <span className="text-gray-400">Requirements shown are based on 2025–26. Always verify the latest requirements with official Stanford resources.</span>
          </div>

          {requirementItems.map(item => {
            if (item.kind === 'meta') {
              return (
                <MetaRequirementsPanel
                  key="meta-requirements"
                  programId={config.id}
                  programArea={navigationArea}
                  requirements={metaRequirements}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={course => onAddCourse?.(course)}
                  onOpenSearch={onOpenSearch}
                  cards={cards}
                  bulletinUrl={config.bulletinUrl}
                />
              );
            }
            const { section } = item;
            if (section.trackSelector && config.tracks && config.tracks.length > 0) {
              return (
                <TrackDepthSection
                  key={section.id}
                  programId={config.id}
                  programArea={navigationArea}
                  section={section}
                  tracks={config.tracks}
                  activeTrack={activeTrack}
                  onSelectTrack={trackId => setTrack(config.id, trackId)}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={selectForRequirement}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={handleUnpinCard}
                  cards={cards}
                  accentColor={accentColor as 'green' | 'teal' | 'sky'}
                  bulletinUrl={config.bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              );
            }
            return (
              <SectionPanel
                key={section.id}
                programId={config.id}
                programArea={navigationArea}
                section={section}
                assignments={assignments}
                manualSlotFills={manualSlotFills}
                setManualSlotFill={setManualSlotFill}
                onSelect={selectForRequirement}
                onOpenSearch={onOpenSearch}
                onUnpinCard={handleUnpinCard}
                cards={cards}
                bulletinUrl={config.bulletinUrl}
                showSlotExceptions={showSlotExceptions}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

// ── Searchable program selector ───────────────────────────────────────────────

// Maps id-prefix → canonical dept abbreviation for search keywords.
// Only entries that differ from the prefix itself are listed.
const DEPT_KEYWORD: Record<string, string> = {
  humbi: 'humbio',
  symbo: 'symsys',
  mse: 'ms&e mse management science engineering',
  polisci: 'polisci political science',
  datasci: 'datasci data science ds',
  cs: 'cs computer science',
  ee: 'ee electrical engineering',
  me: 'me mechanical engineering',
  econ: 'econ economics',
  math: 'math mathematics',
  bio: 'bio biology',
  psych: 'psych psychology',
  stats: 'stats statistics',
  music: 'music',
  energy: 'energy science engineering ese',
  pubpol: 'public policy publpol',
  ling: 'linguistics ling',
  socio: 'sociology soc',
  anthro: 'anthropology anthro',
  humrts: 'human rights humrts',
  complit: 'comparative literature complit',
  geoph: 'geophysics geophys',
};

type ProgramOption = Pick<MajorConfig, 'id' | 'name' | 'school' | 'year'> | ProgramSummary;

function programKeywords(m: ProgramOption): string {
  const prefix = m.id.split('-')[0];
  const dept = DEPT_KEYWORD[prefix] ?? prefix;
  return `${dept} ${m.name} ${m.school}`.toLowerCase();
}

interface SearchOption { value: string; label: string; keywords: string; group: string; }

function configsToOptions(configs: ProgramOption[], group: string): SearchOption[] {
  return configs
    .map(m => ({
      value: m.id,
      label: m.name,
      keywords: programKeywords(m),
      group,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// Searchable combobox used by both the persistent selector and the add-minor row.
// resetAfterSelect=true clears the input and shows placeholder again after picking.
function SearchableSelect({
  value, options, onChange, placeholder, resetAfterSelect = false, focusRingClass,
}: {
  value: string;
  options: SearchOption[];
  onChange: (id: string | null) => void;
  placeholder: string;
  resetAfterSelect?: boolean;
  focusRingClass?: string;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen]   = useState(false);
  const containerRef      = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);
  // When closed: show selected label. When open: show live query.
  const inputDisplay = open ? query : (selected?.label ?? '');

  const filtered = query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()) || o.keywords.includes(query.toLowerCase()))
    : options;

  // Group consecutive items (preserves insertion order of groups)
  const grouped = filtered.reduce<{ group: string; items: SearchOption[] }[]>((acc, o) => {
    const last = acc[acc.length - 1];
    if (last?.group === o.group) last.items.push(o);
    else acc.push({ group: o.group, items: [o] });
    return acc;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false); setQuery('');
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  function pick(id: string) {
    onChange(id || null);
    setQuery('');
    setOpen(false);
  }

  const ring = focusRingClass ?? 'focus:ring-cardinal-300';

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        value={inputDisplay}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => { setQuery(''); setOpen(true); }}
        placeholder={placeholder}
        className={`w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 ${ring}`}
      />
      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {!resetAfterSelect && value && (
            <li>
              <button type="button" onMouseDown={e => { e.preventDefault(); pick(''); }}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-50 italic">
                Clear selection
              </button>
            </li>
          )}
          {grouped.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-400 italic">No matches</li>
          )}
          {grouped.map(({ group, items }) => (
            <React.Fragment key={group}>
              {group && (
                <li className="px-3 pt-2 pb-0.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider select-none">
                  {group}
                </li>
              )}
              {items.map(o => (
                <li key={o.value}>
                  <button type="button" onMouseDown={e => { e.preventDefault(); pick(o.value); }}
                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                      o.value === value
                        ? 'bg-cardinal-50 text-cardinal-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                    {o.label}
                  </button>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Program selector row (major / coterm) ─────────────────────────────────────

function ProgramSelectorRow({
  value, builtInOptions, onChange, placeholder, focusRingClass, accentClass,
}: {
  value: string;
  builtInOptions: ProgramOption[];
  onChange: (id: string | null) => void;
  placeholder: string;
  focusRingClass?: string;
  accentClass?: string;
}) {
  const options = configsToOptions(builtInOptions, 'Built-in');

  return (
    <div className="flex items-center gap-2">
      <SearchableSelect
        value={value} options={options} onChange={onChange}
        placeholder={placeholder} focusRingClass={focusRingClass ?? accentClass}
      />
    </div>
  );
}

// ── Minor adder row ───────────────────────────────────────────────────────────

function MinorAdderRow({
  selectedMinorIds, builtInMinors, onAdd,
}: {
  selectedMinorIds: string[];
  builtInMinors: ProgramOption[];
  onAdd: (id: string) => void;
}) {
  const availableBuiltIn = builtInMinors.filter(m => !selectedMinorIds.includes(m.id));
  const options = configsToOptions(availableBuiltIn, 'Built-in');

  return (
    <SearchableSelect
      value="" options={options}
      onChange={id => { if (id) onAdd(id); }}
      placeholder={options.length ? `Select a minor: ${builtInMinors.length} minors supported` : 'No more minors available'}
      resetAfterSelect focusRingClass="focus:ring-teal-300"
    />
  );
}

// ── Single-program pane (shared by Major and Coterm) ────────────────────────

interface SingleProgramPaneProps {
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  onToggle: () => void;
  selectedId: string | null;
  builtInOptions: ProgramOption[];
  config: MajorConfig | null;
  onSelect: (id: string | null) => void;
  accentClass: string;
  headerColor: 'cardinal' | 'sky';
  accentHex?: string;
  cards: CourseCard[];
  testSatisfiers: Satisfier[];
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onAddCourse?: (course: CatalogCourse, target?: RequirementAssignment) => void;
  onOpenSearch?: (slotId: string) => void;
  excludeCardIds?: Set<string>;
  shareableCardIds?: Set<string>;
  allowedAffiliations?: Set<Affiliation>;
}

function SingleProgramPane({
  label, icon, collapsed, onToggle,
  selectedId, builtInOptions, config,
  onSelect,
  accentClass, headerColor, accentHex,
  cards, testSatisfiers, manualSlotFills, setManualSlotFill,
  onAddCourse, onOpenSearch, excludeCardIds, shareableCardIds, allowedAffiliations,
}: SingleProgramPaneProps) {
  return (
    <div>
      <CollapsibleHeader collapsed={collapsed} onToggle={onToggle} icon={icon} label={label} />
      {!collapsed && (
        <div className="space-y-3">
          <ProgramSelectorRow
            value={selectedId ?? ''}
            builtInOptions={builtInOptions}
            onChange={onSelect}
            placeholder={`Select a ${label.toLowerCase()}: ${builtInOptions.length} ${label.toLowerCase()}s supported`}
            accentClass={accentClass}
          />
          {config ? (
            <ProgramBlock
              config={config}
              cards={cards}
              testSatisfiers={testSatisfiers}
              manualSlotFills={manualSlotFills}
              setManualSlotFill={setManualSlotFill}
              onAddCourse={onAddCourse}
              onOpenSearch={onOpenSearch}
              headerColor={headerColor}
              accentHex={accentHex}
              excludeCardIds={excludeCardIds}
              shareableCardIds={shareableCardIds}
              allowedAffiliations={allowedAffiliations}
            />
          ) : selectedId ? (
            <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-4 text-sm text-gray-500">
              <Loader2 size={14} className="animate-spin" />
              Loading program requirements…
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  cards: CourseCard[];
  onAddCourse?: (course: CatalogCourse, target?: RequirementAssignment) => void;
  onOpenSearch?: (slotId: string, affiliation?: Affiliation, programId?: string) => void;
}

export function MajorSection({ cards, onAddCourse, onOpenSearch }: Props) {
  const scenarios             = usePlannerStore(s => s.scenarios);
  const activeScenarioId      = usePlannerStore(s => s.activeScenarioId);
  const activeScenarioColor   = scenarios.find(sc => sc.id === activeScenarioId)?.color;
  const selectedMajorId       = usePlannerStore(s => s.selectedMajorId);
  const setMajor              = usePlannerStore(s => s.setMajor);
  const manualSlotFills       = usePlannerStore(s => s.manualSlotFills);
  const setManualSlotFill     = usePlannerStore(s => s.setManualSlotFill);

  const selectedMinorIds      = usePlannerStore(s => s.selectedMinorIds);
  const addMinor              = usePlannerStore(s => s.addMinor);
  const removeMinor           = usePlannerStore(s => s.removeMinor);
  const manualMinorSlotFills  = usePlannerStore(s => s.manualMinorSlotFills);
  const setManualMinorSlotFill = usePlannerStore(s => s.setManualMinorSlotFill);

  const selectedCotermId      = usePlannerStore(s => s.selectedCotermId);
  const setCoterm             = usePlannerStore(s => s.setCoterm);

  const additionalMajors      = usePlannerStore(s => s.additionalMajors);
  const manualAdditionalMajorSlotFills = usePlannerStore(s => s.manualAdditionalMajorSlotFills);
  const addAdditionalMajor    = usePlannerStore(s => s.addAdditionalMajor);
  const removeAdditionalMajor = usePlannerStore(s => s.removeAdditionalMajor);
  const setAdditionalMajorKind = usePlannerStore(s => s.setAdditionalMajorKind);
  const setManualAdditionalMajorSlotFill = usePlannerStore(s => s.setManualAdditionalMajorSlotFill);

  const testCreditChecks      = usePlannerStore(s => s.testCreditChecks);
  const transferCredits       = usePlannerStore(s => s.transferCredits);
  const selectedTracks        = usePlannerStore(s => s.selectedTracks);

  const [sectionCollapsed, setSectionCollapsed] = useState(false);
  const [majorCollapsed, setMajorCollapsed] = useState(false);
  const [additionalMajorsCollapsed, setAdditionalMajorsCollapsed] = useState(true);
  const [minorsCollapsed, setMinorsCollapsed] = useState(true);
  const [cotermCollapsed, setCotermCollapsed] = useState(true);

  useEffect(() => {
    const revealProgramArea = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (!detail || !['major', 'minor', 'coterm'].includes(detail.area)) return;
      setSectionCollapsed(false);
      if (detail.area === 'major') {
        const isAdditional = detail.programId && additionalMajors.some(am => am.id === detail.programId);
        if (isAdditional) setAdditionalMajorsCollapsed(false);
        else setMajorCollapsed(false);
      }
      if (detail.area === 'minor') setMinorsCollapsed(false);
      if (detail.area === 'coterm') setCotermCollapsed(false);
    };
    revealProgramArea(getPendingRequirementReveal());
    return onRequirementReveal(revealProgramArea);
  }, [additionalMajors]);

  const majorConfig = useProgramConfig(selectedMajorId);
  const selectedMinors = useProgramConfigs(selectedMinorIds);
  const cotermConfig = useProgramConfig(selectedCotermId);
  const additionalMajorIds = useMemo(() => additionalMajors.map(am => am.id), [additionalMajors]);
  const additionalMajorConfigs = useProgramConfigs(additionalMajorIds);

  const testSatisfiers = useMemo(
    () => [...getTestCreditSatisfiers(testCreditChecks), ...getTransferSatisfiers(transferCredits)],
    [testCreditChecks, transferCredits],
  );

  const effectiveMajorConfig = useMemo(() => {
    if (!majorConfig) return null;
    return { ...majorConfig, sections: getEffectiveProgramSections(majorConfig, selectedTracks) };
  }, [majorConfig, selectedTracks]);
  const configuredShareableIds = useMemo(
    () => getPinnedShareableCardIds(
      [
        ...(effectiveMajorConfig ? [effectiveMajorConfig] : []),
        ...selectedMinors.map(minor => ({
          ...minor,
          sections: getEffectiveProgramSections(minor, selectedTracks),
        })),
        ...(cotermConfig ? [{
          ...cotermConfig,
          sections: getEffectiveProgramSections(cotermConfig, selectedTracks),
        }] : []),
        ...additionalMajorConfigs.map(am => ({
          ...am,
          sections: getEffectiveProgramSections(am, selectedTracks),
        })),
      ],
      cards,
    ),
    [effectiveMajorConfig, selectedMinors, cotermConfig, selectedTracks, cards, additionalMajorConfigs],
  );

  const majorAssignments = useMemo(
    () => effectiveMajorConfig
      ? computeAssignments(
          effectiveMajorConfig,
          cards,
          testSatisfiers,
          undefined,
          new Set<Affiliation>(['major']),
          configuredShareableIds,
        )
      : new Map<string, Satisfier[]>(),
    [effectiveMajorConfig, cards, testSatisfiers, configuredShareableIds],
  );
  const majorExcludeIds = useMemo(() => {
    const ids = effectiveMajorConfig ? getExcludeCardIds(effectiveMajorConfig, majorAssignments) : new Set<string>();
    if (effectiveMajorConfig) {
      for (const id of getManualExcludeCardIds(effectiveMajorConfig, manualSlotFills, cards)) ids.add(id);
    }
    return ids;
  }, [effectiveMajorConfig, majorAssignments, manualSlotFills, cards]);
  const majorShareableIds = useMemo(
    () => {
      const ids = new Set(configuredShareableIds);
      if (effectiveMajorConfig) {
        for (const id of getShareableCardIds(effectiveMajorConfig, majorAssignments)) ids.add(id);
      }
      return ids;
    },
    [configuredShareableIds, effectiveMajorConfig, majorAssignments],
  );

  const { additionalMajorAssignments, doubleMajorExcludeIds } = useMemo(() => {
    const assignments = new Map<string, Map<string, Satisfier[]>>();
    const doubleMajorExcludeIds = new Set<string>();
    let accumulatedExcludes = new Set<string>(majorExcludeIds);

    for (const am of additionalMajors) {
      const config = additionalMajorConfigs.find(c => c.id === am.id);
      if (!config) continue;
      const effectiveConfig = { ...config, sections: getEffectiveProgramSections(config, selectedTracks) };

      if (am.kind === 'double') {
        const fills = manualAdditionalMajorSlotFills[am.id] ?? {};
        const slotOverlapExceptions = new Set(
          Object.entries(fills).filter(([, f]) => f.checked).map(([slotId]) => slotId),
        );
        const a = computeAssignments(
          effectiveConfig, cards, testSatisfiers,
          accumulatedExcludes,
          new Set<Affiliation>(['double-major']),
          configuredShareableIds,
          slotOverlapExceptions.size > 0 ? slotOverlapExceptions : undefined,
        );
        assignments.set(am.id, a);
        for (const id of getExcludeCardIds(effectiveConfig, a)) {
          doubleMajorExcludeIds.add(id);
          accumulatedExcludes = new Set([...accumulatedExcludes, id]);
        }
      } else {
        // secondary: no excludes, no affiliation filter - full overlap with any program
        const a = computeAssignments(
          effectiveConfig, cards, testSatisfiers,
          undefined,
          undefined,
          configuredShareableIds,
        );
        assignments.set(am.id, a);
      }
    }

    return { additionalMajorAssignments: assignments, doubleMajorExcludeIds };
  }, [additionalMajors, additionalMajorConfigs, majorExcludeIds, cards, testSatisfiers, configuredShareableIds, selectedTracks, manualAdditionalMajorSlotFills]);

  const { minorAssignments, totalMinorExcludeIds, totalMinorShareableIds } = useMemo(() => {
    const minorAssignments = new Map<string, Map<string, Satisfier[]>>();
    const accumulated = new Set<string>([...majorExcludeIds, ...doubleMajorExcludeIds]);
    const accumulatedShareable = new Set<string>(majorShareableIds);
    for (const minor of selectedMinors) {
      const effectiveMinor = {
        ...minor,
        sections: getEffectiveProgramSections(minor, selectedTracks),
      };
      const a = computeAssignments(
        effectiveMinor,
        cards,
        testSatisfiers,
        accumulated,
        new Set<Affiliation>(['minor']),
        accumulatedShareable,
      );
      minorAssignments.set(minor.id, a);
      for (const id of getExcludeCardIds(effectiveMinor, a)) accumulated.add(id);
      for (const id of getShareableCardIds(effectiveMinor, a)) accumulatedShareable.add(id);
      const minorFills = manualMinorSlotFills[minor.id] ?? {};
      for (const id of getManualExcludeCardIds(effectiveMinor, minorFills, cards)) accumulated.add(id);
    }
    return {
      minorAssignments,
      totalMinorExcludeIds: accumulated,
      totalMinorShareableIds: accumulatedShareable,
    };
  }, [selectedMinors, cards, testSatisfiers, majorExcludeIds, doubleMajorExcludeIds, majorShareableIds, manualMinorSlotFills, selectedTracks]);

  const cotermManualFills = cotermConfig ? (manualMinorSlotFills[cotermConfig.id] ?? {}) : {};
  const cotermSetManualFill = useCallback(
    (slotId: string, fill: { checked?: boolean; note?: string }) => {
      if (cotermConfig) setManualMinorSlotFill(cotermConfig.id, slotId, fill);
    },
    [cotermConfig, setManualMinorSlotFill],
  );

  const majorSections = useMemo(() => effectiveMajorConfig ? getProgramSections(effectiveMajorConfig) : [], [effectiveMajorConfig]);
  const { filled: totalFilled, needed: totalNeeded } = countSections(majorSections, majorAssignments, manualSlotFills);

  void totalFilled; void totalNeeded;

  return (
    <section className="mb-8 sm:mb-12">
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSectionCollapsed(v => !v)}
            className="h-8 sm:h-auto flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          >
            {sectionCollapsed
              ? <ChevronRight size={14} className="text-gray-400" />
              : <ChevronDown size={14} className="text-gray-400" />}
            <GraduationCap size={15} className="text-gray-500" />
            <h2 className="font-serif font-semibold text-[17px] text-gray-900">Academic Programs</h2>
          </button>
        </div>
        <div className="h-px bg-gradient-to-r from-gray-300 to-transparent mt-2" />
      </div>

      {!sectionCollapsed && (
        <div className="space-y-8">

          {/* ── Major ────────────────────────────────────────────────────── */}
          <SingleProgramPane
            label="Major"
            icon={<BookMarked size={13} className="text-cardinal-600" />}
            collapsed={majorCollapsed}
            onToggle={() => setMajorCollapsed(v => !v)}
            selectedId={selectedMajorId}
            builtInOptions={BUILT_IN_MAJOR_OPTIONS}
            config={majorConfig}
            onSelect={id => setMajor(id)}
            accentClass="focus:ring-cardinal-300"
            headerColor="cardinal"
            accentHex={activeScenarioColor}
            cards={cards}
            testSatisfiers={testSatisfiers}
            manualSlotFills={manualSlotFills}
            setManualSlotFill={setManualSlotFill}
            onAddCourse={onAddCourse}
            onOpenSearch={onOpenSearch && majorConfig ? (slotId) => onOpenSearch(slotId, 'major', majorConfig.id) : undefined}
            allowedAffiliations={new Set<Affiliation>(['major'])}
          />

          {/* ── Additional Majors ────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <button
                onClick={() => setAdditionalMajorsCollapsed(v => !v)}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-left"
              >
                {additionalMajorsCollapsed
                  ? <ChevronRight size={13} className="text-gray-400" />
                  : <ChevronDown size={13} className="text-gray-400" />}
                <BookMarked size={13} className="text-rose-600" />
                <span className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">Additional Majors</span>
              </button>
              <a
                href="https://advising.stanford.edu/current-students/advising-student-handbook/double-secondary-dual"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors ml-0.5"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={11} />
              </a>
            </div>

            {!additionalMajorsCollapsed && (
              <div className="space-y-6">
                <p className="text-[11px] leading-relaxed text-red-700 -mt-1">
                  Secondary majors can overlap courses. Double majors generally cannot overlap, but if needed here, you can directly allow exceptions by section.
                </p>
                {additionalMajors.map(am => {
                  const config = additionalMajorConfigs.find(c => c.id === am.id);
                  const isDouble = am.kind === 'double';
                  const affiliation: Affiliation = isDouble ? 'double-major' : 'secondary-major';
                  const headerColor = 'cardinal';
                  return (
                    <div key={am.id} className="space-y-3">
                      <div className="flex items-center gap-2">
                        {/* Double / Secondary toggle */}
                        <div className="flex shrink-0 overflow-hidden rounded border border-gray-200 text-[11px] font-medium">
                          <button
                            type="button"
                            onClick={() => setAdditionalMajorKind(am.id, 'double')}
                            className={`px-2 py-1 transition-colors ${isDouble ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            Double
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdditionalMajorKind(am.id, 'secondary')}
                            className={`px-2 py-1 transition-colors ${!isDouble ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            Secondary
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <ProgramSelectorRow
                            value={am.id}
                            builtInOptions={BUILT_IN_MAJOR_OPTIONS.filter(o =>
                              o.id !== selectedMajorId && !additionalMajors.some(other => other.id !== am.id && other.id === o.id)
                            )}
                            onChange={newId => {
                              if (!newId) {
                                removeAdditionalMajor(am.id);
                              } else if (newId !== am.id) {
                                removeAdditionalMajor(am.id);
                                addAdditionalMajor(newId, am.kind);
                              }
                            }}
                            placeholder="Select a major"
                            accentClass="focus:ring-violet-300"
                          />
                        </div>
                      </div>
                      {config ? (
                        <ProgramBlock
                          config={config}
                          cards={cards}
                          testSatisfiers={testSatisfiers}
                          manualSlotFills={manualAdditionalMajorSlotFills[am.id] ?? {}}
                          setManualSlotFill={(slotId, fill) => setManualAdditionalMajorSlotFill(am.id, slotId, fill)}
                          onAddCourse={onAddCourse}
                          onOpenSearch={onOpenSearch ? (slotId) => onOpenSearch(slotId, affiliation, am.id) : undefined}
                          precomputedAssignments={additionalMajorAssignments.get(am.id)}
                          allowedAffiliations={isDouble ? new Set<Affiliation>(['double-major']) : undefined}
                          headerColor={headerColor}
                          showSlotExceptions={isDouble}
                        />
                      ) : (
                        <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-4 text-sm text-gray-500">
                          <Loader2 size={14} className="animate-spin" />
                          Loading program requirements…
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Adder row */}
                <SearchableSelect
                  value=""
                  options={[
                    ...configsToOptions(
                      BUILT_IN_MAJOR_OPTIONS.filter(o => o.id !== selectedMajorId && !additionalMajors.some(am => am.id === o.id)),
                      'Built-in',
                    ),
                  ]}
                  onChange={id => { if (id) addAdditionalMajor(id, 'double'); }}
                  placeholder={`Add a double or secondary major: ${BUILT_IN_MAJOR_OPTIONS.length} majors supported`}
                  resetAfterSelect
                  focusRingClass="focus:ring-violet-300"
                />
              </div>
            )}
          </div>

          {/* ── Minors ───────────────────────────────────────────────────── */}
          <div>
            <CollapsibleHeader
              collapsed={minorsCollapsed}
              onToggle={() => setMinorsCollapsed(v => !v)}
              icon={<Layers size={13} className="text-teal-600" />}
              label="Minors"
            />

            {!minorsCollapsed && (
              <>
                {selectedMinorIds.length === 0 ? (
                  <div className="space-y-3">
                    <MinorAdderRow
                      selectedMinorIds={selectedMinorIds}
                      builtInMinors={BUILT_IN_MINOR_OPTIONS}
                      onAdd={addMinor}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedMinors.map(minor => (
                      <div key={minor.id} className="space-y-3">
                        <ProgramSelectorRow
                          value={minor.id}
                          builtInOptions={BUILT_IN_MINOR_OPTIONS}
                          onChange={newId => {
                            removeMinor(minor.id);
                            if (newId && newId !== minor.id) addMinor(newId);
                          }}
                          placeholder={`Select a minor: ${BUILT_IN_MINOR_OPTIONS.length} minors supported`}
                          accentClass="focus:ring-teal-300"
                        />
                        <ProgramBlock
                          config={minor}
                          cards={cards}
                          testSatisfiers={testSatisfiers}
                          manualSlotFills={manualMinorSlotFills[minor.id] ?? {}}
                          setManualSlotFill={(slotId, fill) => setManualMinorSlotFill(minor.id, slotId, fill)}
                          onAddCourse={onAddCourse}
                          onOpenSearch={onOpenSearch ? (slotId) => onOpenSearch(slotId, 'minor', minor.id) : undefined}
                          precomputedAssignments={minorAssignments.get(minor.id)}
                          allowedAffiliations={new Set<Affiliation>(['minor'])}
                          headerColor="teal"
                        />
                      </div>
                    ))}
                    <MinorAdderRow
                      selectedMinorIds={selectedMinorIds}
                      builtInMinors={BUILT_IN_MINOR_OPTIONS}
                      onAdd={addMinor}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── Coterm ──────────────────────────────────────────────────── */}
          <SingleProgramPane
            label="Coterm"
            icon={<GraduationCap size={13} className="text-sky-500" />}
            collapsed={cotermCollapsed}
            onToggle={() => setCotermCollapsed(v => !v)}
            selectedId={selectedCotermId}
            builtInOptions={BUILT_IN_COTERM_OPTIONS}
            config={cotermConfig}
            onSelect={setCoterm}
            accentClass="focus:ring-sky-300"
            headerColor="sky"
            cards={cards}
            testSatisfiers={testSatisfiers}
            manualSlotFills={cotermManualFills}
            setManualSlotFill={cotermSetManualFill}
            onAddCourse={onAddCourse}
            onOpenSearch={onOpenSearch && cotermConfig ? (slotId) => onOpenSearch(slotId, 'co-term', cotermConfig.id) : undefined}
            excludeCardIds={totalMinorExcludeIds}
            shareableCardIds={totalMinorShareableIds}
            allowedAffiliations={new Set<Affiliation>(['co-term'])}
          />

        </div>
      )}
    </section>
  );
}
