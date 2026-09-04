import type { WayTag } from '../../types';

export interface CatalogCourse {
  /** All dept codes for this cross-listed course, primary first. */
  depts: string[];
  /** Course numbers corresponding to each dept (same order as depts). */
  numbers: string[];
  title: string;
  /** "3" | "1-3" | "3-4" etc. */
  units: string;
  terms: ('Aut' | 'Win' | 'Spr' | 'Sum')[];
  ways: WayTag[];
  /** "1" = PWR 1, "2" = PWR 2, "WIM" = Writing in the Major, "SLE" = SLE writing, null = none */
  writing: '1' | '2' | 'WIM' | 'SLE' | null;
  college: boolean;
  language: boolean;
  /** true for N-suffix introductory seminars that require an application */
  needsApplication: boolean;
  /** Course description from catalog (capped at 600 chars) */
  description?: string;
  /** Extracted prerequisites text */
  prerequisites?: string;
  /** Parsed prereqs: AND-of-ORs. Each inner array is an OR group (any one satisfies it). */
  prereqGroups?: string[][];
}

/** Canonical lookup key for a course: "DEPT NUMBER" */
export type CourseCode = string;
