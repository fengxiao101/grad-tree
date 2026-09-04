import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  GraduationCap, ChevronDown, ChevronRight, BookMarked, Layers, Loader2, ExternalLink } from 'lucide-react';
import { type CatalogCourse } from '../data/catalog';
import { CollapsibleHeader } from './major/CollapsibleHeader';
import { ProgramBlock } from './major/ProgramBlock';
import { MinorAdderRow, ProgramSelectorRow, SearchableSelect, SingleProgramPane } from './major/ProgramSelector';
import { configsToOptions } from './major/programOptions';
import { usePlannerStore } from '../store/usePlannerStore';
import {
  BUILT_IN_COTERM_OPTIONS,
  BUILT_IN_MAJOR_OPTIONS,
  BUILT_IN_MINOR_OPTIONS } from '../data/programRegistry';
import { useProgramConfig, useProgramConfigs } from '../hooks/useProgramConfigs';
import { getTestCreditSatisfiers, getTransferSatisfiers } from '../data/testCreditUtils';
import { getPendingRequirementReveal, onRequirementReveal } from '../utils/requirementNavigation';
import type { Satisfier } from '../data/testCreditUtils';
import {
  type Affiliation,
  type CourseCard,
  type RequirementAssignment } from '../types';
import {
  computeAssignments,
  countSections,
  getExcludeCardIds,
  getPinnedShareableCardIds,
  getShareableCardIds,
  getManualExcludeCardIds,
  getProgramSections,
  getEffectiveProgramSections } from '../utils/majorUtils';

// ── Helpers ───────────────────────────────────────────────────────────────────


// ── Shared accent color classes ───────────────────────────────────────────────


// ── Collapsible section header ────────────────────────────────────────────────


// ── Course hover card portal ──────────────────────────────────────────────────


// ── Course chip ───────────────────────────────────────────────────────────────




// ── Slot row ──────────────────────────────────────────────────────────────────




// ── Pick-one-group section ────────────────────────────────────────────────────


// ── Section panel ─────────────────────────────────────────────────────────────


// ── Track-selector depth section ──────────────────────────────────────────────



// ── Dark mode detection & color utilities ─────────────────────────────────────



// ── Program block ─────────────────────────────────────────────────────────────



// ── Searchable program selector ───────────────────────────────────────────────







// ── Program selector row (major / coterm) ─────────────────────────────────────


// ── Minor adder row ───────────────────────────────────────────────────────────


// ── Single-program pane (shared by Major and Coterm) ────────────────────────



// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  cards: CourseCard[];
  onAddCourse?: (course: CatalogCourse, target?: RequirementAssignment) => void;
  onOpenSearch?: (slotId: string, affiliation?: Affiliation, programId?: string) => void;
}

