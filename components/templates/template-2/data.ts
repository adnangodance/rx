// Sample content for the "Template 2" storefront. Wrenfield Pharmacy is a fictional demo pharmacy:
// every price, person, review and figure in this file is illustrative.

export const ASSET_BASE = "/templates/template-2";

export const BRAND = "Wrenfield";
export const BRAND_FULL = "Wrenfield Pharmacy";

export const navLinks = [
  { label: "Treatments", href: "#treatments" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Care team", href: "#care-team" },
  { label: "Questions", href: "#faq" },
];

export type CategoryId = "weight" | "hormones" | "sexual" | "skin" | "longevity";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "weight", label: "Weight" },
  { id: "hormones", label: "Hormones" },
  { id: "sexual", label: "Sexual health" },
  { id: "skin", label: "Skin & hair" },
  { id: "longevity", label: "Longevity" },
];

export const categoryLabel = (id: CategoryId) => categories.find(category => category.id === id)?.label ?? id;

export type Product = {
  id: string;
  category: CategoryId;
  name: string;
  /** Dosage form shown on the card. */
  form: string;
  detail: string;
  /** Sample monthly starting price in dollars. */
  price: number;
  image: string;
  /** Image height as a share of its well, so mixed renders sit at a consistent optical size. */
  scale?: number;
};

export const products: Product[] = [
  { id: "glp1-pen", category: "weight", name: "Semaglutide", form: "Injection", detail: "Compounded, once weekly", price: 199, image: "product-pen.png", scale: 0.92 },
  { id: "glp1-tablet", category: "weight", name: "Daily tablet", form: "Tablet", detail: "Compounded, once daily", price: 129, image: "product-daily-tablet.png", scale: 0.44 },
  { id: "testosterone", category: "hormones", name: "Testosterone cypionate", form: "Injection", detail: "Lab work required first", price: 79, image: "product-testosterone.png" },
  { id: "estradiol", category: "hormones", name: "Estradiol patch", form: "Patch", detail: "Applied twice weekly", price: 45, image: "product-estradiol.png", scale: 0.74 },
  { id: "pt141", category: "sexual", name: "PT-141", form: "Spray", detail: "Compounded nasal spray", price: 59, image: "product-pt141.png" },
  { id: "oxytocin", category: "sexual", name: "Oxytocin", form: "Spray", detail: "Compounded nasal spray", price: 49, image: "product-oxytocin.png" },
  { id: "tretinoin", category: "skin", name: "Tretinoin", form: "Cream", detail: "Applied nightly", price: 35, image: "product-tretinoin.png" },
  { id: "hair-duo", category: "skin", name: "Hair regimen", form: "Topical", detail: "Gel and solution", price: 39, image: "product-hair-duo.png", scale: 0.78 },
  { id: "nad", category: "longevity", name: "NAD+", form: "Injection", detail: "Compounded", price: 69, image: "product-nad.png" },
  { id: "glutathione", category: "longevity", name: "Glutathione", form: "Injection", detail: "Compounded", price: 55, image: "product-glutathione.png" },
  { id: "b12", category: "longevity", name: "Vitamin B12", form: "Injection", detail: "Cyanocobalamin", price: 29, image: "product-b12.png" },
];

/** Hero goal picker: each goal highlights one treatment from the catalog. */
export const goals: { id: CategoryId; label: string; productId: string; line: string }[] = [
  { id: "weight", label: "Weight", productId: "glp1-pen", line: "A provider-led plan with regular check-ins." },
  { id: "hormones", label: "Hormones", productId: "testosterone", line: "Start with lab work and a provider’s review." },
  { id: "sexual", label: "Sexual health", productId: "pt141", line: "A private visit, answered from home." },
  { id: "skin", label: "Skin & hair", productId: "tretinoin", line: "Prescription-strength topicals, made to order." },
  { id: "longevity", label: "Longevity", productId: "nad", line: "Everyday energy and wellness support." },
];

export const trustMarkers = ["Licensed providers", "Pharmacist prepared", "Discreet delivery"];

/** One photograph per step in "How it works": file, crop focus and alt text. */
export const stepPhotos = [
  { file: "hero-interior.jpg", position: "86% 50%", alt: "A woman in an ivory sweater resting on a sofa by a window" },
  { file: "still-life.jpg", position: "50% 62%", alt: "Glass vials and an injector pen on a block of travertine" },
  { file: "pharmacist.jpg", position: "50% 40%", alt: "Gloved hands drawing medication from a vial at a pharmacy bench" },
  { file: "delivery.jpg", position: "20% 50%", alt: "A plain matte box tied with ribbon on a marble counter" },
];

