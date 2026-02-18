import { useState, useEffect } from 'react';
import type { TabId } from './utils/constants';
import TabBar from './components/TabBar';
import FarmScreen from './screens/FarmScreen';
import FishScreen from './screens/FishScreen';
import BeeScreen from './screens/BeeScreen';
import MarketScreen from './screens/MarketScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [tab, setTab] = useState<TabId>('farm');
  const [vh, setVh] = useState(window.innerHeight);
  
  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const screen = () => { switch(tab){ case'farm':return<FarmScreen/>;case'fish':return<FishScreen/>;case'bee':return<BeeScreen/>;case'market':return<MarketScreen/>;case'profile':return<ProfileScreen/>; } };
  return (
    <div style={{ width:'100%',height:`${vh}px`,backgroundColor:'#1a1a2e',display:'flex',justifyContent:'center',overflow:'hidden' }}>
      <div style={{ width:'100%',maxWidth:'540px',height:'100%',position:'relative',overflow:'hidden',backgroundColor:'#000',boxShadow:'0 0 40px rgba(0,0,0,0.5)' }}>
        {screen()}
        <TabBar activeTab={tab} onTabChange={setTab}/>
      </div>
    </div>
  );
}
