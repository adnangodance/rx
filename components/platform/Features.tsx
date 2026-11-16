"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { sitePath } from "@/lib/site-path";

const img = (file: string) => sitePath(`/platform/${file}`);

/* ============================================================
   Shared primitives — same anatomy as the storefront theme builder:
   a framed live preview on the left, a soft control panel on the right.
   ============================================================ */

export function Check() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Lock() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.3" /></svg>;
}

function Spinner() {
  return <span className="pl-spinner" aria-hidden="true" />;
}

/** Browser-style frame. `tone` sets the frame colour. */
export function Window({ url, tone = "ink", secure = false, children, label }: { url: string; tone?: "ink" | "light" | "dark"; secure?: boolean; children: ReactNode; label: string }) {
  return (
    <div className={`pl-window is-${tone}`} role="img" aria-label={label}>
      <div className="pl-window-chrome">
        <span className="pl-window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="pl-window-url">{secure && <Lock />}<b>{url}</b></span>
      </div>
      <div className="pl-window-body">{children}</div>
    </div>
  );
}

export function Panel({ title, chip = "Sample data", note, children, dark = false, label }: { title: string; chip?: string; note?: ReactNode; children: ReactNode; dark?: boolean; label?: string }) {
  return (
    <div className={`pl-panel${dark ? " is-dark" : ""}`} role="group" aria-label={label ?? title}>
      <div className="pl-panel-head"><b>{title}</b>{chip && <span className="pl-chip">{chip}</span>}</div>
      {children}
      {note && <div className="pl-panel-note">{note}</div>}
    </div>
  );
}

function Stage({ preview, panel, className = "" }: { preview: ReactNode; panel: ReactNode; className?: string }) {
  return <div className={`pl-stage ${className}`} data-reveal>{preview}{panel}</div>;
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <label className="pl-toggle">
      <span>{label}</span>
      <input type="checkbox" role="switch" checked={checked} onChange={e => onChange(e.target.checked)} />
      <i aria-hidden="true" />
    </label>
  );
}

function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: string }[]; onChange: (value: T) => void; label: string }) {
  return (
    <div className="pl-segmented" role="radiogroup" aria-label={label}>
      {options.map(o => <button key={o.value} type="button" role="radio" aria-checked={o.value === value} onClick={() => onChange(o.value)}>{o.label}</button>)}
    </div>
  );
}

/** Counts smoothly toward `value`. */
function useTween(value: number, duration = 600) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { fromRef.current = value; const id = requestAnimationFrame(() => setShown(value)); return () => cancelAnimationFrame(id); }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(from + (value - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); fromRef.current = value; };
  }, [value, duration]);
  return shown;
}

const money = (value: number) => `$${value.toFixed(2)}`;

/* ============================================================
   1. Care categories — choose what your storefront offers
   ============================================================ */
const categories = [
  { key: "weight", title: "Weight Management", body: "Appetite control, adherence and ongoing clinician review.", image: "photo-couple-sky.png", position: "50% 30%" },
  { key: "men", title: "Men’s Health", body: "Prescriber-guided", image: "photo-man-grey.png", position: "50% 25%" },
  { key: "women", title: "Women’s Health", body: "Care for every chapter", image: "photo-woman-active.png", position: "50% 30%" },
  { key: "longevity", title: "Longevity", body: "Support for your goals", image: "photo-woman-run.png", position: "50% 30%" },
  { key: "derm", title: "Dermatology", body: "Acne, dark spots and texture concerns", image: "product-tretinoin.png", position: "50% 50%" },
];

