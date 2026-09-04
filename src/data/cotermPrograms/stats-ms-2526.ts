// Statistics MS (Coterminal): School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/STATS-MS/

import type { CourseOption, MajorConfig } from '../majorSchema';

const BREADTH_COURSES: CourseOption[] = [
  // Biological Sciences
  { dept: 'BIO', number: '244', name: 'Fundamentals of Molecular Evolution' },
  { dept: 'BIO', number: '283', name: 'Theoretical Population Genetics' },
  { dept: 'BMDS', number: '291A', name: 'Data Studio: Consulting Workshop on Biomedical Data Science' },
  { dept: 'BMDS', number: '280A', name: 'Workshop in Biomedical Data Science' },
  { dept: 'BMDS', number: '280B', name: 'Workshop in Biomedical Data Science' },
  { dept: 'BMDS', number: '280C', name: 'Workshop in Biomedical Data Science' },
  { dept: 'BMDS', number: '214', name: 'Representations and Algorithms for Computational Molecular Biology' },
  { dept: 'BMDS', number: '241', name: 'Intermediate Biostatistics: Analysis of Discrete Data' },
  { dept: 'GENE', number: '211', name: 'Genomics' },
  // Computational and Mathematical Engineering
  { dept: 'CME', number: '200', name: 'Linear Algebra with Application to Engineering Computations' },
  { dept: 'CME', number: '302', name: 'Numerical Linear Algebra' },
  { dept: 'CME', number: '305', name: 'Discrete Mathematics and Algorithms' },
  { dept: 'CME', number: '306', name: 'Computational Methods of Applied Mathematics' },
  { dept: 'CME', number: '307', name: 'Optimization' },
  { dept: 'CME', number: '309', name: 'Randomized Algorithms and Probabilistic Analysis' },
  { dept: 'CME', number: '323', name: 'Distributed Algorithms and Optimization' },
  { dept: 'CME', number: '364A', name: 'Convex Optimization I' },

  { dept: 'CME', number: '364B', name: 'Convex Optimization II' },

  // Computer Science
  ...['140','142','143','144','145','147','148','149','154','155','157','161','182','205L','221','224C','224N','224R','224S','224U','228','229','246','261','273C','288','328','329X'].map(number => ({ dept: 'CS', number })),
  // Economics, GSB, and MS&E
  ...[['ECON','202N'],['ECON','210'],['ECON','271'],['ECON','272'],['ECON','273'],['ECON','274'],['FINANCE','620'],['FINANCE','622'],['MGTECON','634'],['MS&E','241'],['MS&E','245A'],['MS&E','246']].map(([dept, number]) => ({ dept, number })),
  // Operations Management
  ...[['MS&E','221'],['MS&E','223'],['MS&E','250A'],['MS&E','250B'],['MS&E','252'],['MS&E','260'],['MS&E','321'],['MS&E','346'],['MS&E','355']].map(([dept, number]) => ({ dept, number })),
  // Mathematics
  ...['151','158','171','205A','220A','236'].map(number => ({ dept: 'MATH', number })),
  // Electrical Engineering
  ...['261','263','269','278','387'].map(number => ({ dept: 'EE', number })),
  // Civil & Environmental Engineering and Energy
  ...['203','240','241','289'].map(number => ({ dept: 'CEE', number })),
  // Political Science/Public Policy and Psychology/Social Sciences
  ...['450A','450B','450C'].map(number => ({ dept: 'POLISCI', number })),
  { dept: 'PSYCH', number: '253', name: 'Multivariate Analysis, Measurement, and Study of Change in Social Science Research' },
  { dept: 'SOC', number: '383', name: 'Sociological Methodology III: Models for Discrete Outcomes' },
];

