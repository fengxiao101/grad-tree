import type { CourseOption, MajorConfig, MajorSection, Track } from '../majorSchema';

// CEE-MS specializations and named SDC/SES plans (retired Geomechanics curriculum omitted).
// Source: https://bulletin.stanford.edu/programs/CEE-MS/
// All programs: 45 units at Stanford, 3.0 GPA, no courses below 100-level.

// ── Atmosphere/Energy shared course arrays ────────────────────────────────────

const AE_ENERGY_CORE = [
  { dept: 'CEE', number: '176A' },
  { dept: 'CEE', number: '176C' },
  { dept: 'CEE', number: '207A' },
  { dept: 'CEE', number: '207R' },
  { dept: 'CEE', number: '207S' },
  { dept: 'CEE', number: '226' },
  { dept: 'CEE', number: '263H' },
  { dept: 'CEE', number: '272R' },
  { dept: 'CEE', number: '273S' },
  { dept: 'CEE', number: '276B' },
  { dept: 'CEE', number: '276M' },
  { dept: 'CEE', number: '330B' },
  { dept: 'ECON', number: '261' },
  { dept: 'EE', number: '253' },
  { dept: 'ENERGY', number: '201C' },
  { dept: 'ENERGY', number: '203' },
  { dept: 'ENERGY', number: '269' },
  { dept: 'ENERGY', number: '276' },
  { dept: 'ENERGY', number: '295' },
  { dept: 'GEP', number: '230' },
  { dept: 'MS&E', number: '243' },
  { dept: 'PHYSICS', number: '240' },
];

const AE_ATMOSPHERE_CORE = [
  { dept: 'AA', number: '210A' },
  { dept: 'CEE', number: '172' },
  { dept: 'CEE', number: '261A' },
  { dept: 'CEE', number: '261C' },
  { dept: 'CEE', number: '261I' },
  { dept: 'CEE', number: '262A' },
  { dept: 'CEE', number: '262D' },
  { dept: 'CEE', number: '262I' },
  { dept: 'CEE', number: '263C' },
  { dept: 'CEE', number: '263D' },
  { dept: 'CEE', number: '278A' },
  { dept: 'CEE', number: '362A' },
  { dept: 'CEE', number: '363F' },
  { dept: 'EARTHSYS', number: '223' },
  { dept: 'EARTHSYS', number: '241' },
  { dept: 'EARTHSYS', number: '242' },
  { dept: 'ESS', number: '202' },
  { dept: 'ESS', number: '267' },
  { dept: 'ESS', number: '271' },
  { dept: 'ESS', number: '288' },
  { dept: 'ESS', number: '348' },
  { dept: 'LAW', number: '2520' },
];

const AE_ELECTIVES = [
  { dept: 'AA', number: '214' },
  { dept: 'CEE', number: '208A' },
  { dept: 'CEE', number: '208B' },
  { dept: 'CEE', number: '208X' },
  { dept: 'CEE', number: '226E' },
  { dept: 'CEE', number: '241A' },
  { dept: 'CEE', number: '255' },
  { dept: 'CEE', number: '256' },
  { dept: 'CEE', number: '263G' },
  { dept: 'CEE', number: '263S' },
  { dept: 'CEE', number: '265H' },
  { dept: 'CEE', number: '272T' },
  { dept: 'CEE', number: '299' },
  { dept: 'CEE', number: '301' },
  { dept: 'CEE', number: '330' },
  { dept: 'CEE', number: '372' },
  { dept: 'EARTHSYS', number: '144' },
  { dept: 'EARTHSYS', number: '213' },
  { dept: 'ECON', number: '250' },
  { dept: 'EE', number: '157' },
  { dept: 'EE', number: '216' },
  { dept: 'EE', number: '292H' },
  { dept: 'ENERGY', number: '204' },
  { dept: 'ENERGY', number: '205' },
  { dept: 'ENERGY', number: '253' },
  { dept: 'ENERGY', number: '291' },
  { dept: 'ENVRES', number: '260' },
  { dept: 'ESS', number: '233' },
  { dept: 'ESS', number: '305' },
  { dept: 'GSBGEN', number: '332' },
  { dept: 'GSBGEN', number: '341' },
  { dept: 'HUMBIO', number: '116' },
  { dept: 'LAW', number: '2503' },
  { dept: 'LAW', number: '2504' },
  { dept: 'MATSCI', number: '144' },
  { dept: 'MATSCI', number: '303' },
  { dept: 'ME', number: '351A' },
  { dept: 'ME', number: '361' },
  { dept: 'ME', number: '362A' },
];

// ── SEM shared course arrays ───────────────────────────────────────────────────

const SEM_ANALYSIS = [
  { dept: 'CEE', number: '280' },
  { dept: 'CEE', number: '281' },
  { dept: 'CEE', number: '282' },
  { dept: 'CEE', number: '283' },
  { dept: 'CEE', number: '284' },
];

const SEM_DESIGN = [
  { dept: 'CEE', number: '223' },
  { dept: 'CEE', number: '285A' },
  { dept: 'CEE', number: '285B' },
  { dept: 'CEE', number: '287' },
];

const SEM_MECHANICS = [
  { dept: 'CEE', number: '281' },
  { dept: 'CEE', number: '291' },
  { dept: 'CEE', number: '305' },
];

const SEM_RISK = [
  { dept: 'CEE', number: '203' },
  { dept: 'CEE', number: '204' },
  { dept: 'CEE', number: '206' },
  { dept: 'CEE', number: '254' },
  { dept: 'CEE', number: '288' },
];

const SEM_BREADTH = [
  { dept: 'CEE', number: '222A' },
  { dept: 'CEE', number: '222B' },
  { dept: 'CEE', number: '226' },
  { dept: 'CEE', number: '261A' },
  { dept: 'CEE', number: '284W' },
  { dept: 'CEE', number: '286' },
  { dept: 'CEE', number: '290' },
  { dept: 'CEE', number: '293' },
  { dept: 'CEE', number: '296' },
  { dept: 'CEE', number: '297M' },
  { dept: 'CEE', number: '310' },
  { dept: 'CEE', number: '314' },
  { dept: 'CEE', number: '315' },
  { dept: 'CEE', number: '380' },
  { dept: 'CEE', number: '385' },
];

// ── Mechanics & Computation shared arrays ─────────────────────────────────────

const MC_BREADTH = [
  { dept: 'CEE', number: '201E' },
  { dept: 'CEE', number: '261A' },
  { dept: 'CEE', number: '262A' },
  { dept: 'CEE', number: '282' },
  { dept: 'CEE', number: '284W' },
  { dept: 'CEE', number: '286' },
  { dept: 'CME', number: '302' },
  { dept: 'CME', number: '345' },
  { dept: 'CS', number: '221' },
  { dept: 'GEOPHYS', number: '229' },
  { dept: 'GEOPHYS', number: '238' },
  { dept: 'GEOPHYS', number: '259' },
  { dept: 'MATSCI', number: '251' },
  { dept: 'MATSCI', number: '358' },
  { dept: 'ME', number: '233' },
  { dept: 'ME', number: '303' },
  { dept: 'ME', number: '335B' },
  { dept: 'ME', number: '345' },
  { dept: 'ME', number: '346A' },
  { dept: 'ME', number: '346B' },
  { dept: 'ME', number: '348' },
  { dept: 'STATS', number: '200' },
];

