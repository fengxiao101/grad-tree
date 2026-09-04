import { lookupCourse } from '../data/catalog';
import { normalizeDept } from '../data/testCreditUtils';
import { parseHighUnit } from './catalogUtils';
import type { MajorConfig, MajorSection, MetaRequirement, Slot, CourseOption } from '../data/majorSchema';
import type { Satisfier } from '../data/testCreditUtils';
import type { Affiliation, CourseCard } from '../types';

export function matchesOption(dept: string, number: string, opt: CourseOption): boolean {
  if (normalizeDept(dept) === normalizeDept(opt.dept) &&
      number.trim().toUpperCase() === opt.number.toUpperCase()) {
    return true;
  }
  const catalog = lookupCourse(dept, number);
  if (catalog) {
    for (let i = 0; i < catalog.depts.length; i++) {
      if (normalizeDept(catalog.depts[i]) === normalizeDept(opt.dept) &&
          catalog.numbers[i].toUpperCase() === opt.number.toUpperCase()) {
        return true;
      }
    }
  }
  return false;
}

/** WIM is major-specific, so only the selected major's approved list qualifies. */
export function cardSatisfiesWim(card: CourseCard, wimCourses?: CourseOption[]): boolean {
  return Boolean(wimCourses?.some(option =>
    matchesOption(card.department, card.courseNumber, option),
  ));
}

const isMajor = (config: MajorConfig) => config.category == null || config.category === 'major';
const isStandaloneWimSection = (section: MajorSection) => {
  const normalizedId = section.id.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const normalizedName = section.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  return normalizedId === 'wim'
    || normalizedId === 'writinginmajor'
    || normalizedId === 'writinginthemajor'
    || normalizedId === 'majorwriting'
    || /\bwriting in the major\b/.test(normalizedName);
};

/**
 * WIM is a program-wide requirement: its course must count somewhere in the
 * major, but checking WIM must not reserve that course from the section it fills.
 * Older program data encoded WIM as a standalone section, so omit that section
 * whenever the canonical `wimCourses` list is present.
 */
export function getProgramSections(config: MajorConfig): MajorSection[] {
  if (!isMajor(config) || !config.wimCourses?.length) return config.sections;
  return config.sections.filter(section => !isStandaloneWimSection(section));
}

/** Expands the selected program track and any nested section selectors into assignable sections. */
export function getEffectiveProgramSections(
  config: MajorConfig,
  selectedTracks: Record<string, string>,
): MajorSection[] {
  const activeTrack = config.tracks?.find(track => track.id === selectedTracks[config.id]);
  const visibleSections = [...getProgramSections(config), ...(activeTrack?.sections ?? [])];
  const expanded: MajorSection[] = [];

  const addSections = (sections: MajorSection[]) => {
    for (const section of sections) {
      expanded.push(section);
      const selectedOption = section.selectorOptions?.find(
        option => option.id === selectedTracks[`${config.id}:${section.id}`],
      );
      if (selectedOption?.sections) addSections(selectedOption.sections);
    }
  };

  addSections(visibleSections);
  return expanded;
}

/** Returns configured meta requirements plus the major-wide overlapping WIM requirement. */
export function getProgramMetaRequirements(config: MajorConfig): MetaRequirement[] {
  const configured = config.metaRequirements ?? [];
  if (!isMajor(config) || !config.wimCourses?.length || config.showWimInProgram === false || configured.some(meta => meta.id === 'wim')) {
    return configured;
  }

  const legacyWimSection = config.sections.find(isStandaloneWimSection);
  const legacyRequiredCount = legacyWimSection?.slots.reduce(
    (sum, slot) => sum + (slot.optional ? 0 : (slot.times ?? slot.count ?? 1)),
    0,
  ) ?? 0;
  const minCount = config.wimMinCount ?? Math.max(1, legacyRequiredCount);
  const overlapNote = 'WIM can count toward any other major requirement.';

  return [
    ...configured,
    {
      id: 'wim',
      label: 'Writing in the Major (WIM)',
      note: legacyWimSection?.note
        ? `${legacyWimSection.note} ${overlapNote}`
        : overlapNote,
      options: config.wimCourses,
      minCount,
    },
  ];
}

export const metaAssignmentKey = (metaId: string) => `meta:${metaId}`;

/** Counts progress for program-wide requirements without consuming another slot. */
export function getMetaRequirementCounts(
  requirements: MetaRequirement[],
  assignments: Map<string, Satisfier[]>,
): Record<string, number> {
  return Object.fromEntries(requirements.map(meta => [
    meta.id,
    assignments.get(metaAssignmentKey(meta.id))?.length ?? 0,
  ]));
}

/** Shared labels for overlapping requirements in both the interactive and print views. */
export function getMetaRequirementPresentation(meta: MetaRequirement): {
  title: string;
  subtitle: string;
  courseLabel: string;
} {
  if (meta.id === 'wim') {
    return {
      title: 'Writing in the Major (WIM)',
      subtitle: '(can count toward any other major requirement)',
      courseLabel: 'Approved WIM courses',
    };
  }

  return {
    title: meta.label,
    subtitle: '(may overlap where noted)',
    courseLabel: `Approved ${meta.label} courses`,
  };
}

/** Adapts an overlapping meta requirement to the shared section/slot renderer. */
export function metaRequirementToSection(meta: MetaRequirement): MajorSection {
  const presentation = getMetaRequirementPresentation(meta);
  return {
    id: `meta-section:${meta.id}`,
    name: presentation.title,
    minCourses: meta.minCount,
    slots: [
      {
        id: metaAssignmentKey(meta.id),
        label: presentation.courseLabel,
        type: 'pick-from-list',
        count: meta.minCount,
        options: meta.options,
        note: meta.note,
        listUrl: meta.listUrl,
      },
    ],
  };
}

