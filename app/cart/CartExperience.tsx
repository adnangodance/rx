"use client";

import { useEffect, useMemo, useState } from "react";
import ClassicHeader from "@/components/ClassicHeader";
import type { Product } from "@/components/CatalogSection";
import VersionBar, { DEFAULT_SITE_VERSION, isClassicVersion, resolveSiteVersion, type SiteVersion } from "@/components/VersionBar";
import { sitePath } from "@/lib/site-path";
import "./NewOrder.css";

const fallbackProduct: Product = {
  name: "Your treatment",
  price: "$39/mo",
  detail: "Personalized care",
  type: "disc",
  image: "/product-tablet.png",
};

function CompletedRequirement({ title, description }: { title: string; description: string }) {
  return <div className="new-order-completed-row">
    <span className="new-order-completed-icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3 3 7-7" /></svg></span>
    <div><b>{title}</b><p>{description}</p></div>
    <span className="new-order-completed-status">Complete</span>
  </div>;
}

function OrderHeader({ cartCount, theme }: { cartCount: number; theme: SiteVersion }) {
  if (isClassicVersion(theme)) return <ClassicHeader cartCount={cartCount} theme={theme} />;

  return (
    <>
      <div className="order-announcement">New: personalized weight care</div>
      <header className="order-site-nav">
        <a className="order-site-logo" href={sitePath("/")}>
          Scriptrx
        </a>
        <nav><a href={sitePath("/#care")}>Women&apos;s Health</a><a href={sitePath("/#care")}>Weight Management</a><a href={sitePath("/#care")}>Longevity</a></nav>
        <div>
          {cartCount > 0 && <a className="order-header-cart" href={sitePath("/cart")} aria-label={`Cart with ${cartCount} item`}><img className="cart-icon-image" src={sitePath("/cart-icon.svg")} alt="" /><b>{cartCount}</b></a>}
          <a className="order-header-account" href={sitePath("/")}>My Account</a>
        </div>
      </header>
    </>
  );
}

