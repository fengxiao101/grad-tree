import { ALL_QUARTERS } from '../types';
import { lookupCourse } from '../data/catalog';
import { testCreditCoversCode } from '../data/testCreditUtils';
import type { CourseCard } from '../types';

const SEASON_MAP: Record<string, string> = { AUT: 'Aut', WIN: 'Win', SPR: 'Spr', SUM: 'Sum' };

export function getQuarterIndex(quarterId: string): number {
  return ALL_QUARTERS.findIndex(q => q.id === quarterId);
}

export function getQuarterSeason(quarterId: string): string | null {
  const q = ALL_QUARTERS.find(q => q.id === quarterId);
  return q ? SEASON_MAP[q.season] : null;
}

export function extractCourseCodes(text: string): string[] {
  const upper = text.toUpperCase();
  const codes = new Set<string>();
  const STOP = new Set(['AND', 'OR', 'FOR', 'THE', 'WITH', 'IN', 'OF', 'NO', 'NOT', 'TO', 'A', 'AN']);

  // Primary: "DEPT NUM" pairs, plus continuation numbers immediately after (e.g., "MATH 19, 20, 21")
  const DEPT_NUM = /\b([A-Z][A-Z0-9&]{0,9})\s+(\d{1,3}[A-Z]{0,4})\b/g;
  const CONT = /^(?:\s*(?:,|\/|or|and)\s*)(\d{1,3}[A-Z]{0,4})\b/i;

  let m: RegExpExecArray | null;
  while ((m = DEPT_NUM.exec(upper)) !== null) {
    const dept = m[1];
    if (STOP.has(dept)) continue;
    codes.add(`${dept} ${m[2]}`);

    // Consume continuation numbers like ", 20, 21" after "MATH 19"
    let tail = upper.slice(m.index + m[0].length);
    let cm: RegExpExecArray | null;
    while ((cm = CONT.exec(tail)) !== null) {
      codes.add(`${dept} ${cm[1]}`);
      tail = tail.slice(cm[0].length);
    }
    DEPT_NUM.lastIndex = upper.length - tail.length;
  }

  // Compact codes without space: "AA100", "E15", "ENGR14"
  const COMPACT = /\b([A-Z]{1,6})(\d{1,3}[A-Z]{0,2})\b/g;
  while ((m = COMPACT.exec(upper)) !== null) {
    const dept = m[1];
    if (STOP.has(dept) || dept.length === 1 && !/^[A-Z]$/.test(dept)) continue;
    codes.add(`${dept} ${m[2]}`);
  }

  return [...codes];
}

const STOP_WORDS = new Set(['AND', 'OR', 'FOR', 'THE', 'WITH', 'IN', 'OF', 'NO', 'NOT', 'TO', 'A', 'AN']);

// Extracts course codes from a short text chunk and groups them by OR relationships.
// Adjacent course codes connected by "or" form a single OR group (any one satisfies it).
// Returns AND-of-ORs: each inner array is an OR group.
// defaultDept: when set, bare numbers (e.g. "106B", "103") are resolved as that dept's course.
function extractOrGroups(chunk: string, defaultDept?: string): string[][] {
  const upper = chunk.toUpperCase();
  type CourseMatch = { code: string; start: number; end: number };
  const matches: CourseMatch[] = [];

  // "DEPT NUM" or compact "DEPT123" patterns
  const DEPT_NUM = /\b([A-Z][A-Z0-9&]{0,9})\s+(\d{1,3}[A-Z]{0,4})\b/g;
  const COMPACT = /\b([A-Z]{2,6})(\d{1,3}[A-Z]{0,2})\b/g;
  let m: RegExpExecArray | null;

  while ((m = DEPT_NUM.exec(upper)) !== null) {
    if (STOP_WORDS.has(m[1])) continue;
    matches.push({ code: `${m[1]} ${m[2]}`, start: m.index, end: m.index + m[0].length });
  }
  while ((m = COMPACT.exec(upper)) !== null) {
    if (STOP_WORDS.has(m[1])) continue;
    const code = `${m[1]} ${m[2]}`;
    if (!matches.some(mx => mx.code === code)) {
      matches.push({ code, start: m.index, end: m.index + m[0].length });
    }
  }

  // Bare numbers like "106B", "103", "109" - resolve with defaultDept when available
  if (defaultDept) {
    const BARE = /\b(\d{1,3}[A-Z]{0,4})\b/g;
    while ((m = BARE.exec(upper)) !== null) {
      const raw = m[1];
      const numPart = parseInt(raw, 10);
      if (numPart < 10) continue; // skip unit counts (1–9)
      // Skip if already covered by a dept-qualified match at this position
      const start = m.index, end = m.index + m[0].length;
      if (matches.some(mx => mx.start <= start && mx.end >= end)) continue;
      matches.push({ code: `${defaultDept} ${raw}`, start, end });
    }
  }

  if (matches.length === 0) return [];
  matches.sort((a, b) => a.start - b.start);

  // Group adjacent codes connected by "or" (optionally preceded by comma)
  const groups: string[][] = [];
  let current: string[] = [matches[0].code];

  for (let i = 1; i < matches.length; i++) {
    const between = upper.slice(matches[i - 1].end, matches[i].start).trim();
    if (/^[,\s]*OR\b/.test(between)) {
      current.push(matches[i].code);
    } else {
      groups.push(current);
      current = [matches[i].code];
    }
  }
  groups.push(current);
  return groups;
}

