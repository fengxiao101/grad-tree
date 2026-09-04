import { useRef, useState, useEffect } from 'react';
import {
  DndContext, DragEndEvent, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, useSortable, arrayMove, horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GitCompare, Copy, Trash2, Pencil } from 'lucide-react';
import { MAX_SCENARIOS, usePlannerStore } from '../store/usePlannerStore';

interface Props {
  onCompare: () => void;
}

interface ContextMenu {
  scenarioId: string;
  x: number;
  y: number;
}

function SortableTab({
  id,
  isActive,
  isRenaming,
  name,
  color,
  renameVal,
  renameInputRef,
  onRenameChange,
  onRenameKeyDown,
  onRenameBlur,
  onClick,
  onDoubleClick,
  onContextMenu,
}: {
  id: string;
  isActive: boolean;
  isRenaming: boolean;
  name: string;
  color: string;
  renameVal: string;
  renameInputRef: React.RefObject<HTMLInputElement>;
  onRenameChange: (v: string) => void;
  onRenameKeyDown: (e: React.KeyboardEvent) => void;
  onRenameBlur: () => void;
  onClick: () => void;
  onDoubleClick: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative shrink-0">
      {isRenaming ? (
        <div className="flex items-center px-2 py-1 rounded-lg border-2" style={{ borderColor: color }}>
          <input
            ref={renameInputRef}
            autoFocus
            value={renameVal}
            onChange={e => onRenameChange(e.target.value)}
            onKeyDown={onRenameKeyDown}
            onBlur={onRenameBlur}
            className="font-serif text-sm font-semibold outline-none w-32 bg-transparent"
            style={{ color }}
          />
        </div>
      ) : (
        <button
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onContextMenu={onContextMenu}
          onPointerDownCapture={e => {
            // A secondary click opens the options menu; it must not also
            // activate the drag sensor attached to this sortable tab.
            if (e.button !== 0) e.stopPropagation();
          }}
          className="font-serif h-8 sm:h-auto flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[11px] sm:text-sm font-semibold transition-all whitespace-nowrap cursor-grab active:cursor-grabbing"
          style={isActive ? { backgroundColor: color } : undefined}
          data-active={isActive ? 'true' : 'false'}
          title="Click to switch · Double-click to rename · Right-click for options · Drag to reorder"
          {...attributes}
          {...listeners}
        >
          {!isActive && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />}
          {name}
        </button>
      )}
    </div>
  );
}

