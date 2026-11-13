import type { CSSProperties, ReactNode } from "react";
import { sitePath } from "@/lib/site-path";
import "./NewHero.css";

type HeroLink = { label: string; href: string };

export type NewHeroProps = {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  checklist?: string[];
  primary: HeroLink;
  secondary?: HeroLink;
  stats?: { title: string; sub: string }[];
  image: string;
  /** Extra floating element rendered inside the card (e.g. a glass promo card). */
  aside?: ReactNode;
};

// Staggered blur-up entrance: each item starts 80ms after the previous one.
const delay = (index: number) => ({ "--sp-d": `${(0.15 + index * 0.08).toFixed(2)}s` }) as CSSProperties;

export default function NewHero({ eyebrow, title, sub, checklist, primary, secondary, stats = [], image, aside }: NewHeroProps) {
  let step = 0;
  return (
    <section className="sp-hero" aria-labelledby="sp-hero-title">
      <div className="sp-hero-card">
        <div className="sp-hero-media">
          <img className="sp-hero-poster" src={sitePath(image)} alt="" fetchPriority="high" />
        </div>
        <div className="sp-hero-wash" aria-hidden="true" />
        <div className="sp-hero-content">
          <div className="sp-hero-text">
            <div className="sp-hero-eyebrow sp-r" style={delay(step++)}>{eyebrow}</div>
            <h1 id="sp-hero-title" className="sp-hero-title sp-r" style={delay(step++)}>{title}</h1>
            {sub && <p className="sp-hero-sub sp-r" style={delay(step++)}>{sub}</p>}
          </div>
          {checklist && (
            <ul className="sp-hero-checklist sp-r" style={delay(step++)}>
              {checklist.map(item => (
                <li key={item}>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <div className="sp-hero-cta sp-r" style={delay(step++)}>
            <a className="sp-hero-btn" href={sitePath(primary.href)}>{primary.label}</a>
            {secondary && <a className="sp-hero-btn is-ghost" href={sitePath(secondary.href)}>{secondary.label}</a>}
          </div>
        </div>
        {aside && <div className="sp-hero-aside sp-r" style={delay(step + stats.length)}>{aside}</div>}
        {stats.length > 0 && (
          <div className="sp-hero-stats">
            {stats.map(stat => (
              <div key={stat.title} className="sp-hero-stat sp-r" style={delay(step++)}>
                <div className="sp-hero-stat-title">{stat.title}</div>
                <div className="sp-hero-stat-sub">{stat.sub}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