export const CEE_MS_2526: MajorConfig = {
  id: 'cee-ms-2526',
  name: 'Civil & Environmental Engineering MS (Coterm)',
  school: 'Civil and Environmental Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CEE-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'specialization-selector',
      name: 'Specialization Area',
      trackSelector: true,
      note: 'Select one CEE specialization or named SDC/SES plan. All require 45 Stanford units and a 3.0 GPA (2.75 for students admitted before Winter 2023); no course below the 100 level counts. Grading, residency, seminar, research, and department-unit limits differ by plan, read the warnings inside the selected plan.',
      slots: [],
    },
  ],
  tracks: [
    // ── 1. Atmosphere/Energy ──────────────────────────────────────────────────
    {
      id: 'atmosphere-energy',
      name: 'Atmosphere/Energy (A/E)',
      sections: [
        {
          id: 'ae-energy-core',
          name: 'Energy Core Courses (3–5 courses)',
          minUnits: 9,
          note: 'Choose 3, 4, or 5 energy core courses. Combined with atmosphere core, you must have exactly 8 core courses total (letter grade, 3+ units each), in one of these configurations: 3E+5A, 4E+4A, or 5E+3A.',
          slots: [
            {
              id: 'ae-energy-slot',
              label: 'Energy core course',
              type: 'pick-from-list',
              count: 3,
              options: AE_ENERGY_CORE,
              note: 'Minimum 3 energy courses; may take 4 or 5 (then atmosphere count drops to 4 or 3 accordingly).',
            },
          ],
        },
        {
          id: 'ae-atmosphere-core',
          name: 'Atmosphere Core Courses (3–5 courses)',
          minUnits: 9,
          note: 'Choose 3, 4, or 5 atmosphere core courses to complement your energy core selection.',
          slots: [
            {
              id: 'ae-atmo-slot',
              label: 'Atmosphere core course',
              type: 'pick-from-list',
              count: 3,
              options: AE_ATMOSPHERE_CORE,
              note: 'Minimum 3 atmosphere courses; total energy + atmosphere core must equal 8.',
            },
          ],
        },
        {
          id: 'ae-core-balance',
          name: 'Additional Core Courses (to exactly 8 total)',
          minUnits: 6,
          note: 'Add exactly two more core courses so the combined balance is 3+5, 4+4, or 5+3. Do not take more than five from either core list.',
          slots: [{
            id: 'ae-core-balance-slot',
            label: 'Additional energy or atmosphere core course',
            type: 'pick-from-list',
            count: 2,
            options: [...AE_ENERGY_CORE, ...AE_ATMOSPHERE_CORE],
          }],
        },
        {
          id: 'ae-electives',
          name: 'A/E Electives (remaining of 30 units)',
          minUnits: 6,
          unitOnly: true,
          note: 'Additional atmosphere- or energy-related courses to reach the 30-unit A/E requirement. The remaining 15 of 45 total units must be from engineering, science, math, or related fields (advisor approved).',
          slots: [
            {
              id: 'ae-elec-slot',
              label: 'A/E elective course',
              type: 'pick-from-list',
              count: 2,
              options: AE_ELECTIVES,
              note: 'From the approved A/E elective list. Additional elective units beyond this slot can be from either the core lists or elective list. Min 30 units at 200-level; min 24 units from School of Engineering.',
            },
          ],
        },
        {
          id: 'ae-unrestricted',
          name: 'Additional Engineering/Science/Math (15 units)',
          note: 'Remaining 15 of 45 total units. Must be in engineering, science, mathematics, or related fields. No PE or language courses. Max 6 units CR/NC.',
          slots: [
            {
              id: 'ae-unrestricted-slot',
              label: 'Engineering/science/math electives',
              type: 'any-approved',
              count: 5,
              minUnits: 15,
              minLevel: 100,
              options: [],
              note: 'Open-ended advisor-approved pool in engineering, science, mathematics, or a related technical field. No PE or language courses; max 6 units CR/NC across the program.',
            },
          ],
        },
      ],
    },

    // ── 2. Environmental Engineering ─────────────────────────────────────────
    {
      id: 'environmental-engineering',
      name: 'Environmental Engineering (EnvEng)',
      sections: [
        {
          id: 'enveng-core',
          name: 'Engineering Core (10 units)',
          note: 'Required 10-unit core. CEE 270 must be letter graded except the Fall 2025 CR/NC-only offering. At least 27 of 45 units must be CEE and at least 30 units must be 200+. Maximums: 6 CR/NC units in courses offering letters, 9 research units including CEE 398, 2 CPT units, 3 seminar units, and 9 CS/Statistics units without advisor approval. Nontechnical courses (including PE, language, music/activity, and remedial English) do not count.',
          slots: [
            {
              id: 'enveng-270',
              label: 'CEE 270 – Movement and Fate of Organic Contaminants in Waters',
              type: 'required',
              options: [{ dept: 'CEE', number: '270' }],
            },
            {
              id: 'enveng-266a',
              label: 'CEE 266A – Watershed Hydrologic Processes and Models',
              type: 'required',
              options: [{ dept: 'CEE', number: '266A' }],
            },
            {
              id: 'enveng-fluids',
              label: 'Fluid Mechanics (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'CEE', number: '262A' },
                { dept: 'CEE', number: '262E' },
              ],
            },
          ],
        },
        {
          id: 'enveng-seminar',
          name: 'Seminar (1 unit)',
          slots: [
            {
              id: 'enveng-269',
              label: 'CEE 269 – Environmental Engineering Seminar',
              type: 'required',
              options: [{ dept: 'CEE', number: '269' }],
            },
          ],
        },
        {
          id: 'enveng-policy',
          name: 'Environmental Management, Policy & Law (3 units)',
          slots: [
            {
              id: 'enveng-policy-slot',
              label: 'Policy/law course (min 3 units)',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '245E' },
                { dept: 'CEE', number: '265D' },
                { dept: 'CEE', number: '265F' },
                { dept: 'CEE', number: '266G' },
                { dept: 'CEE', number: '273B' },
                { dept: 'CEE', number: '275A' },
                { dept: 'CEE', number: '279X' },
              ],
            },
          ],
        },
        {
          id: 'enveng-focused',
          name: 'Focused Electives (18 units)',
          minUnits: 18,
          minCourses: 5,
          note: 'Depth requirement: ≥3 courses from one focus area. Breadth requirement: ≥1 course each from two additional focus areas. Five focus areas: (1) Aquatic Chemistry/Biology & Process Engineering, (2) Environmental/Geophysical Fluid Mechanics, (3) Environmental Data/Stats/Modeling, (4) Human Health & Environment, (5) Hydrology & Water Resources.',
          slots: [
            {
              id: 'enveng-depth-aquatic',
              label: 'Focus Area 1: Aquatic Chemistry & Biology / Process Engineering',
              type: 'pick-from-list',
              count: 3,
              optional: true,
              options: [
                { dept: 'CEE', number: '270F', name: 'Fundamentals of Applied Research Design' },
                { dept: 'CEE', number: '270M', name: 'Aquatic and Organic Chemistry for Environmental Engineering' },
                { dept: 'CEE', number: '271A', name: 'Physical and Chemical Treatment Processes' },
                { dept: 'CEE', number: '274P', name: 'Environmental Health Microbiology Lab' },
                { dept: 'CEE', number: '279D', name: 'Providing Safe Water for the Developing and Developed World' },
              ],
              note: 'Use as depth area (≥3 courses) or breadth area (1 course). Take 3+ if this is your depth focus area.',
            },
            {
              id: 'enveng-depth-fluid',
              label: 'Focus Area 2: Environmental/Geophysical Fluid Mechanics',
              type: 'pick-from-list',
              count: 3,
              optional: true,
              options: [
                { dept: 'CEE', number: '261C', name: 'WindWise: CFD for civil engineers and architects' },
                { dept: 'CEE', number: '262A', name: 'Hydrodynamics' },
                { dept: 'CEE', number: '262B', name: 'Transport and Mixing in Surface Water Flows' },
                { dept: 'CEE', number: '262E', name: 'Rivers, Streams, and Canals' },
                { dept: 'CEE', number: '262F', name: 'Ocean Waves' },
                { dept: 'CEE', number: '263C', name: 'Weather and Storms' },
                { dept: 'CEE', number: '363B', name: 'Chaos and Turbulence' },
                { dept: 'CEE', number: '363C', name: 'Ocean Modeling' },
              ],
              note: 'Use as depth area (≥3 courses) or breadth area (1 course).',
            },
            {
              id: 'enveng-depth-data',
              label: 'Focus Area 3: Environmental Data, Statistics & Modeling',
              type: 'pick-from-list',
              count: 3,
              optional: true,
              options: [
                { dept: 'CEE', number: '201D', name: 'Computations in Civil and Environmental Engineering' },
                { dept: 'CEE', number: '203', name: 'Probabilistic Models in Civil and Environmental Engineering' },
                { dept: 'CEE', number: '254', name: 'Data Analytics for Physical Systems' },
                { dept: 'CEE', number: '260G', name: 'Imaging with Incomplete Information' },
                { dept: 'CEE', number: '261C', name: 'WindWise: CFD for civil engineers and architects' },
                { dept: 'CEE', number: '261D', name: 'Data Assimilation' },
                { dept: 'CEE', number: '270F', name: 'Fundamentals of Applied Research Design' },
                { dept: 'CEE', number: '277A', name: 'Introduction to Fuzzy Set Qualitative Comparative Analysis (fsQCA)' },
                { dept: 'CEE', number: '362A', name: 'Uncertainty Quantification' },
              ],
              note: 'Use as depth area (≥3 courses) or breadth area (1 course).',
            },
            {
              id: 'enveng-depth-health',
              label: 'Focus Area 4: Human Health & Environment',
              type: 'pick-from-list',
              count: 3,
              optional: true,
              options: [
                { dept: 'CEE', number: '172', name: 'Air Quality Management' },
                { dept: 'CEE', number: '265D', name: 'Water and Sanitation in Developing Countries' },
                { dept: 'CEE', number: '270F', name: 'Fundamentals of Applied Research Design' },
                { dept: 'CEE', number: '274P', name: 'Environmental Health Microbiology Lab' },
                { dept: 'CEE', number: '278A', name: 'Air Pollution Fundamentals' },
                { dept: 'CEE', number: '279E', name: 'Wastewater Treatment: From Disposal to Resource Recovery' },
              ],
              note: 'Use as depth area (≥3 courses) or breadth area (1 course).',
            },
            {
              id: 'enveng-depth-hydro',
              label: 'Focus Area 5: Hydrology & Water Resources',
              type: 'pick-from-list',
              count: 3,
              optional: true,
              options: [
                { dept: 'CEE', number: '260A', name: 'Physical Hydrogeology' },
                { dept: 'CEE', number: '260C', name: 'Contaminant Hydrogeology and Reactive Transport' },
                { dept: 'CEE', number: '260D', name: 'Remote Sensing of Hydrology' },
                { dept: 'CEE', number: '260G', name: 'Imaging with Incomplete Information' },
                { dept: 'CEE', number: '266A', name: 'Watershed Hydrologic Processes and Models' },
                { dept: 'CEE', number: '266G', name: 'Water Resources Systems Analysis' },
                { dept: 'CEE', number: '270F', name: 'Fundamentals of Applied Research Design' },
                { dept: 'CEE', number: '279X', name: 'Water Supply and Management in California and the West' },
              ],
              note: 'Use as depth area (≥3 courses) or breadth area (1 course).',
            },
          ],
        },
        {
          id: 'enveng-breadth',
          name: 'Breadth Electives (13 units)',
          note: '13 units of additional courses forming a coherent program in Environmental Engineering. Max 9 units CS/Stats without advisor approval.',
          slots: [
            {
              id: 'enveng-breadth-slot',
              label: 'Breadth elective (13 units)',
              type: 'any-approved',
              count: 4,
              minUnits: 13,
              minLevel: 100,
              options: [],
              note: 'Open-ended, advisor-approved courses forming a coherent Environmental Engineering program. At least 27 of 45 total units must carry a CEE subject code; at least 30 units must be 200+; max 9 units of CS/Statistics without advisor approval.',
            },
          ],
        },
      ],
    },

    // ── 3. Structural Engineering (SEM) ──────────────────────────────────────
    {
      id: 'structural-engineering',
      name: 'Structural Engineering (SEM)',
      sections: [
        {
          id: 'sem-core',
          name: 'Core Courses (5 courses covering all 4 areas)',
          note: 'Complete 5 core courses: at least 2 from Analysis (CEE 280 and CEE 283 are required unless waived), at least 1 from Design, at least 1 from Mechanics, at least 1 from Risk/Statistical Modeling. All for letter grade. Min 30 units from SEM grad-level courses. Min 36 units from School of Engineering. Max 10 units undergrad coursework. Max 6 combined independent study/CPT. Max 3 units seminars.',
          slots: [
            { id: 'sem-280', label: 'CEE 280 (unless individually waived)', type: 'required', options: [SEM_ANALYSIS[0]] },
            { id: 'sem-283', label: 'CEE 283 (unless individually waived)', type: 'required', options: [SEM_ANALYSIS[3]] },
            {
              id: 'sem-design',
              label: 'Design (at least 1)',
              type: 'pick-from-list',
              count: 1,
              options: SEM_DESIGN,
            },
            {
              id: 'sem-mechanics',
              label: 'Mechanics (at least 1)',
              type: 'pick-from-list',
              count: 1,
              options: SEM_MECHANICS,
            },
            {
              id: 'sem-risk',
              label: 'Risk/Statistical Modeling (at least 1)',
              type: 'pick-from-list',
              count: 1,
              options: SEM_RISK,
            },
          ],
        },
        {
          id: 'sem-seminar',
          name: 'Structural Engineering Seminar (required)',
          slots: [
            {
              id: 'sem-298',
              label: 'CEE 298 – Structural Engineering and Mechanics Seminar',
              type: 'required',
              options: [{ dept: 'CEE', number: '298' }],
            },
          ],
        },
        {
          id: 'sem-breadth',
          name: 'Breadth Electives',
          minUnits: 15,
          note: 'Additional approved SEM courses plus free electives from engineering/engineering-related disciplines for a coherent program of study.',
          slots: [
            {
              id: 'sem-breadth-slot',
              label: 'SEM breadth elective',
              type: 'any-approved',
              minUnits: 15,
              options: SEM_BREADTH,
              note: 'May also take additional courses from SEM core lists or other approved engineering electives.',
            },
          ],
        },
      ],
    },

    // ── 4. Mechanics & Computation ────────────────────────────────────────────
    {
      id: 'mechanics-computation',
      name: 'Mechanics & Computation (M&C)',
      sections: [
        {
          id: 'mc-required',
          name: 'Required Core Courses',
          note: 'CEE 281 and CEE 291 are always required. Even-year starters also take CEE 306 + CEE 314; odd-year starters take CEE 310 + CEE 315 instead. One seminar (CEE 298 or ME 395) required. Min 30 units from M&C grad-level courses. Min 36 units from School of Engineering. Max 10 units undergrad. Max 6 combined independent study/CPT. Max 3 units seminars.',
          slots: [
            {
              id: 'mc-281',
              label: 'CEE 281 – Mechanics and Finite Elements',
              type: 'required',
              options: [{ dept: 'CEE', number: '281' }],
            },
            {
              id: 'mc-291',
              label: 'CEE 291 – Solid Mechanics',
              type: 'required',
              options: [{ dept: 'CEE', number: '291' }],
            },
            {
              id: 'mc-seminar',
              label: 'Seminar (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'CEE', number: '298' },
                { dept: 'ME', number: '395' },
              ],
            },
            {
              id: 'mc-even-year',
              label: 'Even-year starters: CEE 306 or CEE 310',
              type: 'pick-one',
              options: [
                { dept: 'CEE', number: '306' },
                { dept: 'CEE', number: '310' },
              ],
              note: 'Even-year starters take CEE 306; odd-year starters take CEE 310.',
            },
            {
              id: 'mc-even-year-2',
              label: 'Even-year starters: CEE 314 or CEE 315',
              type: 'pick-one',
              options: [
                { dept: 'CEE', number: '314', name: 'Computational Poromechanics' },
                { dept: 'CEE', number: '315', name: 'Plasticity Modeling and Computation' },
              ],
              note: 'Even-year starters take CEE 314; odd-year starters take CEE 315.',
            },
          ],
        },
        {
          id: 'mc-core-mechanics',
          name: 'Core: Mechanics',
          slots: [
            {
              id: 'mc-mech-slot',
              label: 'Mechanics elective',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '280', name: 'Advanced Structural Analysis' },
                { dept: 'CEE', number: '283', name: 'Structural Dynamics' },
                { dept: 'ME', number: '340', name: 'Mechanics - Elasticity and Inelasticity' },
              ],
            },
          ],
        },
        {
          id: 'mc-core-numerical',
          name: 'Core: Numerical Analysis & Scientific Computing',
          slots: [
            {
              id: 'mc-num-slot',
              label: 'Numerical/computing elective',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CME', number: '200', name: 'Linear Algebra with Application to Engineering Computations' },
                { dept: 'CME', number: '204', name: 'Partial Differential Equations in Engineering' },
                { dept: 'CME', number: '206', name: 'Introduction to Numerical Methods for Engineering' },
                { dept: 'CME', number: '211', name: 'Software Development for Scientists and Engineers' },
                { dept: 'CME', number: '213', name: 'Introduction to parallel computing using MPI, openMP, and CUDA' },
              ],
            },
          ],
        },
        {
          id: 'mc-core-stats',
          name: 'Core: Statistics and Machine Learning',
          slots: [
            {
              id: 'mc-stats-slot',
              label: 'Stats/ML elective',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '203', name: 'Probabilistic Models in Civil and Environmental Engineering' },
                { dept: 'CEE', number: '254', name: 'Data Analytics for Physical Systems' },
                { dept: 'CS', number: '229', name: 'Machine Learning' },
                { dept: 'CS', number: '230', name: 'Deep Learning' },
                { dept: 'ENERGY', number: '260', name: 'Uncertainty Quantification in Data-Centric Simulations' },
              ],
            },
          ],
        },
        {
          id: 'mc-core-materials',
          name: 'Core: Mechanics of Materials',
          slots: [
            {
              id: 'mc-mat-slot',
              label: 'Mechanics of materials elective',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '223', name: 'Materials for Sustainable Built Environments' },
                { dept: 'CEE', number: '305', name: 'Damage and Failure Mechanics of Structural Systems' },
                { dept: 'MATSCI', number: '208', name: 'Mechanical Properties of Materials' },
              ],
            },
          ],
        },
        {
          id: 'mc-core-geomech',
          name: 'Core: Geomechanics',
          slots: [
            {
              id: 'mc-geo-slot',
              label: 'Geomechanics elective',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '260A', name: 'Physical Hydrogeology' },
                { dept: 'CEE', number: '293', name: 'Foundations and Earth Structures' },
                { dept: 'GEOPHYS', number: '203', name: 'Fluids and Flow in the Earth: Computational Methods' },
                { dept: 'GEOPHYS', number: '262', name: 'Rock Physics' },
              ],
            },
          ],
        },
        {
          id: 'mc-breadth',
          name: 'Breadth Electives',
          minUnits: 9,
          slots: [
            {
              id: 'mc-breadth-slot',
              label: 'M&C breadth elective',
              type: 'pick-from-list',
              count: 3,
              options: MC_BREADTH,
            },
          ],
        },
      ],
    },

    // ── 5. Sustainable Design and Construction (SDC) ──────────────────────────
    {
      id: 'sustainable-design-construction',
      name: 'Sustainable Design and Construction (SDC)',
      sections: [
        {
          id: 'sdc-common',
          name: 'Common Required Courses (all SDC sub-tracks)',
          note: 'All 5 SDC sub-tracks (Management, Structures, Energy, Sustainable Urban Systems, Sustainable Real Estate Development) share these common required courses.',
          slots: [
            {
              id: 'sdc-226',
              label: 'CEE 226 – Life Cycle Assessment for Complex Systems',
              type: 'required',
              options: [{ dept: 'CEE', number: '226', name: 'Life Cycle Assessment for Complex Systems' }],
            },
            {
              id: 'sdc-241',
              label: 'CEE 241 – Managing Fabrication and Construction',
              type: 'required',
              options: [{ dept: 'CEE', number: '241', name: 'Managing Fabrication and Construction' }],
            },
            {
              id: 'sdc-258',
              label: 'CEE 258 – Donald R. Watson Seminar in Construction Engineering and Management',
              type: 'required',
              options: [{ dept: 'CEE', number: '258', name: 'Donald R. Watson Seminar in Construction Engineering and Management' }],
            },
            {
              id: 'sdc-comm',
              label: 'Technical Communication (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'ENGR', number: '202C', name: 'Technical Communication for CEE SDC Students' },
                { dept: 'ENGR', number: '202W', name: 'Technical Communication' },
                { dept: 'ENGR', number: '203', name: 'Public Speaking' },
              ],
            },
          ],
        },
        {
          id: 'sdc-design-dev',
          name: 'Design and Development Area',
          note: 'Unit requirements vary by sub-track: Management (4u), Structures (3u), Energy (5u), SUS (12u), SRED (12u).',
          slots: [
            {
              id: 'sdc-design-slot',
              label: 'Design and Development course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '222A', name: 'Computer Integrated Architecture/Engineering/Construction (AEC) Global Teamwork' },
                { dept: 'CEE', number: '222B', name: 'Computer Integrated Architecture/Engineering/Construction (AEC) Global Teamwork' },
                { dept: 'CEE', number: '241A', name: 'Infrastructure Project Development' },
                { dept: 'CEE', number: '241B', name: 'Infrastructure Project Delivery' },
                { dept: 'CEE', number: '241C', name: 'Global Infrastructure Projects Seminar' },
                { dept: 'CEE', number: '243', name: 'Intro to Urban Sys Engrg' },
                { dept: 'CEE', number: '245E', name: 'Equitable Infrastructure Solutions' },
                { dept: 'CEE', number: '246B', name: 'Real Estate Development and Finance' },
                { dept: 'CEE', number: '248', name: 'Introduction to Real Estate Development' },
                { dept: 'CEE', number: '321', name: 'Design and Operation of Integrated Infrastructure Systems' },
                { dept: 'CEE', number: '342', name: 'Designing for Gradient Spaces' },
                { dept: 'GSBGEN', number: '306', name: 'Real Estate Investment' },
              ],
            },
          ],
        },
        {
          id: 'sdc-structures',
          name: 'Structures Area',
          note: 'Required primarily for Structures sub-track (12u). Other sub-tracks: 0u required.',
          slots: [
            {
              id: 'sdc-struct-slot',
              label: 'Structures course',
              type: 'pick-from-list',
              count: 1,
              optional: true,
              options: [
                { dept: 'CEE', number: '203', name: 'Probabilistic Models in Civil and Environmental Engineering' },
                { dept: 'CEE', number: '223', name: 'Materials for Sustainable Built Environments' },
                { dept: 'CEE', number: '280', name: 'Advanced Structural Analysis' },
                { dept: 'CEE', number: '282', name: 'Nonlinear Structural Analysis' },
                { dept: 'CEE', number: '283', name: 'Structural Dynamics' },
                { dept: 'CEE', number: '285A', name: 'Advanced Structural Concrete Behavior and Design' },
                { dept: 'CEE', number: '285B', name: 'Advanced Structural Steel Behavior and Design' },
                { dept: 'CEE', number: '287', name: 'Earthquake Resistant Design and Construction' },
                { dept: 'CEE', number: '290', name: 'Structural Performance and Failures' },
                { dept: 'CEE', number: '293', name: 'Foundations and Earth Structures' },
                { dept: 'CEE', number: '297M', name: 'Managing Critical Infrastructure' },
              ],
            },
          ],
        },
        {
          id: 'sdc-energy',
          name: 'Energy Area',
          note: 'Unit requirements vary by sub-track: Management (4u), Structures (3u), Energy (12u), SUS (6u), SRED (6u).',
          slots: [
            {
              id: 'sdc-energy-slot',
              label: 'Energy course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '176A', name: 'Energy Efficient Buildings' },
                { dept: 'CEE', number: '176B', name: '100% Clean, Renewable Energy and Storage for Everything' },
                { dept: 'CEE', number: '226', name: 'Life Cycle Assessment for Complex Systems' },
                { dept: 'CEE', number: '226E', name: 'Techniques and Methods for Decarbonized and Energy Efficient Building Design' },
                { dept: 'CEE', number: '256', name: 'Building Systems Design & Analysis' },
                { dept: 'CEE', number: '272R', name: 'Engineering Future Electricity Systems' },
              ],
            },
          ],
        },
        {
          id: 'sdc-construction',
          name: 'Construction Area',
          note: 'Unit requirements vary by sub-track: Management (12u), Structures (5u), Energy (5u), SUS (5u), SRED (5u).',
          slots: [
            {
              id: 'sdc-const-slot',
              label: 'Construction course',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'CEE', number: '102A', name: 'Legal/Ethical Principles in Design, Construction, Project Delivery' },
                { dept: 'CEE', number: '240', name: 'Construction Project Assessment and Budgeting: The First 100 Days as a Project Manager' },
                { dept: 'CEE', number: '241', name: 'Managing Fabrication and Construction' },
                { dept: 'CEE', number: '241B', name: 'Infrastructure Project Delivery' },
                { dept: 'CEE', number: '242', name: 'Organization Design for Projects and Companies' },
                { dept: 'CEE', number: '324', name: 'Industrialized Construction' },
                { dept: 'CEE', number: '327', name: 'Construction Robotics' },
                { dept: 'CEE', number: '341', name: 'Virtual Design and Construction' },
              ],
            },
          ],
        },
        {
          id: 'sdc-industry',
          name: 'Industry Area',
          note: 'Unit requirements vary by sub-track: Management (6u), Structures (3u), Energy (4u), SUS (3u), SRED (3u).',
          slots: [
            {
              id: 'sdc-ind-slot',
              label: 'Industry course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '240C', name: 'Strategic Management of Construction Businesses' },
                { dept: 'CEE', number: '241C', name: 'Global Infrastructure Projects Seminar' },
                { dept: 'CEE', number: '244', name: 'Accounting, Finance & Valuation for Engineers & Constructors' },
                { dept: 'CEE', number: '246', name: 'Venture Creation for the Real Economy' },
                { dept: 'CEE', number: '258', name: 'Donald R. Watson Seminar in Construction Engineering and Management' },
                { dept: 'CEE', number: '298', name: 'Structural Engineering and Mechanics Seminar' },
                { dept: 'CEE', number: '327S', name: 'Construction Robotics Seminar' },
              ],
            },
          ],
        },
        {
          id: 'sdc-skills',
          name: 'Skills Area',
          note: 'All sub-tracks: 4 units required.',
          slots: [
            {
              id: 'sdc-skills-slot',
              label: 'Skills course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CEE', number: '220B', name: 'Advanced Building Modeling Workshop' },
                { dept: 'CEE', number: '220C', name: 'Parametric Design and Optimization' },
                { dept: 'CEE', number: '247C', name: 'Computer Vision for the Built Environment' },
                { dept: 'CEE', number: '251', name: 'Negotiation' },
                { dept: 'CEE', number: '329', name: 'Artificial Intelligence Applications in the AEC Industry' },
              ],
            },
          ],
        },
      ],
    },

    // ── 6. Sustainable Engineered Systems (SES) ───────────────────────────────
    {
      id: 'sustainable-engineered-systems',
      name: 'Sustainable Engineered Systems (SES)',
      sections: [
        {
          id: 'ses-hybrid-systems',
          name: 'Component 1 – Hybrid Online: Systems-focused Courses (min 2)',
          note: 'SES is exclusively a hybrid online/on-campus program. Take at least 2 systems-focused courses AND at least 2 data science-focused courses (total ≥5 hybrid courses). If you take 3 systems courses, you only need 2 data science, and vice versa.',
          slots: [
            {
              id: 'ses-sys-slot',
              label: 'Systems-focused hybrid course',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'CEE', number: '206', name: 'Decision Analysis for Civil and Environmental Engineers' },
                { dept: 'CEE', number: '242R', name: 'Project Risk Analysis' },
                { dept: 'CS', number: '246', name: 'Mining Massive Data Sets' },
                { dept: 'EE', number: '263', name: 'Matrix Methods: Singular Value Decomposition' },
              ],
            },
          ],
        },
        {
          id: 'ses-hybrid-data',
          name: 'Component 1 – Hybrid Online: Data Science-focused Courses (min 2)',
          slots: [
            {
              id: 'ses-data-slot',
              label: 'Data science-focused hybrid course',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'CS', number: '221', name: 'Artificial Intelligence: Principles and Techniques' },
                { dept: 'CS', number: '224R', name: 'Deep Reinforcement Learning' },
                { dept: 'CS', number: '224W', name: 'Machine Learning with Graphs' },
                { dept: 'CS', number: '229', name: 'Machine Learning' },
                { dept: 'CS', number: '230', name: 'Deep Learning' },
                { dept: 'STATS', number: '202', name: 'Statistical Learning and Data Science' },
              ],
            },
          ],
        },
        {
          id: 'ses-depth',
          name: 'Component 2 – Residential Depth (choose one of 4 depth areas)',
          note: 'Complete 5–6 in-person courses from ONE depth area: (A) Structure & Material Systems: CEE280+CEE283+CEE285A or 285B+CEE288+CEE291+CEE298; (B) Sustainable Construction: CEE226+CEE241+CEE241B+CEE241C+CEE256+CEE258; (C) Environmental Engineering: CEE266A+CEE269+CEE270 + courses from Aquatic/Fluid areas; (D) Atmospheric & Energy: CEE263S+CEE276B + 4 from list.',
          slots: [
            {
              id: 'ses-depth-a',
              label: 'Depth Area A – Structure & Material Systems',
              type: 'pick-from-list',
              count: 1,
              optional: true,
              options: [
                { dept: 'CEE', number: '280', name: 'Advanced Structural Analysis' },
                { dept: 'CEE', number: '283', name: 'Structural Dynamics' },
                { dept: 'CEE', number: '285A', name: 'Advanced Structural Concrete Behavior and Design' },
                { dept: 'CEE', number: '285B', name: 'Advanced Structural Steel Behavior and Design' },
                { dept: 'CEE', number: '288', name: 'Seismic Hazard and Risk Analysis' },
                { dept: 'CEE', number: '291', name: 'Solid Mechanics' },
                { dept: 'CEE', number: '298', name: 'Structural Engineering and Mechanics Seminar' },
              ],
              note: 'Choose ONE depth area (A, B, C, or D). Complete all courses for that area.',
            },
            {
              id: 'ses-depth-b',
              label: 'Depth Area B – Sustainable Construction Systems',
              type: 'pick-from-list',
              count: 1,
              optional: true,
              options: [
                { dept: 'CEE', number: '226', name: 'Life Cycle Assessment for Complex Systems' },
                { dept: 'CEE', number: '241', name: 'Managing Fabrication and Construction' },
                { dept: 'CEE', number: '241B', name: 'Infrastructure Project Delivery' },
                { dept: 'CEE', number: '241C', name: 'Global Infrastructure Projects Seminar' },
                { dept: 'CEE', number: '256', name: 'Building Systems Design & Analysis' },
                { dept: 'CEE', number: '258', name: 'Donald R. Watson Seminar in Construction Engineering and Management' },
              ],
            },
            {
              id: 'ses-depth-c',
              label: 'Depth Area C – Environmental Engineering Systems',
              type: 'pick-from-list',
              count: 1,
              optional: true,
              options: [
                { dept: 'CEE', number: '261A', name: 'Physics of Wind' },
                { dept: 'CEE', number: '262A', name: 'Hydrodynamics' },
                { dept: 'CEE', number: '262B', name: 'Transport and Mixing in Surface Water Flows' },
                { dept: 'CEE', number: '262C', name: 'Coastal Ocean Modeling' },
                { dept: 'CEE', number: '266A', name: 'Watershed Hydrologic Processes and Models' },
                { dept: 'CEE', number: '266F', name: 'Stochastic Hydrology' },
                { dept: 'CEE', number: '266G', name: 'Water Resources Systems Analysis' },
                { dept: 'CEE', number: '269', name: 'Environmental Engineering Seminar' },
                { dept: 'CEE', number: '270', name: 'Movement and Fate of Organic Contaminants in Waters' },
                { dept: 'CEE', number: '270B', name: 'Environmental Organic Reaction Chemistry' },
                { dept: 'CEE', number: '270M', name: 'Aquatic and Organic Chemistry for Environmental Engineering' },
                { dept: 'CEE', number: '271A', name: 'Physical and Chemical Treatment Processes' },
                { dept: 'CEE', number: '271B', name: 'Environmental Biotechnology' },
                { dept: 'CEE', number: '274P', name: 'Environmental Health Microbiology Lab' },
              ],
            },
            {
              id: 'ses-depth-d',
              label: 'Depth Area D – Atmospheric & Energy Systems',
              type: 'pick-from-list',
              count: 1,
              optional: true,
              options: [
                { dept: 'CEE', number: '176A', name: 'Energy Efficient Buildings' },
                { dept: 'CEE', number: '207A', name: 'Understand Energy' },
                { dept: 'CEE', number: '207R', name: 'E^3: Extreme Energy Efficiency' },
                { dept: 'CEE', number: '261A', name: 'Physics of Wind' },
                { dept: 'CEE', number: '261C', name: 'WindWise: CFD for civil engineers and architects' },
                { dept: 'CEE', number: '263C', name: 'Weather and Storms' },
                { dept: 'CEE', number: '263D', name: 'Air Pollution and Global Warming: History, Science, and Solutions' },
                { dept: 'CEE', number: '263S', name: 'Atmosphere/Energy Seminar' },
                { dept: 'CEE', number: '272R', name: 'Engineering Future Electricity Systems' },
                { dept: 'CEE', number: '276B', name: '100% Clean, Renewable Energy and Storage for Everything' },
                { dept: 'CEE', number: '278A', name: 'Air Pollution Fundamentals' },
              ],
            },
          ],
        },
        {
          id: 'ses-electives',
          name: 'Component 3 – Electives (5–6 graduate courses)',
          note: 'Additional graduate courses taken online or in-person to complete the 45-unit total.',
          slots: [
            {
              id: 'ses-elec-slot',
              label: 'SES elective',
              type: 'any-approved',
              count: 5,
              minLevel: 200,
              options: [],
              note: 'Open-ended graduate elective pool used to complete the 45-unit SES program. Courses may be online or in person and must be approved as part of the student’s coherent program.',
            },
          ],
        },
        {
          id: 'ses-breadth',
          name: 'Component 4 – Breadth Experience',
          note: 'One seminar from a different CEE depth area, or CEE 398 (CPT) for international students during summer quarter.',
          slots: [
            {
              id: 'ses-breadth-slot',
              label: 'Breadth seminar or CPT',
              type: 'pick-one',
              options: [
                { dept: 'CEE', number: '258', name: 'Donald R. Watson Seminar in Construction Engineering and Management' },
                { dept: 'CEE', number: '263S', name: 'Atmosphere/Energy Seminar' },
                { dept: 'CEE', number: '269', name: 'Environmental Engineering Seminar' },
                { dept: 'CEE', number: '298', name: 'Structural Engineering and Mechanics Seminar' },
                { dept: 'CEE', number: '398', name: 'Report on Civil Engineering Practical Training' },
              ],
              note: 'Must be from a different depth area than chosen in Component 2.',
            },
          ],
        },
      ],
    },
  ],
};

