export interface AdviceInput { tab:'farm'|'fish'|'bee'; percent:number; daysLeft:number; careIndex:number; nutrientsUsed:number; resourceAmount:number; nutrients:number; coins:number; goodnessToday:number; }
export interface AdviceResult { mainTip:string; quickTips:string[]; dailyPlan:string[]; }
const RES:Record<string,string>={farm:'воды',fish:'кислорода',bee:'сиропа'};
export function generateAdvice(i:AdviceInput):AdviceResult {
  const{tab,percent,daysLeft,careIndex,nutrientsUsed,resourceAmount,nutrients,goodnessToday}=i;
  let mainTip='';
  if(percent>=100)mainTip='Урожай готов! Нажмите «Собрать».';
  else if(resourceAmount<125)mainTip=`Мало ${RES[tab]}. Заберите бонус!`;
  else if(nutrients>0&&nutrientsUsed<6)mainTip=`У вас ${nutrients} удобрений (+3% каждое).`;
  else if(daysLeft<=5)mainTip=`Почти готово! ${daysLeft} дн.`;
  else mainTip=`Прогресс ${percent}%. Ухаживайте регулярно.`;
  const q:string[]=[
    careIndex<15?`Полейте ещё ${15-careIndex} раз`:'Буст ухода макс!',
    nutrients>0&&nutrientsUsed<6?`Удобрение +3%`:'Удобрения на максимуме',
    resourceAmount>=125?`Хватит на ${Math.floor(resourceAmount/125)} действий`:`Пополните ${RES[tab]}`
  ];
  const d:string[]=[];
  if(Math.floor(resourceAmount/125)>0)d.push(`Полить ${Math.min(Math.floor(resourceAmount/125),5)}×5`);
  if(nutrients>0&&nutrientsUsed<6)d.push('Удобрение (+3%)');
  if(goodnessToday<20)d.push(`+${20-goodnessToday} Добра`);
  if(!d.length)d.push('Зайдите завтра!');
  return{mainTip,quickTips:q,dailyPlan:d};
}
