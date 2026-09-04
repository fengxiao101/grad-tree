// Biomedical Computation (BS), 2025-2026
// Source: https://bulletin.stanford.edu/programs/ENGR-BS/
// Cache:  course_sheets/bioc-bs-2526.cache.json

import type { MajorConfig, CourseOption, MajorSection, Track } from '../majorSchema';

// ── CS 109 / Probability substitutes ─────────────────────────────────────────

const PROB_OPTIONS: CourseOption[] = [
  { dept: 'CS',   number: '109' },
  { dept: 'STATS',number: '116' },
  { dept: 'STATS',number: '141' },
  { dept: 'MS&E', number: '120' },
  { dept: 'MS&E', number: '220' },
  { dept: 'EE',   number: '178' },
  { dept: 'MATH', number: '151' },
  { dept: 'CME',  number: '106' },
];

// ── Technology in Society ─────────────────────────────────────────────────────

const TIS_OPTIONS: CourseOption[] = [
  { dept: 'AA',       number: '252' },
  { dept: 'ARCHLGY',  number: '118' },
  { dept: 'ARCHLGY',  number: '151' },
  { dept: 'BIOE',     number: '131' },
  { dept: 'BIOE',     number: '177' },
  { dept: 'CEE',      number: '102A' },
  { dept: 'CEE',      number: '145E' },

  { dept: 'COMM',     number: '166' },
  { dept: 'CS',       number: '139' },
  { dept: 'CS',       number: '152' },
  { dept: 'CS',       number: '182' },
  { dept: 'CS',       number: '182W' },
  { dept: 'CS',       number: '256' },
  { dept: 'CS',       number: '278' },
  { dept: 'DATASCI',  number: '154' },
  { dept: 'DESIGN',   number: '259' },
  { dept: 'EARTHSYS', number: '125' },
  { dept: 'ENERGY',   number: '177A' },
  { dept: 'ENERGY',   number: '177B' },
  { dept: 'ENGR',     number: '145' },
  { dept: 'ENGR',     number: '148' },
  { dept: 'ENGR',     number: '248' },
  { dept: 'EPS',      number: '194' },
  { dept: 'EPS',      number: '204' },
  { dept: 'HUMBIO',   number: '174' },
  { dept: 'MS&E',     number: '179' },
  { dept: 'NBIO',     number: '101' },
  { dept: 'POLISCI',  number: '114S' },
  { dept: 'PUBLPOL',  number: '114' },
  { dept: 'STS',      number: '1' },
  { dept: 'STS',      number: '115' },
  { dept: 'STS',      number: '200J' },
];

// ── Engineering Fundamentals elective list ────────────────────────────────────

const ENGR_ELECTIVE_OPTIONS: CourseOption[] = [
  { dept: 'ENGR',    number: '10' },
  { dept: 'ENGR',    number: '14' },
  { dept: 'ENGR',    number: '15' },
  { dept: 'ENGR',    number: '20' },

  { dept: 'ENGR',    number: '21' },
  { dept: 'ENGR',    number: '40M' },
  { dept: 'ENGR',    number: '42' },
  { dept: 'ENGR',    number: '50' },
  { dept: 'ENGR',    number: '50E' },
  { dept: 'ENGR',    number: '50M' },
  { dept: 'ENGR',    number: '55' },
  { dept: 'ENGR',    number: '60' },
  { dept: 'ENGR',    number: '76' },
  { dept: 'ENGR',    number: '80' },

  { dept: 'ENGR',    number: '90' },

];

// ── Depth elective pool (full list from bulletin) ─────────────────────────────

