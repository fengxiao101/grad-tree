import type { MajorConfig } from '../majorSchema';

export const MATSCI_MS_2526: MajorConfig = {
  id: 'matsci-ms-2526',
  name: 'Materials Science & Engineering MS (Coterm)',
  school: 'Materials Science and Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MATSC-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'general',
      name: 'General Requirements',
      note: 'All core and lab courses must be taken for letter grades. Cumulative GPA of 3.0 required. Max 3 units CR/NC. Max 3 units seminars. Max 3 units undergraduate coursework. Max 5 units foreign language. Research units (MATSCI 200) count only if pursuing the optional thesis.',
      slots: [],
    },
    {
      id: 'option-selector',
      name: 'Program Option',
      trackSelector: true,
      note: 'Select Option A1 (3 core courses and 4 laboratory courses) or Option A2 (4 core courses and 3 laboratory courses).',
      slots: [],
    },
  ],
  tracks: [
    {
      id: 'A1',
      name: 'Option A1 (3 Core + 4 Labs)',
      sections: [
        {
          id: 'a1-core',
          name: 'Core Courses (3 of 5)',
          note: 'Select 3 courses from the five core MATSCI graduate courses for letter grade.',
          slots: [
            {
              id: 'a1-core-slot',
              label: '3 core courses from MATSCI 211–215',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'MATSCI', number: '211' },
                { dept: 'MATSCI', number: '212' },
                { dept: 'MATSCI', number: '213' },
                { dept: 'MATSCI', number: '214' },
                { dept: 'MATSCI', number: '215' },
              ],
            },
          ],
        },
        {
          id: 'a1-labs',
          name: 'Laboratory Courses (4 of 7)',
          note: 'Select 4 laboratory courses from MATSCI 170–176 for letter grade.',
          slots: [
            {
              id: 'a1-labs-slot',
              label: '4 lab courses from MATSCI 170–176',
              type: 'pick-from-list',
              count: 4,
              options: [
                { dept: 'MATSCI', number: '170' },
                { dept: 'MATSCI', number: '171' },
                { dept: 'MATSCI', number: '172' },
                { dept: 'MATSCI', number: '173' },
                { dept: 'MATSCI', number: '174' },
                { dept: 'MATSCI', number: '175' },
                { dept: 'MATSCI', number: '176' },
              ],
            },
          ],
        },
        {
          id: 'a1-matsci-electives',
          name: 'MATSCI Graduate Electives',
          minUnits: 12,
          unitOnly: true,
          note: 'At least 12 units of 200+ level MATSCI courses for letter grade.',
          slots: [
            {
              id: 'a1-matsci-elec',
              label: 'MATSCI 200+ electives (min 12 units)',
              type: 'any-approved',
              minLevel: 200,
              options: [],
              note: 'Any 200+ level MATSCI course offered for letter grade. One outside-department course may substitute with advisor approval.',
            },
          ],
        },
        {
          id: 'a1-other-electives',
          name: 'Other Electives',
          minUnits: 12,
          unitOnly: true,
          note: 'At least 12 additional units from approved electives; at least 9 of those 12 must be for letter grade.',
          slots: [
            {
              id: 'a1-other-elec',
              label: 'Approved electives from other departments (min 12 units, 9 letter-graded)',
              type: 'any-approved',
              options: [],
              note: 'Open-ended approved electives forming a technically cohesive program. At least 9 of 12 units must be letter-graded. Max 3 seminar units, 3 CR/NC units, and 3 undergraduate units; nothing below 100-level or activity courses. At most 3 units of 100-level CS may count. Research counts only with the MS thesis option.',
            },
          ],
        },
      ],
    },
    {
      id: 'A2',
      name: 'Option A2 (4 Core + 3 Labs)',
      sections: [
        {
          id: 'a2-core',
          name: 'Core Courses (4 of 5)',
          note: 'Select 4 courses from the five core MATSCI graduate courses for letter grade.',
          slots: [
            {
              id: 'a2-core-slot',
              label: '4 core courses from MATSCI 211–215',
              type: 'pick-from-list',
              count: 4,
              options: [
                { dept: 'MATSCI', number: '211' },
                { dept: 'MATSCI', number: '212' },
                { dept: 'MATSCI', number: '213' },
                { dept: 'MATSCI', number: '214' },
                { dept: 'MATSCI', number: '215' },
              ],
            },
          ],
        },
        {
          id: 'a2-labs',
          name: 'Laboratory Courses (3 of 7)',
          note: 'Select 3 laboratory courses from MATSCI 170–176 for letter grade.',
          slots: [
            {
              id: 'a2-labs-slot',
              label: '3 lab courses from MATSCI 170–176',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'MATSCI', number: '170' },
                { dept: 'MATSCI', number: '171' },
                { dept: 'MATSCI', number: '172' },
                { dept: 'MATSCI', number: '173' },
                { dept: 'MATSCI', number: '174' },
                { dept: 'MATSCI', number: '175' },
                { dept: 'MATSCI', number: '176' },
              ],
            },
          ],
        },
        {
          id: 'a2-matsci-electives',
          name: 'MATSCI Graduate Electives',
          minUnits: 12,
          unitOnly: true,
          note: 'At least 12 units of 200+ level MATSCI courses for letter grade.',
          slots: [
            {
              id: 'a2-matsci-elec',
              label: 'MATSCI 200+ electives (min 12 units)',
              type: 'any-approved',
              minLevel: 200,
              options: [],
              note: 'Any 200+ level MATSCI course offered for letter grade. One outside-department course may substitute with advisor approval.',
            },
          ],
        },
        {
          id: 'a2-other-electives',
          name: 'Other Electives',
          minUnits: 12,
          unitOnly: true,
          note: 'At least 12 additional units from approved electives; at least 9 of those 12 must be for letter grade.',
          slots: [
            {
              id: 'a2-other-elec',
              label: 'Approved electives from other departments (min 12 units, 9 letter-graded)',
              type: 'any-approved',
              options: [],
              note: 'Open-ended approved electives forming a technically cohesive program. At least 9 of 12 units must be letter-graded. Max 3 seminar units, 3 CR/NC units, and 3 undergraduate units; nothing below 100-level or activity courses. At most 3 units of 100-level CS may count. Research counts only with the MS thesis option.',
            },
          ],
        },
      ],
    },
  ],
};
