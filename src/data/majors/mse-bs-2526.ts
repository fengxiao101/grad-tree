// Management Science and Engineering (BS), 2025-2026
// Source: https://bulletin.stanford.edu/programs/MGTSC-BS/
// Cache:  course_sheets/mse-bs-2526.cache.json

import type { MajorConfig, CourseOption } from '../majorSchema';

// ── Technology in Society ─────────────────────────────────────────────────────

const TIS_OPTIONS: CourseOption[] = [
  { dept: 'AA',       number: '252' },
  { dept: 'BIOE',     number: '131' },
  { dept: 'CEE',      number: '102A' },
  { dept: 'CEE',      number: '145E' },
  { dept: 'COMM',     number: '120W' },
  { dept: 'CS',       number: '125' },
  { dept: 'CS',       number: '139' },
  { dept: 'CS',       number: '152' },
  { dept: 'CS',       number: '181' },
  { dept: 'CS',       number: '182' },
  { dept: 'CS',       number: '256' },
  { dept: 'CS',       number: '278' },
  { dept: 'EARTHSYS', number: '125' },
  { dept: 'ENGR',     number: '117' },
  { dept: 'ENGR',     number: '148' },
  { dept: 'EPS',      number: '194' },
  { dept: 'HUMBIO',   number: '174' },
  { dept: 'ME',       number: '267' },
  { dept: 'MS&E',     number: '134' },
  { dept: 'MS&E',     number: '179' },
  { dept: 'NBIO',     number: '101' },
  { dept: 'POLISCI',  number: '114S' },
  { dept: 'PUBLPOL',  number: '134' },
  { dept: 'STS',      number: '1' },
];

// ── Engineering/Math/Science Elective sub-lists ───────────────────────────────

const ENGR_ELECTIVE_OPTIONS: CourseOption[] = [
  { dept: 'ENGR', number: '10' },
  { dept: 'ENGR', number: '14' },
  { dept: 'ENGR', number: '15' },
  { dept: 'ENGR', number: '20' },
  { dept: 'ENGR', number: '21' },
  { dept: 'ENGR', number: '40M' },
  { dept: 'ENGR', number: '42' },
  { dept: 'ENGR', number: '50' },
  { dept: 'ENGR', number: '50E' },
  { dept: 'ENGR', number: '50M' },
  { dept: 'ENGR', number: '55' },
  { dept: 'ENGR', number: '65' },
  { dept: 'ENGR', number: '76' },
  { dept: 'ENGR', number: '80' },
  { dept: 'ENGR', number: '90' },
];

const MATH_ELECTIVE_OPTIONS: CourseOption[] = [
  { dept: 'CEE',  number: '101D' },
  { dept: 'CME',  number: '102' },
  { dept: 'CME',  number: '104' },
  { dept: 'CME',  number: '108' },
  { dept: 'CS',   number: '103' },
  { dept: 'MATH', number: '52' },
  { dept: 'MATH', number: '53' },
  { dept: 'MATH', number: '61CM' },
  { dept: 'MATH', number: '62CM' },
  { dept: 'MATH', number: '63CM' },
  { dept: 'MATH', number: '104' },
  { dept: 'MATH', number: '106' },
  { dept: 'MATH', number: '109' },
  { dept: 'MATH', number: '110' },
  { dept: 'MATH', number: '113' },
  { dept: 'MATH', number: '115' },
  { dept: 'MATH', number: '120' },
  { dept: 'MATH', number: '121' },
  { dept: 'MATH', number: '131P' },
];