// The bulletin defines five separate SDC curricula and four separate SES residential
// depth paths.  They are flattened into named planner tracks so selecting a plan
// enforces that plan's own courses and unit floors instead of showing one generic menu.
const course = (dept: string, number: string): CourseOption => ({ dept, number });
const list = (items: string[]): CourseOption[] => items.map(value => {
  const split = value.lastIndexOf(' ');
  return course(value.slice(0, split), value.slice(split + 1));
});

const SDC_AREAS = {
  design: list(['CEE 222A','CEE 222B','CEE 241A','CEE 241B','CEE 241C','CEE 243','CEE 245E','CEE 246B','CEE 248','CEE 321','CEE 342','GSBGEN 306']),
  structures: list(['CEE 203','CEE 223','CEE 280','CEE 282','CEE 283','CEE 285A','CEE 285B','CEE 287','CEE 290','CEE 293','CEE 297M']),
  energy: list(['CEE 176A','CEE 176B','CEE 226','CEE 226E','CEE 256','CEE 272R']),
  construction: list(['CEE 102A','CEE 240','CEE 241','CEE 241B','CEE 242','CEE 324','CEE 327','CEE 341']),
  industry: list(['CEE 240C','CEE 241C','CEE 244','CEE 246','CEE 258','CEE 298','CEE 327S']),
  skills: list(['CEE 220B','CEE 220C','CEE 247C','CEE 251','CEE 329']),
};

