"use client";

import Image from "next/image";
import { useState } from "react";

// Helper function to convert HEIC images to JPG format via Cloudinary
function convertHeicToJpg(url: string): string {
  // Check if URL is from Cloudinary and ends with .heic
  if (url.includes('cloudinary.com') && url.toLowerCase().endsWith('.heic')) {
    // Insert format transformation before the version or filename
    // Example: .../upload/v1763800893/.../file.heic
    // Becomes: .../upload/f_jpg/v1763800893/.../file.heic
    if (url.includes('/upload/')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        // Add f_jpg transformation to convert HEIC to JPG
        return `${parts[0]}/upload/f_jpg/${parts[1]}`;
      }
    }
  }
  return url;
}

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
                  <ImageSlider
                    images={item.photoUrls}
                    altTexts={item.photos}
                    title={item.title}
                  />
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

// Image Slider Component for Capabilities
function ImageSlider({
  images,
  altTexts,
  title,
}: {
  images: Array<{ url: string; alt: string }>;
  altTexts: string[];
  title: string;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <div className="relative">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-300 bg-gray-200">
        <Image
          src={convertHeicToJpg(images[currentImageIndex].url)}
          alt={images[currentImageIndex].alt || altTexts[currentImageIndex] || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
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
  );
}

