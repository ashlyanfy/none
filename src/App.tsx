import { useState, useEffect, useLayoutEffect } from 'react';
import type { TabId } from './utils/constants';
import TabBar from './components/TabBar';
import FarmScreen from './screens/FarmScreen';
import FishScreen from './screens/FishScreen';
import BeeScreen from './screens/BeeScreen';
import MarketScreen from './screens/MarketScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [tab, setTab] = useState<TabId>('farm');
  const [, forceUpdate] = useState(0);

  useLayoutEffect(() => {
    forceUpdate(n => n + 1);
  }, []);

  useEffect(() => {
    const onResize = () => forceUpdate(n => n + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      backgroundColor: '#1a1a2e',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '540px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
        boxShadow: '0 0 40px rgba(0,0,0,0.5)',
      }}>
        {tab === 'farm'    && <FarmScreen />}
        {tab === 'fish'    && <FishScreen />}
        {tab === 'bee'     && <BeeScreen />}
        {tab === 'market'  && <MarketScreen />}
        {tab === 'profile' && <ProfileScreen />}
        <TabBar activeTab={tab} onTabChange={setTab} />
      </div>
    </div>
  );
}
