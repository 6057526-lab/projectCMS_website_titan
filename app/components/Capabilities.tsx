import Image from "next/image";

interface CapabilitiesProps {
  capabilities: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      photos: string[];
      photoUrls?: Array<{ url: string; alt: string }>;
      text: string;
      additionalBullets?: string[];
      additionalText?: string;
    }>;
  };
}

export default function Capabilities({ capabilities }: CapabilitiesProps) {

  return (
    <section id="capabilities" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {capabilities.title}
          </h2>
          <p className="text-lg text-gray-600">{capabilities.subtitle}</p>
        </div>

        {/* Capabilities Items */}
        <div className="space-y-12">
          {capabilities.items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center bg-gray-50 rounded-lg p-8 shadow-md`}
            >
              {/* Photos */}
              <div className="w-full lg:w-1/2">
                {item.photoUrls && item.photoUrls.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {item.photoUrls.map((photo, photoIndex) => (
                      <div
                        key={photoIndex}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-300"
                      >
                        <Image
                          src={photo.url}
                          alt={photo.alt || item.photos[photoIndex] || `Image ${photoIndex + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-200 rounded-lg p-6 min-h-[250px] flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">
                      Reference images:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.photos.length > 0 ? (
                        item.photos.map((photo, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="bg-white rounded p-3 text-xs text-gray-700 text-center border border-gray-300"
                          >
                            {photo}
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center text-gray-500 text-sm">
                          Images coming soon
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{item.text}</p>

                {item.additionalText && (
                  <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                    {item.additionalText}
                  </p>
                )}

                {item.additionalBullets && item.additionalBullets.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {item.additionalBullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start">
                        <span className="text-primary mr-2 flex-shrink-0">•</span>
                        <span className="text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

