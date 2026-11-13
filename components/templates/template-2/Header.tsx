"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mark } from "./icons";
import { BRAND, BRAND_FULL, navLinks } from "./data";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a className="t2-logo" href="#top" aria-label={`${BRAND_FULL} home`} onClick={onClick}>
      <Mark />
      <span className="t2-logo-word">{BRAND}</span>
    </a>
  );
}

export default function Header() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Transparent over the hero; becomes a dark glass bar once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Sheet: lock page scroll, keep focus inside, close on Escape or when the layout becomes desktop.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const opener = buttonRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const focusable = () => [opener, ...Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(Boolean) as HTMLElement[];
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1025px)");
    const onChange = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`t2-header t2-dark${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <div className="t2-bar">
          <Logo onClick={close} />
          <nav className="t2-nav" aria-label="Primary">
            {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="t2-bar-actions">
            <a className="t2-bar-signin" href="#top">Sign in</a>
            <a className="t2-btn is-ivory is-small t2-bar-cta" href="#fit">Start a visit</a>
            <button ref={buttonRef} type="button" className="t2-menu-btn" aria-expanded={open} aria-controls="t2-sheet" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(value => !value)}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen dark sheet sits below the bar, so the same button opens and closes it. */}
      <div className={`t2-sheet t2-dark${open ? " is-open" : ""}`} id="t2-sheet" ref={sheetRef} inert={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <nav aria-label="Menu">
          <ol role="list">
            {navLinks.map((link, index) => (
              <li key={link.href} style={{ transitionDelay: `${60 + index * 40}ms` }}>
                <a href={link.href} onClick={close}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="t2-sheet-foot">
          <a className="t2-btn is-ivory" href="#fit" onClick={close}>Start a visit <ArrowRight /></a>
          <a className="t2-btn is-line" href="#top" onClick={close}>Sign in</a>
          <p>Treatments are available only if prescribed by a licensed provider after an online visit.</p>
        </div>
      </div>
    </>
  );
}
