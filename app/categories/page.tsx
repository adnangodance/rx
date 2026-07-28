import type { Metadata } from "next";
import CategoryExperience from "./CategoryExperience";

export const metadata: Metadata = {
  title: "Treatments by category — ScriptRx",
  description: "Explore personalized ScriptRx treatment options by health goal.",
};

export default function CategoriesPage() {
  return <CategoryExperience />;
}
