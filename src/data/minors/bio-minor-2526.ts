// Biology Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/BIO-MIN/
// 20 units and 6 courses minimum; at least 3 courses must be 100-level or higher.
// Two BIO Foundations courses are required; at most one additional Foundations course may count.
// Other courses are BIO 100+ or approved out-of-department electives from the live Bulletin list.

import type { MajorConfig } from '../majorSchema';

const BIO_FOUNDATIONS = [
  { dept: 'BIO', number: '81', name: 'Introduction to Ecology' },
  { dept: 'BIO', number: '82', name: 'Genetics' },
  { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
  { dept: 'BIO', number: '84', name: 'Physiology' },
  { dept: 'BIO', number: '85', name: 'Evolution' },
  { dept: 'BIO', number: '86', name: 'Cell Biology' },
];

const BULLETIN_URL = 'https://bulletin.stanford.edu/programs/BIO-MIN/';

export const BIO_MINOR_2526: MajorConfig = {
  id: 'bio-minor-2526',
  name: 'Biology (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: BULLETIN_URL,
  category: 'minor',
  totalMinUnits: 20,
  sections: [
    {
      id: 'bio-course-plan',
      name: 'Six-Course Biology Minor Plan',
      note: 'Choose one valid six-course structure. All courses must be taken for a letter grade, be worth at least 3 units, and produce a minimum 2.0 minor GPA. The two required BIO Foundations courses cannot be replaced by transfer or other coursework. Courses used for this minor may not satisfy another major or minor. Stanford IntroSems and Sophomore Seminars do not count.',
      slots: [],
      pickOneGroup: [
        {
          id: 'bio-plan-two-foundations',
          name: '2 BIO Foundations + 3 required 100+ courses + 1 additional allowed course',
          slots: [
            {
              id: 'bio-plan2-foundations',
              label: 'BIO Foundations Courses',
              type: 'pick-from-list',
              count: 2,
              options: BIO_FOUNDATIONS,
            },
            {
              id: 'bio-plan2-upper',
              label: 'Required 100+ BIO / Approved Out-of-Department Courses',
              type: 'any-approved',
              count: 3,
              minLevel: 100,
              options: [],
              listUrl: BULLETIN_URL,
              note: 'All three courses in this slot must be numbered 100 or above: any qualifying BIO 100+ course or a 100+ course in the Bulletin’s approved out-of-department list.',
            },
            {
              id: 'bio-plan2-additional',
              label: 'Additional Allowed Course',
              type: 'any-approved',
              options: [],
              listUrl: BULLETIN_URL,
              note: 'May be another qualifying 100+ course, the one permitted additional BIO Foundations course, or allowable OSPAUSTL coursework. Use Search & add for the exact course taken.',
            },
          ],
        },
        {
          id: 'bio-plan-three-foundations',
          name: '3 BIO Foundations + 3 required 100+ courses',
          note: 'This is the maximum of three BIO Foundations courses that may count toward the minor.',
          slots: [
            {
              id: 'bio-plan3-foundations',
              label: 'BIO Foundations Courses',
              type: 'pick-from-list',
              count: 3,
              options: BIO_FOUNDATIONS,
            },
            {
              id: 'bio-plan3-electives',
              label: 'Required 100+ BIO / Approved Out-of-Department Courses',
              type: 'any-approved',
              count: 3,
              minLevel: 100,
              options: [],
              listUrl: BULLETIN_URL,
              note: 'All three courses in this slot must be numbered 100 or above: any qualifying BIO 100+ course or a 100+ course in the Bulletin’s approved out-of-department list.',
            },
          ],
        },
      ],
    },
    {
      id: 'bio-elective-rules',
      name: 'Approved-Elective Rules',
      slots: [
        {
          id: 'bio-elective-rules-info',
          label: 'Elective restrictions reviewed',
          type: 'manual',
          optional: true,
          options: [],
          note: 'OSPAUSTL 10, 28, and 32 together count as three courses. CHEM 181 may not count if CHEM 141/143 were also taken. BIOE 450 and a cross-listing may count only once. Consult the live Bulletin list because approved out-of-department offerings may change.',
        },
      ],
    },
  ],
};
