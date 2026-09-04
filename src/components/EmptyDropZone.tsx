interface Props {
  text?: string;
  compact?: boolean;
}

export function EmptyDropZone({ text = 'drag courses or click to search', compact = false }: Props) {
  return (
    <span className={`flex items-center justify-center text-[10px] font-medium rounded-sm border border-dashed
      ${compact ? 'flex-1 py-1 mt-0.5' : 'flex-1 py-3'}`}
      style={{ color: 'var(--drop-hint-text)', borderColor: 'var(--drop-hint-border)' }}>
      {text}
    </span>
  );
}