type SdcArea = keyof typeof SDC_AREAS;
const sdcTrack = (
  id: string,
  name: string,
  waivable: string[],
  required: string[],
  minima: Partial<Record<SdcArea, number>>,
  extra?: MajorSection,
): Track => ({
  id: `sdc-${id}`,
  name: `SDC: ${name}`,
  minUnits: 45,
  sections: [
    {
      id: `sdc-${id}-background`,
      name: 'Required Background (waivable individually)',
      note: 'Each background course is required unless the program approves a waiver based on prior equivalent work with grade B- or better. A waiver does not reduce the 45-unit degree total.',
      slots: waivable.map((value, index) => ({ id: `sdc-${id}-bg-${index}`, label: value, type: 'any-approved', options: list([value]) })),
    },
    {
      id: `sdc-${id}-required`,
      name: 'Stanford Required Courses',
      note: 'These Stanford courses are required for this named SDC curriculum; the technical-communication requirement is ENGR 202C, 202W, or 203.',
      slots: [
        ...required.map((value, index) => ({ id: `sdc-${id}-req-${index}`, label: value, type: 'required' as const, options: list([value]) })),
        { id: `sdc-${id}-communication`, label: 'Technical communication', type: 'pick-one' as const, options: list(['ENGR 202C','ENGR 202W','ENGR 203']) },
      ],
    },
    ...(extra ? [extra] : []),
    ...Object.entries(minima).filter(([, units]) => Boolean(units)).map(([area, units]) => ({
      id: `sdc-${id}-${area}`,
      name: `${area[0].toUpperCase()}${area.slice(1)} Area (${units} units)`,
      minUnits: units,
      note: 'This is the remaining area-unit floor after crediting the fixed required courses assigned to this area. A course appearing in more than one area may have its units split between areas, but the same units may not be double-counted.',
      slots: [{ id: `sdc-${id}-${area}-slot`, label: `${area} coursework`, type: 'pick-from-list' as const, count: 4, optional: true, options: SDC_AREAS[area as SdcArea] }],
    })),
  ],
});

