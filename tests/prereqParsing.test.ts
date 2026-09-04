/**
 * Characterization tests for the prerequisite text parser.
 *
 * Like tests/characterization.test.ts, these pin down current behaviour rather
 * than assert correctness. The parser is heuristic and some snapshots below are
 * known imperfect: the point is that a refactor must not move them.
 */
import { describe, expect, it } from 'vitest';
import {
  extractCourseCodes,
  extractPrereqGroups,
  getQuarterIndex,
  getQuarterSeason,
} from '../src/utils/courseWarnings';
import { ALL_QUARTERS } from '../src/types';

// Representative prerequisite prose drawn from the shapes the parser is
// documented to handle, including the ones known to trip it up.
const SAMPLES: Record<string, string> = {
  simple: 'Prerequisite: CS 106B.',
  orList: 'Prerequisites: MATH 51, 52, or 53.',
  andList: 'Prerequisites: CS 103 and CS 109.',
  continuation: 'Prerequisites: MATH 19, 20, 21.',
  slashAlternates: 'Prerequisite: CME 102/ME 300A.',
  crossListed: 'Prerequisite: EE 101A or EE 101B.',
  compactCode: 'Prerequisite: AA100 and E15.',
  oneOf: 'Prerequisite: one of CS 106A, CS 106B, CS 106X.',
  recommended: 'Recommended: CS 107.',
  none: 'None',
  empty: '',
  coreq: 'CS 103, which may be taken concurrently.',
  stopWords: 'Consent of instructor and completion of the core.',
  withUnits: 'Prerequisite: CHEM 31A (3 units) or CHEM 31B.',
};

describe('extractCourseCodes', () => {
  it('extracts the same codes from representative prerequisite prose', () => {
    const out: Record<string, string[]> = {};
    for (const [name, text] of Object.entries(SAMPLES)) {
      out[name] = extractCourseCodes(text).sort();
    }
    expect(out).toMatchSnapshot();
  });

  it('never treats a bare stop word as a department', () => {
    // "AND", "OR", "THE" etc. followed by a number must not become courses.
    const codes = extractCourseCodes('AND 1 OR 2 THE 3 WITH 4 NOT 5 FOR 6');
    expect(codes).toEqual([]);
  });
});

describe('extractPrereqGroups', () => {
  it('produces the same AND-of-ORs grouping for representative prose', () => {
    const out: Record<string, string[][]> = {};
    for (const [name, text] of Object.entries(SAMPLES)) {
      out[name] = extractPrereqGroups(text, new Set());
    }
    expect(out).toMatchSnapshot();
  });

  it('excludes the course itself via selfCodes', () => {
    expect(extractPrereqGroups('Prerequisite: CS 106B.', new Set(['CS 106B']))).toEqual([]);
  });

  it('resolves bare numbers against defaultDept', () => {
    expect(extractPrereqGroups('Prerequisite: 106B.', new Set(), 'CS')).toMatchSnapshot();
  });
});

describe('quarter helpers', () => {
  it('maps every quarter id to a stable index and season', () => {
    const out: Record<string, string> = {};
    for (const q of ALL_QUARTERS) {
      out[q.id] = `${getQuarterIndex(q.id)}:${getQuarterSeason(q.id)}`;
    }
    expect(out).toMatchSnapshot();
  });

  it('returns -1 and null for an unknown quarter id', () => {
    expect(getQuarterIndex('nope')).toBe(-1);
    expect(getQuarterSeason('nope')).toBeNull();
  });
});
