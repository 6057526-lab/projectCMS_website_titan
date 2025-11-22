import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  hero: {
    headline: string;
    subheadline: string;
    description: string;
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
  const backgroundImage = hero.images && hero.images.length > 0 ? hero.images[0] : null;

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[100dvh] flex items-center bg-gray-900 overflow-hidden pt-16" // pt-16 to account for fixed header
    >
      {/* Background Image */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt || "REEMS advanced manufacturing facility - magnesium, aluminium and titanium production"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/65 z-0" /> 
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0" />
      )}

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-4xl mx-auto md:mx-0">
          {/* Headline: Responsive scaling */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed opacity-90">
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark transition-colors duration-200 rounded-md shadow-lg hover:shadow-xl active:transform active:scale-95 w-full sm:w-auto min-h-[48px]"
            >
              Request a Quote
            </Link>
            {/* Secondary button logic if needed later, currently keeping single CTA focus for mobile clarity */}
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
    </section>
  );
}
