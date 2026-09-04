import type { MajorConfig } from '../majorSchema';

const LAW_POLICY_OPTIONS = [
  { dept: 'CSRE', number: '175W' },
  { dept: 'LAW', number: '1043' },
  { dept: 'LAW', number: '1047' },
  { dept: 'LAW', number: '2508' },
  { dept: 'LAW', number: '2513' },
  { dept: 'LAW', number: '2515' },
  { dept: 'LAW', number: '2519' },
  { dept: 'LAW', number: '5010' },
  { dept: 'LAW', number: '5013' },
  { dept: 'PUBLPOL', number: '302B' },
];

const DECISION_MAKING_OPTIONS = [
  { dept: 'DESIGN', number: '273' },
  { dept: 'ECON', number: '137' },
  { dept: 'LAW', number: '7508' },
];

const APPLIED_ECON_OPTIONS = [
  { dept: 'ECON', number: '102C' },
  { dept: 'PUBLPOL', number: '205' },
  { dept: 'PUBLPOL', number: '303D' },
  { dept: 'STATS', number: '202' },
];

const courses = (...codes: string[]) => codes.map(code => {
  const [dept, number] = code.split(' ');
  return { dept, number };
});

const subplan = (
  id: string,
  name: string,
  gateway: ReturnType<typeof courses>,
  electives: ReturnType<typeof courses>,
) => ({
  id,
  name,
  sections: [
    ...(gateway.length ? [{
      id: `${id}-gateway`,
      name: 'Gateway Courses',
      note: 'Complete at least one gateway course for a letter grade.',
      slots: [{
        id: `${id}-gateway-courses`,
        label: 'Approved gateway courses',
        type: 'pick-from-list' as const,
        count: 1,
        options: gateway,
      }],
    }] : []),
    {
      id: `${id}-electives`,
      name: 'Elective Courses',
      note: 'Choose approved electives for a letter grade. Other coherent courses may count with faculty advisor and program director approval.',
      slots: [{
        id: `${id}-elective-courses`,
        label: 'Approved elective courses',
        type: 'any-approved' as const,
        options: electives,
      }],
    },
  ],
});

