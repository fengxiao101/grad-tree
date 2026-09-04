import type { MajorConfig } from '../majorSchema';

const ETHICS_OPTIONS = [
  { dept: 'BIOE', number: '313' },
  { dept: 'CS', number: '281' },
  { dept: 'DATASCI', number: '294D' },
  { dept: 'DESIGN', number: '101' },
  { dept: 'EARTHSYS', number: '279' },
  { dept: 'EDUC', number: '381' },
  { dept: 'ETHICSOC', number: '277' },
  { dept: 'GENE', number: '220' },
  { dept: 'GSBGEN', number: '208' },
  { dept: 'LAW', number: '3009' },
  { dept: 'LAW', number: '7039' },
  { dept: 'MS&E', number: '234' },
  { dept: 'MS&E', number: '289' },
  { dept: 'NBIO', number: '201' },
  { dept: 'PUBLPOL', number: '203F' },
  { dept: 'PUBLPOL', number: '222' },
  { dept: 'PUBLPOL', number: '234' },
];

const LEADERSHIP_OPTIONS = [
  { dept: 'CEE', number: '251' },
  { dept: 'CHEM', number: '196' },
  { dept: 'DESIGN', number: '235' },
  { dept: 'DESIGN', number: '273' },
  { dept: 'DESIGN', number: '368' },
  { dept: 'EDUC', number: '377G' },
  { dept: 'GSBGEN', number: '515' },
  { dept: 'GSBGEN', number: '565' },
  { dept: 'GSBGID', number: '330' },
  { dept: 'ME', number: '378' },
  { dept: 'MS&E', number: '274' },
  { dept: 'MS&E', number: '280' },
  { dept: 'OB', number: '377' },
  { dept: 'SUST', number: '220' },
];

const VIZ_OPTIONS = [
  { dept: 'COMM', number: '281' },
  { dept: 'CS', number: '448B' },
  { dept: 'DESIGN', number: '160' },
  { dept: 'DESIGN', number: '236P' },
  { dept: 'DESIGN', number: '255' },
  { dept: 'DESIGN', number: '365' },
  { dept: 'DESINST', number: '215' },
  { dept: 'MUSIC', number: '255' },
];

const APPLIED_DESIGN_OPTIONS = [
  { dept: 'BIOE', number: '374B' },
  { dept: 'DESIGN', number: '242' },
  { dept: 'DESIGN', number: '245' },
  { dept: 'DESIGN', number: '249' },
  { dept: 'DESIGN', number: '255' },
  { dept: 'DESIGN', number: '262' },
  { dept: 'DESIGN', number: '265' },
  { dept: 'DESIGN', number: '266' },
  { dept: 'DESIGN', number: '268' },
  { dept: 'DESIGN', number: '273' },
  { dept: 'DESIGN', number: '276' },
  { dept: 'DESIGN', number: '284' },
  { dept: 'DESIGN', number: '287' },
  { dept: 'DESIGN', number: '294' },
  { dept: 'DESIGN', number: '315' },
  { dept: 'DESIGN', number: '368' },
  { dept: 'DESIGN', number: '399' },
  { dept: 'ENGR', number: '231' },
];

const PHYS_FORM_ELECTIVES = [
  { dept: 'ENGR', number: '240' },
  { dept: 'ME', number: '210' },
  { dept: 'ME', number: '219' },
  { dept: 'ME', number: '263' },
  { dept: 'ME', number: '303' },
  { dept: 'ME', number: '318' },
  { dept: 'ME', number: '324' },
  { dept: 'ME', number: '325' },
];

const EMTECH_ELECTIVES = [
  { dept: 'BIOE', number: '199A' },
  { dept: 'BMDS', number: '220' },
  { dept: 'COMM', number: '254' },
  { dept: 'COMM', number: '272' },
  { dept: 'CS', number: '129' },
  { dept: 'CS', number: '131' },
  { dept: 'CS', number: '223A' },
  { dept: 'CS', number: '247A' },
  { dept: 'CS', number: '259Q' },
  { dept: 'CS', number: '278' },
  { dept: 'CS', number: '347' },
  { dept: 'CS', number: '372' },
  { dept: 'CS', number: '377Q' },
  { dept: 'CS', number: '476A' },
  { dept: 'MUSIC', number: '356' },
];

const HUMANBEH_FOUNDATION_OPTIONS = [
  { dept: 'COMM', number: '206' },
  { dept: 'PSYCH', number: '215' },
  { dept: 'PSYCH', number: '238' },
  { dept: 'STATS', number: '110' },
  { dept: 'STATS', number: '191' },
];

const HUMANBEH_ELECTIVES = [
  { dept: 'ANTHRO', number: '298C' },
  { dept: 'COMM', number: '224' },
  { dept: 'COMM', number: '266' },
  { dept: 'COMM', number: '281' },
  { dept: 'CS', number: '278' },
  { dept: 'CS', number: '347' },
  { dept: 'CS', number: '377U' },
  { dept: 'EDUC', number: '450C' },
  { dept: 'ESS', number: '227' },
  { dept: 'FEMGEN', number: '344F' },
  { dept: 'MS&E', number: '226' },
  { dept: 'PSYCH', number: '290' },
  { dept: 'SOC', number: '226' },
];

