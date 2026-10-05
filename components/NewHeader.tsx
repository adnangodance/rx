"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/components/CatalogSection";
import { adnanSuggestionCategoryProducts as products } from "@/lib/new-care-products";
import { sitePath } from "@/lib/site-path";
import "./NewHeader.css";

const menus = [
  { label: "Sexual Health", slug: "sexual-health", products: products["sexual-health"].filter(product => !product.name.includes("Testosterone")), featured: products["sexual-health"][0], color: "lavender" },
  { label: "Testosterone", slug: "sexual-health", products: products["sexual-health"].filter(product => /Testosterone|Anastrozole/.test(product.name)), featured: products["sexual-health"][5], color: "sand" },
  { label: "Weight Loss", slug: "weight-management", products: products["weight-management"], featured: products["weight-management"][1], color: "blue" },
  { label: "Hair Loss", slug: "hair-care", products: products["hair-care"], featured: products["hair-care"][0], color: "sage" },
  { label: "Skin", slug: "acne", products: products.acne, featured: products.acne[0], color: "peach" },
  { label: "Peptides", slug: "longevity", products: products.longevity, featured: products.longevity[1], color: "blue" },
  { label: "More", slug: "womens-health", products: products["womens-health"], featured: products["womens-health"][0], color: "lavender" },
];

function AccountIcon() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></svg>; }

export default function NewHeader({ cartCount = 0 }: { cartCount?: number }) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menu = activeMenu === null ? null : menus[activeMenu];
  const expanded = mobileOpen || menu !== null;

  const cancelMenuClose = useCallback(() => {
    if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const closePanels = useCallback(() => { cancelMenuClose(); setActiveMenu(null); setMobileOpen(false); }, [cancelMenuClose]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    function dismiss(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) closePanels();
    }
    function keyboard(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (mobileOpen) mobileTriggerRef.current?.focus();
      else if (activeMenu !== null) triggersRef.current[activeMenu]?.focus();
      closePanels();
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", keyboard);
    window.addEventListener("resize", closePanels);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", keyboard); window.removeEventListener("resize", closePanels); };
  }, [expanded, activeMenu, mobileOpen, closePanels]);

  function rememberProduct(product: Product) {
    localStorage.setItem("scriptrx-detail-product", JSON.stringify(product));
    closePanels();
  }

  function treatmentPanel(item: typeof menus[number], mobile = false) {
    const learnMore = <a className="new-header-learn-more" href={sitePath(`/categories?category=${item.slug}`)}>Learn more<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg></a>;
    return <div className={`new-header-menu-content${mobile ? " is-mobile" : ""}`}>
      {!mobile && <div className="new-header-menu-title">{item.label === "More" ? "More from ScriptRx" : item.label}{learnMore}</div>}
      <div className="new-header-treatments">
        <span className="new-header-label">{item.label === "More" ? "WOMEN’S HEALTH" : "TREATMENTS"}</span>
        <ul>{item.products.map(product => <li key={product.name}><a href={sitePath("/product")} onClick={() => rememberProduct(product)}>{product.name}<sup aria-hidden="true">Rx</sup></a></li>)}</ul>
        {item.label === "More" && <div className="new-header-more-links"><a href={sitePath("/categories?category=womens-health")}>Women’s health</a><a href={sitePath("/#member-testimonials-title")}>Member stories</a><a href={sitePath("/#faq")}>Common questions</a></div>}
        {mobile && learnMore}
      </div>
      <div className="new-header-feature">
        <span className="new-header-label">GET STARTED</span>
        <a className={`new-header-product-card ${item.color}`} href={sitePath("/product")} onClick={() => rememberProduct(item.featured)}>
          <strong>{item.featured.name}</strong>
          <img src={sitePath(item.featured.image)} alt="" />
          <span className="new-header-product-price">From {item.featured.price}</span>
        </a>
      </div>
    </div>;
  }

  return <header ref={rootRef} className={`new-site-header${expanded ? " has-panel" : ""}`} onMouseEnter={cancelMenuClose} onMouseLeave={() => { if (!mobileOpen) { cancelMenuClose(); closeTimerRef.current = setTimeout(() => setActiveMenu(null), 160); } }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closePanels(); }}>
    <div className="new-header-announcement">Personalized care, reviewed by licensed providers</div>
    <div className="new-header-bar">
      <a className="new-header-wordmark" href={sitePath("/")} aria-label="ScriptRx home">scriptrx</a>
      <nav className="new-header-desktop-nav" aria-label="Primary navigation">
        {menus.map((item, index) => <button key={item.label} type="button" ref={element => { triggersRef.current[index] = element; }} aria-expanded={activeMenu === index} aria-controls="new-header-product-menu" onPointerEnter={event => { if (event.pointerType === "mouse") setActiveMenu(index); }} onClick={() => setActiveMenu(index)}>{item.label}</button>)}
      </nav>
      <div className="new-header-actions">
        {cartCount > 0 && <a className="new-header-cart" href={sitePath("/cart")} aria-label={`Cart with ${cartCount} items`}><img src={sitePath("/cart-icon.svg")} alt="" /><b>{cartCount}</b></a>}
        <a className="new-header-login" aria-label="Login" href={sitePath("/login?theme=v6")}><AccountIcon /><span>Login</span></a>
        <button type="button" ref={mobileTriggerRef} className="new-header-icon-button new-header-mobile-toggle" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="new-header-mobile-nav" onClick={() => { setMobileOpen(!mobileOpen); setActiveMenu(null); }}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{mobileOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg></button>
      </div>
    </div>
    {expanded && <button type="button" className="new-header-backdrop" tabIndex={-1} aria-label="Close header menu" onClick={closePanels} />}
    {menu && !mobileOpen && <div id="new-header-product-menu" className="new-header-mega-panel" aria-label={`${menu.label} menu`}>{treatmentPanel(menu)}</div>}
    {mobileOpen && <nav id="new-header-mobile-nav" className="new-header-mobile-nav" aria-label="Mobile navigation">{menus.map((item, index) => <div key={item.label}><button type="button" aria-expanded={activeMenu === index} aria-controls={`new-header-mobile-group-${index}`} onClick={() => setActiveMenu(activeMenu === index ? null : index)}>{item.label}<span aria-hidden="true">{activeMenu === index ? "−" : "+"}</span></button>{activeMenu === index && <div id={`new-header-mobile-group-${index}`}>{treatmentPanel(item, true)}</div>}</div>)}<a className="new-header-mobile-login" href={sitePath("/login?theme=v6")}>Login to your account <span aria-hidden="true">↗</span></a></nav>}
  </header>;
}
