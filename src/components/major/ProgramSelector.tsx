import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { CatalogCourse } from '../../data/catalog';
import type { MajorConfig } from '../../data/majorSchema';
import type { Satisfier } from '../../data/testCreditUtils';
import type { Affiliation, CourseCard, RequirementAssignment } from '../../types';
import { CollapsibleHeader } from './CollapsibleHeader';
import { configsToOptions, type ProgramOption, type SearchOption } from './programOptions';
import { ProgramBlock } from './ProgramBlock';

// Program pickers: the searchable combobox and the rows that wrap it.






// Searchable combobox used by both the persistent selector and the add-minor row.
// resetAfterSelect=true clears the input and shows placeholder again after picking.
export function SearchableSelect({
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

export function ProgramSelectorRow({
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

export function MinorAdderRow({
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

export function SingleProgramPane({
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
