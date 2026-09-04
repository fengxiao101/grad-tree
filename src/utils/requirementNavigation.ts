export type RequirementArea = 'major' | 'minor' | 'coterm' | 'ways' | 'writing';

export interface RequirementRevealDetail {
  area: RequirementArea;
  programId?: string;
  requirementId: string;
  fallbackSectionId: 'section-major' | 'section-ways' | 'section-writing';
}

const REQUIREMENT_REVEAL_EVENT = 'cardinal-planner:reveal-requirement';
let pendingReveal: RequirementRevealDetail | null = null;

export function requirementElementId(detail: RequirementRevealDetail): string {
  const prefix = `requirement-${encodeURIComponent(detail.area)}`;
  return detail.programId
    ? `${prefix}-${encodeURIComponent(detail.programId)}-${encodeURIComponent(detail.requirementId)}`
    : `${prefix}-${encodeURIComponent(detail.requirementId)}`;
}

export function revealRequirement(detail: RequirementRevealDetail) {
  pendingReveal = detail;
  window.dispatchEvent(new CustomEvent<RequirementRevealDetail>(
    REQUIREMENT_REVEAL_EVENT,
    { detail },
  ));
}

export function getPendingRequirementReveal() {
  return pendingReveal;
}

export function clearPendingRequirementReveal(detail: RequirementRevealDetail) {
  if (pendingReveal === detail) pendingReveal = null;
}

export function onRequirementReveal(listener: (detail: RequirementRevealDetail) => void) {
  const handler = (event: Event) => {
    listener((event as CustomEvent<RequirementRevealDetail>).detail);
  };
  window.addEventListener(REQUIREMENT_REVEAL_EVENT, handler);
  return () => window.removeEventListener(REQUIREMENT_REVEAL_EVENT, handler);
}
