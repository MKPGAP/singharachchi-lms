//@ts-nocheck
"use client";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const morphTime = 1.5;
const cooldownTime = 0.5;

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const setStyles = useCallback((fraction: number) => {
    const [c1, c2] = [text1Ref.current, text2Ref.current];
    if (!c1 || !c2 || !texts?.length) return;
    c2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    c2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    const inv = 1 - fraction;
    c1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
    c1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    c1.textContent = texts[textIndexRef.current % texts.length];
    c2.textContent = texts[(textIndexRef.current + 1) % texts.length];
  }, [texts]);

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let fraction = morphRef.current / morphTime;
    if (fraction > 1) { cooldownRef.current = cooldownTime; fraction = 1; }
    setStyles(fraction);
    if (fraction === 1) textIndexRef.current++;
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [c1, c2] = [text1Ref.current, text2Ref.current];
    if (c1 && c2) { c2.style.filter = "none"; c2.style.opacity = "100%"; c1.style.filter = "none"; c1.style.opacity = "0%"; }
  }, []);

  useEffect(() => {
    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      const now = new Date();
      const dt = (now.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = now;
      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) doMorph(); else doCooldown();
    };
    animate();
    return () => cancelAnimationFrame(id);
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

const Texts = ({ texts }: { texts: string[] }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text1Ref} />
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text2Ref} />
    </>
  );
};

const SvgFilters = () => (
  <svg id="filters" className="hidden" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="threshold">
        <feColorMatrix in="SourceGraphic" type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
      </filter>
    </defs>
  </svg>
);

export const MorphingText = ({ texts, className }: { texts: string[]; className?: string }) => (
  <div className={cn(
    "relative mx-auto w-full text-center font-sans font-bold leading-none [filter:url(#threshold)_blur(0.6px)]",
    className
  )}>
    <Texts texts={texts} />
    <SvgFilters />
  </div>
);
