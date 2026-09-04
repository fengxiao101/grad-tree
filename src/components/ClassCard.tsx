import { useRef, useMemo, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { CourseCard, PRIORITY_META, AFFILIATION_META, SectionTag, Affiliation, type CatalogTerm } from '../types';
import { TagBadge } from './TagBadge';
import { PriorityIcon } from './PriorityIcon';
import { usePlannerStore } from '../store/usePlannerStore';
import { useHighlightStore } from '../store/useHighlightStore';
import { computeCardWarnings } from '../utils/courseWarnings';
import { lookupCourse } from '../data/catalog';
import { computeTestCovered, computeTransferCovered } from '../data/testCreditUtils';

interface Props {
  card: CourseCard;
  onEdit: (card: CourseCard) => void;
  onDoubleClick?: (card: CourseCard) => void;
  onMove?: (card: CourseCard) => void;
  contextTag?: SectionTag;
  noDrag?: boolean;
  isCompleted?: boolean;
  onDelete?: () => void;
}

export function ClassCard({ card, onEdit, onDoubleClick, onMove, contextTag, noDrag, isCompleted, onDelete }: Props) {
  const removeCard = usePlannerStore(s => s.removeCard);
  const updateCard = usePlannerStore(s => s.updateCard);
  const allCards = usePlannerStore(s => s.cards);
  const ignoredPrereqCardIds = usePlannerStore(s => s.ignoredPrereqCardIds);
  const testCreditChecks = usePlannerStore(s => s.testCreditChecks);
  const transferCredits = usePlannerStore(s => s.transferCredits);
  const ignoreCardPrereq = usePlannerStore(s => s.ignoreCardPrereq);
  // Select the derived values rather than the whole store: calling
  // useHighlightStore() with no selector subscribes to every field, so each
  // card re-rendered on any highlight change anywhere in the plan.
  const isHighlightActive = useHighlightStore(s => s.centerId !== null);
  const highlightRole = useHighlightStore(s =>
    s.centerId === card.id ? 'center' :
    s.prereqIds.has(card.id) ? 'prereq' :
    s.dependentIds.has(card.id) ? 'dependent' :
    s.centerId !== null ? 'dim' : null
  );
  const testCoveredCourses = useMemo(() => {
    const s = computeTestCovered(testCreditChecks);
    computeTransferCovered(transferCredits).forEach(k => s.add(k));
    return s;
  }, [testCreditChecks, transferCredits]);

  const warnings = useMemo(
    () => computeCardWarnings(card, allCards, ignoredPrereqCardIds, testCoveredCourses),
    [card, allCards, ignoredPrereqCardIds, testCoveredCourses],
  );

  const catalogTerms = useMemo(() => {
    if (!card.department || !card.courseNumber) return null;
    const entry = lookupCourse(card.department, card.courseNumber);
    return entry?.terms?.length ? entry.terms as CatalogTerm[] : null;
  }, [card.department, card.courseNumber]);

  const QUARTER_LABEL: Record<CatalogTerm, string> = { Aut: 'Autumn', Win: 'Winter', Spr: 'Spring', Sum: 'Summer' };
  const seasonWarningText = useMemo(() => {
    if (!catalogTerms?.length) return 'Not offered this quarter';
    const names = catalogTerms.map(q => QUARTER_LABEL[q]);
    if (names.length === 1) return `Only offered in ${names[0]}`;
    if (names.length === 2) return `Only offered in ${names[0]} and ${names[1]}`;
    return `Only offered in ${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  }, [catalogTerms]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id, disabled: !!noDrag });

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // If this card unmounts (deleted, moved, filtered out) within the 250ms
  // single/double-click disambiguation window, the pending timer would
  // otherwise still fire and call onEdit with a stale card reference.
  useEffect(() => () => { if (clickTimer.current) clearTimeout(clickTimer.current); }, []);

  const style = { transform: CSS.Transform.toString(transform), transition };

  const meta = PRIORITY_META[card.priority];
  const affiliationMeta = card.affiliation ? AFFILIATION_META[card.affiliation] : null;
  const cardBg = affiliationMeta ? affiliationMeta.cardBg : meta.cardBg;

  const parts = [
    [card.department, card.courseNumber].filter(Boolean).join(' '),
    card.courseName,
  ].filter(Boolean);
  const displayText = parts.join(' ');

  const highlightRing =
    highlightRole === 'center'    ? 'ring-2 ring-cardinal-500' :
    highlightRole === 'prereq'    ? 'ring-2 ring-green-500' :
    highlightRole === 'dependent' ? 'ring-2 ring-amber-500' : '';

  const dimmed = highlightRole === 'dim';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!noDrag ? listeners : {})}
      {...(!noDrag ? attributes : {})}
      onPointerDown={e => { pointerStart.current = { x: e.clientX, y: e.clientY }; dragged.current = false; }}
      onPointerMove={e => {
        if (pointerStart.current) {
          const dx = e.clientX - pointerStart.current.x;
          const dy = e.clientY - pointerStart.current.y;
          if (dx * dx + dy * dy > 25) dragged.current = true;
        }
      }}
      onClick={e => {
        e.stopPropagation();
        if (dragged.current) return;
        if (!onDoubleClick) { onEdit(card); return; }
        if (clickTimer.current !== null) {
          clearTimeout(clickTimer.current);
          clickTimer.current = null;
          onDoubleClick(card);
        } else {
          clickTimer.current = setTimeout(() => {
            clickTimer.current = null;
            if (!isHighlightActive) onEdit(card);
          }, 250);
        }
      }}
      onContextMenu={e => { e.preventDefault(); onMove?.(card); }}
      title={!noDrag && onDoubleClick ? 'Drag to move · Double-click to highlight prerequisites' : undefined}
      className={`group/card flex flex-col rounded border w-full select-none overflow-hidden
        ${cardBg} ${meta.cardBorder} ${highlightRing}
        ${!noDrag ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
        ${isDragging ? 'shadow-lg z-50' : 'hover:shadow-sm'}
        ${isCompleted ? 'grayscale opacity-60' : ''}
        ${dimmed ? 'opacity-30' : ''}
        transition-all`}
    >
      {/* Season warning banner */}
      {!isCompleted && warnings.season && (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500 text-white text-[10px] font-bold leading-none">
          <AlertTriangle size={10} className="shrink-0" />
          {seasonWarningText}
        </div>
      )}

      {/* Prereq warning banner */}
      {!isCompleted && warnings.prereq && (
        <div className="px-2 py-1 bg-orange-500/90 text-white text-[9px] leading-tight">
          <div className="flex items-start gap-1">
            <AlertTriangle size={9} className="shrink-0 mt-0.5" />
            <span className="flex-1 min-w-0">
              {warnings.prereq.missingCodes.length > 0 && (
                <span><span className="font-bold">Missing prereq: </span>{warnings.prereq.missingCodes.join(', ')}{warnings.prereq.lateCards.length > 0 ? '; ' : ''}</span>
              )}
              {warnings.prereq.lateCards.length > 0 && (
                <span><span className="font-bold">Prereq order: </span>{warnings.prereq.lateCards.join(', ')} scheduled later</span>
              )}
            </span>
            <button
              onPointerDown={e => e.stopPropagation()}
              onClick={e => { e.stopPropagation(); ignoreCardPrereq(card.id); }}
              className="shrink-0 hover:opacity-70 transition-opacity"
              title="Ignore this prereq warning"
            >
              <X size={9} />
            </button>
          </div>
          <p className="mt-0.5 opacity-80 italic line-clamp-2">{warnings.prereq.prereqText}</p>
        </div>
      )}

      <div className="p-2 flex flex-col gap-0.5">
        {/* Row 1: badges (left) | units + trash on hover (right) */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {affiliationMeta ? (
              <span
                onPointerDown={e => e.stopPropagation()}
                onClick={e => {
                  e.stopPropagation();
                  const CYCLE: (Affiliation | undefined)[] = ['major', 'minor', 'co-term', undefined];
                  const idx = CYCLE.indexOf(card.affiliation);
                  const next = CYCLE[(idx + 1) % CYCLE.length];
                  updateCard(card.id, { affiliation: next });
                }}
                title="Click to cycle affiliation (major → minor → coterm → unset)"
                className={`text-[8px] font-bold px-1 py-0.5 rounded-sm border leading-none shrink-0 cursor-pointer hover:opacity-70 transition-opacity
                  ${affiliationMeta.badgeBg} ${affiliationMeta.badgeText} ${affiliationMeta.badgeBorder}`}
              >
                {affiliationMeta.label}
              </span>
            ) : null}
            <PriorityIcon priority={card.priority} size={10} />
            <span className={`text-[9px] font-semibold leading-none ${meta.badgeText}`}>{meta.label}</span>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {(card.units !== null || card.affiliation === 'major') && (
              <span className={`text-[9px] ${card.units !== null ? 'text-gray-400' : 'text-gray-300'}`}>
                {card.units !== null ? `${card.units} units` : '? units'}
              </span>
            )}
            <button
              onPointerDown={e => e.stopPropagation()}
              onClick={e => { e.stopPropagation(); if (onDelete) onDelete(); else removeCard(card.id); }}
              className="opacity-0 group-hover/card:opacity-100 pointer-events-none group-hover/card:pointer-events-auto flex items-center justify-center w-5 h-5 rounded-md text-gray-300 hover:text-red-500 hover:bg-white/70 transition-opacity"
              aria-label="Delete class"
            >
              <Trash2 size={12} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Row 2: course code + name */}
        <p className={`text-[11px] leading-snug break-words
          ${card.priority === 'done' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {displayText || <span className="italic text-gray-400">Unnamed</span>}
        </p>

        {/* Row 3: all tags; contextTag enables the remove button on its specific badge */}
        {card.tags.length > 0 && (
          <div className="flex flex-wrap gap-0.5 mt-0.5">
            {card.tags.map(tag => (
              <TagBadge
                key={tag}
                tag={tag}
                small
                onRemove={contextTag && tag === contextTag ? () => (onDelete ? onDelete() : removeCard(card.id)) : undefined}
              />
            ))}
          </div>
        )}

        {/* Row 4: notes (if any) */}
        {card.notes && (
          <p className="text-[9px] text-gray-400 mt-0.5 leading-snug line-clamp-2 italic" title={card.notes}>
            {card.notes}
          </p>
        )}

      </div>
    </div>
  );
}
