import { lookupCourse } from '../data/catalog';
import { extractPrereqGroups } from './courseWarnings';
import { testCreditCoversCode } from '../data/testCreditUtils';
import type { MajorConfig, CourseOption } from '../data/majorSchema';
import type { CourseCard } from '../types';

export interface ReadySuggestion {
  dept: string;
  number: string;
  name?: string;
  sectionName: string;
}

function buildEnrolledCodes(cards: CourseCard[]): Set<string> {
  const codes = new Set<string>();
  for (const card of cards) {
    const cat = lookupCourse(card.department, card.courseNumber);
    if (cat) {
      cat.depts.forEach((d, i) => codes.add(`${d} ${cat.numbers[i]}`));
    } else {
      codes.add(`${card.department.toUpperCase()} ${card.courseNumber.toUpperCase()}`);
    }
  }
  return codes;
}

function isReady(
  opt: CourseOption,
  enrolledCodes: Set<string>,
  testCoveredCourses: ReadonlySet<string>,
): boolean {
  const code = `${opt.dept} ${opt.number}`;
  if (enrolledCodes.has(code) || testCreditCoversCode(testCoveredCourses, code)) return false;

  const cat = lookupCourse(opt.dept, opt.number);
  const prereqText = cat?.prerequisites;
  if (!prereqText) return true; // no prereqs = always ready

  const selfCodes = new Set(
    cat!.depts.map((d, i) => `${d} ${cat!.numbers[i]}`)
  );
  const groups = extractPrereqGroups(
    prereqText,
    selfCodes,
    cat!.depts.length === 1 ? cat!.depts[0] : undefined,
  );
  if (groups.length === 0) return true;
  return groups.every(group => group.some(c =>
    enrolledCodes.has(c) || testCreditCoversCode(testCoveredCourses, c)
  ));
}

export function getReadyToTake(
  major: MajorConfig,
  enrolledCards: CourseCard[],
  manualSlotFills: Record<string, { checked: boolean; note: string }>,
  selectedTrackId: string | null,
  testCoveredCourses: ReadonlySet<string> = new Set(),
  limit = 8,
): ReadySuggestion[] {
  const enrolledCodes = buildEnrolledCodes(enrolledCards);
  const results: ReadySuggestion[] = [];
  const seen = new Set<string>();

  // Determine which sections to check (base + track)
  const allSections = [...major.sections];
  if (selectedTrackId && major.tracks) {
    const track = major.tracks.find(t => t.id === selectedTrackId);
    if (track) allSections.push(...track.sections);
  }

  for (const section of allSections) {
    if (results.length >= limit) break;
    for (const slot of section.slots) {
      if (results.length >= limit) break;
      if (slot.optional) continue;
      if (slot.type === 'any-approved' || slot.options.length === 0) continue;

      if (manualSlotFills[slot.id]?.checked) continue;

      for (const opt of slot.options) {
        if (results.length >= limit) break;
        const code = `${opt.dept} ${opt.number}`;
        if (seen.has(code)) continue;
        seen.add(code);

        if (isReady(opt, enrolledCodes, testCoveredCourses)) {
          results.push({ dept: opt.dept, number: opt.number, name: opt.name, sectionName: section.name });
        }
      }
    }
  }

  return results;
}
