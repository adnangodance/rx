import type { Metadata } from "next";
import CartExperience from "./CartExperience";

export const metadata: Metadata = {
  title: "Order requirements — ScriptRx",
  description: "Review requirements and pricing for your ScriptRx order.",
};

export default function CartPage() {
  return <CartExperience />;
}
