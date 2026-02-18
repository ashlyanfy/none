import { CARE_COST, HARVEST_WEIGHT } from '../utils/constants';
import { calculateProgress } from '../utils/progress';
import { useFarmStore } from '../store/farmStore';
import { useWalletStore } from '../store/walletStore';
import { useInventoryStore } from '../store/inventoryStore';
import GameScene from '../components/GameScene';
import { getGroundY } from '../utils/scale';

const CFG = {
  carrot: { bg:'/assets/backgrounds/bg_farm_carrot_day.png', ground:'/assets/grounds/ground_farm_soil_patch.png', gx:144, label:'Это морковь', anchorOffsetY:0 },
  apple:  { bg:'/assets/backgrounds/bg_farm_apple_orchard_day.png', ground:'/assets/grounds/ground_orchard_soil_patch.png', gx:151, label:'Это яблоня', anchorOffsetY:400 },
};

export default function FarmScreen() {
  const farm = useFarmStore();
  const wallet = useWalletStore();
  const addItem = useInventoryStore(s=>s.addItem);
  const c = farm.cultures[farm.activeCulture];
  const cfg = CFG[farm.activeCulture];
  const prog = calculateProgress(c);
  return <GameScene
    config={{ tab:'farm', bgSrc:cfg.bg, groundSrc:cfg.ground, groundX:cfg.gx, groundY:getGroundY(), groundAnchorOffsetY:cfg.anchorOffsetY || 0, objectType:farm.activeCulture, label:cfg.label, careFX:'water', stageFXType:'water' }}
    data={{ prog, resourceAmount:wallet.resources.water_g, canCare:wallet.resources.water_g>=CARE_COST.water_g, nutrients:wallet.nutrients, coins:wallet.coins, careIndex:c.careIndex, nutrientsUsed:c.nutrientsUsed, goodnessToday:wallet.goodness.todayCount }}
    actions={{
      onCare:()=>{ if(wallet.spendResource('water_g',CARE_COST.water_g)){farm.addCare(farm.activeCulture);wallet.addGoodness('careAction')} },
      onHarvest:()=>{ const p=farm.activeCulture==='carrot'?'carrot':'apple'; addItem({product:p,weight_g:HARVEST_WEIGHT[p],quality:Math.floor(70+Math.random()*30)}); wallet.addGoodness('collect'); farm.resetCycle(farm.activeCulture) },
      onNutrient:()=>{ if(wallet.spendNutrient())farm.addNutrient(farm.activeCulture) },
      onCultureSwitch:farm.switchCulture, activeCulture:farm.activeCulture,
    }} />;
}