export const DESIGN_MS_2526: MajorConfig = {
  id: 'design-ms-2526',
  name: 'Design MS',
  school: 'School of Engineering',
  year: '2025-26',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/DESIGN-MS/',
  category: 'coterm',
  totalMinUnits: 51,
  sections: [
    {
      id: 'track-selector',
      name: 'Methods Focus Area',
      trackSelector: true,
      slots: [],
    },
    {
      id: 'design-work',
      name: 'Project-Based Design Work',
      slots: [
        {
          id: 'design301',
          label: 'You Are Here: Foundations in Design',
          type: 'required',
          options: [{ dept: 'DESIGN', number: '301' }],
        },
        {
          id: 'design341',
          label: 'Advanced Design Practicum',
          type: 'required',
          options: [{ dept: 'DESIGN', number: '341' }],
        },
        {
          id: 'design360r',
          label: 'Advanced Reflective Practice',
          type: 'required',
          options: [{ dept: 'DESIGN', number: '360R' }],
        },
      ],
    },
    {
      id: 'human-factors',
      name: 'Human Factors',
      slots: [
        {
          id: 'design231',
          label: 'Graduate Design Research Techniques',
          type: 'required',
          options: [{ dept: 'DESIGN', number: '231' }],
        },
      ],
    },
    {
      id: 'ethics',
      name: 'Design Ethics',
      minUnits: 3,
      note: 'At least 3 units from the approved list. DATASCI294D only counts if taken for a minimum of 3 units.',
      slots: [
        {
          id: 'ethics-slot',
          label: 'Design ethics course',
          type: 'pick-from-list',
          minUnits: 3,
          options: ETHICS_OPTIONS,
        },
      ],
    },
    {
      id: 'leadership',
      name: 'Leadership',
      minUnits: 3,
      slots: [
        {
          id: 'leadership-slot',
          label: 'Leadership course',
          type: 'pick-from-list',
          minUnits: 3,
          options: LEADERSHIP_OPTIONS,
        },
      ],
    },
    {
      id: 'visualization',
      name: 'Visualization',
      minUnits: 3,
      slots: [
        {
          id: 'viz-slot',
          label: 'Visualization course',
          type: 'pick-from-list',
          minUnits: 3,
          options: VIZ_OPTIONS,
        },
      ],
    },
    {
      id: 'applied-design',
      name: 'Applied Design',
      minUnits: 3,
      note: 'At least 3 units from a graduate-level, project-based d.school elective (winter or spring). Courses under 3 units do not qualify. Advisor approval required.',
      slots: [
        {
          id: 'applied-slot',
          label: 'Applied design elective',
          type: 'pick-from-list',
          minUnits: 3,
          options: APPLIED_DESIGN_OPTIONS,
        },
      ],
    },
    {
      id: 'capstone',
      name: 'Capstone',
      note: 'All three courses taken in the final year of graduate study.',
      slots: [
        {
          id: 'cap-361a',
          label: 'MS Design Capstone Project 1',
          type: 'required',
          options: [{ dept: 'DESIGN', number: '361A' }],
        },
        {
          id: 'cap-361b',
          label: 'MS Design Capstone Project 2',
          type: 'required',
          options: [{ dept: 'DESIGN', number: '361B' }],
        },
        {
          id: 'cap-361c',
          label: 'MS Design Thesis 3',
          type: 'required',
          options: [{ dept: 'DESIGN', number: '361C' }],
        },
      ],
    },
    {
      id: 'domain',
      name: 'Domain Focus Area',
      minUnits: 8,
      note: 'At least 8 units in a chosen domain, pre-planned and coordinated with faculty advisor. Domain name and course selections must be approved.',
      slots: [
        {
          id: 'domain-slot',
          label: 'Domain focus courses (advisor-approved)',
          type: 'any-approved',
          minUnits: 8,
          listUrl: 'https://bulletin.stanford.edu/programs/DESIGN-MS/',
          options: [],
        },
      ],
    },
  ],
  tracks: [
    {
      id: 'physical-form',
      name: 'Physical Form + Manufacturing',
      sections: [
        {
          id: 'phys-methods',
          name: 'Methods Focus: Physical Form + Manufacturing',
          note: 'ME203 must be taken in year one of graduate study. Some courses (ME219, ME318, ME324, ME325) have limited capacity.',
          slots: [
            {
              id: 'phys-me203',
              label: 'Design and Manufacturing',
              type: 'required',
              options: [{ dept: 'ME', number: '203' }],
            },
            {
              id: 'phys-elec',
              label: 'Two additional methods courses',
              type: 'pick-from-list',
              count: 2,
              options: PHYS_FORM_ELECTIVES,
            },
          ],
        },
      ],
    },
    {
      id: 'emerging-tech',
      name: 'Emerging Technologies + Digital User Experience',
      sections: [
        {
          id: 'emtech-methods',
          name: 'Methods Focus: Emerging Technologies + Digital UX',
          note: 'CS106A, CS106B, or a higher-level CS course (advisor permission) must be taken in year one.',
          slots: [
            {
              id: 'emtech-cs-found',
              label: 'Programming foundation',
              type: 'pick-one',
              options: [
                { dept: 'CS', number: '106A' },
                { dept: 'CS', number: '106B' },
              ],
            },
            {
              id: 'emtech-elec',
              label: 'Two additional methods courses',
              type: 'pick-from-list',
              count: 2,
              options: EMTECH_ELECTIVES,
            },
          ],
        },
      ],
    },
    {
      id: 'human-behavior',
      name: 'Human Behavior + Multi-stakeholder Research',
      sections: [
        {
          id: 'humanbeh-methods',
          name: 'Methods Focus: Human Behavior + Multi-stakeholder Research',
          note: 'Foundation course must be taken in year one of graduate study.',
          slots: [
            {
              id: 'humanbeh-found',
              label: 'Research methods foundation',
              type: 'pick-from-list',
              count: 1,
              options: HUMANBEH_FOUNDATION_OPTIONS,
            },
            {
              id: 'humanbeh-elec',
              label: 'Two additional methods courses',
              type: 'pick-from-list',
              count: 2,
              options: HUMANBEH_ELECTIVES,
            },
          ],
        },
      ],
    },
  ],
};
