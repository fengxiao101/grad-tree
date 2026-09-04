/**
 * Characterization harness.
 *
 * This is not a correctness suite: it pins down what the requirement engine
 * currently DOES, so that a refactor can be proven behaviour-preserving by
 * diffing the snapshot. A failing snapshot means "you changed something",
 * not "you broke something", and the diff says exactly which program moved.
 */
import { describe, expect, it } from 'vitest';
import { BUILT_IN_MAJORS } from '../src/data/majors';
import { BUILT_IN_MINORS } from '../src/data/minors';
import { BUILT_IN_COTERMS } from '../src/data/cotermPrograms';
import {
  computeAssignments,
  getProgramSections,
  calculateProgramAssignedUnits,
  calculateSectionUnits,
  getManualSlotCourseCards,
} from '../src/utils/majorUtils';
import { lookupCourse } from '../src/data/catalog';
import { parseHighUnit } from '../src/utils/catalogUtils';
import type { MajorConfig, MajorSection, Slot } from '../src/data/majorSchema';
import type { Satisfier } from '../src/data/testCreditUtils';
import type { CourseCard } from '../src/types';

const ALL_PROGRAMS: MajorConfig[] = [
  ...BUILT_IN_MAJORS,
  ...BUILT_IN_MINORS,
  ...BUILT_IN_COTERMS,
].sort((a, b) => a.id.localeCompare(b.id));

const sectionSlots = (section: MajorSection): Slot[] => [
  ...section.slots,
  ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
];

/**
 * Builds a deterministic plan for a program by taking the first enumerated
 * option of every slot. `withNullUnits` leaves card.units null, which is the
 * case where the interactive and printable unit formulas can disagree.
 */
function buildPlan(config: MajorConfig, withNullUnits = false): CourseCard[] {
  const cards: CourseCard[] = [];
  let n = 0;
  for (const section of getProgramSections(config)) {
    for (const slot of sectionSlots(section)) {
      const option = slot.options[0];
      if (!option) continue;
      const catalog = lookupCourse(option.dept, option.number);
      cards.push({
        id: `${config.id}-card-${n++}`,
        department: option.dept,
        courseNumber: option.number,
        courseName: option.name ?? catalog?.title ?? '',
        units: withNullUnits ? null : (parseHighUnit(catalog?.units) ?? 4),
        priority: 'required',
        tags: [],
        notes: '',
        quarterId: 'unsorted',
      });
    }
  }
  return cards;
}

const NO_TEST_CREDIT: Satisfier[] = [];
const NO_FILLS: Record<string, { checked: boolean; note: string }> = {};

/** How the interactive requirement panel totals units (catalog fallback). */
function interactiveUnits(
  sections: MajorSection[],
  assignments: Map<string, Satisfier[]>,
  cards: CourseCard[],
): number {
  const ids = new Set<string>();
  const groups = new Set<string>();
  let testUnits = 0;
  for (const section of sections) {
    for (const slot of sectionSlots(section)) {
      for (const s of assignments.get(slot.id) ?? []) {
        if (s.kind === 'card') ids.add(s.card.id);
        else if (!groups.has(s.groupId)) { groups.add(s.groupId); testUnits += s.units; }
      }
      if (slot.type === 'any-approved') {
        for (const c of getManualSlotCourseCards(NO_FILLS[slot.id], cards)) ids.add(c.id);
      }
    }
  }
  return cards
    .filter(c => ids.has(c.id))
    .reduce((sum, c) => sum + (c.units ?? parseHighUnit(lookupCourse(c.department, c.courseNumber)?.units ?? '') ?? 0), testUnits);
}

