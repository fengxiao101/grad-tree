// Energy Science and Engineering Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/ENERGY-MIN/
// totalMinUnits: 18 (3 core + 3 electives)
// Courses must be planned in consultation with ESE advisor; appropriate substitutions allowed

import type { MajorConfig } from '../majorSchema';

export const ENERGY_MINOR_2526: MajorConfig = {
  id: 'energy-minor-2526',
  name: 'Energy Science and Engineering (Minor)',
  school: 'School of Earth, Energy & Environmental Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 18,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ENERGY-MIN/',
  sections: [
    {
      id: 'energy-core',
      name: 'Core Courses (all 3 required)',
      slots: [
        {
          id: 'energy-101',
          label: 'ENERGY 101: Energy and the Environment',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '101', name: 'Energy and the Environment' }],
        },
        {
          id: 'energy-120',
          label: 'ENERGY 120: Mass and Energy Transport in Porous Media',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '120', name: 'Mass and Energy Transport in Porous Media' }],
        },
        {
          id: 'energy-160',
          label: 'ENERGY 160: Uncertainty Quantification in Data-Centric Simulations',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '160', name: 'Uncertainty Quantification in Data-Centric Simulations' }],
        },
      ],
    },
    {
      id: 'energy-elec',
      name: 'Electives (3 courses)',
      note: 'Appropriate substitutions allowed with consent of ESE advisor.',
      slots: [
        {
          id: 'energy-elec-slot',
          label: 'Energy Elective',
          type: 'pick-from-list',
          count: 3,
          options: [
            { dept: 'ENERGY', number: '102', name: 'Fundamentals of Renewable Power' },
            { dept: 'ENERGY', number: '104', name: 'Sustainable Energy for 9 Billion' },
            { dept: 'ENERGY', number: '112', name: 'Exploring Geosciences with MATLAB' },
            { dept: 'ENERGY', number: '121', name: 'Fundamentals of Multiphase Flow' },
            { dept: 'ENERGY', number: '141', name: 'Seismic Reservoir Characterization' },
            { dept: 'ENERGY', number: '153', name: 'Carbon Capture and Sequestration' },
            { dept: 'ENERGY', number: '167', name: 'Engineering Appraisal and Economic Valuation of Energy Assets and Projects' },
            { dept: 'ENERGY', number: '175', name: 'Well Test Analysis' },
            { dept: 'ENERGY', number: '176', name: 'Electric System Planning with Emerging Generation Technologies and Large Load' },
            { dept: 'ENERGY', number: '177A', name: 'Engineering and Sustainable Development: Toolkit' },
            { dept: 'ENERGY', number: '177B', name: 'Engineering and Sustainable Development: Implementation' },
            { dept: 'ENERGY', number: '191', name: 'Optimization of Energy Systems' },
            { dept: 'ENERGY', number: '201A', name: 'Energy Systems Fundamentals' },
            { dept: 'ENERGY', number: '201B', name: 'Fundamentals of Energy Processes' },
            { dept: 'ENERGY', number: '201C', name: 'Energy Storage and Conversion Systems: Solar Cells, Fuel Cells, Batteries' },
            { dept: 'ENERGY', number: '269', name: 'Geothermal Reservoir Engineering' },
            { dept: 'EPS', number: '1', name: 'Introduction to Geology' },
            { dept: 'GEOPHYS', number: '130', name: 'Introductory Seismology' },
          ],
        },
      ],
    },
  ],
};
