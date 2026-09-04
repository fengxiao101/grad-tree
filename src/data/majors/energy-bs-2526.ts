import type { MajorConfig } from '../majorSchema';

export const ENERGY_BS_2526: MajorConfig = {
  id: 'energy-bs-2526',
  name: 'Energy Science and Engineering (BS)',
  school: 'Doerr School of Sustainability',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 100,
  wimCourses: [{ dept: 'ENERGY', number: '199' }],

  sections: [

    {
      id: 'energy-math',
      name: 'Mathematics',
      slots: [
        {
          id: 'energy-math-19',
          label: 'MATH 19: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '19', name: 'Calculus' }],
        },
        {
          id: 'energy-math-20',
          label: 'MATH 20: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '20', name: 'Calculus' }],
        },
        {
          id: 'energy-math-21',
          label: 'MATH 21: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '21', name: 'Calculus' }],
        },
        {
          id: 'energy-math-cme100',
          label: 'CME 100 or MATH 51: Vector Calculus / Linear Algebra',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },
            { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ],
        },
        {
          id: 'energy-math-cme102',
          label: 'CME 102 or MATH 53: Differential Equations',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '102', name: 'Ordinary Differential Equations for Engineers' },
            { dept: 'MATH', number: '53', name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' },
          ],
        },
        {
          id: 'energy-math-cme104',
          label: 'CME 104 or MATH 52: Linear Algebra / Integral Calculus',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '104', name: 'Linear Algebra and Partial Differential Equations for Engineers' },
            { dept: 'MATH', number: '52', name: 'Integral Calculus of Several Variables' },
          ],
        },
        {
          id: 'energy-math-cme106',
          label: 'CME 106 or STATS 110: Probability and Statistics',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
            { dept: 'STATS', number: '110', name: 'Introduction to Statistics for Engineering and the Sciences' },
          ],
        },
      ],
    },

    {
      id: 'energy-science',
      name: 'Science',
      slots: [
        {
          id: 'energy-phys-mech',
          label: 'PHYSICS 41/41E/61: Mechanics',
          type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '41', name: 'Mechanics' },
            { dept: 'PHYSICS', number: '41E', name: 'Mechanics, Concepts, Calculations, and Context' },
            { dept: 'PHYSICS', number: '61', name: 'Mechanics and Special Relativity' },
          ],
        },
        {
          id: 'energy-phys-em',
          label: 'PHYSICS 43 or 81: Electricity and Magnetism',
          type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' },
            { dept: 'PHYSICS', number: '81', name: 'Electricity and Magnetism Using Special Relativity and Vector Calculus' },
          ],
        },
        {
          id: 'energy-phys-45',
          label: 'PHYSICS 45: Light and Heat',
          type: 'required',
          options: [{ dept: 'PHYSICS', number: '45', name: 'Light and Heat' }],
        },
        {
          id: 'energy-chem',
          label: 'Chemistry: CHEM 31E, CHEM 31A, or EPS 2',
          type: 'pick-one',
          note: 'EPS 2 recommended. If CHEM 31A is selected, CHEM 31B must also be completed (see slot below).',
          options: [
            { dept: 'CHEM', number: '31E', name: 'Chemical Foundations and 21st Century Problems' },
            { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
            { dept: 'EPS', number: '2', name: 'Chemistry of the Earth and Planets' },
          ],
        },
        {
          id: 'energy-chem-31b',
          label: 'CHEM 31B: Chemical Principles II',
          type: 'required',
          optional: true,
          note: 'Required only if CHEM 31A was selected above.',
          options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
        },
      ],
    },

    {
      id: 'energy-engr-fund',
      name: 'Engineering Fundamentals',
      slots: [
        {
          id: 'energy-cs106a',
          label: 'CS 106A: Programming Methodology',
          type: 'required',
          options: [{ dept: 'CS', number: '106A', name: 'Programming Methodology' }],
        },
        {
          id: 'energy-cs106b',
          label: 'CS 106B: Programming Abstractions',
          type: 'required',
          options: [{ dept: 'CS', number: '106B', name: 'Programming Abstractions' }],
        },
        {
          id: 'energy-engr14',
          label: 'ENGR 14: Intro to Solid Mechanics',
          type: 'required',
          options: [{ dept: 'ENGR', number: '14', name: 'Intro to Solid Mechanics' }],
        },
        {
          id: 'energy-me30',
          label: 'ME 30: Engineering Thermodynamics',
          type: 'required',
          options: [{ dept: 'ME', number: '30', name: 'Engineering Thermodynamics' }],
        },
        {
          id: 'energy-fluids',
          label: 'ME 70 or CHEMENG 120A: Fluids',
          type: 'pick-one',
          options: [
            { dept: 'ME', number: '70', name: 'Introductory Fluids Engineering' },
            { dept: 'CHEMENG', number: '120A', name: 'Fluid Mechanics' },
          ],
        },
      ],
    },

    {
      id: 'energy-core',
      name: 'Core Program Requirements',
      slots: [
        {
          id: 'energy-131',
          label: 'ENERGY 131: Energy and the Environment',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '131', name: 'Energy and the Environment' }],
        },
        {
          id: 'energy-132',
          label: 'ENERGY 132: Fundamentals of Renewable Energy Processes',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '132', name: 'Fundamentals of Renewable Energy Processes' }],
        },
        {
          id: 'energy-133',
          label: 'ENERGY 133: Economic and Policy Analysis for Sustainable Energy Decisions',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '133', name: 'Economic and Policy Analysis for Sustainable Energy Decisions' }],
        },
        {
          id: 'energy-134',
          label: 'ENERGY 134: Sustainable Energy for 9 Billion',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '134', name: 'Sustainable Energy for 9 Billion' }],
        },
        {
          id: 'energy-140',
          label: 'ENERGY 140: Mass and Energy Transport in Porous Media',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '140', name: 'Mass and Energy Transport in Porous Media' }],
        },
        {
          id: 'energy-142',
          label: 'ENERGY 142: Electrochemical Energy Conversion',
          type: 'required',
          options: [{ dept: 'ENERGY', number: '142', name: 'Electrochemical Energy Conversion' }],
        },
        {
          id: 'energy-199',
          label: 'ENERGY 199: Senior Project and Seminar in Energy Science and Engineering (WIM, Capstone)',
          type: 'required',
          note: 'Satisfies the Writing in the Major (WIM) requirement and serves as the capstone experience.',
          options: [{ dept: 'ENERGY', number: '199', name: 'Senior Project and Seminar in Energy Science and Engineering' }],
        },
      ],
    },

    {
      id: 'energy-depth',
      name: 'Earth and Energy Depth (at least 5 courses, 15 units minimum)',
      note: 'Complete at least 5 courses totaling at least 15 units from the list below. Appropriate substitutions allowed with advisor consent.',
      slots: [
        {
          id: 'energy-depth-courses',
          label: 'Earth and Energy Depth Electives',
          type: 'pick-from-list',
          count: 5,
          minUnits: 15,
          options: [
            { dept: 'ENERGY', number: '107A', name: 'Understand Energy' },
            { dept: 'ENERGY', number: '110', name: 'Engineering Economics' },
            { dept: 'ENERGY', number: '112', name: 'Exploring Geosciences with MATLAB' },
            { dept: 'ENERGY', number: '121', name: 'Fundamentals of Multiphase Flow' },
            { dept: 'ENERGY', number: '141', name: 'Seismic Reservoir Characterization' },
            { dept: 'ENERGY', number: '153', name: 'Carbon Capture and Sequestration' },
            { dept: 'ENERGY', number: '160', name: 'Uncertainty Quantification in Data-Centric Simulations' },
            { dept: 'ENERGY', number: '167', name: 'Engineering Appraisal and Economic Valuation of Energy Assets and Projects' },
            { dept: 'ENERGY', number: '175', name: 'Well Test Analysis' },
            { dept: 'ENERGY', number: '176', name: 'Electric System Planning with Emerging Generation Technologies and Large Load' },
            { dept: 'ENERGY', number: '177A', name: 'Engineering and Sustainable Development: Toolkit' },
            { dept: 'ENERGY', number: '177B', name: 'Engineering and Sustainable Development: Implementation' },
            { dept: 'ENERGY', number: '185', name: 'Sustainability of AI and Advanced Computing' },
            { dept: 'ENERGY', number: '191', name: 'Optimization of Energy Systems' },
            { dept: 'ENERGY', number: '201A', name: 'Energy Systems Fundamentals' },
            { dept: 'ENERGY', number: '201B', name: 'Fundamentals of Energy Processes' },
            { dept: 'ENERGY', number: '201C', name: 'Energy Storage and Conversion Systems: Solar Cells, Fuel Cells, Batteries' },
            { dept: 'ENERGY', number: '269', name: 'Geothermal Reservoir Engineering' },
            { dept: 'EPS', number: '1', name: 'Introduction to Geology' },
            { dept: 'EPS', number: '20', name: 'The Geoscience of Environmental Justice' },
          ],
        },
      ],
    },

  ],
};
