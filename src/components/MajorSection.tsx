import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  GraduationCap, ChevronDown, ChevronRight, X, BookMarked, Layers, Loader2, ExternalLink } from 'lucide-react';
import { type CatalogCourse } from '../data/catalog';
import { getAccent } from './major/helpers';
import { CollapsibleHeader } from './major/CollapsibleHeader';
import { useDarkMode } from '../hooks/useDarkMode';
import { MetaRequirementsPanel, SectionPanel, TrackDepthSection } from './major/SectionPanels';
import { usePlannerStore } from '../store/usePlannerStore';
import {
  BUILT_IN_COTERM_OPTIONS,
  BUILT_IN_MAJOR_OPTIONS,
  BUILT_IN_MINOR_OPTIONS,
  type ProgramSummary } from '../data/programRegistry';
import { useProgramConfig, useProgramConfigs } from '../hooks/useProgramConfigs';
import { getTestCreditSatisfiers, getTransferSatisfiers } from '../data/testCreditUtils';
import {
  getPendingRequirementReveal,
  onRequirementReveal,
  type RequirementArea } from '../utils/requirementNavigation';
import type { Satisfier } from '../data/testCreditUtils';
import type { MajorConfig } from '../data/majorSchema';
import {
  type Affiliation,
  type CourseCard,
  type RequirementAssignment } from '../types';
