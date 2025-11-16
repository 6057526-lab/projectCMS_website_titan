export interface HeroBanner {
  headline: string;
  subheadline: string;
  description: string;
  buttons: {
    primary: string;
    secondary: string;
  };
}

export interface IntroSection {
  text: string;
  bullets: string[];
  ctaButton: string;
}

export interface MarketSegmentCard {
  title: string;
  leadText: string;
  bullets: string[];
}

export interface MarketSegments {
  title: string;
  subtitle: string;
  segments: MarketSegmentCard[];
}

export interface LifecyclePhase {
  title: string;
  text: string;
}

export interface FullProductLifecycle {
  title: string;
  intro: string;
  phases: LifecyclePhase[];
}

export interface CapabilityItem {
  title: string;
  photos: string[];
  text: string;
  additionalBullets?: string[];
  additionalText?: string;
}

export interface Capabilities {
  title: string;
  subtitle: string;
  items: CapabilityItem[];
}

export interface ForgedWheelsSection {
  title: string;
  subtitle: string;
  text: string;
  bullets: string[];
  ctaButton: string;
}

export interface CompanySection {
  title: string;
  subtitle: string;
  text: string;
  slogan: string;
  finalCta: string;
}

export interface HomeContent {
  hero: HeroBanner;
  intro: IntroSection;
  marketSegments: MarketSegments;
  lifecycle: FullProductLifecycle;
  capabilities: Capabilities;
  forgedWheels: ForgedWheelsSection;
  company: CompanySection;
}

