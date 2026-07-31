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
  const [activeTab, setActiveTab] = useState(0);
  const firstRow = productRows[0];
  const tabRows = productRows.slice(1).filter((row) => row.products.length > 0);

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
                    {tabRows.map((row, index) => {
                      const firstProduct = row.products[0];
                      return (
                        <button type="button" key={row.id || row.title} onClick={() => setActiveTab(index)}>
                          {firstProduct && <img src={sitePath(firstProduct.image)} alt="" />}
                          <span><strong>{row.title}</strong><small>{firstProduct?.detail || "Explore personalized options"}</small></span>
                          <i>↗</i>
                        </button>
                      );
                    })}
                  </div>
                </section>
                <section className="condition-catalog" aria-labelledby="condition-catalog-title">
                <h3 id="condition-catalog-title">What condition can we help with?</h3>
                <div className="condition-tabs" role="tablist" aria-label="Treatment categories">
                  {tabRows.map((row, index) => (
                    <button
                      key={row.id || row.title}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === index}
                      className={activeTab === index ? "active" : ""}
                      onClick={() => setActiveTab(index)}
                    >
                      {row.title}
                    </button>
                  ))}
                </div>
                <CatalogRow
                  key={tabRows[activeTab]?.id || tabRows[activeTab]?.title}
                  row={tabRows[activeTab] || tabRows[0]}
                  addedProducts={addedProducts}
                  onAddToCart={onAddToCart}
                  onRemoveFromCart={onRemoveFromCart}
                  hideTitle
                />
                <AdnanProofSections />
                </section>
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

function AdnanProofSections() {
  const memberStories = [
    { image: "/member-story-1.png", name: "Marcus", className: "story-tall" },
    { image: "/member-story-2.png", name: "Maya", className: "story-short" },
    { image: "/member-story-3.png", name: "Daniel", className: "story-short" },
    { image: "/member-story-4.png", name: "Alex", className: "story-tall" },
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

      <section className="care-toolkit" aria-labelledby="care-toolkit-title">
        <header>
          <h3 id="care-toolkit-title">Everything you need to move forward,</h3>
          <p>all in one place.</p>
          <a href="#care">Explore your options <span>›</span></a>
        </header>
        <div className="care-toolkit-grid">
          <article>
            <div className="toolkit-visual tracker-visual"><div className="tracker-card"><small>WEEK 4</small><strong>↓ 12 lbs</strong><span>Keep it up!</span><i /></div></div>
            <h4>Progress tracking</h4><p>Follow milestones and see how your care plan is progressing.</p>
          </article>
          <article>
            <div className="toolkit-visual dose-visual"><div className="dose-card"><small>THIS WEEK</small><strong>0.25 mg</strong><button type="button">✓ Logged</button></div></div>
            <h4>Simple treatment reminders</h4><p>Stay on schedule with clear, easy-to-follow treatment guidance.</p>
          </article>
          <article>
            <div className="toolkit-visual support-visual"><img src={sitePath("/benefit-care-from-home-transparent.png")} alt="" /><div><span>Care team</span><small>How are you feeling today?</small><small>Your provider is here to help.</small></div></div>
            <h4>Ongoing support</h4><p>Message your care team when questions come up along the way.</p>
          </article>
          <article>
            <div className="toolkit-visual product-visual"><div className="product-glass"><img src={sitePath("/adnan-amino-quad.png")} alt="" /><span>Daily support</span></div></div>
            <h4>Curated wellness options</h4><p>Thoughtful treatments selected to support your individual goals.</p>
          </article>
        </div>
      </section>

      <section className="member-testimonials" aria-labelledby="member-testimonials-title">
        <div className="testimonial-heading">
          <h3 id="member-testimonials-title">Member stories</h3>
          <div aria-hidden="true"><span /><button type="button">←</button><button type="button">→</button></div>
        </div>
        <div className="testimonial-rail">
          <article>
            <div className="testimonial-person"><img src={sitePath("/weight-management-cover.png")} alt="" /><span><strong>Daniel</strong><small>42 years old</small></span></div>
            <div className="testimonial-body"><blockquote>“The process felt clear from the beginning. I could focus on my goals without wondering what came next.”</blockquote><div><span>More energy</span><span>Better routine</span></div></div>
            <div className="testimonial-result"><small>Before treatment</small><strong>9.77</strong><i>3 months</i><strong>26.50</strong><em>171% improvement</em></div>
          </article>
          <article>
            <div className="testimonial-person"><img src={sitePath("/hair-loss-cover.png")} alt="" /><span><strong>Richard</strong><small>53 years old</small></span></div>
            <div className="testimonial-body"><blockquote>“Having provider support online made care easier to fit into my week and helped me stay consistent.”</blockquote><div><span>More confidence</span><span>Easy access</span></div></div>
            <div className="testimonial-result"><small>Member rating</small><strong>4.9</strong><i>out of 5</i><strong>★★★★★</strong><em>Verified experience</em></div>
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
  }, []);

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
