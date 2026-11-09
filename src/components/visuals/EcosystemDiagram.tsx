import { getContent, getLocale } from "@/i18n/server";

/**
 * Static SVG diagram of the three pillars converging on the NexusWeb core.
 * Colours come from theme tokens, so it adapts to light/dark. The flowing
 * dashes are CSS-animated and stop under prefers-reduced-motion.
 */
export async function EcosystemDiagram({ className }: { className?: string }) {
  const t = (await getContent()).ui.ecosystemDiagram;
  const locale = await getLocale();
  const nodes = [
    { x: 200, y: 62, label: t.products, color: "var(--color-pulse-400)" },
    { x: 70, y: 292, label: t.education, color: "var(--color-violet-400)" },
    { x: 330, y: 292, label: t.community, color: "var(--color-signal-400)" },
  ];
  return (
    <svg viewBox="0 0 400 360" className={className} role="img" aria-labelledby="eco-title eco-desc">
      <title id="eco-title">{t.title}</title>
      <desc id="eco-desc">{t.description}</desc>
      <defs>
        <radialGradient id="eco-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5c9dff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3a7bff" stopOpacity="0" />
        </radialGradient>
        <style>{`
          .eco-flow { stroke-dasharray: 4 10; animation: eco-dash 3.2s linear infinite; }
          @keyframes eco-dash { to { stroke-dashoffset: -28; } }
          @media (prefers-reduced-motion: reduce) { .eco-flow { animation: none; } }
        `}</style>
      </defs>

      {/* Outer triangle: pillars connect to each other, not only to the core. */}
      <path
        d={`M${nodes[0].x} ${nodes[0].y} L${nodes[2].x} ${nodes[2].y} L${nodes[1].x} ${nodes[1].y} Z`}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="1"
      />
      <circle cx="200" cy="205" r="118" fill="none" stroke="var(--color-line)" strokeDasharray="2 6" />

      {nodes.map((n) => (
        <g key={n.label}>
          <line x1="200" y1="205" x2={n.x} y2={n.y} stroke={n.color} strokeOpacity="0.25" strokeWidth="1.5" />
          <line x1="200" y1="205" x2={n.x} y2={n.y} stroke={n.color} strokeOpacity="0.9" strokeWidth="1.5" className="eco-flow" />
        </g>
      ))}

      <circle cx="200" cy="205" r="70" fill="url(#eco-core)" />
      <circle cx="200" cy="205" r="34" fill="var(--color-ink-850)" stroke="var(--color-pulse-300)" strokeOpacity="0.6" />
      <text x="200" y="201" textAnchor="middle" fill="var(--color-text)" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
        Nexus
      </text>
      <text x="200" y="215" textAnchor="middle" fill="var(--color-pulse-300)" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
        Web
      </text>

      {nodes.map((n) => (
        <g key={`${n.label}-node`}>
          <circle cx={n.x} cy={n.y} r="22" fill={n.color} fillOpacity="0.12" />
          <circle cx={n.x} cy={n.y} r="9" fill="var(--color-ink-850)" stroke={n.color} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="3.5" fill={n.color} />
          <text
            x={n.x}
            y={n.y + (n.y < 200 ? -32 : 44)}
            textAnchor="middle"
            fill="var(--color-text)"
            fontSize="13"
            fontFamily="var(--font-mono)"
            letterSpacing="1.5"
          >
            {n.label.toLocaleUpperCase(locale)}
          </text>
        </g>
      ))}
    </svg>
  );
}
