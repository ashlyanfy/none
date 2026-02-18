import { s } from '../utils/scale';

const OVERLAY: Record<string, string|null> = {
  farm: null, fish: '/assets/icons/ic_resource_oxygen.png', bee: '/assets/icons/ic_resource_syrup.png',
};

interface Props { amount: number; tab: 'farm'|'fish'|'bee'; }

export default function WaterIndicator({ amount, tab }: Props) {
  const ovr = OVERLAY[tab];
  const fmt = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' г';
  return (
    <div style={{
      position:'absolute', left:'50%', top:s(180), transform:'translateX(-50%)',
      width:'auto', height:s(100),
      zIndex:40, display:'flex', alignItems:'center', gap:s(10),
    }}>
      <div style={{ position:'relative', flexShrink:0 }}>
        <img src="/assets/ui/ui_water_bottle_round.PNG" alt=""
          style={{ width:s(100),height:s(100),objectFit:'contain' }} />
        {ovr && <img src={ovr} alt="" style={{
          position:'absolute',top:0,right:0,width:s(32),height:s(32),objectFit:'contain',
        }} />}
      </div>
      <span style={{
        fontSize:s(38),fontWeight:800,color:'#FFF',fontFamily:'Nunito',
        textShadow:`${s(2)}px ${s(2)}px ${s(4)}px rgba(0,0,0,0.3)`,whiteSpace:'nowrap',
      }}>{fmt}</span>
    </div>
  );
}