import {
  calculateRequirementUnits,
  computeAssignments,
  countSectionSlots,
  calculateProgramAssignedUnits,
  isSectionVerificationComplete,
  countSections,
  getExcludeCardIds,
  getPinnedShareableCardIds,
  getShareableCardIds,
  getManualExcludeCardIds,
  getMetaRequirementCounts,
  getProgramRequirementDisplayItems,
  getProgramMetaRequirements,
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


function lightenHex(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c * 0.55 + 255 * 0.45);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

// ── Program block ─────────────────────────────────────────────────────────────

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

function ProgramBlock({
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

// ── Searchable program selector ───────────────────────────────────────────────

// Maps id-prefix → canonical dept abbreviation for search keywords.
// Only entries that differ from the prefix itself are listed.
const DEPT_KEYWORD: Record<string, string> = {
  humbi: 'humbio',
  symbo: 'symsys',
  mse: 'ms&e mse management science engineering',
  polisci: 'polisci political science',
  datasci: 'datasci data science ds',
  cs: 'cs computer science',
  ee: 'ee electrical engineering',
  me: 'me mechanical engineering',
  econ: 'econ economics',
  math: 'math mathematics',
  bio: 'bio biology',
  psych: 'psych psychology',
  stats: 'stats statistics',
  music: 'music',
  energy: 'energy science engineering ese',
  pubpol: 'public policy publpol',
  ling: 'linguistics ling',
  socio: 'sociology soc',
  anthro: 'anthropology anthro',
  humrts: 'human rights humrts',
  complit: 'comparative literature complit',
  geoph: 'geophysics geophys',
};

type ProgramOption = Pick<MajorConfig, 'id' | 'name' | 'school' | 'year'> | ProgramSummary;

function programKeywords(m: ProgramOption): string {
  const prefix = m.id.split('-')[0];
  const dept = DEPT_KEYWORD[prefix] ?? prefix;
  return `${dept} ${m.name} ${m.school}`.toLowerCase();
}

interface SearchOption { value: string; label: string; keywords: string; group: string; }

function configsToOptions(configs: ProgramOption[], group: string): SearchOption[] {
  return configs
    .map(m => ({
      value: m.id,
      label: m.name,
      keywords: programKeywords(m),
      group,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// Searchable combobox used by both the persistent selector and the add-minor row.
// resetAfterSelect=true clears the input and shows placeholder again after picking.
function SearchableSelect({
  value, options, onChange, placeholder, resetAfterSelect = false, focusRingClass,
}: {
  value: string;
  options: SearchOption[];
  onChange: (id: string | null) => void;
  placeholder: string;
  resetAfterSelect?: boolean;
  focusRingClass?: string;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen]   = useState(false);
  const containerRef      = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);
  // When closed: show selected label. When open: show live query.
  const inputDisplay = open ? query : (selected?.label ?? '');

  const filtered = query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()) || o.keywords.includes(query.toLowerCase()))
    : options;

  // Group consecutive items (preserves insertion order of groups)
  const grouped = filtered.reduce<{ group: string; items: SearchOption[] }[]>((acc, o) => {
    const last = acc[acc.length - 1];
    if (last?.group === o.group) last.items.push(o);
    else acc.push({ group: o.group, items: [o] });
    return acc;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false); setQuery('');
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  function pick(id: string) {
    onChange(id || null);
    setQuery('');
    setOpen(false);
  }

  const ring = focusRingClass ?? 'focus:ring-cardinal-300';

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        value={inputDisplay}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => { setQuery(''); setOpen(true); }}
        placeholder={placeholder}
        className={`w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 ${ring}`}
      />
      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {!resetAfterSelect && value && (
            <li>
              <button type="button" onMouseDown={e => { e.preventDefault(); pick(''); }}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-50 italic">
                Clear selection
              </button>
            </li>
          )}
          {grouped.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-400 italic">No matches</li>
          )}
          {grouped.map(({ group, items }) => (
            <React.Fragment key={group}>
              {group && (
                <li className="px-3 pt-2 pb-0.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider select-none">
                  {group}
                </li>
              )}
              {items.map(o => (
                <li key={o.value}>
                  <button type="button" onMouseDown={e => { e.preventDefault(); pick(o.value); }}
                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                      o.value === value
                        ? 'bg-cardinal-50 text-cardinal-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                    {o.label}
                  </button>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Program selector row (major / coterm) ─────────────────────────────────────

function ProgramSelectorRow({
  value, builtInOptions, onChange, placeholder, focusRingClass, accentClass,
}: {
  value: string;
  builtInOptions: ProgramOption[];
  onChange: (id: string | null) => void;
  placeholder: string;
  focusRingClass?: string;
  accentClass?: string;
}) {
  const options = configsToOptions(builtInOptions, 'Built-in');

  return (
    <div className="flex items-center gap-2">
      <SearchableSelect
        value={value} options={options} onChange={onChange}
        placeholder={placeholder} focusRingClass={focusRingClass ?? accentClass}
      />
    </div>
  );
}

// ── Minor adder row ───────────────────────────────────────────────────────────

function MinorAdderRow({
  selectedMinorIds, builtInMinors, onAdd,
}: {
  selectedMinorIds: string[];
  builtInMinors: ProgramOption[];
  onAdd: (id: string) => void;
}) {
  const availableBuiltIn = builtInMinors.filter(m => !selectedMinorIds.includes(m.id));
  const options = configsToOptions(availableBuiltIn, 'Built-in');

  return (
    <SearchableSelect
      value="" options={options}
      onChange={id => { if (id) onAdd(id); }}
      placeholder={options.length ? `Select a minor: ${builtInMinors.length} minors supported` : 'No more minors available'}
      resetAfterSelect focusRingClass="focus:ring-teal-300"
    />
  );
}

// ── Single-program pane (shared by Major and Coterm) ────────────────────────

interface SingleProgramPaneProps {
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  onToggle: () => void;
  selectedId: string | null;
  builtInOptions: ProgramOption[];
  config: MajorConfig | null;
  onSelect: (id: string | null) => void;
  accentClass: string;
  headerColor: 'cardinal' | 'sky';
  accentHex?: string;
  cards: CourseCard[];
  testSatisfiers: Satisfier[];
  manualSlotFills: Record<string, { checked: boolean; note: string }>;
  setManualSlotFill: (slotId: string, fill: { checked?: boolean; note?: string }) => void;
  onAddCourse?: (course: CatalogCourse, target?: RequirementAssignment) => void;
  onOpenSearch?: (slotId: string) => void;
  excludeCardIds?: Set<string>;
  shareableCardIds?: Set<string>;
  allowedAffiliations?: Set<Affiliation>;
}

function SingleProgramPane({
  label, icon, collapsed, onToggle,
  selectedId, builtInOptions, config,
  onSelect,
  accentClass, headerColor, accentHex,
  cards, testSatisfiers, manualSlotFills, setManualSlotFill,
  onAddCourse, onOpenSearch, excludeCardIds, shareableCardIds, allowedAffiliations,
}: SingleProgramPaneProps) {
  return (
    <div>
      <CollapsibleHeader collapsed={collapsed} onToggle={onToggle} icon={icon} label={label} />
      {!collapsed && (
        <div className="space-y-3">
          <ProgramSelectorRow
            value={selectedId ?? ''}
            builtInOptions={builtInOptions}
            onChange={onSelect}
            placeholder={`Select a ${label.toLowerCase()}: ${builtInOptions.length} ${label.toLowerCase()}s supported`}
            accentClass={accentClass}
          />
          {config ? (
            <ProgramBlock
              config={config}
              cards={cards}
              testSatisfiers={testSatisfiers}
              manualSlotFills={manualSlotFills}
              setManualSlotFill={setManualSlotFill}
              onAddCourse={onAddCourse}
              onOpenSearch={onOpenSearch}
              headerColor={headerColor}
              accentHex={accentHex}
              excludeCardIds={excludeCardIds}
              shareableCardIds={shareableCardIds}
              allowedAffiliations={allowedAffiliations}
            />
          ) : selectedId ? (
            <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-4 text-sm text-gray-500">
              <Loader2 size={14} className="animate-spin" />
              Loading program requirements…
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

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
