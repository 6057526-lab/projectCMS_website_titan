"use client";

import Image from "next/image";
import { useState } from "react";

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
            <SegmentCard key={index} segment={segment} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for segment card with slider
function SegmentCard({ segment }: { segment: MarketSegmentsProps['marketSegments']['segments'][0] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = segment.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {/* Image Slider */}
      {images.length > 0 && (
        <div className="mb-4 relative">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-300 bg-gray-200">
            <Image
              src={convertHeicToJpg(images[currentImageIndex].url)}
              alt={images[currentImageIndex].alt || segment.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          
          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
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
  );
}
      </div>
    </section>
  );
}

