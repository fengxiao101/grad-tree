/**
 * Builder helpers for MajorConfig construction.
 * Use these in new program files to reduce boilerplate.
 * Existing files pre-date this module and use raw object literals: that's fine.
 */

import type { CourseOption, Slot, MajorSection, Track } from './majorSchema';

// ── Course option shorthand ───────────────────────────────────────────────────

/** Shorthand for a single CourseOption. Name is optional (app resolves from catalog). */
export function co(dept: string, number: string, name?: string): CourseOption {
  return name ? { dept, number, name } : { dept, number };
}

// ── Slot builders ─────────────────────────────────────────────────────────────

/** A single required course. id defaults to `${dept.toLowerCase()}-${number.toLowerCase()}`. */
export function req(
  dept: string,
  number: string,
  label?: string,
  note?: string,
): Slot {
  const id = `${dept.toLowerCase()}-${number.toLowerCase()}`;
  return {
    id,
    label: label ?? `${dept} ${number}`,
    type: 'required',
    options: [{ dept, number }],
    ...(note ? { note } : {}),
  };
}

/** Pick exactly one of several alternatives. */
export function pickOne(
  id: string,
  label: string,
  options: CourseOption[],
  note?: string,
): Slot {
  return { id, label, type: 'pick-one', options, ...(note ? { note } : {}) };
}

/** Pick `count` courses from an enumerated list. */
export function pickFrom(
  id: string,
  label: string,
  count: number,
  options: CourseOption[],
  note?: string,
): Slot {
  return { id, label, type: 'pick-from-list', count, options, ...(note ? { note } : {}) };
}

/**
 * Any approved course (unenumerated or partially enumerated).
 * If all options are known, pass them; otherwise leave options empty and set note with URL.
 */
export function anyApproved(
  id: string,
  label: string,
  options: CourseOption[] = [],
  note?: string,
): Slot {
  return { id, label, type: 'any-approved', options, ...(note ? { note } : {}) };
}

// ── Section builder ───────────────────────────────────────────────────────────

export function section(
  id: string,
  name: string,
  slots: Slot[],
  opts: Partial<Omit<MajorSection, 'id' | 'name' | 'slots'>> = {},
): MajorSection {
  return { id, name, slots, ...opts };
}

/** Section with trackSelector: true (renders track picker: slots should be []). */
export function trackSelectorSection(
  id: string,
  name: string,
  note?: string,
): MajorSection {
  return { id, name, trackSelector: true, slots: [], ...(note ? { note } : {}) };
}

// ── Track builder ─────────────────────────────────────────────────────────────

export function track(
  id: string,
  name: string,
  sections: MajorSection[],
  minUnits?: number,
): Track {
  return { id, name, sections, ...(minUnits !== undefined ? { minUnits } : {}) };
}

// ── Common course lists (reused across multiple programs) ─────────────────────

/** MATH 19/20/21 single-variable calculus sequence. */
export const MATH_CALC_SLOTS: Slot[] = [
  req('MATH', '19', 'MATH 19: Calculus'),
  req('MATH', '20', 'MATH 20: Calculus'),
  req('MATH', '21', 'MATH 21: Calculus'),
];

/** MATH 51 + 53 (linear algebra / ODE), commonly required in Engineering. */
export const MATH_51_53_SLOTS: Slot[] = [
  req('MATH', '51', 'MATH 51: Linear Algebra, Multivariable Calculus'),
  req('MATH', '53', 'MATH 53: Differential Equations with Linear Algebra'),
];

/** PHYS 41 + 43 mechanics + E&M sequence. */
export const PHYS_MECH_EM_SLOTS: Slot[] = [
  req('PHYS', '41', 'PHYS 41: Mechanics'),
  req('PHYS', '43', 'PHYS 43: Electricity and Magnetism'),
];
