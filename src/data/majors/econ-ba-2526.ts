// Economics BA, School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/ECON-BA
// totalMinUnits: 80 (from bulletin header)
// Core: 6 required courses (30 units), all letter grade, C or better (from Fall 2024)
// Field: 23-25 units from approved list; must be at Stanford in California
// Electives: 20 units
// Capstone (WIM): Part 1 ePortfolio (junior year) + Part 2 ECON 101 OR honors thesis
// WIM: ECON 101 or ECON 199D (≥5 units, honors only)
// Double-count: ECON 1 is the ONLY core course that may be double-counted

import type { MajorConfig } from '../majorSchema';

export const ECON_BA_2526: MajorConfig = {
  id: 'econ-ba-2526',
  name: 'Economics (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ECON-BA/',
  category: 'major',
  totalMinUnits: 80,

  wimCourses: [
    { dept: 'ECON', number: '101', name: 'Economic Policy Seminar (WIM)' },
    { dept: 'ECON', number: '199D', name: 'Honors Thesis Research (WIM: min 5 units, BAH only)' },
  ],

  sections: [
    // ── Core Economics Courses (30 units) ─────────────────────────────────────
    {
      id: 'core',
      name: 'Core Economics Courses (30 units)',
      note: 'All 6 courses required for letter grade; C or better required in each (from Fall 2024). ECON 1 is the ONLY core course that may be double-counted with another program. MATH 20 (or equivalent) is a prerequisite for the degree. Prereq for ECON 50/50Q: ECON 1 and MATH 20. At least 55 of the 80 total required units must be taken at Stanford in California. A GPA of C= (2.0) or better is required for all units applied toward the major.',
      slots: [
        {
          id: 'econ1',
          label: 'ECON 1: Introduction to Economics',
          type: 'required',
          note: 'Only core course that may be double-counted. AP waiver possible (score 5 on both AP micro and macro, or IB 7 on HL economics): waiver grants no unit credit; student must add 5 elective units if waived.',
          options: [{ dept: 'ECON', number: '1' }],
        },
        {
          id: 'econ102a',
          label: 'ECON 102A: Statistical Methods for Economists',
          type: 'required',
          note: 'Take early; prerequisite MATH 20 or equivalent. AP/transfer credit for MATH prerequisites requires Econ Math Requirements Waiver Petition.',
          options: [{ dept: 'ECON', number: '102A' }],
        },
        {
          id: 'econ50',
          label: 'ECON 50 or ECON 50Q: Basic Price Theory',
          type: 'pick-one',
          options: [
            { dept: 'ECON', number: '50', name: 'Economic Analysis I' },
            { dept: 'ECON', number: '50Q', name: 'Economic Analysis I (Quantitative)' },
          ],
        },
        {
          id: 'econ51',
          label: 'ECON 51: Intermediate Microeconomics',
          type: 'required',
          options: [{ dept: 'ECON', number: '51' }],
        },
        {
          id: 'econ52',
          label: 'ECON 52: Intermediate Macroeconomics',
          type: 'required',
          options: [{ dept: 'ECON', number: '52' }],
        },
        {
          id: 'econ102b',
          label: 'ECON 102B: Applied Econometrics',
          type: 'required',
          note: 'Take early; used as prerequisite for several field courses. Prerequisite: ECON 102A.',
          options: [{ dept: 'ECON', number: '102B' }],
        },
      ],
    },

    // ── Field Courses (23–25 units) ────────────────────────────────────────────
    {
      id: 'field',
      name: 'Field Courses (23–25 units)',
      minCourses: 5,
      minUnits: 23,
      note: 'Must be taken at Stanford in California for letter grade (no CR/NC). Each course is 3–5 units. Restrictions: (1) Only ONE of ECON 135, 140, or 141 may count: they are too similar in content. (2) Only ONE of ECON 160, 167G, or 180 may count toward the field requirement: the others may count as electives. (3) BAH students only: up to 10 units of ECON 199D; completion of honors thesis plus at least 5 units of ECON 199D may replace ECON 101 (WIM); remaining ECON 199D units may meet field minimum as long as total BAH units ≥ 85. (4) ECON 200-level courses may count with written permission of DUS and instructor (excluding ECON 239D and 299).',
      slots: [
        {
          id: 'field-courses',
          label: 'Field Courses',
          type: 'pick-from-list',
          count: 5,
          note: 'Select at least 5 courses totaling 23–25 units from the approved field list. See section note for exclusion rules.',
          options: [
            { dept: 'ECON', number: '47',   name: 'Media Markets and Social Good' },
            { dept: 'ECON', number: '102C',  name: 'Advanced Topics in Econometrics' },
            { dept: 'ECON', number: '102D',  name: 'Econometric Methods for Public Policy Analysis and Business Decision-Making' },
            { dept: 'ECON', number: '108',   name: 'Data Science for Business and Economic Decisions' },
            { dept: 'ECON', number: '111',   name: 'Money and Banking' },
            { dept: 'ECON', number: '112',   name: 'Financial Markets and Institutions: Recent Developments' },
            { dept: 'ECON', number: '113',   name: 'Historical Perspectives on Inequality and Opportunity in America' },
            { dept: 'ECON', number: '115',   name: 'Causality, Decision Making and Data Science' },
            { dept: 'ECON', number: '118',   name: 'Development Economics' },
            { dept: 'ECON', number: '122',   name: 'Economics of Health Equity' },
            { dept: 'ECON', number: '125',   name: 'Economic Development, Microfinance, and Social Networks' },
            { dept: 'ECON', number: '126',   name: 'Economics of Health and Medical Care' },
            { dept: 'ECON', number: '127',   name: 'Economics of Health Improvement in Developing Countries' },
            { dept: 'ECON', number: '131',   name: 'The Chinese Economy' },
            { dept: 'ECON', number: '135',   name: 'Finance for Non-MBAs (only ONE of 135/140/141 may count)' },
            { dept: 'ECON', number: '136',   name: 'Market Design' },
            { dept: 'ECON', number: '137',   name: 'Decision Modeling & Information' },
            { dept: 'ECON', number: '138',   name: 'Optimization Models with Applications in Power Systems and Electricity Markets' },
            { dept: 'ECON', number: '140',   name: 'Financial Economics (only ONE of 135/140/141 may count)' },
            { dept: 'ECON', number: '141',   name: 'Financial Markets (only ONE of 135/140/141 may count)' },
            { dept: 'ECON', number: '144',   name: 'Family and Society' },
            { dept: 'ECON', number: '146',   name: 'Economics of Education' },
            { dept: 'ECON', number: '147',   name: 'The Economics of Labor Markets' },
            { dept: 'ECON', number: '149',   name: 'Management Economics' },
            { dept: 'ECON', number: '150',   name: 'Economic Policy Analysis' },
            { dept: 'ECON', number: '152',   name: 'Advanced Microeconomics' },
            { dept: 'ECON', number: '155',   name: 'Climate Change and Global Inequality' },
            { dept: 'ECON', number: '156',   name: 'Energy Markets and Policy' },
            { dept: 'ECON', number: '157',   name: 'Imperfect Competition' },
            { dept: 'ECON', number: '158',   name: 'Regulatory Economics' },
            { dept: 'ECON', number: '160',   name: 'Game Theory and Economic Applications (only ONE of 160/167G/180 counts toward field)' },
            { dept: 'ECON', number: '165',   name: 'International Finance' },
            { dept: 'ECON', number: '166',   name: 'International Trade' },
            { dept: 'ECON', number: '167G',  name: 'Game Theory & Social Behavior (only ONE of 160/167G/180 counts toward field)' },
            { dept: 'ECON', number: '169',   name: 'Advanced Topics in Macroeconomics and International Finance' },
            { dept: 'ECON', number: '175',   name: 'Environmental Economic Theory' },
            { dept: 'ECON', number: '177',   name: 'Environmental Economics: Models, Data, and Policy Design' },
            { dept: 'ECON', number: '178',   name: 'Behavioral Economics' },
            { dept: 'ECON', number: '179',   name: 'Experimental Economics' },
            { dept: 'ECON', number: '180',   name: 'Honors Game Theory (only ONE of 160/167G/180 counts toward field)' },
            { dept: 'ECON', number: '185',   name: 'Data Science for Environmental Business' },
            { dept: 'ECON', number: '198',   name: 'Junior Honors Seminar' },
            { dept: 'ECON', number: '199D',  name: 'Honors Thesis Research (BAH only; up to 10 units)' },
          ],
        },
      ],
    },

    // ── Electives (20 units) ───────────────────────────────────────────────────
    {
      id: 'electives',
      name: 'Electives (20–27 units)',
      minUnits: 20,
      unitOnly: true,
      note: 'Choose from any ECON courses taken for letter grade. If ECON 1 is waived (no unit credit given), add 5 elective units. If field courses total less than 25 units, the gap may be filled with electives. ECON 200-level courses count with written DUS + instructor permission. Up to 10 units may come from approved non-ECON courses (see list below), approved transfer credit, BOSP/SINY/SIW courses, or ECON 139D. No credit for internships.',
      slots: [
        {
          id: 'electives-econ',
          label: 'Any ECON Course (letter grade)',
          type: 'any-approved',
          note: 'Any ECON course taken for a letter grade counts. Pair restrictions: only ONE of ECON 135/140/141 may count; only ONE of ECON 160/167G/180 toward field (others count here). Petition any unlisted course to DUS for approval.',
          options: [],
        },
        {
          id: 'electives-non-econ',
          label: 'Approved Non-ECON Electives (up to 10 units)',
          type: 'any-approved',
          maxCountedUnits: 10,
          note: 'Up to 10 units of the elective requirement may come from this approved list. Students may petition courses outside this list to DUS for approval.',
          options: [
            { dept: 'ACCT', number: '152', name: 'Introduction to Financial Accounting' },
            { dept: 'CS', number: '161', name: 'Design and Analysis of Algorithms' },
            { dept: 'CS', number: '221', name: 'Artificial Intelligence: Principles and Techniques' },
            { dept: 'CS', number: '227B', name: 'General Game Playing' },
            { dept: 'CS', number: '228', name: 'Probabilistic Graphical Models: Principles and Techniques' },
            { dept: 'CS', number: '229', name: 'Machine Learning' },
            { dept: 'GSBGEN', number: '336', name: 'Energy Markets and Policy' },
            { dept: 'MATH', number: '113', name: 'Linear Algebra and Matrix Theory' },
            { dept: 'MATH', number: '114', name: 'Introduction to Scientific Computing' },
            { dept: 'MATH', number: '115', name: 'Functions of a Real Variable' },
            { dept: 'MATH', number: '118', name: 'Mathematics of Computation' },
            { dept: 'MATH', number: '120', name: 'Groups and Rings' },
            { dept: 'MATH', number: '136', name: 'Stochastic Processes' },
            { dept: 'MATH', number: '151', name: 'Introduction to Probability Theory' },
            { dept: 'MATH', number: '161', name: 'Set Theory' },
            { dept: 'MATH', number: '171', name: 'Fundamental Concepts of Analysis' },
            { dept: 'MATH', number: '172', name: 'Lebesgue Integration and Fourier Analysis' },
            { dept: 'MATH', number: '175', name: 'Elementary Functional Analysis' },
            { dept: 'MS&E', number: '214', name: 'Applied Optimization' },
            { dept: 'MS&E', number: '244', name: 'Statistical Arbitrage' },
            { dept: 'MS&E', number: '245A', name: 'Investment Science' },
            { dept: 'MS&E', number: '245B', name: 'Advanced Investment Science' },
            { dept: 'STATS', number: '200', name: 'Introduction to Theoretical Statistics' },
            { dept: 'STATS', number: '202', name: 'Statistical Learning and Data Science' },
            { dept: 'STATS', number: '203', name: 'Regression Models and Analysis of Variance' },
            { dept: 'STATS', number: '206', name: 'Applied Multivariate Analysis' },
            { dept: 'STATS', number: '207', name: 'Time Series Analysis' },
            { dept: 'STATS', number: '208', name: 'Resampling Methods: Bootstrap, Cross Validation and Beyond' },
            { dept: 'STATS', number: '209', name: 'Introduction to Causal Inference' },
            { dept: 'STATS', number: '209A', name: 'Topics in Causal Inference' },
            { dept: 'STATS', number: '217', name: 'Introduction to Stochastic Processes I' },
            { dept: 'STATS', number: '218', name: 'Introduction to Stochastic Processes II' },
            { dept: 'STATS', number: '219', name: 'Stochastic Processes' },
            { dept: 'STATS', number: '221', name: 'Random Processes on Graphs and Lattices' },
            { dept: 'STATS', number: '222', name: 'Statistical Methods for Longitudinal Research' },
            { dept: 'STATS', number: '237', name: 'Investment Portfolios, Derivative Securities, and Risk Measures' },
            { dept: 'STATS', number: '240', name: 'Statistical Methods in Finance' },
            { dept: 'STATS', number: '315B', name: 'Modern Applied Statistics: Learning II' },
            { dept: 'POLISCI', number: '110C', name: 'America and the World Economy' },
          ],
        },
      ],
    },

    // ── Capstone / WIM ────────────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (WIM)',
      note: 'Two-part requirement. Part 1: Submit electronic portfolio in fall of junior year (must be declared Econ BA major before submitting). Part 2: Choose one senior-year option below. Both options fulfill the Writing in the Major (WIM) requirement.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-policy',
          name: 'Option A: Economic Policy Seminar',
          note: 'Only available to students completing their final year of coursework. Enrollment limited by application at the start of each school year. Must be taken at Stanford California. Requires prior completion of ECON 51, ECON 52, ECON 102B, and at least two field courses.',
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
          note: 'GPA ≥ 3.5 in major required (checked at application and graduation). Must complete ECON 102B and at least two upper-division ECON courses relevant to thesis topic by end of junior year. At least 5 units of ECON 199D required to fulfill WIM. Units may be 1–10 total. More info: economics.stanford.edu/undergraduate/honors-program',
          slots: [
            {
              id: 'cap-199d',
              label: 'ECON 199D: Honors Thesis Research (1–10 units; ≥5 units for WIM)',
              type: 'required',
              options: [{ dept: 'ECON', number: '199D', name: 'Honors Thesis Research' }],
            },
          ],
        },
      ],
    },
  ],
};
