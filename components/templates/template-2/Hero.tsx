"use client";

import { useState } from "react";
import { sitePath } from "@/lib/site-path";
import { ArrowRight } from "./icons";
import { ASSET_BASE, BRAND_FULL, goals, products, type CategoryId } from "./data";

export default function Hero() {
  const [goalId, setGoalId] = useState<CategoryId>(goals[0].id);
  const goal = goals.find(item => item.id === goalId) ?? goals[0];
  const product = products.find(item => item.id === goal.productId) ?? products[0];

  return (
    <section className="t2-hero t2-dark" aria-labelledby="t2-hero-title">
      <div className="t2-hero-media" aria-hidden="true">
        <img src={sitePath(`${ASSET_BASE}/hero-interior.jpg`)} alt="" fetchPriority="high" />
      </div>

      <div className="t2-shell t2-hero-inner">
        <div className="t2-hero-copy">
          <p className="t2-eyebrow"><i aria-hidden="true" />{BRAND_FULL} · Online care</p>
          <h1 id="t2-hero-title">Considered care,{" "}<br /><span>quietly delivered.</span></h1>
          <p className="t2-hero-lede">
            Tell us what you would like to work on. A licensed provider reviews your visit and, if a treatment is prescribed, our pharmacists prepare it and send it to your door.
          </p>
          <div className="t2-hero-cta">
            <a className="t2-btn is-ivory" href="#fit">Start a visit <ArrowRight /></a>
            <a className="t2-btn is-line" href="#treatments">Explore treatments</a>
          </div>
        </div>

        {/* Goal picker: each chip swaps the featured treatment beside it. */}
        <div className="t2-picker t2-glass">
          <div className="t2-goals">
            <p id="t2-goals-label">What would you like to work on?</p>
            <ul role="list" aria-labelledby="t2-goals-label">
              {goals.map(item => (
                <li key={item.id}>
                  <button type="button" className="t2-chip" aria-pressed={item.id === goalId} onClick={() => setGoalId(item.id)}>{item.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="t2-feature-card" aria-live="polite">
            <span className="t2-feature-thumb">
              {/* Keyed so the render fades in again whenever the goal changes. */}
              <img key={product.id} src={sitePath(`${ASSET_BASE}/${product.image}`)} alt="" style={product.scale ? { height: `${product.scale * 78}%` } : undefined} />
            </span>
            <div className="t2-feature-text" key={product.id}>
              <p className="t2-feature-form">Featured · {product.form}</p>
              <h2>{product.name}</h2>
              <p className="t2-feature-line">{goal.line}</p>
            </div>
            <p className="t2-price">
              <span className="t2-price-main"><span>from</span> <b>${product.price}</b><span>/mo</span></span>
              <small>Sample price · if prescribed</small>
            </p>
            <a className="t2-round is-ivory" href="#fit" aria-label={`Start a visit about ${product.name}`}><ArrowRight /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
