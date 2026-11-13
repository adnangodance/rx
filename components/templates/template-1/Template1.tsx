"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "@/lib/site-path";
import Carousel from "./Carousel";
import FaqAccordion from "./FaqAccordion";
import Header from "./Header";
import { ArrowRight, ArrowUpRight, Box, Check, Plus, Screen, Shield } from "./icons";
import { ASSET_BASE, conditions, faqs, features, footerColumns, footerLegal, products, quickLinks, stories, trustMarkers, type Story } from "./data";
import "./template-1.css";

const img = (file: string) => sitePath(`${ASSET_BASE}/${file}`);
const trustIcons = { shield: Shield, screen: Screen, box: Box };

function SampleChip({ children = "Sample content" }: { children?: string }) {
  return <span className="t1-sample">{children}</span>;
}

function Gauge({ label, value, unit, fill, tone }: { label: string; value: string; unit: string; fill: number; tone: "before" | "after" }) {
  return (
    <div className="t1-gauge">
      <span className="t1-gauge-label">{label}</span>
      <div className="t1-gauge-arc">
        <svg viewBox="0 0 150 82" aria-hidden="true" focusable="false">
          <path className="t1-gauge-track" d="M9 75a66 66 0 0 1 132 0" pathLength={100} />
          <path className={`t1-gauge-value is-${tone}`} d="M9 75a66 66 0 0 1 132 0" pathLength={100} strokeDasharray={`${fill} 100`} />
        </svg>
        <span className="t1-gauge-readout">
          <b>{value}</b>
          <small>{unit}</small>
        </span>
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="t1-story">
      <div className="t1-story-body">
        <header className="t1-story-member">
          <span className="t1-avatar" aria-hidden="true">{story.name.charAt(0)}</span>
          <span className="t1-story-name">
            <b>{story.name}</b>
            <span>{story.age} years old</span>
          </span>
          <SampleChip>Sample testimonial</SampleChip>
        </header>
        <blockquote>“{story.quote}”</blockquote>
        <ul className="t1-tags" aria-label="Reported benefits">
          {story.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
      <figure className="t1-story-results">
        <div className="t1-story-results-head">
          <p>{story.metric}</p>
          <SampleChip>Illustrative data</SampleChip>
        </div>
        <div className="t1-gauges">
          <Gauge label="Before treatment" value={story.before.value} unit={story.unit} fill={story.before.fill} tone="before" />
          <Gauge label={story.after.label} value={story.after.value} unit={story.unit} fill={story.after.fill} tone="after" />
        </div>
        <figcaption>
          <b>{story.badge}</b>
          <span>{story.badgeText}</span>
        </figcaption>
      </figure>
    </article>
  );
}

function FeatureVisual({ id }: { id: (typeof features)[number]["id"] }) {
  if (id === "tracker") {
    return (
      <div className="t1-vis is-tracker" aria-hidden="true">
        <div className="t1-vis-card">
          <small>Week 4</small>
          <b>Check-in logged</b>
          <em>On track</em>
          <svg viewBox="0 0 200 64" preserveAspectRatio="none" focusable="false">
            <path d="M0 8c40 6 70 26 104 36s64 12 96 14" />
          </svg>
          <i />
        </div>
      </div>
    );
  }
  if (id === "dose") {
    return (
      <div className="t1-vis is-dose" aria-hidden="true">
        <div className="t1-vis-card">
          <small>Thursday</small>
          <b>Weekly dose</b>
          <span className="t1-vis-button"><Plus /> Log dose</span>
        </div>
      </div>
    );
  }
  if (id === "chat") {
    return (
      <div className="t1-vis is-chat" aria-hidden="true">
        <span className="t1-vis-agent"><i>CP</i> Care team</span>
        <p>Hi Alex, your refill has been approved and ships Monday.</p>
        <p className="is-reply">Thank you!</p>
      </div>
    );
  }
  return (
    <div className="t1-vis is-shop" aria-hidden="true">
      <div className="t1-vis-card">
        <img src={img("product-b12.png")} alt="" loading="lazy" />
        <b>Vitamin B12</b>
      </div>
      <div className="t1-vis-card">
        <img src={img("product-glutathione.png")} alt="" loading="lazy" />
        <b>Glutathione</b>
      </div>
    </div>
  );
}

export default function Template1() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<string[]>([]);

  // Subtle scroll reveal. Content stays visible without JS or with reduced motion.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    root.classList.add("t1-reveal-on");
    targets.forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      root.classList.remove("t1-reveal-on");
    };
  }, []);

  const toggleCart = (id: string) => setCart(current => (current.includes(id) ? current.filter(item => item !== id) : [...current, id]));

  return (
    <div className="t1" ref={rootRef} id="top">
      <a className="t1-skip" href="#main">Skip to content</a>
      <Header cartCount={cart.length} />

      <main id="main">
        {/* 01 Hero — full-bleed photo card, copy on the soft left of the image */}
        <section className="t1-hero" aria-labelledby="t1-hero-title">
          <div className="t1-hero-card">
            <img className="t1-hero-photo" src={img("hero-bright.png")} alt="" fetchPriority="high" />
            <div className="t1-hero-wash" aria-hidden="true" />
            <div className="t1-hero-copy">
              <p className="t1-eyebrow">Online care from Coastal Pharmacy</p>
              <h1 id="t1-hero-title">Treatment that fits your life.</h1>
              <p className="t1-hero-lede">
                A short online visit, a licensed provider’s review and, if prescribed, medication prepared by our pharmacists and delivered to your door.
              </p>
              <div className="t1-hero-ctas">
                <a className="t1-btn is-dark is-arrow" href="#conditions">Start your visit <span><ArrowRight /></span></a>
                <a className="t1-btn is-glass" href="#treatments">Browse treatments</a>
              </div>
            </div>
            <ul className="t1-trust" role="list">
              {trustMarkers.map(marker => {
                const Icon = trustIcons[marker.icon];
                return <li key={marker.label}><Icon /> {marker.label}</li>;
              })}
            </ul>
          </div>
        </section>

        {/* 02 Popular treatments — product carousel */}
        <section className="t1-section" id="treatments">
          <div className="t1-shell">
            <Carousel eyebrow="Shop treatments" title="Popular treatments" label="Popular treatments">
              {products.map(product => {
                const added = cart.includes(product.id);
                return (
                  <li className="t1-product" key={product.id}>
                    <div className="t1-well">
                      <span className="t1-well-tag">{product.form}</span>
                      <img src={img(product.image)} alt={product.name} loading="lazy" style={product.scale ? { height: `${product.scale * 100}%` } : undefined} />
                    </div>
                    <div className="t1-product-info">
                      <span className="t1-product-kicker">{product.ingredient}</span>
                      <h3>{product.name}</h3>
                      <p className="t1-product-price">From <b>${product.price}</b>/mo</p>
                    </div>
                    <div className="t1-product-actions">
                      <button type="button" className={`t1-btn is-small ${added ? "is-added" : "is-dark"}`} aria-pressed={added} aria-label={`${added ? "Added to cart" : "Add to cart"}: ${product.name}`} onClick={() => toggleCart(product.id)}>
                        {added ? <><Check /> Added</> : "Add to Cart"}
                      </button>
                      <a className="t1-link" href="#faq" aria-label={`Details: ${product.name}`}>Details</a>
                    </div>
                  </li>
                );
              })}
            </Carousel>
            <p className="t1-note">Prescription treatments require an online evaluation. A licensed provider determines whether a treatment is appropriate for you.</p>
          </div>
        </section>

        {/* 03 Feel better — full-bleed photo band with goal shortcuts */}
        <section className="t1-band" aria-labelledby="t1-feel-title">
          <img src={img("feel-better.jpg")} alt="A couple smiling together outdoors at sunset" loading="lazy" />
          <div className="t1-band-inner">
            <div className="t1-band-copy" data-reveal>
              <h2 id="t1-feel-title">Feel better.<br />Live more fully.</h2>
              <p>Pick a goal and we’ll point you to the treatments that fit it.</p>
            </div>
            <ul className="t1-quick" role="list" data-reveal>
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href}>
                    <span className="t1-quick-thumb"><img src={img(link.image)} alt="" loading="lazy" /></span>
                    <span className="t1-quick-label">{link.label}</span>
                    <span className="t1-circle is-dark"><ArrowUpRight /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 04 Everything you need — bento of account features */}
        <section className="t1-section" id="how-it-works" aria-labelledby="t1-features-title">
          <div className="t1-shell">
            <div className="t1-split-head" data-reveal>
              <div>
                <p className="t1-eyebrow">Your Coastal account</p>
                <h2 className="t1-h2" id="t1-features-title">Everything you need to move forward, all in one place.</h2>
              </div>
              <p>Treatment is more than a prescription. Your account keeps your plan, your reminders and your care team within reach between visits.</p>
            </div>
            <ul className="t1-bento" role="list">
              {features.map(feature => (
                <li key={feature.id} className={`is-${feature.id}`} data-reveal>
                  <FeatureVisual id={feature.id} />
                  <div className="t1-bento-text">
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05 Social proof — dark band */}
        <section className="t1-section is-deep" aria-labelledby="t1-proof-title">
          <div className="t1-shell t1-proof">
            <div className="t1-proof-media" data-reveal>
              <figure className="is-tall">
                <img src={img("member-1.jpg")} alt="A patient recording a video message at home" loading="lazy" />
                <figcaption><b>Mei</b> Sample patient</figcaption>
              </figure>
              <figure>
                <img src={img("member-5.jpg")} alt="A patient recording a video message in his car" loading="lazy" />
                <figcaption><b>Luis</b> Sample patient</figcaption>
              </figure>
              <figure>
                <img src={img("member-6.jpg")} alt="A patient recording a video message by a window" loading="lazy" />
                <figcaption><b>Anika</b> Sample patient</figcaption>
              </figure>
            </div>
            <div className="t1-proof-copy" data-reveal>
              <div className="t1-proof-chips">
                <span className="t1-chip"><Check /> 95% love their experience</span>
                <SampleChip>Sample figures</SampleChip>
              </div>
              <p className="t1-proof-stat" id="t1-proof-title">
                <b>25,000+</b>
                <span>patients and counting</span>
              </p>
              <figure className="t1-proof-quote">
                <p className="t1-proof-kicker">Hear from Coastal patients</p>
                <blockquote>“Someone is always there to walk you through the program. Super easy and fast!”</blockquote>
                <figcaption><b>Jordan</b> Coastal patient <SampleChip>Sample quote</SampleChip></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 06 Conditions — category tiles carousel */}
        <section className="t1-section" id="conditions">
          <div className="t1-shell">
            <Carousel eyebrow="Find your starting point" title="What condition can we help with?" label="Conditions we treat" className="is-tiles">
              {conditions.map(condition => (
                <li className="t1-tile" key={condition.title}>
                  <a href="#treatments">
                    <div className="t1-tile-head">
                      <h3>{condition.title}</h3>
                      <span className="t1-circle"><ArrowUpRight /></span>
                    </div>
                    <p className="t1-tile-text">{condition.text}</p>
                    <div className="t1-tile-media">
                      <img src={img(condition.image)} alt="" loading="lazy" style={condition.scale ? { height: `${condition.scale * 100}%` } : undefined} />
                    </div>
                  </a>
                </li>
              ))}
            </Carousel>
          </div>
        </section>

        {/* 07 Testimonials — story with before/after gauges */}
        <section className="t1-section is-warm" id="stories">
          <div className="t1-shell">
            <Carousel eyebrow="Patient stories" title="Testimonials" label="Patient stories" step="page" className="is-stories">
              {stories.map(story => (
                <li key={story.name}><StoryCard story={story} /></li>
              ))}
            </Carousel>
            <p className="t1-note">Sample content for demonstration only. These stories and figures are illustrative and do not represent actual patient results. Individual results vary, and a licensed provider determines whether treatment is appropriate.</p>
          </div>
        </section>

        {/* 08 FAQ — split layout */}
        <section className="t1-section" id="faq" aria-labelledby="t1-faq-title">
          <div className="t1-shell t1-faq">
            <div className="t1-faq-intro" data-reveal>
              <p className="t1-eyebrow">FAQs</p>
              <h2 className="t1-h2" id="t1-faq-title">Have questions?<br />Get clear answers.</h2>
              <p>Can’t find what you’re looking for? Our pharmacy team is happy to help.</p>
              <a className="t1-btn is-outline" href="#top">Contact support</a>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>

      </main>

      {/* 10 Closing CTA + footer */}
      <div className="t1-closing">
        <section className="t1-closing-cta" aria-labelledby="t1-closing-title">
          <img className="t1-closing-photo" src={img("closing-coast.png")} alt="" loading="lazy" />
          <span className="t1-closing-mark" aria-hidden="true"><span className="t1-logo-mark" /></span>
          <h2 id="t1-closing-title">Care that fits your life,<br /> from a pharmacy that knows you.</h2>
          <p>Start an online visit with a licensed provider. If treatment is prescribed, we fill it and ship it to your door.</p>
          <div className="t1-closing-actions">
            <a className="t1-btn is-dark" href="#conditions">Start your visit</a>
            <a className="t1-btn is-light" href="#treatments">Browse treatments</a>
          </div>
        </section>

        <footer className="t1-footer">
          <div className="t1-footer-card">
            <div className="t1-footer-top">
              <div className="t1-footer-brand">
                <a className="t1-logo" href="#top" aria-label="Coastal Pharmacy home">
                  <span className="t1-logo-mark" aria-hidden="true" />
                  <span className="t1-logo-word">Coastal</span>
                  <span className="t1-logo-sub" aria-hidden="true">Pharmacy</span>
                </a>
                <p>Personalized treatments, licensed providers and a pharmacy team that knows your name.</p>
              </div>
              <nav className="t1-footer-cols" aria-label="Footer">
                {footerColumns.map(column => (
                  <div key={column.title}>
                    <h2>{column.title}</h2>
                    <ul role="list">
                      {column.links.map(link => <li key={link}><a href="#top">{link}</a></li>)}
                    </ul>
                  </div>
                ))}
                <div>
                  <h2>Pharmacy hours</h2>
                  <ul role="list" className="t1-footer-hours">
                    <li><span>Mon to Fri</span><span>9am to 6pm</span></li>
                    <li><span>Saturday</span><span>10am to 2pm</span></li>
                    <li><span>Messages</span><span>Any time</span></li>
                  </ul>
                </div>
              </nav>
            </div>
            <p className="t1-footer-compliance">
              Prescription products require an online evaluation with a licensed provider, who determines whether treatment is appropriate. Compounded medications are prepared for individual patients and are not FDA-approved. This is a sample storefront for demonstration, and the products, prices and stories shown are illustrative.
            </p>
            <div className="t1-footer-base">
              <p>© 2026 Coastal Pharmacy. All rights reserved.</p>
              <ul role="list">
                {footerLegal.map(link => <li key={link}><a href="#top">{link}</a></li>)}
              </ul>
              <a className="t1-powered" href={sitePath("/")}>
                <span aria-hidden="true">Rx</span>
                Powered by <b>ScriptRx</b>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
