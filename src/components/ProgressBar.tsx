import { s } from '../utils/scale';
interface Props { percent:number; daysLeft:number; progress:number; }
export default function ProgressBar({ percent, daysLeft, progress }: Props) {
  const W=520, H=56;
  return (
    <div style={{
      position:'absolute', left:s(540-W/2), top:s(1440),
      width:s(W), height:s(H), borderRadius:s(28), zIndex:50,
      background:'rgba(255,255,255,0.4)', backdropFilter:'blur(8px)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:s(4),
    }}>
      <span style={{ fontSize:s(22),fontWeight:700,color:'#2A2A2A',fontFamily:'Nunito' }}>
        {percent}% · осталось {daysLeft} д
      </span>
      <div style={{ width:s(W-48),height:s(9),borderRadius:s(5),background:'rgba(0,0,0,0.12)',overflow:'hidden' }}>
        <div style={{ width:`${Math.min(progress,1)*100}%`,height:'100%',borderRadius:s(5),background:'#5CCB74',transition:'width 0.5s ease' }}/>
      </div>
    </div>
  );
}
