"use client";

import Image from "next/image";
import { useState } from "react";

// Helper function for Cloudinary optimization
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {marketSegments.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600">{marketSegments.subtitle}</p>
        </div>

        {/* Segments Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {marketSegments.segments.map((segment, index) => (
            <SegmentCard key={index} segment={segment} />
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <div className="bg-gray-50 rounded-lg p-5 sm:p-6 flex flex-col h-full border border-gray-200">
      {/* Image Slider */}
      {images.length > 0 && (
        <div className="mb-4 relative group">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={convertHeicToJpg(images[currentImageIndex].url)}
              alt={images[currentImageIndex].alt || segment.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized
            />
            
            {/* Navigation Arrows - Enhanced for touch */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 sm:p-1.5 transition-all z-10 min-w-[44px] min-h-[44px] sm:min-w-[32px] sm:min-h-[32px] flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 sm:p-1.5 transition-all z-10 min-w-[44px] min-h-[44px] sm:min-w-[32px] sm:min-h-[32px] flex items-center justify-center"
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
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-gray-300'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      <h3 className="text-xl font-bold text-primary mb-3">{segment.title}</h3>
      <p className="text-sm text-gray-700 mb-4 leading-relaxed flex-grow">{segment.leadText}</p>
      <ul className="space-y-2 mt-auto">
        {segment.bullets.map((bullet, bulletIndex) => (
          <li key={bulletIndex} className="flex items-start text-sm text-gray-600">
            <span className="text-primary mr-2 flex-shrink-0 mt-1">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
