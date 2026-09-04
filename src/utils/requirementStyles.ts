export const REQUIREMENT_STATE_STYLES = {
  complete: {
    panel: 'requirement-complete theme-complete-panel',
    row: 'theme-complete-row',
    title: 'theme-complete-title',
    count: 'theme-complete-count',
    check: 'theme-complete-check',
  },
  incomplete: {
    panel: 'theme-incomplete-panel',
    row: 'theme-incomplete-row',
    title: 'theme-incomplete-title',
    count: 'theme-incomplete-count',
    check: 'theme-incomplete-check',
  },
  neutral: {
    panel: 'border-gray-200 bg-white',
    row: 'bg-white/70',
    title: 'text-gray-700',
    count: 'text-gray-500',
    check: 'text-gray-400',
  },
} as const;

export function getRequirementStateStyles(complete: boolean | null) {
  return complete === null
    ? REQUIREMENT_STATE_STYLES.neutral
    : complete ? REQUIREMENT_STATE_STYLES.complete : REQUIREMENT_STATE_STYLES.incomplete;
}
