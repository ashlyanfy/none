import { s, vw, getTabBarHeight } from '../utils/scale';
import { TABS } from '../utils/constants';
import type { TabId } from '../utils/constants';

interface Props { activeTab: TabId; onTabChange: (t: TabId) => void; }

export default function TabBar({ activeTab, onTabChange }: Props) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, width: '100%',
      height: getTabBarHeight(), zIndex: 100,
      backgroundImage: 'url(/assets/ui/ui_tabbar_wood_bg.webp)',
      backgroundSize: '100% 100%',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
      paddingBottom: s(40), paddingLeft: vw(2), paddingRight: vw(2),
    }}>
      {TABS.map((tab) => {
        const a = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => onTabChange(tab.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(4),
            transition: 'all 0.2s ease', flex: 1, maxWidth: s(200),
          }}>
            <img src={tab.icon} alt={tab.label} style={{
              width: s(180), height: s(180), objectFit: 'contain',
              filter: a ? 'drop-shadow(0 0 8px rgba(255,255,255,0.9))' : 'none',
            }} />
            <span style={{
              fontSize: s(35), fontWeight: 900,
              color: a ? '#432311' : 'rgba(91, 36, 0, 0.6)',
              textShadow: '1px 1px 2px rgba(87, 26, 6, 0.6)',
              fontFamily: 'Nunito, sans-serif',
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