const DEPTH_ELECTIVES: CourseOption[] = [
  { dept: 'APPPHYS',  number: '205' },
  { dept: 'APPPHYS',  number: '294' },
  { dept: 'BIO',      number: '112' },
  { dept: 'BIO',      number: '160' },
  { dept: 'BIO',      number: '183' },
  { dept: 'BIO',      number: '214' },
  { dept: 'BIO',      number: '230' },
  { dept: 'BIOC',     number: '241' },
  { dept: 'BIOE',     number: '51' },
  { dept: 'BIOE',     number: '101' },
  { dept: 'BIOE',     number: '103' },
  { dept: 'BIOE',     number: '123' },
  { dept: 'BIOE',     number: '209' },
  { dept: 'BIOE',     number: '220' },
  { dept: 'BIOE',     number: '222' },
  { dept: 'BIOE',     number: '285' },
  { dept: 'BMDS',     number: '215' },
  { dept: 'BMDS',     number: '260' },
  { dept: 'CHEM',     number: '141' },
  { dept: 'CHEM',     number: '143' },
  { dept: 'CHEM',     number: '171' },
  { dept: 'CHEMENG',  number: '100' },
  { dept: 'CHEMENG',  number: '150' },
  { dept: 'CHEMENG',  number: '174' },
  { dept: 'CME',      number: '364A' },
  { dept: 'CS',       number: '145' },
  { dept: 'CS',       number: '147' },
  { dept: 'CS',       number: '148' },
  { dept: 'CS',       number: '221' },
  { dept: 'CS',       number: '223A' },
  { dept: 'CS',       number: '228' },
  { dept: 'CS',       number: '229' },
  { dept: 'CS',       number: '270' },
  { dept: 'CS',       number: '273B' },
  { dept: 'CS',       number: '274' },
  { dept: 'CS',       number: '275' },
  { dept: 'CS',       number: '279' },
  { dept: 'CS',       number: '348C' },
  { dept: 'DBIO',     number: '210' },
  { dept: 'EE',       number: '263' },
  { dept: 'GENE',     number: '211' },
  { dept: 'ME',       number: '281' },
  { dept: 'MS&E',     number: '152' },
  { dept: 'MS&E',     number: '252' },
  { dept: 'STATS',    number: '202' },
  { dept: 'STATS',    number: '206' },
  { dept: 'STATS',    number: '315A' },
  { dept: 'STATS',    number: '315B' },
  { dept: 'SURG',     number: '101' },
];

// ── Breadth sub-pools (from bulletin elective categorization table) ────────────

// Organs/Organisms + Cellular/Molecular combined pool
const ORGANS_CELLMOL_POOL: CourseOption[] = [
  { dept: 'APPPHYS',  number: '294' },   // Simulation + C/M
  { dept: 'BIO',      number: '112' },
  { dept: 'BIO',      number: '160' },
  { dept: 'BIO',      number: '183' },
  { dept: 'BIO',      number: '214' },
  { dept: 'BIO',      number: '230' },
  { dept: 'BIOC',     number: '241' },
  { dept: 'BIOE',     number: '51' },
  { dept: 'BIOE',     number: '101' },
  { dept: 'BIOE',     number: '103' },
  { dept: 'BIOE',     number: '123' },
  { dept: 'BIOE',     number: '209' },   // Simulation + Organs
  { dept: 'BIOE',     number: '222' },
  { dept: 'BIOE',     number: '285' },
  { dept: 'CHEM',     number: '141' },
  { dept: 'CHEM',     number: '143' },
  { dept: 'CHEM',     number: '171' },
  { dept: 'CHEMENG',  number: '150' },
  { dept: 'CHEMENG',  number: '174' },
  { dept: 'CS',       number: '273B' },  // Informatics + C/M
  { dept: 'CS',       number: '279' },   // Informatics + C/M
  { dept: 'DBIO',     number: '210' },
  { dept: 'GENE',     number: '211' },   // Informatics + C/M
  { dept: 'ME',       number: '281' },
  { dept: 'SURG',     number: '101' },
];

