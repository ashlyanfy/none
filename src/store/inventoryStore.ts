import{create}from'zustand';import{persist}from'zustand/middleware';
export interface InventoryItem{id:string;product:'carrot'|'apple'|'trout'|'honey';weight_g:number;quality:number;collectedAtMs:number}
interface I{items:InventoryItem[];addItem:(i:Omit<InventoryItem,'id'|'collectedAtMs'>)=>void;removeItem:(id:string)=>void}
export const useInventoryStore=create<I>()(persist((set)=>({
items:[],
addItem:(i)=>set(s=>({items:[...s.items,{...i,id:'inv_'+Date.now(),collectedAtMs:Date.now()}]})),
removeItem:(id)=>set(s=>({items:s.items.filter(x=>x.id!==id)})),
}),{name:'mf_inventory'}));
