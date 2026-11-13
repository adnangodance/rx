import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const ArrowLeft = () => <svg {...base}><path d="M16.5 10h-13M8.500 5l-5 5 5 5" /></svg>;
export const ArrowRight = () => <svg {...base}><path d="M3.500 10h13M11.500 5l5 5-5 5" /></svg>;
export const Check = () => <svg {...base}><path d="M4.500 10.500l3.500 3.500 7.500-8" /></svg>;
export const Dash = () => <svg {...base}><path d="M6 10h8" /></svg>;
export const Close = () => <svg {...base}><path d="M5 5l10 10M15 5L5 15" /></svg>;

/** Wrenfield mark: a small leaf-and-stem monogram drawn on a 24px grid. */
export const Mark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M12 21V9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 13C12 8 8.500 5 4 5c0 5 3 8 8 8z" fill="currentColor" />
    <path d="M12 10c0-4 2.500-7 8-7 0 5-3 7.500-8 7z" fill="currentColor" opacity=".55" />
  </svg>
);
