"use client";
import { useRef, useEffect, useState } from "react";

type Particle = {
  x:number; y:number; ox:number; oy:number;
  color:string; opacity:number; oa:number;
  vx:number; vy:number; speed:number; fade?:boolean;
};

export default function VaporizeMediaText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const [phase, setPhase] = useState<"static"|"vaporizing"|"fadingIn">("static");
  const progressRef = useRef(0);
  const fadeRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const font = new FontFace("Guardia-Serious", "url(/fonts/Guardia-Serious.otf)");
    font.load().then(f => { document.fonts.add(f); setReady(true); }).catch(() => setReady(true));
  }, []);

  const buildParticles = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fontSize = Math.min(w * 0.18, 110);
    ctx.font = `900 ${fontSize * dpr}px "Guardia-Serious", serif`;
    ctx.fillStyle = "rgb(160,25,45)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MEDIA", canvas.width / 2, canvas.height / 2);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const sr = Math.max(1, Math.round(dpr / 2));
    const parts: Particle[] = [];
    for (let y = 0; y < canvas.height; y += sr) {
      for (let x = 0; x < canvas.width; x += sr) {
        const i = (y * canvas.width + x) * 4;
        if (data[i + 3] > 10) {
          const oa = data[i + 3] / 255;
          parts.push({ x, y, ox:x, oy:y, color:"", opacity:oa, oa, vx:0, vy:0, speed:0 });
        }
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = parts;
    ctx.font = `900 ${fontSize * dpr}px "Guardia-Serious", serif`;
    ctx.textAlign = "center";
    const m = ctx.measureText("MEDIA");
    (canvas as any)._tb = { left: canvas.width/2 - m.width/2, right: canvas.width/2 + m.width/2, width: m.width };
  };

  useEffect(() => {
    if (!ready) return;
    buildParticles();
    const t = setTimeout(() => setPhase("vaporizing"), 1000);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !particlesRef.current.length) { animRef.current = requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = window.devicePixelRatio || 1;
      const tb = (canvas as any)._tb;
      if (phase === "static") {
        renderP(ctx, particlesRef.current, dpr);
      } else if (phase === "vaporizing" && tb) {
        progressRef.current += dt * 100 / 3;
        const prog = Math.min(100, progressRef.current);
        const vx = tb.right - tb.width * prog / 100;
        let done = true;
        particlesRef.current.forEach(p => {
          const should = p.ox >= vx;
          if (should) {
            if (p.speed === 0) {
              const angle = Math.random() * Math.PI * 2;
              p.speed = (Math.random() + 0.5) * 8;
              p.vx = Math.cos(angle) * p.speed;
              p.vy = Math.sin(angle) * p.speed;
              p.fade = Math.random() > 0.7;
            }
            if (p.fade) { p.opacity = Math.max(0, p.opacity - dt * 1.5); }
            else {
              const dx=p.ox-p.x, dy=p.oy-p.y, dist=Math.sqrt(dx*dx+dy*dy);
              const damp=Math.max(0.95,1-dist/800);
              p.vx=(p.vx+(Math.random()-0.5)*24+dx*0.002)*damp;
              p.vy=(p.vy+(Math.random()-0.5)*24+dy*0.002)*damp;
              const mv=16,cv=Math.sqrt(p.vx**2+p.vy**2);
              if(cv>mv){p.vx*=mv/cv;p.vy*=mv/cv;}
              p.x+=p.vx*dt*20; p.y+=p.vy*dt*10;
              p.opacity=Math.max(0,p.opacity-dt*0.2);
            }
            if (p.opacity > 0.01) done = false;
          } else done = false;
        });
        renderP(ctx, particlesRef.current, dpr);
        if (progressRef.current >= 100 && done) {
          buildParticles();
          setPhase("fadingIn"); fadeRef.current = 0;
        }
      } else if (phase === "fadingIn") {
        fadeRef.current += dt / 1.5;
        ctx.save(); ctx.scale(dpr, dpr);
        particlesRef.current.forEach(p => {
          p.x=p.ox; p.y=p.oy;
          const op=Math.min(fadeRef.current,1)*p.oa;
          ctx.fillStyle=`rgba(160,25,45,${op})`;
          ctx.fillRect(p.x/dpr,p.y/dpr,1,1);
        });
        ctx.restore();
        if (fadeRef.current >= 1) {
          setPhase("static");
          setTimeout(() => {
            progressRef.current = 0;
            particlesRef.current.forEach(p=>{p.x=p.ox;p.y=p.oy;p.opacity=p.oa;p.speed=0;p.vx=0;p.vy=0;});
            setPhase("vaporizing");
          }, 2500);
        }
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, ready]);

  useEffect(() => {
    if (!ready) return;
    const ro = new ResizeObserver(() => buildParticles());
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [ready]);

  return (
    <div ref={wrapperRef} style={{width:"100%",height:"100%",position:"relative"}}>
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%"}} />
    </div>
  );
}

function renderP(ctx: CanvasRenderingContext2D, ps: Particle[], dpr: number) {
  ctx.save(); ctx.scale(dpr, dpr);
  ps.forEach(p => {
    if (p.opacity > 0) {
      ctx.fillStyle = `rgba(160,25,45,${p.opacity})`;
      ctx.fillRect(p.x/dpr, p.y/dpr, 1, 1);
    }
  });
  ctx.restore();
}
