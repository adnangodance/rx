"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { sectionRevealFrame } from "@/lib/section-reveal";

export default function NewSectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");
    let frame = 0;

    function draw() {
      frame = 0;
      if (!stage || document.hidden) return;
      const { scale, radius, shadow, progress } = sectionRevealFrame(stage.getBoundingClientRect().top, window.innerHeight, compact.matches);
      stage.style.setProperty("--care-section-scale", String(motion.matches ? 1 : scale));
      stage.style.setProperty("--care-section-radius", `${motion.matches ? 0 : radius}px`);
      stage.style.setProperty("--care-section-shadow", String(motion.matches ? 0 : shadow));
      stage.dataset.entering = String(!motion.matches && progress > 0 && progress < 1);
    }

    function schedule() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    compact.addEventListener("change", schedule);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
      compact.removeEventListener("change", schedule);
      stage.style.removeProperty("--care-section-scale");
      stage.style.removeProperty("--care-section-radius");
      stage.style.removeProperty("--care-section-shadow");
      delete stage.dataset.entering;
    };
  }, []);

  return <div className={`new-care-section-stage${className ? ` ${className}` : ""}`} ref={stageRef}><div className="new-care-section-surface">{children}</div></div>;
}
