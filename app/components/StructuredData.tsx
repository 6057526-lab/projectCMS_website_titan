export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "REEMS",
    legalName: "Race & Engineering Elite Manufacturing Services",
    url: siteUrl,
    // logo removed - add when logo.png is available
    description:
      "Advanced magnesium, aluminium and titanium manufacturing solutions. Forging, 3D printing, precision machining for automotive, aerospace and industrial applications.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-890", // Update with real phone
      contactType: "Customer Service",
      email: "info@reems.com", // Update with real email
      areaServed: "Worldwide",
      availableLanguage: ["en"],
    },
    sameAs: [] as string[], // Add social media profiles when available
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "REEMS",
    url: siteUrl,
    // SearchAction removed - no search functionality yet
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Light-Alloy Manufacturing",
    provider: {
      "@type": "Organization",
      name: "REEMS",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Manufacturing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Forging Services",
            description: "Closed-die forging of magnesium and aluminium components",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "3D Printing",
            description: "Selective Laser Melting (SLM) for metal parts",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Machining",
            description: "CNC machining and precision manufacturing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Forged Wheels",
            description: "Motorsport-grade forged aluminium and magnesium wheels",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

