import{create}from'zustand';import{persist}from'zustand/middleware';import{INITIAL_RESOURCES,GOODNESS}from'../utils/constants';
interface G{value:number;goal:number;level:number;todayCount:number;todayDate:string}
interface W{coins:number;resources:{water_g:number;oxygen_g:number;syrup_g:number};nutrients:number;goodness:G;
spendResource:(r:'water_g'|'oxygen_g'|'syrup_g',a:number)=>boolean;spendNutrient:()=>boolean;
addGoodness:(t:'dailyLogin'|'careAction'|'collect'|'qualityBonus')=>void;addCoins:(a:number)=>void}
function today(){return new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Almaty'})}
export const useWalletStore=create<W>()(persist((set,get)=>({
coins:INITIAL_RESOURCES.coins,
resources:{water_g:INITIAL_RESOURCES.water_g,oxygen_g:INITIAL_RESOURCES.oxygen_g,syrup_g:INITIAL_RESOURCES.syrup_g},
nutrients:INITIAL_RESOURCES.nutrients,
goodness:{value:0,goal:100,level:1,todayCount:0,todayDate:today()},
spendResource:(r,a)=>{if(get().resources[r]<a)return false;set(s=>({resources:{...s.resources,[r]:s.resources[r]-a}}));return true},
spendNutrient:()=>{if(get().nutrients<1)return false;set(s=>({nutrients:s.nutrients-1}));return true},
addGoodness:(t)=>set(s=>{const d=today();let{value:v,goal:g,level:l,todayCount:tc,todayDate:td}=s.goodness;
if(td!==d){tc=0;td=d}let a=0;
switch(t){case'dailyLogin':a=GOODNESS.dailyLogin;break;case'careAction':if(tc>=GOODNESS.careActionLimit)return s;a=GOODNESS.careAction;tc++;break;case'collect':a=GOODNESS.collect;break;case'qualityBonus':a=GOODNESS.qualityBonus;break}
v+=a;if(v>=g&&l<5){l++;v-=g;g=l*100}return{goodness:{value:v,goal:g,level:l,todayCount:tc,todayDate:td}}}),
addCoins:(a)=>set(s=>({coins:s.coins+a})),
}),{name:'mf_wallet'}));
