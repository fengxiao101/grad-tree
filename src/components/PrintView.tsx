import { useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, LayoutGrid, LayoutList, Share2, Mail, MessageSquare, Check, Copy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://gradtree.app';
import { ALL_QUARTERS, CourseCard, TAG_COLORS, TAG_DISPLAY, WAY_TAGS, WayTag, AFFILIATION_META, type Affiliation } from '../types';
import { usePlannerStore, type PlanSnapshot, orderedCardsFor, toCourseKey } from '../store/usePlannerStore';
import { WAYS_CONFIG, GEN_ED_CONFIG } from '../data/requirements';
import { ALL_TEST_GROUPS } from '../data/testCredits';
import { useProgramConfig, useProgramConfigs } from '../hooks/useProgramConfigs';
import type { MajorSection, MetaRequirement } from '../data/majorSchema';
import {
  computeAssignments,
  cardSatisfiesWim,
  countSectionSlots,
  countSections,
  getExcludeCardIds,
  getManualSlotFilledCount,
  getManualSlotCourseCards,
  getMetaRequirementCounts,
  getMetaRequirementPresentation,
  getProgramRequirementDisplayItems,
  getProgramMetaRequirements,
  getEffectiveProgramSections,
  sectionHasRequirement,
  isSectionVerificationComplete,
} from '../utils/majorUtils';
import { getRequirementStateStyles } from '../utils/requirementStyles';
import { lookupCourse } from '../data/catalog';
import { getWayTags, parseHighUnit } from '../utils/catalogUtils';
import { getTestCreditSatisfiers, getTransferSatisfiers, type Satisfier } from '../data/testCreditUtils';

function requirementUnits(
  sections: MajorSection[],
  assignments: Map<string, Satisfier[]>,
  fills: Record<string, { checked: boolean; note: string }>,
  cards: CourseCard[],
): number {
  const cardIds = new Set<string>();
  const testGroups = new Set<string>();
  let testUnits = 0;
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
        for (const card of getManualSlotCourseCards(fills[slot.id], cards)) cardIds.add(card.id);
      }
    }
  }
  return cards
    .filter(card => cardIds.has(card.id))
    .reduce(
      (sum, card) => sum + (card.units ?? parseHighUnit(lookupCourse(card.department, card.courseNumber)?.units ?? '') ?? 0),
      0,
    ) + testUnits;
}

// Inline SVG icons for social platforms
const WhatsAppIcon = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const XIcon = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const TelegramIcon = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
const RedditIcon = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const LinkedInIcon = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

interface Props {
  onClose: () => void;
}

interface DocOptions {
  // 4-year plan options
  showTags: boolean;
  showNotes: boolean;
  // full planning options
  showMajor: boolean;
  showAdditionalMajors: boolean;
  showMinors: boolean;
  showCoterm: boolean;
  showWays: boolean;
  showGenEd: boolean;
  showTestCredits: boolean;
}

const SEASONS = ['AUT', 'WIN', 'SPR'] as const;
const SEASON_LABEL: Record<string, string> = { AUT: 'Aut', WIN: 'Win', SPR: 'Spr', SUM: 'Sum' };

