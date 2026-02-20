import { useState } from 'react';
import { s } from '../utils/scale';

interface Product {
  id: string; name: string; seller: string; desc: string; weight: string;
  oldPrice: number; price: number; discount: number; savings: number;
  participants: number; maxParticipants: number; timeLeft: string;
  category: string; photo: string;
}

const PRODUCTS: Product[] = [
  { id:'apples', name:'Nako apples (Royal Kinnaur)', seller:'Staple kalka', desc:'органическое выращивание', weight:'1 кг', oldPrice:470, price:329, discount:30, savings:141, participants:32, maxParticipants:40, timeLeft:'3ч 06м', category:'Фрукты', photo:'/assets/photos/photo_product_apples_1kg.jpg' },
  { id:'carrot', name:'Морковь фермерская', seller:'Фермер Алматы', desc:'свежая, без химии', weight:'1 кг', oldPrice:450, price:315, discount:30, savings:135, participants:18, maxParticipants:30, timeLeft:'5ч 20м', category:'Овощи', photo:'/assets/photos/photo_product_carrot_1kg.jpg' },
  { id:'honey', name:'Мёд горный натуральный', seller:'Пасека Алтай', desc:'прямо с пасеки', weight:'0.5 кг', oldPrice:1800, price:1260, discount:30, savings:540, participants:25, maxParticipants:50, timeLeft:'8ч 00м', category:'Мёд', photo:'/assets/photos/photo_product_honey_0_5kg.jpg' },
  { id:'trout', name:'Форель радужная', seller:'Рыбхоз Иссык', desc:'охлаждённая, свежая', weight:'1 кг', oldPrice:2400, price:1680, discount:30, savings:720, participants:10, maxParticipants:20, timeLeft:'12ч 45м', category:'Рыба', photo:'/assets/photos/photo_product_trout_1kg.jpg' },
];

const CATEGORIES = ['Все', 'Фрукты', 'Овощи', 'Зелень', 'Мёд'];

const Avatars = ({ count }: { count: number }) => {
  const colors = ['#FF7043','#42A5F5','#66BB6A','#AB47BC'];
  return (
    <div style={{ display:'flex' }}>
      {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
        <div key={i} style={{
          width:s(40), height:s(40), borderRadius:'50%',
          background:colors[i % colors.length],
          border:`${s(3)}px solid #fff`,
          marginLeft: i > 0 ? s(-12) : 0,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:s(16), fontWeight:700, color:'#fff', fontFamily:'Nunito',
        }}>
          {String.fromCharCode(65 + i)}
        </div>
      ))}
    </div>
  );
};

interface Props { onGoToFarm: () => void; }

