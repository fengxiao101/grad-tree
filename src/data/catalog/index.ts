// The core planner intentionally excludes long course descriptions. The full
// catalog is loaded only when a course-search or add-course dialog is opened.
import rawCourses from './courses-core-2627.json';
import type { CatalogCourse } from './types';
import { currentCatalogDept, normalizeCatalogQuery } from './aliases';

export type { CatalogCourse } from './types';

const ALL_COURSES = rawCourses as CatalogCourse[];

/**
 * Map from "DEPT NUMBER" → CatalogCourse.
 * All cross-listed codes map to the same entry.
 * e.g. "AA 132", "EPS 195", "GEOPHYS 192" all → same course object.
 */
const BY_CODE = new Map<string, CatalogCourse>();

for (const course of ALL_COURSES) {
  for (let i = 0; i < course.depts.length; i++) {
    BY_CODE.set(`${course.depts[i]} ${course.numbers[i]}`, course);
  }
}

/** Exact lookup by department and course number. Case-sensitive, e.g. dept="CS" number="106A". */
export function lookupCourse(dept: string, number: string): CatalogCourse | undefined {
  return BY_CODE.get(`${currentCatalogDept(dept)} ${number.trim().toUpperCase()}`);
}

/**
 * Search courses by free-text query.
 * Supports: "CS 106A", "cs106a" (no space), "106A" (number only), or title keywords.
 * Returns up to `limit` results (default 20).
 */
export function searchCourses(query: string, limit = 20): CatalogCourse[] {
  const raw = normalizeCatalogQuery(query);
  if (!raw) return [];
  const q = raw.toUpperCase();
  const qCompact = q.replace(/\s+/g, ''); // "cs106a" → "CS106A"

  const seen = new Set<CatalogCourse>();

  // Score a course: lower = better match
  const score = (course: CatalogCourse): number => {
    for (let i = 0; i < course.depts.length; i++) {
      const code = `${course.depts[i]} ${course.numbers[i]}`;
      const compact = `${course.depts[i]}${course.numbers[i]}`;
      if (code === q || compact === qCompact) return 0;          // exact code match
      if (code.startsWith(q) || compact.startsWith(qCompact)) return 1; // code prefix
      if (course.numbers[i].toUpperCase().startsWith(q)) return 2;      // number-only prefix ("106" → CS 106A)
    }
    if (course.title.toUpperCase().startsWith(q)) return 3;
    if (course.title.toUpperCase().includes(q)) return 4;
    return 99;
  };

  // One pass: collect and score
  const candidates: { course: CatalogCourse; s: number }[] = [];
  for (const course of ALL_COURSES) {
    if (seen.has(course)) continue;
    const s = score(course);
    if (s < 99) {
      seen.add(course);
      candidates.push({ course, s });
    }
  }

  candidates.sort((a, b) => a.s - b.s);
  return candidates.slice(0, limit).map(c => c.course);
}

/**
 * Get all courses that fulfill a specific section tag (Way, W1, W2, WIM, COLLEGE, LANG).
 * Used by the way/gen-ed filtered search modal.
 */
export function coursesForTag(tag: string, quarter?: 'Aut' | 'Win' | 'Spr'): CatalogCourse[] {
  return ALL_COURSES.filter(c => {
    const hasTag =
      (c.ways as string[]).includes(tag) ||
      (tag === 'W1' && c.writing === '1') ||
      (tag === 'W2' && c.writing === '2') ||
      (tag === 'WIM' && c.writing === 'WIM') ||
      (tag === 'COLLEGE' && c.college) ||
      (tag === 'LANG' && c.language);
    if (!hasTag) return false;
    if (quarter) return c.terms.includes(quarter);
    return true;
  });
}

/** Display label: primary "DEPT NUMBER" + parenthetical cross-listings if any. */
export function courseDisplayCode(course: CatalogCourse): string {
  const primary = `${course.depts[0]} ${course.numbers[0]}`;
  if (course.depts.length <= 1) return primary;
  const others = course.depts.slice(1).map((d, i) => `${d} ${course.numbers[i + 1]}`).join(', ');
  return `${primary} (${others})`;
}

export { ALL_COURSES };
export const CATALOG_YEAR = '2026-27';
