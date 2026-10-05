"use client";

import { useEffect, useId, useRef } from "react";
import { footerRevealOffset } from "@/lib/footer-motion";

export default function NewFooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const id = `new-footer-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const stage = ref.current;
    const art = artRef.current;
    const footer = stage?.closest("footer");
    if (!stage || !art || !footer) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const masks = art.querySelectorAll<SVGCircleElement>("[data-pointer-mask]");
    const glyph = art.querySelector<SVGTextElement>("text");
    let mounted = true;
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let offset = 200;
    let hasPointer = false;
    const pointer = { x: 0, y: 0 };
    const focus = { x: -1000, y: -1000 };

    function fitWordmark() {
      if (!mounted || !glyph) return;
      const width = Math.ceil(glyph.getComputedTextLength());
      if (width > 0) {
        art!.setAttribute("viewBox", `0 0 ${width} 250`);
        masks.forEach(mask => mask.setAttribute("r", String(width * .2)));
        requestFrame();
      }
    }

    function requestFrame() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }

    function draw(time: number) {
      frame = 0;
      if (!visible || document.hidden) return;
      const delta = Math.min(time - (previousTime || time - 16), 64);
      previousTime = time;
      const bounds = stage!.getBoundingClientRect();
      const artBounds = art!.getBoundingClientRect();
      const targetOffset = reducedMotion.matches ? 0 : footerRevealOffset(bounds.top, bounds.height, window.innerHeight);
      const nextOffset = offset + (targetOffset - offset) * (1 - Math.exp(-delta / 160));
      const settling = Math.abs(targetOffset - nextOffset) > 0.1;
      const previousOffset = offset;
      offset = settling ? nextOffset : targetOffset;
      art!.style.transform = `translateY(${offset}px)`;

      let pointerSettling = false;
      if (hasPointer && finePointer.matches && !reducedMotion.matches && artBounds.width > 0) {
        const scale = art!.viewBox.baseVal.width / artBounds.width;
        const targetX = (pointer.x - artBounds.left) * scale;
        const targetY = (pointer.y - artBounds.top - offset + previousOffset) * scale;
        const smoothing = 1 - Math.exp(-delta / 140);
        focus.x += (targetX - focus.x) * smoothing;
        focus.y += (targetY - focus.y) * smoothing;
        pointerSettling = Math.hypot(targetX - focus.x, targetY - focus.y) > 0.2;
        masks.forEach(mask => {
          mask.setAttribute("cx", String(focus.x));
          mask.setAttribute("cy", String(focus.y));
        });
      } else {
        masks.forEach(mask => mask.setAttribute("cx", "-1000"));
      }

      if (settling || pointerSettling) requestFrame();
    }

    function movePointer(event: PointerEvent) {
      if (event.pointerType === "touch" || !finePointer.matches || reducedMotion.matches) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      hasPointer = true;
      requestFrame();
    }

    function updateMotionPreference() {
      if (reducedMotion.matches) {
        hasPointer = false;
        offset = 0;
        art!.style.transform = "none";
        masks.forEach(mask => mask.setAttribute("cx", "-1000"));
      }
      requestFrame();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        previousTime = 0;
        requestFrame();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        offset = reducedMotion.matches ? 0 : footerRevealOffset(entry.boundingClientRect.top, entry.boundingClientRect.height, window.innerHeight);
        art.style.transform = `translateY(${offset}px)`;
      }
    });
    observer.observe(stage);
    const resizeObserver = new ResizeObserver(requestFrame);
    resizeObserver.observe(stage);
    footer.addEventListener("pointermove", movePointer, { passive: true });
    document.addEventListener("scroll", requestFrame, { capture: true, passive: true });
    document.addEventListener("visibilitychange", requestFrame);
    window.addEventListener("resize", requestFrame, { passive: true });
    reducedMotion.addEventListener("change", updateMotionPreference);
    finePointer.addEventListener("change", updateMotionPreference);
    updateMotionPreference();
    fitWordmark();
    void document.fonts.load('400 280px "FooterInter"').then(fitWordmark);

    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      footer.removeEventListener("pointermove", movePointer);
      document.removeEventListener("scroll", requestFrame, true);
      document.removeEventListener("visibilitychange", requestFrame);
      window.removeEventListener("resize", requestFrame);
      reducedMotion.removeEventListener("change", updateMotionPreference);
      finePointer.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <div ref={ref} className="new-footer-wordmark-stage">
      <svg ref={artRef} className="new-footer-wordmark" viewBox="0 0 1000 250" role="img" aria-label="Scriptrx">
        <defs>
          <text id={`${id}-glyph`} className="new-footer-wordmark-glyph" x="0" y="260">Scriptrx</text>
          <linearGradient id={`${id}-silver`} x1="0" y1="30" x2="0" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dbeafd" />
            <stop offset="40%" stopColor="#a9b8ce" />
            <stop offset="100%" stopColor="#09101a" />
          </linearGradient>
          <radialGradient id={`${id}-focus`}>
            <stop offset="0%" stopColor="white" />
            <stop offset="35%" stopColor="white" stopOpacity="0.98" />
            <stop offset="60%" stopColor="white" stopOpacity="0.73" />
            <stop offset="80%" stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-cutout`}>
            <stop offset="0%" stopColor="black" />
            <stop offset="35%" stopColor="black" stopOpacity="0.98" />
            <stop offset="60%" stopColor="black" stopOpacity="0.73" />
            <stop offset="80%" stopColor="black" stopOpacity="0.28" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-solid`} maskUnits="userSpaceOnUse" x="-50" y="-50" width="1500" height="400" style={{ maskType: "luminance" }}>
            <rect x="-50" y="-50" width="1500" height="400" fill="white" />
            <circle data-pointer-mask cx="-1000" cy="-1000" r="280" fill={`url(#${id}-cutout)`} />
          </mask>
          <mask id={`${id}-outline`} maskUnits="userSpaceOnUse" x="-50" y="-50" width="1500" height="400">
            <circle data-pointer-mask cx="-1000" cy="-1000" r="280" fill={`url(#${id}-focus)`} />
          </mask>
          <linearGradient id={`${id}-bottom-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="55%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <mask id={`${id}-blur-mask`}><rect width="1400" height="300" fill={`url(#${id}-bottom-fade)`} /></mask>
          <filter id={`${id}-blur`} x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        <g mask={`url(#${id}-solid)`}>
          <use href={`#${id}-glyph`} fill={`url(#${id}-silver)`} />
          <use href={`#${id}-glyph`} fill={`url(#${id}-silver)`} filter={`url(#${id}-blur)`} mask={`url(#${id}-blur-mask)`} />
        </g>
        <use href={`#${id}-glyph`} mask={`url(#${id}-outline)`} fill="none" stroke="#dbeafd" strokeWidth="1.25" strokeDasharray="1 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
