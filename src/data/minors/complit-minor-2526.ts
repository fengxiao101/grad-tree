// Comparative Literature Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/CPLIT-MIN/
// totalMinUnits: 22
// Required: COMPLIT101 + 1 form/genre course (121/122/123) + 4 additional COMPLIT courses
// All courses must be letter-graded
// Courses may not duplicate coursework for other major or minor programs
// Up to 5 units of SLE or Independent Study may count toward 1 of the 4 additional courses (DUS approval)
// Administered through DLCL undergraduate SSO, Pigott Hall 128

import type { MajorConfig } from '../majorSchema';

export const COMPLIT_MINOR_2526: MajorConfig = {
  id: 'complit-minor-2526',
  name: 'Comparative Literature (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 22,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CPLIT-MIN/',
  sections: [
    {
      id: 'complit-req',
      name: 'Required Introduction',
      slots: [
        {
          id: 'complit-101',
          label: 'COMPLIT 101: What Is Comparative Literature?',
          type: 'required',
          options: [{ dept: 'COMPLIT', number: '101', name: 'What Is Comparative Literature?' }],
        },
      ],
    },
    {
      id: 'complit-genre',
      name: 'Form and Genre (1 course)',
      slots: [
        {
          id: 'complit-genre-slot',
          label: 'Form/Genre Course',
          type: 'pick-one',
          options: [
            { dept: 'COMPLIT', number: '121', name: 'Poems, Poetry, Worlds' },
            { dept: 'COMPLIT', number: '122', name: 'Literature as Performance' },
            { dept: 'COMPLIT', number: '123', name: 'The Novel' },
          ],
        },
      ],
    },
    {
      id: 'complit-elec',
      name: 'Additional Comparative Literature Courses (4 courses, 12-20 units)',
      note: 'Four additional COMPLIT courses, totaling 12-20 units. Plans reviewed with the Director of Undergraduate Studies. Up to 5 units of SLE or Independent Study may count toward one of these four courses (DUS approval). No double-counting with other major or minor programs.',
      slots: [
        {
          id: 'complit-elec-slot',
          label: 'Additional COMPLIT Course',
          type: 'any-approved',
          options: [],
          count: 4,
        },
      ],
    },
  ],
};
