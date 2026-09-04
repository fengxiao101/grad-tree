// ME BS: Mechanical Engineering, 2025-2026
// Source: https://bulletin.stanford.edu/programs/ME-BS
// totalMinUnits: 76
// Key constraints: min C in every course; combined GPA ≥ 2.7; all letter-graded.
// ABET: Fundamentals + ME Depth + Technical Electives must total ≥ 68 units.

import type { MajorConfig } from '../majorSchema';

const TECH_ELECTIVES = [
  { dept: 'AA',      number: '174A',  name: 'Principles of Robot Autonomy I' },
  { dept: 'AA',      number: '174B',  name: 'Principles of Robot Autonomy II' },
  { dept: 'AA',      number: '283',   name: 'Aircraft and Rocket Propulsion' },
  { dept: 'BIOE',    number: '209',   name: 'Mathematical Modeling of Biological Systems' },
  { dept: 'CME',     number: '192',   name: 'MATLAB for Scientific Computing and Engineering' },
  { dept: 'ENGR',    number: '40M',   name: 'An Intro to Making: What is EE' },
  { dept: 'ENGR',    number: '50',    name: 'Introduction to Materials Science, Nanotechnology Emphasis' },
  { dept: 'ENGR',    number: '105',   name: 'Feedback Control Design' },
  { dept: 'ENGR',    number: '110',   name: 'Perspectives in Assistive Technology' },
  { dept: 'ENGR',    number: '205',   name: 'Introduction to Control Design Techniques' },
  { dept: 'ENGR',    number: '240',   name: 'Introduction to Micro and Nano Electromechanical Systems' },
  { dept: 'MATSCI',  number: '144',   name: 'Thermodynamic Evaluation of Green Energy Technologies' },
  { dept: 'MATSCI',  number: '151',   name: 'Microstructure and Mechanical Properties' },
  { dept: 'MATSCI',  number: '198',   name: 'Mechanical Properties of Materials' },
  { dept: 'ME',      number: '80A',   name: 'Introduction to Deformable Bodies' },
  { dept: 'ME',      number: '127',   name: 'Design for Additive Manufacturing' },
  { dept: 'ME',      number: '128',   name: 'Computer-Aided Product Realization' },
  { dept: 'ME',      number: '129',   name: 'Manufacturing Processes and Design' },
  { dept: 'ME',      number: '132',   name: 'Intermediate Thermodynamics' },
  { dept: 'ME',      number: '133',   name: 'Intermediate Fluid Mechanics' },
  { dept: 'ME',      number: '152',   name: 'Material Behaviors and Failure Prediction' },
  { dept: 'ME',      number: '170C',  name: 'ME Design: Integrating Context with Engineering III' },
  { dept: 'ME',      number: '204',   name: 'Advanced Mechanical Systems Design' },
  { dept: 'ME',      number: '210',   name: 'Introduction to Mechatronics' },
  { dept: 'ME',      number: '217',   name: 'Engineering Design Analytics for Product Realization' },
  { dept: 'ME',      number: '220',   name: 'Introduction to Sensors' },
  { dept: 'ME',      number: '234',   name: 'Introduction to Neuromechanics' },
  { dept: 'ME',      number: '235',   name: 'Biotransport Phenomena' },
  { dept: 'ME',      number: '257',   name: 'Gas-Turbine Design Analysis' },
  { dept: 'ME',      number: '281',   name: 'Biomechanics of Movement' },
  { dept: 'ME',      number: '283',   name: 'Introduction to Biomechanics and Mechanobiology' },
  { dept: 'ME',      number: '285',   name: 'Computational Modeling in the Cardiovascular System' },
  { dept: 'ME',      number: '287',   name: 'Mechanics of Biological Tissues' },
  { dept: 'ME',      number: '298',   name: 'Silversmithing and Design' },
  { dept: 'ME',      number: '300C',  name: 'Introduction to Numerical Methods for Engineering' },
  { dept: 'ME',      number: '303',   name: 'Soft Composites and Soft Robotics' },
  { dept: 'ME',      number: '320',   name: 'Introduction to Robotics' },
  { dept: 'ME',      number: '327',   name: 'Design and Control of Haptic Systems' },
  { dept: 'ME',      number: '331A',  name: 'Advanced Dynamics & Computation' },
  { dept: 'ME',      number: '335A',  name: 'Finite Element Analysis' },
  { dept: 'ME',      number: '338',   name: 'Continuum Mechanics' },
  { dept: 'ME',      number: '339',   name: 'Introduction to Parallel Computing using MPI, openMP, and CUDA' },
  { dept: 'ME',      number: '351A',  name: 'Fluid Mechanics' },
  { dept: 'ME',      number: '351B',  name: 'Fluid Mechanics' },
  { dept: 'ME',      number: '352B',  name: 'Fundamentals of Heat Conduction' },
  { dept: 'ME',      number: '352C',  name: 'Convective Heat Transfer' },
  { dept: 'ME',      number: '362A',  name: 'Physical Gas Dynamics' },
  { dept: 'ME',      number: '370A',  name: 'Energy Systems I: Thermodynamics' },
  { dept: 'ME',      number: '371',   name: 'Combustion Fundamentals' },
  { dept: 'ME',      number: '485',   name: 'Modeling and Simulation of Human Movement' },
  { dept: 'PHYSICS', number: '240',   name: 'Introduction to the Physics of Energy' },
];

