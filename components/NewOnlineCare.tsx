"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "@/lib/site-path";

export default function NewOnlineCare() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  function updatePosition() {
    const el = track.current;
    if (el) setPosition({ start: el.scrollLeft < 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }
  useEffect(() => {
    const observer = new ResizeObserver(updatePosition);
    if (track.current) observer.observe(track.current);
    return () => observer.disconnect();
  }, []);
  function slide(direction: number) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const gap = Number.parseFloat(window.getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  return (
    <section className="new-online-care" aria-labelledby="new-online-care-title">
      <header><div><span className="new-online-care-kicker">CARE THAT FITS YOUR DAY</span><h3 id="new-online-care-title">Completely online.<br />On your schedule.</h3></div>
        <div className="new-online-care-actions"><a href={sitePath("/categories?category=weight-management")}>Get started <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a><a href={sitePath("/login?theme=v6")}>See if you&apos;re eligible</a></div>
      </header>
      <div className="new-online-care-track" ref={track} onScroll={updatePosition} tabIndex={0} aria-label="Online care benefits">
        <article className="new-online-provider"><h4>24/7 provider<br />support</h4><img className="new-online-care-art" src={sitePath("/online-care-provider.jpg")} alt="A smiling doctor ready to support your care" loading="lazy" /><div className="new-online-provider-message"><span className="new-online-status" aria-hidden="true" /><div><strong>Your care team</strong><span>Here when you need us.</span></div><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 1 1 18 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></div></article>
        <article><h4>Easily manage treatments</h4><div className="new-online-care-phone"><div className="new-online-care-phone-top"><strong>ScriptRx</strong><span aria-hidden="true">☰</span></div><h5>Your care</h5><p>Your treatments, orders, and messages.</p><div className="new-online-care-phone-card"><h5>Current treatments</h5><div className="new-online-care-order"><img src={sitePath("/adnan-nad-injection.png")} alt="" /><div><strong>NAD+ Injection</strong><small>Personalized treatment plan</small><span>View treatment</span></div></div><div className="new-online-care-order-footer"><span>Manage your plan</span><span>See details ›</span></div></div><div className="new-online-care-phone-card"><h5>Messages</h5><p>Your care team is here for you.</p></div></div></article>
        <article className="new-online-medications"><h4>Personalized<br />medication options</h4><div className="new-online-medication-art"><img src={sitePath("/weight-pen.png")} alt="Injectable treatment pen" loading="lazy" /><img src={sitePath("/adnan-nad-injection.png")} alt="NAD+ treatment vial" loading="lazy" /><img src={sitePath("/adnan-amino-quad.png")} alt="Amino-Quad treatment bottle" loading="lazy" /></div><span className="new-online-care-caption">Care tailored to your goals.</span></article>
        <article className="new-online-delivery"><h4>Care delivered<br />to your door</h4><img className="new-online-care-art" src={sitePath("/online-care-delivery.jpg")} alt="A discreet lavender treatment delivery box" loading="lazy" /><span className="new-online-care-caption">A simpler way to stay on track.</span></article>
      </div>
      <footer><p>Prescriptions require an online consultation with a licensed provider. Treatment options depend on your health history and provider assessment.</p>{!(position.start && position.end) && <div><button type="button" onClick={() => slide(-1)} disabled={position.start} aria-label="Previous care benefit"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button><button type="button" onClick={() => slide(1)} disabled={position.end} aria-label="Next care benefit"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div>}</footer>
    </section>
  );
}
