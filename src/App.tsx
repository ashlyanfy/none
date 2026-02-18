import { useState, useEffect } from 'react';
import type { TabId } from './utils/constants';
import TabBar from './components/TabBar';
import FarmScreen from './screens/FarmScreen';
import FishScreen from './screens/FishScreen';
import BeeScreen from './screens/BeeScreen';
import MarketScreen from './screens/MarketScreen';
import ProfileScreen from './screens/ProfileScreen';

const SCREENS: Record<TabId, React.ReactNode> = {
  farm:    <FarmScreen />,
  fish:    <FishScreen />,
  bee:     <BeeScreen />,
  market:  <MarketScreen />,
  profile: <ProfileScreen />,
};

export default function App() {
  const [tab, setTab] = useState<TabId>('farm');
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    // Outer: full screen, dark surround, horizontally centered
    <div style={{
      width: '100%',
      height: `${vh}px`,
      backgroundColor: '#1a1a2e',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/*
        Game container — max 540 px wide.
        All UI elements inside use s() from scale.ts which computes:
          s(value) = value * (window.innerWidth / 1080)
        This acts as a single global scale: every size and coordinate is
        authored in 1080-px design space and multiplied by the same factor.
        Safe-area (top ≥ 160 design-px, bottom ≥ 244 design-px) is enforced
        by getSafeArea() and consumed in the ActionDock / HUD components.
      */}
      <div style={{
        width: '100%',
        maxWidth: '540px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
        boxShadow: '0 0 40px rgba(0,0,0,0.5)',
      }}>
        {SCREENS[tab]}
        <TabBar activeTab={tab} onTabChange={setTab} />
      </div>
    </div>
  );
}
