"use client";

import { useId, useState } from "react";
import { Plus } from "./icons";

type Item = { q: string; a: string };

/** One-open-at-a-time accordion. Height animates via grid-template-rows (see template-1.css). */
export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="t1-faq-list">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${uid}-q-${index}`;
        const panelId = `${uid}-a-${index}`;
        return (
          <div className={`t1-faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
            <h3 className="t1-faq-q">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                <span className="t1-faq-toggle"><Plus /></span>
              </button>
            </h3>
            <div className="t1-faq-panel" id={panelId} role="region" aria-labelledby={buttonId} inert={!isOpen}>
              <div className="t1-faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
