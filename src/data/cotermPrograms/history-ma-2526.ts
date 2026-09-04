import type { MajorConfig } from '../majorSchema';

export const HISTORY_MA_2526: MajorConfig = {
  id: 'history-ma-2526',
  name: 'History MA (Coterm)',
  school: 'School of Humanities and Sciences',
  year: '2025-26',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/HSTRY-MA/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'history-courses',
      name: 'History Department Courses (7 of 9 required)',
      note: 'Exactly 7 of the 9 required courses must be Department of History courses. Only grades of A or B count toward the degree. Directed reading may count for a maximum of 10 units total across all sections.',
      slots: [
        {
          id: 'hist-seminar',
          label: 'History seminar (1 required)',
          type: 'any-approved',
          count: 1,
          note: 'Must be a Department of History seminar.',
          listUrl: 'https://bulletin.stanford.edu/programs/HSTRY-MA/',
          options: [],
        },
        {
          id: 'hist-colloquia',
          label: 'History graduate colloquia or graduate seminars (4 required)',
          type: 'any-approved',
          count: 4,
          note: 'Must be graduate-level colloquia or graduate seminars in the Department of History.',
          listUrl: 'https://bulletin.stanford.edu/programs/HSTRY-MA/',
          options: [],
        },
        {
          id: 'hist-electives',
          label: 'Additional History courses (2 required)',
          type: 'any-approved',
          count: 2,
          note: 'Any remaining Department of History graduate courses to reach the required 7 of 9.',
          listUrl: 'https://bulletin.stanford.edu/programs/HSTRY-MA/',
          options: [],
        },
      ],
    },
    {
      id: 'outside-courses',
      name: 'Additional Courses (up to 2)',
      note: 'Up to 2 of the 9 required courses may be any graduate-level course approved by the advisor: from History or any other department. Only grades of A or B count toward the degree.',
      slots: [
        {
          id: 'outside-elec',
          label: 'Any advisor-approved graduate course',
          type: 'any-approved',
          count: 2,
          options: [],
        },
      ],
    },
  ],
};
