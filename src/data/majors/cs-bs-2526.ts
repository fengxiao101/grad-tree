// CS: Computer Science (BS), 2025-2026
// Source: https://bulletin.stanford.edu/programs/CS-BS

import type { MajorConfig, CourseOption, MajorSection, Track } from '../majorSchema';

function dedupe(list: CourseOption[]): CourseOption[] {
  const seen = new Set<string>();
  return list.filter(o => {
    const key = `${o.dept}:${o.number}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Math Electives ────────────────────────────────────────────────────────────

const MATH_ELECTIVE_OPTIONS: CourseOption[] = [
  { dept: 'CME', number: '100' }, { dept: 'CME', number: '102' },
  { dept: 'CME', number: '104' },
  { dept: 'CS',   number: '157' }, { dept: 'CS',   number: '205L' },
  { dept: 'ENGR', number: '108' },
  { dept: 'MATH', number: '51' }, { dept: 'MATH', number: '52' },
  { dept: 'MATH', number: '53' }, { dept: 'MATH', number: '104' },
  { dept: 'MATH', number: '107' }, { dept: 'MATH', number: '108' },
  { dept: 'MATH', number: '109' }, { dept: 'MATH', number: '110' },
  { dept: 'MATH', number: '113' },
  { dept: 'PHIL', number: '151' },
];

// ── Science Electives ─────────────────────────────────────────────────────────

const SCIENCE_ELECTIVE_OPTIONS: CourseOption[] = [
  { dept: 'BIO', number: '81' }, { dept: 'BIO', number: '82' },
  { dept: 'BIO', number: '83' }, { dept: 'BIO', number: '84' },
  { dept: 'BIO', number: '85' }, { dept: 'BIO', number: '86' },
  { dept: 'BIO', number: '45' }, { dept: 'BIO', number: '46' },
  { dept: 'BIO', number: '47' }, { dept: 'BIO', number: '150' },
  { dept: 'CEE', number: '70' },
  { dept: 'CHEM', number: '31A' }, { dept: 'CHEM', number: '31B' },
  { dept: 'CHEM', number: '31E' }, { dept: 'CHEM', number: '33' },
  { dept: 'CHEM', number: '121' }, { dept: 'CHEM', number: '123' },
  { dept: 'EARTHSYS', number: '2' }, { dept: 'EARTHSYS', number: '10' },
  { dept: 'EARTHSYS', number: '11' },
  { dept: 'HUMBIO', number: '2A' }, { dept: 'HUMBIO', number: '3A' },
  { dept: 'HUMBIO', number: '4A' },
  { dept: 'PHYSICS', number: '21' }, { dept: 'PHYSICS', number: '23' },
  { dept: 'PHYSICS', number: '25' }, { dept: 'PHYSICS', number: '41' },
  { dept: 'PHYSICS', number: '41E' }, { dept: 'PHYSICS', number: '43' },
  { dept: 'PHYSICS', number: '45' }, { dept: 'PHYSICS', number: '61' },
  { dept: 'PHYSICS', number: '71' }, { dept: 'PHYSICS', number: '81' },
  { dept: 'PSYCH', number: '30' },
];

// ── Technology in Society ─────────────────────────────────────────────────────

const TIS_OPTIONS: CourseOption[] = [
  { dept: 'AA',      number: '252' },
  { dept: 'ANTHRO',  number: '132C' },
  { dept: 'ARCHLGY', number: '151' },
  { dept: 'BIOE',    number: '131' }, { dept: 'BIOE',    number: '177' },
  { dept: 'CEE',     number: '102A' }, { dept: 'CEE',    number: '145E' },
  { dept: 'CLASSICS',number: '168' },
  { dept: 'COMM',    number: '120W' }, { dept: 'COMM',   number: '166' },
  { dept: 'CS',      number: '125' }, { dept: 'CS',      number: '139' },
  { dept: 'CS',      number: '152' },
  { dept: 'CS',      number: '181' }, { dept: 'CS',      number: '181W' },
  { dept: 'CS',      number: '182' }, { dept: 'CS',      number: '182W' },
  { dept: 'CS',      number: '256' }, { dept: 'CS',      number: '278' },
  { dept: 'DATASCI', number: '154' },
  { dept: 'EARTHSYS',number: '125' },
  { dept: 'ENGR',    number: '117' }, { dept: 'ENGR',    number: '145' },
  { dept: 'ENGR',    number: '148' }, { dept: 'ENGR',    number: '248' },
  { dept: 'ENERGY',  number: '177A' }, { dept: 'ENERGY', number: '177B' },
  { dept: 'EPS',     number: '194' }, { dept: 'EPS',     number: '204' },
  { dept: 'HUMBIO',  number: '174' },
  { dept: 'MS&E',    number: '179' }, { dept: 'MS&E',    number: '193' },
  { dept: 'NBIO',    number: '101' },
  { dept: 'POLISCI', number: '114S' },
  { dept: 'PUBLPOL', number: '114' }, { dept: 'PUBLPOL', number: '134' },
  { dept: 'STS',     number: '1' }, { dept: 'STS',      number: '115' },
  { dept: 'STS',     number: '200J' },
];

// ── CS General Electives ──────────────────────────────────────────────────────

const GENERAL_CS_ELECTIVES: CourseOption[] = [
  { dept: 'CS', number: '112' }, { dept: 'CS', number: '123' },
  { dept: 'CS', number: '124' }, { dept: 'CS', number: '131' },
  { dept: 'CS', number: '137A' }, { dept: 'CS', number: '139' },
  { dept: 'CS', number: '140E' }, { dept: 'CS', number: '143' },
  { dept: 'CS', number: '144' }, { dept: 'CS', number: '145' },
  { dept: 'CS', number: '147' }, { dept: 'CS', number: '147L' },
  { dept: 'CS', number: '148' }, { dept: 'CS', number: '149' },
  { dept: 'CS', number: '151' }, { dept: 'CS', number: '154' },
  { dept: 'CS', number: '155' }, { dept: 'CS', number: '157' },
  { dept: 'PHIL', number: '151' },
  { dept: 'CS', number: '166' }, { dept: 'CS', number: '168' },
  { dept: 'CS', number: '171' }, { dept: 'CS', number: '173A' },
  { dept: 'CS', number: '177' }, { dept: 'CS', number: '195' },
  { dept: 'CS', number: '197' }, { dept: 'CS', number: '197C' },
  { dept: 'CS', number: '205L' }, { dept: 'CS', number: '206' },
  { dept: 'CS', number: '210A' }, { dept: 'CS', number: '212' },
  { dept: 'CS', number: '217' }, { dept: 'CS', number: '221' },
  { dept: 'CS', number: '223A' }, { dept: 'CS', number: '224G' },
  { dept: 'CS', number: '224N' }, { dept: 'CS', number: '224R' },
  { dept: 'CS', number: '224S' }, { dept: 'CS', number: '224V' },
  { dept: 'CS', number: '224W' }, { dept: 'CS', number: '225A' },
  { dept: 'CS', number: '227B' }, { dept: 'CS', number: '228' },
  { dept: 'CS', number: '229' }, { dept: 'CS', number: '229B' },
  { dept: 'CS', number: '229M' }, { dept: 'CS', number: '229S' },
  { dept: 'CS', number: '230' },
  { dept: 'CS', number: '231N' }, { dept: 'CS', number: '232' },
  { dept: 'CS', number: '233' }, { dept: 'CS', number: '234' },
  { dept: 'CS', number: '235' }, { dept: 'CS', number: '237A' },
  { dept: 'CS', number: '237B' }, { dept: 'CS', number: '238' },
  { dept: 'CS', number: '240' }, { dept: 'CS', number: '240LX' },
  { dept: 'CS', number: '242' }, { dept: 'CS', number: '243' },
  { dept: 'CS', number: '244C' }, { dept: 'CS', number: '245' },
  { dept: 'CS', number: '246' }, { dept: 'CS', number: '247' },
  { dept: 'CS', number: '247A' }, { dept: 'CS', number: '247B' },
  { dept: 'CS', number: '247E' }, { dept: 'CS', number: '247G' },
  { dept: 'CS', number: '247I' }, { dept: 'CS', number: '247L' },
  { dept: 'CS', number: '247S' }, { dept: 'CS', number: '248A' },
  { dept: 'CS', number: '248B' }, { dept: 'CS', number: '249I' },
  { dept: 'CS', number: '250' }, { dept: 'CS', number: '251' },
  { dept: 'CS', number: '254' }, { dept: 'CS', number: '254B' },
  { dept: 'CS', number: '255' }, { dept: 'CS', number: '256' },
  { dept: 'CS', number: '257' }, { dept: 'CS', number: '258' },
  { dept: 'CS', number: '259Q' }, { dept: 'CS', number: '261' },
  { dept: 'CS', number: '263' }, { dept: 'CS', number: '264' },
  { dept: 'CS', number: '265' }, { dept: 'CS', number: '269I' },
  { dept: 'CS', number: '270' }, { dept: 'CS', number: '272' },
  { dept: 'CS', number: '273B' }, { dept: 'CS', number: '273C' },
  { dept: 'CS', number: '274' }, { dept: 'CS', number: '275' },
  { dept: 'CS', number: '278' }, { dept: 'CS', number: '279' },
  { dept: 'CS', number: '281' }, { dept: 'CS', number: '293' },
  { dept: 'CS', number: '323' }, { dept: 'CS', number: '330' },
  { dept: 'CS', number: '336' }, { dept: 'CS', number: '342' },
  { dept: 'CS', number: '348A' }, { dept: 'CS', number: '348B' },
  { dept: 'CS', number: '348C' }, { dept: 'CS', number: '348E' },
  { dept: 'CS', number: '348I' }, { dept: 'CS', number: '348K' },
  { dept: 'CS', number: '348N' }, { dept: 'CS', number: '355' },
  { dept: 'CS', number: '361' }, { dept: 'CS', number: '377G' },
  { dept: 'CS', number: '448B' },
  { dept: 'CME',    number: '108' },
  { dept: 'DATASCI', number: '112' },
  { dept: 'EE', number: '108' }, { dept: 'EE', number: '180' },
  { dept: 'EE', number: '267' }, { dept: 'EE', number: '282' },
  { dept: 'EE', number: '364A' }, { dept: 'EE', number: '374' },
  { dept: 'ENGR', number: '245' },
  { dept: 'MS&E', number: '244' }, { dept: 'MS&E', number: '265' },
  { dept: 'MS&E', number: '296' },
];

// ── Humanities Electives (AI, HCI, Info, Systems, Theory, Visual Computing only) ─

const HUMANITIES_ELECTIVES: CourseOption[] = [
  { dept: 'AMSTUD',   number: '120' }, { dept: 'AMSTUD',   number: '133' },
  { dept: 'AMSTUD',   number: '145' },
  { dept: 'ANTHRO',   number: '132C' }, { dept: 'ANTHRO',   number: '132D' },
  { dept: 'ARCHLGY',  number: '86' },  { dept: 'ARCHLGY',  number: '104' },
  { dept: 'ARTSINST', number: '142' },
  { dept: 'ARTSTUDI', number: '130' }, { dept: 'ARTSTUDI', number: '160' },
  { dept: 'ARTSTUDI', number: '168' }, { dept: 'ARTSTUDI', number: '179' },
  { dept: 'COMM',     number: '120W' }, { dept: 'COMM',     number: '124' },
  { dept: 'COMM',     number: '145' }, { dept: 'COMM',     number: '154' },
  { dept: 'COMM',     number: '158' }, { dept: 'COMM',     number: '166' },
  { dept: 'COMM',     number: '186W' }, { dept: 'COMM',    number: '230A' },
  { dept: 'COMM',     number: '230B' }, { dept: 'COMM',    number: '230C' },
  { dept: 'CS',       number: '80Q' }, { dept: 'CS',       number: '152' },
  { dept: 'CS',       number: '181' }, { dept: 'CS',       number: '182' },
  { dept: 'CS',       number: '184' }, { dept: 'CS',       number: '206' },
  { dept: 'CS',       number: '209' },
  { dept: 'DESINST',  number: '215' }, { dept: 'DESINST',  number: '240' },
  { dept: 'DESINST',  number: '285' },
  { dept: 'EARTHSYS', number: '140' }, { dept: 'EARTHSYS', number: '144' },
  { dept: 'EARTHSYS', number: '162' }, { dept: 'EARTHSYS', number: '227' },
  { dept: 'ENERGY',   number: '112' }, { dept: 'ENERGY',   number: '160' },
  { dept: 'ENGLISH',  number: '106' }, { dept: 'ENGLISH',  number: '106A' },
  { dept: 'ENGLISH',  number: '115' }, { dept: 'ENGLISH',  number: '122' },
  { dept: 'ENGLISH',  number: '184C' }, { dept: 'ENGLISH', number: '184D' },
  { dept: 'ENGLISH',  number: '184E' },
  { dept: 'ESS',      number: '109' },
  { dept: 'ETHICSOC', number: '131X' }, { dept: 'ETHICSOC',number: '187' },
  { dept: 'GEOPHYS',  number: '128' }, { dept: 'GEOPHYS',  number: '228' },
  { dept: 'HISTORY',  number: '44' }, { dept: 'HISTORY',   number: '244F' },
  { dept: 'LINGUIST', number: '130A' }, { dept: 'LINGUIST', number: '145' },
  { dept: 'LINGUIST', number: '150' }, { dept: 'LINGUIST', number: '156' },
  { dept: 'MS&E',     number: '231' }, { dept: 'MS&E',     number: '234' },
  { dept: 'MS&E',     number: '254' },
  { dept: 'PHIL',     number: '60' }, { dept: 'PHIL',      number: '72' },
  { dept: 'PHIL',     number: '99' }, { dept: 'PHIL',      number: '170' },
  { dept: 'PHIL',     number: '171' }, { dept: 'PHIL',     number: '174B' },
  { dept: 'POLISCI',  number: '150A' },
  { dept: 'PSYCH',    number: '35' },
  { dept: 'PSYCH',    number: '70' }, { dept: 'PSYCH',    number: '75' },
  { dept: 'PSYCH',    number: '80' }, { dept: 'PSYCH',    number: '141' },
  { dept: 'PSYCH',    number: '175' }, { dept: 'PSYCH',   number: '180' },
  { dept: 'PSYCH',    number: '204A' }, { dept: 'PSYCH',  number: '204B' },
  { dept: 'PSYCH',    number: '215' }, { dept: 'PSYCH',  number: '241' },
  { dept: 'PUBLPOL',  number: '63Q' }, { dept: 'PUBLPOL', number: '103F' },
  { dept: 'SOC',      number: '114' },
  { dept: 'SUST',     number: '210' },
  { dept: 'SYMSYS',   number: '208' },
];

// ── AI Track ─────────────────────────────────────────────────────────────────

const AI_AREA_I: CourseOption[] = [
  { dept: 'CS', number: '224R' }, { dept: 'CS', number: '228' },
  { dept: 'CS', number: '229' }, { dept: 'CS', number: '229M' },
  { dept: 'CS', number: '234' }, { dept: 'CS', number: '238' },
];
const AI_AREA_II: CourseOption[] = [
  { dept: 'CS', number: '124' }, { dept: 'CS', number: '224N' },
  { dept: 'CS', number: '224S' }, { dept: 'CS', number: '224V' },
];
const AI_AREA_III: CourseOption[] = [
  { dept: 'CS', number: '131' },
  { dept: 'CS', number: '231A' },
  { dept: 'CS', number: '231N' },
];
const AI_AREA_IV: CourseOption[] = [
  { dept: 'CS', number: '123' }, { dept: 'CS', number: '137A' },
  { dept: 'CS', number: '223A' }, { dept: 'CS', number: '237A' },
];
const AI_AREAS_I_IV: CourseOption[] = [
  ...AI_AREA_I, ...AI_AREA_II, ...AI_AREA_III, ...AI_AREA_IV,
];

const AI_ADDITIONAL_EXTRAS: CourseOption[] = [
  { dept: 'CS',   number: '157' }, { dept: 'CS',   number: '205L' },
  { dept: 'CS',   number: '230' }, { dept: 'CS',   number: '236' },
  { dept: 'CS',   number: '257' },
  { dept: 'STATS',number: '315A' }, { dept: 'STATS',number: '315B' },
  { dept: 'CS',   number: '235' }, { dept: 'CS',   number: '279' },
  { dept: 'CS',   number: '224W' }, { dept: 'CS',   number: '276' },
  { dept: 'CS',   number: '256' },
  { dept: 'CS',   number: '225A' }, { dept: 'CS',   number: '327A' },
  { dept: 'CS',   number: '329' }, { dept: 'ENGR', number: '205' },
  { dept: 'CS',   number: '229S' },
  { dept: 'CS',   number: '151' }, { dept: 'CS',   number: '227B' },
];
const AI_ADDITIONAL_OPTIONS: CourseOption[] = dedupe([
  ...AI_AREAS_I_IV,
  ...AI_ADDITIONAL_EXTRAS,
]);

const AI_SUBPLAN_ELECTIVE_EXTRAS: CourseOption[] = [
  { dept: 'CS',   number: '325B' }, { dept: 'CS',   number: '326' },
  { dept: 'CS',   number: '342' },
  { dept: 'EE',   number: '263' }, { dept: 'EE',   number: '278' },
  { dept: 'EE',   number: '364B' },
  { dept: 'MS&E', number: '252' }, { dept: 'MS&E', number: '355' },
  { dept: 'PHIL', number: '152' },
  { dept: 'PSYCH',number: '204A' }, { dept: 'PSYCH',number: '204B' },
  { dept: 'PSYCH',number: '209' },
  { dept: 'STATS',number: '200' }, { dept: 'STATS',number: '202' },
  { dept: 'STATS',number: '203' }, { dept: 'STATS',number: '205' },
  { dept: 'STATS',number: '220' }, { dept: 'STATS',number: '271' },
];
const AI_SUBPLAN_ELECTIVES: CourseOption[] = dedupe([
  ...AI_AREAS_I_IV,
  ...AI_ADDITIONAL_EXTRAS,
  ...AI_SUBPLAN_ELECTIVE_EXTRAS,
  ...GENERAL_CS_ELECTIVES,
  ...HUMANITIES_ELECTIVES,
]);

const AI_SECTIONS: MajorSection[] = [
  {
    id: 'ai-required',
    name: 'AI: Required',
    slots: [
      {
        id: 'cs221',
        label: 'CS 221: Artificial Intelligence: Principles and Techniques',
        type: 'required',
        options: [{ dept: 'CS', number: '221' }],
      },
    ],
  },
  {
    id: 'ai-areas',
    name: 'AI: Subplan Areas (pick 2 from different areas)',
    minCourses: 2,
    note: 'Select exactly 2 courses from different areas. Area I: AI Methods; Area II: NLP; Area III: Vision; Area IV: Robotics.',
    slots: [
      {
        id: 'ai-area-1',
        label: 'Area I: AI Methods',
        type: 'pick-from-list',
        count: 1,
        options: AI_AREA_I,
        optional: true,
      },
      {
        id: 'ai-area-2',
        label: 'Area II: Natural Language Processing',
        type: 'pick-from-list',
        count: 1,
        options: AI_AREA_II,
        optional: true,
      },
      {
        id: 'ai-area-3',
        label: 'Area III: Vision',
        type: 'pick-from-list',
        count: 1,
        options: AI_AREA_III,
        optional: true,
      },
      {
        id: 'ai-area-4',
        label: 'Area IV: Robotics',
        type: 'pick-from-list',
        count: 1,
        options: AI_AREA_IV,
        optional: true,
      },
    ],
  },
  {
    id: 'ai-additional',
    name: 'AI: Additional Selection (pick 1)',
    note: 'Select 1 course from Areas I–IV above OR from the extended list (AI Methods extended, Comp Bio, Info and the Web, Ethics, Robotics and Control, Systems, Other). CS 329 requires advisor approval.',
    slots: [
      {
        id: 'ai-add-course',
        label: 'Additional Course',
        type: 'pick-from-list',
        count: 1,
        options: AI_ADDITIONAL_OPTIONS,
      },
    ],
  },
  {
    id: 'ai-electives',
    name: 'AI: Subplan Electives (at least 3)',
    note: 'At least 3 additional courses from the AI subplan list or CS General Electives. CS 195 counts maximum 4 units. One elective may be a Humanities Elective (AI track eligible).',
    slots: [
      {
        id: 'ai-elec',
        label: 'Subplan Electives',
        type: 'pick-from-list',
        count: 3,
        options: AI_SUBPLAN_ELECTIVES,
      },
    ],
  },
];

// ── Computational Biology Track ───────────────────────────────────────────────

const BIOCOMP_D_OPTIONS: CourseOption[] = [
  { dept: 'CS', number: '279' }, { dept: 'CS', number: '371' },
  { dept: 'BMDS', number: '210' }, { dept: 'BMDS', number: '214' },
  { dept: 'BMDS', number: '215' }, { dept: 'BMDS', number: '217' },
  { dept: 'BMDS', number: '219' }, { dept: 'BMDS', number: '222' },
  { dept: 'BMDS', number: '260' },
  { dept: 'BIOMEDIN', number: '273B' },
  { dept: 'IMMUNOL', number: '207' },
];

const BIOCOMP_F_OPTIONS: CourseOption[] = [
  { dept: 'APPPHYS', number: '294' },
  { dept: 'BIO', number: '183' }, { dept: 'BIO', number: '187' },
  { dept: 'BIOC', number: '241' },
  { dept: 'CHEMENG', number: '150' },
  { dept: 'CS', number: '147' }, { dept: 'CS', number: '148' },
  { dept: 'CS', number: '154' }, { dept: 'CS', number: '166' },
  { dept: 'CS', number: '168' }, { dept: 'CS', number: '230' },
  { dept: 'CS', number: '248A' },
  { dept: 'EE', number: '263' }, { dept: 'EE', number: '364A' },
  { dept: 'MS&E', number: '152' }, { dept: 'MS&E', number: '252' },
  { dept: 'STATS', number: '141' }, { dept: 'STATS', number: '202' },
  { dept: 'STATS', number: '203' }, { dept: 'STATS', number: '205' },
  { dept: 'STATS', number: '206' }, { dept: 'STATS', number: '211' },
  { dept: 'STATS', number: '315A' }, { dept: 'STATS', number: '315B' },
];

const BIOCOMP_G_OPTIONS: CourseOption[] = [
  { dept: 'APPPHYS', number: '294' },
  { dept: 'BIO', number: '81' }, { dept: 'BIO', number: '82' },
  { dept: 'BIO', number: '83' }, { dept: 'BIO', number: '84' },
  { dept: 'BIO', number: '85' }, { dept: 'BIO', number: '86' },
  { dept: 'BIO', number: '112' }, { dept: 'BIO', number: '214' },
  { dept: 'BIO', number: '230' },
  { dept: 'BIOC', number: '241' },
  { dept: 'BIOE', number: '220' },
  { dept: 'BMDS', number: '272' },
  { dept: 'CHEM', number: '31A' }, { dept: 'CHEM', number: '31B' },
  { dept: 'CHEM', number: '31E' }, { dept: 'CHEM', number: '33' },
  { dept: 'CHEM', number: '141' }, { dept: 'CHEM', number: '143' },
  { dept: 'CHEM', number: '171' }, { dept: 'CHEM', number: '181' },
  { dept: 'CHEMENG', number: '150' }, { dept: 'CHEMENG', number: '174' },
  { dept: 'DBIO', number: '210' },
  { dept: 'GENE', number: '211' },
  { dept: 'HUMBIO', number: '151R' },
  { dept: 'ME', number: '281' },
  { dept: 'SURG', number: '101' },
];

const BIOCOMP_SECTIONS: MajorSection[] = [
  {
    id: 'biocomp-bio',
    name: 'Computational Biology: Biology / Human Biology (12 units)',
    note: 'Choose the Biology option (pick ≥3 of BIO 82/83/85/86) OR the Human Biology option (all 3 HUMBIO courses).',
    slots: [
      {
        id: 'biocomp-bio-bio',
        label: 'Biology Option: pick ≥3 of BIO 82, 83, 85, 86',
        type: 'pick-from-list',
        count: 3,
        options: [
          { dept: 'BIO', number: '82' }, { dept: 'BIO', number: '83' },
          { dept: 'BIO', number: '85' }, { dept: 'BIO', number: '86' },
        ],
        optional: true,
      },
      {
        id: 'biocomp-bio-humbio',
        label: 'Human Biology Option: HUMBIO 2A, 3A, and 4A',
        type: 'pick-from-list',
        count: 3,
        options: [
          { dept: 'HUMBIO', number: '2A' }, { dept: 'HUMBIO', number: '3A' },
          { dept: 'HUMBIO', number: '4A' },
        ],
        optional: true,
      },
    ],
  },
  {
    id: 'biocomp-core',
    name: 'Computational Biology: A: Required Core',
    slots: [
      {
        id: 'biocomp-cs173a',
        label: 'CS 173A: Foundations of Computational Human Genomics',
        type: 'required',
        options: [{ dept: 'CS', number: '173A' }],
        note: 'Previously offered as CS 273A: either satisfies this requirement.',
      },
      {
        id: 'biocomp-cs221',
        label: 'CS 221: Artificial Intelligence: Principles and Techniques',
        type: 'required',
        options: [{ dept: 'CS', number: '221' }],
      },
    ],
  },
  {
    id: 'biocomp-section-b',
    name: 'Computational Biology: B: Data Systems (pick 1)',
    slots: [
      {
        id: 'biocomp-b',
        label: 'CS 145 or CS 246',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '145' },
          { dept: 'CS', number: '246' },
        ],
      },
    ],
  },
  {
    id: 'biocomp-section-c',
    name: 'Computational Biology: C: Software / Data (pick 1)',
    slots: [
      {
        id: 'biocomp-c',
        label: 'CS 142, CS 147L, or DATASCI 112',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '142' },
          { dept: 'CS', number: '147L' },
          { dept: 'DATASCI', number: '112' },
        ],
      },
    ],
  },
  {
    id: 'biocomp-section-d',
    name: 'Computational Biology: D: Computational Bio Course (pick 1)',
    slots: [
      {
        id: 'biocomp-d',
        label: 'CS 279, CS 371, or BMDS/BIOMEDIN/IMMUNOL course',
        type: 'pick-from-list',
        count: 1,
        options: BIOCOMP_D_OPTIONS,
      },
    ],
  },
  {
    id: 'biocomp-section-e',
    name: 'Computational Biology: E: AI/ML Area (pick 1 from 1 of 3 areas)',
    note: 'Select one course from one of: Area I (AI Methods), Area II (NLP), or Area III (Vision).',
    slots: [
      {
        id: 'biocomp-e-ai',
        label: 'Area I: AI Methods',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '224R' }, { dept: 'CS', number: '224W' },
          { dept: 'CS', number: '228' }, { dept: 'CS', number: '229' },
          { dept: 'CS', number: '229S' }, { dept: 'CS', number: '234' },
          { dept: 'CS', number: '238' },
        ],
        optional: true,
      },
      {
        id: 'biocomp-e-nlp',
        label: 'Area II: Natural Language Processing',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '124' }, { dept: 'CS', number: '224N' },
          { dept: 'CS', number: '224V' },
        ],
        optional: true,
      },
      {
        id: 'biocomp-e-vision',
        label: 'Area III: Vision',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '131' }, { dept: 'CS', number: '231N' },
        ],
        optional: true,
      },
    ],
  },
  {
    id: 'biocomp-section-f',
    name: 'Computational Biology: F: Additional Course (pick 1)',
    note: 'May instead choose one additional course from C, D, or a distinct E area.',
    slots: [
      {
        id: 'biocomp-f',
        label: 'Section F Course',
        type: 'pick-from-list',
        count: 1,
        options: BIOCOMP_F_OPTIONS,
      },
    ],
  },
  {
    id: 'biocomp-section-g',
    name: 'Computational Biology: G: Biology/Chemistry/Medicine (pick 1)',
    note: 'May instead choose one additional course from Section D.',
    slots: [
      {
        id: 'biocomp-g',
        label: 'Section G Course',
        type: 'pick-from-list',
        count: 1,
        options: BIOCOMP_G_OPTIONS,
      },
    ],
  },
];

// ── Computer Engineering Track ────────────────────────────────────────────────

const CE_SECTIONS: MajorSection[] = [
  {
    id: 'ce-required',
    name: 'Computer Engineering: Required',
    slots: [
      {
        id: 'ce-ee108',
        label: 'EE 108: Digital System Design',
        type: 'required',
        options: [{ dept: 'EE', number: '108' }],
      },
      {
        id: 'ce-ee180',
        label: 'EE 180: Digital Systems Architecture',
        type: 'required',
        options: [{ dept: 'EE', number: '180' }],
      },
      {
        id: 'ce-ee-circuits',
        label: 'EE Circuits / Signals (pick 2 of EE 101A/B, EE 102A/B)',
        type: 'pick-from-list',
        count: 2,
        options: [
          { dept: 'EE', number: '101A' }, { dept: 'EE', number: '101B' },
          { dept: 'EE', number: '102A' }, { dept: 'EE', number: '102B' },
        ],
      },
    ],
  },
  {
    id: 'ce-conc-note',
    name: 'CE: Concentrations (pick 2 of 3)',
    note: 'Choose exactly 2 of the 3 concentrations below: A) Digital Systems, B) Robotics/Mechatronics, C) Networking. Complete all required courses within each chosen concentration.',
    slots: [],
  },
  {
    id: 'ce-conc-a',
    name: 'CE Concentration A: Digital Systems',
    note: 'If choosing: EE 109 + EE 271 required, plus pick 1 of CS 112 / CS 140E. CS 111 must be completed before CS 112. CS 111 and CS 212 cannot both count; CS 111 and CS 140E can.',
    slots: [
      {
        id: 'ce-a-ee109',
        label: 'EE 109: Digital Systems Design Lab',
        type: 'required',
        options: [{ dept: 'EE', number: '109' }],
        optional: true,
      },
      {
        id: 'ce-a-ee271',
        label: 'EE 271: Introduction to VLSI Systems',
        type: 'required',
        options: [{ dept: 'EE', number: '271' }],
        optional: true,
      },
      {
        id: 'ce-a-elec',
        label: 'A: CS 112 or CS 140E',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '112' },
          { dept: 'CS', number: '140E' },
        ],
        optional: true,
      },
    ],
  },
  {
    id: 'ce-conc-b',
    name: 'CE Concentration B: Robotics / Mechatronics',
    note: 'If choosing: CS 205L + CS 223A required, plus ME 210 or CS 225A.',
    slots: [
      {
        id: 'ce-b-cs205l',
        label: 'CS 205L: Continuous Mathematical Methods with Emphasis on ML',
        type: 'required',
        options: [{ dept: 'CS', number: '205L' }],
        optional: true,
      },
      {
        id: 'ce-b-cs223a',
        label: 'CS 223A: Introduction to Robotics',
        type: 'required',
        options: [{ dept: 'CS', number: '223A' }],
        optional: true,
      },
      {
        id: 'ce-b-elec',
        label: 'B: ME 210 or CS 225A',
        type: 'pick-one',
        options: [
          { dept: 'ME', number: '210' },
          { dept: 'CS', number: '225A' },
        ],
        optional: true,
      },
    ],
  },
  {
    id: 'ce-conc-c',
    name: 'CE Concentration C: Networking',
    note: 'If choosing: (CS 112 or CS 140E) + CS 144 required, plus pick 1 elective. CS 111 must be completed before CS 112. CS 111 and CS 212 cannot both count; CS 111 and CS 140E can.',
    slots: [
      {
        id: 'ce-c-os',
        label: 'C: CS 112 or CS 140E',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '112' },
          { dept: 'CS', number: '140E' },
        ],
        optional: true,
      },
      {
        id: 'ce-c-cs144',
        label: 'CS 144: Introduction to Computer Networking',
        type: 'required',
        options: [{ dept: 'CS', number: '144' }],
        optional: true,
      },
      {
        id: 'ce-c-elec',
        label: 'C: Networking Elective (pick 1)',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '240' }, { dept: 'CS', number: '240LX' },
          { dept: 'CS', number: '241' }, { dept: 'CS', number: '244C' },
          { dept: 'EE', number: '179' },
        ],
        optional: true,
      },
    ],
  },
];

// ── Visual Computing Track ────────────────────────────────────────────────────

const VC_CORE_OPTIONS: CourseOption[] = [
  { dept: 'CS', number: '225A' }, { dept: 'CS', number: '248A' },
  { dept: 'CS', number: '248B' }, { dept: 'CS', number: '231N' },
];

const VC_DEPTH_OPTIONS: CourseOption[] = [
  { dept: 'CS', number: '205L' }, { dept: 'CS', number: '223A' },
  { dept: 'CS', number: '224R' }, { dept: 'CS', number: '225A' },
  { dept: 'CS', number: '231A' }, { dept: 'CS', number: '231N' },
  { dept: 'CS', number: '233' }, { dept: 'CS', number: '248A' },
  { dept: 'CS', number: '248B' }, { dept: 'CS', number: '348C' },
  { dept: 'CS', number: '348I' }, { dept: 'CS', number: '348K' },
  { dept: 'CS', number: '348N' }, { dept: 'CS', number: '448I' },
  { dept: 'EE', number: '267' },
];

const VC_SUBPLAN_EXTRAS: CourseOption[] = [
  { dept: 'CS', number: '123' }, { dept: 'CS', number: '131' },
  { dept: 'CS', number: '148' }, { dept: 'CS', number: '149' },
  { dept: 'CS', number: '221' }, { dept: 'CS', number: '224N' },
  { dept: 'CS', number: '229' }, { dept: 'CS', number: '230' },
  { dept: 'CS', number: '234' }, { dept: 'CS', number: '236' },
  { dept: 'CS', number: '448B' }, { dept: 'CS', number: '448Z' },
  { dept: 'EE', number: '261' },
];

const GRAPHICS_SECTIONS: MajorSection[] = [
  {
    id: 'vc-core',
    name: 'Visual Computing: Core (pick at least 2)',
    note: 'Select at least 2 of: CS 225A, CS 248A, CS 248B, CS 231N.',
    slots: [
      {
        id: 'vc-core-courses',
        label: 'Core Courses (pick 2)',
        type: 'pick-from-list',
        count: 2,
        options: VC_CORE_OPTIONS,
      },
    ],
  },
  {
    id: 'vc-depth',
    name: 'Visual Computing: Depth (pick at least 3)',
    note: 'Select at least 3 courses from the depth list.',
    slots: [
      {
        id: 'vc-depth-courses',
        label: 'Depth Courses (pick 3)',
        type: 'pick-from-list',
        count: 3,
        options: VC_DEPTH_OPTIONS,
      },
    ],
  },
  {
    id: 'vc-electives',
    name: 'Visual Computing: Electives (at least 3)',
    note: 'At least 3 additional courses from the depth list, subplan extras, CS General Electives, or eligible Humanities Electives.',
    slots: [
      {
        id: 'vc-elec',
        label: 'Electives',
        type: 'any-approved',
        options: dedupe([...VC_DEPTH_OPTIONS, ...VC_SUBPLAN_EXTRAS, ...GENERAL_CS_ELECTIVES, ...HUMANITIES_ELECTIVES]),
      },
    ],
  },
];

// ── Human-Computer Interaction Track ─────────────────────────────────────────

const CS247_SERIES: CourseOption[] = [
  { dept: 'CS', number: '247' }, { dept: 'CS', number: '247A' },
  { dept: 'CS', number: '247B' }, { dept: 'CS', number: '247E' },
  { dept: 'CS', number: '247G' }, { dept: 'CS', number: '247I' },
  { dept: 'CS', number: '247L' }, { dept: 'CS', number: '247S' },
];

const HCI_SECTIONS: MajorSection[] = [
  {
    id: 'hci-section-a',
    name: 'HCI: A: Required (3 courses)',
    slots: [
      {
        id: 'cs147',
        label: 'CS 147: Introduction to Human-Computer Interaction Design',
        type: 'required',
        options: [{ dept: 'CS', number: '147' }],
      },
      {
        id: 'cs147l',
        label: 'CS 147L: Cross-platform Mobile App Development',
        type: 'required',
        options: [{ dept: 'CS', number: '147L' }],
      },
      {
        id: 'cs347',
        label: 'CS 347: Human-Computer Interaction: Foundations and Frontiers',
        type: 'required',
        options: [{ dept: 'CS', number: '347' }],
      },
    ],
  },
  {
    id: 'hci-section-b',
    name: 'HCI: B: HCI Methods (pick 1 from CS 247 series)',
    slots: [
      {
        id: 'hci-b',
        label: 'CS 247 Series Course',
        type: 'pick-from-list',
        count: 1,
        options: CS247_SERIES,
      },
    ],
  },
  {
    id: 'hci-section-c',
    name: 'HCI: C: Mezzanine',
    note: 'Required: CS 177, CS 278, CS 448B. Plus pick 1 mezzanine elective: CS 177 / CS 194H / CS 206 / CS 210A, OR a CS 247 series course (different from B), OR any CS 377 course (≥3 units).',
    slots: [
      {
        id: 'hci-c-177',
        label: 'CS 177: Human Centered Product Management',
        type: 'required',
        options: [{ dept: 'CS', number: '177' }],
      },
      {
        id: 'hci-c-278',
        label: 'CS 278: Social Computing',
        type: 'required',
        options: [{ dept: 'CS', number: '278' }],
      },
      {
        id: 'hci-c-448b',
        label: 'CS 448B: Data Visualization',
        type: 'required',
        options: [{ dept: 'CS', number: '448B' }],
      },
      {
        id: 'hci-c-elec',
        label: 'Mezzanine Elective (pick 1)',
        type: 'pick-from-list',
        count: 1,
        options: dedupe([
          { dept: 'CS', number: '177' }, { dept: 'CS', number: '194H' },
          { dept: 'CS', number: '206' }, { dept: 'CS', number: '210A' },
          ...CS247_SERIES,
          { dept: 'CS', number: '377G' },
        ]),
        note: 'CS 247 suffix chosen here cannot be the same as Section B. Any CS 377 suffix for 3+ units accepted.',
      },
    ],
  },
  {
    id: 'hci-section-d',
    name: 'HCI: D: Subplan Electives (at least 2)',
    note: 'At least 2 courses from CS General Electives or eligible Humanities Electives.',
    slots: [
      {
        id: 'hci-elec',
        label: 'Electives',
        type: 'any-approved',
        options: dedupe([...GENERAL_CS_ELECTIVES, ...HUMANITIES_ELECTIVES]),
      },
    ],
  },
];

// ── Information Track ─────────────────────────────────────────────────────────

const INFO_SECTIONS: MajorSection[] = [
  {
    id: 'info-section-a',
    name: 'Information: A: Required',
    slots: [
      {
        id: 'cs124',
        label: 'CS 124: From Languages to Information',
        type: 'required',
        options: [{ dept: 'CS', number: '124' }],
        note: 'Cross-listed LINGUIST 180 / LINGUIST 280',
      },
      {
        id: 'cs145',
        label: 'CS 145: Introduction to Big Data Systems',
        type: 'required',
        options: [{ dept: 'CS', number: '145' }],
      },
    ],
  },
  {
    id: 'info-section-b',
    name: 'Information: B: Areas (pick 2 from different areas)',
    minCourses: 2,
    note: 'Area I: AI Applications; Area II: Database/Info Systems; Area III: Biology Info Systems; Area IV: Info on the Web (CS 224W only).',
    slots: [
      {
        id: 'info-b-area1',
        label: 'Area I: AI Applications',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '224N' }, { dept: 'CS', number: '224S' },
          { dept: 'CS', number: '229' }, { dept: 'CS', number: '233' },
          { dept: 'CS', number: '234' },
        ],
        optional: true,
      },
      {
        id: 'info-b-area2',
        label: 'Area II: Database and Information Systems',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '112' }, { dept: 'CS', number: '140E' },
          { dept: 'CS', number: '147L' }, { dept: 'CS', number: '151' },
          { dept: 'CS', number: '245' }, { dept: 'CS', number: '246' },
        ],
        optional: true,
        note: 'CS 111 required before CS 112. CS 111 and CS 212 can both count toward BS.',
      },
      {
        id: 'info-b-area3',
        label: 'Area III: Information Systems in Biology',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '235' }, { dept: 'CS', number: '270' },
          { dept: 'CS', number: '274' },
        ],
        optional: true,
      },
      {
        id: 'info-b-area4',
        label: 'Area IV: Information Systems on the Web',
        type: 'pick-from-list',
        count: 1,
        options: [{ dept: 'CS', number: '224W' }],
        optional: true,
      },
    ],
  },
  {
    id: 'info-section-c',
    name: 'Information: C: Subplan Electives (at least 2)',
    note: 'At least 2 courses from CS General Electives or eligible Humanities Electives.',
    slots: [
      {
        id: 'info-elec',
        label: 'Electives',
        type: 'any-approved',
        options: dedupe([...GENERAL_CS_ELECTIVES, ...HUMANITIES_ELECTIVES]),
      },
    ],
  },
];

// ── Systems Track ─────────────────────────────────────────────────────────────

const SYSTEMS_C_OPTIONS: CourseOption[] = [
  { dept: 'CS', number: '144' }, { dept: 'CS', number: '145' },
  { dept: 'CS', number: '149' }, { dept: 'CS', number: '155' },
  { dept: 'CS', number: '217' }, { dept: 'CS', number: '240' },
  { dept: 'CS', number: '240LX' }, { dept: 'CS', number: '242' },
  { dept: 'CS', number: '243' }, { dept: 'CS', number: '244C' },
  { dept: 'CS', number: '245' },
  { dept: 'EE', number: '271' }, { dept: 'EE', number: '282' },
];

const SYSTEMS_SUBPLAN_EXTRAS: CourseOption[] = [
  { dept: 'CS', number: '241' }, { dept: 'CS', number: '295' },
  { dept: 'CS', number: '340R' }, { dept: 'CS', number: '343D' },
  { dept: 'CS', number: '349D' }, { dept: 'CS', number: '349H' },
  { dept: 'CS', number: '448I' },
  { dept: 'EE', number: '108' },
  { dept: 'EE', number: '382A' }, { dept: 'EE', number: '382C' },
  { dept: 'EE', number: '384S' },
];

const SYSTEMS_SECTIONS: MajorSection[] = [
  {
    id: 'systems-section-a',
    name: 'Systems: A: OS Course (pick 1)',
    note: 'CS 111 must be completed before CS 112. CS 111 and CS 212 can both count toward BS; CS 111 and CS 140E can also both count.',
    slots: [
      {
        id: 'systems-a',
        label: 'CS 112 or CS 140E',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '112' },
          { dept: 'CS', number: '140E' },
        ],
      },
    ],
  },
  {
    id: 'systems-section-b',
    name: 'Systems: B: Compilers or Architecture (pick 1)',
    slots: [
      {
        id: 'systems-b',
        label: 'CS 143 or EE 180',
        type: 'pick-one',
        options: [
          { dept: 'CS', number: '143' },
          { dept: 'EE', number: '180' },
        ],
      },
    ],
  },
  {
    id: 'systems-section-c',
    name: 'Systems: C: Depth Courses (pick 2)',
    slots: [
      {
        id: 'systems-c',
        label: 'Depth Courses (pick 2)',
        type: 'pick-from-list',
        count: 2,
        options: SYSTEMS_C_OPTIONS,
      },
    ],
  },
  {
    id: 'systems-section-d',
    name: 'Systems: D: Subplan Electives (at least 3)',
    note: 'At least 3 additional courses from Section C list, subplan extras, or CS General Electives. CS 195 max 4 units.',
    slots: [
      {
        id: 'systems-elec',
        label: 'Electives',
        type: 'any-approved',
        options: dedupe([...SYSTEMS_C_OPTIONS, ...SYSTEMS_SUBPLAN_EXTRAS, ...GENERAL_CS_ELECTIVES]),
      },
    ],
  },
];

// ── Theory Track ──────────────────────────────────────────────────────────────

const THEORY_B_OPTIONS: CourseOption[] = [
  { dept: 'CS', number: '168' }, { dept: 'CS', number: '255' },
  { dept: 'CS', number: '261' }, { dept: 'CS', number: '265' },
];

const THEORY_C_OPTIONS: CourseOption[] = [
  { dept: 'CS', number: '143' }, { dept: 'CS', number: '151' },
  { dept: 'CS', number: '155' }, { dept: 'CS', number: '157' },
  { dept: 'PHIL', number: '151' },
  { dept: 'CS', number: '166' }, { dept: 'CS', number: '205L' },
  { dept: 'CS', number: '228' }, { dept: 'CS', number: '233' },
  { dept: 'CS', number: '235' }, { dept: 'CS', number: '236' },
  { dept: 'CS', number: '242' }, { dept: 'CS', number: '250' },
  { dept: 'CS', number: '251' }, { dept: 'CS', number: '254' },
  { dept: 'CS', number: '259Q' }, { dept: 'CS', number: '263' },
  { dept: 'CS', number: '264' }, { dept: 'CS', number: '269I' },
  { dept: 'CS', number: '355' },
  { dept: 'MS&E', number: '310' },
];

const THEORY_SUBPLAN_EXTRAS: CourseOption[] = [
  { dept: 'CME', number: '302' },
  { dept: 'CS', number: '254B' },
  { dept: 'PHIL', number: '152' },
];

const THEORY_SECTIONS: MajorSection[] = [
  {
    id: 'theory-section-a',
    name: 'Theory: A: Required',
    slots: [
      {
        id: 'cs154',
        label: 'CS 154: Introduction to the Theory of Computation',
        type: 'required',
        options: [{ dept: 'CS', number: '154' }],
      },
    ],
  },
  {
    id: 'theory-section-b',
    name: 'Theory: B: Algorithms (pick 1)',
    slots: [
      {
        id: 'theory-b',
        label: 'CS 168, CS 255, CS 261, or CS 265',
        type: 'pick-from-list',
        count: 1,
        options: THEORY_B_OPTIONS,
      },
    ],
  },
  {
    id: 'theory-section-c',
    name: 'Theory: C: Depth (pick 2)',
    note: 'Two additional courses from Section B or from this list. MS&E 310 and CS 369 require advisor approval.',
    slots: [
      {
        id: 'theory-c',
        label: 'Theory Depth Courses (pick 2)',
        type: 'pick-from-list',
        count: 2,
        options: dedupe([...THEORY_B_OPTIONS, ...THEORY_C_OPTIONS]),
      },
    ],
  },
  {
    id: 'theory-section-d',
    name: 'Theory: D: Subplan Electives (at least 3)',
    note: 'At least 3 additional courses from B/C lists, subplan extras (CME 302, CS 254B, PHIL 152), or CS General Electives.',
    slots: [
      {
        id: 'theory-elec',
        label: 'Electives',
        type: 'any-approved',
        options: dedupe([...THEORY_B_OPTIONS, ...THEORY_C_OPTIONS, ...THEORY_SUBPLAN_EXTRAS, ...GENERAL_CS_ELECTIVES]),
      },
    ],
  },
];

// ── Unspecialized Track ───────────────────────────────────────────────────────

const UNSPEC_SECTIONS: MajorSection[] = [
  {
    id: 'unspec-section-a',
    name: 'Unspecialized: A: Required',
    note: 'Humanities Electives NOT available for Unspecialized track.',
    slots: [
      {
        id: 'unspec-cs154',
        label: 'CS 154: Introduction to the Theory of Computation',
        type: 'required',
        options: [{ dept: 'CS', number: '154' }],
      },
    ],
  },
  {
    id: 'unspec-section-b',
    name: 'Unspecialized: B: Systems / Compilers (pick 1)',
    note: 'CS 111 must be completed before CS 112. CS 111 and CS 212 can both count; CS 111 and CS 140E can also both count.',
    slots: [
      {
        id: 'unspec-b',
        label: 'CS 112, CS 140E, or CS 143',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '112' },
          { dept: 'CS', number: '140E' },
          { dept: 'CS', number: '143' },
        ],
      },
    ],
  },
  {
    id: 'unspec-section-c',
    name: 'Unspecialized: C: Additional Systems (pick 1)',
    note: 'One more course from Section B, or from this list.',
    slots: [
      {
        id: 'unspec-c',
        label: 'Section C Course',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '112' }, { dept: 'CS', number: '140E' },
          { dept: 'CS', number: '143' }, { dept: 'CS', number: '144' },
          { dept: 'CS', number: '155' }, { dept: 'CS', number: '242' },
          { dept: 'CS', number: '244C' }, { dept: 'EE', number: '180' },
        ],
      },
    ],
  },
  {
    id: 'unspec-section-d',
    name: 'Unspecialized: D: AI / Robotics (pick 1)',
    slots: [
      {
        id: 'unspec-d',
        label: 'CS 221, CS 223A, CS 228, CS 229, or CS 231A',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '221' }, { dept: 'CS', number: '223A' },
          { dept: 'CS', number: '228' }, { dept: 'CS', number: '229' },
          { dept: 'CS', number: '231A' },
        ],
      },
    ],
  },
  {
    id: 'unspec-section-e',
    name: 'Unspecialized: E: Applications (pick 1)',
    slots: [
      {
        id: 'unspec-e',
        label: 'CS 145, CS 147, CS 148, CS 235, CS 248A, or CS 248B',
        type: 'pick-from-list',
        count: 1,
        options: [
          { dept: 'CS', number: '145' }, { dept: 'CS', number: '147' },
          { dept: 'CS', number: '148' }, { dept: 'CS', number: '235' },
          { dept: 'CS', number: '248A' }, { dept: 'CS', number: '248B' },
        ],
      },
    ],
  },
  {
    id: 'unspec-section-f',
    name: 'Unspecialized: F: Electives (at least 2)',
    note: 'At least 2 additional courses from CS General Electives. Humanities Electives NOT available for Unspecialized.',
    slots: [
      {
        id: 'unspec-elec',
        label: 'Electives',
        type: 'any-approved',
        options: GENERAL_CS_ELECTIVES,
      },
    ],
  },
];

// ── Tracks ────────────────────────────────────────────────────────────────────

const TRACKS: Track[] = [
  { id: 'ai',      name: 'Artificial Intelligence',   minUnits: 25, sections: AI_SECTIONS },
  { id: 'biocomp', name: 'Computational Biology',      minUnits: 25, sections: BIOCOMP_SECTIONS },
  { id: 'ce',      name: 'Computer Engineering',       minUnits: 25, sections: CE_SECTIONS },
  { id: 'graphics',name: 'Visual Computing',           minUnits: 25, sections: GRAPHICS_SECTIONS },
  { id: 'hci',     name: 'Human-Computer Interaction', minUnits: 25, sections: HCI_SECTIONS },
  { id: 'info',    name: 'Information',                minUnits: 25, sections: INFO_SECTIONS },
  { id: 'systems', name: 'Systems',                    minUnits: 25, sections: SYSTEMS_SECTIONS },
  { id: 'theory',  name: 'Theory',                     minUnits: 25, sections: THEORY_SECTIONS },
  { id: 'unspec',  name: 'Unspecialized',              minUnits: 25, sections: UNSPEC_SECTIONS },
  {
    id: 'indiv',
    name: 'Individually Designed',
    minUnits: 25,
    sections: [
      {
        id: 'indiv-courses',
        name: 'Individually Designed: Course Plan',
        note: 'Minimum 7 courses, at least 4 must be CS numbered 100+. Proposal must be submitted and approved at least 2 quarters before graduation by the undergraduate advisor and Associate Chair for Education (Chris Gregg). Any subsequent changes must go through the same process.',
        slots: [
          {
            id: 'indiv-elec',
            label: 'Approved Courses (≥7 total, ≥4 CS 100+)',
            type: 'any-approved',
            options: GENERAL_CS_ELECTIVES,
          },
        ],
      },
    ],
  },
];

// ── Main config ───────────────────────────────────────────────────────────────

export const CS_BS_2526: MajorConfig = {
  id: 'cs-bs-2526',
  name: 'Computer Science (BS)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CS-BS/',
  category: 'major',
  totalMinUnits: 96,

  sections: [
    // ── Mathematics (26 units min) ─────────────────────────────────────────
    {
      id: 'math',
      name: 'Mathematics',
      minUnits: 26,
      note: 'At least 26 units. MATH 19/20/21 may be replaced by AP Calculus credit (SoE must approve). CS 157 + PHIL 151 may NOT both count toward Math Electives. Students taking MATH 51+52 may not also count CME 100. Math electives NOT required for Computational Biology subplan.',
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
          id: 'cs109',
          label: 'CS 109: Introduction to Probability for Computer Scientists',
          type: 'required',
          options: [{ dept: 'CS', number: '109' }],
        },
        {
          id: 'math-elec',
          label: 'Math Electives (pick 2)',
          type: 'pick-from-list',
          count: 2,
          options: MATH_ELECTIVE_OPTIONS,
          note: 'CS 157 and PHIL 151 may NOT both count. Students taking MATH 51+52 may not also count CME 100. Not required for Computational Biology subplan.',
        },
      ],
    },

    // ── Science (11 units min) ─────────────────────────────────────────────
    {
      id: 'science',
      name: 'Science (11 units minimum)',
      note: 'The Computational Biology Subplan requires a different set of Science courses. Please see the Computational Biology Subplan for details.',
      slots: [],
      pickOneGroup: [
        {
          id: 'science-standard',
          name: 'Standard Science Requirements',
          note: 'Minimum 11 units. Either PHYSICS 61/63 or PHYSICS 21/23 may substitute for PHYSICS 41/43. SoE approves AP credits.',
          slots: [
            {
              id: 'phys-mech',
              label: 'Mechanics',
              type: 'pick-one',
              options: [
                { dept: 'PHYSICS', number: '41', name: 'Mechanics' },
                { dept: 'PHYSICS', number: '21' },
                { dept: 'PHYSICS', number: '61' },
              ],
            },
            {
              id: 'phys-em',
              label: 'Electricity & Magnetism',
              type: 'pick-one',
              options: [
                { dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' },
                { dept: 'PHYSICS', number: '23' },
                { dept: 'OSPPARIS', number: '53' },
              ],
            },
            {
              id: 'sci-elec',
              label: 'Science Elective (pick 1)',
              type: 'pick-from-list',
              count: 1,
              options: SCIENCE_ELECTIVE_OPTIONS,
              note: 'AP Chemistry credit counts via SoE approval. PSYCH 30 also accepted.',
            },
          ],
        },
        {
          id: 'science-biocomp',
          name: 'Computational Biology Science Requirements',
          slots: [
            {
              id: 'science-biocomp-complete',
              label: 'Computational Biology science requirements completed',
              type: 'manual',
              options: [],
              note: 'Check this after completing the different Science courses listed in the Computational Biology Subplan.',
            },
          ],
        },
      ],
    },

    // ── Technology in Society ──────────────────────────────────────────────
    {
      id: 'tis',
      name: 'Technology in Society',
      minUnits: 3,
      note: 'At least 1 course, 3–5 units. ENERGY 177A AND 177B must BOTH be taken together to count as one TiS slot.',
      slots: [
        {
          id: 'tis-course',
          label: 'Technology in Society Course',
          type: 'pick-from-list',
          count: 1,
          options: TIS_OPTIONS,
          note: 'ENERGY 177A and 177B must both be taken to satisfy this requirement together.',
        },
      ],
    },

    // ── Engineering Fundamentals (10 units min) ────────────────────────────
    {
      id: 'engr-fund',
      name: 'Engineering Fundamentals',
      note: 'Minimum 10 units total. CS 106B + ENGR 40M/76 + one Fundamentals Elective. Students taking ENGR 40A or ENGR 40M for fewer than 5 units must take 1–2 additional ENGR Fundamentals or Depth units.',
      slots: [
        {
          id: 'cs106b',
          label: 'CS 106B: Programming Abstractions',
          type: 'required',
          options: [{ dept: 'CS', number: '106B' }],
          note: 'Students without prior programming experience should first take CS 106A (does not count toward major).',
        },
        {
          id: 'engr-ee',
          label: 'Intro to EE / Information Science',
          type: 'pick-one',
          options: [
            { dept: 'ENGR', number: '40M', name: 'An Intro to Making: What is EE?' },
            { dept: 'ENGR', number: '76',  name: 'Information Science and Engineering' },
          ],
        },
        {
          id: 'engr-fund-elec',
          label: 'Fundamentals Elective (3–5 units)',
          type: 'any-approved',
          optional: true,
          options: GENERAL_CS_ELECTIVES,
          note: 'May be any ENGR Fundamentals course (see UGHB Fig. 3-4) or an additional CS Depth course. May not be any CS 106 course.',
        },
      ],
    },

    // ── CS Core (15 units min) ─────────────────────────────────────────────
    {
      id: 'core',
      name: 'CS Core',
      minUnits: 15,
      slots: [
        {
          id: 'cs107',
          label: 'Computer Organization & Systems',
          type: 'pick-one',
          options: [
            { dept: 'CS', number: '107',  name: 'Computer Organization and Systems' },
            { dept: 'CS', number: '107E', name: 'Computer Systems from the Ground Up' },
          ],
        },
        {
          id: 'cs111',
          label: 'CS 111: Operating Systems Principles',
          type: 'required',
          options: [{ dept: 'CS', number: '111' }],
        },
        {
          id: 'cs161',
          label: 'CS 161: Design and Analysis of Algorithms',
          type: 'required',
          options: [{ dept: 'CS', number: '161' }],
        },
      ],
    },

    // ── Depth / Subplan ────────────────────────────────────────────────────
    {
      id: 'depth',
      name: 'Subplan / Depth',
      trackSelector: true,
      note: 'Select one of 10 subplans. Each requires at least 25 units and 7 courses. All courses must be taken for a letter grade if offered. Minimum combined GPA of 2.0 for Engineering Fundamentals and Depth. No double-counting between sections.',
      slots: [],
    },

    // ── Senior Project / Capstone ──────────────────────────────────────────
    {
      id: 'senior-project',
      name: 'Senior Project',
      minCourses: 1,
      note: 'At least 1 course, minimum 3 units. CS 191W, CS 194W, and CS 210B also satisfy the WIM requirement. Honors requires ≥9 units of CS 191/191W, GPA ≥3.6 in major courses, senior standing (135+ units), and application by May 1.',
      slots: [
        {
          id: 'capstone',
          label: 'Senior Project',
          type: 'pick-one',
          minUnits: 3,
          options: [
            { dept: 'CS', number: '191',  name: 'Senior Project' },
            { dept: 'CS', number: '191W', name: 'Writing Intensive Senior Research Project' },
            { dept: 'CS', number: '194',  name: 'Software Project' },
            { dept: 'CS', number: '194H', name: 'User Interface Design Project' },
            { dept: 'CS', number: '194W', name: 'Software Project (WIM)' },
            { dept: 'CS', number: '210B', name: 'Industry Innovation Lab' },
          ],
        },
      ],
    },

    // ── Writing in the Major (WIM) ─────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      note: 'Complete at least 1 WIM course.',
      slots: [
        {
          id: 'wim-course',
          label: 'WIM Course',
          type: 'pick-from-list',
          count: 1,
          options: [
            { dept: 'CS', number: '121' },
            { dept: 'CS', number: '181W' },
            { dept: 'CS', number: '182W' },
            { dept: 'CS', number: '191W' },
            { dept: 'CS', number: '194W' },
            { dept: 'CS', number: '210B' },
          ],
        },
      ],
    },
  ],

  tracks: TRACKS,

  wimCourses: [
    { dept: 'CS', number: '121' },
    { dept: 'CS', number: '181W' },
    { dept: 'CS', number: '182W' },
    { dept: 'CS', number: '191W' },
    { dept: 'CS', number: '194W' },
    { dept: 'CS', number: '210B' },
  ],
};