const SDC_TRACKS: Track[] = [
  sdcTrack('management', 'Management', ['CEE 101C','CEE 146S','CEE 182','CEE 244','CS 106A'], ['CEE 226','CEE 241','CEE 241C','CEE 258'], { design:3, energy:1, construction:9, industry:4, skills:4 }),
  sdcTrack('structures', 'Structures', ['CEE 101C','CEE 146S','CEE 180','CEE 182','CS 106A'], ['CEE 241','CEE 226','CEE 285A','CEE 285B','CEE 258','CEE 298'], { design:3, structures:6, construction:2, industry:1, skills:4 }),
  sdcTrack('energy', 'Energy', ['CEE 146S','CS 106A'], ['CEE 226','CEE 241','CEE 258'], { design:5, energy:3, construction:2, industry:3, skills:4 }, {
    id: 'sdc-energy-specialization', name: 'Energy Specialization Courses (pick 2)', slots: [{ id:'sdc-energy-specialization-slot', label:'Energy specialization', type:'pick-from-list', count:2, options:list(['CEE 226E','CEE 256','CEE 272R']) }],
  }),
  sdcTrack('sus', 'Sustainable Urban Systems', ['CEE 146S','CS 106A'], ['CEE 226','CEE 241','CEE 243','CEE 258'], { design:9, energy:3, construction:2, industry:2, skills:4 }),
  sdcTrack('sred', 'Sustainable Real Estate Development', ['CEE 146S','CS 106A'], ['CEE 226','CEE 241','CEE 243','CEE 246B','CEE 248','CEE 258','GSBGEN 306'], { energy:3, construction:2, industry:2, skills:4 }),
];

