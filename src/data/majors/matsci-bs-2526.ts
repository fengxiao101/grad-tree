import type { MajorConfig, CourseOption, MajorSection } from '../majorSchema';

function focusSection(id: string, name: string, courses: CourseOption[]): MajorSection {
  return {
    id: `${id}-courses`,
    name: `${name} Focus Area Courses (≥3 courses, ≥9 units)`,
    minUnits: 9,
    note: 'At least one course must be a MATSCI course. Each course must be ≥3 units; seminars do not count. Self-defined focus area requires a program deviation form (available on MATSCI website).',
    slots: [
      {
        id: `${id}-pick`,
        label: 'Focus Area Courses',
        type: 'pick-from-list',
        count: 3,
        options: courses,
      },
    ],
  };
}

const TIS_COURSES: CourseOption[] = [
  { dept: 'AA', number: '252', name: 'Techniques of Failure Analysis' },
  { dept: 'ANTHRO', number: '132C', name: 'Technology and Inequality' },
  { dept: 'ARCHLGY', number: '151', name: 'Ten Things: An Archaeology of Design' },
  { dept: 'BIOE', number: '131', name: 'Ethics in Bioengineering' },
  { dept: 'CEE', number: '102A', name: 'Legal / Ethical Principles in Design, Construction, Project Delivery' },
  { dept: 'CEE', number: '145E', name: 'Equitable Infrastructure Solutions' },
  { dept: 'CLASSICS', number: '168', name: 'Engineering the Roman Empire' },
  { dept: 'CLASSICS', number: '182', name: 'Ancient Greece in the Modern West: History, Politics, and Classics' },
  { dept: 'COMM', number: '120W', name: 'The Rise of Digital Culture' },
  { dept: 'COMM', number: '166', name: 'Virtual People' },
  { dept: 'CS', number: '125', name: 'Data: Algorithms, Tools, Policy, and Society' },
  { dept: 'CS', number: '152', name: 'Trust and Safety' },
  { dept: 'CS', number: '181', name: 'Computers, Ethics, and Public Policy' },
  { dept: 'CS', number: '181W', name: 'Computers, Ethics, and Public Policy (WIM)' },
  { dept: 'CS', number: '256', name: 'Algorithmic Fairness' },
  { dept: 'CS', number: '278', name: 'Social Computing' },
  { dept: 'DATASCI', number: '154', name: 'Data Science for Social Impact' },
  { dept: 'EARTHSYS', number: '125', name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'ENGR', number: '117', name: 'Expanding Engineering Limits: Culture, Diversity, and Equity' },
  { dept: 'ENGR', number: '145', name: 'Technology Entrepreneurship' },
  { dept: 'ENGR', number: '148', name: 'Principled Entrepreneurial Decisions' },
  { dept: 'HUMBIO', number: '174', name: 'Foundations of Bioethics' },
  { dept: 'ME', number: '267', name: 'Ethics and Equity in Transportation Systems' },
  { dept: 'MS&E', number: '193', name: 'Technology and National Security' },
  { dept: 'POLISCI', number: '114S', name: 'International Security in a Changing World' },
  { dept: 'PUBLPOL', number: '134', name: 'Ethics on the Edge: Business, Non-Profit Organizations, Government, and Individuals' },
  { dept: 'STS', number: '1', name: 'Introduction to Science, Technology & Society' },
  { dept: 'STS', number: '115', name: 'The Ethics of Developing Life-Saving Technologies for Children' },
];

