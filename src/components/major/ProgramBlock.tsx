import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, X } from 'lucide-react';
import type { CatalogCourse } from '../../data/catalog';
import { usePlannerStore } from '../../store/usePlannerStore';
import { useDarkMode } from '../../hooks/useDarkMode';
import {
  calculateProgramAssignedUnits,
  calculateRequirementUnits,
  computeAssignments,
  countSectionSlots,
  countSections,
  getEffectiveProgramSections,
  getMetaRequirementCounts,
  getProgramMetaRequirements,
  getProgramRequirementDisplayItems,
  getProgramSections,
  isSectionVerificationComplete,
} from '../../utils/majorUtils';
import {
  getPendingRequirementReveal,
  onRequirementReveal,
  type RequirementArea,
} from '../../utils/requirementNavigation';
import type { MajorConfig } from '../../data/majorSchema';
import type { Satisfier } from '../../data/testCreditUtils';
import type { Affiliation, CourseCard, RequirementAssignment } from '../../types';
import { getAccent } from './helpers';
import { MetaRequirementsPanel, SectionPanel, TrackDepthSection } from './SectionPanels';

// One program's full requirement view: header, progress, sections and tracks.

function lightenHex(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c * 0.55 + 255 * 0.45);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

interface ProgramBlockProps {
  config: MajorConfig;
  cards: CourseCard[];
  testSatisfiers: Satisfier[];
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onAddCourse?: (course: CatalogCourse, target?: RequirementAssignment) => void;
  onOpenSearch?: (slotId: string) => void;
  precomputedAssignments?: Map<string, Satisfier[]>;
  excludeCardIds?: Set<string>;
  shareableCardIds?: Set<string>;
  allowedAffiliations?: Set<Affiliation>;
  headerColor?: 'cardinal' | 'teal' | 'sky';
  accentHex?: string;
  onRemove?: () => void;
  showSlotExceptions?: boolean;
}

