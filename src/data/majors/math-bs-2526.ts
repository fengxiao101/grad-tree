// Mathematics BS, School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/MATH-BS
// Key rule: 57 units of Math dept courses for letter grade. Very flexible: no specific required courses.
// STATS 116, STATS 118, STATS 200, CS 109, CS 109B, MATH 151, MATH 152 count as Math courses.
// MATH 56, MATH 193 (Intro Seminars), MATH 193X, MATH 197, MATH 198, MATH 199 do NOT count toward 57.
// Cross-listed courses: must enroll in MATH section.

import type { MajorConfig } from '../majorSchema';

export const MATH_BS_2526: MajorConfig = {
  id: 'math-bs-2526',
  name: 'Mathematics (BS)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MATH-BS/',
  category: 'major',
  totalMinUnits: 69,
  sections: [
    // ── Single-Variable Calculus (pre-major prerequisite) ─────────────────────
    {
      id: 'calc',
      maxCountedUnits: 10,
      name: 'Single-Variable Calculus',
      note: 'Up to 10 units of single-variable calculus count toward the 57-unit requirement. Students with AP/IB credit or Math 60CM/60DM satisfy this differently: email mathstudentservices@stanford.edu.',
      slots: [
        { id: 'calc1', label: 'Calculus I', type: 'required',
          options: [{ dept: 'MATH', number: '19' }] },
        { id: 'calc2', label: 'Calculus II', type: 'required',
          options: [{ dept: 'MATH', number: '20' }] },
        { id: 'calc3', label: 'Calculus III', type: 'required',
          options: [{ dept: 'MATH', number: '21' }] },
      ],
    },

    // ── Core Math Requirement (57 units) ──────────────────────────────────────
    {
      id: 'core-57',
      name: 'Core Math Requirement (57 units of MATH courses)',
      minUnits: 57,
      note: 'All 57 units must be MATH dept courses taken for a letter grade. At least 8 MATH courses must be above MATH 51/52 (100-level+). STATS 116, STATS 118 or STATS 200 (at most one of 118/200), CS 109, CS 109B, MATH 151, and MATH 152 count as Math courses. 32 units must be from Stanford. MATH 193 (Intro Seminars), MATH 193X, MATH 197, MATH 198, MATH 199 do NOT count toward 57.',
      slots: [
        { id: 'math-51', label: 'MATH 51: Linear Algebra, Multivariable Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '51' }] },
        { id: 'math-52-or-53', label: 'MATH 52 or MATH 53',
          type: 'pick-one',
          note: 'MATH 52 (Integral Calculus of Several Variables) or MATH 53 (Ordinary Differential Equations). Both are recommended for most students.',
          options: [
            { dept: 'MATH', number: '52' },
            { dept: 'MATH', number: '53' },
          ] },
        { id: 'above-51-courses', label: 'MATH Courses at 100-level or above (at least 8)',
          type: 'pick-from-list', count: 8, minLevel: 100,
          note: 'Must be MATH dept letter-graded courses. Common starting points: MATH 104 (Applied Matrix Theory), MATH 109 (Combinatorics), MATH 110 (Number Theory), MATH 113 (Linear Algebra), MATH 115 (Real Variable), MATH 120 (Groups & Rings), MATH 143 (Differential Geometry), MATH 151 (Probability).',
          options: [
            { dept: 'MATH', number: '104' }, { dept: 'MATH', number: '106' },
            { dept: 'MATH', number: '108' }, { dept: 'MATH', number: '109' },
            { dept: 'MATH', number: '110' }, { dept: 'MATH', number: '113' },
            { dept: 'MATH', number: '115' }, { dept: 'MATH', number: '116' },
            { dept: 'MATH', number: '120' }, { dept: 'MATH', number: '121' },
            { dept: 'MATH', number: '143' },
            { dept: 'MATH', number: '147' }, { dept: 'MATH', number: '148' },
            { dept: 'MATH', number: '151' }, { dept: 'MATH', number: '152' },
            { dept: 'MATH', number: '155' }, { dept: 'MATH', number: '158' },
            { dept: 'MATH', number: '163' }, { dept: 'MATH', number: '171' },
            { dept: 'MATH', number: '172' }, { dept: 'MATH', number: '175' },
            { dept: 'MATH', number: '176' },
            // Counted-as-Math courses:
            { dept: 'CS', number: '109' }, { dept: 'CS', number: '109B' },
            { dept: 'STATS', number: '116' }, { dept: 'STATS', number: '118' },
            { dept: 'STATS', number: '200' },
          ] },
      ],
    },

    // ── Elective Requirement (4 courses) ──────────────────────────────────────
    {
      id: 'electives',
      name: 'Electives (4 courses, at least 3 for letter grade)',
      minCourses: 4,
      note: 'MATH 193X and MATH 199 may count toward electives but NOT toward the 57 core units. Out-of-department electives from the pre-approved list may be used. PHIL 151 & 152 can count toward electives OR toward the 57 units, but not both. STATS 116/118/200 similarly.',
      slots: [
        { id: 'elec-courses', label: 'Elective Courses', type: 'pick-from-list', count: 4,
          options: [
            // Math dept (100+)
            { dept: 'MATH', number: '104' }, { dept: 'MATH', number: '106' },
            { dept: 'MATH', number: '108' }, { dept: 'MATH', number: '109' },
            { dept: 'MATH', number: '110' }, { dept: 'MATH', number: '113' },
            { dept: 'MATH', number: '115' }, { dept: 'MATH', number: '116' },
            { dept: 'MATH', number: '120' }, { dept: 'MATH', number: '121' },
            { dept: 'MATH', number: '143' },
            { dept: 'MATH', number: '147' }, { dept: 'MATH', number: '148' },
            { dept: 'MATH', number: '151' }, { dept: 'MATH', number: '152' },
            { dept: 'MATH', number: '155' }, { dept: 'MATH', number: '158' },
            { dept: 'MATH', number: '163' }, { dept: 'MATH', number: '171' },
            { dept: 'MATH', number: '172' }, { dept: 'MATH', number: '175' },
            { dept: 'MATH', number: '176' },
            { dept: 'MATH', number: '193X' }, // electives only, not 57-unit core
            { dept: 'MATH', number: '199' },  // electives only, not 57-unit core
            // Pre-approved non-Math electives:
            { dept: 'CS', number: '109' }, { dept: 'CS', number: '109B' },
            { dept: 'CS', number: '157' },
            { dept: 'CS', number: '205B' },
            { dept: 'CS', number: '228' }, { dept: 'CS', number: '229' },
            { dept: 'CS', number: '261' },
            { dept: 'STATS', number: '116' }, { dept: 'STATS', number: '200' },
            { dept: 'STATS', number: '300' },
            { dept: 'PHIL', number: '151' }, { dept: 'PHIL', number: '152' },
            { dept: 'ECON', number: '102A' }, { dept: 'ECON', number: '102B' },
          ] },
      ],
    },

    // ── Capstone ──────────────────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (one of three options)',
      note: 'Option A: Honors thesis (min 6 units MATH 197). Option B: approved upper-division undergrad Math course. Option C: approved graduate-level Math or Stats course. Capstone course may also satisfy WIM if it is WIM-approved.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-a',
          name: 'Option A: Honors Thesis (MATH 197, min 6 units)',
          slots: [
            { id: 'cap-a-197', label: 'MATH 197: Honors Thesis (min 6 units)', type: 'required', options: [{ dept: 'MATH', number: '197', name: 'Honors Thesis (min 6 units)' }] },
          ],
        },
        {
          id: 'cap-b',
          name: 'Option B: Approved Upper-Division Undergrad Course',
          slots: [
            { id: 'cap-b-course', label: 'Approved Upper-Division Undergrad Math Course', type: 'pick-one',
              options: [
                { dept: 'MATH', number: '220', name: 'Introduction to Mathematical Logic' },
                { dept: 'MATH', number: '230B', name: 'Theory of Probability II' },
                { dept: 'MATH', number: '248', name: 'Combinatorics' },
                { dept: 'MATH', number: '269', name: 'Topics in Combinatorics' },
                { dept: 'MATH', number: '270', name: 'Algebraic Combinatorics' },
                { dept: 'MATH', number: '286', name: 'Topics in Algebraic Geometry' },
                { dept: 'MATH', number: '288', name: 'Topics in Analytic and Algebraic Number Theory' },
                { dept: 'MATH', number: '291', name: 'Topics in Algebra' },
                { dept: 'CS', number: '109B', name: 'Advanced Topics in Probabilistic Analysis' },
              ],
            },
          ],
        },
        {
          id: 'cap-c',
          name: 'Option C: Graduate-Level Math/Stats Course',
          slots: [
            { id: 'cap-c-course', label: 'Graduate-Level Math/Stats Course', type: 'pick-one',
              options: [
                { dept: 'MATH', number: '205A', name: 'Real Analysis' },
                { dept: 'MATH', number: '205B', name: 'Real Analysis II' },
                { dept: 'MATH', number: '210A', name: 'Complex Analysis' },
                { dept: 'MATH', number: '210B', name: 'Complex Analysis II' },
                { dept: 'MATH', number: '210C', name: 'Complex Analysis III' },
                { dept: 'MATH', number: '215A', name: 'Algebraic Topology' },
                { dept: 'MATH', number: '215B', name: 'Algebraic Topology II' },
                { dept: 'MATH', number: '215C', name: 'Algebraic Topology III' },
                { dept: 'MATH', number: '220', name: 'Introduction to Mathematical Logic' },
                { dept: 'STATS', number: '300', name: 'Advanced Topics in Statistics' },
              ],
            },
          ],
        },
      ],
    },

    // ── WIM ───────────────────────────────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      minCourses: 1,
      slots: [
        { id: 'wim-course', label: 'WIM Course', type: 'pick-one',
          note: 'Must be taken for a letter grade. Check ExploreCourses each year for WIM-approved MATH courses.',
          options: [
            { dept: 'MATH', number: '101', name: 'Math Discovery Lab' },
            { dept: 'MATH', number: '109', name: 'Groups and Symmetry' },
            { dept: 'MATH', number: '110', name: 'Number Theory for Cryptography' },
            { dept: 'MATH', number: '120', name: 'Groups and Rings' },
            { dept: 'MATH', number: '171', name: 'Fundamental Concepts of Analysis' },
          ] },
      ],
    },
  ],

  wimCourses: [
    { dept: 'MATH', number: '101', name: 'Math Discovery Lab' },
    { dept: 'MATH', number: '109', name: 'Groups and Symmetry' },
    { dept: 'MATH', number: '110', name: 'Number Theory for Cryptography' },
    { dept: 'MATH', number: '120', name: 'Groups and Rings' },
    { dept: 'MATH', number: '171', name: 'Fundamental Concepts of Analysis' },
  ],
};
