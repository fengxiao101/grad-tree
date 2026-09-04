import rawCourses from './courses-2627.json';
import type { CatalogCourse } from './types';
import { currentCatalogDept, normalizeCatalogQuery } from './aliases';

export type { CatalogCourse } from './types';

const ALL_COURSES = rawCourses as CatalogCourse[];
const BY_CODE = new Map<string, CatalogCourse>();

for (const course of ALL_COURSES) {
  for (let i = 0; i < course.depts.length; i++) {
    BY_CODE.set(`${course.depts[i]} ${course.numbers[i]}`, course);
  }
}

export function lookupCourse(dept: string, number: string): CatalogCourse | undefined {
  return BY_CODE.get(`${currentCatalogDept(dept)} ${number.trim().toUpperCase()}`);
}

export function searchCourses(query: string, limit = 20): CatalogCourse[] {
  const raw = normalizeCatalogQuery(query);
  if (!raw) return [];
  const q = raw.toUpperCase();
  const qCompact = q.replace(/\s+/g, '');
  const tokens = q.split(/\s+/).filter(Boolean);
  const multiToken = tokens.length > 1;
  const candidates: { course: CatalogCourse; score: number }[] = [];

  for (const course of ALL_COURSES) {
    let score = 99;
    const titleUpper = course.title.toUpperCase();

    for (let i = 0; i < course.depts.length; i++) {
      const code = `${course.depts[i]} ${course.numbers[i]}`;
      const compact = `${course.depts[i]}${course.numbers[i]}`;
      if (code === q || compact === qCompact) { score = 0; break; }
      if (code.startsWith(q) || compact.startsWith(qCompact)) score = Math.min(score, 1);
      if (course.numbers[i].toUpperCase().startsWith(q)) score = Math.min(score, 2);
    }
    if (titleUpper.startsWith(q)) score = Math.min(score, 3);
    else if (titleUpper.includes(q)) score = Math.min(score, 4);

    if (score === 99 && multiToken) {
      const searchable = course.depts.map((d, i) => `${d} ${course.numbers[i]}`).join(' ') + ' ' + titleUpper;
      if (tokens.every(t => searchable.includes(t))) score = 5;
    }

    if (score < 99) candidates.push({ course, score });
  }

  candidates.sort((a, b) => a.score - b.score);
  return candidates.slice(0, limit).map(({ course }) => course);
}

export function coursesForTag(tag: string, quarter?: 'Aut' | 'Win' | 'Spr'): CatalogCourse[] {
  return ALL_COURSES.filter(course => {
    const hasTag =
      (course.ways as string[]).includes(tag) ||
      (tag === 'W1' && course.writing === '1') ||
      (tag === 'W2' && course.writing === '2') ||
      (tag === 'WIM' && course.writing === 'WIM') ||
      (tag === 'COLLEGE' && course.college) ||
      (tag === 'LANG' && course.language);
    return hasTag && (!quarter || course.terms.includes(quarter));
  });
}

export { ALL_COURSES };