export function computeAssignments(
  config: MajorConfig,
  cards: CourseCard[],
  testSatisfiers: Satisfier[],
  excludeCardIds?: Set<string>, // cards already consumed by a higher-priority program (e.g. major)
  allowedAffiliations?: Set<Affiliation>, // when set, only cards with matching or undefined affiliation enter the pool
  shareableCardIds?: Set<string>, // cards assigned to pre-major/allowDoubleCount sections in another program
  slotOverlapExceptions?: Set<string>, // slot IDs where excludeCardIds/affiliation restrictions are lifted (double-major per-slot exceptions)
): Map<string, Satisfier[]> {
  const pool: Satisfier[] = [
    ...cards
      .map(c => ({ kind: 'card' as const, card: c })),
    ...testSatisfiers,
  ];

  const sections = getProgramSections(config);
  const configuredSlots = sections.flatMap(section => [
    ...section.slots,
    ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
  ]);
  const configuredSlotById = new Map(configuredSlots.map(slot => [slot.id, slot]));
  const configuredSectionBySlotId = new Map<string, MajorSection>();
  for (const section of sections) {
    for (const slot of [
      ...section.slots,
      ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
    ]) configuredSectionBySlotId.set(slot.id, section);
  }
  const sectionAllowsOverlap = (section: MajorSection | undefined) =>
    section?.phase === 'pre-major' || section?.allowDoubleCount === true || section?.doubleCountGroup != null;
  const sameDoubleCountGroup = (s1: MajorSection | undefined, s2: MajorSection | undefined): boolean =>
    s1?.doubleCountGroup != null && s1.doubleCountGroup === s2?.doubleCountGroup;
  const explicitlyDoubleCountable = (card: CourseCard) => Boolean(config.doubleCountCourses?.some(option =>
    matchesOption(card.department, card.courseNumber, option),
  ));

  /**
   * A section such as "pick 2 of these 4 areas" displays four optional slots,
   * but only two of them may reserve courses. Previously all four slots claimed
   * a match, so surplus courses could not flow into later requirements.
   */
  const optionalRemaining = new Map<MajorSection, number>();
  for (const section of sections) {
    if (section.minCourses == null) continue;
    const requiredCount = section.slots
      .filter(slot => !slot.optional)
      .reduce((sum, slot) => sum + (slot.times ?? slot.count ?? 1), 0);
    optionalRemaining.set(section, Math.max(0, section.minCourses - requiredCount));
  }

  const satisfierMatchesSlot = (satisfier: Satisfier, slot: Slot): boolean => {
    if (satisfier.kind === 'card') {
      const section = configuredSectionBySlotId.get(slot.id);
      const slotHasOverlapException = slotOverlapExceptions?.has(slot.id) ?? false;
      if (excludeCardIds?.has(satisfier.card.id)
          && !slotHasOverlapException
          && !sectionAllowsOverlap(section)
          && !shareableCardIds?.has(satisfier.card.id)) return false;
      const mayCrossAffiliations = slotHasOverlapException || sectionAllowsOverlap(section) || shareableCardIds?.has(satisfier.card.id);
      if (!mayCrossAffiliations
          && allowedAffiliations
          && satisfier.card.affiliation
          && !allowedAffiliations.has(satisfier.card.affiliation)) return false;
      const forced = satisfier.card.requirementAssignment;
      if (forced?.programId === config.id) {
        const forcedSlot = configuredSlotById.get(forced.slotId);
        if (forcedSlot) {
          const forcedSection = configuredSectionBySlotId.get(forced.slotId);
          const overlapPermitted = (
            (sectionAllowsOverlap(section) || sectionAllowsOverlap(forcedSection))
            && !sameDoubleCountGroup(section, forcedSection)
          ) || explicitlyDoubleCountable(satisfier.card);
          // A card pinned to ANY any-approved slot is locked there (empty OR non-empty options).
          // This covers Search & add of courses not in the slot's options list.
          if (forcedSlot.type === 'any-approved' && forced.slotId !== slot.id && !overlapPermitted) return false;
          // A card pinned to a non-any-approved slot with matching options is also locked there.
          const forcedIsValid = Boolean(forcedSlot.options.some(option =>
            matchesOption(satisfier.card.department, satisfier.card.courseNumber, option),
          ));
          if (forcedIsValid && forced.slotId !== slot.id && !overlapPermitted) return false;
        }
        // A card explicitly pinned to this any-approved slot always matches,
        // even when its course is not in the slot's options list (Search & add path).
        if (forced.slotId === slot.id && slot.type === 'any-approved') return true;
      }
    }
    const [dept, number] = satisfier.kind === 'card'
      ? [satisfier.card.department, satisfier.card.courseNumber]
      : [satisfier.dept, satisfier.number];
    return slot.options.some(option => matchesOption(dept, number, option));
  };

  const satisfierUnits = (satisfier: Satisfier): number => {
    if (satisfier.kind === 'test' || satisfier.kind === 'transfer') return satisfier.units;
    return satisfier.card.units
      ?? parseHighUnit(lookupCourse(satisfier.card.department, satisfier.card.courseNumber)?.units ?? '')
      ?? 0;
  };

  /**
   * Unit-pool slots without an explicit course count stay open until their
   * minimum is reached. Explicit `count`/`times` slots still take exactly the
   * configured number of enrollments and validate the units on those courses.
   */
  const takeSlotMatches = (
    eligible: Satisfier[],
    slot: Slot,
    needed: number,
    pinnedCount = 0,
  ): Satisfier[] => {
    const minimumCount = Math.max(needed, pinnedCount);
    const selected = eligible.slice(0, minimumCount);
    if (needed === 0 || slot.minUnits == null || slot.count != null || slot.times != null) {
      return selected;
    }
    const seenGroups = new Set<string>();
    const effectiveUnits = (s: Satisfier): number => {
      if (s.kind === 'test' || s.kind === 'transfer') {
        if (seenGroups.has(s.groupId)) return 0;
        seenGroups.add(s.groupId);
      }
      return satisfierUnits(s);
    };
    let units = selected.reduce((sum, s) => sum + effectiveUnits(s), 0);
    while (selected.length < eligible.length && units < slot.minUnits) {
      const next = eligible[selected.length];
      selected.push(next);
      units += effectiveUnits(next);
    }
    // After hitting the unit threshold, also include any remaining siblings from
    // the same test/transfer group (e.g. all of MATH 19/20/21 from one credit).
    const selectedIds = new Set(selected.map(s => s.kind === 'card' ? s.card.id : s.id));
    for (const rem of eligible) {
      const remId = rem.kind === 'card' ? rem.card.id : rem.id;
      if (!selectedIds.has(remId) && (rem.kind === 'test' || rem.kind === 'transfer') && seenGroups.has(rem.groupId)) {
        selected.push(rem);
      }
    }
    return selected;
  };

  /**
   * Pick-group sections are alternatives (for example, choose one capstone
   * sequence). Select only the required number of best-matching groups for
   * automatic assignment, leaving courses from unselected alternatives free.
   * Manual fills remain available for every group in countSectionSlots().
   */
  const selectedPickGroups = new Map<
    MajorSection,
    Set<NonNullable<MajorSection['pickOneGroup']>[number]>
  >();
  for (const section of sections) {
    if (!section.pickOneGroup?.length) continue;
    const requiredGroups = Math.min(section.pickGroupCount ?? 1, section.pickOneGroup.length);
    const ranked = section.pickOneGroup.map((group, index) => {
      const locallyUsed = new Set<string>();
      let matchedSlots = 0;
      const slots = [...group.slots].sort((a, b) => a.options.length - b.options.length);
      for (const slot of slots) {
        const needed = slot.times ?? slot.count ?? 1;
        const eligible = pool.filter(satisfier => {
          const id = satisfier.kind === 'card' ? satisfier.card.id : satisfier.id;
          return !locallyUsed.has(id) && satisfierMatchesSlot(satisfier, slot);
        });
        const matches = takeSlotMatches(eligible, slot, needed);
        const matchedUnits = matches.reduce((sum, satisfier) => sum + satisfierUnits(satisfier), 0);
        if (matches.length >= needed && (slot.minUnits == null || matchedUnits >= slot.minUnits)) matchedSlots++;
        matches.forEach(satisfier => {
          locallyUsed.add(satisfier.kind === 'card' ? satisfier.card.id : satisfier.id);
        });
      }
      return {
        group,
        index,
        complete: matchedSlots === slots.length,
        matchedSlots,
        specificity: slots.reduce((sum, slot) => sum + slot.options.length, 0),
      };
    }).sort((a, b) =>
      Number(b.complete) - Number(a.complete) ||
      b.matchedSlots - a.matchedSlots ||
      a.specificity - b.specificity ||
      a.index - b.index
    );
    selectedPickGroups.set(section, new Set(ranked.slice(0, requiredGroups).map(item => item.group)));
  }

  // Collect empty-options any-approved slot IDs that have cards explicitly pinned to them.
  const pinnedEmptyAnyApprovedSlotIds = new Set(cards.flatMap(card => {
    const forced = card.requirementAssignment;
    if (forced?.programId !== config.id) return [];
    const target = configuredSlotById.get(forced.slotId);
    return (target?.type === 'any-approved' && target.options.length === 0) ? [forced.slotId] : [];
  }));

  const allSlots = sections
    .flatMap(section => [
      ...section.slots.map(slot => ({ slot, section })),
      ...(section.pickOneGroup?.flatMap(group =>
        selectedPickGroups.get(section)?.has(group)
          ? group.slots.map(slot => ({ slot, section }))
          : []
      ) ?? []),
    ])
    // An any-approved slot with explicit options is a hybrid: listed courses
    // match automatically, while unlisted approved substitutions remain manual.
    // Empty-options any-approved slots only participate if a card is pinned to them.
    .filter(({ slot }) => slot.type !== 'any-approved' || slot.options.length > 0 || pinnedEmptyAnyApprovedSlotIds.has(slot.id));
  const activeSlotIds = new Set(allSlots.map(({ slot }) => slot.id));
  const validForcedSlotByCard = new Map<string, string>();
  for (const card of cards) {
    const forced = card.requirementAssignment;
    if (forced?.programId !== config.id || !activeSlotIds.has(forced.slotId)) continue;
    const target = allSlots.find(({ slot }) => slot.id === forced.slotId)?.slot;
    if (target && satisfierMatchesSlot({ kind: 'card', card }, target)) {
      validForcedSlotByCard.set(card.id, forced.slotId);
    }
  }

  const forcedTargetSlotIds = new Set(cards.flatMap(card => {
    const forced = card.requirementAssignment;
    if (forced?.programId !== config.id) return [];
    const target = configuredSlotById.get(forced.slotId);
    if (!target) return [];
    // Any card pinned to an any-approved slot is treated as a forced target
    // (covers both empty-options slots and Search & add on non-empty-options slots).
    if (target.type === 'any-approved') return [forced.slotId];
    return target.options.some(option => matchesOption(card.department, card.courseNumber, option))
      ? [forced.slotId]
      : [];
  }));

  // Manual destinations go first so optional or mutually-exclusive slots cannot
  // be claimed by another automatic match before the user's chosen slot runs.
  // Otherwise retain the narrowest-first automatic assignment behavior.
  const sorted = [...allSlots].sort((a, b) =>
    Number(forcedTargetSlotIds.has(b.slot.id)) - Number(forcedTargetSlotIds.has(a.slot.id))
    || a.slot.options.length - b.slot.options.length
  );

  const assignments = new Map<string, Satisfier[]>();
  const usedIds = new Set<string>();
  const overlapSectionsByCard = new Map<string, Set<string>>();
  const overlapGroupsByCard = new Map<string, Set<string>>();

  // Build section-scoped connected components for mutually-exclusive slots.
  // A one-sided declaration (A excludes B, but B omits A) must still behave as
  // one group, and transitive declarations (A-B, B-C) must exclude all three.
  const mutexGroupBySlot = new Map<Slot, string>();
  for (const section of sections) {
    const sectionSlots = [
      ...section.slots,
      ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
    ];
    const byId = new Map(sectionSlots.map(slot => [slot.id, slot]));
    const parent = new Map(sectionSlots.map(slot => [slot.id, slot.id]));
    const find = (id: string): string => {
      const current = parent.get(id) ?? id;
      if (current === id) return id;
      const root = find(current);
      parent.set(id, root);
      return root;
    };
    const union = (left: string, right: string) => {
      const leftRoot = find(left);
      const rightRoot = find(right);
      if (leftRoot !== rightRoot) parent.set(rightRoot, leftRoot);
    };
    for (const slot of sectionSlots) {
      for (const otherId of slot.mutuallyExclusive ?? []) {
        if (byId.has(otherId)) union(slot.id, otherId);
      }
    }
    const components = new Map<string, string[]>();
    for (const slot of sectionSlots) {
      if (!slot.mutuallyExclusive?.length
          && !sectionSlots.some(other => other.mutuallyExclusive?.includes(slot.id))) continue;
      const root = find(slot.id);
      const ids = components.get(root) ?? [];
      ids.push(slot.id);
      components.set(root, ids);
    }
    for (const ids of components.values()) {
      const key = `${section.id}:${[...new Set(ids)].sort().join('|')}`;
      for (const id of ids) {
        const slot = byId.get(id);
        if (slot) mutexGroupBySlot.set(slot, key);
      }
    }
  }

  // Track which mutually-exclusive groups have been satisfied.
  const satisfiedMutexGroups = new Set<string>();

  for (const { slot, section } of sorted) {
    // If this slot is part of a mutex group and another slot in the group already filled, skip
    const mutexGroupKey = mutexGroupBySlot.get(slot);
    if (mutexGroupKey) {
      const groupKey = mutexGroupKey;
      if (satisfiedMutexGroups.has(groupKey)) {
        assignments.set(slot.id, []);
        continue;
      }
    }

    const configuredNeeded = slot.times ?? slot.count ?? 1;
    const needed = slot.optional && optionalRemaining.has(section)
      ? Math.min(configuredNeeded, optionalRemaining.get(section) ?? 0)
      : configuredNeeded;
    const eligibleMatches = pool
      .filter(s => {
        const sid = s.kind === 'card' ? s.card.id : s.id;
        const canOverlapInThisSection = s.kind === 'card'
          && (explicitlyDoubleCountable(s.card) || sectionAllowsOverlap(section));
        if (canOverlapInThisSection) {
          if (overlapSectionsByCard.get(s.card.id)?.has(section.id)) return false;
          if (section.doubleCountGroup && !explicitlyDoubleCountable(s.card) &&
              overlapGroupsByCard.get(s.card.id)?.has(section.doubleCountGroup)) return false;
        } else if (usedIds.has(sid)) return false;
        if (s.kind === 'card') {
          const forcedSlot = validForcedSlotByCard.get(s.card.id);
          const forcedSection = forcedSlot ? configuredSectionBySlotId.get(forcedSlot) : undefined;
          const overlapPermitted = explicitlyDoubleCountable(s.card)
            || ((sectionAllowsOverlap(section) || sectionAllowsOverlap(forcedSection))
                && !sameDoubleCountGroup(section, forcedSection));
          if (forcedSlot && forcedSlot !== slot.id && !overlapPermitted) return false;
        }
        return satisfierMatchesSlot(s, slot);
      })
      .sort((left, right) => {
        const leftForced = left.kind === 'card' && validForcedSlotByCard.get(left.card.id) === slot.id;
        const rightForced = right.kind === 'card' && validForcedSlotByCard.get(right.card.id) === slot.id;
        return Number(rightForced) - Number(leftForced);
      });
    // Search & add is allowed to pin several courses to the same open-ended
    // requirement. Keep every explicitly pinned card visible/assigned even
    // when the slot's completion minimum is only one course.
    const pinnedMatchCount = eligibleMatches.filter(s =>
      s.kind === 'card' && validForcedSlotByCard.get(s.card.id) === slot.id,
    ).length;
    const matches = takeSlotMatches(eligibleMatches, slot, needed, pinnedMatchCount);

    assignments.set(slot.id, matches);
    matches.forEach(s => {
      if (s.kind === 'card' && (explicitlyDoubleCountable(s.card) || sectionAllowsOverlap(section))) {
        const usedSections = overlapSectionsByCard.get(s.card.id) ?? new Set<string>();
        usedSections.add(section.id);
        overlapSectionsByCard.set(s.card.id, usedSections);
        if (section.doubleCountGroup && !explicitlyDoubleCountable(s.card)) {
          const usedGroups = overlapGroupsByCard.get(s.card.id) ?? new Set<string>();
          usedGroups.add(section.doubleCountGroup);
          overlapGroupsByCard.set(s.card.id, usedGroups);
        }
      } else {
        usedIds.add(s.kind === 'card' ? s.card.id : s.id);
      }
    });
    if (slot.optional && optionalRemaining.has(section) && matches.length > 0) {
      optionalRemaining.set(
        section,
        Math.max(0, (optionalRemaining.get(section) ?? 0) - matches.length),
      );
    }

    // Mark mutex group as satisfied if this slot got any matches
    if (matches.length > 0 && mutexGroupKey) {
      satisfiedMutexGroups.add(mutexGroupKey);
    }
  }

  // Minimum allocation above deliberately runs first so every required slot
  // gets priority. Afterwards, retain remaining qualifying courses in
  // open-list requirements instead of dropping them merely because the
  // minimum has already been reached. This makes overflow courses contribute
  // to the section display and program unit total across every program.
  const alreadyAssignedCardIds = new Set<string>();
  for (const satisfiers of assignments.values()) {
    for (const satisfier of satisfiers) {
      if (satisfier.kind === 'card') alreadyAssignedCardIds.add(satisfier.card.id);
    }
  }
  const overflowDestinations = sorted.filter(({ slot }) =>
    slot.type === 'pick-from-list' || slot.type === 'any-approved',
  );
  for (const satisfier of pool) {
    if (satisfier.kind !== 'card' || alreadyAssignedCardIds.has(satisfier.card.id)) continue;
    const destination = overflowDestinations.find(({ slot }) => {
      // Do not activate an optional alternative that was not selected during
      // minimum allocation; overflow is retained only in an active option.
      if (slot.optional && (assignments.get(slot.id)?.length ?? 0) === 0) return false;
      const mutexGroup = mutexGroupBySlot.get(slot);
      if (mutexGroup
          && satisfiedMutexGroups.has(mutexGroup)
          && (assignments.get(slot.id)?.length ?? 0) === 0) return false;
      return satisfierMatchesSlot(satisfier, slot);
    });
    if (!destination) continue;
    const current = assignments.get(destination.slot.id) ?? [];
    assignments.set(destination.slot.id, [...current, satisfier]);
    alreadyAssignedCardIds.add(satisfier.card.id);
    usedIds.add(satisfier.card.id);
  }

  // Meta requirements use the full eligible pool and never reserve a course
  // from ordinary sections (or from another meta requirement).
  for (const meta of getProgramMetaRequirements(config)) {
    const matches = pool.filter(satisfier => {
      if (satisfier.kind === 'card' && excludeCardIds?.has(satisfier.card.id)) return false;
      const [dept, number] = satisfier.kind === 'card'
        ? [satisfier.card.department, satisfier.card.courseNumber]
        : [satisfier.dept, satisfier.number];
      return meta.options.some(option => matchesOption(dept, number, option));
    }).slice(0, meta.minCount);
    assignments.set(metaAssignmentKey(meta.id), matches);
  }

  return assignments;
}

