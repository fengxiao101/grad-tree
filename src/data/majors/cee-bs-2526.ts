// Civil Engineering BS, School of Engineering, 2025-2026
// Source: https://bulletin.stanford.edu/programs/CEE-BS/
// totalMinUnits: 113 (from bulletin header)
// Math & Science: ≥45 units; Engineering total (Fundamentals + Core + Electives): ≥68 units (ABET)
// Focus areas: 7; pick 1 primary (≥12 units depth) + 3 breadth (≥6 units each) = ≥30 units total
// ABET: must take ≥2 of CEE 101A/101B/101C/101D (counted as Focus Area Electives)
// WIM: CEE 100 (also counts as Required Core)
// Capstone: CEE 183 (also counts as Required Core)

import type { MajorConfig, CourseOption } from '../majorSchema';

const FOCUS_STRUCTURAL: CourseOption[] = [
  { dept: 'CEE', number: '101A', name: 'Mechanics of Materials' },
  { dept: 'CEE', number: '101C', name: 'Geotechnical Engineering' },
  { dept: 'CEE', number: '101D', name: 'Computations in Civil and Environmental Engineering' },
  { dept: 'CEE', number: '180', name: 'Structural Analysis' },
  { dept: 'CEE', number: '182', name: 'Structural Design' },
  { dept: 'CEE', number: '192', name: 'Laboratory Characterization of Properties of Rocks and Geomaterials' },
  { dept: 'ME', number: '151', name: 'Introduction to Computational Mechanics' },
];

const FOCUS_ENV_FLUID: CourseOption[] = [
  { dept: 'CEE', number: '101B', name: 'Mechanics of Fluids' },
  { dept: 'CEE', number: '161I', name: 'Atmosphere, Ocean, and Climate Dynamics: The Atmospheric Circulation' },
  { dept: 'CEE', number: '162D', name: 'Introduction to Physical Oceanography' },
  { dept: 'CEE', number: '162E', name: 'Rivers, Streams, and Canals' },
  { dept: 'CEE', number: '162F', name: 'Coastal Processes' },
  { dept: 'CEE', number: '162I', name: 'Atmosphere, Ocean, and Climate Dynamics: the Ocean Circulation' },
  { dept: 'CEE', number: '166B', name: 'Hydrologic Processes, Water Resources and Hazards' },
  { dept: 'CEE', number: '175A', name: 'California Coast: Science, Policy, and Law' },
];

const FOCUS_CONSTRUCTION: CourseOption[] = [
  { dept: 'CEE', number: '101C', name: 'Geotechnical Engineering' },
  { dept: 'CEE', number: '120A', name: 'Building Modeling for Design & Construction' },
  { dept: 'CEE', number: '122A', name: 'Computer Integrated Architecture/Engineering/Construction (A/E/C)' },
  { dept: 'CEE', number: '122B', name: 'Computer Integrated A/E/C (continued)' },
  { dept: 'CEE', number: '131C', name: 'How Buildings are Made: Materiality and Construction Methods' },
  { dept: 'CEE', number: '141A', name: 'Infrastructure Project Development' },
  { dept: 'CEE', number: '141B', name: 'Infrastructure Project Delivery' },
  { dept: 'CEE', number: '241', name: 'Managing Fabrication and Construction' },
];

const FOCUS_ENERGY_CLIMATE: CourseOption[] = [
  { dept: 'CEE', number: '63',   name: 'Weather and Storms' },
  { dept: 'CEE', number: '64',   name: 'Air Pollution and Global Warming: History, Science, and Solutions' },
  { dept: 'CEE', number: '107A', name: 'Understand Energy' },
  { dept: 'CEE', number: '107S', name: 'Understand Energy: Essentials' },
  { dept: 'CEE', number: '107R', name: 'E^3: Extreme Energy Efficiency' },
  { dept: 'CEE', number: '156',  name: 'Building Systems Design & Analysis' },
  { dept: 'CEE', number: '172',  name: 'Air Quality Management' },
  { dept: 'CEE', number: '176A', name: 'Energy Efficient Buildings' },
  { dept: 'CEE', number: '176B', name: '100% Clean, Renewable Energy and Storage for Everything' },
];

