import { useEffect, useMemo, useRef, useState } from 'react';
import { X, GraduationCap, Bookmark, Award, Search, Trash2, ExternalLink, MoveRight } from 'lucide-react';
import {
  CourseCard,
  Priority,
  Affiliation,
  SectionTag,
  WayTag,
  ALL_TAGS,
  PRIORITY_META,
  AFFILIATION_META,
  TAG_COLORS,
  TAG_DISPLAY,
  type RequirementAssignment,
  type RequirementChoice,
} from '../types';
import { usePlannerStore } from '../store/usePlannerStore';
import { PriorityIcon } from './PriorityIcon';
import { searchCourses, lookupCourse, type CatalogCourse } from '../data/catalog/full';
import { CourseRow } from './CourseRow';
import { parseHighUnit } from '../utils/catalogUtils';
import { onCourseUrl, exploreCourseUrl } from './CourseHoverDetail';

const YEAR_OPTIONS = [1, 2, 3, 4, 5] as const;
const SEASON_OPTIONS = [
  { label: 'Autumn', id: 'AUT' },
  { label: 'Winter', id: 'WIN' },
  { label: 'Spring', id: 'SPR' },
  { label: 'Summer', id: 'SUM' },
] as const;

function tagsFromCatalog(course: CatalogCourse): SectionTag[] {
  // Some catalog entries list the same WAY tag twice (a data artifact from
  // the bulletin scrape, e.g. DANCE 1's ways: ["CE", "CE"]) - dedupe so a
  // card doesn't end up with a duplicate tag double-counting toward progress.
  return [...new Set([
    ...(course.ways as SectionTag[]),
    ...(course.writing === '1' ? ['W1' as SectionTag] : []),
    ...(course.writing === '2' ? ['W2' as SectionTag] : []),
    ...(course.writing === 'WIM' ? ['WIM' as SectionTag] : []),
    ...(course.college ? ['COLLEGE' as SectionTag] : []),
    ...(course.language ? ['LANG' as SectionTag] : []),
  ])];
}

interface Props {
  defaultQuarterId?: string;
  defaultTags?: SectionTag[];
  prefillCourse?: CatalogCourse;
  committedWay?: WayTag;
  defaultAffiliation?: Affiliation;
  defaultRequirementAssignment?: RequirementAssignment;
  editCard?: CourseCard;
  requirementChoices?: RequirementChoice[];
  onClose: () => void;
  onSave?: (dept: string, num: string) => void;
  onMove?: () => void;
  onReturnToSearch?: () => void;
}

const PRIORITIES: Priority[] = ['required', 'want', 'maybe'];
const AFFILIATIONS: Affiliation[] = ['major', 'co-term', 'minor'];

