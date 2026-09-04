// Economics BS, School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/ECON-BS/
// totalMinUnits: 85 (from bulletin header)
// Core: 10 required items (some are pick-one pairs), all letter grade, C or better (from Fall 2024)
// Field: ≥25 units from approved list, letter grade
// Non-Economics Electives: ≥8 units from quantitative disciplines list, letter grade
// Capstone (WIM): Part 1 ePortfolio (fall junior year) + Part 2 ECON 101 OR ECON 199D (Honors)
// WIM: ECON 101 or ECON 199D (min 5 units for 199D)
// Honors (optional): total 90 units; GPA ≥ 3.5 in major; requires ECON 199D thesis

import type { MajorConfig } from '../majorSchema';

export const ECON_BS_2526: MajorConfig = {
  id: 'econ-bs-2526',
  name: 'Economics (BS)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ECON-BS/',
  category: 'major',
  totalMinUnits: 85,

  wimCourses: [
    { dept: 'ECON', number: '101',  name: 'Economic Policy Seminar (WIM)' },
    { dept: 'ECON', number: '199D', name: 'Honors Thesis Research (WIM: min 5 units)' },
  ],

  sections: [
    // ── Core Program Requirements ──────────────────────────────────────────────
    {
      id: 'core',
      name: 'Core Program Requirements',
      note: 'All courses must be taken for a letter grade. From Fall 2024, a C or better is required in each core course. MATH 51 (or equivalent) is required before enrolling in many core and elective courses: complete early. CS 106B must be taken for 5 units to count toward the ECON BS.',
      slots: [
        {
          id: 'cs106b',
          label: 'CS 106B: Programming Abstractions',
          type: 'required',
          note: 'Must be taken for exactly 5 units to count toward the ECON BS.',
          options: [{ dept: 'CS', number: '106B', name: 'Programming Abstractions' }],
        },
        {
          id: 'econ1',
          label: 'ECON 1: Principles of Economics',
          type: 'required',
          options: [{ dept: 'ECON', number: '1', name: 'Principles of Economics' }],
        },
        {
          id: 'econ50',
          label: 'ECON 50 or ECON 50Q: Economic Analysis I',
          type: 'pick-one',
          options: [
            { dept: 'ECON', number: '50',  name: 'Economic Analysis I' },
            { dept: 'ECON', number: '50Q', name: 'Economic Analysis I (Quantitative)' },
          ],
        },
        {
          id: 'econ51',
          label: 'ECON 51: Economic Analysis II',
          type: 'required',
          options: [{ dept: 'ECON', number: '51', name: 'Economic Analysis II' }],
        },
        {
          id: 'econ52',
          label: 'ECON 52 or ECON 152: Economic Analysis III / Advanced Macroeconomics',
          type: 'pick-one',
          note: 'If ECON 152 is used here to satisfy the core, it may not also count toward Field Courses.',
          options: [
            { dept: 'ECON', number: '52',  name: 'Economic Analysis III' },
            { dept: 'ECON', number: '152', name: 'Advanced Macroeconomics' },
          ],
        },
        {
          id: 'econ102b',
          label: 'ECON 102B: Applied Econometrics',
          type: 'required',
          note: 'Prerequisite for several field courses and for capstone enrollment. Complete early.',
          options: [{ dept: 'ECON', number: '102B', name: 'Applied Econometrics' }],
        },
        {
          id: 'econ102c',
          label: 'ECON 102C: Advanced Topics in Econometrics',
          type: 'required',
          options: [{ dept: 'ECON', number: '102C', name: 'Advanced Topics in Econometrics' }],
        },
        {
          id: 'econ160',
          label: 'ECON 160 or ECON 180: Game Theory',
          type: 'pick-one',
          options: [
            { dept: 'ECON', number: '160', name: 'Game Theory and Economic Applications' },
            { dept: 'ECON', number: '180', name: 'Honors Game Theory' },
          ],
        },
        {
          id: 'math115',
          label: 'MATH 115: Functions of a Real Variable',
          type: 'required',
          options: [{ dept: 'MATH', number: '115', name: 'Functions of a Real Variable' }],
        },
        {
          id: 'stats117',
          label: 'STATS 117: Introduction to Probability Theory',
          type: 'required',
          options: [{ dept: 'STATS', number: '117', name: 'Introduction to Probability Theory' }],
        },
      ],
    },

    // ── Field Courses (≥25 units) ──────────────────────────────────────────────
    {
      id: 'field',
      name: 'Field Courses (≥25 units)',
      minUnits: 25,
      unitOnly: true,
      note: 'All courses must be taken for a letter grade. Any 200-level ECON course may also count with written permission of both the DUS and the course instructor. ECON 152 may count here only if it was NOT used to satisfy the core ECON 52/152 slot.',
      slots: [
        {
          id: 'field-courses',
          label: 'Field Courses',
          type: 'pick-from-list',
          count: 6,
          note: 'Select courses totaling at least 25 units from the approved list.',
          options: [
            { dept: 'ECON', number: '102D', name: 'Econometric Methods for Public Policy Analysis and Business Decision-Making' },
            { dept: 'ECON', number: '108',  name: 'Data Science for Business and Economic Decisions' },
            { dept: 'ECON', number: '115',  name: 'Causality, Decision Making and Data Science' },
            { dept: 'ECON', number: '118',  name: 'Development Economics' },
            { dept: 'ECON', number: '122',  name: 'Economics of Health Equity' },
            { dept: 'ECON', number: '125',  name: 'Economic Development, Microfinance, and Social Networks' },
            { dept: 'ECON', number: '136',  name: 'Market Design' },
            { dept: 'ECON', number: '140',  name: 'Introduction to Financial Economics' },
            { dept: 'ECON', number: '141',  name: 'Financial Markets' },
            { dept: 'ECON', number: '144',  name: 'Family and Society' },
            { dept: 'ECON', number: '146',  name: 'Economics of Education' },
            { dept: 'ECON', number: '147',  name: 'The Economics of Labor Markets' },
            { dept: 'ECON', number: '149',  name: 'Management Economics' },
            { dept: 'ECON', number: '152',  name: 'Advanced Macroeconomics (only if not used for core)' },
            { dept: 'ECON', number: '155',  name: 'Climate Change and Global Inequality' },
            { dept: 'ECON', number: '156',  name: 'Energy Markets and Policy' },
            { dept: 'ECON', number: '157',  name: 'Imperfect Competition' },
            { dept: 'ECON', number: '158',  name: 'Regulatory Economics' },
            { dept: 'ECON', number: '165',  name: 'International Finance' },
            { dept: 'ECON', number: '166',  name: 'International Trade' },
            { dept: 'ECON', number: '169',  name: 'Advanced Topics in Macroeconomics and International Finance' },
            { dept: 'ECON', number: '177',  name: 'Environmental Economics: Models, Data, and Policy Design' },
            { dept: 'ECON', number: '179',  name: 'Experimental Economics' },
            { dept: 'ECON', number: '185',  name: 'Data Science for Environmental Business' },
            { dept: 'ECON', number: '198',  name: 'Junior Honors Seminar' },
          ],
        },
      ],
    },

    // ── Non-Economics Electives (≥8 units) ────────────────────────────────────
    {
      id: 'non-econ-electives',
      name: 'Non-Economics Electives (≥8 units)',
      minUnits: 8,
      unitOnly: true,
      maxCountedUnits: 10,
      note: 'All courses must be taken for a letter grade. Choose from the approved list of quantitative courses in CS, MATH, MS&E, and STATS.',
      slots: [
        {
          id: 'non-econ-courses',
          label: 'Non-Economics Elective Courses',
          type: 'pick-from-list',
          count: 2,
          note: 'Select courses totaling at least 8 units.',
          options: [
            { dept: 'CS',   number: '129',  name: 'Applied Machine Learning' },
            { dept: 'CS',   number: '161',  name: 'Design and Analysis of Algorithms' },
            { dept: 'CS',   number: '221',  name: 'Artificial Intelligence: Principles and Techniques' },
            { dept: 'CS',   number: '228',  name: 'Probabilistic Graphical Models: Principles and Techniques' },
            { dept: 'CS',   number: '229',  name: 'Machine Learning' },
            { dept: 'CS',   number: '233',  name: 'Geometric and Topological Data Analysis' },
            { dept: 'CS',   number: '246',  name: 'Mining Massive Data Sets' },
            { dept: 'MATH', number: '113',  name: 'Linear Algebra and Matrix Theory' },
            { dept: 'MATH', number: '118',  name: 'Mathematics of Computation' },
            { dept: 'MATH', number: '136',  name: 'Stochastic Processes' },
            { dept: 'MATH', number: '151',  name: 'Introduction to Probability Theory' },
            { dept: 'MATH', number: '171',  name: 'Fundamental Concepts of Analysis' },
            { dept: 'MATH', number: '172',  name: 'Lebesgue Integration and Fourier Analysis' },
            { dept: 'MS&E', number: '111',  name: 'Introduction to Optimization' },
            { dept: 'MS&E', number: '112',  name: 'Graph and Combinatorial Optimization' },
            { dept: 'MS&E', number: '121',  name: 'Introduction to Stochastic Modeling' },
            { dept: 'MS&E', number: '135',  name: 'Networks' },
            { dept: 'MS&E', number: '244',  name: 'Statistical Arbitrage' },
            { dept: 'MS&E', number: '245A', name: 'Investment Science' },
            { dept: 'MS&E', number: '245B', name: 'Advanced Investment Science' },
            { dept: 'STATS', number: '200', name: 'Introduction to Theoretical Statistics' },
            { dept: 'STATS', number: '202', name: 'Statistical Learning and Data Science' },
            { dept: 'STATS', number: '203', name: 'Regression Models and Analysis of Variance' },
            { dept: 'STATS', number: '206', name: 'Applied Multivariate Analysis' },
            { dept: 'STATS', number: '207', name: 'Time Series Analysis' },
            { dept: 'STATS', number: '208', name: 'Resampling Methods: Bootstrap, Cross Validation and Beyond' },
            { dept: 'STATS', number: '209', name: 'Introduction to Causal Inference' },
            { dept: 'STATS', number: '214', name: 'Machine Learning Theory' },
            { dept: 'STATS', number: '216', name: 'Introduction to Statistical Learning' },
            { dept: 'STATS', number: '217', name: 'Introduction to Stochastic Processes I' },
            { dept: 'STATS', number: '218', name: 'Introduction to Stochastic Processes II' },
            { dept: 'STATS', number: '219', name: 'Stochastic Processes' },
            { dept: 'STATS', number: '229', name: 'Machine Learning' },
            { dept: 'STATS', number: '250', name: 'Mathematical Finance' },
            { dept: 'STATS', number: '270', name: 'Bayesian Statistics' },
          ],
        },
      ],
    },

    // ── Capstone / Writing in the Major ───────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (WIM)',
      note: 'Two-part requirement. Part 1: Submit electronic portfolio in fall of junior year (must be declared ECON BS major before submitting). Part 2: Choose one senior-year option below. Both options fulfill the Writing in the Major (WIM) requirement.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-policy',
          name: 'Option A: Economic Policy Seminar',
          note: 'Only available to students in their final year of coursework. Enrollment limited by application at the start of each school year. Must be taken at Stanford in California. Requires prior completion of ECON 51, ECON 52, ECON 102B, and at least two field courses.',
          slots: [
            {
              id: 'cap-econ101',
              label: 'ECON 101: Economic Policy Seminar (WIM)',
              type: 'required',
              options: [{ dept: 'ECON', number: '101', name: 'Economic Policy Seminar' }],
            },
          ],
        },
        {
          id: 'cap-honors',
          name: 'Option B: Economics Honors Thesis',
          note: 'GPA ≥ 3.5 in major required (checked at application and graduation; excludes ECON 139D/199D units). Must complete ECON 102B and at least two upper-division ECON courses relevant to the proposed thesis topic by end of junior year. At least 5 units of ECON 199D required for WIM. Winter registration for 1 unit under Director section (199D-20) is mandatory. More info: economics.stanford.edu/undergraduate/honors-program',
          slots: [
            {
              id: 'cap-199d',
              label: 'ECON 199D: Honors Thesis Research (1–10 units; ≥5 for WIM)',
              type: 'required',
              options: [{ dept: 'ECON', number: '199D', name: 'Honors Thesis Research' }],
            },
          ],
        },
      ],
    },
  ],
};
