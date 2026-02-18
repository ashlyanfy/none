import { s, vw } from '../utils/scale';

const LEFT = [
  { icon: '/assets/icons/ic_reward_visit.png', label: 'Награда', y: 200 },
  { icon: '/assets/icons/ic_daily_challenge.png', label: 'Челлендж', y: 355 },
  { icon: '/assets/icons/ic_household.png', label: 'Хозяйство', y: 510 },
  { icon: '/assets/icons/ic_storage.png', label: 'Склад', y: 665 },
  { icon: '/assets/icons/ic_invite_friend.png', label: 'Друзья', y: 820 },
];

const RIGHT = [
  { icon: '/assets/icons/ic_hot_deal.png', label: 'Горячее', y: 250 },
  { icon: '/assets/icons/ic_change_culture.png', label: 'Культура', y: 415 },
];

interface Props { onCultureSwitch?: () => void; activeCulture?: 'carrot' | 'apple'; }

// Shared circle button style — only size varies between left and right buttons.
function circleStyle(size: number): React.CSSProperties {
  return {
    width: s(size), height: s(size), borderRadius: s(size / 2),
    background: 'rgba(255,255,255,0.94)',
    boxShadow: `0 ${s(3)}px ${s(10)}px rgba(0,0,0,0.15)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  };
}

const labelStyle: React.CSSProperties = {
  fontSize: s(22), fontWeight: 800, color: '#3E2723',
  fontFamily: 'Nunito', textAlign: 'center',
  textShadow: '0 1px 3px rgba(255,255,255,0.9)',
  lineHeight: 1.1, maxWidth: s(140),
};

export default function SideActions({ onCultureSwitch, activeCulture }: Props) {
  return (
    <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:70,pointerEvents:'none' }}>
      {LEFT.map((btn, i) => (
        <div key={i} style={{
          position:'absolute', left:vw(2), top:s(btn.y),
          display:'flex', flexDirection:'column', alignItems:'center', gap:s(6),
          pointerEvents:'auto',
        }}>
          <div style={circleStyle(118)}>
            <img src={btn.icon} alt="" style={{ width:s(102),height:s(102),objectFit:'contain' }} />
          </div>
          <span style={labelStyle}>{btn.label}</span>
        </div>
      ))}

      {RIGHT.map((btn, i) => (
        <div key={i} style={{
          position:'absolute', right:vw(2), top:s(btn.y),
          display:'flex', flexDirection:'column', alignItems:'center', gap:s(6),
          pointerEvents:'auto', width:s(136),
        }}>
          <div
            onClick={() => { if (btn.label === 'Культура' && onCultureSwitch) onCultureSwitch(); }}
            style={circleStyle(136)}
          >
            <img src={btn.icon} alt="" style={{ width:s(118),height:s(118),objectFit:'contain' }} />
          </div>
          <span style={labelStyle}>{btn.label}</span>
          {btn.label === 'Культура' && activeCulture && (
            <img
              src={activeCulture === 'carrot'
                ? '/assets/icons/ic_culture_carrot.png'
                : '/assets/icons/ic_culture_appletree.png'}
              alt=""
              style={{ width:s(56),height:s(56),objectFit:'contain' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
