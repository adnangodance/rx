"use client";

import { useState } from "react";

export default function HeaderPillNav() {
  const tabs = ["Women's Health", "Weight Management", "Longevity"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <nav className="header-pill-track" aria-label="Main Navigation">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          type="button"
          className={`header-pill-item ${activeTab === idx ? "active" : ""}`}
          onClick={() => setActiveTab(idx)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