const SES_SYSTEMS = list(['CEE 206','CEE 242R','CS 246','EE 263']);
const SES_DATA = list(['CS 221','CS 224R','CS 224W','CS 229','CS 230','STATS 202']);
const sesCommon = (id: string): MajorSection[] => [
  {
    id:`ses-${id}-hybrid`, name:'Hybrid Online Component (at least 5 courses)', minCourses:5,
    note:'Complete at least five hybrid courses: at least two systems-focused and at least two data-science-focused. The fifth may come from either list (2+3 or 3+2).',
    slots:[
      { id:`ses-${id}-systems`, label:'Systems-focused courses', type:'pick-from-list', count:2, options:SES_SYSTEMS },
      { id:`ses-${id}-data`, label:'Data-science-focused courses', type:'pick-from-list', count:2, options:SES_DATA },
      { id:`ses-${id}-fifth`, label:'Fifth hybrid course', type:'pick-from-list', options:[...SES_SYSTEMS,...SES_DATA] },
    ],
  },
];
const sesTail = (id: string): MajorSection[] => [
  { id:`ses-${id}-electives`, name:'Graduate Electives (5–6 courses)', note:'Complete the 45-unit program with five or six approved graduate courses, online or in person.', slots:[{ id:`ses-${id}-elective-slot`, label:'Approved graduate elective', type:'any-approved', count:5, minLevel:200, options:[] }] },
  { id:`ses-${id}-breadth`, name:'Breadth Experience', note:'Choose a seminar from a CEE area different from the residential depth, or CEE 398 CPT for an eligible international student in summer.', slots:[{ id:`ses-${id}-breadth-slot`, label:'Different-area seminar or CPT', type:'pick-one', options:list(['CEE 258','CEE 263S','CEE 269','CEE 269B','CEE 269C','CEE 298','CEE 398']) }] },
];
const sesTrack = (id:string, name:string, depth:MajorSection):Track => ({ id:`ses-${id}`, name:`SES: ${name}`, minUnits:45, sections:[...sesCommon(id), depth, ...sesTail(id)] });
const SES_TRACKS: Track[] = [
  sesTrack('structures','Structure & Material Systems',{ id:'ses-structures-depth', name:'Residential Depth: Structure & Material Systems', slots:[
    {id:'ses-str-280',label:'CEE 280',type:'required',options:list(['CEE 280'])},{id:'ses-str-283',label:'CEE 283',type:'required',options:list(['CEE 283'])},{id:'ses-str-285',label:'CEE 285A or 285B',type:'pick-one',options:list(['CEE 285A','CEE 285B'])},{id:'ses-str-288',label:'CEE 288',type:'required',options:list(['CEE 288'])},{id:'ses-str-291',label:'CEE 291',type:'required',options:list(['CEE 291'])},{id:'ses-str-298',label:'CEE 298',type:'required',options:list(['CEE 298'])},
  ]}),
  sesTrack('construction','Sustainable Construction Systems',{ id:'ses-construction-depth', name:'Residential Depth: Sustainable Construction Systems', slots:list(['CEE 226','CEE 241','CEE 241B','CEE 241C','CEE 256','CEE 258']).map((option,index)=>({id:`ses-con-req-${index}`,label:`${option.dept} ${option.number}`,type:'required',options:[option]})) }),
  sesTrack('environmental','Environmental Engineering Systems',{ id:'ses-environmental-depth', name:'Residential Depth: Environmental Engineering Systems', minCourses:6, note:'CEE 266A, one of CEE 269/269B/269C, and CEE 270 are required. Add three courses across the Aquatic/Process and Fluid/Hydrology groups, including at least one from each group.', slots:[
    {id:'ses-env-266a',label:'CEE 266A',type:'required',options:list(['CEE 266A'])},{id:'ses-env-269',label:'Environmental seminar',type:'pick-one',options:list(['CEE 269','CEE 269B','CEE 269C'])},{id:'ses-env-270',label:'CEE 270',type:'required',options:list(['CEE 270'])},
    {id:'ses-env-aquatic',label:'Aquatic/process course (at least 1)',type:'pick-from-list',options:list(['CEE 270B','CEE 270M','CEE 271A','CEE 271B','CEE 274P'])},
    {id:'ses-env-fluid',label:'Fluid/hydrology course (at least 1)',type:'pick-from-list',options:list(['CEE 261A','CEE 262A','CEE 262B','CEE 262C','CEE 266F','CEE 266G'])},
    {id:'ses-env-additional',label:'One additional course from either group',type:'pick-from-list',options:list(['CEE 270B','CEE 270M','CEE 271A','CEE 271B','CEE 274P','CEE 261A','CEE 262A','CEE 262B','CEE 262C','CEE 266F','CEE 266G'])},
  ]}),
  sesTrack('atmosphere-energy','Atmospheric & Energy Systems',{ id:'ses-ae-depth', name:'Residential Depth: Atmospheric & Energy Systems', note:'CEE 263S and CEE 276B are required, plus four courses from the approved list.', slots:[
    {id:'ses-ae-263s',label:'CEE 263S',type:'required',options:list(['CEE 263S'])},{id:'ses-ae-276b',label:'CEE 276B',type:'required',options:list(['CEE 276B'])},{id:'ses-ae-four',label:'Four approved A/E courses',type:'pick-from-list',count:4,options:list(['CEE 176A','CEE 207A','CEE 207R','CEE 261A','CEE 261C','CEE 263C','CEE 263D','CEE 272R','CEE 278A'])},
  ]}),
];

