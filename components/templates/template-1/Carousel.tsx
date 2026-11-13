"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

type Props = {
  eyebrow?: string;
  title: string;
  /** Accessible name of the scrolling row, e.g. "Popular treatments". */
  label: string;
  /** "row" scrolls most of a viewport of cards, "page" moves exactly one full-width slide. */
  step?: "row" | "page";
  className?: string;
  children: ReactNode;
};

export default function Carousel({ eyebrow, title, label, step = "row", className = "", children }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setEdges(prev => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const frame = requestAnimationFrame(measure);
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const move = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const distance = step === "page" ? el.clientWidth : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * distance, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className={`t1-carousel ${className}`}>
      <div className="t1-head" data-reveal>
        <div className="t1-head-text">
          {eyebrow && <p className="t1-eyebrow">{eyebrow}</p>}
          <h2 className="t1-h2">{title}</h2>
        </div>
        <div className="t1-arrows">
          <button
            type="button"
            className="t1-arrow"
            aria-label={`Previous: ${label}`}
            aria-controls={trackId}
            aria-disabled={edges.start}
            onClick={() => !edges.start && move(-1)}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="t1-arrow"
            aria-label={`Next: ${label}`}
            aria-controls={trackId}
            aria-disabled={edges.end}
            onClick={() => !edges.end && move(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      {/* The row is focusable so keyboard users can scroll it with the arrow keys. */}
      <ul id={trackId} ref={trackRef} className="t1-track" tabIndex={0} role="list" aria-label={label}>
        {children}
      </ul>
    </div>
  );
}
