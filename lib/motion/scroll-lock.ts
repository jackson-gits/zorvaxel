"use client";

type ScrollController = {
  start: () => void;
  stop: () => void;
};

let controller: ScrollController | null = null;
let lockCount = 0;

/**
 * Lets modal-like UI (the mobile menu) pause Lenis without either module
 * needing a direct reference to the other.
 */
export function registerScrollController(next: ScrollController | null) {
  controller = next;
  if (controller && lockCount > 0) controller.stop();
}

export function lockScroll() {
  lockCount += 1;
  controller?.stop();
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) controller?.start();
}
