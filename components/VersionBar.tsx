"use client";

export type SiteVersion = "v1" | "v2" | "v3" | "v4";

export default function VersionBar({ version, onChange }: { version: SiteVersion; onChange: (version: SiteVersion) => void }) {
  return (
    <div className="version-bar-top">
      <span>Switch Design Version:</span>
      <button type="button" className={`v-btn ${version === "v1" ? "active" : ""}`} onClick={() => onChange("v1")}>Version 1 (Classic)</button>
      <button type="button" className={`v-btn ${version === "v2" ? "active" : ""}`} onClick={() => onChange("v2")}>Version 2 (Light Green)</button>
      <button type="button" className={`v-btn ${version === "v3" ? "active" : ""}`} onClick={() => onChange("v3")}>Version 3 (Warm Chocolate &amp; Sand)</button>
      <button type="button" className={`v-btn ${version === "v4" ? "active" : ""}`} onClick={() => onChange("v4")}>Version 4 (Soft Pink)</button>
    </div>
  );
}
