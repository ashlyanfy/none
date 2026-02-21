import { s, vw } from '../utils/scale';
interface Props { onTap: () => void; }
export default function HelperGirl({ onTap }: Props) {
  return (
    <div onClick={onTap} style={{
      position:'absolute', right:vw(10), top:s(760),
      width:s(500), height:s(590), zIndex:25, cursor:'pointer',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <img src="/assets/characters/char_girl_idle_watering.webp" alt="Помощница"
        style={{ width:s(600),height:s(970),objectFit:'contain' }} />
    </div>
  );
}