export const ME_BS_2526: MajorConfig = {
  id: 'me-bs-2526',
  name: 'Mechanical Engineering (BS)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ME-BS/',
  category: 'major',
  totalMinUnits: 76,
  sections: [
    // ── Mathematics (min 24 units; combined Math+Science min 45 units) ─────────
    {
      id: 'math',
      name: 'Mathematics (min 24 units)',
      minUnits: 24,
      note: 'CME offerings strongly preferred. Math+Science combined minimum is 45 units. All letter-graded. 10 units AP Calculus BC substitutes for MATH 19+20+21.',
      slots: [
        { id: 'calc1', label: 'Calculus I', type: 'required',
          options: [{ dept: 'MATH', number: '19' }] },
        { id: 'calc2', label: 'Calculus II', type: 'required',
          options: [{ dept: 'MATH', number: '20' }] },
        { id: 'calc3', label: 'Calculus III', type: 'required',
          options: [{ dept: 'MATH', number: '21' }] },
        { id: 'vector-calc', label: 'Vector Calculus', type: 'pick-one',
          options: [
            { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },

            { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ] },
        { id: 'ode', label: 'Ordinary Differential Equations', type: 'pick-one',
          options: [
            { dept: 'CME', number: '102', name: 'ODE for Engineers' },

            { dept: 'MATH', number: '53', name: 'Differential Equations with Linear Algebra' },
          ] },
        { id: 'lin-or-stats', label: 'Linear Algebra OR Statistics', type: 'pick-one',
          note: 'Pick either Linear Algebra or Statistics to satisfy this slot.',
          options: [
            { dept: 'CME',    number: '104',  name: 'Linear Algebra and PDEs for Engineers' },

            { dept: 'ENGR',   number: '108',  name: 'Introduction to Matrix Methods' },
            { dept: 'CME',    number: '106',  name: 'Probability and Statistics for Engineers' },

            { dept: 'STATS',  number: '110',  name: 'Statistics for Engineering and the Sciences' },
            { dept: 'STATS',  number: '117',  name: 'Introduction to Probability Theory' },
          ] },
        { id: 'math-add', label: 'Additional Math (to reach 45-unit Math+Science min)', type: 'pick-from-list', count: 1,
          optional: true,
          note: 'Take as many additional math/science courses as needed to reach the 45-unit combined minimum.',
          options: [
            { dept: 'ENGR', number: '108',   name: 'Introduction to Matrix Methods' },
            { dept: 'CME',  number: '104',   name: 'Linear Algebra and PDEs for Engineers' },
            { dept: 'CME',  number: '108',   name: 'Introduction to Scientific Computing' },
            { dept: 'CME',  number: '192',   name: 'MATLAB for Scientific Computing and Engineering' },
            { dept: 'MATH', number: '61CM',  name: 'Modern Mathematics: Continuous Methods' },
            { dept: 'MATH', number: '61DM',  name: 'Modern Mathematics: Discrete Methods' },
            { dept: 'CEE',  number: '101D',  name: 'Computations in Civil and Environmental Engineering' },
            { dept: 'CEE',  number: '201D',  name: 'Computations in Civil and Environmental Engineering' },
            { dept: 'CS',   number: '103',   name: 'Mathematical Foundations of Computing' },
            { dept: 'ENGR', number: '62',    name: 'Introduction to Optimization' },
            { dept: 'MS&E', number: '111',   name: 'Introduction to Optimization' },
            { dept: 'ENGR', number: '62X',   name: 'Introduction to Optimization (Accelerated)' },
            { dept: 'MS&E', number: '111X',  name: 'Introduction to Optimization (Accelerated)' },
            { dept: 'MATH', number: '104',   name: 'Applied Matrix Theory' },
            { dept: 'MATH', number: '106',   name: 'Functions of a Complex Variable' },
            { dept: 'MATH', number: '109',   name: 'Groups and Symmetry' },
            { dept: 'MATH', number: '110',   name: 'Number Theory for Cryptography' },
            { dept: 'MATH', number: '113',   name: 'Linear Algebra and Matrix Theory' },
            { dept: 'MATH', number: '115',   name: 'Functions of a Real Variable' },
            { dept: 'MATH', number: '120',   name: 'Groups and Rings' },
            { dept: 'MATH', number: '121',   name: 'Galois Theory' },
            { dept: 'MATH', number: '131P',  name: 'Partial Differential Equations' },
            { dept: 'MS&E', number: '121',   name: 'Introduction to Stochastic Modeling' },
            { dept: 'STATS', number: '160',  name: 'Introduction to Statistical Methods: Precalculus' },
            { dept: 'CS',   number: '109',   name: 'Introduction to Probability for Computer Scientists' },
            { dept: 'EE',   number: '178',   name: 'Probabilistic Systems Analysis' },
            { dept: 'MATH', number: '151',   name: 'Introduction to Probability Theory' },
            { dept: 'MS&E', number: '120',   name: 'Introduction to Probability' },
            { dept: 'MS&E', number: '125',   name: 'Introduction to Applied Statistics' },
            { dept: 'CEE',  number: '203',   name: 'Probabilistic Models in Civil and Environmental Engineering' },
          ] },
      ],
    },

    // ── Science (min 20 units; combined Math+Science min 45 units) ────────────
    {
      id: 'science',
      name: 'Science (min 20 units)',
      minUnits: 20,
      note: 'AP Physics 1&2 and Physics 20 courses are NOT allowed. ACE units do not count.',
      slots: [
        { id: 'mechanics', label: 'Mechanics', type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '41',  name: 'Mechanics' },
            { dept: 'PHYSICS', number: '41E', name: 'Mechanics, Concepts, Calculations, and Context' },
            { dept: 'PHYSICS', number: '61',  name: 'Mechanics and Special Relativity' },
          ] },
        { id: 'em', label: 'Electricity and Magnetism', type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' },
            { dept: 'PHYSICS', number: '81', name: 'Electricity and Magnetism Using Special Relativity' },
          ] },
        { id: 'sci-elec', label: 'Additional Science (to meet 20-unit / 45-unit minimums)', type: 'pick-from-list', count: 2,
          note: 'Take additional science courses as needed. AP Physics 1&2 and Physics 20 NOT allowed.',
          options: [
            { dept: 'BIO',      number: '81',  name: 'Introduction to Ecology' },
            { dept: 'BIO',      number: '82',  name: 'Genetics' },
            { dept: 'BIO',      number: '83',  name: 'Biochemistry & Molecular Biology' },
            { dept: 'BIO',      number: '84',  name: 'Physiology' },
            { dept: 'BIO',      number: '85',  name: 'Evolution' },
            { dept: 'BIO',      number: '86',  name: 'Cell Biology' },
            { dept: 'CHEM',     number: '31A', name: 'Chemical Principles I' },
            { dept: 'CHEM',     number: '31B', name: 'Chemical Principles II' },
            { dept: 'CHEM',     number: '33',  name: 'Structure and Reactivity of Carbon-Based Molecules' },
            { dept: 'EARTHSYS', number: '10',  name: 'Introduction to Earth Systems' },
            { dept: 'PHYSICS',  number: '42',  name: 'Classical Mechanics Laboratory' },
            { dept: 'PHYSICS',  number: '44',  name: 'Electricity and Magnetism Lab' },
            { dept: 'PHYSICS',  number: '45',  name: 'Light and Heat' },
            { dept: 'PHYSICS',  number: '71',  name: 'Quantum and Thermal Physics' },
          ] },
      ],
    },

    // ── Technology in Society ──────────────────────────────────────────────────
    {
      id: 'tis',
      name: 'Technology in Society',
      minCourses: 1,
      slots: [
        { id: 'tis-course', label: 'TiS Course', type: 'pick-from-list', count: 1,
          note: 'ENERGY 177A and 177B must both be taken if choosing the Energy option.',
          options: [
            { dept: 'AA',     number: '252',  name: 'Techniques of Failure Analysis' },
            { dept: 'BIOE',   number: '131',  name: 'Ethics in Bioengineering' },
            { dept: 'COMM',   number: '120W', name: 'The Rise of Digital Culture' },
            { dept: 'CS',     number: '181',  name: 'Computers, Ethics, and Public Policy' },
            { dept: 'ENERGY', number: '177A', name: 'Engineering and Sustainable Development: Toolkit (take with 177B)' },
            { dept: 'ENERGY', number: '177B', name: 'Engineering and Sustainable Development: Implementation (take with 177A)' },
            { dept: 'EPS',    number: '194',  name: 'Technology, National Security, and Sustainability' },
            { dept: 'HUMBIO', number: '174',  name: 'Foundations of Bioethics' },
            { dept: 'NBIO',   number: '101',  name: 'Social and Ethical Issues in the Neurosciences' },
          ],
        },
      ],
    },

    // ── Engineering Fundamentals ───────────────────────────────────────────────
    {
      id: 'engr-fund',
      name: 'Engineering Fundamentals',
      note: 'CS 106A or CS 106B taken in 1st year; ENGR 14 taken in Winter of 2nd year or earlier.',
      slots: [
        { id: 'programming', label: 'Programming', type: 'pick-one',
          options: [
            { dept: 'CS', number: '106A', name: 'Programming Methodology' },
            { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
          ] },
        { id: 'engr14', label: 'Intro to Solid Mechanics', type: 'required',
          options: [{ dept: 'ENGR', number: '14', name: 'Intro to Solid Mechanics' }] },
      ],
    },

    // ── ME Depth in Discipline ─────────────────────────────────────────────────
    // All courses must be taken in prerequisite order.
    {
      id: 'structures-dyn',
      name: 'Structures, Dynamics and Control',
      slots: [
        { id: 'sdc1', label: 'Mechanics of Materials', type: 'required',
          options: [{ dept: 'ME', number: '80', name: 'Mechanics of Materials' }] },
        { id: 'sdc2', label: 'Dynamics', type: 'required',
          options: [{ dept: 'ENGR', number: '15', name: 'Dynamics' }] },
        { id: 'sdc3', label: 'Dynamic Systems, Vibrations and Control', type: 'required',
          options: [{ dept: 'ME', number: '161', name: 'Dynamic Systems, Vibrations and Control' }] },
      ],
    },
    {
      id: 'thermo-fluids',
      name: 'Thermodynamics, Fluids, and Heat Transfer',
      slots: [
        { id: 'thermo', label: 'Engineering Thermodynamics', type: 'required',
          options: [{ dept: 'ME', number: '30', name: 'Engineering Thermodynamics' }] },
        { id: 'fluids', label: 'Introductory Fluids Engineering', type: 'required',
          options: [{ dept: 'ME', number: '70', name: 'Introductory Fluids Engineering' }] },
        { id: 'heat', label: 'Heat Transfer', type: 'required',
          options: [{ dept: 'ME', number: '131', name: 'Heat Transfer' }] },
      ],
    },
    {
      id: 'design-mfg',
      name: 'Design and Manufacturing',
      slots: [
        { id: 'design1', label: 'Foundations of Product Realization', type: 'required',
          options: [{ dept: 'ME', number: '102', name: 'Foundations of Product Realization' }] },
        { id: 'design2', label: 'Product Realization: Design and Making', type: 'required',
          options: [{ dept: 'ME', number: '103', name: 'Product Realization: Design and Making' }] },
        { id: 'design3', label: 'Mechanical Systems Design', type: 'required',
          options: [{ dept: 'ME', number: '104', name: 'Mechanical Systems Design' }] },
      ],
    },
    {
      id: 'comp-exp',
      name: 'Computational and Experimental Synthesis',
      slots: [
        { id: 'comp', label: 'Computational Engineering', type: 'required',
          options: [{ dept: 'ME', number: '123', name: 'Computational Engineering' }] },
        { id: 'exp', label: 'Mechanical Measurements', type: 'required',
          options: [{ dept: 'ME', number: '149', name: 'Mechanical Measurements' }] },
      ],
    },
    {
      id: 'capstone',
      name: 'Capstone Design (WIM)',
      note: 'Two-quarter sequence; must be taken in consecutive quarters. Both courses satisfy WIM.',
      slots: [
        { id: 'cap1', label: 'ME 170A: Capstone Design I', type: 'required',
          options: [{ dept: 'ME', number: '170A', name: 'ME Design: Integrating Context with Engineering' }] },
        { id: 'cap2', label: 'ME 170B: Capstone Design II', type: 'required',
          options: [{ dept: 'ME', number: '170B', name: 'ME Design: Integrating Context with Engineering' }] },
      ],
    },

    // ── Technical Electives (min 12 units) ────────────────────────────────────
    {
      id: 'tech-elec',
      name: 'Technical Electives (min 12 units)',
      minUnits: 12,
      unitOnly: true,
      note: 'Only 3 units total from ME 170C and/or ME 191 may count. ME 191 units require advance petition. ABET: Fundamentals + Depth + Tech Electives must total ≥ 68 units.',
      slots: [
        { id: 'tech-elec-courses', label: 'Technical Electives', type: 'any-approved',
          options: TECH_ELECTIVES,
          note: 'See bulletin for career-aligned recommendations.' },
      ],
    },
  ],

  wimCourses: [
    { dept: 'ME', number: '170A', name: 'ME Design: Integrating Context with Engineering' },
    { dept: 'ME', number: '170B', name: 'ME Design: Integrating Context with Engineering' },
  ],
};
