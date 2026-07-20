"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { theme, withAlpha } from "@/lib/theme";

const NAV_LINKS = [
  { label: "AI Technologies", href: "/ai-technologies" },
  { label: "R&D", href: "/research" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 8);

      if (isOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white/0"}`}
      style={{ borderColor: isScrolled ? theme.borderInactive : "transparent" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/iphipi-primary.png"
            alt="iphipi logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className="text-lg font-extrabold uppercase tracking-widest"
            style={{ color: theme.secondary }}
          >
            iphipi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="group relative px-3.5 py-2 text-base font-medium transition-colors"
                style={{
                  color: isActive ? theme.secondary : theme.textMuted,
                }}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ backgroundColor: theme.accent }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              color: theme.secondary,
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className={`origin-center transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"
                }`}
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className={`origin-center transition-all duration-300 ${
                  isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                d="M6 18L18 6M6 6l12 12"
                style={{ display: isOpen ? "block" : "none" }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-nav-menu"
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="border-t px-4 py-4 pb-6 sm:px-6"
          style={{ borderColor: theme.borderInactive, backgroundColor: theme.pageBg }}
        >
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                    backgroundColor: isActive ? withAlpha(theme.accent, 0.08) : "transparent",
                    color: isActive ? theme.primary : theme.textMuted,
                  }}
                  className="translate-y-0 rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-300"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