// Parses prereq text into AND-of-ORs groups, handling:
//   - Coreq/concurrent sentences (skipped - concurrent enrollment is fine)
//   - Recommended phrases (skipped)
//   - Self-references (filtered by selfCodes)
//   - Noise: "or equivalent", "or consent of instructor", etc.
// Returns: each inner array is an OR group. Prereq satisfied if every group has ≥1 member in plan.
// defaultDept: single department code (e.g. "CS") used to resolve bare numbers in prereq text.
//   Only pass when the course belongs to exactly one department.
export function extractPrereqGroups(
  rawText: string,
  selfCodes: Set<string>,
  defaultDept?: string,
): string[][] {
  const text = rawText.replace(/\s+/g, ' ').trim();
  if (!text) return [];
  if (/^(?:none|no prerequisites?)\b/i.test(text)) return [];

  // Strip "Prerequisite(s):" header
  let body = text.replace(/^[Pp]re-?req(?:uisites?)?(?:\s+are)?\s*[:\s]\s*/i, '');

  // Remove noise that introduces spurious course codes or corrupts OR logic
  body = body
    .replace(/,?\s*or equivalents?/gi, '')
    .replace(/,?\s*or consent (?:of|from) (?:the )?instructor/gi, '')
    .replace(/,?\s*or permission of (?:the )?instructor/gi, '')
    .replace(/,?\s*or (?:the )?instructor[''s]* (?:consent|permission)/gi, '')
    .replace(/,?\s*or department permission/gi, '')
    .replace(/consent of instructor/gi, '')
    .replace(/permission of instructor/gi, '')
    .replace(/\(for [^)]+\)/gi, '');   // "(for linear algebra)" etc.

  const groups: string[][] = [];

  // Split into sentences
  const sentences = body.split(/\.\s+|\s*\.\s*$/).filter(s => s.trim());

  for (const sentence of sentences) {
    const s = sentence.trim();
    if (!s) continue;

    // Skip recommended-only sentences
    if (/\brecommended\b/i.test(s) && !/\brequired\b/i.test(s)) continue;

    // Skip coreq/concurrent sentences - concurrent enrollment is allowed, not a missing prereq
    if (/\b(?:co-?req(?:uisite)?|concurrent(?:ly)?)\b/i.test(s)) continue;

    // Skip administrative/non-prereq sentences
    if (/^(?:consent|permission|graduate standing|note:|students may|this course|enrollment limited)/i.test(s)) continue;

    // Split by semicolons (strong AND separator), then parse OR groups in each chunk
    for (const chunk of s.split(/\s*;\s*/)) {
      // Further split on ", and " or " and " to find AND subgroups
      const andParts = chunk.split(/,?\s+and\s+/i);
      for (const part of andParts) {
        for (const group of extractOrGroups(part.trim(), defaultDept)) {
          const filtered = group.filter(c => !selfCodes.has(c));
          if (filtered.length > 0) groups.push(filtered);
        }
      }
    }
  }

  return groups;
}

function allCodesForCard(card: CourseCard): Set<string> {
  const catalog = lookupCourse(card.department, card.courseNumber);
  if (catalog) return new Set(catalog.depts.map((d, i) => `${d} ${catalog.numbers[i]}`));
  return new Set([`${card.department.toUpperCase()} ${card.courseNumber.toUpperCase()}`]);
}

