import type { MajorConfig } from '../majorSchema';

const MEDIA_STUDIES_COURSES = [
  { dept: 'COMM', number: '216' },
  { dept: 'COMM', number: '220' },
  { dept: 'COMM', number: '224' },
  { dept: 'COMM', number: '228' },
  { dept: 'COMM', number: '235' },
  { dept: 'COMM', number: '237' },
  { dept: 'COMM', number: '238' },
  { dept: 'COMM', number: '238A' },
  { dept: 'COMM', number: '245' },
  { dept: 'COMM', number: '251' },
  { dept: 'COMM', number: '252A' },
  { dept: 'COMM', number: '254' },
  { dept: 'COMM', number: '258' },
  { dept: 'COMM', number: '262' },
  { dept: 'COMM', number: '264' },
  { dept: 'COMM', number: '266' },
  { dept: 'COMM', number: '272' },
  // The following group (COMM275–COMM281) counts as one of the six slots
  { dept: 'COMM', number: '275' },
  { dept: 'COMM', number: '276' },
  { dept: 'COMM', number: '277A' },
  { dept: 'COMM', number: '277B' },
  { dept: 'COMM', number: '277C' },
  { dept: 'COMM', number: '277D' },
  { dept: 'COMM', number: '277E' },
  { dept: 'COMM', number: '277G' },
  { dept: 'COMM', number: '277I' },
  { dept: 'COMM', number: '277M' },
  { dept: 'COMM', number: '277S' },
  { dept: 'COMM', number: '277T' },
  { dept: 'COMM', number: '277Y' },
  { dept: 'COMM', number: '280' },
  { dept: 'COMM', number: '281' },
  { dept: 'COMM', number: '278A' },
  { dept: 'COMM', number: '284' },
  { dept: 'COMM', number: '286' },
  { dept: 'COMM', number: '324' },
  { dept: 'COMM', number: '326' },
  { dept: 'COMM', number: '339' },
  { dept: 'COMM', number: '385' },
];

