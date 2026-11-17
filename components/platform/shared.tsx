"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { sitePath } from "@/lib/site-path";

/** Shared pieces of the platform pages (homepage + /demo). */

export function Arrow() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SectionHead({ eyebrow, title, lead, id }: { eyebrow: string; title: ReactNode; lead?: string; id: string }) {
  return (
    <header className="pl-head is-split" data-reveal>
      <div>
        <span className="pl-eyebrow">{eyebrow}</span>
        <h2 id={id}>{title}</h2>
      </div>
      {lead && <p className="pl-lead">{lead}</p>}
    </header>
  );
}

/** Adds `is-in` to every [data-reveal] element as it scrolls into view. */
export function useReveal() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
    root.classList.add("pl-js");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return rootRef;
}

const footerColumns: { title: string; links: [string, string][] }[] = [
  { title: "Platform", links: [["Storefronts", "/#storefronts"], ["Catalog & pricing", "/#catalog"], ["ScriptRx Pharmacy", "/#pharmacy"], ["Provider app", "/#provider-app"]] },
  { title: "For patients", links: [["Browse treatments", "/categories"], ["Weight management", "/categories?category=weight-management"], ["Sexual health", "/categories?category=sexual-health"], ["Your account", "/login?theme=v6"], ["Your cart", "/cart"]] },
  { title: "Company", links: [["FAQs", "/#faq"], ["Request a demo", "/demo"], ["Log in", "/login?theme=v6"]] },
];

/** The white footer card. Styles live in features.css (`.pl-foot`). */
export function PlatformFooter() {
  return (
    <footer className="pl-foot" aria-label="ScriptRx footer">
      <div className="pl-foot-top">
        <div className="pl-foot-brand">
          <a className="pl-foot-logo" href={sitePath("/")} aria-label="ScriptRx home">scriptrx</a>
          <p><b>Not sure where to start?</b> Tell us about your clinic or pharmacy and we’ll show you the storefront, ScriptRx Pharmacy and ScriptRx Office with your brand on them.</p>
          <div className="pl-foot-actions">
            <a className="pl-btn" href={sitePath("/demo")}>Request a demo</a>
            <a className="pl-btn is-outline-dark" href={sitePath("/categories")}>See the live storefront</a>
          </div>
        </div>
        <div className="pl-foot-cols">
          {footerColumns.map(column => (
            <nav key={column.title} aria-label={column.title}>
              <span>{column.title}</span>
              {column.links.map(([label, href]) => <a key={label} href={sitePath(href)}>{label}</a>)}
            </nav>
          ))}
        </div>
      </div>
      <div className="pl-foot-bottom">
        <span>© {new Date().getFullYear()} ScriptRx. All rights reserved.</span>
        <p>ScriptRx provides the technology platform. Prescribing decisions are made by independent licensed prescribers.</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
