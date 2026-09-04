import type { WayTag, WritingTag } from '../types';

// ─── Ways of Thinking / Ways of Doing ─────────────────────────────────────────
// Edit here to change slots, labels, colors, or grid layout for any Way.
export interface WayConfig {
  id: WayTag;
  label: string;
  slots: number;          // courses required
  unitsRequired?: number; // if set, completion = total units >= this value (e.g. CE)
  accent: string;         // box background Tailwind class
  borderDone: string;     // border when fulfilled
  borderMissing: string;  // bold border when not fulfilled
  ring: string;           // drag-over ring
  gridPlacement: string;  // Tailwind grid col/row placement
}

export const WAYS_CONFIG: WayConfig[] = [
  // Colors are semantic classes defined centrally in theme.css.
  //  id     label                              slots  unitsRequired?  accent                   borderDone                      borderMissing                    ring                      gridPlacement
  { id: 'AII', label: 'Aesthetic & Interpretive Inquiry', slots: 2,             accent: 'way-aii-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-aii-ring', gridPlacement: 'sm:col-start-1 sm:row-start-1 sm:row-span-2' },
  { id: 'SMA', label: 'Scientific Method & Analysis',     slots: 2,             accent: 'way-sma-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-sma-ring', gridPlacement: 'sm:col-start-2 sm:row-start-1 sm:row-span-2' },
  { id: 'SI',  label: 'Social Inquiry',                   slots: 2,             accent: 'way-si-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-si-ring', gridPlacement: 'sm:col-start-3 sm:row-start-1 sm:row-span-2' },
  { id: 'CE',  label: 'Creative Expression',              slots: 1, unitsRequired: 2, accent: 'way-ce-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-ce-ring', gridPlacement: 'sm:col-start-4 sm:row-start-1 sm:row-span-2' },
  { id: 'AQR', label: 'Applied Quantitative Reasoning',   slots: 1,             accent: 'way-aqr-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-aqr-ring', gridPlacement: 'sm:col-start-1 sm:row-start-3' },
  { id: 'EDP', label: 'Exploring Difference & Power',     slots: 1,             accent: 'way-edp-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-edp-ring', gridPlacement: 'sm:col-start-2 sm:row-start-3' },
  { id: 'ER',  label: 'Ethical Reasoning',                slots: 1,             accent: 'way-er-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-er-ring', gridPlacement: 'sm:col-start-3 sm:row-start-3' },
  { id: 'FR',  label: 'Formal Reasoning',                 slots: 1,             accent: 'way-fr-panel', borderDone: 'border', borderMissing: 'border-2', ring: 'ring-2 way-fr-ring', gridPlacement: 'sm:col-start-4 sm:row-start-3' },
];

// ─── Other General Education (COLLEGE · Writing · Language) ──────────────────
// Edit here to change counts, descriptions, colors, links, or grid layout.
export interface GenEdConfig {
  tag: WritingTag | 'COLLEGE' | 'LANG';
  display: string;
  sublabel: string;
  needed: number;
  noCounter?: boolean;    // show ✓ instead of numeric counter
  link?: string;
  note?: string;
  noteLink?: string;
  noteLinkLabel?: string;
  accent: string;         // Tailwind border + background classes for the box
  gridPlacement: string;
  fulfillsLang?: boolean; // show language test-credit fulfillment badges
}

export const GEN_ED_CONFIG: GenEdConfig[] = [
  //  tag         display      sublabel                             needed  noCounter?  accent                            gridPlacement                       link / note
  // Keep COLLEGE and Language in their existing warm colors.
  // WR 1 / WR 2 / WIM form a progressively darker orange writing cluster.
  {
    tag: 'COLLEGE', display: 'COLLEGE', sublabel: '2 of 3 quarters, freshman year', needed: 2,
    accent: 'gened-college', gridPlacement: 'sm:col-start-1 sm:row-start-1 sm:row-span-2',
    link: 'https://college.stanford.edu/',
  },
  {
    tag: 'LANG', display: 'Language', sublabel: '3-quarter sequence (or AP/IB placement)', needed: 3, noCounter: true, fulfillsLang: true,
    accent: 'gened-lang', gridPlacement: 'sm:col-start-2 sm:row-start-1 sm:row-span-3',
    link: 'https://language.stanford.edu/academics/language-requirement',
    note: 'AP or IB score may fulfill part or all of this requirement.',
    noteLink: 'https://language.stanford.edu/academics/language-requirement',
    noteLinkLabel: 'Check placement →',
  },
  {
    tag: 'W1', display: 'WR 1', sublabel: 'Freshman year', needed: 1,
    accent: 'gened-w1', gridPlacement: 'sm:col-start-3 sm:row-start-1',
    link: 'https://pwr.stanford.edu/about-pwr/understanding-writing-and-rhetoric-requirements',
  },
  {
    tag: 'W2', display: 'WR 2', sublabel: 'Sophomore year', needed: 1,
    accent: 'gened-w2', gridPlacement: 'sm:col-start-3 sm:row-start-2',
    link: 'https://pwr.stanford.edu/about-pwr/understanding-writing-and-rhetoric-requirements',
  },
  {
    tag: 'WIM', display: 'WIM', sublabel: 'Writing in Major, upper level', needed: 1,
    accent: 'gened-wim', gridPlacement: 'sm:col-start-3 sm:row-start-3',
    link: 'https://pwr.stanford.edu/about-pwr/understanding-writing-and-rhetoric-requirements',
  },
];
