import type { MajorConfig, CourseOption } from '../majorSchema';

// ── Foundation area lists (Standard BA) ──────────────────────────────────────

const FOUND_ORGS: CourseOption[] = [
  { dept: 'SOC', number: '114', name: 'Economic Sociology' },
  { dept: 'SOC', number: '160', name: 'Formal Organizations' },
  { dept: 'SOC', number: '162', name: 'The Social Regulation of Markets' },
  { dept: 'SOC', number: '187', name: 'Ethics, Morality, and Markets' },
];

const FOUND_MOVEMENTS: CourseOption[] = [
  { dept: 'SOC', number: '318', name: 'Social Movements and Collective Action' },
  { dept: 'SOC', number: '119', name: 'Understanding Large-Scale Societal Change: The Case of the 1960s' },
  { dept: 'SOC', number: '130', name: 'Education and Society' },
  { dept: 'SOC', number: '176', name: 'The Social Life of Neighborhoods' },
];

const FOUND_SOCPSYCH: CourseOption[] = [
  { dept: 'SOC', number: '2', name: 'Self and Society: Introduction to Social Psychology' },
  { dept: 'SOC', number: '8', name: 'Sport, Competition, and Society' },
  { dept: 'SOC', number: '120', name: 'Interpersonal Relations' },
  { dept: 'SOC', number: '127', name: 'Data Science for Social Impact' },
];

const FOUND_STRAT: CourseOption[] = [
  { dept: 'SOC', number: '135', name: 'Poverty, Inequality, and Social Policy in the United States' },
  { dept: 'SOC', number: '141', name: 'Monitoring the Crisis' },
  { dept: 'SOC', number: '149', name: 'The Urban Underclass' },
  { dept: 'SOC', number: '152', name: 'The Social Determinants of Health' },
  { dept: 'SOC', number: '156A', name: 'The Changing American City' },
  { dept: 'SOC', number: '179A', name: 'Crime and Punishment in America' },
];

const FOUND_RACE: CourseOption[] = [
  { dept: 'SOC', number: '142', name: 'Sociology of Gender' },
  { dept: 'SOC', number: '145', name: 'Race and Ethnic Relations in the USA' },
  { dept: 'SOC', number: '147', name: 'Race and Ethnicity Around the World' },
  { dept: 'SOC', number: '155', name: 'The Changing American Family' },
  { dept: 'SOC', number: '189', name: 'Race and Immigration' },
];

// ── DSMM foundation list ───────────────────────────────────────────────────────

const DSMM_FOUNDATION: CourseOption[] = [
  { dept: 'SOC', number: '3', name: 'America: Unequal' },
  { dept: 'SOC', number: '18N', name: 'Ethics, Morality, and Markets' },
  { dept: 'SOC', number: '114', name: 'Economic Sociology' },
  { dept: 'SOC', number: '130', name: 'Education and Society' },
  { dept: 'SOC', number: '162', name: 'The Social Regulation of Markets' },
  { dept: 'SOC', number: '187', name: 'Ethics, Morality, and Markets' },
];

