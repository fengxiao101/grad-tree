// Creative Writing Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/CRWRIT-MIN/
// totalMinUnits: 26 (up to 30)
// All courses must be taken for letter grades, and for 5 units (except ENGLISH 160, short story lit, lit elective)
// Three subplans: Prose, Poetry, Fiction into Film
// Prerequisites for advanced workshops satisfy the corresponding intro requirement

import type { MajorConfig } from '../majorSchema';

// Shared across Prose and Fiction into Film subplans
const SHORT_STORY_OPTIONS = [
  { dept: 'ENGLISH', number: '12C', name: 'Introduction to English III: Modern Literature' },
  { dept: 'ENGLISH', number: '31N', name: 'Love and Death' },
  { dept: 'ENGLISH', number: '68N', name: 'Mark Twain and American Culture' },
  { dept: 'ENGLISH', number: '90L', name: 'Latine Stories' },
  { dept: 'ENGLISH', number: '125', name: 'Virginia Woolf in the Age of #MeToo' },
  { dept: 'ENGLISH', number: '133B', name: 'Storytelling and Mythmaking: Modern Odysseys' },
  { dept: 'ENGLISH', number: '146F', name: 'Fiction Intensive: Crafting a Short Story Collection' },
  { dept: 'ENGLISH', number: '146CW', name: 'Contemporary Women Writers' },
  { dept: 'ENGLISH', number: '146SH', name: 'A Short History of the Short Story' },
  { dept: 'ENGLISH', number: '146N', name: 'Native American Creative Writing' },
  { dept: 'ENGLISH', number: '146W', name: 'Iconic Short Stories' },
  { dept: 'ENGLISH', number: '161', name: 'Narrative and Narrative Theory' },
  { dept: 'ENGLISH', number: '169D', name: 'Contemporary Asian American Stories' },
  { dept: 'ENGLISH', number: '177B', name: 'Contemporary American Short Stories' },
  { dept: 'ENGLISH', number: '187', name: 'Zora Neale Hurston' },
  { dept: 'ENGLISH', number: '190S', name: 'Short Story Salon' },
];

