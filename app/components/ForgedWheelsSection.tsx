interface ForgedWheelsSectionProps {
  forgedWheels: {
    title: string;
    subtitle: string;
    text: string;
    bullets: string[];
    ctaButton: string;
  };
}

export default function ForgedWheelsSection({ forgedWheels }: ForgedWheelsSectionProps) {

  return (
    <section id="wheels" className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{forgedWheels.title}</h2>
            <p className="text-lg md:text-xl text-blue-100">{forgedWheels.subtitle}</p>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-12 border border-white/10">
            <p className="text-base md:text-lg leading-relaxed mb-8 opacity-95">{forgedWheels.text}</p>

            {/* Bullets */}
            <ul className="space-y-4 mb-10">
              {forgedWheels.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-200 mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-blue-50 text-base">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-md hover:bg-blue-50 transition-colors duration-200 text-base min-h-[50px] w-full sm:w-auto"
              >
                {forgedWheels.ctaButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