/** Returns ALL card IDs consumed by an assignments map (used for deduplication within one program). */
export function getConsumedCardIds(assignments: Map<string, Satisfier[]>): Set<string> {
  const ids = new Set<string>();
  for (const satisfiers of assignments.values()) {
    for (const s of satisfiers) {
      if (s.kind === 'card') ids.add(s.card.id);
    }
  }
  return ids;
}

/**
 * Returns card IDs that should be excluded from other programs.
 * Skips sections marked `allowDoubleCount` (e.g. shared foundations like CS 106B),
 * so those cards remain available to the next program's foundation section.
 */
export function getExcludeCardIds(config: MajorConfig, assignments: Map<string, Satisfier[]>): Set<string> {
  const ids = new Set<string>();
  for (const section of getProgramSections(config)) {
    if (section.allowDoubleCount || section.phase === 'pre-major') continue;
    const allSlots = [
      ...section.slots,
      ...(section.pickOneGroup?.flatMap(g => g.slots) ?? []),
    ];
    for (const slot of allSlots) {
      for (const s of (assignments.get(slot.id) ?? [])) {
        if (s.kind === 'card') ids.add(s.card.id);
      }
    }
  }
  for (const meta of getProgramMetaRequirements(config)) {
    for (const satisfier of assignments.get(metaAssignmentKey(meta.id)) ?? []) {
      if (satisfier.kind === 'card') ids.add(satisfier.card.id);
    }
  }
  return ids;
}

