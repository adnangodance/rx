// Sample content for the "Template 3" storefront. Halvern Rx is a fictional demo brand.
// Every price, statistic, review, lab value and person here is illustrative.

export const ASSET_BASE = "/templates/template-3";
export const BRAND = "Halvern Rx";

export const navLinks = [
  { label: "Treatments", href: "#treatments" },
  { label: "Compare", href: "#compare" },
  { label: "Labs", href: "#labs" },
  { label: "Your plan", href: "#account" },
  { label: "Care team", href: "#care" },
  { label: "FAQ", href: "#faq" },
];

export const outcomes = [
  { id: "weight", title: "Manage weight", text: "GLP-1 programs with ongoing provider check-ins.", treatment: "Weekly GLP-1 pen", image: "product-pen.png" },
  { id: "energy", title: "Support energy", text: "Injectable wellness options reviewed by a provider.", treatment: "NAD+ injection", image: "product-nad.png" },
  { id: "hair", title: "Keep your hair", text: "Topical routines matched to your history.", treatment: "Topical hair duo", image: "product-hair-duo.png" },
  { id: "skin", title: "Clearer skin", text: "Prescription-strength skincare, if appropriate.", treatment: "Tretinoin cream", image: "product-tretinoin.png" },
];

export const stats = [
  { value: 48, suffix: "h", label: "Average time to a provider decision" },
  { value: 50, suffix: "", label: "States with licensed providers" },
  { value: 2, suffix: "-day", label: "Free shipping on every refill" },
  { value: 96, suffix: "%", label: "Refills shipped on schedule" },
];

export type Product = {
  id: string;
  category: string;
  name: string;
  /** Sample monthly starting price in dollars. */
  price: number;
  form: string;
  frequency: string;
  how: string;
  storage: string;
  image: string;
  /** True when the sample product is a compounded medication. */
  compounded?: boolean;
};

export const products: Product[] = [
  { id: "glp1", category: "Weight", name: "Weekly GLP-1 pen", price: 199, form: "Injectable pen", frequency: "Once a week", how: "Self-injected under the skin on the same day each week, as directed by your provider.", storage: "Refrigerate", image: "product-pen.png", compounded: true },
  { id: "nad", category: "Energy", name: "NAD+ injection", price: 129, form: "Multi-dose vial", frequency: "1–3 times a week", how: "Self-injected under the skin on the schedule your provider sets.", storage: "Refrigerate", image: "product-nad.png", compounded: true },
  { id: "b12", category: "Wellness", name: "Vitamin B12", price: 39, form: "Multi-dose vial", frequency: "Once a week", how: "Self-injected into the muscle or under the skin, as directed.", storage: "Room temperature", image: "product-b12.png" },
  { id: "hair", category: "Hair", name: "Topical hair duo", price: 35, form: "Gel and solution", frequency: "Once or twice a day", how: "Applied to a dry scalp in the areas your provider recommends.", storage: "Room temperature", image: "product-hair-duo.png", compounded: true },
  { id: "tret", category: "Skin", name: "Tretinoin cream", price: 29, form: "Topical cream", frequency: "Nightly", how: "A pea-sized amount on clean, dry skin before bed.", storage: "Room temperature", image: "product-tretinoin.png" },
  { id: "oxy", category: "Intimacy", name: "Oxytocin nasal spray", price: 59, form: "Nasal spray", frequency: "As needed", how: "Sprayed into each nostril as directed by your provider.", storage: "Refrigerate", image: "product-oxytocin.png", compounded: true },
  { id: "glut", category: "Wellness", name: "Glutathione", price: 79, form: "Multi-dose vial", frequency: "1–2 times a week", how: "Self-injected into the muscle or under the skin, as directed.", storage: "Refrigerate", image: "product-glutathione.png", compounded: true },
];

export type Biomarker = {
  id: string;
  name: string;
  unit: string;
  /** Scale shown on the bar. */
  min: number;
  max: number;
  /** Reference range shaded on the bar. */
  low: number;
  high: number;
  baseline: number;
  followUp: number;
};

export const biomarkers: Biomarker[] = [
  { id: "vitd", name: "Vitamin D, 25-OH", unit: "ng/mL", min: 0, max: 120, low: 30, high: 100, baseline: 24, followUp: 41 },
  { id: "a1c", name: "Hemoglobin A1c", unit: "%", min: 4, max: 8, low: 4, high: 5.6, baseline: 5.9, followUp: 5.7 },
  { id: "tsh", name: "TSH", unit: "mIU/L", min: 0, max: 6, low: 0.4, high: 4, baseline: 2.1, followUp: 2.3 },
  { id: "ferr", name: "Ferritin", unit: "ng/mL", min: 0, max: 400, low: 30, high: 300, baseline: 88, followUp: 96 },
  { id: "crp", name: "hs-CRP", unit: "mg/L", min: 0, max: 6, low: 0, high: 3, baseline: 3.4, followUp: 2.2 },
];

