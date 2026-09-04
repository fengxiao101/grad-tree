// Shared utilities for matching test credit courses against major slot options.
// Used by MajorSection (assignment display).

import type { CourseCard } from '../types';
import { ALL_TEST_GROUPS } from './testCredits';
import type { TransferCredit } from '../store/usePlannerStore';

// Map from long/alternate dept names in test credit charts to the abbreviation
// used in ExploreCourses and major requirement sheets.
const DEPT_ALIASES: Record<string, string> = {
  PHYSICS: 'PHYS',
  EPS: 'GEOLSCI',
  BMDS: 'BIOMEDIN',
  AFRICAAM: 'AFRICAST',
};

export function normalizeDept(dept: string): string {
  const u = dept.trim().toUpperCase();
  return DEPT_ALIASES[u] ?? u;
}

// Parse "MATH 19/20/21", "CS 105, 106A", "PHYSICS 21/41", "CHEM 31A/31B or 31E"
// into [{dept (normalized), number}] pairs.
export function parseCoursesStr(courses: string): { dept: string; number: string }[] {
  const flat = courses.replace(/\s+or\s+/gi, ', ').replace(/\//g, ', ');
  const result: { dept: string; number: string }[] = [];
  let lastDept = '';
  for (const part of flat.split(',').map(s => s.trim()).filter(Boolean)) {
    const withDept = part.match(/^([A-Z][A-Z&]*)\s+(\S+)/i);
    if (withDept) {
      lastDept = normalizeDept(withDept[1]);
      result.push({ dept: lastDept, number: withDept[2].toUpperCase() });
    } else {
      const numOnly = part.match(/^(\S+)/);
      if (numOnly && lastDept) result.push({ dept: lastDept, number: numOnly[1].toUpperCase() });
    }
  }
  return result;
}

type CheckRecord = Record<string, { checked: boolean; selectedScore?: string }>;

function resolveScoreOpt(group: (typeof ALL_TEST_GROUPS)[number], check: { selectedScore?: string }) {
  return group.scoreOptions.length === 1
    ? group.scoreOptions[0]
    : group.scoreOptions.find(o => o.score === check.selectedScore);
}

// Returns a Set of "DEPT:NUMBER" keys (normalized) for every course granted
// by the currently-checked test credits.
export function computeTestCovered(testCreditChecks: CheckRecord): Set<string> {
  const covered = new Set<string>();
  for (const group of ALL_TEST_GROUPS) {
    const check = testCreditChecks[group.id];
    if (!check?.checked) continue;
    const scoreOpt = resolveScoreOpt(group, check);
    if (!scoreOpt) continue;
    for (const { dept, number } of parseCoursesStr(scoreOpt.courses)) {
      covered.add(`${dept}:${number}`);
    }
  }
  return covered;
}

// Prerequisite parsers use "DEPT NUMBER" while the test-credit set uses
// normalized "DEPT:NUMBER" keys. Keep that translation in one place so
// aliases such as PHYSICS → PHYS work consistently everywhere.
export function testCreditCoversCode(covered: ReadonlySet<string>, code: string): boolean {
  const match = code.trim().toUpperCase().match(/^([^\s]+)\s+([^\s]+)$/);
  if (!match) return false;
  return covered.has(`${normalizeDept(match[1])}:${match[2]}`);
}

// ── Satisfier type (used in MajorSection's no-double-count algorithm) ─────────

export type Satisfier =
  | { kind: 'card'; card: CourseCard }
  | { kind: 'test'; id: string; groupId: string; dept: string; number: string; label: string; units: number }
  | { kind: 'transfer'; id: string; groupId: string; dept: string; number: string; label: string; units: number };

export function computeTransferCovered(transferCredits: TransferCredit[]): Set<string> {
  const covered = new Set<string>();
  for (const tc of transferCredits) {
    for (const { dept, number } of (tc.courses ?? [])) {
      if (dept && number)
        covered.add(`${normalizeDept(dept)}:${number.trim().toUpperCase()}`);
    }
  }
  return covered;
}

export function getTransferSatisfiers(transferCredits: TransferCredit[]): Satisfier[] {
  const result: Satisfier[] = [];
  for (const tc of transferCredits) {
    const courses = tc.courses ?? [];
    for (let i = 0; i < courses.length; i++) {
      const { dept, number } = courses[i];
      if (!dept || !number) continue;
      result.push({
        kind: 'transfer' as const,
        id: `transfer:${tc.id}:${i}`,
        groupId: `transfer:${tc.id}`,  // same groupId → units counted once per credit
        dept: normalizeDept(dept),
        number: number.trim().toUpperCase(),
        label: tc.name || `${dept} ${number}`,
        units: tc.units,
      });
    }
  }
  return result;
}

// Returns test-credit satisfiers for every checked credit that has a parseable
// course list: used to feed into computeAssignments in MajorSection.
export function getTestCreditSatisfiers(testCreditChecks: CheckRecord): Satisfier[] {
  const result: Satisfier[] = [];
  for (const group of ALL_TEST_GROUPS) {
    const check = testCreditChecks[group.id];
    if (!check?.checked) continue;
    const scoreOpt = resolveScoreOpt(group, check);
    if (!scoreOpt) continue;
    for (const { dept, number } of parseCoursesStr(scoreOpt.courses)) {
      result.push({
        kind: 'test',
        id: `${group.id}:${dept}:${number}`,
        groupId: group.id,
        dept,
        number,
        label: `${group.subject} (${scoreOpt.score})`,
        units: scoreOpt.units,
      });
    }
  }
  return result;
}
