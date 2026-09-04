// Mechanical Engineering Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/ME-MIN/
// totalMinUnits: 21
// Three options: General, Thermosciences, Mechanical Design
// All options require prerequisites: MATH19/20/21 (or equiv), PHYSICS41
// Thermosciences also requires: MATH51 (or CME100)
// Courses used for other degree programs cannot fulfill ME minor requirements
// Minimum grade C in each course; minimum combined GPA 2.7 across all minor courses
// Design (BS) majors may NOT add the Mechanical Design minor

import type { MajorConfig } from '../majorSchema';

export const ME_MINOR_2526: MajorConfig = {
  id: 'me-minor-2526',
  name: 'Mechanical Engineering (Minor)',
  school: 'School of Engineering',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 21,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ME-MIN/',
  sections: [
    { id: 'me-track-selector', name: 'Option (choose 1)', trackSelector: true, slots: [] },
  ],
  tracks: [
    {
      id: 'me-general',
      name: 'General Minor',
      sections: [
        {
          id: 'me-gen-req',
          name: 'Required Courses',
          note: 'Prerequisites (not counted toward minor): MATH19/20/21 or equivalent, PHYSICS41. Minimum grade C. Minimum combined GPA 2.7 across all minor courses.',
          slots: [
            {
              id: 'me-gen-engr14',
              label: 'ENGR 14: Intro to Solid Mechanics',
              type: 'required',
              options: [{ dept: 'ENGR', number: '14', name: 'Intro to Solid Mechanics' }],
            },
            {
              id: 'me-gen-engr15',
              label: 'ENGR 15: Dynamics',
              type: 'required',
              options: [{ dept: 'ENGR', number: '15', name: 'Dynamics' }],
            },
            {
              id: 'me-gen-me30',
              label: 'ME 30: Engineering Thermodynamics',
              type: 'required',
              options: [{ dept: 'ME', number: '30', name: 'Engineering Thermodynamics' }],
            },
            {
              id: 'me-gen-me70',
              label: 'ME 70: Introductory Fluids Engineering',
              type: 'required',
              options: [{ dept: 'ME', number: '70', name: 'Introductory Fluids Engineering' }],
            },
            {
              id: 'me-gen-me102',
              label: 'ME 102: Foundations of Product Realization',
              type: 'required',
              options: [{ dept: 'ME', number: '102', name: 'Foundations of Product Realization' }],
            },
          ],
        },
        {
          id: 'me-gen-elec',
          name: 'Elective Courses (2 courses)',
          slots: [
            {
              id: 'me-gen-elec-slot',
              label: 'ME General Elective',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'ME', number: '80', name: 'Mechanics of Materials' },
                { dept: 'ME', number: '103', name: 'Product Realization: Design and Making' },
                { dept: 'ME', number: '131', name: 'Heat Transfer' },
                { dept: 'ME', number: '161', name: 'Dynamic Systems, Vibrations and Control' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'me-thermosciences',
      name: 'Thermosciences Minor',
      sections: [
        {
          id: 'me-thermo-req',
          name: 'Required Courses (all 7 required)',
          note: 'Prerequisites (not counted toward minor): MATH19/20/21 or equivalent, MATH51 or CME100, PHYSICS41. Minimum grade C. Minimum combined GPA 2.7.',
          slots: [
            {
              id: 'me-thermo-engr14',
              label: 'ENGR 14: Intro to Solid Mechanics',
              type: 'required',
              options: [{ dept: 'ENGR', number: '14', name: 'Intro to Solid Mechanics' }],
            },
            {
              id: 'me-thermo-me30',
              label: 'ME 30: Engineering Thermodynamics',
              type: 'required',
              options: [{ dept: 'ME', number: '30', name: 'Engineering Thermodynamics' }],
            },
            {
              id: 'me-thermo-me70',
              label: 'ME 70: Introductory Fluids Engineering',
              type: 'required',
              options: [{ dept: 'ME', number: '70', name: 'Introductory Fluids Engineering' }],
            },
            {
              id: 'me-thermo-me131',
              label: 'ME 131: Heat Transfer',
              type: 'required',
              options: [{ dept: 'ME', number: '131', name: 'Heat Transfer' }],
            },
            {
              id: 'me-thermo-me132',
              label: 'ME 132: Intermediate Thermodynamics',
              type: 'required',
              options: [{ dept: 'ME', number: '132', name: 'Intermediate Thermodynamics' }],
            },
            {
              id: 'me-thermo-me133',
              label: 'ME 133: Intermediate Fluid Mechanics',
              type: 'required',
              options: [{ dept: 'ME', number: '133', name: 'Intermediate Fluid Mechanics' }],
            },
            {
              id: 'me-thermo-me149',
              label: 'ME 149: Mechanical Measurements',
              type: 'required',
              options: [{ dept: 'ME', number: '149', name: 'Mechanical Measurements' }],
            },
          ],
        },
      ],
    },
    {
      id: 'me-design',
      name: 'Mechanical Design Minor',
      sections: [
        {
          id: 'me-design-req',
          name: 'Required Courses',
          note: 'Prerequisites (not counted toward minor): MATH19/20/21 or equivalent, PHYSICS41. Minimum grade C. Minimum combined GPA 2.7. Design (BS) majors may NOT add this minor.',
          slots: [
            {
              id: 'me-design-engr14',
              label: 'ENGR 14: Intro to Solid Mechanics',
              type: 'required',
              options: [{ dept: 'ENGR', number: '14', name: 'Intro to Solid Mechanics' }],
            },
            {
              id: 'me-design-me80',
              label: 'ME 80: Mechanics of Materials',
              type: 'required',
              options: [{ dept: 'ME', number: '80', name: 'Mechanics of Materials' }],
            },
            {
              id: 'me-design-me102',
              label: 'ME 102: Foundations of Product Realization',
              type: 'required',
              options: [{ dept: 'ME', number: '102', name: 'Foundations of Product Realization' }],
            },
            {
              id: 'me-design-me103',
              label: 'ME 103: Product Realization: Design and Making',
              type: 'required',
              options: [{ dept: 'ME', number: '103', name: 'Product Realization: Design and Making' }],
            },
            {
              id: 'me-design-me104',
              label: 'ME 104: Mechanical Systems Design',
              type: 'required',
              options: [{ dept: 'ME', number: '104', name: 'Mechanical Systems Design' }],
            },
          ],
        },
        {
          id: 'me-design-elec',
          name: 'Elective Courses (2 courses)',
          slots: [
            {
              id: 'me-design-elec-slot',
              label: 'ME Design Elective',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'ME', number: '127', name: 'Design for Additive Manufacturing' },
                { dept: 'ME', number: '128', name: 'Computer-Aided Product Realization' },
                { dept: 'ME', number: '129', name: 'Manufacturing Processes and Design' },
                { dept: 'ME', number: '210', name: 'Introduction to Mechatronics' },
                { dept: 'ME', number: '220', name: 'Introduction to Sensors' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
