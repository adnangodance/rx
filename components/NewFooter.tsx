import { sitePath } from "@/lib/site-path";
import "./NewFooter.css";

const popularLinks = [
  ["Weight management", "/categories?category=weight-management"],
  ["Sexual health", "/categories?category=sexual-health"],
  ["Testosterone", "/categories?category=sexual-health"],
  ["Hair loss", "/categories?category=hair-care"],
  ["Skin care", "/categories?category=acne"],
  ["Women’s health", "/categories?category=womens-health"],
  ["Peptides & longevity", "/categories?category=longevity"],
  ["NAD+", "/categories?category=longevity"],
];

const exploreLinks = [
  ["ScriptRx home", "#top"],
  ["Popular treatments", "#longevity-products"],
  ["Care categories", "#new-care-services-title"],
  ["Member stories", "#member-testimonials-title"],
  ["FAQs", "#faq"],
];

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <nav className="new-eden-footer-column" aria-label={`Footer ${title.toLowerCase()}`}>
      <h2>{title}</h2>
      <ul>
        {links.map(([label, href]) => (
          <li key={label}><a href={sitePath(href)}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

export default function NewFooter({ homeLinks = false }: { homeLinks?: boolean }) {
  const homeAnchor = (anchor: string) => homeLinks ? `/${anchor}` : anchor;
  return (
    <footer className="new-eden-footer" id="footer" aria-label="ScriptRx footer">
      <div className="new-eden-footer-shell">
        <div className="new-eden-footer-main">
          <div className="new-eden-footer-brand">
            <a className="new-eden-footer-logo" href={sitePath(homeAnchor("#top"))} aria-label="ScriptRx home">
              scriptrx
            </a>
            <div className="new-eden-footer-start">
              <p>Personalized care starts with you.</p>
              <a className="new-eden-footer-cta" href={sitePath("/categories")}>
                <span>Find your treatment</span>
                <span>Get started <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </a>
              <p className="new-eden-footer-description">Explore treatment options with a licensed provider, with care tailored to your needs and ongoing online support.</p>
            </div>
          </div>
          <FooterLinks title="Popular" links={popularLinks} />
          <FooterLinks title="Explore" links={exploreLinks.map(([label, href]) => [label, homeAnchor(href)])} />
          <div className="new-eden-footer-groups">
            <FooterLinks title="Your care" links={[
              ["Browse all treatments", "/categories"],
              ["Your account", "/login?theme=v6"],
              ["Your cart", "/cart"],
              ["Get started", "/categories"],
            ]} />
            <FooterLinks title="Support" links={[
              ["Common questions", homeAnchor("#faq")],
              ["How ScriptRx works", homeAnchor("#faq")],
              ["Treatment availability", homeAnchor("#faq")],
            ]} />
          </div>
        </div>
        <div className="new-eden-footer-bottom">
          <nav aria-label="Footer quick links">
            <a href={sitePath("/login?theme=v6")}>Member log in</a>
            <a href={sitePath(homeAnchor("#faq"))}>Get answers</a>
            <a href="#top">Back to top <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 16V4m-5 5 5-5 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </nav>
          <div className="new-eden-footer-care">
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m16 3 11 4v9c0 6-5 10-11 13C10 26 5 22 5 16V7l11-4Z" stroke="currentColor" strokeWidth="1.3" /><path d="m11 16 3.5 3.5L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p>Provider-guided care<span>100% online</span></p>
          </div>
        </div>
      </div>
      <div className="new-eden-footer-copyright">© {new Date().getFullYear()} ScriptRx. All rights reserved.</div>
    </footer>
  );
}
