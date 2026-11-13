import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const ArrowLeft = () => <svg {...base}><path d="M16 10H4M9 5l-5 5 5 5" /></svg>;
export const ArrowRight = () => <svg {...base}><path d="M4 10h12M11 5l5 5-5 5" /></svg>;
export const ArrowUpRight = () => <svg {...base}><path d="M6 14l8-8M7 6h7v7" /></svg>;
export const Plus = () => <svg {...base}><path d="M10 4.5v11M4.5 10h11" /></svg>;
export const Menu = () => <svg {...base}><path d="M3.5 7h13M3.5 13h13" /></svg>;
export const Close = () => <svg {...base}><path d="M5 5l10 10M15 5L5 15" /></svg>;
export const Check = () => <svg {...base}><path d="M4.5 10.5l3.5 3.5 7.5-8" /></svg>;
export const Search = () => <svg {...base}><circle cx="9" cy="9" r="5.5" /><path d="M13.2 13.2L17 17" /></svg>;
export const Replay = () => <svg {...base}><path d="M4 10a6 6 0 106-6H5.5M8 1.5L5.500 4 8 6.500" /></svg>;
export const Star = () => <svg {...base} fill="currentColor" stroke="none"><path d="M10 1.800l2.500 5.200 5.700.700-4.200 3.900 1.100 5.600L10 14.400l-5.100 2.800 1.100-5.600-4.200-3.900 5.700-.700L10 1.800z" /></svg>;
export const Box = () => <svg {...base}><path d="M10 2.800l6.500 3.400v7.600L10 17.200l-6.500-3.400V6.200L10 2.800zM3.700 6.300L10 9.700l6.300-3.400M10 9.700v7.300" /></svg>;
export const Chat = () => <svg {...base}><path d="M3.500 4.500h13v9h-7l-3.500 3v-3h-2.500z" /></svg>;
