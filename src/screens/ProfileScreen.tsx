import { s, TABBAR_HEIGHT } from '../utils/scale';
import { useProfileStore } from '../store/profileStore';
import { useInventoryStore } from '../store/inventoryStore';
import { useOrdersStore } from '../store/ordersStore';

const PN:Record<string,string>={carrot:'Морковь',apple:'Яблоки',trout:'Форель',honey:'Мёд'};
const SC:Record<string,string>={Created:'#FF9800',Confirmed:'#2196F3',Preparing:'#9C27B0',Delivering:'#00BCD4',Delivered:'#4CAF50',Cancelled:'#F44336'};
const SL:Record<string,string>={Created:'Создан',Confirmed:'Подтверждён',Preparing:'Готовится',Delivering:'Доставка',Delivered:'Доставлен',Cancelled:'Отменён'};

export default function ProfileScreen() {
  const p = useProfileStore();
  const inv = useInventoryStore(s=>s.items);
  const ord = useOrdersStore(s=>s.orders);
  const inp:React.CSSProperties = { width:'100%',padding:`${s(12)}px ${s(16)}px`,borderRadius:s(12),border:'1px solid #DDD',fontSize:s(22),fontFamily:'Nunito',color:'#333',outline:'none',boxSizing:'border-box' };
  return (
    <div style={{ width:'100%',height:'100%',background:'#F5F0EB',overflowY:'auto',paddingBottom:s(TABBAR_HEIGHT+20) }}>
      <div style={{ padding:`${s(40)}px ${s(32)}px ${s(20)}px`,background:'linear-gradient(135deg,#7E57C2,#512DA8)' }}>
        <div style={{ fontSize:s(36),fontWeight:900,color:'#FFF',fontFamily:'Nunito' }}>{p.name}</div>
        <div style={{ fontSize:s(22),color:'rgba(255,255,255,0.7)',fontFamily:'Nunito',marginTop:s(4) }}>Код: {p.referralCode}</div>
      </div>
      <div style={{ padding:`0 ${s(32)}px` }}>
        <div style={{ fontSize:s(28),fontWeight:800,color:'#1F1F1F',fontFamily:'Nunito',margin:`${s(24)}px 0 ${s(12)}px` }}>📦 Склад ({inv.length})</div>
        {!inv.length?<div style={{padding:s(20),background:'#FFF',borderRadius:s(16),textAlign:'center',fontSize:s(22),color:'#999',fontFamily:'Nunito'}}>Пусто — соберите урожай!</div>:
        inv.map(i=><div key={i.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:s(12),background:'#FFF',borderRadius:s(12),marginBottom:s(8)}}>
          <span style={{fontSize:s(24),fontWeight:700,color:'#333',fontFamily:'Nunito'}}>{PN[i.product]||i.product} · {(i.weight_g/1000).toFixed(1)}кг</span>
          <span style={{padding:`${s(4)}px ${s(12)}px`,borderRadius:s(8),background:i.quality>=90?'#E8F5E9':'#FFF3E0',fontSize:s(20),fontWeight:700,fontFamily:'Nunito',color:i.quality>=90?'#2E7D32':'#E65100'}}>{i.quality}%</span>
        </div>)}

        <div style={{ fontSize:s(28),fontWeight:800,color:'#1F1F1F',fontFamily:'Nunito',margin:`${s(24)}px 0 ${s(12)}px` }}>📋 Заказы ({ord.length})</div>
        {!ord.length?<div style={{padding:s(20),background:'#FFF',borderRadius:s(16),textAlign:'center',fontSize:s(22),color:'#999',fontFamily:'Nunito'}}>Нет заказов</div>:
        ord.slice().reverse().map(o=><div key={o.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:s(12),background:'#FFF',borderRadius:s(12),marginBottom:s(8)}}>
          <span style={{fontSize:s(22),fontWeight:700,color:'#333',fontFamily:'Nunito'}}>{o.items.map(i=>i.product).join(', ')}</span>
          <span style={{padding:`${s(4)}px ${s(12)}px`,borderRadius:s(8),background:SC[o.status]||'#999',fontSize:s(18),fontWeight:700,fontFamily:'Nunito',color:'#FFF'}}>{SL[o.status]||o.status}</span>
        </div>)}

        <div style={{ fontSize:s(28),fontWeight:800,color:'#1F1F1F',fontFamily:'Nunito',margin:`${s(24)}px 0 ${s(12)}px` }}>🚚 Доставка</div>
        <div style={{ background:'#FFF',borderRadius:s(16),padding:s(16),display:'flex',flexDirection:'column',gap:s(12) }}>
          <input value={p.delivery.fio} onChange={e=>p.updateDelivery({fio:e.target.value})} placeholder="ФИО" style={inp}/>
          <input value={p.delivery.phone} onChange={e=>p.updateDelivery({phone:e.target.value})} placeholder="Телефон" style={inp}/>
          <input value={p.delivery.city} onChange={e=>p.updateDelivery({city:e.target.value})} placeholder="Город" style={inp}/>
          <input value={p.delivery.address} onChange={e=>p.updateDelivery({address:e.target.value})} placeholder="Адрес" style={inp}/>
        </div>
      </div>
    </div>
  );
}
