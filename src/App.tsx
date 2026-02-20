import { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import type { TabId } from './utils/constants';
import { invalidateScale } from './utils/scale';
import TabBar from './components/TabBar';
import FarmScreen from './screens/FarmScreen';

const FishScreen    = lazy(() => import('./screens/FishScreen'));
const BeeScreen     = lazy(() => import('./screens/BeeScreen'));
const MarketScreen  = lazy(() => import('./screens/MarketScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));

const FALLBACK = <div style={{ width:'100%', height:'100%', background:'#1a1a2e' }} />;

export default function App() {
  const [tab, setTab] = useState<TabId>('farm');
  const [, forceUpdate] = useState(0);

  useLayoutEffect(() => { invalidateScale(); forceUpdate(n => n + 1); }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(() => { invalidateScale(); forceUpdate(n => n + 1); }, 120); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timer); };
  }, []);

  return (
    <div style={{ width:'100%', height:'100dvh', backgroundColor:'#1a1a2e', display:'flex', justifyContent:'center', alignItems:'flex-start', overflow:'hidden' }}>
      <div style={{ width:'100%', maxWidth:'540px', height:'100%', position:'relative', overflow:'hidden', backgroundColor:'#000', boxShadow:'0 0 40px rgba(0,0,0,0.5)' }}>
        <Suspense fallback={FALLBACK}>
          {tab === 'farm'    && <FarmScreen />}
          {tab === 'fish'    && <FishScreen />}
          {tab === 'bee'     && <BeeScreen />}
          {tab === 'market'  && <MarketScreen onGoToFarm={() => setTab('farm')} />}
          {tab === 'profile' && <ProfileScreen />}
        </Suspense>
        {tab !== 'market' && <TabBar activeTab={tab} onTabChange={setTab} />}
      </div>
    </div>
  );
}