/** "Find your fit" mini intake. Each option adds weight to one or more categories. */
export const intake: { question: string; hint: string; options: { label: string; weights: Partial<Record<CategoryId, number>> }[] }[] = [
  {
    question: "What would you most like to work on?",
    hint: "Pick the one that matters most right now.",
    options: [
      { label: "Reaching a healthier weight", weights: { weight: 3 } },
      { label: "Energy, mood or hormone changes", weights: { hormones: 3 } },
      { label: "Intimacy and sexual wellbeing", weights: { sexual: 3 } },
      { label: "My skin or hair", weights: { skin: 3 } },
      { label: "Staying well as I age", weights: { longevity: 3 } },
    ],
  },
  {
    question: "How long has this been on your mind?",
    hint: "There is no wrong answer. It helps your provider prepare.",
    options: [
      { label: "It’s fairly new", weights: {} },
      { label: "A few months", weights: {} },
      { label: "More than a year", weights: {} },
    ],
  },
  {
    question: "How would you prefer to take a treatment?",
    hint: "Your provider will consider this alongside your health history.",
    options: [
      { label: "A weekly injection is fine", weights: { weight: 1, hormones: 1, longevity: 1 } },
      { label: "Something I take by mouth", weights: { weight: 1 } },
      { label: "A cream, patch or spray", weights: { skin: 1, sexual: 1, hormones: 1 } },
      { label: "No preference", weights: {} },
    ],
  },
];

export const steps = [
  {
    title: "Online visit",
    time: "About 5 minutes",
    text: "Answer questions about your health, goals and current medications from your phone or computer. No appointment needed.",
    points: ["Secure health questionnaire", "Upload a photo ID", "Add lab results if you have them"],
  },
  {
    title: "Provider review",
    time: "Usually within 1 business day",
    text: "A licensed provider in your state reviews your answers, may message you with follow-up questions, and decides whether treatment is appropriate.",
    points: ["Reviewed by a licensed provider", "Message back and forth if needed", "No charge for medication unless prescribed"],
  },
  {
    title: "Pharmacy prepares",
    time: "1 to 2 business days",
    text: "If a treatment is prescribed, our pharmacists prepare it and a second pharmacist checks it before it leaves the building.",
    points: ["Prepared to your prescription", "Pharmacist double check", "Labelled with clear directions"],
  },
  {
    title: "Delivered",
    time: "2 to 4 days in transit",
    text: "Your order ships in plain packaging with tracking. Temperature-sensitive items travel in insulated packs.",
    points: ["Plain outer packaging", "Tracking by text or email", "Refill reminders before you run out"],
  },
];

export const trackerStages = [
  { title: "Rx received", text: "Your prescription reached the pharmacy.", time: "Mon 9:12 am" },
  { title: "Being prepared", text: "A pharmacist is preparing your order.", time: "Mon 1:40 pm" },
  { title: "Quality check", text: "A second pharmacist verifies the order.", time: "Tue 10:05 am" },
  { title: "Shipped", text: "Handed to the carrier with tracking.", time: "Tue 4:30 pm" },
  { title: "Delivered", text: "Left at your door in plain packaging.", time: "Thu 11:48 am" },
];

export type Billing = "monthly" | "quarterly";

export const membership = {
  monthly: { price: 29, note: "Billed $29 every month" },
  quarterly: { price: 24, note: "Billed $72 every 3 months" },
} satisfies Record<Billing, { price: number; note: string }>;

/** `true` renders a check mark, `false` an em dash. */
export const planRows: { label: string; member: Record<Billing, string | boolean>; payg: Record<Billing, string | boolean> }[] = [
  { label: "Online visits", member: { monthly: "Included", quarterly: "Included" }, payg: { monthly: "$35 per visit", quarterly: "$35 per visit" } },
  { label: "Messaging your care team", member: { monthly: "Unlimited", quarterly: "Unlimited" }, payg: { monthly: "30 days after a visit", quarterly: "30 days after a visit" } },
  { label: "Medication pricing", member: { monthly: "Member price", quarterly: "Member price" }, payg: { monthly: "Standard price", quarterly: "Standard price" } },
  { label: "Shipping", member: { monthly: "Free", quarterly: "Free, 90-day supply" }, payg: { monthly: "$6 per order", quarterly: "$6 per order" } },
  { label: "Quarterly check-ins", member: { monthly: true, quarterly: true }, payg: { monthly: false, quarterly: false } },
  { label: "Refill reminders", member: { monthly: true, quarterly: true }, payg: { monthly: true, quarterly: true } },
  { label: "Order tracking", member: { monthly: true, quarterly: true }, payg: { monthly: true, quarterly: true } },
];

