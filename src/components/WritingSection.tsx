import { useEffect, useState } from 'react';
import { ExternalLink, Info, ChevronDown, ChevronRight, CheckSquare, Square, Plus } from 'lucide-react';
import { CourseCard, TAG_COLORS, WritingTag, SectionTag } from '../types';
import { GEN_ED_CONFIG, GenEdConfig } from '../data/requirements';
import { ClassCard } from './ClassCard';
import { usePlannerStore } from '../store/usePlannerStore';
import { ConfirmRemoveCourseModal } from './ConfirmRemoveCourseModal';
import type { TransferCredit } from '../store/usePlannerStore';
import { ALL_TEST_GROUPS } from '../data/testCredits';
import { EmptyDropZone } from './EmptyDropZone';
import { lookupCourse } from '../data/catalog';
import type { CatalogCourse } from '../data/catalog';
import type { CourseOption } from '../data/majorSchema';
import { cardSatisfiesWim, matchesOption } from '../utils/majorUtils';
import {
  getPendingRequirementReveal,
  onRequirementReveal,
  requirementElementId,
} from '../utils/requirementNavigation';

interface Props {
  cards: CourseCard[];
  onAddClick: (preTag: WritingTag | 'COLLEGE' | 'LANG') => void;
  onEditCard: (card: CourseCard) => void;
  onDoubleClickCard?: (card: CourseCard) => void;
  completedQuarters: Set<string>;
  wimCourses?: CourseOption[];
  onAddCourse?: (course: CatalogCourse) => void;
}

// ── Small chip for a WIM-approved course ──────────────────────────────────────

function WimChip({
  opt,
  allCards,
  onAddCourse,
}: {
  opt: CourseOption;
  allCards: CourseCard[];
  onAddCourse?: (course: CatalogCourse) => void;
}) {
  const catalog = lookupCourse(opt.dept, opt.number);
  const alreadyAdded = allCards.some(card =>
    matchesOption(card.department, card.courseNumber, opt),
  );

  return (
    <span
      title={catalog?.title ?? opt.name ?? `${opt.dept} ${opt.number}`}
      className={`inline-flex items-center gap-1 text-[10px] font-medium rounded px-1.5 py-0.5 ${
        alreadyAdded
          ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
          : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
      }`}
    >
      {alreadyAdded ? '✓ ' : ''}{opt.dept} {opt.number}
      {!alreadyAdded && catalog && onAddCourse && (
        <button
          onClick={e => { e.stopPropagation(); onAddCourse(catalog); }}
          className="ml-0.5 hover:text-emerald-900 transition-colors"
          title={`Add ${opt.dept} ${opt.number}`}
        >
          <Plus size={9} />
        </button>
      )}
    </span>
  );
}

// ── Section box ───────────────────────────────────────────────────────────────

