import { cn } from "@/lib/cn";

/**
 * NexusWeb mark: three outer nodes (products, education, community) converging
 * on a central node — the nexus — drawn as glossy links and glass nodes on a
 * dark glass tile. Master files live in /brand (generated from the same geometry).
 */
const T = [50, 27.5];
const L = [26.9, 67.5];
const R = [73.1, 67.5];
const C = [50, 54.2];
const TRI = `M${T[0]} ${T[1]} L${R[0]} ${R[1]} L${L[0]} ${L[1]} Z`;
const SPOKES = [T, L, R].map((n) => `M${C[0]} ${C[1]} L${n[0]} ${n[1]}`).join(" ");

function Node({ at, r, fill }: { at: number[]; r: number; fill: string }) {
  return (
    <>
      <circle cx={at[0]} cy={at[1]} r={r} fill={`url(#${fill})`} />
      <ellipse cx={at[0] - r * 0.28} cy={at[1] - r * 0.38} rx={r * 0.48} ry={r * 0.28} fill="#fff" opacity="0.5" />
    </>
  );
}

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("size-8", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id="nxl-tf" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0a0d26" />
          <stop offset="1" stopColor="#04050c" />
        </linearGradient>
        <linearGradient id="nxl-ts" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5a7dff" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#4a3fd8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#7b5cff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="nxl-rb" x1="20" y1="20" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5aa0ff" />
          <stop offset="0.55" stopColor="#5b6dff" />
          <stop offset="1" stopColor="#8a5cff" />
        </linearGradient>
        <linearGradient id="nxl-ed" x1="20" y1="20" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f8dff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7b5cff" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="nxl-nb" cx="0.35" cy="0.3" r="0.75">
          <stop stopColor="#cfe2ff" />
          <stop offset="0.35" stopColor="#5c9dff" />
          <stop offset="1" stopColor="#2a4fd8" />
        </radialGradient>
        <radialGradient id="nxl-nv" cx="0.35" cy="0.3" r="0.75">
          <stop stopColor="#e6dcff" />
          <stop offset="0.35" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4c2bb8" />
        </radialGradient>
        <radialGradient id="nxl-nc" cx="0.35" cy="0.3" r="0.75">
          <stop stopColor="#d4fbff" />
          <stop offset="0.35" stopColor="#3fd3ea" />
          <stop offset="1" stopColor="#1688b8" />
        </radialGradient>
        <radialGradient id="nxl-core" cx="0.38" cy="0.32" r="0.8">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e8e6ff" />
          <stop offset="1" stopColor="#a9a2ff" />
        </radialGradient>
        <filter id="nxl-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      <rect x="1" y="1" width="98" height="98" rx="27" fill="url(#nxl-tf)" stroke="url(#nxl-ts)" strokeWidth="2" />
      <g transform="translate(2.5 2.5) scale(0.95)">
        <g filter="url(#nxl-glow)" opacity="0.9">
          <path d={TRI} fill="none" stroke="#5b6dff" strokeWidth="9" strokeLinejoin="round" opacity="0.55" />
          <path d={SPOKES} stroke="#6a7dff" strokeWidth="11" strokeLinecap="round" />
        </g>
        <path d={TRI} fill="none" stroke="url(#nxl-ed)" strokeWidth="6.5" strokeLinejoin="round" />
        <path d={SPOKES} stroke="url(#nxl-rb)" strokeWidth="8.5" strokeLinecap="round" />
        <Node at={T} r={6.8} fill="nxl-nb" />
        <Node at={L} r={6.8} fill="nxl-nv" />
        <Node at={R} r={6.8} fill="nxl-nc" />
        <Node at={C} r={8} fill="nxl-core" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-9" />
      <span className="font-display text-[1.1rem] font-bold tracking-tight">
        <span className="bg-gradient-to-b from-white to-[#d4d1ff] bg-clip-text text-transparent light:from-[#0b1030] light:to-[#1b2150]">
          Nexus
        </span>
        <span className="bg-gradient-to-r from-[#6f86ff] to-[#9a74ff] bg-clip-text text-transparent light:from-[#3d5bff] light:to-[#6b3dff]">
          Web
        </span>
      </span>
    </span>
  );
}
