"use client";

import { useEffect, useState, type FormEvent } from "react";

type LoginVersion = "v1" | "v2" | "v3";

const versionNames: Record<LoginVersion, string> = {
  v1: "Classic",
  v2: "Light green",
  v3: "Warm",
};

export default function LoginExperience() {
  const [version, setVersion] = useState<LoginVersion>("v3");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const theme = new URLSearchParams(window.location.search).get("theme");
    if (theme === "v1" || theme === "v2" || theme === "v3") {
      setVersion(theme);
    }
  }, []);

  function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem("scriptrx-authenticated", "true");
    localStorage.setItem("scriptrx-theme", version);
    window.location.href = "/";
  }

  return (
    <main className={`login-page login-theme-${version}`}>
      <header className="login-nav">
        <a className="login-logo" href="/">Scriptrx</a>
      </header>

      <section className="login-layout">
        <aside className="login-visual" aria-label={`${versionNames[version]} ScriptRx care theme`}>
          <div className="login-glow" />
          <img className="login-product-tablet" src="/product-tablet.png" alt="" />
          <img className="login-product-vial" src="/product-b12.png" alt="" />
          <img className="login-product-pen" src="/weight-pen.png" alt="" />
        </aside>

        <div className="login-panel">
          <div className="login-form-shell">
            <div className="login-copy">
              <h1>Welcome back</h1>
              <p>Access your ScriptRx account and continue your care.</p>
            </div>

            <div className="login-socials">
              <button type="button"><i>G</i> Continue with Google</button>
            </div>
            <div className="login-divider"><span>or</span></div>
            <form className="login-form" onSubmit={handleContinue}>
              <div className="login-field">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <button className="login-submit login-submit-centered" type="submit">Continue</button>
              <p className="login-legal">By continuing, you agree to our <a href="#">Terms</a> and acknowledge our <a href="#">Privacy Policy</a>.</p>
              <p className="login-signup">New to ScriptRx? <a href="/#care">Get started</a></p>
            </form>
          </div>
          <p className="login-secure"><i>✓</i> Private and securely protected.</p>
        </div>
      </section>
    </main>
  );
}
