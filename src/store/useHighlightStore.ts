import { create } from 'zustand';
import type { CourseCard } from '../types';
import { lookupCourse } from '../data/catalog';
import { extractCourseCodes } from '../utils/courseWarnings';

function allCodesForCard(card: CourseCard): Set<string> {
  const catalog = lookupCourse(card.department, card.courseNumber);
  if (catalog) {
    return new Set(catalog.depts.map((d, i) => `${d} ${catalog.numbers[i]}`));
  }
  return new Set([`${card.department.toUpperCase()} ${card.courseNumber.toUpperCase()}`]);
}

interface HighlightState {
  centerId: string | null;
  prereqIds: Set<string>;
  dependentIds: Set<string>;
  _timerId: ReturnType<typeof setTimeout> | null;
  computeHighlight: (targetCard: CourseCard, allCards: CourseCard[]) => void;
  clearHighlight: () => void;
}

export const useHighlightStore = create<HighlightState>((set, get) => ({
  centerId: null,
  prereqIds: new Set(),
  dependentIds: new Set(),
  _timerId: null,

  computeHighlight: (targetCard, allCards) => {
    const existing = get()._timerId;
    if (existing !== null) clearTimeout(existing);
    const targetCatalog = lookupCourse(targetCard.department, targetCard.courseNumber);
    const targetCodes = allCodesForCard(targetCard);

    // Expand target's prereq text into a set of all equivalent course codes
    const targetPrereqCodes = new Set<string>();
    if (targetCatalog?.prerequisites) {
      for (const code of extractCourseCodes(targetCatalog.prerequisites)) {
        targetPrereqCodes.add(code);
        const [d, ...rest] = code.split(' ');
        const cat = lookupCourse(d, rest.join(' '));
        if (cat) cat.depts.forEach((dept, i) => targetPrereqCodes.add(`${dept} ${cat.numbers[i]}`));
      }
    }

    const prereqIds = new Set<string>();
    const dependentIds = new Set<string>();

    for (const card of allCards) {
      if (card.id === targetCard.id) continue;
      const cardCodes = allCodesForCard(card);

      // This card is a prereq of target
      if ([...cardCodes].some(c => targetPrereqCodes.has(c))) {
        prereqIds.add(card.id);
        continue;
      }

      // This card lists target as a prereq
      const cardCatalog = lookupCourse(card.department, card.courseNumber);
      if (cardCatalog?.prerequisites) {
        const cardPrereqCodes = extractCourseCodes(cardCatalog.prerequisites);
        if (cardPrereqCodes.some(c => targetCodes.has(c))) {
          dependentIds.add(card.id);
        }
      }
    }

    const timerId = setTimeout(() => get().clearHighlight(), 5000);
    set({ centerId: targetCard.id, prereqIds, dependentIds, _timerId: timerId });
  },

  clearHighlight: () => {
    const t = get()._timerId;
    if (t !== null) clearTimeout(t);
    set({ centerId: null, prereqIds: new Set(), dependentIds: new Set(), _timerId: null });
  },
}));
