// Psychology BA: School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/PSYCH-BA
// Min 70 units (60 must be PSYCH dept; up to 10 outside PSYCH with advisor approval).
// Letter grade C- or better (except S/NC-only courses).
// NO AP credit accepted for PSYCH 1 or PSYCH 10.
// PSYCH 10 substitutes allowed ONLY if course is also required by another degree program:
//   STATS 131/BIO 141, STATS 191, STATS 203, HUMBIO 88, HUMBIO 89, ECON 102A
// Summer quarter courses count toward 70 units but NOT toward core requirements.
// Cognate courses BIO 150, PSYC 135, PSYC 139 count as PSYCH units (not outside-dept units).
// Research cap: up to 10 units combined (PSYCH 194, 195, 198, 281); 15 units for honors/TAs.
// Capstone required: choose either Honors (PSYCH 198) or Applied (PSYCH 196).
// Honors application deadline: June of junior year.

import type { MajorConfig } from '../majorSchema';

export const PSYCH_BA_2526: MajorConfig = {
  id: 'psych-ba-2526',
  name: 'Psychology (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PSYCH-BA/',
  category: 'major',
  totalMinUnits: 70,
  sections: [
    // ── Introductory Courses (both required) ───────────────────────────────────
    {
      id: 'intro',
      name: 'Introductory Courses (both required)',
      minCourses: 2,
      note: 'Both PSYCH 1 and PSYCH 10 are required. AP credit NOT accepted. PSYCH 10 may be substituted only if the substitute course is ALSO required by another program (STATS 131/BIO 141, STATS 191, STATS 203, HUMBIO 88, HUMBIO 89, or ECON 102A). Standard statistics courses like STATS 60 do NOT substitute.',
      slots: [
        {
          id: 'psych1',
          label: 'PSYCH 1: Introduction to Psychology',
          type: 'required',
          options: [{ dept: 'PSYCH', number: '1' }],
        },
        {
          id: 'psych10',
          label: 'PSYCH 10: Statistical Methods for Psychology',
          type: 'pick-one',
          note: 'Substitutes allowed ONLY if course is also required by another degree program you are pursuing.',
          options: [
            { dept: 'PSYCH', number: '10' },
            { dept: 'STATS', number: '131', name: 'Introduction to Statistical Learning (BIO 141)' },
            { dept: 'STATS', number: '191', name: 'Introduction to Causal Inference' },
            { dept: 'STATS', number: '203', name: 'Introduction to Regression Models and Analysis of Variance' },
            { dept: 'HUMBIO', number: '88', name: 'Data Science for Human Biology' },
            { dept: 'HUMBIO', number: '89', name: 'Applied Statistics for Behavioral Science' },
            { dept: 'ECON', number: '102A', name: 'Introduction to Statistical Methods for Economists' },
          ],
        },
      ],
    },

    // ── Core Courses (5 required: ≥2 Area A + ≥2 Area B) ──────────────────────
    {
      id: 'core-a',
      name: 'Core: Area A: Cognitive, Perceptual, and Learning Sciences (choose ≥2)',
      minCourses: 2,
      note: 'Select at least 2 courses from Area A.',
      slots: [
        {
          id: 'core-a-courses',
          label: 'Area A Courses',
          type: 'pick-from-list',
          count: 2,
          note: 'Must choose at least 2 from Area A. A 5th core course can come from either area.',
          options: [
            { dept: 'PSYCH', number: '30', name: 'Introduction to Perception' },
            { dept: 'PSYCH', number: '35', name: 'Minds and Machines' },
            { dept: 'PSYCH', number: '45', name: 'Introduction to Learning and Memory' },
            { dept: 'PSYCH', number: '50', name: 'Introduction to Cognitive Neuroscience' },
          ],
        },
      ],
    },

    {
      id: 'core-b',
      name: 'Core: Area B: Biological, Social, Developmental, and Clinical Sciences (choose ≥2)',
      minCourses: 2,
      note: 'Select at least 2 courses from Area B. The 5th core course can come from either area.',
      slots: [
        {
          id: 'core-b-courses',
          label: 'Area B Courses',
          type: 'pick-from-list',
          count: 2,
          note: 'Must choose at least 2 from Area B.',
          options: [
            { dept: 'PSYCH', number: '60', name: 'Introduction to Developmental Psychology' },
            { dept: 'PSYCH', number: '70', name: 'Self and Society: Introduction to Social Psychology' },
            { dept: 'PSYCH', number: '75', name: 'Introduction to Cultural Psychology' },
            { dept: 'PSYCH', number: '80', name: 'Introduction to Personality and Affective Science' },
            { dept: 'PSYCH', number: '90', name: 'Introduction to Clinical Psychology: A Neuroscience Perspective' },
            { dept: 'PSYCH', number: '95', name: 'Introduction to Abnormal Psychology' },
          ],
        },
      ],
    },

    {
      id: 'core-5th',
      name: 'Core: 5th Course (from Area A or Area B)',
      minCourses: 1,
      note: 'The 5th required core course may come from either Area A or Area B.',
      slots: [
        {
          id: 'core-5th-course',
          label: '5th Core Course (Area A or B)',
          type: 'pick-one',
          options: [
            { dept: 'PSYCH', number: '30', name: 'Introduction to Perception (Area A)' },
            { dept: 'PSYCH', number: '35', name: 'Minds and Machines (Area A)' },
            { dept: 'PSYCH', number: '45', name: 'Introduction to Learning and Memory (Area A)' },
            { dept: 'PSYCH', number: '50', name: 'Introduction to Cognitive Neuroscience (Area A)' },
            { dept: 'PSYCH', number: '60', name: 'Introduction to Developmental Psychology (Area B)' },
            { dept: 'PSYCH', number: '70', name: 'Self and Society: Introduction to Social Psychology (Area B)' },
            { dept: 'PSYCH', number: '75', name: 'Introduction to Cultural Psychology (Area B)' },
            { dept: 'PSYCH', number: '80', name: 'Introduction to Personality and Affective Science (Area B)' },
            { dept: 'PSYCH', number: '90', name: 'Introduction to Clinical Psychology: A Neuroscience Perspective (Area B)' },
            { dept: 'PSYCH', number: '95', name: 'Introduction to Abnormal Psychology (Area B)' },
          ],
        },
      ],
    },

    // ── Electives ──────────────────────────────────────────────────────────────
    {
      id: 'electives',
      name: 'Psychology Electives (remaining units to reach 70)',
      note: 'Any PSYCH course ≥3 units offered for letter grade. Up to 10 outside-PSYCH units with advisor approval. Research/independent study/practica cap: 10 units total (PSYCH 194, 195, 198, 281); raised to 15 for Honors students or TAs. Cognate courses BIO 150, PSYC 135, PSYC 139 count as PSYCH units (not outside-dept units). Summer quarter courses count toward 70 units but NOT toward core requirements.',
      slots: [
        {
          id: 'elec',
          label: 'PSYCH Electives',
          type: 'any-approved',
          options: [
            { dept: 'BIO', number: '150', name: 'Neurobiology (cognate: counts as PSYCH units)' },
            { dept: 'PSYC', number: '135', name: 'Neuropsychopharmacology (cognate: counts as PSYCH units)' },
            { dept: 'PSYC', number: '139', name: 'Psychedelic Science (cognate: counts as PSYCH units)' },
          ],
          note: 'Any letter-graded PSYCH course ≥3 units. BIO 150, PSYC 135, PSYC 139 count as PSYCH (not outside-dept) units. Up to 10 units research/independent study/practica (PSYCH 194, 195, 198, 281); 15 units if in Honors or TA.',
        },
      ],
    },

    // ── Capstone (1 required: choose Honors or Applied) ──────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (choose 1)',
      note: 'All students must complete a capstone. Choose ONE option: Psychology Honors or Psych Applied.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-honors',
          name: 'Option A: Psychology Honors',
          note: 'Year-long senior seminar (autumn/winter/spring) with honors thesis. Apply by April 15 of junior year. Requires completing PSYCH 198 for three quarters and presenting at the Honors Convention. Graduation with departmental honors requires all regular major requirements plus PSYCH 198 three times and completed thesis with presentation.',
          slots: [
            { id: 'cap-honors-course', label: 'PSYCH 198: Psychology Honors (three quarters)', type: 'required', times: 3, options: [{ dept: 'PSYCH', number: '198', name: 'Psychology Honors' }] },
          ],
        },
        {
          id: 'cap-applied',
          name: 'Option B: Psych Applied',
          note: 'Three-part senior-year seminar series (each quarter during senior year) integrating psychology learning with real-world career preparation. Culminates in a capstone project.',
          slots: [
            { id: 'cap-applied-course', label: 'PSYCH 196: Psych Applied (three quarters)', type: 'required', times: 3, options: [{ dept: 'PSYCH', number: '196', name: 'Capstone: Psych Applied' }] },
          ],
        },
      ],
    },

    // ── Writing in the Major (WIM) ─────────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      minCourses: 1,
      note: 'Complete 1 designated WIM course. List may change; verify each year at ExploreCourses.',
      slots: [
        {
          id: 'wim-course',
          label: 'WIM Course',
          type: 'pick-one',
          options: [
            { dept: 'PSYCH', number: '138', name: 'Wise Interventions (5 units, lecture + discussion required)' },
            { dept: 'PSYCH', number: '144', name: 'The Sociocultural Shaping of Psychological Experience' },
            { dept: 'PSYCH', number: '164', name: 'Brain Decoding' },
            { dept: 'PSYCH', number: '175', name: 'Developmental Science of Social Cognition' },
            { dept: 'PSYCH', number: '180', name: 'Advanced Seminar on Racial Bias and Structural Inequality' },
          ],
        },
      ],
    },
  ],

  wimCourses: [
    { dept: 'PSYCH', number: '138', name: 'Wise Interventions' },
    { dept: 'PSYCH', number: '144', name: 'The Sociocultural Shaping of Psychological Experience' },
    { dept: 'PSYCH', number: '164', name: 'Brain Decoding' },
    { dept: 'PSYCH', number: '175', name: 'Developmental Science of Social Cognition' },
    { dept: 'PSYCH', number: '180', name: 'Advanced Seminar on Racial Bias and Structural Inequality' },
  ],
};
