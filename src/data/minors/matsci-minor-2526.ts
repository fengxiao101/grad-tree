// Materials Science and Engineering Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/MATSC-MIN/
// totalMinUnits: 22
// Structure: 1 ENGR50 variant + ≥6 MATSCI courses (any MATSCI 100+ also qualifies)

import type { MajorConfig } from '../majorSchema';

export const MATSCI_MINOR_2526: MajorConfig = {
  id: 'matsci-minor-2526',
  name: 'Materials Science and Engineering (Minor)',
  school: 'School of Engineering',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 22,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MATSC-MIN/',
  sections: [
    {
      id: 'matsci-engr-fund',
      name: 'Engineering Fundamentals (1 course)',
      note: 'Must be taken for a letter grade if offered.',
      slots: [
        {
          id: 'matsci-engr',
          label: 'Introduction to Materials Science',
          type: 'pick-one',
          options: [
            { dept: 'ENGR', number: '50', name: 'Introduction to Materials Science, Nanotechnology Emphasis' },
            { dept: 'ENGR', number: '50E', name: 'Introduction to Materials Science, Energy Emphasis' },
            { dept: 'ENGR', number: '50M', name: 'Introduction to Materials Science, Biomaterials Emphasis' },
          ],
        },
      ],
    },
    {
      id: 'matsci-depth',
      name: 'Materials Science Fundamentals and Engineering Depth (≥6 courses)',
      note: 'Any MATSCI course numbered 100 or higher taken for a minimum of 3 units also qualifies. All courses must be taken for a letter grade; cumulative GPA for all minor courses must be at least 2.0. Graduate-level courses may be petitioned.',
      slots: [
        {
          id: 'matsci-courses',
          label: 'Materials Science Course',
          type: 'pick-from-list',
          count: 6,
          options: [
            { dept: 'MATSCI', number: '88Q', name: 'Edible Materials: The science of texture' },
            { dept: 'MATSCI', number: '126', name: 'Invention to Innovation: The Process of Translation' },
            { dept: 'MATSCI', number: '127', name: 'Investigating Ancient Materials' },
            { dept: 'MATSCI', number: '142', name: 'Quantum Mechanics of Nanoscale Materials' },
            { dept: 'MATSCI', number: '143', name: 'Materials Structure and Characterization' },
            { dept: 'MATSCI', number: '144', name: 'Thermodynamic Evaluation of Green Energy Technologies' },
            { dept: 'MATSCI', number: '145', name: 'Kinetics of Materials Synthesis' },
            { dept: 'MATSCI', number: '151', name: 'Microstructure and Mechanical Properties' },
            { dept: 'MATSCI', number: '152', name: 'Electronic Materials Engineering' },
            { dept: 'MATSCI', number: '156', name: 'Solar Cells, Fuel Cells, and Batteries: Materials for the Energy Solution' },
            { dept: 'MATSCI', number: '158', name: 'Soft Matter in Biomedical Devices, Microelectronics, and Everyday Life' },
            { dept: 'MATSCI', number: '160', name: 'Nanomaterials Design' },
            { dept: 'MATSCI', number: '161', name: 'Energy Materials Laboratory' },
            { dept: 'MATSCI', number: '162', name: 'X-Ray Diffraction Laboratory' },
            { dept: 'MATSCI', number: '163', name: 'Mechanical Behavior Laboratory' },
            { dept: 'MATSCI', number: '164', name: 'Electronic and Photonic Materials and Devices Laboratory' },
            { dept: 'MATSCI', number: '165', name: 'Nanoscale Materials Physics Computation Laboratory' },
            { dept: 'MATSCI', number: '166', name: 'Data Science and Machine Learning Approaches in Chemical and Materials Engineering' },
            { dept: 'MATSCI', number: '181', name: 'Thermodynamics and Phase Equilibria' },
            { dept: 'MATSCI', number: '182', name: 'Rate Processes in Materials' },
            { dept: 'MATSCI', number: '183', name: 'Defects and Disorder in Materials' },
            { dept: 'MATSCI', number: '184', name: 'Structure and Symmetry' },
            { dept: 'MATSCI', number: '185', name: 'Quantum Mechanics for Materials Science' },
            { dept: 'MATSCI', number: '190', name: 'Organic and Biological Materials' },
            { dept: 'MATSCI', number: '195', name: 'Waves and Diffraction in Solids' },
            { dept: 'MATSCI', number: '198', name: 'Mechanical Properties of Materials' },
            { dept: 'MATSCI', number: '199', name: 'Electronic and Optical Properties of Solids' },
            { dept: 'MATSCI', number: '201', name: 'Applied Quantum Mechanics I' },
            { dept: 'MATSCI', number: '303', name: 'Principles, Materials and Devices of Batteries' },
          ],
        },
      ],
    },
  ],
};
