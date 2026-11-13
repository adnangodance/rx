import type { Metadata } from "next";
import Template1 from "@/components/templates/template-1/Template1";

export const metadata: Metadata = {
  title: "Coastal Pharmacy — Personalized care, delivered",
  description: "Sample ScriptRx storefront template: online visits with licensed providers and treatments shipped from Coastal Pharmacy, if prescribed.",
};

export default function Template1Page() {
  return <Template1 />;
}
