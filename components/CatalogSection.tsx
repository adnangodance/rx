"use client";

import { useEffect, useRef, useState } from "react";
import { animateProductToCart } from "@/lib/cart-animation";
import { sitePath } from "@/lib/site-path";

export interface Product {
  name: string;
  price: string;
  detail: string;
  type: string;
  image: string;
}

export interface ProductRow {
  id?: string;
  title: string;
  products: Product[];
}

export default function CatalogSection({ productRows, addedProducts, onAddToCart, onRemoveFromCart, tabbedAfterFirst = false }: { productRows: ProductRow[]; addedProducts: string[]; onAddToCart: (product: Product) => void; onRemoveFromCart: (product: Product) => void; tabbedAfterFirst?: boolean }) {
  const firstRow = productRows[0];
  const tabRows = productRows.slice(1).filter((row) => row.products.length > 0);
  const conditionDescriptions: Record<string, [string, string]> = {
    "sexual-health-products": ["ED and testosterone treatments.", "Oral compounds, custom dosed."],
    "weight-management-products": ["GLP-1 and metabolic programs.", "Physician-supervised care."],
    "hair-loss-products": ["Topical and oral hair treatments.", "Personalized provider-guided plans."],
    "acne-products": ["Prescription skin and hair care.", "Personalized daily formulas."],
    "womens-health-products": ["Hormone and wellness support.", "Provider-guided treatment plans."],
    "peptides-products": ["Sermorelin, tesamorelin, NAD+.", "Recovery, energy, body composition."],
  };
  const categorySlugs: Record<string, string> = {
    "sexual-health-products": "sexual-health",
    "weight-management-products": "weight-management",
    "hair-loss-products": "hair-care",
    "acne-products": "acne",
    "womens-health-products": "womens-health",
    "peptides-products": "longevity",
  };

  return (
    <section className="programs shell" id="care">
      <div className="catalog">
        {tabbedAfterFirst ? (
          <>
            {firstRow && <CatalogRow row={firstRow} addedProducts={addedProducts} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} />}
            {tabRows.length > 0 && (
              <>
                <section className="treatment-discovery" aria-label="Explore treatment categories">
                  <div className="treatment-discovery-visual">
                    <img src={sitePath("/adnan-treatment-discovery.png")} alt="A woman relaxing at home" />
                    <div className="treatment-discovery-message">
                      <h3>Feel better.<br />Live more fully.</h3>
                    </div>
                  </div>
                  <div className="treatment-discovery-links">
                    {tabRows.map((row) => {
                      const firstProduct = row.products[0];
                      return (
                        <a key={row.id || row.title} href={sitePath(`/categories?category=${categorySlugs[row.id || ""] || "longevity"}`)}>
                          {firstProduct && <img src={sitePath(firstProduct.image)} alt="" />}
                          <span><strong>{row.title}</strong><small>{firstProduct?.detail || "Explore personalized options"}</small></span>
                          <i aria-hidden="true">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                              <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </i>
                        </a>
                      );
                    })}
                  </div>
                </section>
                <CareToolkit />
                <AdnanProofSections />
                <section className="condition-catalog" aria-labelledby="condition-catalog-title">
                  <h3 id="condition-catalog-title">What condition can we help with?</h3>
                  <div className="condition-tabs" aria-label="Treatment categories">
                    {tabRows.map((row) => {
                      const categoryProduct = row.products[0];
                      const categoryDescription = conditionDescriptions[row.id || ""] || [categoryProduct?.detail || "Personalized treatment options.", "Provider-guided care."];
                      return (
                        <a
                          key={row.id || row.title}
                          href={sitePath(`/categories?category=${categorySlugs[row.id || ""] || "longevity"}`)}
                        >
                          <span className="condition-card-art">{categoryProduct && <img src={sitePath(categoryProduct.image)} alt="" />}</span>
                          <span className="condition-card-copy"><strong>{row.title}</strong><small>{categoryDescription[0]}<br />{categoryDescription[1]}</small></span>
                          <i aria-hidden="true">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                              <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </i>
                        </a>
                      );
                    })}
                  </div>
                </section>
                <MemberTestimonials />
              </>
            )}
          </>
        ) : productRows.map((row) => (
          <CatalogRow key={row.title} row={row} addedProducts={addedProducts} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} />
        ))}
      </div>
    </section>
  );
}

