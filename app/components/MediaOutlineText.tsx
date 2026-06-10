"use client";
import { useEffect, useRef } from "react";

export default function MediaOutlineText() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const font = new FontFace("Guardia-Serious", "url(/fonts/Guardia-Serious.otf)");
    font.load().then(f => document.fonts.add(f));
  }, []);

  return (
    <>
      <style>{`
        .media-stroke-white {
          fill: none;
          stroke: rgba(255,255,255,0.95);
          stroke-width: 0.7px;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation: mediaDraw 3.5s linear infinite;
          filter: drop-shadow(0 0 3px rgba(255,255,255,0.75));
        }
        .media-stroke-red {
          fill: none;
          stroke: rgba(255,80,80,0.7);
          stroke-width: 0.4px;
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation: mediaDraw 3.5s linear infinite;
          animation-delay: 0.6s;
        }
        @keyframes mediaDraw {
          0%   { stroke-dashoffset: 3000; opacity: 0.2; }
          8%   { opacity: 1; }
          55%  { stroke-dashoffset: 0; opacity: 1; }
          75%  { stroke-dashoffset: -3000; opacity: 0.4; }
          100% { stroke-dashoffset: -3000; opacity: 0; }
        }
      `}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 900 115"
        className="w-full"
        style={{ height: "clamp(55px, 11vw, 115px)", overflow: "visible" }}
      >
        <text
          x="450" y="100"
          textAnchor="middle"
          fontFamily="Guardia-Serious, serif"
          fontSize="108"
          fontWeight="900"
          fontStyle="italic"
          fill="#A0192D"
        >
          MEDIA
        </text>
        <text
          x="450" y="100"
          textAnchor="middle"
          fontFamily="Guardia-Serious, serif"
          fontSize="108"
          fontWeight="900"
          fontStyle="italic"
          className="media-stroke-white"
        >
          MEDIA
        </text>
        <text
          x="450" y="100"
          textAnchor="middle"
          fontFamily="Guardia-Serious, serif"
          fontSize="108"
          fontWeight="900"
          fontStyle="italic"
          className="media-stroke-red"
        >
          MEDIA
        </text>
      </svg>
    </>
  );
}
