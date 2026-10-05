import type { Product } from "@/components/CatalogSection";

export const adnanSuggestionCategoryProducts: Record<string, Product[]> = {
  longevity: [
    { name: "Amino-Quad Capsules", price: "$45/mo", detail: "THE / INO / PRO / TAU", type: "jar", image: "/adnan-amino-quad.png" },
    { name: "NAD+ Injection", price: "$69/mo", detail: "20mg/ml provider-guided care", type: "vial", image: "/adnan-nad-injection.png" },
    { name: "Atropine Sulfate", price: "$29/mo", detail: "1 (3ml) bottle", type: "dropper", image: "/adnan-atropine.png" },
    { name: "B-Complex", price: "$39/mo", detail: "1 (10ml) vial", type: "vial", image: "/adnan-b-complex.png" },
  ],
  "hair-care": [
    { name: "Hair Loss Gel + Solution", price: "$49/mo", detail: "Personalized topical hair care", type: "spray", image: "/adnan-hair-loss-duo.png" },
  ],
  acne: [
    { name: "Tretinoin Cream", price: "$29/mo", detail: "Prescription retinoid care", type: "cream", image: "/adnan-tretinoin.png" },
    { name: "GHK-Cu Cream", price: "$49/mo", detail: "1 (30gm) jar", type: "jar", image: "/adnan-ghk-cu-cream.png" },
  ],
  "sexual-health": [
    { name: "Super Strut Mints", price: "$39/mo", detail: "Personalized intimacy support", type: "jar", image: "/adnan-super-strut.png" },
    { name: "Anastrozole", price: "$39/mo", detail: "Provider-guided hormone support", type: "jar", image: "/adnan-anastrozole.png" },
    { name: "Anastrozole Capsules", price: "$45/mo", detail: "60 capsules", type: "jar", image: "/adnan-anastrozole-capsules.png" },
    { name: "PT-141 Nasal Spray", price: "$49/mo", detail: "Personalized intimacy care", type: "spray", image: "/adnan-pt141.png" },
    { name: "Hydrocortisone / Lidocaine", price: "$45/mo", detail: "20mg / 20mg suppository care", type: "pack", image: "/adnan-hydrocortisone-lidocaine.png" },
    { name: "Testosterone Cypionate", price: "$69/mo", detail: "200mg/ml provider-guided care", type: "vial", image: "/adnan-testosterone.png" },
  ],
  "weight-management": [
    { name: "Daily Tablet", price: "$39/mo", detail: "Daily oral treatment", type: "tablet", image: "/adnan-daily-tablet.png" },
    { name: "Lipo-C", price: "$39/mo", detail: "Lipotropic injection support", type: "vial", image: "/adnan-lipo-c.png" },
  ],
  "womens-health": [
    { name: "Estradiol Patches", price: "$39/mo", detail: "Four transdermal patches", type: "pack", image: "/adnan-estradiol.png" },
    { name: "Boric Acid / EDTA", price: "$35/mo", detail: "1 (30gm) jar", type: "jar", image: "/adnan-boric-acid-edta.png" },
  ],
};
