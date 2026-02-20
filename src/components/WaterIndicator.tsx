import { s } from '../utils/scale';
import { fmt } from '../utils/constants';

const OVERLAY: Record<string, string|null> = {
  farm: null, fish: '/assets/icons/ic_resource_oxygen.png', bee: '/assets/icons/ic_resource_syrup.png',
};

interface Props { amount: number; tab: 'farm'|'fish'|'bee'; }

export default function WaterIndicator({ amount, tab }: Props) {
  const ovr = OVERLAY[tab];
  const display = fmt(amount) + ' г';
  return (
    <div style={{
      position:'absolute', left:'50%', top:s(230), transform:'translateX(-50%)',
      width:'auto', height:s(200),
      zIndex:40, display:'flex', alignItems:'center',
    }}>
      <div style={{ position:'relative', flexShrink:0 }}>
        <img src="/assets/ui/ui_water_bottle_round.png" alt=""
          style={{ width:s(200),height:s(160),objectFit:'contain' }} />
        {ovr && <img src={ovr} alt="" style={{
          position:'absolute',top:0,right:0,width:s(0),height:s(0),objectFit:'contain',
        }} />}
      </div>
      <span style={{
        fontSize:s(48),fontWeight:900,color:'#271717',fontFamily:'Nunito',
        textShadow:`${s(2)}px ${s(2)}px ${s(4)}px rgba(0,0,0,0.3)`,whiteSpace:'nowrap',
      }}>{display}</span>
    </div>
  );
}