export function ScenarioBar({ onCompare }: Props) {
  const scenarios       = usePlannerStore(s => s.scenarios);
  const activeScenarioId = usePlannerStore(s => s.activeScenarioId);
  const switchScenario  = usePlannerStore(s => s.switchScenario);
  const addScenario     = usePlannerStore(s => s.addScenario);
  const renameScenario  = usePlannerStore(s => s.renameScenario);
  const duplicateScenario = usePlannerStore(s => s.duplicateScenario);
  const deleteScenario  = usePlannerStore(s => s.deleteScenario);
  const reorderScenarios = usePlannerStore(s => s.reorderScenarios);

  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState('');
  const renameInputRef = useRef<HTMLInputElement>(null);
  /** ID of the scenario pending delete confirmation */
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const startRename = (id: string, currentName: string) => {
    setContextMenu(null);
    setRenamingId(id);
    setRenameVal(currentName);
    setTimeout(() => renameInputRef.current?.select(), 0);
  };

  const commitRename = (id: string, currentName: string) => {
    renameScenario(id, renameVal.trim() || currentName);
    setRenamingId(null);
  };

  const handleAdd = () => {
    const newId = addScenario();
    if (!newId) return;
    setRenamingId(newId);
    setRenameVal('New Plan');
    setTimeout(() => renameInputRef.current?.select(), 0);
  };

  const handleDuplicate = (id: string) => {
    const newId = duplicateScenario(id);
    if (!newId) {
      setContextMenu(null);
      return;
    }
    setContextMenu(null);
    setRenamingId(newId);
    const source = scenarios.find(s => s.id === id);
    setRenameVal(source ? `${source.name} (copy)` : 'New Plan');
    setTimeout(() => renameInputRef.current?.select(), 0);
  };

  const handleDeleteRequest = (id: string) => {
    setContextMenu(null);
    setDeleteTarget(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) deleteScenario(deleteTarget);
    setDeleteTarget(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = scenarios.findIndex(s => s.id === active.id);
    const newIndex = scenarios.findIndex(s => s.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    reorderScenarios(arrayMove(scenarios, oldIndex, newIndex).map(s => s.id));
  };

  useEffect(() => {
    if (!contextMenu) return;
    const close = () => setContextMenu(null);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [contextMenu]);

  return (
    <div className="planner-chrome border-b shadow-sm">
      <div className="px-2 sm:px-6 lg:px-10">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={scenarios.map(s => s.id)} strategy={horizontalListSortingStrategy}>
            <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide py-1">

              {scenarios.map(sc => {
                const color = sc.color ?? '#8C1515';
                return (
                  <SortableTab
                    key={sc.id}
                    id={sc.id}
                    isActive={sc.id === activeScenarioId}
                    isRenaming={renamingId === sc.id}
                    name={sc.name}
                    color={color}
                    renameVal={renameVal}
                    renameInputRef={renameInputRef}
                    onRenameChange={setRenameVal}
                    onRenameKeyDown={e => {
                      if (e.key === 'Enter') commitRename(sc.id, sc.name);
                      if (e.key === 'Escape') setRenamingId(null);
                    }}
                    onRenameBlur={() => commitRename(sc.id, sc.name)}
                    onClick={() => switchScenario(sc.id)}
                    onDoubleClick={e => { e.preventDefault(); startRename(sc.id, sc.name); }}
                    onContextMenu={e => {
                      e.preventDefault();
                      const menuWidth = 144;
                      const menuHeight = scenarios.length > 1 ? 124 : 84;
                      setContextMenu({
                        scenarioId: sc.id,
                        x: Math.max(8, Math.min(e.clientX, window.innerWidth - menuWidth - 8)),
                        y: Math.max(8, Math.min(e.clientY, window.innerHeight - menuHeight - 8)),
                      });
                    }}
                  />
                );
              })}

              <button
                onClick={handleAdd}
                disabled={scenarios.length >= MAX_SCENARIOS}
                title={scenarios.length >= MAX_SCENARIOS ? 'Maximum of 10 plans reached' : 'Add new plan'}
                className="font-serif shrink-0 h-8 sm:h-auto flex items-center gap-1 px-2 py-1 sm:py-1.5 text-[11px] sm:text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <Plus size={12} />
                <span className="text-[10px] sm:text-xs">New Plan</span>
              </button>

              <div className="flex-1 min-w-4" />

              {scenarios.length >= 2 && (
                <button
                  onClick={onCompare}
                  className="compare-button shrink-0 h-8 sm:h-auto flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-sm font-medium hover:bg-blue-50 rounded-md sm:rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
                >
                  <GitCompare size={12} />
                  Compare
                </button>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Right-click context menu */}
      {contextMenu && (
        <>
          <button
            className="fixed inset-0 z-[90] cursor-default"
            onClick={() => setContextMenu(null)}
            aria-label="Close plan options"
          />
          <div
            className="solid-ui fixed z-[100] bg-white rounded-lg shadow-2xl border border-gray-300 py-1 w-36"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            role="menu"
            aria-label="Plan options"
            onClick={e => e.stopPropagation()}
          >
          <button
            onClick={() => { const sc = scenarios.find(s => s.id === contextMenu.scenarioId); if (sc) startRename(sc.id, sc.name); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil size={13} className="text-gray-400" /> Rename
          </button>
          <button
            onClick={() => handleDuplicate(contextMenu.scenarioId)}
            disabled={scenarios.length >= MAX_SCENARIOS}
            title={scenarios.length >= MAX_SCENARIOS ? 'Maximum of 10 plans reached' : 'Duplicate plan'}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Copy size={13} className="text-gray-400" /> Duplicate
          </button>
          {scenarios.length > 1 && (
            <>
              <div className="my-1 border-t border-gray-100" />
              <button
                onClick={() => handleDeleteRequest(contextMenu.scenarioId)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={13} /> Delete
              </button>
            </>
          )}
          </div>
        </>
      )}

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40" onClick={() => setDeleteTarget(null)}>
          <div
            className="solid-ui bg-white rounded-xl shadow-2xl border border-gray-300 p-5 w-72"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-plan-title"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            <p id="delete-plan-title" className="text-sm font-semibold text-gray-800 mb-1">Delete this plan?</p>
            <p className="text-xs text-gray-500 mb-4">
              "{scenarios.find(s => s.id === deleteTarget)?.name}" will be permanently deleted and cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
