import type { MajorConfig, CourseOption } from '../majorSchema';

const RESEARCH_COURSES: CourseOption[] = [
  { dept: 'ANTHRO', number: '92A', name: 'Undergraduate Research Proposal Writing Workshop' },
  { dept: 'ANTHRO', number: '92B', name: 'Undergraduate Research Proposal Writing Workshop' },
  { dept: 'ANTHRO', number: '93', name: 'Prefield Research Seminar' },
  { dept: 'ANTHRO', number: '94', name: 'Postfield Research Seminar' },
  { dept: 'ANTHRO', number: '95', name: 'Research in Anthropology' },
  { dept: 'ANTHRO', number: '95B', name: 'Independent Study for Honors or Senior Paper Writing' },
  { dept: 'ANTHRO', number: '96', name: 'Directed Individual Study' },
  { dept: 'ANTHRO', number: '97', name: 'Internship in Anthropology' },
  { dept: 'ANTHRO', number: '199', name: 'Senior and Master\'s Paper Writing Workshop' },
];

export const ANTHRO_BA_2526: MajorConfig = {
  id: 'anthro-ba-2526',
  name: 'Anthropology (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 65,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ANTHR-BA/',
  wimCourses: [
    { dept: 'ANTHRO', number: '90B', name: 'Theory of Cultural and Social Anthropology' },
  ],

  sections: [
    {
      id: 'anthro-core',
      name: 'Required Core (10 units)',
      note: 'Both courses must be completed with a minimum grade of B. Must be taken within one year of declaring the major or before the end of junior year.',
      slots: [
        {
          id: 'anthro-theory',
          label: 'ANTHRO 90B: Theory of Cultural and Social Anthropology (WIM)',
          type: 'required',
          options: [{ dept: 'ANTHRO', number: '90B', name: 'Theory of Cultural and Social Anthropology' }],
          note: 'Satisfies the WIM requirement. Minimum grade B required.',
        },
        {
          id: 'anthro-methods',
          label: 'ANTHRO 91: Method and Evidence in Anthropology',
          type: 'required',
          options: [{ dept: 'ANTHRO', number: '91', name: 'Method and Evidence in Anthropology' }],
          note: 'Minimum grade B required.',
        },
      ],
    },

    {
      id: 'anthro-emphasis-selector',
      name: 'Emphasis (choose 1)',
      trackSelector: true,
      note: 'Choose one emphasis. Work with your faculty advisor to select courses related to a specific theoretical and/or geographical focus. Departmental courses may satisfy more than one emphasis.',
      slots: [],
    },

    {
      id: 'anthro-additional',
      name: 'Additional Anthropology Coursework (32 units)',
      unitOnly: true,
      minUnits: 32,
      note: 'Any ANTHRO courses not already counted toward core or emphasis requirements. May include courses from other emphases with faculty advisor approval. No more than 10 units of research coursework may count toward the major (unless pursuing Honors).',
      slots: [
        {
          id: 'anthro-add-courses',
          label: 'Additional ANTHRO Courses',
          type: 'any-approved',
          options: [],
          note: 'At least 50 of the 65 required units must be ANTHRO courses. Minimum C in all additional coursework.',
        },
        {
          id: 'anthro-research',
          label: 'Research Coursework (max 10 units toward major)',
          type: 'pick-from-list',
          count: 2,
          optional: true,
          maxCountedUnits: 10,
          options: RESEARCH_COURSES,
          note: 'Up to 10 units of research courses count toward the major. Honors candidates may count additional research units toward degree progress.',
        },
      ],
    },

    {
      id: 'anthro-capstone',
      name: 'Senior Capstone (3 units)',
      note: 'Must be completed in the senior year.',
      slots: [
        {
          id: 'anthro-194',
          label: 'ANTHRO 194: Anthropology Practicum',
          type: 'required',
          options: [{ dept: 'ANTHRO', number: '194', name: 'Anthropology Practicum' }],
        },
      ],
    },

    {
      id: 'anthro-language',
      name: 'Foreign Language Requirement (does not count toward 65 units)',
      phase: 'pre-major',
      note: 'Competence in a foreign language beyond first-year level required. Usually demonstrated by completing a 5-unit second-year course with B- or higher. May also be met by Language Center examination or superior placement score. Submit the Foreign Language Form to the Undergraduate SSO.',
      slots: [
        {
          id: 'anthro-lang-course',
          label: 'Second-Year Foreign Language Course (B- or higher)',
          type: 'any-approved',
          count: 1,
          options: [],
          note: 'Does NOT count toward the 65-unit major minimum. Submit the Foreign Language Form to the Undergraduate SSO upon completion.',
        },
      ],
    },
  ],

  tracks: [
    {
      id: 'cultural-social',
      name: 'Cultural and Social Anthropology',
      sections: [
        {
          id: 'anthro-csa-emphasis',
          name: 'Cultural & Social Anthropology Emphasis Courses (20 units, ≥10 at 100+)',
          minUnits: 20,
          unitOnly: true,
          note: 'At least 10 of the 20 emphasis units must be numbered 100 or above. Minimum C in all emphasis courses.',
          slots: [
            {
              id: 'anthro-csa-courses',
              label: 'Cultural & Social Anthropology Courses',
              type: 'any-approved',
              options: [
                { dept: 'ANTHRO', number: '1', name: 'Introduction to Cultural and Social Anthropology' },
                { dept: 'ANTHRO', number: '39', name: 'Sense of Place' },
                { dept: 'ANTHRO', number: '126', name: 'Urban Culture in Global Perspective' },
                { dept: 'ANTHRO', number: '132', name: 'Anthropology of Islam' },
                { dept: 'ANTHRO', number: '133', name: 'Masculinity: Technologies and Cultures of Gender in the Age of AI' },
                { dept: 'ANTHRO', number: '157', name: 'Japanese Anthropology' },
              ],
              note: 'Course offerings vary by year. Work with your faculty advisor to select courses. Courses may also count toward other emphases.',
            },
          ],
        },
      ],
    },

    {
      id: 'medical',
      name: 'Medical Anthropology',
      sections: [
        {
          id: 'anthro-med-emphasis',
          name: 'Medical Anthropology Emphasis Courses (20 units, ≥10 at 100+)',
          minUnits: 20,
          unitOnly: true,
          note: 'At least 10 of the 20 emphasis units must be numbered 100 or above. Minimum C in all emphasis courses.',
          slots: [
            {
              id: 'anthro-med-courses',
              label: 'Medical Anthropology Courses',
              type: 'any-approved',
              options: [
                { dept: 'ANTHRO', number: '82', name: 'Medical Anthropology' },
                { dept: 'ANTHRO', number: '153', name: 'Asylum: Knowledge, Politics, and Population' },
                { dept: 'ANTHRO', number: '186', name: 'Culture and Madness: Anthropological and Psychiatric Approaches to Mental Illness' },
              ],
              note: 'Additional approved courses selected with faculty advisor. Courses may also count toward other emphases.',
            },
          ],
        },
      ],
    },

    {
      id: 'environmental',
      name: 'Environmental Anthropology',
      sections: [
        {
          id: 'anthro-env-emphasis',
          name: 'Environmental Anthropology Emphasis Courses (20 units, ≥10 at 100+)',
          minUnits: 20,
          unitOnly: true,
          note: 'At least 10 of the 20 emphasis units must be numbered 100 or above. Minimum C in all emphasis courses.',
          slots: [
            {
              id: 'anthro-env-courses',
              label: 'Environmental Anthropology Courses',
              type: 'any-approved',
              options: [
                { dept: 'ANTHRO', number: '103', name: 'The Archaeology of Climate' },
                { dept: 'ANTHRO', number: '167', name: 'Body and Environment' },
                { dept: 'ANTHRO', number: '198A', name: 'Archaeological Geographic Information Systems' },
              ],
              note: 'Additional approved courses selected with faculty advisor. Courses may also count toward other emphases.',
            },
          ],
        },
      ],
    },

    {
      id: 'self-designed',
      name: 'Self-Designed Emphasis',
      sections: [
        {
          id: 'anthro-self-emphasis',
          name: 'Self-Designed Emphasis Courses (20 units, ≥10 at 100+)',
          minUnits: 20,
          unitOnly: true,
          note: 'Requires approval from faculty advisor and the undergraduate committee via the Undergraduate Course Exception Form. At least 10 of the 20 emphasis units must be numbered 100 or above. Minimum C in all emphasis courses.',
          slots: [
            {
              id: 'anthro-self-courses',
              label: 'Self-Designed Emphasis Courses (advisor-approved)',
              type: 'any-approved',
              options: [],
              note: 'Courses selected in consultation with faculty advisor and approved by the undergraduate committee. Submit the Undergraduate Course Exception Form.',
            },
          ],
        },
      ],
    },
  ],
};
