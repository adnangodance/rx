// Sample content for the "Template 1" storefront. Coastal Pharmacy is a fictional demo pharmacy.

export const ASSET_BASE = "/templates/template-1";

export const announcement = { text: "Free, discreet shipping on every order.", link: "See how it works", href: "#how-it-works" };

export const navLinks = [
  { label: "Conditions", href: "#conditions" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Stories", href: "#stories" },
  { label: "FAQs", href: "#faq" },
];

export const trustMarkers = [
  { icon: "shield", label: "Licensed providers" },
  { icon: "screen", label: "100% online" },
  { icon: "box", label: "Discreet delivery" },
] as const;

export const steps = [
  { title: "Tell us about your health", text: "A short online visit, on your schedule." },
  { title: "A licensed provider reviews", text: "They determine whether treatment is right for you." },
  { title: "Delivered to your door", text: "If prescribed, shipped in discreet packaging." },
];

export type Product = {
  id: string;
  ingredient: string;
  name: string;
  /** Monthly starting price in dollars. */
  price: number;
  form: string;
  image: string;
  /** Image height as a share of the image well, so mixed renders sit at a consistent optical size. */
  scale?: number;
};

export const products: Product[] = [
  { id: "daily-tablet", ingredient: "Semaglutide", name: "Daily tablet", price: 39, form: "Tablet", image: "product-daily-tablet.png", scale: 0.4 },
  { id: "nandrolone", ingredient: "Nandrolone", name: "Nandrolone decanoate", price: 79, form: "Injectable", image: "product-nandrolone.png" },
  { id: "oxytocin", ingredient: "Oxytocin", name: "Oxytocin", price: 49, form: "Nasal spray", image: "product-oxytocin.png" },
  { id: "b12", ingredient: "Cyanocobalamin", name: "Vitamin B12", price: 29, form: "Injectable", image: "product-b12.png" },
  { id: "tretinoin", ingredient: "Tretinoin", name: "Tretinoin cream", price: 35, form: "Topical", image: "product-tretinoin.png", scale: 0.74 },
  { id: "estradiol", ingredient: "Estradiol", name: "Estradiol patch", price: 45, form: "Patch", image: "product-estradiol.png" },
  { id: "pt141", ingredient: "Bremelanotide", name: "PT-141 nasal spray", price: 59, form: "Nasal spray", image: "product-pt141.png", scale: 0.74 },
  { id: "nad", ingredient: "NAD+", name: "NAD+ injection", price: 69, form: "Injectable", image: "product-nad.png" },
];

export const quickLinks = [
  { label: "Lose weight", href: "#conditions", image: "quick-weight.png" },
  { label: "Grow fuller hair", href: "#conditions", image: "quick-hair.png" },
  { label: "Boost daily energy", href: "#conditions", image: "quick-energy.png" },
];

export const features = [
  { id: "tracker", title: "Progress trackers", text: "Log how you’re doing and keep an eye on each milestone." },
  { id: "dose", title: "Dose reminders", text: "Stay on schedule with simple, built-in reminders." },
  { id: "chat", title: "Care team messaging", text: "Send your care team a message whenever a question comes up." },
  { id: "shop", title: "Curated wellness products", text: "Everyday essentials selected by our pharmacists." },
] as const;

export const conditions = [
  { title: "Weight Loss", short: "GLP-1 and metabolic programs", text: "GLP-1 and metabolic programs, supervised by a provider.", image: "product-pen.png", scale: 0.86 },
  { title: "Sexual Health", short: "ED and intimacy treatments", text: "ED and intimacy treatments. Oral compounds, custom dosed.", image: "product-pt141.png" },
  { title: "Hormone Therapy", short: "Testosterone and estradiol", text: "Testosterone and estradiol, guided by your lab work.", image: "product-testosterone.png" },
  { title: "Hair & Skin", short: "Regrowth and tretinoin", text: "Hair regrowth and tretinoin, in topical and oral options.", image: "product-hair-duo.png" },
  { title: "Peptides & Longevity", short: "Sermorelin, NAD+ and more", text: "Sermorelin, tesamorelin and NAD+ for recovery and energy.", image: "product-nad.png" },
  { title: "General Wellness", short: "Glutathione, B12 and more", text: "Glutathione, B12 and everyday support.", image: "product-glutathione.png" },
];

export type Story = {
  name: string;
  age: number;
  quote: string;
  tags: string[];
  metric: string;
  unit: string;
  before: { value: string; fill: number };
  after: { label: string; value: string; fill: number };
  badge: string;
  badgeText: string;
};

// Illustrative placeholders only — always rendered with a "Sample content" label.
export const stories: Story[] = [
  {
    name: "Danny",
    age: 42,
    quote: "TRT helped me improve my energy, mood, and overall well-being. It has helped me sort out my diet, exercise, better routine and better sleep, resulting in a more positive attitude and better relationships at work and at home.",
    tags: ["More energy", "Improved mood"],
    metric: "Free testosterone",
    unit: "nmol/L",
    before: { value: "9.77", fill: 22 },
    after: { label: "3 months treatment", value: "26.50", fill: 90 },
    badge: "171%",
    badgeText: "increase in free testosterone",
  },
  {
    name: "Priya",
    age: 36,
    quote: "The regular check-ins kept me consistent. My provider adjusted the plan as we went instead of handing me a one-size-fits-all program, and every question I sent got a clear answer.",
    tags: ["Steady routine", "Clear guidance"],
    metric: "Self-rated energy",
    unit: "out of 10",
    before: { value: "4", fill: 40 },
    after: { label: "3 months treatment", value: "8", fill: 80 },
    badge: "2×",
    badgeText: "self-rated energy score",
  },
  {
    name: "Marcus",
    age: 51,
    quote: "I was nervous about starting online, but the visit was thorough and nothing felt rushed. Refills simply arrive when they should, which is one less thing for me to keep track of.",
    tags: ["Better sleep", "Easy refills"],
    metric: "Self-rated sleep quality",
    unit: "out of 10",
    before: { value: "3", fill: 30 },
    after: { label: "3 months treatment", value: "7", fill: 70 },
    badge: "+4",
    badgeText: "points in self-rated sleep quality",
  },
];

export const faqs = [
  {
    q: "How does Coastal Pharmacy work?",
    a: "Choose a treatment and complete a short online visit about your health history. A licensed provider reviews your answers and determines whether treatment is appropriate. If prescribed, our pharmacy prepares your medication and ships it to your door.",
  },
  {
    q: "Who are the providers at Coastal Pharmacy?",
    a: "Visits are reviewed by independent providers licensed in the state where you live. They can message you with follow-up questions, and you can reach your care team from your account at any point during treatment.",
  },
  {
    q: "Does Coastal Pharmacy require insurance?",
    a: "No. Insurance isn’t required, and the price shown for each treatment is the price you pay. If you’re prescribed a treatment, you’ll see the full cost before you check out.",
  },
  {
    q: "What states is Coastal Pharmacy available in?",
    a: "Availability varies by state and by treatment. Enter your state at the start of the online visit and we’ll show you the options available where you live.",
  },
  {
    q: "How is my order shipped?",
    a: "Orders ship in plain, discreet packaging with tracking. Temperature-sensitive medications are packed cold, and you’ll get an email as soon as your order is on its way.",
  },
];

export const footerColumns = [
  { title: "Treatments", links: ["Weight Management", "Sexual Health", "Hormone Therapy", "Hair & Skin", "General Health & Wellness"] },
  { title: "Pharmacy", links: ["About Coastal", "View catalog", "How it works", "Patient stories"] },
  { title: "Support", links: ["Help center", "Contact us", "Track an order", "Refills"] },
];

export const footerLegal = ["Privacy Policy", "Terms", "Accessibility"];
