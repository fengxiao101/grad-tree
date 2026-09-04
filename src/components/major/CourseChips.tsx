import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2 } from 'lucide-react';
import { lookupCourse, type CatalogCourse } from '../../data/catalog';
import { lookupCourseDetails } from '../../data/catalog/lazyFull';
import { CourseHoverDetail } from '../CourseHoverDetail';
import { usePlannerStore } from '../../store/usePlannerStore';
import { parseHighUnit, tagsFromCatalog } from '../../utils/catalogUtils';
import { matchesOption } from '../../utils/majorUtils';
import type { CourseOption } from '../../data/majorSchema';
import { TAG_COLORS, TAG_DISPLAY, type CourseCard, type SectionTag } from '../../types';

// Course chips shown inside requirement slots, and the hover card they open.

export function CourseChipHoverCard({
  opt,
  anchorRef,
  onSelect,
  onAddAnother,
  existingCardId,
  onDelete,
  onMouseEnter,
  onMouseLeave,
}: {
  opt: CourseOption;
  anchorRef: React.RefObject<HTMLElement>;
  onSelect?: (course: CatalogCourse) => void;
  onAddAnother?: () => void;
  existingCardId?: string;
  onDelete?: (cardId: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [pos, setPos] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);
  const coreCatalog = lookupCourse(opt.dept, opt.number);
  const [catalog, setCatalog] = useState<CatalogCourse | undefined>(coreCatalog);
  const [detailsLoading, setDetailsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setCatalog(coreCatalog);
    setDetailsLoading(true);
    lookupCourseDetails(opt.dept, opt.number)
      .then(course => {
        if (active && course) setCatalog(course);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setDetailsLoading(false);
      });
    return () => { active = false; };
  }, [coreCatalog, opt.dept, opt.number]);

  // Some catalog entries list the same WAY tag twice (a data artifact from
  // the bulletin scrape, e.g. DANCE 1's ways: ["CE", "CE"]) - dedupe so React
  // doesn't get two sibling elements with the same key.
  const genEdTags: SectionTag[] = catalog ? [...new Set([
    ...(catalog.ways as SectionTag[]),
    ...(catalog.writing === '1' ? ['W1' as SectionTag] : []),
    ...(catalog.writing === '2' ? ['W2' as SectionTag] : []),
    ...(catalog.writing === 'WIM' ? ['WIM' as SectionTag] : []),
    ...(catalog.college ? ['COLLEGE' as SectionTag] : []),
    ...(catalog.language ? ['LANG' as SectionTag] : []),
  ])] : [];

  useEffect(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const cardW = Math.min(720, window.innerWidth - 16);
    const estimatedCardH = 220;
    const cardGap = 2;
    const left = Math.min(rect.left, window.innerWidth - cardW - 8);
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow >= estimatedCardH + cardGap) {
      setPos({ top: rect.bottom + cardGap, left: Math.max(8, left), width: cardW });
    } else {
      // Anchor by bottom so the card's lower edge hugs the chip regardless of actual card height
      setPos({ bottom: window.innerHeight - rect.top + cardGap, left: Math.max(8, left), width: cardW });
    }
  }, [anchorRef]);

  if (!pos) return null;

  return createPortal(
    <div
      className="solid-ui fixed z-[9999] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
      style={{ top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header row: title + Add/Delete action */}
      <div className="flex items-start justify-between gap-3 px-3.5 pt-3 pb-2.5 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-800 leading-snug">
            {catalog?.title ?? opt.name ?? `${opt.dept} ${opt.number}`}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {opt.dept} {opt.number}{catalog?.units ? ` · ${catalog.units} units` : ''}
          </p>
        </div>
        {existingCardId && onDelete ? (
          <div className="flex items-center gap-1.5 shrink-0">
            {onAddAnother && (
              <button
                onClick={onAddAnother}
                className="flex items-center gap-1 px-2.5 py-1 bg-cardinal-600 hover:bg-cardinal-700 text-white text-[11px] font-semibold rounded-lg transition-colors"
              >
                <Plus size={11} />
                Add another
              </button>
            )}
            <button
              onClick={() => onDelete(existingCardId)}
              className="flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold rounded-lg transition-colors"
            >
              <Trash2 size={11} />
              Delete
            </button>
          </div>
        ) : onSelect && catalog ? (
          <button
            onClick={() => onSelect(catalog)}
            className="flex items-center gap-1 px-2.5 py-1 bg-cardinal-600 hover:bg-cardinal-700 text-white text-[11px] font-semibold rounded-lg transition-colors shrink-0"
          >
            <Plus size={11} />
            Add
          </button>
        ) : null}
      </div>

      {/* Body */}
      <div className="px-3.5 py-2.5">
        {!catalog && detailsLoading ? (
          <p className="text-[12px] text-gray-400 italic">Loading course details…</p>
        ) : !catalog ? (
          <div className="space-y-2.5">
            <p className="text-[12px] text-gray-400 italic">
              Course does not appear in the 2026 bulletin.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('grad-tree:add-manually', {
                    detail: { dept: opt.dept, number: opt.number, name: opt.name },
                  }));
                }}
                className="flex items-center gap-1 px-2.5 py-1 bg-cardinal-600 hover:bg-cardinal-700 text-white text-[11px] font-semibold rounded-lg transition-colors"
              >
                <Plus size={11} />
                Add manually
              </button>
              <a
                href="https://explorecourses.stanford.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-500 hover:text-blue-700 underline underline-offset-2"
                onClick={e => e.stopPropagation()}
              >
                Search ExploreCourses ↗
              </a>
            </div>
          </div>
        ) : (
          <>
            {genEdTags.length > 0 && (
              <div className="flex flex-wrap gap-0.5 mb-2">
                {genEdTags.map(tag => {
                  const { bg, text } = TAG_COLORS[tag];
                  return (
                    <span key={tag} className={`text-[10px] font-semibold px-1.5 py-px rounded ${bg} ${text}`}>
                      {TAG_DISPLAY[tag]}
                    </span>
                  );
                })}
              </div>
            )}
            <CourseHoverDetail course={catalog} textSize="text-[11px]" />
            {detailsLoading && !catalog.description && (
              <p className="text-[11px] text-gray-400 italic mt-1">Loading course description…</p>
            )}
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function CourseChip({ opt, onSelect }: { opt: CourseOption; onSelect?: (course: CatalogCourse) => void }) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const code = `${opt.dept} ${opt.number}`;
  const cards = usePlannerStore(s => s.cards);
  const removeCard = usePlannerStore(s => s.removeCard);
  const addCard = usePlannerStore(s => s.addCard);
  const existingCard = useMemo(() =>
    Object.values(cards).find(c =>
      matchesOption(c.department, c.courseNumber, opt)
    ), [cards, opt.dept, opt.number]);
  const alreadyAdded = Boolean(existingCard);

  const handleAddAnother = useCallback(() => {
    const catalogEntry = lookupCourse(opt.dept, opt.number);
    const tags = existingCard?.tags?.length ? [...existingCard.tags] : (catalogEntry ? tagsFromCatalog(catalogEntry) : []);
    addCard({
      department: opt.dept,
      courseNumber: opt.number,
      courseName: opt.name ?? catalogEntry?.title ?? '',
      units: catalogEntry ? parseHighUnit(catalogEntry.units ?? '') : null,
      priority: existingCard?.priority ?? 'want',
      affiliation: existingCard?.affiliation,
      requirementAssignment: existingCard?.requirementAssignment,
      tags,
      notes: '',
      quarterId: 'unsorted',
    });
  }, [opt, addCard, existingCard]);

  const showCard = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHovered(true);
  }, []);

  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => setHovered(false), 220);
  }, []);

  return (
    <span className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        onMouseEnter={showCard}
        onMouseLeave={scheduleHide}
        onFocus={showCard}
        onBlur={scheduleHide}
        className={`text-[10px] font-medium rounded px-1.5 py-0.5 cursor-default transition-colors ${
          alreadyAdded
            ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        title={alreadyAdded ? 'Already in your plan' : undefined}
      >
        {alreadyAdded ? '✓ ' : ''}{code}
      </button>
      {hovered && (
        <CourseChipHoverCard
          opt={opt}
          anchorRef={btnRef as React.RefObject<HTMLElement>}
          onSelect={onSelect}
          onAddAnother={alreadyAdded ? handleAddAnother : undefined}
          existingCardId={existingCard?.id}
          onDelete={cardId => {
            removeCard(cardId);
            setHovered(false);
          }}
          onMouseEnter={showCard}
          onMouseLeave={scheduleHide}
        />
      )}
    </span>
  );
}

export function PinnedCardChip({ card, forceDuplicate }: { card: CourseCard; forceDuplicate?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeCard = usePlannerStore(s => s.removeCard);
  const addCard = usePlannerStore(s => s.addCard);
  const opt: CourseOption = { dept: card.department, number: card.courseNumber, name: card.courseName };

  const handleAddAnother = useCallback(() => {
    addCard({
      department: card.department,
      courseNumber: card.courseNumber,
      courseName: card.courseName,
      units: card.units,
      priority: card.priority,
      affiliation: card.affiliation,
      requirementAssignment: card.requirementAssignment,
      tags: [...card.tags],
      notes: '',
      quarterId: 'unsorted',
    }, { force: forceDuplicate });
  }, [addCard, card, forceDuplicate]);

  const showCard = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHovered(true);
  }, []);
  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => setHovered(false), 220);
  }, []);

  return (
    <span className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        onMouseEnter={showCard}
        onMouseLeave={scheduleHide}
        onFocus={showCard}
        onBlur={scheduleHide}
        className="text-[10px] font-medium rounded cursor-default transition-colors px-1.5 py-0.5 bg-green-50 text-green-700 ring-1 ring-green-200"
        title="Already in your plan"
      >
        ✓ {card.department} {card.courseNumber}
      </button>
      {hovered && (
        <CourseChipHoverCard
          opt={opt}
          anchorRef={btnRef as React.RefObject<HTMLElement>}
          onAddAnother={handleAddAnother}
          existingCardId={card.id}
          onDelete={cardId => { removeCard(cardId); setHovered(false); }}
          onMouseEnter={showCard}
          onMouseLeave={scheduleHide}
        />
      )}
    </span>
  );
}

export function OptionsPopover({ options, onSelect }: { options: CourseOption[]; onSelect?: (c: CatalogCourse) => void }) {
  return (
    <div className="mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
      <p className="text-[10px] text-gray-400 mb-1.5 font-medium">Approved courses ({options.length})</p>
      <div className="flex flex-wrap gap-1 items-center">
        {options.map((o, i) => (
          <CourseChip key={`${o.dept}${o.number}-${i}`} opt={o} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
