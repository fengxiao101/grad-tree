// Electrical Engineering Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/EE-MIN/
// totalMinUnits: 23
// Structure: 1 EE Fundamental + 1 two-course sequence + 4 additional EE 100+ courses

import type { MajorConfig } from '../majorSchema';

export const EE_MINOR_2526: MajorConfig = {
  id: 'ee-minor-2526',
  name: 'Electrical Engineering (Minor)',
  school: 'School of Engineering',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 23,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/EE-MIN/',
  sections: [
    {
      id: 'ee-fundamental',
      name: 'EE Fundamental (≥5 units)',
      minUnits: 5,
      note: 'Must be taken for a letter grade if that option is offered.',
      slots: [
        {
          id: 'ee-fund',
          label: 'EE Fundamental',
          type: 'pick-one',
          options: [
            { dept: 'EE', number: '42', name: 'Introduction to Electromagnetics and Its Applications' },
            { dept: 'EE', number: '65', name: 'Modern Physics for Engineers' },
            { dept: 'ENGR', number: '40M', name: 'An Intro to Making: What is EE' },
            { dept: 'ENGR', number: '76', name: 'Information Science and Engineering' },
          ],
        },
      ],
    },
    {
      id: 'ee-sequence',
      name: 'Two-Course Sequence (≥8 units)',
      minUnits: 8,
      note: 'Select one complete sequence: (1) EE101A + EE101B, (2) EE102A + EE102B, (3) EE102A + ENGR108, or (4) EE108 + EE180. CS107E or CS107 is required as a prerequisite for EE180 and may count as one of the four additional EE 100+ courses. All must be taken for a letter grade if offered.',
      slots: [],
      pickGroupCount: 1,
      pickOneGroup: [
        {
          id: 'circuits-sequence',
          name: 'EE 101A + EE 101B',
          slots: [
            { id: 'ee101a', label: 'EE 101A', type: 'required', options: [{ dept: 'EE', number: '101A', name: 'Circuits I' }] },
            { id: 'ee101b', label: 'EE 101B', type: 'required', options: [{ dept: 'EE', number: '101B', name: 'Circuits II' }] },
          ],
        },
        {
          id: 'signals-sequence',
          name: 'EE 102A + EE 102B',
          slots: [
            { id: 'ee102a-with-102b', label: 'EE 102A', type: 'required', options: [{ dept: 'EE', number: '102A', name: 'Signals and Systems I' }] },
            { id: 'ee102b', label: 'EE 102B', type: 'required', options: [{ dept: 'EE', number: '102B', name: 'Signals and Systems II' }] },
          ],
        },
        {
          id: 'signals-matrix-sequence',
          name: 'EE 102A + ENGR 108',
          slots: [
            { id: 'ee102a-with-engr108', label: 'EE 102A', type: 'required', options: [{ dept: 'EE', number: '102A', name: 'Signals and Systems I' }] },
            { id: 'engr108', label: 'ENGR 108', type: 'required', options: [{ dept: 'ENGR', number: '108', name: 'Introduction to Matrix Methods' }] },
          ],
        },
        {
          id: 'digital-systems-sequence',
          name: 'EE 108 + EE 180',
          slots: [
            { id: 'ee108', label: 'EE 108', type: 'required', options: [{ dept: 'EE', number: '108', name: 'Digital System Design' }] },
            { id: 'ee180', label: 'EE 180', type: 'required', options: [{ dept: 'EE', number: '180', name: 'Digital Systems Architecture' }] },
          ],
        },
      ],
    },
    {
      id: 'ee-electives',
      name: 'Additional Letter-Graded EE Courses (4 courses, ≥12 units)',
      minUnits: 12,
      note: 'Four EE courses at the 100-level or higher, each for a letter grade. CS107E or CS107 may count as one of the four if taken as an EE180 prerequisite.',
      slots: [
        {
          id: 'ee-elec',
          label: 'EE 100+ Course',
          type: 'any-approved',
          options: [],
          count: 4,
          minLevel: 100,
        },
      ],
    },
  ],
};
