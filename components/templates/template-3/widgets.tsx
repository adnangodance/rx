"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { sitePath } from "@/lib/site-path";
import { ArrowLeft, ArrowRight, ArrowUpRight, Box, Check, Plus, Replay, Search } from "./icons";
import { ASSET_BASE, biomarkers, cadences, chatScript, faqs, labPhases, outcomes, products, stats, type Biomarker } from "./data";

export const img = (file: string) => sitePath(`${ASSET_BASE}/${file}`);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Sample({ children = "Sample" }: { children?: string }) {
  return <span className="t3-sample">{children}</span>;
}

/* ---------- 1 Hero outcome cards ---------- */
export function OutcomeCards() {
  const [active, setActive] = useState(0);
  return (
    <div className="t3-outcomes">
      {outcomes.map((item, index) => {
        const isActive = index === active;
        return (
          <div key={item.id} className={`t3-oc${isActive ? " is-active" : ""}`} onMouseEnter={() => setActive(index)}>
            <button type="button" className="t3-oc-head" aria-expanded={isActive} aria-controls={`t3-oc-${item.id}`} onClick={() => setActive(index)}>
              <span className="t3-mono t3-oc-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="t3-oc-title">{item.title}</span>
              <span className="t3-oc-plus" aria-hidden="true"><Plus /></span>
            </button>
            <div className="t3-oc-panel" id={`t3-oc-${item.id}`} inert={!isActive}>
              <div className="t3-oc-copy">
                <p>{item.text}</p>
                <a className="t3-oc-link" href="#start">Start visit <ArrowRight /></a>
              </div>
              <div className="t3-oc-well">
                <img src={img(item.image)} alt={item.treatment} />
                <span>{item.treatment} · if prescribed</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- 2 Stats strip with count-up ---------- */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion() || !("IntersectionObserver" in window)) return;
    let frame = 0;
    node.textContent = "0";
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        node.textContent = String(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = String(to);
    };
  }, [to]);
  return <span ref={ref}>{to}</span>;
}

export function StatsStrip() {
  return (
    <dl className="t3-stats">
      {stats.map(stat => (
        <div key={stat.label} className="t3-stat">
          <dd className="t3-mono">
            <span className="t3-visually-hidden">{stat.value}{stat.suffix}</span>
            <span aria-hidden="true"><CountUp to={stat.value} />{stat.suffix && <small>{stat.suffix}</small>}</span>
          </dd>
          <dt>{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/* ---------- 3 Treatment rail ---------- */
export function TreatmentRail({ labelledBy }: { labelledBy: string }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0.3);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setProgress(Math.min(1, (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth));
      setEdges({ start: rail.scrollLeft <= 4, end: rail.scrollLeft >= max - 4 });
    };
    const frame = requestAnimationFrame(update);
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(".t3-tcard");
    if (!rail || !card) return;
    rail.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div className="t3-rail-wrap">
      <ul className="t3-rail" ref={railRef} role="list" aria-labelledby={labelledBy} tabIndex={0}>
        {products.map((product, index) => (
          <li key={product.id} className="t3-tcard">
            <div className="t3-tcard-top">
              <span className="t3-chip">{product.category}</span>
              <span className="t3-mono">{String(index + 1).padStart(2, "0")}/{String(products.length).padStart(2, "0")}</span>
            </div>
            <div className="t3-tcard-well">
              <img src={img(product.image)} alt="" loading="lazy" />
            </div>
            <h3>{product.name}</h3>
            <p className="t3-tcard-form">{product.form} · {product.frequency}{product.compounded ? " · Compounded" : ""}</p>
            <div className="t3-tcard-foot">
              <p>
                <span className="t3-mono t3-tcard-price">from ${product.price}/mo</span>
                <span className="t3-tcard-note">Sample price · if prescribed</span>
              </p>
              <a className="t3-round-link" href="#start" aria-label={`Start a visit for ${product.name}`}><ArrowUpRight /></a>
            </div>
          </li>
        ))}
      </ul>
      <div className="t3-rail-controls">
        <div className="t3-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
        <div className="t3-rail-buttons">
          <button type="button" className="t3-arrow" aria-label="Previous treatments" disabled={edges.start} onClick={() => move(-1)}><ArrowLeft /></button>
          <button type="button" className="t3-arrow" aria-label="Next treatments" disabled={edges.end} onClick={() => move(1)}><ArrowRight /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4 Compare treatments ---------- */
export function Compare() {
  const [left, setLeft] = useState(products[0].id);
  const [right, setRight] = useState(products[1].id);
  const picks = [
    { id: "t3-compare-a", label: "First treatment", value: left, set: setLeft },
    { id: "t3-compare-b", label: "Second treatment", value: right, set: setRight },
  ];
  const chosen = picks.map(pick => products.find(product => product.id === pick.value) ?? products[0]);
  const rows: { label: string; render: (index: number) => React.ReactNode; mono?: boolean }[] = [
    { label: "Category", render: index => chosen[index].category },
    { label: "Form", render: index => chosen[index].form },
    { label: "Frequency", render: index => chosen[index].frequency },
    { label: "How it's taken", render: index => chosen[index].how },
    { label: "Storage", render: index => chosen[index].storage },
    { label: "Type", render: index => (chosen[index].compounded ? "Compounded · not FDA-approved" : "Commercially available") },
    { label: "Sample price", mono: true, render: index => <>from ${chosen[index].price}/mo <small>if prescribed</small></> },
  ];

  return (
    <div className="t3-compare" role="table" aria-label="Treatment comparison">
      <div className="t3-cmp-row is-head" role="row">
        <div className="t3-cmp-label" role="columnheader"><span className="t3-visually-hidden">Attribute</span></div>
        {picks.map((pick, index) => (
          <div key={pick.id} className="t3-cmp-pick" role="columnheader">
            <div className="t3-cmp-well"><img src={img(chosen[index].image)} alt="" /></div>
            <label className="t3-visually-hidden" htmlFor={pick.id}>{pick.label}</label>
            <div className="t3-select">
              <select id={pick.id} value={pick.value} onChange={event => pick.set(event.target.value)}>
                {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
      {rows.map(row => (
        <div key={row.label} className="t3-cmp-row" role="row">
          <div className="t3-cmp-label" role="rowheader">{row.label}</div>
          {[0, 1].map(index => <div key={index} className={`t3-cmp-cell${row.mono ? " t3-mono" : ""}`} role="cell">{row.render(index)}</div>)}
        </div>
      ))}
      <div className="t3-cmp-row is-foot" role="row">
        <div className="t3-cmp-label" role="rowheader"><span className="t3-visually-hidden">Next step</span></div>
        {[0, 1].map(index => (
          <div key={index} className="t3-cmp-cell" role="cell">
            <a className="t3-btn is-ink is-small" href="#start">Start visit<span className="t3-visually-hidden"> for {chosen[index].name}</span></a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 5 Lab & biomarker preview ---------- */
type Phase = keyof typeof labPhases;
const pct = (marker: Biomarker, value: number) => ((value - marker.min) / (marker.max - marker.min)) * 100;

function markerStatus(marker: Biomarker, value: number) {
  if (value < marker.low) return { label: "Below range", tone: "out" };
  if (value > marker.high) return { label: "Above range", tone: "out" };
  return { label: "In range", tone: "in" };
}

export function LabPanel() {
  const [phase, setPhase] = useState<Phase>("baseline");
  const inRange = biomarkers.filter(marker => markerStatus(marker, marker[phase]).tone === "in").length;
  return (
    <div className="t3-lab">
      <div className="t3-lab-head">
        <div>
          <p className="t3-lab-title">Wellness panel</p>
          <p className="t3-lab-meta t3-mono">{labPhases[phase].collected} · {inRange} of {biomarkers.length} in range</p>
        </div>
        <div className="t3-seg" role="group" aria-label="Lab draw">
          {(Object.keys(labPhases) as Phase[]).map(key => (
            <button key={key} type="button" aria-pressed={phase === key} onClick={() => setPhase(key)}>{labPhases[key].label}</button>
          ))}
        </div>
      </div>
      <ul className="t3-lab-list" role="list" aria-live="polite">
        {biomarkers.map(marker => {
          const value = marker[phase];
          const status = markerStatus(marker, value);
          return (
            <li key={marker.id} className="t3-marker">
              <div className="t3-marker-top">
                <span className="t3-marker-name">{marker.name}</span>
                <span className={`t3-status is-${status.tone}`}>{status.label}</span>
                <span className="t3-marker-value t3-mono"><b>{value}</b> {marker.unit}</span>
              </div>
              <div className="t3-range" aria-hidden="true">
                <span className="t3-range-zone" style={{ left: `${pct(marker, marker.low)}%`, width: `${pct(marker, marker.high) - pct(marker, marker.low)}%` }} />
                <span className={`t3-range-dot is-${status.tone}`} style={{ left: `${pct(marker, value)}%` }} />
              </div>
              <p className="t3-marker-ref t3-mono">Reference {marker.low}–{marker.high} {marker.unit}</p>
            </li>
          );
        })}
      </ul>
      <p className="t3-lab-foot"><Sample>Illustrative data</Sample> Invented values that show the interface. They are not patient results and do not represent the effect of any treatment.</p>
    </div>
  );
}

/* ---------- 6 Refill & subscription manager ---------- */
const DAY = 86_400_000;
const SAMPLE_TODAY = Date.UTC(2026, 10, 25);
const FIRST_REFILL = Date.UTC(2026, 11, 4);
const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
const formatDate = (time: number) => dateFormat.format(time);

export function RefillManager() {
  const [next, setNext] = useState(FIRST_REFILL);
  const [weeks, setWeeks] = useState(4);
  const [log, setLog] = useState<string[]>(["Plan active. Your next refill is scheduled."]);
  const note = (message: string) => setLog(current => [message, ...current].slice(0, 3));
  const changed = next !== FIRST_REFILL || weeks !== 4;

  const skip = () => {
    const date = next + weeks * 7 * DAY;
    setNext(date);
    note(`Refill skipped. Next refill moved to ${formatDate(date)}.`);
  };
  const delay = () => {
    const date = next + 7 * DAY;
    setNext(date);
    note(`Refill delayed one week, to ${formatDate(date)}.`);
  };
  const shipNow = () => {
    const date = SAMPLE_TODAY + weeks * 7 * DAY;
    setNext(date);
    note(`Refill released to the pharmacy today. Following refill set for ${formatDate(date)}.`);
  };
  const reset = () => {
    setNext(FIRST_REFILL);
    setWeeks(4);
    setLog(["Plan reset to the original schedule."]);
  };

  return (
    <div className="t3-refill">
      <div className="t3-refill-head">
        <div className="t3-refill-well"><img src={img("product-pen.png")} alt="" loading="lazy" /></div>
        <div>
          <p className="t3-refill-name">Weekly GLP-1 pen</p>
          <p className="t3-refill-sub">Sample plan · Jordan A.</p>
        </div>
        <span className="t3-status is-in">Active</span>
      </div>

      <div className="t3-refill-date">
        <p className="t3-label">Next refill</p>
        <p className="t3-mono t3-refill-next" data-testid="t3-next-refill">{formatDate(next)}</p>
        <p className="t3-refill-then">Then {cadences.find(cadence => cadence.weeks === weeks)?.label.toLowerCase()} · following refill <span className="t3-mono">{formatDate(next + weeks * 7 * DAY)}</span></p>
      </div>

      <div className="t3-refill-actions">
        <button type="button" className="t3-btn is-ghost is-small" onClick={skip}>Skip refill</button>
        <button type="button" className="t3-btn is-ghost is-small" onClick={delay}>Delay 1 week</button>
        <button type="button" className="t3-btn is-ink is-small" onClick={shipNow}><Box /> Ship now</button>
      </div>

      <div className="t3-refill-cadence">
        <p className="t3-label" id="t3-cadence-label">Delivery cadence</p>
        <div className="t3-seg is-wide" role="group" aria-labelledby="t3-cadence-label">
          {cadences.map(cadence => (
            <button key={cadence.weeks} type="button" aria-pressed={weeks === cadence.weeks} onClick={() => { setWeeks(cadence.weeks); note(`Cadence changed to ${cadence.label.toLowerCase()}.`); }}>
              <span className="t3-mono">{cadence.weeks}</span> weeks
            </button>
          ))}
        </div>
      </div>

      <div className="t3-refill-log">
        <div className="t3-refill-log-head">
          <p className="t3-label">Activity</p>
          <button type="button" className="t3-text-btn" onClick={reset} disabled={!changed}>Reset</button>
        </div>
        <ul role="list" aria-live="polite">
          {log.map((entry, index) => <li key={`${log.length}-${index}-${entry}`}><Check />{entry}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ---------- 7 Provider chat preview ---------- */
export function ChatPreview() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [shown, setShown] = useState<number>(chatScript.length);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(false);

  const clear = () => {
    timers.current.forEach(timer => window.clearTimeout(timer));
    timers.current = [];
  };

  const play = useCallback(() => {
    clear();
    if (reducedMotion()) {
      setTyping(false);
      setShown(chatScript.length);
      return;
    }
    setShown(0);
    setTyping(false);
    setPlaying(true);
    let at = 500;
    chatScript.forEach((message, index) => {
      if (message.from === "provider") {
        timers.current.push(window.setTimeout(() => setTyping(true), at));
        at += 1000;
      }
      timers.current.push(window.setTimeout(() => {
        setTyping(false);
        setShown(index + 1);
        if (index === chatScript.length - 1) setPlaying(false);
      }, at));
      at += 1000;
    });
  }, []);

  // Play once, the first time the phone scrolls into view.
  useEffect(() => {
    const node = phoneRef.current;
    if (!node || reducedMotion() || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      play();
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [play]);

  return (
    <div className="t3-chat">
      <div className="t3-phone" ref={phoneRef}>
        <div className="t3-phone-screen">
          <div className="t3-phone-bar">
            <span className="t3-avatar" aria-hidden="true">AR</span>
            <span>
              <b>Dr. A. Rivera</b>
              <small>Licensed provider · Illustrative</small>
            </span>
          </div>
          <div className="t3-thread" role="log" aria-label="Sample conversation with a provider" data-shown={shown}>
            {chatScript.slice(0, shown).map((message, index) => (
              <p key={index} className={`t3-bubble is-${message.from}`}>
                <span className="t3-visually-hidden">{message.from === "provider" ? "Provider: " : "Patient: "}</span>
                {message.text}
              </p>
            ))}
            {typing && <p className="t3-bubble is-provider is-typing" aria-label="Provider is typing"><i /><i /><i /></p>}
          </div>
          <div className="t3-phone-input" aria-hidden="true"><span>Message your provider</span><ArrowUpRight /></div>
        </div>
      </div>
      <button type="button" className="t3-btn is-ghost is-small t3-replay" onClick={play} disabled={playing}><Replay /> {playing ? "Playing" : "Replay conversation"}</button>
    </div>
  );
}

/* ---------- 9 Searchable FAQ ---------- */
export function FaqSearch() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(faqs[0].id);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = faqs.filter(faq => terms.every(term => `${faq.q} ${faq.a}`.toLowerCase().includes(term)));

  return (
    <div className="t3-faq">
      <div className="t3-faq-search">
        <label htmlFor={inputId}>Search questions</label>
        <div className="t3-faq-field">
          <Search />
          <input id={inputId} type="search" value={query} placeholder="Try “shipping” or “HSA”" autoComplete="off" onChange={event => setQuery(event.target.value)} />
          {query && <button type="button" className="t3-text-btn" onClick={() => setQuery("")}>Clear</button>}
        </div>
        <p className="t3-faq-count t3-mono" role="status">{results.length} of {faqs.length} questions</p>
      </div>
      {results.length > 0 ? (
        <ul className="t3-faq-list" role="list">
          {results.map(faq => {
            const isOpen = open === faq.id || (terms.length > 0 && results.length === 1);
            return (
              <li key={faq.id} className={`t3-faq-item${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`t3-faq-${faq.id}`} id={`t3-faq-q-${faq.id}`} onClick={() => setOpen(current => (current === faq.id ? null : faq.id))}>
                    {faq.q}
                    <span className="t3-faq-icon" aria-hidden="true"><Plus /></span>
                  </button>
                </h3>
                <div className="t3-faq-answer" id={`t3-faq-${faq.id}`} role="region" aria-labelledby={`t3-faq-q-${faq.id}`} inert={!isOpen}>
                  <div><p>{faq.a}</p></div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="t3-faq-empty">
          <p>No questions match “{query}”.</p>
          <a className="t3-btn is-ghost is-small" href="#start">Ask the pharmacy</a>
        </div>
      )}
    </div>
  );
}
