import type { MajorConfig, CourseOption, MajorSection } from '../majorSchema';

const WIM_COURSES: CourseOption[] = [
  { dept: 'CSRE', number: '200X', name: 'CCSRE Senior Project' },
  { dept: 'CSRE', number: '201X', name: 'CCSRE Honors Seminar' },
];

const METHODOLOGY_COURSES: CourseOption[] = [
  { dept: 'ANTHRO', number: '54Q', name: 'For Makers and Thinkers: How to Use Art in Research and Vice Versa' },
  { dept: 'ANTHRO', number: '91', name: 'Method and Evidence in Anthropology' },
  { dept: 'ANTHRO', number: '91A', name: 'Archaeological Methods' },
  { dept: 'ANTHRO', number: '93', name: 'Prefield Research Seminar' },
  { dept: 'ANTHRO', number: '98C', name: 'Digital Methods in Anthropology' },
  { dept: 'COMM', number: '106', name: 'Communication Research Methods' },
  { dept: 'COMM', number: '138', name: 'Deliberative Democracy Practicum: Applying Deliberative Polling' },
  { dept: 'DATASCI', number: '154', name: 'Data Science for Social Impact' },
  { dept: 'ENGLISH', number: '160', name: 'Poetry and Poetics' },
  { dept: 'ENGLISH', number: '161', name: 'Narrative and Narrative Theory' },
  { dept: 'ENGLISH', number: '184E', name: 'Literary Text Mining' },
  { dept: 'FEMGEN', number: '103', name: 'Feminist and Sexuality Studies Theories Across the Disciplines' },
  { dept: 'FILMEDIA', number: '50Q', name: 'The Video Essay: Writing with Video about Media and Culture' },
  { dept: 'HISTORY', number: '200A', name: 'Doing Legal History' },
  { dept: 'HISTORY', number: '200B', name: 'Doing Environmental History: Water Justice' },
  { dept: 'HISTORY', number: '200BG', name: 'Doing History: Biography as History' },
  { dept: 'HISTORY', number: '200D', name: 'Doing the History of Science and Technology' },
  { dept: 'HISTORY', number: '200DE', name: 'Doing the History of Death and Disease' },
  { dept: 'HISTORY', number: '200F', name: 'Doing Microhistory' },
  { dept: 'HISTORY', number: '200GH', name: 'Doing Gender History' },
  { dept: 'HISTORY', number: '200Y', name: 'Doing Colonial History' },
  { dept: 'POLISCI', number: '150A', name: 'Data Science for Politics' },
  { dept: 'PUBLPOL', number: '105', name: 'Empirical Methods in Public Policy' },
  { dept: 'PUBLPOL', number: '155', name: 'Data Science for Social Impact' },
  { dept: 'SOC', number: '180A', name: 'Foundations of Social Research' },
  { dept: 'SOC', number: '180B', name: 'Introduction to Data Analysis' },
  { dept: 'URBANST', number: '123B', name: 'Community Engaged Research - Principles, Ethics, and Design' },
];

const CEL_COURSES: CourseOption[] = [
  { dept: 'AFRICAAM', number: '212', name: 'How We Free Us: Activism and Community' },
  { dept: 'ASNAMST', number: '191', name: 'Sharing Conversations Across Generations: The Magic of Haiku' },
  { dept: 'CSRE', number: '103B', name: 'Race, Ethnicity, and Linguistic Diversity in Classrooms: Sociocultural Theory and Practices' },
  { dept: 'CSRE', number: '125E', name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'CSRE', number: '146B', name: 'Community Engaged Research - Principles, Ethics, and Design' },
  { dept: 'CSRE', number: '199', name: 'Community Engaged Research Practicum' },
  { dept: 'CSRE', number: '245', name: 'Understanding Racial and Ethnic Identity Development' },
  { dept: 'EDUC', number: '309X', name: 'Policy Practicum: Roses Talk: Elevating At-Promise Student Voices in San Jose Unified' },
  { dept: 'EDUC', number: '461', name: 'Community Engaged Psychology and Education Field Experience' },
  { dept: 'HUMRTS', number: '108', name: 'Advanced Spanish Service-Learning: Migration, Asylum, and Human Rights at the Border' },
  { dept: 'NATIVEAM', number: '112', name: 'Muwekma (CEL) Traditional Ecological Knowledge (TEK) Native Plant Garden Field Project' },
  { dept: 'SPANLANG', number: '11SL', name: 'Second-Year Spanish: Emphasis on Service Learning, First Quarter' },
  { dept: 'SPANLANG', number: '12SL', name: 'Second-Year Spanish: Emphasis on Service Learning, Second Quarter' },
  { dept: 'SPANLANG', number: '13SL', name: 'Second-Year Spanish: Emphasis on Service Learning, Third Quarter' },
];

