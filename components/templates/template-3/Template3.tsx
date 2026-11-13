"use client";

import { useEffect, useRef } from "react";
import { sitePath } from "@/lib/site-path";
import Header, { Logo } from "./Header";
import { ArrowRight, ArrowUpRight, Chat, Check, Star } from "./icons";
import { footerColumns, footerLegal, stories } from "./data";
import { ChatPreview, Compare, FaqSearch, LabPanel, OutcomeCards, RefillManager, Sample, StatsStrip, TreatmentRail, img } from "./widgets";
import PortalPreview from "./PortalPreview";
import "./template-3.css";

function Eyebrow({ index, children }: { index: string; children: string }) {
  return (
    <p className="t3-eyebrow">
      <span className="t3-mono">{index}</span>
      {children}
    </p>
  );
}

export default function Template3() {
  const rootRef = useRef<HTMLDivElement>(null);

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
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    root.classList.add("t3-reveal-on");
    targets.forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      root.classList.remove("t3-reveal-on");
    };
  }, []);

  return (
    <div className="t3" ref={rootRef} id="top">
      <a className="t3-skip" href="#main">Skip to content</a>
      <Header />

      <main id="main">
        {/* 1 Hero */}
        <section className="t3-hero" aria-labelledby="t3-hero-title">
          <div className="t3-hero-card">
            <div className="t3-shell t3-hero-grid">
              <div className="t3-hero-copy">
                <p className="t3-pill">Licensed providers in all 50 states <Sample /></p>
                <h1 id="t3-hero-title">Care that keeps{" "}<br className="t3-br" />pace with you.{" "}<br className="t3-br" />Delivered.</h1>
              </div>
              <div className="t3-hero-side">
                <p className="t3-lead">One online visit. A licensed provider decides what is right for you, and Halvern Pharmacy ships it to your door, if prescribed.</p>
                <div className="t3-hero-actions">
                  <a className="t3-btn is-ink" href="#start">Start your visit</a>
                  <a className="t3-btn is-light" href="#treatments">Browse treatments <ArrowRight /></a>
                </div>
                <p className="t3-rating">
                  <span className="t3-stars" aria-hidden="true"><Star /><Star /><Star /><Star /><Star /></span>
                  <span><b className="t3-mono">4.8</b> from <b className="t3-mono">2,140</b> reviews</span>
                  <Sample>Sample rating</Sample>
                </p>
              </div>
            </div>
            <img className="t3-hero-art" src={img("hero-scriptrx.png")} alt="ScriptRx pharmacy packaging, a prescription bottle and a blister pack." fetchPriority="high" />
            <PortalPreview />
          </div>
          <div className="t3-shell">
            <OutcomeCards />
          </div>
        </section>

        {/* 2 Stats strip */}
        <section className="t3-stats-section" aria-labelledby="t3-stats-title">
          <div className="t3-shell">
            <div className="t3-stats-head">
              <h2 id="t3-stats-title">The numbers behind the care</h2>
              <Sample>Sample figures</Sample>
            </div>
            <StatsStrip />
          </div>
        </section>

        {/* 3 Treatment rail */}
        <section className="t3-section" id="treatments" aria-labelledby="t3-treatments-title">
          <div className="t3-shell t3-head" data-reveal>
            <div>
              <Eyebrow index="01">Treatments</Eyebrow>
              <h2 id="t3-treatments-title">Built around what{" "}<br className="t3-br" />you want to change.</h2>
            </div>
            <p className="t3-head-text">Every treatment starts with an online visit. A licensed provider reviews your history and prescribes only when it is appropriate.</p>
          </div>
          <TreatmentRail labelledBy="t3-treatments-title" />
        </section>

        {/* 4 Compare */}
        <section className="t3-section is-soft" id="compare" aria-labelledby="t3-compare-title">
          <div className="t3-shell">
            <div className="t3-head" data-reveal>
              <div>
                <Eyebrow index="02">Compare</Eyebrow>
                <h2 id="t3-compare-title">Two options, side by side.</h2>
              </div>
              <p className="t3-head-text">Pick any two treatments to see how they differ in form, schedule and sample price. <b>Not medical advice.</b> Your provider decides what, if anything, is right for you.</p>
            </div>
            <div data-reveal><Compare /></div>
            <p className="t3-fineprint">Sample prices and product details for illustration. Compounded medications are not FDA-approved.</p>
          </div>
        </section>

        {/* 5 Labs */}
        <section className="t3-section" id="labs" aria-labelledby="t3-labs-title">
          <div className="t3-shell t3-split">
            <div className="t3-split-copy" data-reveal>
              <Eyebrow index="03">Labs</Eyebrow>
              <h2 id="t3-labs-title">Your biomarkers, next to your plan.</h2>
              <p>When a provider orders labs, results land in your account with reference ranges, so you both look at the same numbers at each check-in.</p>
              <ul className="t3-checks" role="list">
                <li><Check />Results shared with your provider automatically</li>
                <li><Check />Reference ranges shown for every marker</li>
                <li><Check />Each draw kept, so you can switch between them</li>
              </ul>
              <p className="t3-fineprint">Lab availability varies by state and treatment. Lab results are for discussion with your provider and are not a diagnosis.</p>
            </div>
            <div data-reveal><LabPanel /></div>
          </div>
        </section>

        {/* 6 Refill manager */}
        <section className="t3-section is-soft" id="account" aria-labelledby="t3-account-title">
          <div className="t3-shell t3-split is-reverse">
            <div data-reveal>
              <div className="t3-preview-tag"><Sample>Preview of the patient app</Sample><span>Try the controls</span></div>
              <RefillManager />
            </div>
            <div className="t3-split-copy" data-reveal>
              <Eyebrow index="04">Your plan</Eyebrow>
              <h2 id="t3-account-title">Refills that move when your life does.</h2>
              <p>Skip a refill, push it a week, or send it early before a trip. Change how often it ships whenever you like. No phone calls, no forms.</p>
              <ul className="t3-checks" role="list">
                <li><Check />Changes apply until a refill is processed</li>
                <li><Check />Reminders before every shipment</li>
                <li><Check />Cancel any time from your account</li>
              </ul>
              <p className="t3-fineprint">Refills require an active prescription. Your provider may ask for a check-in before renewing.</p>
            </div>
          </div>
        </section>

        {/* 7 Provider chat */}
        <section className="t3-section" id="care" aria-labelledby="t3-care-title">
          <div className="t3-shell">
            <div className="t3-care" data-reveal>
              <div className="t3-care-copy">
                <Eyebrow index="05">Care team</Eyebrow>
                <h2 id="t3-care-title">A provider who answers.</h2>
                <p>Message your care team from your account between visits. Questions about your plan, your refill or your check-in go to the people who can act on them.</p>
                <dl className="t3-care-facts">
                  <div><dt>Typical reply</dt><dd className="t3-mono">&lt; 24h</dd></div>
                  <div><dt>Messaging</dt><dd className="t3-mono">Included</dd></div>
                  <div><dt>Check-ins</dt><dd className="t3-mono">Every 4–12 wk</dd></div>
                </dl>
                <p className="t3-fineprint"><Sample>Illustrative</Sample> The conversation, provider and response times shown are examples. Messaging is not for emergencies.</p>
              </div>
              <ChatPreview />
            </div>
          </div>
        </section>

        {/* 8 Stories */}
        <section className="t3-section is-soft" id="stories" aria-labelledby="t3-stories-title">
          <div className="t3-shell">
            <div className="t3-head" data-reveal>
              <div>
                <Eyebrow index="06">Stories</Eyebrow>
                <h2 id="t3-stories-title">What members say{" "}<br className="t3-br" />about the experience.</h2>
              </div>
              <p className="t3-head-text"><Sample>Sample stories</Sample> Fictional members and model imagery, shown to illustrate the layout. Self-reported experiences are not typical results, and individual experiences vary.</p>
            </div>
            <ul className="t3-stories" role="list">
              {stories.map(story => (
                <li key={story.id} className="t3-story" data-reveal>
                  <div className="t3-story-photo"><img src={img(story.image)} alt="" loading="lazy" /></div>
                  <div className="t3-story-body">
                    <blockquote>“{story.quote}”</blockquote>
                    <dl className="t3-story-metrics">
                      {story.metrics.map(metric => (
                        <div key={metric.label}>
                          <dd className="t3-mono">{metric.value}</dd>
                          <dt>{metric.label}</dt>
                        </div>
                      ))}
                    </dl>
                    <p className="t3-story-name"><b>{story.name}</b><span>{story.detail}</span><Sample>Sample member</Sample></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9 FAQ */}
        <section className="t3-section" id="faq" aria-labelledby="t3-faq-title">
          <div className="t3-shell t3-faq-layout">
            <div className="t3-split-copy" data-reveal>
              <Eyebrow index="07">FAQ</Eyebrow>
              <h2 id="t3-faq-title">Find an answer fast.</h2>
              <p>Type a word to filter the list. If you cannot find what you need, the pharmacy team can help.</p>
            </div>
            <div data-reveal><FaqSearch /></div>
          </div>
        </section>

        {/* 10 Closing CTA */}
        <section className="t3-cta" id="start" aria-labelledby="t3-cta-title">
          <div className="t3-shell">
            <p className="t3-cta-kicker t3-mono">Ready when you are</p>
            <h2 id="t3-cta-title">Start with a{" "}<br className="t3-br" />ten-minute visit.</h2>
            <p className="t3-cta-text">Answer a few questions about your health. A licensed provider reviews them and, if treatment is appropriate, your prescription ships from the pharmacy.</p>
            <div className="t3-cta-actions">
              <a className="t3-store-btn" href="#top">
                <ArrowUpRight />
                <span><small>Online visit</small>Start your visit</span>
              </a>
              <a className="t3-store-btn is-outline" href="#faq">
                <Chat />
                <span><small>Questions first</small>Talk to the pharmacy</span>
              </a>
            </div>
            <p className="t3-cta-note">Treatment is not guaranteed. Prescriptions are issued only if a licensed provider determines they are appropriate.</p>
          </div>
        </section>
      </main>

      <footer className="t3-footer">
        <div className="t3-shell">
          <div className="t3-footer-top">
            <div className="t3-footer-brand">
              <Logo />
              <p>Online care, labs and pharmacy in one place.</p>
            </div>
            {footerColumns.map(column => (
              <nav key={column.title} aria-label={column.title}>
                <p className="t3-label">{column.title}</p>
                <ul role="list">
                  {column.links.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}
                </ul>
              </nav>
            ))}
          </div>
          <p className="t3-footer-legal">{footerLegal}</p>
          <div className="t3-footer-bottom">
            <span>© 2026 Halvern Rx · Sample storefront</span>
            <a href={sitePath("/")}>Powered by <b>ScriptRx</b> <ArrowUpRight /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
