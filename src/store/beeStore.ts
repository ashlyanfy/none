import{create}from'zustand';import{persist}from'zustand/middleware';import{CYCLE_DAYS}from'../utils/constants';
interface S{cycleStartMs:number;careIndex:number;nutrientsUsed:number;cycleDurationDays:number;addCare:()=>void;addNutrient:()=>void;resetCycle:()=>void}
export const useBeeStore=create<S>()(persist((set)=>({
cycleStartMs:Date.now(),careIndex:0,nutrientsUsed:0,cycleDurationDays:CYCLE_DAYS.bee,
addCare:()=>set(s=>({careIndex:s.careIndex+1})),addNutrient:()=>set(s=>({nutrientsUsed:s.nutrientsUsed+1})),
resetCycle:()=>set({cycleStartMs:Date.now(),careIndex:0,nutrientsUsed:0}),
}),{name:'mf_bee_state'}));