/** Cards assigned to explicitly shareable sections remain eligible in other programs. */
export function getShareableCardIds(config: MajorConfig, assignments: Map<string, Satisfier[]>): Set<string> {
  const ids = new Set<string>();
  for (const section of getProgramSections(config)) {
    if (section.phase !== 'pre-major' && !section.allowDoubleCount) continue;
    for (const slot of [
      ...section.slots,
      ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
    ]) {
      for (const satisfier of assignments.get(slot.id) ?? []) {
        if (satisfier.kind === 'card') ids.add(satisfier.card.id);
      }
    }
  }
  return ids;
}

/** Detect explicitly pinned cards whose destination section is configured as shareable. */
export function getPinnedShareableCardIds(configs: MajorConfig[], cards: CourseCard[]): Set<string> {
  const shareableSlotsByProgram = new Map<string, Set<string>>();
  for (const config of configs) {
    const slotIds = new Set<string>();
    for (const section of getProgramSections(config)) {
      if (section.phase !== 'pre-major' && !section.allowDoubleCount) continue;
      for (const slot of [
        ...section.slots,
        ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
      ]) slotIds.add(slot.id);
    }
    shareableSlotsByProgram.set(config.id, slotIds);
  }
  return new Set(cards.flatMap(card => {
    const target = card.requirementAssignment;
    return target && shareableSlotsByProgram.get(target.programId)?.has(target.slotId)
      ? [card.id]
      : [];
  }));
}

