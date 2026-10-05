"use client";

import { useEffect, useState } from "react";

const phrases = ["Your health.", "Your energy.", "Your confidence.", "Your wellbeing."];

export default function NewHeroTitle() {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;

    function tick() {
      const phrase = phrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      setText(phrase.slice(0, characterIndex));

      if (deleting && characterIndex === 0) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        deleting = false;
        timer = setTimeout(tick, 500);
      } else if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        timer = setTimeout(tick, 1500);
      } else {
        timer = setTimeout(tick, deleting ? 30 : 50);
      }
    }

    function reset() {
      clearTimeout(timer);
      phraseIndex = 0;
      characterIndex = phrases[0].length;
      deleting = true;
      setText(phrases[0]);
      if (!motion.matches) timer = setTimeout(tick, 1500);
    }

    if (!motion.matches) timer = setTimeout(tick, 1500);
    motion.addEventListener("change", reset);
    return () => {
      clearTimeout(timer);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <h1 className="new-hero-title" aria-label="Your health. More in your hands.">
      <span className="new-hero-title-word" aria-hidden="true">{text}</span>
      <span className="new-hero-title-fixed" aria-hidden="true">More in your hands.</span>
    </h1>
  );
}
