import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Brand mark (generated master in /brand), embedded so the OG renderer needs no network.
const markDataUri = `data:image/png;base64,${readFileSync(join(process.cwd(), "brand/nexusweb-mark-512.png")).toString("base64")}`;

/** Shared social preview card in the NexusWeb visual language. */
export function renderOgImage({ eyebrow, title, subtitle, status }: { eyebrow: string; title: string; subtitle: string; status?: string }) {
  const nodes = [
    [930, 120], [1080, 210], [990, 330], [1120, 420], [880, 470], [1010, 560], [800, 260],
  ];
  const links = [[0, 1], [1, 2], [0, 6], [6, 2], [2, 3], [2, 4], [4, 5], [3, 5], [1, 3]];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #04060c 0%, #0a1020 55%, #151a3a 100%)",
          color: "#e8ecf7",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {links.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke="#5c9dff"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          ))}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 2 ? 14 : 7} fill={i % 3 === 1 ? "#a78bfa" : i === 2 ? "#e8ecf7" : "#5c9dff"} />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
            <img src={markDataUri} width={64} height={64} alt="" />
            <div style={{ display: "flex" }}>
              <span>Nexus</span>
              <span style={{ color: "#8f7cff" }}>Web</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, color: "#93c0ff", textTransform: "uppercase" }}>
              <span>{eyebrow}</span>
              {status && (
                <span
                  style={{
                    fontSize: 18,
                    letterSpacing: 2,
                    padding: "4px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(92,157,255,0.6)",
                    background: "rgba(58,123,255,0.15)",
                  }}
                >
                  {status}
                </span>
              )}
            </div>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 20, letterSpacing: -2 }}>{title}</div>
            <div style={{ fontSize: 30, color: "#9aa5c4", marginTop: 24, lineHeight: 1.35 }}>{subtitle}</div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
