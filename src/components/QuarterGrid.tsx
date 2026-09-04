import { ChevronDown, ChevronRight } from 'lucide-react';
import { ALL_QUARTERS, CourseCard } from '../types';
import { usePlannerStore } from '../store/usePlannerStore';
import { QuarterBox } from './QuarterBox';

interface Props {
  cards: CourseCard[];
  onAddClick: (quarterId: string, season: string) => void;
  onEditCard: (card: CourseCard) => void;
  onDoubleClickCard?: (card: CourseCard) => void;
  onMoveCard?: (card: CourseCard) => void;
}

const YEAR_LABELS: Record<number, string> = {
  1: 'Year 1: Freshman',
  2: 'Year 2: Sophomore',
  3: 'Year 3: Junior',
  4: 'Year 4: Senior',
  5: 'Year 5: Coterm',
};

const YEAR5_LABEL_COLOR = 'text-sky-600';

export function QuarterGrid({ cards: _cards, onAddClick, onEditCard, onDoubleClickCard, onMoveCard }: Props) {
  const collapsedYears = usePlannerStore(s => s.collapsedYears);
  const completedQuarters = usePlannerStore(s => s.completedQuarters);
  const hideSummer = usePlannerStore(s => s.hideSummer);
  const showYear5 = usePlannerStore(s => s.showYear5);
  const toggleYear = usePlannerStore(s => s.toggleYear);
  const toggleQuarterComplete = usePlannerStore(s => s.toggleQuarterComplete);
  const getOrderedCards = usePlannerStore(s => s.getOrderedCards);

  const visibleYears = showYear5 ? ([1, 2, 3, 4, 5] as const) : ([1, 2, 3, 4] as const);

  const yearUnits = (year: number) =>
    ALL_QUARTERS
      .filter(q => q.year === year && (!hideSummer || q.season !== 'SUM'))
      .flatMap(q => getOrderedCards(q.id))
      .reduce((sum, c) => sum + (c.units ?? 0), 0);

  return (
    <div className="space-y-1 sm:space-y-2">
      {visibleYears.map(year => {
        const collapsed = collapsedYears.has(year);
        const quarters = ALL_QUARTERS.filter(q => q.year === year && (!hideSummer || q.season !== 'SUM'));
        const units = yearUnits(year);
        const isYear5 = year === 5;

        return (
          <div key={year}>
            <button
              onClick={() => toggleYear(year)}
              className="w-full flex items-center justify-between py-1 mb-1 sm:mb-2 hover:opacity-70 transition-opacity group"
            >
              <div className="flex items-center gap-2">
                {collapsed
                  ? <ChevronRight size={13} className={isYear5 ? 'text-sky-400' : 'text-gray-400'} />
                  : <ChevronDown size={13} className={isYear5 ? 'text-sky-400' : 'text-gray-400'} />}
                <span className={`text-xs font-bold tracking-[.12em] uppercase ${isYear5 ? YEAR5_LABEL_COLOR : 'text-gray-500'}`}>
                  {YEAR_LABELS[year]}
                </span>
                {isYear5 && (
                  <span className="text-[9px] bg-sky-100 text-sky-600 px-1.5 py-0.5 rounded font-semibold">
                    COTERM
                  </span>
                )}
              </div>
              {units > 0 && (
                <span className={`text-[10px] font-semibold ${isYear5 ? 'text-sky-600' : 'text-gray-600'}`}>
                  {units} units
                </span>
              )}
            </button>
            {!collapsed && (
              <div className={`grid gap-1.5 sm:gap-2 mb-2 sm:mb-3 ${hideSummer ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
                {quarters.map(quarter => (
                  <QuarterBox
                    key={quarter.id}
                    quarter={quarter}
                    cards={getOrderedCards(quarter.id)}
                    onAddClick={() => onAddClick(quarter.id, quarter.season)}
                    onEditCard={onEditCard}
                    onDoubleClickCard={onDoubleClickCard}
                    onMoveCard={onMoveCard}
                    isCompleted={completedQuarters.has(quarter.id)}
                    onToggleComplete={() => toggleQuarterComplete(quarter.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
