// Linguistics BA, 2025-2026
// Source: https://bulletin.stanford.edu/programs/LING-BA/
// totalMinUnits: 60 (≥36 must be in Linguistics)
// WIM: LINGUIST 121A (The Syntax of English): inform instructor at start of quarter
// Gateway: LINGUIST 196 (no later than Autumn, junior year; must precede 197A)
// Capstone: LINGUIST 197A (Winter Quarter, senior year)
// All required courses: letter grade, C- or better
// Max 12 units below 100-level; max 3 courses / 8 units CR/NC
// Language requirement: 6 quarters of non-English language (does not count toward 60 units)

import type { MajorConfig, CourseOption } from '../majorSchema';

const PHONETICS_PHONOLOGY: CourseOption[] = [
  { dept: 'LINGUIST', number: '105',  name: 'Phonetics' },
  { dept: 'LINGUIST', number: '205A', name: 'Phonetics (graduate section)' },
  { dept: 'LINGUIST', number: '110',  name: 'Introduction to Phonology' },
];

const SEMANTICS_PRAGMATICS: CourseOption[] = [
  { dept: 'LINGUIST', number: '130A', name: 'Introduction to Semantics and Pragmatics' },
  { dept: 'LINGUIST', number: '230A', name: 'Introduction to Semantics and Pragmatics (graduate section)' },
  { dept: 'LINGUIST', number: '130B', name: 'Introduction to Lexical Semantics' },
];

// All breadth-eligible courses across all four areas, for pick-from-list slots
const BREADTH_HIST: CourseOption[] = [
  { dept: 'LINGUIST', number: '160', name: 'Historical Linguistics' },
];

const BREADTH_SOCIO: CourseOption[] = [
  { dept: 'LINGUIST', number: '150', name: 'Language and Society' },
  { dept: 'LINGUIST', number: '156', name: 'Language, Gender, & Sexuality' },
  { dept: 'LINGUIST', number: '157', name: 'Sociophonetics' },
  { dept: 'LINGUIST', number: '257', name: 'Sociophonetics (graduate section)' },
  { dept: 'LINGUIST', number: '250', name: 'Sociolinguistic Theory and Analysis' },
];

const BREADTH_PSYCH: CourseOption[] = [
  { dept: 'LINGUIST', number: '35',  name: 'Minds and Machines' },
  { dept: 'LINGUIST', number: '145', name: 'Introduction to Psycholinguistics' },
];

const BREADTH_COMP: CourseOption[] = [
  { dept: 'LINGUIST', number: '180', name: 'From Languages to Information' },
  { dept: 'LINGUIST', number: '280', name: 'From Languages to Information (graduate section)' },
  { dept: 'LINGUIST', number: '188', name: 'Natural Language Understanding' },
  { dept: 'LINGUIST', number: '288', name: 'Natural Language Understanding (graduate section)' },
  { dept: 'LINGUIST', number: '278', name: 'Programming for Linguists' },
  { dept: 'LINGUIST', number: '284', name: 'Natural Language Processing with Deep Learning' },
];

