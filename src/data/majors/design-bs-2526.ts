// Design (BS), 2025-2026
// Source: https://bulletin.stanford.edu/programs/DESIGN-BS/

import type { MajorConfig, CourseOption } from '../majorSchema';

// ── Additional SoE Math & Science ─────────────────────────────────────────────

const ADDITIONAL_SOE_OPTIONS: CourseOption[] = [
  { dept: 'BIO',      number: '45' },   { dept: 'BIO',      number: '47' },
  { dept: 'BIO',      number: '81' },
  { dept: 'BIO',      number: '82' },   { dept: 'BIO',      number: '83' },
  { dept: 'BIO',      number: '84' },   { dept: 'BIO',      number: '85' },
  { dept: 'BIO',      number: '86' },   { dept: 'BIO',      number: '150' },
  { dept: 'CEE',      number: '63' },   { dept: 'CEE',      number: '64' },
  { dept: 'CEE',      number: '70' },   { dept: 'CEE',      number: '101D' },
  { dept: 'CEE',      number: '201D' }, { dept: 'CEE',      number: '203' },
  { dept: 'CHEM',     number: '31A' },  { dept: 'CHEM',     number: '31B' },
  { dept: 'CHEM',     number: '31E' },  { dept: 'CHEM',     number: '33' },
  { dept: 'CHEM',     number: '121' },  { dept: 'CHEM',     number: '123' },
  { dept: 'CME',      number: '100' },  { dept: 'CME',      number: '102' },
  { dept: 'CME',      number: '104' },  { dept: 'CME',      number: '106' },
  { dept: 'CME',      number: '108' },  { dept: 'CME',      number: '192' },
  { dept: 'CS',       number: '103' },  { dept: 'CS',       number: '109' },
  { dept: 'EARTHSYS', number: '2' },    { dept: 'EARTHSYS', number: '10' },
  { dept: 'EARTHSYS', number: '11' },
  { dept: 'EE',       number: '178' },
  { dept: 'ENGR',     number: '62' },
     { dept: 'ENGR',     number: '108' },



  { dept: 'HUMBIO',   number: '2A' },   { dept: 'HUMBIO',   number: '3A' },
  { dept: 'HUMBIO',   number: '4A' },
  { dept: 'MATH',     number: '19' },   { dept: 'MATH',     number: '20' },
  { dept: 'MATH',     number: '21' },   { dept: 'MATH',     number: '51' },
  { dept: 'MATH',     number: '52' },   { dept: 'MATH',     number: '53' },
  { dept: 'MATH',     number: '104' },  { dept: 'MATH',     number: '106' },
  { dept: 'MATH',     number: '109' },  { dept: 'MATH',     number: '110' },
  { dept: 'MATH',     number: '113' },  { dept: 'MATH',     number: '115' },
  { dept: 'MATH',     number: '120' },  { dept: 'MATH',     number: '121' },
  { dept: 'MATH',     number: '131P' }, { dept: 'MATH',     number: '151' },
  { dept: 'MS&E',     number: '111' },  { dept: 'MS&E',     number: '111X' },
  { dept: 'MS&E',     number: '120' },  { dept: 'MS&E',     number: '121' },
  { dept: 'MS&E',     number: '125' },
  { dept: 'PHYSICS',     number: '41' },   { dept: 'PHYSICS',     number: '41E' },
  { dept: 'PHYSICS',     number: '42' },   { dept: 'PHYSICS',     number: '43' },
  { dept: 'PHYSICS',     number: '44' },   { dept: 'PHYSICS',     number: '45' },
  { dept: 'PHYSICS',     number: '46' },   { dept: 'PHYSICS',     number: '61' },
  { dept: 'PHYSICS',     number: '61L' },  { dept: 'PHYSICS',     number: '71' },
  { dept: 'PHYSICS',     number: '26' },  { dept: 'PHYSICS',     number: '81' },
  { dept: 'PHYSICS',     number: '79L' },
  { dept: 'STATS',    number: '110' },  { dept: 'STATS',    number: '116' },
  { dept: 'STATS',    number: '60' },
];

