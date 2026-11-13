"use client";

import { useState, type CSSProperties } from "react";
import { sitePath } from "@/lib/site-path";

const img = (file: string) => sitePath(`/platform/${file}`);

/* ---------- Under-hero: live storefront theme builder ---------- */
const themeColours = [
  { name: "Navy", value: "#29377d", ink: "#ffffff", tint: "#eef0f8" },
  { name: "Teal", value: "#7baab3", ink: "#0f2a2f", tint: "#eef5f6" },
  { name: "Cream", value: "#efebe4", ink: "#29261f", tint: "#f7f5f1" },
  { name: "Periwinkle", value: "#a3b0d6", ink: "#1c2550", tint: "#f0f2fa" },
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "your-brand";

export function ThemeBuilder() {
  const [name, setName] = useState("Willow");
  const [domain, setDomain] = useState("willow.example");
  const [domainEdited, setDomainEdited] = useState(false);
  const [colour, setColour] = useState(themeColours[0]);
  const brandName = name.trim() || "Your brand";
  const style = { "--brand": colour.value, "--brand-ink": colour.ink, "--brand-tint": colour.tint } as CSSProperties;

  return (
    <div className="pl-theme" style={style}>
      <div className="pl-theme-preview" aria-label={`Preview of the ${brandName} storefront`} role="img">
        <div className="pl-theme-chrome"><span aria-hidden="true">•••</span><b>{domain || "your-domain.com"}</b></div>
        <div className="pl-theme-site">
          <div className="pl-theme-nav">
            <strong>{brandName}</strong>
            <span>Men&apos;s Health</span><span>Women&apos;s Health</span><span>Log in</span>
          </div>
          <div className="pl-theme-hero">
            <div>
              <small>CARE THAT MOVES WITH YOU</small>
              <p className="pl-theme-title">Your health.<br />More in your hands.</p>
              <em className="pl-theme-btn">Get Started</em>
            </div>
            <span className="pl-theme-photo"><img src={img("photo-couple-white.png")} alt="" /></span>
          </div>
          <div className="pl-theme-cards">
            <span><b>A plan made for your progress.</b><img src={img("product-pen.png")} alt="" /></span>
            <span><b>MIC+B12 for mood and energy</b><img src={img("product-b12.png")} alt="" /></span>
          </div>
        </div>
      </div>

      <form className="pl-theme-panel" onSubmit={e => e.preventDefault()} aria-label="Storefront theme settings">
        <div className="pl-theme-panel-head"><b>Storefront theme</b><span className="pl-chip">Sample data</span></div>
        <label>
          <span>Business name</span>
          <input value={name} maxLength={28} onChange={e => {
            setName(e.target.value);
            if (!domainEdited) setDomain(`${slugify(e.target.value)}.example`);
          }} />
        </label>
        <label>
          <span>Domain</span>
          <input value={domain} maxLength={40} onChange={e => { setDomain(e.target.value); setDomainEdited(true); }} />
        </label>
        <fieldset>
          <legend>Brand colour</legend>
          <div className="pl-swatches" role="radiogroup" aria-label="Brand colour">
            {themeColours.map(c => (
              <button key={c.value} type="button" role="radio" aria-checked={c.value === colour.value} aria-label={c.name} className="pl-swatch" style={{ background: c.value }} onClick={() => setColour(c)} />
            ))}
          </div>
          <code>{colour.value.toUpperCase()}</code>
        </fieldset>
        <div className="pl-theme-note"><b>Logo, colour, catalog.</b><span>A storefront that feels like you.</span></div>
      </form>
    </div>
  );
}
