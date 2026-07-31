"use client";

import { useEffect, useState } from "react";
import CatalogSection, { type Product } from "@/components/CatalogSection";
import ClassicHeader from "@/components/ClassicHeader";
import HeaderPillNav from "@/components/HeaderPillNav";
import VersionBar from "@/components/VersionBar";
import { sitePath } from "@/lib/site-path";

const productRows = [
  {
    id: "longevity-products",
    title: "Longevity & everyday health",
    products: [
      { name: "Daily tablet", price: "$39/mo", detail: "Semaglutide", type: "disc", image: "/product-tablet.png" },
      { name: "Nandrolone decanoate", price: "$79/mo", detail: "Nandrolone", type: "vial", image: "/product-nandrolone.png" },
      { name: "Oxytocin spray", price: "$49/mo", detail: "Oxytocin", type: "spray", image: "/product-oxytocin.png" },
      { name: "Vitamin B12", price: "$29/mo", detail: "Cyanocobalamin", type: "amber", image: "/product-b12.png" },
      { name: "NAD+ Complex", price: "$69/mo", detail: "NAD+ Booster", type: "vial", image: "/product-nandrolone.png" },
      { name: "Metformin Longevity", price: "$35/mo", detail: "Metformin HCl", type: "disc", image: "/product-tablet.png" },
      { name: "CoQ10 Vitality", price: "$25/mo", detail: "CoQ10 200mg", type: "amber", image: "/product-b12.png" },
      { name: "Glutathione Support", price: "$55/mo", detail: "Reduced Glutathione", type: "spray", image: "/product-oxytocin.png" },
    ],
  },
  {
    id: "sexual-health-products",
    title: "Sexual health & intimacy",
    products: [
      { name: "Daily Tadalafil", price: "$24/mo", detail: "Tadalafil 5mg", type: "disc", image: "/product-tablet.png" },
      { name: "Sildenafil On-Demand", price: "$29/mo", detail: "Sildenafil 50mg", type: "disc", image: "/product-tablet.png" },
      { name: "Intimate Oxytocin Spray", price: "$35/mo", detail: "Oxytocin 100IU", type: "spray", image: "/product-oxytocin.png" },
      { name: "Hormone Care", price: "$39/mo", detail: "Nandrolone Blend", type: "vial", image: "/product-nandrolone.png" },
      { name: "PT-141 Peptide", price: "$49/mo", detail: "Bremelanotide", type: "vial", image: "/product-nandrolone.png" },
      { name: "Vitality B12 Amber", price: "$29/mo", detail: "Cyanocobalamin", type: "amber", image: "/product-b12.png" },
      { name: "Apex Performance", price: "$59/mo", detail: "Custom Formula", type: "disc", image: "/product-tablet.png" },
      { name: "Enclomiphene Support", price: "$69/mo", detail: "Enclomiphene Citrate", type: "vial", image: "/product-nandrolone.png" },
    ],
  },
  {
    id: "weight-management-products",
    title: "Weight & metabolic care",
    products: [
      { name: "Semaglutide Weekly", price: "$49/mo", detail: "Semaglutide Injection", type: "vial", image: "/product-nandrolone.png" },
      { name: "Tirzepatide Compound", price: "$89/mo", detail: "Tirzepatide Dual Action", type: "vial", image: "/product-nandrolone.png" },
      { name: "Metabolic Sublingual", price: "$39/mo", detail: "Sublingual Drops", type: "spray", image: "/product-oxytocin.png" },
      { name: "Lipo-B12 Booster", price: "$35/mo", detail: "Methionine & B12", type: "amber", image: "/product-b12.png" },
      { name: "Daily Metabolic Tablet", price: "$42/mo", detail: "Oral GLP-1 Support", type: "disc", image: "/product-tablet.png" },
      { name: "Berberine Synergy", price: "$28/mo", detail: "Berberine Complex", type: "amber", image: "/product-b12.png" },
      { name: "Retatrutide Triple Action", price: "$119/mo", detail: "GIP/GLP-1/Glucagon", type: "vial", image: "/product-nandrolone.png" },
      { name: "Amino Vitality Spray", price: "$45/mo", detail: "Essential Aminos", type: "spray", image: "/product-oxytocin.png" },
    ],
  },
  {
    id: "hair-loss-products",
    title: "Hair loss",
    products: [
      { name: "Daily Hair Tablet", price: "$29/mo", detail: "Personalized oral care", type: "disc", image: "/product-tablet.png" },
      { name: "Hair Support Serum", price: "$39/mo", detail: "Topical support", type: "spray", image: "/product-oxytocin.png" },
      { name: "B12 Hair Support", price: "$29/mo", detail: "Vitamin support", type: "amber", image: "/product-b12.png" },
      { name: "Fuller Hair Formula", price: "$45/mo", detail: "Provider-guided support", type: "vial", image: "/product-nandrolone.png" },
    ],
  },
  {
    id: "acne-products",
    title: "Acne & clear skin",
    products: [
      { name: "Daily Acne Tablet", price: "$29/mo", detail: "Personalized oral care", type: "disc", image: "/product-tablet.png" },
      { name: "Clear Skin Formula", price: "$35/mo", detail: "Daily skin support", type: "vial", image: "/product-nandrolone.png" },
      { name: "Acne Support Spray", price: "$32/mo", detail: "Targeted topical care", type: "spray", image: "/product-oxytocin.png" },
      { name: "Skin Wellness B12", price: "$29/mo", detail: "Vitamin support", type: "amber", image: "/product-b12.png" },
    ],
  },
];