export const STATS_MS_2526: MajorConfig = {
  id: 'stats-ms-2526',
  name: 'Statistics MS (Coterm)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/STATS-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'prerequisites',
      name: 'Prerequisites (Do Not Count Toward 45 Units)',
      phase: 'pre-major',
      note: 'Complete the prerequisite set for the Statistics MS or the Data Science subplan. These preparation courses do not count toward the 45-unit MS and may overlap with undergraduate major, minor, or other non-coterm requirements. Courses listed are the expected level; approved equivalent preparation may be recorded with Search & add.',
      slots: [],
      pickOneGroup: [
        {
          id: 'statistics-prerequisites',
          name: 'Statistics MS Prerequisites',
          slots: [
            {
              id: 'stats-prereq-math',
              label: 'Multivariable calculus and linear algebra',
              type: 'any-approved',
              options: [{ dept: 'MATH', number: '51' }],
              note: 'At the level of MATH 51.',
            },
            {
              id: 'stats-prereq-programming',
              label: 'Introductory programming',
              type: 'any-approved',
              options: [{ dept: 'CS', number: '106A' }],
              note: 'At the level of CS 106A.',
            },
            {
              id: 'stats-prereq-statistics',
              label: 'Intermediate statistics',
              type: 'any-approved',
              options: [{ dept: 'STATS', number: '191' }],
              note: 'Multiple regression and ANOVA, possibly without linear algebra; at the level of STATS 191.',
            },
            {
              id: 'stats-prereq-probability',
              label: 'Introductory probability',
              type: 'any-approved',
              options: [{ dept: 'STATS', number: '117' }],
              note: 'At the level of STATS 117.',
            },
          ],
        },
        {
          id: 'data-science-prerequisites',
          name: 'Data Science Subplan Prerequisites',
          slots: [
            {
              id: 'datasci-prereq-math',
              label: 'Multivariable calculus and linear algebra',
              type: 'any-approved',
              options: [{ dept: 'MATH', number: '51' }],
              note: 'At the level of MATH 51.',
            },
            {
              id: 'datasci-prereq-programming',
              label: 'Introductory programming',
              type: 'any-approved',
              options: [{ dept: 'CS', number: '106B' }],
              note: 'At the level of CS 106B.',
            },
            {
              id: 'datasci-prereq-statistics',
              label: 'Intermediate statistics',
              type: 'any-approved',
              options: [{ dept: 'STATS', number: '191' }],
              note: 'Multiple regression and ANOVA, possibly without linear algebra; at the level of STATS 191.',
            },
            {
              id: 'datasci-prereq-probability',
              label: 'Introductory probability',
              type: 'any-approved',
              options: [{ dept: 'STATS', number: '118' }],
              note: 'At the level of STATS 118.',
            },
          ],
        },
      ],
    },
    {
      id: 'core',
      name: 'Core Requirements (6 courses, all letter-graded)',
      note: 'Courses below 200-level do not count except STATS 118; MATH 104/113; CS 106B/107 and CS 140–182; and CME 108. Each core course must be taken for a letter grade.',
      slots: [
        {
          id: 'probability', label: 'Probability Core (3 units)', type: 'pick-one',
          options: [
            { dept: 'STATS', number: '118', name: 'Probability Theory for Statistical Inference' },
            { dept: 'STATS', number: '218', name: 'Introduction to Stochastic Processes II' },
            { dept: 'STATS', number: '310A', name: 'Theory of Probability I' },
          ],
          note: 'If replacing both STATS 118 and STATS 217, take two advanced probability/stochastic-process courses. Do NOT enroll in STATS 118 after completing STATS 200, 218, 219, 300A, or 310A.',
        },
        {
          id: 'stochastic', label: 'Stochastic Processes (3 units)', type: 'pick-one',
          options: [
            { dept: 'STATS', number: '217', name: 'Introduction to Stochastic Processes I' },
            { dept: 'STATS', number: '219', name: 'Stochastic Processes' },
            { dept: 'STATS', number: '310A', name: 'Theory of Probability I' },
          ],
          note: 'Must be distinct from the course used for the Probability core.',
        },
        {
          id: 'theoretical-statistics', label: 'Theoretical Statistics (3 units)', type: 'pick-one',
          options: [
            { dept: 'STATS', number: '200', name: 'Introduction to Theoretical Statistics' },
            { dept: 'STATS', number: '270', name: 'Bayesian Statistics' },
            { dept: 'STATS', number: '300A', name: 'Theory of Statistics I' },
          ],
          note: 'Do NOT enroll in STATS 200 after completing any STATS 300-series course.',
        },
        {
          id: 'applied-statistics', label: 'Applied Statistics (3 units)', type: 'pick-one',
          options: [
            { dept: 'STATS', number: '203', name: 'Regression Models and Analysis of Variance' },
            { dept: 'STATS', number: '305A', name: 'Applied Statistics I' },
          ],
        },
        {
          id: 'linear-algebra', label: 'Linear Algebra (3–4 units)', type: 'pick-one',
          options: [
            { dept: 'MATH', number: '104', name: 'Applied Matrix Theory' },
            { dept: 'MATH', number: '113', name: 'Linear Algebra and Matrix Theory' },
            { dept: 'CME', number: '302', name: 'Numerical Linear Algebra' },
            { dept: 'CME', number: '364A', name: 'Convex Optimization I' },
          ],
          note: 'Other linear algebra courses require advisor consent.',
        },
        {
          id: 'programming', label: 'Programming (3 units)', type: 'pick-one',
          options: [
            { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
            { dept: 'CS', number: '107', name: 'Computer Organization and Systems' },
            { dept: 'CME', number: '108', name: 'Introduction to Scientific Computing' },
          ],
          note: 'Students who already possess these skills may take a more advanced CS course, with program-advisor consent where required.',
        },
      ],
    },
    {
      id: 'depth',
      name: 'Statistics Depth (5 additional courses, ≥15 units)',
      minUnits: 15,
      note: 'Take five ADDITIONAL graduate STATS courses numbered 200 or above. Courses must be letter-graded unless offered only CR/S. Workshops, training seminars, and independent research do NOT count toward depth. STATS 200Q is not allowed for graduate students.',
      slots: [
        { id: 'depth-courses', label: 'Five additional STATS 200+ courses', type: 'any-approved', count: 5, minLevel: 200, minUnits: 15, options: [], note: 'Any eligible STATS 200+ graduate offering except STATS 200Q and workshop/seminar/independent-research credit.' },
      ],
    },
    {
      id: 'breadth',
      name: 'Breadth / General Electives (3 courses)',
      minUnits: 9,
      minCourses: 3,
      note: 'Select three courses of at least 3 units each from the approved breadth disciplines. An advisor may approve other 200+ graduate courses that provide relevant skills or apply statistics/probability and do not significantly repeat the program. Remaining units may be workshops, training, independent study, or seminars. Up to 6 combined units of designated STATS workshop, training-seminar, and independent-research courses may count only toward breadth/general electives, not depth.',
      slots: [
        {
          id: 'breadth-courses', label: 'Approved breadth courses (3 courses, ≥3 units each)', type: 'any-approved', count: 3,
          options: BREADTH_COURSES,
          listUrl: 'https://bulletin.stanford.edu/programs/STATS-MS/',
          note: 'Use three courses from the official approved list (the encoded BREADTH_COURSES constant documents the current explicit options), any eligible STATS course numbered 200–299, or an advisor-authorized 200+ graduate substitution. A substitution must provide relevant skills or primarily apply statistics/probability and must not significantly overlap the program. Designated workshop/training/independent-research credits are limited to 6 combined units and count only toward breadth/general electives.',
        },
      ],
    },
    {
      id: 'program-policies',
      name: 'Important Program Policies',
      note: 'The Master’s Degree Program Proposal must be signed and approved by the department’s student services administrator before submission to the program advisor, and is due by the end of the first enrolled quarter. Submit a revised proposal when plans change. This is a non-thesis MS. A minimum overall GPA of 3.0 (B) is required in courses counted toward the degree.',
      slots: [],
    },
  ],
};