function extractPrereqText(description: string): string | null {
  const m = description.match(/[Pp]re-?req(?:uisites?)?[:\s].{1,300}/);
  if (!m) return null;
  const raw = m[0].replace(/\s+/g, ' ').trim();
  const dot = raw.indexOf('.', 20);
  return dot > 0 ? raw.slice(0, dot) : raw.slice(0, 120);
}

export interface PrereqWarning {
  prereqText: string;
  lateCards: string[];     // prereq cards present in plan but scheduled after this course
  missingCodes: string[];  // prereq groups with no matching card anywhere in the plan
}

export interface CardWarningResult {
  season: boolean;
  prereq: PrereqWarning | null;
}

export function computeCardWarnings(
  card: CourseCard,
  allCards: Record<string, CourseCard>,
  ignoredPrereqCardIds: Set<string>,
  testCoveredCourses: ReadonlySet<string> = new Set(),
): CardWarningResult {
  const result: CardWarningResult = { season: false, prereq: null };
  if (card.quarterId === 'unsorted') return result;

  const catalog = lookupCourse(card.department, card.courseNumber);
  const myIndex = getQuarterIndex(card.quarterId);

  const prereqText = catalog?.prerequisites ?? (catalog?.description ? extractPrereqText(catalog.description) : null);
  if (myIndex >= 0 && prereqText && !ignoredPrereqCardIds.has(card.id)) {
    const selfCodes = allCodesForCard(card);
    // Use pre-encoded prereqGroups when available; fall back to runtime regex parser
    const prereqGroups: string[][] = catalog?.prereqGroups
      ?? (() => {
          const defaultDept = catalog && catalog.depts.length === 1 ? catalog.depts[0] : undefined;
          return extractPrereqGroups(prereqText, selfCodes, defaultDept);
        })();

    if (prereqGroups.length > 0) {
      const lateCards: string[] = [];
      const missingCodes: string[] = [];

      for (const group of prereqGroups) {
        let groupSatisfied = false;
        const lateLabelSet = new Set<string>();

        for (const code of group) {
          // External credit is earned before the planned schedule, so a course
          // equivalency satisfies the prerequisite without an ordering check.
          if (testCreditCoversCode(testCoveredCourses, code)) {
            groupSatisfied = true;
            break;
          }

          // "PWR 1" means "any course satisfying the WR 1 requirement", not the
          // specific course PWR 1. Similarly "PWR 2" means any WR 2 course.
          // Check the writing field on each planned course rather than matching by code.
          const writingLevel = code === 'PWR 1' ? '1' : code === 'PWR 2' ? '2' : null;
          if (writingLevel) {
            for (const other of Object.values(allCards)) {
              if (other.id === card.id) continue;
              const otherCatalog = lookupCourse(other.department, other.courseNumber);
              if (otherCatalog?.writing !== writingLevel) continue;
              if (other.quarterId === 'unsorted') { groupSatisfied = true; break; }
              const otherIndex = getQuarterIndex(other.quarterId);
              if (otherIndex <= myIndex) { groupSatisfied = true; break; }
            }
            if (groupSatisfied) break;
            continue; // don't fall through to code-match logic for PWR 1/2
          }

          for (const other of Object.values(allCards)) {
            if (other.id === card.id) continue;
            const otherCodes = allCodesForCard(other);
            if (!otherCodes.has(code)) continue;

            // Unsorted cards: treat as placed (won't trigger missing), skip ordering check
            if (other.quarterId === 'unsorted') {
              groupSatisfied = true;
              break;
            }
            const otherIndex = getQuarterIndex(other.quarterId);
            if (otherIndex <= myIndex) {
              // Scheduled before or concurrent - satisfies this group
              groupSatisfied = true;
              break;
            } else {
              // In plan but scheduled too late
              const label =
                [other.department, other.courseNumber].filter(Boolean).join(' ') ||
                other.courseName;
              lateLabelSet.add(label);
            }
          }
          if (groupSatisfied) break;
        }

        if (!groupSatisfied) {
          if (lateLabelSet.size > 0) {
            for (const label of lateLabelSet) lateCards.push(label);
          } else {
            // No member found in plan at all
            missingCodes.push(group.join(' or '));
          }
        }
      }

      if (lateCards.length > 0 || missingCodes.length > 0) {
        result.prereq = { prereqText, lateCards, missingCodes };
      }
    }
  }

  return result;
}
