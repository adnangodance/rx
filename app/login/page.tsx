import type { Metadata } from "next";
import LoginExperience from "./LoginExperience";

export const metadata: Metadata = {
  title: "Log in — ScriptRx",
  description: "Securely access your ScriptRx account.",
};

export default function LoginPage() {
  return <LoginExperience />;
}
