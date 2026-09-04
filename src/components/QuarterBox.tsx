import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CheckCircle2, Circle, Plus } from 'lucide-react';
import { CourseCard, Quarter } from '../types';
import { ClassCard } from './ClassCard';
import { EmptyDropZone } from './EmptyDropZone';

interface Props {
  quarter: Quarter;
  cards: CourseCard[];
  onAddClick: () => void;
  onEditCard: (card: CourseCard) => void;
  onDoubleClickCard?: (card: CourseCard) => void;
  onMoveCard?: (card: CourseCard) => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function QuarterBox({ quarter, cards, onAddClick, onEditCard, onDoubleClickCard, onMoveCard, isCompleted, onToggleComplete }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: quarter.id });

  const totalUnits = cards.reduce((sum, c) => sum + (c.units ?? 0), 0);
  const fullness = totalUnits <= 0
    ? null
    : totalUnits < 12 || totalUnits >= 19
      ? 'far'
      : totalUnits < 14 || totalUnits > 16
        ? 'near'
        : 'ideal';
  const barColor = fullness === 'far' ? 'bg-red-500' : fullness === 'near' ? 'bg-amber-400' : 'bg-green-500';
  const barWidth = totalUnits > 0 ? Math.min(100, (totalUnits / 20) * 100) : 0;

  return (
    <div
      ref={setNodeRef}
      className={`quarter-glass group/box flex flex-col rounded border transition-colors min-h-[76px] sm:min-h-[90px]
        ${isCompleted ? 'bg-gray-50/80 border-gray-200' : 'bg-white planner-border'}
        ${isOver && !isCompleted ? 'theme-drop-target' : ''}`}
    >
      {/* Quarter header */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100">
        <span className={`text-[10px] font-bold tracking-wide uppercase ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
          {quarter.label}
        </span>
        <div className="flex items-center gap-1">
          {totalUnits > 0 && (
            <span className={`text-[9px] font-semibold
              ${isCompleted ? 'text-gray-500' :
                fullness === 'far' ? 'text-red-600' :
                fullness === 'near' ? 'text-amber-700' :
                'text-green-700'}`}>
              {totalUnits} units
            </span>
          )}
          <button
            onClick={e => { e.stopPropagation(); onToggleComplete(); }}
            className={`h-7 px-1.5 sm:h-auto sm:px-1.5 rounded transition-colors flex items-center justify-center gap-0.5
              ${isCompleted
                ? 'text-green-600 bg-green-50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            aria-label={isCompleted ? 'Mark quarter incomplete' : 'Mark quarter as past (hides warnings)'}
            title={isCompleted ? 'Click to unmark as past' : 'Mark as past, hides prereq warnings'}
          >
            {isCompleted ? <CheckCircle2 size={11} /> : <Circle size={11} />}
            <span className="text-[9px] font-medium">{isCompleted ? 'Past' : 'Past'}</span>
          </button>
          {!isCompleted && (
            <button
              onClick={onAddClick}
              className="w-7 h-7 sm:w-auto sm:h-auto p-1 sm:p-0.5 rounded text-gray-400 hover:text-cardinal-700 hover:bg-cardinal-50 flex items-center justify-center"
              aria-label={`Add class to ${quarter.label}`}
            >
              <Plus size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Unit load bar */}
      {totalUnits > 0 && !isCompleted && (
        <div
          className="theme-unit-track h-1 mx-2.5 rounded-full overflow-hidden"
          role="progressbar"
          aria-label={`${quarter.label} course load`}
          aria-valuenow={totalUnits}
          aria-valuemin={0}
          aria-valuemax={20}
        >
          <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${barWidth}%` }} />
        </div>
      )}

      <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div
          className="flex flex-col gap-1 p-1 sm:p-1.5 flex-1 cursor-pointer"
          onClick={!isCompleted ? onAddClick : undefined}
        >
          {cards.map(card => <ClassCard key={card.id} card={card} onEdit={onEditCard} onDoubleClick={onDoubleClickCard} onMove={onMoveCard} isCompleted={isCompleted} />)}
          {!isCompleted && <EmptyDropZone compact={cards.length > 0} />}
        </div>
      </SortableContext>
    </div>
  );
}
