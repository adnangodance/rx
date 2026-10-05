"use client";

import { useEffect, useRef } from "react";
import { sitePath } from "@/lib/site-path";
import NewSectionReveal from "@/components/NewSectionReveal";

type CareTreatment = {
  id: string;
  label: string;
  category: string;
  description: string;
  cta: string;
  icon: string;
  productImage?: string;
  secondaryImage?: string;
};

const treatments: CareTreatment[] = [
  { id: "metabolic", label: "Metabolic", category: "longevity", description: "Personalized support for your energy, metabolism, and everyday wellness, guided by a licensed provider.", cta: "Explore metabolic care", icon: "M12 3c-3 0-5 3-3 6s-1 4-3 5-2 5 1 6m5-17c4 2 5 5 3 8s-1 5 3 6" },
  { id: "hormone", label: "Hormone Treatment", category: "sexual-health", description: "Find hormone treatment options that fit your needs, with private online consultations and ongoing support.", cta: "Explore hormone care", icon: "m6 3 15 15m-18-9 12 12M5 2 2 5m9 0-6 6m11 2-6 6m12 0-3 3M3 9l6-6m6 18 6-6" },
  { id: "weight", label: "Weight Loss", category: "weight-management", description: "Take the next step toward your goals with a personalized weight management plan and provider support.", cta: "Explore weight care", icon: "M12 7v14m-5-10 5-4 5 4M8 4h8M12 7 8 21m4-14 4 14" },
  { id: "sexual", label: "Sexual Health", category: "sexual-health", description: "Explore discreet treatment options for intimacy and sexual wellness, with care tailored to your needs.", cta: "Explore sexual health", icon: "M12 15v7m-3-3h6M17 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" },
  { id: "hair", label: "Hair Loss", category: "hair-care", description: "Explore personalized topical treatment options and build a hair care routine with guidance from a licensed provider.", cta: "Explore hair care", icon: "M5 20c0-7 2-13 7-16m0 16c0-7 1-12 5-16m0 16c0-5 1-8 3-11M3 11c0-4 1-6 3-8", productImage: "/adnan-hair-loss-duo.png" },
  { id: "skin", label: "Skin Care", category: "acne", description: "Find prescription skin care options for acne and everyday skin concerns, with a treatment plan tailored to your needs.", cta: "Explore skin care", icon: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z", productImage: "/adnan-tretinoin.png", secondaryImage: "/adnan-ghk-cu-cream.png" },
  { id: "women", label: "Women’s Health", category: "womens-health", description: "Get private, provider-guided support for hormonal changes, intimacy, and everyday wellbeing at every stage of your journey.", cta: "Explore women’s health", icon: "M12 15v7m-3-3h6M17 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z", productImage: "/adnan-estradiol.png" },
  { id: "longevity", label: "Peptides & Longevity", category: "longevity", description: "Discover treatment options for energy and long-term wellness, and discuss your goals with a licensed provider.", cta: "Explore longevity care", icon: "M3 12h4l3-8 4 16 3-8h4", productImage: "/adnan-amino-quad.png", secondaryImage: "/adnan-nad-injection.png" },
];

export default function NewCarePortraits() {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let drag: { pointer: number; x: number; left: number; moved: boolean } | null = null;
    let suppressClick = false;
    function start(event: PointerEvent) {
      if (!element || event.pointerType !== "mouse" || event.button !== 0) return;
      suppressClick = false;
      drag = { pointer: event.pointerId, x: event.clientX, left: element.scrollLeft, moved: false };
    }
    function move(event: PointerEvent) {
      if (!element || !drag || event.pointerId !== drag.pointer) return;
      const distance = event.clientX - drag.x;
      if (!drag.moved && Math.abs(distance) < 6) return;
      if (!drag.moved) {
        drag.moved = true;
        element.setPointerCapture(event.pointerId);
        element.dataset.dragging = "true";
      }
      event.preventDefault();
      element.scrollLeft = drag.left - distance;
    }
    function finish(event: PointerEvent) {
      if (!element || !drag || event.pointerId !== drag.pointer) return;
      suppressClick = drag.moved && event.type === "pointerup";
      drag = null;
      delete element.dataset.dragging;
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    }
    function click(event: MouseEvent) {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }
    element.addEventListener("pointerdown", start);
    element.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
    element.addEventListener("lostpointercapture", finish);
    element.addEventListener("click", click, true);
    return () => {
      element.removeEventListener("pointerdown", start);
      element.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
      element.removeEventListener("lostpointercapture", finish);
      element.removeEventListener("click", click, true);
      delete element.dataset.dragging;
    };
  }, []);
  return (
    <NewSectionReveal><section className="new-care-services" aria-labelledby="new-care-services-title">
      <header>
        <h2 id="new-care-services-title">What brings you in today?</h2>
        <p>Care for what matters to you. Find a personalized treatment path, with a licensed provider to guide your next step.</p>
      </header>
      <div className="new-care-service-stage">
      <div className="new-care-service-track" id="new-care-service-track" ref={track} tabIndex={0} role="region" aria-label="Explore care categories. Swipe or drag to browse all eight options.">
        {treatments.map((treatment) => (
          <article className={`new-care-service-card new-care-service-${treatment.id}`} key={treatment.id}>
            <div className={`new-care-service-visual${treatment.productImage ? " new-care-service-product-visual" : ""}`} aria-hidden="true">
              <span className="new-care-service-icon"><svg viewBox="0 0 24 24" fill="none"><path d={treatment.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <CareIllustration category={treatment.id} />
              <img className={treatment.productImage ? "new-care-service-product" : "new-care-service-person"} src={sitePath(treatment.productImage || `/care-service-${treatment.id}.png`)} alt="" loading="lazy" draggable={false} />
              {treatment.secondaryImage && <img className="new-care-service-product-secondary" src={sitePath(treatment.secondaryImage)} alt="" loading="lazy" draggable={false} />}
            </div>
            <div className="new-care-service-content">
              <h3>{treatment.label}</h3>
              <p>{treatment.description}</p>
              <a href={sitePath(`/categories?category=${treatment.category}`)} draggable={false}>{treatment.cta}</a>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section></NewSectionReveal>
  );
}

function CareIllustration({ category }: { category: string }) {
  if (category === "metabolic") return <div className="new-care-mini-panel new-care-mini-metabolic"><small>Your wellness</small><div className="new-care-mini-ring"><span>Your<br /><strong>goals</strong></span></div><span className="new-care-mini-pill">Personalized care</span></div>;
  if (category === "hormone") return <div className="new-care-mini-panel new-care-mini-hormone"><span className="new-care-mini-check">✓</span><div><strong>Your treatment plan</strong><small>Provider-guided care</small></div><span className="new-care-mini-dot" /></div>;
  if (category === "weight") return <div className="new-care-mini-panel new-care-mini-weight"><small>Your progress</small><svg viewBox="0 0 160 75" fill="none"><path d="M5 65H155M5 42H155M5 19H155" stroke="#fff" strokeWidth="1" /><path d="M8 61C25 61 26 48 44 48S65 53 80 35 103 43 123 20 138 23 152 10" stroke="#6675da" strokeWidth="3" strokeLinecap="round" /></svg><span>One step at a time</span></div>;
  if (["hair", "skin", "women", "longevity"].includes(category)) {
    const messages: Record<string, [string, string]> = {
      hair: ["Your hair care", "A routine built for you"],
      skin: ["Your skin care", "Personalized treatment"],
      women: ["Your wellbeing", "Care for every chapter"],
      longevity: ["Your wellness", "Support for your goals"],
    };
    const [title, subtitle] = messages[category];
    return <div className="new-care-mini-panel new-care-mini-treatment"><span className="new-care-mini-check">✓</span><strong>{title}</strong><small>{subtitle}</small><span className="new-care-mini-pill">Provider-guided</span></div>;
  }
  return <div className="new-care-mini-panel new-care-mini-sexual"><svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg><strong>Private online care</strong><small>Support on your terms</small></div>;
}
