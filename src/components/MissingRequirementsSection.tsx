import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';
import { usePlannerStore } from '../store/usePlannerStore';
import { useProgramConfig, useProgramConfigs } from '../hooks/useProgramConfigs';
import { getTestCreditSatisfiers, getTransferSatisfiers } from '../data/testCreditUtils';
import { ALL_TEST_GROUPS } from '../data/testCredits';
import { GEN_ED_CONFIG, WAYS_CONFIG } from '../data/requirements';
import {
  computeAssignments,
  countSectionSlots,
  calculateSectionUnits,
  calculateProgramAssignedUnits,
  isSectionVerificationComplete,
  getExcludeCardIds,
  getManualExcludeCardIds,
  getMetaRequirementCounts,
  getProgramMetaRequirements,
  getProgramSections,
  getEffectiveProgramSections,
  cardSatisfiesWim,
} from '../utils/majorUtils';
import { TAG_COLORS, WAY_TAGS, type Affiliation, type CourseCard, type WayTag } from '../types';
import type { MajorConfig } from '../data/majorSchema';
import {
  clearPendingRequirementReveal,
  requirementElementId,
  revealRequirement,
  type RequirementArea,
  type RequirementRevealDetail,
} from '../utils/requirementNavigation';

interface Props {
  cards: CourseCard[];
  undergraduateUnits: number;
  onCompletionStatusChange?: (complete: boolean) => void;
}

interface MissingItem {
  key: string;
  label: string;
  group: string;
  scope: 'general' | 'program';
  className: string;
  target?: 'section-major' | 'section-ways' | 'section-writing';
  reveal?: RequirementRevealDetail;
}

const PROGRAM_PILLS = {
  major: 'bg-cardinal-50 text-cardinal-700 border-cardinal-200',
  minor: 'bg-teal-50 text-teal-700 border-teal-200',
  coterm: 'bg-sky-50 text-sky-700 border-sky-200',
  'double-major': 'bg-cardinal-50 text-cardinal-700 border-cardinal-200',
  'secondary-major': 'bg-cardinal-50 text-cardinal-700 border-cardinal-200',
};

const getWayTags = (card: CourseCard) =>
  card.tags.filter(tag => (WAY_TAGS as string[]).includes(tag)) as WayTag[];

function effectiveProgram(config: MajorConfig, selectedTracks: Record<string, string>) {
  return { ...config, sections: getEffectiveProgramSections(config, selectedTracks) };
}

