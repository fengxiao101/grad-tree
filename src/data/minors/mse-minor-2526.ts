// Management Science and Engineering Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/MGTSC-MIN/
// totalMinUnits: 25
// Prerequisites (not counted toward minor): CME100 or MATH51; CS106A
// Core: MS&E111 + MS&E120 + MS&E121 + MS&E125 + MS&E180
// Electives: 2 MS&E 100+ courses, ≥3 units each, letter-graded
// Students who took CS109 or STATS118 may substitute another MS&E for MS&E120

import type { MajorConfig } from '../majorSchema';

export const MSE_MINOR_2526: MajorConfig = {
  id: 'mse-minor-2526',
  name: 'Management Science & Engineering (Minor)',
  school: 'School of Engineering',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 25,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MGTSC-MIN/',
  sections: [
    {
      id: 'mse-min-prereqs',
      name: 'Prerequisites (not counted toward minor)',
      phase: 'pre-major',
      note: 'Must be completed before taking core MS&E courses. These are prerequisites only and do not count toward the 25-unit minor.',
      slots: [
        {
          id: 'mse-min-prereq-math',
          label: 'Multivariable Calculus / Linear Algebra',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },
            { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ],
        },
        {
          id: 'mse-min-prereq-cs',
          label: 'CS 106A: Programming Methodology',
          type: 'required',
          options: [{ dept: 'CS', number: '106A', name: 'Programming Methodology' }],
        },
      ],
    },
    {
      id: 'mse-min-prob',
      name: 'Probability (1 course)',
      minCourses: 1,
      note: 'Take MS&E 120, OR if you completed CS 109 or STATS 118 for your major, substitute any other letter-graded MS&E 100+ course instead.',
      slots: [
        {
          id: 'mse-min-120',
          label: 'MS&E 120: Introduction to Probability',
          type: 'required',
          options: [{ dept: 'MS&E', number: '120', name: 'Introduction to Probability' }],
          optional: true,
        },
        {
          id: 'mse-min-120-sub',
          label: 'MS&E 100+ Substitute (if CS 109 or STATS 118 taken)',
          type: 'any-approved',
          options: [],
          count: 1,
          optional: true,
          note: 'Any MS&E course at the 100-level or above. Use "Search & add" to pin your substitute course.',
        },
      ],
    },
    {
      id: 'mse-min-core',
      name: 'Core Courses (all required, letter-graded)',
      slots: [
        {
          id: 'mse-min-111',
          label: 'MS&E 111: Introduction to Optimization',
          type: 'pick-one',
          options: [
            { dept: 'MS&E', number: '111', name: 'Introduction to Optimization' },
            { dept: 'MS&E', number: '111DS', name: 'Introduction to Optimization: Data Science' },
            { dept: 'MS&E', number: '111X', name: 'Introduction to Optimization (Accelerated)' },
          ],
        },
        {
          id: 'mse-min-121',
          label: 'MS&E 121: Introduction to Stochastic Modeling',
          type: 'required',
          options: [{ dept: 'MS&E', number: '121', name: 'Introduction to Stochastic Modeling' }],
        },
        {
          id: 'mse-min-125',
          label: 'MS&E 125: Introduction to Applied Statistics',
          type: 'required',
          options: [{ dept: 'MS&E', number: '125', name: 'Introduction to Applied Statistics' }],
        },
        {
          id: 'mse-min-180',
          label: 'MS&E 180: Organizations: Theory and Management',
          type: 'required',
          options: [{ dept: 'MS&E', number: '180', name: 'Organizations: Theory and Management' }],
        },
      ],
    },
    {
      id: 'mse-min-elec',
      name: 'Required Electives (2 courses, ≥3 units each, letter-graded)',
      note: 'Any two MS&E courses at the 100-level or higher, each for 3 or more units, taken for a letter grade.',
      slots: [
        {
          id: 'mse-min-elec-1',
          label: 'MS&E Elective 1 (100+)',
          type: 'any-approved',
          options: [],
          count: 1,
          minLevel: 100,
        },
        {
          id: 'mse-min-elec-2',
          label: 'MS&E Elective 2 (100+)',
          type: 'any-approved',
          options: [],
          count: 1,
          minLevel: 100,
        },
      ],
    },
  ],
};