// ── Technology in Society ─────────────────────────────────────────────────────

const TIS_OPTIONS: CourseOption[] = [
  { dept: 'AA',       number: '252' },
  { dept: 'ANTHRO',   number: '132C' },
  { dept: 'ARCHLGY',  number: '151' },
  { dept: 'BIOE',     number: '131' },
  { dept: 'BIOE',     number: '177' },    // cross-listed as DESIGN 259
  { dept: 'DESIGN',   number: '259' },
  { dept: 'CEE',      number: '102A' },
  { dept: 'CEE',      number: '145E' },
  { dept: 'CLASSICS', number: '168' },
  { dept: 'COMM',     number: '120W' },
  { dept: 'COMM',     number: '166' },
  { dept: 'CS',       number: '125' },
  { dept: 'CS',       number: '139' },
  { dept: 'CS',       number: '152' },
  { dept: 'CS',       number: '181' },
  { dept: 'CS',       number: '181W' },
  { dept: 'CS',       number: '182' },
  { dept: 'CS',       number: '256' },
  { dept: 'CS',       number: '278' },
  { dept: 'DATASCI',  number: '154' },
  { dept: 'EARTHSYS', number: '125' },
  { dept: 'ENERGY',   number: '177A' },   // must take 177A AND 177B together
  { dept: 'ENERGY',   number: '177B' },
  { dept: 'ENGR',     number: '117' },
  { dept: 'ENGR',     number: '145' },
  { dept: 'ENGR',     number: '148' },
  { dept: 'ENGR',     number: '248' },
  { dept: 'EPS',      number: '194' },
  { dept: 'EPS',      number: '204' },
  { dept: 'HUMBIO',   number: '174' },
  { dept: 'MS&E',     number: '179' },
  { dept: 'MS&E',     number: '193' },
  { dept: 'NBIO',     number: '101' },
  { dept: 'POLISCI',  number: '114S' },
  { dept: 'PUBLPOL',  number: '114' },
  { dept: 'PUBLPOL',  number: '134' },
  { dept: 'STS',      number: '1' },
  { dept: 'STS',      number: '115' },
  { dept: 'STS',      number: '200J' },
];

// ── Engineering Fundamentals ──────────────────────────────────────────────────

const ENGR_FUND_OPTIONS: CourseOption[] = [
  { dept: 'BIOE',   number: '80' },
  { dept: 'CEE',    number: '70' },
  { dept: 'CS',     number: '106A' },
  { dept: 'CS',     number: '106AX' },
  { dept: 'CS',     number: '106B' },
  { dept: 'ENGR',   number: '10' },
  { dept: 'ENGR',   number: '14' },
  { dept: 'ENGR',   number: '15' },
  { dept: 'ENGR',   number: '20' },
  { dept: 'ENGR',   number: '21' },
  { dept: 'ENGR',   number: '40M' },
  { dept: 'ENGR',   number: '42' },
  { dept: 'ENGR',   number: '50' },
  { dept: 'ENGR',   number: '50E' },
  { dept: 'ENGR',   number: '50M' },
  { dept: 'ENGR',   number: '55' },
  { dept: 'ENGR',   number: '60' },
  { dept: 'ENGR',   number: '65' },

  { dept: 'ENGR',   number: '76' },


  { dept: 'MS&E',   number: '111DS' },
  { dept: 'MS&E',   number: '111X' },
];

// ── Domain Focus: List A options (across all 4 domains) ───────────────────────

