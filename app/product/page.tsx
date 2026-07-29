import type { Metadata } from "next";
import ProductDetailsExperience from "./ProductDetailsExperience";

export const metadata: Metadata = {
  title: "Treatment details — ScriptRx",
  description: "Review treatment benefits, pricing, safety information, and next steps.",
};

export default function ProductPage() {
  return <ProductDetailsExperience />;
}
