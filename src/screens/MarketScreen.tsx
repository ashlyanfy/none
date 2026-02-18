import { useState } from 'react';
import { s, TABBAR_HEIGHT } from '../utils/scale';
import { useOrdersStore } from '../store/ordersStore';

const PRODUCTS = [
  { id:'carrot', name:'Морковь', weight:'1 кг', price:450, photo:'/assets/photos/photo_product_carrot_1kg.jpg' },
  { id:'apples', name:'Яблоки', weight:'1 кг', price:550, photo:'/assets/photos/photo_product_apples_1kg.jpg' },
  { id:'trout', name:'Форель', weight:'1 кг', price:2400, photo:'/assets/photos/photo_product_trout_1kg.jpg' },
  { id:'honey', name:'Мёд', weight:'0.5 кг', price:1800, photo:'/assets/photos/photo_product_honey_0_5kg.jpg' },
];

export default function MarketScreen() {
  const createOrder = useOrdersStore(s=>s.createOrder);
  const [search, setSearch] = useState('');
  const [bought, setBought] = useState<string|null>(null);
  const filtered = PRODUCTS.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
  const buy = (p:typeof PRODUCTS[0]) => { createOrder([{product:p.id,weight_g:p.id==='honey'?500:1000}]); setBought(p.id); setTimeout(()=>setBought(null),2000); };
  return (
    <div style={{ width:'100%',height:'100%',background:'#F5F0EB',overflow:'hidden' }}>
      <div style={{ width:'100%',height:s(360),backgroundImage:'url(/assets/market/hero_market_groupbuy_bg.png)',backgroundSize:'cover',backgroundPosition:'center',display:'flex',alignItems:'flex-end',padding:`0 ${s(32)}px ${s(20)}px` }}>
        <span style={{ fontSize:s(40),fontWeight:900,color:'#FFF',fontFamily:'Nunito',textShadow:'2px 2px 6px rgba(0,0,0,0.4)' }}>Рынок</span>
      </div>
      <div style={{ padding:`${s(16)}px ${s(32)}px` }}>
        <div style={{ display:'flex',alignItems:'center',gap:s(10),background:'#FFF',borderRadius:s(24),padding:`${s(12)}px ${s(16)}px`,boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
          <span style={{fontSize:s(28),opacity:0.4}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Поиск..." style={{ border:'none',outline:'none',background:'none',flex:1,fontSize:s(24),fontFamily:'Nunito',color:'#333' }}/>
        </div>
      </div>
      <div style={{ padding:`0 ${s(32)}px`,paddingBottom:s(TABBAR_HEIGHT+20),overflowY:'auto',height:`calc(100% - ${s(460)}px)`,display:'flex',flexDirection:'column',gap:s(16) }}>
        {filtered.map(p=>(
          <div key={p.id} style={{ display:'flex',alignItems:'center',gap:s(16),background:'#FFF',borderRadius:s(20),padding:s(12),boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <img src={p.photo} alt={p.name} style={{ width:s(160),height:s(160),borderRadius:s(16),objectFit:'cover',flexShrink:0 }}/>
            <div style={{ flex:1,display:'flex',flexDirection:'column',gap:s(4) }}>
              <span style={{ fontSize:s(28),fontWeight:800,color:'#1F1F1F',fontFamily:'Nunito' }}>{p.name}</span>
              <span style={{ fontSize:s(22),color:'#888',fontFamily:'Nunito' }}>{p.weight}</span>
              <span style={{ fontSize:s(28),fontWeight:800,color:'#43A047',fontFamily:'Nunito' }}>{p.price} ₸</span>
            </div>
            <button onClick={()=>buy(p)} style={{ padding:`${s(12)}px ${s(20)}px`,borderRadius:s(20),border:'none',cursor:'pointer',flexShrink:0,background:bought===p.id?'linear-gradient(135deg,#66BB6A,#43A047)':'linear-gradient(135deg,#FFD54F,#FFB300)',fontSize:s(22),fontWeight:800,fontFamily:'Nunito',color:bought===p.id?'#FFF':'#5D4037',transition:'all 0.3s ease' }}>
              {bought===p.id?'✓':'Купить'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