function CareToolkit() {
  return (
    <section className="care-toolkit" aria-labelledby="care-toolkit-title">
      <header>
        <h3 id="care-toolkit-title">Everything you need to move forward,</h3>
        <p>all in one place.</p>
      </header>
      <div className="care-toolkit-grid">
        <article>
          <div className="toolkit-visual tracker-visual"><div className="tracker-card"><small>WEEK 4</small><strong>↓ 22 lbs</strong><span>Keep it up!</span><i /></div></div>
          <h4>Weight loss trackers</h4><p>Track your journey and celebrate each milestone.</p>
        </article>
        <article>
          <div className="toolkit-visual dose-visual"><div className="dose-card"><small>WEEK 4</small><strong>0.25 mg</strong><button type="button">+ Log</button></div></div>
          <h4>Injection tracker</h4><p>Never miss a dose with easy, built-in reminders.</p>
        </article>
        <article>
          <div className="toolkit-visual support-visual"><img src={sitePath("/benefit-care-from-home-transparent.png")} alt="" /><div><span>24/7 care team</span><small>Hey, here’s your treatment.</small><small>Weekly medication</small></div></div>
          <h4>24/7 support</h4><p>Message your care team whenever you need them — day or night.</p>
        </article>
        <article>
          <div className="toolkit-visual product-visual"><div className="product-glass"><img src={sitePath("/adnan-amino-quad.png")} alt="" /><span>Daily support</span></div></div>
          <h4>Curated wellness products</h4><p>Wellness essentials hand-picked to support your journey.</p>
        </article>
      </div>
    </section>
  );
}

function AdnanProofSections() {
  const memberStories = [
    { image: "/member-story-1.png", name: "Marcus", className: "story-short" },
    { image: "/member-story-2.png", name: "Maya", className: "story-short" },
    { image: "/member-story-3.png", name: "Daniel", className: "story-short" },
    { image: "/member-story-4.png", name: "Alex", className: "story-short" },
    { image: "/member-story-5.png", name: "James", className: "story-short" },
    { image: "/member-story-6.png", name: "Nina", className: "story-short" },
  ];

  return (
    <div className="adnan-proof-sections">
      <section className="member-proof" aria-labelledby="member-proof-title">
        <div className="member-story-grid" aria-label="ScriptRx member stories">
          {memberStories.map((story, index) => (
            <article className={`member-story ${story.className}`} key={story.name}>
              <img src={sitePath(story.image)} alt="" />
              <span className="member-play" aria-hidden="true">▶</span>
              <small>{story.name} · ScriptRx member</small>
            </article>
          ))}
        </div>
        <div className="member-proof-copy">
          <span className="member-rating">◉ 95% value the convenience of online care</span>
          <h3 id="member-proof-title">Care that fits<br />real life.</h3>
          <p className="member-count">Members across the country are choosing simpler, provider-guided care.</p>
          <div className="member-quote">
            <span>Hear from ScriptRx members:</span>
            <blockquote>“I always know what the next step is, and support is there when I need it.”</blockquote>
            <small>Verified member experience</small>
          </div>
        </div>
      </section>

    </div>
  );
}