const COURSE_CODE_RE = /\b([A-Z][A-Z0-9&]{0,9})\s+([0-9][A-Z0-9]{0,9})\b/g;

export function getManualCourseCodes(note: string): Array<{ dept: string; number: string }> {
  const codes = new Map<string, { dept: string; number: string }>();
  COURSE_CODE_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = COURSE_CODE_RE.exec(note.toUpperCase())) !== null) {
    const [, dept, number] = match;
    codes.set(`${normalizeDept(dept)} ${number}`, { dept, number });
  }
  return [...codes.values()];
}

export function getManualSlotCourseCards(
  _fill: { checked: boolean; note: string } | undefined,
  _cards: CourseCard[],
): CourseCard[] {
  // Verification is deliberately metadata-only. Courses must be represented
  // by actual cards assigned to the slot; checking Verify must never add a
  // course or units through a note left by older saved plans.
  return [];
}

export function getManualSlotFilledCount(
  slot: Slot,
  fill: { checked: boolean; note: string } | undefined,
  assigned: Satisfier[] = [],
): number {
  if (!fill?.checked) return 0;
  // `any-approved` uses the checkbox only to verify substitutions. Its course
  // progress always comes exclusively from assigned course cards.
  if (slot.type === 'any-approved') return 0;
  const needed = slot.times ?? slot.count ?? 1;
  const namedCourses = getManualCourseCodes(fill.note);
  // A checked non-course milestone represents completion of the milestone,
  // including repeated occurrences such as a three-quarter seminar.
  if (namedCourses.length === 0) return slot.type === 'manual' ? needed : 1;
  const additionalCourses = namedCourses.filter(code => !assigned.some(satisfier => {
    const [dept, number] = satisfier.kind === 'card'
      ? [satisfier.card.department, satisfier.card.courseNumber]
      : [satisfier.dept, satisfier.number];
    return matchesOption(dept, number, code);
  }));
  return Math.min(needed, additionalCourses.length);
}