export const SOCIO_BA_2526: MajorConfig = {
  id: 'socio-ba-2526',
  name: 'Sociology (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 60,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/SOCIO-BA/',
  wimCourses: [
    { dept: 'SOC', number: '202', name: 'Junior Seminar: Preparation for Research' },
    { dept: 'SOC', number: '204A', name: 'Capstone Research Seminar: Part I' },
    { dept: 'SOC', number: '204B', name: 'Capstone Research Seminar: Part II' },
    { dept: 'SOC', number: '204C', name: 'Capstone Research Seminar: Part III' },
  ],

  sections: [
    {
      id: 'socio-pathway',
      name: 'Degree Pathway',
      trackSelector: true,
      note: 'Choose the Standard Sociology BA or the Data Science, Markets, and Management subplan (printed on transcript and diploma).',
      slots: [],
    },
  ],

  tracks: [
    // ── Track 1: Standard Sociology BA ─────────────────────────────────────────
    {
      id: 'standard',
      name: 'Standard Sociology BA',
      sections: [
        {
          id: 'soc-core',
          name: 'Core Courses (3 courses, 13–14 units)',
          note: 'All three core courses required. 3.0 GPA required to enter the major.',
          slots: [
            {
              id: 'soc-core-intro',
              label: 'Introduction to Sociology (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'SOC', number: '1', name: 'Introduction to Sociology' },
                { dept: 'SOC', number: '170', name: 'Classics of Modern Social Theory' },
              ],
            },
            {
              id: 'soc-core-180a',
              label: 'SOC 180A: Foundations of Social Research',
              type: 'required',
              options: [{ dept: 'SOC', number: '180A' }],
            },
            {
              id: 'soc-core-180b',
              label: 'SOC 180B: Introduction to Data Analysis',
              type: 'required',
              options: [{ dept: 'SOC', number: '180B' }],
            },
          ],
        },

        {
          id: 'soc-foundation',
          name: 'Foundation Courses (complete 3 of 5 areas, 12 units)',
          note: 'Complete one course from each of any THREE of the five foundation areas (12 units). Any three areas may be chosen.',
          slots: [],
          pickGroupCount: 3,
          pickOneGroup: [
            {
              id: 'soc-found-orgs',
              name: 'Area 1: Organizations, Business, and the Economy',
              slots: [{
                id: 'soc-found-orgs-slot',
                label: 'Organizations, Business, and the Economy course',
                type: 'pick-from-list',
                count: 1,
                options: FOUND_ORGS,
              }],
            },
            {
              id: 'soc-found-movements',
              name: 'Area 2: Social Movements, Comparative Politics, and Social Change',
              slots: [{
                id: 'soc-found-movements-slot',
                label: 'Social Movements, Comparative Politics, and Social Change course',
                type: 'pick-from-list',
                count: 1,
                options: FOUND_MOVEMENTS,
              }],
            },
            {
              id: 'soc-found-socpsych',
              name: 'Area 3: Social Psychology and Interpersonal Processes',
              slots: [{
                id: 'soc-found-socpsych-slot',
                label: 'Social Psychology and Interpersonal Processes course',
                type: 'pick-from-list',
                count: 1,
                options: FOUND_SOCPSYCH,
              }],
            },
            {
              id: 'soc-found-strat',
              name: 'Area 4: Social Stratification and Inequality',
              slots: [{
                id: 'soc-found-strat-slot',
                label: 'Social Stratification and Inequality course',
                type: 'pick-from-list',
                count: 1,
                options: FOUND_STRAT,
              }],
            },
            {
              id: 'soc-found-race',
              name: 'Area 5: Race, Gender, Immigration, Identity, and Policy',
              slots: [{
                id: 'soc-found-race-slot',
                label: 'Race, Gender, Immigration, Identity, and Policy course',
                type: 'pick-from-list',
                count: 1,
                options: FOUND_RACE,
              }],
            },
          ],
        },

        {
          id: 'soc-methods',
          name: 'Methodology Requirement (1 course, 4–5 units)',
          minCourses: 1,
          note: 'At least one methodology course, quantitative or qualitative. Quantitative options include data analysis, programming, CS, statistics, and math. Qualitative options include field research methods. SOC 180A and 180B already required in core.',
          slots: [
            {
              id: 'soc-methods-course',
              label: 'Methodology Course (quantitative or qualitative)',
              type: 'any-approved',
              options: [],
              note: 'Must supplement (not duplicate) core courses. Approved by Director of Undergraduate Studies if not a standard quantitative or qualitative methods course.',
            },
          ],
        },

        {
          id: 'soc-capstone',
          name: 'Capstone Requirement: WIM (choose path)',
          note: 'Complete at least 1 of the following paths. Both also satisfy WIM. The full SOC 204A/B/C sequence is strongly recommended, but only SOC 204A is required.',
          slots: [],
          pickOneGroup: [
            {
              id: 'soc-cap-202-path',
              name: 'Path A: Junior Seminar + Honors Thesis',
              note: 'SOC 202 alone does not complete the capstone. Students must also complete an approved honors thesis in their senior year.',
              slots: [
                {
                  id: 'soc-cap-202',
                  label: 'SOC 202: Junior Seminar: Preparation for Research',
                  type: 'required',
                  options: [{ dept: 'SOC', number: '202', name: 'Junior Seminar: Preparation for Research' }],
                },
                {
                  id: 'soc-cap-honors-thesis',
                  label: 'Complete an approved Sociology honors thesis',
                  type: 'any-approved',
                  options: [],
                  note: 'Manual completion item representing the required senior-year honors thesis.',
                },
              ],
            },
            {
              id: 'soc-cap-204a-path',
              name: 'Path B: Capstone Research Seminar',
              slots: [
                { id: 'soc-cap-204a', label: 'SOC 204A: Capstone Research Seminar: Part I', type: 'required', options: [{ dept: 'SOC', number: '204A', name: 'Capstone Research Seminar: Part I' }] },
              ],
            },
          ],
        },

        {
          id: 'soc-electives',
          name: 'Social Science Electives (to reach 60 units)',
          note: 'Remaining units (≈25–27) sufficient to bring major total to 60. May be all SOC courses or include up to 10 units from Anthropology, Communication, Economics, Political Science, or Psychology. Non-SOC courses need Director of Undergraduate Studies approval.',
          slots: [
            {
              id: 'soc-elec-soc',
              label: 'SOC Elective Courses',
              type: 'any-approved',
              options: [],
              note: 'Any SOC course not already counted toward core, foundation, or methods requirements. C- or above recommended; D- or above accepted.',
            },
            {
              id: 'soc-elec-other',
              label: 'Other Social Science Electives (max 10 units)',
              type: 'any-approved',
              optional: true,
              maxCountedUnits: 10,
              options: [],
              note: 'Up to 10 units from Anthropology, Communication, Economics, Political Science, or Psychology. Must be approved by the Director of Undergraduate Studies.',
            },
          ],
        },
      ],
    },

    // ── Track 2: Data Science, Markets, and Management Subplan ─────────────────
    {
      id: 'dsmm',
      name: 'Data Science, Markets, and Management Subplan',
      sections: [
        {
          id: 'dsmm-core',
          name: 'DSMM Core Requirements (6 categories)',
          note: 'One course per category. 3.0 GPA required. Subplan prints on diploma and transcript. Substitutions only with DUS consent.',
          slots: [
            {
              id: 'dsmm-experimental',
              label: 'Experimental Methods (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'SOC', number: '2', name: 'Self and Society: Introduction to Social Psychology' },
                { dept: 'SOC', number: '120', name: 'Interpersonal Relations' },
              ],
            },
            {
              id: 'dsmm-programming',
              label: 'Computer Programming (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'CS', number: '105', name: 'Introduction to Computers' },
                { dept: 'CS', number: '106A', name: 'Programming Methodology' },
                { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
                { dept: 'CS', number: '106X', name: 'Programming Abstractions (Accelerated)' },
              ],
            },
            {
              id: 'dsmm-bigdata',
              label: 'Analysis of Big Data (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'MS&E', number: '231', name: 'Social Algorithms' },
                { dept: 'SOC', number: '10', name: 'Introduction to Computational Social Science' },
                { dept: 'SOC', number: '278', name: 'Social Algorithms' },
              ],
            },
            {
              id: 'dsmm-180b',
              label: 'SOC 180B: Introduction to Data Analysis',
              type: 'required',
              options: [{ dept: 'SOC', number: '180B' }],
            },
            {
              id: 'dsmm-network',
              label: 'Network Analysis (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'CS', number: '224W', name: 'Machine Learning with Graphs' },
                { dept: 'ECON', number: '291', name: 'Social and Economic Networks' },
                { dept: 'MS&E', number: '135', name: 'Networks' },
                { dept: 'SOC', number: '31N', name: 'Social Networks' },
                { dept: 'SOC', number: '126', name: 'Introduction to Social Networks' },
                { dept: 'SOC', number: '224B', name: 'Relational Sociology' },
              ],
            },
            {
              id: 'dsmm-wim',
              label: 'Writing in the Major: WIM (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'SOC', number: '202', name: 'Junior Seminar: Preparation for Research' },
                { dept: 'SOC', number: '204A', name: 'Capstone Research Seminar: Part I' },
              ],
            },
          ],
        },

        {
          id: 'dsmm-foundation',
          name: 'Foundation: Economics, Organizations, Business (≥2 courses)',
          minCourses: 2,
          note: 'At least two courses from this list emphasizing economics, organizations, business, labor markets, and the economy.',
          slots: [
            {
              id: 'dsmm-found-1',
              label: 'Foundation Course #1',
              type: 'pick-from-list',
              count: 1,
              options: DSMM_FOUNDATION,
            },
            {
              id: 'dsmm-found-2',
              label: 'Foundation Course #2',
              type: 'pick-from-list',
              count: 1,
              options: DSMM_FOUNDATION,
            },
          ],
        },

        {
          id: 'dsmm-electives',
          name: 'DSMM Electives (7 additional courses)',
          note: 'Seven courses beyond core and foundation: 4 SOC (16 units) + 2 CS/Math/Stats/Quantitative Social Science (8 units) + 1 SOC or Social Science elective (4 units).',
          slots: [
            {
              id: 'dsmm-soc-electives',
              label: 'Additional SOC Courses (4, 16 units)',
              type: 'any-approved',
              count: 4,
              options: [],
              note: '16 units of SOC courses beyond core and foundation requirements.',
            },
            {
              id: 'dsmm-tech-electives',
              label: 'CS / Math / Stats / Quantitative Social Science (2, 8 units)',
              type: 'any-approved',
              count: 2,
              options: [],
              note: '8 units of Computer Science, Mathematics, Statistics, or Quantitative Social Science courses.',
            },
            {
              id: 'dsmm-social-elective',
              label: 'SOC or Social Science Elective (1, 4 units)',
              type: 'any-approved',
              count: 1,
              options: [],
              note: '4 units of any Sociology or Social Science elective.',
            },
          ],
        },
      ],
    },
  ],
};