export function MajorSection({ cards, onAddCourse, onOpenSearch }: Props) {
  const scenarios             = usePlannerStore(s => s.scenarios);
  const activeScenarioId      = usePlannerStore(s => s.activeScenarioId);
  const activeScenarioColor   = scenarios.find(sc => sc.id === activeScenarioId)?.color;
  const selectedMajorId       = usePlannerStore(s => s.selectedMajorId);
  const setMajor              = usePlannerStore(s => s.setMajor);
  const manualSlotFills       = usePlannerStore(s => s.manualSlotFills);
  const setManualSlotFill     = usePlannerStore(s => s.setManualSlotFill);

  const selectedMinorIds      = usePlannerStore(s => s.selectedMinorIds);
  const addMinor              = usePlannerStore(s => s.addMinor);
  const removeMinor           = usePlannerStore(s => s.removeMinor);
  const manualMinorSlotFills  = usePlannerStore(s => s.manualMinorSlotFills);
  const setManualMinorSlotFill = usePlannerStore(s => s.setManualMinorSlotFill);

  const selectedCotermId      = usePlannerStore(s => s.selectedCotermId);
  const setCoterm             = usePlannerStore(s => s.setCoterm);

  const additionalMajors      = usePlannerStore(s => s.additionalMajors);
  const manualAdditionalMajorSlotFills = usePlannerStore(s => s.manualAdditionalMajorSlotFills);
  const addAdditionalMajor    = usePlannerStore(s => s.addAdditionalMajor);
  const removeAdditionalMajor = usePlannerStore(s => s.removeAdditionalMajor);
  const setAdditionalMajorKind = usePlannerStore(s => s.setAdditionalMajorKind);
  const setManualAdditionalMajorSlotFill = usePlannerStore(s => s.setManualAdditionalMajorSlotFill);

  const testCreditChecks      = usePlannerStore(s => s.testCreditChecks);
  const transferCredits       = usePlannerStore(s => s.transferCredits);
  const selectedTracks        = usePlannerStore(s => s.selectedTracks);

  const [sectionCollapsed, setSectionCollapsed] = useState(false);
  const [majorCollapsed, setMajorCollapsed] = useState(false);
  const [additionalMajorsCollapsed, setAdditionalMajorsCollapsed] = useState(true);
  const [minorsCollapsed, setMinorsCollapsed] = useState(true);
  const [cotermCollapsed, setCotermCollapsed] = useState(true);

  useEffect(() => {
    const revealProgramArea = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (!detail || !['major', 'minor', 'coterm'].includes(detail.area)) return;
      setSectionCollapsed(false);
      if (detail.area === 'major') {
        const isAdditional = detail.programId && additionalMajors.some(am => am.id === detail.programId);
        if (isAdditional) setAdditionalMajorsCollapsed(false);
        else setMajorCollapsed(false);
      }
      if (detail.area === 'minor') setMinorsCollapsed(false);
      if (detail.area === 'coterm') setCotermCollapsed(false);
    };
    revealProgramArea(getPendingRequirementReveal());
    return onRequirementReveal(revealProgramArea);
  }, [additionalMajors]);

  const majorConfig = useProgramConfig(selectedMajorId);
  const selectedMinors = useProgramConfigs(selectedMinorIds);
  const cotermConfig = useProgramConfig(selectedCotermId);
  const additionalMajorIds = useMemo(() => additionalMajors.map(am => am.id), [additionalMajors]);
  const additionalMajorConfigs = useProgramConfigs(additionalMajorIds);

  const testSatisfiers = useMemo(
    () => [...getTestCreditSatisfiers(testCreditChecks), ...getTransferSatisfiers(transferCredits)],
    [testCreditChecks, transferCredits],
  );

  const effectiveMajorConfig = useMemo(() => {
    if (!majorConfig) return null;
    return { ...majorConfig, sections: getEffectiveProgramSections(majorConfig, selectedTracks) };
  }, [majorConfig, selectedTracks]);
  const configuredShareableIds = useMemo(
    () => getPinnedShareableCardIds(
      [
        ...(effectiveMajorConfig ? [effectiveMajorConfig] : []),
        ...selectedMinors.map(minor => ({
          ...minor,
          sections: getEffectiveProgramSections(minor, selectedTracks),
        })),
        ...(cotermConfig ? [{
          ...cotermConfig,
          sections: getEffectiveProgramSections(cotermConfig, selectedTracks),
        }] : []),
        ...additionalMajorConfigs.map(am => ({
          ...am,
          sections: getEffectiveProgramSections(am, selectedTracks),
        })),
      ],
      cards,
    ),
    [effectiveMajorConfig, selectedMinors, cotermConfig, selectedTracks, cards, additionalMajorConfigs],
  );

  const majorAssignments = useMemo(
    () => effectiveMajorConfig
      ? computeAssignments(
          effectiveMajorConfig,
          cards,
          testSatisfiers,
          undefined,
          new Set<Affiliation>(['major']),
          configuredShareableIds,
        )
      : new Map<string, Satisfier[]>(),
    [effectiveMajorConfig, cards, testSatisfiers, configuredShareableIds],
  );
  const majorExcludeIds = useMemo(() => {
    const ids = effectiveMajorConfig ? getExcludeCardIds(effectiveMajorConfig, majorAssignments) : new Set<string>();
    if (effectiveMajorConfig) {
      for (const id of getManualExcludeCardIds(effectiveMajorConfig, manualSlotFills, cards)) ids.add(id);
    }
    return ids;
  }, [effectiveMajorConfig, majorAssignments, manualSlotFills, cards]);
  const majorShareableIds = useMemo(
    () => {
      const ids = new Set(configuredShareableIds);
      if (effectiveMajorConfig) {
        for (const id of getShareableCardIds(effectiveMajorConfig, majorAssignments)) ids.add(id);
      }
      return ids;
    },
    [configuredShareableIds, effectiveMajorConfig, majorAssignments],
  );

  const { additionalMajorAssignments, doubleMajorExcludeIds } = useMemo(() => {
    const assignments = new Map<string, Map<string, Satisfier[]>>();
    const doubleMajorExcludeIds = new Set<string>();
    let accumulatedExcludes = new Set<string>(majorExcludeIds);

    for (const am of additionalMajors) {
      const config = additionalMajorConfigs.find(c => c.id === am.id);
      if (!config) continue;
      const effectiveConfig = { ...config, sections: getEffectiveProgramSections(config, selectedTracks) };

      if (am.kind === 'double') {
        const fills = manualAdditionalMajorSlotFills[am.id] ?? {};
        const slotOverlapExceptions = new Set(
          Object.entries(fills).filter(([, f]) => f.checked).map(([slotId]) => slotId),
        );
        const a = computeAssignments(
          effectiveConfig, cards, testSatisfiers,
          accumulatedExcludes,
          new Set<Affiliation>(['double-major']),
          configuredShareableIds,
          slotOverlapExceptions.size > 0 ? slotOverlapExceptions : undefined,
        );
        assignments.set(am.id, a);
        for (const id of getExcludeCardIds(effectiveConfig, a)) {
          doubleMajorExcludeIds.add(id);
          accumulatedExcludes = new Set([...accumulatedExcludes, id]);
        }
      } else {
        // secondary: no excludes, no affiliation filter - full overlap with any program
        const a = computeAssignments(
          effectiveConfig, cards, testSatisfiers,
          undefined,
          undefined,
          configuredShareableIds,
        );
        assignments.set(am.id, a);
      }
    }

    return { additionalMajorAssignments: assignments, doubleMajorExcludeIds };
  }, [additionalMajors, additionalMajorConfigs, majorExcludeIds, cards, testSatisfiers, configuredShareableIds, selectedTracks, manualAdditionalMajorSlotFills]);

  const { minorAssignments, totalMinorExcludeIds, totalMinorShareableIds } = useMemo(() => {
    const minorAssignments = new Map<string, Map<string, Satisfier[]>>();
    const accumulated = new Set<string>([...majorExcludeIds, ...doubleMajorExcludeIds]);
    const accumulatedShareable = new Set<string>(majorShareableIds);
    for (const minor of selectedMinors) {
      const effectiveMinor = {
        ...minor,
        sections: getEffectiveProgramSections(minor, selectedTracks),
      };
      const a = computeAssignments(
        effectiveMinor,
        cards,
        testSatisfiers,
        accumulated,
        new Set<Affiliation>(['minor']),
        accumulatedShareable,
      );
      minorAssignments.set(minor.id, a);
      for (const id of getExcludeCardIds(effectiveMinor, a)) accumulated.add(id);
      for (const id of getShareableCardIds(effectiveMinor, a)) accumulatedShareable.add(id);
      const minorFills = manualMinorSlotFills[minor.id] ?? {};
      for (const id of getManualExcludeCardIds(effectiveMinor, minorFills, cards)) accumulated.add(id);
    }
    return {
      minorAssignments,
      totalMinorExcludeIds: accumulated,
      totalMinorShareableIds: accumulatedShareable,
    };
  }, [selectedMinors, cards, testSatisfiers, majorExcludeIds, doubleMajorExcludeIds, majorShareableIds, manualMinorSlotFills, selectedTracks]);

  const cotermManualFills = cotermConfig ? (manualMinorSlotFills[cotermConfig.id] ?? {}) : {};
  const cotermSetManualFill = useCallback(
    (slotId: string, fill: { checked?: boolean; note?: string }) => {
      if (cotermConfig) setManualMinorSlotFill(cotermConfig.id, slotId, fill);
    },
    [cotermConfig, setManualMinorSlotFill],
  );

  const majorSections = useMemo(() => effectiveMajorConfig ? getProgramSections(effectiveMajorConfig) : [], [effectiveMajorConfig]);
  const { filled: totalFilled, needed: totalNeeded } = countSections(majorSections, majorAssignments, manualSlotFills);

  void totalFilled; void totalNeeded;

  return (
    <section className="mb-8 sm:mb-12">
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSectionCollapsed(v => !v)}
            className="h-8 sm:h-auto flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          >
            {sectionCollapsed
              ? <ChevronRight size={14} className="text-gray-400" />
              : <ChevronDown size={14} className="text-gray-400" />}
            <GraduationCap size={15} className="text-gray-500" />
            <h2 className="font-serif font-semibold text-[17px] text-gray-900">Academic Programs</h2>
          </button>
        </div>
        <div className="h-px bg-gradient-to-r from-gray-300 to-transparent mt-2" />
      </div>

      {!sectionCollapsed && (
        <div className="space-y-8">

          {/* ── Major ────────────────────────────────────────────────────── */}
          <SingleProgramPane
            label="Major"
            icon={<BookMarked size={13} className="text-cardinal-600" />}
            collapsed={majorCollapsed}
            onToggle={() => setMajorCollapsed(v => !v)}
            selectedId={selectedMajorId}
            builtInOptions={BUILT_IN_MAJOR_OPTIONS}
            config={majorConfig}
            onSelect={id => setMajor(id)}
            accentClass="focus:ring-cardinal-300"
            headerColor="cardinal"
            accentHex={activeScenarioColor}
            cards={cards}
            testSatisfiers={testSatisfiers}
            manualSlotFills={manualSlotFills}
            setManualSlotFill={setManualSlotFill}
            onAddCourse={onAddCourse}
            onOpenSearch={onOpenSearch && majorConfig ? (slotId) => onOpenSearch(slotId, 'major', majorConfig.id) : undefined}
            allowedAffiliations={new Set<Affiliation>(['major'])}
          />

          {/* ── Additional Majors ────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <button
                onClick={() => setAdditionalMajorsCollapsed(v => !v)}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-left"
              >
                {additionalMajorsCollapsed
                  ? <ChevronRight size={13} className="text-gray-400" />
                  : <ChevronDown size={13} className="text-gray-400" />}
                <BookMarked size={13} className="text-rose-600" />
                <span className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">Additional Majors</span>
              </button>
              <a
                href="https://advising.stanford.edu/current-students/advising-student-handbook/double-secondary-dual"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors ml-0.5"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={11} />
              </a>
            </div>

            {!additionalMajorsCollapsed && (
              <div className="space-y-6">
                <p className="text-[11px] leading-relaxed text-red-700 -mt-1">
                  Secondary majors can overlap courses. Double majors generally cannot overlap, but if needed here, you can directly allow exceptions by section.
                </p>
                {additionalMajors.map(am => {
                  const config = additionalMajorConfigs.find(c => c.id === am.id);
                  const isDouble = am.kind === 'double';
                  const affiliation: Affiliation = isDouble ? 'double-major' : 'secondary-major';
                  const headerColor = 'cardinal';
                  return (
                    <div key={am.id} className="space-y-3">
                      <div className="flex items-center gap-2">
                        {/* Double / Secondary toggle */}
                        <div className="flex shrink-0 overflow-hidden rounded border border-gray-200 text-[11px] font-medium">
                          <button
                            type="button"
                            onClick={() => setAdditionalMajorKind(am.id, 'double')}
                            className={`px-2 py-1 transition-colors ${isDouble ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            Double
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdditionalMajorKind(am.id, 'secondary')}
                            className={`px-2 py-1 transition-colors ${!isDouble ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            Secondary
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <ProgramSelectorRow
                            value={am.id}
                            builtInOptions={BUILT_IN_MAJOR_OPTIONS.filter(o =>
                              o.id !== selectedMajorId && !additionalMajors.some(other => other.id !== am.id && other.id === o.id)
                            )}
                            onChange={newId => {
                              if (!newId) {
                                removeAdditionalMajor(am.id);
                              } else if (newId !== am.id) {
                                removeAdditionalMajor(am.id);
                                addAdditionalMajor(newId, am.kind);
                              }
                            }}
                            placeholder="Select a major"
                            accentClass="focus:ring-violet-300"
                          />
                        </div>
                      </div>
                      {config ? (
                        <ProgramBlock
                          config={config}
                          cards={cards}
                          testSatisfiers={testSatisfiers}
                          manualSlotFills={manualAdditionalMajorSlotFills[am.id] ?? {}}
                          setManualSlotFill={(slotId, fill) => setManualAdditionalMajorSlotFill(am.id, slotId, fill)}
                          onAddCourse={onAddCourse}
                          onOpenSearch={onOpenSearch ? (slotId) => onOpenSearch(slotId, affiliation, am.id) : undefined}
                          precomputedAssignments={additionalMajorAssignments.get(am.id)}
                          allowedAffiliations={isDouble ? new Set<Affiliation>(['double-major']) : undefined}
                          headerColor={headerColor}
                          showSlotExceptions={isDouble}
                        />
                      ) : (
                        <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-4 text-sm text-gray-500">
                          <Loader2 size={14} className="animate-spin" />
                          Loading program requirements…
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Adder row */}
                <SearchableSelect
                  value=""
                  options={[
                    ...configsToOptions(
                      BUILT_IN_MAJOR_OPTIONS.filter(o => o.id !== selectedMajorId && !additionalMajors.some(am => am.id === o.id)),
                      'Built-in',
                    ),
                  ]}
                  onChange={id => { if (id) addAdditionalMajor(id, 'double'); }}
                  placeholder={`Add a double or secondary major: ${BUILT_IN_MAJOR_OPTIONS.length} majors supported`}
                  resetAfterSelect
                  focusRingClass="focus:ring-violet-300"
                />
              </div>
            )}
          </div>

          {/* ── Minors ───────────────────────────────────────────────────── */}
          <div>
            <CollapsibleHeader
              collapsed={minorsCollapsed}
              onToggle={() => setMinorsCollapsed(v => !v)}
              icon={<Layers size={13} className="text-teal-600" />}
              label="Minors"
            />

            {!minorsCollapsed && (
              <>
                {selectedMinorIds.length === 0 ? (
                  <div className="space-y-3">
                    <MinorAdderRow
                      selectedMinorIds={selectedMinorIds}
                      builtInMinors={BUILT_IN_MINOR_OPTIONS}
                      onAdd={addMinor}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedMinors.map(minor => (
                      <div key={minor.id} className="space-y-3">
                        <ProgramSelectorRow
                          value={minor.id}
                          builtInOptions={BUILT_IN_MINOR_OPTIONS}
                          onChange={newId => {
                            removeMinor(minor.id);
                            if (newId && newId !== minor.id) addMinor(newId);
                          }}
                          placeholder={`Select a minor: ${BUILT_IN_MINOR_OPTIONS.length} minors supported`}
                          accentClass="focus:ring-teal-300"
                        />
                        <ProgramBlock
                          config={minor}
                          cards={cards}
                          testSatisfiers={testSatisfiers}
                          manualSlotFills={manualMinorSlotFills[minor.id] ?? {}}
                          setManualSlotFill={(slotId, fill) => setManualMinorSlotFill(minor.id, slotId, fill)}
                          onAddCourse={onAddCourse}
                          onOpenSearch={onOpenSearch ? (slotId) => onOpenSearch(slotId, 'minor', minor.id) : undefined}
                          precomputedAssignments={minorAssignments.get(minor.id)}
                          allowedAffiliations={new Set<Affiliation>(['minor'])}
                          headerColor="teal"
                        />
                      </div>
                    ))}
                    <MinorAdderRow
                      selectedMinorIds={selectedMinorIds}
                      builtInMinors={BUILT_IN_MINOR_OPTIONS}
                      onAdd={addMinor}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── Coterm ──────────────────────────────────────────────────── */}
          <SingleProgramPane
            label="Coterm"
            icon={<GraduationCap size={13} className="text-sky-500" />}
            collapsed={cotermCollapsed}
            onToggle={() => setCotermCollapsed(v => !v)}
            selectedId={selectedCotermId}
            builtInOptions={BUILT_IN_COTERM_OPTIONS}
            config={cotermConfig}
            onSelect={setCoterm}
            accentClass="focus:ring-sky-300"
            headerColor="sky"
            cards={cards}
            testSatisfiers={testSatisfiers}
            manualSlotFills={cotermManualFills}
            setManualSlotFill={cotermSetManualFill}
            onAddCourse={onAddCourse}
            onOpenSearch={onOpenSearch && cotermConfig ? (slotId) => onOpenSearch(slotId, 'co-term', cotermConfig.id) : undefined}
            excludeCardIds={totalMinorExcludeIds}
            shareableCardIds={totalMinorShareableIds}
            allowedAffiliations={new Set<Affiliation>(['co-term'])}
          />

        </div>
      )}
    </section>
  );
}
