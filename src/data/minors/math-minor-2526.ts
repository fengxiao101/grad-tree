// Mathematics Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/MATH-MIN
// 24 units minimum. Six MATH courses at or above MATH 51, taken for a letter grade.
// At least 3 of the 6 must be at the 100-level (upper division).
// 4 of the 6 courses must be taken at Stanford.
// STATS 116, STATS 118/200, PHIL 151, and PHIL 152 count as 100-level Math courses.
// Only Math 50/60CM/60DM series and first-year calculus can double-count toward another major/minor.

import type { MajorConfig } from '../majorSchema';

export const MATH_MINOR_2526: MajorConfig = {
  id: 'math-minor-2526',
  name: 'Mathematics (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MATH-MIN/',
  category: 'minor',
  totalMinUnits: 24,
  sections: [
    {
      id: 'minor-six-courses',
      name: '6 MATH Courses at or above MATH 51 (min 24 units)',
      minUnits: 24,
      minCourses: 6,
      note: 'Six MATH courses at or above MATH 51, totaling at least 24 units and taken for a letter grade. At least 3 must count as 100-level courses, and at least 4 must be taken at Stanford. MATH 193, 193X, 197, 198, and 199 do not count. STATS 116 (no longer offered), STATS 118, or STATS 200 may count as a 100-level MATH course, but at most one of those three may be used. PHIL 151, PHIL 152, MATH IntroSems, and MATH 56 also count toward the 100-level requirement. No other non-MATH courses count. Only the MATH 50/60CM/60DM series and first-year calculus may double-count with another major or minor. A complete multivariable sequence is recommended, not required.',
      slots: [
        {
          id: 'math-courses',
          label: 'Six approved MATH courses at MATH 51 level or above',
          type: 'any-approved',
          count: 6,
          options: [],
          listUrl: 'https://bulletin.stanford.edu/programs/MATH-MIN/',
          note: 'Enter all six courses manually. At least three must satisfy the Bulletin\'s 100-level rule; MATH 56 and MATH IntroSems qualify even though their catalog numbers are below 100.',
        },
      ],
    },
  ],
};