// Informatics + Simulation combined pool
const INFO_SIM_POOL: CourseOption[] = [
  { dept: 'APPPHYS',  number: '205' },   // Simulation only
  { dept: 'APPPHYS',  number: '294' },   // Simulation + C/M
  { dept: 'BIOE',     number: '101' },
  { dept: 'BIOE',     number: '103' },
  { dept: 'BIOE',     number: '123' },
  { dept: 'BIOE',     number: '209' },
  { dept: 'BIOE',     number: '285' },
  { dept: 'BMDS',     number: '215' },
  { dept: 'BMDS',     number: '260' },
  { dept: 'CHEM',     number: '171' },   // Simulation + C/M
  { dept: 'CHEMENG',  number: '100' },
  { dept: 'CME',      number: '364A' },
  { dept: 'CS',       number: '145' },
  { dept: 'CS',       number: '147' },
  { dept: 'CS',       number: '148' },
  { dept: 'CS',       number: '221' },
  { dept: 'CS',       number: '223A' },
  { dept: 'CS',       number: '228' },
  { dept: 'CS',       number: '229' },
  { dept: 'CS',       number: '270' },
  { dept: 'CS',       number: '273B' },
  { dept: 'CS',       number: '274' },
  { dept: 'CS',       number: '275' },
  { dept: 'CS',       number: '279' },
  { dept: 'CS',       number: '348C' },
  { dept: 'EE',       number: '263' },
  { dept: 'GENE',     number: '211' },   // Informatics + C/M
  { dept: 'ME',       number: '281' },   // Simulation + Organs
  { dept: 'MS&E',     number: '152' },
  { dept: 'MS&E',     number: '252' },
  { dept: 'STATS',    number: '202' },
  { dept: 'STATS',    number: '206' },
  { dept: 'STATS',    number: '315A' },
  { dept: 'STATS',    number: '315B' },
];

// ── Concentration track sections ──────────────────────────────────────────────

const CELLMOL_SECTIONS: MajorSection[] = [
  {
    id: 'cellmol-bio',
    name: 'Cell/Mol: Advanced Biology (pick 1)',
    slots: [
      {
        id: 'cellmol-bio-course',
        label: 'Advanced Biology Course',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'BIO', number: '111' },
          { dept: 'BIO', number: '113' },
          { dept: 'BIO', number: '126' },
          { dept: 'BIO', number: '154' },
          { dept: 'BIO', number: '160' },
          { dept: 'BIO', number: '230' },
        ],
      },
    ],
  },
  {
    id: 'cellmol-chem',
    name: 'Cell/Mol: Chemistry (pick 1)',
    slots: [
      {
        id: 'cellmol-chem-course',
        label: 'Advanced Chemistry Course',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CHEM', number: '141' },
          { dept: 'CHEM', number: '143' },
          { dept: 'CHEM', number: '171' },
        ],
      },
    ],
  },
  {
    id: 'cellmol-extra',
    name: 'Cell/Mol: Additional BIO or CHEM (pick 1)',
    note: 'Must be a different course from your other two Cell/Mol picks.',
    slots: [
      {
        id: 'cellmol-extra-course',
        label: 'Additional BIO or CHEM Course',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'BIO',  number: '111' }, { dept: 'BIO',  number: '113' },
          { dept: 'BIO',  number: '126' }, { dept: 'BIO',  number: '154' },
          { dept: 'BIO',  number: '160' }, { dept: 'BIO',  number: '230' },
          { dept: 'CHEM', number: '141' }, { dept: 'CHEM', number: '143' },
          { dept: 'CHEM', number: '171' },
        ],
        note: 'Must differ from your advanced biology and chemistry picks.',
      },
    ],
  },
];

const INFORMATICS_SECTIONS: MajorSection[] = [
  {
    id: 'info-datasys',
    name: 'Informatics: Data Systems (pick 1)',
    slots: [
      {
        id: 'info-datasys-course',
        label: 'Data Systems Course',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '145', name: 'Introduction to Big Data Systems' },
          { dept: 'CS', number: '147', name: 'Introduction to Human-Computer Interaction Design' },
        ],
      },
    ],
  },
  {
    id: 'info-ai',
    name: 'Informatics: AI / ML (pick 1)',
    slots: [
      {
        id: 'info-ai-course',
        label: 'AI / ML Course',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '221', name: 'Artificial Intelligence: Principles and Techniques' },
          { dept: 'CS', number: '228', name: 'Probabilistic Graphical Models' },
          { dept: 'CS', number: '229', name: 'Machine Learning' },
        ],
      },
    ],
  },
  {
    id: 'info-equity',
    name: 'Informatics: Equity & Governance',
    slots: [
      {
        id: 'cs121',
        label: 'CS 121: Equity and Governance for Artificial Intelligence',
        type: 'required',
        options: [{ dept: 'CS', number: '121' }],
      },
    ],
  },
  {
    id: 'info-extra',
    name: 'Informatics: Additional CS Course (pick 1)',
    note: 'Must differ from your other Informatics picks.',
    slots: [
      {
        id: 'info-extra-course',
        label: 'Additional CS Course',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '145' }, { dept: 'CS', number: '147' },
          { dept: 'CS', number: '148' }, { dept: 'CS', number: '221' },
          { dept: 'CS', number: '223A' }, { dept: 'CS', number: '228' },
          { dept: 'CS', number: '229' }, { dept: 'CS', number: '270' },
          { dept: 'CS', number: '273B' }, { dept: 'CS', number: '274' },
          { dept: 'CS', number: '275' }, { dept: 'CS', number: '279' },
          { dept: 'CS', number: '348C' },
        ],
        note: 'One additional CS course from the Informatics depth list.',
      },
    ],
  },
];

