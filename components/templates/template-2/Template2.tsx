"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import { Catalog, CareTeam, Closing, Faq, FindYourFit, Footer, HowItWorks, Plans, Reviews, Tracker, TrustLine, type CatalogFilter } from "./sections";
import "./template-2.css";

export default function Template2() {
  const rootRef = useRef<HTMLDivElement>(null);
  // Shared so the intake result can open the catalog on its suggested category.
  const [filter, setFilter] = useState<CatalogFilter>("all");

  // Scroll reveal: only when motion is allowed, and never hides content without JS.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    root.classList.add("t2-reveal-on");
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      root.classList.remove("t2-reveal-on");
    };
  }, []);

  const browse = (category: CatalogFilter) => {
    setFilter(category);
    document.getElementById("treatments")?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="t2" id="top" ref={rootRef}>
      <a className="t2-skip" href="#t2-main">Skip to content</a>
      <Header />
      <main id="t2-main">
        <Hero />
        <TrustLine />
        <FindYourFit onBrowse={browse} />
        <Catalog filter={filter} onFilter={setFilter} />
        <HowItWorks />
        <Tracker />
        <Plans />
        <Reviews />
        <CareTeam />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
