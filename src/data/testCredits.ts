// Source: Stanford External Test Credit Equivalency Chart (2026-27 Bulletin)
// NOTE: No AP/IB exams fulfill Ways requirements: only course equivalencies and language requirement.

export type ExamType = 'AP' | 'IBACC' | 'GCEUK' | 'GCEEU' | 'GMABT' | 'CAPE' | 'IRELC' | 'NEWL' | 'AUSHC';
export type SubjectArea = 'Chemistry' | 'Computer Science' | 'Economics' | 'Mathematics' | 'Physics' | 'Language';

export interface ScoreOption {
  score: string;
  units: number;
  courses: string;
}

export interface TestCreditGroup {
  id: string;
  examType: ExamType;
  subject: string;
  area: SubjectArea;
  // length=1 → single option; length>1 → score picker shown
  scoreOptions: ScoreOption[];
  fulfillsLang: boolean;
  note?: string;
  // AP/NEWL language: score 4 = 0 units but still fulfills lang req
  apNEWLLang?: true;
}

// Language, Math, and Computer Science are mutually exclusive within each area: only one can be checked at a time
export const SINGLE_SELECT_AREAS: SubjectArea[] = ['Language', 'Mathematics', 'Computer Science'];

// helpers
const so = (score: string, units: number, courses: string): ScoreOption => ({ score, units, courses });
const one = (score: string, units: number, courses: string): ScoreOption[] => [so(score, units, courses)];

const g = (
  id: string, examType: ExamType, subject: string, area: SubjectArea,
  scoreOptions: ScoreOption[],
  opts: { fulfillsLang?: boolean; note?: string; apNEWLLang?: true } = {}
): TestCreditGroup => ({
  id, examType, subject, area, scoreOptions,
  fulfillsLang: opts.fulfillsLang ?? false,
  note: opts.note,
  apNEWLLang: opts.apNEWLLang,
});

// ── AP ──────────────────────────────────────────────────────────────────────

