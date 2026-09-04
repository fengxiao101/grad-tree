import { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, X, Tag } from 'lucide-react';
import { usePlannerStore } from '../store/usePlannerStore';
import type { CatalogCourse } from '../data/catalog/full';
import { TAG_COLORS, TAG_DISPLAY, ALL_TAGS } from '../types';
import type { SectionTag } from '../types';

function CourseSearchInput({ onSelect }: {
  onSelect: (dept: string, number: string, units: number) => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CatalogCourse[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (q: string) => {
    setQuery(q);
    if (q.trim().length >= 2) {
      import('../data/catalog/full').then(({ searchCourses }) => {
        setResults(searchCourses(q, 8));
        setOpen(true);
      });
    } else {
      setResults([]);
      setOpen(false);
    }
  };

  const pick = (course: CatalogCourse) => {
    setQuery('');
    setOpen(false);
    setResults([]);
    onSelect(course.depts[0], course.numbers[0], parseFloat(course.units) || 0);
  };

  return (
    <div ref={ref} className="relative w-1/3 shrink-0">
      <input
        type="text"
        value={query}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => query.trim().length >= 2 && setOpen(true)}
        placeholder="+ Add matching Stanford credit(s)"
        className="w-full text-xs border border-dashed border-sky-300 rounded px-2 py-1 focus:outline-none focus:border-sky-500 bg-white text-sky-700 placeholder-sky-300"
      />
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-0.5 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto">
          {results.map((course, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={e => { e.preventDefault(); pick(course); }}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-2"
            >
              <span className="font-mono font-semibold text-gray-700 shrink-0">
                {course.depts[0]} {course.numbers[0]}
              </span>
              <span className="text-gray-500 truncate">{course.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function WaysTagPicker({ selected, onChange }: {
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (tag: SectionTag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter(t => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-0.5 text-[10px] font-medium text-gray-400 hover:text-gray-600 border border-dashed border-gray-300 rounded px-1.5 py-0.5 transition-colors"
      >
        <Tag size={9} />
        Tag
      </button>
      {open && (
        <div className="absolute z-50 bottom-full right-0 mb-1 bg-white border border-gray-200 rounded shadow-lg p-1.5 min-w-[120px]">
          <p className="text-[9px] text-gray-400 uppercase tracking-wide px-1 mb-1">Ways / Gen Ed</p>
          <div className="flex flex-col gap-0.5">
            {ALL_TAGS.map(tag => {
              const colors = TAG_COLORS[tag];
              const isOn = selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onMouseDown={e => { e.preventDefault(); toggle(tag); }}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium text-left transition-colors
                    ${isOn ? `${colors.bg} ${colors.text}` : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full border ${isOn ? colors.border : 'border-gray-300'}`}
                    style={isOn ? { backgroundColor: 'currentColor' } : {}} />
                  {TAG_DISPLAY[tag]}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function TransferCreditSection() {
  const transferCredits = usePlannerStore(s => s.transferCredits);
  const addTransferCredit = usePlannerStore(s => s.addTransferCredit);
  const updateTransferCredit = usePlannerStore(s => s.updateTransferCredit);
  const removeTransferCredit = usePlannerStore(s => s.removeTransferCredit);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-gray-700">Transfer Credits</span>
        <button
          onClick={addTransferCredit}
          className="flex items-center gap-0.5 text-[11px] font-medium text-cardinal-700 hover:text-cardinal-900 transition-colors"
        >
          <Plus size={11} /> Add
        </button>
      </div>

      {transferCredits.length === 0 && (
        <p className="text-[11px] text-gray-400 italic px-1">
          No transfer credits added yet.
        </p>
      )}

      <div className="space-y-2">
        {transferCredits.map(tc => (
          <div key={tc.id} className="bg-sky-50 border border-sky-100 rounded px-2 py-1.5">
            {/* Top row: name + units + delete */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={tc.name}
                onChange={e => updateTransferCredit(tc.id, { name: e.target.value })}
                placeholder="Credit name (e.g. Calc III from CC)"
                className="text-xs border border-gray-200 rounded px-2 py-1 flex-1 min-w-0 focus:outline-none focus:border-blue-400 bg-white"
              />
              <input
                type="number"
                value={tc.units}
                min={0}
                max={20}
                onChange={e => updateTransferCredit(tc.id, { units: Math.max(0, Number(e.target.value)) })}
                className="w-12 text-xs border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:border-blue-400 bg-white shrink-0"
              />
              <span className="text-[10px] text-gray-500 shrink-0">units</span>
              <button
                onClick={() => removeTransferCredit(tc.id)}
                className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                aria-label="Remove transfer credit"
              >
                <Trash2 size={12} />
              </button>
            </div>

            {/* Bottom row: chips + search (left), ways tags + picker (right) */}
            <div className="flex items-start gap-2 mt-1.5">
              {/* Left: course chips flowing into search */}
              <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
                {(tc.courses ?? []).map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold bg-sky-100 text-sky-800 border border-sky-200 rounded px-1.5 py-0.5"
                  >
                    {c.dept} {c.number}
                    <button
                      onClick={() => {
                        const next = (tc.courses ?? []).filter((_, j) => j !== i);
                        updateTransferCredit(tc.id, {
                          courses: next,
                          units: Math.max(0, tc.units - (c.units ?? 0)),
                        });
                      }}
                      className="text-sky-400 hover:text-red-500 transition-colors leading-none"
                      aria-label="Remove course"
                    >
                      <X size={9} />
                    </button>
                  </span>
                ))}
                <CourseSearchInput
                  onSelect={(dept, number, units) => {
                    updateTransferCredit(tc.id, {
                      courses: [...(tc.courses ?? []), { dept, number, units }],
                      units: tc.units + units,
                    });
                  }}
                />
              </div>

              {/* Right: ways tags growing leftward from picker button */}
              <div className="flex items-center gap-1 shrink-0">
                {(tc.waysTags ?? []).map(tag => {
                  const colors = TAG_COLORS[tag as SectionTag];
                  if (!colors) return null;
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-0.5 text-[10px] font-semibold rounded px-1.5 py-0.5 border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {TAG_DISPLAY[tag as SectionTag]}
                      <button
                        onClick={() => updateTransferCredit(tc.id, {
                          waysTags: (tc.waysTags ?? []).filter(t => t !== tag),
                        })}
                        className="opacity-60 hover:opacity-100 leading-none"
                        aria-label={`Remove ${tag} tag`}
                      >
                        <X size={8} />
                      </button>
                    </span>
                  );
                })}
                <WaysTagPicker
                  selected={tc.waysTags ?? []}
                  onChange={waysTags => updateTransferCredit(tc.id, { waysTags })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
