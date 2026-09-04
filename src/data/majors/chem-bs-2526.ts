import type { MajorConfig, CourseOption } from '../majorSchema';

const MATH_UPPER: CourseOption[] = [
  { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
  { dept: 'MATH', number: '61CM', name: 'Modern Mathematics: Continuous Methods' },
  { dept: 'MATH', number: '61DM', name: 'Modern Mathematics: Discrete Methods' },
];

export const CHEM_BS_2526: MajorConfig = {
  id: 'chem-bs-2526',
  name: 'Chemistry (BS)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 89,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CHEM-BS/',
  wimCourses: [
    { dept: 'CHEM', number: '131', name: 'Instrumental Analysis Principles and Practice' },
  ],

  sections: [
    {
      id: 'chem-safety',
      name: 'Lab Safety (conditional)',
      note: 'Students entering the program above CHEM 33 must complete CHEM 100 before any course with a lab component. CHEM 100 is only offered the second week of autumn quarter.',
      slots: [
        {
          id: 'chem-100',
          label: 'CHEM 100: Chemical Laboratory and Safety Skills',
          type: 'required',
          optional: true,
          options: [{ dept: 'CHEM', number: '100', name: 'Chemical Laboratory and Safety Skills' }],
          note: 'Required only for students entering the program above CHEM 33.',
        },
      ],
    },

    {
      id: 'chem-intro',
      name: 'Introductory Courses',
      note: 'All degree courses must be taken for a letter grade if that option is offered.',
      slots: [
        {
          id: 'chem-gen-chem-first',
          label: 'General Chemistry: first course (choose CHEM 31E or CHEM 31A+31B)',
          type: 'pick-one',
          options: [
            { dept: 'CHEM', number: '31E', name: 'Chemical Foundations and 21st Century Problems' },
            { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
          ],
          note: 'If CHEM 31A is chosen, CHEM 31B must also be completed. CHEM 31E covers equivalent material in one quarter.',
        },
        {
          id: 'chem-31b',
          label: 'CHEM 31B: Chemical Principles II',
          type: 'required',
          optional: true,
          options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
          note: 'Required if CHEM 31A was taken; not needed if CHEM 31E was taken.',
        },
        {
          id: 'chem-33',
          label: 'CHEM 33: Structure and Reactivity of Carbon-Based Molecules',
          type: 'required',
          options: [{ dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' }],
        },
        {
          id: 'chem-cs106a',
          label: 'CS 106A: Programming Methodology',
          type: 'required',
          options: [{ dept: 'CS', number: '106A', name: 'Programming Methodology' }],
        },
        {
          id: 'chem-math19',
          label: 'MATH 19: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '19', name: 'Calculus' }],
        },
        {
          id: 'chem-math20',
          label: 'MATH 20: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '20', name: 'Calculus' }],
        },
        {
          id: 'chem-math21',
          label: 'MATH 21: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '21', name: 'Calculus' }],
        },
      ],
    },

    {
      id: 'chem-pathway-selector',
      name: 'Pathway (choose 1)',
      trackSelector: true,
      note: 'Choose either the Traditional Chemistry Pathway or the Biological Chemistry Pathway.',
      slots: [],
    },
  ],

  tracks: [
    {
      id: 'traditional',
      name: 'Traditional Chemistry Pathway',
      sections: [
        {
          id: 'trad-foundational',
          name: 'Foundational Courses',
          slots: [
            {
              id: 'trad-chem121',
              label: 'CHEM 121: Understanding the Natural and Unnatural World through Chemistry',
              type: 'required',
              options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }],
            },
            {
              id: 'trad-chem131',
              label: 'CHEM 131: Instrumental Analysis Principles and Practice (WIM)',
              type: 'required',
              options: [{ dept: 'CHEM', number: '131', name: 'Instrumental Analysis Principles and Practice' }],
              note: 'Satisfies WIM requirement.',
            },
            {
              id: 'trad-chem151',
              label: 'CHEM 151: Inorganic Chemistry I',
              type: 'required',
              options: [{ dept: 'CHEM', number: '151', name: 'Inorganic Chemistry I' }],
            },
            {
              id: 'trad-chem171',
              label: 'CHEM 171: Foundations of Physical Chemistry',
              type: 'required',
              options: [{ dept: 'CHEM', number: '171', name: 'Foundations of Physical Chemistry' }],
            },
            {
              id: 'trad-chem181',
              label: 'CHEM 181: Biochemistry I',
              type: 'required',
              options: [{ dept: 'CHEM', number: '181', name: 'Biochemistry I' }],
            },
            {
              id: 'trad-math51',
              label: 'Upper-Division Math (choose 1)',
              type: 'pick-one',
              options: MATH_UPPER,
            },
            {
              id: 'trad-phys41',
              label: 'PHYSICS 41: Mechanics',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '41', name: 'Mechanics' }],
            },
            {
              id: 'trad-phys42',
              label: 'PHYSICS 42: Classical Mechanics Laboratory',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '42', name: 'Classical Mechanics Laboratory' }],
            },
            {
              id: 'trad-phys43',
              label: 'PHYSICS 43: Electricity and Magnetism',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' }],
            },
            {
              id: 'trad-phys44',
              label: 'PHYSICS 44: Electricity and Magnetism Lab',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '44', name: 'Electricity and Magnetism Lab' }],
            },
          ],
        },

        {
          id: 'trad-advanced',
          name: 'Advanced Courses',
          note: 'Requirements for students who entered Stanford autumn 2021 or later. Earlier matriculants should consult the bulletin for their entering year.',
          slots: [
            {
              id: 'trad-chem123',
              label: 'CHEM 123: Organic Polyfunctional Compounds',
              type: 'required',
              options: [{ dept: 'CHEM', number: '123', name: 'Organic Polyfunctional Compounds' }],
            },
            {
              id: 'trad-chem124',
              label: 'CHEM 124: Organic Chemistry Laboratory',
              type: 'required',
              options: [{ dept: 'CHEM', number: '124', name: 'Organic Chemistry Laboratory' }],
            },
            {
              id: 'trad-chem126',
              label: 'CHEM 126: Synthesis Laboratory',
              type: 'required',
              options: [{ dept: 'CHEM', number: '126', name: 'Synthesis Laboratory' }],
            },
            {
              id: 'trad-chem153',
              label: 'CHEM 153: Inorganic Chemistry II',
              type: 'required',
              options: [{ dept: 'CHEM', number: '153', name: 'Inorganic Chemistry II' }],
            },
            {
              id: 'trad-chem173',
              label: 'CHEM 173: Physical Chemistry II',
              type: 'required',
              options: [{ dept: 'CHEM', number: '173', name: 'Physical Chemistry II' }],
            },
            {
              id: 'trad-chem174',
              label: 'CHEM 174: Electrochem Lab: Measuring the Invisible',
              type: 'required',
              options: [{ dept: 'CHEM', number: '174', name: 'Electrochem Lab: Measuring the Invisible' }],
            },
            {
              id: 'trad-chem175',
              label: 'CHEM 175: Physical Chemistry III',
              type: 'required',
              options: [{ dept: 'CHEM', number: '175', name: 'Physical Chemistry III' }],
            },
            {
              id: 'trad-chem176',
              label: 'CHEM 176: Spectroscopy Laboratory',
              type: 'required',
              options: [{ dept: 'CHEM', number: '176', name: 'Spectroscopy Laboratory' }],
            },
            {
              id: 'trad-chem185',
              label: 'CHEM 185: Biophysical Chemistry (Capstone)',
              type: 'required',
              options: [{ dept: 'CHEM', number: '185', name: 'Biophysical Chemistry' }],
              note: 'Satisfies the Capstone Experience requirement.',
            },
          ],
        },
      ],
    },

    {
      id: 'biological-chemistry',
      name: 'Biological Chemistry Pathway',
      sections: [
        {
          id: 'bio-foundational',
          name: 'Foundational Courses',
          slots: [
            {
              id: 'bio-chem121',
              label: 'CHEM 121: Understanding the Natural and Unnatural World through Chemistry',
              type: 'required',
              options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }],
            },
            {
              id: 'bio-chem131',
              label: 'CHEM 131: Instrumental Analysis Principles and Practice (WIM)',
              type: 'required',
              options: [{ dept: 'CHEM', number: '131', name: 'Instrumental Analysis Principles and Practice' }],
              note: 'Satisfies WIM requirement.',
            },
            {
              id: 'bio-chem151',
              label: 'CHEM 151: Inorganic Chemistry I',
              type: 'required',
              options: [{ dept: 'CHEM', number: '151', name: 'Inorganic Chemistry I' }],
            },
            {
              id: 'bio-math51',
              label: 'Upper-Division Math (choose 1)',
              type: 'pick-one',
              options: MATH_UPPER,
            },
            {
              id: 'bio-phys41',
              label: 'PHYSICS 41: Mechanics',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '41', name: 'Mechanics' }],
            },
            {
              id: 'bio-phys42',
              label: 'PHYSICS 42: Classical Mechanics Laboratory',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '42', name: 'Classical Mechanics Laboratory' }],
            },
            {
              id: 'bio-chem171',
              label: 'CHEM 171: Foundations of Physical Chemistry',
              type: 'required',
              options: [{ dept: 'CHEM', number: '171', name: 'Foundations of Physical Chemistry' }],
            },
            {
              id: 'bio-chem181',
              label: 'CHEM 181: Biochemistry I',
              type: 'required',
              options: [{ dept: 'CHEM', number: '181', name: 'Biochemistry I' }],
            },
            {
              id: 'bio-cell',
              label: 'Cell/Molecular Biology (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'BIO', number: '86', name: 'Cell Biology' },
                { dept: 'BIO', number: '84', name: 'Physiology' },
                { dept: 'BIO', number: '82', name: 'Genetics' },
              ],
            },
            {
              id: 'bio-phys43',
              label: 'PHYSICS 43: Electricity and Magnetism',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' }],
            },
            {
              id: 'bio-phys44',
              label: 'PHYSICS 44: Electricity and Magnetism Lab',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '44', name: 'Electricity and Magnetism Lab' }],
            },
          ],
        },

        {
          id: 'bio-advanced',
          name: 'Advanced Courses',
          note: 'Requirements for students entering Stanford autumn 2021 or later.',
          slots: [
            {
              id: 'bio-chem123',
              label: 'CHEM 123: Organic Polyfunctional Compounds',
              type: 'required',
              options: [{ dept: 'CHEM', number: '123', name: 'Organic Polyfunctional Compounds' }],
            },
            {
              id: 'bio-chem124',
              label: 'CHEM 124: Organic Chemistry Laboratory',
              type: 'required',
              options: [{ dept: 'CHEM', number: '124', name: 'Organic Chemistry Laboratory' }],
            },
            {
              id: 'bio-chem126',
              label: 'CHEM 126: Synthesis Laboratory',
              type: 'required',
              options: [{ dept: 'CHEM', number: '126', name: 'Synthesis Laboratory' }],
            },
            {
              id: 'bio-pchem',
              label: 'Physical Chemistry (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '173', name: 'Physical Chemistry II' },
                { dept: 'CHEM', number: '175', name: 'Physical Chemistry III' },
              ],
            },
            {
              id: 'bio-chem176',
              label: 'CHEM 176: Spectroscopy Laboratory',
              type: 'required',
              options: [{ dept: 'CHEM', number: '176', name: 'Spectroscopy Laboratory' }],
            },
            {
              id: 'bio-chem183',
              label: 'CHEM 183: Biochemistry II',
              type: 'required',
              options: [{ dept: 'CHEM', number: '183', name: 'Biochemistry II' }],
            },
            {
              id: 'bio-chem184',
              label: 'CHEM 184: Biological Chemistry Laboratory',
              type: 'required',
              options: [{ dept: 'CHEM', number: '184', name: 'Biological Chemistry Laboratory' }],
            },
            {
              id: 'bio-chem185',
              label: 'CHEM 185: Biophysical Chemistry (Capstone)',
              type: 'required',
              options: [{ dept: 'CHEM', number: '185', name: 'Biophysical Chemistry' }],
              note: 'Satisfies the Capstone Experience requirement.',
            },
          ],
        },
      ],
    },
  ],
};