const PLANET_CLIMATE_A: CourseOption[] = [
  { dept: 'CEE',      number: '63' },    { dept: 'CEE',      number: '64' },
  { dept: 'CEE',      number: '70' },    { dept: 'CEE',      number: '166A' },
  { dept: 'CEE',      number: '176B' },
  { dept: 'EARTHSYS', number: '4' },     { dept: 'EARTHSYS', number: '10' },
  { dept: 'EARTHSYS', number: '100A' },  { dept: 'EARTHSYS', number: '102' },
  { dept: 'EARTHSYS', number: '111' },   { dept: 'EARTHSYS', number: '112' },
  { dept: 'EARTHSYS', number: '114' },   { dept: 'EARTHSYS', number: '123A' },
  { dept: 'EARTHSYS', number: '146B' },  { dept: 'EARTHSYS', number: '155' },
  { dept: 'EARTHSYS', number: '179' },   { dept: 'EARTHSYS', number: '183' },
  { dept: 'EARTHSYS', number: '185' },
  { dept: 'ENERGY',   number: '101' },   { dept: 'ENERGY',   number: '104' },
  { dept: 'EPS',      number: '20' },
  { dept: 'SUSTAIN',  number: '2' },     { dept: 'SUSTAIN',  number: '101A' },
  { dept: 'SUSTAIN',  number: '103' },   { dept: 'SUSTAIN',  number: '128' },
  { dept: 'URBANST',  number: '165' },
];

const PLANET_OCEANS_A: CourseOption[] = [
  { dept: 'BIO',      number: '71' },
  { dept: 'BIO',      number: '173H' },
  { dept: 'BIO',      number: '182H' },
  { dept: 'BIOS',     number: '236' },
  { dept: 'EARTHSYS', number: '141' },
  { dept: 'OCEANS',   number: '125H' },
  { dept: 'OCEANS',   number: '143H' },
];

const BIO_FUTURES_A: CourseOption[] = [
  { dept: 'BIOE', number: '80' },
  { dept: 'BIO',  number: '81' },
  { dept: 'BIOE', number: '44' },
  { dept: 'BIOE', number: '177' },
];

const HEALTH_A: CourseOption[] = [
  { dept: 'BIO',     number: '84' },
  { dept: 'BIO',     number: '150' },
  { dept: 'BIOE',    number: '51' },
  { dept: 'BIOE',    number: '220' },
  { dept: 'BMDS',    number: '215' },
  { dept: 'DESIGN',  number: '264' },
  { dept: 'HUMBIO',  number: '4A' },
  { dept: 'MED',     number: '275B' },
  { dept: 'SURG',    number: '101' },
];

const SOCIAL_IMPACT_A: CourseOption[] = [
  { dept: 'CEE',     number: '265D' },
  { dept: 'EARTHSYS', number: '185' },   // also in PLANET_CLIMATE_A
  { dept: 'ECON',    number: '127' },
  { dept: 'POLISCI', number: '101' },
  { dept: 'POLISCI', number: '247G' },
];

// ── Domain Focus: List B options (across all 4 domains) ───────────────────────

const PLANET_CLIMATE_B: CourseOption[] = [
  { dept: 'CEE',      number: '70' },    // also in List A
  { dept: 'CEE',      number: '107R' },
  { dept: 'CEE',      number: '130B' },
  { dept: 'EARTHSYS', number: '103' },
  { dept: 'EARTHSYS', number: '125' },
  { dept: 'EARTHSYS', number: '139A' },
  { dept: 'EARTHSYS', number: '144' },
  { dept: 'EARTHSYS', number: '156' },
  { dept: 'EARTHSYS', number: '160' },
  { dept: 'EARTHSYS', number: '168' },
  { dept: 'SUST',     number: '234' },
  { dept: 'URBANST',  number: '165' },   // also in List A
];

const PLANET_OCEANS_B: CourseOption[] = [
  { dept: 'OCEANS', number: '153H' },
  { dept: 'OCEANS', number: '174H' },
  { dept: 'OCEANS', number: '185H' },
];

const BIO_FUTURES_B: CourseOption[] = [
  { dept: 'BIOE',     number: '122' },
  { dept: 'EARTHSYS', number: '56' },
  { dept: 'OCEANS',   number: '47' },
];