function programMissingItems(
  config: MajorConfig,
  cards: CourseCard[],
  testSatisfiers: ReturnType<typeof getTestCreditSatisfiers>,
  manualFills: Record<string, { checked: boolean; note: string }>,
  selectedTracks: Record<string, string>,
  allowedAffiliation: Affiliation | null,
  excludeIds: Set<string> | undefined,
  kind: keyof typeof PROGRAM_PILLS,
  revealArea?: RequirementArea,
  slotOverlapExceptions?: Set<string>,
) {
  const effective = effectiveProgram(config, selectedTracks);
  const assignments = computeAssignments(
    effective,
    cards,
    testSatisfiers,
    excludeIds,
    allowedAffiliation ? new Set<Affiliation>([allowedAffiliation]) : undefined,
    undefined,
    slotOverlapExceptions,
  );
  const sections = getProgramSections(effective);
  const metaRequirements = getProgramMetaRequirements(config);
  const metaCounts = getMetaRequirementCounts(metaRequirements, assignments);
  const items: MissingItem[] = [];

  if (config.totalMinUnits != null) {
    const earnedProgramUnits = calculateProgramAssignedUnits(effective, assignments, cards);
    if (earnedProgramUnits < config.totalMinUnits) {
      const unitLabel =
        kind === 'major' ? 'Major units' :
        kind === 'minor' ? 'Minor units' :
        kind === 'coterm' ? 'Coterm units' :
        kind === 'double-major' ? 'Double major units' :
        'Secondary major units';
      items.push({
        key: `${kind}:${config.id}:units`,
        label: `${unitLabel}: ${earnedProgramUnits}/${config.totalMinUnits}`,
        group: config.name,
        scope: 'program',
        className: PROGRAM_PILLS[kind],
      });
    }
  }

  for (const section of sections) {
    const { needed, filled } = countSectionSlots(section, assignments, manualFills);
    const earnedUnits = section.minUnits
      ? calculateSectionUnits(section, assignments, manualFills, cards)
      : 0;
    const missingCourses = needed > 0 && filled < needed;
    const missingUnits = Boolean(section.minUnits && earnedUnits < section.minUnits);
    const missingVerification = !isSectionVerificationComplete(section, assignments, manualFills);
    if (missingCourses || missingUnits || missingVerification) {
      const area = revealArea ?? (kind as RequirementArea);
      items.push({
        key: `${kind}:${config.id}:section:${section.id}`,
        label: section.name,
        group: config.name,
        scope: 'program',
        className: PROGRAM_PILLS[kind],
        target: 'section-major',
        reveal: {
          area,
          programId: config.id,
          requirementId: section.id,
          fallbackSectionId: 'section-major',
        },
      });
    }
  }
  for (const meta of metaRequirements) {
    if ((metaCounts[meta.id] ?? 0) < meta.minCount) {
      const area = revealArea ?? (kind as RequirementArea);
      items.push({
        key: `${kind}:${config.id}:meta:${meta.id}`,
        label: meta.label,
        group: config.name,
        scope: 'program',
        className: PROGRAM_PILLS[kind],
        target: 'section-major',
        reveal: {
          area,
          programId: config.id,
          requirementId: `meta-section:${meta.id}`,
          fallbackSectionId: 'section-major',
        },
      });
    }
  }

  const consumed = getExcludeCardIds(effective, assignments);
  for (const id of getManualExcludeCardIds(effective, manualFills, cards)) consumed.add(id);
  return { items, consumed };
}