export const COMM_MA_2526: MajorConfig = {
  id: 'comm-ma-2526',
  name: 'Communication MA (Coterm)',
  school: 'School of Humanities and Sciences',
  year: '2025-26',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/COMMU-MA/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'track-selector',
      name: 'Subplan',
      trackSelector: true,
      note: 'Select a subplan: Media Studies or Journalism.',
      slots: [],
    },
  ],
  tracks: [
    {
      id: 'media-studies',
      name: 'Media Studies Subplan',
      sections: [
        {
          id: 'ms-stats',
          name: 'Statistics Prerequisite',
          phase: 'pre-major',
          note: 'Required for admission. Units do NOT count toward the 45-unit degree requirement. Advisor may approve a substitute statistics course.',
          slots: [
            {
              id: 'ms-stats60',
              label: 'Introduction to Statistical Methods: Precalculus',
              type: 'required',
              options: [{ dept: 'STATS', number: '60' }],
            },
          ],
        },
        {
          id: 'ms-core',
          name: 'Core Requirements',
          note: 'COMM206 and COMM208 cannot be waived. SOC280A is accepted as an alternative to COMM206 only; its units count toward the max 9 non-COMM units. No alternative for COMM208. Min 36 of the 45 units must be COMM courses. No more than 2 courses may be at the 100 level (excluding the stats prerequisite).',
          slots: [
            {
              id: 'ms-methods',
              label: 'Communication Research Methods',
              type: 'pick-one',
              options: [
                { dept: 'COMM', number: '206' },
                { dept: 'SOC', number: '280A' },
              ],
            },
            {
              id: 'ms-comm208',
              label: 'Media Processes and Effects',
              type: 'required',
              options: [{ dept: 'COMM', number: '208' }],
            },
          ],
        },
        {
          id: 'ms-six',
          name: 'Six Media Studies Courses',
          note: 'At least 6 courses from the approved list. COMM275, COMM276, COMM277A–Y, COMM280, and COMM281 are grouped as one entry: choosing any one of those courses counts as one of the six.',
          slots: [
            {
              id: 'ms-six-slot',
              label: 'Media studies courses',
              type: 'pick-from-list',
              count: 6,
              options: MEDIA_STUDIES_COURSES,
            },
          ],
        },
        {
          id: 'ms-electives',
          name: 'Elective Credit',
          note: 'Additional COMM courses (including COMM299 Individual Work) or up to 9 units from non-COMM courses pre-approved by or approved by the student\'s advisor. Advisor must approve all non-COMM courses.',
          slots: [
            {
              id: 'ms-elec-slot',
              label: 'COMM electives or advisor-approved non-COMM courses',
              type: 'any-approved',
              listUrl: 'https://bulletin.stanford.edu/programs/COMMU-MA/',
              options: [],
            },
          ],
        },
        {
          id: 'ms-project',
          name: 'Media Studies MA Project',
          note: 'Enroll over two consecutive quarters. Project must be pre-approved and supervised by advisor; submit no later than the last day of classes of the second consecutive quarter.',
          slots: [
            {
              id: 'ms-comm290',
              label: 'Media Studies M.A. Project',
              type: 'required',
              options: [{ dept: 'COMM', number: '290' }],
            },
          ],
        },
      ],
    },
    {
      id: 'journalism',
      name: 'Journalism Subplan',
      sections: [
        {
          id: 'journ-required',
          name: 'Required Courses',
          note: 'All courses taken for a letter grade unless only offered S/NC. GPA 3.0+ required to remain in good standing and to graduate. Coterminal students may count coursework taken after the summer of freshman year with Director approval.',
          slots: [
            {
              id: 'journ-comm216',
              label: 'Journalism Law',
              type: 'required',
              options: [{ dept: 'COMM', number: '216' }],
            },
            {
              id: 'journ-perspectives',
              label: 'Perspectives on American Journalism or AI and Journalism',
              type: 'pick-one',
              options: [
                { dept: 'COMM', number: '225' },
                { dept: 'COMM', number: '278A' },
              ],
            },
            {
              id: 'journ-comm273d',
              label: 'Public Affairs Data Journalism I',
              type: 'required',
              options: [{ dept: 'COMM', number: '273D' }],
            },
            {
              id: 'journ-comm274d',
              label: 'Public Affairs Data Journalism II',
              type: 'required',
              options: [{ dept: 'COMM', number: '274D' }],
            },
            {
              id: 'journ-comm275',
              label: 'Multimedia Storytelling',
              type: 'required',
              options: [{ dept: 'COMM', number: '275' }],
            },
            {
              id: 'journ-comm279',
              label: 'News Reporting & Writing Fundamentals',
              type: 'required',
              options: [{ dept: 'COMM', number: '279' }],
            },
            {
              id: 'journ-thesis',
              label: 'Journalism Thesis',
              type: 'required',
              note: 'Taken S/NC. Work begins in the second-to-last quarter; must be submitted by the last day of classes in the final quarter. Must be judged publication-quality by a faculty member.',
              options: [{ dept: 'COMM', number: '289P' }],
            },
          ],
        },
        {
          id: 'journ-electives',
          name: 'Five Elective Courses',
          note: 'Two specialized reporting courses (chosen from a department list of ~12) and three electives from graduate-level COMM courses or campus courses dealing substantively with public issues. All require advisor and Director of Graduate Program approval. COMM299 requires enrollment for 3+ units to count as an elective.',
          slots: [
            {
              id: 'journ-elec-slot',
              label: 'Five elective courses (advisor + Director approved)',
              type: 'any-approved',
              count: 5,
              listUrl: 'https://bulletin.stanford.edu/programs/COMMU-MA/',
              options: [],
            },
          ],
        },
      ],
    },
  ],
};