function MemberTestimonials() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollStories = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.72, behavior: "smooth" });
  };

  return (
    <div className="adnan-testimonials-section">
      <section className="member-testimonials" aria-labelledby="member-testimonials-title">
        <div className="testimonial-heading">
          <h3 id="member-testimonials-title">Member stories</h3>
          <div><span aria-hidden="true" /><button type="button" aria-label="Previous member story" onClick={() => scrollStories(-1)}>←</button><button type="button" aria-label="Next member story" onClick={() => scrollStories(1)}>→</button></div>
        </div>
        <div className="testimonial-rail" ref={railRef}>
          <article>
            <div className="testimonial-person"><img src={sitePath("/member-story-3.png")} alt="" /><span><strong>Danny</strong><small>42 years old</small></span></div>
            <div className="testimonial-body"><blockquote className="four-line-quote">TRT improved my energy, mood, and well-being.<br />I improved my diet, exercise, and sleep.<br />This gave me a healthier, positive routine,<br />and better relationships at work and home.</blockquote><div><span>More energy</span><span>Improved mood</span></div></div>
            <div className="testimonial-result">
              <div className="result-reading"><small>Before treatment</small><span className="result-gauge gauge-before"><strong>9.77</strong><i>nmol/L</i></span></div>
              <div className="result-reading"><small>3 Months treatment</small><span className="result-gauge gauge-after"><strong>26.50</strong><i>nmol/L</i></span></div>
              <div className="result-improvement"><em>171%</em><span>increase in Free Testosterone</span></div>
            </div>
          </article>
          <article>
            <div className="testimonial-person"><img src={sitePath("/member-story-4.png")} alt="" /><span><strong>Richard</strong><small>53 years old</small></span></div>
            <div className="testimonial-body"><blockquote>Low energy and brain fog were the two biggest symptoms I had. Then I found TRT. It’s helped me improve my energy, mental clarity, and overall well-being. I was able to achieve my goals, gain muscle, lose body fat, and improve sports performance.</blockquote><div><span>More energy</span><span>More muscle mass</span></div></div>
            <div className="testimonial-result">
              <div className="result-reading"><small>Before treatment</small><span className="result-gauge gauge-before"><strong>10.20</strong><i>nmol/L</i></span></div>
              <div className="result-reading"><small>3 Months treatment</small><span className="result-gauge gauge-after"><strong>24.80</strong><i>nmol/L</i></span></div>
              <div className="result-improvement"><em>143%</em><span>increase in Free Testosterone</span></div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

function CatalogRow({ row, addedProducts, onAddToCart, onRemoveFromCart, hideTitle = false }: { row: ProductRow; addedProducts: string[]; onAddToCart: (product: Product) => void; onRemoveFromCart: (product: Product) => void; hideTitle?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [row.products.length]);

  const handleScroll = (direction: "left" | "right") => {
    if (gridRef.current) {
      const scrollAmount = gridRef.current.clientWidth * 0.75;
      gridRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Base progress fill starts at 25% minimum width and fills up to 100% as scrolled
  const fillWidth = 25 + (scrollProgress / 100) * 75;

  return (
    <section className="catalog-row" id={row.id}>
      <div className="catalog-heading">
        {!hideTitle && <h3>{row.title}</h3>}
        <div className="catalog-nav-controls">
          <div className="catalog-progress-pill" aria-hidden="true">
            <div className="catalog-progress-track">
              <div
                className="catalog-progress-fill"
                style={{ width: `${fillWidth}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label={`Previous ${row.title} products`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label={`Next ${row.title} products`}
          >
            →
          </button>
        </div>
      </div>
      <div className="catalog-grid" ref={gridRef} onScroll={updateProgress}>
        {row.products.map((product, idx) => {
          const isAdded = addedProducts.includes(product.name);
          return (
          <article className={`catalog-card ${isAdded ? "is-added" : ""}`} key={`${product.name}-${idx}`}>
            <a
              className={`catalog-art product-detail-hit ${product.type}`}
              href={sitePath("/product")}
              onClick={() => localStorage.setItem("scriptrx-detail-product", JSON.stringify(product))}
              aria-label={`View details for ${product.name}`}
            >
              <div className="product-float">
                <img className="product-render" src={sitePath(product.image)} alt={product.name} />
                <img className="product-shadow" src={sitePath("/product-shadow.png")} alt="" />
              </div>
            </a>
            <div className="catalog-copy">
              <h4>
                <a
                  href={sitePath("/product")}
                  onClick={() => localStorage.setItem("scriptrx-detail-product", JSON.stringify(product))}
                >
                  {product.name}
                </a>
              </h4>
              <p>From {product.price}</p>
              <span>{product.detail}</span>
              <div className="product-actions">
                <button type="button" className={isAdded ? "added" : ""} onClick={(event) => {
                  if (isAdded) {
                    onRemoveFromCart(product);
                  } else {
                    animateProductToCart(event.currentTarget);
                    onAddToCart(product);
                  }
                }} aria-live="polite">
                  {isAdded ? "Remove" : "Add to Cart"}
                </button>
                <a
                  href={sitePath("/product")}
                  onClick={() => localStorage.setItem("scriptrx-detail-product", JSON.stringify(product))}
                >
                  Details
                </a>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