/**
 * Returns card IDs named in manually-filled any-approved slot notes,
 * skipping allowDoubleCount sections so foundation courses stay shareable.
 */
export function getManualExcludeCardIds(
  _config: MajorConfig,
  _manualFills: Record<string, { checked: boolean; note: string }>,
  _cards: CourseCard[],
): Set<string> {
  // A verification checkbox cannot reserve a course from another program.
  // Actual slot assignments are handled by getExcludeCardIds().
  return new Set<string>();
}

export function countSlots(
  slots: Slot[],
  assignments: Map<string, Satisfier[]>,
  manualSlotFills: Record<string, { checked: boolean; note: string }>,
): { needed: number; filled: number } {
  const assignedUnits = (slot: Slot): number => (assignments.get(slot.id) ?? []).reduce((sum, satisfier) => {
    if (satisfier.kind === 'test' || satisfier.kind === 'transfer') return sum + satisfier.units;
    return sum + (
      satisfier.card.units
      ?? parseHighUnit(lookupCourse(satisfier.card.department, satisfier.card.courseNumber)?.units ?? '')
      ?? 0
    );
  }, 0);
  const unitsSatisfied = (slot: Slot): boolean => slot.minUnits == null || assignedUnits(slot) >= slot.minUnits;

  let needed = 0;
  let filled = 0;
  for (const s of slots) {
    if (s.optional) continue;
    if (s.type === 'manual') {
      const n = s.times ?? s.count ?? 1;
      needed += n;
      const assigned = assignments.get(s.id) ?? [];
      const automatic = Math.min(assigned.length, n);
      const manual = getManualSlotFilledCount(s, manualSlotFills[s.id], assigned);
      const actualFilled = Math.min(n, automatic + manual);
      filled += unitsSatisfied(s) ? actualFilled : Math.min(actualFilled, Math.max(0, n - 1));
    } else if (s.type === 'any-approved' || s.type === 'pick-from-list') {
      const n = s.times ?? s.count ?? 1;
      needed += n;
      const actualFilled = Math.min((assignments.get(s.id) ?? []).length, n);
      filled += unitsSatisfied(s) ? actualFilled : Math.min(actualFilled, Math.max(0, n - 1));
    } else {
      const n = s.times ?? s.count ?? 1;
      needed += n;
      const actualFilled = Math.min((assignments.get(s.id) ?? []).length, n);
      filled += unitsSatisfied(s) ? actualFilled : Math.min(actualFilled, Math.max(0, n - 1));
    }
  }
  return { needed, filled };
}

/**
 * Counts a whole section, including optional alternatives used to satisfy a
 * section-level minimum course count. Required slots must still be completed;
 * optional slots only fill the additional courses needed by `minCourses`.
 */
