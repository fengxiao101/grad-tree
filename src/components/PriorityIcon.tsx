import { Lock, Star, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Priority, PRIORITY_META } from '../types';

interface Props {
  priority: Priority;
  size?: number;
}

export function PriorityIcon({ priority, size = 14 }: Props) {
  const { iconColor } = PRIORITY_META[priority];
  const cls = `${iconColor} shrink-0`;
  if (priority === 'required') return <Lock size={size} className={cls} />;
  if (priority === 'want')     return <Star size={size} className={cls} />;
  if (priority === 'maybe')    return <HelpCircle size={size} className={cls} />;
  return <CheckCircle2 size={size} className={cls} />;
}
