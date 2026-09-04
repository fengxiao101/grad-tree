import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function CollapsibleHeader({
  collapsed,
  onToggle,
  icon,
  label,
}: {
  collapsed: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity w-full text-left"
    >
      {collapsed
        ? <ChevronRight size={13} className="text-gray-400" />
        : <ChevronDown size={13} className="text-gray-400" />}
      {icon}
      <span className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
    </button>
  );
}
