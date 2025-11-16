interface MarketSegmentsProps {
  marketSegments: {
    title: string;
    subtitle: string;
    segments: Array<{
      title: string;
      leadText: string;
      bullets: string[];
    }>;
  };
}

export default function MarketSegments({ marketSegments }: MarketSegmentsProps) {

  return (
    <section id="market-segments" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {marketSegments.title}
          </h2>
          <p className="text-lg text-gray-600">{marketSegments.subtitle}</p>
        </div>

        {/* Segments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketSegments.segments.map((segment, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-primary mb-4">{segment.title}</h3>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">{segment.leadText}</p>
              <ul className="space-y-2">
                {segment.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start text-sm">
                    <span className="text-primary mr-2 flex-shrink-0">•</span>
                    <span className="text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