export function CareBuilder() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ weight: true, men: true, women: true, longevity: false, derm: true });
  const visible = categories.filter(c => enabled[c.key]);

  return (
    <Stage
      preview={
        <Window url="willow.example/treatments" label="Storefront treatment categories preview">
          <div className="pl-care-site">
            <div className="pl-care-site-head"><strong>What brings you in today?</strong><span>{visible.length} of {categories.length} categories</span></div>
            <div className={`pl-care-grid is-${Math.min(visible.length, 5)}`}>
              {visible.map((c, i) => (
                <div key={c.key} className={`pl-care-tile${i === 0 ? " is-lead" : ""}`}>
                  <img src={img(c.image)} alt="" style={{ objectPosition: c.position }} />
                  <span className="pl-glass"><b>{c.title}</b><small>{c.body}</small></span>
                </div>
              ))}
              {visible.length === 0 && <div className="pl-care-empty">Turn on a category to fill your storefront.</div>}
            </div>
          </div>
        </Window>
      }
      panel={
        <Panel title="Care categories" note={<><b>Live scriptrx.com copy.</b><span>Shown as your patients would see it.</span></>}>
          <div className="pl-toggles">
            {categories.map(c => <Toggle key={c.key} label={c.title} checked={!!enabled[c.key]} onChange={v => setEnabled(prev => ({ ...prev, [c.key]: v }))} />)}
          </div>
        </Panel>
      }
    />
  );
}

/* ============================================================
   2. Domains — subdomain or your own domain, connected live
   ============================================================ */
type DomainMode = "sub" | "custom";

export function DomainBuilder() {
  const [mode, setMode] = useState<DomainMode>("sub");
  const [sub, setSub] = useState("willow");
  const [custom, setCustom] = useState("willowhealth.com");
  const [step, setStep] = useState(3);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const domain = mode === "sub" ? `${(sub || "your-brand").toLowerCase().replace(/[^a-z0-9-]/g, "")}.scriptrx.com` : (custom || "yourdomain.com").toLowerCase();
  const steps = mode === "sub" ? ["Subdomain reserved", "SSL certificate issued", "Storefront live"] : ["DNS records verified", "SSL certificate issued", "Storefront live"];

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function reset() { timers.current.forEach(clearTimeout); setStep(-1); }
  function connect() {
    timers.current.forEach(clearTimeout);
    setStep(0);
    timers.current = [1, 2, 3].map(n => setTimeout(() => setStep(n), n * 950));
  }
  const live = step >= 3;

  return (
    <Stage
      preview={
        <Window url={domain} secure={step >= 2} label={`Storefront at ${domain}`}>
          <div className="pl-domain-site">
            <div className="pl-domain-nav"><strong>Willow</strong><span>Treatments</span><span>How it works</span><span>FAQs</span></div>
            <div className="pl-domain-hero">
              <div className="pl-domain-copy">
                <span className={`pl-live-pill${live ? " is-live" : ""}`}><i />{live ? "Live" : "Setting up"}</span>
                <p>Your health.<br />More in your hands.</p>
                <em className="pl-domain-cta">Get Started</em>
                <div className="pl-domain-pages">
                  {["Privacy policy", "Terms of use", "FAQs", "About"].map(p => <span key={p}><Check />{p}</span>)}
                </div>
              </div>
              <div className={`pl-domain-visual${live ? " is-live" : ""}`}>
                <img src={img("hero-golden.png")} alt="" />
                <span className="pl-glass pl-domain-float"><b>A plan made for your progress.</b><small>Licensed prescribers, nationwide</small></span>
              </div>
            </div>
            <div className="pl-domain-products">
              <span className="pl-domain-products-label">Popular<br />treatments</span>
              {[["product-pen.png", "Weight care pen"], ["product-b12.png", "Vitamin B12"], ["product-nad.png", "NAD+ Injection"], ["product-tretinoin.png", "Tretinoin cream"]].map(([file, name]) => (
                <span key={name} className="pl-domain-product"><img src={img(file)} alt="" /><b>{name}</b></span>
              ))}
            </div>
            <ol className="pl-domain-steps" aria-live="polite">
              {steps.map((label, i) => {
                const state = step > i ? "done" : step === i ? "active" : "todo";
                return <li key={label} className={`is-${state}`}>{state === "done" ? <Check /> : state === "active" ? <Spinner /> : <i />}{label}</li>;
              })}
            </ol>
          </div>
        </Window>
      }
      panel={
        <Panel title="Domain" note={<><b>Your logo, your domain.</b><span>Each storefront launches on a scriptrx.com subdomain or on your own domain.</span></>}>
          <Segmented<DomainMode> label="Domain type" value={mode} onChange={m => { setMode(m); reset(); }} options={[{ value: "sub", label: "Subdomain" }, { value: "custom", label: "Custom domain" }]} />
          {mode === "sub" ? (
            <label className="pl-field">
              <span>Subdomain</span>
              <span className="pl-input-affix"><input value={sub} maxLength={24} onChange={e => { setSub(e.target.value); reset(); }} /><em>.scriptrx.com</em></span>
            </label>
          ) : (
            <label className="pl-field">
              <span>Your domain</span>
              <input value={custom} maxLength={40} onChange={e => { setCustom(e.target.value); reset(); }} />
            </label>
          )}
          <button type="button" className="pl-panel-btn" onClick={connect} disabled={step >= 0 && step < 3}>
            {step >= 0 && step < 3 ? <>Connecting <Spinner /></> : live ? "Reconnect" : "Connect domain"}
          </button>
        </Panel>
      }
    />
  );
}