function SectionBox({
  cfg, cards, allCards, testFulfillments, manualFulfilled, onManualFulfill,
  onAdd, onEdit, onDoubleClick, completedQuarters, wimCourses, onAddCourse, onDeleteCard, transferFills,
}: {
  cfg: GenEdConfig;
  cards: CourseCard[];
  allCards: CourseCard[];
  testFulfillments?: string[];
  manualFulfilled?: boolean;
  onManualFulfill?: (val: boolean) => void;
  onAdd: () => void;
  onEdit: (card: CourseCard) => void;
  onDoubleClick?: (card: CourseCard) => void;
  completedQuarters: Set<string>;
  wimCourses?: CourseOption[];
  onAddCourse?: (course: CatalogCourse) => void;
  onDeleteCard?: (card: CourseCard) => void;
  transferFills?: TransferCredit[];
}) {
  const { bg, text, border } = TAG_COLORS[cfg.tag];
  const testCount = testFulfillments?.length ?? 0;
  const transferCount = transferFills?.length ?? 0;
  const complete = cfg.noCounter
    ? manualFulfilled || testCount > 0 || transferCount > 0 || cards.length >= cfg.needed
    : (cards.length + testCount + transferCount) >= cfg.needed;

  const panelClass = complete
    ? 'requirement-complete theme-complete-panel border'
    : `${cfg.accent} border-2 ${border}`;
  const isWim = cfg.tag === 'WIM';

  return (
    <div
      id={requirementElementId({
        area: 'writing',
        requirementId: cfg.tag,
        fallbackSectionId: 'section-writing',
      })}
      className={`requirement-glass rounded p-3 flex flex-col h-full min-w-0 w-full ${panelClass} cursor-pointer`}
      onClick={onAdd}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[10px] font-bold rounded px-1.5 py-0.5 ${bg} ${text}`}>
            {cfg.display}
          </span>
          {cfg.link && (
            <a href={cfg.link} target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-cardinal-700" aria-label={`${cfg.display} info`}
              onClick={e => e.stopPropagation()}>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
        <span className={`text-[10px] font-semibold shrink-0 ${complete ? 'text-green-600' : 'text-gray-400'}`}>
          {cfg.noCounter ? (complete ? '✓' : '') : `${cards.length + testCount + transferCount}/${cfg.needed} courses`}
        </span>
      </div>

      <p className="text-[11px] text-gray-500 mb-2">{cfg.sublabel}</p>

      {cfg.note && (
        <div className={`flex items-start gap-1 rounded-lg px-2 py-1.5 mb-2 border ${border} bg-white/60`}>
          <Info size={11} className={`${text} shrink-0 mt-0.5`} />
          <p className="text-[10px] text-gray-600 leading-tight">
            {cfg.note}{' '}
            {cfg.noteLink && cfg.noteLinkLabel && (
              <a href={cfg.noteLink} target="_blank" rel="noopener noreferrer"
                className="underline hover:text-cardinal-700">
                {cfg.noteLinkLabel}
              </a>
            )}
          </p>
        </div>
      )}

      {testFulfillments && testFulfillments.length > 0 && (
        <div className="flex flex-col gap-1 mb-2">
          {testFulfillments.map(name => (
            <div key={name} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 border ${border} bg-white/80`}>
              <span className="text-[10px] text-green-600">✓</span>
              <p className="text-[10px] font-medium text-gray-700 leading-tight">{name}</p>
              <span className="text-[10px] text-gray-400 ml-auto">via test credit</span>
            </div>
          ))}
        </div>
      )}

      {onManualFulfill && (
        <button
          onClick={e => { e.stopPropagation(); onManualFulfill(!manualFulfilled); }}
          className="flex items-center gap-1.5 mt-1 mb-2 text-left group"
        >
          {manualFulfilled
            ? <CheckSquare size={12} className="text-green-500 shrink-0" />
            : <Square size={12} className="text-gray-300 group-hover:text-gray-400 shrink-0" />}
          <span className="text-[10px] text-gray-500 group-hover:text-gray-700 leading-tight">
            Placed into a higher level / requirement met
          </span>
        </button>
      )}

      {/* WIM: show major-specific approved courses */}
      {isWim && wimCourses && wimCourses.length > 0 && (
        <div
          className={`rounded-lg px-2 py-1.5 mb-2 border ${border} bg-white/60`}
          onClick={e => e.stopPropagation()}
        >
          <p className="text-[10px] text-gray-500 mb-1 font-medium">Approved for your major:</p>
          <div className="flex flex-wrap gap-1">
            {wimCourses.map(opt => (
              <WimChip
                key={`${opt.dept}${opt.number}`}
                opt={opt}
                allCards={allCards}
                onAddCourse={onAddCourse}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1 flex-1">
        {transferFills?.map(tf => (
          <div key={tf.id} className="text-[10px] text-sky-700 bg-sky-50 border border-sky-200 rounded px-1.5 py-0.5 leading-tight">
            ✓ {tf.name || 'Transfer credit'} <span className="text-sky-400">(transfer)</span>
          </div>
        ))}
        {cards.length === 0 && transferCount === 0
          ? <EmptyDropZone text="drag or click to search" />
          : cards.map(card => (
              <ClassCard key={card.id} card={card} onEdit={onEdit} onDoubleClick={onDoubleClick} contextTag={cfg.tag as SectionTag} noDrag isCompleted={completedQuarters.has(card.quarterId)} onDelete={onDeleteCard ? () => onDeleteCard(card) : undefined} />
            ))
        }
      </div>
    </div>
  );
}

export function WritingSection({ cards, onAddClick, onEditCard, onDoubleClickCard, completedQuarters, wimCourses, onAddCourse }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<CourseCard | null>(null);
  const testCreditChecks = usePlannerStore(s => s.testCreditChecks);
  const manualLangFulfilled = usePlannerStore(s => s.manualLangFulfilled);
  const setManualLangFulfilled = usePlannerStore(s => s.setManualLangFulfilled);
  const transferCredits = usePlannerStore(s => s.transferCredits);

  useEffect(() => {
    const revealWriting = (detail: ReturnType<typeof getPendingRequirementReveal>) => {
      if (detail?.area === 'writing') setCollapsed(false);
    };
    revealWriting(getPendingRequirementReveal());
    return onRequirementReveal(revealWriting);
  }, []);
  const cardsFor = (tag: WritingTag | 'COLLEGE' | 'LANG') => cards.filter(card =>
    tag === 'WIM' ? cardSatisfiesWim(card, wimCourses) : card.tags.includes(tag),
  );

  const langTestFulfillments = ALL_TEST_GROUPS
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
      const unitsStr = opt.units > 0 ? `, ${opt.units} units` : ', lang req only';
      return `${group.subject} (score ${scoreStr}${unitsStr})`;
    });

  const transferFillsFor = (tag: string) =>
    transferCredits.filter(tc => tc.waysTags?.includes(tag));

  const missing = GEN_ED_CONFIG.filter(cfg => {
    const filled = cardsFor(cfg.tag).length;
    const testCount = cfg.fulfillsLang ? langTestFulfillments.length : 0;
    const transferCount = transferFillsFor(cfg.tag).length;
    if (cfg.noCounter) return !(cfg.fulfillsLang && manualLangFulfilled) && (filled + testCount + transferCount) < 1;
    return (filled + testCount + transferCount) < cfg.needed;
  });

  return (
    <section className="mb-8 sm:mb-12">
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <button onClick={() => setCollapsed(v => !v)} className="h-8 sm:h-auto flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            {collapsed ? <ChevronRight size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            <h2 className="font-serif font-semibold text-[17px] text-gray-900">COLLEGE, Language &amp; Writing</h2>
          </button>
          <a href="https://bulletin.stanford.edu/academic-polices/degree-requirements/general-education"
            target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 sm:w-auto sm:h-auto flex items-center justify-center text-gray-500 hover:text-cardinal-700" aria-label="General Education Requirements info">
            <ExternalLink size={12} />
          </a>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-gray-300 to-transparent mt-2" />
      </div>
      {!collapsed && (<>
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {missing.length > 0 && (
          <>
            <span className="text-[11px] text-gray-400">Still needed:</span>
            {missing.map(cfg => {
              const filled = cardsFor(cfg.tag).length;
              const testCount = cfg.fulfillsLang ? langTestFulfillments.length : 0;
              const transferCount = transferFillsFor(cfg.tag).length;
              const still = cfg.needed - filled - testCount - transferCount;
              const { bg, text } = TAG_COLORS[cfg.tag];
              return (
                <span key={cfg.tag} className={`text-[11px] font-medium rounded px-1.5 py-0.5 ${bg} ${text}`}>
                  {cfg.display}{cfg.tag !== 'LANG' && still > 1 ? ` ×${still}` : ''}
                </span>
              );
            })}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 items-stretch sm:[grid-template-rows:minmax(110px,auto)_minmax(110px,auto)_minmax(90px,auto)]">
        {GEN_ED_CONFIG.map(cfg => (
          <div key={cfg.tag} className={`${cfg.gridPlacement} flex min-w-0`}>
            <SectionBox
              cfg={cfg}
              cards={cardsFor(cfg.tag)}
              allCards={cards}
              testFulfillments={cfg.fulfillsLang ? langTestFulfillments : undefined}
              manualFulfilled={cfg.fulfillsLang ? manualLangFulfilled : undefined}
              onManualFulfill={cfg.fulfillsLang ? setManualLangFulfilled : undefined}
              onAdd={() => onAddClick(cfg.tag as WritingTag | 'COLLEGE' | 'LANG')}
              onEdit={onEditCard}
              onDoubleClick={onDoubleClickCard}
              completedQuarters={completedQuarters}
              wimCourses={cfg.tag === 'WIM' ? wimCourses : undefined}
              onAddCourse={cfg.tag === 'WIM' ? onAddCourse : undefined}
              onDeleteCard={setPendingDelete}
              transferFills={transferFillsFor(cfg.tag)}
            />
          </div>
        ))}
      </div>
      </>)}

      {pendingDelete && (
        <ConfirmRemoveCourseModal card={pendingDelete} onCancel={() => setPendingDelete(null)} />
      )}
    </section>
  );
}