function PrintMetaRequirementsPanel({
  requirements,
  counts,
}: {
  requirements: MetaRequirement[];
  counts: Record<string, number>;
}) {
  return (
    <>
      {requirements.map(meta => {
        const count = counts[meta.id] ?? 0;
        const complete = count >= meta.minCount;
        const stateStyles = getRequirementStateStyles(complete);
        const presentation = getMetaRequirementPresentation(meta);
        return (
          <div key={meta.id} className={`rounded border overflow-hidden ${stateStyles.panel}`}>
            <div className="px-3 py-2">
              <span className={`text-xs font-bold ${stateStyles.title}`}>{presentation.title}</span>
              <span className="text-[10px] text-gray-500 ml-1">{presentation.subtitle}</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 ${stateStyles.row}`}>
              <span className={`text-[11px] ${stateStyles.check}`}>{complete ? '✓' : '○'}</span>
              <span className={`text-[11px] font-medium ${stateStyles.title}`}>
                {presentation.courseLabel}
              </span>
              <span className={`text-[10px] font-semibold ml-auto ${stateStyles.count}`}>
                {count}/{meta.minCount}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function PlanDocumentContent({
  mode,
  options,
  snapshot,
  highlightKeys,
  title,
}: {
  mode: 'grid' | 'full';
  options: DocOptions;
  snapshot?: PlanSnapshot;
  highlightKeys?: Set<string>;
  title?: string;
}) {
  const store = usePlannerStore(useShallow(s => ({
    cards: s.cards,
    cardOrder: s.cardOrder,
    hideSummer: s.hideSummer,
    completedQuarters: s.completedQuarters,
    selectedMajorId: s.selectedMajorId,
    testCreditChecks: s.testCreditChecks,
    transferCredits: s.transferCredits,
    manualSlotFills: s.manualSlotFills,
    selectedMinorIds: s.selectedMinorIds,
    manualMinorSlotFills: s.manualMinorSlotFills,
    isCoterm: s.isCoterm,
    selectedCotermId: s.selectedCotermId,
    selectedTracks: s.selectedTracks,
    additionalMajors: s.additionalMajors,
    manualAdditionalMajorSlotFills: s.manualAdditionalMajorSlotFills,
  })));

  const cards = snapshot?.cards ?? store.cards;
  const cardOrder = snapshot?.cardOrder ?? store.cardOrder;
  const hideSummer = snapshot?.hideSummer ?? store.hideSummer;
  const completedQuarters = useMemo(
    () => snapshot ? new Set(snapshot.completedQuarters) : store.completedQuarters,
    [snapshot, store.completedQuarters],
  );
  const selectedMajorId = snapshot?.selectedMajorId ?? store.selectedMajorId;
  const testCreditChecks = snapshot?.testCreditChecks ?? store.testCreditChecks;
  const transferCredits = snapshot?.transferCredits ?? store.transferCredits;
  const manualSlotFills = snapshot?.manualSlotFills ?? store.manualSlotFills;
  const selectedMinorIds = snapshot?.selectedMinorIds ?? store.selectedMinorIds;
  const manualMinorSlotFills = snapshot?.manualMinorSlotFills ?? store.manualMinorSlotFills;
  const isCoterm = snapshot?.isCoterm ?? store.isCoterm;
  const selectedCotermId = snapshot?.selectedCotermId ?? store.selectedCotermId;
  const selectedTracks = snapshot?.selectedTracks ?? store.selectedTracks;
  const additionalMajors = snapshot?.additionalMajors ?? store.additionalMajors;
  const manualAdditionalMajorSlotFills = snapshot?.manualAdditionalMajorSlotFills ?? store.manualAdditionalMajorSlotFills;

  const enrolledCards = useMemo(() => Object.values(cards), [cards]);
  const totalUnits = useMemo(() => enrolledCards.reduce((s, c) => s + (c.units ?? 0), 0), [enrolledCards]);
  const seasons = hideSummer ? SEASONS : ([...SEASONS, 'SUM'] as const);
  const years = [1, 2, 3, 4];

  const config = useProgramConfig(selectedMajorId);

  const majorSections = useMemo(() => {
    if (!config) return [];
    return getEffectiveProgramSections(config, selectedTracks).filter(
      section => !section.trackSelector && !section.selectorOptions?.length,
    );
  }, [config, selectedTracks]);
  const effectiveMajorConfig = useMemo(
    () => config ? { ...config, sections: majorSections } : null,
    [config, majorSections],
  );

  const testSatisfiers = useMemo(
    () => [...getTestCreditSatisfiers(testCreditChecks), ...getTransferSatisfiers(transferCredits)],
    [testCreditChecks, transferCredits],
  );
  const assignments = useMemo(
    () => effectiveMajorConfig ? computeAssignments(effectiveMajorConfig, enrolledCards, testSatisfiers) : new Map(),
    [effectiveMajorConfig, enrolledCards, testSatisfiers],
  );

  const majorSlotProgress = countSections(majorSections, assignments, manualSlotFills);
  const majorMetaRequirements = useMemo(
    () => config ? getProgramMetaRequirements(config) : [],
    [config],
  );
  const majorMetaCounts = useMemo(
    () => getMetaRequirementCounts(majorMetaRequirements, assignments),
    [majorMetaRequirements, assignments],
  );
  const majorRequirementItems = useMemo(
    () => config
      ? getProgramRequirementDisplayItems(config, majorSections, majorMetaRequirements.length > 0)
      : [],
    [config, majorSections, majorMetaRequirements.length],
  );
  const majorMetaNeeded = majorMetaRequirements.reduce((sum, meta) => sum + meta.minCount, 0);
  const majorMetaFilled = majorMetaRequirements.reduce(
    (sum, meta) => sum + Math.min(majorMetaCounts[meta.id] ?? 0, meta.minCount),
    0,
  );
  const majorNeeded = majorSlotProgress.needed + majorMetaNeeded;
  const majorFilled = majorSlotProgress.filled + majorMetaFilled;

  const majorExcludeIds = useMemo(
    () => effectiveMajorConfig ? getExcludeCardIds(effectiveMajorConfig, assignments) : new Set<string>(),
    [effectiveMajorConfig, assignments],
  );

  const selectedMinors = useProgramConfigs(selectedMinorIds);
  const cotermConfig = useProgramConfig(selectedCotermId);
  const additionalMajorIds = useMemo(() => additionalMajors.map(am => am.id), [additionalMajors]);
  const additionalMajorConfigs = useProgramConfigs(additionalMajorIds);

  const additionalMajorData = useMemo(() => {
    const result: { am: { id: string; kind: 'double' | 'secondary' }; name: string; isDouble: boolean; amAssignments: Map<string, Satisfier[]>; fills: Record<string, { checked: boolean; note: string }>; sections: ReturnType<typeof getEffectiveProgramSections>; needed: number; filled: number }[] = [];
    const accumulatedExcludes = new Set(majorExcludeIds);
    for (const am of additionalMajors) {
      const cfg = additionalMajorConfigs.find(c => c.id === am.id);
      if (!cfg) continue;
      const sections = getEffectiveProgramSections(cfg, selectedTracks).filter(
        s => !s.trackSelector && !s.selectorOptions?.length,
      );
      const effectiveConfig = { ...cfg, sections };
      const fills = manualAdditionalMajorSlotFills[am.id] ?? {};
      const isDouble = am.kind === 'double';
      const slotOverlapExceptions = isDouble
        ? new Set(Object.entries(fills).filter(([, f]) => f.checked).map(([slotId]) => slotId))
        : undefined;
      const amAssignments = computeAssignments(
        effectiveConfig, enrolledCards, testSatisfiers,
        isDouble ? accumulatedExcludes : undefined,
        isDouble ? new Set<Affiliation>(['double-major']) : undefined,
        undefined,
        slotOverlapExceptions?.size ? slotOverlapExceptions : undefined,
      );
      if (isDouble) {
        getExcludeCardIds(effectiveConfig, amAssignments).forEach(id => accumulatedExcludes.add(id));
      }
      const { needed, filled } = countSections(sections, amAssignments, fills);
      result.push({ am, name: cfg.name, isDouble, amAssignments, fills, sections, needed, filled });
    }
    return result;
  }, [additionalMajors, additionalMajorConfigs, majorExcludeIds, enrolledCards, testSatisfiers, manualAdditionalMajorSlotFills, selectedTracks]);

  const { cardsByWay, multiWayCards } = useMemo(() => {
    const map = new Map<WayTag, CourseCard[]>();
    for (const way of WAYS_CONFIG) {
      map.set(way.id, enrolledCards.filter(c =>
        c.tags.includes(way.id) && (getWayTags(c).length === 1 || c.committedWay === way.id)
      ));
    }
    return {
      cardsByWay: map,
      multiWayCards: enrolledCards.filter(c => getWayTags(c).length > 1 && !c.committedWay),
    };
  }, [enrolledCards]);

  const transferTagCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const tc of transferCredits) {
      for (const tag of tc.waysTags ?? []) {
        map.set(tag, (map.get(tag) ?? 0) + 1);
      }
    }
    return map;
  }, [transferCredits]);

  const totalWaysCovered = useMemo(() => WAYS_CONFIG.reduce((sum, w) => {
    const wc = cardsByWay.get(w.id) ?? [];
    const tf = transferTagCounts.get(w.id) ?? 0;
    if (w.unitsRequired) return sum + (wc.reduce((s, c) => s + (c.units ?? 0), 0) + (tf > 0 ? w.unitsRequired : 0) >= w.unitsRequired ? 1 : 0);
    return sum + Math.min(wc.length + tf, w.slots);
  }, 0), [cardsByWay, transferTagCounts]);

  const langTestFulfillments = useMemo(() => ALL_TEST_GROUPS
    .filter(group => {
      if (!group.fulfillsLang) return false;
      const check = testCreditChecks[group.id];
      if (!check?.checked) return false;
      if (group.scoreOptions.length > 1 && !check.selectedScore) return false;
      return true;
    })
    .map(group => {
      const check = testCreditChecks[group.id];
      const scoreStr = check?.selectedScore ?? group.scoreOptions[0].score;
      const opt = group.scoreOptions.find(o => o.score === scoreStr) ?? group.scoreOptions[0];
      const unitsStr = opt.units > 0 ? `, ${opt.units} units` : '';
      return `${group.subject} (score ${scoreStr}${unitsStr})`;
    }), [testCreditChecks]);

  const checkedTestGroups = useMemo(() => ALL_TEST_GROUPS.filter(group => {
    const check = testCreditChecks[group.id];
    if (!check?.checked) return false;
    if (group.scoreOptions.length > 1 && !check.selectedScore) return false;
    return true;
  }).map(group => {
    const check = testCreditChecks[group.id];
    const scoreStr = check?.selectedScore ?? group.scoreOptions[0].score;
    const opt = group.scoreOptions.find(o => o.score === scoreStr) ?? group.scoreOptions[0];
    return { group, scoreStr, opt };
  }), [testCreditChecks]);

  const testUnits = checkedTestGroups.reduce((s, { opt }) => s + opt.units, 0);

  return (
    <>
      {/* Document header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title ?? 'Grad Tree Degree Plan'}</h1>
          {(config || selectedMinors.length > 0 || (isCoterm && cotermConfig)) && (
            <div className="mt-0.5 space-y-0.5">
              {config && (
                <p className="text-sm text-gray-500">{config.name}</p>
              )}
              {additionalMajorData.map(d => (
                <p key={d.am.id} className="text-sm text-gray-500">{d.name} <span className="text-xs text-gray-400">({d.isDouble ? 'Double' : 'Secondary'} major)</span></p>
              ))}
              {selectedMinors.map(minor => (
                <p key={minor.id} className="text-sm text-gray-500">{minor.name}</p>
              ))}
              {isCoterm && cotermConfig && (
                <p className="text-sm text-gray-500">{cotermConfig.name}</p>
              )}
            </div>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 shrink-0">
          <p className="font-semibold text-gray-800">{totalUnits + testUnits} / 180 units</p>
          {testUnits > 0 && <p className="text-xs text-gray-400">{totalUnits} planned + {testUnits} test credit</p>}
          <p className="text-xs mt-0.5">Generated {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Quarter-by-Quarter */}
      <section className="mb-8">
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quarter by Quarter</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 pr-3 text-xs font-bold text-gray-400 w-16">Year</th>
              {seasons.map(s => (
                <th key={s} className="text-left py-2 px-2 text-xs font-bold text-gray-400">{SEASON_LABEL[s]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {years.map(year => (
              <tr key={year} className="border-b border-gray-100 align-top">
                <td className="py-3 pr-3 text-[11px] font-semibold text-gray-400 whitespace-nowrap">Y{year}</td>
                {seasons.map(season => {
                  const q = ALL_QUARTERS.find(q => q.year === year && q.season === season);
                  const qCards = q ? orderedCardsFor(cards, cardOrder, q.id) : [];
                  const qUnits = qCards.reduce((s, c) => s + (c.units ?? 0), 0);
                  const done = q ? completedQuarters.has(q.id) : false;
                  return (
                    <td key={season} className={`py-3 px-2 align-top ${done ? 'opacity-50' : ''}`}>
                      {qCards.length === 0 ? (
                        <span className="text-[11px] text-gray-200">-</span>
                      ) : (
                        <div className="space-y-1">
                          {qCards.map(card => {
                            const wayTags = card.tags.filter(t => (WAY_TAGS as string[]).includes(t));
                            const writingTags = card.tags.filter(t => ['W1','W2','WIM','COLLEGE','LANG'].includes(t));
                            const allDisplayTags = [...wayTags, ...writingTags];
                            const affiliationLabel = card.affiliation ? AFFILIATION_META[card.affiliation]?.label : null;
                            const isUnique = highlightKeys?.has(toCourseKey(card.department, card.courseNumber));
                            return (
                              <div key={card.id} className={`leading-tight rounded px-1 -mx-1 ${isUnique ? 'bg-red-50' : ''}`}>
                                <div className="flex items-baseline gap-1 flex-wrap">
                                  <span className={`text-[11px] font-semibold ${isUnique ? 'text-red-700' : 'text-gray-800'}`}>
                                    {card.department} {card.courseNumber}
                                  </span>
                                  {card.units != null && (
                                    <span className="text-[9px] text-gray-400">
                                      ({card.units} units{affiliationLabel && <span className="text-gray-500 font-medium"> · {affiliationLabel}</span>})
                                    </span>
                                  )}
                                  {card.priority === 'maybe' && (
                                    <span className="text-[9px] text-amber-600 italic">maybe</span>
                                  )}
                                  {card.priority === 'want' && (
                                    <span className="text-[9px] text-sky-600 italic">want</span>
                                  )}
                                </div>
                                {card.courseName && (
                                  <div className="text-[10px] text-gray-500 leading-tight">{card.courseName}</div>
                                )}
                                {options.showTags && allDisplayTags.length > 0 && (
                                  <div className="flex flex-wrap gap-0.5 mt-0.5">
                                    {allDisplayTags.map(tag => {
                                      const colors = TAG_COLORS[tag as keyof typeof TAG_COLORS];
                                      if (!colors) return null;
                                      return (
                                        <span key={tag} className={`text-[8px] font-bold px-1 py-px rounded ${colors.bg} ${colors.text}`}>
                                          {TAG_DISPLAY[tag as keyof typeof TAG_DISPLAY] ?? tag}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                                {options.showNotes && card.notes && (
                                  <div className="text-[9px] text-gray-400 italic leading-tight mt-0.5">{card.notes}</div>
                                )}
                              </div>
                            );
                          })}
                          {qUnits > 0 && (
                            <div className="text-[9px] text-gray-400 pt-1 border-t border-gray-100">{qUnits} units</div>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Unscheduled */}
      {(() => {
        const unsorted = orderedCardsFor(cards, cardOrder, 'unsorted');
        return unsorted.length > 0 ? (
          <section className="mb-8">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Unscheduled</h2>
            <div className="flex flex-wrap gap-1.5">
              {unsorted.map(card => (
                <span key={card.id} className="text-[11px] bg-gray-100 rounded px-2 py-0.5 text-gray-700">
                  {card.department} {card.courseNumber}{card.courseName ? `: ${card.courseName}` : ''}{card.units != null ? ` (${card.units} units)` : ''}
                </span>
              ))}
            </div>
          </section>
        ) : null;
      })()}

      {/* Full planning sections */}
      {mode === 'full' && (
        <>
          {options.showMajor && config && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Major Requirements</h2>
                  <h3 className="text-xs font-bold text-gray-600 mt-0.5">{config.name}</h3>
                </div>
                <span className={`text-xs font-semibold ${majorFilled >= majorNeeded ? 'text-green-600' : 'text-gray-500'}`}>
                  {majorFilled}/{majorNeeded} {majorFilled >= majorNeeded ? '✓' : ''}
                </span>
              </div>
              <div className="space-y-3">
                {majorRequirementItems.map(item => {
                  if (item.kind === 'meta') {
                    return <PrintMetaRequirementsPanel key="meta-requirements" requirements={majorMetaRequirements} counts={majorMetaCounts} />;
                  }
                  const { section } = item;
                  const { needed: sNeeded, filled: sFilled } = countSectionSlots(section, assignments, manualSlotFills);
                  const hasRequirement = sectionHasRequirement(section);
                  const sComplete = hasRequirement
                    && (sNeeded === 0 || sFilled >= sNeeded)
                    && isSectionVerificationComplete(section, assignments, manualSlotFills);
                  const stateStyles = getRequirementStateStyles(hasRequirement ? sComplete : null);
                  return (
                    <div key={section.id} className={`rounded border overflow-hidden ${stateStyles.panel}`}>
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className={`text-xs font-bold ${stateStyles.title}`}>{section.name}</span>
                        <span className={`text-[11px] font-semibold ${stateStyles.count}`}>
                          {sFilled}/{sNeeded}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {section.slots.filter(s => !s.optional).map(slot => {
                          const assigned = assignments.get(slot.id) ?? [];
                          const needed = slot.times ?? slot.count ?? 1;
                          const isManual = slot.type === 'any-approved' || slot.type === 'manual';
                          const manualFill = isManual ? manualSlotFills[slot.id] : null;
                          const complete = isManual
                            ? Math.min(needed, assigned.length + getManualSlotFilledCount(slot, manualFill ?? undefined, assigned)) >= needed
                            : assigned.length >= needed;
                          return (
                            <div key={slot.id} className="flex items-start gap-2 px-3 py-1.5">
                              <span className={`text-[11px] shrink-0 mt-0.5 ${complete ? 'text-green-500' : 'text-gray-300'}`}>
                                {complete ? '✓' : '○'}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className={`text-[11px] ${complete ? 'text-green-800 font-medium' : 'text-gray-600'}`}>
                                  {slot.label}
                                </span>
                                {assigned.length > 0 && (
                                  <span className="ml-2">
                                    {assigned.map((s: Satisfier) => (
                                      <span key={s.kind === 'card' ? s.card.id : s.id}
                                        className={`text-[10px] px-1.5 py-0.5 rounded mr-1 ${s.kind === 'card' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                        {s.kind === 'card' ? `${s.card.department} ${s.card.courseNumber}` : `${s.dept} ${s.number} (${s.kind})`}
                                      </span>
                                    ))}
                                  </span>
                                )}
                                {isManual && manualFill?.checked && manualFill.note && (
                                  <span className="text-[10px] text-green-700 ml-1">{manualFill.note}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {options.showAdditionalMajors && additionalMajorData.length > 0 && (
            <section className="mb-8">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Additional Major Requirements</h2>
              {additionalMajorData.map(({ am, name, isDouble, amAssignments, fills, sections, needed, filled }) => (
                <div key={am.id} className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xs font-bold text-gray-600">{name}</h3>
                      <span className="text-[10px] text-gray-400">{isDouble ? 'Double major' : 'Secondary major'}</span>
                    </div>
                    <span className={`text-xs font-semibold ${filled >= needed ? 'text-green-600' : 'text-gray-500'}`}>
                      {filled}/{needed} {filled >= needed ? '✓' : ''}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {sections.map(section => {
                      const { needed: sNeeded, filled: sFilled } = countSectionSlots(section, amAssignments, fills);
                      const hasRequirement = sectionHasRequirement(section);
                      const sComplete = hasRequirement
                        && (sNeeded === 0 || sFilled >= sNeeded)
                        && isSectionVerificationComplete(section, amAssignments, fills);
                      const stateStyles = getRequirementStateStyles(hasRequirement ? sComplete : null);
                      return (
                        <div key={section.id} className={`rounded border overflow-hidden ${stateStyles.panel}`}>
                          <div className="flex items-center justify-between px-3 py-1.5">
                            <span className={`text-xs font-bold ${stateStyles.title}`}>{section.name}</span>
                            <span className={`text-[11px] font-semibold ${stateStyles.count}`}>{sFilled}/{sNeeded}</span>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {section.slots.filter(s => !s.optional).map(slot => {
                              const assigned = amAssignments.get(slot.id) ?? [];
                              const needed = slot.times ?? slot.count ?? 1;
                              const isManual = slot.type === 'any-approved' || slot.type === 'manual';
                              const manualFill = isManual ? fills[slot.id] : null;
                              const complete = isManual
                                ? Math.min(needed, assigned.length + getManualSlotFilledCount(slot, manualFill ?? undefined, assigned)) >= needed
                                : assigned.length >= needed;
                              return (
                                <div key={slot.id} className="flex items-start gap-2 px-3 py-1.5">
                                  <span className={`text-[11px] shrink-0 mt-0.5 ${complete ? 'text-green-500' : 'text-gray-300'}`}>{complete ? '✓' : '○'}</span>
                                  <div className="flex-1 min-w-0">
                                    <span className={`text-[11px] ${complete ? 'text-green-800 font-medium' : 'text-gray-600'}`}>{slot.label}</span>
                                    {assigned.length > 0 && (
                                      <span className="ml-2">
                                        {assigned.map((s: Satisfier) => (
                                          <span key={s.kind === 'card' ? s.card.id : s.id}
                                            className={`text-[10px] px-1.5 py-0.5 rounded mr-1 ${s.kind === 'card' ? 'bg-teal-100 text-teal-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                            {s.kind === 'card' ? `${s.card.department} ${s.card.courseNumber}` : `${s.dept} ${s.number} (${s.kind})`}
                                          </span>
                                        ))}
                                      </span>
                                    )}
                                    {isManual && manualFill?.checked && manualFill.note && (
                                      <span className="text-[10px] text-green-700 ml-1">{manualFill.note}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          )}

          {options.showMinors && selectedMinors.length > 0 && (
            <section className="mb-8">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Minor Requirements</h2>
              {selectedMinors.map(minor => {
                const minorAssignments = computeAssignments(minor, enrolledCards, testSatisfiers, majorExcludeIds);
                const minorFills = manualMinorSlotFills[minor.id] ?? {};
                const { needed: mNeeded, filled: mFilled } = countSections(minor.sections, minorAssignments, minorFills);
                return (
                  <div key={minor.id} className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-gray-600">{minor.name}</h3>
                      <span className={`text-xs font-semibold ${mFilled >= mNeeded ? 'text-green-600' : 'text-gray-500'}`}>
                        {mFilled}/{mNeeded} {mFilled >= mNeeded ? '✓' : ''}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {minor.sections.map(section => {
                        const { needed: sNeeded, filled: sFilled } = countSectionSlots(section, minorAssignments, minorFills);
                        const hasRequirement = sectionHasRequirement(section);
                        const sComplete = hasRequirement
                          && (sNeeded === 0 || sFilled >= sNeeded)
                          && isSectionVerificationComplete(section, minorAssignments, minorFills);
                        const stateStyles = getRequirementStateStyles(hasRequirement ? sComplete : null);
                        return (
                          <div key={section.id} className={`rounded border overflow-hidden ${stateStyles.panel}`}>
                            <div className="flex items-center justify-between px-3 py-1.5">
                              <span className={`text-xs font-bold ${stateStyles.title}`}>{section.name}</span>
                              <span className={`text-[11px] font-semibold ${stateStyles.count}`}>{sFilled}/{sNeeded}</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {section.slots.filter(s => !s.optional).map(slot => {
                                const assigned = minorAssignments.get(slot.id) ?? [];
                                const needed = slot.times ?? slot.count ?? 1;
                                const isManual = slot.type === 'any-approved' || slot.type === 'manual';
                                const manualFill = isManual ? minorFills[slot.id] : null;
                                const complete = isManual
                                  ? Math.min(needed, assigned.length + getManualSlotFilledCount(slot, manualFill ?? undefined, assigned)) >= needed
                                  : assigned.length >= needed;
                                return (
                                  <div key={slot.id} className="flex items-start gap-2 px-3 py-1.5">
                                    <span className={`text-[11px] shrink-0 mt-0.5 ${complete ? 'text-green-500' : 'text-gray-300'}`}>{complete ? '✓' : '○'}</span>
                                    <div className="flex-1 min-w-0">
                                      <span className={`text-[11px] ${complete ? 'text-green-800 font-medium' : 'text-gray-600'}`}>{slot.label}</span>
                                      {assigned.length > 0 && (
                                        <span className="ml-2">
                                          {assigned.map((s: Satisfier) => (
                                            <span key={s.kind === 'card' ? s.card.id : s.id}
                                              className={`text-[10px] px-1.5 py-0.5 rounded mr-1 ${s.kind === 'card' ? 'bg-teal-100 text-teal-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                              {s.kind === 'card' ? `${s.card.department} ${s.card.courseNumber}` : `${s.dept} ${s.number} (${s.kind})`}
                                            </span>
                                          ))}
                                        </span>
                                      )}
                                      {isManual && manualFill?.checked && manualFill.note && (
                                        <span className="text-[10px] text-green-700 ml-1">{manualFill.note}</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {options.showCoterm && isCoterm && cotermConfig && (
            <section className="mb-8">
              {(() => {
                const activeCotermTrack = cotermConfig.tracks?.find(track => track.id === selectedTracks[cotermConfig.id]);
                const cotermSections = getEffectiveProgramSections(cotermConfig, selectedTracks).filter(
                  section => !section.trackSelector && !section.selectorOptions?.length,
                );
                const effectiveCotermConfig = { ...cotermConfig, sections: cotermSections };
                const cotermAssignments = computeAssignments(effectiveCotermConfig, enrolledCards, testSatisfiers, majorExcludeIds);
                const cotermFills = manualMinorSlotFills[cotermConfig.id] ?? {};
                const cotermSlotProgress = countSections(cotermSections, cotermAssignments, cotermFills);
                const cotermMetaRequirements = getProgramMetaRequirements(cotermConfig);
                const cotermMetaCounts = getMetaRequirementCounts(cotermMetaRequirements, cotermAssignments);
                const cNeeded = cotermSlotProgress.needed
                  + cotermMetaRequirements.reduce((sum, meta) => sum + meta.minCount, 0);
                const cFilled = cotermSlotProgress.filled
                  + cotermMetaRequirements.reduce(
                    (sum, meta) => sum + Math.min(cotermMetaCounts[meta.id] ?? 0, meta.minCount),
                    0,
                  );
                const trackUnits = activeCotermTrack
                  ? requirementUnits(activeCotermTrack.sections, cotermAssignments, cotermFills, enrolledCards)
                  : 0;
                const sectionUnitsComplete = cotermSections.every(section =>
                  !section.minUnits || requirementUnits([section], cotermAssignments, cotermFills, enrolledCards) >= section.minUnits
                );
                const trackUnitsComplete = !activeCotermTrack?.minUnits || trackUnits >= activeCotermTrack.minUnits;
                const cotermComplete = cFilled >= cNeeded && sectionUnitsComplete && trackUnitsComplete;
                return (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Coterm Requirements</h2>
                      <span className={`text-xs font-semibold ${cotermComplete ? 'text-green-600' : 'text-gray-500'}`}>
                        {cFilled}/{cNeeded} {cotermComplete ? '✓' : ''}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{cotermConfig.name}</p>
                    {activeCotermTrack?.minUnits && (
                      <p className={`text-[10px] mb-3 ${trackUnitsComplete ? 'text-green-600' : 'text-amber-700'}`}>
                        {activeCotermTrack.name}: {trackUnits}/{activeCotermTrack.minUnits} depth units
                      </p>
                    )}
                    <div className="space-y-3">
                      {cotermSections.map(section => {
                        const { needed: sNeeded, filled: sFilled } = countSectionSlots(section, cotermAssignments, cotermFills);
                        const hasRequirement = sectionHasRequirement(section);
                        const units = section.minUnits ? requirementUnits([section], cotermAssignments, cotermFills, enrolledCards) : 0;
                        const sComplete = hasRequirement
                          && (sNeeded === 0 || sFilled >= sNeeded)
                          && (!section.minUnits || units >= section.minUnits)
                          && isSectionVerificationComplete(section, cotermAssignments, cotermFills);
                        const stateStyles = getRequirementStateStyles(hasRequirement ? sComplete : null);
                        return (
                          <div key={section.id} className={`rounded border overflow-hidden ${stateStyles.panel}`}>
                            <div className="flex items-center justify-between px-3 py-2">
                              <span className={`text-xs font-bold ${stateStyles.title}`}>{section.name}</span>
                              {hasRequirement && <span className={`text-[11px] font-semibold ${stateStyles.count}`}>{sFilled}/{sNeeded}</span>}
                            </div>
                            {section.minUnits && (
                              <p className={`px-3 pb-1 text-[10px] ${units >= section.minUnits ? 'text-green-600' : 'text-amber-700'}`}>
                                {units}/{section.minUnits} units
                              </p>
                            )}
                            {section.note && (
                              <p className="px-3 pb-2 text-[10px] leading-relaxed text-gray-500">{section.note}</p>
                            )}
                            <div className="divide-y divide-gray-100">
                              {section.slots.filter(s => !s.optional).map(slot => {
                                const assigned = cotermAssignments.get(slot.id) ?? [];
                                const needed = slot.times ?? slot.count ?? 1;
                                const isManual = slot.type === 'any-approved' || slot.type === 'manual';
                                const manualFill = isManual ? cotermFills[slot.id] : null;
                                const complete = isManual
                                  ? Math.min(needed, assigned.length + getManualSlotFilledCount(slot, manualFill ?? undefined, assigned)) >= needed
                                  : assigned.length >= needed;
                                return (
                                  <div key={slot.id} className="flex items-start gap-2 px-3 py-1.5">
                                    <span className={`text-[11px] shrink-0 mt-0.5 ${complete ? 'text-green-500' : 'text-gray-300'}`}>{complete ? '✓' : '○'}</span>
                                    <div className="flex-1 min-w-0">
                                      <span className={`text-[11px] ${complete ? 'text-green-800 font-medium' : 'text-gray-600'}`}>{slot.label}</span>
                                      {assigned.length > 0 && (
                                        <span className="ml-2">
                                          {assigned.map((s: Satisfier) => (
                                            <span key={s.kind === 'card' ? s.card.id : s.id}
                                              className={`text-[10px] px-1.5 py-0.5 rounded mr-1 ${s.kind === 'card' ? 'bg-sky-100 text-sky-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                              {s.kind === 'card' ? `${s.card.department} ${s.card.courseNumber}` : `${s.dept} ${s.number} (${s.kind})`}
                                            </span>
                                          ))}
                                        </span>
                                      )}
                                      {isManual && manualFill?.checked && manualFill.note && (
                                        <span className="text-[10px] text-green-700 ml-1">{manualFill.note}</span>
                                      )}
                                      {slot.note && <p className="text-[9px] text-gray-500 mt-0.5 leading-relaxed">{slot.note}</p>}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                      {cotermMetaRequirements.length > 0 && (
                        <PrintMetaRequirementsPanel requirements={cotermMetaRequirements} counts={cotermMetaCounts} />
                      )}
                    </div>
                  </>
                );
              })()}
            </section>
          )}

          {options.showWays && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Ways of Thinking / Ways of Doing</h2>
                <span className={`text-xs font-semibold ${totalWaysCovered >= 11 ? 'text-green-600' : 'text-gray-500'}`}>
                  {totalWaysCovered}/11 {totalWaysCovered >= 11 ? '✓' : ''}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {WAYS_CONFIG.map(w => {
                  const wc = cardsByWay.get(w.id) ?? [];
                  const tf = transferTagCounts.get(w.id) ?? 0;
                  const units = wc.reduce((s, c) => s + (c.units ?? 0), 0);
                  const filled = w.unitsRequired
                    ? ((units + (tf > 0 ? w.unitsRequired : 0)) >= w.unitsRequired ? 1 : 0)
                    : Math.min(wc.length + tf, w.slots);
                  const needed = w.unitsRequired ? 1 : w.slots;
                  const complete = filled >= needed;
                  const { bg, text } = TAG_COLORS[w.id as keyof typeof TAG_COLORS] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };
                  return (
                    <div key={w.id} className={`rounded border p-2 ${complete ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${bg} ${text}`}>{w.id}</span>
                        <span className={`text-[10px] font-semibold ${complete ? 'text-green-600' : 'text-gray-400'}`}>
                          {w.unitsRequired ? `${units}/${w.unitsRequired} units` : `${Math.min(wc.length + tf, w.slots)}/${needed}`}
                        </span>
                      </div>
                      <p className="text-[9px] text-gray-500 leading-tight mb-1">{w.label}</p>
                      {wc.map(c => (
                        <div key={c.id} className="text-[10px] text-gray-700 leading-tight">
                          <span className="font-medium">{c.department} {c.courseNumber}</span>
                          {c.units != null && <span className="text-gray-400"> ({c.units} units)</span>}
                        </div>
                      ))}
                      {wc.length === 0 && <div className="text-[10px] text-gray-300 italic">not planned</div>}
                    </div>
                  );
                })}
              </div>
              {multiWayCards.length > 0 && (
                <div className="mt-2 p-2 bg-violet-50 border border-violet-200 rounded text-[10px] text-violet-700">
                  <span className="font-semibold">Fulfills multiple ways</span>, drag to commit to one:{' '}
                  {multiWayCards.map(c => `${c.department} ${c.courseNumber} (${c.tags.filter(t => WAY_TAGS.includes(t as WayTag)).join('/')})`).join(' · ')}
                </div>
              )}
            </section>
          )}

          {options.showGenEd && (
            <section className="mb-8">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">COLLEGE, Language &amp; Writing</h2>
              <div className="grid grid-cols-3 gap-2">
                {GEN_ED_CONFIG.map(cfg => {
                  const cfgCards = enrolledCards.filter(card =>
                    cfg.tag === 'WIM'
                      ? cardSatisfiesWim(card, config?.wimCourses)
                      : card.tags.includes(cfg.tag as never),
                  );
                  const testCount = cfg.fulfillsLang ? langTestFulfillments.length : 0;
                  const transferCount = transferTagCounts.get(cfg.tag) ?? 0;
                  const complete = cfg.noCounter
                    ? testCount > 0 || transferCount > 0 || cfgCards.length >= cfg.needed
                    : (cfgCards.length + testCount + transferCount) >= cfg.needed;
                  const { bg, text, border } = TAG_COLORS[cfg.tag as keyof typeof TAG_COLORS] ?? { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
                  return (
                    <div key={cfg.tag} className={`rounded border p-2 ${complete ? 'border-green-200 bg-green-50/50' : `border ${border}`}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${bg} ${text}`}>{cfg.display}</span>
                        <span className={`text-[10px] font-semibold ${complete ? 'text-green-600' : 'text-gray-400'}`}>
                          {cfg.noCounter ? (complete ? '✓' : '-') : `${cfgCards.length + testCount + transferCount}/${cfg.needed}`}
                        </span>
                      </div>
                      <p className="text-[9px] text-gray-500 leading-tight mb-1">{cfg.sublabel}</p>
                      {langTestFulfillments.length > 0 && cfg.fulfillsLang && (
                        <div className="space-y-0.5 mb-1">
                          {langTestFulfillments.map(l => (
                            <div key={l} className="text-[10px] text-green-700 leading-tight">✓ {l} <span className="text-gray-400">(test credit)</span></div>
                          ))}
                        </div>
                      )}
                      {cfgCards.map(c => (
                        <div key={c.id} className="text-[10px] text-gray-700 leading-tight">
                          <span className="font-medium">{c.department} {c.courseNumber}</span>
                          {c.courseName && <span className="text-gray-500">: {c.courseName}</span>}
                        </div>
                      ))}
                      {cfgCards.length === 0 && testCount === 0 && (
                        <div className="text-[10px] text-gray-300 italic">not planned</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {options.showTestCredits && checkedTestGroups.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">AP / IB / Test Credits</h2>
                <span className="text-xs font-semibold text-gray-500">+{testUnits} units</span>
              </div>
              <div className="space-y-1">
                {checkedTestGroups.map(({ group, scoreStr, opt }) => (
                  <div key={group.id} className="flex items-start gap-2 py-1 border-b border-gray-100 last:border-0">
                    <span className="text-[11px] text-green-500 shrink-0">✓</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-semibold text-gray-800">{group.subject}</span>
                      <span className="text-[11px] text-gray-500 ml-1.5">Score {scoreStr}</span>
                      {opt.units > 0 && (
                        <span className="text-[10px] text-gray-400 ml-1.5">{opt.units} units</span>
                      )}
                      {opt.courses && (
                        <div className="text-[10px] text-gray-500 mt-0.5">Counts as: {opt.courses}</div>
                      )}
                      {group.fulfillsLang && (
                        <div className="text-[10px] text-orange-600 mt-0.5">Fulfills Language GER</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="border-t-2 border-gray-200 pt-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total planned units</span>
              <span className={`text-sm font-bold ${totalUnits + testUnits >= 180 ? 'text-green-600' : 'text-gray-800'}`}>
                {totalUnits + testUnits} / 180
                {totalUnits + testUnits >= 180 ? ' ✓' : ` (${180 - totalUnits - testUnits} remaining)`}
              </span>
            </div>
            {testUnits > 0 && (
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">Course credits + test credits</span>
                <span className="text-xs text-gray-400">{totalUnits} + {testUnits}</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* PDF footer */}
      <div className="mt-8 pt-3 border-t border-gray-100 flex items-center gap-1">
        <span className="text-[9px] text-gray-400">Plan your Stanford degree free at</span>
        <span className="text-[9px] text-gray-500 font-medium">{SITE_URL}</span>
      </div>
    </>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-1.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-3 h-3 rounded accent-gray-700 cursor-pointer"
      />
      <span className="text-[11px] text-gray-500">{label}</span>
    </label>
  );
}

async function generatePDF(previewEl: HTMLElement): Promise<Blob> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);
  const printBackground =
    getComputedStyle(previewEl).getPropertyValue('--print-background').trim() || '#ffffff';
  const canvas = await html2canvas(previewEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: printBackground,
  });
  const imgData = canvas.toDataURL('image/jpeg', 0.92);
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgH = (canvas.height / canvas.width) * pageW;
  let y = 0;
  while (y < imgH) {
    if (y > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, -y, pageW, imgH);
    y += pageH;
  }
  return pdf.output('blob');
}

export function PrintView({ onClose }: Props) {
  const [mode, setMode] = useState<'grid' | 'full'>('grid');
  const [options, setOptions] = useState<DocOptions>({
    showTags: false,
    showNotes: true,
    showMajor: true,
    showAdditionalMajors: true,
    showMinors: true,
    showCoterm: true,
    showWays: true,
    showGenEd: true,
    showTestCredits: true,
  });
  const [sharing, setSharing] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pdfFilename, setPdfFilename] = useState('grad-tree-degree-plan');
  const previewRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);
  const shareMsg = 'Plan your Stanford degree for free with Grad Tree';
  const normalizedPdfFilename = () => {
    const withoutExtension = pdfFilename.trim().replace(/\.pdf$/i, '');
    const safeName = withoutExtension
      // Control characters are stripped deliberately: they are illegal in
      // filenames on Windows and silently corrupt the download on macOS.
      // eslint-disable-next-line no-control-regex
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
      .replace(/\s+/g, ' ')
      .replace(/-+/g, '-')
      .trim();
    return `${safeName || 'grad-tree-degree-plan'}.pdf`;
  };

  useEffect(() => {
    if (!shareOpen) return;
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [shareOpen]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', SITE_URL);
    }
  };

  const sharePlatforms = [
    { label: 'Messages', icon: <MessageSquare size={13} />, bg: 'social-messages', action: () => window.open(`sms:&body=${encodeURIComponent(`${shareMsg} ${SITE_URL}`)}`) },
    { label: 'WhatsApp', icon: <WhatsAppIcon />, bg: 'social-whatsapp', action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${shareMsg} ${SITE_URL}`)}`) },
    { label: 'Telegram', icon: <TelegramIcon />, bg: 'social-telegram', action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(shareMsg)}`) },
    { label: 'Email', icon: <Mail size={13} />, bg: 'social-email', action: () => window.open(`mailto:?subject=${encodeURIComponent('My Grad Tree Degree Plan')}&body=${encodeURIComponent(`${shareMsg}\n\n${SITE_URL}`)}`) },
    { label: 'X', icon: <XIcon />, bg: 'social-x', action: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareMsg)}&url=${encodeURIComponent(SITE_URL)}`) },
    { label: 'Reddit', icon: <RedditIcon />, bg: 'social-reddit', action: () => window.open(`https://reddit.com/submit?url=${encodeURIComponent(SITE_URL)}&title=${encodeURIComponent(shareMsg)}`) },
    { label: 'Facebook', icon: <FacebookIcon />, bg: 'social-facebook', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`) },
    { label: 'LinkedIn', icon: <LinkedInIcon />, bg: 'social-linkedin', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`) },
  ];

  const toggle = (key: keyof DocOptions) =>
    setOptions(o => ({ ...o, [key]: !o[key] }));

  const savePDF = async () => {
    if (!previewRef.current || sharing) return;
    setSharing(true);
    try {
      const blob = await generatePDF(previewRef.current);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = normalizedPdfFilename();
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setSharing(false);
    }
  };

  const sharePDFNative = async () => {
    if (!previewRef.current || sharing) return;
    setSharing(true);
    try {
      const blob = await generatePDF(previewRef.current);
      const filename = normalizedPdfFilename();
      const file = new File([blob], filename, { type: 'application/pdf' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          url: SITE_URL,
          title: 'My Grad Tree Degree Plan',
          text: shareMsg,
        });
      } else {
        // Desktop fallback: download PDF then open share dropdown
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        setShareOpen(true);
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
        <div className="print-view-light bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col">

          {/* Modal header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-800">Print / Save as PDF</span>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs">
                <button
                  onClick={() => setMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${mode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <LayoutGrid size={12} /> Year by Year
                </button>
                <button
                  onClick={() => setMode('full')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border-l border-gray-200 transition-colors ${mode === 'full' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <LayoutList size={12} /> Full Planning
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShareOpen(true)}
                disabled={sharing}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Printer size={14} /> {sharing ? 'Generating…' : 'Save PDF'}
              </button>

              {/* Share PDF dropdown */}
              <div className="relative" ref={shareRef}>
                <button
                  onClick={() => setShareOpen(v => !v)}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-cardinal-700 text-white text-sm font-medium rounded-lg hover:bg-cardinal-800 transition-colors"
                >
                  <Share2 size={14} /> Share PDF
                </button>
                {shareOpen && (
                  <div className="print-share-popover solid-ui absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50">
                    <label className="block mb-3">
                      <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        PDF filename
                      </span>
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden">
                        <input
                          value={pdfFilename}
                          onChange={event => setPdfFilename(event.target.value.replace(/\.pdf$/i, ''))}
                          onFocus={event => event.currentTarget.select()}
                          className="min-w-0 flex-1 border-0 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none"
                          aria-label="PDF filename"
                        />
                        <span className="pr-2.5 text-xs text-gray-400">.pdf</span>
                      </div>
                    </label>
                    <button
                      onClick={() => { setShareOpen(false); savePDF(); }}
                      disabled={sharing}
                      className="w-full flex items-center justify-center gap-1.5 mb-2 px-3 py-2 bg-gray-800 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <Printer size={12} /> {sharing ? 'Generating…' : 'Save PDF'}
                    </button>
                    {'share' in navigator && (
                      <button
                        onClick={() => { setShareOpen(false); sharePDFNative(); }}
                        disabled={sharing}
                        className="w-full flex items-center justify-center gap-1.5 mb-3 px-3 py-2 bg-cardinal-700 text-white text-xs font-medium rounded-lg hover:bg-cardinal-800 transition-colors disabled:opacity-50"
                      >
                        <Share2 size={12} /> {sharing ? 'Generating…' : 'Share PDF file'}
                      </button>
                    )}
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">Share link</p>
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[10px] text-gray-600 truncate font-mono">
                        {SITE_URL}
                      </div>
                      <button
                        onClick={copyLink}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors shrink-0 ${
                          copied ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-800 text-white border-transparent hover:bg-gray-700'
                        }`}
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {sharePlatforms.map(p => (
                        <button
                          key={p.label}
                          onClick={p.action}
                          className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-white text-[10px] font-medium transition-colors ${p.bg}`}
                        >
                          {p.icon}
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Options strip */}
          <div className="flex items-center gap-4 px-5 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
            {mode === 'grid' ? (
              <div className="flex items-center gap-4">
                <Checkbox checked={options.showTags} onChange={() => toggle('showTags')} label="Gen ed / way tags" />
                <Checkbox checked={options.showNotes} onChange={() => toggle('showNotes')} label="Course notes" />
              </div>
            ) : (
              <>
                <Checkbox checked={options.showMajor} onChange={() => toggle('showMajor')} label="Major" />
                <Checkbox checked={options.showAdditionalMajors} onChange={() => toggle('showAdditionalMajors')} label="Additional Majors" />
                <Checkbox checked={options.showMinors} onChange={() => toggle('showMinors')} label="Minors" />
                <Checkbox checked={options.showCoterm} onChange={() => toggle('showCoterm')} label="Coterm" />
                <Checkbox checked={options.showWays} onChange={() => toggle('showWays')} label="Ways" />
                <Checkbox checked={options.showGenEd} onChange={() => toggle('showGenEd')} label="COLLEGE / Language / Writing" />
                <Checkbox checked={options.showTestCredits} onChange={() => toggle('showTestCredits')} label="AP/IB credits" />
              </>
            )}
          </div>

          {/* Preview area */}
          <div className="overflow-y-auto flex-1 min-h-0 p-6 bg-gray-50">
            <div ref={previewRef} className="pdf-document-surface bg-white shadow-sm rounded-xl p-8 mx-auto" style={{ maxWidth: 900, fontFamily: 'system-ui, sans-serif' }}>
              <PlanDocumentContent mode={mode} options={options} />
            </div>
          </div>

          <div className="px-5 py-2.5 border-t border-gray-100 shrink-0 text-[11px] text-gray-400 bg-gray-50 rounded-b-2xl">
            Tip: In the print dialog, choose "Save as PDF" and set margins to "Minimum" for the best result.
            {mode === 'grid' && ' Use landscape orientation.'}
          </div>
        </div>
      </div>

      {/* Print portal - hidden in browser, shown during @media print via index.css */}
      {createPortal(
        <div id="sp-print-root" className="print-view-light" style={{ display: 'none', fontFamily: 'system-ui, sans-serif', padding: '32px', background: 'var(--print-background)' }}>
          <PlanDocumentContent mode={mode} options={options} />
        </div>,
        document.body
      )}
    </>
  );
}
