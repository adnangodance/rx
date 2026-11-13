import type { Metadata } from "next";
import Template3 from "@/components/templates/template-3/Template3";

export const metadata: Metadata = {
  title: "Halvern Rx — Care that keeps pace with you",
  description: "Sample ScriptRx storefront template: online visits with licensed providers, labs, refills and messaging in one place, with treatment shipped from the pharmacy if prescribed.",
};

export default function Template3Page() {
  return <Template3 />;
}