export const LING_BA_2526: MajorConfig = {
  id: 'ling-ba-2526',
  name: 'Linguistics (BA)',
  school: 'Department of Linguistics',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/LING-BA/',
  category: 'major',
  totalMinUnits: 60,

  wimCourses: [
    { dept: 'LINGUIST', number: '121A', name: 'The Syntax of English' },
  ],

  sections: [
    // ── Gateway ───────────────────────────────────────────────────────────────
    {
      id: 'gateway',
      name: 'Gateway Course',
      note: 'Must be taken no later than Autumn Quarter of junior year, and must be completed before LINGUIST 197A.',
      slots: [
        {
          id: 'ling196',
          label: 'LINGUIST 196: Introduction to Research for Undergraduates',
          type: 'required',
          options: [{ dept: 'LINGUIST', number: '196', name: 'Introduction to Research for Undergraduates' }],
        },
      ],
    },

    // ── Core: Phonetics & Phonology ─────────────────────────────────────────
    {
      id: 'core-phonetics',
      name: 'Core: Phonetics and Phonology (pick one)',
      note: 'LINGUIST 105 and 205A are the same course; enroll in the section appropriate for your level.',
      slots: [
        {
          id: 'phon-slot',
          label: 'Phonetics or Phonology (pick one)',
          type: 'pick-one',
          options: PHONETICS_PHONOLOGY,
        },
      ],
    },

    // ── Core: Morphology & Syntax ────────────────────────────────────────────
    {
      id: 'core-syntax',
      name: 'Core: Morphology and Syntax (121A or 121B)',
      note: 'LINGUIST 121A (The Syntax of English) is also the WIM course: inform the instructor at the beginning of the quarter. Students using 121B for core still need 121A to satisfy WIM.',
      slots: [
        {
          id: 'syntax-slot',
          label: 'LINGUIST 121A or 121B: Syntax',
          type: 'pick-one',
          options: [
            { dept: 'LINGUIST', number: '121A', name: 'The Syntax of English (also satisfies WIM)' },
            { dept: 'LINGUIST', number: '121B', name: 'Crosslinguistic Syntax (does NOT satisfy WIM; still need 121A)' },
          ],
        },
      ],
    },

    // ── Core: Semantics & Pragmatics ─────────────────────────────────────────
    {
      id: 'core-semantics',
      name: 'Core: Semantics and Pragmatics (pick one)',
      note: 'LINGUIST 130A and 230A are the same course; enroll in the section appropriate for your level.',
      slots: [
        {
          id: 'sem-slot',
          label: 'Semantics/Pragmatics (pick one)',
          type: 'pick-one',
          options: SEMANTICS_PRAGMATICS,
        },
      ],
    },

    // ── Breadth ───────────────────────────────────────────────────────────────
    {
      id: 'breadth',
      name: 'Breadth in Discipline (complete 2 of 4 areas)',
      note: 'Select at least one course from each of TWO different areas. Any two of the four areas may be chosen.',
      slots: [],
      pickGroupCount: 2,
      pickOneGroup: [
        {
          id: 'breadth-hist',
          name: 'Historical Linguistics',
          slots: [
            {
              id: 'breadth-hist-slot',
              label: 'Historical Linguistics course',
              type: 'pick-from-list',
              count: 1,
              options: BREADTH_HIST,
            },
          ],
        },
        {
          id: 'breadth-socio',
          name: 'Sociolinguistics',
          slots: [
            {
              id: 'breadth-socio-slot',
              label: 'Sociolinguistics course',
              type: 'pick-from-list',
              count: 1,
              options: BREADTH_SOCIO,
            },
          ],
        },
        {
          id: 'breadth-psych',
          name: 'Psycholinguistics',
          slots: [
            {
              id: 'breadth-psych-slot',
              label: 'Psycholinguistics course',
              type: 'pick-from-list',
              count: 1,
              options: BREADTH_PSYCH,
            },
          ],
        },
        {
          id: 'breadth-comp',
          name: 'Computational Linguistics',
          slots: [
            {
              id: 'breadth-comp-slot',
              label: 'Computational Linguistics course',
              type: 'pick-from-list',
              count: 1,
              options: BREADTH_COMP,
            },
          ],
        },
      ],
    },

    // ── Depth ─────────────────────────────────────────────────────────────────
    {
      id: 'depth',
      name: 'Depth in Discipline (≥2 LINGUIST 200-level courses)',
      note: 'Must be taken for 3-4 units each. Verify prerequisites before enrolling.',
      slots: [
        {
          id: 'depth-1',
          label: 'LINGUIST 200-Level Course 1',
          type: 'any-approved',
          options: [],
          note: 'Any LINGUIST 200-level course, 3-4 units.',
        },
        {
          id: 'depth-2',
          label: 'LINGUIST 200-Level Course 2',
          type: 'any-approved',
          options: [],
          note: 'Any LINGUIST 200-level course, 3-4 units.',
        },
      ],
    },

    // ── Language Requirement ──────────────────────────────────────────────────
    {
      id: 'language-req',
      name: 'Language Requirement (does not count toward 60 units)',
      note: 'Competence in at least one language other than English: fulfilled by 6 quarters of language coursework at Stanford, or by certification of equivalent proficiency through the Language Center or relevant department. Native speakers of a non-English language may petition for exemption (submit no later than end of Autumn Quarter of senior year). Language courses do NOT count toward the 60 required units.',
      slots: [
        {
          id: 'lang-req-slot',
          label: 'Non-English Language Proficiency (6 quarters or certified equivalent)',
          type: 'manual',
          options: [],
        },
      ],
    },

    // ── Electives ─────────────────────────────────────────────────────────────
    {
      id: 'electives',
      name: 'Electives (remaining units to reach ≥60 total, ≥36 in Linguistics)',
      note: 'Remaining units may be in linguistics or related fields (anthropology, communication, CS, education, foreign languages, psychology, symbolic systems) and should form a coherent program. Courses outside the department require specific approval from the Linguistics Director of Undergraduate Studies. Max 12 units below 100-level across the entire major. Max 3 courses / 8 units CR/NC.',
      slots: [
        {
          id: 'elec-slot',
          label: 'Linguistics or Related Field Electives',
          type: 'any-approved',
          options: [],
        },
      ],
    },

    // ── Capstone ──────────────────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone',
      note: 'Taken Winter Quarter of senior year, after completing LINGUIST 196.',
      slots: [
        {
          id: 'ling197a',
          label: 'LINGUIST 197A: Undergraduate Research Seminar',
          type: 'required',
          options: [{ dept: 'LINGUIST', number: '197A', name: 'Undergraduate Research Seminar' }],
        },
      ],
    },
  ],
};
