import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight, Circle, Info } from 'lucide-react';
import { lookupCourse, type CatalogCourse } from '../../data/catalog';
import { usePlannerStore } from '../../store/usePlannerStore';
import { parseHighUnit } from '../../utils/catalogUtils';
import { getRequirementStateStyles } from '../../utils/requirementStyles';
import {
  calculateRequirementUnits,
  calculateSectionUnits,
  countSectionSlots,
  countSections,
  countSlots,
  getManualSlotCourseCards,
  getMetaRequirementPresentation,
  isSectionVerificationComplete,
  metaRequirementToSection,
  sectionHasRequirement,
} from '../../utils/majorUtils';
import {
  getPendingRequirementReveal,
  onRequirementReveal,
  requirementElementId,
  type RequirementArea,
} from '../../utils/requirementNavigation';
import type { MajorSection as MajorSectionType, MetaRequirement, Track } from '../../data/majorSchema';
import type { Satisfier } from '../../data/testCreditUtils';
import type { CourseCard } from '../../types';
import { EMPTY_FILL, getAccent, renderNoteWithLinks } from './helpers';
import { SlotRow } from './SlotRow';

// Panels that group requirement slots: a plain section, a pick-one group, a
// track's depth requirements, and cross-section meta requirements.

export function PickOneGroupSection({
  section,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  onUnpinCard,
  bulletinUrl,
  showSlotExceptions = false,
}: {
  section: MajorSectionType;
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (c: CatalogCourse, slotId: string) => void;
  onOpenSearch?: (slotId: string) => void;
  onUnpinCard?: (cardId: string) => void;
  bulletinUrl?: string;
  showSlotExceptions?: boolean;
}) {
  const groups = section.pickOneGroup!;
  const requiredCount = section.pickGroupCount ?? 1;
  const groupProgress = groups.map(group => {
    const { needed, filled } = countSlots(group.slots, assignments, manualSlotFills);
    return { group, needed, filled, complete: needed > 0 && filled >= needed };
  });
  const completedCount = groupProgress.filter(g => g.complete).length;
  const sectionDone = completedCount >= requiredCount;
  // pick-1-of-N: fade incomplete groups once one is done
  // pick-N-of-M: never fade; show each group independently
  const fadeIncomplete = requiredCount === 1 && sectionDone;

  return (
    <div className="flex flex-col gap-1.5">
      {requiredCount > 1 && (
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            sectionDone ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
          }`}>
            {completedCount}/{requiredCount} areas complete
          </span>
        </div>
      )}
      {groupProgress.map(({ group, needed, filled, complete }, idx) => (
        <React.Fragment key={group.id}>
          {requiredCount === 1 && idx > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          )}
          <div className={`rounded border px-3 py-2 ${
            complete
              ? 'border-green-200 bg-green-50/40'
              : fadeIncomplete
                ? 'border-gray-100 opacity-50'
                : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              {complete
                ? <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                : <Circle size={12} className="text-gray-300 shrink-0" />}
              <span className={`text-[12px] font-semibold ${complete ? 'text-green-800' : 'text-gray-600'}`}>
                {group.name}
              </span>
              {needed > 1 && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ml-auto ${
                  complete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {filled}/{needed}
                </span>
              )}
            </div>
            {group.note && (
              <p className="text-[10px] text-gray-400 mb-1.5 leading-relaxed flex items-start gap-1">
                <Info size={9} className="shrink-0 mt-0.5" />
                <span>{renderNoteWithLinks(group.note)}</span>
              </p>
            )}
            <div className="flex flex-col gap-0.5 pl-2 border-l-2 border-gray-100">
              {group.slots.map(slot => (
                <SlotRow
                  key={slot.id}
                  slot={slot}
                  assigned={assignments.get(slot.id) ?? []}
                  fill={manualSlotFills[slot.id] ?? EMPTY_FILL}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={slot.type === 'any-approved' ? onOpenSearch : undefined}
                  onUnpinCard={onUnpinCard}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions && slot.type !== 'manual' && slot.type !== 'any-approved'}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export function SectionPanel({
  programId,
  programArea,
  section,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  onUnpinCard,
  cards,
  bulletinUrl,
  headerDetail,
  showSlotExceptions = false,
}: {
  programId: string;
  programArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'>;
  section: MajorSectionType;
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (c: CatalogCourse, slotId: string) => void;
  onOpenSearch?: (slotId: string) => void;
  onUnpinCard?: (cardId: string) => void;
  cards: CourseCard[];
  bulletinUrl?: string;
  headerDetail?: string;
  showSlotExceptions?: boolean;
}) {
  const [open, setOpen] = useState(section.phase !== 'pre-major');
  const selectedTracks = usePlannerStore(s => s.selectedTracks);
  const setTrack = usePlannerStore(s => s.setTrack);
  const sectionSelectorKey = `${programId}:${section.id}`;
  const selectedSectionOption = section.selectorOptions?.find(
    option => option.id === selectedTracks[sectionSelectorKey],
  );
  const selectedOptionSections = selectedSectionOption?.sections ?? [];

  useEffect(() => {
    const revealIfMatching = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.programId === programId && detail.requirementId === section.id) setOpen(true);
    };
    revealIfMatching(getPendingRequirementReveal());
    return onRequirementReveal(revealIfMatching);
  }, [programId, section.id]);

  const ownProgress = countSectionSlots(section, assignments, manualSlotFills);
  const selectedOptionProgress = countSections(selectedOptionSections, assignments, manualSlotFills);
  const totalNeeded = ownProgress.needed + selectedOptionProgress.needed;
  const totalFilled = ownProgress.filled + selectedOptionProgress.filled;

  const actualUnits = useMemo(
    () => section.minUnits
      ? calculateSectionUnits(section, assignments, manualSlotFills, cards)
      : 0,
    [section, assignments, manualSlotFills, cards],
  );
  const selectedOptionUnits = useMemo(
    () => selectedSectionOption?.minUnits
      ? calculateRequirementUnits(selectedOptionSections, assignments, manualSlotFills, cards)
      : 0,
    [selectedSectionOption, selectedOptionSections, assignments, manualSlotFills, cards],
  );

  if (section.slots.length === 0 && !section.pickOneGroup?.length && !section.selectorOptions?.length) {
    if (!section.note) return null;
    return (
      <div className="theme-note-panel rounded border px-4 py-3">
        <div className="theme-note-title flex items-center gap-2 text-sm font-semibold">
          <Info size={13} />
          <span>{section.name}</span>
        </div>
        <p className="theme-note-text text-[11px] mt-1 leading-relaxed">{renderNoteWithLinks(section.note)}</p>
      </div>
    );
  }

  const hasRequirement = sectionHasRequirement(section) || Boolean(section.selectorOptions?.length);
  const slotsComplete = totalNeeded === 0 || totalFilled >= totalNeeded;
  const unitsComplete = !section.minUnits || actualUnits >= section.minUnits;
  const selectedOptionComplete = !section.selectorOptions?.length || Boolean(
    selectedSectionOption
    && (!selectedSectionOption.minUnits || selectedOptionUnits >= selectedSectionOption.minUnits),
  );
  const verificationComplete = isSectionVerificationComplete(section, assignments, manualSlotFills);
  const complete = hasRequirement && slotsComplete && unitsComplete && selectedOptionComplete && verificationComplete;
  const stateStyles = getRequirementStateStyles(hasRequirement ? complete : null);

  return (
    <div
      id={requirementElementId({
        area: programArea,
        programId,
        requirementId: section.id,
        fallbackSectionId: 'section-major',
      })}
      data-requirement-program={programId}
      data-requirement-id={section.id}
      className={`requirement-glass rounded border overflow-hidden ${stateStyles.panel}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown size={13} className="text-gray-400" /> : <ChevronRight size={13} className="text-gray-400" />}
          <span className={`text-sm font-semibold ${stateStyles.title}`}>
            {section.name}
          </span>
          {headerDetail && (
            <span className="text-[11px] font-normal text-gray-500">{headerDetail}</span>
          )}
          {section.phase === 'pre-major' && (
            <span className="text-[9px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1 py-0.5">pre-major</span>
          )}
          {section.allowDoubleCount && (
            <span className="text-[9px] text-gray-400 bg-gray-100 rounded px-1 py-0.5">can double-count</span>
          )}
          {section.maxOverlapUnits != null && (
            <span className="text-[9px] text-gray-400 bg-gray-100 rounded px-1 py-0.5">≤{section.maxOverlapUnits} units overlap</span>
          )}
          {section.minUnits && (
            <span className="text-[10px] text-gray-400">
              {section.unitOnly
                ? `${actualUnits}/${section.minUnits} units`
                : `${section.minUnits} units min${actualUnits > 0 ? ` · ${actualUnits} earned` : ''}`}
            </span>
          )}
          {selectedSectionOption?.minUnits && (
            <span className="text-[10px] text-gray-400">
              {selectedOptionUnits}/{selectedSectionOption.minUnits} units
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {totalNeeded > 0 && (
            <span className={`text-[11px] font-semibold ${stateStyles.count}`}>
              {totalFilled}/{totalNeeded}
            </span>
          )}
          {complete && <CheckCircle2 size={13} className={stateStyles.check} />}
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3 flex flex-col gap-0.5">
          {section.selectorOptions && section.selectorOptions.length > 0 && (
            <div className="px-1 pb-2">
              <select
                aria-label={section.selectorLabel ?? `Select an option for ${section.name}`}
                value={selectedSectionOption?.id ?? ''}
                onChange={event => setTrack(sectionSelectorKey, event.target.value || null)}
                className="w-full text-sm border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
              >
                <option value="">{section.selectorLabel ?? 'Select an option'}</option>
                {section.selectorOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          )}
          {section.pickOneGroup?.length
            ? (
              <>
                {section.note && (
                  <p className="text-[10px] text-gray-400 mb-1 leading-relaxed flex items-start gap-1 px-1">
                    <Info size={9} className="shrink-0 mt-0.5" />
                    <span>{renderNoteWithLinks(section.note)}</span>
                  </p>
                )}
                <PickOneGroupSection
                  section={section}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={onUnpinCard}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              </>
            )
            : section.slots.map(slot => (
              <SlotRow
                key={slot.id}
                slot={slot}
                assigned={assignments.get(slot.id) ?? []}
                fill={manualSlotFills[slot.id] ?? EMPTY_FILL}
                setManualSlotFill={setManualSlotFill}
                onSelect={onSelect}
                onOpenSearch={slot.type === 'any-approved' ? onOpenSearch : undefined}
                onUnpinCard={onUnpinCard}
                bulletinUrl={bulletinUrl}
                showCourseProgress={!(section.unitOnly || (
                  section.minUnits != null
                  && section.minCourses == null
                  && slot.count == null
                  && slot.times == null
                ))}
                showSlotExceptions={showSlotExceptions && slot.type !== 'manual' && slot.type !== 'any-approved'}
              />
            ))
          }
          {selectedSectionOption && selectedOptionSections.length > 0 && (
            <div className="space-y-2 pt-1">
              {selectedSectionOption.note && (
                <p className="text-[10px] text-gray-400 px-1">{selectedSectionOption.note}</p>
              )}
              {selectedOptionSections.map(optionSection => (
                <SectionPanel
                  key={optionSection.id}
                  programId={programId}
                  programArea={programArea}
                  section={optionSection}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={onUnpinCard}
                  cards={cards}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TrackDepthSection({
  programId,
  programArea,
  section,
  tracks,
  activeTrack,
  onSelectTrack,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  onUnpinCard,
  cards,
  accentColor = 'green',
  bulletinUrl,
  showSlotExceptions = false,
}: {
  programId: string;
  programArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'>;
  section: MajorSectionType;
  tracks: Track[];
  activeTrack: Track | null;
  onSelectTrack: (id: string | null) => void;
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (c: CatalogCourse, slotId: string) => void;
  onOpenSearch?: (slotId: string) => void;
  onUnpinCard?: (cardId: string) => void;
  cards: CourseCard[];
  accentColor?: 'green' | 'teal' | 'sky';
  bulletinUrl?: string;
  showSlotExceptions?: boolean;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const revealIfMatching = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.programId === programId && detail.requirementId === section.id) setOpen(true);
    };
    revealIfMatching(getPendingRequirementReveal());
    return onRequirementReveal(revealIfMatching);
  }, [programId, section.id]);

  const { needed, filled } = useMemo(() => {
    if (!activeTrack) return { needed: 0, filled: 0 };
    return countSections(activeTrack.sections, assignments, manualSlotFills);
  }, [activeTrack, assignments, manualSlotFills]);

  const trackUnits = useMemo(() => {
    if (!activeTrack?.minUnits) return 0;
    const assignedCardIds = new Set<string>();
    const seenTestGroups = new Set<string>();
    let testUnits = 0;
    for (const trackSection of activeTrack.sections) {
      const allSlots = [
        ...trackSection.slots,
        ...(trackSection.pickOneGroup?.flatMap(group => group.slots) ?? []),
      ];
      for (const slot of allSlots) {
        for (const satisfier of assignments.get(slot.id) ?? []) {
          if (satisfier.kind === 'card') assignedCardIds.add(satisfier.card.id);
          else if (!seenTestGroups.has(satisfier.groupId)) {
            seenTestGroups.add(satisfier.groupId);
            testUnits += satisfier.units;
          }
        }
        if (slot.type === 'any-approved') {
          for (const card of getManualSlotCourseCards(manualSlotFills[slot.id], cards)) assignedCardIds.add(card.id);
        }
      }
    }
    const cardUnits = cards
      .filter(card => assignedCardIds.has(card.id))
      .reduce((sum, card) => sum + (card.units ?? parseHighUnit(lookupCourse(card.department, card.courseNumber)?.units ?? '') ?? 0), 0);
    return cardUnits + testUnits;
  }, [activeTrack, assignments, manualSlotFills, cards]);

  const unitsComplete = !activeTrack?.minUnits || trackUnits >= activeTrack.minUnits;
  const verificationComplete = activeTrack?.sections.every(section =>
    isSectionVerificationComplete(section, assignments, manualSlotFills)
  ) ?? true;
  const complete = needed > 0 && filled >= needed && unitsComplete && verificationComplete;

  const accent = getAccent(accentColor);
  const stateStyles = getRequirementStateStyles(complete);

  return (
    <div
      id={requirementElementId({
        area: programArea,
        programId,
        requirementId: section.id,
        fallbackSectionId: 'section-major',
      })}
      className={`requirement-glass rounded border overflow-hidden ${stateStyles.panel}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown size={13} className="text-gray-400" /> : <ChevronRight size={13} className="text-gray-400" />}
          <span className={`text-sm font-semibold ${stateStyles.title}`}>
            {section.name}
          </span>
          {activeTrack && (
            <span className="text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">{activeTrack.name}</span>
          )}
          {activeTrack?.minUnits && (
            <span className="text-[10px] text-gray-400">
              {trackUnits}/{activeTrack.minUnits} units
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {needed > 0 && (
            <span className={`text-[11px] font-semibold ${stateStyles.count}`}>
              {filled}/{needed}
            </span>
          )}
          {complete && <CheckCircle2 size={13} className={stateStyles.check} />}
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2.5">
          {section.note && (
            <p className="text-[10px] text-gray-400 leading-relaxed flex items-start gap-1 px-1 pt-0.5">
              <Info size={9} className="shrink-0 mt-0.5" />
              <span>{section.note}</span>
            </p>
          )}

          <select
            aria-label={`Select a track for ${section.name}`}
            value={activeTrack?.id ?? ''}
            onChange={e => onSelectTrack(e.target.value || null)}
            className={`w-full text-sm border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 ${accent.select}`}
          >
            <option value="">Select a track / concentration</option>
            {tracks.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          {activeTrack && (
            <div className="space-y-2">
              {activeTrack.sections.map(s => (
                <SectionPanel
                  key={s.id}
                  programId={programId}
                  programArea={programArea}
                  section={s}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={onSelect}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={onUnpinCard}
                  cards={cards}
                  bulletinUrl={bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MetaRequirementsPanel({
  programId,
  programArea,
  requirements,
  assignments,
  manualSlotFills,
  setManualSlotFill,
  onSelect,
  onOpenSearch,
  cards,
  bulletinUrl,
}: {
  programId: string;
  programArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'>;
  requirements: MetaRequirement[];
  assignments: Map<string, Satisfier[]>;
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onSelect?: (course: CatalogCourse) => void;
  onOpenSearch?: (slotId: string) => void;
  cards: CourseCard[];
  bulletinUrl?: string;
}) {
  return (
    <>
      {requirements.map(meta => {
        const presentation = getMetaRequirementPresentation(meta);
        return (
          <SectionPanel
            key={meta.id}
            programId={programId}
            programArea={programArea}
            section={metaRequirementToSection(meta)}
            assignments={assignments}
            manualSlotFills={manualSlotFills}
            setManualSlotFill={setManualSlotFill}
            onSelect={onSelect}
            onOpenSearch={onOpenSearch}
            cards={cards}
            bulletinUrl={bulletinUrl}
            headerDetail={presentation.subtitle}
          />
        );
      })}
    </>
  );
}
