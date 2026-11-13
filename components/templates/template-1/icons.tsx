import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const ArrowLeft = () => <svg {...base}><path d="M16 10H4M9 5l-5 5 5 5" /></svg>;
export const ArrowRight = () => <svg {...base}><path d="M4 10h12M11 5l5 5-5 5" /></svg>;
export const ArrowUpRight = () => <svg {...base}><path d="M6 14l8-8M7 6h7v7" /></svg>;
export const Check = () => <svg {...base}><path d="M4.5 10.5l3.5 3.5 7.5-8" /></svg>;
export const Plus = () => <svg {...base}><path d="M10 4.5v11M4.5 10h11" /></svg>;
export const Bag = () => <svg {...base}><path d="M4.5 7h11l-.8 9.5H5.3L4.5 7zM7.5 7V5.5a2.5 2.5 0 015 0V7" /></svg>;
export const Menu = () => <svg {...base}><path d="M3.5 7h13M3.5 13h13" /></svg>;
export const Close = () => <svg {...base}><path d="M5 5l10 10M15 5L5 15" /></svg>;
export const ChevronDown = () => <svg {...base}><path d="M5.5 8l4.5 4.5L14.5 8" /></svg>;
export const Shield = () => <svg {...base}><path d="M10 2.5l6 2.2v4.6c0 3.6-2.4 6.6-6 8.2-3.6-1.600-6-4.600-6-8.200V4.700l6-2.200zM7.300 10.200l1.900 1.900 3.600-3.900" /></svg>;
export const Screen = () => <svg {...base}><path d="M3 4.500h14v9H3zM7.500 16.500h5M10 13.500v3" /></svg>;
export const Box = () => <svg {...base}><path d="M10 2.800l6.500 3.400v7.600L10 17.200l-6.500-3.400V6.200L10 2.800zM3.700 6.300L10 9.700l6.300-3.400M10 9.700v7.300" /></svg>;