const faqs = [
  {
    question: "How does ScriptRx work?",
    answer: "Start with a private online health intake. A licensed provider reviews your information and recommends a personalized plan. If treatment is prescribed, it can be delivered discreetly with ongoing online support.",
  },
  {
    question: "Who are the providers of ScriptRx?",
    answer: "Care is provided by licensed healthcare professionals who are authorized to practice in your state. Provider availability and credentials may vary by treatment and location.",
  },
  {
    question: "Does ScriptRx require insurance?",
    answer: "No. ScriptRx is designed to support self-pay care. Any applicable consultation, treatment, and delivery costs are shown before you complete your order.",
  },
  {
    question: "What states is ScriptRx available in?",
    answer: "Availability depends on the treatment requested and provider licensing requirements. Enter your location during the online intake to see the options currently available to you.",
  },
];

export default function Home() {
  const [version, setVersion] = useState<"v1" | "v2" | "v3" | "v4">("v3");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const cartCount = addedProducts.length;

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("scriptrx-authenticated") === "true");
    try {
      const savedCart = JSON.parse(localStorage.getItem("scriptrx-cart-products") || "[]");
      const validItems = Array.isArray(savedCart) ? savedCart.filter((item): item is string => typeof item === "string") : [];
      setAddedProducts(validItems.slice(0, 1));
    } catch {
      setAddedProducts([]);
    }
    const savedTheme = localStorage.getItem("scriptrx-theme");
    if (savedTheme === "v1" || savedTheme === "v2" || savedTheme === "v3" || savedTheme === "v4") {
      setVersion(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scriptrx-theme", version);
  }, [version]);

  function handleAddToCart(product: Product) {
    setAddedProducts((current) => {
      if (current.includes(product.name)) return current;
      if (current.length > 0) {
        setPendingProduct(product);
        return current;
      }
      const next = [product.name];
      localStorage.setItem("scriptrx-cart-products", JSON.stringify(next));
      localStorage.setItem("scriptrx-cart-product", JSON.stringify(product));
      return next;
    });
  }

  function replaceCartProduct() {
    if (!pendingProduct) return;
    setAddedProducts([pendingProduct.name]);
    localStorage.setItem("scriptrx-cart-products", JSON.stringify([pendingProduct.name]));
    localStorage.setItem("scriptrx-cart-product", JSON.stringify(pendingProduct));
    setPendingProduct(null);
  }

  function handleRemoveFromCart(product: Product) {
    setAddedProducts((current) => {
      const next = current.filter((name) => name !== product.name);
      localStorage.setItem("scriptrx-cart-products", JSON.stringify(next));
      localStorage.removeItem("scriptrx-cart-product");
      return next;
    });
  }

  return (
    <main className={`theme-${version}`}>
      <VersionBar version={version} onChange={setVersion} />


      {pendingProduct && (
        <div className="product-replace-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPendingProduct(null);
        }}>
          <section className="product-replace-dialog" role="dialog" aria-modal="true" aria-labelledby="home-replace-product-title">
            <button className="product-replace-close" type="button" onClick={() => setPendingProduct(null)} aria-label="Close">×</button>
            <span>ONE TREATMENT AT A TIME</span>
            <h2 id="home-replace-product-title">You already have a product in your cart.</h2>
            <p>Replace <strong>{addedProducts[0]}</strong> with <strong>{pendingProduct.name}</strong>?</p>
            <div>
              <button className="product-replace-confirm" type="button" onClick={replaceCartProduct}>Replace product</button>
              <button className="product-replace-back" type="button" onClick={() => setPendingProduct(null)}>Go back</button>
            </div>
          </section>
        </div>
      )}

      {version === "v1" && <ClassicHeader cartCount={cartCount} />}

      <section className="reference-hero">
        {version !== "v1" && <div className="hero-announcement">New: personalized weight care</div>}

        {version !== "v1" && (
          <header className="reference-nav">
            <a className="reference-logo" href="#">Scriptrx</a>

            <nav><a href={sitePath("/categories?category=womens-health")}>Women's Health</a><a href={sitePath("/categories?category=weight-management")}>Weight Management</a><a href={sitePath("/categories?category=longevity")}>Longevity</a></nav>

            <div>
              {cartCount > 0 && (
                <a className="header-cart-link" href={sitePath("/cart")} aria-label={`Cart with ${cartCount} items`}>
                  <img className="cart-icon-image" src={sitePath("/cart-icon.svg")} alt="" />
                  <b>{cartCount}</b>
                </a>
              )}
              {isLoggedIn ? (
                <a className="account-link" href="#">
                  <span>My Account</span>
                </a>
              ) : (
                <>
                  <a href={sitePath(`/login?theme=${version}`)}>Log in</a>
                  <a className="register" href="#care">Get started</a>
                </>
              )}
            </div>
          </header>
        )}

        <div className="hero-intro">
          <div>
            <span className="hero-kicker">CARE THAT MOVES WITH YOU</span>
            <h1>Your health.<br />More in your hands.</h1>
          </div>
          <ul>
            <li><i>✓</i> Licensed providers, nationwide</li>
            <li><i>✓</i> Personalized treatment options</li>
            <li><i>✓</i> Ongoing support, 100% online</li>
          </ul>
        </div>

        <div className="story-grid">
          <a className="story-card story-weight" href={version === "v1" ? sitePath("/categories?category=weight-management") : "#care"}>
            <div className="story-copy">
              <h2>A plan made<br />for your progress.</h2>
              {version === "v1" && (
                <span className="v1-story-cta">
                  <span className="v1-story-cta-main">
                    <img src={sitePath("/product-b12.png")} alt="" />
                    <b>Get Started</b>
                  </span>
                  <span className="v1-story-cta-arrow">
                    <svg width="23" height="23" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <path d="M6 22L22 6M22 6H9M22 6V19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              )}
              {version === "v2" && <span className="card-pill-btn">Explore weight care</span>}
              {version === "v3" && <span className="card-pill-btn">Explore weight care</span>}
            </div>
            <img
              className="weight-tablet"
              src={sitePath(version === "v4" ? "/product-red-pill.png" : "/product-tablet.png")}
              alt={version === "v4" ? "Red treatment pill" : "White treatment tablet"}
            />
            {version !== "v2" && (
              <img
                className="weight-vial"
                src={sitePath(version === "v4" ? "/product-amino-quad-small.png" : version === "v3" ? "/product-lipo-c.png" : "/product-b12.png")}
                alt={version === "v4" ? "Amino-Quad treatment bottle" : version === "v3" ? "LIPO-C treatment vial" : "Vitamin B12 vial"}
              />
            )}
            <img
              className="weight-pen"
              src={sitePath(version === "v4" ? "/weight-pen-purple.png" : version === "v2" ? "/weight-pen-green.png" : "/weight-pen.png")}
              alt={version === "v4" ? "Purple injectable treatment pen" : version === "v2" ? "Green injectable treatment pen" : "Blue injectable treatment pen"}
            />
          </a>

          <a className="story-card story-life" href={version === "v1" ? sitePath("/categories?category=sexual-health") : version === "v4" ? "#acne-products" : "#care"}>
            {version === "v1" && (
              <>
                <img src={sitePath("/better-sex.jpg")} alt="Couple embracing in lavender activewear" />
                <div className="story-copy">
                  <h2>Better sex,<br />deeper intimacy.</h2>
                </div>
              </>
            )}
            {version === "v2" && (
              <>
                <img src={sitePath("/light-green-couple.jpg")} alt="Couple embracing in light green activewear" />
                <div className="story-copy">
                  <h2>Feel more like<br />yourself again.</h2>
                  <span className="card-pill-btn">Explore care</span>
                </div>
              </>
            )}
            {version === "v3" && (
              <>
                <img src={sitePath("/brown-couple.jpg")} alt="Couple embracing in warm brown activewear" />
                <div className="story-copy">
                  <h2>Feel more like<br />yourself again.</h2>
                  <span className="card-pill-btn">Explore products</span>
                </div>
              </>
            )}
            {version === "v4" && (
              <>
                <img src={sitePath("/hero-womens-care-coral.png")} alt="Woman relaxing against a coral background" />
                <div className="story-copy">
                  <h2>Clearer skin.<br />More confidence.</h2>
                </div>
              </>
            )}
          </a>
        </div>

        {version === "v1" || version === "v3" || version === "v4" ? (
          <div className="hero-treatment-row v3-treatment-row">
            <a href="#weight-management-products">
              <img className="v3-cat-img" src={sitePath("/vial-lose-weight.png")} alt="Weight management vial" />
              <span>Weight Management</span>
              <span className="cat-arrow-btn">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <a href="#hair-loss-products">
              <img className="v3-cat-img" src={sitePath("/bottle-hair-care.png")} alt="Hair loss treatment bottle" />
              <span>Hair Loss</span>
              <span className="cat-arrow-btn">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <a href="#sexual-health-products">
              <img className="v3-cat-img" src={sitePath("/pill-energy-flame.png")} alt="Sexual health treatment" />
              <span>Sexual Health</span>
              <span className="cat-arrow-btn">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <a href="#acne-products">
              <img className="v3-cat-img" src={sitePath("/pill-silver-novo.png")} alt="Acne treatment" />
              <span>Acne</span>
              <span className="cat-arrow-btn">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        ) : (
          <div className="hero-treatment-row">
            <a href="#weight-management-products"><span>Weight Management</span><img className="treatment-thumb-img" src={sitePath("/vial-lose-weight.png")} alt="Weight management treatment vial" /></a>
            <a href="#hair-loss-products"><span>Hair Loss</span><img className="treatment-thumb-bottle" src={sitePath("/bottle-hair-care.png")} alt="Hair loss treatment bottle" /></a>
            <a href="#sexual-health-products"><span>Sexual Health</span><img className="treatment-thumb-pill" src={sitePath("/pill-energy-flame.png")} alt="Sexual health treatment" /></a>
            <a href="#acne-products"><span>Acne</span><img className="treatment-thumb-pill-silver" src={sitePath("/pill-silver-novo.png")} alt="Acne treatment" /></a>
          </div>
        )}
      </section>

      <CatalogSection productRows={productRows} addedProducts={addedProducts} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />

      <section className="faq-section" id="faq">
        <div className="faq-shell">
          <div className="faq-heading"><h2>Have questions?<br />Get clear answers.</h2></div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary><span>{faq.question}</span><i>+</i></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        {version === "v1" ? (
          <div className="footer-panel">
            <div className="footer-v2-header" style={{ marginBottom: 20 }}>
              <div className="footer-v2-switcher">
                <span className="switcher-label">Version:</span>
                <button type="button" className="version-pill active" onClick={() => setVersion("v1")}>Version 1</button>
                <button type="button" className="version-pill inactive" onClick={() => setVersion("v2")}>Version 2</button>
                <button type="button" className="version-pill inactive" onClick={() => setVersion("v3")}>Version 3</button>
                <button type="button" className="version-pill inactive" onClick={() => setVersion("v4")}>Version 4</button>
              </div>
            </div>
            <div className="footer-links">
              <p>Personalized online care, thoughtfully designed around your health, goals, and everyday life.</p>
              <div><b>Categories</b><a href="#care">Weight management</a><a href="#care">Sexual health</a><a href="#care">Hormone support</a><a href="#care">Hair &amp; skin</a><a href="#care">General wellness</a></div>
              <div><b>Company</b><a href="#">About ScriptRx</a><a href="#care">View catalogue</a><a href="#">Clinical standards</a></div>
              <div><b>Main</b><a href="#">Homepage</a><a href="#care">Get started</a><a href="#faq">Help center</a></div>
              <div><b>Legal</b><a href="#">Privacy policy</a><a href="#">Terms</a><a href="#">Telehealth consent</a></div>
            </div>
            <a className="footer-wordmark" href="#">Scriptrx</a>
          </div>
        ) : (
          <div className="footer-panel-v2">
            <div className="footer-v2-header">
              <div className="footer-v2-switcher">
                <span className="switcher-label">Version:</span>
                <button type="button" className="version-pill inactive" onClick={() => setVersion("v1")}>Version 1</button>
                <button type="button" className={`version-pill ${version === "v2" ? "active" : "inactive"}`} onClick={() => setVersion("v2")}>Version 2</button>
                <button type="button" className={`version-pill ${version === "v3" ? "active" : "inactive"}`} onClick={() => setVersion("v3")}>Version 3</button>
                <button type="button" className={`version-pill ${version === "v4" ? "active" : "inactive"}`} onClick={() => setVersion("v4")}>Version 4</button>
              </div>
            </div>
            <div className="footer-links-v2">
              <p className="footer-intro-text">Simple, honest care for your offerings, and accurate clinical care — 100% online from licensed providers.</p>
              <div>
                <b>Categories</b>
                <a href="#care">Weight Management</a>
                <a href="#care">Sexual Health</a>
                <a href="#care">Hormone Therapy</a>
                <a href="#care">Hair &amp; Skin</a>
                <a href="#care">General Health &amp; Wellness</a>
              </div>
              <div>
                <b>About the Company</b>
                <a href="#">About ScriptRx</a>
                <a href="#care">View Catalog</a>
                <a href="#">Clinical Standards</a>
              </div>
              <div>
                <b>More</b>
                <a href="#">Homepage</a>
                <a href="#care">Request a demo</a>
                <a href="#care">Store Catalog</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms</a>
              </div>
            </div>
            <a className="footer-wordmark-v2" href="#">Scriptrx</a>
          </div>
        )}
      </footer>
    </main>
  );
}
