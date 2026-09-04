// Chemistry Minor: School of Humanities & Sciences, 2025-26
// Source: https://bulletin.stanford.edu/programs/CHEM-MIN/
// totalMinUnits: 22 (5 required courses)

import type { MajorConfig } from '../majorSchema';

export const CHEM_MINOR_2526: MajorConfig = {
  id: 'chem-minor-2526',
  name: 'Chemistry (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 22,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CHEM-MIN/',
  sections: [
    {
      id: 'chem-required',
      name: 'Required Courses',
      slots: [
        { id: 'chem-121', label: 'CHEM 121', type: 'required',
          options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }] },
        { id: 'chem-131', label: 'CHEM 131', type: 'required',
          options: [{ dept: 'CHEM', number: '131', name: 'Instrumental Analysis Principles and Practice' }] },
        { id: 'chem-151', label: 'CHEM 151', type: 'required',
          options: [{ dept: 'CHEM', number: '151', name: 'Inorganic Chemistry I' }] },
        { id: 'chem-171', label: 'CHEM 171', type: 'required',
          options: [{ dept: 'CHEM', number: '171', name: 'Foundations of Physical Chemistry' }] },
        { id: 'chem-181', label: 'CHEM 181', type: 'required',
          options: [{ dept: 'CHEM', number: '181', name: 'Biochemistry I' }] },
      ],
    },
  ],
};
