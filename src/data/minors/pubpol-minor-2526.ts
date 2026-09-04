// Public Policy Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/PUBPO-MIN/
// totalMinUnits: 30 (6 courses × 5 units each)
// ECON1 may be double-counted with other programs (explicit exception)
// Economics majors skip PUBLPOL50 and must substitute another course
// At most 10 units may be CR/NC; between ECON102A and ECON102B, no more than 5 units CR/NC
// Students must review course plans with a program administrator

import type { MajorConfig } from '../majorSchema';

export const PUBPOL_MINOR_2526: MajorConfig = {
  id: 'pubpol-minor-2526',
  name: 'Public Policy (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 30,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PUBPO-MIN/',
  doubleCountCourses: [{ dept: 'ECON', number: '1', name: 'Principles of Economics' }],
  sections: [
    {
      id: 'pubpol-core',
      name: 'Required Core Courses (4 courses, 20 units)',
      minUnits: 20,
      note: 'ECON 1 may be double-counted with other programs. Students may petition to substitute a different course for a requirement whose material would be duplicative.',
      slots: [
        {
          id: 'pubpol-econ1',
          label: 'ECON 1: Principles of Economics',
          type: 'required',
          options: [{ dept: 'ECON', number: '1', name: 'Principles of Economics' }],
        },
        {
          id: 'pubpol-102a',
          label: 'ECON 102A: Introduction to Statistical Methods for Social Scientists',
          type: 'required',
          options: [{ dept: 'ECON', number: '102A', name: 'Introduction to Statistical Methods (Postcalculus) for Social Scientists' }],
        },
        {
          id: 'pubpol-102b',
          label: 'ECON 102B: Applied Econometrics',
          type: 'required',
          options: [{ dept: 'ECON', number: '102B', name: 'Applied Econometrics' }],
        },
        {
          id: 'pubpol-104',
          label: 'PUBLPOL 104: Economic Policy Analysis',
          type: 'required',
          options: [{ dept: 'PUBLPOL', number: '104', name: 'Economic Policy Analysis' }],
        },
      ],
    },
    {
      id: 'pubpol-microeconomics',
      name: 'Intermediate Microeconomics (1 course, 5 units)',
      minCourses: 1,
      minUnits: 5,
      note: 'Take PUBLPOL 50 or ECON 50. Economics majors do not take PUBLPOL 50 and must make up its five units with another approved course.',
      slots: [
        {
          id: 'pubpol-micro',
          label: 'PUBLPOL 50 or ECON 50',
          type: 'pick-one',
          options: [
            { dept: 'PUBLPOL', number: '50', name: 'Intermediate Microeconomics for Public Policy' },
            { dept: 'ECON', number: '50', name: 'Economic Analysis I' },
          ],
          optional: true,
        },
        {
          id: 'pubpol-micro-substitute',
          label: 'Approved 5-unit Substitute (Economics major or duplication petition)',
          type: 'any-approved',
          options: [],
          optional: true,
          note: 'Use only when PUBLPOL 50 is omitted by an Economics major or the program approves a substitution for duplicative material.',
        },
      ],
    },
    {
      id: 'pubpol-elec',
      name: 'Elective Courses (at least 1)',
      note: 'Select one option below; the PUBLPOL 134 + PUBLPOL 103F option is an intact two-course sequence. Additional courses may be needed depending on major requirements. Consult a program administrator.',
      slots: [],
      pickOneGroup: [
        {
          id: 'pubpol-elec-101',
          name: 'PUBLPOL 101',
          slots: [{ id: 'pubpol-elec-101-slot', label: 'PUBLPOL 101', type: 'required', options: [{ dept: 'PUBLPOL', number: '101', name: 'American Politics and Policy: In Defense of Democracy' }] }],
        },
        {
          id: 'pubpol-elec-105',
          name: 'PUBLPOL 105',
          slots: [{ id: 'pubpol-elec-105-slot', label: 'PUBLPOL 105', type: 'required', options: [{ dept: 'PUBLPOL', number: '105', name: 'Empirical Methods in Public Policy' }] }],
        },
        {
          id: 'pubpol-elec-102c',
          name: 'ECON 102C',
          slots: [{ id: 'pubpol-elec-102c-slot', label: 'ECON 102C', type: 'required', options: [{ dept: 'ECON', number: '102C', name: 'Advanced Topics in Econometrics' }] }],
        },
        {
          id: 'pubpol-elec-ethics-pair',
          name: 'PUBLPOL 134 + PUBLPOL 103F (both required)',
          slots: [
            { id: 'pubpol-elec-134', label: 'PUBLPOL 134', type: 'required', options: [{ dept: 'PUBLPOL', number: '134', name: 'Ethics on the Edge: Business, Non-Profit Organizations, Government, and Individuals' }] },
            { id: 'pubpol-elec-103f', label: 'PUBLPOL 103F', type: 'required', options: [{ dept: 'PUBLPOL', number: '103F', name: 'Ethics of Truth in a Post-Truth World' }] },
          ],
        },
        {
          id: 'pubpol-elec-103c',
          name: 'PUBLPOL 103C',
          slots: [{ id: 'pubpol-elec-103c-slot', label: 'PUBLPOL 103C', type: 'required', options: [{ dept: 'PUBLPOL', number: '103C', name: 'Justice' }] }],
        },
        {
          id: 'pubpol-elec-154',
          name: 'PUBLPOL 154',
          slots: [{ id: 'pubpol-elec-154-slot', label: 'PUBLPOL 154', type: 'required', options: [{ dept: 'PUBLPOL', number: '154', name: 'Politics and Policy in California' }] }],
        },
        {
          id: 'pubpol-elec-156',
          name: 'PUBLPOL 156',
          slots: [{ id: 'pubpol-elec-156-slot', label: 'PUBLPOL 156', type: 'required', options: [{ dept: 'PUBLPOL', number: '156', name: 'Health Care Policy and Reform' }] }],
        },
      ],
    },
  ],
};
