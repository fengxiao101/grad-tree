import { SectionTag, TAG_COLORS, TAG_DISPLAY } from '../types';

interface Props {
  tag: SectionTag;
  onRemove?: () => void;
  small?: boolean;
}

export function TagBadge({ tag, onRemove, small }: Props) {
  const { bg, text } = TAG_COLORS[tag];
  return (
    <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-medium ${bg} ${text} ${small ? 'text-[10px]' : 'text-xs'}`}>
      {TAG_DISPLAY[tag]}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 hover:opacity-70 leading-none"
          aria-label={`Remove ${tag}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
