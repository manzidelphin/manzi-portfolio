'use client';
import { useRef, type PointerEvent } from 'react';
import { ArrowUpRight, Code2, Database, Layers3 } from 'lucide-react';

export default function Workspace3D() {
 const scene=useRef<HTMLDivElement>(null);
 function move(e:PointerEvent<HTMLDivElement>){
  if(e.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  scene.current?.style.setProperty('--ry',`${x*18}deg`);
  scene.current?.style.setProperty('--rx',`${-y*12}deg`);
 }
 function reset(){scene.current?.style.setProperty('--ry','0deg');scene.current?.style.setProperty('--rx','0deg');}
 return <div className="workspace-shell" onPointerMove={move} onPointerLeave={reset}>
  <div className="workspace-scene" ref={scene}>
   <div className="workspace-aura" aria-hidden="true"/>
   <div className="workspace-floor" aria-hidden="true"/>
   <div className="workspace-computer">
    <div className="workspace-display">
     <div className="workspace-toolbar"><span/><span/><span/><small>manzi / workspace</small></div>
     <div className="workspace-code"><span className="code-comment">// building things that matter</span><span><b>const</b> developer = {'{'}</span><span>  name: <em>'Manzi Delphin'</em>,</span><span>  focus: <em>'Full Stack'</em>,</span><span>  mission: <em>'Real impact'</em></span><span>{'}'};</span><span className="code-cursor">▌</span></div>
    </div>
    <div className="workspace-keyboard" aria-hidden="true"><div className="keyboard-lines"/></div>
   </div>
   <a href="#projects" className="workspace-float workspace-float-one"><Layers3 size={22}/><span><strong>Explore projects</strong><small>Real products · Live demos</small></span><ArrowUpRight size={15}/></a>
   <a href="#experience" className="workspace-float workspace-float-two"><Database size={22}/><span><strong>My experience</strong><small>Field work + Engineering</small></span><ArrowUpRight size={15}/></a>
   <div className="workspace-cube" aria-hidden="true"><div className="cube-face cube-front"><Code2 size={28}/></div><div className="cube-face cube-back"/><div className="cube-face cube-left"/><div className="cube-face cube-right"/><div className="cube-face cube-top"/><div className="cube-face cube-bottom"/></div>
  </div>
  <span className="workspace-hint">MOVE YOUR CURSOR · EXPLORE THE SPACE</span>
 </div>;
}