const PUBLIC_POLICY_SUBPLAN_DEFINITIONS = [
  subplan(
    'computational-public-policy',
    'Computational Public Policy',
    courses('CS 103', 'CS 106A', 'CS 106B', 'EDUC 205', 'EDUC 430B', 'POLISCI 150A'),
    courses('CS 124', 'CS 129', 'CS 221', 'CS 228', 'MS&E 226', 'POLISCI 150B', 'STATS 207'),
  ),
  subplan(
    'discrimination-crime-poverty',
    'Discrimination, Crime and Poverty',
    [],
    courses(
      'AMSTUD 201', 'CSRE 123', 'CSRE 177E', 'CSRE 179A', 'ECON 206', 'EDUC 212',
      'EDUC 337', 'EDUC 381', 'EDUC 429', 'FEMGEN 297', 'HISTORY 161', 'HISTORY 226E',
      'HISTORY 255D', 'INTLPOL 220', 'INTLPOL 281', 'INTNLREL 142', 'LAW 7063',
      'MGTECON 327', 'MGTECON 526', 'POLISCI 336', 'PUBLPOL 113', 'PUBLPOL 121L',
      'SOC 118', 'SOC 242', 'SOC 249', 'SOC 340L', 'URBANST 132', 'URBANST 133',
    ),
  ),
  subplan(
    'education-policy',
    'Education Policy',
    courses('EDUC 222', 'EDUC 271', 'EDUC 306A', 'EDUC 347'),
    courses(
      'EDUC 201', 'EDUC 208C', 'EDUC 220C', 'EDUC 310', 'EDUC 100A', 'EDUC 100B',
      'EDUC 100C', 'EDUC 103B', 'EDUC 117', 'EDUC 136', 'EDUC 144A', 'EDUC 177A',
      'EDUC 200A', 'EDUC 200B', 'EDUC 202', 'EDUC 204', 'EDUC 207', 'EDUC 252',
      'EDUC 265', 'EDUC 306D', 'EDUC 316', 'EDUC 321', 'EDUC 430B', 'EDUC 486',
      'PEDS 229', 'PUBLPOL 316', 'SOC 130', 'SOC 369',
    ),
  ),
  subplan(
    'health-care-policy',
    'Health Care Policy',
    courses('BMDS 237', 'BMDS 236', 'ECON 126', 'MS&E 292', 'PUBLPOL 156', 'PUBLPOL 222'),
    courses(
      'AFRICAAM 132', 'BIOE 390', 'CEE 265D', 'CEE 274D', 'EASTASN 217', 'ECON 118',
      'ECON 214', 'HRP 207', 'HRP 208', 'HRP 392', 'HUMBIO 120', 'HUMBIO 120A',
      'HUMBIO 122', 'HUMBIO 122S', 'MED 232', 'MED 266', 'MED 294', 'MS&E 252',
      'MS&E 256', 'PEDS 229', 'PSYCH 101', 'PSYCH 102', 'PUBLPOL 227', 'SOMGEN 275',
    ),
  ),
  subplan(
    'international-national-security-policy',
    'International and National Security Policy',
    courses('INTLPOL 321', 'POLISCI 114S'),
    courses('HISTORY 324C', 'INTLPOL 240', 'INTLPOL 321', 'INTLPOL 352', 'INTNLREL 131', 'POLISCI 114S', 'STRAMGT 579'),
  ),
  subplan(
    'legal-regulatory-intervention',
    'Legal and Regulatory Intervention',
    courses('ECON 157', 'LAW 7001C', 'NBIO 201'),
    courses(
      'BMDS 236', 'ECON 111', 'ECON 126', 'ECON 136', 'ECON 250', 'LAW 1001',
      'LAW 2505', 'LAW 7051', 'MS&E 243', 'MS&E 256', 'PSYCH 232', 'PUBLPOL 122',
      'PUBLPOL 156', 'PUBLPOL 222',
    ),
  ),
  subplan(
    'political-moral-philosophy',
    'Political and Moral Philosophy',
    [],
    courses(
      'ANTHRO 301A', 'GSBGEN 208', 'HUMBIO 174', 'LAW 3502', 'NBIO 201', 'PEDS 251A',
      'PHIL 175', 'PHIL 225', 'PHIL 270', 'PHIL 272', 'PHIL 276', 'POLISCI 131L',
      'POLISCI 132A', 'POLISCI 134', 'POLISCI 134P', 'POLISCI 230A', 'POLISCI 236',
      'PUBLPOL 219', 'PUBLPOL 234',
    ),
  ),
  subplan(
    'resources-environment-energy-policy',
    'Sustainability, Environment, and Energy Policy',
    courses('ECON 250', 'LAW 2504', 'MS&E 243'),
    courses(
      'CEE 162E', 'CEE 166A', 'CEE 166B', 'CEE 172A', 'CEE 176A', 'CEE 176B',
      'CEE 262B', 'CEE 262D', 'CEE 265D', 'CEE 271B', 'CEE 274D', 'CEE 274P',
      'CEE 278A', 'EARTHSYS 194', 'EARTHSYS 111', 'EARTHSYS 281', 'ECON 106',
      'ENERGY 101', 'ENERGY 102', 'INTNLREL 146A', 'ENERGY 104', 'LAW 2505',
      'LAW 7001C', 'ME 370A', 'ME 370B', 'MS&E 201', 'MS&E 211', 'MS&E 246',
      'MS&E 293', 'PUBLPOL 116',
    ),
  ),
  subplan(
    'science-technology-policy',
    'Science and Technology Policy',
    courses('COMM 230A', 'HISTORY 140A', 'MS&E 250A', 'PSYCH 232', 'PUBLPOL 353A', 'PUBLPOL 353B', 'SOC 330'),
    courses(
      'BIO 117', 'BIO 234', 'CEE 207A', 'EARTHSYS 212', 'ECON 118', 'ECON 126',
      'ECON 155', 'ECON 250', 'ECON 253', 'ENERGY 301', 'HUMBIO 174', 'INTLPOL 220',
      'INTLPOL 267', 'INTLPOL 268D', 'INTLPOL 321', 'LAW 2504', 'LAW 2519',
      'LAW 3004', 'LAW 4005', 'MS&E 184', 'MS&E 243', 'MS&E 254', 'MS&E 256',
      'MS&E 270', 'MS&E 279', 'MS&E 284', 'MS&E 292', 'MS&E 293', 'PUBLPOL 163',
      'PUBLPOL 182', 'PUBLPOL 222', 'URBANST 165', 'URBANST 173',
    ),
  ),
  subplan(
    'urban-policy',
    'Urban Policy',
    courses('PUBLPOL 174', 'URBANST 110'),
    courses(
      'CEE 172', 'CEE 248', 'CEE 277L', 'COMM 264', 'EARTHSYS 220', 'EDUC 212',
      'EARTHSYS 281', 'EDUC 271', 'EDUC 337', 'EDUC 447', 'LAW 7071', 'POLISCI 236',
      'PUBLPOL 135', 'PUBLPOL 113', 'PUBLPOL 143', 'PUBLPOL 154', 'PUBLPOL 171',
      'PUBLPOL 218X', 'PUBLPOL 218Y', 'SOC 179A', 'SOC 249', 'SOC 341W', 'SOC 479',
      'STRAMGT 537', 'URBANST 113', 'URBANST 114', 'URBANST 131', 'URBANST 132',
      'URBANST 141', 'URBANST 141A', 'URBANST 163', 'URBANST 164', 'URBANST 165',
    ),
  ),
  subplan('self-designed', 'Self-Designed', [], []),
];