export function AddClassModal({
  defaultQuarterId,
  defaultTags,
  prefillCourse,
  committedWay,
  defaultAffiliation,
  defaultRequirementAssignment,
  editCard,
  requirementChoices = [],
  onClose,
  onSave,
  onMove,
  onReturnToSearch,
}: Props) {
  const addCard = usePlannerStore(s => s.addCard);
  const updateCard = usePlannerStore(s => s.updateCard);
  const removeCard = usePlannerStore(s => s.removeCard);
  const showYear5 = usePlannerStore(s => s.showYear5);

  const [department, setDepartment] = useState(editCard?.department ?? prefillCourse?.depts[0] ?? '');
  const [courseNumber, setCourseNumber] = useState(editCard?.courseNumber ?? prefillCourse?.numbers[0] ?? '');
  const [courseName, setCourseName] = useState(editCard?.courseName ?? prefillCourse?.title ?? '');
  const [units, setUnits] = useState<string>(
    editCard?.units?.toString() ?? parseHighUnit(prefillCourse?.units)?.toString() ?? ''
  );
  const [affiliation, setAffiliation] = useState<Affiliation | null>(editCard?.affiliation ?? defaultAffiliation ?? null);
  const [priority, setPriority] = useState<Priority>(editCard?.priority ?? 'want');
  const [tags, setTags] = useState<SectionTag[]>(
    editCard?.tags ?? (prefillCourse ? tagsFromCatalog(prefillCourse) : defaultTags ?? [])
  );
  const [notes, setNotes] = useState(editCard?.notes ?? '');
  const [requirementAssignment, setRequirementAssignment] = useState<RequirementAssignment | undefined>(
    editCard?.requirementAssignment ?? defaultRequirementAssignment,
  );
  const [descOpen, setDescOpen] = useState(false);

  // Year/quarter scheduling (only for new cards not coming from a specific quarter)
  const showScheduler = !editCard && (!defaultQuarterId || defaultQuarterId === 'unsorted');
  const [schedYear, setSchedYear] = useState<number | null>(null);
  const [schedSeason, setSchedSeason] = useState<string | null>(null);

  const handleSaveRef = useRef<(() => void) | null>(null);

  // Live catalog lookup: updates as dept/number fields change
  const catalogCourse = useMemo(() => {
    if (!department.trim() || !courseNumber.trim()) return null;
    return lookupCourse(department.trim(), courseNumber.trim()) ?? null;
  }, [department, courseNumber]);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CatalogCourse[]>([]);
  const [suggestionIdx, setSuggestionIdx] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const deptRef = useRef<HTMLInputElement>(null);

  // Collapse description when a different catalog course is selected
  useEffect(() => { setDescOpen(false); }, [catalogCourse]);

  // When editing a card that has no tags, auto-populate from catalog
  useEffect(() => {
    if (editCard && tags.length === 0 && catalogCourse) {
      const fromCatalog = tagsFromCatalog(catalogCourse);
      if (fromCatalog.length > 0) setTags(fromCatalog);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogCourse]);

  // Focus search bar on open (add mode only)
  useEffect(() => {
    if (!editCard) searchRef.current?.focus();
    else deptRef.current?.focus();
  }, [editCard]);

  // Update suggestions as user types
  useEffect(() => {
    if (!searchQuery.trim()) { setSuggestions([]); setSuggestionIdx(-1); return; }
    setSuggestions(searchCourses(searchQuery, 20));
    setSuggestionIdx(-1);
  }, [searchQuery]);

  const selectSuggestion = (course: CatalogCourse) => {
    setDepartment(course.depts[0]);
    setCourseNumber(course.numbers[0]);
    setCourseName(course.title);
    const u = parseHighUnit(course.units);
    if (u !== null) setUnits(String(u));
    setTags(tagsFromCatalog(course));
    setSearchQuery('');
    setSuggestions([]);
    setTimeout(() => deptRef.current?.focus(), 0);
  };

  // Escape to close / Enter to submit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (suggestions.length > 0) { setSuggestions([]); setSearchQuery(''); }
        else onClose();
      }
      if (
        e.key === 'Enter' &&
        suggestions.length === 0 &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target instanceof HTMLButtonElement) &&
        !(e.target instanceof HTMLSelectElement)
      ) {
        handleSaveRef.current?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, suggestions.length]);

  const toggleTag = (tag: SectionTag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const canSave = department.trim() && courseNumber.trim() && units.trim() && Number(units) > 0;
  const [triedSave, setTriedSave] = useState(false);

  const currentCardUpdates = () => ({
    department: department.trim(), courseNumber: courseNumber.trim(),
    courseName: courseName.trim(), units: parseFloat(units),
    affiliation: affiliation ?? undefined, priority, tags, notes, requirementAssignment,
  });

  const handleSave = () => {
    if (!canSave) { setTriedSave(true); return; }

    if (editCard) {
      updateCard(editCard.id, currentCardUpdates());
      onClose();
      return;
    }

    const dept = department.trim();
    const num = courseNumber.trim();
    const computedQuarterId = (defaultQuarterId && defaultQuarterId !== 'unsorted')
      ? defaultQuarterId
      : (schedYear && schedSeason ? `Y${schedYear}-${schedSeason}` : 'unsorted');
    const cardArgs = {
      department: dept, courseNumber: num,
      courseName: courseName.trim(), units: parseFloat(units),
      affiliation: affiliation ?? undefined, priority, tags, notes,
      quarterId: computedQuarterId,
      committedWay,
      requirementAssignment,
    };
    addCard(cardArgs);
    onSave?.(dept, num);
    onClose();
  };

  const handleMove = () => {
    if (!editCard || !onMove || !canSave) return;
    updateCard(editCard.id, currentCardUpdates());
    onMove();
  };
  // Keep ref current so the global keydown handler always calls the latest
  // version. A render-phase ref write, kept deliberately: deferring it to an
  // effect would let a keypress between render and commit run a stale handler.
  // eslint-disable-next-line react-hooks/refs
  handleSaveRef.current = handleSave;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="solid-ui bg-white rounded-t-xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl flex flex-col max-h-[96vh] sm:max-h-[92vh]">
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-2 pb-0.5 shrink-0">
          <div className="w-8 h-1 rounded-full bg-gray-300" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            {onReturnToSearch && (
              <button
                onClick={onReturnToSearch}
                className="flex items-center gap-1 text-xs text-cardinal-600 hover:text-cardinal-800 font-medium transition-colors"
              >
                ← Return to main search
              </button>
            )}
            <h2 className="font-semibold text-sm sm:text-base text-gray-900">
              {editCard ? 'Edit class' : 'Add class'}
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {editCard && onMove && (
              <button
                onClick={handleMove}
                disabled={!canSave}
                className="h-7 inline-flex items-center gap-1 px-2 rounded-md text-[11px] font-medium text-cardinal-700 bg-cardinal-50 hover:bg-cardinal-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <MoveRight size={13} />
                Move to…
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 rounded-lg p-1">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="px-3 sm:px-5 py-2.5 sm:py-4 space-y-2.5 sm:space-y-4 overflow-y-auto flex-1 min-h-0">

          {/* Year/Quarter scheduler: only when adding from Ways/GenEd/etc (no default quarter) */}
          {showScheduler && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-gray-600">Schedule for</span>
                <span className="text-[9px] text-gray-400 italic">optional</span>
              </div>
              <div className={showYear5 ? 'grid grid-cols-5 gap-1' : 'grid grid-cols-4 gap-1'}>
                {YEAR_OPTIONS.filter(y => y < 5 || showYear5).map(y => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setSchedYear(schedYear === y ? null : y)}
                    className={`h-7 text-[11px] font-bold px-1.5 rounded border transition-all ${
                      schedYear === y
                        ? 'border-cardinal-500 bg-cardinal-50 text-cardinal-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    Y{y}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-1">
                {SEASON_OPTIONS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSchedSeason(schedSeason === s.id ? null : s.id)}
                    className={`h-7 text-[11px] font-bold px-1.5 rounded border transition-all ${
                      schedSeason === s.id
                        ? 'border-cardinal-500 bg-cardinal-50 text-cardinal-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Catalog search: only for new courses */}
          {!editCard && (
            <div className="relative">
              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 focus-within:border-cardinal-300 focus-within:ring-2 focus-within:ring-cardinal-100 focus-within:bg-white transition-all">
                <Search size={12} className="text-gray-400 shrink-0" />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); setSuggestionIdx(i => Math.min(i + 1, suggestions.length - 1)); }
                    if (e.key === 'ArrowUp')   { e.preventDefault(); setSuggestionIdx(i => Math.max(i - 1, -1)); }
                    if (e.key === 'Enter' && suggestionIdx >= 0) { e.preventDefault(); selectSuggestion(suggestions[suggestionIdx]); }
                  }}
                  placeholder={'Search catalog, e.g. CS 106A or "programming"'}
                  className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm placeholder-gray-400 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); setSuggestions([]); }} className="w-6 h-6 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <X size={12} />
                  </button>
                )}
              </div>

              {suggestions.length > 0 && (
                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64">
                  {suggestions.map((course, idx) => (
                    <div
                      key={`${course.depts[0]}-${course.numbers[0]}`}
                      onMouseDown={e => { e.preventDefault(); selectSuggestion(course); }}
                      className={idx === suggestionIdx ? 'bg-cardinal-50' : ''}
                    >
                      <CourseRow
                        course={course}
                        tier={null}
                        onSelect={() => selectSuggestion(course)}
                        expanded={false}
                        onPointerMove={() => setSuggestionIdx(idx)}
                        onPointerLeave={() => {}}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Department + Course Number + Course Name */}
          <div className="grid grid-cols-2 sm:grid-cols-[7rem_6rem_1fr] gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Dept <span className="text-cardinal-600">*</span>
              </label>
              <input
                ref={deptRef}
                value={department}
                onChange={e => { setDepartment(e.target.value); setTriedSave(false); }}
                onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
                placeholder="CS"
                className={`w-full rounded-lg border px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cardinal-300 focus:border-transparent ${triedSave && !department.trim() ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {triedSave && !department.trim() && <p className="text-xs text-red-600 mt-0.5">Required</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Number <span className="text-cardinal-600">*</span>
              </label>
              <input
                value={courseNumber}
                onChange={e => { setCourseNumber(e.target.value); setTriedSave(false); }}
                onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
                placeholder="106A"
                className={`w-full rounded-lg border px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cardinal-300 focus:border-transparent ${triedSave && !courseNumber.trim() ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {triedSave && !courseNumber.trim() && <p className="text-xs text-red-600 mt-0.5">Required</p>}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Course name</label>
              <input
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
                placeholder="Optional title"
                className="w-full rounded-lg border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cardinal-300 focus:border-transparent"
              />
            </div>
          </div>

          {/* Units: inline label + compact input */}
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
              Units <span className="text-cardinal-600">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="20"
              step="1"
              value={units}
              onChange={e => { setUnits(e.target.value); setTriedSave(false); }}
              placeholder=""
              className={`w-16 rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cardinal-300 focus:border-transparent ${triedSave && !(units.trim() && Number(units) > 0) ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
            />
            {triedSave && !(units.trim() && Number(units) > 0) && (
              <p className="text-xs text-red-600">Required: enter the number of units</p>
            )}
          </div>

          {/* Catalog description: collapsed by default */}
          {catalogCourse && (catalogCourse.description || catalogCourse.prerequisites) && (
            <div className="rounded-lg border border-gray-100 bg-gray-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setDescOpen(v => !v)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Course details</span>
                <span>{descOpen ? '▲' : '▼'}</span>
              </button>
              {descOpen && (
                <div className="px-3 pb-2.5 space-y-1 border-t border-gray-100">
                  {catalogCourse.prerequisites && (
                    <p className="text-[11px] leading-snug pt-1.5">
                      <span className="font-semibold text-amber-700">Prereq: </span>
                      <span className="text-gray-600">{catalogCourse.prerequisites}</span>
                    </p>
                  )}
                  {catalogCourse.description && (
                    <p className="text-[11px] text-gray-500 leading-relaxed">{catalogCourse.description}</p>
                  )}
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={onCourseUrl(department.trim(), courseNumber.trim())}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] text-cardinal-600 hover:text-cardinal-800 font-medium"
                      onClick={e => e.stopPropagation()}
                    >
                      OnCourse Reviews <ExternalLink size={9} />
                    </a>
                    <a
                      href={exploreCourseUrl(department.trim(), courseNumber.trim())}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-700"
                      onClick={e => e.stopPropagation()}
                    >
                      ExploreCourses <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Affiliation */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Affiliation</label>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {AFFILIATIONS.map(a => {
                const meta = AFFILIATION_META[a];
                const active = affiliation === a;
                const Icon = a === 'major' ? GraduationCap : a === 'co-term' ? Award : Bookmark;
                return (
                  <button
                    key={a}
                    onClick={() => setAffiliation(active ? null : a)}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg border text-xs sm:text-sm font-medium transition-all
                      ${active
                        ? `${meta.badgeBg} ${meta.badgeText} border-current ring-1 ring-offset-1 ring-current`
                        : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    <Icon size={11} />
                    {meta.label}
                  </button>
                );
              })}
              {affiliation && (
                <button
                  onClick={() => setAffiliation(null)}
                  className="text-[11px] text-gray-500 hover:text-gray-700 px-1.5 whitespace-nowrap"
                >
                  clear
                </button>
              )}
            </div>
          </div>

          {/* Requirement assignment override */}
          {editCard && requirementChoices.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Used for requirement
              </label>
              <select
                value={requirementAssignment
                  ? `${requirementAssignment.programId}::${requirementAssignment.slotId}`
                  : ''}
                onChange={event => {
                  const choice = requirementChoices.find(candidate =>
                    `${candidate.programId}::${candidate.slotId}` === event.target.value
                  );
                  setRequirementAssignment(choice
                    ? { programId: choice.programId, slotId: choice.slotId }
                    : undefined);
                  if (choice) setAffiliation(choice.affiliation);
                }}
                className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-cardinal-300"
              >
                <option value="">Choose automatically</option>
                {requirementChoices.map(choice => (
                  <option
                    key={`${choice.programId}:${choice.slotId}`}
                    value={`${choice.programId}::${choice.slotId}`}
                  >
                    {choice.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[10px] text-gray-400">
                Change this when the course could satisfy more than one requirement.
              </p>
            </div>
          )}

          {/* Priority */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
            <div className="flex gap-1 sm:gap-2 flex-wrap">
              {PRIORITIES.map(p => {
                const meta = PRIORITY_META[p];
                const active = priority === p;
                return (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg border text-xs sm:text-sm font-medium transition-all
                      ${active
                        ? `${meta.badgeBg} ${meta.badgeText} border-current ring-1 ring-offset-1 ring-current`
                        : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    <PriorityIcon priority={p} size={11} />
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Fulfills (select all that apply)
            </label>
            <div className="flex flex-wrap gap-1">
              {ALL_TAGS.map(tag => {
                const { bg, text, border } = TAG_COLORS[tag];
                const active = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-medium border transition-all
                      ${active ? `${bg} ${text} ${border}` : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                  >
                    {TAG_DISPLAY[tag]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Optional notes..."
              rows={2}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cardinal-300 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-4 border-t border-gray-100 shrink-0">
          {editCard ? (
            <button
              onClick={() => { removeCard(editCard.id); onClose(); }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          ) : <div />}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-cardinal-700 rounded-lg hover:bg-cardinal-800 transition-colors"
            >
              {editCard ? 'Save changes' : 'Add class'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
