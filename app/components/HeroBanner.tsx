import Image from "next/image";

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

export default function HeroBanner({ hero, intro }: HeroBannerProps) {

  // Get first image for background, or use gradient
  const backgroundImage = hero.images && hero.images.length > 0 ? hero.images[0] : null;

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 section-padding overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            className="object-cover opacity-20"
            priority
            unoptimized
          />
        </div>
      )}
      
      <div className="container-custom relative z-10">
        {/* Main Hero */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">{hero.subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#capabilities" className="btn-primary">
              {hero.buttons.primary}
            </a>
            <a href="#contact" className="btn-secondary">
              {hero.buttons.secondary}
            </a>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            {hero.description}
          </p>
        </div>

        {/* Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">{intro.text}</p>
            </div>
            <div>
              <ul className="space-y-4">
                {intro.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-800 font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href="#contact" className="btn-primary w-full sm:w-auto text-center">
                  {intro.ctaButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

