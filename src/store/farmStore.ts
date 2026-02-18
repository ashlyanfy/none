import{create}from'zustand';import{persist}from'zustand/middleware';import{CYCLE_DAYS}from'../utils/constants';
interface C{cycleStartMs:number;careIndex:number;nutrientsUsed:number;cycleDurationDays:number}
interface F{activeCulture:'carrot'|'apple';cultures:{carrot:C;apple:C};switchCulture:()=>void;addCare:(c:'carrot'|'apple')=>void;addNutrient:(c:'carrot'|'apple')=>void;resetCycle:(c:'carrot'|'apple')=>void}
export const useFarmStore=create<F>()(persist((set)=>({
activeCulture:'carrot',
cultures:{carrot:{cycleStartMs:Date.now(),careIndex:0,nutrientsUsed:0,cycleDurationDays:CYCLE_DAYS.carrot},apple:{cycleStartMs:Date.now(),careIndex:0,nutrientsUsed:0,cycleDurationDays:CYCLE_DAYS.apple}},
switchCulture:()=>set(s=>({activeCulture:s.activeCulture==='carrot'?'apple':'carrot'})),
addCare:(c)=>set(s=>({cultures:{...s.cultures,[c]:{...s.cultures[c],careIndex:s.cultures[c].careIndex+1}}})),
addNutrient:(c)=>set(s=>({cultures:{...s.cultures,[c]:{...s.cultures[c],nutrientsUsed:s.cultures[c].nutrientsUsed+1}}})),
resetCycle:(c)=>set(s=>({cultures:{...s.cultures,[c]:{...s.cultures[c],cycleStartMs:Date.now(),careIndex:0,nutrientsUsed:0}}})),
}),{name:'mf_farm_state'}));
