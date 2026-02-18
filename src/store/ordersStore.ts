import{create}from'zustand';import{persist}from'zustand/middleware';
export type OrderStatus='Created'|'Confirmed'|'Preparing'|'Delivering'|'Delivered'|'Cancelled';
export interface OrderItem{product:string;weight_g:number}
export interface Order{id:string;items:OrderItem[];status:OrderStatus;createdAtMs:number}
interface O{orders:Order[];createOrder:(i:OrderItem[])=>void;updateStatus:(id:string,s:OrderStatus)=>void}
export const useOrdersStore=create<O>()(persist((set)=>({
orders:[],
createOrder:(items)=>set(s=>({orders:[...s.orders,{id:'ord_'+Date.now(),items,status:'Created',createdAtMs:Date.now()}]})),
updateStatus:(id,st)=>set(s=>({orders:s.orders.map(o=>o.id===id?{...o,status:st}:o)})),
}),{name:'mf_orders'}));
