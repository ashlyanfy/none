import { CYCLE_DAYS } from '../utils/constants';
import { createCycleStore } from './createCycleStore';

export const useFishStore = createCycleStore(CYCLE_DAYS.trout, 'mf_fish_state');
