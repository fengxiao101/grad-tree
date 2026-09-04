// Anthropology Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/ANTHR-MIN/
// totalMinUnits: 30
// Requires faculty advisor in the Anthropology dept
// Four emphasis options: Culture and Society, Environmental, Medical, Self-Designed
// 30 units total: ≥15 must be ANTHRO 100+; up to 10 from related/transfer/overseas; max 5 directed reading; max 5 CR/NC
// Grade minimum: C or higher in each course
// Declare by last day of quarter, at least 2 quarters before degree conferral

import type { MajorConfig } from '../majorSchema';

export const ANTHRO_MINOR_2526: MajorConfig = {
  id: 'anthro-minor-2526',
  name: 'Anthropology (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 30,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ANTHR-MIN/',
  sections: [
    {
      id: 'anthro-upper',
      name: 'Upper-Division ANTHRO Courses (≥15 units, 100-level or above)',
      minUnits: 15,
      note: 'At least 15 of the 30 units must be ANTHRO courses numbered 100 or above. Two must be essential courses taught by Anthropology faculty and completed with C or higher. Choose an emphasis (Culture and Society, Environmental Anthropology, Medical Anthropology, or Self-Designed) in consultation with your faculty advisor.',
      slots: [
        {
          id: 'anthro-essential-slot',
          label: 'ANTHRO Essential Course (100+)',
          type: 'any-approved',
          options: [],
          count: 2,
          minLevel: 100,
          listUrl: 'https://bulletin.stanford.edu/programs/ANTHR-MIN/',
          note: 'Choose two ANTHRO essential courses numbered 100 or above and taught by Anthropology faculty, each completed with C or higher.',
        },
        {
          id: 'anthro-upper-slot',
          label: 'Additional ANTHRO 100+ Course(s), as needed to reach 15 units',
          type: 'any-approved',
          options: [],
          count: 10,
          minLevel: 100,
          optional: true,
        },
      ],
    },
    {
      id: 'anthro-add',
      name: 'Additional Coursework (remaining units to reach 30)',
      note: 'Courses taken for a letter grade must earn C or higher. Up to 10 units may come from related areas of study, overseas studies, and transfer units (requires advisor and Undergraduate Committee approval). No more than 5 units of Directed Reading (e.g., ANTHRO 199) may count and only within the 10 related-units allowance. No more than 5 units may be S/NC.',
      slots: [
        {
          id: 'anthro-add-slot',
          label: 'ANTHRO or Related Course',
          type: 'any-approved',
          options: [],
          count: 10,
          optional: true,
        },
      ],
    },
  ],
};