export const labPhases = {
  baseline: { label: "Baseline", collected: "Collected Sep 02" },
  followUp: { label: "Follow-up", collected: "Collected Dec 02" },
} as const;

export const cadences = [
  { weeks: 4, label: "Every 4 weeks" },
  { weeks: 8, label: "Every 8 weeks" },
  { weeks: 12, label: "Every 12 weeks" },
];

export const chatScript = [
  { from: "provider", text: "Hi Jordan, I reviewed your check-in. Anything you want to change before your next refill?" },
  { from: "patient", text: "I travel on the 9th. Can my refill ship before then?" },
  { from: "provider", text: "Yes. I have noted it on your plan, and the pharmacy can ship as early as Monday." },
  { from: "patient", text: "Great. When is my next check-in?" },
  { from: "provider", text: "In two weeks. You will get a reminder, and you can message me any time before that." },
] as const;

export const stories = [
  { id: "s1", name: "Marcus", detail: "44 · Member for 7 months", image: "story-man.jpg", quote: "The refill controls are the reason I stuck with it. I moved a shipment twice around work trips without calling anyone.", metrics: [{ value: "7 of 7", label: "Refills arrived on time" }, { value: "Self-reported", label: "Felt more energetic" }] },
  { id: "s2", name: "Lena", detail: "36 · Member for 4 months", image: "story-woman.jpg", quote: "My provider answered within a day every time. It felt like someone was actually reading my check-ins.", metrics: [{ value: "< 1 day", label: "Typical message reply" }, { value: "Self-reported", label: "Felt supported between visits" }] },
  { id: "s3", name: "Priya", detail: "29 · Member for 5 months", image: "story-purple.jpg", quote: "Seeing my labs next to my plan made the conversation with my provider much easier.", metrics: [{ value: "2", label: "Lab panels reviewed" }, { value: "Self-reported", label: "Felt more confident in her routine" }] },
];

export const faqs = [
  { id: "eligibility", q: "Who is eligible for treatment?", a: "Adults 18 and older in states where our providers are licensed can start an online visit. Eligibility for any treatment is decided by a licensed provider after reviewing your health history, and not everyone will qualify." },
  { id: "prescribing", q: "Who prescribes my medication?", a: "An independent, licensed provider reviews your intake and decides whether a prescription is appropriate. Halvern Rx does not guarantee that any treatment will be prescribed, and providers may request labs or more information first." },
  { id: "compounded", q: "Are compounded medications FDA-approved?", a: "No. Compounded medications are prepared by a licensed pharmacy for an individual prescription and are not FDA-approved. The FDA does not review them for safety, effectiveness or quality. Your provider will explain whether a compounded or commercially available option is appropriate for you." },
  { id: "shipping", q: "How fast is shipping, and is it discreet?", a: "If prescribed, orders ship from the pharmacy in plain packaging. Sample timeline: free 2-day shipping once the prescription is filled, with cold packs for refrigerated items. Actual delivery times vary by location and carrier." },
  { id: "cancel", q: "Can I skip, delay or cancel a refill?", a: "Yes. From your account you can skip a refill, delay it by a week, ship it sooner or cancel your plan before the next refill is processed. Changes made after a refill has been processed apply to the following one." },
  { id: "payment", q: "Do you take insurance? How does payment work?", a: "Halvern Rx is cash-pay and does not bill insurance. You pay the listed price for visits and medication, with no membership fee in this sample. HSA or FSA funds may apply to eligible purchases; check with your plan administrator." },
];

export const footerColumns = [
  { title: "Treatments", links: [{ label: "Weight", href: "#treatments" }, { label: "Energy", href: "#treatments" }, { label: "Hair", href: "#treatments" }, { label: "Skin", href: "#treatments" }] },
  { title: "Experience", links: [{ label: "Compare treatments", href: "#compare" }, { label: "Labs", href: "#labs" }, { label: "Refills", href: "#account" }, { label: "Care team", href: "#care" }] },
  { title: "Support", links: [{ label: "FAQ", href: "#faq" }, { label: "Talk to the pharmacy", href: "#start" }, { label: "Start a visit", href: "#start" }] },
  { title: "Legal", links: [{ label: "Terms", href: "#top" }, { label: "Privacy", href: "#top" }, { label: "Telehealth consent", href: "#top" }] },
];

export const footerLegal =
  "Halvern Rx is a fictional brand used to demonstrate a ScriptRx storefront. All prices, statistics, reviews, lab values and people shown are samples. Prescription treatment requires an online consultation with an independent licensed provider, who determines whether a prescription is appropriate; treatment is not guaranteed. Compounded medications are not FDA-approved and are not reviewed by the FDA for safety, effectiveness or quality. Individual experiences vary. This page is not medical advice. In an emergency, call 911.";
