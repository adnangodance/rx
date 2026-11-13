import { img } from "./widgets";

const nav = [
  { label: "Overview", count: "", active: true },
  { label: "Treatments", count: "2" },
  { label: "Orders", count: "1" },
  { label: "Messages", count: "2" },
  { label: "Labs", count: "" },
  { label: "Billing", count: "" },
];

const steps = ["Rx received", "Prepared", "Shipped", "Delivered"];

/* A static mock of the patient portal that rises out of the hero card. Decorative: described by its label. */
export default function PortalPreview() {
  return (
    <figure className="t3-portal" aria-label="Preview of the Halvern patient portal, with sample data">
      <div className="t3-portal-window" aria-hidden="true">
        <div className="t3-portal-chrome"><i /><i /><i /><span>app.halvern.example</span></div>
        <div className="t3-portal-body">
          <aside className="t3-portal-side">
            <div className="t3-portal-brand"><span className="t3-logo-mark" />Halvern</div>
            <div className="t3-portal-search">Search<kbd>⌘K</kbd></div>
            <ul>
              {nav.map(item => (
                <li key={item.label} className={item.active ? "is-active" : undefined}>
                  {item.label}{item.count && <b>{item.count}</b>}
                </li>
              ))}
            </ul>
            <p className="t3-portal-side-label">Care team</p>
            <div className="t3-portal-person"><span>AR</span>Dr. A. Rivera</div>
            <div className="t3-portal-person"><span className="is-alt">KM</span>K. Mendez, PharmD</div>
          </aside>

          <div className="t3-portal-main">
            <div className="t3-portal-head">
              <div><b>Good morning, Jordan</b><span>Here is where your care stands today.</span></div>
              <span className="t3-portal-tag">Sample data</span>
            </div>

            <div className="t3-portal-cards">
              <div className="t3-portal-card is-accent">
                <span className="t3-portal-kicker">Next refill</span>
                <b className="t3-mono">Fri, Dec 4</b>
                <span>Weekly GLP-1 pen · every 4 weeks</span>
                <img src={img("product-pen.png")} alt="" />
              </div>
              <div className="t3-portal-card">
                <span className="t3-portal-kicker">Order WF-20418</span>
                <b>Shipped</b>
                <ol className="t3-portal-steps">
                  {steps.map((step, index) => <li key={step} className={index < 3 ? "is-done" : undefined}><i />{step}</li>)}
                </ol>
              </div>
            </div>

            <div className="t3-portal-msgs">
              <p className="t3-portal-kicker">Messages</p>
              <div className="t3-portal-msg"><span>AR</span><div><b>Dr. A. Rivera</b><p>Your check-in looks good. No changes to your plan this month.</p></div><time>9:04</time></div>
              <div className="t3-portal-msg"><span className="is-alt">KM</span><div><b>Halvern Pharmacy</b><p>Your order passed quality check and is on its way.</p></div><time>Mon</time></div>
            </div>
          </div>

          <aside className="t3-portal-info">
            <p className="t3-portal-kicker">Plan</p>
            <dl>
              <div><dt>Status</dt><dd><span className="t3-portal-dot" />Active</dd></div>
              <div><dt>Provider</dt><dd>Dr. A. Rivera</dd></div>
              <div><dt>Check-in</dt><dd>Every 4 weeks</dd></div>
              <div><dt>Shipping</dt><dd>Free, 2-day</dd></div>
              <div><dt>Payment</dt><dd>HSA card</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </figure>
  );
}
