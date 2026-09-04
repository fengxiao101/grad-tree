/**
 * Historical department codes still present in bulletin requirement lists.
 * Values are the current catalog codes. Exact course-number matching is still
 * required, so an alias cannot accidentally select a different course number.
 */
export const CATALOG_DEPT_ALIASES: Record<string, string> = {
  PHYS: 'PHYSICS',
  GEOLSCI: 'EPS',
  BIOMEDIN: 'BMDS',
  AFRICAST: 'AFRICAAM',
};

export function currentCatalogDept(dept: string): string {
  const normalized = dept.trim().toUpperCase();
  return CATALOG_DEPT_ALIASES[normalized] ?? normalized;
}

/** Rewrites only an initial department token, leaving titles and other text untouched. */
export function normalizeCatalogQuery(query: string): string {
  const trimmed = query.trim();
  const match = trimmed.match(/^([A-Z][A-Z0-9&]*)(?=\s|\d)/i);
  if (!match) return trimmed;
  const current = currentCatalogDept(match[1]);
  return `${current}${trimmed.slice(match[1].length)}`;
}
