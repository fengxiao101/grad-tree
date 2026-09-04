export type Priority = 'required' | 'want' | 'maybe' | 'done';
export type Affiliation = 'major' | 'co-term' | 'minor' | 'double-major' | 'secondary-major';
export type WayTag = 'AII' | 'SMA' | 'SI' | 'AQR' | 'CE' | 'EDP' | 'ER' | 'FR';
export type WritingTag = 'W1' | 'W2' | 'WIM';
export type SectionTag = WayTag | WritingTag | 'COLLEGE' | 'LANG';

export interface RequirementAssignment {
  programId: string;
  slotId: string;
}

export interface RequirementChoice extends RequirementAssignment {
  label: string;
  affiliation: Affiliation;
}

export interface CourseCard {
  id: string;
  department: string;
  courseNumber: string;
  courseName: string;
  units: number | null;
  priority: Priority;
  affiliation?: Affiliation;
  tags: SectionTag[];
  notes: string;
  quarterId: string; // 'unsorted' | quarter id
  committedWay?: WayTag; // set when user drags a multi-way card into a specific way box
  // Optional user override for which one of several matching program slots consumes this course.
  requirementAssignment?: RequirementAssignment;
}

export interface Quarter {
  id: string;
  label: string;
  season: 'AUT' | 'WIN' | 'SPR' | 'SUM';
  year: 1 | 2 | 3 | 4 | 5;
}

/** How the course catalog spells a term, as used in CatalogCourse.terms. */
export type CatalogTerm = 'Aut' | 'Win' | 'Spr' | 'Sum';

/** Planner season code to the catalog's spelling of the same term. */
export const SEASON_TO_TERM: Record<Quarter['season'], CatalogTerm> = {
  AUT: 'Aut', WIN: 'Win', SPR: 'Spr', SUM: 'Sum',
};

export const ALL_QUARTERS: Quarter[] = [
  { id: 'Y1-AUT', label: 'Autumn',  season: 'AUT', year: 1 },
  { id: 'Y1-WIN', label: 'Winter',  season: 'WIN', year: 1 },
  { id: 'Y1-SPR', label: 'Spring',  season: 'SPR', year: 1 },
  { id: 'Y1-SUM', label: 'Summer',  season: 'SUM', year: 1 },
  { id: 'Y2-AUT', label: 'Autumn',  season: 'AUT', year: 2 },
  { id: 'Y2-WIN', label: 'Winter',  season: 'WIN', year: 2 },
  { id: 'Y2-SPR', label: 'Spring',  season: 'SPR', year: 2 },
  { id: 'Y2-SUM', label: 'Summer',  season: 'SUM', year: 2 },
  { id: 'Y3-AUT', label: 'Autumn',  season: 'AUT', year: 3 },
  { id: 'Y3-WIN', label: 'Winter',  season: 'WIN', year: 3 },
  { id: 'Y3-SPR', label: 'Spring',  season: 'SPR', year: 3 },
  { id: 'Y3-SUM', label: 'Summer',  season: 'SUM', year: 3 },
  { id: 'Y4-AUT', label: 'Autumn',  season: 'AUT', year: 4 },
  { id: 'Y4-WIN', label: 'Winter',  season: 'WIN', year: 4 },
  { id: 'Y4-SPR', label: 'Spring',  season: 'SPR', year: 4 },
  { id: 'Y4-SUM', label: 'Summer',  season: 'SUM', year: 4 },
  // Year 5 - coterm quarters, always valid drop targets but hidden by default
  { id: 'Y5-AUT', label: 'Autumn',  season: 'AUT', year: 5 },
  { id: 'Y5-WIN', label: 'Winter',  season: 'WIN', year: 5 },
  { id: 'Y5-SPR', label: 'Spring',  season: 'SPR', year: 5 },
  { id: 'Y5-SUM', label: 'Summer',  season: 'SUM', year: 5 },
];


export const WAY_TAGS: WayTag[] = ['AII', 'SMA', 'SI', 'AQR', 'CE', 'EDP', 'ER', 'FR'];
export const WRITING_TAGS: WritingTag[] = ['W1', 'W2', 'WIM'];
export const ALL_TAGS: SectionTag[] = [...WAY_TAGS, 'COLLEGE', 'LANG', ...WRITING_TAGS];

