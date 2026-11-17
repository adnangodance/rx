import type { Metadata } from "next";
import DemoApplication from "@/components/platform/DemoApplication";

export const metadata: Metadata = {
  title: "Request a demo — ScriptRx",
  description: "Apply to bring your business to ScriptRx. It takes a few minutes, and our team reviews every application.",
};

export default function DemoPage() {
  return <DemoApplication />;
}
