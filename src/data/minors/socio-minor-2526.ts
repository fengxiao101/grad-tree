// Sociology Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/SOCIO-MIN/
// totalMinUnits: 24 (minimum 6 courses)
// Two pathways: Traditional or Poverty, Inequality, and Policy (PIP) subplan
// Grades: S/CR allowed; if letter grade, C or better required
// Related coursework from other depts may fulfill minor requirements (DUS approval)
// Must declare no later than deadline for application to graduate

import type { MajorConfig } from '../majorSchema';

const SOC_FOUND_ORGS = [
  { dept: 'SOC', number: '114', name: 'Economic Sociology' },
  { dept: 'SOC', number: '160', name: 'Formal Organizations' },
  { dept: 'SOC', number: '162', name: 'The Social Regulation of Markets' },
  { dept: 'SOC', number: '187', name: 'Ethics, Morality, and Markets' },
];

const SOC_FOUND_MOVEMENTS = [
  { dept: 'SOC', number: '318', name: 'Social Movements and Collective Action' },
  { dept: 'SOC', number: '119', name: 'Understanding Large-Scale Societal Change: The Case of the 1960s' },
  { dept: 'SOC', number: '130', name: 'Education and Society' },
  { dept: 'SOC', number: '176', name: 'The Social Life of Neighborhoods' },
];

const SOC_FOUND_SOCPSYCH = [
  { dept: 'SOC', number: '2', name: 'Self and Society: Introduction to Social Psychology' },
  { dept: 'SOC', number: '8', name: 'Sport, Competition, and Society' },
  { dept: 'SOC', number: '120', name: 'Interpersonal Relations' },
  { dept: 'SOC', number: '127', name: 'Data Science for Social Impact' },
];

const SOC_FOUND_STRATIFICATION = [
  { dept: 'SOC', number: '135', name: 'Poverty, Inequality, and Social Policy in the United States' },
  { dept: 'SOC', number: '141', name: 'Monitoring the Crisis' },
  { dept: 'SOC', number: '149', name: 'The Urban Underclass' },
  { dept: 'SOC', number: '152', name: 'The Social Determinants of Health' },
  { dept: 'SOC', number: '156A', name: 'The Changing American City' },
  { dept: 'SOC', number: '179A', name: 'Crime and Punishment in America' },
];

const SOC_FOUND_IDENTITY = [
  { dept: 'SOC', number: '142', name: 'Sociology of Gender' },
  { dept: 'SOC', number: '145', name: 'Race and Ethnic Relations in the USA' },
  { dept: 'SOC', number: '147', name: 'Race and Ethnicity Around the World' },
  { dept: 'SOC', number: '155', name: 'The Changing American Family' },
  { dept: 'SOC', number: '189', name: 'Race and Immigration' },
];

