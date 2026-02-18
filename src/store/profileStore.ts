import{create}from'zustand';import{persist}from'zustand/middleware';
interface D{fio:string;phone:string;city:string;address:string;comment:string}
interface P{name:string;language:'RU'|'KK';referralCode:string;delivery:D;updateProfile:(d:Partial<P>)=>void;updateDelivery:(d:Partial<D>)=>void}
export const useProfileStore=create<P>()(persist((set)=>({
name:'Фермер',language:'RU',referralCode:'MF-'+Math.random().toString(36).substring(2,8).toUpperCase(),
delivery:{fio:'',phone:'',city:'',address:'',comment:''},
updateProfile:(d)=>set(s=>({...s,...d})),updateDelivery:(d)=>set(s=>({delivery:{...s.delivery,...d}})),
}),{name:'mf_profile'}));
