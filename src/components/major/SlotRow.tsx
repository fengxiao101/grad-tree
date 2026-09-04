import { useCallback, useMemo, useRef, useState } from 'react';
import { CheckCircle2, CheckSquare, ChevronDown, ChevronUp, Circle, Info, Square } from 'lucide-react';
import type { CatalogCourse } from '../../data/catalog';
import type { Slot } from '../../data/majorSchema';
import type { Satisfier } from '../../data/testCreditUtils';
import { matchesOption } from '../../utils/majorUtils';
import { REQUIREMENT_STATE_STYLES } from '../../utils/requirementStyles';
import { renderNoteWithLinks } from './helpers';
import { OptionsPopover, PinnedCardChip } from './CourseChips';

// One requirement slot: its label, progress, assigned courses and actions.

// onUnpinCard is threaded down from ProgramBlock but not consumed here yet:
// pinned chips are unpinned through CourseChipHoverCard's own Delete action.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SlotRow({ slot, assigned, fill, setManualSlotFill, onSelect, onOpenSearch, onUnpinCard, bulletinUrl, showCourseProgress = true, showSlotExceptions = false }: {
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
