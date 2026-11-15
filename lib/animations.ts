export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

export const MOTION_TIMING = {
  revealSeconds: 0.6,
  childStaggerSeconds: 0.08,
  lineDrawSeconds: 0.7,
  routeFadeSeconds: 0.25,
  linkSeconds: 0.25,
  buttonFillSeconds: 0.25,
  heroDropDelaySeconds: 1.05,
} as const;

export function motionDuration(
  prefersReducedMotion: boolean,
  duration: number,
): number {
  return prefersReducedMotion ? 0.2 : duration;
}
