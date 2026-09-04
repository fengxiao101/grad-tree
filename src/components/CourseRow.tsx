import { CourseHoverDetail } from './CourseHoverDetail';
import { SectionTag, TAG_DISPLAY, TAG_COLORS, type CatalogTerm } from '../types';
import type { CatalogCourse } from '../data/catalog/full';

export type MajorTier = 'required' | 'option' | null;

const QUARTER_BADGE_COLORS: Record<CatalogTerm, string> = {
  Aut: 'bg-amber-50 text-amber-700',
  Win: 'bg-blue-50 text-blue-700',
  Spr: 'bg-green-50 text-green-700',
  Sum: 'bg-orange-50 text-orange-700',
};

export function CourseRow({ course, tier, onSelect, expanded, onPointerMove, onPointerLeave, sectionCategory }: {
  course: CatalogCourse;
  tier: MajorTier;
  onSelect: () => void;
  expanded: boolean;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  sectionCategory?: 'major' | 'minor' | 'coterm';
}) {
  const rowBg = sectionCategory
    ? `search-row-${sectionCategory}`
    : tier === 'required' ? 'course-tier-required border-l-2'
    : tier === 'option'   ? 'course-tier-option border-l-2'
    : '';

  const writingTag: SectionTag | null =
    course.writing === '1' ? 'W1' :
    course.writing === '2' ? 'W2' :
    course.writing === 'WIM' ? 'WIM' : null;
  // Some catalog entries list the same WAY tag twice (a data artifact from
  // the bulletin scrape, e.g. DANCE 1's ways: ["CE", "CE"]) - dedupe so React
  // doesn't get two sibling elements with the same key.
  const genEdTags: SectionTag[] = [...new Set([
    ...(course.ways as SectionTag[]),
    ...(writingTag ? [writingTag] : []),
    ...(course.college ? ['COLLEGE' as SectionTag] : []),
    ...(course.language ? ['LANG' as SectionTag] : []),
  ])];

  return (
    <div
      className={`border-b border-gray-100 last:border-0 ${rowBg}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <button
        onClick={onSelect}
        className="w-full text-left grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[6rem_minmax(0,1fr)_auto] items-start gap-x-2 sm:gap-x-3 gap-y-0.5 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-black/[0.02] transition-colors"
      >
        <span className="font-mono text-[11px] sm:text-[12px] font-semibold text-gray-800 min-w-0 truncate pt-0.5">
          {course.depts[0]} {course.numbers[0]}
        </span>

        <div className="col-span-2 row-start-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 min-w-0">
          <div className="text-xs sm:text-[13px] text-gray-700 leading-snug break-words">
            {course.title}
            {course.depts.length > 1 && (
              <span className="font-mono text-[9px] text-gray-400 ml-1.5">
                ({course.depts.slice(1).map((d, i) => `${d} ${course.numbers[i + 1]}`).join(', ')})
              </span>
            )}
          </div>
          {genEdTags.length > 0 && (
            <div className="flex flex-wrap gap-0.5 mt-0.5">
              {genEdTags.map(tag => {
                const { bg, text } = TAG_COLORS[tag];
                return (
                  <span key={tag} className={`text-[8px] sm:text-[9px] font-semibold px-1 py-px rounded ${bg} ${text}`}>
                    {TAG_DISPLAY[tag]}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="col-start-2 row-start-1 sm:col-start-3 flex items-center justify-end gap-1 shrink-0 pt-0.5">
          {tier === 'required' && (
            <span className="text-[8px] sm:text-[10px] font-semibold px-1 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">Required</span>
          )}
          {course.units && (
            <span className="text-[9px] sm:text-[11px] text-gray-400 whitespace-nowrap">{course.units} units</span>
          )}
          <div className="flex gap-0.5">
            {(['Aut', 'Win', 'Spr', 'Sum'] as CatalogTerm[]).map(q =>
              course.terms.includes(q) ? (
                <span key={q} className={`text-[8px] sm:text-[10px] font-medium px-1 sm:px-1.5 py-0.5 rounded ${QUARTER_BADGE_COLORS[q]}`}>{q}</span>
              ) : null
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-3 sm:px-4 pb-2.5 -mt-0.5 bg-inherit">
          <CourseHoverDetail course={course} />
        </div>
      )}
    </div>
  );
}
