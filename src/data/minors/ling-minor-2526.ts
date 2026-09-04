// Linguistics Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/LING-MIN/
// totalMinUnits: 28
// Required: LINGUIST1, 2 core area courses (from 2 of 3 areas), LINGUIST150 or 160
// Electives: remaining units to reach 28, approved by DUS in advance
// All required courses: C- or better letter grade. No more than 2 CR/NC courses.
// At least 1 200-level LINGUIST course encouraged

import type { MajorConfig } from '../majorSchema';

export const LING_MINOR_2526: MajorConfig = {
  id: 'ling-minor-2526',
  name: 'Linguistics (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 28,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/LING-MIN/',
  sections: [
    {
      id: 'ling-required',
      name: 'Required Introduction',
      slots: [
        {
          id: 'ling-1',
          label: 'LINGUIST 1: Introduction to Linguistics',
          type: 'required',
          options: [{ dept: 'LINGUIST', number: '1', name: 'Introduction to Linguistics' }],
        },
      ],
    },
    {
      id: 'ling-core',
      name: 'Core Areas (1 course each from 2 of the 3 areas)',
      note: 'Choose one course each from two different areas: Phonetics/Phonology, Morphology/Syntax, or Semantics/Pragmatics.',
      slots: [],
      pickGroupCount: 2,
      pickOneGroup: [
        {
          id: 'ling-core-phonology',
          name: 'Phonetics and Phonology',
          slots: [
            {
              id: 'ling-core-phonology-slot',
              label: 'Phonetics and Phonology Course',
              type: 'pick-one',
              options: [
                { dept: 'LINGUIST', number: '105', name: 'Phonetics' },
                { dept: 'LINGUIST', number: '205A', name: 'Phonetics (graduate section)' },
                { dept: 'LINGUIST', number: '110', name: 'Introduction to Phonology' },
              ],
            },
          ],
        },
        {
          id: 'ling-core-syntax',
          name: 'Morphology and Syntax',
          slots: [
            {
              id: 'ling-core-syntax-slot',
              label: 'Morphology and Syntax Course',
              type: 'pick-one',
              options: [
                { dept: 'LINGUIST', number: '116A', name: 'Introduction to Word Formation' },
                { dept: 'LINGUIST', number: '121A', name: 'The Syntax of English' },
                { dept: 'LINGUIST', number: '121B', name: 'Crosslinguistic Syntax' },
              ],
            },
          ],
        },
        {
          id: 'ling-core-semantics',
          name: 'Semantics and Pragmatics',
          slots: [
            {
              id: 'ling-core-semantics-slot',
              label: 'Semantics and Pragmatics Course',
              type: 'pick-one',
              options: [
                { dept: 'LINGUIST', number: '130A', name: 'Introduction to Semantics and Pragmatics' },
                { dept: 'LINGUIST', number: '230A', name: 'Introduction to Semantics and Pragmatics (graduate section)' },
                { dept: 'LINGUIST', number: '130B', name: 'Introduction to Lexical Semantics' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ling-soc-hist',
      name: 'Language and Society or Historical Linguistics',
      minCourses: 1,
      slots: [
        {
          id: 'ling-150-160',
          label: 'Language in Society / History',
          type: 'pick-one',
          optional: true,
          options: [
            { dept: 'LINGUIST', number: '150', name: 'Language and Society' },
            { dept: 'LINGUIST', number: '160', name: 'Historical Linguistics' },
          ],
          note: 'Or, with advance consultation with the Linguistics DUS, a course in the history of a specific language.',
        },
        {
          id: 'ling-language-history-approved',
          label: 'Approved Course in the History of a Language',
          type: 'any-approved',
          options: [],
          optional: true,
          note: 'Requires advance consultation with the Linguistics Director of Undergraduate Studies.',
        },
      ],
    },
    {
      id: 'ling-elec',
      name: 'Electives (remaining units to reach 28)',
      note: 'All electives must be pre-approved in advance by the Linguistics Director of Undergraduate Studies. Students are encouraged to take at least one 200-level LINGUIST course. May include courses in related fields (e.g., CS, PSYCH, PHIL) as approved.',
      slots: [
        {
          id: 'ling-elec-slot',
          label: 'Linguistics or Related Elective (DUS-approved)',
          type: 'any-approved',
          options: [],
          count: 10,
          optional: true,
        },
      ],
    },
  ],
};
