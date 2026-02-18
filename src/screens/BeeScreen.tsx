import { CARE_COST, HARVEST_WEIGHT } from '../utils/constants';
import { calculateProgress } from '../utils/progress';
import { useBeeStore } from '../store/beeStore';
import { useWalletStore } from '../store/walletStore';
import { useInventoryStore } from '../store/inventoryStore';
import GameScene from '../components/GameScene';
import { getGroundY } from '../utils/scale';

export default function BeeScreen() {
  const bee = useBeeStore();
  const wallet = useWalletStore();
  const addItem = useInventoryStore(s=>s.addItem);
  const prog = calculateProgress(bee);
  return <GameScene
    config={{ tab:'bee', bgSrc:'/assets/backgrounds/bg_bee_apiary_day.png', groundSrc:'/assets/grounds/ground_bee_apiary_grass_patch.png', groundX:144, groundY:getGroundY(), objectType:'bee', label:'Это пасека', careFX:'pollen', stageFXType:'pollen' }}
    data={{ prog, resourceAmount:wallet.resources.syrup_g, canCare:wallet.resources.syrup_g>=CARE_COST.syrup_g, nutrients:wallet.nutrients, coins:wallet.coins, careIndex:bee.careIndex, nutrientsUsed:bee.nutrientsUsed, goodnessToday:wallet.goodness.todayCount }}
    actions={{
      onCare:()=>{ if(wallet.spendResource('syrup_g',CARE_COST.syrup_g)){bee.addCare();wallet.addGoodness('careAction')} },
      onHarvest:()=>{ addItem({product:'honey',weight_g:HARVEST_WEIGHT.honey,quality:Math.floor(70+Math.random()*30)}); wallet.addGoodness('collect'); bee.resetCycle() },
      onNutrient:()=>{ if(wallet.spendNutrient())bee.addNutrient() },
    }} />;
}
