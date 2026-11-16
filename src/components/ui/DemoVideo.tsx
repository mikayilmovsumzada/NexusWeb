"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Plain <video> that pauses when its page is hidden. With Cache Components, Next.js keeps the
 * previous route mounted inside React <Activity> (display: none) on navigation, e.g. after
 * switching language, so a playing video would keep playing off-screen. The layout-effect
 * cleanup runs when Activity hides the page (and on unmount).
 */
export function DemoVideo({
  src,
  poster,
  width,
  height,
  label,
}: {
  src: string;
  poster?: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = ref.current;
    return () => {
      video?.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      className="h-auto w-full"
    >
      <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
    </video>
  );
}