export const CRWRIT_MINOR_2526: MajorConfig = {
  id: 'crwrit-minor-2526',
  name: 'Creative Writing (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 26,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CRWRIT-MIN/',
  sections: [
    { id: 'crwrit-track-selector', name: 'Subplan (choose 1)', trackSelector: true, slots: [] },
  ],
  tracks: [
    {
      id: 'crwrit-prose',
      name: 'Prose',
      sections: [
        {
          id: 'crwrit-prose-intro-prose',
          name: 'Introductory Prose (5 units)',
          note: 'One course from the ENGLISH 90 or ENGLISH 91 series (introductory prose workshops).',
          slots: [
            {
              id: 'crwrit-prose-intro',
              label: 'Introductory Prose (ENGLISH 90 or 91 series)',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'Any course in the ENGLISH 90 series (e.g., ENGLISH 90) or ENGLISH 91 series.',
            },
          ],
        },
        {
          id: 'crwrit-prose-intro-poetry',
          name: 'Introductory Poetry (5 units)',
          note: 'One course from the ENGLISH 92 series (introductory poetry workshops).',
          slots: [
            {
              id: 'crwrit-prose-poetry-intro',
              label: 'Introductory Poetry (ENGLISH 92 series)',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'Any course in the ENGLISH 92 series.',
            },
          ],
        },
        {
          id: 'crwrit-prose-short-story',
          name: 'Short Story Literature (3-5 units)',
          note: 'Must be a LEC or SEM course (WKS courses do not satisfy this requirement).',
          slots: [
            {
              id: 'crwrit-prose-short',
              label: 'Short Story Literature',
              type: 'pick-from-list',
              count: 1,
              options: SHORT_STORY_OPTIONS,
            },
          ],
        },
        {
          id: 'crwrit-prose-adv',
          name: 'Intermediate or Advanced Prose (2 courses, 10 units)',
          note: 'Two courses from: ENGLISH 190 series, ENGLISH 191 series, ENGLISH 290, or ENGLISH 291. Valid combinations: 2×ENGLISH 190, 2×ENGLISH 191, ENGLISH 190+191, ENGLISH 190/191+ENGLISH 290, ENGLISH 190/191+ENGLISH 291, or ENGLISH 290+ENGLISH 291.',
          slots: [
            {
              id: 'crwrit-prose-adv-1',
              label: 'Intermediate/Advanced Prose Course 1',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'ENGLISH 190 series, ENGLISH 191 series, ENGLISH 290, or ENGLISH 291.',
            },
            {
              id: 'crwrit-prose-adv-2',
              label: 'Intermediate/Advanced Prose Course 2',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'ENGLISH 190 series, ENGLISH 191 series, ENGLISH 290, or ENGLISH 291.',
            },
          ],
        },
        {
          id: 'crwrit-prose-lit-elec',
          name: 'Literature Elective (3-5 units)',
          note: 'One ENGLISH course (or approved non-ENGLISH course by petition) that is a LEC or SEM. WKS courses do not satisfy this requirement.',
          slots: [
            {
              id: 'crwrit-prose-lit',
              label: 'English Literature Elective (LEC/SEM)',
              type: 'any-approved',
              options: [],
              count: 1,
            },
          ],
        },
      ],
    },
    {
      id: 'crwrit-poetry',
      name: 'Poetry',
      sections: [
        {
          id: 'crwrit-poetry-intro-poetry',
          name: 'Introductory Poetry (5 units)',
          note: 'One course from the ENGLISH 92 series (introductory poetry workshops).',
          slots: [
            {
              id: 'crwrit-poetry-intro',
              label: 'Introductory Poetry (ENGLISH 92 series)',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'Any course in the ENGLISH 92 series.',
            },
          ],
        },
        {
          id: 'crwrit-poetry-intro-prose',
          name: 'Introductory Prose (5 units)',
          note: 'One course from the ENGLISH 90 or ENGLISH 91 series.',
          slots: [
            {
              id: 'crwrit-poetry-prose-intro',
              label: 'Introductory Prose (ENGLISH 90 or 91 series)',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'Any course in the ENGLISH 90 or ENGLISH 91 series.',
            },
          ],
        },
        {
          id: 'crwrit-poetry-poetics',
          name: 'Poetry and Poetics (3-5 units)',
          slots: [
            {
              id: 'crwrit-poetry-poetics-slot',
              label: 'ENGLISH 160: Poetry and Poetics',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '160', name: 'Poetry and Poetics' }],
            },
          ],
        },
        {
          id: 'crwrit-poetry-adv',
          name: 'Intermediate or Advanced Poetry (2 courses, 10 units)',
          note: 'Two courses from: ENGLISH 192 series (e.g., ENGLISH 192, 192V) or ENGLISH 292. Valid combinations: 2×ENGLISH 192, or ENGLISH 192+ENGLISH 292.',
          slots: [
            {
              id: 'crwrit-poetry-adv-1',
              label: 'Intermediate/Advanced Poetry Course 1',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'ENGLISH 192 series or ENGLISH 292.',
            },
            {
              id: 'crwrit-poetry-adv-2',
              label: 'Intermediate/Advanced Poetry Course 2',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'ENGLISH 192 series or ENGLISH 292.',
            },
          ],
        },
        {
          id: 'crwrit-poetry-lit-elec',
          name: 'Literature Elective (3-5 units)',
          note: 'One ENGLISH course (or approved non-ENGLISH course by petition) that is a LEC or SEM. WKS courses do not satisfy this requirement.',
          slots: [
            {
              id: 'crwrit-poetry-lit',
              label: 'English Literature Elective (LEC/SEM)',
              type: 'any-approved',
              options: [],
              count: 1,
            },
          ],
        },
      ],
    },
    {
      id: 'crwrit-film',
      name: 'Fiction into Film',
      sections: [
        {
          id: 'crwrit-film-core',
          name: 'Core Courses (15 units)',
          slots: [
            {
              id: 'crwrit-film-eng90',
              label: 'ENGLISH 90: Fiction Writing',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '90', name: 'Fiction Writing' }],
            },
            {
              id: 'crwrit-film-190f',
              label: 'ENGLISH 190F: Fiction into Film',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '190F', name: 'Fiction into Film' }],
            },
            {
              id: 'crwrit-film-190sw',
              label: 'ENGLISH 190SW: Screenwriting Intensive',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '190SW', name: 'Screenwriting Intensive' }],
            },
          ],
        },
        {
          id: 'crwrit-film-adv-prose',
          name: 'Intermediate or Advanced Prose (5 units)',
          note: 'One course from the ENGLISH 190 series or ENGLISH 290.',
          slots: [
            {
              id: 'crwrit-film-prose-slot',
              label: 'Intermediate/Advanced Prose',
              type: 'any-approved',
              options: [],
              count: 1,
              note: 'Any course in the ENGLISH 190 series, or ENGLISH 290 (Advanced Fiction Writing).',
            },
          ],
        },
        {
          id: 'crwrit-film-short-story',
          name: 'Short Story Literature (3-5 units)',
          note: 'Must be a LEC or SEM course (WKS courses do not satisfy this requirement).',
          slots: [
            {
              id: 'crwrit-film-short',
              label: 'Short Story Literature',
              type: 'pick-from-list',
              count: 1,
              options: SHORT_STORY_OPTIONS,
            },
          ],
        },
        {
          id: 'crwrit-film-lit-elec',
          name: 'Literature Elective (3-5 units)',
          note: 'One ENGLISH course (or approved non-ENGLISH course by petition) that is a LEC or SEM. WKS courses do not satisfy this requirement.',
          slots: [
            {
              id: 'crwrit-film-lit',
              label: 'English Literature Elective (LEC/SEM)',
              type: 'any-approved',
              options: [],
              count: 1,
            },
          ],
        },
      ],
    },
  ],
};
