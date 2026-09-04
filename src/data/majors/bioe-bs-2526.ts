// Bioengineering (BS), 2025-2026
// Source: https://bulletin.stanford.edu/programs/BIOE-BS/
// Cache:  course_sheets/bioe-bs-2526.cache.json

import type { MajorConfig, CourseOption } from '../majorSchema';

const FUND_ELECTIVE_OPTIONS: CourseOption[] = [
  { dept: 'ENGR', number: '10' },
  { dept: 'ENGR', number: '14' },
  { dept: 'ENGR', number: '15' },
  { dept: 'ENGR', number: '20' },
  { dept: 'ENGR', number: '21' },
  { dept: 'ENGR', number: '40M' },
  { dept: 'ENGR', number: '42' },
  { dept: 'ENGR', number: '50' },
  { dept: 'ENGR', number: '50E' },
  { dept: 'ENGR', number: '50M' },
  { dept: 'ENGR', number: '55' },
  { dept: 'ENGR', number: '60' },
  { dept: 'ENGR', number: '65' },
  { dept: 'ENGR', number: '76' },
  { dept: 'ENGR', number: '90' },
  { dept: 'MS&E', number: '111X' },
  { dept: 'MS&E', number: '111DS' },
];

const DEPTH_ELECTIVES: CourseOption[] = [
  { dept: 'BIOE', number: '51' },    // alternative: BIOE 51 OR BIOE 220
  { dept: 'BIOE', number: '220' },
  { dept: 'BIOE', number: '122' },
  { dept: 'BIOE', number: '201C' },
  { dept: 'BIOE', number: '209' },
  { dept: 'BIOE', number: '211' },
  { dept: 'BIOE', number: '212' },
  { dept: 'BIOE', number: '214' },
  { dept: 'BIOE', number: '217' },
  { dept: 'BIOE', number: '221' },
  { dept: 'BIOE', number: '222' },
  { dept: 'BIOE', number: '224' },
  { dept: 'BIOE', number: '225' },
  { dept: 'BIOE', number: '227' },
  { dept: 'BIOE', number: '231' },
  { dept: 'BIOE', number: '260' },
  { dept: 'BIOE', number: '279' },
  { dept: 'BIOE', number: '281' },
  { dept: 'BIOE', number: '291' },
  { dept: 'BIOE', number: '301A' },
  { dept: 'BIOE', number: '301B' },
  { dept: 'BIOE', number: '301E' },
  { dept: 'BIOE', number: '301P' },
];

