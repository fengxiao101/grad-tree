import type { CatalogCourse } from '../data/catalog';

const PREREQ_RE = /\b(?:Recommended\s+)?[Pp]re-?reqs?(?:uisites?)?\s*(?:\(s\))?\s*(?:are|:)/;

function stripPrereqFromDescription(desc: string): string {
  const m = PREREQ_RE.exec(desc);
  if (!m) return desc;
  return desc.slice(0, m.index).replace(/[.\s]+$/, '');
}

export function onCourseUrl(dept: string, num: string) {
  return `https://oncourse.college/${dept}${num}`;
}

export function exploreCourseUrl(dept: string, num: string) {
  return `https://explorecourses.stanford.edu/search?q=${dept}+${num}&view=catalog`;
}

// Shared content for course hover tooltips - prereqs, description, OnCourse + ExploreCourses links.
// Used by CourseChip (MajorSection) and CourseRow (CourseSearchModal).
export function CourseHoverDetail({
  course,
  textSize = 'text-[11px]',
}: {
  course: CatalogCourse;
  textSize?: string;
}) {
  const oncourse = onCourseUrl(course.depts[0], course.numbers[0]);
  const explore = exploreCourseUrl(course.depts[0], course.numbers[0]);
  return (
    <>
      {course.prerequisites && (
        <p className={`${textSize} leading-snug mb-0.5`}>
          <span className="font-semibold text-amber-700">Prereq: </span>
          <span className="text-gray-600">{course.prerequisites}</span>
        </p>
      )}
      {course.description && (
        <p className={`${textSize} text-gray-400 leading-snug`}>{stripPrereqFromDescription(course.description)}</p>
      )}
      <div className="flex items-center gap-2.5 mt-1.5">
        <a
          href={oncourse}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={`${textSize} text-cardinal-600 hover:text-cardinal-800 font-medium`}
        >
          OnCourse Reviews
        </a>
        <span className="text-gray-200">·</span>
        <a
          href={explore}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={`${textSize} text-gray-500 hover:text-gray-700`}
        >
          ExploreCourses ↗
        </a>
      </div>
    </>
  );
}
