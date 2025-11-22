import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  hero: {
    headline: string;
    subheadline: string;
    description: string; // We might ignore this to reduce text overload
    buttons: {
      primary: string;
      secondary: string;
    };
    images?: Array<{ url: string; alt: string }>;
  };
  intro: {
    text: string;
    bullets: string[];
    ctaButton: string;
  };
}

export default function HeroBanner({ hero }: HeroBannerProps) {
  // Use the first image as the background, fallback to a dark industrial color if missing
  const backgroundImage = hero.images && hero.images.length > 0 ? hero.images[0] : null;

  return (
    <section 
      id="hero" 
      className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] flex items-center bg-gray-900 overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt || "Industrial background"}
              fill
              className="object-cover"
              priority
              unoptimized // If using external images without optimization config
            />
          </div>
          {/* Industrial Dark Overlay - slightly stronger to ensure text readability */}
          <div className="absolute inset-0 bg-black/60 z-0" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0" />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* H1 Headline - Bold, Industrial, Concise */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {hero.headline}
          </h1>

          {/* H2 Subheadline - clear and readable */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed opacity-90">
            {hero.subheadline}
          </p>

          {/* Single Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark transition-colors duration-200 rounded-md shadow-lg hover:shadow-xl active:transform active:scale-95"
            >
              {/* Prefer "Request a quote" style text if possible, defaulting to primary button text or hardcoded fallback if needed for the redesign */}
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Industrial accent/decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
    </section>
  );
}
