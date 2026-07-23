import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scriptrx.com"),
  title: "ScriptRx — Better care, without the waiting room",
  description:
    "Private, personalized online care with licensed providers and discreet delivery.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "ScriptRx — Feel good. Live better.",
    description: "Personalized online care, built around real life.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ScriptRx — Feel good. Live better." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptRx — Feel good. Live better.",
    description: "Personalized online care, built around real life.",
    images: ["/og.png"],
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