const ORGANS_SECTIONS: MajorSection[] = [
  {
    id: 'organs-anatomy',
    name: 'Organs: Anatomy (pick 1)',
    slots: [
      {
        id: 'organs-anatomy-course',
        label: 'Anatomy Course',
        type: 'pick-one',
        options: [
          { dept: 'BIOE', number: '51',  name: 'Anatomy for Bioengineers' },
          { dept: 'RAD',  number: '220', name: 'Introduction to Imaging and Image-based Human Anatomy' },
        ],
        note: 'RAD 220 is cross-listed as BIOE 220.',
      },
    ],
  },
  {
    id: 'organs-sysbio',
    name: 'Organs: Systems Biology',
    slots: [
      {
        id: 'organs-bioe101',
        label: 'BIOE 101: Systems Biology',
        type: 'required',
        options: [{ dept: 'BIOE', number: '101' }],
      },
    ],
  },
  {
    id: 'organs-physio',
    name: 'Organs: Systems Physiology (pick 1)',
    slots: [
      {
        id: 'organs-physio-course',
        label: 'Systems Physiology Course',
        type: 'pick-one',
        options: [
          { dept: 'BIOE', number: '103', name: 'Systems Physiology and Design' },
          { dept: 'BIO',  number: '112', name: 'Human Physiology' },
        ],
      },
    ],
  },
];