export const homeContent: HomeContent = {
  hero: {
    headline: "Race & Engineering Elite Manufacturing Services",
    subheadline:
      "Advanced magnesium, aluminium and titanium solutions for high-performance automotive, aerospace and industrial applications.",
    description:
      "REEMS combines engineering, proprietary forging and additive technologies to deliver ultra-light, high-strength components — from forged wheels to aerospace brackets and complex 3D-printed parts.",
    buttons: {
      primary: "Explore capabilities",
      secondary: "Request a project review",
    },
  },
  intro: {
    text: "REEMS facilitates manufacturing services for high-performance industries — from motorsport to aerospace — specializing in forged magnesium & aluminum components, advanced prototyping, and full production solutions.",
    bullets: [
      "Lightweight Metal Expertise",
      "End-to-End Engineering (Design → Simulation → Serial Production)",
      "High-Performance Results (Strength, efficiency, certification)",
    ],
    ctaButton: "Start your project",
  },
  marketSegments: {
    title: "Market segments",
    subtitle: "Supplying ultra-light, certified components to global OEMs and Tier-1s",
    segments: [
      {
        title: "Automotive",
        leadText:
          "Magnesium and aluminium forged wheels and blanks, brake and suspension components, exhaust elements, interior structural parts, and 3D-printed custom parts (logos, ducts, emblems) for motorsport and premium vehicle programs.",
        bullets: [
          "Forged magnesium & aluminium wheels",
          "Forged wheel blanks",
          "Brake brackets & cooling ducts",
          "Wrought / formed exhaust parts",
          "Automotive sheet components",
          "3D-printed metal parts",
        ],
      },
      {
        title: "Aerospace",
        leadText:
          "Precision light-alloy components for airframe, rotorcraft and space applications, including brackets, transmission housings, interior parts and turbine engine elements — produced to aerospace process control.",
        bullets: [
          "Magnesium & aluminium brackets",
          "Transmission / gearbox casings",
          "Interior & seat structure parts",
          "Turbine engine components",
          "Forged wheels & blanks for ground support",
          "Magnesium antenna boxes",
        ],
      },
      {
        title: "Industrial & Material Supply",
        leadText:
          "From raw magnesium feedstock to semi-finished products, REEMS supports manufacturers with chips, flakes, granules, powders, billets, sheets, extrusions and forged parts — plus CNC, surface protection and coating.",
        bullets: [
          "Magnesium raw materials (chips, flakes, powders, granules)",
          "Billets, sheet, extrusion, forgings",
          "CNC machining services",
          "Sheet metal forming",
          "Surface protection: anodizing, PEO, PVD, powder coating",
        ],
      },
      {
        title: "Special Components",
        leadText:
          "Engineering of difficult, lightweight parts for defence, telecoms, motorsport and space, including electromagnetic shielding materials, reinforced housings and complex 3D-printed geometries (SLM, WAAM).",
        bullets: [
          "Forged magnesium casings",
          "Complex 3D-printed metal parts",
          "Hybrid / reinforced materials",
          "Carbon-carbon materials",
        ],
      },
    ],
  },
  lifecycle: {
    title: "Full product lifecycle",
    intro:
      "At REEMS we don't just forge a part — we engineer the whole lifecycle. Our team translates performance targets (weight, stiffness, thermal, fatigue) into manufacturable, cost-efficient light-alloy solutions.",
    phases: [
      {
        title: "Research & Development",
        text: "Our engineering team has been involved in magnesium and advanced-alloy R&D together with leading OEMs and research institutes. We have expertise in developing proprietary alloys, forming routes and additive processes to increase strength, corrosion resistance and fatigue life for automotive and aerospace applications.",
      },
      {
        title: "Engineering & Prototyping",
        text: "Each component is optimized for its final use. REEMS uses CAE tools (ANSYS / FEA, LS-DYNA, macro- to nano-mechanical simulations) and advanced reverse-engineering software (Geomagic, Materialise, SolidWorks, Siemens NX) to shorten prototype lead time and ensure formability before tool production.",
      },
      {
        title: "Industrialization & Serial Production",
        text: "Our proprietary closed-die, net-shape forging processes (6,000–30,000 t hydraulic force) deliver directional fibre flow and deep deformation, resulting in superior grain structure and outstanding fatigue/strength properties — ideal for wheels, suspension parts and aerospace brackets.",
      },
      {
        title: "Testing & Certification",
        text: "REEMS validates, tests and certifies parts to international industry standards. We provide mechanical, metallurgical and chemical testing, CMM, and partner with TÜV and other notified bodies for third-party certification.",
      },
    ],
  },
  capabilities: {
    title: "Capabilities",
    subtitle: "Innovative materials and technologies",
    items: [
      {
        title: "Raw materials",
        photos: ["Al/Mg granules", "Al/Mg billets", "Al/Mg powder", "Al/Mg wire feedstock"],
        text: "Magnesium, aluminium and titanium materials in multiple formats: chips, flakes, granules, powders, billets, slabs, sheets and extrusion stock. Ideal for casting, forging, additive and hybrid manufacturing routes.",
      },
      {
        title: "Forging",
        photos: ["wheel", "wheel net-shaped blank", "generic-blank", "forged ring"],
        text: "Closed-die forging of magnesium, titanium and aluminium components, wheel blanks, aerospace brackets, casings and structural parts with controlled metal flow and fibre orientation for maximum mechanical properties.",
        additionalBullets: [
          "6,000–30,000 t hydraulic press range, size up to 30\"",
          "Near-net shape to reduce machining",
        ],
      },
      {
        title: "Extrusion & Rolling",
        photos: ["CNC 5-axis", "3D printed part (bracket)", "colored wheel", "rolled sheet (thin)"],
        text: "Profile extrusion and sheet forming for automotive and industrial parts, including from magnesium alloys.",
        additionalText:
          "Magnesium sheet as thin as 0,6 mm with the width of 1000 mm and length up to 15 000 mm.",
      },
      {
        title: "Machining",
        photos: [],
        text: "TODO: CNC machining services for precision finishing and complex geometries.",
      },
      {
        title: "3D Printing",
        photos: [
          "3D printed part (BCD)",
          "3D printed part (bracket)",
          "3D printed part (motor-part)",
          "3D printed part (another bracket)",
        ],
        text: "REEMS supports SLM (Selective Laser Melting) and other additive manufacturing technologies for complex geometries and rapid prototyping.",
      },
      {
        title: "Surface Protection",
        photos: ["wheel color 1", "two-colored wheel", "three-colored wheel", "polished wheel"],
        text: "Surface protection according to application requirements.",
        additionalBullets: ["Anodizing", "Plasma Electrolytic Oxidation (PEO)", "PVD", "Powder coating"],
      },
    ],
  },
  forgedWheels: {
    title: "Forged aluminium and magnesium wheels",
    subtitle: "Motorsport-grade, road-ready, weight-optimized",
    text: "REEMS designs and manufactures forged wheels and wheel blanks for performance, motorsport and premium OEM programs. Using proprietary forging technology and high-strength light alloys, we achieve an optimal balance between mass reduction, stiffness and impact resistance — even for demanding racing environments.",
    bullets: [
      "1-, 2- and 3-piece wheel concepts",
      "Magnesium and 2000/6000/7000-series aluminium",
      "Custom offsets, PCD and centre-lock variants",
      "Flow-optimized spokes and brake-cooling geometry",
      "Ready for premium surface finishing",
    ],
    ctaButton: "Send us your wheel specification",
  },
  company: {
    title: "Company",
    subtitle: "Race & Engineering Elite Manufacturing Services",
    text: "REEMS is a European engineering and manufacturing company focused on light-alloy solutions for mobility, aerospace and advanced industrial sectors. Building on two decades of magnesium and aluminium know-how, we integrate forging, extrusion, CNC, additive manufacturing and surface protection into one supply chain.\nOur mission is to help OEMs and Tier-1s remove weight, improve performance and accelerate time-to-market through intelligent materials and robust manufacturing processes.",
    slogan: "Let's Build What Others Think Is Impossible.",
    finalCta:
      "Send us your design, problem, or challenge — our engineering team will take it from concept to production.",
  },
};

