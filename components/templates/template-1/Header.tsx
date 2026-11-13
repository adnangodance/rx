"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "@/lib/site-path";
import { ArrowRight, ArrowUpRight, Bag, ChevronDown, Close, Menu } from "./icons";
import { ASSET_BASE, announcement, conditions, navLinks } from "./data";

const img = (file: string) => sitePath(`${ASSET_BASE}/${file}`);

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a className="t1-logo" href="#top" aria-label="Coastal Pharmacy home" onClick={onClick}>
      <span className="t1-logo-mark" aria-hidden="true" />
      <span className="t1-logo-word">Coastal</span>
      <span className="t1-logo-sub" aria-hidden="true">Pharmacy</span>
    </a>
  );
}

export default function Header({ cartCount }: { cartCount: number }) {
  const headerRef = useRef<HTMLElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Condense to a frosted bar once the announcement strip has scrolled away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mega panel: close on Escape or on a press outside the header.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMegaOpen(false);
      megaButtonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen]);

  // Drawer: lock page scroll, trap focus, close on Escape or when the layout becomes desktop.
  useEffect(() => {
    if (!drawerOpen) return;
    const drawer = drawerRef.current;
    const opener = menuButtonRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    drawer?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDrawerOpen(false); return; }
      if (event.key !== "Tab" || !drawer) return;
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>("a[href], button"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1025px)");
    const onChange = () => { if (desktop.matches) setDrawerOpen(false); };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
      opener?.focus();
    };
  }, [drawerOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hoverOpen = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const hoverClose = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };
  const closeMega = () => setMegaOpen(false);
  const closeDrawer = () => setDrawerOpen(false);
  const cartLabel = `Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`;

  return (
    <>
      <div className="t1-announce">
        <p>
          {announcement.text} <a href={announcement.href}>{announcement.link} <ArrowRight /></a>
        </p>
      </div>

      <header
        ref={headerRef}
        className={`t1-header${scrolled ? " is-scrolled" : ""}${megaOpen ? " is-mega-open" : ""}`}
        onPointerLeave={hoverClose}
        onBlur={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) closeMega(); }}
      >
        <div className="t1-nav">
          <button ref={menuButtonRef} type="button" className="t1-icon-btn t1-menu-btn" aria-haspopup="dialog" aria-expanded={drawerOpen} aria-controls="t1-drawer" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
            <Menu />
          </button>
          <Logo onClick={closeMega} />
          <nav className="t1-nav-links" aria-label="Primary">
            <button ref={megaButtonRef} type="button" className="t1-nav-trigger" aria-expanded={megaOpen} aria-controls="t1-mega" onClick={() => setMegaOpen(open => !open)} onPointerEnter={hoverOpen}>
              Treatments <ChevronDown />
            </button>
            {navLinks.map(link => <a key={link.href} href={link.href} onPointerEnter={hoverClose} onClick={closeMega}>{link.label}</a>)}
          </nav>
          <div className="t1-nav-actions">
            <a className="t1-nav-login" href="#top">Log in</a>
            <a className="t1-btn is-dark is-small t1-nav-cta" href="#conditions">Get started</a>
            <a className="t1-icon-btn t1-cart" href="#treatments" aria-label={cartLabel}>
              <Bag />
              {cartCount > 0 && <span className="t1-cart-count" aria-hidden="true">{cartCount}</span>}
            </a>
          </div>
        </div>

        <div className="t1-mega" id="t1-mega" inert={!megaOpen} onPointerEnter={hoverOpen}>
          <div className="t1-mega-panel">
            <div className="t1-mega-main">
              <p className="t1-mega-title" id="t1-mega-title">Shop by treatment area</p>
              <ul className="t1-mega-grid" role="list" aria-labelledby="t1-mega-title">
                {conditions.map(item => (
                  <li key={item.title}>
                    <a href="#conditions" onClick={closeMega}>
                      <span className="t1-mega-thumb"><img src={img(item.image)} alt="" /></span>
                      <span className="t1-mega-text">
                        <b>{item.title}</b>
                        <span>{item.short}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a className="t1-mega-aside" href="#how-it-works" onClick={closeMega}>
              <span className="t1-mega-aside-kicker">New to Coastal?</span>
              <b>Start with a short online visit.</b>
              <span>A licensed provider reviews your answers and determines whether treatment is right for you.</span>
              <span className="t1-mega-aside-link">How it works <ArrowUpRight /></span>
            </a>
          </div>
        </div>
        <span className="t1-visually-hidden" role="status">{cartCount > 0 ? `${cartCount} ${cartCount === 1 ? "item" : "items"} in cart` : ""}</span>
      </header>

      {/* Mobile drawer lives outside the header so its fixed positioning isn't captured by the frosted bar. */}
      <div className={`t1-drawer-root${drawerOpen ? " is-open" : ""}`} inert={!drawerOpen}>
        <div className="t1-drawer-scrim" onClick={closeDrawer} />
        <div className="t1-drawer" id="t1-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="t1-drawer-head">
            <Logo onClick={closeDrawer} />
            <button type="button" className="t1-icon-btn" aria-label="Close menu" onClick={closeDrawer}><Close /></button>
          </div>
          <div className="t1-drawer-body">
            <p className="t1-drawer-label">Treatments</p>
            <ul className="t1-drawer-cats" role="list">
              {conditions.map(item => (
                <li key={item.title}>
                  <a href="#conditions" onClick={closeDrawer}>
                    <span className="t1-mega-thumb"><img src={img(item.image)} alt="" /></span>
                    <b>{item.title}</b>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="t1-drawer-links" role="list">
              {navLinks.map(link => (
                <li key={link.href}><a href={link.href} onClick={closeDrawer}>{link.label} <ArrowUpRight /></a></li>
              ))}
            </ul>
          </div>
          <div className="t1-drawer-foot">
            <a className="t1-btn is-dark" href="#conditions" onClick={closeDrawer}>Get started</a>
            <a className="t1-btn is-outline" href="#top" onClick={closeDrawer}>Log in</a>
          </div>
        </div>
      </div>
    </>
  );
}
