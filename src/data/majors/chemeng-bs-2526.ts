import type { MajorConfig, CourseOption } from '../majorSchema';

const TIS_COURSES: CourseOption[] = [
  { dept: 'AA', number: '252', name: 'Techniques of Failure Analysis' },
  { dept: 'ANTHRO', number: '132C', name: 'Technology and Inequality' },
  { dept: 'ARCHLGY', number: '151', name: 'Ten Things: An Archaeology of Design' },
  { dept: 'BIOE', number: '131', name: 'Ethics in Bioengineering' },
  { dept: 'BIOE', number: '177', name: 'Inventing the Future' },
  { dept: 'CEE', number: '102A', name: 'Legal / Ethical Principles in Design, Construction, Project Delivery' },
  { dept: 'CEE', number: '145E', name: 'Equitable Infrastructure Solutions' },
  { dept: 'CLASSICS', number: '168', name: 'Engineering the Roman Empire' },
  { dept: 'COMM', number: '120W', name: 'The Rise of Digital Culture' },
  { dept: 'COMM', number: '166', name: 'Virtual People' },
  { dept: 'CS', number: '125', name: 'Data: Algorithms, Tools, Policy, and Society' },
  { dept: 'CS', number: '139', name: 'Human-Centered AI' },
  { dept: 'CS', number: '152', name: 'Trust and Safety' },
  { dept: 'CS', number: '181', name: 'Computers, Ethics, and Public Policy' },
  { dept: 'CS', number: '182', name: 'Ethics, Public Policy, and Technological Change' },
  { dept: 'CS', number: '182W', name: 'Ethics, Public Policy, and Technological Change (WIM)' },
  { dept: 'CS', number: '256', name: 'Algorithmic Fairness' },
  { dept: 'CS', number: '278', name: 'Social Computing' },
  { dept: 'DATASCI', number: '154', name: 'Data Science for Social Impact' },
  { dept: 'EARTHSYS', number: '125', name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'ENGR', number: '117', name: 'Expanding Engineering Limits: Culture, Diversity, and Equity' },
  { dept: 'ENGR', number: '145', name: 'Technology Entrepreneurship' },
  { dept: 'ENGR', number: '148', name: 'Principled Entrepreneurial Decisions' },
  { dept: 'ENERGY', number: '177A', name: 'Engineering and Sustainable Development: Toolkit' },
  { dept: 'ENERGY', number: '177B', name: 'Engineering and Sustainable Development: Implementation' },
  { dept: 'EPS', number: '194', name: 'Technology, National Security, and Sustainability' },
  { dept: 'HUMBIO', number: '174', name: 'Foundations of Bioethics' },
  { dept: 'MS&E', number: '179', name: 'Entrepreneurship for Everyone' },
  { dept: 'MS&E', number: '193', name: 'Technology and National Security' },
  { dept: 'NBIO', number: '101', name: 'Social and Ethical Issues in the Neurosciences' },
  { dept: 'POLISCI', number: '114S', name: 'International Security in a Changing World' },
  { dept: 'PUBLPOL', number: '114', name: 'Spies, Lies, and Algorithms: The History and Future of American Intelligence' },
  { dept: 'PUBLPOL', number: '134', name: 'Ethics on the Edge: Business, Non-Profit Organizations, Government, and Individuals' },
  { dept: 'STS', number: '1', name: 'Introduction to Science, Technology & Society' },
  { dept: 'STS', number: '115', name: 'The Ethics of Developing Life-Saving Technologies for Children' },
  { dept: 'STS', number: '200J', name: 'Technometabolism: Technology, Society, and the Anthropocene' },
];

