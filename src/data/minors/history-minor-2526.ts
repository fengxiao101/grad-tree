// History Minor: School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/HSTRY-MIN/
// 18 units minimum. 6 courses required, each at least 3 units, all letter-graded.
// GPA of 2.0 (C) or higher in History courses required.
// At least 3 of the 6 courses must have a field or thematic focus.
// At least 2 of the 6 courses must be in small-group format
//   (Stanford Introductory Seminars, Sources and Methods Seminars, colloquia, research seminars).
// At least 3 of the 6 courses must be taught by Stanford History faculty.
// AP credits do NOT fulfill any minor requirements.
// Max 5 units from outside the History dept (petition required).
// Max 3 transfer courses toward the minor.
// 1 HISTORY 299S (Directed Research & Writing) may count if taken for 3-5 units, letter grade.
// Declare by autumn of senior year via Axess.

import type { MajorConfig } from '../majorSchema';

export const HISTORY_MINOR_2526: MajorConfig = {
  id: 'history-minor-2526',
  name: 'History (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/HSTRY-MIN/',
  category: 'minor',
  totalMinUnits: 18,
  sections: [
    // ── Small-Group Format Courses (2 required) ────────────────────────────────
    {
      id: 'small-group',
      name: 'Small-Group Format Courses (2 required)',
      note: 'Two of the six minor courses must be in small-group format: Stanford Introductory Seminars, Sources and Methods Seminars, departmental colloquia, or research seminars. These also count toward the 6-course total.',
      slots: [
        {
          id: 'seminar',
          label: 'Small-Group Seminars (Intro Seminar, Sources & Methods, colloquium, or research seminar)',
          type: 'any-approved',
          count: 2,
          options: [],
          note: 'Must be Stanford Introductory Seminars, Sources and Methods Seminars, departmental colloquia, or research seminars in History.',
        },
      ],
    },

    // ── History Electives (4 additional, 6 total) ──────────────────────────────
    {
      id: 'electives',
      name: 'History Electives (4 additional courses)',
      note: 'Complete 4 additional History courses for a total of 6 minor courses. At least 3 of all 6 must have a field or thematic focus. At least 3 must be taught by Stanford History faculty. Each must be ≥3 units, letter grade. Up to 5 units outside History dept may count with petition. One HISTORY 299S may count. AP credit does NOT fulfill any requirement.',
      slots: [
        {
          id: 'hist-elec',
          label: 'History Electives (any HISTORY course, 3+ units, letter grade)',
          type: 'any-approved',
          count: 4,
          options: [],
        },
      ],
    },
  ],
};