/* ============================================================
   3. Catalog & pricing — markup applied live
   ============================================================ */
const catalog = [
  { file: "product-b12.png", name: "Vitamin B12", category: "Energy", cost: 74.17 },
  { file: "product-estradiol.png", name: "Estradiol patch", category: "Women’s Health", cost: 82.5 },
  { file: "product-oxytocin.png", name: "Oxytocin", category: "Wellness", cost: 82.5 },
  { file: "product-pt141.png", name: "PT-141", category: "Men’s & Women’s Health", cost: 99.17 },
];

function PriceCell({ value }: { value: number }) {
  return <>{money(useTween(value))}</>;
}

export function PricingBuilder() {
  const [markup, setMarkup] = useState(20);
  const [ending, setEnding] = useState<"00" | "99">("00");
  const priceOf = (cost: number) => {
    const raw = cost * (1 + markup / 100);
    return ending === "99" ? Math.max(0.99, Math.ceil(raw) - 0.01) : Math.round(raw);
  };

  const avgPrice = catalog.reduce((sum, p) => sum + priceOf(p.cost), 0) / catalog.length;

  return (
    <Stage
      preview={
        <Window url="office.scriptrx.com/products" label="Catalog pricing preview">
          <div className="pl-price-site">
            <div className="pl-price-head"><strong>Products</strong><span>Synced from ScriptRx</span></div>
            <div className="pl-price-grid">
              {catalog.map(p => (
                <div key={p.name} className="pl-price-card">
                  <span className="pl-price-photo"><img src={img(p.file)} alt="" /></span>
                  <b>{p.name}</b>
                  <small>{p.category}</small>
                  <div className="pl-price-rows">
                    <span>Pricing<em>{markup}% markup</em></span>
                    <span className="is-price">Your price<em><PriceCell value={priceOf(p.cost)} /> / mo</em></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pl-price-summary">
              <span><small>Average price</small><b><PriceCell value={avgPrice} /> / mo</b></span>
              <span><small>Default markup</small><b>{markup}%</b></span>
              <span><small>Products priced</small><b>{catalog.length} of {catalog.length}</b></span>
            </div>
          </div>
        </Window>
      }
      panel={
        <Panel title="Default markup %" note={<><b>Your catalog. Your prices.</b><span>A catalog-wide markup % applies to any plan without an explicit price.</span></>}>
          <label className="pl-field">
            <span>Markup</span>
            <span className="pl-range">
              <b>{markup}<em>%</em></b>
              <input type="range" min={0} max={60} value={markup} onChange={e => setMarkup(Number(e.target.value))} aria-label="Default markup percentage" style={{ "--fill": `${(markup / 60) * 100}%` } as CSSProperties} />
            </span>
          </label>
          <div className="pl-field">
            <span>Price ending</span>
            <Segmented<"00" | "99"> label="Price ending" value={ending} onChange={setEnding} options={[{ value: "00", label: "Whole dollars" }, { value: "99", label: "Ends in .99" }]} />
          </div>
        </Panel>
      }
    />
  );
}

/* ============================================================
   4. Pharmacy — a working order queue
   ============================================================ */
type Status = "Awaiting review" | "Prescribed" | "Shipped" | "Delivered" | "Refill due";
const nextStatus: Partial<Record<Status, { to: Status; action: string }>> = {
  "Awaiting review": { to: "Prescribed", action: "Approve" },
  Prescribed: { to: "Shipped", action: "Ship" },
  Shipped: { to: "Delivered", action: "Deliver" },
  "Refill due": { to: "Prescribed", action: "Refill" },
};
const tone: Record<Status, string> = { "Awaiting review": "amber", Prescribed: "blue", Shipped: "violet", Delivered: "green", "Refill due": "grey" };
const initialOrders: { file: string; product: string; id: string; patient: string; store: string; status: Status; total: number }[] = [
  { file: "product-nad.png", product: "NAD+ Injection", id: "SR-10482", patient: "Jordan M.", store: "Bronx Rx", status: "Awaiting review", total: 189 },
  { file: "product-b12.png", product: "Vitamin B12", id: "SR-10481", patient: "Priya S.", store: "Arizona Wellness", status: "Prescribed", total: 89 },
  { file: "product-glutathione.png", product: "Glutathione", id: "SR-10480", patient: "Alex R.", store: "Bronx Rx", status: "Shipped", total: 129 },
  { file: "product-tretinoin.png", product: "Tretinoin cream", id: "SR-10479", patient: "Dana K.", store: "Northside Clinic", status: "Refill due", total: 79 },
  { file: "product-sermorelin.png", product: "Sermorelin", id: "SR-10478", patient: "Chris L.", store: "Coastal Pharmacy", status: "Awaiting review", total: 219 },
  { file: "product-estradiol.png", product: "Estradiol patch", id: "SR-10477", patient: "Maya T.", store: "Arizona Wellness", status: "Shipped", total: 99 },
];
const statusOrder: Status[] = ["Awaiting review", "Prescribed", "Shipped", "Delivered", "Refill due"];

export function PharmacyQueue() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<Status | "All">("All");
  const [flash, setFlash] = useState<string | null>(null);
  const count = (s: Status) => orders.filter(o => o.status === s).length;
  const visible = orders.filter(o => filter === "All" || o.status === filter);

  function advance(id: string) {
    setOrders(list => list.map(o => {
      const next = nextStatus[o.status];
      return o.id === id && next ? { ...o, status: next.to } : o;
    }));
    setFlash(id);
  }

  return (
    <Stage
      className="is-dark"
      preview={
        <Window url="pharmacy.scriptrx.com/orders" tone="dark" label="ScriptRx Pharmacy order queue">
          <div className="pl-queue">
            <div className="pl-queue-kpis">
              {statusOrder.slice(0, 4).map(s => <div key={s} className={`tone-${tone[s]}`}><small><i />{s}</small><b>{count(s)}</b></div>)}
            </div>
            <div className="pl-queue-table" role="table" aria-label="Sample orders">
              <div className="pl-queue-row is-head" role="row"><span role="columnheader">Order</span><span role="columnheader">Patient</span><span role="columnheader">Storefront</span><span role="columnheader">Status</span><span role="columnheader">Total</span><span role="columnheader"><span className="pl-sr">Action</span></span></div>
              {visible.map(o => {
                const next = nextStatus[o.status];
                return (
                  <div key={o.id} role="row" className={`pl-queue-row${flash === o.id ? " is-flash" : ""}`} onAnimationEnd={() => setFlash(null)}>
                    <span role="cell" className="pl-queue-product"><img src={img(o.file)} alt="" /><b>{o.product}<small>#{o.id}</small></b></span>
                    <span role="cell">{o.patient}</span>
                    <span role="cell">{o.store}</span>
                    <span role="cell"><em className={`pl-status tone-${tone[o.status]}`}>{o.status}</em></span>
                    <span role="cell">{money(o.total)}</span>
                    <span role="cell">{next ? <button type="button" onClick={() => advance(o.id)}>{next.action}</button> : <i className="pl-queue-done"><Check /></i>}</span>
                  </div>
                );
              })}
              {visible.length === 0 && <div className="pl-queue-empty">No orders in this view.</div>}
            </div>
          </div>
        </Window>
      }
      panel={
        <Panel dark title="Order queue" note={<><b>Try it.</b><span>Approve, ship and deliver sample orders — counts update across the portal.</span></>}>
          <div className="pl-filter-list" role="radiogroup" aria-label="Filter orders">
            {(["All", ...statusOrder] as const).map(s => (
              <button key={s} type="button" role="radio" aria-checked={filter === s} onClick={() => setFilter(s)}>
                <span>{s !== "All" && <i className={`tone-${tone[s]}`} />}{s === "All" ? "All orders" : s}</span>
                <b>{s === "All" ? orders.length : count(s)}</b>
              </button>
            ))}
          </div>
          <button type="button" className="pl-panel-link" onClick={() => { setOrders(initialOrders); setFilter("All"); }}>Reset sample orders</button>
        </Panel>
      }
    />
  );
}

/* ============================================================
   5. Provider app — review and approve a consultation
   ============================================================ */
type Review = "pending" | "info" | "approved";

export function ProviderReview() {
  const [review, setReview] = useState<Review>("pending");
  const chip = review === "approved" ? <em className="pl-status tone-green">Approved</em> : review === "info" ? <em className="pl-status tone-blue">Info requested</em> : <em className="pl-status tone-amber">Needs review</em>;

  return (
    <div className="pl-prov" data-reveal>
      <img className="pl-prov-bg" src={img("provider-golden.png")} alt="" />

      <div className="pl-prov-panel" role="group" aria-label="Consultation review">
        <div className="pl-panel-head"><b>Consultation review</b>{chip}</div>
        <dl className="pl-dl">
          <dt>Patient</dt><dd>Alex R., 41</dd>
          <dt>Goal</dt><dd>Sustainable weight loss</dd>
          <dt>Health history</dt><dd>Reviewed, no flags</dd>
          <dt>Requested plan</dt><dd>Monthly plan</dd>
        </dl>
        {review === "pending" ? (
          <div className="pl-panel-actions">
            <button type="button" className="pl-panel-btn is-ghost" onClick={() => setReview("info")}>Request info</button>
            <button type="button" className="pl-panel-btn" onClick={() => setReview("approved")}>Approve plan</button>
          </div>
        ) : (
          <div className={`pl-panel-result${review === "info" ? " is-info" : ""}`} aria-live="polite">
            <span>{review === "approved" ? "Plan approved. The order moves to the pharmacy queue." : "Request sent. The patient is notified in their storefront."}</span>
            <button type="button" className="pl-panel-link" onClick={() => setReview("pending")}>Reset</button>
          </div>
        )}
      </div>

      <div className="pl-prov-phone" role="img" aria-label="Provider app on a phone">
        <div className="pl-phone">
          <div className="pl-phone-screen">
            <div className="pl-phone-status"><b>9:41</b><i /></div>
            <div className="pl-pp-head"><span><b>Rx</b>Provider</span><small>provider.scriptrx.com</small></div>
            <strong className="pl-pp-title">Today</strong>
            <small className="pl-pp-sub">3 appointments, {review === "approved" ? "1 review" : "2 reviews"}</small>
            <div className="pl-pp-appt"><small>10:30</small><i>JM</i><span><b>Jordan M.</b>Weight Management consult</span></div>
            <div className="pl-pp-appt"><small>11:15</small><i>PS</i><span><b>Priya S.</b>Follow-up visit</span></div>
            <div className={`pl-pp-review is-${review}`}>
              <span className="pl-pp-review-head"><b>Consultation review</b>{chip}</span>
              <span className="pl-pp-review-body">Alex R., 41 · Monthly plan</span>
            </div>
            {review === "approved" && <div className="pl-pp-toast"><Check />Order sent to ScriptRx Pharmacy</div>}
            {review === "info" && <div className="pl-pp-toast is-info">Message sent to Alex R.</div>}
            <nav className="pl-pp-tabs">{["Appointments", "Messages", "Orders", "Profile", "Support"].map((t, i) => <span key={t} className={i === 0 ? "is-active" : ""}><i />{t}</span>)}</nav>
          </div>
        </div>
      </div>

      <ul className="pl-prov-caps" aria-label="Provider app features">
        {["Appointments and follow-ups", "Messages with patients", "Consultation review", "Orders after approval"].map(item => <li key={item}><Check />{item}</li>)}
      </ul>
    </div>
  );
}

/* ============================================================
   6. Office — run a ScriptRx sync
   ============================================================ */
const businesses = [
  { init: "BR", tone: "#2f6b5a", name: "Bronx Rx", domain: "bronx.scriptrx.com", prescribers: 6, status: "Live" },
  { init: "AW", tone: "#9a5b3f", name: "Arizona Wellness", domain: "arizona.scriptrx.com", prescribers: 4, status: "Live" },
  { init: "NC", tone: "#29377d", name: "Northside Clinic", domain: "northsideclinic.com", prescribers: 3, status: "Domain check" },
  { init: "CP", tone: "#5b6b8c", name: "Coastal Pharmacy", domain: "coastal.scriptrx.com", prescribers: 2, status: "Draft" },
];
const businessTone: Record<string, string> = { Live: "green", "Domain check": "amber", Draft: "grey" };
const TOTAL = 471;

export function OfficeSync() {
  const [checked, setChecked] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const frame = useRef(0);
  const ratio = checked / TOTAL;
  const catalogCount = useTween(459 + Math.round(12 * ratio));

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function run() {
    cancelAnimationFrame(frame.current);
    setRunning(true);
    setChecked(0);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 3200);
      setChecked(Math.round(TOTAL * (1 - Math.pow(1 - t, 2))));
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <Stage
      preview={
        <Window url="office.scriptrx.com/businesses" label="ScriptRx Office businesses dashboard">
          <div className="pl-office-site">
            <div className="pl-office-kpis">
              <div><small>Live storefronts</small><b>4</b><small>2 on custom domains</small></div>
              <div><small>Orders this week</small><b>1,284</b><small>across all storefronts</small></div>
              <div><small>Prescribers</small><b>15</b><small>on 4 businesses</small></div>
              <div className={running ? "is-busy" : ""}><small>Products in catalog</small><b>{Math.round(catalogCount)}</b><small>from ScriptRx</small></div>
            </div>
            <div className="pl-office-table">
              <div className="pl-office-row is-head"><span>Business</span><span>Domain</span><span>Prescribers</span><span>Status</span></div>
              {businesses.map(b => (
                <div key={b.name} className="pl-office-row">
                  <span className="pl-office-biz"><i style={{ background: b.tone }}>{b.init}</i><b>{b.name}</b></span>
                  <span>{b.domain}</span><span>{b.prescribers}</span>
                  <span><em className={`pl-status tone-${businessTone[b.status]}`}>{b.status}</em></span>
                </div>
              ))}
            </div>
          </div>
        </Window>
      }
      panel={
        <Panel title="Sync from ScriptRx" note={<><b>Every storefront, one office.</b><span>Products, prescribers, orders, subscriptions and storefront pages.</span></>}>
          <div className="pl-sync">
            <span className="pl-sync-bar"><i style={{ width: `${ratio * 100}%` }} /></span>
            <small>{running ? `${checked} of ${TOTAL} products checked — ${Math.round(ratio * 100)}%` : `All ${TOTAL} products up to date`}</small>
          </div>
          <dl className="pl-dl">
            <dt>New products</dt><dd>{Math.round(12 * ratio)}</dd>
            <dt>Price changes</dt><dd>{Math.round(38 * ratio)}</dd>
            <dt>Images updated</dt><dd>{Math.round(54 * ratio)}</dd>
          </dl>
          <button type="button" className="pl-panel-btn" onClick={run} disabled={running}>{running ? <>Syncing <Spinner /></> : "Run sync"}</button>
        </Panel>
      }
    />
  );
}
