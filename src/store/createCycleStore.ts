import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CycleStore {
  cycleStartMs: number;
  careIndex: number;
  nutrientsUsed: number;
  cycleDurationDays: number;
  addCare: () => void;
  addNutrient: () => void;
  resetCycle: () => void;
}

/**
 * Factory that creates a Zustand store for a single growth cycle.
 * Used by fishStore and beeStore which share identical structure.
 */
export function createCycleStore(durationDays: number, persistKey: string) {
  return create<CycleStore>()(persist(
    (set) => ({
      cycleStartMs:      Date.now(),
      careIndex:         0,
      nutrientsUsed:     0,
      cycleDurationDays: durationDays,
      addCare:      () => set(s => ({ careIndex:     s.careIndex + 1 })),
      addNutrient:  () => set(s => ({ nutrientsUsed: s.nutrientsUsed + 1 })),
      resetCycle:   () => set({ cycleStartMs: Date.now(), careIndex: 0, nutrientsUsed: 0 }),
    }),
    { name: persistKey },
  ));
}
