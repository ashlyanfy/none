import { useEffect, useState } from 'react';
import { s } from '../utils/scale';
type FXType = 'water'|'bubbles'|'pollen'|'sparkle'|'glow'|'none';
interface Props { stageFX:FXType; triggerFX:FXType; onTriggerDone?:()=>void; soilAnchorX?:number; soilAnchorY?:number; }
const ASSETS:Record<string,string>={water:'/assets/fx/fx_water_drops.png',bubbles:'/assets/fx/fx_bubbles.png',pollen:'/assets/fx/fx_pollen.png',sparkle:'/assets/fx/fx_sparkle.png',glow:'/assets/fx/fx_glow_ring.png'};
export default function FXLayer({ stageFX, triggerFX, onTriggerDone, soilAnchorX=540, soilAnchorY=1700 }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => { if(triggerFX!=='none'){setShow(true);const t=setTimeout(()=>{setShow(false);onTriggerDone?.()},800);return()=>clearTimeout(t)} }, [triggerFX]);
  const sz=300, cx=soilAnchorX-sz/2, cy=soilAnchorY-sz-80;
  const base=(op:number):React.CSSProperties=>({position:'absolute',left:s(cx),top:s(cy),width:s(sz),height:s(sz),objectFit:'contain',zIndex:30,opacity:op,pointerEvents:'none',transition:'opacity 0.5s ease'});
  return <>
    {stageFX!=='none'&&ASSETS[stageFX]&&<img src={ASSETS[stageFX]} alt="" style={{...base(0.6),animation:'fxP 2s ease-in-out infinite'}}/>}
    {show&&triggerFX!=='none'&&ASSETS[triggerFX]&&<img src={ASSETS[triggerFX]} alt="" style={{...base(1),animation:'fxB 0.8s ease-out forwards'}}/>}
    <style>{`@keyframes fxP{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.08);opacity:0.7}}@keyframes fxB{0%{transform:scale(0.5);opacity:1}60%{transform:scale(1.2);opacity:0.8}100%{transform:scale(1.4);opacity:0}}`}</style>
  </>;
}