export const TAG_DISPLAY: Record<SectionTag, string> = {
  AII: 'AII', SMA: 'SMA', SI: 'SI', AQR: 'AQR', CE: 'CE', EDP: 'EDP', ER: 'ER', FR: 'FR',
  W1: 'WR 1', W2: 'WR 2', WIM: 'WIM', COLLEGE: 'COLLEGE', LANG: 'Lang',
};

export const TAG_COLORS: Record<SectionTag, { bg: string; text: string; border: string }> = {
  AII: { bg: 'tag-aii-bg', text: 'tag-aii-text', border: 'tag-aii-border' },
  SMA: { bg: 'tag-sma-bg', text: 'tag-sma-text', border: 'tag-sma-border' },
  SI:  { bg: 'tag-si-bg', text: 'tag-si-text', border: 'tag-si-border' },
  CE:  { bg: 'tag-ce-bg', text: 'tag-ce-text', border: 'tag-ce-border' },
  AQR: { bg: 'tag-aqr-bg', text: 'tag-aqr-text', border: 'tag-aqr-border' },
  EDP: { bg: 'tag-edp-bg', text: 'tag-edp-text', border: 'tag-edp-border' },
  ER:  { bg: 'tag-er-bg', text: 'tag-er-text', border: 'tag-er-border' },
  FR:  { bg: 'tag-fr-bg', text: 'tag-fr-text', border: 'tag-fr-border' },
  W1:  { bg: 'tag-w1-bg', text: 'tag-w1-text', border: 'tag-w1-border' },
  W2:  { bg: 'tag-w2-bg', text: 'tag-w2-text', border: 'tag-w2-border' },
  WIM: { bg: 'tag-wim-bg', text: 'tag-wim-text', border: 'tag-wim-border' },
  COLLEGE: { bg: 'tag-college-bg', text: 'tag-college-text', border: 'tag-college-border' },
  LANG:    { bg: 'tag-lang-bg', text: 'tag-lang-text', border: 'tag-lang-border' },
};

export const PRIORITY_META: Record<Priority, {
  label: string; cardBorder: string; cardBg: string; iconColor: string;
  badgeBg: string; badgeText: string; accentBorder: string; dot: string;
}> = {
  // dot: small circle indicator used in compact card row (no text badge needed)
  required: {
    label: 'Required',
    cardBorder: 'border border-red-200',
    cardBg: 'bg-white',
    iconColor: 'text-red-600',
    badgeBg: 'bg-red-50',
    badgeText: 'text-red-800',
    accentBorder: 'border-red-200',
    dot: 'bg-red-400',
  },
  want: {
    label: 'Want',
    cardBorder: 'border border-gray-200',
    cardBg: 'bg-white',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    accentBorder: 'border-blue-200',
    dot: 'bg-blue-400',
  },
  maybe: {
    label: 'Maybe',
    cardBorder: 'border border-gray-200',
    cardBg: 'bg-white',
    iconColor: 'text-yellow-600',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-800',
    accentBorder: 'border-yellow-200',
    dot: 'bg-yellow-400',
  },
  done: {
    label: 'Done',
    cardBorder: 'border border-gray-100',
    cardBg: 'bg-gray-50',
    iconColor: 'text-gray-300',
    badgeBg: 'bg-gray-100',
    badgeText: 'text-gray-400',
    accentBorder: 'border-gray-200',
    dot: 'bg-gray-300',
  },
};

export const AFFILIATION_META: Record<Affiliation, {
  label: string; badgeBg: string; badgeText: string; badgeBorder: string;
  cardBg: string;
}> = {
  major:             { label: 'Major',          badgeBg: 'affiliation-major-badge',          badgeText: '', badgeBorder: '', cardBg: 'affiliation-major-card' },
  'co-term':         { label: 'Coterm',         badgeBg: 'affiliation-coterm-badge',         badgeText: '', badgeBorder: '', cardBg: 'affiliation-coterm-card' },
  minor:             { label: 'Minor',           badgeBg: 'affiliation-minor-badge',          badgeText: '', badgeBorder: '', cardBg: 'affiliation-minor-card' },
  'double-major':    { label: 'Double Major',    badgeBg: 'affiliation-double-major-badge',   badgeText: '', badgeBorder: '', cardBg: 'affiliation-double-major-card' },
  'secondary-major': { label: 'Secondary Major', badgeBg: 'affiliation-secondary-major-badge', badgeText: '', badgeBorder: '', cardBg: 'affiliation-secondary-major-card' },
};