const publicPolicySubplans = (minUnits: number) => PUBLIC_POLICY_SUBPLAN_DEFINITIONS.map(option => ({
  ...option,
  minUnits,
  note: option.id === 'self-designed'
    ? 'A detailed statement of study goals and the relationship of every proposed course to those goals requires faculty advisor and program director approval.'
    : `Complete at least ${minUnits} subplan units at the 100 level or above for a letter grade.`,
}));

export const PUBLPOL_MA_2526: MajorConfig = {
  id: 'publpol-ma-2526',
  name: 'Public Policy MA (Coterm)',
  school: 'School of Humanities and Sciences',
  year: '2025-26',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PUBPO-MA/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'path-selector',
      name: 'Program Path',
      trackSelector: true,
      note: 'Select the path that matches your undergraduate major: Path A for Public Policy majors, Path B for Economics majors, or Path C for all other majors.',
      slots: [],
    },
  ],
  tracks: [
    {
      id: 'path-a',
      name: 'Path A: Public Policy Majors',
      sections: [
        {
          id: 'path-a-core',
          name: 'Core Requirements',
          note: 'All 45 units must be 100-level or above; at least 25 must be 200-level or above. All taken for a letter grade (except PUBLPOL311 which is S/NC).',
          slots: [
            {
              id: 'a-decision',
              label: 'Decision-Making',
              type: 'pick-from-list',
              count: 1,
              options: DECISION_MAKING_OPTIONS,
            },
            {
              id: 'a-colloquium',
              label: 'PUBLPOL 311: Public Policy Colloquium (2 quarters)',
              type: 'required',
              times: 2,
              note: 'S/NC only. Enroll for 2 quarters (2 units total).',
              options: [{ dept: 'PUBLPOL', number: '311' }],
            },
            {
              id: 'a-practicum-thesis',
              label: 'Practicum or Master\'s Thesis',
              type: 'pick-from-list',
              count: 1,
              note: 'Choose practicum (PUBLPOL309) OR thesis track (PUBLPOL310A + PUBLPOL310 for remaining thesis units).',
              options: [
                { dept: 'PUBLPOL', number: '309' },
                { dept: 'PUBLPOL', number: '310A' },
                { dept: 'PUBLPOL', number: '310' },
              ],
            },
          ],
        },
        {
          id: 'path-a-subplan',
          name: 'Subplan',
          selectorLabel: 'Select a subplan',
          selectorOptions: publicPolicySubplans(29),
          note: '29+ units in a chosen subplan (Computational Public Policy, Education Policy, Health Care Policy, International & National Security Policy, Legal & Regulatory Intervention, Political & Moral Philosophy, Resources/Environment/Energy Policy, Science & Technology Policy, Urban Policy, or Self-Designed). All courses 100-level+; letter grade required. Faculty advisor approval required.',
          slots: [],
        },
      ],
    },
    {
      id: 'path-b',
      name: 'Path B: Economics Majors',
      sections: [
        {
          id: 'path-b-core',
          name: 'Core Courses',
          note: 'All 45 units must be 100-level or above; at least 25 must be 200-level or above. All taken for a letter grade (except PUBLPOL311). Waivers may apply if equivalent courses were completed for the Econ major (see bulletin).',
          slots: [
            {
              id: 'b-politics',
              label: 'Politics',
              type: 'pick-one',
              options: [
                { dept: 'PUBLPOL', number: '201' },
                { dept: 'PUBLPOL', number: '308' },
              ],
            },
            {
              id: 'b-law-policy',
              label: 'Law and Policy',
              type: 'pick-from-list',
              count: 1,
              note: 'Waived if ECON154 was taken for the Econ major.',
              options: LAW_POLICY_OPTIONS,
            },
            {
              id: 'b-econ-analysis',
              label: 'Economic Analysis',
              type: 'pick-one',
              note: 'Waived if ECON150 was taken for the Econ major.',
              options: [
                { dept: 'PUBLPOL', number: '204' },
                { dept: 'PUBLPOL', number: '301B' },
              ],
            },
            {
              id: 'b-decision',
              label: 'Decision Making',
              type: 'pick-from-list',
              count: 1,
              options: DECISION_MAKING_OPTIONS,
            },
            {
              id: 'b-political-philosophy',
              label: 'Political Theory in Public Policy',
              type: 'required',
              options: [{ dept: 'PUBLPOL', number: '314' }],
            },
            {
              id: 'b-organizations',
              label: 'Organizations',
              type: 'pick-one',
              options: [
                { dept: 'MS&E', number: '180' },
                { dept: 'MS&E', number: '280' },
                { dept: 'PUBLPOL', number: '238' },
              ],
            },
            {
              id: 'b-applied-econ',
              label: 'Applied Econometrics',
              type: 'pick-from-list',
              count: 1,
              note: 'Waived if ECON102C was taken for the Econ major.',
              options: APPLIED_ECON_OPTIONS,
            },
            {
              id: 'b-colloquium',
              label: 'Public Policy Colloquium',
              type: 'required',
              note: 'S/NC only. Enroll for 2 quarters (2 units total).',
              options: [{ dept: 'PUBLPOL', number: '311' }],
            },
          ],
        },
        {
          id: 'path-b-subplan',
          name: 'Subplan',
          selectorLabel: 'Select a subplan',
          selectorOptions: publicPolicySubplans(15),
          note: '15+ units in a chosen subplan. Faculty advisor approval required. Additional approved courses may be petitioned to reach 45 total units.',
          slots: [],
        },
      ],
    },
    {
      id: 'path-c',
      name: 'Path C: All Other Majors',
      sections: [
        {
          id: 'path-c-core',
          name: 'Core Courses',
          note: 'All 45 units must be 100-level or above; at least 25 must be 200-level or above. All taken for a letter grade (except PUBLPOL311 which is S/NC). No subplan required; petition additional advanced policy courses to meet 45-unit total.',
          slots: [
            {
              id: 'c-stats',
              label: 'Introduction to Statistical Methods',
              type: 'required',
              options: [{ dept: 'ECON', number: '102A' }],
            },
            {
              id: 'c-micro',
              label: 'Intermediate Microeconomics for Public Policy',
              type: 'required',
              options: [{ dept: 'PUBLPOL', number: '301A' }],
            },
            {
              id: 'c-politics',
              label: 'Politics',
              type: 'pick-one',
              options: [
                { dept: 'PUBLPOL', number: '201' },
                { dept: 'PUBLPOL', number: '308' },
              ],
            },
            {
              id: 'c-law-policy',
              label: 'Law and Policy',
              type: 'pick-from-list',
              count: 1,
              options: LAW_POLICY_OPTIONS,
            },
            {
              id: 'c-econ-analysis',
              label: 'Economic Analysis',
              type: 'pick-one',
              options: [
                { dept: 'PUBLPOL', number: '204' },
                { dept: 'PUBLPOL', number: '301B' },
              ],
            },
            {
              id: 'c-decision',
              label: 'Decision Making',
              type: 'pick-from-list',
              count: 1,
              options: DECISION_MAKING_OPTIONS,
            },
            {
              id: 'c-political-philosophy',
              label: 'Political Theory in Public Policy',
              type: 'required',
              options: [{ dept: 'PUBLPOL', number: '314' }],
            },
            {
              id: 'c-organizations',
              label: 'Organizations',
              type: 'pick-one',
              options: [
                { dept: 'MS&E', number: '180' },
                { dept: 'MS&E', number: '280' },
                { dept: 'PUBLPOL', number: '238' },
              ],
            },
            {
              id: 'c-applied-econ',
              label: 'Applied Econometrics',
              type: 'pick-from-list',
              count: 1,
              options: APPLIED_ECON_OPTIONS,
            },
            {
              id: 'c-colloquium',
              label: 'Public Policy Colloquium',
              type: 'required',
              note: 'S/NC only. Enroll for 2 quarters (2 units total).',
              options: [{ dept: 'PUBLPOL', number: '311' }],
            },
          ],
        },
      ],
    },
  ],
};
