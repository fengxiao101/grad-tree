import { useMemo, useState, useRef, useEffect } from 'react';
import { X, ExternalLink, Search, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { CourseRow, type MajorTier } from './CourseRow';
import { SectionTag, WayTag, TAG_DISPLAY, TAG_COLORS, ALL_TAGS, WAY_TAGS } from '../types';
import { coursesForTag, lookupCourse, ALL_COURSES, type CatalogCourse } from '../data/catalog/full';
import { normalizeCatalogQuery } from '../data/catalog/aliases';
import { WAYS_CONFIG } from '../data/requirements';
import { usePlannerStore } from '../store/usePlannerStore';
import type { MajorConfig } from '../data/majorSchema';
import { useProgramConfig, useProgramConfigs } from '../hooks/useProgramConfigs';

interface Props {
  defaultTag?: SectionTag;     // pre-select a tag filter (e.g. from which box was clicked)
  defaultQuarter?: Quarter;    // pre-select a quarter filter
  onSelect: (course: CatalogCourse) => void;
  onClose: () => void;
  onManualAdd?: () => void;
  activeProgramId?: string;    // which program's section to expand by default
}

type Quarter = 'Aut' | 'Win' | 'Spr' | 'Sum';

function getMajorCourseTiers(config: MajorConfig) {
  const required = new Set<string>();
  const options = new Set<string>();
  const allSections = [
    ...config.sections,
    ...(config.tracks?.flatMap(t => t.sections) ?? []),
  ];
  for (const section of allSections) {
    for (const slot of section.slots) {
      const codes = slot.options.map(o => `${o.dept.toUpperCase()} ${o.number.toUpperCase()}`);
      if (slot.type === 'required' && codes.length === 1) required.add(codes[0]);
      else codes.forEach(c => options.add(c));
    }
  }
  return { required, options };
}

function majorTierForCourse(
  course: CatalogCourse,
  required: Set<string>,
  options: Set<string>,
): MajorTier {
  for (let i = 0; i < course.depts.length; i++) {
    const code = `${course.depts[i]} ${course.numbers[i]}`;
    if (required.has(code)) return 'required';
    if (options.has(code)) return 'option';
  }
  return null;
}

function getPrimaryDept(config: MajorConfig): string | null {
  const counts = new Map<string, number>();
  const allSections = [
    ...config.sections,
    ...(config.tracks?.flatMap(t => t.sections) ?? []),
  ];
  for (const section of allSections) {
    for (const slot of section.slots) {
      for (const opt of slot.options) {
        const d = opt.dept.toUpperCase();
        counts.set(d, (counts.get(d) ?? 0) + 1);
      }
    }
  }
  if (counts.size === 0) return null;
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function scoreMatch(course: CatalogCourse, q: string, qCompact: string, tokens: string[]): number {
  const multiToken = tokens.length > 1;
  const titleUpper = course.title.toUpperCase();
  for (let i = 0; i < course.depts.length; i++) {
    const code = `${course.depts[i]} ${course.numbers[i]}`;
    const compact = `${course.depts[i]}${course.numbers[i]}`;
    if (code === q || compact === qCompact) return 0;
    if (code.startsWith(q) || compact.startsWith(qCompact)) return 1;
    if (course.numbers[i].toUpperCase().startsWith(q)) return 2;
  }
  if (titleUpper.startsWith(q)) return 3;
  if (titleUpper.includes(q)) return 4;
  // Multi-token AND search: all tokens must appear somewhere in dept codes + title
  if (multiToken) {
    const searchable = course.depts.map((d, i) => `${d} ${course.numbers[i]}`).join(' ') + ' ' + titleUpper;
    if (tokens.every(t => searchable.includes(t))) return 5;
    // Also check description if tokens appear there
    const descUpper = course.description?.toUpperCase() ?? '';
    if (descUpper && tokens.every(t => (searchable + ' ' + descUpper).includes(t))) return 6;
  }
  // Description search - only when query is meaningful length
  if (!multiToken && q.length >= 3 && course.description?.toUpperCase().includes(q)) return 5;
  return 99;
}

const QUARTER_COLORS: Record<Quarter, string> = {
  Aut: 'bg-amber-100 border-amber-300 text-amber-800',
  Win: 'bg-blue-100 border-blue-300 text-blue-800',
  Spr: 'bg-green-100 border-green-300 text-green-800',
  Sum: 'bg-orange-100 border-orange-300 text-orange-800',
};

const WAY_EXPLORE_URLS: Partial<Record<WayTag, string>> = {
  AII: 'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-AII=on',
  AQR: 'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-WAY-AQR=on',
  CE:  'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-CE=on',
  EDP: 'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-EDP=on',
  ER:  'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-ER=on',
  FR:  'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-FR=on',
  SI:  'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-SI=on',
  SMA: 'https://explorecourses.stanford.edu/search?view=catalog&filter-ger-SMA=on',
};


type UnitFilter = '1' | '2' | '3' | '4' | '5' | '>5';
const UNIT_FILTERS: UnitFilter[] = ['1', '2', '3', '4', '5', '>5'];

function parseUnitRange(units: string | undefined): [number, number] {
  if (!units) return [0, 0];
  const nums = units.match(/\d+/g)?.map(Number) ?? [0];
  return [Math.min(...nums), Math.max(...nums)];
}

function courseMatchesUnitFilter(course: CatalogCourse, filters: UnitFilter[]): boolean {
  const [cMin, cMax] = parseUnitRange(course.units);
  return filters.some(f => f === '>5' ? cMax > 5 : (v => cMin <= v && cMax >= v)(Number(f)));
}

export function CourseSearchModal({ defaultTag, defaultQuarter, onSelect, onClose, onManualAdd, activeProgramId }: Props) {
  const [query, setQuery] = useState('');
  const [quarters, setQuarters] = useState<Quarter[]>(defaultQuarter ? [defaultQuarter] : []);
  const [selectedTags, setSelectedTags] = useState<SectionTag[]>(defaultTag ? [defaultTag] : []);
  const [selectedUnits, setSelectedUnits] = useState<UnitFilter[]>([]);
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(
    () => new Set(activeProgramId ? [activeProgramId] : [])
  );
  // Track sections the user explicitly collapsed so auto-expand doesn't re-open them
  const userCollapsedRef = useRef<Set<string>>(new Set());
  const [hoveredCourseKey, setHoveredCourseKey] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  // Expanding a row on hover shifts every row below it - that's the whole
  // point of the accordion-style in-place expand. The failure mode isn't the
  // shift itself, it's that the shift can happen *while the browser is still
  // hit-testing*: Chromium recomputes hover after a layout change and
  // replays a synthetic pointermove, which if applied immediately changes
  // the DOM again, which triggers another recompute - a feedback loop that
  // renders as flicker. Rather than trying to detect and filter those
  // synthetic replays after the fact (fragile - real pointer jitter can look
  // identical to a replay), delay *committing* any hover change by a beat,
  // resetting the timer on every new pointermove. A real cascade fires many
  // events within single-digit milliseconds; none of them ever go
  // uninterrupted long enough to commit, so the DOM never changes mid-burst,
  // so there's nothing for the browser to react to - the loop can't start.
  // A human hovering a row for real never notices a delay this short.
  const hoverCommitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleHoverChange = (apply: () => void) => {
    if (hoverCommitTimerRef.current) clearTimeout(hoverCommitTimerRef.current);
    hoverCommitTimerRef.current = setTimeout(apply, 50);
  };
  useEffect(() => () => { if (hoverCommitTimerRef.current) clearTimeout(hoverCommitTimerRef.current); }, []);

  const courseKey = (course: CatalogCourse) => `${course.depts[0]}-${course.numbers[0]}`;
  const courseRowProps = (course: CatalogCourse) => {
    const key = courseKey(course);
    return {
      expanded: hoveredCourseKey === key,
      onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== 'mouse') return;
        scheduleHoverChange(() => setHoveredCourseKey(key));
      },
      onPointerLeave: () => {
        scheduleHoverChange(() => setHoveredCourseKey(current => current === key ? null : current));
      },
    };
  };

  const toggleExpanded = (id: string) => setExpandedPrograms(prev => {
    const next = new Set(prev);
    if (next.has(id)) {
      next.delete(id);
      userCollapsedRef.current.add(id);
    } else {
      next.add(id);
      userCollapsedRef.current.delete(id);
    }
    return next;
  });

  useEffect(() => { searchRef.current?.focus(); }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const toggleTag = (tag: SectionTag) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const toggleQuarter = (q: Quarter) =>
    setQuarters(prev => prev.includes(q) ? prev.filter(x => x !== q) : [...prev, q]);

  const toggleUnit = (u: UnitFilter) =>
    setSelectedUnits(prev => prev.includes(u) ? prev.filter(x => x !== u) : [...prev, u]);

  const selectedMajorId  = usePlannerStore(s => s.selectedMajorId);
  const selectedMinorIds = usePlannerStore(s => s.selectedMinorIds);
  const selectedCotermId = usePlannerStore(s => s.selectedCotermId);
  const additionalMajors = usePlannerStore(s => s.additionalMajors);

  const majorConfig  = useProgramConfig(selectedMajorId);
  const minorConfigs = useProgramConfigs(selectedMinorIds);
  const cotermConfig = useProgramConfig(selectedCotermId);
  const additionalMajorIds = useMemo(() => additionalMajors.map(am => am.id), [additionalMajors]);
  const additionalMajorConfigs = useProgramConfigs(additionalMajorIds);

  // Base pool: union of courses for all selected tags. WIM is major-specific,
  // so it uses only the selected major's explicit approved list.
  const basePool = useMemo(() => {
    if (selectedTags.length === 0) return ALL_COURSES;

    const seen = new Set<CatalogCourse>();
    const result: CatalogCourse[] = [];

    for (const tag of selectedTags) {
      if (tag === 'WIM') continue;
      for (const course of coursesForTag(tag)) {
        if (!seen.has(course)) { seen.add(course); result.push(course); }
      }
    }

    // WIM: add courses explicitly approved by the primary major and any additional majors.
    if (selectedTags.includes('WIM')) {
      const wimSources = [majorConfig, ...additionalMajorConfigs].filter(Boolean);
      for (const cfg of wimSources) {
        for (const opt of cfg!.wimCourses ?? []) {
          const course = lookupCourse(opt.dept, opt.number);
          if (course && !seen.has(course)) { seen.add(course); result.push(course); }
        }
      }
    }

    return result;
  }, [selectedTags, majorConfig, additionalMajorConfigs]);

  // Apply quarter filter + units filter + search query
  const displayed = useMemo(() => {
    let pool = quarters.length > 0 ? basePool.filter(c => quarters.some(q => c.terms.includes(q))) : basePool;
    if (selectedUnits.length > 0) pool = pool.filter(c => courseMatchesUnitFilter(c, selectedUnits));
    if (!query.trim()) return pool;

    const q = normalizeCatalogQuery(query).toUpperCase();
    const qc = q.replace(/\s+/g, '');
    const tokens = q.split(/\s+/).filter(Boolean);
    const scored = pool
      .map(c => ({ c, s: scoreMatch(c, q, qc, tokens) }))
      .filter(({ s }) => s < 99);
    scored.sort((a, b) => a.s - b.s || a.c.depts[0].localeCompare(b.c.depts[0]));
    // A complete course code is an exact lookup, not a broad full-text search.
    // Showing unrelated description matches here makes the most common lookup
    // feel imprecise even when the correct course is ranked first.
    const looksLikeCourseCode = /^[A-Z][A-Z&-]*\s*\d+[A-Z]*$/.test(q);
    if (looksLikeCourseCode && scored.some(({ s }) => s === 0)) {
      return scored.filter(({ s }) => s === 0).map(({ c }) => c);
    }
    return scored.map(({ c }) => c);
  }, [basePool, quarters, selectedUnits, query]);

  // Build per-program sections: courses from that program's tiers OR primary dept
  const { programSections, rest } = useMemo(() => {
    const allPrograms = [
      ...(majorConfig ? [majorConfig] : []),
      ...additionalMajorConfigs,
      ...minorConfigs,
      ...(cotermConfig ? [cotermConfig] : []),
    ];
    if (allPrograms.length === 0) return { programSections: [], rest: displayed };

    type ProgramSection = {
      id: string; name: string; category: 'major' | 'minor' | 'coterm';
      courses: { course: CatalogCourse; tier: MajorTier }[];
    };

    const sections: ProgramSection[] = [];
    // A course claimed by an earlier section (including across two
    // different programs, e.g. required by both the major and a minor)
    // shouldn't also render again later - every render sharing the same
    // course key means hovering one used to expand all of them together.
    const usedCourses = new Set<CatalogCourse>();

    for (const config of allPrograms) {
      const tiers = getMajorCourseTiers(config);
      const primaryDept = getPrimaryDept(config);
      const courses: { course: CatalogCourse; tier: MajorTier }[] = [];
      for (const c of displayed) {
        if (usedCourses.has(c)) continue;
        const tier = majorTierForCourse(c, tiers.required, tiers.options);
        const deptMatch = primaryDept !== null && c.depts.some(d => d.toUpperCase() === primaryDept);
        if (tier !== null || deptMatch) {
          courses.push({ course: c, tier });
          usedCourses.add(c);
        }
      }
      if (courses.length > 0) {
        sections.push({ id: config.id, name: config.name, category: config.category ?? 'major', courses });
      }
    }

    return { programSections: sections, rest: displayed.filter(c => !usedCourses.has(c)) };
  }, [displayed, majorConfig, additionalMajorConfigs, minorConfigs, cotermConfig]);

  // Keep a ref so the auto-expand effect can read latest sections without adding them to deps
  const programSectionsRef = useRef(programSections);
  // Render-phase ref write, kept deliberately: the auto-expand effect reads
  // the sections from this render without listing them as dependencies.
  // eslint-disable-next-line react-hooks/refs
  programSectionsRef.current = programSections;

  // Header / footer display
  const isWim = selectedTags.includes('WIM') && selectedTags.length === 1;
  const singleWayTag = selectedTags.length === 1 && (WAY_TAGS as string[]).includes(selectedTags[0])
    ? selectedTags[0] as WayTag : null;
  const wayConfig = singleWayTag ? WAYS_CONFIG.find(w => w.id === singleWayTag) : null;
  const exploreUrl = singleWayTag
    ? (WAY_EXPLORE_URLS[singleWayTag] ?? 'https://explorecourses.stanford.edu/')
    : 'https://explorecourses.stanford.edu/';

  const placeholder = selectedTags.length > 0
    ? `Search within ${selectedTags.map(t => TAG_DISPLAY[t]).join(', ')} courses…`
    : 'Search all courses: e.g. CS 106A, "machine learning", or just 106A';

  const hasFilter = selectedTags.length > 0 || quarters.length > 0 || selectedUnits.length > 0;

  // Auto-expand program sections that have matches when query changes.
  // Uses refs so this only fires on query/activeProgramId changes, not on every render.
  // Skips sections the user explicitly collapsed (userCollapsedRef).
  // When opened from a specific program (activeProgramId), never auto-expand other sections.
  useEffect(() => {
    if (!query.trim() || activeProgramId) return;
    setExpandedPrograms(prev => {
      const next = new Set(prev);
      programSectionsRef.current.forEach(s => {
        if (s.courses.length > 0 && !userCollapsedRef.current.has(s.id)) next.add(s.id);
      });
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeProgramId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm sm:px-4 sm:py-6"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="solid-ui bg-white rounded-t-xl sm:rounded-2xl shadow-2xl w-full sm:max-w-5xl flex flex-col max-h-[96vh] sm:max-h-[88vh]">
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-2 pb-0.5 shrink-0">
          <div className="w-8 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3.5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
            {selectedTags.length > 0 ? (
              <>
                <span className="text-sm font-semibold text-gray-800">Add course</span>
                {selectedTags.map(tag => {
                  const { bg, text, border } = TAG_COLORS[tag];
                  return (
                    <span key={tag} className={`inline-block text-[11px] font-bold rounded px-2 py-0.5 border ${bg} ${text} ${border}`}>
                      {TAG_DISPLAY[tag]}
                    </span>
                  );
                })}
                {wayConfig && <span className="text-xs text-gray-400">{wayConfig.label}</span>}
                {isWim && <span className="text-xs text-gray-400">Writing in Major, major-specific</span>}
              </>
            ) : (
              <>
                <BookOpen size={13} className="text-gray-400" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Browse course catalog</span>
                <span className="text-[10px] sm:text-xs text-gray-400">7,272 courses</span>
              </>
            )}
          </div>
          <button onClick={onClose} aria-label="Close course catalog" className="w-7 h-7 sm:w-auto sm:h-auto text-gray-500 hover:text-gray-700 p-1 rounded shrink-0 flex items-center justify-center">
            <X size={14} />
          </button>
        </div>

        {/* Action bar - between header and search */}
        <div className="px-3 sm:px-5 py-2 sm:py-2.5 border-b border-gray-100 shrink-0 flex items-center justify-between gap-2 bg-gray-50">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-xs text-gray-400">Click a course to add it</span>
            {onManualAdd && (
              <button
                onClick={onManualAdd}
                className="text-[10px] sm:text-xs text-cardinal-600 hover:text-cardinal-800 font-medium transition-colors whitespace-nowrap"
              >
                + Add manually
              </button>
            )}
          </div>
          <a
            href={exploreUrl}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 hover:text-cardinal-700 transition-colors whitespace-nowrap"
          >
            {singleWayTag ? `View all ${TAG_DISPLAY[singleWayTag]} on ExploreCourses` : 'Open ExploreCourses'}
            <ExternalLink size={11} />
          </a>
        </div>

        {/* Search + filters */}
        <div className="px-3 sm:px-5 pt-2 sm:pt-3.5 pb-2 sm:pb-3 shrink-0 space-y-1.5 sm:space-y-2.5 border-b border-gray-100">
          <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 px-2.5 sm:px-4 py-1.5 sm:py-2.5 focus-within:border-cardinal-300 focus-within:ring-2 focus-within:ring-cardinal-100 focus-within:bg-white transition-all">
            <Search size={13} className="text-gray-400 shrink-0" />
            <input
              ref={searchRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm placeholder-gray-400 outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear course search" className="w-6 h-6 shrink-0 text-gray-500 hover:text-gray-700 flex items-center justify-center">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Tag filter row */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[11px] text-gray-400 shrink-0">Gen Ed:</span>
            {ALL_TAGS.map(tag => {
              const { bg, text, border } = TAG_COLORS[tag];
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border transition-colors ${
                    active ? `${bg} ${text} ${border}` : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  {TAG_DISPLAY[tag]}
                </button>
              );
            })}
            {selectedTags.length > 0 && (
              <button onClick={() => setSelectedTags([])} className="px-1.5 py-0.5 text-[10px] text-gray-500 hover:text-gray-700 whitespace-nowrap">
                clear
              </button>
            )}
          </div>

          {/* Quarter filter row */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[11px] text-gray-400">Quarter:</span>
            {(['Aut', 'Win', 'Spr', 'Sum'] as Quarter[]).map(q => (
              <button
                key={q}
                onClick={() => toggleQuarter(q)}
                aria-pressed={quarters.includes(q)}
                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium transition-colors ${
                  quarters.includes(q) ? QUARTER_COLORS[q] : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {q}
              </button>
            ))}
            {quarters.length > 0 && (
              <button onClick={() => setQuarters([])} className="px-1.5 py-0.5 text-[10px] text-gray-500 hover:text-gray-700 whitespace-nowrap">
                clear
              </button>
            )}
            {(query || hasFilter) && <span className="ml-auto text-[10px] text-gray-500 whitespace-nowrap">{displayed.length.toLocaleString()} {displayed.length === 1 ? 'course' : 'courses'}</span>}
          </div>

          {/* Units filter row */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[11px] text-gray-400 shrink-0">Units:</span>
            {UNIT_FILTERS.map(u => (
              <button
                key={u}
                onClick={() => toggleUnit(u)}
                aria-pressed={selectedUnits.includes(u)}
                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium transition-colors ${
                  selectedUnits.includes(u)
                    ? 'bg-gray-700 border-gray-700 text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {u}
              </button>
            ))}
            {selectedUnits.length > 0 && (
              <button onClick={() => setSelectedUnits([])} className="px-1.5 py-0.5 text-[10px] text-gray-500 hover:text-gray-700 whitespace-nowrap">
                clear
              </button>
            )}
          </div>
        </div>

        {/* Course list */}
        <div
          className="overflow-y-auto flex-1 min-h-0"
          // Without this, a row expanding near the bottom of the visible
          // area can nudge scrollTop via the browser's scroll anchoring,
          // producing an unrequested scroll the user never asked for.
          style={{ overflowAnchor: 'none' }}
        >
          {!query && !hasFilter && !activeProgramId && (
            <div className="px-3 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
              Start typing to search, or pick a requirement filter above
            </div>
          )}

          {(hasFilter || query || !!activeProgramId) && programSections.map(section => {
            const expanded = expandedPrograms.has(section.id);
            const headerCls = `search-section-${section.category}`;
            const categoryLabel = section.category === 'major' ? 'Major' : section.category === 'minor' ? 'Minor' : 'Coterm';
            return (
              <div key={section.id} className="border-b border-gray-100">
                <button
                  type="button"
                  className={`w-full flex items-center gap-2 px-3 sm:px-4 py-1.5 transition-colors text-left ${headerCls}`}
                  onClick={() => toggleExpanded(section.id)}
                >
                  {expanded
                    ? <ChevronDown size={11} className="shrink-0 opacity-60" />
                    : <ChevronRight size={11} className="shrink-0 opacity-60" />}
                  <span className="text-[11px] font-semibold truncate">{section.name}</span>
                  <span className="text-[10px] shrink-0 ml-0.5 opacity-60">({section.courses.length})</span>
                  <span className="ml-auto text-[9px] font-medium uppercase tracking-wide shrink-0 opacity-50">{categoryLabel}</span>
                </button>
                {expanded && section.courses.map(({ course, tier }) => (
                  <CourseRow key={courseKey(course)} course={course} tier={tier} onSelect={() => onSelect(course)} sectionCategory={section.category} {...courseRowProps(course)} />
                ))}
              </div>
            );
          })}

          {(hasFilter || query) && (programSections.length > 0 && rest.length > 0) && (
            <div className="px-3 sm:px-4 py-1 text-[10px] text-gray-400 bg-gray-50 border-b border-gray-100">
              Other results
            </div>
          )}

          {(hasFilter || query) && rest.map(c => (
            <CourseRow key={courseKey(c)} course={c} tier={null} onSelect={() => onSelect(c)} {...courseRowProps(c)} />
          ))}

          {displayed.length === 0 && (hasFilter || query) && (
            <div className="py-14 text-center text-sm text-gray-400">
              No courses found. Try a different search or clear filters.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
