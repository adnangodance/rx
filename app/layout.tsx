import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scriptrx.com"),
  title: "ScriptRx — Care for the life you want",
  description:
    "Private, personalized online care with licensed providers and discreet delivery.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "ScriptRx — The care you’ve always deserved",
    description: "Personalized online care for the goals that matter most.",
    type: "website",
    images: [{ url: "/hero-campaign.png", alt: "ScriptRx personalized online care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptRx — The care you’ve always deserved",
    description: "Personalized online care for the goals that matter most.",
    images: ["/hero-campaign.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