CEE_MS_2526.tracks = [
  ...(CEE_MS_2526.tracks ?? []).filter(track => !['sustainable-design-construction','sustainable-engineered-systems'].includes(track.id)),
  ...SDC_TRACKS,
  ...SES_TRACKS,
];

const mcTrackConfig = CEE_MS_2526.tracks.find(track => track.id === 'mechanics-computation');
if (mcTrackConfig) {
  const required = mcTrackConfig.sections.find(section => section.id === 'mc-required');
  mcTrackConfig.sections = [
    ...(required ? [required] : []),
    {
      id: 'mc-approved-coursework',
      name: 'M&C Core and Breadth Coursework (30 units)',
      note: 'Reach at least 30 units using any combination of the approved M&C core and breadth pools; there is no requirement to take one course from every category. At least 36 of 45 units must be in Engineering. Maximums: 6 CR/NC, 10 undergraduate, 6 prerequisite, 6 combined independent-study/CPT, and 3 seminar units. Major-area courses must be letter graded unless only CR/NC is offered.',
      slots: [{
        id: 'mc-approved-coursework-slot',
        label: 'Approved M&C core or breadth coursework',
        type: 'any-approved',
        count: 10,
        optional: true,
        options: list([
          'CEE 280','CEE 283','ME 340','CME 200','CME 204','CME 206','CME 211','CME 213',
          'CEE 203','CEE 254','CS 229','CS 230','ENERGY 260','CEE 223','CEE 305','MATSCI 208',
          'CEE 260A','CEE 293','GEOPHYS 203','GEOPHYS 262','CEE 201E','CEE 261A','CEE 262A',
          'CEE 282','CEE 284W','CEE 286','CME 302','CME 345','CS 221','GEOPHYS 229','GEOPHYS 238',
          'GEOPHYS 259','MATSCI 251','MATSCI 358','ME 233','ME 303','ME 335B','ME 345','ME 346A',
          'ME 346B','ME 348','STATS 200',
        ]),
      }],
    },
  ];
}

