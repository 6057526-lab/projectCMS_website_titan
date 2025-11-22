import Image from "next/image";

// Helper function to convert HEIC images to JPG format via Cloudinary
function convertHeicToJpg(url: string): string {
  if (url.includes('cloudinary.com') && url.toLowerCase().endsWith('.heic')) {
    if (url.includes('/upload/')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/f_jpg/${parts[1]}`;
      }
    }
  }
  return url;
}

interface MarketSegmentsProps {
  marketSegments: {
    title: string;
    subtitle: string;
    segments: Array<{
      title: string;
      leadText: string;
      bullets: string[];
      images?: Array<{ url: string; alt: string }>;
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
              {/* Images */}
              {segment.images && segment.images.length > 0 && (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {segment.images.slice(0, 2).map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative aspect-square rounded-lg overflow-hidden border border-gray-300"
                    >
                      <Image
                        src={convertHeicToJpg(img.url)}
                        alt={img.alt || segment.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
              
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

