"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 | 2 };

const COLORS = [
  [92, 157, 255], // pulse
  [167, 139, 250], // violet
  [63, 211, 234], // signal
] as const;

/**
 * Animated "nexus" background: drifting nodes that connect when close, and
 * gently gather around the pointer. Decorative only (aria-hidden).
 *
 * Performance & accessibility:
 * - Pauses when off-screen or when the tab is hidden.
 * - Renders a single static frame when the user prefers reduced motion.
 * - Node count scales with area and is capped; DPR is capped at 2.
 */
export function NetworkCanvas({ className, density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const seed = () => {
      const area = width * height;
      const count = Math.min(90, Math.max(24, Math.round((area / 16000) * density)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.8,
        hue: (i % 7 === 0 ? 1 : i % 11 === 0 ? 2 : 0) as Node["hue"],
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const linkDist = () => Math.min(150, Math.max(100, width / 9));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Light theme: stronger lines and a deeper blue so the network stays visible on white.
      const light = document.documentElement.dataset.theme === "light";
      const k = light ? 1.8 : 1;
      const max = linkDist();
      const max2 = max * max;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < max2) {
            const alpha = Math.min(1, (1 - Math.sqrt(d2) / max) * 0.32 * k);
            const [r, g, bl] = COLORS[a.hue === b.hue ? a.hue : 0];
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < max * 1.3) {
            ctx.strokeStyle = `rgba(${light ? "42,95,224" : "147,192,255"},${(1 - d / (max * 1.3)) * 0.45 * k})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const [r, g, b] = COLORS[n.hue];
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 180 && d > 1) {
            n.vx += (dx / d) * 0.006;
            n.vy += (dy / d) * 0.006;
          }
        }
        n.vx *= 0.995;
        n.vy *= 0.995;
        // Keep a gentle minimum drift.
        if (Math.abs(n.vx) < 0.04) n.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(n.vy) < 0.04) n.vy += (Math.random() - 0.5) * 0.02;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduceMotion.matches || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => (reduceMotion.matches ? (stop(), draw()) : start());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const ro = new ResizeObserver(resize);
    // Redraw immediately when the theme changes (matters when motion is reduced and nothing animates).
    const mo = new MutationObserver(() => draw());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotionChange);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none h-full w-full", className)} />;
}
