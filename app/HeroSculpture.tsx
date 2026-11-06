'use client';
import { useEffect, useRef } from 'react';

/** Lightweight WebGL ray-marched 3D sculpture. No external runtime dependency. */
export default function HeroSculpture() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
    if (!gl) return;
    const vertex = `attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`;
    const fragment = `precision highp float;
uniform vec2 resolution;uniform float time;uniform vec2 pointer;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float scene(vec3 p){
 p.xz*=rot(time*.18+pointer.x*.6);
 p.yz*=rot(.5+pointer.y*.5);
 vec2 q=vec2(length(p.xz)-1.05,p.y);
 float ring=length(q)-.22;
 float core=length(p)-.62;
 return min(ring,core);
}
vec3 normal(vec3 p){float e=.002;return normalize(vec3(scene(p+vec3(e,0,0))-scene(p-vec3(e,0,0)),scene(p+vec3(0,e,0))-scene(p-vec3(0,e,0)),scene(p+vec3(0,0,e))-scene(p-vec3(0,0,e))));}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*resolution)/min(resolution.x,resolution.y);
 vec3 ro=vec3(0.,0.,4.5),rd=normalize(vec3(uv,-1.8));
 float t=0.;bool hit=false;vec3 p;
 for(int i=0;i<90;i++){p=ro+rd*t;float d=scene(p);if(d<.002){hit=true;break;}t+=d*.7;if(t>9.)break;}
 vec3 col=vec3(0.);
 float alpha=0.;
 if(hit){
 vec3 n=normal(p),light=normalize(vec3(-.6,.8,1.));
 float diff=max(dot(n,light),0.);
 float rim=pow(1.-max(dot(n,-rd),0.),2.5);
 vec3 base=mix(vec3(.10,.30,.65),vec3(.22,.78,.88),smoothstep(-.8,.8,n.y));
 col=base*(.24+.9*diff)+rim*vec3(.25,.75,1.4);
 col+=pow(max(dot(reflect(-light,n),-rd),0.),30.)*.7;
 alpha=1.;
 }
 gl_FragColor=vec4(col,alpha);
}`;
    function compile(type: number, source: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, source); gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) { gl!.deleteShader(s); return null; }
      return s;
    }
    const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
    if(!vs||!fs)return;
    const program=gl.createProgram();if(!program)return;
    gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
    gl.useProgram(program);
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const res=gl.getUniformLocation(program,'resolution'),clock=gl.getUniformLocation(program,'time'),mouse=gl.getUniformLocation(program,'pointer');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame=0;let visible=true;let px=0,py=0;
    const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,1.5);canvas.width=Math.round(canvas.clientWidth*dpr);canvas.height=Math.round(canvas.clientHeight*dpr);gl.viewport(0,0,canvas.width,canvas.height);};
    const move=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();px=((e.clientX-r.left)/r.width-.5)*2;py=((e.clientY-r.top)/r.height-.5)*2;if(reduced)draw(0);};
    const draw=(t:number)=>{if(!visible)return;gl.uniform2f(res,canvas.width,canvas.height);gl.uniform1f(clock,reduced?0:t*.001);gl.uniform2f(mouse,px,py);gl.drawArrays(gl.TRIANGLES,0,6);if(!reduced)frame=requestAnimationFrame(draw);};
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){cancelAnimationFrame(frame);draw(performance.now());}else cancelAnimationFrame(frame);});
    resize();observer.observe(canvas);canvas.addEventListener('pointermove',move);window.addEventListener('resize',resize);draw(0);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener('pointermove',move);window.removeEventListener('resize',resize);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);gl.deleteBuffer(buffer);};
  },[]);
  return <div className="webgl-sculpture"><canvas ref={ref} aria-label="Interactive rotating three-dimensional glass sculpture" role="img"/><span className="webgl-caption">INTERACTIVE 3D / MOVE CURSOR</span></div>;
}
