import { usePlannerStore } from '../store/usePlannerStore';
import type { CourseCard } from '../types';

/**
 * Confirmation shown before a course is dropped from the whole plan.
 *
 * Removal is plan-wide rather than section-local, so the Ways and Writing
 * sections both need this warning before deleting a card.
 */
export function ConfirmRemoveCourseModal({
  card,
  onCancel,
}: {
  card: CourseCard;
  onCancel: () => void;
}) {
  const removeCard = usePlannerStore(s => s.removeCard);
  const label = [card.department, card.courseNumber].filter(Boolean).join(' ')
    || card.courseName
    || 'This course';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-5 max-w-sm w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <p className="font-semibold text-gray-900 text-sm mb-1">Remove course from plan?</p>
        <p className="text-xs text-gray-500 mb-4">
          <span className="font-medium text-gray-700">{label}</span>
          {' '}will be removed from your entire plan, including the year-by-year schedule.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { removeCard(card.id); onCancel(); }}
            className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