const SCIENCE_ELECTIVE_OPTIONS: CourseOption[] = [
  { dept: 'BIO',      number: '30' },
  { dept: 'BIO',      number: '45' },
  { dept: 'BIO',      number: '47' },
  { dept: 'BIO',      number: '81' },
  { dept: 'BIO',      number: '82' },
  { dept: 'BIO',      number: '83' },
  { dept: 'BIO',      number: '84' },
  { dept: 'BIO',      number: '85' },
  { dept: 'BIO',      number: '86' },
  { dept: 'BIO',      number: '150' },
  { dept: 'CEE',      number: '63' },
  { dept: 'CEE',      number: '64' },
  { dept: 'CHEM',     number: '31A' },
  { dept: 'CHEM',     number: '31B' },
  { dept: 'CHEM',     number: '31E' },
  { dept: 'CHEM',     number: '33' },
  { dept: 'CHEM',     number: '121' },
  { dept: 'CHEM',     number: '123' },
  { dept: 'EARTHSYS', number: '2' },
  { dept: 'EARTHSYS', number: '10' },
  { dept: 'EARTHSYS', number: '11' },
  { dept: 'HUMBIO',   number: '2A' },
  { dept: 'HUMBIO',   number: '3A' },
  { dept: 'HUMBIO',   number: '4A' },
  { dept: 'PHYSICS',     number: '21' },
  { dept: 'PHYSICS',     number: '23' },
  { dept: 'PHYSICS',     number: '25' },
  { dept: 'PHYSICS',     number: '41' },
  { dept: 'PHYSICS',     number: '41E' },
  { dept: 'PHYSICS',     number: '43' },
  { dept: 'PHYSICS',     number: '45' },
  { dept: 'PHYSICS',     number: '61' },
  { dept: 'PHYSICS',     number: '71' },
  { dept: 'PHYSICS',     number: '81' },
  { dept: 'PSYCH',    number: '50' },
];

const EMS_ELECTIVE_OPTIONS: CourseOption[] = [
  ...ENGR_ELECTIVE_OPTIONS,
  ...MATH_ELECTIVE_OPTIONS,
  ...SCIENCE_ELECTIVE_OPTIONS,
];

// ── Depth area lists ──────────────────────────────────────────────────────────

const FD_OPTIONS: CourseOption[] = [
  { dept: 'MS&E', number: '140' },
  { dept: 'MS&E', number: '141' },
  { dept: 'MS&E', number: '145' },
  { dept: 'MS&E', number: '146' },
  { dept: 'MS&E', number: '152' },
  { dept: 'MS&E', number: '242' },
  { dept: 'MS&E', number: '244' },
  { dept: 'MS&E', number: '245A' },
  { dept: 'MS&E', number: '245B' },
  { dept: 'MS&E', number: '246' },
  { dept: 'MS&E', number: '247' },
  { dept: 'MS&E', number: '248' },
  { dept: 'MS&E', number: '250A' },
  { dept: 'MS&E', number: '250B' },
  { dept: 'MS&E', number: '252' },
];

const OA_OPTIONS: CourseOption[] = [
  { dept: 'MS&E', number: '112' },
  { dept: 'MS&E', number: '130' },
  { dept: 'MS&E', number: '134' },
  { dept: 'MS&E', number: '135' },
  { dept: 'MS&E', number: '213' },
  { dept: 'MS&E', number: '214' },
  { dept: 'MS&E', number: '215' },
  { dept: 'MS&E', number: '223' },
  { dept: 'MS&E', number: '226' },
  { dept: 'MS&E', number: '228' },
  { dept: 'MS&E', number: '230' },
  { dept: 'MS&E', number: '231' },
  { dept: 'MS&E', number: '232' },
  { dept: 'MS&E', number: '232H' },
  { dept: 'MS&E', number: '233' },
  { dept: 'MS&E', number: '234' },
  { dept: 'MS&E', number: '235B' },
  { dept: 'MS&E', number: '236' },
  { dept: 'MS&E', number: '237A' },
  { dept: 'MS&E', number: '238' },
  { dept: 'MS&E', number: '260' },
  { dept: 'MS&E', number: '262' },
  { dept: 'MS&E', number: '263' },
  { dept: 'MS&E', number: '267' },
  { dept: 'MS&E', number: '463' },
];

