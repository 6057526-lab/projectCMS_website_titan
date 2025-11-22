"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize if moving to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Market segments", href: "#market-segments" },
    { label: "Lifecycle", href: "#lifecycle" },
    { label: "Wheels", href: "#wheels" },
    { label: "Company", href: "#company" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-3 md:py-4 shadow-sm"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-12 md:h-auto">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary tracking-tight z-50 relative"
            onClick={() => setMobileMenuOpen(false)}
          >
            REEMS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-gray-700 hover:text-primary z-50 relative focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden pt-20 px-6 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xl font-semibold text-gray-800 hover:text-primary border-b border-gray-100 pb-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
