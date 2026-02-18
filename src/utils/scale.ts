// Base design resolution (all coordinates are authored at this size)
export const BASE_WIDTH = 1080;
export const BASE_HEIGHT = 1920;

// Safe-area minimums (in design-space pixels, i.e. at 1080px wide)
export const SAFE_AREA = {
  top: 160,           // minimum top padding
  bottom: 220 + 24,   // minimum bottom padding + gap for Action-Dock
  side: 32,
} as const;

// TabBar height in design-space pixels
export const TABBAR_HEIGHT = 400;

// ─── Core scale helpers ───────────────────────────────────────────────────────

/** Current scale factor: screen width divided by design width. */
export function getScale(): number {
  return window.innerWidth / BASE_WIDTH;
}

/** Convert a design-space pixel value to display pixels. */
export function s(value: number): number {
  return value * getScale();
}

/** Convert a percentage of the viewport width to display pixels. */
export function vw(percent: number): number {
  return (window.innerWidth * percent) / 100;
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

/** TabBar display height in pixels. Smaller screens get a shorter bar. */
export function getTabBarHeight(): number {
  const small = window.innerWidth <= 400 || window.innerHeight <= 700;
  return small ? s(320) : s(TABBAR_HEIGHT);
}

/**
 * Computed safe-area values in display pixels.
 * Top ≥ 160 design-px, bottom ≥ (220 + 24) design-px.
 */
export function getSafeArea() {
  const small = window.innerWidth <= 400 || window.innerHeight <= 700;
  return {
    top:    small ? s(120) : s(SAFE_AREA.top),
    bottom: small ? s(180) : s(SAFE_AREA.bottom),
    side:   s(SAFE_AREA.side),
  };
}

/** Y-coordinate of the ground patch in display pixels. */
export function getGroundY(): number {
  const small = window.innerHeight <= 700;
  return small
    ? window.innerHeight - getTabBarHeight() - s(500)
    : s(1135);
}