export default function MarketScreen({ onGoToFarm }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [joined, setJoined] = useState<string | null>(null);

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (activeCategory === 'Все' || p.category === activeCategory)
  );

  const handleJoin = (id: string) => {
    setJoined(id);
    setTimeout(() => setJoined(null), 2000);
  };

  return (
    <div style={{ width:'100%', height:'100%', background:'#F2F5F0', display:'flex', flexDirection:'column', overflow:'hidden', fontFamily:'Nunito, sans-serif' }}>

      {/* Шапка */}
      <div style={{ position:'relative', width:'100%', height:s(180), flexShrink:0 }}>
        <img src="/assets/ui/ui_green_picture.png" alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddingTop:s(10) }}>
          <span style={{ fontSize:s(40), fontWeight:900, color:'#fff', textShadow:'0 2px 8px rgba(0,0,0,0.25)', lineHeight:1.1 }}>Групповые покупки</span>
          <span style={{ fontSize:s(22), color:'rgba(255,255,255,0.9)', marginTop:s(4) }}>от фермеров напрямую</span>
        </div>
        <button onClick={onGoToFarm} aria-label="На ферму" style={{
          position:'absolute', top:s(16), right:s(16),
          width:s(72), height:s(72), borderRadius:s(18),
          background:'rgba(255,255,255,0.25)', backdropFilter:'blur(8px)',
          border:'2px solid rgba(255,255,255,0.5)', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:s(34),
        }}>🏡</button>
      </div>

      {/* Скроллируемое содержимое */}
      <div style={{ flex:1, overflowY:'auto', overflowX:'hidden' }}>

        {/* Поиск */}
        <div style={{ display:'flex', alignItems:'center', gap:s(12), padding:`${s(16)}px ${s(24)}px` }}>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:s(10), background:'#fff', borderRadius:s(28), padding:`${s(14)}px ${s(20)}px`, boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize:s(26), opacity:0.45 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="поиск товаров" style={{ border:'none', outline:'none', background:'none', flex:1, fontSize:s(24), fontFamily:'Nunito', color:'#333' }} />
          </div>
          <div style={{ width:s(72), height:s(72), borderRadius:s(18), background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:s(28), cursor:'pointer', flexShrink:0 }}>🔽</div>
        </div>

        {/* Категории */}
        <div style={{ display:'flex', gap:s(10), padding:`0 ${s(24)}px`, overflowX:'auto', paddingBottom:s(8) }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              flexShrink:0, padding:`${s(10)}px ${s(24)}px`, borderRadius:s(28),
              border: activeCategory === cat ? 'none' : `${s(2)}px solid #4CAF50`,
              background: activeCategory === cat ? '#4CAF50' : '#fff',
              color: activeCategory === cat ? '#fff' : '#4CAF50',
              fontSize:s(24), fontWeight:700, fontFamily:'Nunito', cursor:'pointer',
            }}>{cat}</button>
          ))}
        </div>

        {/* Баннер */}
        <div style={{ margin:`${s(16)}px ${s(24)}px`, borderRadius:s(24), overflow:'hidden', height:s(280), boxShadow:'0 4px 16px rgba(0,0,0,0.12)' }}>
          <img src="/assets/ui/ui_big_picture.png" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        </div>

        {/* Карточки */}
        <div style={{ display:'flex', flexDirection:'column', gap:s(16), padding:`0 ${s(24)}px ${s(32)}px` }}>
          {filtered.map(p => (
            <div key={p.id} style={{ background:'#fff', borderRadius:s(24), overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.08)' }}>

              {/* Верх карточки */}
              <div style={{ display:'flex', gap:s(16), padding:s(16) }}>
                <img src={p.photo} alt={p.name} style={{ width:s(160), height:s(160), borderRadius:s(16), objectFit:'cover', flexShrink:0 }} />
                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:s(6) }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:s(8) }}>
                    <span style={{ fontSize:s(24), fontWeight:800, color:'#1F1F1F', lineHeight:1.2, flex:1 }}>{p.name}</span>
                    <div style={{ background:'#FF6F00', borderRadius:s(10), padding:`${s(4)}px ${s(10)}px`, flexShrink:0 }}>
                      <span style={{ fontSize:s(20), fontWeight:800, color:'#fff' }}>-{p.discount}%</span>
                    </div>
                  </div>
                  <span style={{ fontSize:s(20), color:'#888' }}>{p.desc} {p.weight}</span>
                  <span style={{ fontSize:s(20), color:'#555' }}>🏪 <span style={{ fontWeight:700 }}>{p.seller}</span></span>
                  <div style={{ display:'flex', alignItems:'center', gap:s(10), flexWrap:'wrap' }}>
                    <span style={{ fontSize:s(20), color:'#aaa', textDecoration:'line-through' }}>{p.oldPrice}₸</span>
                    <span style={{ fontSize:s(28), fontWeight:900, color:'#1F1F1F' }}>{p.price}₸</span>
                    <div style={{ background:'#E8F5E9', borderRadius:s(10), padding:`${s(4)}px ${s(10)}px` }}>
                      <span style={{ fontSize:s(18), color:'#2E7D32', fontWeight:700 }}>Экономия {p.savings}₸</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Низ карточки */}
              <div style={{ padding:`0 ${s(16)}px ${s(16)}px`, display:'flex', flexDirection:'column', gap:s(10) }}>
                <div style={{ display:'flex', alignItems:'center', gap:s(12) }}>
                  <span style={{ flex:1, fontSize:s(20), color:'#555' }}>участников {p.participants} из {p.maxParticipants}</span>
                  <Avatars count={p.participants} />
                  <button onClick={() => handleJoin(p.id)} style={{
                    padding:`${s(14)}px ${s(24)}px`, borderRadius:s(28), border:'none', cursor:'pointer',
                    background: joined === p.id ? 'linear-gradient(135deg,#66BB6A,#43A047)' : 'linear-gradient(135deg,#FF8C42,#FF6F00)',
                    color:'#fff', fontSize:s(22), fontWeight:800, fontFamily:'Nunito', whiteSpace:'nowrap',
                  }}>{joined === p.id ? '✓ Вступил' : 'Присоединиться'}</button>
                  <div style={{ width:s(64), height:s(64), borderRadius:s(18), background:'#F5F5F5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:s(28), cursor:'pointer', flexShrink:0 }}>🔗</div>
                </div>
                <div style={{ width:'100%', height:s(12), background:'#E0E0E0', borderRadius:s(6), overflow:'hidden' }}>
                  <div style={{ width:`${(p.participants / p.maxParticipants) * 100}%`, height:'100%', background:'linear-gradient(90deg,#66BB6A,#2E7D32)', borderRadius:s(6) }} />
                </div>
                <span style={{ fontSize:s(20), color:'#FF6F00', fontWeight:700 }}>до закрытия {p.timeLeft} ⏱</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
