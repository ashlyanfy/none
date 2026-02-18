export const BASE_WIDTH  = 1080;
export const BASE_HEIGHT = 1920;

export const SAFE_AREA = {
  top:    160,
  bottom: 244,
  side:   32,
} as const;

export const TABBAR_HEIGHT = 400;

export function getScale(): number {
  const scaleX = Math.min(window.innerWidth, 540) / BASE_WIDTH;
  const scaleY = window.innerHeight / BASE_HEIGHT;
  return Math.min(scaleX, scaleY);
}

export function s(value: number): number {
  return value * getScale();
}

export function vw(percent: number): number {
  return (BASE_WIDTH * getScale() * percent) / 100;
}

export function getTabBarHeight(): number {
  return s(TABBAR_HEIGHT);
}

export function getSafeArea() {
  return {
    top:    s(SAFE_AREA.top),
    bottom: s(SAFE_AREA.bottom),
    side:   s(SAFE_AREA.side),
  };
}

export function getGroundY(): number {
  return s(1135);
}