export const SOCIO_MINOR_2526: MajorConfig = {
  id: 'socio-minor-2526',
  name: 'Sociology (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 24,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
  sections: [
    { id: 'socio-track-selector', name: 'Subplan (choose 1)', trackSelector: true, slots: [] },
  ],
  tracks: [
    {
      id: 'socio-traditional',
      name: 'Traditional Sociology Minor',
      sections: [
        {
          id: 'socio-trad-core',
          name: 'Core Courses (2 courses)',
          slots: [
            {
              id: 'socio-intro',
              label: 'Introduction to Sociology',
              type: 'pick-one',
              options: [
                { dept: 'SOC', number: '1', name: 'Introduction to Sociology' },
                { dept: 'SOC', number: '170', name: 'Classics of Modern Social Theory' },
              ],
            },
            {
              id: 'socio-soc2',
              label: 'Social Psychology or Research Methods',
              type: 'pick-one',
              options: [
                { dept: 'SOC', number: '2', name: 'Self and Society: Introduction to Social Psychology' },
                { dept: 'SOC', number: '180A', name: 'Foundations of Social Research' },
                { dept: 'SOC', number: '180B', name: 'Introduction to Data Analysis' },
              ],
            },
          ],
        },
        {
          id: 'socio-trad-foundation',
          name: 'Foundation Courses (2 of 5 areas)',
          note: 'Complete one course from each of two current Sociology foundation areas. Related coursework from other departments may be approved by the DUS.',
          slots: [],
          pickGroupCount: 2,
          pickOneGroup: [
            {
              id: 'socio-found-orgs',
              name: 'Organizations, Business, and the Economy',
              slots: [{ id: 'socio-found-orgs-slot', label: 'Organizations, Business, and the Economy Course', type: 'pick-one', options: SOC_FOUND_ORGS }],
            },
            {
              id: 'socio-found-movements',
              name: 'Social Movements, Comparative Politics, and Social Change',
              slots: [{ id: 'socio-found-movements-slot', label: 'Social Movements, Comparative Politics, and Social Change Course', type: 'pick-one', options: SOC_FOUND_MOVEMENTS }],
            },
            {
              id: 'socio-found-socpsych',
              name: 'Social Psychology and Interpersonal Processes',
              slots: [{ id: 'socio-found-socpsych-slot', label: 'Social Psychology and Interpersonal Processes Course', type: 'pick-one', options: SOC_FOUND_SOCPSYCH }],
            },
            {
              id: 'socio-found-stratification',
              name: 'Social Stratification and Inequality',
              slots: [{ id: 'socio-found-stratification-slot', label: 'Social Stratification and Inequality Course', type: 'pick-one', options: SOC_FOUND_STRATIFICATION }],
            },
            {
              id: 'socio-found-identity',
              name: 'Race, Gender, Immigration, Identity, and Policy',
              slots: [{ id: 'socio-found-identity-slot', label: 'Race, Gender, Immigration, Identity, and Policy Course', type: 'pick-one', options: SOC_FOUND_IDENTITY }],
            },
          ],
        },
        {
          id: 'socio-trad-add',
          name: 'Additional Sociology Courses (2 courses)',
          note: 'Two additional courses in Sociology or related fields approved by the DUS.',
          slots: [
            {
              id: 'socio-add-slot',
              label: 'Additional Sociology Course',
              type: 'any-approved',
              options: [],
              count: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'socio-pip',
      name: 'Poverty, Inequality, and Policy Subplan',
      sections: [
        {
          id: 'socio-pip-core',
          name: 'Core Courses (2 courses, including SOC3)',
          slots: [
            {
              id: 'socio-pip-soc3',
              label: 'SOC 3: America: Unequal',
              type: 'required',
              options: [{ dept: 'SOC', number: '3', name: 'America: Unequal' }],
            },
            {
              id: 'socio-pip-methods',
              label: 'Research Methods or Probability',
              type: 'pick-one',
              options: [
                { dept: 'SOC', number: '180A', name: 'Foundations of Social Research' },
                { dept: 'SOC', number: '180B', name: 'Introduction to Data Analysis' },
                { dept: 'ECON', number: '102A', name: 'Introduction to Statistical Methods (Postcalculus) for Social Scientists' },
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
              ],
            },
          ],
        },
        {
          id: 'socio-pip-breadth',
          name: 'Concentration Area Courses (2 courses from at least 2 of 7 areas)',
          note: 'Choose at least 2 courses from at least 2 different concentration areas: Education, Gender, Health & Well-Being, Inequality & Mobility, Labor Markets, Poverty & Safety Net, Race/Ethnicity/Immigration. See https://bulletin.stanford.edu/programs/SOCIO-MIN/ for the full course list per area.',
          slots: [],
          pickGroupCount: 2,
          pickOneGroup: [
            {
              id: 'socio-pip-education',
              name: 'Education',
              slots: [{
                id: 'socio-pip-education-course',
                label: 'Education Concentration Course',
                type: 'any-approved',
                options: [],
                listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
                note: 'Choose any course from the Bulletin PIP Education list.',
              }],
            },
            {
              id: 'socio-pip-gender',
              name: 'Gender',
              slots: [{
                id: 'socio-pip-gender-course',
                label: 'Gender Concentration Course',
                type: 'any-approved',
                options: [],
                listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
                note: 'Choose any course from the Bulletin PIP Gender list.',
              }],
            },
            {
              id: 'socio-pip-health',
              name: 'Health and Well-Being',
              slots: [{
                id: 'socio-pip-health-course',
                label: 'Health and Well-Being Concentration Course',
                type: 'any-approved',
                options: [],
                listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
                note: 'Choose any course from the Bulletin PIP Health and Well-Being list.',
              }],
            },
            {
              id: 'socio-pip-inequality',
              name: 'Inequality and Mobility',
              slots: [{
                id: 'socio-pip-inequality-course',
                label: 'Inequality and Mobility Concentration Course',
                type: 'any-approved',
                options: [],
                listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
                note: 'Choose any course from the Bulletin PIP Inequality and Mobility list.',
              }],
            },
            {
              id: 'socio-pip-labor',
              name: 'Labor Markets',
              slots: [{
                id: 'socio-pip-labor-course',
                label: 'Labor Markets Concentration Course',
                type: 'any-approved',
                options: [],
                listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
                note: 'Choose any course from the Bulletin PIP Labor Markets list.',
              }],
            },
            {
              id: 'socio-pip-poverty',
              name: 'Poverty and the Safety Net',
              note: 'Most approved options are one course. Ending Poverty with Technology is the two-course sequence SOC 157 + SOC 158 (cross-listed as PUBLPOL 147 + 148), and both courses must be completed.',
              slots: [
                {
                  id: 'socio-pip-poverty-course',
                  label: 'Poverty and the Safety Net Course / Sequence Part 1',
                  type: 'any-approved',
                  options: [],
                  listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
                  note: 'Choose one approved single-course option, or use SOC 157/PUBLPOL 147 here as the first half of Ending Poverty with Technology.',
                },
                {
                  id: 'socio-pip-poverty-sequence-2',
                  label: 'Ending Poverty with Technology: Sequence Part 2 (when using SOC 157/PUBLPOL 147)',
                  type: 'pick-one',
                  options: [
                    { dept: 'SOC', number: '158', name: 'Ending Poverty with Technology II' },
                    { dept: 'PUBLPOL', number: '148', name: 'Ending Poverty with Technology II' },
                  ],
                  optional: true,
                  note: 'Required companion to SOC 157 or PUBLPOL 147; do not use for a single-course Poverty and the Safety Net option.',
                },
              ],
            },
            {
              id: 'socio-pip-race',
              name: 'Race, Ethnicity, and Immigration',
              slots: [{
                id: 'socio-pip-race-course',
                label: 'Race, Ethnicity, and Immigration Concentration Course',
                type: 'any-approved',
                options: [],
                listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
                note: 'Choose any course from the Bulletin PIP Race, Ethnicity, and Immigration list.',
              }],
            },
          ],
        },
        {
          id: 'socio-pip-elec',
          name: 'Elective Courses (2 courses)',
          note: 'Two courses from the PIP pre-approved elective list or additional concentration courses. Students may petition for other courses related to inequality, poverty, and mobility. Optionally, replace 1 elective with a research apprenticeship (up to 5 units). See https://bulletin.stanford.edu/programs/SOCIO-MIN/ for the full approved list.',
          slots: [
            {
              id: 'socio-pip-elec-slot',
              label: 'PIP Elective Course',
              type: 'any-approved',
              options: [],
              count: 2,
              listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MIN/',
              note: 'Use any course from the Bulletin PIP elective list or an additional concentration course. Other relevant courses require approval; one elective may be replaced by an approved research apprenticeship of up to 5 units.',
            },
          ],
        },
      ],
    },
  ],
};
