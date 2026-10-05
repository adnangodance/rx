"use client";

export type SiteVersion = "v1" | "v2" | "v3" | "v4" | "v5" | "v6";

export const DEFAULT_SITE_VERSION: SiteVersion = "v6";
// Keep the alternate designs available in code while the New design is the only public version.
export const SHOW_DESIGN_VERSIONS = false;

export const isSiteVersion = (version: string | null): version is SiteVersion =>
  version === "v1" || version === "v2" || version === "v3" || version === "v4" || version === "v5" || version === "v6";

export const resolveSiteVersion = (version: string | null): SiteVersion =>
  SHOW_DESIGN_VERSIONS && isSiteVersion(version) ? version : DEFAULT_SITE_VERSION;

export const usesAdnanDesign = (version: SiteVersion): boolean => version === "v5" || version === "v6";

export const isClassicVersion = (version: SiteVersion): boolean => version === "v1" || usesAdnanDesign(version);

export default function VersionBar({ version, onChange }: { version: SiteVersion; onChange: (version: SiteVersion) => void }) {
  if (!SHOW_DESIGN_VERSIONS) return null;
  return (
    <div className="version-bar-top">
      <span>Switch Design Version:</span>
      <button type="button" className={`v-btn ${version === "v1" ? "active" : ""}`} onClick={() => onChange("v1")}>Version 1 (Classic)</button>
      <button type="button" className={`v-btn ${version === "v2" ? "active" : ""}`} onClick={() => onChange("v2")}>Version 2 (Light Green)</button>
      <button type="button" className={`v-btn ${version === "v3" ? "active" : ""}`} onClick={() => onChange("v3")}>Version 3 (Warm Chocolate &amp; Sand)</button>
      <button type="button" className={`v-btn ${version === "v4" ? "active" : ""}`} onClick={() => onChange("v4")}>Version 4 (Soft Pink)</button>
      <button type="button" className={`v-btn ${version === "v5" ? "active" : ""}`} onClick={() => onChange("v5")}>Adnan Suggestion</button>
      <button type="button" className={`v-btn ${version === "v6" ? "active" : ""}`} onClick={() => onChange("v6")}>New</button>
    </div>
  );
}
