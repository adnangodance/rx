"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { sitePath } from "@/lib/site-path";
import { Logo } from "./Header";
import { ArrowLeft, ArrowRight, Check, Dash } from "./icons";
import {
  ASSET_BASE, BRAND, BRAND_FULL, careTeam, categories, categoryLabel, faqs, footerColumns, footerLegal, intake, membership,
  planRows, products, reviews, stepPhotos, steps, trackerStages, trustMarkers, type Billing, type CategoryId,
} from "./data";

export type CatalogFilter = CategoryId | "all";

const img = (file: string) => sitePath(`${ASSET_BASE}/${file}`);
const two = (value: number) => String(value).padStart(2, "0");

/** Arrow-key navigation for a `role="tablist"`: moves focus and activates the neighbouring tab. */
function onTabKeys(event: KeyboardEvent<HTMLElement>) {
  if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
  if (index < 0) return;
  event.preventDefault();
  const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
  const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (forward ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus();
  tabs[next].click();
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="t2-tag">{children}</span>;
}

/** Section opener: a tracked eyebrow with a gold dot, a large headline and an optional standfirst beside it. */
function Head({ label, id, title, tag, children }: { label: string; id: string; title: ReactNode; tag?: string; children?: ReactNode }) {
  return (
    <header className="t2-head" data-reveal>
      <p className="t2-eyebrow"><i aria-hidden="true" />{label}{tag && <Tag>{tag}</Tag>}</p>
      <div className="t2-head-grid">
        <h2 id={id}>{title}</h2>
        {children && <div className="t2-head-aside">{children}</div>}
      </div>
    </header>
  );
}

/* ---------- 2. Trust line ---------- */
export function TrustLine() {
  return (
    <section className="t2-trustline t2-dark" aria-label="Our standards">
      <ul className="t2-shell" role="list">
        {trustMarkers.map(marker => <li key={marker}>{marker}</li>)}
      </ul>
    </section>
  );
}

/* ---------- 3. Find your fit ---------- */
export function FindYourFit({ onBrowse }: { onBrowse: (category: CategoryId) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => intake.map(() => null));
  const panelRef = useRef<HTMLDivElement>(null);
  const done = step >= intake.length;

  const go = (next: number) => {
    setStep(next);
    // Move focus to the panel so keyboard and screen-reader users land on the new question.
    requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
  };
  const restart = () => {
    setAnswers(intake.map(() => null));
    go(0);
  };

  const scores = categories.map(category => answers.reduce<number>((sum, answer, index) => sum + (answer === null ? 0 : intake[index].options[answer].weights[category.id] ?? 0), 0));
  const suggestion = categories[scores.indexOf(Math.max(...scores))];
  const suggested = products.filter(product => product.category === suggestion.id);
  const current = done ? null : intake[step];

  return (
    <section className="t2-section" id="fit" aria-labelledby="t2-fit-title">
      <div className="t2-shell">
        <Head label="Find your fit" id="t2-fit-title" title={<>Three questions.{" "}<br /><span>One place to start.</span></>}>
          <p>A short preview of the intake a patient completes before their online visit. It points to a category, not a prescription.</p>
        </Head>

        <div className="t2-fit t2-dark" data-reveal>
          <aside className="t2-fit-note">
            <div>
              <p className="t2-label">Good to know</p>
              <p className="t2-fit-note-lead">This is not medical advice. A licensed provider reviews your full health history and decides whether any treatment is appropriate for you.</p>
            </div>
            <ul role="list">
              <li>Takes under a minute</li>
              <li>Nothing is saved in this preview</li>
              <li>No payment needed to start</li>
            </ul>
          </aside>

          <div className="t2-fit-panel" ref={panelRef} tabIndex={-1} role="group" aria-label={done ? "Your suggested starting point" : `Question ${step + 1} of ${intake.length}`}>
            <div className="t2-fit-progress">
              <span>{done ? "Complete" : `Question ${step + 1} of ${intake.length}`}</span>
              <div className="t2-progress" role="progressbar" aria-label="Intake progress" aria-valuemin={0} aria-valuemax={intake.length} aria-valuenow={Math.min(step, intake.length)}>
                <i style={{ transform: `scaleX(${Math.max(Math.min(step, intake.length) / intake.length, 0.04)})` }} />
              </div>
            </div>

            {current ? (
              <div className="t2-fit-body" key={step}>
                <h3>{current.question}</h3>
                <p className="t2-fit-hint">{current.hint}</p>
                <ul className="t2-options" role="list">
                  {current.options.map((option, index) => (
                    <li key={option.label}>
                      <button type="button" className="t2-option" aria-pressed={answers[step] === index} onClick={() => setAnswers(value => value.map((item, i) => (i === step ? index : item)))}>
                        {option.label}
                        <span className="t2-option-mark" aria-hidden="true"><Check /></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="t2-fit-body is-result" key="result">
                <p className="t2-label">A place to start</p>
                <h3>{suggestion.label}</h3>
                <p className="t2-fit-hint">Based on your answers, patients often begin by looking at {suggestion.label.toLowerCase()} care. A provider decides what, if anything, is right for you.</p>
                <ul className="t2-fit-picks" role="list">
                  {suggested.slice(0, 2).map(product => (
                    <li key={product.id}>
                      <span className="t2-fit-thumb"><img src={img(product.image)} alt="" loading="lazy" /></span>
                      <span><b>{product.name}</b>{product.form} · from ${product.price}/mo if prescribed</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="t2-fit-actions">
              {done ? (
                <>
                  <button type="button" className="t2-btn is-line" onClick={restart}><ArrowLeft /> Start over</button>
                  <button type="button" className="t2-btn is-ivory" onClick={() => onBrowse(suggestion.id)}>Browse {suggestion.label.toLowerCase()} treatments <ArrowRight /></button>
                </>
              ) : (
                <>
                  <button type="button" className="t2-btn is-line" disabled={step === 0} onClick={() => go(step - 1)}><ArrowLeft /> Back</button>
                  <button type="button" className="t2-btn is-ivory" disabled={answers[step] === null} onClick={() => go(step + 1)}>{step === intake.length - 1 ? "See my starting point" : "Next"} <ArrowRight /></button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Treatment catalog ---------- */
export function Catalog({ filter, onFilter }: { filter: CatalogFilter; onFilter: (filter: CatalogFilter) => void }) {
  const tabs: { id: CatalogFilter; label: string }[] = [{ id: "all", label: "All" }, ...categories];
  const visible = filter === "all" ? products : products.filter(product => product.category === filter);

  return (
    <section className="t2-section is-flush" id="treatments" aria-labelledby="t2-catalog-title">
      <div className="t2-shell">
        <Head label="Treatments" id="t2-catalog-title" tag="Sample prices" title={<>The formulary,{" "}<br /><span>in plain view.</span></>}>
          <p>Every treatment here requires an online visit and is dispensed only if a licensed provider prescribes it.</p>
        </Head>

        <div className="t2-tabs-scroll" data-reveal>
          <div className="t2-tabs" role="tablist" aria-label="Treatment categories" onKeyDown={onTabKeys}>
            {tabs.map(tab => {
              const count = tab.id === "all" ? products.length : products.filter(product => product.category === tab.id).length;
              return (
                <button key={tab.id} type="button" role="tab" id={`t2-cat-tab-${tab.id}`} aria-selected={filter === tab.id} aria-controls="t2-cat-panel" tabIndex={filter === tab.id ? 0 : -1} onClick={() => onFilter(tab.id)}>
                  {tab.label} <sup>{count}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <div role="tabpanel" id="t2-cat-panel" aria-labelledby={`t2-cat-tab-${filter}`}>
          <ul className="t2-grid" role="list">
            {visible.map((product, index) => (
              <li key={`${filter}-${product.id}`} style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}>
                <article className="t2-card">
                  <div className="t2-card-media">
                    <span className="t2-card-cat">{categoryLabel(product.category)}</span>
                    <img src={img(product.image)} alt={`${product.name} ${product.form.toLowerCase()}`} loading="lazy" style={product.scale ? { height: `${product.scale * 72}%` } : undefined} />
                  </div>
                  <div className="t2-card-body">
                    <h3>{product.name}</h3>
                    <p className="t2-card-form">{product.form} · {product.detail}</p>
                    <p className="t2-card-price"><span>from <b>${product.price}</b>/mo</span> <small>Sample price · if prescribed</small></p>
                  </div>
                </article>
              </li>
            ))}
            <li key={`${filter}-prompt`} className="t2-grid-prompt t2-dark">
              <p className="t2-label">Not sure yet?</p>
              <p className="t2-grid-prompt-title">Start with three short questions.</p>
              <a className="t2-btn is-ivory" href="#fit">Find your fit <ArrowRight /></a>
            </li>
          </ul>
        </div>

        <p className="t2-footnote">Compounded medications are not FDA-approved; the FDA has not reviewed them for safety, effectiveness or quality. Prices shown are samples for this template.</p>
      </div>
    </section>
  );
}

/* ---------- 5. How it works ---------- */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const last = active === steps.length - 1;

  return (
    <section className="t2-section t2-dark is-ink" id="how-it-works" aria-labelledby="t2-how-title">
      <div className="t2-shell t2-how">
        <figure className="t2-how-photo" data-reveal>
          {stepPhotos.map((photo, index) => (
            <img key={photo.file} className={index === active ? "is-active" : undefined} src={img(photo.file)} alt={index === active ? photo.alt : ""} aria-hidden={index === active ? undefined : true} loading="lazy" style={{ objectPosition: photo.position }} />
          ))}
          <figcaption className="t2-how-badge t2-glass">
            <b>Step {two(active + 1)} <span>/ {two(steps.length)}</span></b>
            <span>{steps[active].time}</span>
          </figcaption>
        </figure>

        <div className="t2-how-side">
          <Head label="How it works" id="t2-how-title" title={<>From first question{" "}<br /><span>to front door.</span></>} />

          <ol className="t2-timeline" role="list" data-reveal>
            {steps.map((item, index) => {
              const open = index === active;
              return (
                <li key={item.title} className={open ? "is-current" : undefined}>
                  <h3>
                    <button type="button" aria-expanded={open} aria-current={open ? "step" : undefined} aria-controls={`t2-how-panel-${index}`} id={`t2-how-step-${index}`} onClick={() => setActive(index)}>
                      <span className="t2-timeline-node" aria-hidden="true">{two(index + 1)}</span>
                      <span className="t2-timeline-label"><span className="t2-sr">Step {index + 1}: </span>{item.title}</span>
                      <span className="t2-timeline-time">{item.time}</span>
                    </button>
                  </h3>
                  <div className="t2-how-copy" id={`t2-how-panel-${index}`} role="region" aria-labelledby={`t2-how-step-${index}`} hidden={!open}>
                    <p>{item.text}</p>
                    <ul className="t2-how-points" role="list">
                      {item.points.map(point => <li key={point}><Check />{point}</li>)}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="t2-how-next">
            <button type="button" className="t2-btn is-line" onClick={() => setActive(last ? 0 : active + 1)}>
              {last ? "Back to step one" : `Next: ${steps[active + 1].title}`} <ArrowRight />
            </button>
            <p>A prescription is never guaranteed. Your provider decides what is appropriate.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Order tracking preview ---------- */
export function Tracker() {
  const [stage, setStage] = useState(1);
  const last = stage === trackerStages.length - 1;

  return (
    <section className="t2-section" id="tracking" aria-labelledby="t2-track-title">
      <div className="t2-shell">
        <Head label="Order tracking" id="t2-track-title" tag="Preview" title={<>Know where it is,{" "}<br /><span>at every step.</span></>}>
          <p>Patients follow a prescription from the moment the pharmacy receives it. Step through a sample order to see the updates they get.</p>
        </Head>

        <div className="t2-track t2-dark" data-reveal>
          <figure className="t2-track-photo">
            <img src={img("delivery.jpg")} alt="A plain matte box tied with a dark ribbon on a green marble counter at dusk" loading="lazy" />
            <figcaption><i aria-hidden="true" />Plain outer packaging, with nothing on the box about what is inside.</figcaption>
          </figure>

          <div className="t2-order t2-glass">
            <div className="t2-order-head">
              <div>
                <p className="t2-label">Sample order</p>
                <p className="t2-order-id">No. WF-20418</p>
              </div>
              <Tag>Preview</Tag>
            </div>
            <p className="t2-order-status" aria-live="polite">
              <span>Current status</span>
              <b key={stage}>{trackerStages[stage].title}</b>
            </p>

            <ol className="t2-stages" role="list">
              {trackerStages.map((item, index) => {
                // The final stage reads as complete once the order is delivered.
                const complete = index < stage || (last && index === stage);
                const state = complete ? "is-done" : index === stage ? "is-current" : "is-todo";
                return (
                  <li key={item.title} className={state} aria-current={index === stage ? "step" : undefined}>
                    <span className="t2-stage-dot" aria-hidden="true">{complete && <Check />}</span>
                    <div>
                      <p className="t2-stage-title">{item.title}</p>
                      <p className="t2-stage-text">{item.text}</p>
                    </div>
                    <span className="t2-stage-time">{index <= stage ? item.time : "Pending"}</span>
                  </li>
                );
              })}
            </ol>

            <div className="t2-order-foot">
              <button type="button" className="t2-btn is-ivory" onClick={() => setStage(last ? 0 : stage + 1)}>
                {last ? "Restart preview" : "Simulate next step"} <ArrowRight />
              </button>
              <p>Sample order, dates and times. Shown for demonstration only.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Membership vs pay-as-you-go ---------- */
function PlanRow({ label, value }: { label: string; value: string | boolean }) {
  const included = value !== false;
  return (
    <li className={included ? undefined : "is-off"}>
      <span className="t2-plan-mark" aria-hidden="true">{included ? <Check /> : <Dash />}</span>
      <span className="t2-plan-label">{label}</span>
      <span className="t2-plan-value">{value === true ? "Included" : value === false ? "Not included" : value}</span>
    </li>
  );
}

export function Plans() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const plan = membership[billing];

  return (
    <section className="t2-section is-deep" id="pricing" aria-labelledby="t2-plans-title">
      <div className="t2-shell">
        <Head label="Pricing" id="t2-plans-title" tag="Sample pricing" title={<>Join, or{" "}<br /><span>pay as you go.</span></>}>
          <p>Two ways to use the pharmacy. Medication is priced separately and charged only if a treatment is prescribed.</p>
        </Head>

        <div className="t2-plans" data-reveal>
          <div className="t2-billing" role="group" aria-label="Membership billing period">
            <button type="button" aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")}>Monthly</button>
            <button type="button" aria-pressed={billing === "quarterly"} onClick={() => setBilling("quarterly")}>Quarterly <small>Save $15 a quarter</small></button>
          </div>

          <div className="t2-plan-grid">
            <article className="t2-plan is-member t2-dark" aria-labelledby="t2-plan-member">
              <div className="t2-plan-top">
                <h3 className="t2-plan-name" id="t2-plan-member"><i aria-hidden="true" />Membership</h3>
                <p className="t2-plan-price" aria-live="polite"><b key={billing}>${plan.price}</b><span>/mo</span></p>
                <p className="t2-plan-note">{plan.note}</p>
                <p className="t2-plan-pitch">For ongoing care: visits, messaging and shipping are included.</p>
                <a className="t2-btn is-ivory" href="#fit">Become a member <ArrowRight /></a>
              </div>
              <ul className="t2-plan-rows" role="list">
                {planRows.map(row => <PlanRow key={row.label} label={row.label} value={row.member[billing]} />)}
              </ul>
            </article>

            <article className="t2-plan" aria-labelledby="t2-plan-payg">
              <div className="t2-plan-top">
                <h3 className="t2-plan-name" id="t2-plan-payg"><i aria-hidden="true" />Pay as you go</h3>
                <p className="t2-plan-price"><b>$0</b><span>/mo</span></p>
                <p className="t2-plan-note">Pay per visit, no commitment</p>
                <p className="t2-plan-pitch">For a single visit, or when you would rather not subscribe.</p>
                <a className="t2-btn is-ink" href="#fit">Start a visit <ArrowRight /></a>
              </div>
              <ul className="t2-plan-rows" role="list">
                {planRows.map(row => <PlanRow key={row.label} label={row.label} value={row.payg[billing]} />)}
              </ul>
            </article>
          </div>
          <p className="t2-footnote">Sample pricing for this template. Cancel a membership at any time; it stays active until the end of the period already paid for. Membership does not guarantee a prescription.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Reviews ---------- */
export function Reviews() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  const move = (delta: number) => setIndex(value => (value + delta + reviews.length) % reviews.length);

  return (
    <section className="t2-reviews t2-dark" aria-labelledby="t2-reviews-title">
      <div className="t2-shell">
        <p className="t2-eyebrow"><i aria-hidden="true" /><span id="t2-reviews-title">In patients’ words</span><Tag>Sample reviews</Tag></p>
        <div className="t2-review" aria-live="polite">
          <figure key={index}>
            <blockquote>“{review.quote}”</blockquote>
            <figcaption><b>{review.name}</b><span>{review.context}</span></figcaption>
          </figure>
        </div>
        <div className="t2-review-nav">
          <div className="t2-review-ctrl">
            <button type="button" className="t2-round" aria-label="Previous review" onClick={() => move(-1)}><ArrowLeft /></button>
            <button type="button" className="t2-round" aria-label="Next review" onClick={() => move(1)}><ArrowRight /></button>
            <p className="t2-review-count" aria-label={`Review ${index + 1} of ${reviews.length}`}><b>{two(index + 1)}</b> / {two(reviews.length)}</p>
          </div>
          <p className="t2-review-note">Sample reviews written for this template. They describe service, not treatment results. Individual experiences vary.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. Care team ---------- */
export function CareTeam() {
  return (
    <section className="t2-section" id="care-team" aria-labelledby="t2-team-title">
      <div className="t2-shell">
        <Head label="Care team" id="t2-team-title" tag="Illustrative" title={<>The people{" "}<br /><span>behind the label.</span></>}>
          <p>Every visit is reviewed by a licensed provider and every order is checked by a pharmacist. The names and credentials below are illustrative.</p>
        </Head>
        <ul className="t2-team" role="list">
          {careTeam.map((person, index) => (
            <li key={person.name} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <article className="t2-person t2-dark">
                <div className="t2-monogram" aria-hidden="true">{person.initials}</div>
                <div>
                  <h3>{person.name}</h3>
                  <p className="t2-team-cred">{person.credential}</p>
                </div>
                <p className="t2-team-focus"><span>Focus</span>{person.focus}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 10. FAQ ---------- */
export function Faq() {
  const [active, setActive] = useState(0);
  const faq = faqs[active];

  return (
    <section className="t2-section is-flush" id="faq" aria-labelledby="t2-faq-title">
      <div className="t2-shell t2-faq">
        <div className="t2-faq-side">
          <Head label="Questions" id="t2-faq-title" title={<>Asked often,{" "}<br /><span>answered plainly.</span></>} />
          <div className="t2-tabs-scroll" data-reveal>
            <div className="t2-faq-tabs" role="tablist" aria-label="Question topics" onKeyDown={onTabKeys}>
              {faqs.map((item, index) => (
                <button key={item.topic} type="button" role="tab" id={`t2-faq-tab-${index}`} aria-selected={index === active} aria-controls="t2-faq-panel" tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)}>
                  <i aria-hidden="true" />{item.topic}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="t2-faq-panel" role="tabpanel" id="t2-faq-panel" aria-labelledby={`t2-faq-tab-${active}`} tabIndex={0} data-reveal>
          <div key={active}>
            <p className="t2-label">{faq.topic}</p>
            <h3>{faq.question}</h3>
            {faq.answer.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 11. Closing CTA ---------- */
export function Closing() {
  return (
    <section className="t2-closing t2-dark" aria-labelledby="t2-closing-title">
      <div className="t2-closing-media" aria-hidden="true">
        <img src={img("still-life.jpg")} alt="" loading="lazy" />
      </div>
      <div className="t2-shell t2-closing-inner" data-reveal>
        <p className="t2-eyebrow"><i aria-hidden="true" />Start today</p>
        <h2 id="t2-closing-title">Begin with a question.{" "}<br /><span>We’ll take it from there.</span></h2>
        <p className="t2-closing-lede">An online visit takes about five minutes. A licensed provider reviews it, and treatment ships only if prescribed.</p>
        <div className="t2-hero-cta">
          <a className="t2-btn is-ivory" href="#fit">Start a visit <ArrowRight /></a>
          <a className="t2-btn is-line" href="#pricing">See pricing</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 12. Footer ---------- */
export function Footer() {
  const [joined, setJoined] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Demo only: nothing is sent anywhere.
    event.preventDefault();
    setJoined(true);
  };

  return (
    <footer className="t2-footer t2-dark">
      <div className="t2-shell">
        <div className="t2-footer-grid">
          <form className="t2-news" onSubmit={onSubmit} aria-labelledby="t2-news-title">
            <Logo />
            <h3 id="t2-news-title">The {BRAND} letter</h3>
            <p>Occasional notes from our pharmacists. No promotions for prescription treatments.</p>
            <div className="t2-news-field">
              <label className="t2-sr" htmlFor="t2-news-email">Email address</label>
              <input id="t2-news-email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              <button type="submit" className="t2-round is-ivory" aria-label="Subscribe"><ArrowRight /></button>
            </div>
            <p className="t2-news-status" role="status">{joined ? "Thanks. This is a demo, so nothing was sent." : "Demo field. Nothing is sent."}</p>
          </form>

          {footerColumns.map(column => (
            <nav key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              <ul role="list">
                {column.links.map(link => <li key={link}><a href="#top">{link}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>

        <div className="t2-legal">
          <p>
            {BRAND_FULL} is a fictional pharmacy created to demonstrate a ScriptRx storefront template. Prices, people, reviews and order details are samples. Prescription treatments are available only if prescribed by a licensed provider after an online visit, and a prescription is not guaranteed. Compounded medications are not FDA-approved and have not been reviewed by the FDA for safety, effectiveness or quality. Individual results vary. Nothing on this page is medical advice. If you are having a medical emergency, call 911.
          </p>
          <div className="t2-legal-row">
            <span>© {new Date().getFullYear()} {BRAND_FULL}. Sample storefront.</span>
            <ul role="list">
              {footerLegal.map(link => <li key={link}><a href="#top">{link}</a></li>)}
            </ul>
            <a className="t2-powered" href={sitePath("/")}>Powered by ScriptRx</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
