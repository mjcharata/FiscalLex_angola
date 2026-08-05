import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: "FiscalLex Angola — Biblioteca Fiscal e Tributária",
    description: "Códigos fiscais angolanos, alterações legislativas, circulares e instrutivos da AGT, organizados e ligados às fontes.",
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      title: "FiscalLex Angola",
      description: "Códigos fiscais. Alterações. Circulares AGT.",
      type: "website",
      locale: "pt_AO",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "FiscalLex Angola — Biblioteca de legislação fiscal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "FiscalLex Angola",
      description: "Códigos fiscais. Alterações. Circulares AGT.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-AO">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
