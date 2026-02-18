import { useState } from 'react';
import { s, vw } from '../utils/scale';
import { useWalletStore } from '../store/walletStore';
import { fmt } from '../utils/constants';

export default function HUD() {
  const coins = useWalletStore(s => s.coins);
  const goodness = useWalletStore(s => s.goodness);
  const [soundOn, setSoundOn] = useState(true);

  const cap = (left: number, w: number): React.CSSProperties => ({
    position: 'absolute', left: vw(left / 10.8), top: s(24),
    width: vw(w / 11), height: s(144), borderRadius: s(52),
    background: 'rgb(227, 215, 155)', backdropFilter: 'blur(10px)',
    display: 'flex', alignItems: 'center', padding: `0 ${s(22)}px`, gap: s(12),
  });

  return (
    <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:60,pointerEvents:'none' }}>
      <div style={{ ...cap(32, 340), pointerEvents: 'auto' }}>
        <img src="/assets/icons/ic_coin.png" alt="" style={{ width:s(200),height:s(200),objectFit:'contain', marginLeft:s(-70) }} />
        <div>
          <div style={{ fontSize:s(42),fontWeight:900,color:'#2b1807',fontFamily:'Nunito',lineHeight:1 }}>{fmt(coins)}</div>
          <div style={{ fontSize:s(35),fontWeight:800,color:'rgba(81, 42, 12, 0.7)',fontFamily:'Nunito' }}>монеты</div>
        </div>
      </div>
      <div style={{ ...cap(370, 340), pointerEvents: 'auto', cursor: 'pointer' }}>
        <img src="/assets/icons/ic_goodness.png" alt="" style={{ width:s(150),height:s(150),objectFit:'contain',}} />
        <div>
          <div style={{ fontSize:s(42),fontWeight:900,color:'#2b1807',fontFamily:'Nunito',lineHeight:1 }}>{goodness.value}/{goodness.goal}</div>
          <div style={{ fontSize:s(35),fontWeight:800,color:'rgba(81, 42, 12, 0.7)',fontFamily:'Nunito' }}>добро</div>
        </div>
      </div>
      <div onClick={()=>setSoundOn(!soundOn)} style={{
        position:'absolute',right:vw(3),top:s(24),width:s(144),height:s(144),borderRadius:s(72),
        background:'rgb(227, 215, 155)',backdropFilter:'blur(10px)',
        display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',pointerEvents:'auto',
      }}>

        {soundOn
  ? <img src="/assets/icons/ic_sound_on.png"  style={{ width:s(200), height:s(200), objectFit:'contain', marginTop:s(40) }} />
  : <img src="/assets/icons/ic_sound_off.png" style={{ width:s(200), height:s(200), objectFit:'contain', marginTop:s(40), marginLeft:s(60), }} />
}
      </div>
    </div>
  );
}
