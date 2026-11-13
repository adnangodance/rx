"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Close } from "./icons";
import { navLinks } from "./data";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a className="t3-logo" href="#top" aria-label="Halvern Rx home" onClick={onClick}>
      <span className="t3-logo-mark" aria-hidden="true" />
      <span>Halvern</span>
      <span className="t3-logo-rx" aria-hidden="true">Rx</span>
    </a>
  );
}

export default function Header() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Match the ScriptRx homepage's floating header after the first 50px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Bottom sheet: lock page scroll, trap focus, close on Escape or when the layout becomes desktop.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const button = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    // Wait a frame so the sheet is visible (and focusable) before moving focus into it.
    const focusFrame = requestAnimationFrame(() => requestAnimationFrame(() => focusables()[0]?.focus()));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 961px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      button?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`t3-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="t3-header-inner">
          <div className="t3-island">
            <Logo />
            <nav className="t3-nav" aria-label="Primary">
              {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
            </nav>
            <div className="t3-island-actions">
              <a className="t3-island-signin" href="#account">Sign in</a>
              <a className="t3-btn is-accent is-small" href="#start">Start visit</a>
            </div>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="t3-menu-btn t3-header-menu"
            aria-expanded={open}
            aria-controls="t3-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(value => !value)}
          >
            {open ? <Close /> : (
              <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" aria-hidden="true" focusable="false">
                {[2, 11, 20].flatMap(y => [2, 10, 18].map(x => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />))}
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className={`t3-sheet-backdrop${open ? " is-open" : ""}`} onClick={close} aria-hidden="true" />
      <div
        ref={sheetRef}
        id="t3-sheet"
        className={`t3-sheet${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <div className="t3-sheet-head">
          <span className="t3-sheet-grip" aria-hidden="true" />
          <button type="button" className="t3-menu-btn" aria-label="Close menu" onClick={close}><Close /></button>
        </div>
        <nav aria-label="Site menu">
          <ul role="list">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  <span className="t3-mono">{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="t3-sheet-actions">
          <a className="t3-btn is-accent" href="#start" onClick={close}>Start your visit</a>
          <a className="t3-btn is-ghost" href="#account" onClick={close}>Sign in</a>
        </div>
      </div>
    </>
  );
}