const envTrackConfig = CEE_MS_2526.tracks.find(track => track.id === 'environmental-engineering');
if (envTrackConfig) {
  const focused = envTrackConfig.sections.find(section => section.id === 'enveng-focused');
  const otherSections = envTrackConfig.sections.filter(section => section.id !== 'enveng-focused');
  if (focused) {
    const envTracks = focused.slots.map((depthSlot, depthIndex): Track => ({
      id: `environmental-engineering-${depthIndex + 1}`,
      name: `Environmental Engineering: ${depthSlot.label.replace(/^Focus Area \d+: /, '')}`,
      minUnits: 45,
      sections: [
        ...otherSections,
        {
          id: `enveng-focus-${depthIndex + 1}`,
          name: 'Focused Electives (3 depth + 2 distinct breadth areas)',
          minCourses: 5,
          minUnits: 18,
          note: 'Complete at least three courses in the selected depth plus one course from each of two DISTINCT other focus areas; all five focused courses together must total at least 18 units.',
          slots: [
            { ...depthSlot, id: `enveng-focus-${depthIndex + 1}-depth-slot`, optional: false, count: 3 },
            ...focused.slots.filter((_, index) => index !== depthIndex).map((slot, index) => ({
              ...slot,
              id: `enveng-focus-${depthIndex + 1}-breadth-${index}`,
              count: 1,
              optional: true,
            })),
          ],
        },
      ],
    }));
    CEE_MS_2526.tracks = [
      ...CEE_MS_2526.tracks.filter(track => track.id !== 'environmental-engineering'),
      ...envTracks,
    ];
  }
}

const mcBase = CEE_MS_2526.tracks.find(track => track.id === 'mechanics-computation');
if (mcBase) {
  const makeMcYearTrack = (year: 'even' | 'odd'): Track => {
    const pair = year === 'even' ? ['CEE 306','CEE 314'] : ['CEE 310','CEE 315'];
    const requiredSection = mcBase.sections.find(section => section.id === 'mc-required');
    const fixedRequired: MajorSection = {
      ...(requiredSection ?? { id:'mc-required', name:'Required Core Courses', slots:[] }),
      id: `mc-${year}-required`,
      note: `CEE 281 and CEE 291 are required. ${year === 'even' ? 'Even' : 'Odd'}-year starters must take the fixed ${pair.join(' + ')} pair; mixed year-pairs do not satisfy the requirement. One of CEE 298 or ME 395 is also required.`,
      slots: [
        { id:`mc-${year}-281`, label:'CEE 281', type:'required', options:list(['CEE 281']) },
        { id:`mc-${year}-291`, label:'CEE 291', type:'required', options:list(['CEE 291']) },
        { id:`mc-${year}-seminar`, label:'CEE 298 or ME 395', type:'pick-one', options:list(['CEE 298','ME 395']) },
        { id:`mc-${year}-pair-1`, label:pair[0], type:'required', options:list([pair[0]]) },
        { id:`mc-${year}-pair-2`, label:pair[1], type:'required', options:list([pair[1]]) },
      ],
    };
    return {
      id:`mechanics-computation-${year}`,
      name:`Mechanics & Computation: ${year === 'even' ? 'Even' : 'Odd'}-Year Start`,
      minUnits:30,
      sections:[fixedRequired, ...mcBase.sections.filter(section => section.id !== 'mc-required')],
    };
  };
  CEE_MS_2526.tracks = [
    ...CEE_MS_2526.tracks.filter(track => track.id !== 'mechanics-computation'),
    makeMcYearTrack('even'),
    makeMcYearTrack('odd'),
  ];
}

const semTrackConfig = CEE_MS_2526.tracks.find(track => track.id === 'structural-engineering');
if (semTrackConfig) {
  semTrackConfig.minUnits = 30;
  const breadth = semTrackConfig.sections.find(section => section.id === 'sem-breadth');
  if (breadth) {
    delete breadth.minUnits;
    breadth.note = 'Approved SEM breadth courses contribute with the required core toward the 30-unit graduate SEM minimum.';
    breadth.slots = breadth.slots.map(slot => ({ ...slot, count: 10, optional: true }));
  }
  semTrackConfig.sections.push({
    id: 'sem-free-electives',
    name: 'Engineering-Related Free Electives (toward 45 units)',
    note: 'Advisor-approved engineering or engineering-related coursework may complete the 45-unit total. At least 36 units must be in the School of Engineering; maximums are 10 undergraduate, 6 prerequisite, 6 combined independent-study/CPT, and 3 seminar units.',
    slots: [{ id:'sem-free-elective-slot', label:'Approved engineering-related elective', type:'any-approved', count:5, optional:true, options:[] }],
  });
}
