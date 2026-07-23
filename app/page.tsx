import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScriptRx — Better care, without the waiting room",
  description:
    "Private, personalized online care for weight, hair, sexual health, skin, and everyday wellness.",
};

const treatments = [
  { name: "Weight care", note: "Plans built around you", className: "weight", icon: "↘" },
  { name: "Hair growth", note: "Keep more of it", className: "hair", icon: "✦" },
  { name: "Sexual health", note: "Feel like yourself", className: "sexual", icon: "♡" },
  { name: "Skin care", note: "Clearer days ahead", className: "skin", icon: "◌" },
];

const steps = [
  {
    number: "01",
    title: "Tell us what’s going on",
    copy: "Answer a few thoughtful questions about your health, goals, and medical history. It takes about 5 minutes.",
  },
  {
    number: "02",
    title: "Meet your provider",
    copy: "A licensed provider reviews your answers and connects with you online to create a plan that fits.",
  },
  {
    number: "03",
    title: "Care comes to you",
    copy: "If prescribed, treatment ships discreetly to your door. Message your care team whenever you need.",
  },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span>NEW</span> Personalized care, prescribed online
        <a href="#treatments">Explore treatments <b>→</b></a>
      </div>

      <header className="nav shell">
        <a className="brand" href="#" aria-label="ScriptRx home">
          script<span>rx</span><i>.</i>
        </a>
        <nav aria-label="Main navigation">
          <a href="#treatments">Treatments</a>
          <a href="#how">How it works</a>
          <a href="#why">Why ScriptRx</a>
        </nav>
        <div className="nav-actions">
          <a className="login" href="#login">Log in</a>
          <a className="button button-small" href="#treatments">Get started <span>↗</span></a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner shell">
          <div className="hero-copy">
            <div className="eyebrow"><i /> REAL CARE. REAL CONVENIENT.</div>
            <h1>Feel good.<br /><em>Live better.</em></h1>
            <p>Personalized treatments, licensed providers, and ongoing support—without the waiting room.</p>
            <div className="hero-actions">
              <a className="button" href="#treatments">Find my treatment <span>→</span></a>
              <a className="text-link" href="#how"><i>▶</i> See how it works</a>
            </div>
            <div className="trust-row">
              <div className="avatars" aria-hidden="true"><i>MA</i><i>JL</i><i>SK</i></div>
              <div><b>Trusted care, nationwide</b><span>Licensed providers in all 50 states</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Personalized ScriptRx care plan preview">
            <div className="sun" />
            <div className="spark spark-one">✦</div>
            <div className="spark spark-two">✦</div>
            <div className="care-card">
              <div className="care-top">
                <span>Your care plan</span><i>ACTIVE</i>
              </div>
              <div className="care-title">
                <div className="rx-mark">Rx</div>
                <div><small>PERSONALIZED FOR YOU</small><h3>Metabolic reset</h3></div>
              </div>
              <div className="progress-label"><span>Month 2 of 6</span><b>On track</b></div>
              <div className="progress"><i /></div>
              <div className="care-footer">
                <div><small>NEXT CHECK-IN</small><b>Aug 12</b></div>
                <button aria-label="Open messages">Message provider <span>→</span></button>
              </div>
            </div>
            <div className="provider-chip">
              <div className="provider-avatar">DR</div>
              <div><b>Dr. Riley Chen</b><span><i /> Online now</span></div>
              <strong>•••</strong>
            </div>
            <div className="delivery-chip">
              <span>✓</span>
              <div><b>Discreet delivery</b><small>Ships free to your door</small></div>
            </div>
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <span>PERSONALIZED CARE</span><b>✦</b><span>LICENSED PROVIDERS</span><b>✦</b><span>FREE DELIVERY</span><b>✦</b><span>ONGOING SUPPORT</span>
        </div>
      </section>

      <section className="treatments section shell" id="treatments">
        <div className="section-heading">
          <div><span className="kicker">CARE FOR THE REAL YOU</span><h2>What can we help<br />you feel better about?</h2></div>
          <p>From everyday concerns to bigger health goals, get expert care that fits your life.</p>
        </div>
        <div className="treatment-grid">
          {treatments.map((item) => (
            <a className={`treatment-card ${item.className}`} href="#how" key={item.name}>
              <span className="treatment-icon">{item.icon}</span>
              <div><small>{item.note}</small><h3>{item.name}</h3></div>
              <i className="round-arrow">↗</i>
            </a>
          ))}
        </div>
        <div className="browse-row"><a href="#treatments">Browse all treatments <span>→</span></a></div>
      </section>

      <section className="how section" id="how">
        <div className="shell">
          <div className="how-intro">
            <span className="kicker light">SIMPLE BY DESIGN</span>
            <h2>Healthcare that works<br /><em>around your life.</em></h2>
            <p>No crowded waiting rooms. No awkward pharmacy lines. Just thoughtful, private care—wherever you are.</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <article className="step" key={step.number}>
                <div className="step-num">{step.number}</div>
                <div className={`step-art step-art-${index + 1}`}>
                  {index === 0 && <><div className="mini-form"><i /><i /><i /></div><span>5 min</span></>}
                  {index === 1 && <><div className="video-person">RC</div><span>● live</span></>}
                  {index === 2 && <><div className="package">script<span>rx</span>.</div><span>✓</span></>}
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          <a className="button button-light" href="#treatments">Start your visit <span>→</span></a>
        </div>
      </section>

      <section className="difference section shell" id="why">
        <div className="difference-panel">
          <div className="difference-copy">
            <span className="kicker">WHY SCRIPTRX</span>
            <h2>Care should feel<br /><em>this good.</em></h2>
            <p>We bring the expertise of a great clinic together with the ease of doing everything from home.</p>
            <ul>
              <li><span>✓</span><div><b>Clinician-led, always</b><small>Your plan is reviewed by a licensed healthcare provider.</small></div></li>
              <li><span>✓</span><div><b>Personal, not one-size-fits-all</b><small>Treatment built around your goals, history, and preferences.</small></div></li>
              <li><span>✓</span><div><b>Support that sticks around</b><small>Easy check-ins and ongoing access to your care team.</small></div></li>
            </ul>
          </div>
          <div className="quote-card">
            <div className="quote-top"><span>“</span><div>★★★★★</div></div>
            <blockquote>“For the first time, healthcare feels like it was designed for actual humans.”</blockquote>
            <div className="quote-author"><i>AM</i><div><b>Alex M.</b><span>Verified ScriptRx patient</span></div></div>
            <div className="quote-stat"><strong>4.9</strong><span>average patient rating</span></div>
          </div>
        </div>
      </section>

      <section className="cta shell">
        <span className="cta-spark">✦</span>
        <div><span className="kicker light">YOUR HEALTH. YOUR MOVE.</span><h2>Ready when you are.</h2><p>Start with a quick online visit. No commitment, no waiting room.</p></div>
        <a className="button button-light" href="#treatments">Get started today <span>↗</span></a>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand"><a className="brand footer-logo" href="#">script<span>rx</span><i>.</i></a><p>Better care, built around real life.</p></div>
          <div><b>Treatments</b><a href="#treatments">Weight care</a><a href="#treatments">Hair growth</a><a href="#treatments">Sexual health</a><a href="#treatments">Skin care</a></div>
          <div><b>ScriptRx</b><a href="#how">How it works</a><a href="#why">Why ScriptRx</a><a href="#why">Medical team</a><a href="#why">Safety</a></div>
          <div><b>Support</b><a href="#login">Help center</a><a href="#login">Contact us</a><a href="#login">Log in</a></div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 ScriptRx. All rights reserved.</span>
          <div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Telehealth consent</a></div>
        </div>
      </footer>
    </main>
  );
}
