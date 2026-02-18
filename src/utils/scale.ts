const BASE_WIDTH = 1080;
const BASE_HEIGHT = 1920;
const MAX_CONTAINER_WIDTH = 540;

export function getScale(): number { 
  return window.innerWidth / BASE_WIDTH;
}

export function s(value: number): number { 
  return value * getScale();
}

export function vw(percent: number): number { 
  return (window.innerWidth * percent) / 100;
}

export function getSafeArea() {
  const h = window.innerHeight;
  const isSmall = window.innerWidth <= 400 || h <= 700;
  return {
    top: isSmall ? s(120) : s(160),
    bottom: isSmall ? s(180) : s(220),
    side: s(32)
  };
}

export function getTabBarHeight(): number {
  const h = window.innerHeight;
  const isSmall = window.innerWidth <= 400 || h <= 700;
  return isSmall ? s(320) : s(400);
}

export function getGroundY(): number {
  const h = window.innerHeight;
  const tabH = getTabBarHeight();
  const isSmall = h <= 700;
  return isSmall ? h - tabH - s(500) : s(1135);
}

export const SAFE_AREA = { top: 160, bottom: 220, side: 32 } as const;
export const TABBAR_HEIGHT = 400;
export { BASE_WIDTH, BASE_HEIGHT, MAX_CONTAINER_WIDTH };
