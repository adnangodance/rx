"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/components/CatalogSection";
import { sitePath } from "@/lib/site-path";

const fallbackProduct: Product = {
  name: "Your treatment",
  price: "$39/mo",
  detail: "Personalized care",
  type: "disc",
  image: "/product-tablet.png",
};

function OrderHeader({ cartCount }: { cartCount: number }) {
  return (
    <>
      <div className="order-announcement">New: personalized weight care</div>
      <header className="order-site-nav">
        <a className="order-site-logo" href={sitePath("/")}>Scriptrx</a>
        <nav><a href={sitePath("/#care")}>Women&apos;s Health</a><a href={sitePath("/#care")}>Weight Management</a><a href={sitePath("/#care")}>Longevity</a></nav>
        <div>
          {cartCount > 0 && <a className="order-header-cart" href={sitePath("/cart")} aria-label={`Cart with ${cartCount} item`}><img className="cart-icon-image" src={sitePath("/cart-icon.svg")} alt="" /><b>{cartCount}</b></a>}
          <a className="order-header-account" href={sitePath("/")}>My Account</a>
        </div>
      </header>
    </>
  );
}

function EligibilityAssessment({ product, theme, onCancel, onComplete }: { product: Product; theme: "v1" | "v2" | "v3" | "v4"; onCancel: () => void; onComplete: () => void }) {
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

  function answerQuestion(answer: string) {
    setAnswers((current) => {
      const next = [...current];
      next[activeQuestion] = answer;
      for (let index = activeQuestion + 1; index < next.length; index += 1) next[index] = "";
      return next;
    });
    if (activeQuestion < questions.length - 1) setActiveQuestion(activeQuestion + 1);
  }

  return (
    <main className={`assessment-page assessment-theme-${theme}`}>
      <div className="assessment-shell">
        <header className="assessment-header">
          <button type="button" onClick={onCancel} aria-label="Back to order">←</button>
          <div><h1>{product.name} pre-assessment</h1></div>
          <button type="button" className="assessment-cancel" onClick={onCancel}>Cancel</button>
        </header>

        <div className="assessment-progress">
          <div><span style={{ width: `${(answeredCount / questions.length) * 100}%` }} /></div>
          <p><span>{answeredCount} of {questions.length} answered</span><b>Eligibility</b></p>
        </div>

        <div className="assessment-section-title"><span />ASSESSMENT<span /></div>
        <p className="assessment-intro">Answer these questions honestly so a licensed provider can determine whether this treatment may be appropriate for you.</p>

        <section className="assessment-questions">
          {questions.map((question, index) => {
            const answered = Boolean(answers[index]);
            const active = activeQuestion === index;
            const locked = index > answeredCount;
            return (
              <article className={`assessment-question ${active ? "active" : ""} ${answered ? "answered" : ""} ${locked ? "locked" : ""}`} key={question}>
                <button className="assessment-question-head" type="button" disabled={locked} onClick={() => !locked && setActiveQuestion(index)}>
                  <i>{answered ? "✓" : index + 1}</i>
                  <span><b>{question}<em>*</em></b>{answered && !active && <small>{answers[index]}</small>}</span>
                  <strong>{active ? "⌃" : "⌄"}</strong>
                </button>
                {active && (
                  <div className="assessment-answers">
                    <button type="button" className={answers[index] === "Yes" ? "selected" : ""} onClick={() => answerQuestion("Yes")}>Yes</button>
                    <button type="button" className={answers[index] === "No" ? "selected" : ""} onClick={() => answerQuestion("No")}>No</button>
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

function MedicalConsent({ theme, onCancel, onComplete }: { theme: "v1" | "v2" | "v3" | "v4"; onCancel: () => void; onComplete: () => void }) {
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

  if (step === "terms") {
    return (
      <main className={`assessment-page medical-consent-page assessment-theme-${theme}`}>
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
    <main className={`assessment-page medical-consent-page assessment-theme-${theme}`}>
      <div className="assessment-shell consent-shell">
        <header className="assessment-header">
          <button type="button" onClick={() => setStep("terms")} aria-label="Back to terms and conditions">←</button>
          <div><h1>Medical Consent</h1></div>
          <button type="button" className="assessment-cancel" onClick={onCancel}>Cancel</button>
        </header>

        <div className="assessment-section-title consent-section-title"><span />DO YOU HAVE ANY OF THE FOLLOWING MEDICAL CONDITIONS?<span /></div>
        <p className="assessment-intro">Answer the following questions.</p>

        <section className="consent-questions">
          {questions.map((question, index) => (
            <article className={`consent-question ${answers[index] ? "answered" : ""}`} key={question}>
              <div className="consent-question-head"><i>{answers[index] ? "✓" : index + 1}</i><h2>{question}</h2></div>
              <div className="consent-question-answers">
                {["Yes", "No"].map((answer) => (
                  <button
                    type="button"
                    className={answers[index] === answer ? "selected" : ""}
                    onClick={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? answer : value))}
                    key={answer}
                  >
                    {answer}
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

function ProviderReview({ product, theme, onCancel, onComplete }: { product: Product; theme: "v1" | "v2" | "v3" | "v4"; onCancel: () => void; onComplete: () => void }) {
  const preferences = [
    { label: "How would you prefer to meet?", options: ["Video visit", "Phone call"] },
    { label: "What time usually works best?", options: ["Morning", "Afternoon"] },
    { label: "May your provider contact you about this treatment?", options: ["Yes", "No"] },
  ];
  const [answers, setAnswers] = useState<string[]>(Array(preferences.length).fill(""));
  const complete = answers.every(Boolean);

  return (
    <main className={`assessment-page provider-review-page assessment-theme-${theme}`}>
      <div className="assessment-shell consent-shell">
        <header className="assessment-header">
          <button type="button" onClick={onCancel} aria-label="Back to order">←</button>
          <div><h1>Provider Review</h1></div>
          <button type="button" className="assessment-cancel" onClick={onCancel}>Cancel</button>
        </header>

        <div className="assessment-section-title consent-section-title"><span />CONSULTATION PREFERENCES<span /></div>
        <p className="assessment-intro">Tell us how you would like to connect with a licensed provider about {product.name}.</p>

        <section className="consent-questions">
          {preferences.map((preference, index) => (
            <article className={`consent-question ${answers[index] ? "answered" : ""}`} key={preference.label}>
              <div className="consent-question-head"><i>{answers[index] ? "✓" : index + 1}</i><h2>{preference.label}</h2></div>
              <div className="consent-question-answers">
                {preference.options.map((answer) => (
                  <button
                    type="button"
                    className={answers[index] === answer ? "selected" : ""}
                    onClick={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? answer : value))}
                    key={answer}
                  >
                    {answer}
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
  const [theme, setTheme] = useState<"v1" | "v2" | "v3" | "v4">("v3");
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
    if (savedTheme === "v1" || savedTheme === "v2" || savedTheme === "v3" || savedTheme === "v4") setTheme(savedTheme);
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
      <main className={`order-page order-theme-${theme}`}>
        <OrderHeader cartCount={0} />
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

  if (showAssessment) {
    return <EligibilityAssessment product={product} theme={theme} onCancel={() => setShowAssessment(false)} onComplete={() => { setEligible(true); setShowAssessment(false); }} />;
  }

  if (showConsent) {
    return <MedicalConsent theme={theme} onCancel={() => setShowConsent(false)} onComplete={() => { setConsented(true); setShowConsent(false); }} />;
  }

  if (showProviderReview) {
    return <ProviderReview product={product} theme={theme} onCancel={() => setShowProviderReview(false)} onComplete={() => { setProviderReviewed(true); setShowProviderReview(false); }} />;
  }

  return (
    <main className={`order-page order-theme-${theme}`}>
      <OrderHeader cartCount={1} />
      <div className="order-shell">
        <nav className="order-breadcrumb" aria-label="Breadcrumb">
          <a href={sitePath("/")}>Home</a><span>›</span><a href={sitePath("/#care")}>Products</a><span>›</span><strong>Order requirements</strong>
        </nav>
        <div className="order-heading">
          <h1>Order requirements</h1>
        </div>

        <div className="order-grid">
          <section className="requirements-column">
            <article className="requirement-card product-requirement">
              <div className="requirement-product">
                <div className="order-product-art"><img src={sitePath(product.image)} alt={product.name} /></div>
                <div><span className={ready ? "complete" : ""}>{ready ? "Ready" : "Incomplete"}</span><h2>{product.name}</h2><p>{product.detail}</p></div>
                <button type="button" onClick={removeProduct}>Remove</button>
              </div>

              <button className={`requirement-step ${eligible ? "done" : ""}`} type="button" onClick={() => eligible ? undefined : setShowAssessment(true)}>
                <i>{eligible ? "✓" : "1"}</i><span><b>{eligible ? "Eligibility confirmed" : "Check eligibility"}</b><small>Answer a few private health questions</small></span><strong>{eligible ? "Completed" : "Answer"}</strong>
              </button>
              <button
                className={`requirement-step muted ${eligible ? "available" : ""} ${providerReviewed ? "done" : ""}`}
                type="button"
                disabled={!eligible}
                onClick={() => eligible && !providerReviewed ? setShowProviderReview(true) : undefined}
              >
                <i>{providerReviewed ? "✓" : "2"}</i><span><b>{providerReviewed ? "Review requested" : "Provider review"}</b><small>{eligible ? "Choose your consultation preferences" : "Available after eligibility"}</small></span><strong>{providerReviewed ? "Completed" : "Answer"}</strong>
              </button>
            </article>

            <article className={`consent-card ${consented ? "done" : ""}`}>
              <div><i>{consented ? "✓" : "!"}</i><span><b>Medical consent</b><small>Required before checkout</small></span></div>
              <button type="button" onClick={() => consented ? undefined : setShowConsent(true)}>{consented ? "Completed" : "Review & sign"}</button>
            </article>
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
          </aside>
        </div>
      </div>
    </main>
  );
}
