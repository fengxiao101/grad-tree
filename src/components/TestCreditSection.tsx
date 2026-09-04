import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronRight, Info, AlertCircle } from 'lucide-react';
import { TransferCreditSection } from './TransferCreditSection';
import { usePlannerStore } from '../store/usePlannerStore';
import {
  ALL_TEST_GROUPS, TestCreditGroup, SubjectArea, ExamType,
  EXAM_TYPE_LABELS, SUBJECT_AREA_ORDER, OTHER_EXAM_TYPES, SINGLE_SELECT_AREAS,
} from '../data/testCredits';

interface Props {
  totalTestUnits: number;
}

function groupsForTypeAndArea(type: ExamType | ExamType[], area: SubjectArea) {
  const types = Array.isArray(type) ? type : [type];
  return ALL_TEST_GROUPS.filter(g => types.includes(g.examType) && g.area === area);
}

function groupsForType(type: ExamType) {
  return ALL_TEST_GROUPS.filter(g => g.examType === type);
}

function GroupRow({ group }: { group: TestCreditGroup }) {
  const testCreditChecks = usePlannerStore(s => s.testCreditChecks);
  const setTestCreditCheck = usePlannerStore(s => s.setTestCreditCheck);

  const check = testCreditChecks[group.id];
  const isChecked = check?.checked ?? false;
  const selectedScore = check?.selectedScore;
  const isSingleSelect = SINGLE_SELECT_AREAS.includes(group.area);
  const isMultiScore = group.scoreOptions.length > 1;

  const toggle = () => {
    if (isChecked) {
      setTestCreditCheck(group.id, { checked: false, selectedScore: undefined });
    } else {
      // Auto-select if only one score option
      const autoScore = !isMultiScore ? group.scoreOptions[0].score : undefined;
      setTestCreditCheck(group.id, { checked: true, selectedScore: autoScore }, isSingleSelect ? group.area : undefined);
    }
  };

  const selectScore = (score: string) =>
    setTestCreditCheck(group.id, { selectedScore: score });

  const activeOpt = selectedScore
    ? group.scoreOptions.find(o => o.score === selectedScore)
    : (!isMultiScore ? group.scoreOptions[0] : undefined);

  const effectiveUnits = isChecked && activeOpt ? activeOpt.units : null;

  const scoreLabel = (opt: typeof group.scoreOptions[0]) => {
    if (group.apNEWLLang) {
      return opt.units === 0 ? `${opt.score}: lang req, no units` : `${opt.score}: lang req, ${opt.units} units`;
    }
    return opt.units === 0 ? `${opt.score}: 0 units` : `${opt.score}: ${opt.units} units`;
  };

  return (
    <label className={`flex items-start gap-3 px-4 py-2 cursor-pointer transition-colors
      ${isChecked ? 'bg-green-50/50' : 'hover:bg-gray-50/60'}`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        readOnly={isSingleSelect}
        onChange={isSingleSelect ? undefined : toggle}
        onClick={isSingleSelect ? toggle : undefined}
        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-cardinal-700 focus:ring-cardinal-300 shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className={`text-sm font-medium ${isChecked ? 'text-gray-800' : 'text-gray-700'}`}>
            {group.subject}
          </span>
          {/* Single-score: show score + units inline */}
          {!isMultiScore && (
            <>
              <span className="text-[11px] font-bold text-red-700">Must be score: {group.scoreOptions[0].score}</span>
              <span className={`text-[11px] font-medium ${group.scoreOptions[0].units === 0 ? 'text-amber-600' : 'text-gray-600'}`}>
                {group.scoreOptions[0].units === 0 ? '0 units (req only)' : `${group.scoreOptions[0].units} units`}
              </span>
              <span className="text-[11px] text-gray-400">{group.scoreOptions[0].courses}</span>
            </>
          )}
          {/* Multi-score unchecked: show score range */}
          {isMultiScore && !isChecked && (
            <span className="text-[11px] text-gray-400">
              Score {group.scoreOptions[0].score}–{group.scoreOptions[group.scoreOptions.length - 1].score}
            </span>
          )}
          {group.fulfillsLang && (
            <span className="text-[10px] font-medium bg-violet-100 text-violet-700 rounded px-1.5 py-0.5">
              Fulfills language req
            </span>
          )}
        </div>

        {group.note && (
          <p className="text-[10px] text-amber-700 mt-0.5 flex items-start gap-1">
            <AlertCircle size={10} className="shrink-0 mt-0.5" />{group.note}
          </p>
        )}

        {/* Score selector for multi-option groups */}
        {isMultiScore && isChecked && (
          <div className="flex items-center gap-2 mt-1.5 flex-wrap" onClick={e => e.preventDefault()}>
            <span className={`text-[11px] ${selectedScore ? 'text-gray-500' : 'font-bold text-red-600'}`}>
              {selectedScore ? 'Your score:' : 'Select your score:'}
            </span>
            {group.scoreOptions.map(opt => (
              <button
                key={opt.score}
                type="button"
                onClick={() => selectScore(opt.score)}
                className={`text-[11px] font-medium px-2 py-0.5 rounded border transition-colors
                  ${selectedScore === opt.score
                    ? 'bg-cardinal-700 text-white border-cardinal-700'
                    : 'border-red-300 text-red-700 hover:border-red-500'}`}
              >
                {scoreLabel(opt)}
              </button>
            ))}
          </div>
        )}
        {/* Show selected option courses when score is picked */}
        {isMultiScore && isChecked && activeOpt && (
          <p className="text-[11px] text-gray-400 mt-0.5">{activeOpt.courses}</p>
        )}
      </div>

      {effectiveUnits !== null && effectiveUnits > 0 && (
        <span className="text-xs font-bold text-cardinal-700 shrink-0 mt-0.5">{effectiveUnits} units ✓</span>
      )}
    </label>
  );
}

function AreaSection({ area, groups, isOpen, onToggle }: {
  area: SubjectArea;
  groups: TestCreditGroup[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const testCreditChecks = usePlannerStore(s => s.testCreditChecks);
  if (groups.length === 0) return null;
  const checkedCount = groups.filter(g => testCreditChecks[g.id]?.checked).length;
  const isSingleSelect = SINGLE_SELECT_AREAS.includes(area);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronDown size={12} className="text-gray-400" /> : <ChevronRight size={12} className="text-gray-400" />}
          <span className="text-xs font-semibold text-gray-700">{area}</span>
          {isSingleSelect && checkedCount === 0 && (
            <span className="text-[9px] text-gray-400 bg-gray-100 rounded px-1 py-0.5">pick one</span>
          )}
          {checkedCount > 0 && (
            <span className="text-[10px] bg-cardinal-100 text-cardinal-700 rounded-full px-1.5 py-0.5 font-medium">
              {checkedCount} selected
            </span>
          )}
        </div>
        <span className="text-[10px] text-gray-400">{groups.length}</span>
      </button>
      {isOpen && (
        <div className="divide-y divide-gray-50/80">
          {groups.map(group => <GroupRow key={group.id} group={group} />)}
        </div>
      )}
    </div>
  );
}

function ExamGroup({ groupId, label, examTypes, isOpen, onToggle, openSections, onToggleSection }: {
  groupId: string;
  label: string;
  examTypes: ExamType[];
  isOpen: boolean;
  onToggle: () => void;
  openSections: Set<string>;
  onToggleSection: (key: string) => void;
}) {
  const testCreditChecks = usePlannerStore(s => s.testCreditChecks);
  const allGroups = ALL_TEST_GROUPS.filter(g => examTypes.includes(g.examType));
  const checkedCount = allGroups.filter(g => testCreditChecks[g.id]?.checked).length;

  const isByArea = examTypes.length === 1 && (examTypes[0] === 'AP' || examTypes[0] === 'IBACC');

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
          <span className="text-sm font-semibold text-gray-800">{label}</span>
          {checkedCount > 0 && (
            <span className="text-[11px] bg-cardinal-100 text-cardinal-700 rounded-full px-2 py-0.5 font-medium">
              {checkedCount} selected
            </span>
          )}
        </div>
        <span className="text-[11px] text-gray-400">{allGroups.length} exams</span>
      </button>

      {isOpen && (
        <div className="bg-white border-t border-gray-100">
          {isByArea && examTypes.map(type =>
            SUBJECT_AREA_ORDER.map(area => {
              const groups = groupsForTypeAndArea(type, area);
              const sKey = `${groupId}-${area}`;
              return (
                <AreaSection
                  key={sKey}
                  area={area}
                  groups={groups}
                  isOpen={openSections.has(sKey)}
                  onToggle={() => onToggleSection(sKey)}
                />
              );
            })
          )}

          {!isByArea && OTHER_EXAM_TYPES.filter(t => allGroups.some(g => g.examType === t)).map(type => {
            const groups = groupsForType(type);
            const sKey = `${groupId}-${type}`;
            const isTypeOpen = openSections.has(sKey);
            const checkedInType = groups.filter(g => testCreditChecks[g.id]?.checked).length;

            return (
              <div key={type} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => onToggleSection(sKey)}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {isTypeOpen ? <ChevronDown size={12} className="text-gray-400" /> : <ChevronRight size={12} className="text-gray-400" />}
                    <span className="text-xs font-semibold text-gray-700">{EXAM_TYPE_LABELS[type]}</span>
                    {checkedInType > 0 && (
                      <span className="text-[10px] bg-cardinal-100 text-cardinal-700 rounded-full px-1.5 py-0.5 font-medium">
                        {checkedInType}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">{groups.length}</span>
                </button>
                {isTypeOpen && (
                  <div className="divide-y divide-gray-50/80">
                    {groups.map(group => (
                      <GroupRow key={group.id} group={group} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TestCreditSection({ totalTestUnits }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const makeToggle = (setter: React.Dispatch<React.SetStateAction<Set<string>>>) =>
    (key: string) => setter(prev => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });

  const toggleGroup = makeToggle(setOpenGroups);
  const toggleSection = makeToggle(setOpenSections);

  const testCreditChecks = usePlannerStore(s => s.testCreditChecks);
  const checkedTotal = ALL_TEST_GROUPS.filter(g => testCreditChecks[g.id]?.checked).length;

  return (
    <section className="mb-8 sm:mb-12">
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <button onClick={() => setCollapsed(v => !v)} className="h-8 sm:h-auto flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            {collapsed ? <ChevronRight size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            <h2 className="font-serif font-semibold text-[17px] text-gray-900">External Credits</h2>
          </button>
          <a
            href="https://studentservices.stanford.edu/my-academics/earn-my-degree/undergraduate-degree-progress/test-transfer-credit/external-test-0"
            target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 sm:w-auto sm:h-auto flex items-center justify-center text-gray-500 hover:text-cardinal-700" aria-label="Stanford test credit chart"
          >
            <ExternalLink size={12} />
          </a>
          </div>
          {totalTestUnits > 0 && (
            <span className="text-sm font-semibold text-cardinal-700">{totalTestUnits} units toward graduation</span>
          )}
        </div>
        <div className="h-px bg-gradient-to-r from-gray-300 to-transparent mt-2" />
      </div>

      {!collapsed && (<>
      <div className="flex items-start gap-1.5 mb-4 text-[11px] text-red-700">
        <Info size={13} className="shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Max 45 units of external credit toward degree. <strong>No exam fulfills Ways requirements.</strong>{' '}
          Units shown are from the 2026-27 equivalency chart, verify at{' '}
          <a href="https://studentservices.stanford.edu/my-academics/earn-my-degree/undergraduate-degree-progress/test-transfer-credit/external-test-0"
            target="_blank" rel="noopener noreferrer" className="underline hover:text-red-900">
            Stanford Student Services →
          </a>
        </p>
      </div>

      <TransferCreditSection />

      <div className="mb-2">
        <span className="text-xs font-semibold text-gray-700">AP / IB / Other Exams</span>
      </div>

      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <ExamGroup
          groupId="AP"
          label="Advanced Placement (AP)"
          examTypes={['AP']}
          isOpen={openGroups.has('AP')}
          onToggle={() => toggleGroup('AP')}
          openSections={openSections}
          onToggleSection={toggleSection}
        />
        <ExamGroup
          groupId="IB"
          label="International Baccalaureate (IB HL only)"
          examTypes={['IBACC']}
          isOpen={openGroups.has('IB')}
          onToggle={() => toggleGroup('IB')}
          openSections={openSections}
          onToggleSection={toggleSection}
        />
        <ExamGroup
          groupId="OTHER"
          label="Other International Exams"
          examTypes={OTHER_EXAM_TYPES}
          isOpen={openGroups.has('OTHER')}
          onToggle={() => toggleGroup('OTHER')}
          openSections={openSections}
          onToggleSection={toggleSection}
        />

        {totalTestUnits > 0 && (
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
            <span className="text-xs text-gray-500">{checkedTotal} exam{checkedTotal !== 1 ? 's' : ''} selected</span>
            <span className="text-sm font-bold text-cardinal-700">{totalTestUnits} units toward graduation</span>
          </div>
        )}
      </div>
      </>)}
    </section>
  );
}
