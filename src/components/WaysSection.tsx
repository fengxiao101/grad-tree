import { useCallback, useEffect, useMemo, useState } from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors, pointerWithin } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { CourseCard, WayTag, TAG_COLORS } from '../types';
import { getWayTags } from '../utils/catalogUtils';
import { WAYS_CONFIG } from '../data/requirements';
import { ClassCard } from './ClassCard';
import { usePlannerStore } from '../store/usePlannerStore';
import { EmptyDropZone } from './EmptyDropZone';
import {
  getPendingRequirementReveal,
  onRequirementReveal,
  requirementElementId,
} from '../utils/requirementNavigation';

interface Props {
  cards: CourseCard[];
  onAddClick: (preTag: WayTag) => void;
  onEditCard: (card: CourseCard) => void;
  onDoubleClickCard?: (card: CourseCard) => void;
  completedQuarters: Set<string>;
}

function WaysDragCard({ card, onEdit, onDoubleClick, sourceWay, contextTag, isCompleted, onDelete }: {
  card: CourseCard;
  onEdit: (c: CourseCard) => void;
  onDoubleClick?: (c: CourseCard) => void;
  sourceWay?: WayTag;
  contextTag?: WayTag;
  isCompleted?: boolean;
  onDelete?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `ways-drag-${card.id}-${sourceWay ?? 'multi'}`,
    data: { cardId: card.id, sourceWay },
  });
  const style = { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0 : 1 };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none">
      <ClassCard card={card} onEdit={onEdit} onDoubleClick={onDoubleClick} contextTag={contextTag} noDrag isCompleted={isCompleted} onDelete={onDelete} />
    </div>
  );
}

function WayDroppable({ wayId, ring, className, onBoxClick, children }: {
  wayId: WayTag;
  ring: string;
  className: string;
  onBoxClick?: () => void;
  children: (isOver: boolean) => React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `way-${wayId}` });
  return (
    <div
      id={requirementElementId({
        area: 'ways',
        requirementId: wayId,
        fallbackSectionId: 'section-ways',
      })}
      ref={setNodeRef}
      className={`${className} ${isOver ? ring : ''} ${onBoxClick ? 'cursor-pointer' : ''}`}
      onClick={onBoxClick}
    >
      {children(isOver)}
    </div>
  );
}

