"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { theme, withAlpha } from "@/lib/theme";

const AI_TECH_SUBLINKS = [
  { label: "Single Mic Enhancement", href: "/ai-technologies/single-mic" },
  { label: "Dual Mic Enhancement", href: "/ai-technologies/dual-mic" },
  { label: "Far-Field Enhancement", href: "/ai-technologies/far-field" },
  { label: "Keyword Spotting", href: "/ai-technologies/keyword-spotting" },
];

const NAV_LINKS = [
  { label: "AI Technologies", href: "/ai-technologies/single-mic", children: AI_TECH_SUBLINKS },
  { label: "R&D", href: "/research" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change — adjusted during render (React's
  // recommended pattern for "state that depends on a prop changing")
  // instead of a useEffect, which would cause an extra cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

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

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white/0"}`}
      style={{ borderColor: isScrolled ? theme.borderInactive : "transparent" }}
    >
      <style>{`
        .theme-nav-sublink:hover {
          background-color: ${withAlpha(theme.accent, 0.08)};
          color: ${theme.primary};
        }
      `}</style>
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
            const isActive = link.children
              ? pathname.startsWith("/ai-technologies")
              : pathname === link.href;
            return (
              <div key={link.label} className="group relative">
                {link.children ? (
                  // Parent label has no page of its own — it only toggles the
                  // dropdown. Clicking it shouldn't navigate anywhere.
                  <span
                    className="relative flex cursor-default items-center gap-1 px-3.5 py-2 text-base font-medium transition-colors"
                    style={{ color: isActive ? theme.secondary : theme.textMuted }}
                  >
                    {link.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      style={{ backgroundColor: theme.accent }}
                    />
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    className="relative flex items-center gap-1 px-3.5 py-2 text-base font-medium transition-colors"
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
                )}

                {link.children && (
                  <div
                    className="invisible absolute left-0 top-full w-64 translate-y-1 rounded-xl border bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ borderColor: theme.borderInactive }}
                  >
                    <div className="p-2">
                      {link.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="theme-nav-sublink block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors"
                          style={{ color: theme.textMuted }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="border-t px-4 py-4 pb-6 sm:px-6"
          style={{ borderColor: theme.borderInactive, backgroundColor: theme.pageBg }}
        >
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = link.children
                ? pathname.startsWith("/ai-technologies")
                : pathname === link.href;
              return (
                <div key={link.label}>
                  <div className="flex items-center">
                    {link.children ? (
                      // Parent label has no page of its own — tapping it just
                      // toggles the submenu below instead of navigating.
                      <button
                        type="button"
                        onClick={() => setMobileSubOpen((v) => !v)}
                        style={{
                          transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                          backgroundColor: isActive ? withAlpha(theme.accent, 0.08) : "transparent",
                          color: isActive ? theme.primary : theme.textMuted,
                        }}
                        className="flex-1 translate-y-0 rounded-lg px-3 py-2.5 text-left text-base font-medium transition-all duration-300"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                          backgroundColor: isActive ? withAlpha(theme.accent, 0.08) : "transparent",
                          color: isActive ? theme.primary : theme.textMuted,
                        }}
                        className="flex-1 translate-y-0 rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.children && (
                      <button
                        type="button"
                        onClick={() => setMobileSubOpen((v) => !v)}
                        aria-label="Toggle AI Technologies submenu"
                        aria-expanded={mobileSubOpen}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ color: theme.textMuted }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`h-4 w-4 transition-transform duration-200 ${mobileSubOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {link.children && (
                    <div
                      className={`overflow-hidden pl-3 transition-all duration-300 ${
                        mobileSubOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm"
                          style={{ color: theme.textMuted }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
