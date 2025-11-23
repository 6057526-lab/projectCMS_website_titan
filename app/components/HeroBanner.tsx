"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  const images = hero.images && hero.images.length > 0 ? hero.images : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const hasImages = images.length > 0;

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[100dvh] flex items-center bg-gray-900 overflow-hidden pt-16" // pt-16 to account for fixed header
    >
      {/* Background Images with Fade Transition */}
      {hasImages ? (
        <>
          <div className="absolute inset-0 z-0">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || "REEMS advanced manufacturing facility - magnesium, aluminium and titanium production"}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/65 z-0" />
          
          {/* Image Indicators (dots) */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
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
