"use client";
import React, { useRef, useEffect, useState, createElement, useMemo } from "react";

export enum Tag { H1="h1", H2="h2", H3="h3", P="p" }

type Particle = {
  x:number; y:number; originalX:number; originalY:number;
  color:string; opacity:number; originalAlpha:number;
  velocityX:number; velocityY:number; angle:number; speed:number;
  shouldFadeQuickly?:boolean;
};
declare global { interface HTMLCanvasElement { textBoundaries?:{left:number;right:number;width:number} } }

type Props = {
  texts:string[]; font?:{fontFamily?:string;fontSize?:string;fontWeight?:number};
  color?:string; spread?:number; density?:number;
  animation?:{vaporizeDuration?:number;fadeInDuration?:number;waitDuration?:number};
  direction?:"left-to-right"|"right-to-left"; alignment?:"left"|"center"|"right"; tag?:Tag;
};

export default function VaporizeTextCycle({
  texts=["Text"], font={fontFamily:"sans-serif",fontSize:"50px",fontWeight:400},
  color="rgb(255,255,255)", spread=5, density=5,
  animation={vaporizeDuration:2,fadeInDuration:1,waitDuration:0.5},
  direction="left-to-right", alignment="center", tag=Tag.P,
}:Props) {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const wrapperRef = useRef<HTMLDivElement|null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number|null>(null);
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState<"static"|"vaporizing"|"fadingIn"|"waiting">("static");
  const vpRef = useRef(0);
  const foRef = useRef(0);
  const [size, setSize] = useState({width:0,height:0});
  const dpr = useMemo(()=> typeof window!=="undefined" ? window.devicePixelRatio*1.5||1 : 1,[]);
  const dt_density = Math.max(0.3,Math.min(1,0.3+(density/10)*0.7));
  const fs = parseInt(font.fontSize?.replace("px","")||"50");
  const bs = fs<30?0.2:fs<70?0.5:1.5;
  const vs = bs*spread;
  const dur = useMemo(()=>({V:(animation.vaporizeDuration??2)*1000,F:(animation.fadeInDuration??1)*1000,W:(animation.waitDuration??0.5)*1000}),[animation.vaporizeDuration,animation.fadeInDuration,animation.waitDuration]);

  useEffect(()=>{const t=setTimeout(()=>setState("vaporizing"),800);return()=>clearTimeout(t);},[]);

  useEffect(()=>{
    let last=performance.now();
    const loop=(now:number)=>{
      const dt=(now-last)/1000; last=now;
      const canvas=canvasRef.current; const ctx=canvas?.getContext("2d");
      if(!canvas||!ctx||!particlesRef.current.length){animRef.current=requestAnimationFrame(loop);return;}
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(state==="static"||state==="waiting"){
        rp(ctx,particlesRef.current,dpr);
      } else if(state==="vaporizing"){
        vpRef.current+=dt*100/(dur.V/1000);
        const tb=canvas.textBoundaries;
        if(tb){
          const prog=Math.min(100,vpRef.current);
          const vx=direction==="left-to-right"?tb.left+tb.width*prog/100:tb.right-tb.width*prog/100;
          const done=up(particlesRef.current,vx,dt,vs,dur.V,direction,dt_density);
          rp(ctx,particlesRef.current,dpr);
          if(vpRef.current>=100&&done){setIdx(p=>(p+1)%texts.length);setState("fadingIn");foRef.current=0;}
        }
      } else if(state==="fadingIn"){
        foRef.current+=dt*1000/dur.F;
        ctx.save();ctx.scale(dpr,dpr);
        particlesRef.current.forEach(p=>{
          p.x=p.originalX;p.y=p.originalY;
          const op=Math.min(foRef.current,1)*p.originalAlpha;
          ctx.fillStyle=p.color.replace(/[\d.]+\)$/,op+")");
          ctx.fillRect(p.x/dpr,p.y/dpr,1,1);
        });
        ctx.restore();
        if(foRef.current>=1){setState("waiting");setTimeout(()=>{setState("vaporizing");vpRef.current=0;particlesRef.current.forEach(p=>{p.x=p.originalX;p.y=p.originalY;p.opacity=p.originalAlpha;p.speed=0;p.velocityX=0;p.velocityY=0;});},dur.W);}
      }
      animRef.current=requestAnimationFrame(loop);
    };
    animRef.current=requestAnimationFrame(loop);
    return()=>{if(animRef.current)cancelAnimationFrame(animRef.current);};
  },[state,texts.length,direction,dpr,vs,dur,dt_density]);

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas||!size.width||!size.height)return;
    const ctx=canvas.getContext("2d");if(!ctx)return;
    canvas.style.width=size.width+"px";canvas.style.height=size.height+"px";
    canvas.width=Math.floor(size.width*dpr);canvas.height=Math.floor(size.height*dpr);
    const fStr=(font.fontWeight??400)+" "+(fs*dpr)+"px "+(font.fontFamily??"sans-serif");
    const tx=alignment==="center"?canvas.width/2:alignment==="left"?0:canvas.width;
    const ty=canvas.height/2;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=color;ctx.font=fStr;ctx.textAlign=alignment;ctx.textBaseline="middle";
    const text=texts[idx]||"";
    ctx.fillText(text,tx,ty);
    const mw=ctx.measureText(text).width;
    const tl=alignment==="center"?tx-mw/2:alignment==="left"?tx:tx-mw;
    canvas.textBoundaries={left:tl,right:tl+mw,width:mw};
    const d=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    const sr=Math.max(1,Math.round(dpr/3));
    const parts:Particle[]=[];
    for(let y=0;y<canvas.height;y+=sr)for(let x=0;x<canvas.width;x+=sr){
      const i=(y*canvas.width+x)*4;
      if(d[i+3]>0){const oa=d[i+3]/255*(sr/dpr);parts.push({x,y,originalX:x,originalY:y,color:"rgba("+d[i]+","+d[i+1]+","+d[i+2]+","+oa+")",opacity:oa,originalAlpha:oa,velocityX:0,velocityY:0,angle:0,speed:0});}
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesRef.current=parts;
  },[texts,font,color,alignment,size,idx,dpr,fs]);

  useEffect(()=>{
    if(!wrapperRef.current)return;
    const ro=new ResizeObserver(es=>{for(const e of es)setSize({width:e.contentRect.width,height:e.contentRect.height});});
    ro.observe(wrapperRef.current);return()=>ro.disconnect();
  },[]);

  useEffect(()=>{if(wrapperRef.current){const r=wrapperRef.current.getBoundingClientRect();setSize({width:r.width,height:r.height});}},[]);

  return (
    <div ref={wrapperRef} style={{width:"100%",height:"100%",pointerEvents:"none"}}>
      <canvas ref={canvasRef} style={{minWidth:"30px",minHeight:"20px",pointerEvents:"none"}}/>
      {createElement(Object.values(Tag).includes(tag)?tag:"p",{style:{position:"absolute",width:"0",height:"0",overflow:"hidden",userSelect:"none",pointerEvents:"none"}},texts.join(" "))}
    </div>
  );
}