const HEALTH_B: CourseOption[] = [
  { dept: 'ANES',   number: '221' },
  { dept: 'BIO',    number: '141' },
  { dept: 'BIOE',   number: '10SC' },
  { dept: 'BIOE',   number: '273' },
  { dept: 'BIOE',   number: '375' },
  { dept: 'BIOE',   number: '394' },
  { dept: 'DESIGN', number: '262' },
  { dept: 'DESIGN', number: '266' },
  { dept: 'EPI',    number: '219' },
  { dept: 'HUMBIO', number: '131' },
  { dept: 'MED',    number: '232' },
  { dept: 'MS&E',   number: '256' },
  { dept: 'PATH',   number: '151' },
  { dept: 'SURG',   number: '172' },
];

const SOCIAL_IMPACT_B: CourseOption[] = [
  { dept: 'ECON',     number: '113' },
  { dept: 'ECON',     number: '118' },
  { dept: 'ECON',     number: '166' },
  { dept: 'INTNLREL', number: '142' },
  { dept: 'ME',       number: '206A' },
  { dept: 'ME',       number: '206B' },
  { dept: 'POLISCI',  number: '114D' },
  { dept: 'POLISCI',  number: '147' },
  { dept: 'POLISCI',  number: '244C' },
];


// ── Main config ───────────────────────────────────────────────────────────────

