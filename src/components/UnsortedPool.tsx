import { useState, useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { ChevronDown, ChevronRight, Inbox } from 'lucide-react';
import { CourseCard } from '../types';
import { ClassCard } from './ClassCard';

interface Props {
  cards: CourseCard[];
  onAddClick: () => void;
  onEditCard: (card: CourseCard) => void;
  onDoubleClickCard?: (card: CourseCard) => void;
  onMoveCard?: (card: CourseCard) => void;
}

export function UnsortedPool({ cards, onAddClick, onEditCard, onDoubleClickCard, onMoveCard }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: 'unsorted' });
  const [sortAlpha, setSortAlpha] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const displayCards = useMemo(() => {
    if (!sortAlpha) return cards;
    return [...cards].sort((a, b) => {
      const keyA = `${a.department ?? ''} ${a.courseNumber ?? ''} ${a.courseName ?? ''}`.trim().toLowerCase();
      const keyB = `${b.department ?? ''} ${b.courseNumber ?? ''} ${b.courseName ?? ''}`.trim().toLowerCase();
      return keyA.localeCompare(keyB);
    });
  }, [cards, sortAlpha]);

  return (
    <section className="mb-3 sm:mb-5">
      <button
        onClick={() => setCollapsed(v => !v)}
        className="w-full flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 hover:opacity-70 transition-opacity"
      >
        {collapsed
          ? <ChevronRight size={13} className="text-gray-400 shrink-0" />
          : <ChevronDown size={13} className="text-gray-400 shrink-0" />}
        <Inbox size={14} className="text-gray-500 shrink-0" />
        <h2 className="font-serif font-semibold text-base sm:text-[17px] text-gray-800">Unscheduled Courses</h2>
        {cards.length > 0 && (
          <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{cards.length}</span>
        )}
        {!collapsed && cards.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); setSortAlpha(v => !v); }}
            className={`ml-auto text-[11px] font-medium px-2 py-0.5 rounded border transition-colors ${
              sortAlpha
                ? 'bg-cardinal-600 text-white border-cardinal-600'
                : 'text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
            }`}
          >
            {sortAlpha ? 'Sort by order added' : 'Sort A → Z'}
          </button>
        )}
      </button>

      {!collapsed && (
        <div
          ref={setNodeRef}
          onClick={onAddClick}
          className={`quarter-glass min-h-[60px] sm:min-h-[72px] rounded border-2 border-dashed transition-colors p-2 sm:p-3 cursor-pointer
            ${isOver ? 'theme-drop-target' : 'planner-border bg-white hover:bg-white/70'}`}
        >
          {cards.length === 0 ? (
            <div className="flex items-center justify-center h-10 text-sm font-medium text-gray-500">
              Drag classes here or click to add
            </div>
          ) : (
            <SortableContext items={cards.map(c => c.id)} strategy={horizontalListSortingStrategy}>
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {displayCards.map(card => (
                  <ClassCard key={card.id} card={card} onEdit={onEditCard} onDoubleClick={onDoubleClickCard} onMove={onMoveCard} />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      )}
    </section>
  );
}