function up(ps:Particle[],vx:number,dt:number,vs:number,vd:number,dir:string,den:number){
  let done=true;
  ps.forEach(p=>{
    const should=dir==="left-to-right"?p.originalX<=vx:p.originalX>=vx;
    if(should){
      if(p.speed===0){p.angle=Math.random()*Math.PI*2;p.speed=(Math.random()+0.5)*vs;p.velocityX=Math.cos(p.angle)*p.speed;p.velocityY=Math.sin(p.angle)*p.speed;p.shouldFadeQuickly=Math.random()>den;}
      if(p.shouldFadeQuickly){p.opacity=Math.max(0,p.opacity-dt);}
      else{
        const dx=p.originalX-p.x,dy=p.originalY-p.y,dist=Math.sqrt(dx*dx+dy*dy);
        const damp=Math.max(0.95,1-dist/(100*vs));
        p.velocityX=(p.velocityX+(Math.random()-0.5)*vs*3+dx*0.002)*damp;
        p.velocityY=(p.velocityY+(Math.random()-0.5)*vs*3+dy*0.002)*damp;
        const mv=vs*2,cv=Math.sqrt(p.velocityX**2+p.velocityY**2);
        if(cv>mv){p.velocityX*=mv/cv;p.velocityY*=mv/cv;}
        p.x+=p.velocityX*dt*20;p.y+=p.velocityY*dt*10;
        p.opacity=Math.max(0,p.opacity-dt*0.25*(2000/vd));
      }
      if(p.opacity>0.01)done=false;
    }else done=false;
  });
  return done;
}

function rp(ctx:CanvasRenderingContext2D,ps:Particle[],dpr:number){
  ctx.save();ctx.scale(dpr,dpr);
  ps.forEach(p=>{if(p.opacity>0){ctx.fillStyle=p.color.replace(/[\d.]+\)$/,p.opacity+")");ctx.fillRect(p.x/dpr,p.y/dpr,1,1);}});
  ctx.restore();
}
