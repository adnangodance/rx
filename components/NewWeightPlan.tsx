"use client";

import { useState, type CSSProperties } from "react";
import { sitePath } from "@/lib/site-path";
import NewSectionReveal from "@/components/NewSectionReveal";
import "./NewWeightPlan.css";

const ticks = Array.from({ length: 17 }, (_, index) => {
  const angle = (-155 + index * 130 / 16) * Math.PI / 180;
  const major = index % 4 === 0;
  const innerRadius = major ? 202 : 218;
  return {
    x1: 260 + Math.cos(angle) * innerRadius,
    y1: 290 + Math.sin(angle) * innerRadius,
    x2: 260 + Math.cos(angle) * 234,
    y2: 290 + Math.sin(angle) * 234,
    major,
  };
});

export default function NewWeightPlan() {
  const [startingWeight, setStartingWeight] = useState(332);
  const weightChange = Math.round(startingWeight * 0.16);
  const progress = (startingWeight - 140) / (500 - 140);

  return (
    <NewSectionReveal className="new-weight-plan-stage"><section className="new-weight-plan" id="weight-plan" aria-labelledby="new-weight-plan-title">
      <div className="new-weight-plan-shell">
        <div className="new-weight-plan-copy">
          <span className="new-weight-plan-label"><span aria-hidden="true">•</span> GLP-1</span>
          <h2 id="new-weight-plan-title">Achieve sustainable<br className="new-weight-plan-break" /> weight loss with<br className="new-weight-plan-break" /> our <span>personalized<br className="new-weight-plan-break" /> GLP-1 plan</span></h2>
          <p className="new-weight-plan-intro">Explore GLP-1 treatment options with a licensed provider and ongoing support designed around your goals.</p>
          <a className="new-weight-plan-button" href={sitePath("/categories?category=weight-management")}>Get started<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          <div className="new-weight-plan-proof">
            <div className="new-weight-plan-stat">
              <strong><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m6 6 20 20M9 26h17V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>16%</strong>
              <p>illustrative weight change<br />over one year*</p>
            </div>
            <p className="new-weight-plan-note" id="new-weight-plan-note">*Illustration based on a 16% change in starting weight, not a prediction or guarantee. Results and timing vary. A licensed provider determines whether treatment is appropriate.</p>
          </div>
        </div>
        <div className="new-weight-plan-calculator">
          <svg className="new-weight-plan-dial" viewBox="0 0 520 530" fill="none" aria-hidden="true">
            <path d="M42.5 188.6a240 240 0 0 1 435 0" stroke="#c0c7ff" strokeOpacity=".12" />
            <path d="m256 30 4 7 4-7" fill="#b9c0f0" />
            {ticks.map((tick, index) => <line key={index} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} stroke={tick.major ? "#c5cff9" : "#808ebc"} strokeOpacity={tick.major ? .8 : .4} strokeWidth={tick.major ? 2.5 : 2} strokeLinecap="round" />)}
            <line className="new-weight-plan-needle" x1="260" y1="104" x2="260" y2="58" stroke="#d6f3ee" strokeWidth="4" strokeLinecap="round" transform={`rotate(${(progress - 0.5) * 130} 260 290)`} />
          </svg>
          <div className="new-weight-plan-result">
            <p>An illustrative one-year goal</p>
            <output htmlFor="new-starting-weight" aria-live="polite" aria-atomic="true">−{weightChange} lbs</output>
          </div>
          <div className="new-weight-plan-slider">
            <label htmlFor="new-starting-weight">Starting weight: <span>{startingWeight} lbs</span></label>
            <input id="new-starting-weight" type="range" min="140" max="500" step="1" value={startingWeight} onChange={event => setStartingWeight(Number(event.target.value))} aria-valuetext={`${startingWeight} pounds`} aria-describedby="new-weight-plan-note" style={{ "--weight-progress": `${progress * 100}%` } as CSSProperties} />
          </div>
        </div>
      </div>
    </section></NewSectionReveal>
  );
}
