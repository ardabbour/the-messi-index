import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Libre_Franklin, Lora } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const sans = Libre_Franklin({ variable: "--font-sans", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500", "600"] });
const serif = Lora({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "The Messi Index — A statistical audit of the impossible",
  description: "An evidence-backed visual almanac of Lionel Messi records, margins and statistical absurdities.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
