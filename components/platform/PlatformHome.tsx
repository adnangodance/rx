"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import NewHeader from "@/components/NewHeader";
import NewHero from "@/components/NewHero";
import { sitePath } from "@/lib/site-path";
import { sectionRevealFrame } from "@/lib/section-reveal";
import { ThemeBuilder } from "./Mockups";
import { CareBuilder, Check, DomainBuilder, PharmacyQueue, PricingBuilder, ProviderReview } from "./Features";
import "./platform.css";
import "./mockups.css";
import "./features.css";

const img = (file: string) => sitePath(`/platform/${file}`);

function Arrow() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SectionHead({ eyebrow, title, lead, id }: { eyebrow: string; title: ReactNode; lead?: string; id: string }) {
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

function Feature({ id, eyebrow, title, lead, tone, expand = false, children }: { id: string; eyebrow: string; title: ReactNode; lead: string; tone?: "soft" | "dark"; expand?: boolean; children: ReactNode }) {
  const section = (
    <section className={`pl-section${tone ? ` is-${tone}` : ""}${expand ? " pl-expand-panel" : ""}`} aria-labelledby={`${id}-title`} id={id}>
      <div className="pl-shell">
        <SectionHead id={`${id}-title`} eyebrow={eyebrow} title={title} lead={lead} />
        {children}
      </div>
    </section>
  );
  return expand ? <div className="pl-expand" data-expand>{section}</div> : section;
}

/** Scroll-linked entrance: [data-expand] panels grow from a smaller, rounder card to full width. */
function useExpandOnScroll(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrappers = [...root.querySelectorAll<HTMLElement>("[data-expand]")];
    const compact = window.matchMedia("(max-width: 991px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      wrappers.forEach(wrapper => {
        const panel = wrapper.firstElementChild as HTMLElement | null;
        if (!panel) return;
        // Geometry comes from the unscaled wrapper so the animation doesn't feed back into progress.
        const { scale, radius, shadow } = sectionRevealFrame(wrapper.getBoundingClientRect().top, window.innerHeight, compact.matches);
        panel.style.transform = `scale(${scale.toFixed(4)})`;
        panel.style.borderRadius = `${Math.max(radius, 12).toFixed(1)}px`;
        panel.style.boxShadow = `0 30px 80px -30px rgba(24, 24, 27, ${shadow.toFixed(3)})`;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [rootRef]);
}

const faqs = [
  { q: "How does ScriptRx work for my business?", a: "ScriptRx connects your branded storefront, licensed prescribers and pharmacy in one platform. Patients complete an online health intake, prescribers review their care, and your team manages orders and operations in ScriptRx Office." },
  { q: "Can I use my own brand and domain?", a: "Yes. Your storefront can use your own domain or a scriptrx.com subdomain, with your logo, brand color and tagline." },
  { q: "What’s included in the platform?", a: "Your branded storefront, ScriptRx Pharmacy for fulfillment, the Provider app for prescribers, and ScriptRx Office to manage your business. Everything works together, from intake to order management." },
  { q: "How do I set my product prices?", a: "Products sync from ScriptRx Pharmacy into ScriptRx Office. Choose a catalog-wide percentage markup, or set an individual price for any plan. Individual prices take priority over your default markup." },
  { q: "Do my patients need insurance?", a: "No. ScriptRx supports self-pay care. Applicable consultation, treatment and delivery costs are shown before a patient completes their order." },
];

const footerColumns: { title: string; links: [string, string][] }[] = [
  { title: "Platform", links: [["Storefronts", "/#storefronts"], ["Catalog & pricing", "/#catalog"], ["ScriptRx Pharmacy", "/#pharmacy"], ["Provider app", "/#provider-app"]] },
  { title: "For patients", links: [["Browse treatments", "/categories"], ["Weight management", "/categories?category=weight-management"], ["Sexual health", "/categories?category=sexual-health"], ["Your account", "/login?theme=v6"], ["Your cart", "/cart"]] },
  { title: "Company", links: [["FAQs", "/#faq"], ["Request a demo", "/#demo"], ["Log in", "/login?theme=v6"]] },
];

function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="pl-qa-list" data-reveal>
      {faqs.map((faq, index) => {
        const expanded = open === index;
        return (
          <div key={faq.q} className={`pl-qa-item${expanded ? " is-open" : ""}`}>
            <h3>
              <button type="button" id={`pl-qa-q-${index}`} aria-expanded={expanded} aria-controls={`pl-qa-a-${index}`} onClick={() => setOpen(expanded ? -1 : index)}>
                <span>{faq.q}</span>
                <i aria-hidden="true" />
              </button>
            </h3>
            <div id={`pl-qa-a-${index}`} role="region" aria-labelledby={`pl-qa-q-${index}`} className="pl-qa-answer" inert={!expanded}>
              <div><p>{faq.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Adds `is-in` to every [data-reveal] element as it scrolls into view. */
function useReveal() {
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

export default function PlatformHome() {
  const rootRef = useReveal();
  useExpandOnScroll(rootRef);

  return (
    <main ref={rootRef} id="top" className="pl-home">
      <NewHeader variant="platform" />
      <NewHero
        eyebrow="Care that moves with your brand"
        title={<>Your storefront.{" "}<br />Run on ScriptRx.</>}
        checklist={[
          "Branded storefront on your own domain",
          "Licensed prescriber review built in",
          "Pharmacy portal and admin office included",
        ]}
        primary={{ label: "Request a demo", href: "/#demo" }}
        secondary={{ label: "See the live storefront", href: "/categories" }}
        image="/platform/hero-golden.png"
      />

      {/* Under-hero: try the storefront theme */}
      <section className="pl-section pl-theme-section" aria-label="Try your storefront theme" id="theme">
        <div className="pl-shell" data-reveal><ThemeBuilder /></div>
      </section>

      <Feature id="storefronts" tone="soft" expand eyebrow="Storefronts" title={<>Your storefront,{" "}<br />on your domain.</>} lead="One storefront build serves every business. Each one gets its own logo, primary colour, tagline and domain, plus privacy policy, terms of use, FAQs and about pages.">
        <DomainBuilder />
      </Feature>

      <Feature id="offer" eyebrow="Care categories" title={<>What will your{" "}<br />storefront offer?</>} lead="Choose the care categories your storefront offers. Each one comes with an online health intake and a licensed prescriber who reviews it and recommends a plan.">
        <CareBuilder />
      </Feature>

      <Feature id="catalog" tone="soft" expand eyebrow="Catalog and pricing" title={<>Your catalog.{" "}<br />Your prices.</>} lead="Products sync from ScriptRx Pharmacy into ScriptRx Office. A catalog-wide markup % applies to any plan without an explicit price.">
        <PricingBuilder />
      </Feature>

      <Feature id="pharmacy" tone="dark" expand eyebrow="ScriptRx Pharmacy" title={<>Run fulfilment from one{" "}<br />pharmacy portal.</>} lead="Orders, consultations, products, patients, refills, coupons, links, patient contacts, support tickets, sales analytics, payouts and users.">
        <PharmacyQueue />
      </Feature>

      <Feature id="provider-app" eyebrow="Provider app" title={<>Prescribers,{" "}<br />in their own app.</>} lead="provider.scriptrx.com: appointments, messages, orders, profile and support. Prescribers review each online health intake and recommend a personalized plan.">
        <ProviderReview />
      </Feature>

      {/* FAQ */}
      <section className="pl-section pl-qa-section" aria-labelledby="pl-faq-title" id="faq">
        <div className="pl-shell pl-qa">
          <header className="pl-qa-intro" data-reveal>
            <span className="pl-eyebrow">FAQ</span>
            <h2 id="pl-faq-title">Questions,{" "}<br />answered.</h2>
            <p>Everything you need to know about launching and running a storefront on ScriptRx.</p>
            <a className="pl-qa-link" href={sitePath("/#demo")}>Still have questions? Request a demo <Arrow /></a>
          </header>
          <FaqList />
        </div>
      </section>

      {/* Closing CTA + footer — one photo backdrop, footer card floats on it (Superpower pattern) */}
      <div className="pl-expand" data-expand>
      <div className="pl-closing pl-expand-panel">
        <div className="pl-closing-photo" aria-hidden="true"><img src={img("closing-golden.png")} alt="" /></div>
        <section className="pl-closing-cta" aria-labelledby="pl-cta-title" id="demo">
          <div className="pl-closing-copy" data-reveal>
            <h2 id="pl-cta-title">Your storefront{" "}<br />starts with you.</h2>
            <ul>
              {["Prescriber-guided care", "Your brand, your domain", "100% online"].map(item => <li key={item}><Check />{item}</li>)}
            </ul>
            <div className="pl-closing-btns">
              <a className="pl-btn is-light" href={sitePath("/#demo")}>Request a demo</a>
              <a className="pl-btn is-frost" href={sitePath("/categories")}>See the live storefront</a>
            </div>
          </div>
        </section>

        <footer className="pl-foot" aria-label="ScriptRx footer">
          <div className="pl-foot-top">
            <div className="pl-foot-brand">
              <a className="pl-foot-logo" href={sitePath("/")} aria-label="ScriptRx home">scriptrx</a>
              <p><b>Not sure where to start?</b> Tell us about your clinic or pharmacy and we’ll show you the storefront, ScriptRx Pharmacy and ScriptRx Office with your brand on them.</p>
              <div className="pl-foot-actions">
                <a className="pl-btn" href={sitePath("/#demo")}>Request a demo</a>
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
      </div>
      </div>
    </main>
  );
}