export function countSectionSlots(
  section: MajorSection,
  assignments: Map<string, Satisfier[]>,
  manualSlotFills: Record<string, { checked: boolean; note: string }>,
): { needed: number; filled: number } {
  if (section.unitOnly) return { needed: 0, filled: 0 };

  // Pick-one-group: section done when N groups (pickGroupCount, default 1) are fully satisfied
  if (section.pickOneGroup?.length) {
    const required = section.pickGroupCount ?? 1;
    let completedGroups = 0;
    let bestFilled = -1;
    let bestNeeded = 1;
    for (const group of section.pickOneGroup) {
      const p = countSlots(group.slots, assignments, manualSlotFills);
      if (p.needed > 0 && p.filled >= p.needed) {
        completedGroups++;
      } else if (p.filled > bestFilled || (p.filled === bestFilled && p.needed < bestNeeded)) {
        bestFilled = p.filled;
        bestNeeded = p.needed;
      }
    }
    if (completedGroups >= required) return { needed: required, filled: required };
    // Progress: each completed group counts as 1; partial progress toward the next
    return { needed: required, filled: completedGroups };
  }

  // An open-ended pool governed only by a section unit minimum must not
  // silently become a "one course" requirement just because Slot.count
  // defaults to 1. Explicit course minimums still use minCourses/count.
  const countableSlots = section.minUnits && section.minCourses == null
    ? section.slots.filter(slot =>
        !(slot.type === 'any-approved' && slot.count == null && slot.times == null),
      )
    : section.slots;
  const required = countSlots(countableSlots, assignments, manualSlotFills);
  const additionalNeeded = Math.max(0, (section.minCourses ?? 0) - required.needed);
  if (additionalNeeded === 0) return required;

  const optionalFilled = section.slots.reduce((sum, slot) => {
    if (!slot.optional) return sum;
    if (slot.type === 'any-approved' || slot.type === 'manual') {
      const n = slot.count ?? 1;
      const assigned = assignments.get(slot.id) ?? [];
      const fill = manualSlotFills[slot.id];
      const automatic = Math.min(assigned.length, n);
      const actualFilled = Math.min(n, automatic + getManualSlotFilledCount(slot, fill, assigned));
      return sum + actualFilled;
    }
    return sum + Math.min((assignments.get(slot.id) ?? []).length, slot.count ?? 1);
  }, 0);

  return {
    needed: required.needed + additionalNeeded,
    filled: required.filled + Math.min(optionalFilled, additionalNeeded),
  };
}

function satisfierIsApprovedForSlot(satisfier: Satisfier, slot: Slot): boolean {
  const [dept, number] = satisfier.kind === 'card'
    ? [satisfier.card.department, satisfier.card.courseNumber]
    : [satisfier.dept, satisfier.number];
  return slot.options.some(option => matchesOption(dept, number, option));
}

/**
 * Search-added courses always count toward course/unit progress. Verification
 * controls only whether the containing requirement may display as complete.
 * Listed approved courses verify automatically; unlisted substitutions require
 * the user's checkbox.
 */
export function isSectionVerificationComplete(
  section: MajorSection,
  assignments: Map<string, Satisfier[]>,
  manualSlotFills: Record<string, { checked: boolean; note: string }>,
): boolean {
  const slots = [
    ...section.slots,
    ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
  ];
  return slots.every(slot => {
    if (slot.type !== 'any-approved') return true;
    const assigned = assignments.get(slot.id) ?? [];
    if (assigned.length === 0) return true;
    if (manualSlotFills[slot.id]?.checked) return true;
    return slot.options.length > 0
      && assigned.every(satisfier => satisfierIsApprovedForSlot(satisfier, slot));
  });
}

/** Units earned by cards/test credits actually assigned within one requirement section. */
/**
 * Units credited toward a set of requirement sections.
 *
 * `allowedAffiliations` restricts which cards may count; omitting it counts
 * every assigned card, which is what the printable document wants.
 */
export function calculateRequirementUnits(
  sections: MajorSection[],
  assignments: Map<string, Satisfier[]>,
  manualSlotFills: Record<string, { checked: boolean; note: string }>,
  cards: CourseCard[],
  allowedAffiliations?: Set<Affiliation>,
): number {
  const cardIds = new Set<string>();
  const testGroups = new Set<string>();
  let testUnits = 0;
  const affiliationAllowed = (card: CourseCard) =>
    !allowedAffiliations || !card.affiliation || allowedAffiliations.has(card.affiliation);

  for (const section of sections) {
    const allSlots = [
      ...section.slots,
      ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
    ];
    for (const slot of allSlots) {
      for (const satisfier of assignments.get(slot.id) ?? []) {
        if (satisfier.kind === 'card') cardIds.add(satisfier.card.id);
        else if (!testGroups.has(satisfier.groupId)) {
          testGroups.add(satisfier.groupId);
          testUnits += satisfier.units;
        }
      }
      if (slot.type === 'any-approved') {
        for (const card of getManualSlotCourseCards(manualSlotFills[slot.id], cards)) {
          if (affiliationAllowed(card)) cardIds.add(card.id);
        }
      }
    }
  }

  return cards
    .filter(card => cardIds.has(card.id) && affiliationAllowed(card))
    .reduce((sum, card) => sum + (card.units ?? parseHighUnit(lookupCourse(card.department, card.courseNumber)?.units ?? '') ?? 0), 0)
    + testUnits;
}

export function calculateSectionUnits(
  section: MajorSection,
  assignments: Map<string, Satisfier[]>,
  manualSlotFills: Record<string, { checked: boolean; note: string }>,
  cards: CourseCard[],
): number {
  const assignedCardIds = new Set<string>();
  const seenGroups = new Set<string>();
  let nonCardUnits = 0;
  const slots = [
    ...section.slots,
    ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
  ];

  for (const slot of slots) {
    for (const satisfier of assignments.get(slot.id) ?? []) {
      if (satisfier.kind === 'card') assignedCardIds.add(satisfier.card.id);
      else if ((satisfier.kind === 'test' || satisfier.kind === 'transfer') && !seenGroups.has(satisfier.groupId)) {
        seenGroups.add(satisfier.groupId);
        nonCardUnits += satisfier.units;
      }
    }
    if (slot.type === 'any-approved') {
      for (const card of getManualSlotCourseCards(manualSlotFills[slot.id], cards)) {
        assignedCardIds.add(card.id);
      }
    }
  }

  return cards
    .filter(card => assignedCardIds.has(card.id))
    .reduce((sum, card) => {
      const catalogCourse = lookupCourse(card.department, card.courseNumber);
      return sum + (card.units ?? parseHighUnit(catalogCourse?.units) ?? 0);
    }, nonCardUnits);
}

