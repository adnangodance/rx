import type { Metadata } from "next";
import Template2 from "@/components/templates/template-2/Template2";

export const metadata: Metadata = {
  title: "Wrenfield Pharmacy — Considered care, quietly delivered",
  description: "Sample ScriptRx storefront template: online visits reviewed by licensed providers, with treatments prepared and shipped by Wrenfield Pharmacy if prescribed.",
};

export default function Template2Page() {
  return <Template2 />;
}