const FOCUS_ENV_QUALITY: CourseOption[] = [
  { dept: 'CEE', number: '172',  name: 'Air Quality Management' },
  { dept: 'CEE', number: '173',  name: 'Urban Water' },
  { dept: 'CEE', number: '178',  name: 'Introduction to Human Exposure Analysis' },
  { dept: 'CEE', number: '179D', name: 'Providing Safe Water for the Developing and Developed World' },
  { dept: 'CEE', number: '179E', name: 'Wastewater Treatment: From Disposal to Resource Recovery' },
];

const FOCUS_SENSING: CourseOption[] = [
  { dept: 'CEE', number: '101D', name: 'Computations in Civil and Environmental Engineering' },
  { dept: 'CEE', number: '154',  name: 'Data Analytics for Physical Systems' },
  { dept: 'CEE', number: '155',  name: 'Introduction to Sensing Networks for CEE' },
  { dept: 'CEE', number: '156',  name: 'Building Systems Design & Analysis' },
  { dept: 'ME',  number: '161',  name: 'Dynamic Systems, Vibrations and Control' },
  { dept: 'ME',  number: '210',  name: 'Introduction to Mechatronics' },
];

const FOCUS_URBAN: CourseOption[] = [
  { dept: 'CEE', number: '120A', name: 'Building Modeling for Design & Construction' },
  { dept: 'CEE', number: '133A', name: 'Studio 1: Architecture: Space, Light, and Movement' },
  { dept: 'CEE', number: '156',  name: 'Building Systems Design & Analysis' },
  { dept: 'CEE', number: '176A', name: 'Energy Efficient Buildings' },
  { dept: 'CEE', number: '177L', name: 'Smart Cities & Communities: Sustainability Design Thinking' },
  { dept: 'CEE', number: '243',  name: 'Intro to Urban Systems Engineering' },
];

const OTHER_ENG_ELECTIVES: CourseOption[] = [
  { dept: 'CEE',  number: '41Q',  name: 'Clean Water Now! Urban Water Conflicts' },
  { dept: 'CEE',  number: '80N',  name: 'Engineering the Built Environment: An Introduction to Structural Engineering' },
  { dept: 'CEE',  number: '83',   name: 'Seismic Design Workshop' },
  { dept: 'CEE',  number: '199',  name: 'Undergraduate Research in Civil and Environmental Engineering' },
  { dept: 'CEE',  number: '199L', name: 'Independent Project in Civil and Environmental Engineering' },
  { dept: 'ENGR', number: '10',   name: 'Introduction to Engineering Analysis' },
  { dept: 'ENGR', number: '15',   name: 'Dynamics' },
  { dept: 'ENGR', number: '21',   name: 'Engineering of Systems' },
  { dept: 'ENGR', number: '25E',  name: 'Energy: Chemical Transformations for Production, Storage, and Use' },
  { dept: 'ENGR', number: '40M',  name: 'An Intro to Making: What is EE' },
  { dept: 'ENGR', number: '40A',  name: 'Introductory Electronics' },
  { dept: 'ENGR', number: '50',   name: 'Introduction to Materials Science, Nanotechnology Emphasis' },
  { dept: 'ENGR', number: '50E',  name: 'Introduction to Materials Science, Energy Emphasis' },
  { dept: 'ENGR', number: '50M',  name: 'Introduction to Materials Science, Biomaterials Emphasis' },
];

