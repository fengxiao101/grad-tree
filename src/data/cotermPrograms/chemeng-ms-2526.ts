import type { MajorConfig } from '../majorSchema';

export const CHEMENG_MS_2526: MajorConfig = {
  id: 'chemeng-ms-2526',
  name: 'Chemical Engineering MS (Coterm)',
  school: 'Chemical Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CHEME-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'core',
      name: 'Core Courses',
      minUnits: 12,
      note: 'Complete 4 courses (12 units) from the CHEMENG 300 series for letter grade. Topics include applied statistical mechanics, chemical kinetics, reaction engineering, thermodynamics, spectroscopy, and biochemical engineering.',
      slots: [
        {
          id: 'core-slot',
          label: '4 CHEMENG 300-series core courses',
          type: 'pick-from-list',
          count: 4,
          options: [
            { dept: 'CHEMENG', number: '300', name: 'Applied Mathematics in the Chemical and Biological Sciences', units: 3 },
            { dept: 'CHEMENG', number: '310', name: 'Microhydrodynamics', units: 3 },
            { dept: 'CHEMENG', number: '320', name: 'Chemical Kinetics and Reaction Engineering', units: 3 },
            { dept: 'CHEMENG', number: '340', name: 'Molecular Thermodynamics', units: 3 },
            { dept: 'CHEMENG', number: '345', name: 'Fundamentals and Applications of Spectroscopy', units: 3 },
            { dept: 'CHEMENG', number: '355', name: 'Advanced Biochemical Engineering', units: 3 },
          ],
        },
      ],
    },
    {
      id: 'chemeng-electives',
      name: 'Chemical Engineering Electives',
      minUnits: 12,
      note: '4 additional CHEMENG lecture courses (12 units) at 200, 300, or 400 level for letter grade. 500-series special topics courses do not count.',
      slots: [
        {
          id: 'chemeng-elec-slot',
          label: 'CHEMENG Elective (200–400 level)',
          type: 'any-approved',
          count: 4,
          minLevel: 200,
          options: [],
          note: 'Any CHEMENG lecture course at 200, 300, or 400 level for letter grade. 500-series special topics courses do NOT count.',
        },
      ],
    },
    {
      id: 'colloquium',
      name: 'Colloquium',
      minUnits: 3,
      note: '3 units of departmental colloquium (CHEMENG 699, 1 unit per quarter, taken 3 times). HCP students may substitute with graduate-level engineering seminars or lecture courses.',
      slots: [
        {
          id: 'colloquium-slot',
          label: 'CHEMENG 699 Colloquium (1 unit × 3 quarters)',
          type: 'required',
          times: 3,
          options: [{ dept: 'CHEMENG', number: '699', name: 'Colloquium', units: 1 }],
          note: '1 unit per quarter; must be taken 3 separate quarters to reach 3 units.',
        },
      ],
    },
    {
      id: 'sci-math-engr',
      name: 'Science, Math, or Engineering Electives',
      minUnits: 18,
      note: '18 units of graduate-level courses from approved departments for letter grade. Approved departments include AA, BIOE, BIO, BMDS, CEE, CHEM, CME, CS, EE, ENGR, MATH, MS&E, MATSCI, ME, PHYSICS, PSYCH, STATS.',
      slots: [
        {
          id: 'sci-math-engr-slot',
          label: 'Science/Math/Engineering electives from approved depts (min 18 units)',
          type: 'any-approved',
          count: 6,
          minUnits: 18,
          options: [],
          note: 'Graduate-level (200+) courses from approved departments: AA, BIOE, BIO, BMDS, CEE, CHEM, CME, CS, EE, ENGR, MATH, MS&E, MATSCI, ME, PHYSICS, PSYCH, STATS. Substitutions: up to 3u seminar, up to 6u lab, up to 6u 100-level lecture, up to 6u CHEMENG600 (PhD/coterm only). No courses below 100-level.',
        },
      ],
    },
  ],
};
