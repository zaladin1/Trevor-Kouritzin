import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Meet Trevor', href: '/meet-trevor' },
  { label: 'Articles', href: '/articles' },
  { label: 'Publications', href: '/publications' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({ currentPath }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <header className="w-full z-40" data-agent-entity="primary-navigation">
      {/* Top Utility Bar: Black with red mail icon & direct email */}
      <div className="bg-[#0B0C0E] text-white border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-between text-xs">
          <span className="hidden sm:inline text-white/60 tracking-wide">
            Edmonton, Alberta · Preventive Medicine &amp; Human Nutrition
          </span>
          <a
            href="mailto:Info@DoctorTrev.com"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors ml-auto"
          >
            <Mail className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" />
            <span className="font-medium">Info@DoctorTrev.com</span>
          </a>
        </div>
      </div>

      {/* Slick Midnight Sapphire Brand Band with Wordmark, Social Icons & Book Now */}
      <div className="bg-[#0E2439] border-b border-[#1C3B57]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex items-center justify-between gap-6">
          <a
            href="/"
            className="inline-flex items-center shrink-0 hover:opacity-90 transition-opacity"
            aria-label="Dr. Trevor Kouritzin — Evidence Based Recommendations"
          >
            <img
              src="/images/logo-wordmark.png"
              alt="Dr. Trevor Kouritzin — Evidence Based Recommendations"
              width="260"
              height="93"
              referrerPolicy="no-referrer"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Circular Social Icons */}
            <div className="flex items-center gap-2.5" aria-label="Social media links">
              <a
                href="https://www.instagram.com/trevorkouritzin/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#181A1F] border border-white/15 text-white inline-flex items-center justify-center hover:border-[#8AB4DC] hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/trevorkouritzin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#DC2626] text-white inline-flex items-center justify-center hover:scale-105 transition-transform"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/trevor-kouritzin-9b8558209/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#163A5F] border border-white/15 text-white inline-flex items-center justify-center hover:border-[#8AB4DC] hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            <a
              href="/services#consultation"
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors rounded-sm shadow-xs whitespace-nowrap shrink-0 min-h-[40px]"
              data-agent-action="book-consultation"
            >
              Book Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-white bg-white/10 hover:bg-white/20 rounded-sm transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sleek Midnight Navigation Bar (Sticky on desktop) */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:block sticky top-0 z-40 bg-[#09121B] border-b border-white/10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-12 flex items-center justify-center gap-8 text-xs font-semibold tracking-wide">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`h-full inline-flex items-center whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 ${
                  active
                    ? 'text-[#8AB4DC] border-[#8AB4DC]'
                    : 'text-white/80 border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-[#E2E5E9] bg-white px-4 py-5 space-y-4"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-3 text-base font-medium min-h-[44px] flex items-center ${
                  isActive(item.href)
                    ? 'bg-[#F4F6F8] text-[#163A5F] font-semibold'
                    : 'text-[#52565E] hover:bg-[#F4F6F8]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#E2E5E9] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/trevorkouritzin/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#181A1F] text-white inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/trevorkouritzin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-[#DC2626] text-white inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/trevor-kouritzin-9b8558209/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#0A66C2] text-white inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            <a
              href="/services#consultation"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded-sm min-h-[44px]"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