/** How the printable document totals units (catalog fallback, matching the screen). */
function printableUnits(
  sections: MajorSection[],
  assignments: Map<string, Satisfier[]>,
  cards: CourseCard[],
): number {
  const ids = new Set<string>();
  const groups = new Set<string>();
  let testUnits = 0;
  for (const section of sections) {
    for (const slot of sectionSlots(section)) {
      for (const s of assignments.get(slot.id) ?? []) {
        if (s.kind === 'card') ids.add(s.card.id);
        else if (!groups.has(s.groupId)) { groups.add(s.groupId); testUnits += s.units; }
      }
      if (slot.type === 'any-approved') {
        for (const c of getManualSlotCourseCards(NO_FILLS[slot.id], cards)) ids.add(c.id);
      }
    }
  }
  return cards
    .filter(c => ids.has(c.id))
    .reduce((sum, c) => sum + (c.units ?? parseHighUnit(lookupCourse(c.department, c.courseNumber)?.units ?? '') ?? 0), testUnits);
}

describe('program registry', () => {
  it('ships the expected programs with unique ids', () => {
    expect(ALL_PROGRAMS.length).toBe(93);
    expect(new Set(ALL_PROGRAMS.map(p => p.id)).size).toBe(ALL_PROGRAMS.length);
  });

  it('gives every slot an id unique within its program', () => {
    const offenders: string[] = [];
    for (const config of ALL_PROGRAMS) {
      const ids = getProgramSections(config).flatMap(s => sectionSlots(s)).map(s => s.id);
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      if (dupes.length) offenders.push(`${config.id}: ${[...new Set(dupes)].join(', ')}`);
    }
    expect(offenders).toEqual([]);
  });
});

describe('assignment engine', () => {
  it('produces a stable assignment fingerprint for every program', () => {
    const fingerprint: Record<string, string> = {};
    for (const config of ALL_PROGRAMS) {
      const cards = buildPlan(config);
      const assignments = computeAssignments(config, cards, NO_TEST_CREDIT);
      const filled = [...assignments.entries()].filter(([, sats]) => sats.length > 0).length;
      const satisfiers = [...assignments.values()].reduce((n, s) => n + s.length, 0);
      const units = calculateProgramAssignedUnits(config, assignments, cards);
      fingerprint[config.id] = `slots=${filled} satisfiers=${satisfiers} units=${units}`;
    }
    expect(fingerprint).toMatchSnapshot();
  });

  it('totals section units consistently across every program', () => {
    const perProgram: Record<string, number> = {};
    for (const config of ALL_PROGRAMS) {
      const cards = buildPlan(config);
      const assignments = computeAssignments(config, cards, NO_TEST_CREDIT);
      perProgram[config.id] = getProgramSections(config)
        .reduce((sum, section) => sum + calculateSectionUnits(section, assignments, NO_FILLS, cards), 0);
    }
    expect(perProgram).toMatchSnapshot();
  });
});

describe('unit formulas: interactive vs printable', () => {
  it('agree for every program when cards carry explicit units', () => {
    const disagreements: string[] = [];
    for (const config of ALL_PROGRAMS) {
      const cards = buildPlan(config);
      const sections = getProgramSections(config);
      const assignments = computeAssignments(config, cards, NO_TEST_CREDIT);
      const screen = interactiveUnits(sections, assignments, cards);
      const print = printableUnits(sections, assignments, cards);
      if (screen !== print) disagreements.push(`${config.id}: screen=${screen} print=${print}`);
    }
    expect(disagreements).toEqual([]);
  });

  it('records where they diverge when card units are missing', () => {
    const divergences: Record<string, string> = {};
    for (const config of ALL_PROGRAMS) {
      const cards = buildPlan(config, true);
      const sections = getProgramSections(config);
      const assignments = computeAssignments(config, cards, NO_TEST_CREDIT);
      const screen = interactiveUnits(sections, assignments, cards);
      const print = printableUnits(sections, assignments, cards);
      if (screen !== print) divergences[config.id] = `screen=${screen} print=${print} lost=${screen - print}`;
    }
    expect(divergences).toMatchSnapshot();
  });
});
