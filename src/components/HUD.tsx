import { useState } from 'react';
import { s, vw } from '../utils/scale';
import { useWalletStore } from '../store/walletStore';

function fmt(n: number) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

export default function HUD() {
  const coins = useWalletStore(s => s.coins);
  const goodness = useWalletStore(s => s.goodness);
  const [soundOn, setSoundOn] = useState(true);

  const cap = (left: number, w: number): React.CSSProperties => ({
    position: 'absolute', left: vw(left / 10.8), top: s(24),
    width: vw(w / 10.8), height: s(144), borderRadius: s(72),
    background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(10px)',
    display: 'flex', alignItems: 'center', padding: `0 ${s(22)}px`, gap: s(12),
  });

  return (
    <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:60,pointerEvents:'none' }}>
      <div style={{ ...cap(32, 340), pointerEvents: 'auto' }}>
        <img src="/assets/icons/ic_coin.png" alt="" style={{ width:s(100),height:s(100),objectFit:'contain' }} />
        <div>
          <div style={{ fontSize:s(42),fontWeight:800,color:'#FFF',fontFamily:'Nunito',lineHeight:1 }}>{fmt(coins)}</div>
          <div style={{ fontSize:s(22),fontWeight:600,color:'rgba(255,255,255,0.7)',fontFamily:'Nunito' }}>монеты</div>
        </div>
      </div>
      <div style={{ ...cap(370, 340), pointerEvents: 'auto', cursor: 'pointer' }}>
        <img src="/assets/icons/ic_goodness.png" alt="" style={{ width:s(100),height:s(100),objectFit:'contain' }} />
        <div>
          <div style={{ fontSize:s(42),fontWeight:800,color:'#FFF',fontFamily:'Nunito',lineHeight:1 }}>{goodness.value}/{goodness.goal}</div>
          <div style={{ fontSize:s(22),fontWeight:600,color:'rgba(255,255,255,0.7)',fontFamily:'Nunito' }}>добро</div>
        </div>
      </div>
      <div onClick={()=>setSoundOn(!soundOn)} style={{
        position:'absolute',right:vw(3),top:s(24),width:s(144),height:s(144),borderRadius:s(72),
        background:'rgba(0,0,0,0.50)',backdropFilter:'blur(10px)',
        display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',pointerEvents:'auto',
      }}>
        <img src={soundOn?'/assets/icons/ic_sound_on.png':'/assets/icons/ic_sound_off.png'} alt="" style={{width:s(100),height:s(100),objectFit:'contain',marginLeft:s(7)}}/>
      </div>
    </div>
  );
}