const OTP_OPTIONS: CourseOption[] = [
  { dept: 'ENGR', number: '145' },
  { dept: 'ENGR', number: '145S' },
  { dept: 'ENGR', number: '148' },
  { dept: 'MS&E', number: '165' },
  { dept: 'MS&E', number: '175' },
  { dept: 'MS&E', number: '176' },
  { dept: 'MS&E', number: '179' },
  { dept: 'MS&E', number: '184' },
  { dept: 'MS&E', number: '185' },
  { dept: 'MS&E', number: '188' },
  { dept: 'MS&E', number: '243' },
  { dept: 'MS&E', number: '254' },
  { dept: 'MS&E', number: '256' },
  { dept: 'MS&E', number: '271' },
  { dept: 'MS&E', number: '272' },
  { dept: 'MS&E', number: '275' },
  { dept: 'MS&E', number: '276' },
  { dept: 'MS&E', number: '289' },
  { dept: 'MS&E', number: '292' },
  { dept: 'MS&E', number: '296' },
  { dept: 'MS&E', number: '299' },
];

function dedupe(list: CourseOption[]): CourseOption[] {
  const seen = new Set<string>();
  return list.filter(o => {
    const key = `${o.dept}:${o.number}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const ALL_DEPTH_OPTIONS = dedupe([...FD_OPTIONS, ...OA_OPTIONS, ...OTP_OPTIONS]);

// ── Main config ───────────────────────────────────────────────────────────────

export const MSE_BS_2526: MajorConfig = {
  id: 'mse-bs-2526',
  name: 'Management Science and Engineering (BS)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MGTSC-BS/',
  category: 'major',
  totalMinUnits: 95,

  sections: [
    // ── Introductory Mathematics ───────────────────────────────────────────
    {
      id: 'intro-math',
      name: 'Introductory Mathematics',
      note: 'Students with AP BC Calculus credit (10 units) begin with CME 100/MATH 51. Students with AP AB/IB credit (6 units) start with MATH 21 and may skip MATH 19 and 20. Students without credit who have already studied MATH 19 or 20 material may begin with MATH 20 or 21 and petition to waive skipped courses.',
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
      ],
    },

    // ── Mathematics, Probability, and Statistics ───────────────────────────
    {
      id: 'math-prob-stats',
      name: 'Mathematics, Probability, and Statistics',
      slots: [
        {
          id: 'linalg',
          label: 'Linear Algebra / Vector Calculus',
          type: 'pick-one',
          options: [
            { dept: 'CME',  number: '100', name: 'Vector Calculus for Engineers' },
            { dept: 'MATH', number: '51',  name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
          ],
        },
        {
          id: 'engr108',
          label: 'ENGR 108: Introduction to Matrix Methods',
          type: 'required',
          options: [{ dept: 'ENGR', number: '108' }],
        },
        {
          id: 'mse120',
          label: 'MS&E 120: Introduction to Probability',
          type: 'required',
          options: [{ dept: 'MS&E', number: '120' }],
        },
        {
          id: 'mse121',
          label: 'MS&E 121: Introduction to Stochastic Modeling',
          type: 'required',
          options: [{ dept: 'MS&E', number: '121' }],
        },
        {
          id: 'mse125',
          label: 'MS&E 125: Introduction to Applied Statistics',
          type: 'required',
          options: [{ dept: 'MS&E', number: '125' }],
        },
      ],
    },

    // ── Science ───────────────────────────────────────────────────────────
    {
      id: 'science',
      name: 'Science',
      note: 'One course required. AP/IB credit for Chemistry or Physics may be used but will not satisfy a WAYS-SMA requirement.',
      slots: [
        {
          id: 'sci-course',
          label: 'Science Course (pick 1)',
          type: 'pick-from-list',
          count: 1,
          options: [
            { dept: 'BIO',  number: '81' },  { dept: 'BIO',  number: '82' },
            { dept: 'BIO',  number: '83' },  { dept: 'BIO',  number: '84' },
            { dept: 'BIO',  number: '85' },
            { dept: 'CHEM', number: '31A' }, { dept: 'CHEM', number: '31B' },
            { dept: 'CHEM', number: '31E' }, { dept: 'CHEM', number: '33' },
            { dept: 'PHYSICS', number: '21' },  { dept: 'PHYSICS', number: '23' },
            { dept: 'PHYSICS', number: '41' },  { dept: 'PHYSICS', number: '41E' },
            { dept: 'PHYSICS', number: '43' },
          ],
        },
      ],
    },

    // ── Technology in Society ──────────────────────────────────────────────
    {
      id: 'tis',
      name: 'Technology in Society',
      note: 'One course required. A course counted toward TiS may NOT also be used to satisfy a depth area requirement. Specifically: ENGR 148 (TiS) cannot also count for OTP depth; MS&E 134 (TiS) cannot also count for O&A depth; MS&E 179 (TiS) cannot also count for OTP depth.',
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

    // ── Engineering Fundamentals ───────────────────────────────────────────
    {
      id: 'engr-fund',
      name: 'Engineering Fundamentals',
      note: 'CS 106A may be petitioned with CS 106B completion. AP credit for CS 106A may be used. If MS&E 214 is used here (in place of MS&E 111), it cannot also count toward the O&A depth area.',
      slots: [
        {
          id: 'cs106a',
          label: 'CS 106A: Programming Methodology',
          type: 'required',
          options: [{ dept: 'CS', number: '106A' }],
          note: 'May petition to waive with CS 106B completion. AP credit accepted.',
        },
        {
          id: 'mse111',
          label: 'Optimization Course',
          type: 'pick-one',
          options: [
            { dept: 'MS&E', number: '111',   name: 'Introduction to Optimization' },
            { dept: 'MS&E', number: '111DS', name: 'Introduction to Optimization: Data Science' },
            { dept: 'MS&E', number: '111X',  name: 'Introduction to Optimization (Accelerated)' },
            { dept: 'MS&E', number: '214',   name: 'Applied Optimization' },
          ],
          note: 'If MS&E 214 is chosen here, it cannot also count toward the O&A depth area.',
        },
      ],
    },

    // ── Engineering, Math, or Science Elective ─────────────────────────────
    {
      id: 'ems-elective',
      name: 'Engineering, Math, or Science Elective',
      note: 'One additional course (3+ units) from the Engineering Fundamentals, Math, or Science elective lists. May not repeat material covered by any other requirement and may not satisfy another requirement. Only one of CS 106A or CS 106B may count toward Engineering Fundamentals; CS 106B already appears in Core Courses. AP/IB credit for Chemistry or Physics may be used here if not used for the Science requirement.',
      slots: [
        {
          id: 'ems-course',
          label: 'Engineering, Math, or Science Elective',
          type: 'pick-from-list',
          count: 1,
          options: EMS_ELECTIVE_OPTIONS,
          note: 'Engineering sub-list: ENGR 10–90. Math sub-list: CEE 101D, CME 102/104/108, CS 103, MATH 52–131P. Science sub-list: BIO/CEE/CHEM/EARTHSYS/HUMBIO/PHYSICS/PSYCH courses.',
        },
      ],
    },

    // ── Core Courses ───────────────────────────────────────────────────────
    {
      id: 'core',
      name: 'Core Courses',
      note: 'All five courses required. MS&E 108 also serves as the WIM and Capstone requirement. Students using ECON 50 for another major/minor may petition to substitute MS&E 141 for ECON 50Q. All courses must be taken for a letter grade; minimum combined GPA 2.0 for all Engineering Topics (Fundamentals + Depth) courses.',
      slots: [
        {
          id: 'cs106b',
          label: 'CS 106B: Programming Abstractions',
          type: 'required',
          options: [{ dept: 'CS', number: '106B' }],
        },
        {
          id: 'econ1',
          label: 'ECON 1: Principles of Economics',
          type: 'required',
          options: [{ dept: 'ECON', number: '1' }],
        },
        {
          id: 'econ50q',
          label: 'ECON 50Q: Economic Analysis I (Quantitative)',
          type: 'required',
          options: [{ dept: 'ECON', number: '50Q' }],
          note: 'Students using ECON 50 for another major/minor may petition to substitute MS&E 141.',
        },
        {
          id: 'mse108',
          label: 'MS&E 108: Senior Project (WIM + Capstone)',
          type: 'required',
          options: [{ dept: 'MS&E', number: '108' }],
          note: 'Satisfies the WIM and Capstone requirements simultaneously.',
        },
        {
          id: 'mse180',
          label: 'MS&E 180: Organizations: Theory and Management',
          type: 'required',
          options: [{ dept: 'MS&E', number: '180' }],
        },
      ],
    },

    // ── Depth: Finance and Decision ────────────────────────────────────────
    {
      id: 'depth-fd',
      name: 'Depth: Finance and Decision (F&D)',
      note: 'Minimum 2 courses from this area. All depth courses must be MS&E (or ENGR 145/148 for OTP). See cross-area note below.',
      slots: [
        {
          id: 'fd-courses',
          label: 'F&D Courses (pick at least 2)',
          type: 'pick-from-list',
          count: 2,
          options: FD_OPTIONS,
        },
      ],
    },

    // ── Depth: Operations and Analytics ───────────────────────────────────
    {
      id: 'depth-oa',
      name: 'Depth: Operations and Analytics (O&A)',
      note: 'Minimum 2 courses from this area. MS&E 232 and MS&E 232H are alternatives: only one counts. MS&E 214 used for Engineering Fundamentals may NOT also count here. MS&E 134 used for TiS may NOT also count here.',
      slots: [
        {
          id: 'oa-courses',
          label: 'O&A Courses (pick at least 2)',
          type: 'pick-from-list',
          count: 2,
          options: OA_OPTIONS,
          note: 'MS&E 232 and MS&E 232H are alternative versions of Game Theory: only one may count.',
        },
      ],
    },

    // ── Depth: Organizations, Technology, and Policy ───────────────────────
    {
      id: 'depth-otp',
      name: 'Depth: Organizations, Technology, and Policy (OTP)',
      note: 'Minimum 2 courses from this area. ENGR 145 and ENGR 148 count as MS&E-equivalent for the depth MS&E minimum requirement. ENGR 145 and ENGR 145S are alternatives: only one counts. ENGR 148 or MS&E 179 used for TiS may NOT also count here.',
      slots: [
        {
          id: 'otp-courses',
          label: 'OTP Courses (pick at least 2)',
          type: 'pick-from-list',
          count: 2,
          options: OTP_OPTIONS,
          note: 'ENGR 145 and ENGR 145S are alternative versions: only one may count. ENGR 145 and ENGR 148 count as MS&E-equivalent courses.',
        },
      ],
    },

    // ── Depth: Additional Courses ──────────────────────────────────────────
    {
      id: 'depth-additional',
      name: 'Depth: Additional Courses (any 2 areas)',
      note: 'Two additional courses to reach 8 depth courses total. May come from any of the three areas. For one of these two, students may petition to take a non-MS&E course in one of the areas. All depth courses must be taken for a letter grade. Minimum combined GPA 2.0 across all Engineering Fundamentals and Depth courses.',
      slots: [
        {
          id: 'depth-extra',
          label: 'Additional Depth Courses (pick 2 from any area)',
          type: 'pick-from-list',
          count: 2,
          options: ALL_DEPTH_OPTIONS,
          note: 'One of these may be a petitioned non-MS&E course in one of the three areas.',
        },
      ],
    },
  ],

  wimCourses: [
    { dept: 'MS&E', number: '108' },
  ],
};