export function MissingRequirementsSection({
  cards,
  undergraduateUnits,
  onCompletionStatusChange,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const selectedMajorId = usePlannerStore(state => state.selectedMajorId);
  const userMajors = usePlannerStore(state => state.userMajors);
  const manualSlotFills = usePlannerStore(state => state.manualSlotFills);
  const selectedMinorIds = usePlannerStore(state => state.selectedMinorIds);
  const userMinors = usePlannerStore(state => state.userMinors);
  const manualMinorSlotFills = usePlannerStore(state => state.manualMinorSlotFills);
  const selectedCotermId = usePlannerStore(state => state.selectedCotermId);
  const userCotermConfigs = usePlannerStore(state => state.userCotermConfigs);
  const additionalMajors = usePlannerStore(state => state.additionalMajors);
  const manualAdditionalMajorSlotFills = usePlannerStore(state => state.manualAdditionalMajorSlotFills);
  const selectedTracks = usePlannerStore(state => state.selectedTracks);
  const testCreditChecks = usePlannerStore(state => state.testCreditChecks);
  const transferCredits = usePlannerStore(state => state.transferCredits);
  const manualLangFulfilled = usePlannerStore(state => state.manualLangFulfilled);

  const majorConfig = useProgramConfig(selectedMajorId, userMajors);
  const minorConfigs = useProgramConfigs(selectedMinorIds, userMinors);
  const cotermConfig = useProgramConfig(selectedCotermId, userCotermConfigs);
  const additionalMajorConfigIds = useMemo(() => additionalMajors.map(am => am.id), [additionalMajors]);
  const additionalMajorConfigs = useProgramConfigs(additionalMajorConfigIds, userMajors);
  const testSatisfiers = useMemo(
    () => [...getTestCreditSatisfiers(testCreditChecks), ...getTransferSatisfiers(transferCredits)],
    [testCreditChecks, transferCredits],
  );

  const missing = useMemo(() => {
    const result: MissingItem[] = [];
    let excluded = new Set<string>();

    if (undergraduateUnits < 180) {
      result.push({
        key: 'units:undergraduate',
        label: `Graduation units: ${undergraduateUnits}/180`,
        group: 'Graduation',
        scope: 'general',
        className: PROGRAM_PILLS.major,
      });
    }
    if (majorConfig) {
      const major = programMissingItems(
        majorConfig,
        cards,
        testSatisfiers,
        manualSlotFills,
        selectedTracks,
        'major',
        undefined,
        'major',
      );
      result.push(...major.items);
      excluded = major.consumed;
    }

    for (const am of additionalMajors) {
      const config = additionalMajorConfigs.find(c => c.id === am.id);
      if (!config) continue;
      const kind = am.kind === 'double' ? 'double-major' as const : 'secondary-major' as const;
      // double major uses affiliation filter; secondary major uses no filter (full overlap)
      const affiliation: Affiliation | null = am.kind === 'double' ? 'double-major' : null;
      const fills = manualAdditionalMajorSlotFills[am.id] ?? {};
      const slotOverlapExceptions = am.kind === 'double'
        ? new Set(Object.entries(fills).filter(([, f]) => f.checked).map(([id]) => id))
        : undefined;
      const additionalMajor = programMissingItems(
        config,
        cards,
        testSatisfiers,
        fills,
        selectedTracks,
        affiliation,
        am.kind === 'double' ? excluded : undefined,
        kind,
        'major',
        slotOverlapExceptions?.size ? slotOverlapExceptions : undefined,
      );
      result.push(...additionalMajor.items);
      if (am.kind === 'double') {
        additionalMajor.consumed.forEach(id => excluded.add(id));
      }
    }

    for (const minorConfig of minorConfigs) {
      const minor = programMissingItems(
        minorConfig,
        cards,
        testSatisfiers,
        manualMinorSlotFills[minorConfig.id] ?? {},
        selectedTracks,
        'minor',
        excluded,
        'minor',
      );
      result.push(...minor.items);
      minor.consumed.forEach(id => excluded.add(id));
    }

    if (cotermConfig) {
      const coterm = programMissingItems(
        cotermConfig,
        cards,
        testSatisfiers,
        manualMinorSlotFills[cotermConfig.id] ?? {},
        selectedTracks,
        'co-term',
        excluded,
        'coterm',
      );
      result.push(...coterm.items);
    }

    // Pre-compute transfer tag counts so wayFull can account for them.
    const transferTagCounts = new Map<string, number>();
    for (const tc of transferCredits) {
      for (const tag of tc.waysTags ?? []) {
        transferTagCounts.set(tag, (transferTagCounts.get(tag) ?? 0) + 1);
      }
    }

    // Match the Ways auto-commit behavior: a multi-Way course is assigned
    // automatically only when exactly one of its eligible Ways remains open.
    const committedByWay = new Map<WayTag, CourseCard[]>();
    for (const way of WAYS_CONFIG) {
      committedByWay.set(way.id, cards.filter(card =>
        card.tags.includes(way.id)
        && (getWayTags(card).length === 1 || card.committedWay === way.id)
      ));
    }
    const wayFull = (wayId: WayTag) => {
      const config = WAYS_CONFIG.find(way => way.id === wayId)!;
      const committed = committedByWay.get(wayId) ?? [];
      const tf = transferTagCounts.get(wayId) ?? 0;
      return config.unitsRequired
        ? committed.reduce((sum, card) => sum + (card.units ?? 0), 0) + (tf > 0 ? config.unitsRequired : 0) >= config.unitsRequired
        : committed.length + tf >= config.slots;
    };
    const autoCommit = new Map<string, WayTag>();
    for (const card of cards) {
      if (getWayTags(card).length <= 1 || card.committedWay) continue;
      const incomplete = getWayTags(card).filter(way => !wayFull(way));
      if (incomplete.length === 1) autoCommit.set(card.id, incomplete[0]);
    }

    for (const way of WAYS_CONFIG) {
      const assigned = cards.filter(card =>
        card.tags.includes(way.id)
        && (
          getWayTags(card).length === 1
          || card.committedWay === way.id
          || autoCommit.get(card.id) === way.id
        )
      );
      const tf = transferTagCounts.get(way.id) ?? 0;
      const assignedUnits = assigned.reduce((sum, card) => sum + (card.units ?? 0), 0);
      const complete = way.unitsRequired
        ? assignedUnits + (tf > 0 ? way.unitsRequired : 0) >= way.unitsRequired
        : assigned.length + tf >= way.slots;
      if (!complete) {
        const remaining = way.unitsRequired
          ? Math.max(0, way.unitsRequired - assignedUnits - (tf > 0 ? way.unitsRequired : 0))
          : Math.max(0, way.slots - assigned.length - tf);
        const colors = TAG_COLORS[way.id];
        result.push({
          key: `way:${way.id}`,
          label: `${way.id}${!way.unitsRequired && remaining > 1 ? ` ×${remaining}` : ''}`,
          group: 'Ways',
          scope: 'general',
          className: `${colors.bg} ${colors.text} ${colors.border}`,
          target: 'section-ways',
          reveal: {
            area: 'ways',
            requirementId: way.id,
            fallbackSectionId: 'section-ways',
          },
        });
      }
    }

    const languageTestCount = ALL_TEST_GROUPS.filter(group => {
      if (!group.fulfillsLang) return false;
      const check = testCreditChecks[group.id];
      return Boolean(
        check?.checked
        && (group.scoreOptions.length === 1 || check.selectedScore),
      );
    }).length;
    for (const config of GEN_ED_CONFIG) {
      const filled = cards.filter(card =>
        config.tag === 'WIM'
          ? cardSatisfiesWim(card, majorConfig?.wimCourses)
          : card.tags.includes(config.tag)
      ).length;
      const testCount = config.fulfillsLang ? languageTestCount : 0;
      const transferCount = transferTagCounts.get(config.tag) ?? 0;
      const complete = config.noCounter
        ? Boolean(config.fulfillsLang && manualLangFulfilled) || filled + testCount + transferCount >= 1
        : filled + testCount + transferCount >= config.needed;
      if (!complete) {
        const remaining = Math.max(1, config.needed - filled - testCount - transferCount);
        const colors = TAG_COLORS[config.tag];
        result.push({
          key: `gened:${config.tag}`,
          label: `${config.display}${config.tag !== 'LANG' && remaining > 1 ? ` ×${remaining}` : ''}`,
          group: 'COLLEGE & Writing',
          scope: 'general',
          className: `${colors.bg} ${colors.text} ${colors.border}`,
          target: 'section-writing',
          reveal: {
            area: 'writing',
            requirementId: config.tag,
            fallbackSectionId: 'section-writing',
          },
        });
      }
    }

    return result;
  }, [
    cards,
    cotermConfig,
    majorConfig,
    manualLangFulfilled,
    manualMinorSlotFills,
    manualSlotFills,
    minorConfigs,
    additionalMajors,
    additionalMajorConfigs,
    manualAdditionalMajorSlotFills,
    selectedTracks,
    testCreditChecks,
    testSatisfiers,
    transferCredits,
    undergraduateUnits,
  ]);

  const jumpTo = (item: MissingItem) => {
    if (!item.reveal || !item.target) return;
    const reveal = item.reveal;
    const fallbackTarget = item.target;
    revealRequirement(reveal);
    const exactId = requirementElementId(reveal);
    let attempts = 0;

    const scrollWhenReady = () => {
      const element = document.getElementById(exactId);
      if (!element && attempts++ < 20) {
        requestAnimationFrame(scrollWhenReady);
        return;
      }
      const target = element ?? document.getElementById(fallbackTarget);
      if (!target) return;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 104,
        behavior: 'smooth',
      });
      clearPendingRequirementReveal(reveal);
    };

    requestAnimationFrame(scrollWhenReady);
  };

  const configsReady = (
    (!selectedMajorId || Boolean(majorConfig))
    && minorConfigs.length === selectedMinorIds.length
    && (!selectedCotermId || Boolean(cotermConfig))
    && additionalMajorConfigs.length === additionalMajors.length
  );
  useEffect(() => {
    if (configsReady) onCompletionStatusChange?.(missing.length === 0);
  }, [configsReady, missing.length, onCompletionStatusChange]);

  const generalMissing = missing.filter(item => item.scope === 'general');
  const programMissingGroups = [...missing
    .filter(item => item.scope === 'program')
    .reduce((groups, item) => {
      const existing = groups.get(item.group) ?? [];
      existing.push(item);
      groups.set(item.group, existing);
      return groups;
    }, new Map<string, MissingItem[]>())
    .entries()];
  const renderItem = (item: MissingItem) => {
    const className = `rounded border px-2 py-1 text-[10px] font-medium ${item.className}`;
    return item.reveal ? (
      <button
        key={item.key}
        type="button"
        title={`${item.group}: ${item.label}`}
        onClick={() => jumpTo(item)}
        className={`${className} transition-transform hover:-translate-y-0.5`}
      >
        {item.label}
      </button>
    ) : (
      <span key={item.key} title={`${item.group}: ${item.label}`} className={className}>
        {item.label}
      </span>
    );
  };

  return (
    <section id="section-missing" className="mb-8 sm:mb-10">
      <button
        onClick={() => setCollapsed(value => !value)}
        className="flex h-8 items-center gap-1.5 hover:opacity-75 transition-opacity"
        aria-expanded={!collapsed}
      >
        {collapsed
          ? <ChevronRight size={14} className="text-gray-400" />
          : <ChevronDown size={14} className="text-gray-400" />}
        {missing.length > 0
          ? <AlertCircle size={15} className="text-cardinal-600" />
          : <CheckCircle2 size={15} className="theme-complete-check" />}
        <h2 className="font-serif font-semibold text-[17px] text-gray-900">Missing Requirements</h2>
        {missing.length > 0 && (
          <span className="rounded-full bg-cardinal-50 px-2 py-0.5 text-[10px] font-semibold text-cardinal-700">
            {missing.length}
          </span>
        )}
      </button>
      <div className="h-px bg-gradient-to-r from-gray-300 to-transparent mt-2 mb-3" />

      {!collapsed && (
        <div className="grid items-start gap-2.5 lg:grid-cols-[minmax(320px,0.7fr)_minmax(0,1.3fr)]">
          <div className="planner-glass rounded-xl border px-3 py-3 sm:px-4">
            {generalMissing.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5">
                {generalMissing.map(renderItem)}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] theme-complete-title">
                <CheckCircle2 size={12} className="theme-complete-check" />
                All general requirements fulfilled
              </div>
            )}
          </div>

          <div className="planner-glass rounded-xl border px-3 py-3 sm:px-4">
            {programMissingGroups.length > 0 ? (
              <div className="space-y-2.5">
                {programMissingGroups.map(([group, items]) => (
                  <div key={group}>
                    <div className="mb-1 text-[10px] font-semibold text-gray-500">{group}</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {items.map(renderItem)}
                    </div>
                  </div>
                ))}
              </div>
            ) : !selectedMajorId && selectedMinorIds.length === 0 && !selectedCotermId ? (
              <div className="text-[11px] text-gray-400 italic">No programs selected</div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] theme-complete-title">
                <CheckCircle2 size={12} className="theme-complete-check" />
                All program requirements fulfilled
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