const SOE_SECOND: CourseOption[] = [
  { dept: 'CS', number: '106A', name: 'Programming Methodology' },
  { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
  { dept: 'ENGR', number: '10', name: 'Introduction to Engineering Analysis' },
  { dept: 'ENGR', number: '14', name: 'Intro to Solid Mechanics' },
  { dept: 'ENGR', number: '15', name: 'Dynamics' },
  { dept: 'ENGR', number: '20', name: 'Introduction to Chemical Engineering' },
  { dept: 'ENGR', number: '21', name: 'Engineering of Systems' },
  { dept: 'ENGR', number: '40A', name: 'Introductory Electronics' },
  { dept: 'ENGR', number: '40M', name: 'An Intro to Making: What is EE' },
  { dept: 'ENGR', number: '42', name: 'Introduction to Electromagnetics and Its Applications' },
  { dept: 'ENGR', number: '50', name: 'Introduction to Materials Science, Nanotechnology Emphasis' },
  { dept: 'ENGR', number: '50E', name: 'Introduction to Materials Science, Energy Emphasis' },
  { dept: 'ENGR', number: '50M', name: 'Introduction to Materials Science, Biomaterials Emphasis' },
  { dept: 'ENGR', number: '55', name: 'Foundational Biology for Engineers' },
  { dept: 'ENGR', number: '60', name: 'Engineering Economics and Sustainability' },
  { dept: 'ENGR', number: '62', name: 'Introduction to Optimization' },
  { dept: 'ENGR', number: '65', name: 'Modern Physics for Engineers' },
  { dept: 'ENGR', number: '76', name: 'Information Science and Engineering' },
  { dept: 'ENGR', number: '80', name: 'Introduction to Bioengineering (Engineering Living Matter)' },
  { dept: 'ENGR', number: '90', name: 'Environmental Science and Technology' },
];

const SCI_ADDITIONAL: CourseOption[] = [
  { dept: 'BIO', number: '30', name: 'Ecology for Everyone' },
  { dept: 'BIO', number: '45', name: 'Introduction to Laboratory Research in Cell and Molecular Biology' },
  { dept: 'BIO', number: '47', name: 'Introduction to Research in Ecology and Evolutionary Biology' },
  { dept: 'BIO', number: '81', name: 'Introduction to Ecology' },
  { dept: 'BIO', number: '82', name: 'Genetics' },
  { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
  { dept: 'BIO', number: '84', name: 'Physiology' },
  { dept: 'BIO', number: '85', name: 'Evolution' },
  { dept: 'BIO', number: '86', name: 'Cell Biology' },
  { dept: 'BIO', number: '150', name: 'Human Behavioral Biology' },
  { dept: 'CEE', number: '63', name: 'Weather and Storms' },
  { dept: 'CEE', number: '64', name: 'Air Pollution and Global Warming: History, Science, and Solutions' },
  { dept: 'CEE', number: '70', name: 'Environmental Science and Technology' },
  { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
  { dept: 'CHEM', number: '31B', name: 'Chemical Principles II' },
  { dept: 'CHEM', number: '31E', name: 'Chemical Foundations and 21st Century Problems' },
  { dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' },
  { dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' },
  { dept: 'CHEM', number: '123', name: 'Organic Polyfunctional Compounds' },
  { dept: 'EARTHSYS', number: '10', name: 'Introduction to Earth Systems' },
  { dept: 'EPS', number: '1', name: 'Introduction to Geology' },
  { dept: 'PHYSICS', number: '41', name: 'Mechanics' },
  { dept: 'PHYSICS', number: '41E', name: 'Mechanics, Concepts, Calculations, and Context' },
  { dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' },
  { dept: 'PHYSICS', number: '45', name: 'Light and Heat' },
  { dept: 'PHYSICS', number: '61', name: 'Mechanics and Special Relativity' },
  { dept: 'PHYSICS', number: '71', name: 'Quantum and Thermal Physics' },
  { dept: 'PHYSICS', number: '81', name: 'Electricity and Magnetism Using Special Relativity and Vector Calculus' },
];

const DEPTH_COURSES: CourseOption[] = [
  { dept: 'MATSCI', number: '160', name: 'Nanomaterials Design' },
  { dept: 'MATSCI', number: '161', name: 'Energy Materials Laboratory' },
  { dept: 'MATSCI', number: '162', name: 'X-Ray Diffraction Laboratory' },
  { dept: 'MATSCI', number: '163', name: 'Mechanical Behavior Laboratory' },
  { dept: 'MATSCI', number: '164', name: 'Electronic and Photonic Materials and Devices Laboratory' },
  { dept: 'MATSCI', number: '165', name: 'Nanoscale Materials Physics Computation Laboratory' },
  { dept: 'MATSCI', number: '166', name: 'Data Science and Machine Learning Approaches in Chemical and Materials Engineering' },
];

const FOCUS_BIO: CourseOption[] = [
  { dept: 'APPPHYS', number: '205', name: 'Introduction to Biophysics' },
  { dept: 'BIOE', number: '80', name: 'Introduction to Bioengineering (Engineering Living Matter)' },
  { dept: 'BIOE', number: '220', name: 'Introduction to Imaging and Image-based Human Anatomy' },
  { dept: 'BIOE', number: '231', name: 'Protein Engineering' },
  { dept: 'BIOE', number: '260', name: 'Tissue Engineering' },
  { dept: 'BIOE', number: '279', name: 'Computational Biology: Structure and Organization of Biomolecules and Cells' },
  { dept: 'BIOE', number: '281', name: 'Biomechanics of Movement' },
  { dept: 'BIOE', number: '282', name: 'Introduction to Biomechanics and Mechanobiology' },
  { dept: 'ENGR', number: '55', name: 'Foundational Biology for Engineers' },
  { dept: 'MATSCI', number: '190', name: 'Organic and Biological Materials' },
  { dept: 'MATSCI', number: '225', name: 'Biochips and Medical Imaging' },
  { dept: 'MATSCI', number: '333', name: 'Soft Composites and Soft Robotics' },
  { dept: 'MATSCI', number: '381', name: 'Biomaterials in Regenerative Medicine' },
  { dept: 'MATSCI', number: '384', name: 'Materials Advances in Neurotechnology' },
  { dept: 'MATSCI', number: '385', name: 'Biomaterials for Drug Delivery' },
];

const FOCUS_CHEM: CourseOption[] = [
  { dept: 'CHEM', number: '126', name: 'Synthesis Laboratory' },
  { dept: 'CHEM', number: '171', name: 'Foundations of Physical Chemistry' },
  { dept: 'CHEM', number: '175', name: 'Physical Chemistry III' },
  { dept: 'CHEMENG', number: '110B', name: 'Statistical and Multi-Component Thermodynamics' },
  { dept: 'CHEMENG', number: '120B', name: 'Energy and Mass Transport' },
  { dept: 'CHEMENG', number: '130A', name: 'Microkinetics - Molecular Principles of Chemical Kinetics' },
  { dept: 'CHEMENG', number: '140', name: 'Micro and Nanoscale Fabrication Engineering' },
  { dept: 'CHEMENG', number: '150', name: 'Biochemical Engineering' },
  { dept: 'CHEMENG', number: '174', name: 'Environmental Microbiology I' },
  { dept: 'CHEMENG', number: '175X', name: 'Electrochemical Water Treatment: Materials and Processes' },
  { dept: 'MATSCI', number: '181', name: 'Thermodynamics and Phase Equilibria' },
  { dept: 'MATSCI', number: '182', name: 'Rate Processes in Materials' },
];

const FOCUS_COMP: CourseOption[] = [
  { dept: 'CHEM', number: '161', name: 'Computational Chemistry' },
  { dept: 'CHEM', number: '263', name: 'Machine Learning for Chemical and Dynamical Data' },
  { dept: 'CME', number: '107', name: 'Introduction to Machine Learning' },
  { dept: 'CME', number: '108', name: 'Introduction to Scientific Computing' },
  { dept: 'CME', number: '216', name: 'Machine Learning for Computational Engineering' },
  { dept: 'CME', number: '322', name: 'Spectral Methods in Computational Physics' },
  { dept: 'CS', number: '129', name: 'Applied Machine Learning' },
  { dept: 'MATSCI', number: '165', name: 'Nanoscale Materials Physics Computation Laboratory' },
  { dept: 'MATSCI', number: '166', name: 'Data Science and Machine Learning Approaches in Chemical and Materials Engineering' },
  { dept: 'MATSCI', number: '331', name: 'Computational Materials Science at the Atomic Scale' },
  { dept: 'ME', number: '123', name: 'Computational Engineering' },
  { dept: 'ME', number: '335A', name: 'Finite Element Analysis' },
  { dept: 'ME', number: '346B', name: 'Introduction to Molecular Simulations' },
  { dept: 'PHYSICS', number: '113', name: 'Computational Physics' },
];

const FOCUS_EPHOTON: CourseOption[] = [
  { dept: 'APPPHYS', number: '201', name: 'Electrons and Photons' },
  { dept: 'APPPHYS', number: '204', name: 'Quantum Materials' },
  { dept: 'EE', number: '101A', name: 'Circuits I' },
  { dept: 'EE', number: '102A', name: 'Signals and Systems I' },
  { dept: 'EE', number: '116', name: 'Semiconductor Devices for Energy and Electronics' },
  { dept: 'EE', number: '117', name: 'Understanding the Sensors in your Smartphone' },
  { dept: 'EE', number: '134', name: 'Introduction to Photonics' },
  { dept: 'EE', number: '153', name: 'Power Electronics' },
  { dept: 'EE', number: '157', name: 'Electric Motors for Renewable Energy, Robotics, and Electric Vehicles' },
  { dept: 'EE', number: '212', name: 'Integrated Circuit Fabrication Processes' },
  { dept: 'EE', number: '216', name: 'Principles and Models of Semiconductor Devices' },
  { dept: 'EE', number: '218', name: 'Power Semiconductor Devices and Technology' },
  { dept: 'EE', number: '222', name: 'Applied Quantum Mechanics I' },
  { dept: 'EE', number: '223', name: 'Applied Quantum Mechanics II' },
  { dept: 'ENGR', number: '240', name: 'Introduction to Micro and Nano Electromechanical Systems' },
  { dept: 'ENGR', number: '241', name: 'Advanced Micro and Nano Fabrication Laboratory' },
  { dept: 'MATSCI', number: '152', name: 'Electronic Materials Engineering' },
  { dept: 'MATSCI', number: '199', name: 'Electronic and Optical Properties of Solids' },
  { dept: 'MATSCI', number: '317', name: 'Defects in Semiconductors' },
  { dept: 'MATSCI', number: '341', name: 'Quantum Theory of Electronic and Optical Excitations in Materials' },
  { dept: 'MATSCI', number: '346', name: 'Nanophotonics' },
  { dept: 'ME', number: '210', name: 'Introduction to Mechatronics' },
  { dept: 'ME', number: '220', name: 'Introduction to Sensors' },
];

const FOCUS_ENERGY: CourseOption[] = [
  { dept: 'BIOS', number: '255', name: 'Solar Energy Conversion and Storage' },
  { dept: 'CEE', number: '107A', name: 'Understand Energy' },
  { dept: 'CHEM', number: '174', name: 'Electrochem Lab: Measuring the Invisible' },
  { dept: 'EE', number: '116', name: 'Semiconductor Devices for Energy and Electronics' },
  { dept: 'EE', number: '153', name: 'Power Electronics' },
  { dept: 'EE', number: '237', name: 'Solar Energy Conversion' },
  { dept: 'EE', number: '293B', name: 'Fundamentals of Energy Processes' },
  { dept: 'ENERGY', number: '102', name: 'Fundamentals of Renewable Power' },
  { dept: 'ENERGY', number: '153', name: 'Carbon Capture and Sequestration' },
  { dept: 'ENERGY', number: '201C', name: 'Energy Storage and Conversion Systems: Solar Cells, Fuel Cells, Batteries' },
  { dept: 'ENERGY', number: '295', name: 'Electrochemical Energy Storage Systems: Modeling and Estimation' },
  { dept: 'MATSCI', number: '156', name: 'Solar Cells, Fuel Cells, and Batteries: Materials for the Energy Solution' },
  { dept: 'MATSCI', number: '302', name: 'Solar Cells' },
  { dept: 'MATSCI', number: '303', name: 'Principles, Materials and Devices of Batteries' },
  { dept: 'PHYSICS', number: '199', name: 'The Physics of Energy and Climate Change' },
  { dept: 'PHYSICS', number: '240', name: 'Introduction to the Physics of Energy' },
];

const FOCUS_CHAR: CourseOption[] = [
  { dept: 'AA', number: '252', name: 'Techniques of Failure Analysis' },
  { dept: 'APPPHYS', number: '201', name: 'Electrons and Photons' },
  { dept: 'APPPHYS', number: '222', name: 'Principles of X-ray Scattering' },
  { dept: 'BIOE', number: '220', name: 'Introduction to Imaging and Image-based Human Anatomy' },
  { dept: 'BIO', number: '232', name: 'Advanced Imaging Lab in Biophysics' },
  { dept: 'CEE', number: '192', name: 'Laboratory Characterization of Properties of Rocks and Geomaterials' },
  { dept: 'CHEM', number: '131', name: 'Instrumental Analysis Principles and Practice' },
  { dept: 'CHEM', number: '174', name: 'Electrochem Lab: Measuring the Invisible' },
  { dept: 'CHEM', number: '176', name: 'Spectroscopy Laboratory' },
  { dept: 'CHEMENG', number: '345', name: 'Fundamentals and Applications of Spectroscopy' },
  { dept: 'MATSCI', number: '236', name: 'An Introduction to Quantitative X-ray Microanalysis' },
  { dept: 'MATSCI', number: '320', name: 'Nanocharacterization of Materials' },
  { dept: 'MATSCI', number: '321', name: 'Transmission Electron Microscopy' },
  { dept: 'MATSCI', number: '322', name: 'Transmission Electron Microscopy Laboratory' },
  { dept: 'MATSCI', number: '323', name: 'Thin Film and Interface Microanalysis' },
  { dept: 'MATSCI', number: '324', name: 'Optics of Microscope Design for Materials' },
  { dept: 'MATSCI', number: '326', name: 'X-Ray Science and Techniques' },
  { dept: 'MATSCI', number: '327', name: 'Transmission Electron Microscopy Analysis and Simulation' },
  { dept: 'ME', number: '149', name: 'Mechanical Measurements' },
];

const FOCUS_MECH: CourseOption[] = [
  { dept: 'AA', number: '240', name: 'Analysis of Structures' },
  { dept: 'AA', number: '256', name: 'Mechanics of Composites' },
  { dept: 'AA', number: '280', name: 'Smart Structures' },
  { dept: 'CEE', number: '305', name: 'Damage and Failure Mechanics of Structural Systems' },
  { dept: 'CHEMENG', number: '140', name: 'Micro and Nanoscale Fabrication Engineering' },
  { dept: 'CHEMENG', number: '170X', name: 'Mechanics of Soft Matter: Rheology' },
  { dept: 'ENGR', number: '240', name: 'Introduction to Micro and Nano Electromechanical Systems' },
  { dept: 'ENGR', number: '241', name: 'Advanced Micro and Nano Fabrication Laboratory' },
  { dept: 'MATSCI', number: '151', name: 'Microstructure and Mechanical Properties' },
  { dept: 'MATSCI', number: '163', name: 'Mechanical Behavior Laboratory' },
  { dept: 'MATSCI', number: '183', name: 'Defects and Disorder in Materials' },
  { dept: 'MATSCI', number: '198', name: 'Mechanical Properties of Materials' },
  { dept: 'MATSCI', number: '312', name: 'New Methods in Thin Film Synthesis' },
  { dept: 'MATSCI', number: '358', name: 'Fracture and Fatigue of Materials and Thin Film Structures' },
  { dept: 'ME', number: '127', name: 'Design for Additive Manufacturing' },
  { dept: 'ME', number: '129', name: 'Manufacturing Processes and Design' },
  { dept: 'ME', number: '152', name: 'Material Behaviors and Failure Prediction' },
  { dept: 'ME', number: '303', name: 'Soft Composites and Soft Robotics' },
  { dept: 'ME', number: '335A', name: 'Finite Element Analysis' },
  { dept: 'ME', number: '340', name: 'Mechanics - Elasticity and Inelasticity' },
  { dept: 'ME', number: '345', name: 'Fatigue Design and Analysis' },
  { dept: 'ME', number: '348', name: 'Experimental Stress Analysis' },
];

const FOCUS_PHYS: CourseOption[] = [
  { dept: 'APPPHYS', number: '201', name: 'Electrons and Photons' },
  { dept: 'APPPHYS', number: '203', name: 'Atoms, Fields and Photons' },
  { dept: 'APPPHYS', number: '204', name: 'Quantum Materials' },
  { dept: 'EE', number: '222', name: 'Applied Quantum Mechanics I' },
  { dept: 'EE', number: '223', name: 'Applied Quantum Mechanics II' },
  { dept: 'MATSCI', number: '184', name: 'Structure and Symmetry' },
  { dept: 'MATSCI', number: '185', name: 'Quantum Mechanics for Materials Science' },
  { dept: 'MATSCI', number: '195', name: 'Waves and Diffraction in Solids' },
  { dept: 'PHYSICS', number: '110', name: 'Advanced Mechanics' },
  { dept: 'PHYSICS', number: '120', name: 'Electromagnetism' },
  { dept: 'PHYSICS', number: '121', name: 'Electrodynamics' },
  { dept: 'PHYSICS', number: '130', name: 'Quantum Mechanics I' },
  { dept: 'PHYSICS', number: '131', name: 'Quantum Mechanics II' },
  { dept: 'PHYSICS', number: '134', name: 'Advanced Topics in Quantum Mechanics' },
  { dept: 'PHYSICS', number: '170', name: 'Thermodynamics, Kinetic Theory, and Statistical Mechanics I' },
  { dept: 'PHYSICS', number: '171', name: 'Thermodynamics, Kinetic Theory, and Statistical Mechanics II' },
  { dept: 'PHYSICS', number: '172', name: 'Solid State Physics' },
];

const FOCUS_NANO: CourseOption[] = [
  { dept: 'APPPHYS', number: '189', name: 'Physical Analysis of Artworks' },
  { dept: 'CHEMENG', number: '140X', name: 'Micro and Nanoscale Fabrication Engineering' },
  { dept: 'EE', number: '212', name: 'Integrated Circuit Fabrication Processes' },
  { dept: 'EE', number: '334', name: 'Micro and Nano Optical Device Design' },
  { dept: 'ENGR', number: '240', name: 'Introduction to Micro and Nano Electromechanical Systems' },
  { dept: 'ENGR', number: '241', name: 'Advanced Micro and Nano Fabrication Laboratory' },
  { dept: 'MATSCI', number: '160', name: 'Nanomaterials Design' },
  { dept: 'MATSCI', number: '320', name: 'Nanocharacterization of Materials' },
  { dept: 'MATSCI', number: '327', name: 'Transmission Electron Microscopy Analysis and Simulation' },
  { dept: 'MATSCI', number: '346', name: 'Nanophotonics' },
  { dept: 'MATSCI', number: '380', name: 'Nano-Biotechnology' },
];

export const MATSCI_BS_2526: MajorConfig = {
  id: 'matsci-bs-2526',
  name: 'Materials Science and Engineering (BS)',
  school: 'School of Engineering',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 98,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MATSC-BS/',
  wimCourses: [
    { dept: 'MATSCI', number: '160', name: 'Nanomaterials Design' },
    { dept: 'MATSCI', number: '161', name: 'Energy Materials Laboratory' },
    { dept: 'MATSCI', number: '162', name: 'X-Ray Diffraction Laboratory' },
    { dept: 'MATSCI', number: '164', name: 'Electronic and Photonic Materials and Devices Laboratory' },
  ],

  sections: [
    {
      id: 'matsci-math',
      name: 'Mathematics (part of 39-unit Math & Science combined minimum)',
      note: 'MATH 19/20/21 may be replaced by up to 10 units of AP/IB credit AND placement into MATH 51/CME 100 via Math Diagnostic. CME 106 or STATS 110 recommended for the statistics requirement.',
      slots: [
        {
          id: 'matsci-math19',
          label: 'MATH 19: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '19', name: 'Calculus' }],
        },
        {
          id: 'matsci-math20',
          label: 'MATH 20: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '20', name: 'Calculus' }],
        },
        {
          id: 'matsci-math21',
          label: 'MATH 21: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '21', name: 'Calculus' }],
        },
        {
          id: 'matsci-vector',
          label: 'Vector Calculus (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },

            { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ],
        },
        {
          id: 'matsci-ode',
          label: 'Ordinary Differential Equations (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '102', name: 'Ordinary Differential Equations for Engineers' },

            { dept: 'MATH', number: '53', name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' },
          ],
        },
        {
          id: 'matsci-stats',
          label: 'Statistics / Probability (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
            { dept: 'STATS', number: '110', name: 'Introduction to Statistics for Engineering and the Sciences' },
            { dept: 'CEE', number: '203', name: 'Probabilistic Models in Civil and Environmental Engineering' },
            { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
            { dept: 'EE', number: '178', name: 'Probabilistic Systems Analysis' },
            { dept: 'MATH', number: '151', name: 'Introduction to Probability Theory' },
            { dept: 'MS&E', number: '120', name: 'Introduction to Probability' },
            { dept: 'MS&E', number: '125', name: 'Introduction to Applied Statistics' },
            { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
            { dept: 'STATS', number: '116', name: 'Theory of Probability' },
          ],
          note: 'More advanced statistics courses numbered over 100 may be substituted via petition to deviate.',
        },
      ],
    },

    {
      id: 'matsci-science',
      name: 'Science (16-unit minimum, part of 39-unit Math & Science combined minimum)',
      note: 'Physics lab courses (PHYSICS 42/44/46/61L/71L/89L) do not count toward the additional course requirement but may count toward the 39-unit combined minimum. AP/IB credit acceptable with Dean\'s office approval.',
      slots: [
        {
          id: 'matsci-chem-intro',
          label: 'Introductory Chemistry (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
            { dept: 'CHEM', number: '31E', name: 'Chemical Foundations and 21st Century Problems' },
          ],
        },
        {
          id: 'matsci-phys-mech',
          label: 'Physics: Mechanics (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '41', name: 'Mechanics' },
            { dept: 'PHYSICS', number: '61', name: 'Mechanics and Special Relativity' },
          ],
        },
        {
          id: 'matsci-phys-em',
          label: 'Physics: Electricity & Magnetism (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' },
            { dept: 'PHYSICS', number: '81', name: 'Electricity and Magnetism Using Special Relativity and Vector Calculus' },
          ],
        },
        {
          id: 'matsci-sci-add',
          label: 'Additional Science Course (choose 1)',
          type: 'pick-from-list',
          count: 1,
          options: SCI_ADDITIONAL,
        },
      ],
    },

    {
      id: 'matsci-tis',
      name: 'Technology in Society (1 course, ≥3 units)',
      slots: [
        {
          id: 'matsci-tis-course',
          label: 'Technology in Society Course (choose 1)',
          type: 'pick-from-list',
          count: 1,
          options: TIS_COURSES,
        },
      ],
    },

    {
      id: 'matsci-soe-fund',
      name: 'School of Engineering Fundamentals (7-unit minimum)',
      note: 'ENGR 60 is online only. Only one of CS 106A and B counts toward this requirement. A second ENGR 50/50E/50M course (different from the first) may substitute for the second SoE Fundamental course.',
      slots: [
        {
          id: 'matsci-engr50',
          label: 'ENGR 50/50E/50M: Introduction to Materials Science (choose 1)',
          type: 'pick-one',
          options: [
            { dept: 'ENGR', number: '50', name: 'Introduction to Materials Science, Nanotechnology Emphasis' },
            { dept: 'ENGR', number: '50E', name: 'Introduction to Materials Science, Energy Emphasis' },
            { dept: 'ENGR', number: '50M', name: 'Introduction to Materials Science, Biomaterials Emphasis' },
          ],
        },
        {
          id: 'matsci-soe-second',
          label: 'Second SOE Fundamentals Course (choose 1)',
          type: 'pick-from-list',
          count: 1,
          options: SOE_SECOND,
        },
      ],
    },

    {
      id: 'matsci-fundamentals',
      name: 'Materials Science Fundamentals (25-unit minimum)',
      note: 'Substitutions for MATSCI 140-series required courses and 150-series elective courses will NOT be permitted.',
      slots: [
        {
          id: 'matsci-131',
          label: 'MATSCI 131: Materials Scientists in Training',
          type: 'required',
          options: [{ dept: 'MATSCI', number: '131', name: 'Materials Scientists in Training' }],
        },
        {
          id: 'matsci-142',
          label: 'MATSCI 142: Quantum Mechanics of Nanoscale Materials',
          type: 'required',
          options: [{ dept: 'MATSCI', number: '142', name: 'Quantum Mechanics of Nanoscale Materials' }],
        },
        {
          id: 'matsci-143',
          label: 'MATSCI 143: Materials Structure and Characterization',
          type: 'required',
          options: [{ dept: 'MATSCI', number: '143', name: 'Materials Structure and Characterization' }],
        },
        {
          id: 'matsci-144',
          label: 'MATSCI 144: Thermodynamic Evaluation of Green Energy Technologies',
          type: 'required',
          options: [{ dept: 'MATSCI', number: '144', name: 'Thermodynamic Evaluation of Green Energy Technologies' }],
        },
        {
          id: 'matsci-145',
          label: 'MATSCI 145: Kinetics of Materials Synthesis',
          type: 'required',
          options: [{ dept: 'MATSCI', number: '145', name: 'Kinetics of Materials Synthesis' }],
        },
        {
          id: 'matsci-150series',
          label: 'MATSCI 150-series Electives (choose 2 of MATSCI 151/152/156)',
          type: 'pick-from-list',
          count: 2,
          options: [
            { dept: 'MATSCI', number: '151', name: 'Microstructure and Mechanical Properties' },
            { dept: 'MATSCI', number: '152', name: 'Electronic Materials Engineering' },
            { dept: 'MATSCI', number: '156', name: 'Solar Cells, Fuel Cells, and Batteries: Materials for the Energy Solution' },
          ],
          note: 'Students preparing for graduate study are encouraged to take all three.',
        },
      ],
    },

    {
      id: 'matsci-depth',
      name: 'Materials Science & Engineering Depth: Lab Courses (≥4 courses, 15 units)',
      allowDoubleCount: true,
      note: 'At least one of the four lab courses must be a WIM course: MATSCI 160, 161, 162, or 164. One course from this section may overlap with a focus area course.',
      slots: [
        {
          id: 'matsci-depth-labs',
          label: 'Depth Lab Courses: includes ≥1 WIM (choose ≥4)',
          type: 'pick-from-list',
          count: 4,
          options: DEPTH_COURSES,
        },
      ],
    },

    {
      id: 'matsci-focus-selector',
      name: 'Focus Area (choose 1 of 9 tracks or self-defined)',
      trackSelector: true,
      note: 'Select ≥3 courses (≥9 units) from one focus area track. At least one must be a MATSCI course. Each course must be ≥3 units; seminars do not count. Self-defined focus area requires submission of a program deviation form (available on the MATSCI website) with your final program sheet.',
      slots: [],
    },

    {
      id: 'matsci-capstone',
      name: 'Capstone Experience (choose 1 track)',
      note: 'Complete one of two capstone tracks. Students in the research track are expected to present at the annual Materials Science and Engineering Research Symposium or an approved alternative public oral/poster presentation.',
      slots: [],
      pickOneGroup: [
        {
          id: 'matsci-cap-course',
          name: 'Course-Based Track: 2 of MATSCI 161/163/165',
          note: 'MATSCI 161 and 165 also appear in the Depth lab list.',
          slots: [
            {
              id: 'matsci-cap-course-pick',
              label: 'MATSCI 161/163/165: Capstone Lab Courses (pick 2)',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'MATSCI', number: '161', name: 'Energy Materials Laboratory' },
                { dept: 'MATSCI', number: '163', name: 'Mechanical Behavior Laboratory' },
                { dept: 'MATSCI', number: '165', name: 'Nanoscale Materials Physics Computation Laboratory' },
              ],
            },
          ],
        },
        {
          id: 'matsci-cap-research',
          name: 'Research-Based Track: ≥6 units MATSCI 150',
          note: 'Must complete at least two consecutive quarters with the same research group, totaling ≥6 units. Honors Program strongly recommended.',
          slots: [
            { id: 'matsci-cap-research-150', label: 'MATSCI 150: Undergraduate Research (≥6 units, 2+ consecutive quarters)', type: 'required', options: [{ dept: 'MATSCI', number: '150', name: 'Undergraduate Research' }] },
          ],
        },
      ],
    },
  ],

  tracks: [
    {
      id: 'biological-properties',
      name: 'Biological Properties of Materials',
      sections: [focusSection('bio', 'Biological Properties of Materials', FOCUS_BIO)],
    },
    {
      id: 'chemical-properties',
      name: 'Chemical Properties of Materials',
      sections: [focusSection('chem', 'Chemical Properties of Materials', FOCUS_CHEM)],
    },
    {
      id: 'computational',
      name: 'Computational Materials Science',
      sections: [focusSection('comp', 'Computational Materials Science', FOCUS_COMP)],
    },
    {
      id: 'electronics-photonics',
      name: 'Electronics & Photonics Properties of Materials',
      sections: [focusSection('ephoton', 'Electronics & Photonics Properties of Materials', FOCUS_EPHOTON)],
    },
    {
      id: 'energy',
      name: 'Materials for Energy Technology',
      sections: [focusSection('energy', 'Materials for Energy Technology', FOCUS_ENERGY)],
    },
    {
      id: 'characterization',
      name: 'Materials Characterization',
      sections: [focusSection('char', 'Materials Characterization', FOCUS_CHAR)],
    },
    {
      id: 'mechanical',
      name: 'Mechanical Behavior & Materials Processing',
      sections: [focusSection('mech', 'Mechanical Behavior & Materials Processing', FOCUS_MECH)],
    },
    {
      id: 'physics',
      name: 'Materials Physics',
      sections: [focusSection('phys', 'Materials Physics', FOCUS_PHYS)],
    },
    {
      id: 'nanomaterials',
      name: 'Nanomaterials & Nanotechnology',
      sections: [focusSection('nano', 'Nanomaterials & Nanotechnology', FOCUS_NANO)],
    },
    {
      id: 'self-defined',
      name: 'Self-Defined Focus Area',
      sections: [
        {
          id: 'self-courses',
          name: 'Self-Defined Focus Area Courses (≥3 courses, ≥9 units)',
          minUnits: 9,
          note: 'Define a cohesive program of study bridging two or more listed focus areas or including courses not listed in any track. At least one MATSCI course required. Submit a program deviation form along with your final program sheet.',
          slots: [
            {
              id: 'self-pick',
              label: 'Self-Defined Focus Area Courses (advisor-approved)',
              type: 'any-approved',
              count: 3,
              options: [],
            },
          ],
        },
      ],
    },
  ],
};
