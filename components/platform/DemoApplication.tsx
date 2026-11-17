"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import NewHeader from "@/components/NewHeader";
import { sitePath } from "@/lib/site-path";
import { Check } from "./Features";
import { PlatformFooter, SectionHead, useReveal } from "./shared";
import "./platform.css";
import "./features.css";
import "./demo.css";

const img = (file: string) => sitePath(`/platform/${file}`);

/* ---------- Data ---------- */

type Icon = "clinic" | "pharmacy" | "spa" | "telehealth" | "wellness" | "other";
const BUSINESS_TYPES: { value: string; icon: Icon; hint: string }[] = [
  { value: "Clinic", icon: "clinic", hint: "In-person care" },
  { value: "Pharmacy", icon: "pharmacy", hint: "Retail or compounding" },
  { value: "Med spa", icon: "spa", hint: "Aesthetics & wellness" },
  { value: "Telehealth practice", icon: "telehealth", hint: "Online-first care" },
  { value: "Wellness brand", icon: "wellness", hint: "Consumer health" },
  { value: "Other", icon: "other", hint: "Something else" },
];

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

/** Quick picks. Together they cover all 51 exactly once. */
const REGIONS: { name: string; states: string[] }[] = [
  { name: "Northeast", states: ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont"] },
  { name: "Southeast", states: ["Alabama", "Arkansas", "Delaware", "District of Columbia", "Florida", "Georgia", "Kentucky", "Louisiana", "Maryland", "Mississippi", "North Carolina", "South Carolina", "Tennessee", "Virginia", "West Virginia"] },
  { name: "Midwest", states: ["Illinois", "Indiana", "Iowa", "Kansas", "Michigan", "Minnesota", "Missouri", "Nebraska", "North Dakota", "Ohio", "South Dakota", "Wisconsin"] },
  { name: "Southwest", states: ["Arizona", "New Mexico", "Oklahoma", "Texas"] },
  { name: "West", states: ["Alaska", "California", "Colorado", "Hawaii", "Idaho", "Montana", "Nevada", "Oregon", "Utah", "Washington", "Wyoming"] },
];

/** Each area shows up in the preview as one of the platform's product shots.
 *  `closeup` crops a vial shot on black down to its white label so every tile reads light. */
const CARE_AREAS: { value: string; file?: string; product?: string; closeup?: boolean }[] = [
  { value: "Weight loss", file: "product-pen.png", product: "Weight care pen" },
  { value: "Men’s health", file: "product-pt141.png", product: "PT-141" },
  { value: "Women’s health", file: "product-oxytocin.png", product: "Oxytocin" },
  { value: "Hair and skin", file: "product-tretinoin.png", product: "Tretinoin cream" },
  { value: "Longevity", file: "product-nad.png", product: "NAD+ Injection", closeup: true },
  { value: "Hormones", file: "product-estradiol.png", product: "Estradiol patch" },
  { value: "General wellness", file: "product-b12.png", product: "Vitamin B12" },
  { value: "Other" },
];

const NOTES_LIMIT = 2000;
const CHIP_LIMIT = 8;

const STEPS = [
  { title: "Tell us about your business", body: "Who you are, where you serve clients and the care you want to offer." },
  { title: "We review your application", body: "Our team reviews every application and contacts you about next steps." },
  { title: "Launch your storefront", body: "Your brand and domain, with ScriptRx Pharmacy and the Provider app behind it." },
];

/* ---------- Form model ---------- */

type Values = { business: string; type: string; website: string; name: string; email: string; phone: string; states: string[]; care: string[]; notes: string };
type FieldKey = keyof Values;
type Errors = Partial<Record<FieldKey, string>>;

const EMPTY: Values = { business: "", type: "", website: "", name: "", email: "", phone: "", states: [], care: [], notes: "" };

/** Validation order doubles as focus order for the first invalid field. */
const FIELD_ORDER: FieldKey[] = ["business", "type", "website", "name", "email", "phone", "states", "care", "notes"];

/** One section per wizard step; `fields` is everything validated before moving on. */
const SECTIONS: { id: string; title: string; lead: string; required: FieldKey[]; fields: FieldKey[] }[] = [
  { id: "business", title: "Tell us about your business.", lead: "This is what patients will see on your storefront.", required: ["business", "type"], fields: ["business", "website", "type"] },
  { id: "contact", title: "How can we reach you?", lead: "Our team will use these to talk to you about your application.", required: ["name", "email", "phone"], fields: ["name", "email", "phone"] },
  { id: "care", title: "Where and what will you offer?", lead: "Choose the states you serve and the care you want on your storefront.", required: ["states", "care"], fields: ["states", "care", "notes"] },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WEBSITE_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

const phoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, "");
  // Autofill often supplies a leading country code.
  return (digits.length > 10 && digits.startsWith("1") ? digits.slice(1) : digits).slice(0, 10);
};

