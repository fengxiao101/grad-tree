import type { CatalogCourse } from './types';

let fullCatalogPromise: Promise<typeof import('./full')> | null = null;

/** Loads the description-rich catalog only when a detail view actually needs it. */
export async function lookupCourseDetails(dept: string, number: string): Promise<CatalogCourse | undefined> {
  fullCatalogPromise ??= import('./full');
  const catalog = await fullCatalogPromise;
  return catalog.lookupCourse(dept, number);
}