export function WaysSection({ cards, onAddClick, onEditCard, onDoubleClickCard, completedQuarters }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedWays, setExpandedWays] = useState<Set<WayTag>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<CourseCard | null>(null);
  const updateCard = usePlannerStore(s => s.updateCard);
  const removeCard = usePlannerStore(s => s.removeCard);
  const transferCredits = usePlannerStore(s => s.transferCredits);

  useEffect(() => {
    const revealWays = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.area === 'ways') setCollapsed(false);
    };
    revealWays(getPendingRequirementReveal());
    return onRequirementReveal(revealWays);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  );

  const { cardsByWay, multiWayCards, transferFillsByWay } = useMemo(() => {
    const transferFillsByWay = new Map<WayTag, number>();
    for (const way of WAYS_CONFIG) {
      transferFillsByWay.set(way.id, transferCredits.filter(tc => tc.waysTags?.includes(way.id)).length);
    }

    // Build committed-only map (single-way cards + explicitly committed multi-way cards)
    const committedByWay = new Map<WayTag, CourseCard[]>();
    for (const way of WAYS_CONFIG) {
      committedByWay.set(way.id, cards.filter(c =>
        c.tags.includes(way.id) && (getWayTags(c).length === 1 || c.committedWay === way.id)
      ));
    }

    // A way is "complete" based on committed cards + transfer credits
    const wayFull = (wayId: WayTag) => {
      const way = WAYS_CONFIG.find(w => w.id === wayId)!;
      const committed = committedByWay.get(wayId) ?? [];
      const tf = transferFillsByWay.get(wayId) ?? 0;
      return way.unitsRequired
        ? committed.reduce((s, c) => s + (c.units ?? 0), 0) + (tf > 0 ? way.unitsRequired : 0) >= way.unitsRequired
        : committed.length + tf >= way.slots;
    };

    // Auto-commit multi-way cards when only one eligible way is still incomplete
    const autoCommit = new Map<string, WayTag>();
    for (const card of cards) {
      if (getWayTags(card).length <= 1 || card.committedWay) continue;
      const incomplete = getWayTags(card).filter(w => !wayFull(w));
      if (incomplete.length === 1) autoCommit.set(card.id, incomplete[0]);
    }

    const map = new Map<WayTag, CourseCard[]>();
    for (const way of WAYS_CONFIG) {
      map.set(way.id, cards.filter(c =>
        c.tags.includes(way.id) && (
          getWayTags(c).length === 1 ||
          c.committedWay === way.id ||
          autoCommit.get(c.id) === way.id
        )
      ));
    }

    return {
      cardsByWay: map,
      multiWayCards: cards.filter(c => getWayTags(c).length > 1 && !c.committedWay && !autoCommit.has(c.id)),
      transferFillsByWay,
    };
  }, [cards, transferCredits]);

  const cardsForWay = (id: WayTag) => cardsByWay.get(id) ?? [];

  const totalSlots = WAYS_CONFIG.reduce((sum, w) => sum + w.slots, 0);
  const totalWaysCovered = WAYS_CONFIG.reduce((sum, w) => {
    const wayCards = cardsForWay(w.id);
    const tf = transferFillsByWay.get(w.id) ?? 0;
    if (w.unitsRequired) {
      return sum + (wayCards.reduce((s, c) => s + (c.units ?? 0), 0) + (tf > 0 ? w.unitsRequired : 0) >= w.unitsRequired ? 1 : 0);
    }
    return sum + Math.min(wayCards.length + tf, w.slots);
  }, 0);

  const missing = WAYS_CONFIG.filter(w => {
    const wayCards = cardsForWay(w.id);
    const tf = transferFillsByWay.get(w.id) ?? 0;
    if (w.unitsRequired) return wayCards.reduce((s, c) => s + (c.units ?? 0), 0) + (tf > 0 ? w.unitsRequired : 0) < w.unitsRequired;
    return wayCards.length + tf < w.slots;
  });

  const [activeDragData, setActiveDragData] = useState<{ cardId: string; sourceWay?: WayTag } | null>(null);
  const activeDragCard = activeDragData ? cards.find(c => c.id === activeDragData.cardId) ?? null : null;

  const handleWaysDragStart = useCallback((event: DragStartEvent) => {
    const data = (event.active.data.current ?? {}) as { cardId: string; sourceWay?: WayTag };
    setActiveDragData(data);
  }, []);

  const handleWaysDragEnd = useCallback((event: DragEndEvent) => {
    setActiveDragData(null);
    const { active, over } = event;
    if (!over) return;

    const { cardId, sourceWay } = (active.data.current ?? {}) as { cardId: string; sourceWay?: WayTag };
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    const overId = over.id as string;
    if (!overId.startsWith('way-')) return;
    const targetWay = overId.replace('way-', '') as WayTag;

    if (targetWay === sourceWay) return;
    if (!card.tags.includes(targetWay)) return;

    if (getWayTags(card).length > 1) {
      updateCard(card.id, { committedWay: targetWay });
    }
  }, [cards, updateCard]);

  return (
    <section className="mb-8 sm:mb-12">
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <button onClick={() => setCollapsed(v => !v)} className="h-8 sm:h-auto flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            {collapsed ? <ChevronRight size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            <h2 className="font-serif font-semibold text-[17px] text-gray-900">Ways of Thinking &amp; Doing</h2>
          </button>
          <a href="https://ways.stanford.edu/" target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 sm:w-auto sm:h-auto flex items-center justify-center text-gray-500 hover:text-cardinal-700" aria-label="Stanford Ways page">
            <ExternalLink size={12} />
          </a>
          </div>
          {totalWaysCovered > 0 && (
            <span className="text-xs font-semibold text-cardinal-700">{totalWaysCovered}/{totalSlots} filled</span>
          )}
        </div>
        <div className="h-px bg-gradient-to-r from-gray-300 to-transparent mt-2" />
      </div>

      {!collapsed && (<>
      {missing.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <span className="text-[11px] text-gray-400">Still needed:</span>
          {missing.map(w => {
            const wayCards = cardsForWay(w.id);
            const tf = transferFillsByWay.get(w.id) ?? 0;
            const still = Math.max(0, w.slots - wayCards.length - tf);
            const { bg, text } = TAG_COLORS[w.id];
            return (
              <span key={w.id} className={`text-[11px] font-medium rounded px-1.5 py-0.5 ${bg} ${text}`}>
                {w.id}{still > 1 ? ` ×${still}` : ''}
              </span>
            );
          })}
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleWaysDragStart} onDragEnd={handleWaysDragEnd} onDragCancel={() => setActiveDragData(null)}>

        {multiWayCards.length > 0 && (
          <div className="rounded border border-dashed border-gray-300 bg-white p-2.5 sm:p-3 mb-4">
            <p className="text-xs font-medium text-gray-600 mb-0.5">Fulfills Multiple Ways</p>
            <p className="text-[11px] text-gray-500 mb-2">Each course counts toward one Way. Drag it to a Way below that it fulfils - press and hold first on mobile. You can move it later.</p>
            <div className="flex flex-col gap-1.5">
              {multiWayCards.map(card => (
                <WaysDragCard key={card.id} card={card} onEdit={onEditCard} onDoubleClick={onDoubleClickCard} isCompleted={completedQuarters.has(card.quarterId)} onDelete={() => setPendingDelete(card)} />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 auto-rows-[minmax(100px,auto)] sm:[grid-template-rows:minmax(120px,auto)_minmax(120px,auto)_minmax(90px,auto)]">
          {WAYS_CONFIG.map(w => {
            const wayCards = cardsForWay(w.id);
            const tf = transferFillsByWay.get(w.id) ?? 0;
            const ceUnits = w.unitsRequired ? wayCards.reduce((s, c) => s + (c.units ?? 0), 0) : 0;
            const complete = w.unitsRequired
              ? ceUnits + (tf > 0 ? w.unitsRequired : 0) >= w.unitsRequired
              : wayCards.length + tf >= w.slots;
            const { bg, text } = TAG_COLORS[w.id];

            return (
              <WayDroppable
                key={w.id}
                wayId={w.id}
                ring={w.ring}
                className={`requirement-glass rounded p-2 sm:p-3 flex flex-col ${
                  complete ? 'requirement-complete theme-complete-panel border' : `${w.accent} ${w.borderMissing}`
                } ${w.gridPlacement}`}
                onBoxClick={!complete ? () => onAddClick(w.id) : undefined}
              >
                {() => (
                  <>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <span className={`inline-block text-[10px] font-bold rounded px-1.5 py-0.5 mb-1 ${bg} ${text}`}>
                          {w.id}
                        </span>
                        <p className="text-[11px] text-gray-600 leading-tight">{w.label}</p>
                        {w.unitsRequired && (
                          <p className="text-[10px] text-gray-400 mt-0.5">{w.unitsRequired} units minimum</p>
                        )}
                        {w.slots === 2 && !w.unitsRequired && (
                          <p className="text-[10px] text-gray-400 mt-0.5">2 courses required</p>
                        )}
                      </div>
                      <span className={`text-[10px] font-semibold shrink-0 ml-1 ${complete ? 'text-green-600' : 'text-gray-400'}`}>
                        {w.unitsRequired ? `${ceUnits + (tf > 0 ? w.unitsRequired : 0)}/${w.unitsRequired} units` : `${wayCards.length + tf}/${w.slots} courses`}
                      </span>
                    </div>

                    {tf > 0 && (
                      <div className="flex flex-col gap-0.5 mb-1">
                        {transferCredits.filter(tc => tc.waysTags?.includes(w.id)).map(tc => (
                          <div key={tc.id} className="text-[10px] text-sky-700 bg-sky-50 border border-sky-200 rounded px-1.5 py-0.5 leading-tight">
                            ✓ {tc.name || 'Transfer credit'} <span className="text-sky-400">(transfer)</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-1 flex-1">
                      {wayCards.length === 0 && tf === 0 && !complete ? (
                        <EmptyDropZone text="drag or click to search" />
                      ) : (() => {
                        const cap = w.slots + 2;
                        const isExpanded = expandedWays.has(w.id);
                        const shown = isExpanded ? wayCards : wayCards.slice(0, cap);
                        const hidden = wayCards.length > cap ? wayCards.length - cap : 0;
                        return (<>
                          {shown.map(card => (
                            <WaysDragCard key={card.id} card={card} onEdit={onEditCard} onDoubleClick={onDoubleClickCard} sourceWay={w.id} contextTag={w.id} isCompleted={completedQuarters.has(card.quarterId)} onDelete={() => setPendingDelete(card)} />
                          ))}
                          {hidden > 0 && !isExpanded && (
                            <button
                              onClick={e => { e.stopPropagation(); setExpandedWays(prev => { const next = new Set(prev); next.add(w.id); return next; }); }}
                              className="text-[10px] font-medium text-cardinal-600 hover:text-cardinal-800 text-center py-0.5 underline-offset-2 hover:underline"
                            >
                              +{hidden} more
                            </button>
                          )}
                          {isExpanded && (
                            <button
                              onClick={e => { e.stopPropagation(); setExpandedWays(prev => { const next = new Set(prev); next.delete(w.id); return next; }); }}
                              className="text-[10px] font-medium text-gray-400 hover:text-gray-600 text-center py-0.5 underline-offset-2 hover:underline"
                            >
                              Show less ↑
                            </button>
                          )}
                        </>);
                      })()}
                    </div>
                  </>
                )}
              </WayDroppable>
            );
          })}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeDragCard && (
            <div className="cursor-grabbing shadow-xl rotate-1 opacity-90">
              <ClassCard card={activeDragCard} onEdit={() => {}} contextTag={activeDragData?.sourceWay} noDrag isCompleted={false} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
      </>)}

      {pendingDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setPendingDelete(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-5 max-w-sm w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <p className="font-semibold text-gray-900 text-sm mb-1">Remove course from plan?</p>
            <p className="text-xs text-gray-500 mb-4">
              <span className="font-medium text-gray-700">
                {[pendingDelete.department, pendingDelete.courseNumber].filter(Boolean).join(' ') || pendingDelete.courseName || 'This course'}
              </span>
              {' '}will be removed from your entire plan, including the year-by-year schedule.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPendingDelete(null)}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { removeCard(pendingDelete.id); setPendingDelete(null); }}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
