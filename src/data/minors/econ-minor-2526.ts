// Economics Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/ECON-MIN
// Total 35 units. Min GPA 2.0 (C or better). No credit/no credit.
// 20 of 35 units must be from Stanford. Must complete declaration by last day of quarter before degree conferral.
// ECON 135, ECON 140, ECON 141: may only count ONE of these (too similar in content).
// ECON 160, ECON 167G, ECON 180: may NOT count toward minor (cover similar subject matter to field courses).
// ECON 202/210: may enroll with DUS + instructor permission.

import type { MajorConfig } from '../majorSchema';

export const ECON_MINOR_2526: MajorConfig = {
  id: 'econ-minor-2526',
  name: 'Economics (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ECON-MIN/',
  category: 'minor',
  totalMinUnits: 35,
  sections: [
    // ── Core (20 units) ────────────────────────────────────────────────────────
    {
      id: 'core',
      name: 'Core (20 units required)',
      minUnits: 20,
      note: 'All 4 courses required. If ECON 1 is waived, must complete 5 additional elective units.',
      slots: [
        { id: 'econ1', label: 'ECON 1: Principles of Economics', type: 'required',
          options: [{ dept: 'ECON', number: '1' }] },
        { id: 'econ50', label: 'ECON 50: Economic Analysis I', type: 'pick-one',
          options: [
            { dept: 'ECON', number: '50' },
            { dept: 'ECON', number: '50Q' },
          ] },
        { id: 'econ51', label: 'ECON 51: Economic Analysis II', type: 'required',
          options: [{ dept: 'ECON', number: '51' }] },
        { id: 'econ52', label: 'ECON 52: Economic Analysis III (Macro)', type: 'required',
          options: [{ dept: 'ECON', number: '52' }] },
      ],
    },

    // ── Field Courses (10 units, 2 courses) ────────────────────────────────────
    {
      id: 'field',
      name: 'Field Courses (10 units, at least 2 courses)',
      minUnits: 10,
      minCourses: 2,
      note: 'ECON 135, 140, 141: only one may count (too similar in content). ECON 160, 167G, 180: may NOT count. ECON 202/210: allowed with DUS + instructor permission.',
      slots: [
        { id: 'field-course-1', label: 'Field Course 1', type: 'pick-one',
          options: [
            { dept: 'ECON', number: '102A' }, { dept: 'ECON', number: '102B' },
            { dept: 'ECON', number: '100' }, { dept: 'ECON', number: '101' },
            { dept: 'ECON', number: '103A' }, { dept: 'ECON', number: '104' },
            { dept: 'ECON', number: '108' }, { dept: 'ECON', number: '110' },
            { dept: 'ECON', number: '112' }, { dept: 'ECON', number: '116' },
            { dept: 'ECON', number: '120' }, { dept: 'ECON', number: '122' },
            { dept: 'ECON', number: '125' }, { dept: 'ECON', number: '127' },
            { dept: 'ECON', number: '128' }, { dept: 'ECON', number: '131' },
            { dept: 'ECON', number: '135' }, { dept: 'ECON', number: '140' },
            { dept: 'ECON', number: '141' }, { dept: 'ECON', number: '136' },
            { dept: 'ECON', number: '138' }, { dept: 'ECON', number: '144' },
            { dept: 'ECON', number: '147' }, { dept: 'ECON', number: '149' },
            { dept: 'ECON', number: '152' }, { dept: 'ECON', number: '155' },
            { dept: 'ECON', number: '164' }, { dept: 'ECON', number: '165' },
            { dept: 'ECON', number: '168' }, { dept: 'ECON', number: '176' },
            { dept: 'ECON', number: '181' }, { dept: 'ECON', number: '185' },
            { dept: 'ECON', number: '186' }, { dept: 'ECON', number: '191' },
            { dept: 'ECON', number: '202' }, { dept: 'ECON', number: '210' },
          ] },
        { id: 'field-course-2', label: 'Field Course 2', type: 'pick-one',
          note: 'ECON 135, 140, and 141 are omitted here so no more than one course from that overlapping trio can count.',
          options: [
            { dept: 'ECON', number: '102A' }, { dept: 'ECON', number: '102B' },
            { dept: 'ECON', number: '100' }, { dept: 'ECON', number: '101' },
            { dept: 'ECON', number: '103A' }, { dept: 'ECON', number: '104' },
            { dept: 'ECON', number: '108' }, { dept: 'ECON', number: '110' },
            { dept: 'ECON', number: '112' }, { dept: 'ECON', number: '116' },
            { dept: 'ECON', number: '120' }, { dept: 'ECON', number: '122' },
            { dept: 'ECON', number: '125' }, { dept: 'ECON', number: '127' },
            { dept: 'ECON', number: '128' }, { dept: 'ECON', number: '131' },
            { dept: 'ECON', number: '136' }, { dept: 'ECON', number: '138' },
            { dept: 'ECON', number: '144' }, { dept: 'ECON', number: '147' },
            { dept: 'ECON', number: '149' }, { dept: 'ECON', number: '152' },
            { dept: 'ECON', number: '155' }, { dept: 'ECON', number: '164' },
            { dept: 'ECON', number: '165' }, { dept: 'ECON', number: '168' },
            { dept: 'ECON', number: '176' }, { dept: 'ECON', number: '181' },
            { dept: 'ECON', number: '185' }, { dept: 'ECON', number: '186' },
            { dept: 'ECON', number: '191' }, { dept: 'ECON', number: '202' },
            { dept: 'ECON', number: '210' },
          ] },
      ],
    },

    // ── Electives (5 units minimum) ────────────────────────────────────────────
    {
      id: 'electives',
      name: 'Electives (at least 5 units)',
      minUnits: 5,
      unitOnly: true,
      note: 'Any ECON courses offered for letter grade. If ECON 1 is waived, add 5 extra elective units. If 2 field courses total less than 10 units, make up the difference in electives.',
      slots: [
        { id: 'elec', label: 'ECON Electives', type: 'any-approved', options: [],
          note: 'Any letter-graded ECON course.' },
      ],
    },
  ],
};
