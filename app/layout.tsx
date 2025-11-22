import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export const metadata: Metadata = {
  // Title (primary)
  title: "REEMS - Race & Engineering Elite Manufacturing Services",
  
  // Description (primary)
  description:
    "Advanced magnesium, aluminium and titanium manufacturing solutions. Forging, 3D printing, precision machining for automotive, aerospace and industrial applications.",
  
  // Keywords
  keywords: [
    "magnesium components",
    "aluminium forging",
    "titanium parts",
    "light alloy manufacturing",
    "forged wheels",
    "aerospace components",
    "automotive parts",
    "metal fabrication",
    "3D printing metals",
    "precision machining",
    "closed-die forging",
    "SLM printing",
    "CNC machining",
  ],
  
  // Authors, Creator, Publisher
  authors: [{ name: "REEMS" }],
  creator: "REEMS",
  publisher: "REEMS",
  
  // Metadata Base (for absolute URLs)
  metadataBase: new URL(siteUrl),
  
  // Open Graph (social media)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "REEMS",
    title: "REEMS - Advanced Light-Alloy Manufacturing Solutions",
    description:
      "Advanced magnesium, aluminium and titanium manufacturing solutions. Forging, 3D printing, precision machining for automotive, aerospace and industrial applications.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "REEMS - Advanced Manufacturing",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "REEMS - Advanced Light-Alloy Manufacturing",
    description:
      "Advanced magnesium, aluminium and titanium manufacturing solutions for high-performance industries.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  
  // Canonical (absolute URL)
  alternates: {
    canonical: siteUrl,
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for Cloudinary CDN performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}