const AP_GROUPS: TestCreditGroup[] = [
  // Chemistry
  g('ap-chem', 'AP', 'Chemistry', 'Chemistry', one('5', 10, 'CHEM 31A/31B or 31E')),

  // Computer Science
  g('ap-cs-a', 'AP', 'Computer Science A', 'Computer Science', one('4+', 5, 'CS 105, 106A'),
    { note: 'Credit for only one AP CS test; higher-satisfying exam awarded if both submitted' }),
  g('ap-cs-p', 'AP', 'Computer Science Principles', 'Computer Science', one('4+', 5, 'CS 105'),
    { note: 'Credit for only one AP CS test; higher-satisfying exam awarded if both submitted' }),

  // Economics
  g('ap-econ', 'AP', 'Microeconomics & Macroeconomics (both required)', 'Economics',
    one('5 & 5', 0, 'ECON 1'),
    { note: 'Qualifying scores on BOTH Micro and Macro required for credit; 0 unit award' }),

  // Mathematics
  g('ap-calc-ab', 'AP', 'Calculus AB', 'Mathematics', one('5', 6, 'MATH 19/20')),
  g('ap-calc-ab-sub', 'AP', 'Calculus AB Subscore (from BC)', 'Mathematics', one('5', 6, 'MATH 19/20')),
  g('ap-calc-bc', 'AP', 'Calculus BC', 'Mathematics', [
    so('4', 6,  'MATH 19/20'),
    so('5', 10, 'MATH 19/20/21'),
  ]),

  // Physics: same-exam/different-score entries merged
  g('ap-phys-12', 'AP', 'Physics 1 & 2 (both, combined score)', 'Physics', [
    so('8 combined',       4, 'PHYSICS 21'),
    so('9 or 10 combined', 8, 'PHYSICS 21/23'),
  ], { note: 'Max 8 units for AP Physics total; credit for Physics 1/2 combined OR one/both Physics C' }),
  g('ap-phys-cm', 'AP', 'Physics C: Mechanics', 'Physics', [
    so('4', 4, 'PHYSICS 21'),
    so('5', 4, 'PHYSICS 21/41'),
  ]),
  g('ap-phys-ce', 'AP', 'Physics C: Electricity & Magnetism', 'Physics', [
    so('4', 4, 'PHYSICS 23'),
    so('5', 4, 'PHYSICS 23/43'),
  ]),

  // Language: score 4: fulfills lang req (0 units); score 5: 10 units
  g('ap-lang-chinese',  'AP', 'Chinese',                'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('ap-lang-french',   'AP', 'French',                 'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('ap-lang-german',   'AP', 'German',                 'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('ap-lang-italian',  'AP', 'Italian',                'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('ap-lang-japanese', 'AP', 'Japanese',               'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('ap-lang-spanish',  'AP', 'Spanish (Language or Literature)',                'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('ap-lang-latin',    'AP', 'Latin', 'Language', [so('4', 0, 'lang req only'), so('5', 10, 'CLASSICS 1L/2L/3L')],     { fulfillsLang: true, apNEWLLang: true }),
];

// ── IB (IBACC) ──────────────────────────────────────────────────────────────

const IB_GROUPS: TestCreditGroup[] = [
  g('ib-chem', 'IBACC', 'HL Chemistry', 'Chemistry', one('5+', 10, 'CHEM 31A/31B or 31E')),
  g('ib-cs',   'IBACC', 'Computer Science', 'Computer Science', one('5+', 5, 'CS 105, 106A')),
  g('ib-econ', 'IBACC', 'HL Economics', 'Economics', one('7', 0, 'ECON 1'),
    { note: '0 unit award; satisfies ECON 1' }),
  g('ib-math', 'IBACC', 'Math Analysis & Approaches (HL)', 'Mathematics', one('6+', 6, 'MATH 19/20')),
  g('ib-phys', 'IBACC', 'HL Physics', 'Physics', [
    so('5',  4, 'PHYSICS 21'),
    so('6+', 8, 'PHYSICS 21/23'),
  ]),
  g('ib-lang-french',   'IBACC', 'HL French',   'Language', one('5+', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('ib-lang-german',   'IBACC', 'HL German',   'Language', one('5+', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('ib-lang-italian',  'IBACC', 'HL Italian',  'Language', one('5+', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('ib-lang-japanese', 'IBACC', 'HL Japanese', 'Language', one('5+', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('ib-lang-korean',   'IBACC', 'HL Korean',   'Language', one('5+', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('ib-lang-chinese',  'IBACC', 'HL Chinese',  'Language', one('5+', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('ib-lang-spanish',  'IBACC', 'HL Spanish',  'Language', one('5+', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
];

// ── Other exam types ────────────────────────────────────────────────────────

const OTHER_GROUPS: TestCreditGroup[] = [
  // GCEUK
  g('gceuk-chem',         'GCEUK', 'Chemistry',        'Chemistry',        one('A or B', 10, 'CHEM 31A/31B or 31E')),
  g('gceuk-cs',           'GCEUK', 'Computer Science',  'Computer Science', one('A–D',    5,  'CS 105, 106A')),
  g('gceuk-math',         'GCEUK', 'Mathematics',       'Mathematics',      one('A–B',    6,  'MATH 19/20'),
    { note: 'Credit for only one GCEUK math test; higher-satisfying exam awarded' }),
  g('gceuk-further-math', 'GCEUK', 'Further Math',      'Mathematics',      one('A',      6,  'MATH 19/20'),
    { note: 'Credit for only one GCEUK math test; higher-satisfying exam awarded' }),
  g('gceuk-phys',         'GCEUK', 'Physics',           'Physics',          one('A–B',    8,  'PHYSICS 21/23')),
  g('gceuk-lang-arabic',    'GCEUK', 'Arabic',     'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-chinese',   'GCEUK', 'Chinese',    'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-french',    'GCEUK', 'French',     'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-german',    'GCEUK', 'German',     'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-hindi',     'GCEUK', 'Hindi',      'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-italian',   'GCEUK', 'Italian',    'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-japanese',  'GCEUK', 'Japanese',   'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-portuguese','GCEUK', 'Portuguese', 'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-spanish',   'GCEUK', 'Spanish',    'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-tamil',     'GCEUK', 'Tamil',      'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-urdu',      'GCEUK', 'Urdu',       'Language', one('A–B', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('gceuk-lang-latin',     'GCEUK', 'Latin',      'Language', one('A–B', 10, 'CLASSICS 1L/2L/3L'),      { fulfillsLang: true }),

  // GCEEU
  g('gceeu-chem', 'GCEEU', 'Chemistry',        'Chemistry',        one('A or B', 10, 'CHEM 31A/31B or 31E')),
  g('gceeu-cs',   'GCEEU', 'Computer Science', 'Computer Science', one('A',      5,  'CS 105, 106A')),
  g('gceeu-math', 'GCEEU', 'Mathematics',      'Mathematics',      one('A–B',    6,  'MATH 19/20')),
  g('gceeu-phys', 'GCEEU', 'Physics H2',       'Physics',          one('A–B',    8,  'PHYSICS 21/23')),

  // GMABT: merged score variants
  g('gmabt-math', 'GMABT', 'Mathematics', 'Mathematics', [
    so('1–1.3',   10, 'MATH 19/20/21'),
    so('1.7–2.3', 6,  'MATH 19/20'),
  ]),

  // CAPE
  g('cape-chem', 'CAPE', 'Chem 1 & 2 (both required)', 'Chemistry',   one('1–2', 10, 'CHEM 31A/31B or 31E'),
    { note: 'Both Chem 1 and Chem 2 required' }),
  g('cape-math', 'CAPE', 'Mathematics',                 'Mathematics', one('1',   10, 'MATH 19/20/21')),

  // IRELC
  g('irelc-cs',   'IRELC', 'Computing',   'Computer Science', one('H1', 5, 'CS 101, 105, 106A')),
  g('irelc-math', 'IRELC', 'Mathematics', 'Mathematics',      one('H1', 3, 'MATH 19')),
  g('irelc-lang-chinese',    'IRELC', 'Chinese',    'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-french',     'IRELC', 'French',     'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-german',     'IRELC', 'German',     'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-irish',      'IRELC', 'Irish',      'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-italian',    'IRELC', 'Italian',    'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-lithuanian', 'IRELC', 'Lithuanian', 'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-polish',     'IRELC', 'Polish',     'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-portuguese', 'IRELC', 'Portuguese', 'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),
  g('irelc-lang-spanish',    'IRELC', 'Spanish',    'Language', one('H1', 10, '(LANG) 1A/2A or 1/2/3'), { fulfillsLang: true }),

  // NEWL: same score-variant behavior as AP (score 4 = lang req only, score 5 = 10 units)
  g('newl-lang-arabic',     'NEWL', 'Arabic',     'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('newl-lang-korean',     'NEWL', 'Korean',     'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('newl-lang-portuguese', 'NEWL', 'Portuguese', 'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),
  g('newl-lang-russian',    'NEWL', 'Russian',    'Language', [so('4', 0, 'lang req only'), so('5', 10, '(LANG) 1A/2A or 1/2/3')], { fulfillsLang: true, apNEWLLang: true }),

  // AUSHC
  g('aushc-math-ext1',  'AUSHC', 'Math Ext 1',                     'Mathematics', one('E4', 3, 'MATH 19')),
  g('aushc-math-ext12', 'AUSHC', 'Math Ext 1 & 2 (both required)', 'Mathematics', one('E4', 6, 'MATH 19/20'),
    { note: 'Qualifying scores on both Ext 1 and Ext 2 required' }),
];

export const ALL_TEST_GROUPS: TestCreditGroup[] = [...AP_GROUPS, ...IB_GROUPS, ...OTHER_GROUPS];

export const EXAM_TYPE_LABELS: Record<ExamType, string> = {
  AP:     'Advanced Placement (AP)',
  IBACC:  'International Baccalaureate (IB)',
  GCEUK:  'GCE/A-Levels: British (GCEUK)',
  GCEEU:  'A-Levels: European/International (GCEEU)',
  GMABT:  'German Abitur (GMABT)',
  CAPE:   'Caribbean Advanced Placement (CAPE)',
  IRELC:  'Irish Leaving Certificate (IRELC)',
  NEWL:   'National Exam in World Languages (NEWL)',
  AUSHC:  'Australian Higher Certificate (AUSHC)',
};

export const SUBJECT_AREA_ORDER: SubjectArea[] = [
  'Chemistry', 'Computer Science', 'Economics', 'Mathematics', 'Physics', 'Language',
];

export const OTHER_EXAM_TYPES: ExamType[] = ['GCEUK', 'GCEEU', 'GMABT', 'CAPE', 'IRELC', 'NEWL', 'AUSHC'];