export const BIOE_BS_2526: MajorConfig = {
  id: 'bioe-bs-2526',
  name: 'Bioengineering (BS)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/BIOE-BS/',
  category: 'major',
  totalMinUnits: 100,

  sections: [
    // ── Mathematics ───────────────────────────────────────────────────────
    {
      id: 'math',
      name: 'Mathematics',
      minUnits: 24,
      note: 'Prerequisites: 10 units AP/IB credit or the MATH 19/20/21 series. Take CME 100+102 together OR MATH 51+53 together: do not mix series. CME series is strongly recommended. If using MATH series, CME 192 is strongly recommended alongside for computational skills. CME 104 is recommended (not required) for some BIOE courses.',
      slots: [
        {
          id: 'math19',
          label: 'MATH 19: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '19' }],
        },
        {
          id: 'math20',
          label: 'MATH 20: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '20' }],
        },
        {
          id: 'math21',
          label: 'MATH 21: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '21' }],
        },
        {
          id: 'math-series-1',
          label: 'Multivariable Math / Linear Algebra (Series Part 1)',
          type: 'pick-one',
          options: [
            { dept: 'CME',  number: '100', name: 'Vector Calculus for Engineers' },
            { dept: 'MATH', number: '51',  name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ],
          note: 'Must be from the same series as the next slot (CME 100+102 or MATH 51+53).',
        },
        {
          id: 'math-series-2',
          label: 'Differential Equations (Series Part 2)',
          type: 'pick-one',
          options: [
            { dept: 'CME',  number: '102', name: 'Ordinary Differential Equations for Engineers' },
            { dept: 'MATH', number: '53',  name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' },
          ],
          note: 'Take with the matching course above: CME 102 with CME 100, or MATH 53 with MATH 51.',
        },
        {
          id: 'stats',
          label: 'Statistics',
          type: 'pick-one',
          options: [
            { dept: 'CME',   number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
            { dept: 'STATS', number: '110', name: 'Introduction to Statistics for Engineering and the Sciences' },
            { dept: 'STATS', number: '141', name: 'Introduction to Statistics for Biology' },
          ],
          note: 'CME 106 is recommended: it builds computational skills.',
        },
      ],
    },

    // ── Science ───────────────────────────────────────────────────────────
    {
      id: 'science',
      name: 'Science',
      minUnits: 26,
      note: 'Requires Chemistry (CHEM 31A+B or equivalent, plus CHEM 33), calculus-based Physics (PHYSICS 41+43), and two BIO core courses. CHEM 31A+B together count as one chemistry requirement; CHEM 31M, 31E, or 31X (or AP/IB Chemistry with placement into CHEM 33 via Chemistry Diagnostic) may substitute.',
      slots: [
        {
          id: 'bio-core-1',
          label: 'BIO Core I',
          type: 'pick-one',
          options: [
            { dept: 'BIO', number: '82', name: 'Genetics' },
            { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
          ],
        },
        {
          id: 'bio84',
          label: 'BIO 84: Physiology',
          type: 'required',
          options: [{ dept: 'BIO', number: '84' }],
        },
        {
          id: 'chem31a',
          label: 'CHEM 31A: Chemical Principles I',
          type: 'required',
          options: [{ dept: 'CHEM', number: '31A' }],
          note: 'CHEM 31A+B together fulfill the first chemistry requirement. Substitution: CHEM 31M, 31E, or 31X; or AP/IB Chemistry with placement into CHEM 33.',
        },
        {
          id: 'chem31b',
          label: 'CHEM 31B: Chemical Principles II',
          type: 'required',
          options: [{ dept: 'CHEM', number: '31B' }],
        },
        {
          id: 'chem33',
          label: 'CHEM 33: Structure and Reactivity of Carbon-Based Molecules',
          type: 'required',
          options: [{ dept: 'CHEM', number: '33' }],
        },
        {
          id: 'phys41',
          label: 'PHYSICS 41: Mechanics',
          type: 'required',
          options: [{ dept: 'PHYSICS', number: '41' }],
        },
        {
          id: 'phys43',
          label: 'PHYSICS 43: Electricity and Magnetism',
          type: 'required',
          options: [{ dept: 'PHYSICS', number: '43' }],
        },
      ],
    },

    // ── Technology in Society ──────────────────────────────────────────────
    {
      id: 'tis',
      name: 'Technology in Society',
      note: 'BIOE 131 is required for this section and also satisfies the BIOE-specific WIM requirement.',
      slots: [
        {
          id: 'bioe131',
          label: 'BIOE 131: Ethics in Bioengineering (WIM)',
          type: 'required',
          options: [{ dept: 'BIOE', number: '131' }],
          note: 'Fulfills BIOE-specific WIM.',
        },
      ],
    },

    // ── Engineering Fundamentals ───────────────────────────────────────────
    {
      id: 'engr-fund',
      name: 'Engineering Fundamentals',
      note: '3 courses required. Minimum combined GPA 2.0 for all Engineering Fundamentals and Depth courses. Only one CS class may count toward Fundamentals requirements.',
      slots: [
        {
          id: 'bioe80',
          label: 'BIOE 80: Introduction to Bioengineering (Engineering Living Matter)',
          type: 'required',
          options: [{ dept: 'BIOE', number: '80' }],
        },
        {
          id: 'cs-prog',
          label: 'Programming Course',
          type: 'pick-one',
          options: [
            { dept: 'CS', number: '106A', name: 'Programming Methodology' },
            { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
            { dept: 'CS', number: '106X', name: 'Programming Abstractions (Accelerated)' },
          ],
          note: 'Only one CS course may count toward Fundamentals. No CS courses are allowed in the Fundamentals Elective slot below.',
        },
        {
          id: 'fund-elective',
          label: 'Fundamentals Elective',
          type: 'pick-from-list',
          count: 1,
          options: FUND_ELECTIVE_OPTIONS,
          note: 'ENGR 50/50E/50M are alternative versions of the same course; MS&E 111X and MS&E 111DS are alternatives: only one of each pair counts.',
        },
      ],
    },

    // ── Bioengineering Core ────────────────────────────────────────────────
    {
      id: 'core',
      name: 'Bioengineering Core',
      note: 'A course may only be counted toward one requirement; no double-counting. All courses must be taken for a letter grade if the option is offered. Minimum combined GPA 2.0 for Engineering Fundamentals and Depth. BIOE 141A/B also satisfy the Capstone Experience requirement. Students pursuing a premed program must take additional courses.',
      slots: [
        {
          id: 'bioe42',
          label: 'BIOE 42: Physical Biology',
          type: 'required',
          options: [{ dept: 'BIOE', number: '42' }],
        },
        {
          id: 'bioe44',
          label: 'BIOE 44: Fundamentals for Engineering Biology Lab',
          type: 'required',
          options: [{ dept: 'BIOE', number: '44' }],
        },
        {
          id: 'bioe101',
          label: 'BIOE 101: Systems Biology',
          type: 'required',
          options: [{ dept: 'BIOE', number: '101' }],
        },
        {
          id: 'bioe103',
          label: 'BIOE 103: Systems Physiology and Design',
          type: 'required',
          options: [{ dept: 'BIOE', number: '103' }],
        },
        {
          id: 'bioe123',
          label: 'BIOE 123: Bioengineering Systems Prototyping Lab',
          type: 'required',
          options: [{ dept: 'BIOE', number: '123' }],
        },
        {
          id: 'bioe141a',
          label: 'BIOE 141A: Senior Capstone Design I (Capstone)',
          type: 'required',
          options: [{ dept: 'BIOE', number: '141A' }],
          note: 'Also satisfies the Capstone Experience requirement.',
        },
        {
          id: 'bioe141b',
          label: 'BIOE 141B: Senior Capstone Design II (Capstone)',
          type: 'required',
          options: [{ dept: 'BIOE', number: '141B' }],
          note: 'Also satisfies the Capstone Experience requirement.',
        },
      ],
    },

    // ── Depth in Discipline ────────────────────────────────────────────────
    {
      id: 'depth',
      name: 'Depth in Discipline',
      minUnits: 8,
      note: 'Minimum 3 courses and 8 units from the approved list. BIOE 51 and BIOE 220 are alternatives: only one may count. Independent study, individual research, and directed study courses do not count. If a course is cross-listed, enroll in the BIOE section. Students may submit at most 1 petition; any petitioned course must be at least 3 units.',
      slots: [
        {
          id: 'depth-electives',
          label: 'Depth Electives (min 3 courses, 8+ units)',
          type: 'pick-from-list',
          count: 3,
          options: DEPTH_ELECTIVES,
        },
      ],
    },
  ],

  wimCourses: [
    { dept: 'BIOE', number: '131' },
    { dept: 'BIOE', number: '212' },



  ],
};
