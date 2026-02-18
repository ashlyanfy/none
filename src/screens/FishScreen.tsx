import { CARE_COST, HARVEST_WEIGHT } from '../utils/constants';
import { calculateProgress } from '../utils/progress';
import { useFishStore } from '../store/fishStore';
import { useWalletStore } from '../store/walletStore';
import { useInventoryStore } from '../store/inventoryStore';
import GameScene from '../components/GameScene';
import { getGroundY } from '../utils/scale';

export default function FishScreen() {
  const fish = useFishStore();
  const wallet = useWalletStore();
  const addItem = useInventoryStore(s=>s.addItem);
  const prog = calculateProgress(fish);
  return <GameScene
    config={{ tab:'fish', bgSrc:'/assets/backgrounds/bg_fish_nature_pond_day.png', groundSrc:'/assets/grounds/ground_fish_pond_shore_patch.png', groundX:144, groundY:getGroundY(), objectType:'trout', label:'Это форель', careFX:'bubbles', stageFXType:'bubbles' }}
    data={{ prog, resourceAmount:wallet.resources.oxygen_g, canCare:wallet.resources.oxygen_g>=CARE_COST.oxygen_g, nutrients:wallet.nutrients, coins:wallet.coins, careIndex:fish.careIndex, nutrientsUsed:fish.nutrientsUsed, goodnessToday:wallet.goodness.todayCount }}
    actions={{
      onCare:()=>{ if(wallet.spendResource('oxygen_g',CARE_COST.oxygen_g)){fish.addCare();wallet.addGoodness('careAction')} },
      onHarvest:()=>{ addItem({product:'trout',weight_g:HARVEST_WEIGHT.trout,quality:Math.floor(70+Math.random()*30)}); wallet.addGoodness('collect'); fish.resetCycle() },
      onNutrient:()=>{ if(wallet.spendNutrient())fish.addNutrient() },
    }} />;
}
