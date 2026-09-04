// Human Biology BS: School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/HUMBI-BS/
// Min 81 units. All courses C- or better (letter grade).
// Freshmen advised to defer core until sophomore autumn.
// Declaration requires 4 of 6 core courses completed (C- or better) + Cornerstone Essay (3-5 pages).
// Area of Concentration is student-designed (individualized title), approved by advising team.
// BS Degree Option: coursework must be predominantly natural sciences/math/CS/engineering;
//   10 of 20 breadth units must be BS-designated; ≥3 of 5 depth courses must be BS.
// Stats: STATS 60 does NOT fulfill the statistics requirement.
// WIM: HUMBIO 2B + 3B + 4B (all three B-series core courses fulfill WIM together).
// Capstone: 5 options (Practicum, Synthesis, HumBio Honors, Interdisciplinary Honors, Sci Comm).
// Honors: min 3.0 core GPA + 3.2 overall Stanford GPA; HUMBIO 193 + 194; apply Feb/Mar junior year.

import type { MajorConfig } from '../majorSchema';

export const HUMBI_BS_2526: MajorConfig = {
  id: 'humbi-bs-2526',
  name: 'Human Biology (BS)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/HUMBI-BS/',
  category: 'major',
  totalMinUnits: 81,
  sections: [
    // ── Core Sequence (all 6 required) ────────────────────────────────────────
    {
      id: 'core',
      name: 'Human Biology Core Sequence (all 6 required)',
      minCourses: 6,
      note: 'All 6 courses required. Taken concurrently in A/B pairs starting autumn of sophomore year (A in autumn, B in winter). Minimum C- in each. HUMBIO 2B + 3B + 4B also satisfy the WIM requirement. Freshmen should wait until sophomore autumn to start the core sequence. Need 4 of 6 completed (C- or better) before official major declaration + Cornerstone Essay.',
      slots: [
        {
          id: 'h2a',
          label: 'HUMBIO 2A',
          type: 'required',
          options: [{ dept: 'HUMBIO', number: '2A', name: 'Genetics, Molecular Biology and Evolution' }],
        },
        {
          id: 'h2b',
          label: 'HUMBIO 2B (WIM)',
          type: 'required',
          note: 'Satisfies WIM requirement.',
          options: [{ dept: 'HUMBIO', number: '2B', name: 'Culture, Evolution, and Society' }],
        },
        {
          id: 'h3a',
          label: 'HUMBIO 3A',
          type: 'required',
          options: [{ dept: 'HUMBIO', number: '3A', name: 'Cell and Developmental Biology' }],
        },
        {
          id: 'h3b',
          label: 'HUMBIO 3B (WIM)',
          type: 'required',
          note: 'Satisfies WIM requirement.',
          options: [{ dept: 'HUMBIO', number: '3B', name: 'Health Policy Analysis and Population Health' }],
        },
        {
          id: 'h4a',
          label: 'HUMBIO 4A',
          type: 'required',
          options: [{ dept: 'HUMBIO', number: '4A', name: 'The Human Organism' }],
        },
        {
          id: 'h4b',
          label: 'HUMBIO 4B (WIM)',
          type: 'required',
          note: 'Satisfies WIM requirement.',
          options: [{ dept: 'HUMBIO', number: '4B', name: 'Development and Epidemiology' }],
        },
      ],
    },

    // ── Statistics (1 required) ───────────────────────────────────────────────
    {
      id: 'stats',
      name: 'Statistics (1 course required)',
      minCourses: 1,
      note: 'STATS 60 does NOT fulfill this requirement. Must take for letter grade (C- minimum). New courses may be petitioned.',
      slots: [
        {
          id: 'stats-course',
          label: 'Statistics',
          type: 'pick-one',
          options: [
            { dept: 'BIO', number: '141', name: 'Introduction to Statistics for Biology' },
            { dept: 'BMDS', number: '202', name: 'An overview of Biomedical Data Science' },
            { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
            { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
            { dept: 'ECON', number: '102A', name: 'Introduction to Statistical Methods (Postcalculus) for Social Scientists' },
            { dept: 'ECON', number: '102B', name: 'Applied Econometrics' },
            { dept: 'EDUC', number: '400A', name: 'Introduction to Statistical Methods in Education' },
            { dept: 'EPI', number: '159', name: 'Introduction to Probability and Statistics for Epidemiology' },
            { dept: 'EPI', number: '262', name: 'Intermediate Biostatistics: Regression, Prediction, Survival Analysis' },
            { dept: 'HUMBIO', number: '88', name: 'Introduction to Statistics for the Health Sciences' },
            { dept: 'HUMBIO', number: '89', name: 'Introduction to Health Sciences Statistics' },
            { dept: 'MATH', number: '151', name: 'Introduction to Probability Theory' },
            { dept: 'SOC', number: '180B', name: 'Introduction to Data Analysis' },
            { dept: 'STATS', number: '101', name: 'Data Science 101' },
            { dept: 'STATS', number: '110', name: 'Introduction to Statistics for Engineering and the Sciences' },
            { dept: 'STATS', number: '117', name: 'Introduction to Probability Theory' },
            { dept: 'STATS', number: '202', name: 'Statistical Learning and Data Science' },
          ],
        },
      ],
    },

    // ── Upper Division (3 HUMBIO 100–189 courses or approved OSP) ─────────────
    {
      id: 'upper-div',
      name: 'Upper Division Requirement (3 courses)',
      minCourses: 3,
      note: 'Three upper-division courses: any HUMBIO course numbered 100–189, or select Overseas Studies courses from the approved list below. Min 3 units per course, C- or better, letter grade (one may be CR/NC). Cannot be reused toward breadth or depth requirements. No more than 2 upper-division courses may count toward the 5 upper-level BS courses required by Depth.',
      slots: [
        {
          id: 'upper-div-humbio',
          label: 'HUMBIO 100–189 or Approved OSP Course',
          type: 'any-approved',
          count: 3,
          options: [
            { dept: 'OSPAUSTL', number: '28', name: 'Terrestrial Ecology and Conservation' },
            { dept: 'OSPCPTWN', number: '43', name: 'Public and Community Health in Sub-Saharan Africa' },
            { dept: 'OSPCPTWN', number: '49', name: 'Foundations of Public Health and Social Justice' },
            { dept: 'OSPCPTWN', number: '67', name: 'Beyond Silicon Valley: Technology and Development in the Global South' },
            { dept: 'OSPCPTWN', number: '79', name: 'Engaging Southern Cities: Thinking urbanization, development, and public culture from Cape Town' },
            { dept: 'OSPHONGK', number: '44', name: 'Medical Sociology' },
            { dept: 'OSPMADRD', number: '10', name: 'Global Change in the Anthropocene: An Iberoamerican Perspective' },
            { dept: 'OSPMADRD', number: '57', name: 'Health Care: A Contrastive Analysis between Spain and the U.S.' },
            { dept: 'OSPMADRD', number: '72', name: 'Issues in Bioethics Across Cultures' },
            { dept: 'OSPOXFRD', number: '67', name: 'Pandemics in Cultural Context' },
            { dept: 'OSPOXFRD', number: '84', name: 'The Promises and Perils of Social and Behavioral Genomics' },
            { dept: 'OSPPARIS', number: '75P', name: 'Exploring Sustainability: Ecological, Economics and Environmental Humanities' },
            { dept: 'OSPPARIS', number: '18', name: 'Health Policy and Health Care System Design' },
            { dept: 'OSPPARIS', number: '76', name: 'From Art to Medicine: The Human Body and Tissue Regeneration' },
            { dept: 'OSPSANTG', number: '25', name: 'Health and Disease in an Aging Society: Chile in Transition' },
            { dept: 'OSPSANTG', number: '58', name: 'Global Change in Chile' },
          ],
          note: 'Any HUMBIO 100–189 course qualifies. OSP courses listed above are the pre-approved alternatives. New OSP courses require program review (submit syllabus to humbioadvsing@lists.stanford.edu).',
        },
      ],
    },

    // ── Breadth in Discipline (20 units, 10 must be BS-designated) ────────────
    {
      id: 'breadth',
      name: 'Breadth in Discipline (20 units)',
      minUnits: 20,
      unitOnly: true,
      note: 'Courses must align with your chosen Area of Concentration. 10 of 20 units must be BS-designated courses. May include max 10 "flex units" (pre-med courses, intro CS, intro courses unrelated to concentration). Max 4 research units. C- minimum, letter grade. Honors students cannot count HUMBIO 193 toward breadth.',
      slots: [
        {
          id: 'breadth-courses',
          label: 'Breadth Courses (aligned with Concentration)',
          type: 'any-approved',
          options: [],
          note: 'See advising team and bulletin for approved breadth courses in your concentration area.',
        },
      ],
    },

    // ── Depth in Discipline (18 units, ≥5 depth-eligible courses, 3 BS min) ─
    {
      id: 'depth',
      name: 'Depth in Discipline (18 units, ≥5 courses)',
      minUnits: 18,
      minCourses: 5,
      note: 'Minimum 5 depth-eligible courses directly related to your Area of Concentration. At least 3 must be BS-designated. Courses from at least 3 different departments required. Non-introductory, upper-level courses only (no activity/workshop/practica). C- minimum, letter grade (exception: one depth course may waive letter grade if no other upper-division course is taken CR/NC). Cross-listed HumBio courses count without enrolling in the other department\'s section.',
      slots: [
        {
          id: 'depth-courses',
          label: 'Depth Courses (directly related to Concentration)',
          type: 'any-approved',
          options: [],
          note: '≥3 departments represented. ≥3 BS-designated courses. 5+ depth-eligible courses. See advising team for approved list in your concentration.',
        },
      ],
    },

    // ── Capstone Experience (1 required) ──────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (choose 1 option)',
      note: 'All students must complete one capstone option. Apply during senior autumn (rolling through week 2). Many options require applications before senior year.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-practicum',
          name: 'Option A: Practicum (HUMBIO 191)',
          note: '1 unit, letter grade, C- minimum. Work toward completing Practicum throughout senior year; enroll in HUMBIO 191 the quarter you plan to complete it.',
          slots: [
            { id: 'cap-a-191', label: 'HUMBIO 191: Human Biology Practicum', type: 'required', options: [{ dept: 'HUMBIO', number: '191', name: 'Human Biology Practicum' }] },
          ],
        },
        {
          id: 'cap-synthesis',
          name: 'Option B: Synthesis (by application)',
          note: '2–3 courses, minimum 6 units total, all letter-graded. Apply rolling through week 2 of senior autumn.',
          slots: [
            {
              id: 'cap-b-synthesis',
              label: 'HUMBIO 192A/W/S: Human Biology Synthesis (2–3 quarters)',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'HUMBIO', number: '192A', name: 'Human Biology Synthesis (Autumn)' },
                { dept: 'HUMBIO', number: '192W', name: 'Human Biology Synthesis (Winter)' },
                { dept: 'HUMBIO', number: '192S', name: 'Human Biology Synthesis (Spring)' },
              ],
            },
          ],
        },
        {
          id: 'cap-honors',
          name: 'Option C: Human Biology Honors (HUMBIO 193 + 194)',
          note: 'HUMBIO 193 (10–15 units typical) + HUMBIO 194 (min B+). Requires min 3.0 core GPA and 3.2 overall Stanford GPA. Preliminary application early Feb junior year; final application early March junior year.',
          slots: [
            { id: 'cap-c-193', label: 'HUMBIO 193: Honors Research', type: 'required', options: [{ dept: 'HUMBIO', number: '193', name: 'Human Biology Honors Research' }] },
            { id: 'cap-c-194', label: 'HUMBIO 194: Honors Thesis (min B+)', type: 'required', options: [{ dept: 'HUMBIO', number: '194', name: 'Human Biology Honors Thesis' }] },
          ],
        },
        {
          id: 'cap-idh',
          name: 'Option D: Interdisciplinary Honors',
          note: 'Eight eligible IHN programs: ARTS-IHN, CSRE-IHN, DDRL-IHN, ED-IHN, ETHSO-IHN, FGSS-IHN, INSST-IHN, STS-IHN.',
          slots: [
            { id: 'cap-d-idh', label: 'Interdisciplinary Honors Program', type: 'any-approved', options: [] },
          ],
        },
        {
          id: 'cap-scicomm',
          name: 'Option E: Science Communication Notation (PWR)',
          note: 'By application through the Program in Writing and Rhetoric. Three required PWR courses (PWR 91NSC + 99ANSC + 99BNSC) plus either PWR 194 or one additional PWR 91 course (not PWR 91NSC). Additional 3–5 unit NSC elective required. PWR/NSC courses may NOT also count toward breadth or depth.',
          slots: [
            { id: 'cap-e-91nsc', label: 'PWR 91NSC: Introduction to Science Communication', type: 'required', options: [{ dept: 'PWR', number: '91NSC', name: 'Intermediate Writing: Introduction to Science Communication' }] },
            { id: 'cap-e-99ansc', label: 'PWR 99ANSC: NSC Portfolio Preparation I', type: 'required', options: [{ dept: 'PWR', number: '99ANSC', name: 'NSC Portfolio Preparation I' }] },
            { id: 'cap-e-99bnsc', label: 'PWR 99BNSC: NSC Portfolio Preparation II', type: 'required', options: [{ dept: 'PWR', number: '99BNSC', name: 'NSC Portfolio Preparation II' }] },
            { id: 'cap-e-194', label: 'PWR 194 or additional PWR 91 (not 91NSC)', type: 'any-approved', options: [{ dept: 'PWR', number: '194', name: 'Topics in Writing and Rhetoric' }], note: 'Or any other PWR 91 course (not PWR 91NSC). Check with advisor.' },
          ],
        },
      ],
    },

    // ── Writing in the Major (WIM) ────────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      note: 'WIM is satisfied automatically by completing all three B-series core courses: HUMBIO 2B, 3B, and 4B. No additional WIM course needed.',
      slots: [],
    },
  ],

  wimCourses: [
    { dept: 'HUMBIO', number: '2B', name: 'Culture, Evolution, and Society' },
    { dept: 'HUMBIO', number: '3B', name: 'Health Policy Analysis and Population Health' },
    { dept: 'HUMBIO', number: '4B', name: 'Development and Epidemiology' },
  ],
  wimMinCount: 3,
};