const SIMULATION_SECTIONS: MajorSection[] = [
  {
    id: 'sim-ode',
    name: 'Simulation: Differential Equations (pick 1)',
    note: 'This course also fulfills the track-specific additional Mathematics requirement.',
    slots: [
      {
        id: 'sim-ode-course',
        label: 'Differential Equations Course',
        type: 'pick-one',
        options: [
          { dept: 'CME',  number: '102', name: 'Ordinary Differential Equations for Engineers' },
          { dept: 'MATH', number: '53',  name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' },
        ],
      },
    ],
  },
  {
    id: 'sim-sysbio',
    name: 'Simulation: Systems Biology',
    slots: [
      {
        id: 'sim-bioe101',
        label: 'BIOE 101: Systems Biology',
        type: 'required',
        options: [{ dept: 'BIOE', number: '101' }],
      },
    ],
  },
  {
    id: 'sim-physdes',
    name: 'Simulation: Systems Physiology and Design',
    slots: [
      {
        id: 'sim-bioe103',
        label: 'BIOE 103: Systems Physiology and Design',
        type: 'required',
        options: [{ dept: 'BIOE', number: '103' }],
      },
    ],
  },
];

// ── Tracks ────────────────────────────────────────────────────────────────────

const TRACKS: Track[] = [
  { id: 'cellular-mol', name: 'Cellular/Molecular',  sections: CELLMOL_SECTIONS },
  { id: 'informatics',  name: 'Informatics',          sections: INFORMATICS_SECTIONS },
  { id: 'organs',       name: 'Organs/Organisms',     sections: ORGANS_SECTIONS },
  { id: 'simulation',   name: 'Simulation',           sections: SIMULATION_SECTIONS },
];

// ── Main config ───────────────────────────────────────────────────────────────

export const BIOC_BS_2526: MajorConfig = {
  id: 'bioc-bs-2526',
  name: 'Biomedical Computation (BS)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ENGR-BS/',
  category: 'major',
  totalMinUnits: 90,

  sections: [
    // ── Mathematics (24 units min) ─────────────────────────────────────────
    {
      id: 'math',
      name: 'Mathematics',
      minUnits: 24,
      note: 'At least 24 units. Up to 10 AP units (with placement into MATH 51/CME 100) may count if at least 20 math units are taken: SoE Dean\'s Office (135 Huang) must approve. MATH 51+52 and CME 100 may not both count. One additional track-specific math course is required beyond the shared core (e.g. CME 102 or MATH 53 for Simulation; verify your concentration). Acceptable CS 109 substitutes: STATS 116, STATS 141, MS&E 120, MS&E 220, EE 178, MATH 151, CME 106.',
      slots: [
        {
          id: 'math19',
          label: 'MATH 19: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '19' }],
        },
        {
          id: 'math20',
          label: 'MATH 20: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '20' }],
        },
        {
          id: 'math21',
          label: 'MATH 21: Calculus',
          type: 'required',
          options: [{ dept: 'MATH', number: '21' }],
        },
        {
          id: 'cs103',
          label: 'CS 103: Mathematical Foundations of Computing',
          type: 'required',
          options: [{ dept: 'CS', number: '103' }],
        },
        {
          id: 'probability',
          label: 'Probability (CS 109 or approved substitute)',
          type: 'pick-one',
          options: PROB_OPTIONS,
        },
        {
          id: 'linalg',
          label: 'Linear Algebra / Vector Calculus',
          type: 'pick-one',
          options: [
            { dept: 'MATH', number: '51',  name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
            { dept: 'CME',  number: '100', name: 'Vector Calculus for Engineers' },
          ],
        },
      ],
    },

    // ── Science (17 units min) ─────────────────────────────────────────────
    {
      id: 'science',
      name: 'Science',
      minUnits: 17,
      note: 'Minimum 17 units. Requires one chemistry, one biology, one physics course, plus one additional from any of those categories.',
      slots: [
        {
          id: 'sci-chem',
          label: 'Chemistry (pick 1)',
          type: 'pick-one',
          options: [
            { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
            { dept: 'CHEM', number: '31B', name: 'Chemical Principles II' },
            { dept: 'CHEM', number: '31E', name: 'Chemical Foundations and 21st Century Problems' },
            { dept: 'CHEM', number: '33',  name: 'Structure and Reactivity of Carbon-Based Molecules' },
          ],
        },
        {
          id: 'sci-bio',
          label: 'Biology (pick 1)',
          type: 'pick-one',
          options: [
            { dept: 'BIO',    number: '81',  name: 'Introduction to Ecology' },
            { dept: 'BIO',    number: '82',  name: 'Genetics' },
            { dept: 'BIO',    number: '83',  name: 'Biochemistry & Molecular Biology' },
            { dept: 'BIO',    number: '84',  name: 'Physiology' },
            { dept: 'BIO',    number: '85',  name: 'Evolution' },
            { dept: 'BIO',    number: '86',  name: 'Cell Biology' },
            { dept: 'HUMBIO', number: '2A',  name: 'Genetics, Molecular Biology and Evolution' },
            { dept: 'HUMBIO', number: '3A',  name: 'Cell and Developmental Biology' },
            { dept: 'HUMBIO', number: '4A',  name: 'The Human Organism' },
          ],
        },
        {
          id: 'sci-phys',
          label: 'Physics (pick 1)',
          type: 'pick-one',
          options: [
            { dept: 'PHYSICS', number: '41', name: 'Mechanics' },
            { dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' },
            { dept: 'PHYSICS', number: '45', name: 'Light and Heat' },
          ],
        },
        {
          id: 'sci-extra',
          label: 'Additional Science Course (pick 1)',
          type: 'pick-from-list',
          count: 1,
          options: [
            { dept: 'BIO',    number: '81' }, { dept: 'BIO',    number: '82' },
            { dept: 'BIO',    number: '83' }, { dept: 'BIO',    number: '84' },
            { dept: 'BIO',    number: '85' }, { dept: 'BIO',    number: '86' },
            { dept: 'HUMBIO', number: '2A' }, { dept: 'HUMBIO', number: '3A' },
            { dept: 'HUMBIO', number: '4A' },
            { dept: 'CHEM',   number: '31A' }, { dept: 'CHEM',   number: '31B' },
            { dept: 'CHEM',   number: '31E' }, { dept: 'CHEM',   number: '33' },
            { dept: 'PHYSICS',   number: '41' }, { dept: 'PHYSICS',   number: '43' },
            { dept: 'PHYSICS',   number: '45' },
          ],
          note: 'One additional biology, chemistry, or physics course; must differ from your other three Science picks.',
        },
      ],
    },

    // ── Engineering Fundamentals ───────────────────────────────────────────
    {
      id: 'engr-fund',
      name: 'Engineering Fundamentals',
      note: 'CS 106B may NOT be double-counted between Engineering Fundamentals and BMC Core. If using CS 106B here, a petitioned substitute (pre-approved by BMC Coordinators) must take its place in the Core. A second CS course may not fill the ENGR elective slot.',
      slots: [
        {
          id: 'engr-fund-cs',
          label: 'CS Programming Course (pick 1)',
          type: 'pick-one',
          options: [
            { dept: 'CS', number: '106A', name: 'Programming Methodology' },
            { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
          ],
          note: 'If CS 106B is used here it cannot also count toward BMC Core: petition a substitute for Core.',
        },
        {
          id: 'engr-elec',
          label: 'ENGR Elective (3–5 units, not a second CS course)',
          type: 'pick-from-list',
          count: 1,
          options: ENGR_ELECTIVE_OPTIONS,
        },
      ],
    },

    // ── Technology in Society ──────────────────────────────────────────────
    {
      id: 'tis',
      name: 'Technology in Society',
      note: 'One course required. ENERGY 177A AND 177B must both be taken together to count as one TiS slot. Cross-listings: BIOE 177 = DESIGN 259; CLASSICS 168 = ARCHLGY 118; ENGR 80 = BIOE 80; ENGR 90 = CEE 70.',
      slots: [
        {
          id: 'tis-course',
          label: 'Technology in Society Course',
          type: 'pick-from-list',
          count: 1,
          options: TIS_OPTIONS,
        },
      ],
    },

    // ── Program Core (Engineering) ─────────────────────────────────────────
    {
      id: 'core',
      name: 'Program Core: Engineering',
      note: 'CS 106B, CS 107, and CS 161 all required. CS 106B cannot double-count with Engineering Fundamentals (see note above). All courses for letter grade if offered.',
      slots: [
        {
          id: 'core-cs106b',
          label: 'CS 106B: Programming Abstractions',
          type: 'any-approved',
          options: [{ dept: 'CS', number: '106B' }],
          note: 'CS 106B standard. If CS 106B was already counted toward Engineering Fundamentals, a petitioned alternative must be pre-approved by BMC Coordinators.',
        },
        {
          id: 'core-cs107',
          label: 'CS 107: Computer Organization and Systems',
          type: 'required',
          options: [{ dept: 'CS', number: '107' }],
        },
        {
          id: 'core-cs161',
          label: 'CS 161: Design and Analysis of Algorithms',
          type: 'required',
          options: [{ dept: 'CS', number: '161' }],
        },
      ],
    },

    // ── Depth: Cross-Concentration Breadth (required before picking a concentration) ─
    {
      id: 'depth-breadth',
      name: 'Depth: Cross-Concentration Breadth',
      note: 'ALL concentrations must satisfy these three breadth requirements. Courses in this section are drawn from the same pool as concentration electives and typically overlap with your concentration core: verify categorization against the bulletin\'s elective table at https://bulletin.stanford.edu/programs/ENGR-BS/ as the categorization shown here is approximate.',
      slots: [
        {
          id: 'breadth-organs-cellmol',
          label: 'TWO courses from Organs/Organisms or Cellular/Molecular',
          type: 'pick-from-list',
          count: 2,
          options: ORGANS_CELLMOL_POOL,
          note: 'Approx. pool: includes anatomy, physiology, bio, biochem, chem depth courses. Check the bulletin categorization table.',
        },
        {
          id: 'breadth-info-sim',
          label: 'TWO courses from Informatics or Simulations',
          type: 'pick-from-list',
          count: 2,
          options: INFO_SIM_POOL,
          note: 'Approx. pool: includes CS, stats, modeling, engineering depth courses. Check the bulletin categorization table.',
        },
        {
          id: 'breadth-any',
          label: 'ONE additional course from any concentration',
          type: 'pick-from-list',
          count: 1,
          options: DEPTH_ELECTIVES,
        },
      ],
    },

    // ── Depth: Concentration (track selector) ─────────────────────────────
    {
      id: 'depth-concentration',
      name: 'Depth: Concentration',
      trackSelector: true,
      note: 'Select one of four concentrations: Cellular/Molecular, Informatics, Organs/Organisms, or Simulation. Total Engineering Fundamentals + Core + Depth units must equal at least 42. Core provides ~27 units; the remaining units come from depth electives. All courses for letter grade if offered.',
      slots: [],
    },

    // ── Research ───────────────────────────────────────────────────────────
    {
      id: 'research',
      name: 'Research',
      note: 'Six units of biomedical computation research required in any department: reduced to five units if satisfying WIM via ENGR 199W. Research project proposals require pre-approval from BMC Coordinators (submit form at least 2 weeks before the start quarter). Research units taken as CS 191W or alongside ENGR 199W fulfill the WIM requirement.',
      slots: [],
      pickOneGroup: [
        {
          id: 'research-standard',
          name: 'Standard Research Requirement: 6 units',
          note: 'Use this option when satisfying WIM with CS 191W or CS 272, or with another approved WIM method that is not ENGR 199W.',
          slots: [
            {
              id: 'research-units-standard',
              label: 'Approved Biomedical Computation Research (6 units)',
              type: 'any-approved',
              minUnits: 6,
              options: [],
              listUrl: 'https://bulletin.stanford.edu/programs/ENGR-BS/',
            },
          ],
        },
        {
          id: 'research-engr199w',
          name: 'ENGR 199W Research/WIM Option: 5 research units',
          note: 'The research minimum is reduced to five units only when ENGR 199W is used to satisfy WIM.',
          slots: [
            {
              id: 'research-units-engr199w',
              label: 'Approved Biomedical Computation Research (5 units)',
              type: 'any-approved',
              minUnits: 5,
              options: [],
              listUrl: 'https://bulletin.stanford.edu/programs/ENGR-BS/',
            },
            {
              id: 'research-engr199w-course',
              label: 'ENGR 199W: Writing of Original Research for Engineers',
              type: 'required',
              options: [{ dept: 'ENGR', number: '199W', name: 'Writing of Original Research for Engineers' }],
            },
          ],
        },
      ],
    },

    // ── Capstone ───────────────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone',
      note: 'Select one course to satisfy the BMC Capstone requirement. CS 273A is accepted if taken in the past.',
      slots: [
        {
          id: 'capstone-course',
          label: 'BMC Capstone Course',
          type: 'pick-from-list',
          count: 1,
          options: [
            { dept: 'CS',  number: '270',  name: 'Modeling Biomedical Systems' },
            { dept: 'CS',  number: '274',  name: 'Representations and Algorithms for Computational Molecular Biology' },
            { dept: 'CS',  number: '275',  name: 'Translational Bioinformatics' },
            { dept: 'CS',  number: '278',  name: 'Social Computing' },
            { dept: 'CS',  number: '279',  name: 'Computational Biology: Structure and Organization of Biomolecules and Cells' },
            { dept: 'CME', number: '209',  name: 'Mathematical Modeling of Biological Systems' },
            { dept: 'CS',  number: '273A', name: 'Machine Learning for Genomics (accepted if taken in the past)' },
          ],
        },
      ],
    },

    // ── Writing in the Major (WIM) ─────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      note: 'Fulfilled by CS 191W or ENGR 199W (taken with research units), or CS 272 (standalone, no research units required). The research minimum drops from 6 to 5 units only when WIM is satisfied with ENGR 199W.',
      slots: [
        {
          id: 'wim-course',
          label: 'WIM Course',
          type: 'pick-from-list',
          count: 1,
          options: [
            { dept: 'CS',   number: '191W', name: 'Writing Intensive Senior Research Project' },
            { dept: 'CS',   number: '272',  name: 'Introduction to Biomedical Informatics Research Methodology' },
            { dept: 'ENGR', number: '199W', name: 'Writing of Original Research for Engineers' },
          ],
        },
      ],
    },

  ],

  tracks: TRACKS,

  wimCourses: [
    { dept: 'CS',   number: '191W' },
    { dept: 'CS',   number: '272' },
    { dept: 'ENGR', number: '199W' },
  ],
};
