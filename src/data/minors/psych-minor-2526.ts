// Psychology Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/PSYCH-MIN/
// 35 units minimum. Grade of C- or better required (except S/NC-only courses).
// AP credit may NOT be used toward the Psychology minor.
// Independent study, research, and practicum cannot count toward the minor.
// Summer quarter Psychology courses are NOT applicable toward the 35 units.
// All courses must be taken at Stanford (no transfer credit by petition).
// Cognate courses that count as PSYCH electives: BIO 150, PSYC 135, PSYC 139.

import type { MajorConfig } from '../majorSchema';

// All 10 core courses (Areas A + B) for the 3rd core slot
const PSYCH_CORE_ALL = [
  // Area A
  { dept: 'PSYCH', number: '30' }, { dept: 'PSYCH', number: '35' },
  { dept: 'PSYCH', number: '45' }, { dept: 'PSYCH', number: '50' },
  // Area B
  { dept: 'PSYCH', number: '60' }, { dept: 'PSYCH', number: '70' },
  { dept: 'PSYCH', number: '75' }, { dept: 'PSYCH', number: '80' },
  { dept: 'PSYCH', number: '90' }, { dept: 'PSYCH', number: '95' },
];

export const PSYCH_MINOR_2526: MajorConfig = {
  id: 'psych-minor-2526',
  name: 'Psychology (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PSYCH-MIN/',
  category: 'minor',
  totalMinUnits: 35,
  sections: [
    // ── Required Courses ──────────────────────────────────────────────────────
    {
      id: 'required',
      name: 'Required Introduction',
      note: 'PSYCH 1 is required. AP credit may NOT be used for any psychology requirement. All courses must be taken at Stanford.',
      slots: [
        { id: 'psych1', label: 'PSYCH 1: Introduction to Psychology', type: 'required',
          options: [{ dept: 'PSYCH', number: '1' }] },
      ],
    },
    {
      id: 'statistics',
      name: 'Statistics Requirement (1 course)',
      minCourses: 1,
      note: 'Complete PSYCH 10 or a comparable Stanford statistics course. AP and transfer credit may not be used.',
      slots: [
        { id: 'psych10', label: 'PSYCH 10: Introduction to Statistical Methods: Precalculus', type: 'required', optional: true,
          options: [{ dept: 'PSYCH', number: '10' }] },
        { id: 'psych-stats-sub', label: 'Comparable Stanford Statistics Course', type: 'pick-one', optional: true,
          options: [
            { dept: 'STATS', number: '131' },
            { dept: 'BIO', number: '141' },
            { dept: 'STATS', number: '191' },
            { dept: 'STATS', number: '203' },
            { dept: 'HUMBIO', number: '88' },
            { dept: 'HUMBIO', number: '89' },
            { dept: 'ECON', number: '102A' },
          ], note: 'Comparable statistics courses pre-approved for the Psychology minor; CS 109 is not on the minor list.' },
      ],
    },

    // ── Core Area A (at least 1 required) ─────────────────────────────────────
    {
      id: 'core-area-a',
      name: 'Core Area A (at least 1 required)',
      minCourses: 1,
      note: 'Select at least 1 course from Area A. The minor requires 3 total core courses (from Areas A and B combined), with at least 1 from each area.',
      slots: [
        { id: 'area-a', label: 'Core Area A course', type: 'pick-one',
          options: [
            { dept: 'PSYCH', number: '30', name: 'Introduction to Perception' },
            { dept: 'PSYCH', number: '35', name: 'Minds and Machines' },
            { dept: 'PSYCH', number: '45', name: 'Introduction to Learning and Memory' },
            { dept: 'PSYCH', number: '50', name: 'Introduction to Cognitive Neuroscience' },
          ] },
      ],
    },

    // ── Core Area B (at least 1 required) ─────────────────────────────────────
    {
      id: 'core-area-b',
      name: 'Core Area B (at least 1 required)',
      minCourses: 1,
      note: 'Select at least 1 course from Area B.',
      slots: [
        { id: 'area-b', label: 'Core Area B course', type: 'pick-one',
          options: [
            { dept: 'PSYCH', number: '60', name: 'Introduction to Developmental Psychology' },
            { dept: 'PSYCH', number: '70', name: 'Self and Society: Introduction to Social Psychology' },
            { dept: 'PSYCH', number: '75', name: 'Introduction to Cultural Psychology' },
            { dept: 'PSYCH', number: '80', name: 'Introduction to Personality and Affective Science' },
            { dept: 'PSYCH', number: '90', name: 'Introduction to Clinical Psychology: A Neuroscience Perspective' },
            { dept: 'PSYCH', number: '95', name: 'Introduction to Abnormal Psychology' },
          ] },
      ],
    },

    // ── 3rd Core Course (Area A or B) ─────────────────────────────────────────
    {
      id: 'core-third',
      name: '3rd Core Course (from Area A or B)',
      note: 'One additional core course from either Area A or Area B to reach the required total of 3 core courses.',
      slots: [
        { id: 'core-3', label: '3rd Core course (Area A or B)', type: 'pick-one',
          options: PSYCH_CORE_ALL },
      ],
    },

    // ── Elective Psychology Courses ───────────────────────────────────────────
    {
      id: 'electives',
      name: 'Elective Psychology Courses',
      note: 'Any PSYCH course offered for 3+ units (excluding independent study, research, and practicum) counts as a PSYCH elective. Summer quarter courses do NOT count. Three cognate courses from other departments also count: BIO 150, PSYC 135, PSYC 139. Additional Area A/B courses beyond the required 3 may also serve as electives. Total minor must reach 35 units.',
      slots: [
        { id: 'elec', label: 'PSYCH Electives (use Search & add)', type: 'any-approved', count: 10, optional: true,
          options: [
            { dept: 'BIO', number: '150', name: 'Cognate: Probability and Statistics for Life Scientists' },
            { dept: 'PSYC', number: '135', name: 'Cognate: Brain Plasticity' },
            { dept: 'PSYC', number: '139', name: 'Cognate: (see bulletin)' },
          ] },
      ],
    },
  ],
};