function subplanSection(id: string, extraNote?: string): MajorSection {
  return {
    id: `${id}-courses`,
    name: 'Subplan Courses (≥15 units)',
    minUnits: 15,
    note: `At least 15 units of courses focused on this subplan area. All courses must be listed or cross-listed in the CCSRE family of programs (CSRE, DAAAS, ASNAMST, CHILATST, JEWISHST, NATIVEAM). Exceptions must be petitioned.${extraNote ? ' ' + extraNote : ''}`,
    slots: [
      {
        id: `${id}-electives`,
        label: 'Subplan-Focused Courses (any-approved, CCSRE family)',
        type: 'any-approved',
        options: [],
        note: 'Select courses that address the focus of this subplan. Subplan is noted on transcript and diploma.',
      },
    ],
  };
}

export const CSRE_BA_2526: MajorConfig = {
  id: 'csre-ba-2526',
  name: 'Comparative Studies in Race and Ethnicity (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 60,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CSRE-BA/',
  wimCourses: WIM_COURSES,
  showWimInProgram: false,

  sections: [
    {
      id: 'csre-core',
      name: 'Core Curriculum',
      note: 'CSRE 100 or one CSRE 101 course must be completed before declaring the major. Minimum C- in all core courses. Language courses do not count toward major requirements.',
      slots: [
        {
          id: 'csre-100',
          label: 'CSRE 100: Introduction to Comparative Studies in Race and Ethnicity',
          type: 'required',
          options: [{ dept: 'CSRE', number: '100', name: 'Introduction to Comparative Studies in Race and Ethnicity' }],
        },
        {
          id: 'csre-capstone-wim',
          label: 'Capstone / WIM: CSRE 200X or 201X (taken autumn of final year)',
          type: 'pick-one',
          options: [
            { dept: 'CSRE', number: '200X', name: 'CCSRE Senior Project' },
            { dept: 'CSRE', number: '201X', name: 'CCSRE Honors Seminar' },
          ],
          note: 'Must be completed in person on Stanford campus in autumn of the final year. The same 5-unit course fulfills both WIM and Capstone. Honors students take 201X (autumn), 201Y (winter), 201Z (spring); only 201X counts toward the major.',
        },
      ],
    },

    {
      id: 'csre-comparative-core',
      name: 'Comparative Core Curriculum (≥2 of 3)',
      minCourses: 2,
      note: 'Complete at least two of the three Comparative Core courses. Minimum C- required.',
      slots: [
        {
          id: 'csre-101',
          label: 'Comparative Core Courses (choose ≥2)',
          type: 'pick-from-list',
          count: 2,
          options: [
            { dept: 'CSRE', number: '101A', name: 'Indigeneity and Colonialism' },
            { dept: 'CSRE', number: '101B', name: 'Institutions and Inequities' },
            { dept: 'CSRE', number: '101C', name: 'Resistance and Liberation' },
          ],
        },
      ],
    },

    {
      id: 'csre-methodology',
      name: 'Methodology Requirement (≥1 course)',
      minCourses: 1,
      note: 'Select a methodology course that supports your projected capstone project. Must be taken for 3–5 units and a letter grade. Not all courses offered every year: see CCSRE website for the current list. May also count toward the Community-Engaged Learning requirement.',
      slots: [
        {
          id: 'csre-method-course',
          label: 'Methodology Course',
          type: 'pick-from-list',
          count: 1,
          options: METHODOLOGY_COURSES,
        },
      ],
    },

    {
      id: 'csre-cel',
      name: 'Community-Engaged Learning (CEL) Requirement',
      minCourses: 1,
      note: 'At least one CEL course or co-curricular experience centering race, ethnicity, and inequality. Also fulfilled by a CCSRE Undergraduate Fellowship or Alternative Spring Break. May double-count with Methodology or other requirements. See CCSRE website for current year\'s list.',
      slots: [
        {
          id: 'csre-cel-course',
          label: 'Community-Engaged Learning Course',
          type: 'pick-from-list',
          count: 1,
          options: CEL_COURSES,
          note: 'Co-curricular paths (CCSRE fellowship, Alternative Spring Break) also satisfy this requirement.',
        },
      ],
    },

    {
      id: 'csre-subplan-selector',
      name: 'Subplan (choose 1 of 9)',
      trackSelector: true,
      note: 'All CSRE majors must declare a subplan. Subplan appears on transcript and diploma; self-designed subplans appear as "Self-Designed." Minimum 15 units of subplan-focused courses required.',
      slots: [],
    },

    {
      id: 'csre-electives',
      name: 'Electives (remaining units to 60)',
      note: 'Remaining units from CCSRE family programs: CSRE, DAAAS, ASNAMST, CHILATST, JEWISHST, NATIVEAM. Units taken in affiliated programs (DAAAS, ASNAMST, etc.) must not exceed units taken in CSRE itself. Maximum 15 units of petitioned non-CCSRE courses may apply to electives.',
      slots: [
        {
          id: 'csre-elec-csre',
          label: 'CSRE Elective Courses',
          type: 'any-approved',
          options: [],
          note: 'Any CSRE course not already applied to core, comparative core, subplan, methodology, or CEL requirements. D- or above required.',
        },
        {
          id: 'csre-elec-affiliated',
          label: 'Affiliated Program Electives (DAAAS, ASNAMST, CHILATST, JEWISHST, NATIVEAM)',
          type: 'any-approved',
          optional: true,
          options: [],
          note: 'Units from affiliated programs must not exceed units taken in CSRE. Max 15 units of petitioned non-CCSRE courses across all electives.',
        },
      ],
    },
  ],

  tracks: [
    {
      id: 'education-inequality',
      name: 'Education and Inequality',
      sections: [subplanSection('edu-ineq', 'Focus: history, policy, and practice in education; how educational opportunity is shaped by race, ethnicity, and power.')],
    },
    {
      id: 'environmental-justice',
      name: 'Environmental Justice',
      sections: [subplanSection('env-just', 'Focus: environmental policy, climate change, grassroots environmental movements, and uneven environmental impacts.')],
    },
    {
      id: 'health-wellness',
      name: 'Health and Wellness',
      sections: [subplanSection('health', 'Focus: interdisciplinary health research, access, and policy; how health and wellness are impacted by racialization.')],
    },
    {
      id: 'identity-diversity-aesthetics',
      name: 'Identity, Diversity, and Aesthetics',
      sections: [subplanSection('ida', 'Focus: intersections of culture, race, and social transformation; arts, activism, and academic research in the Institute for Diversity in the Arts (IDA).')],
    },
    {
      id: 'politics-policy-equity',
      name: 'Politics, Policy, and Equity',
      sections: [subplanSection('ppe', 'Focus: political institutions, public policy, nonprofits, and social movements as shaped by race and ethnicity.')],
    },
    {
      id: 'race-gender-sexuality',
      name: 'Race, Gender, and Sexuality',
      sections: [subplanSection('rgs', 'Focus: women of color feminism and queer of color studies; feminist theory, queer theory, post-colonial theory, and critical race theory.')],
    },
    {
      id: 'race-space-belonging',
      name: 'Race, Space, and Belonging',
      sections: [subplanSection('rsb', 'Focus: immigration, citizenship, empire, gentrification, segregation, urban/rural space, human rights, and public welfare.')],
    },
    {
      id: 'technology-media',
      name: 'Technology and Media',
      sections: [subplanSection('tech-media', 'Focus: relationship between technology, media, and racialization; from photography and film to social media, AI, and algorithms.')],
    },
    {
      id: 'self-designed',
      name: 'Self-Designed',
      sections: [subplanSection('self-designed', 'Proposal must include: focus description, rationale (why existing subplans don\'t fit), course plan, and educational objectives. Submit with Major Declaration Proposal; reviewed by CCSRE Academic Programs team. Appears as "Self-Designed" on transcript/diploma.')],
    },
  ],
};