export const CHEMENG_BS_2526: MajorConfig = {
  id: 'chemeng-bs-2526',
  name: 'Chemical Engineering (BS)',
  school: 'School of Engineering',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 95,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CHEME-BS/',
  wimCourses: [
    { dept: 'CHEMENG', number: '185A', name: 'Chemical Engineering Laboratory A' },
  ],
  showWimInProgram: false,

  sections: [
    {
      id: 'cheme-math',
      name: 'Mathematics (15–20 units)',
      note: 'MATH 19/20/21 may be substituted by approved AP credit. Unit count is higher if MATH 51+52 is chosen instead of CME 100.',
      slots: [
        {
          id: 'cheme-math-19',
          label: 'MATH 19: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '19', name: 'Calculus' }],
        },
        {
          id: 'cheme-math-20',
          label: 'MATH 20: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '20', name: 'Calculus' }],
        },
        {
          id: 'cheme-math-21',
          label: 'MATH 21: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '21', name: 'Calculus' }],
        },
        {
          id: 'cheme-math-upper',
          label: 'Vector Calculus: CME 100 or MATH 51 (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },
            { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ],
          note: 'If MATH 51 is chosen, MATH 52 (Integral Calculus of Several Variables) must also be taken.',
        },
        {
          id: 'cheme-math-52',
          label: 'MATH 52: Integral Calculus of Several Variables (if MATH 51 path)',
          type: 'required',
          optional: true,
          options: [{ dept: 'MATH', number: '52', name: 'Integral Calculus of Several Variables' }],
          note: 'Required only if MATH 51 is chosen instead of CME 100.',
        },
      ],
    },

    {
      id: 'cheme-science',
      name: 'Science (23–29 units)',
      note: 'CHEM 31A and CHEM 31B may substitute CHEM 31E (unit count will be higher). All science courses required.',
      slots: [
        {
          id: 'cheme-sci-chem31e',
          label: 'CHEM 31E: Chemical Foundations and 21st Century Problems',
          type: 'required',
          options: [{ dept: 'CHEM', number: '31E', name: 'Chemical Foundations and 21st Century Problems' }],
          note: 'May substitute CHEM 31A and CHEM 31B (2-quarter sequence) for additional units.',
        },
        {
          id: 'cheme-sci-chem33',
          label: 'CHEM 33: Structure and Reactivity of Carbon-Based Molecules',
          type: 'required',
          options: [{ dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' }],
        },
        {
          id: 'cheme-sci-chem121',
          label: 'CHEM 121: Understanding the Natural and Unnatural World through Chemistry',
          type: 'required',
          options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }],
        },
        {
          id: 'cheme-sci-phys41',
          label: 'PHYSICS 41 or 41E: Mechanics (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '41', name: 'Mechanics' },
            { dept: 'PHYSICS', number: '41E', name: 'Mechanics, Concepts, Calculations, and Context' },
          ],
        },
        {
          id: 'cheme-sci-phys43',
          label: 'PHYSICS 43: Electricity and Magnetism',
          type: 'required',
          options: [{ dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' }],
        },
      ],
    },

    {
      id: 'cheme-tis',
      name: 'Technology in Society (3–5 units)',
      note: 'One course required from the SoE-Approved TiS list (ughb.stanford.edu). Must be on the approved list the year it is taken. ENERGY 177A and 177B count jointly as one TiS fulfillment.',
      slots: [
        {
          id: 'cheme-tis-course',
          label: 'Technology in Society (SoE-Approved)',
          type: 'pick-from-list',
          count: 1,
          options: TIS_COURSES,
        },
      ],
    },

    {
      id: 'cheme-engr-fund',
      name: 'Engineering Fundamentals (8 units)',
      slots: [
        {
          id: 'cheme-fund-20',
          label: 'CHEMENG 20: Introduction to Chemical Engineering',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '20', name: 'Introduction to Chemical Engineering' }],
        },
        {
          id: 'cheme-fund-55',
          label: 'CHEMENG 55: Foundational Biology for Engineers',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '55', name: 'Foundational Biology for Engineers' }],
        },
      ],
    },

    {
      id: 'cheme-depth',
      name: 'Chemical Engineering Depth (46 units minimum)',
      note: 'All 11 courses required. All must be taken for a letter grade if instructor offers that option. Minimum combined GPA of 2.0 across Engineering Fundamentals and Depth. CHEMENG 185A satisfies WIM; CHEMENG 185B is the capstone. Students who completed CME 104 and CME 106 before 2024–25 may substitute CHEMENG 105.',
      slots: [
        {
          id: 'cheme-depth-100',
          label: 'CHEMENG 100: Chemical Process Modeling, Dynamics, and Control',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '100', name: 'Chemical Process Modeling, Dynamics, and Control' }],
        },
        {
          id: 'cheme-depth-105',
          label: 'CHEMENG 105: Applied Mathematics in Chemical Engineering',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '105', name: 'Applied Mathematics in Chemical Engineering' }],
        },
        {
          id: 'cheme-depth-110a',
          label: 'CHEMENG 110A: Introduction to Chemical Engineering Thermodynamics',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '110A', name: 'Introduction to Chemical Engineering Thermodynamics' }],
        },
        {
          id: 'cheme-depth-110b',
          label: 'CHEMENG 110B: Statistical and Multi-Component Thermodynamics',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '110B', name: 'Statistical and Multi-Component Thermodynamics' }],
        },
        {
          id: 'cheme-depth-120a',
          label: 'CHEMENG 120A: Fluid Mechanics',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '120A', name: 'Fluid Mechanics' }],
        },
        {
          id: 'cheme-depth-120b',
          label: 'CHEMENG 120B: Energy and Mass Transport',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '120B', name: 'Energy and Mass Transport' }],
        },
        {
          id: 'cheme-depth-130a',
          label: 'CHEMENG 130A: Microkinetics: Molecular Principles of Chemical Kinetics',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '130A', name: 'Microkinetics: Molecular Principles of Chemical Kinetics' }],
        },
        {
          id: 'cheme-depth-130b',
          label: 'CHEMENG 130B: Introduction to Kinetics and Reactor Design',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '130B', name: 'Introduction to Kinetics and Reactor Design' }],
        },
        {
          id: 'cheme-depth-180',
          label: 'CHEMENG 180: Chemical Engineering Plant Design',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '180', name: 'Chemical Engineering Plant Design' }],
        },
        {
          id: 'cheme-depth-185a',
          label: 'CHEMENG 185A: Chemical Engineering Laboratory A (WIM)',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '185A', name: 'Chemical Engineering Laboratory A' }],
          note: 'Satisfies the Writing in the Major (WIM) requirement.',
        },
        {
          id: 'cheme-depth-185b',
          label: 'CHEMENG 185B: Chemical Engineering Laboratory B (Capstone)',
          type: 'required',
          options: [{ dept: 'CHEMENG', number: '185B', name: 'Chemical Engineering Laboratory B' }],
          note: 'Capstone experience.',
        },
      ],
    },

  ],
};