/** (555)-123-4567, built up as the digits arrive. */
function formatPhone(digits: string) {
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
  return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function nextPhone(previous: string, input: string) {
  let digits = phoneDigits(input);
  // Backspacing over a separator would otherwise be undone by the formatter.
  if (input.length < previous.length && digits === phoneDigits(previous)) digits = digits.slice(0, -1);
  return formatPhone(digits);
}

function fieldError(key: FieldKey, v: Values): string | undefined {
  switch (key) {
    case "business": return v.business.trim() ? undefined : "Enter your business name.";
    case "type": return v.type ? undefined : "Choose your type of business.";
    case "website":
      return !v.website.trim() || WEBSITE_RE.test(v.website.trim()) ? undefined : "Enter a valid website, like yourbusiness.com.";
    case "name": return v.name.trim() ? undefined : "Enter your full name.";
    case "email":
      if (!v.email.trim()) return "Enter your work email.";
      return EMAIL_RE.test(v.email.trim()) ? undefined : "Enter a valid email, like you@yourbusiness.com.";
    case "phone":
      if (!v.phone) return "Enter your phone number.";
      return phoneDigits(v.phone).length === 10 ? undefined : "Enter a 10-digit phone number.";
    case "states": return v.states.length ? undefined : "Select at least one state.";
    case "care": return v.care.length ? undefined : "Select at least one area of care.";
    case "notes": return v.notes.length <= NOTES_LIMIT ? undefined : `Keep this under ${NOTES_LIMIT.toLocaleString("en-US")} characters.`;
  }
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  FIELD_ORDER.forEach(key => {
    const message = fieldError(key, values);
    if (message) errors[key] = message;
  });
  return errors;
}

const toggle = (list: string[], item: string) => (list.includes(item) ? list.filter(entry => entry !== item) : [...list, item]);
const inStateOrder = (list: string[]) => STATES.filter(state => list.includes(state));

const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 28);

function storefrontUrl(values: Values) {
  const site = values.website.trim();
  if (site && WEBSITE_RE.test(site)) return site.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").toLowerCase();
  return `${slugify(values.business) || "your-brand"}.scriptrx.com`;
}

/* ---------- Small pieces ---------- */