export const careTeam = [
  { initials: "MO", name: "Dr. Maren Olivet", credential: "MD, Internal medicine", focus: "Weight and metabolic health" },
  { initials: "TR", name: "Tomas Reyland", credential: "PharmD, Pharmacist in charge", focus: "Compounding and quality" },
  { initials: "PS", name: "Priya Sandell", credential: "NP, Hormone health", focus: "Menopause and hormone care" },
  { initials: "EK", name: "Elin Kovari", credential: "PA-C, Dermatology", focus: "Skin and hair" },
] as const;

export const reviews = [
  { quote: "The visit took less time than my commute. A provider wrote back that evening with a couple of questions before anything was decided.", name: "Dana R.", context: "Member since March" },
  { quote: "I could see exactly where my order was, from the pharmacy bench to my doorstep. No guessing, no phone calls.", name: "Marcus T.", context: "Pay-as-you-go patient" },
  { quote: "When I had a question about my directions, a pharmacist answered it the same afternoon. That is why I stayed.", name: "Ines V.", context: "Member since January" },
  { quote: "Cancelling my membership took two taps when my plans changed. I came back a few months later because it was that easy.", name: "Joel K.", context: "Returning member" },
];

export const faqs = [
  {
    topic: "Eligibility",
    question: "Who can use Wrenfield Pharmacy?",
    answer: [
      "Adults aged 18 and over who live in a state where our providers are licensed can start an online visit. You will need a photo ID and a shipping address in that state.",
      "Starting a visit does not guarantee a prescription. Some conditions need in-person care or lab work first, and your provider will tell you if that applies to you.",
    ],
  },
  {
    topic: "Prescribing",
    question: "How does prescribing work?",
    answer: [
      "After your online visit, a licensed provider reviews your health history and may message you with follow-up questions. They decide whether a treatment is appropriate, and which one.",
      "If a treatment is prescribed, the prescription is sent to our pharmacy to be filled. If it is not, you are not charged for medication.",
    ],
  },
  {
    topic: "Compounded medications",
    question: "Are compounded medications FDA-approved?",
    answer: [
      "No. Compounded medications are prepared by a licensed pharmacy for an individual patient based on a prescription. They are not FDA-approved, which means the FDA has not reviewed them for safety, effectiveness or quality.",
      "Your provider will only prescribe a compounded medication when they judge it appropriate for you, and you can always ask about FDA-approved alternatives.",
    ],
  },
  {
    topic: "Shipping",
    question: "How long does delivery take?",
    answer: [
      "Most orders leave the pharmacy within one to two business days of being prescribed and arrive two to four days later. You get tracking by text or email at each step.",
      "Orders ship in plain outer packaging. Temperature-sensitive medications travel in insulated packs.",
    ],
  },
  {
    topic: "Membership",
    question: "Can I cancel my membership?",
    answer: [
      "Yes, at any time from your account settings. Your membership stays active until the end of the period you have already paid for, and there is no cancellation fee.",
      "You can keep using Wrenfield on a pay-as-you-go basis afterwards, and rejoin whenever you like.",
    ],
  },
  {
    topic: "Insurance & payment",
    question: "Do you take insurance?",
    answer: [
      "Wrenfield is cash-pay, so we do not bill insurance for visits or medications. Prices are shown before you check out.",
      "HSA and FSA cards may be accepted for eligible purchases. Check with your plan administrator to confirm what your account covers.",
    ],
  },
];

export const footerColumns = [
  { title: "Treatments", links: ["Weight", "Hormones", "Sexual health", "Skin & hair", "Longevity"] },
  { title: "Pharmacy", links: ["How it works", "Membership", "Care team", "Order tracking"] },
  { title: "Support", links: ["Help centre", "Contact a pharmacist", "Shipping & returns", "Accessibility"] },
];

export const footerLegal = ["Privacy", "Terms", "Notice of privacy practices"];
