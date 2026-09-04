// PHYSICS BS: Physics, 2025-2026
// Source: https://bulletin.stanford.edu/programs/PHYS-BS/
// totalMinUnits: 77. University min: 180.
// All courses require letter grade C- or better (S acceptable for PHYSICS 41, 61, 61L for 2022+).
// PHYSICS 100, 108, or 171 may count for BOTH Capstone Option 3 AND a pathway requirement -
// the ONLY case where double-counting is explicitly permitted.

import type { MajorConfig } from '../majorSchema';
import {
  co, req, pickOne, pickFrom, anyApproved, section, trackSelectorSection, track,
} from '../majorBuilders';

// Practicum options shared by most pathways
const COMMON_PRACTICUM = [
  co('PHYSICS', '100'),
  co('PHYSICS', '104'),
  co('PHYSICS', '105'),
  co('PHYSICS', '106'),
  co('PHYSICS', '107'),
  co('PHYSICS', '108'),
  co('PHYSICS', '113'),
  co('PHYSICS', '166'),
];

export const PHYS_BS_2526: MajorConfig = {
  id: 'phys-bs-2526',
  name: 'Physics (BS)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  category: 'major',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PHYS-BS/',
  totalMinUnits: 77,
  doubleCountCourses: [
    co('PHYSICS', '100'),
    co('PHYSICS', '108'),
    co('PHYSICS', '171'),
  ],

  wimCourses: [
    co('PHYSICS', '191', 'Scientific Communication in Physics'),
  ],

  sections: [
    // ── Introductory Physics ──────────────────────────────────────────────────
    section('intro-physics', 'Introductory Physics (all required)', [
      req('PHYSICS', '41'),
      req('PHYSICS', '43'),
      req('PHYSICS', '61'),
      req('PHYSICS', '61L'),
      req('PHYSICS', '71'),
      pickOne('phys-lab-79', 'PHYSICS 79L or PHYSICS 89L', [
        co('PHYSICS', '79L'),
        co('PHYSICS', '89L'),
      ]),
      req('PHYSICS', '81'),
      pickOne('phys-lab-81', 'PHYSICS 81L or PHYSICS 71L', [
        co('PHYSICS', '81L'),
        co('PHYSICS', '71L'),
      ]),
    ], {
      note: 'For students entering Autumn 2022 or later. PHYSICS 79L was offered as PHYSICS 89L prior to 2025-26; PHYSICS 81L was offered as PHYSICS 71L prior to 2025-26. Students with sufficient lab preparation who do not take all three required introductory lab courses may substitute an extra advanced lab course (PHYSICS 100, 104, 106, or 108): requires formal application. All students must take the Physics Placement Diagnostic before enrolling.',
    }),

    // ── Introductory Mathematics ──────────────────────────────────────────────
    section('intro-math', 'Introductory Mathematics', [
      pickOne('math-series-1', 'Math Series: Course 1', [
        co('MATH', '51'),
        co('MATH', '61CM'),
      ]),
      pickOne('math-series-2', 'Math Series: Course 2', [
        co('MATH', '52'),
        co('MATH', '62CM'),
      ]),
      pickOne('math-series-3', 'Math Series: Course 3', [
        co('MATH', '53'),
        co('MATH', '63CM'),
      ]),
      pickFrom('math-pde', 'PDE Math Course (pick 1)', 1, [
        co('PHYSICS', '111', 'Partial Differential Equations of Mathematical Physics'),
        co('MATH', '131P', 'Partial Differential Equations'),
        co('MATH', '173', 'Theory of Partial Differential Equations'),
        co('MATH', '220A', 'Partial Differential Equations of Applied Mathematics'),
      ], 'One PDE course required. Qualifiers: PHYSICS 111, MATH 131P, MATH 173, or MATH 220A.'),
    ], {
      note: 'Complete ONE full series: Option A = MATH 51 + MATH 52 + MATH 53, OR Option B = MATH 61CM + MATH 62CM + MATH 63CM. Do not mix courses across series. Plus at least one PDE course from the approved list.',
    }),

    // ── Intermediate Physics ──────────────────────────────────────────────────
    section('intermediate-physics', 'Intermediate Physics (all required)', [
      req('PHYSICS', '120', 'PHYSICS 120: Electromagnetism'),
      req('PHYSICS', '130', 'PHYSICS 130: Quantum Mechanics I'),
      req('PHYSICS', '170', 'PHYSICS 170: Thermodynamics, Kinetic Theory, and Statistical Mechanics I'),
    ], {
      note: 'All three intermediate courses are required for students entering Autumn 2022 or later.',
    }),

    // ── Pathway track selector ────────────────────────────────────────────────
    trackSelectorSection('pathway', 'Depth Pathway',
      'Choose ONE of the eight pathways below and complete six additional courses. A course taken to satisfy a Core Program Requirement cannot also count for an Individual Pathway requirement. The only exception: PHYSICS 100, 108, or 171 may count for both Capstone Option 3 and a pathway requirement. All pathway courses must be taken for a letter grade (C- or better).'
    ),

    // ── Writing in the Major ──────────────────────────────────────────────────
    section('wim', 'Writing in the Major (WIM)', [
      req('PHYSICS', '191', 'PHYSICS 191: Scientific Communication in Physics',
        'Taking PHYSICS 191 for the Research Project + Capstone Paper option (Capstone Option 2) also satisfies WIM simultaneously.'),
    ]),

    // ── Capstone Experience ───────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (choose ONE option)',
      note: 'Effective for Class of 2025 and later. Complete exactly ONE of the three options. For Honors distinction (optional): overall GPA ≥ 3.30 AND physics major GPA ≥ 3.50; submit Honors application by the week before Thanksgiving of senior year.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-thesis',
          name: 'Option 1: Senior Thesis (PHYSICS 205)',
          note: 'Minimum 3 PHYSICS 205 units for a letter grade. Submit Senior Thesis Application by Thanksgiving break of the academic year in which you plan to graduate. A written report and public presentation by mid-May are required.',
          slots: [
            { id: 'cap-thesis-205', label: 'PHYSICS 205: Senior Thesis Research (min 3 units)', type: 'required', minUnits: 3, options: [co('PHYSICS', '205')] },
          ],
        },
        {
          id: 'cap-paper',
          name: 'Option 2: Research Project + Capstone Paper',
          note: 'Carry out a physics-related research project (Stanford or another institution), submit a proposal to the Director of Undergraduate Studies, then write a Capstone paper. If written through PHYSICS 191, it simultaneously satisfies WIM.',
          slots: [
            { id: 'cap-paper-course', label: 'PHYSICS 191 or PHYSICS 192: Capstone Paper', type: 'pick-one', options: [co('PHYSICS', '191'), co('PHYSICS', '192')] },
          ],
        },
        {
          id: 'cap-course',
          name: 'Option 3: Course Option (PHYSICS 100, 108, or 171)',
          note: 'Complete at least one of PHYSICS 100, PHYSICS 108, or PHYSICS 171. These are the ONLY courses permitted to double-count for both the Capstone requirement and a pathway requirement. PHYSICS 100 and 108 may have limited enrollment: have a backup plan.',
          slots: [
            { id: 'cap-course-pick', label: 'PHYSICS 100, 108, or 171: Course Capstone', type: 'pick-one', options: [co('PHYSICS', '100'), co('PHYSICS', '108'), co('PHYSICS', '171')] },
          ],
        },
      ],
    },
  ],

  tracks: [
    // ── 1. Core Pathway ───────────────────────────────────────────────────────
    track('core', 'Core', [
      section('core-req', 'Required Courses (all required)', [
        req('PHYSICS', '110', 'PHYSICS 110: Advanced Mechanics'),
        req('PHYSICS', '121', 'PHYSICS 121: Electrodynamics'),
        req('PHYSICS', '131', 'PHYSICS 131: Quantum Mechanics II'),
        req('PHYSICS', '171', 'PHYSICS 171: Thermodynamics, Kinetic Theory, and Statistical Mechanics II'),
      ], {
        note: 'Recommended starting point for students considering applying to PhD programs in Physics.',
      }),
      section('core-practicum', 'Practicum (pick 1)', [
        pickOne('core-prac', 'Practicum Course', COMMON_PRACTICUM),
      ]),
      section('core-elective', 'Elective (pick 1)', [
        anyApproved('core-elec', 'Physics or Math Elective', [
          co('CS', '109'),
          co('STATS', '116'),
          co('STATS', '117'),
          co('STATS', '118'),
          co('EE', '261'),
          co('PHYSICS', '112'),
        ], 'Options: CS 109, STATS 116/117/118, EE 261, PHYSICS 112, any MATH 101+ (not MATH 197, ≥3 units), or any PHYSICS/APPPHYS course 100+ (≥3 units, excluding PHYSICS 190/198/199/201/205/240/241/290/291/293/294, APPPHYS 100/290/291/390, PHYSICS or APPPHYS 400+).'),
      ]),
    ]),

    // ── 2. Astrophysics Pathway ───────────────────────────────────────────────
    track('astrophysics', 'Astrophysics', [
      section('astro-req', 'Required Courses (all required)', [
        req('PHYSICS', '100', 'PHYSICS 100: Introduction to Observational Astrophysics'),
        req('PHYSICS', '160', 'PHYSICS 160: Introduction to Stellar and Galactic Astrophysics'),
        req('PHYSICS', '161', 'PHYSICS 161: Introduction to Cosmology and Extragalactic Astrophysics'),
      ], {
        note: 'PHYSICS 160 and 161 are jointly taught to undergraduates and graduate students (PHYSICS 260/261 are for grad students: undergraduates must register for 160/161).',
      }),
      section('astro-add1', 'Additional Course (pick 1)', [
        pickFrom('astro-pick1', 'Additional Course', 1, [
          co('PHYSICS', '113'),
          co('PHYSICS', '166'),
          co('PHYSICS', '267'),
          co('STATS', '200'),
          co('STATS', '116'),
          co('STATS', '117'),
          co('STATS', '118'),
          co('CS', '109'),
        ], 'Options include: PHYSICS 113 or 166; PHYSICS 267 or STATS 200 (alternatives); STATS 116, 117, 118, or CS 109 (alternatives).'),
      ]),
      section('astro-add2', 'Advanced Physics Courses (pick 2)', [
        pickFrom('astro-pick2', 'Advanced Courses', 2, [
          co('EPS', '219'),
          co('PHYSICS', '110'),
          co('PHYSICS', '121'),
          co('PHYSICS', '131'),
          co('PHYSICS', '171'),
          co('PHYSICS', '262'),
        ], 'GEOLSCI 219 also counts (same as EPS 219). PHYSICS 160 and 161 may NOT double-count here.'),
      ]),
    ]),

    // ── 3. Biophysics Pathway ─────────────────────────────────────────────────
    track('biophysics', 'Biophysics', [
      section('bio-req', 'Required Courses', [
        pickOne('bio-phys-req1', 'PHYSICS 110 or PHYSICS 131', [
          co('PHYSICS', '110'),
          co('PHYSICS', '131'),
        ]),
        req('PHYSICS', '171', 'PHYSICS 171: Thermodynamics, Kinetic Theory, and Statistical Mechanics II'),
      ], {
        note: 'Physics majors interested in careers in biophysics are recommended to also pursue a minor in Biology.',
      }),
      section('bio-pick3', 'Biophysics Electives (pick 3)', [
        pickFrom('bio-elec', 'Biophysics/Biology/Chemistry Courses', 3, [
          co('APPPHYS', '205'),
          co('BIO', '126'),
          co('APPPHYS', '223'),
          co('BIO', '223'),
          co('BIOE', '213'),
          co('APPPHYS', '237'),
          co('BIO', '251'),
          co('APPPHYS', '293'),
          co('PSYCH', '242'),
          co('APPPHYS', '294'),
          co('BIO', '294'),
          co('BIOE', '42'),
          co('BIOE', '101'),
          co('BIOE', '102'),
        ], 'Many pairs are cross-listed (e.g., APPPHYS 205 / BIO 126: either section counts).'),
      ]),
      section('bio-practicum', 'Practicum (pick 1)', [
        pickOne('bio-prac', 'Practicum Course', [
          co('APPPHYS', '232'),
          ...COMMON_PRACTICUM,
        ]),
      ]),
    ]),

    // ── 4. Computational Physics & Data Science Pathway ───────────────────────
    track('computational', 'Computational Physics & Data Science', [
      section('comp-req', 'Required Courses', [
        pickOne('comp-phys-req', 'PHYSICS 110, PHYSICS 131, or PHYSICS 171', [
          co('PHYSICS', '110'),
          co('PHYSICS', '131'),
          co('PHYSICS', '171'),
        ]),
        req('PHYSICS', '113', 'PHYSICS 113: Computational Physics'),
      ]),
      section('comp-pick3', 'CS/Stats Electives (pick 3)', [
        pickFrom('comp-elec', 'Computational Courses', 3, [
          co('CS', '109'),
          co('STATS', '116'),
          co('STATS', '117'),
          co('STATS', '118'),
          co('CS', '129'),
          co('CS', '154'),
          co('CS', '161'),
          co('CS', '205L'),
          co('CS', '221'),
          co('CS', '229'),
          co('CS', '230'),
          co('PHYSICS', '166'),
          co('STATS', '200'),
          co('STATS', '203'),
          co('STATS', '203V'),
          co('STATS', '270'),
          co('STATS', '271'),
        ], 'STATS 203 and 203V are alternatives; STATS 270 and 271 are alternatives.'),
      ]),
      section('comp-phys-elec', 'Physics Elective (1 PHYSICS/APPPHYS course)', [
        anyApproved('comp-phys-elec-slot', 'Physics/Applied Physics Elective', [],
          'Any PHYSICS or APPPHYS course ≥3 units, numbered 100+. Excluded: PHYSICS 190/198/199/201/205/240/241/290/291/293/294, APPPHYS 100/290/291/390, PHYSICS or APPPHYS 400+.'),
      ]),
    ]),

    // ── 5. Geophysics Pathway ─────────────────────────────────────────────────
    track('geophysics', 'Geophysics', [
      section('geo-req', 'Required Courses', [
        req('PHYSICS', '110', 'PHYSICS 110: Advanced Mechanics'),
        pickOne('geo-req2', 'PHYSICS 121, PHYSICS 131, or PHYSICS 171', [
          co('PHYSICS', '121'),
          co('PHYSICS', '131'),
          co('PHYSICS', '171'),
        ]),
      ], {
        note: 'Requirement for students enrolled in Autumn 2023 or later.',
      }),
      section('geo-pick3', 'Geoscience Electives (pick 3)', [
        pickFrom('geo-elec', 'Geoscience/Earth Science Courses', 3, [
          co('EARTHSYS', '146A'),
          co('EARTHSYS', '146B'),
          co('EARTHSYS', '164'),
          co('ESS', '288'),
          co('GEOPHYS', '110'),
          co('GEOPHYS', '120'),
          co('GEOPHYS', '128'),
          co('GEOPHYS', '130'),
          co('GEOPHYS', '148'),
          co('GEOPHYS', '162'),
          co('GEOPHYS', '165'),
          co('GEOPHYS', '182'),
          co('GEOPHYS', '184'),
          co('GEOPHYS', '188'),
          co('GEOPHYS', '227'),
          co('GEOPHYS', '237'),
          co('GEOPHYS', '248'),
          co('GEOPHYS', '288'),
        ], 'GEOPHYS 148 and GEOPHYS 248 are the same course at different levels: either counts.'),
      ]),
      section('geo-practicum', 'Practicum (pick 1)', [
        pickOne('geo-prac', 'Practicum Course', COMMON_PRACTICUM),
      ]),
    ]),

    // ── 6. Mathematical Physics Pathway ──────────────────────────────────────
    track('mathematical-physics', 'Mathematical Physics', [
      section('mathphys-req', 'Required Course', [
        req('PHYSICS', '110', 'PHYSICS 110: Advanced Mechanics'),
      ]),
      section('mathphys-practicum', 'Practicum (pick 1)', [
        pickOne('mathphys-prac', 'Practicum Course', COMMON_PRACTICUM),
      ]),
      section('mathphys-math', 'Math Electives (pick 2 minimum)', [
        {
          ...pickOne('mathphys-probability', 'Probability Course', [
            co('CS', '109'),
            co('STATS', '116'),
            co('STATS', '117'),
            co('STATS', '118'),
          ], 'CS 109, STATS 116, 117, 118 are alternatives; at most one counts toward this requirement.'),
          optional: true,
        },
        {
          ...req('EE', '261'),
          optional: true,
        },
        {
          ...req('PHYSICS', '112'),
          optional: true,
        },
        {
          ...anyApproved('mathphys-math-general', 'MATH 101+ Electives', [],
            'Any MATH course numbered 101 or higher (not MATH 197), at least 3 units each.'),
          count: 2,
          optional: true,
        },
      ], { minCourses: 2 }),
      section('mathphys-elec', 'Additional Electives (pick 2)', [
        {
          ...anyApproved('mathphys-add-elec', 'Additional PHYSICS/APPPHYS or MATH Electives (×2)', [],
            'Complete 2 additional electives: any PHYSICS or APPPHYS course ≥3 units numbered 100+, or an extra eligible MATH elective from the math-electives list. Excluded: PHYSICS 190/198/199/201/205/240/241/290/291/293/294, APPPHYS 100/290/291/390, PHYSICS or APPPHYS 400+.'),
          count: 2,
        },
      ]),
    ]),

    // ── 7. Physics Education Pathway ──────────────────────────────────────────
    track('physics-education', 'Physics Education', [
      section('physedu-req', 'Required Courses', [
        req('PHYSICS', '110', 'PHYSICS 110: Advanced Mechanics'),
        pickOne('physedu-req2', 'PHYSICS 121, PHYSICS 131, or PHYSICS 171', [
          co('PHYSICS', '121'),
          co('PHYSICS', '131'),
          co('PHYSICS', '171'),
        ]),
      ], {
        note: 'Requirement for students who matriculated in Autumn 2023 or later.',
      }),
      section('physedu-pick3', 'Education Electives (pick 3)', [
        pickFrom('physedu-elec', 'Education/Learning Science Courses', 3, [
          co('EDUC', '101'),
          co('EDUC', '218'),
          co('EDUC', '280'),
          co('EDUC', '328'),
          co('EDUC', '332'),
          co('EDUC', '357'),
          co('EDUC', '391'),
          co('EDUC', '398'),
          co('EDUC', '400A'),
          co('EDUC', '486'),
          co('PHYSICS', '295'),
        ], 'PHYSICS 295 and EDUC 280 are co-listed: either section counts.'),
      ]),
      section('physedu-practicum', 'Practicum (pick 1)', [
        pickOne('physedu-prac', 'Practicum Course', COMMON_PRACTICUM),
      ]),
    ]),

    // ── 8. Quantum Science & Information Pathway ──────────────────────────────
    track('quantum-science', 'Quantum Science & Information', [
      section('quant-req', 'Required Courses', [
        pickOne('quant-req1', 'PHYSICS 110, PHYSICS 121, or PHYSICS 171', [
          co('PHYSICS', '110'),
          co('PHYSICS', '121'),
          co('PHYSICS', '171'),
        ]),
        req('PHYSICS', '131', 'PHYSICS 131: Quantum Mechanics II'),
        req('PHYSICS', '134', 'PHYSICS 134: Advanced Topics in Quantum Mechanics'),
      ], {
        note: 'Requirement for students who matriculated in Autumn 2023 or later.',
      }),
      section('quant-pick2', 'Advanced Courses (pick 2)', [
        pickFrom('quant-elec', 'Quantum/CS/EE Courses', 2, [
          co('APPPHYS', '203'),
          co('APPPHYS', '204'),
          co('APPPHYS', '225'),
          co('APPPHYS', '228'),
          co('CS', '154'),
          co('CS', '259Q'),
          co('EE', '224'),
          co('EE', '276'),
          co('STATS', '200'),
          co('STATS', '203'),
        ]),
      ]),
      section('quant-practicum', 'Practicum (pick 1)', [
        pickOne('quant-prac', 'Practicum Course', COMMON_PRACTICUM),
      ]),
    ]),
  ],
};
