import { CYCLE_DAYS } from '../utils/constants';
import { createCycleStore } from './createCycleStore';

export const useBeeStore = createCycleStore(CYCLE_DAYS.bee, 'mf_bee_state');