function focusSection(id: string, name: string, options: CourseOption[], extraNote?: string): import('../majorSchema').MajorSection {
  return {
    id,
    name: `${name} (≥12 units)`,
    minUnits: 12,
    unitOnly: true,
    note: [
      'Must reach ≥12 units from courses in this focus area.',
      extraNote,
      'ABET: choose ≥2 total of CEE 101A/101B/101C/101D across all focus areas.',
    ].filter(Boolean).join(' '),
    slots: [
      {
        id: `${id}-elec`,
        label: `${name} Courses`,
        type: 'any-approved',
        options,
      },
    ],
  };
}

export const CEE_BS_2526: MajorConfig = {
  id: 'cee-bs-2526',
  name: 'Civil Engineering (BS)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CEE-BS/',
  category: 'major',
  totalMinUnits: 113,

  wimCourses: [
    { dept: 'CEE', number: '100', name: 'Managing Sustainable Building Projects (WIM)' },
  ],
  showWimInProgram: false,

  sections: [
    // ── Mathematics and Science (≥45 units) ──────────────────────────────────
    {
      id: 'math-science',
      name: 'Mathematics and Science (≥45 units)',
      minUnits: 45,
      note: 'Complete all required courses plus additional Physics, Chemistry, or Mathematics to reach 45 units. CEE 177 and CEE 170 are approved as science only for CE majors. EARTHSYS 11 is required for Structural, Construction, Urban Systems, Energy/Climate, or Sensing focus. CEE 170 or CEE 177 is required for Environmental Fluid Mechanics or Environmental Quality focus.',
      slots: [
        {
          id: 'vec-calc',
          label: 'CME 100 or MATH 51: Vector Calculus / Linear Algebra',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },
            { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ],
        },
        {
          id: 'ode',
          label: 'CME 102 or MATH 53: Ordinary Differential Equations',
          type: 'pick-one',
          options: [
            { dept: 'CME', number: '102', name: 'Ordinary Differential Equations for Engineers' },
            { dept: 'MATH', number: '53', name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' },
          ],
        },
        {
          id: 'chem',
          label: 'CHEM 31A or CHEM 31E: Chemical Principles',
          type: 'pick-one',
          options: [
            { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
            { dept: 'CHEM', number: '31E', name: 'Chemical Foundations and 21st Century Problems' },
          ],
        },
        { id: 'math19', label: 'MATH 19: Calculus', type: 'required', options: [{ dept: 'MATH', number: '19' }] },
        { id: 'math20', label: 'MATH 20: Calculus', type: 'required', options: [{ dept: 'MATH', number: '20' }] },
        { id: 'math21', label: 'MATH 21: Calculus', type: 'required', options: [{ dept: 'MATH', number: '21' }] },
        { id: 'phys41', label: 'PHYSICS 41: Mechanics', type: 'required', options: [{ dept: 'PHYSICS', number: '41' }] },
        {
          id: 'phys-em',
          label: 'PHYSICS 43 or PHYSICS 45: E&M or Light and Heat',
          type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' },
            { dept: 'PHYSICS', number: '45', name: 'Light and Heat' },
          ],
        },
        { id: 'stats110', label: 'STATS 110: Introduction to Statistics for Engineering and the Sciences', type: 'required', options: [{ dept: 'STATS', number: '110' }] },
        {
          id: 'sci-add',
          label: 'Additional Science Course',
          type: 'pick-one',
          note: 'Which course is required depends on your primary focus area: see math/science section note above.',
          options: [
            { dept: 'CEE', number: '170', name: 'Aquatic and Organic Chemistry for Environmental Engineering' },
            { dept: 'CEE', number: '177', name: 'Aquatic Chemistry and Biology' },
            { dept: 'EARTHSYS', number: '11', name: 'Introduction to Geology' },
          ],
        },
        {
          id: 'math-sci-extra',
          label: 'Additional Physics/Chemistry/Mathematics (to reach 45 units)',
          type: 'any-approved',
          options: [],
          note: 'Take additional approved math or science courses to reach the 45-unit minimum. Exact course(s) depend on unit counts of required courses taken.',
        },
      ],
    },

    // ── Technology in Society ─────────────────────────────────────────────────
    {
      id: 'tis',
      name: 'Technology in Society',
      slots: [
        { id: 'tis-102a', label: 'CEE 102A: Legal/Ethical Principles in Design, Construction, Project Delivery', type: 'required', options: [{ dept: 'CEE', number: '102A' }] },
      ],
    },

    // ── Engineering Fundamentals ──────────────────────────────────────────────
    {
      id: 'eng-fund',
      name: 'Engineering Fundamentals',
      slots: [
        { id: 'engr14', label: 'ENGR 14: Introduction to Solid Mechanics', type: 'required', options: [{ dept: 'ENGR', number: '14', name: 'Introduction to Solid Mechanics' }] },
        { id: 'engr90', label: 'ENGR 90 / CEE 70: Environmental Science and Technology', type: 'pick-one', options: [ { dept: 'ENGR', number: '90', name: 'Environmental Science and Technology' }, { dept: 'CEE', number: '70', name: 'Environmental Science and Technology' }] },
      ],
    },

    // ── Engineering Depth: Required Core ────────────────────────────────────
    {
      id: 'eng-core',
      name: 'Engineering Depth: Required Core',
      note: 'CEE 100 also satisfies WIM. CEE 183 is both core and capstone. CEE 101D can count here OR as a Focus Area Elective, but not both. ABET requires ≥68 units total of Engineering Fundamentals + Core + Electives. Choose ≥2 of CEE 101A/101B/101C/101D across your focus area work.',
      slots: [
        { id: 'cee100', label: 'CEE 100: Managing Sustainable Building Projects (WIM)', type: 'required', options: [{ dept: 'CEE', number: '100', name: 'Managing Sustainable Building Projects' }] },
        { id: 'cee146s', label: 'CEE 146S: Engineering Economics and Sustainability', type: 'required', options: [{ dept: 'CEE', number: '146S', name: 'Engineering Economics and Sustainability' }] },
        { id: 'cee183', label: 'CEE 183: Integrated Civil Engineering Design Project (Capstone)', type: 'required', options: [{ dept: 'CEE', number: '183', name: 'Integrated Civil Engineering Design Project' }] },
        {
          id: 'programming',
          label: 'CS 106A/B or CEE 101D: Programming',
          type: 'pick-one',
          note: 'CEE 101D may count here OR as a Focus Area Elective: not both.',
          options: [
            { dept: 'CS', number: '106A', name: 'Programming Methodology' },
            { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
            { dept: 'CEE', number: '101D', name: 'Computations in Civil and Environmental Engineering' },
          ],
        },
        {
          id: 'thermo',
          label: 'ME 30 or CHEMENG 110A: Engineering Thermodynamics',
          type: 'pick-one',
          options: [
            { dept: 'ME', number: '30', name: 'Engineering Thermodynamics' },
            { dept: 'CHEMENG', number: '110A', name: 'Introduction to Chemical Engineering Thermodynamics' },
          ],
        },
      ],
    },

    // ── Other Engineering Electives (to reach ≥68 units total) ───────────────
    {
      id: 'eng-electives',
      name: 'Other Engineering Electives (to reach ≥68 units total)',
      note: 'Additional electives may come from any of the 7 Focus Areas or the list below. Max 4 units of CEE 199/199L. CEE 31, 102W, and 151 do NOT satisfy ABET requirements. Petition jill.filice@stanford.edu for courses not on the list.',
      slots: [
        {
          id: 'eng-elec-list',
          label: 'Engineering Elective Courses',
          type: 'any-approved',
          options: OTHER_ENG_ELECTIVES,
          note: 'Additional Focus Area courses also count here. Select enough to reach ≥68 total units (Fundamentals + Core + Electives).',
        },
      ],
    },

    // ── Depth in Discipline: Primary Focus Area (track selector) ─────────────
    {
      id: 'focus-depth',
      name: 'Primary Focus Area (≥12 units depth)',
      trackSelector: true,
      note: 'Choose one primary focus area with ≥12 units. Also take ≥6 units each in 3 other focus areas (see breadth sections below). Courses cannot double-count between areas. ABET requires ≥2 of CEE 101A/101B/101C/101D total. Prep for FE exams: Civil FE = 101A+101C+180+182; Environmental FE = 101B+166B+172+177; General FE = 101A+101B+PHYS43.',
      slots: [],
    },

    // ── Breadth Focus Areas (3 × ≥6 units) ───────────────────────────────────
    {
      id: 'focus-breadth1',
      name: 'Breadth Focus Area 1 (≥6 units)',
      minUnits: 6,
      note: 'Choose from any of the 7 focus areas other than your primary depth focus. See bulletin for full course lists.',
      slots: [
        {
          id: 'breadth1-courses',
          label: 'Breadth Focus Area 1 Courses',
          type: 'any-approved',
          options: [],
          note: 'Select from: Structural Engineering & Mechanics, Environmental Fluid Mechanics & Hydrology, Construction Engineering, Energy and Climate, Environmental Quality Engineering, Sensing/Analytics/Control, or Urban Systems.',
        },
      ],
    },
    {
      id: 'focus-breadth2',
      name: 'Breadth Focus Area 2 (≥6 units)',
      minUnits: 6,
      slots: [
        {
          id: 'breadth2-courses',
          label: 'Breadth Focus Area 2 Courses',
          type: 'any-approved',
          options: [],
        },
      ],
    },
    {
      id: 'focus-breadth3',
      name: 'Breadth Focus Area 3 (≥6 units)',
      minUnits: 6,
      slots: [
        {
          id: 'breadth3-courses',
          label: 'Breadth Focus Area 3 Courses',
          type: 'any-approved',
          options: [],
        },
      ],
    },
  ],

  tracks: [
    {
      id: 'structural',
      name: 'Structural Engineering & Mechanics',
      minUnits: 12,
      sections: [focusSection('structural', 'Structural Engineering & Mechanics', FOCUS_STRUCTURAL, 'EARTHSYS 11 required as your additional science course.')],
    },
    {
      id: 'env-fluid',
      name: 'Environmental Fluid Mechanics & Hydrology',
      minUnits: 12,
      sections: [focusSection('env-fluid', 'Environmental Fluid Mechanics & Hydrology', FOCUS_ENV_FLUID, 'CEE 170 or CEE 177 required as your additional science course.')],
    },
    {
      id: 'construction',
      name: 'Construction Engineering',
      minUnits: 12,
      sections: [focusSection('construction', 'Construction Engineering', FOCUS_CONSTRUCTION, 'EARTHSYS 11 required as your additional science course. CEE 122A+122B must be taken together (2 units per quarter).')],
    },
    {
      id: 'energy-climate',
      name: 'Energy and Climate',
      minUnits: 12,
      sections: [focusSection('energy-climate', 'Energy and Climate', FOCUS_ENERGY_CLIMATE, 'EARTHSYS 11 required as your additional science course.')],
    },
    {
      id: 'env-quality',
      name: 'Environmental Quality Engineering',
      minUnits: 12,
      sections: [focusSection('env-quality', 'Environmental Quality Engineering', FOCUS_ENV_QUALITY, 'CEE 170 or CEE 177 required as your additional science course.')],
    },
    {
      id: 'sensing',
      name: 'Sensing, Analytics, and Control',
      minUnits: 12,
      sections: [focusSection('sensing', 'Sensing, Analytics, and Control', FOCUS_SENSING, 'EARTHSYS 11 required as your additional science course.')],
    },
    {
      id: 'urban',
      name: 'Urban Systems',
      minUnits: 12,
      sections: [focusSection('urban', 'Urban Systems', FOCUS_URBAN, 'EARTHSYS 11 required as your additional science course.')],
    },
  ],
};
