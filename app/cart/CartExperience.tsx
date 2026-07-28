"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/components/CatalogSection";

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
        <a className="order-site-logo" href="/">Scriptrx</a>
        <nav><a href="/#care">Women&apos;s Health</a><a href="/#care">Weight Management</a><a href="/#care">Longevity</a></nav>
        <div>
          {cartCount > 0 && <a className="order-header-cart" href="/cart" aria-label={`Cart with ${cartCount} item`}><img className="cart-icon-image" src="/cart-icon.svg" alt="" /><b>{cartCount}</b></a>}
          <a className="order-header-account" href="/">My Account</a>
        </div>
      </header>
    </>
  );
}

function EligibilityAssessment({ product, theme, onCancel, onComplete }: { product: Product; theme: "v1" | "v2" | "v3"; onCancel: () => void; onComplete: () => void }) {
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
            return (
              <article className={`assessment-question ${active ? "active" : ""} ${answered ? "answered" : ""}`} key={question}>
                <button className="assessment-question-head" type="button" onClick={() => setActiveQuestion(index)}>
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

export default function CartExperience() {
  const [product, setProduct] = useState<Product>(fallbackProduct);
  const [theme, setTheme] = useState<"v1" | "v2" | "v3">("v3");
  const [eligible, setEligible] = useState(false);
  const [consented, setConsented] = useState(false);
  const [hasProduct, setHasProduct] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

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
    if (savedTheme === "v1" || savedTheme === "v2" || savedTheme === "v3") setTheme(savedTheme);
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
    window.location.href = "/#care";
  }

  if (!hasProduct) {
    return (
      <main className={`order-page order-theme-${theme}`}>
        <OrderHeader cartCount={0} />
        <section className="empty-cart">
          <span>YOUR CART</span>
          <h1>Nothing here yet.</h1>
          <p>Choose one treatment to begin your order.</p>
          <a href="/#care">Explore products</a>
        </section>
      </main>
    );
  }

  const ready = eligible && consented;

  if (showAssessment) {
    return <EligibilityAssessment product={product} theme={theme} onCancel={() => setShowAssessment(false)} onComplete={() => { setEligible(true); setShowAssessment(false); }} />;
  }

  return (
    <main className={`order-page order-theme-${theme}`}>
      <OrderHeader cartCount={1} />
      <div className="order-shell">
        <nav className="order-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>›</span><a href="/#care">Products</a><span>›</span><strong>Order requirements</strong>
        </nav>
        <div className="order-heading">
          <h1>Order requirements</h1>
        </div>

        <div className="order-grid">
          <section className="requirements-column">
            <article className="requirement-card product-requirement">
              <div className="requirement-product">
                <div className="order-product-art"><img src={product.image} alt={product.name} /></div>
                <div><span className={ready ? "complete" : ""}>{ready ? "Ready" : "Incomplete"}</span><h2>{product.name}</h2><p>{product.detail}</p></div>
                <button type="button" onClick={removeProduct}>Remove</button>
              </div>

              <button className={`requirement-step ${eligible ? "done" : ""}`} type="button" onClick={() => eligible ? undefined : setShowAssessment(true)}>
                <i>{eligible ? "✓" : "1"}</i><span><b>{eligible ? "Eligibility confirmed" : "Check eligibility"}</b><small>Answer a few private health questions</small></span><strong><svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></strong>
              </button>
              <div className={`requirement-step muted ${eligible ? "available" : ""}`}>
                <i>2</i><span><b>Provider review</b><small>Available after eligibility</small></span><strong><svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></strong>
              </div>
            </article>

            <article className={`consent-card ${consented ? "done" : ""}`}>
              <div><i>{consented ? "✓" : "!"}</i><span><b>Medical consent</b><small>Required before checkout</small></span></div>
              <button type="button" onClick={() => setConsented(true)}>{consented ? "Completed" : "Review & sign"}</button>
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
              {ready ? `Continue to checkout · $${pricing.total.toFixed(2)}` : "Complete requirements to continue"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