export const DESIGN_BS_2526: MajorConfig = {
  id: 'design-bs-2526',
  name: 'Design (BS)',
  school: 'Hasso Plattner Institute of Design',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/DESIGN-BS/',
  category: 'major',
  totalMinUnits: 94,

  sections: [
    // ── Engineering Breadth: Mathematics ──────────────────────────────────
    {
      id: 'math',
      name: 'Mathematics',
      note: 'Math minimum: 20 units for Physical Form + Manufacturing and AI + Digital UX tracks; 15 units for Human Behavior track. Combined Math + Additional SoE Math & Science must total 30 units. MATH 51 / CME 100 is required only for tracks 1 and 2. AP BC (5): 10 units credit for MATH 19/20/21. AP BC (4) or AB (5): 6 units credit for MATH 19/20. MATH 19/20 may be waived if you earn C or better in MATH 21. If both MATH 51 and CME 100 are taken, only 8 units count toward the major.',
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
          id: 'linalg',
          label: 'Linear Algebra / Vector Calculus (tracks 1 + 2 only)',
          type: 'pick-one',
          optional: true,
          options: [
            { dept: 'MATH', number: '51',  name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
            { dept: 'CME',  number: '100', name: 'Vector Calculus for Engineers' },
          ],
          note: 'Required for Physical Form + Manufacturing and AI + Digital UX tracks only. Human Behavior track students do not need this course.',
        },
        {
          id: 'stats',
          label: 'Statistics',
          type: 'pick-one',
          options: [
            { dept: 'STATS', number: '60',  name: 'Introduction to Statistical Methods: Precalculus' },
            { dept: 'STATS', number: '110', name: 'Introduction to Statistics for Engineering and the Sciences' },
          ],
        },
      ],
    },

    // ── Behavioral Sciences ────────────────────────────────────────────────
    {
      id: 'behavioral-sci',
      name: 'Behavioral Sciences',
      note: 'Only PSYCH 1 is allowed for this requirement. No other PSYCH or PSYC class may substitute.',
      slots: [
        {
          id: 'psych1',
          label: 'PSYCH 1: Introduction to Psychology',
          type: 'required',
          options: [{ dept: 'PSYCH', number: '1' }],
        },
      ],
    },

    // ── Additional SoE Math & Science ─────────────────────────────────────
    {
      id: 'additional-soe',
      name: 'Additional School of Engineering Math and Science',
      note: 'Take enough courses from this list (in addition to the Mathematics section above) to reach 30 units total between Math and Additional SoE. Quantity varies by track. PHYSICS 41 is only required for Physical Form + Manufacturing track (may choose PHYSICS 41 or PHYSICS 41E, but not both). CS 103 and CS 109 are recommended for AI + Digital UX track. If MATH 51 and CME 100 are both taken, only 8 units total count.',
      slots: [
        {
          id: 'additional-soe-courses',
          label: 'Additional SoE Math or Science (min 1, more to reach 30 total)',
          type: 'pick-from-list',
          count: 1,
          options: ADDITIONAL_SOE_OPTIONS,
        },
      ],
    },

    // ── Technology in Society ──────────────────────────────────────────────
    {
      id: 'tis',
      name: 'Technology in Society',
      note: 'One course required. ENERGY 177A and ENERGY 177B must BOTH be taken (3 units each) together to fulfill TiS. NBIO 101 is by application only and must be taken for 3 units and a letter grade.',
      slots: [
        {
          id: 'tis-course',
          label: 'Technology in Society Course',
          type: 'pick-from-list',
          count: 1,
          options: TIS_OPTIONS,
          note: 'BIOE 177 and DESIGN 259 are the same course cross-listed. CS 181 and CS 181W are the same course (W = WIM).',
        },
      ],
    },

    // ── Engineering Fundamentals ───────────────────────────────────────────
    {
      id: 'engr-fund',
      name: 'Engineering Fundamentals',
      note: 'Minimum 2 courses required. Track requirements: ENGR 14 is only required for Physical Form + Manufacturing track. CS 106A is only required for AI + Digital UX track. Only CS 106A or CS 106B may count (not both). CS 106M (1 unit companion to CS 106B) does not count as a standalone qualifying course.',
      slots: [
        {
          id: 'engr-fund-courses',
          label: 'Engineering Fundamentals Courses (min 2)',
          type: 'pick-from-list',
          count: 2,
          options: ENGR_FUND_OPTIONS,
        },
      ],
    },

    // ── Design Core ────────────────────────────────────────────────────────
    {
      id: 'design-core',
      name: 'Design Core',
      note: 'All courses required. DESIGN 160R is a 1-unit required advisory course taken junior year. DESIGN 151 is highly recommended but no longer required starting AY26 (units count toward the 180-unit minimum).',
      slots: [
        { id: 'design1',    label: 'DESIGN 1: Introduction to Design',                  type: 'required', options: [{ dept: 'DESIGN', number: '1' }] },
        { id: 'design11',   label: 'DESIGN 11: Visual Thinking',                         type: 'required', options: [{ dept: 'DESIGN', number: '11' }] },
        { id: 'design101',  label: 'DESIGN 101: History and Ethics of Design',           type: 'required', options: [{ dept: 'DESIGN', number: '101' }] },
        { id: 'design121',  label: 'DESIGN 121: Introduction to Human Values in Design', type: 'required', options: [{ dept: 'DESIGN', number: '121' }] },
        { id: 'design131',  label: 'DESIGN 131: Advanced Design: Needfinding',           type: 'required', options: [{ dept: 'DESIGN', number: '131' }] },
        { id: 'design141',  label: 'DESIGN 141: Design Methods',                         type: 'required', options: [{ dept: 'DESIGN', number: '141' }] },
        { id: 'design160r', label: 'DESIGN 160R: Design Formation (1 unit, junior year)', type: 'required', options: [{ dept: 'DESIGN', number: '160R' }] },
      ],
    },

    // ── Visual Expression Elective ─────────────────────────────────────────
    {
      id: 'visual-expr',
      name: 'Visual Expression Elective',
      note: 'Choose ONE option. DESIGN 172 and DESIGN 173 must both be taken together as a pair to satisfy this requirement.',
      slots: [],
      pickOneGroup: [
        {
          id: 'vis-cs448b',
          name: 'CS 448B: Data Visualization',
          slots: [
            { id: 'vis-cs448b-course', label: 'CS 448B: Data Visualization', type: 'required', options: [{ dept: 'CS', number: '448B' }] },
          ],
        },
        {
          id: 'vis-d60',
          name: 'DESIGN 60: Visual Expressions',
          slots: [
            { id: 'vis-d60-course', label: 'DESIGN 60: Visual Expressions', type: 'required', options: [{ dept: 'DESIGN', number: '60' }] },
          ],
        },
        {
          id: 'vis-d170',
          name: 'DESIGN 170: Visual Frontiers',
          slots: [
            { id: 'vis-d170-course', label: 'DESIGN 170: Visual Frontiers', type: 'required', options: [{ dept: 'DESIGN', number: '170' }] },
          ],
        },
        {
          id: 'vis-d172-173',
          name: 'DESIGN 172 + DESIGN 173 (both required)',
          note: 'Both courses must be taken together to fulfill this elective.',
          slots: [
            { id: 'vis-d172', label: 'DESIGN 172: Design Sketching', type: 'required', options: [{ dept: 'DESIGN', number: '172' }] },
            { id: 'vis-d173', label: 'DESIGN 173: Digital Design Principles and Applications', type: 'required', options: [{ dept: 'DESIGN', number: '173' }] },
          ],
        },
      ],
    },

    // ── Domain Focus Areas ─────────────────────────────────────────────────
    {
      id: 'domain',
      name: 'Domain Focus Areas',
      note: 'Choose ONE domain. Complete 1 course from List A and 2 courses from List B of that same domain. Plan with a d.school Domain Co-Lead. All 3 courses must be on the approved list in the year taken.',
      slots: [],
      pickOneGroup: [
        {
          id: 'domain-climate',
          name: 'Designing for the Planet: Climate + Environment Pathway',
          slots: [
            { id: 'climate-a', label: 'List A: Climate/Environment Course (pick 1)', type: 'pick-from-list', count: 1, options: PLANET_CLIMATE_A },
            { id: 'climate-b', label: 'List B: Planetary Health/Energy/GIS Courses (pick 2)', type: 'pick-from-list', count: 2, options: PLANET_CLIMATE_B },
          ],
        },
        {
          id: 'domain-oceans',
          name: 'Designing for the Planet: Oceans Pathway',
          slots: [
            { id: 'oceans-a', label: 'List A: Oceans/Ecology Course (pick 1)', type: 'pick-from-list', count: 1, options: PLANET_OCEANS_A },
            { id: 'oceans-b', label: 'List B: Marine Conservation Courses (pick 2)', type: 'pick-from-list', count: 2, options: PLANET_OCEANS_B },
          ],
        },
        {
          id: 'domain-bio',
          name: 'Designing for Biological Futures',
          slots: [
            { id: 'bio-a', label: 'List A: Bioengineering/Ecology Course (pick 1)', type: 'pick-from-list', count: 1, options: BIO_FUTURES_A },
            { id: 'bio-b', label: 'List B: Building with Biology Courses (pick 2)', type: 'pick-from-list', count: 2, options: BIO_FUTURES_B },
          ],
        },
        {
          id: 'domain-health',
          name: 'Designing for Health',
          slots: [
            { id: 'health-a', label: 'List A: Anatomy/Physiology Course (pick 1)', type: 'pick-from-list', count: 1, options: HEALTH_A },
            { id: 'health-b', label: 'List B: Health Technology Innovation Courses (pick 2)', type: 'pick-from-list', count: 2, options: HEALTH_B },
          ],
        },
        {
          id: 'domain-social',
          name: 'Designing for Social Impact',
          slots: [
            { id: 'social-a', label: 'List A: Political Economy/Development Course (pick 1)', type: 'pick-from-list', count: 1, options: SOCIAL_IMPACT_A },
            { id: 'social-b', label: 'List B: Development/Governance Courses (pick 2)', type: 'pick-from-list', count: 2, options: SOCIAL_IMPACT_B },
          ],
        },
      ],
    },

    // ── Methods Depth: track selector ──────────────────────────────────────
    {
      id: 'methods-track',
      name: 'Methods Depth Area',
      trackSelector: true,
      note: 'Choose one of three Methods Depth tracks. Track prerequisites must be completed in Engineering Breadth and Fundamentals. See track-specific notes.',
      slots: [],
    },

    // ── Capstone ──────────────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone',
      note: 'Choose ONE of two sequences: Sequence 1 (DESIGN 161A + 161B) or Sequence 2 (DESIGN 162A + 162B). Do not mix sequences. DESIGN 161A and 161B also satisfy the WIM requirement.',
      slots: [
        {
          id: 'capstone-1',
          label: 'Capstone Part 1',
          type: 'pick-one',
          options: [
            { dept: 'DESIGN', number: '161A', name: 'Advanced Design: Capstone 1 (WIM)' },
            { dept: 'DESIGN', number: '162A', name: 'Advanced Design: Impact Studio Capstone' },
          ],
        },
        {
          id: 'capstone-2',
          label: 'Capstone Part 2',
          type: 'pick-one',
          options: [
            { dept: 'DESIGN', number: '161B', name: 'Advanced Design: Capstone 2 (WIM)' },
            { dept: 'DESIGN', number: '162B', name: 'Advanced Design: Impact Studio Capstone' },
          ],
          note: 'Must match Capstone Part 1: 161A → 161B, or 162A → 162B.',
        },
      ],
    },
  ],

  tracks: [
    // ── Track 1: Physical Form + Manufacturing ────────────────────────────
    {
      id: 'physical-form',
      name: 'Physical Form + Manufacturing',
      sections: [
        {
          id: 'physical-methods',
          name: 'Physical Form + Manufacturing Methods',
          note: 'Prerequisites expected in Engineering Breadth: ENGR 14 (Eng Fundamentals), CME 100 or MATH 51 (Math), PHYSICS 41 (Additional SoE Science).',
          slots: [
            {
              id: 'mechanics',
              label: 'Mechanics of Materials',
              type: 'pick-one',
              options: [
                { dept: 'ME',  number: '80',    name: 'Mechanics of Materials' },
                { dept: 'CEE', number: '101A',  name: 'Mechanics of Materials' },
              ],
            },
            {
              id: 'me102',
              label: 'ME 102: Foundations of Product Realization',
              type: 'required',
              options: [{ dept: 'ME', number: '102' }],
            },
            {
              id: 'me103',
              label: 'ME 103: Product Realization: Design and Making',
              type: 'required',
              options: [{ dept: 'ME', number: '103' }],
            },
            {
              id: 'me-advanced',
              label: 'Advanced Design / Manufacturing Elective',
              type: 'pick-one',
              options: [
                { dept: 'ME', number: '104', name: 'Mechanical Systems Design' },
                { dept: 'ME', number: '129', name: 'Manufacturing Processes and Design' },
                { dept: 'ME', number: '152', name: 'Material Behaviors and Failure Prediction' },
                { dept: 'ME', number: '210', name: 'Introduction to Mechatronics' },
                { dept: 'ME', number: '220', name: 'Introduction to Sensors' },
              ],
            },
          ],
        },
      ],
    },

    // ── Track 2: AI + Digital User Experience ─────────────────────────────
    {
      id: 'ai-digital',
      name: 'AI + Digital User Experience',
      sections: [
        {
          id: 'ai-methods',
          name: 'AI + Digital User Experience Methods',
          note: 'Prerequisites expected in Engineering Breadth: CS 106A (Eng Fundamentals), MATH 51 or CME 100 (Math), CS 103 and CS 109 recommended (Additional SoE Math).',
          slots: [
            {
              id: 'cs106b',
              label: 'CS 106B: Programming Abstractions',
              type: 'required',
              options: [{ dept: 'CS', number: '106B' }],
            },
            {
              id: 'cs-language',
              label: 'Languages or Robotics',
              type: 'pick-one',
              options: [
                { dept: 'CS', number: '124',  name: 'From Languages to Information' },
                { dept: 'CS', number: '223A', name: 'Introduction to Robotics' },
              ],
            },
            {
              id: 'hci-studio',
              label: 'HCI Design Studio',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CS', number: '247' },
                { dept: 'CS', number: '247A' },
                { dept: 'CS', number: '247B' },
                { dept: 'CS', number: '247G' },
                { dept: 'CS', number: '247I' },
                { dept: 'CS', number: '247L' },
                { dept: 'CS', number: '247S' },
                { dept: 'CS', number: '448B' },
                { dept: 'CS', number: '278' },
                { dept: 'CS', number: '347' },
                { dept: 'CS', number: '377Q' },
              ],
              note: 'CS 448B used here cannot also count for the Visual Expression Elective (no double-counting).',
            },
            {
              id: 'perception-ai',
              label: 'Perception / AI Foundations',
              type: 'pick-one',
              options: [
                { dept: 'PSYCH',    number: '30',  name: 'Introduction to Perception' },
                { dept: 'BIOMEDIN', number: '220', name: 'Artificial Intelligence in Healthcare' },
                { dept: 'CS',       number: '272', name: 'Introduction to Biomedical Informatics Research Methodology' },
                { dept: 'PSYCH',    number: '293', name: 'What Makes a Good Explanation? Psychological and Philosophical Perspectives' },
              ],
            },
          ],
        },
      ],
    },

    // ── Track 3: Human Behavior + Multi-stakeholder Research ──────────────
    {
      id: 'human-behavior',
      name: 'Human Behavior + Multi-stakeholder Research',
      sections: [
        {
          id: 'hb-methods',
          name: 'Human Behavior + Multi-stakeholder Research Methods',
          note: 'MATH 51 / CME 100 is NOT required for this track. ANTHRO 91 appears in both the Intro Social Science and Research Methods slots: it can only satisfy ONE of the two.',
          slots: [
            {
              id: 'social-intro',
              label: 'Intro Social Science Course',
              type: 'pick-one',
              options: [
                { dept: 'COMM',   number: '1',     name: 'Introduction to Communication' },
                { dept: 'ANTHRO', number: '91',    name: 'Method and Evidence in Anthropology' },
                { dept: 'MS&E',   number: '180',   name: 'Organizations: Theory and Management' },
                { dept: 'PSYCH',  number: '70',    name: 'Self and Society: Introduction to Social Psychology' },
                { dept: 'PSYCH',  number: '80',    name: 'Introduction to Personality and Affective Science' },
                { dept: 'SOC',    number: '1',     name: 'Introduction to Sociology' },
                { dept: 'SOC',    number: '180A',  name: 'Foundations of Social Research' },
              ],
            },
            {
              id: 'research-methods',
              label: 'Research Methods Course',
              type: 'pick-one',
              options: [
                { dept: 'HUMBIO',  number: '82A',  name: 'Qualitative Research Methodology' },
                { dept: 'ANTHRO',  number: '91',   name: 'Method and Evidence in Anthropology' },
                { dept: 'CHPR',    number: '247',  name: 'Methods in Community Assessment, Evaluation, and Research' },
                { dept: 'URBANST', number: '123A', name: 'Designing Research for Social Justice: Creating a Community Engaged Research Project' },
              ],
              note: 'ANTHRO 91 cannot satisfy both this slot and the Intro Social Science slot above.',
            },
            {
              id: 'quant',
              label: 'Quantitative Research Methods',
              type: 'pick-one',
              options: [
                { dept: 'ANTHRO', number: '116',  name: 'Data Analysis for Quantitative Research' },
                { dept: 'COMM',   number: '106',  name: 'Communication Research Methods' },
                { dept: 'STATS',  number: '191',  name: 'Introduction to Applied Statistics' },
              ],
            },
            {
              id: 'hci-research',
              label: 'HCI / Research Topics',
              type: 'pick-one',
              options: [
                { dept: 'CS',   number: '347',  name: 'Human-Computer Interaction: Foundations and Frontiers' },
                { dept: 'COMM', number: '124',  name: 'Truth, Trust, and Tech' },
                { dept: 'CS',   number: '278',  name: 'Social Computing' },
                { dept: 'MS&E', number: '92Q',  name: 'International Environmental Policy' },
              ],
            },
          ],
        },
      ],
    },
  ],

  wimCourses: [
    { dept: 'DESIGN', number: '151' },
    { dept: 'DESIGN', number: '161A' },
    { dept: 'DESIGN', number: '161B' },
  ],
};
