import type { CatalogCourse } from '../data/catalog';
import { WAY_TAGS, type CourseCard, type SectionTag, type WayTag } from '../types';

/** Extract all gen-ed / way / writing tags from a catalog course. */
export function tagsFromCatalog(course: CatalogCourse): SectionTag[] {
  // Some catalog entries list the same WAY tag twice (a data artifact from
  // the bulletin scrape, e.g. DANCE 1's ways: ["CE", "CE"]) - dedupe so a
  // card doesn't end up with a duplicate tag double-counting toward progress.
  return [...new Set([
    ...(course.ways as SectionTag[]),
    ...(course.writing === '1' ? ['W1' as SectionTag] : []),
    ...(course.writing === '2' ? ['W2' as SectionTag] : []),
    ...(course.writing === 'WIM' ? ['WIM' as SectionTag] : []),
    ...(course.college ? ['COLLEGE' as SectionTag] : []),
    ...(course.language ? ['LANG' as SectionTag] : []),
  ])];
}

/**
 * Parses a units string from the catalog and returns the highest value in a range.
 * "3-5" → 5, "4" → 4, undefined/null → null
 */
export function parseHighUnit(units: string | undefined | null): number | null {
  if (!units) return null;
  const range = units.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (range) return parseInt(range[2], 10);
  const n = parseInt(units, 10);
  return isNaN(n) ? null : n;
}

/** The WAYS tags a card carries, ignoring writing and other gen-ed tags. */
export const getWayTags = (card: CourseCard): WayTag[] =>
  card.tags.filter(tag => (WAY_TAGS as string[]).includes(tag)) as WayTag[];