export function ProgramBlock({
  config,
  cards,
  testSatisfiers,
  manualSlotFills,
  setManualSlotFill,
  onAddCourse,
  onOpenSearch,
  precomputedAssignments,
  excludeCardIds,
  shareableCardIds,
  allowedAffiliations,
  headerColor = 'cardinal',
  accentHex,
  onRemove,
  showSlotExceptions = false,
}: ProgramBlockProps) {
  const isDark = useDarkMode();
  const effectiveAccent = accentHex ? (isDark ? lightenHex(accentHex) : accentHex) : undefined;
  const [open, setOpen] = useState(true);
  const navigationArea: Extract<RequirementArea, 'major' | 'minor' | 'coterm'> =
    config.category === 'coterm' ? 'coterm' : config.category === 'minor' ? 'minor' : 'major';
  const selectedTracks = usePlannerStore(s => s.selectedTracks);
  const setTrack = usePlannerStore(s => s.setTrack);
  const updateCard = usePlannerStore(s => s.updateCard);
  const handleUnpinCard = useCallback((cardId: string) => {
    updateCard(cardId, { requirementAssignment: undefined });
  }, [updateCard]);

  useEffect(() => {
    const revealIfMatching = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.programId === config.id) setOpen(true);
    };
    revealIfMatching(getPendingRequirementReveal());
    return onRequirementReveal(revealIfMatching);
  }, [config.id]);

  const activeTrack = config.tracks
    ? (config.tracks.find(t => t.id === selectedTracks[config.id]) ?? null)
    : null;

  // Combine base sections + active track sections for assignment computation
  const effectiveSections = useMemo(
    () => getEffectiveProgramSections(config, selectedTracks),
    [config, selectedTracks],
  );

  const effectiveConfig = useMemo(() => ({ ...config, sections: effectiveSections }), [config, effectiveSections]);
  const selectForRequirement = useCallback(
    (course: CatalogCourse, slotId: string) => onAddCourse?.(course, { programId: config.id, slotId }),
    [config.id, onAddCourse],
  );

  const assignments = useMemo(
    () => precomputedAssignments ?? computeAssignments(effectiveConfig, cards, testSatisfiers, excludeCardIds, allowedAffiliations, shareableCardIds),
    [precomputedAssignments, effectiveConfig, cards, testSatisfiers, excludeCardIds, allowedAffiliations, shareableCardIds],
  );

  const slotProgress = countSections(effectiveSections, assignments, manualSlotFills);
  const selectableSections = useMemo(
    () => [...getProgramSections(config), ...(activeTrack?.sections ?? [])]
      .filter(section => section.selectorOptions?.length),
    [config, activeTrack],
  );
  const selectorNeeded = selectableSections.length;
  const selectorFilled = selectableSections.filter(section =>
    section.selectorOptions?.some(option =>
      option.id === selectedTracks[`${config.id}:${section.id}`]
    )
  ).length;
  const metaRequirements = useMemo(() => getProgramMetaRequirements(config), [config]);
  const metaSatisfied = useMemo(
    () => getMetaRequirementCounts(metaRequirements, assignments),
    [metaRequirements, assignments],
  );
  const metaNeeded = metaRequirements.reduce((sum, meta) => sum + meta.minCount, 0);
  const metaFilled = metaRequirements.reduce(
    (sum, meta) => sum + Math.min(metaSatisfied[meta.id] ?? 0, meta.minCount),
    0,
  );
  const totalNeeded = slotProgress.needed + metaNeeded + selectorNeeded;
  const totalFilled = slotProgress.filled + metaFilled + selectorFilled;

  const unitMinimumPending = useMemo(() => {
    const sectionPending = effectiveSections.some(section =>
      !isSectionVerificationComplete(section, assignments, manualSlotFills)
      || Boolean(section.minUnits && calculateRequirementUnits([section], assignments, manualSlotFills, cards, allowedAffiliations) < section.minUnits)
    );
    const trackPending = Boolean(activeTrack?.minUnits
      && calculateRequirementUnits(activeTrack.sections, assignments, manualSlotFills, cards, allowedAffiliations) < activeTrack.minUnits);
    const selectorPending = selectableSections.some(section => {
      const option = section.selectorOptions?.find(candidate =>
        candidate.id === selectedTracks[`${config.id}:${section.id}`]
      );
      return !option || Boolean(
        option.minUnits
        && calculateRequirementUnits(option.sections ?? [], assignments, manualSlotFills, cards, allowedAffiliations) < option.minUnits
      );
    });
    return sectionPending || trackPending || selectorPending;
  }, [effectiveSections, activeTrack, assignments, manualSlotFills, cards, allowedAffiliations, selectableSections, selectedTracks, config.id]);

  const totalAssignedUnits = useMemo(
    () => config.totalMinUnits ? calculateProgramAssignedUnits(effectiveConfig, assignments, cards) : 0,
    [assignments, cards, config.totalMinUnits, effectiveConfig],
  );

  const colors = {
    cardinal: { dot: 'bg-cardinal-600', countText: 'text-cardinal-700' },
    teal:     { dot: 'bg-teal-600',     countText: 'text-teal-700' },
    sky:      { dot: 'bg-sky-500',       countText: 'text-sky-600' },
  }[headerColor];

  const accentColor = headerColor === 'cardinal' ? 'green' : headerColor === 'teal' ? 'teal' : 'sky';
  const displayedSections = getProgramSections(config);
  const requirementItems = getProgramRequirementDisplayItems(config, displayedSections, metaRequirements.length > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen(v => !v)}
          className="h-8 sm:h-auto flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          {open ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
          {effectiveAccent
            ? <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: effectiveAccent }} />
            : <span className={`w-2 h-2 rounded-full ${colors.dot}`} />}
          <span className="font-semibold text-[14px] text-gray-900">{config.name}</span>
          {totalNeeded > 0 && (
            <span
              className={effectiveAccent ? 'text-xs font-semibold ml-1' : `text-xs font-semibold ml-1 ${colors.countText}`}
              style={effectiveAccent ? { color: effectiveAccent } : undefined}
            >{totalFilled}/{totalNeeded} requirements</span>
          )}
          {(config.totalMinUnits != null || activeTrack?.minUnits != null) && (
            <span
              className={effectiveAccent ? 'text-xs font-semibold' : `text-xs font-semibold ${colors.countText}`}
              style={effectiveAccent ? { color: effectiveAccent } : undefined}
            >
              · {totalAssignedUnits}/{config.totalMinUnits ?? activeTrack?.minUnits} units
            </span>
          )}
          {unitMinimumPending && (
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
              unit minimum pending
            </span>
          )}
        </button>
        {onRemove && (
          <button onClick={onRemove} title="Remove" aria-label={`Remove ${config.name}`} className="w-7 h-7 sm:w-auto sm:h-auto p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex items-center justify-center">
            <X size={13} />
          </button>
        )}
      </div>

      {totalNeeded > 0 && totalFilled < totalNeeded && (() => {
        const incompleteSections = effectiveSections.filter(sec => {
          const { needed, filled } = countSectionSlots(sec, assignments, manualSlotFills);
          return (needed > 0 && filled < needed)
            || !isSectionVerificationComplete(sec, assignments, manualSlotFills);
        });
        const incomplete = [
          ...incompleteSections.map(section => ({ id: `section:${section.id}`, label: section.name })),
          ...metaRequirements
            .filter(meta => (metaSatisfied[meta.id] ?? 0) < meta.minCount)
            .map(meta => ({ id: `meta:${meta.id}`, label: meta.label })),
        ];
        const accent = getAccent(accentColor);
        return incomplete.length > 0 ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-gray-400">Still needed:</span>
            {incomplete.map(item => (
              <span key={item.id} className={`text-[10px] font-medium rounded px-1.5 py-0.5 ${accent.pill}`}>
                {item.label}
              </span>
            ))}
          </div>
        ) : null;
      })()}

      {open && (
        <>
          <p className="text-[11px] text-gray-400 px-1">
            Hover a requirement to see approved courses · Hover a code for details and to add it
          </p>

          <div className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded px-2.5 py-2 flex flex-col gap-1">
            {config.bulletinUrl && (
              <a
                href={config.bulletinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium w-fit"
              >
                <ExternalLink size={11} />
                Link to Official Bulletin
              </a>
            )}
            <span className="text-gray-400">Requirements shown are based on 2025–26. Always verify the latest requirements with official Stanford resources.</span>
          </div>

          {requirementItems.map(item => {
            if (item.kind === 'meta') {
              return (
                <MetaRequirementsPanel
                  key="meta-requirements"
                  programId={config.id}
                  programArea={navigationArea}
                  requirements={metaRequirements}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={course => onAddCourse?.(course)}
                  onOpenSearch={onOpenSearch}
                  cards={cards}
                  bulletinUrl={config.bulletinUrl}
                />
              );
            }
            const { section } = item;
            if (section.trackSelector && config.tracks && config.tracks.length > 0) {
              return (
                <TrackDepthSection
                  key={section.id}
                  programId={config.id}
                  programArea={navigationArea}
                  section={section}
                  tracks={config.tracks}
                  activeTrack={activeTrack}
                  onSelectTrack={trackId => setTrack(config.id, trackId)}
                  assignments={assignments}
                  manualSlotFills={manualSlotFills}
                  setManualSlotFill={setManualSlotFill}
                  onSelect={selectForRequirement}
                  onOpenSearch={onOpenSearch}
                  onUnpinCard={handleUnpinCard}
                  cards={cards}
                  accentColor={accentColor as 'green' | 'teal' | 'sky'}
                  bulletinUrl={config.bulletinUrl}
                  showSlotExceptions={showSlotExceptions}
                />
              );
            }
            return (
              <SectionPanel
                key={section.id}
                programId={config.id}
                programArea={navigationArea}
                section={section}
                assignments={assignments}
                manualSlotFills={manualSlotFills}
                setManualSlotFill={setManualSlotFill}
                onSelect={selectForRequirement}
                onOpenSearch={onOpenSearch}
                onUnpinCard={handleUnpinCard}
                cards={cards}
                bulletinUrl={config.bulletinUrl}
                showSlotExceptions={showSlotExceptions}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