function EligibilityAssessment({ product, theme, onThemeChange, onCancel, onComplete }: { product: Product; theme: SiteVersion; onThemeChange: (theme: SiteVersion) => void; onCancel: () => void; onComplete: () => void }) {
  const questions = [
    `Have you ever had an allergic or adverse reaction to ${product.name} or any of its ingredients?`,
    "Have you ever had an allergic or adverse reaction to a similar medication or treatment?",
    "Do you have any significant medical conditions that your provider should review before treatment?",
    "Are you currently pregnant, trying to become pregnant, or breastfeeding?",
    "Are you currently taking prescription medications, supplements, or other treatments?",
    "Is the health information you have provided accurate and complete to the best of your knowledge?",
  ];
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [activeQuestion, setActiveQuestion] = useState(0);
  const answeredCount = answers.filter(Boolean).length;
  const complete = answeredCount === questions.length;

  function answerQuestion(questionIndex: number, answer: string) {
    setAnswers((current) => {
      if (current[questionIndex] === answer) return current;
      const next = [...current];
      next[questionIndex] = answer;
      for (let index = questionIndex + 1; index < next.length; index += 1) next[index] = "";
      return next;
    });
    setActiveQuestion(Math.min(questionIndex + 1, questions.length - 1));
  }

  return (
    <main className={`assessment-page assessment-theme-${isClassicVersion(theme) ? "v1" : theme}${theme === "v6" ? " eligibility-new theme-new" : ""}`}>
      <VersionBar version={theme} onChange={onThemeChange} />
      <div className="assessment-shell">
        <header className="assessment-header">
          <button type="button" onClick={onCancel} aria-label="Back to order">←</button>
          <div><h1>{product.name} pre-assessment</h1></div>
          <button type="button" className="assessment-cancel" onClick={onCancel}>Cancel</button>
        </header>

        <div className="assessment-progress">
          <div role="progressbar" aria-label="Assessment questions answered" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answeredCount}><span style={{ width: `${(answeredCount / questions.length) * 100}%` }} /></div>
          <p><span>{answeredCount} of {questions.length} answered</span><b>Eligibility</b></p>
        </div>

        <div className="assessment-section-title"><span />ASSESSMENT<span /></div>
        <p className="assessment-intro">Answer these questions honestly so a licensed provider can determine whether this treatment may be appropriate for you.</p>

        <section className="assessment-questions">
          {questions.map((question, index) => {
            const answered = Boolean(answers[index]);
            const active = activeQuestion === index;
            const locked = index > answeredCount;
            const showAnswers = theme === "v6" ? !locked : active;
            return (
              <article className={`assessment-question ${active ? "active" : ""} ${answered ? "answered" : ""} ${locked ? "locked" : ""}`} key={question}>
                {theme === "v6" ? <div className="assessment-question-head">
                  <i aria-hidden="true">{answered ? "✓" : index + 1}</i>
                  <span><b id={`assessment-question-${index}`}>{question}<em>*</em></b></span>
                </div> : <button className="assessment-question-head" type="button" disabled={locked} aria-expanded={active} aria-controls={active ? `assessment-answers-${index}` : undefined} onClick={() => !locked && setActiveQuestion(index)}>
                  <i>{answered ? "✓" : index + 1}</i>
                  <span><b id={`assessment-question-${index}`}>{question}<em>*</em></b>{answered && !active && <small>{answers[index]}</small>}</span>
                  <strong>{active ? "⌃" : "⌄"}</strong>
                </button>}
                {showAnswers && (
                  <div className="assessment-answers" id={`assessment-answers-${index}`} role="group" aria-labelledby={`assessment-question-${index}`}>
                    {["Yes", "No"].map((answer) => (
                      <button type="button" key={answer} aria-pressed={answers[index] === answer} className={answers[index] === answer ? "selected" : ""} onClick={() => answerQuestion(index, answer)}>
                        {theme === "v6" && <span className="new-review-choice-mark" aria-hidden="true">{answers[index] === answer && <svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3 3 7-7" /></svg>}</span>}
                        {answer}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <button className="assessment-complete" type="button" disabled={!complete} onClick={onComplete}>
          {complete ? "Complete eligibility assessment" : `Answer ${questions.length - answeredCount} more question${questions.length - answeredCount === 1 ? "" : "s"}`}
        </button>
        <p className="assessment-disclaimer">Your answers are reviewed by a licensed healthcare provider. Completing this form does not guarantee treatment.</p>
      </div>
    </main>
  );
}

function MedicalConsent({ theme, onThemeChange, onCancel, onComplete }: { theme: SiteVersion; onThemeChange: (theme: SiteVersion) => void; onCancel: () => void; onComplete: () => void }) {
  const questions = [
    "Congestive heart failure?",
    "Severe renal impairment?",
    "Heart attack or stroke?",
    "Sodium retention or electrolyte imbalance?",
  ];
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [step, setStep] = useState<"conditions" | "terms">("terms");
  const [agreed, setAgreed] = useState(false);
  const complete = answers.every(Boolean);
  const answeredCount = answers.filter(Boolean).length;

  if (step === "terms") {
    return (
      <main className={`assessment-page medical-consent-page assessment-theme-${isClassicVersion(theme) ? "v1" : theme}${theme === "v6" ? " medical-consent-new theme-new" : ""}`}>
        <VersionBar version={theme} onChange={onThemeChange} />
        <div className="assessment-shell consent-shell">
          <header className="assessment-header">
            <button type="button" onClick={onCancel} aria-label="Back to order">←</button>
            <div><h1>Medical Consent</h1></div>
            <button type="button" className="assessment-cancel" onClick={onCancel}>Cancel</button>
          </header>

          <div className="assessment-section-title consent-section-title"><span />PLEASE READ TERMS AND CONDITIONS<span /></div>
          <p className="assessment-intro">Please read the following terms and conditions.</p>

          <article className="consent-terms">
            <h2>Please read the following carefully.</h2>
            <p>ScriptRx provides access to licensed healthcare professionals who review the health information you submit. Completing an intake or consent form does not guarantee a diagnosis, prescription, or treatment.</p>
            <p>I understand that:</p>
            <ul>
              <li>Treatment may involve prescription medication or self-administered therapy selected by a licensed provider.</li>
              <li>All treatments may involve short- and long-term risks, side effects, benefits, and alternatives.</li>
              <li>I have provided complete and accurate information about my health, medications, allergies, and prior reactions.</li>
              <li>I may ask questions and receive information about any recommended treatment before deciding whether to proceed.</li>
              <li>I authorize electronic communication, documentation, and signatures related to my care.</li>
            </ul>
            <p>By electronically signing this consent, I confirm that I have reviewed the information above, understand it, and consent to receive care through ScriptRx when a licensed provider determines treatment is clinically appropriate.</p>
          </article>

          <label className="consent-confirm">
            <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
            <span>Do you give your consent to the above?</span>
          </label>
          <button className="assessment-complete consent-save" type="button" disabled={!agreed} onClick={() => setStep("conditions")}>Save</button>
        </div>
      </main>
    );
  }

  return (
    <main className={`assessment-page medical-consent-page assessment-theme-${isClassicVersion(theme) ? "v1" : theme}${theme === "v6" ? " medical-consent-new theme-new" : ""}`}>
      <VersionBar version={theme} onChange={onThemeChange} />
      <div className="assessment-shell consent-shell">
        <header className="assessment-header">
          <button type="button" onClick={() => setStep("terms")} aria-label="Back to terms and conditions">←</button>
          <div><h1>Medical Consent</h1></div>
          <button type="button" className="assessment-cancel" onClick={onCancel}>Cancel</button>
        </header>

        <div className="assessment-section-title consent-section-title"><span />DO YOU HAVE ANY OF THE FOLLOWING MEDICAL CONDITIONS?<span /></div>
        <p className="assessment-intro">Answer the following questions.</p>
        {theme === "v6" && <div className="new-review-progress"><span>{answeredCount} of {questions.length} answered</span><div role="progressbar" aria-label="Medical consent questions answered" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answeredCount}><i style={{ width: `${answeredCount / questions.length * 100}%` }} /></div></div>}

        <section className="consent-questions">
          {questions.map((question, index) => (
            <article className={`consent-question ${answers[index] ? "answered" : ""}`} key={question}>
              <div className="consent-question-head"><i>{answers[index] ? "✓" : index + 1}</i><h2 id={`consent-condition-${index}`}>{question}</h2></div>
              <div className="consent-question-answers" role="group" aria-labelledby={`consent-condition-${index}`}>
                {["Yes", "No"].map((answer) => (
                  <button
                    type="button"
                    className={answers[index] === answer ? "selected" : ""}
                    aria-pressed={answers[index] === answer}
                    onClick={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? answer : value))}
                    key={answer}
                  >
                    {theme === "v6" && <span className="new-review-choice-mark" aria-hidden="true">{answers[index] === answer && <svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3 3 7-7" /></svg>}</span>}{answer}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>

        <button className="assessment-complete consent-save" type="button" disabled={!complete} onClick={onComplete}>Save</button>
      </div>
    </main>
  );
}

function ProviderReview({ product, theme, onThemeChange, onCancel, onComplete }: { product: Product; theme: SiteVersion; onThemeChange: (theme: SiteVersion) => void; onCancel: () => void; onComplete: () => void }) {
  const preferences = [
    { label: "How would you prefer to meet?", options: ["Video visit", "Phone call"] },
    { label: "What time usually works best?", options: ["Morning", "Afternoon"] },
    { label: "May your provider contact you about this treatment?", options: ["Yes", "No"] },
  ];
  const [answers, setAnswers] = useState<string[]>(Array(preferences.length).fill(""));
  const complete = answers.every(Boolean);
  const answeredCount = answers.filter(Boolean).length;

  return (
    <main className={`assessment-page provider-review-page assessment-theme-${isClassicVersion(theme) ? "v1" : theme}${theme === "v6" ? " provider-review-new theme-new" : ""}`}>
      <VersionBar version={theme} onChange={onThemeChange} />
      <div className="assessment-shell consent-shell">
        <header className="assessment-header">
          <button type="button" onClick={onCancel} aria-label="Back to order">←</button>
          <div><h1>Provider Review</h1></div>
          <button type="button" className="assessment-cancel" onClick={onCancel}>Cancel</button>
        </header>

        <div className="assessment-section-title consent-section-title"><span />CONSULTATION PREFERENCES<span /></div>
        <p className="assessment-intro">Tell us how you would like to connect with a licensed provider about {product.name}.</p>
        {theme === "v6" && <div className="new-review-progress"><span>{answeredCount} of 3 preferences selected</span><div role="progressbar" aria-label="Consultation preferences selected" aria-valuemin={0} aria-valuemax={3} aria-valuenow={answeredCount}><i style={{ width: `${answeredCount / 3 * 100}%` }} /></div></div>}

        <section className="consent-questions">
          {preferences.map((preference, index) => (
            <article className={`consent-question ${answers[index] ? "answered" : ""}`} key={preference.label}>
              <div className="consent-question-head"><i>{answers[index] ? "✓" : index + 1}</i><h2 id={`provider-preference-${index}`}>{preference.label}</h2></div>
              <div className="consent-question-answers" role="group" aria-labelledby={`provider-preference-${index}`}>
                {preference.options.map((answer) => (
                  <button
                    type="button"
                    className={answers[index] === answer ? "selected" : ""}
                    aria-pressed={answers[index] === answer}
                    onClick={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? answer : value))}
                    key={answer}
                  >
                    {theme === "v6" && <span className="new-review-choice-mark" aria-hidden="true">{answers[index] === answer && <svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3 3 7-7" /></svg>}</span>}{answer}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>

        <div className="provider-review-note"><i>i</i><p>A licensed provider will review your health information. Your preferences help us coordinate care but do not guarantee a specific appointment time or treatment.</p></div>
        <button className="assessment-complete consent-save" type="button" disabled={!complete} onClick={onComplete}>Submit for provider review</button>
      </div>
    </main>
  );
}

export default function CartExperience() {
  const [product, setProduct] = useState<Product>(fallbackProduct);
  const [theme, setTheme] = useState<SiteVersion>(DEFAULT_SITE_VERSION);
  const [eligible, setEligible] = useState(false);
  const [providerReviewed, setProviderReviewed] = useState(false);
  const [consented, setConsented] = useState(false);
  const [hasProduct, setHasProduct] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showProviderReview, setShowProviderReview] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("scriptrx-cart-product") || "null");
      if (saved?.name && saved?.price) {
        setProduct(saved);
        setHasProduct(true);
      }
    } catch {
      setHasProduct(false);
    }
    const savedTheme = localStorage.getItem("scriptrx-theme");
    setTheme(resolveSiteVersion(savedTheme));
  }, []);

  const pricing = useMemo(() => {
    const medication = Number(product.price.match(/\d+(?:\.\d+)?/)?.[0] || 0);
    const consult = 40;
    const shipping = 15;
    const subtotal = consult + medication;
    const platform = Number((subtotal * 0.048).toFixed(2));
    return { medication, consult, shipping, subtotal, platform, total: subtotal + shipping + platform };
  }, [product.price]);

  function removeProduct() {
    localStorage.removeItem("scriptrx-cart-product");
    localStorage.setItem("scriptrx-cart-products", "[]");
    window.location.href = sitePath("/#care");
  }

  if (!hasProduct) {
    return (
      <main className={`order-page order-theme-${isClassicVersion(theme) ? "v1" : theme}${theme === "v6" ? " order-theme-new theme-new" : ""}`}>
        <VersionBar version={theme} onChange={(nextTheme) => { setTheme(nextTheme); localStorage.setItem("scriptrx-theme", nextTheme); }} />
        <OrderHeader cartCount={0} theme={theme} />
        <section className="empty-cart">
          <span>YOUR CART</span>
          <h1>Nothing here yet.</h1>
          <p>Choose one treatment to begin your order.</p>
          <a href={sitePath("/#care")}>Explore products</a>
        </section>
      </main>
    );
  }

  const ready = eligible && providerReviewed && consented;
  const completedSteps = Number(eligible) + Number(providerReviewed) + Number(consented);
  const chooseTheme = (nextTheme: SiteVersion) => {
    setTheme(nextTheme);
    localStorage.setItem("scriptrx-theme", nextTheme);
  };

  if (showAssessment) {
    return <EligibilityAssessment product={product} theme={theme} onThemeChange={chooseTheme} onCancel={() => setShowAssessment(false)} onComplete={() => { setEligible(true); setShowAssessment(false); }} />;
  }

  if (showConsent) {
    return <MedicalConsent theme={theme} onThemeChange={chooseTheme} onCancel={() => setShowConsent(false)} onComplete={() => { setConsented(true); setShowConsent(false); }} />;
  }

  if (showProviderReview) {
    return <ProviderReview product={product} theme={theme} onThemeChange={chooseTheme} onCancel={() => setShowProviderReview(false)} onComplete={() => { setProviderReviewed(true); setShowProviderReview(false); }} />;
  }

  return (
    <main className={`order-page order-theme-${isClassicVersion(theme) ? "v1" : theme}${theme === "v6" ? " order-theme-new theme-new" : ""}`}>
      <VersionBar version={theme} onChange={(nextTheme) => { setTheme(nextTheme); localStorage.setItem("scriptrx-theme", nextTheme); }} />
      <OrderHeader cartCount={1} theme={theme} />
      <div className="order-shell">
        <nav className="order-breadcrumb" aria-label="Breadcrumb">
          <a href={sitePath("/")}>Home</a><span>›</span><a href={sitePath("/#care")}>Products</a><span>›</span><strong>Order requirements</strong>
        </nav>
        <div className="order-heading">
          <div><h1>Order requirements</h1>{theme === "v6" && <p>{ready ? "Everything is complete. You can now continue to checkout." : "Complete these steps before checkout."}</p>}</div>
          {theme === "v6" && <div className="new-order-progress"><span>{completedSteps} of 3 complete</span><div role="progressbar" aria-label="Order requirements completed" aria-valuemin={0} aria-valuemax={3} aria-valuenow={completedSteps}><i style={{ width: `${completedSteps / 3 * 100}%` }} /></div></div>}
        </div>

        <div className="order-grid">
          <section className="requirements-column">
            <article className="requirement-card product-requirement">
              <div className="requirement-product">
                <div className="order-product-art"><img src={sitePath(product.image)} alt={product.name} /></div>
                <div><span className={ready ? "complete" : ""}>{ready ? "Ready" : "Incomplete"}</span><h2>{product.name}</h2><p>{product.detail}</p></div>
                <button type="button" onClick={removeProduct}>Remove</button>
              </div>

              {theme === "v6" && ready ? <section className="new-order-completed-summary" aria-labelledby="new-order-ready-title">
                <div className="new-order-ready-heading"><h3 id="new-order-ready-title">Ready for checkout</h3><p>All three order requirements are complete.</p></div>
                <ul>
                  <li><CompletedRequirement title="Eligibility confirmed" description="Health questions completed." /></li>
                  <li><CompletedRequirement title="Review requested" description="Consultation preferences saved." /></li>
                  <li><CompletedRequirement title="Medical consent" description="Consent completed." /></li>
                </ul>
              </section> : <>
              {theme === "v6" && eligible ? <CompletedRequirement title="Eligibility confirmed" description="Health questions completed." /> : <button className={`requirement-step ${eligible ? "done" : ""}`} type="button" onClick={() => eligible ? undefined : setShowAssessment(true)}>
                <i>{eligible ? "✓" : "1"}</i><span><b>{eligible ? "Eligibility confirmed" : "Check eligibility"}</b><small>Answer a few private health questions</small></span><strong>{eligible ? "Completed" : "Answer"}</strong>
              </button>}
              {theme === "v6" && providerReviewed ? <CompletedRequirement title="Review requested" description="Consultation preferences saved." /> : <button
                className={`requirement-step muted ${eligible ? "available" : ""} ${providerReviewed ? "done" : ""}`}
                type="button"
                disabled={!eligible}
                onClick={() => eligible && !providerReviewed ? setShowProviderReview(true) : undefined}
              >
                <i>{providerReviewed ? "✓" : "2"}</i><span><b>{providerReviewed ? "Review requested" : "Provider review"}</b><small>{eligible ? "Choose your consultation preferences" : "Available after eligibility"}</small></span><strong>{providerReviewed ? "Completed" : "Answer"}</strong>
              </button>}
              </>}
            </article>

            {theme === "v6" && ready ? null : theme === "v6" && consented ? <article className="new-order-completed-consent"><CompletedRequirement title="Medical consent" description="Consent completed." /></article> : <article className={`consent-card ${consented ? "done" : ""}`}>
              <div><i>{consented ? "✓" : theme === "v6" ? "3" : "!"}</i><span><b>Medical consent</b><small>Required before checkout</small></span></div>
              <button type="button" onClick={() => consented ? undefined : setShowConsent(true)}>{consented ? "Completed" : "Review & sign"}</button>
            </article>}
          </section>

          <aside className="summary-column">
            <article className="price-card">
              <span>PRICE SUMMARY</span>
              <h2>{product.name}</h2>
              <div className="price-list">
                <p><span>Online consultation</span><b>${pricing.consult.toFixed(2)}</b></p>
                <p><span>Medication</span><b>${pricing.medication.toFixed(2)}</b></p>
                <p><span>Shipping</span><b>${pricing.shipping.toFixed(2)}</b></p>
              </div>
              <div className="price-subtotal"><p><span>Subtotal</span><b>${pricing.subtotal.toFixed(2)}</b></p><p><span>Platform fee</span><b>${pricing.platform.toFixed(2)}</b></p></div>
              <div className="price-total"><span>Total today</span><b>${pricing.total.toFixed(2)}</b></div>
              <div className="billing-note"><i>i</i><p>Your statement will show <b>SCRIPTRX HEALTH</b> for this transaction.</p></div>
            </article>

            <div className="policy-links"><a href="#">Shipping policy</a><a href="#">Return policy</a></div>
            <button className="checkout-button" type="button" disabled={!ready}>
              ${pricing.total.toFixed(2)} · Proceed to checkout
            </button>
            {theme === "v6" && !ready && <p className="new-order-checkout-note">Complete all three requirements to continue.</p>}
          </aside>
        </div>
      </div>
    </main>
  );
}
