"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sitePath } from "@/lib/site-path";
import "./NewHeader.css";

type Link = { label: string; href: string };
type HeaderContent = {
  bar: Link;
  primary: Link[];
  cta: Link;
  exploreLabel: string;
  explore: Link[];
  columns: { label: string; links: Link[] }[];
};

const storeContent: HeaderContent = {
  bar: { label: "Personalized care, reviewed by licensed providers", href: "/categories" },
  primary: [
    { label: "Weight Loss", href: "/categories?category=weight-management" },
    { label: "Sexual Health", href: "/categories?category=sexual-health" },
    { label: "Hair Loss", href: "/categories?category=hair-care" },
    { label: "Skin", href: "/categories?category=acne" },
  ],
  cta: { label: "Get started", href: "/categories" },
  exploreLabel: "Explore",
  explore: [
    { label: "Weight Loss", href: "/categories?category=weight-management" },
    { label: "Sexual Health", href: "/categories?category=sexual-health" },
    { label: "Testosterone", href: "/categories?category=sexual-health" },
    { label: "Hair Loss", href: "/categories?category=hair-care" },
    { label: "Skin", href: "/categories?category=acne" },
    { label: "Peptides", href: "/categories?category=longevity" },
    { label: "Women’s Health", href: "/categories?category=womens-health" },
  ],
  columns: [
    { label: "Get care", links: [
      { label: "All treatments", href: "/categories" },
      { label: "Longevity", href: "/categories?category=longevity" },
      { label: "Your cart", href: "/cart" },
    ] },
    { label: "ScriptRx", links: [
      { label: "For businesses", href: "/" },
      { label: "Log in", href: "/login?theme=v6" },
    ] },
  ],
};

const platformContent: HeaderContent = {
  bar: { label: "Now: launch your storefront on a scriptrx.com subdomain or your own custom domain", href: "/#storefronts" },
  primary: [
    { label: "Storefronts", href: "/#storefronts" },
    { label: "Pharmacy", href: "/#pharmacy" },
    { label: "Provider app", href: "/#provider-app" },
  ],
  cta: { label: "Request a demo", href: "/demo" },
  exploreLabel: "Platform",
  explore: [
    { label: "Storefronts", href: "/#storefronts" },
    { label: "Catalog & pricing", href: "/#catalog" },
    { label: "ScriptRx Pharmacy", href: "/#pharmacy" },
    { label: "Provider app", href: "/#provider-app" },
  ],
  columns: [
    { label: "Company", links: [
      { label: "FAQs", href: "/#faq" },
      { label: "Request a demo", href: "/demo" },
    ] },
    { label: "Templates", links: [
      { label: "Template 1", href: "/templates/template-1" },
      { label: "Template 2", href: "/templates/template-2" },
      { label: "Template 3", href: "/templates/template-3" },
    ] },
    { label: "See it live", links: [
      { label: "Sample storefront", href: "/categories" },
      { label: "Log in", href: "/login?theme=v6" },
    ] },
  ],
};

const SCROLL_THRESHOLD = 50;
const DESKTOP_QUERY = "(min-width: 992px)";

export default function NewHeader({ cartCount = 0, variant = "store" }: { cartCount?: number; variant?: "store" | "platform" }) {
  const content = variant === "platform" ? platformContent : storeContent;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Morph into the floating dark pill once the page scrolls past 50px (desktop only).
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const update = () => setScrolled(desktop.matches && window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  return <>
    <div className="sp-header-spacer" aria-hidden="true" />
    <header className="sp-header">
      <a className="sp-bar" href={sitePath(content.bar.href)}>
        <span>{content.bar.label}</span>
      </a>
      <div className={`sp-nav${scrolled ? " is-scrolled" : ""}`}>
        <a className="sp-nav-logo" href={sitePath("/")} aria-label="ScriptRx home">scriptrx</a>
        <div className="sp-nav-inner">
          <nav className="sp-nav-left" aria-label="Primary navigation">
            {content.primary.map(link => <a key={link.label} className="sp-nav-link" href={sitePath(link.href)}>{link.label}</a>)}
          </nav>
          <div className="sp-nav-right">
            {cartCount > 0 && <a className="sp-nav-link sp-nav-cart" href={sitePath("/cart")} aria-label={`Cart with ${cartCount} items`}>Cart<b>{cartCount}</b></a>}
            <a className="sp-nav-link sp-nav-login" href={sitePath("/login?theme=v6")}>Log in</a>
            <a className="sp-nav-cta" href={sitePath(content.cta.href)}>{content.cta.label}</a>
          </div>
        </div>
        <button
          ref={hamburgerRef}
          type="button"
          className="sp-nav-hamburger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="sp-menu"
          onClick={() => setMenuOpen(true)}
        />
      </div>
    </header>

    <div className={`sp-menu-overlay${menuOpen ? " is-visible" : ""}`} onClick={closeMenu} aria-hidden="true" />
    <aside id="sp-menu" className={`sp-menu${menuOpen ? " is-open" : ""}`} aria-label="Site menu" aria-hidden={!menuOpen} inert={!menuOpen}>
      <div className="sp-menu-top">
        <span className="sp-menu-title">Menu</span>
        <div className="sp-menu-actions">
          <a className="sp-menu-login" href={sitePath("/login?theme=v6")}>Log in</a>
          <a className="sp-menu-cta" href={sitePath(content.cta.href)} onClick={() => setMenuOpen(false)}>{content.cta.label}</a>
          <button ref={closeRef} type="button" className="sp-menu-close" aria-label="Close menu" onClick={closeMenu} />
        </div>
      </div>
      <nav className="sp-menu-nav" aria-label={`${content.exploreLabel} links`}>
        <span className="sp-menu-label">{content.exploreLabel}</span>
        {content.explore.map(link => <a key={link.label} className="sp-menu-nav-link" href={sitePath(link.href)} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
      </nav>
      <div className="sp-menu-footer">
        {content.columns.map(column => <div key={column.label} className="sp-menu-col">
          <span className="sp-menu-col-label">{column.label}</span>
          {column.links.map(link => <a key={link.label} className="sp-menu-col-link" href={sitePath(link.href)} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        </div>)}
      </div>
    </aside>
  </>;
}
