// Philosophy Minor: Department of Philosophy, 2025-26
// Source: https://bulletin.stanford.edu/programs/PHILO-MIN/
// totalMinUnits: 30
// Structure: 1 History of Philosophy course (PHIL 100+) + 2 of 3 Contemporary areas + electives
// Contemporary areas: (1) Phil of Science & Logic, (2) Moral & Political Phil, (3) Contemporary Theoretical Phil
// Electives: any PHIL 10+ except PHIL 196-199

import type { MajorConfig } from '../majorSchema';

export const PHIL_MINOR_2526: MajorConfig = {
  id: 'phil-minor-2526',
  name: 'Philosophy (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 30,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PHILO-MIN/',
  sections: [
    {
      id: 'phil-history',
      name: 'History of Philosophy (≥1 course, ≥3 units)',
      minUnits: 3,
      note: 'Complete a course designated as History of Philosophy, numbered 100 or above, for at least 3 units. Not every PHIL 100+ course satisfies this requirement; verify the course in the Bulletin.',
      slots: [
        {
          id: 'phil-hist',
          label: 'Designated History of Philosophy Course (PHIL 100+)',
          type: 'any-approved',
          options: [],
          minUnits: 3,
          listUrl: 'https://bulletin.stanford.edu/programs/PHILO-MIN/',
          note: 'Use a course in the Bulletin\'s History of Philosophy course set; the course must be numbered 100 or above.',
        },
      ],
    },
    {
      id: 'phil-contemporary',
      name: 'Contemporary Philosophy (complete ≥2 of the 3 areas below)',
      minCourses: 2,
      note: 'Must satisfy at least 2 of the 3 contemporary philosophy areas. Each area slot can be filled with any of the listed courses or via Search & add.',
      slots: [
        {
          id: 'phil-area1',
          label: 'Area 1: Philosophy of Science & Logic (PHIL 49/150/151/154 or PHIL 160–169)',
          type: 'any-approved',
          count: 1,
          optional: true,
          note: 'One Logic course (PHIL 49, 150, 151, or 154) OR one Philosophy of Science course in the PHIL 160–169 range.',
          options: [
            { dept: 'PHIL', number: '49', name: 'Survey of Formal Methods' },
            { dept: 'PHIL', number: '150', name: 'Mathematical Logic' },
            { dept: 'PHIL', number: '151', name: 'Metalogic' },
            { dept: 'PHIL', number: '154', name: 'Modal Logic' },
          ],
        },
        {
          id: 'phil-area2',
          label: 'Area 2: Moral and Political Philosophy (PHIL 2 or PHIL 170–175)',
          type: 'any-approved',
          count: 1,
          optional: true,
          note: 'PHIL 2 (Introduction to Moral Philosophy) OR any course in the PHIL 170–175 range.',
          options: [
            { dept: 'PHIL', number: '2', name: 'Introduction to Moral Philosophy' },
          ],
        },
        {
          id: 'phil-area3',
          label: 'Area 3: Contemporary Theoretical Philosophy (PHIL 180–189)',
          type: 'any-approved',
          count: 1,
          optional: true,
          note: 'Any course in the PHIL 180–189 range.',
          options: [],
        },
      ],
    },
    {
      id: 'phil-electives',
      name: 'Electives',
      note: 'Any PHIL course numbered 10 and above, except PHIL 196–199.',
      slots: [
        {
          id: 'phil-elec',
          label: 'Philosophy Electives',
          type: 'any-approved',
          options: [],
          count: 10,
          optional: true,
          listUrl: 'https://bulletin.stanford.edu/programs/PHILO-MIN/',
        },
      ],
    },
  ],
};
