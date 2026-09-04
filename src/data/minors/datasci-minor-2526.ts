// Data Science Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/DATSCI-MIN
// Total: 21 units minimum. Designed for humanities/social sciences majors.
// No previous programming or statistical background assumed.
// Students who used CS 109, EE 178, or MS&E 120 for major/other minor must take STATS 118 or MATH 151.

import type { MajorConfig } from '../majorSchema';

export const DATASCI_MINOR_2526: MajorConfig = {
  id: 'datasci-minor-2526',
  name: 'Data Science (Minor)',
  school: 'Interdisciplinary (DATSCI)',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/DATSCI-MIN/',
  category: 'minor',
  totalMinUnits: 21,
  sections: [
    // ── Linear Algebra ────────────────────────────────────────────────────────
    {
      id: 'linear-algebra',
      name: 'Linear Algebra',
      minUnits: 5,
      minCourses: 1,
      note: 'Complete at least 5 units. Students who have taken CME 100 are recommended to take ENGR 108 to satisfy this requirement. Transfer credit requires Data Science Program approval and is evaluated case by case. Only MATH 51 and CS 106A may double-count with another major or minor; another overlapping requirement must be replaced with an approved course.',
      slots: [
        { id: 'linalg', label: 'Linear Algebra', type: 'pick-one',
          options: [
            { dept: 'ENGR', number: '108' },
            { dept: 'MATH', number: '51' },
            { dept: 'MATH', number: '104' },
          ] },
      ],
    },

    // ── Programming ───────────────────────────────────────────────────────────
    {
      id: 'programming',
      name: 'Programming',
      minUnits: 5,
      minCourses: 1,
      note: 'Complete at least 5 units. CS 106AP and CS 106AJ satisfy the CS 106A programming requirement. Only CS 106A and MATH 51 may double-count with another major or minor; another overlapping requirement must be replaced with an approved course.',
      slots: [
        { id: 'prog', label: 'Programming Course', type: 'pick-one',
          options: [
            { dept: 'CS', number: '106A' },
            { dept: 'CS', number: '106B' },
          ] },
      ],
    },

    // ── Probability ───────────────────────────────────────────────────────────
    {
      id: 'probability',
      name: 'Probability',
      minUnits: 3,
      minCourses: 1,
      note: 'If CS 109, EE 178, or MS&E 120 was used for your major or another minor, you must instead take STATS 118 or MATH 151 for this requirement.',
      slots: [
        { id: 'prob', label: 'Probability', type: 'pick-one',
          options: [
            { dept: 'CS', number: '109' },
            { dept: 'EE', number: '178' },
            { dept: 'STATS', number: '117' },
            { dept: 'STATS', number: '118' },
            { dept: 'MATH', number: '151' },
            { dept: 'MS&E', number: '120' },
          ] },
      ],
    },

    // ── Statistics ────────────────────────────────────────────────────────────
    {
      id: 'statistics',
      name: 'Statistics',
      minUnits: 3,
      minCourses: 1,
      slots: [
        { id: 'stats', label: 'Statistics Course', type: 'pick-one',
          options: [
            { dept: 'ECON', number: '102A' },
            { dept: 'HUMBIO', number: '88' },
            { dept: 'HUMBIO', number: '89' },
            { dept: 'MS&E', number: '125' },
            { dept: 'STATS', number: '110' },
            { dept: 'STATS', number: '141' },
            { dept: 'STATS', number: '191' },
            { dept: 'STATS', number: '200' },
            { dept: 'STATS', number: '200Q' },
          ] },
      ],
    },

    // ── Data Mining and Machine Learning ──────────────────────────────────────
    {
      id: 'data-mining-ml',
      name: 'Data Mining and Machine Learning',
      minUnits: 3,
      minCourses: 1,
      slots: [
        { id: 'ml', label: 'Data Mining / ML Course', type: 'pick-one',
          options: [
            { dept: 'DATASCI', number: '112' },
            { dept: 'POLISCI', number: '150B' },
            { dept: 'STATS', number: '202' },
            { dept: 'STATS', number: '202F' },
            { dept: 'STATS', number: '202V' },
            { dept: 'STATS', number: '216' },
          ] },
      ],
    },

    // ── Data Science Methodology (Domain Application) ─────────────────────────
    {
      id: 'methodology',
      name: 'Data Science Methodology (Domain Course)',
      minUnits: 2,
      minCourses: 1,
      note: 'One course applying data science methods in a cognate field of interest. Other courses not listed below may count with DATSCI Program approval: search and add if using an approved unlisted course.',
      slots: [
        { id: 'domain', label: 'Domain Application Course', type: 'pick-from-list', count: 1,
          options: [
            { dept: 'BMDS', number: '283', name: 'Practical Application of AI/ML to Healthcare and Biotechnology' },
            { dept: 'BMDS', number: '202', name: 'An overview of Biomedical Data Science' },
            { dept: 'COMM', number: '177I', name: 'Investigative Watchdog Reporting' },
            { dept: 'CS', number: '224N', name: 'Natural Language Processing with Deep Learning' },
            { dept: 'CS', number: '224W', name: 'Machine Learning with Graphs' },
            { dept: 'CS', number: '246', name: 'Mining Massive Data Sets' },
            { dept: 'CS', number: '279', name: 'Computational Biology: Structure and Organization of Biomolecules and Cells' },
            { dept: 'DATASCI', number: '154', name: 'Data Science for Social Impact' },
            { dept: 'DATASCI', number: '156', name: 'Thinking and Making with Data' },
            { dept: 'EARTHSYS', number: '141', name: 'Remote Sensing of the Oceans' },
            { dept: 'EARTHSYS', number: '240', name: 'Data Science for Geoscience' },
            { dept: 'ECON', number: '102B', name: 'Applied Econometrics' },
            { dept: 'ECON', number: '102C', name: 'Advanced Topics in Econometrics' },
            { dept: 'ECON', number: '137', name: 'Decision Modeling and Information' },
            { dept: 'ECON', number: '151', name: 'Tackling Big Questions Using Social Data Science' },
            { dept: 'ECON', number: '291', name: 'Social and Economic Networks' },
            { dept: 'ENGLISH', number: '184E', name: 'Literary Text Mining' },
            { dept: 'ESS', number: '171', name: 'Climate Models and Data' },
            { dept: 'GEOPHYS', number: '115', name: 'Taking the Pulse of the Planet' },
            { dept: 'HUMBIO', number: '151R', name: 'Biology, Health and Big Data' },
            { dept: 'IMMUNOL', number: '206', name: 'Introduction to Applied Computational Tools in Immunology' },
            { dept: 'MS&E', number: '125', name: 'Introduction to Applied Statistics' },
            { dept: 'MS&E', number: '135', name: 'Networks' },
            { dept: 'MS&E', number: '226', name: 'Fundamentals of Data Science: Prediction, Inference, Causality' },
            { dept: 'MS&E', number: '245A', name: 'Investment Science' },
            { dept: 'POLISCI', number: '150B', name: 'Machine Learning for Social Scientists' },
            { dept: 'POLISCI', number: '150C', name: 'Causal Inference for Social Science' },
            { dept: 'PUBLPOL', number: '185', name: 'Data Science for Environmental Business' },
            { dept: 'SOC', number: '10', name: 'Introduction to Computational Social Science' },
            { dept: 'SOC', number: '126', name: 'Introduction to Social Networks' },
            { dept: 'SOC', number: '180A', name: 'Foundations of Social Research' },
            { dept: 'SOC', number: '180B', name: 'Introduction to Data Analysis' },
            { dept: 'SUSTAIN', number: '101C', name: 'Climate 101' },
            { dept: 'SYMSYS', number: '1', name: 'Minds and Machines' },
          ],
          note: 'Other courses may count with DATSCI Program approval: search and add if using an approved unlisted course.' },
      ],
    },
  ],
};