/** Units from actual cards/test credits assigned to non-prerequisite requirements. */
export function calculateProgramAssignedUnits(
  config: MajorConfig,
  assignments: Map<string, Satisfier[]>,
  cards: CourseCard[],
): number {
  const sections = getProgramSections(config);
  const excludedUnitSlotIds = new Set<string>();
  // section-level cap: all slots in the section share a bucket
  const slotCappedSection = new Map<string, MajorSection>();
  // slot-level cap: the slot itself has its own bucket (keyed by slot id)
  const slotCapMap = new Map<string, number>(); // slotId → maxCountedUnits

  for (const section of sections) {
    const slots = [
      ...section.slots,
      ...(section.pickOneGroup?.flatMap(group => group.slots) ?? []),
    ];
    if (section.phase === 'pre-major' || section.excludeFromProgramUnits) {
      for (const slot of slots) excludedUnitSlotIds.add(slot.id);
    } else {
      if (section.maxCountedUnits != null) {
        for (const slot of slots) slotCappedSection.set(slot.id, section);
      }
      for (const slot of slots) {
        if (slot.maxCountedUnits != null) slotCapMap.set(slot.id, slot.maxCountedUnits);
      }
    }
  }

  const seenCards = new Set<string>();
  const seenGroups = new Set<string>();
  const accumulated = new Map<string, number>(); // key: section.id or slot.id
  let total = 0;
  for (const [slotId, satisfiers] of assignments.entries()) {
    if (excludedUnitSlotIds.has(slotId)) continue;
    const cappedSection = slotCappedSection.get(slotId);
    const slotCap = slotCapMap.get(slotId);
    for (const satisfier of satisfiers) {
      let unitContrib = 0;
      if (satisfier.kind === 'card' && !seenCards.has(satisfier.card.id)) {
        seenCards.add(satisfier.card.id);
        unitContrib = satisfier.card.units
          ?? parseHighUnit(lookupCourse(satisfier.card.department, satisfier.card.courseNumber)?.units ?? '')
          ?? 0;
      } else if ((satisfier.kind === 'test' || satisfier.kind === 'transfer') && !seenGroups.has(satisfier.groupId)) {
        seenGroups.add(satisfier.groupId);
        unitContrib = satisfier.units;
      }
      if (unitContrib === 0) continue;
      // Apply slot-level cap first (narrower), then section-level cap
      let allowed = unitContrib;
      if (slotCap != null) {
        const used = accumulated.get(slotId) ?? 0;
        allowed = Math.max(0, Math.min(allowed, slotCap - used));
        accumulated.set(slotId, used + allowed);
      }
      if (cappedSection != null) {
        const used = accumulated.get(cappedSection.id) ?? 0;
        allowed = Math.max(0, Math.min(allowed, cappedSection.maxCountedUnits! - used));
        accumulated.set(cappedSection.id, used + allowed);
      }
      total += allowed;
    }
  }

  // Coterm unit minimums are degree-wide rather than limited to courses that
  // match a particular requirement slot. A user explicitly marking a course
  // Coterm therefore makes it part of the coterm unit total. Majors and minors
  // intentionally remain restricted to requirement-assigned courses.
  if (config.category === 'coterm') {
    for (const card of cards) {
      if (card.affiliation !== 'co-term' || seenCards.has(card.id)) continue;
      seenCards.add(card.id);
      total += card.units
        ?? parseHighUnit(lookupCourse(card.department, card.courseNumber)?.units ?? '')
        ?? 0;
    }
  }

  return total;
}

/** True when a section contributes a required course or unit minimum. */
export function sectionHasRequirement(section: MajorSection): boolean {
  if (section.pickOneGroup?.length) return true;
  if ((section.minCourses ?? 0) > 0 || (section.minUnits ?? 0) > 0) return true;
  return section.slots.some(slot => !slot.optional && (slot.count ?? 1) > 0);
}

export function countSections(
  sections: MajorSection[],
  assignments: Map<string, Satisfier[]>,
  manualSlotFills: Record<string, { checked: boolean; note: string }>,
): { needed: number; filled: number } {
  return sections.reduce((total, section) => {
    const progress = countSectionSlots(section, assignments, manualSlotFills);
    return {
      needed: total.needed + progress.needed,
      filled: total.filled + progress.filled,
    };
  }, { needed: 0, filled: 0 });
}

export type ProgramRequirementDisplayItem =
  | { kind: 'section'; section: MajorSection }
  | { kind: 'meta' };

/** Keeps special cross-section requirements next to the related program flow. */
export function getProgramRequirementDisplayItems(
  config: MajorConfig,
  sections: MajorSection[],
  includeMeta: boolean,
): ProgramRequirementDisplayItem[] {
  const metaBeforeSectionId = config.id === 'cs-bs-2526' ? 'senior-project' : null;
  const items: ProgramRequirementDisplayItem[] = [];
  let metaAdded = false;

  for (const section of sections) {
    if (includeMeta && section.id === metaBeforeSectionId) {
      items.push({ kind: 'meta' });
      metaAdded = true;
    }
    items.push({ kind: 'section', section });
  }
  if (includeMeta && !metaAdded) items.push({ kind: 'meta' });
  return items;
}
