"use client";

import { useEffect, useState } from "react";
import ClassicHeader from "@/components/ClassicHeader";
import type { Product } from "@/components/CatalogSection";
import { animateProductToCart } from "@/lib/cart-animation";
import { sitePath } from "@/lib/site-path";
import VersionBar, { isClassicVersion, type SiteVersion } from "@/components/VersionBar";

type Theme = SiteVersion;

const fallbackProduct: Product = {
  name: "NAD+ Complex",
  price: "$69/mo",
  detail: "NAD+ Booster",
  type: "vial",
  image: "/product-nandrolone.png",
};

const benefits = [
  { title: "Everyday energy", copy: "Designed to support steady energy and daily wellbeing.", image: "/benefit-everyday-energy-transparent.png" },
  { title: "Clearer focus", copy: "A personalized plan built around your health goals.", image: "/benefit-clearer-focus-transparent.png" },
  { title: "Care from home", copy: "Private online access with licensed-provider oversight.", image: "/benefit-care-from-home-transparent.png" },
];

export default function ProductDetailsExperience() {
  const [theme, setTheme] = useState<Theme>("v3");
  const isClassic = isClassicVersion(theme);
  const [product, setProduct] = useState<Product>(fallbackProduct);
  const [cartProduct, setCartProduct] = useState<Product | null>(null);
  const [showReplace, setShowReplace] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("scriptrx-theme");
    if (savedTheme === "v1" || savedTheme === "v2" || savedTheme === "v3" || savedTheme === "v4" || savedTheme === "v5") setTheme(savedTheme);
    try {
      const detail = JSON.parse(localStorage.getItem("scriptrx-detail-product") || "null");
      if (detail?.name && detail?.price && detail?.image) setProduct(detail);
      const cart = JSON.parse(localStorage.getItem("scriptrx-cart-product") || "null");
      if (cart?.name) setCartProduct(cart);
    } catch {
      setProduct(fallbackProduct);
    }
  }, []);

  const isAdded = cartProduct?.name === product.name;
  const productLabel = product.type === "disc" ? "Tablet" : product.type === "spray" ? "Nasal spray" : product.type === "amber" ? "Wellness" : "Injection";

  function saveProduct() {
    setCartProduct(product);
    localStorage.setItem("scriptrx-cart-product", JSON.stringify(product));
    localStorage.setItem("scriptrx-cart-products", JSON.stringify([product.name]));
    setShowReplace(false);
  }

  function handlePrimaryAction(source?: HTMLElement) {
    if (isAdded) {
      localStorage.removeItem("scriptrx-cart-product");
      localStorage.setItem("scriptrx-cart-products", "[]");
      setCartProduct(null);
      return;
    }
    if (cartProduct) {
      setShowReplace(true);
      return;
    }
    if (source) animateProductToCart(source);
    saveProduct();
  }

  return (
    <main className={`product-detail-page product-detail-theme-${isClassic ? "v1" : theme}`}>
      <VersionBar version={theme} onChange={(nextTheme) => { setTheme(nextTheme); localStorage.setItem("scriptrx-theme", nextTheme); }} />
      {!isClassic && <div className="product-detail-announcement">Personalized care, reviewed by licensed providers</div>}
      {isClassic ? <ClassicHeader cartCount={cartProduct ? 1 : 0} theme={theme} /> : <header className="product-detail-header">
        <a className="product-detail-logo" href={sitePath("/")}>
          {theme === "v1" ? <img className="v1-brand-logo" src={sitePath("/scriptrx-logo-v1.png")} alt="ScriptRx" /> : "Scriptrx"}
        </a>
        <nav>
          <a href={sitePath("/categories?category=weight-management")}>Treatments</a>
          <a href={sitePath("/categories?category=longevity")}>Product options</a>
          <a href="#safety">Safety</a>
        </nav>
        <div>
          {cartProduct && <a className="category-cart" href={sitePath("/cart")}><img src={sitePath("/cart-icon.svg")} alt="" /><b>1</b></a>}
          <a className="category-account" href={sitePath(`/login?theme=${theme}`)}>My Account</a>
        </div>
      </header>}

      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <a href={sitePath("/")}>Home</a><span>›</span><a href={sitePath("/categories")}>Treatments</a><span>›</span><strong>{product.name}</strong>
      </nav>

      <section className="product-detail-hero">
        <div className={`product-detail-stage ${product.type}`}>
          <div className="product-detail-render">
            <img src={sitePath(product.image)} alt={product.name} />
          </div>
        </div>

        <div className="product-detail-summary">
          <span className="product-detail-eligibility">{productLabel}</span>
          <h1>{product.name}</h1>
          <div className="product-detail-price-inline">
            <strong>{product.price}</strong>
            <span>starting price</span>
          </div>
          <ul className="product-detail-highlights">
            <li>Licensed-provider review included</li>
            <li>Personalized treatment, if prescribed</li>
            <li>Discreet delivery with ongoing support</li>
          </ul>
          <button className="product-detail-primary" type="button" onClick={(event) => handlePrimaryAction(event.currentTarget)}>
            {isAdded ? "Remove" : "Add to cart"}
          </button>
          <button className="product-detail-secondary" type="button" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>How it works</button>
          <a className="product-detail-safety-link" href="#safety">Important safety information</a>
          <div className="product-detail-quick-accordions">
            <details>
              <summary>Meet {product.name}<i>⌄</i></summary>
              <p>Provider-guided online care designed around your health history and treatment goals.</p>
            </details>
            <details>
              <summary>About the treatment<i>⌄</i></summary>
              <p>{product.detail}. Exact formulation and directions are determined by your prescribing provider.</p>
            </details>
            <details>
              <summary>How to take it<i>⌄</i></summary>
              <p>If prescribed, your treatment arrives with personalized instructions and access to your care team.</p>
            </details>
            <details id="safety">
              <summary>Important safety information<i>⌄</i></summary>
              <p>Tell your provider about all medical conditions, allergies, pregnancy or breastfeeding status, and every medication or supplement you take. Treatment is provided only when clinically appropriate.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="product-detail-benefits">
        <div className="product-detail-section-heading"><h2>Benefits of {product.name}</h2></div>
        <div className="product-benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title}>
              <div className="product-benefit-image"><img src={sitePath(benefit.image)} alt="" /></div>
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-detail-process" id="how-it-works">
        <div className="process-heading">
          <div><h2>How it works</h2></div>
        </div>
        <ol>
          <li><span>Step 1</span><h3>Complete Your Medical Questionnaire</h3><p>Answer a few guided questions about your symptoms, medical history, and treatment goals.</p></li>
          <li><span>Step 2</span><h3>A provider reviews your answers</h3><p>A licensed provider reviews your information and recommends the right next step.</p></li>
          <li><span>Step 3</span><h3>Receive your personalized plan</h3><p>If appropriate, your provider creates a treatment plan designed around your needs.</p></li>
          <li><span>Step 4</span><h3>Get ongoing care and support</h3><p>Your treatment is delivered discreetly with continued access to your care team.</p></li>
        </ol>
      </section>

      <div className="product-detail-sticky">
        <div><small>{product.name}</small><strong>{product.price}</strong></div>
        <button type="button" onClick={(event) => handlePrimaryAction(event.currentTarget)}>{isAdded ? "Remove" : "Add to cart"}</button>
      </div>

      {showReplace && (
        <div className="product-replace-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowReplace(false);
        }}>
          <section className="product-replace-dialog" role="dialog" aria-modal="true" aria-labelledby="details-replace-title">
            <button className="product-replace-close" type="button" onClick={() => setShowReplace(false)} aria-label="Close">×</button>
            <span>ONE TREATMENT AT A TIME</span>
            <h2 id="details-replace-title">Replace the product in your cart?</h2>
            <p>Replace <strong>{cartProduct?.name}</strong> with <strong>{product.name}</strong>?</p>
            <div>
              <button className="product-replace-confirm" type="button" onClick={saveProduct}>Replace product</button>
              <button className="product-replace-back" type="button" onClick={() => setShowReplace(false)}>Go back</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
