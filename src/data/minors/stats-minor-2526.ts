// Statistics Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/STATS-MIN
// Total: 20 units. All for letter grade when offered. Only MATH 52 may double-count.

import type { MajorConfig } from '../majorSchema';

export const STATS_MINOR_2526: MajorConfig = {
  id: 'stats-minor-2526',
  name: 'Statistics (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/STATS-MIN/',
  category: 'minor',
  totalMinUnits: 20,
  sections: [
    {
      id: 'qualifying',
      name: 'Qualifying Course',
      note: 'Choose one approved qualifying course. CME 102 is not a suitable substitute for MATH 52; students who took CME 102 must choose another option. MATH 52 is the only course that may double-count between this minor and a major or another minor.',
      slots: [
        {
          id: 'qualifying-course',
          label: 'Qualifying Course',
          type: 'pick-one',
          options: [
            { dept: 'ENGR', number: '108' },
            { dept: 'MATH', number: '52' },
            { dept: 'MATH', number: '62CM' },
            { dept: 'MATH', number: '63DM' },
            { dept: 'MATH', number: '104' },
            { dept: 'STATS', number: '191' },
            { dept: 'STATS', number: '203' },
          ],
        },
      ],
    },
    {
      id: 'core',
      name: 'Required Statistics Courses',
      slots: [
        {
          id: 'probability',
          label: 'Probability Theory for Statistical Inference',
          type: 'pick-one',
          note: 'Take STATS 118 or MATH 151. Students who previously completed STATS 116 (no longer offered) may count it here. STATS 118 has prerequisite STATS 117; CS 109, EE 178, or MS&E 120 may substitute for that prerequisite but do not themselves fulfill this requirement.',
          options: [
            { dept: 'STATS', number: '116' },
            { dept: 'STATS', number: '118' },
            { dept: 'MATH', number: '151' },
          ],
        },
        {
          id: 'stats200',
          label: 'Introduction to Statistical Inference',
          type: 'pick-one',
          note: 'STATS 200 may not be substituted or waived except by STATS 200Q.',
          options: [
            { dept: 'STATS', number: '200' },
            { dept: 'STATS', number: '200Q' },
          ],
        },
      ],
    },
    {
      id: 'electives',
      name: 'Electives (at least 3 courses, minimum 9 units)',
      minCourses: 3,
      minUnits: 9,
      note: 'Complete at least 3 courses and at least 9 units of STATS courses numbered 200 or above. At most one elective may instead be a pre-approved course outside Statistics: any DATASCI course numbered 100 or above, BIO 283, ECON 160, EE 264, or EE 279. Other exceptions require department approval. All minor courses must be taken for a letter grade.',
      slots: [
        {
          id: 'stats-electives',
          label: 'STATS 200+ or one pre-approved outside elective',
          type: 'any-approved',
          count: 3,
          options: [],
          listUrl: 'https://bulletin.stanford.edu/programs/STATS-MIN/',
          note: 'Enter courses totaling at least 9 units. Only one may be outside STATS, from the pre-approved list in the section note.',
        },
      ],
    },
  ],
};