function TypeIcon({ name }: { name: Icon }) {
  const paths: Record<Icon, ReactNode> = {
    clinic: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M12 9v6M9 12h6M9 5V3h6v2" /></>,
    pharmacy: <><rect x="3.5" y="9" width="17" height="6.5" rx="3.25" transform="rotate(-45 12 12.25)" /><path d="m9.2 9.4 5.6 5.6" /></>,
    spa: <><path d="M12 20c-4.4 0-8-3-8-7 2.8 0 5.6 1.4 8 4 2.4-2.6 5.2-4 8-4 0 4-3.6 7-8 7Z" /><path d="M12 17c-1.8-2.2-2.6-4.6-2-7.4.4-1.8 1.1-3.3 2-4.6.9 1.3 1.6 2.8 2 4.6.6 2.8-.2 5.2-2 7.4Z" /></>,
    telehealth: <><rect x="3" y="4.5" width="18" height="12" rx="2" /><path d="M8.5 20h7M12 16.5V20M12 8v5M9.5 10.5h5" /></>,
    wellness: <><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" /><path d="M5 19c3-4 6-6.5 9-8" /></>,
    other: <><circle cx="6" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="18" cy="12" r="1.3" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={back ? "is-back" : undefined}><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Search() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.5" /><path d="m10.25 10.25 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function Lock() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.3" /></svg>;
}

function Field({ id, label, required, optional, error, hint, full, children }: { id: string; label: string; required?: boolean; optional?: boolean; error?: string; hint?: ReactNode; full?: boolean; children: ReactNode }) {
  return (
    <div className={`pl-field pl-demo-field${full ? " is-full" : ""}${error ? " is-invalid" : ""}`}>
      <label className="pl-demo-label" htmlFor={id}>
        {label}
        {required && <span className="pl-demo-req" aria-hidden="true"> *</span>}
        {optional && <span className="pl-demo-opt"> (optional)</span>}
      </label>
      {children}
      {(error || hint) && (
        <div className="pl-demo-meta">
          {error ? <p className="pl-demo-error" id={`${id}-error`}>{error}</p> : <span />}
          {hint}
        </div>
      )}
    </div>
  );
}

function Section({ index, title, lead, children }: { index: number; title: string; lead: string; children: ReactNode }) {
  const headingId = `demo-section-${index}`;
  return (
    <section className="pl-demo-block" aria-labelledby={headingId}>
      <header className="pl-demo-block-head">
        <h3 id={headingId} tabIndex={-1}>{title}</h3>
        <p>{lead}</p>
      </header>
      <div className="pl-demo-block-body">{children}</div>
    </section>
  );
}

/* ---------- Live storefront preview ---------- */

function StorefrontPreview({ values, sent }: { values: Values; sent: boolean }) {
  const brand = values.business.trim() || "Your brand";
  const url = storefrontUrl(values);
  const products = CARE_AREAS.filter(area => area.file && values.care.includes(area.value));
  const stateCount = values.states.length;
  const reach = stateCount === 0 ? "Choose your states" : stateCount === STATES.length ? "Serving all 50 states + DC" : `Serving ${stateCount} ${stateCount === 1 ? "state" : "states"}`;
  const typeLine = values.type ? `${values.type} · Licensed prescribers` : "Licensed prescribers, nationwide";

  return (
    <div className="pl-window pl-demo-preview" role="img" aria-label={`Preview of the ${brand} storefront at ${url}`}>
      <div className="pl-window-chrome">
        <span className="pl-window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="pl-window-url">{sent && <Lock />}<b>{url}</b></span>
      </div>
      <div className="pl-window-body">
        <div className="pl-demo-site">
          <div className="pl-demo-site-nav">
            <strong className={values.business.trim() ? "" : "is-placeholder"} key={brand}>{brand}</strong>
            <span>Treatments</span><span>FAQs</span>
          </div>
          <div className="pl-demo-site-hero">
            <div className="pl-demo-site-copy">
              <span className={`pl-live-pill${sent ? " is-live" : ""}`}><i />{sent ? "In review" : "Preview"}</span>
              <p>Your health.<br />More in your hands.</p>
              <em className="pl-domain-cta">Get Started</em>
            </div>
            <div className="pl-demo-site-visual">
              <img src={img("hero-golden.png")} alt="" />
              <span className="pl-glass pl-demo-site-float"><b>{reach}</b><small>{typeLine}</small></span>
            </div>
          </div>
          <div className="pl-demo-site-products">
            <span className="pl-demo-site-label">Treatments</span>
            {products.length === 0 ? (
              <div className="pl-demo-site-empty">
                {[0, 1, 2].map(i => <span key={i}><i /><b /></span>)}
                <small>Pick areas of care to fill your shelf</small>
              </div>
            ) : (
              <div className="pl-demo-site-grid">
                {products.map(area => (
                  <span key={area.value} className={`pl-domain-product${area.closeup ? " is-closeup" : ""}`}>
                    <img src={img(area.file!)} alt="" />
                    <span><b>{area.product}</b><small>{area.value}</small></span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function DemoApplication() {
  const rootRef = useReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [step, setStep] = useState(0);
  const [attempted, setAttempted] = useState<boolean[]>([false, false, false]);
  const [sent, setSent] = useState(false);
  const [query, setQuery] = useState("");
  const [showAllChips, setShowAllChips] = useState(false);

  // A step's errors only surface after Next/Send was tried on it, then clear live as fields are fixed.
  const allErrors = validate(values);
  const errors: Errors = {};
  SECTIONS.forEach((section, index) => {
    if (attempted[index]) section.fields.forEach(key => { if (allErrors[key]) errors[key] = allErrors[key]; });
  });
  const errorCount = SECTIONS[step].fields.filter(key => errors[key]).length;
  const isLast = step === SECTIONS.length - 1;

  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? STATES.filter(state => state.toLowerCase().includes(q)) : STATES;
  }, [query]);
  const selectedStates = inStateOrder(values.states);
  const allSelected = values.states.length === STATES.length;
  const visibleChips = showAllChips ? selectedStates : selectedStates.slice(0, CHIP_LIMIT);

  const set = <K extends FieldKey>(key: K, value: Values[K]) => setValues(current => ({ ...current, [key]: value }));

  const describe = (id: string, key: FieldKey, extra?: string) => {
    const ids = [errors[key] ? `${id}-error` : "", extra ?? ""].filter(Boolean).join(" ");
    return { "aria-invalid": errors[key] ? true : undefined, "aria-describedby": ids || undefined };
  };

  function toggleRegion(region: string[]) {
    const all = region.every(state => values.states.includes(state));
    set("states", all ? values.states.filter(state => !region.includes(state)) : [...new Set([...values.states, ...region])]);
  }

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pendingFocus = useRef(false);

  function goTo(next: number) {
    pendingFocus.current = true;
    setStep(next);
  }

  // After a step change, bring the card top into view and land focus on the new step's heading.
  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    const card = formRef.current;
    if (!card) return;
    const top = card.getBoundingClientRect().top;
    if (top < 80) window.scrollTo({ top: window.scrollY + top - 110, behavior: reduceMotion() ? "auto" : "smooth" });
    card.querySelector<HTMLElement>(".pl-demo-block h3")?.focus({ preventScroll: true });
  }, [step]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Next and Send both run through here, so Enter in a field also advances.
    const firstInvalid = FIELD_ORDER.find(key => SECTIONS[step].fields.includes(key) && allErrors[key]);
    if (firstInvalid) {
      setAttempted(current => current.map((value, index) => (index === step ? true : value)));
      const target = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      target?.focus({ preventScroll: true });
      target?.closest(".pl-demo-field, .pl-demo-group")?.scrollIntoView({ block: "center", behavior: reduceMotion() ? "auto" : "smooth" });
      return;
    }
    if (!isLast) {
      goTo(step + 1);
      return;
    }
    // Earlier steps can't be invalid here (Next checks them), but guard anyway.
    const earlier = SECTIONS.findIndex(section => section.fields.some(key => allErrors[key]));
    if (earlier !== -1) {
      setAttempted(current => current.map((value, index) => (index === earlier ? true : value)));
      goTo(earlier);
      return;
    }
    // TODO: POST to applications endpoint. The site ships as a static export, so there is no backend yet.
    // Send `values` (phone as phoneDigits(values.phone)) and only show the success state once it resolves.
    setSent(true);
  };

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (!sent) return;
    const node = successRef.current;
    if (!node) return;
    node.focus({ preventScroll: true });
    window.scrollTo({ top: window.scrollY + node.getBoundingClientRect().top - 120, behavior: reduceMotion() ? "auto" : "smooth" });
  }, [sent]);

  const statesCountId = "demo-states-count";
  const notesCountId = "demo-notes-count";

  return (
    <main ref={rootRef} id="top" className="pl-home pl-demo">
      <NewHeader variant="platform" />

      <section className="pl-section is-soft pl-demo-section" aria-labelledby="demo-title">
        <div className="pl-shell pl-demo-shell">
          <SectionHead
            id="demo-title"
            eyebrow="Request a demo"
            title={<>Bring your business{" "}<br />to ScriptRx.</>}
            lead="It takes a few minutes. Our team reviews every application and will contact you about next steps."
          />
        </div>
        <div className="pl-shell pl-demo-layout">
          <div className="pl-demo-main" data-reveal>
            {sent ? (
              <div className="pl-panel pl-demo-card pl-demo-success" ref={successRef} tabIndex={-1} role="status" aria-labelledby="demo-success-title">
                <span className="pl-demo-success-mark" aria-hidden="true"><Check /></span>
                <h2 id="demo-success-title">Application sent.</h2>
                <p>Thanks, {values.name.trim().split(/\s+/)[0]}. Our team reviews every application and will contact you about next steps.</p>
                <dl className="pl-demo-summary">
                  <div><dt>Business</dt><dd>{values.business.trim()}</dd></div>
                  <div><dt>We’ll reach you at</dt><dd>{values.email.trim()}</dd></div>
                  <div><dt>States</dt><dd>{allSelected ? "All 50 + DC" : values.states.length}</dd></div>
                  <div><dt>Areas of care</dt><dd>{CARE_AREAS.filter(a => values.care.includes(a.value)).map(a => a.value).join(", ")}</dd></div>
                </dl>
                <ol className="pl-demo-next" aria-label="What happens next">
                  {STEPS.map((item, index) => (
                    <li key={item.title} className={index === 0 ? "is-done" : index === 1 ? "is-current" : ""}>
                      <span aria-hidden="true">{index === 0 ? <Check /> : index + 1}</span>
                      <b>{item.title}</b>
                    </li>
                  ))}
                </ol>
                <div className="pl-demo-success-actions">
                  <a className="pl-btn" href={sitePath("/")}>Back to homepage</a>
                  <a className="pl-btn is-outline-dark" href={sitePath("/categories")}>See the live storefront</a>
                </div>
              </div>
            ) : (
              <form ref={formRef} className="pl-panel pl-demo-card" onSubmit={onSubmit} noValidate aria-label="Your application">
                <div className="pl-demo-card-head">
                  <span className="pl-demo-count-pill" aria-live="polite">Step {step + 1} of {SECTIONS.length}</span>
                  <p>Fields marked <span aria-hidden="true">*</span><span className="pl-demo-sr">with an asterisk</span> are required.</p>
                </div>

                {step === 0 && (
                  <Section index={1} title={SECTIONS[0].title} lead={SECTIONS[0].lead}>
                    <div className="pl-demo-fields">
                      <Field id="demo-business" label="Business name" required error={errors.business}>
                        <input id="demo-business" data-field="business" type="text" name="business" autoComplete="organization" required maxLength={120} placeholder="Willow Health" value={values.business} onChange={e => set("business", e.target.value)} {...describe("demo-business", "business")} />
                      </Field>
                      <Field id="demo-website" label="Website" optional error={errors.website}>
                        <input id="demo-website" data-field="website" type="text" name="website" autoComplete="url" inputMode="url" autoCapitalize="none" spellCheck={false} maxLength={200} placeholder="yourbusiness.com" value={values.website} onChange={e => set("website", e.target.value)} {...describe("demo-website", "website")} />
                      </Field>
                    </div>
                    <fieldset className={`pl-demo-group${errors.type ? " is-invalid" : ""}`} aria-describedby={errors.type ? "demo-type-error" : undefined}>
                      <legend>Type of business<span className="pl-demo-req" aria-hidden="true"> *</span><span className="pl-demo-sr"> (required)</span></legend>
                      <div className="pl-demo-types">
                        {BUSINESS_TYPES.map((type, index) => (
                          <label key={type.value} className="pl-demo-type">
                            <input type="radio" name="type" value={type.value} data-field={index === 0 ? "type" : undefined} checked={values.type === type.value} onChange={() => set("type", type.value)} />
                            <span>
                              <span className="pl-demo-type-icon"><TypeIcon name={type.icon} /></span>
                              <b>{type.value}</b>
                              <small>{type.hint}</small>
                              <i className="pl-demo-type-check" aria-hidden="true"><Check /></i>
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.type && <p className="pl-demo-error" id="demo-type-error">{errors.type}</p>}
                    </fieldset>
                  </Section>
                )}

                {step === 1 && (
                  <Section index={2} title={SECTIONS[1].title} lead={SECTIONS[1].lead}>
                    <div className="pl-demo-fields is-three">
                      <Field id="demo-name" label="Your full name" required error={errors.name}>
                        <input id="demo-name" data-field="name" type="text" name="name" autoComplete="name" required maxLength={120} value={values.name} onChange={e => set("name", e.target.value)} {...describe("demo-name", "name")} />
                      </Field>
                      <Field id="demo-email" label="Work email" required error={errors.email}>
                        <input id="demo-email" data-field="email" type="email" name="email" autoComplete="email" inputMode="email" required maxLength={254} placeholder="you@yourbusiness.com" value={values.email} onChange={e => set("email", e.target.value)} {...describe("demo-email", "email")} />
                      </Field>
                      <Field id="demo-phone" label="Phone number" required error={errors.phone}>
                        <input id="demo-phone" data-field="phone" type="tel" name="phone" autoComplete="tel-national" inputMode="tel" required placeholder="(555)-123-4567" value={values.phone} onChange={e => set("phone", nextPhone(values.phone, e.target.value))} {...describe("demo-phone", "phone")} />
                      </Field>
                    </div>
                  </Section>
                )}

                {step === 2 && (
                  <Section index={3} title={SECTIONS[2].title} lead={SECTIONS[2].lead}>
                    <fieldset className={`pl-demo-group${errors.states ? " is-invalid" : ""}`} aria-describedby={[errors.states ? "demo-states-error" : "", statesCountId].filter(Boolean).join(" ")}>
                      <legend>States where you serve clients<span className="pl-demo-req" aria-hidden="true"> *</span><span className="pl-demo-sr"> (required)</span></legend>
                      <div className="pl-demo-group-tools">
                        <span id={statesCountId} aria-live="polite">{values.states.length} of {STATES.length} selected</span>
                        <button type="button" className="pl-panel-link" onClick={() => set("states", [])} disabled={values.states.length === 0}>Clear</button>
                      </div>

                      <div className="pl-demo-regions" role="group" aria-label="Quick select by region">
                        <button type="button" className={`pl-demo-region${allSelected ? " is-on" : ""}`} aria-pressed={allSelected} onClick={() => set("states", allSelected ? [] : [...STATES])}>All 51</button>
                        {REGIONS.map(region => {
                          const on = region.states.every(state => values.states.includes(state));
                          const some = !on && region.states.some(state => values.states.includes(state));
                          return (
                            <button key={region.name} type="button" className={`pl-demo-region${on ? " is-on" : some ? " is-some" : ""}`} aria-pressed={on} onClick={() => toggleRegion(region.states)}>
                              {region.name}<small>{region.states.length}</small>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pl-demo-picker">
                        <label className="pl-demo-search">
                          <Search />
                          <span className="pl-demo-sr">Search states</span>
                          <input type="search" data-field="states" placeholder="Search states" value={query} onChange={e => setQuery(e.target.value)} autoComplete="off" />
                        </label>
                        <div className="pl-demo-states">
                          {filteredStates.length === 0 && <p className="pl-demo-states-empty">No state matches “{query}”.</p>}
                          {filteredStates.map(state => (
                            <label key={state} className="pl-demo-check">
                              <input type="checkbox" name="states" value={state} checked={values.states.includes(state)} onChange={() => set("states", toggle(values.states, state))} />
                              <span>{state}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {selectedStates.length > 0 && (
                        <div className="pl-demo-chips" aria-label="Selected states">
                          {allSelected ? (
                            <span className="pl-demo-chip">All 50 states + DC<button type="button" onClick={() => set("states", [])} aria-label="Remove all states">×</button></span>
                          ) : (
                            <>
                              {visibleChips.map(state => (
                                <span key={state} className="pl-demo-chip">{state}<button type="button" onClick={() => set("states", values.states.filter(s => s !== state))} aria-label={`Remove ${state}`}>×</button></span>
                              ))}
                              {selectedStates.length > CHIP_LIMIT && (
                                <button type="button" className="pl-panel-link pl-demo-chips-more" onClick={() => setShowAllChips(v => !v)}>
                                  {showAllChips ? "Show less" : `+${selectedStates.length - CHIP_LIMIT} more`}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      )}
                      {errors.states && <p className="pl-demo-error" id="demo-states-error">{errors.states}</p>}
                    </fieldset>

                    <fieldset className={`pl-demo-group${errors.care ? " is-invalid" : ""}`} aria-describedby={errors.care ? "demo-care-error" : undefined}>
                      <legend>Areas of care you want to offer<span className="pl-demo-req" aria-hidden="true"> *</span><span className="pl-demo-sr"> (required)</span></legend>
                      <div className="pl-demo-group-tools"><span>Choose all that apply. Each one appears on your storefront preview.</span></div>
                      <div className="pl-demo-care">
                        {CARE_AREAS.map((area, index) => (
                          <label key={area.value} className="pl-demo-care-tile">
                            <input type="checkbox" name="care" value={area.value} data-field={index === 0 ? "care" : undefined} checked={values.care.includes(area.value)} onChange={() => set("care", toggle(values.care, area.value))} />
                            <span>
                              <span className={`pl-demo-care-img${area.closeup ? " is-closeup" : ""}`}>{area.file ? <img src={img(area.file)} alt="" /> : <TypeIcon name="other" />}</span>
                              <b>{area.value}</b>
                              <i className="pl-demo-type-check" aria-hidden="true"><Check /></i>
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.care && <p className="pl-demo-error" id="demo-care-error">{errors.care}</p>}
                    </fieldset>

                    <Field
                      id="demo-notes"
                      label="Anything else we should know"
                      optional
                      full
                      error={errors.notes}
                      hint={<span className="pl-demo-count" id={notesCountId}><span aria-hidden="true">{values.notes.length.toLocaleString("en-US")} / {NOTES_LIMIT.toLocaleString("en-US")}</span><span className="pl-demo-sr">{values.notes.length} of {NOTES_LIMIT} characters used</span></span>}
                    >
                      <textarea id="demo-notes" data-field="notes" name="notes" rows={4} maxLength={NOTES_LIMIT} placeholder="Your locations, the clients you serve, when you’d like to launch." value={values.notes} onChange={e => set("notes", e.target.value)} {...describe("demo-notes", "notes", notesCountId)} />
                    </Field>
                  </Section>
                )}

                <div className="pl-demo-submit">
                  {step > 0 && <button type="button" className="pl-demo-back" onClick={() => goTo(step - 1)}><Arrow back />Back</button>}
                  <button type="submit" className="pl-btn pl-demo-send">{isLast ? "Send application" : "Continue"}<Arrow /></button>
                  <p className="pl-demo-submit-note" role="alert">
                    {errorCount > 0 ? <span className="pl-demo-error">{errorCount === 1 ? "1 field needs your attention." : `${errorCount} fields need your attention.`}</span> : null}
                  </p>
                  {errorCount === 0 && (isLast
                    ? <p className="pl-demo-submit-note">Our team reviews every application.</p>
                    : <p className="pl-demo-hint" aria-hidden="true">or press <kbd>Enter ↵</kbd></p>)}
                </div>
              </form>
            )}
          </div>

          <aside className="pl-demo-side" aria-label="Live storefront preview" data-reveal style={{ "--d": ".12s" } as CSSProperties}>
            <div className="pl-demo-side-head">
              <b>{sent ? "Your storefront, in review" : "Your storefront, live as you type"}</b>
              <span className="pl-chip">Preview</span>
            </div>
            <StorefrontPreview values={values} sent={sent} />
          </aside>
        </div>
      </section>

      <div className="pl-closing pl-demo-closing">
        <PlatformFooter />
      </div>
    </main>
  );
}
