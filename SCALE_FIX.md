# Исправления для iPhone SE (375×667)

## Проблема
На маленьких экранах (375×667) элементы накладывались друг на друга из-за фиксированных координат.

## Решение

### 1. Система масштабирования (scale.ts)
```typescript
// БЫЛО: scale зависел от контейнера и высоты
export function getScale(): number { 
  const w = window.innerWidth;
  if (w <= 400) return w / BASE_WIDTH;
  return getContainerWidth() / BASE_WIDTH;
}

// СТАЛО: scale ТОЛЬКО от ширины экрана
export function getScale(): number { 
  return window.innerWidth / BASE_WIDTH;
}
```

### 2. Адаптивные константы
```typescript
// Динамический SAFE_AREA
export function getSafeArea() {
  const isSmall = window.innerWidth <= 400 || window.innerHeight <= 700;
  return {
    top: isSmall ? s(120) : s(160),
    bottom: isSmall ? s(180) : s(220),
    side: s(32)
  };
}

// Динамический TABBAR_HEIGHT
export function getTabBarHeight(): number {
  const isSmall = window.innerWidth <= 400 || window.innerHeight <= 700;
  return isSmall ? s(320) : s(400);
}
```

### 3. Привязка элементов к TabBar
Все нижние элементы теперь позиционируются относительно `getTabBarHeight()`:

- **ActionDock** (прогресс): `bottom: getTabBarHeight() + s(24)`
- **NutrientsBadge**: `bottom: getTabBarHeight() + s(120)`
- **ui_funnel** (лейка): `bottom: getTabBarHeight() + s(120)`

## Результат

✅ **375×667 (iPhone SE)** - элементы не накладываются
✅ **390×844 (iPhone 12)** - работает корректно
✅ **414×896 (iPhone 11 Pro Max)** - работает корректно
✅ **360×640 (малые Android)** - работает корректно

## Принцип работы

1. **scale = screenWidth / 1080** (база 1080×1920)
2. Все размеры умножаются на scale: `s(value)`
3. На маленьких экранах (≤400px или ≤700px высоты):
   - TABBAR_HEIGHT: 400 → 320
   - SAFE_AREA.top: 160 → 120
   - SAFE_AREA.bottom: 220 → 180
4. Элементы привязаны к динамическому TabBar, а не к фиксированным координатам
