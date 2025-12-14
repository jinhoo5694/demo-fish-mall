"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchModal from "./SearchModal";

const navItems = [
  { name: "구피류", href: "#" },
  { name: "카라신", href: "#" },
  { name: "시클리드", href: "#" },
  { name: "수조/용품", href: "#" },
  { name: "수초", href: "#" },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppBannerVisible, setIsAppBannerVisible] = useState(true);

  return (
    <>
      {/* App Download Banner - Google Play Store Style */}
      {isAppBannerVisible && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.appsweb.appS202002088cf3668d28be2_89d97f6bb9546"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 flex-1 group"
              >
                {/* Google Play Icon - Colorful */}
                <svg viewBox="0 0 512 512" className="w-6 h-6 shrink-0">
                  <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
                  <path fill="#34A853" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
                  <path fill="#FBBC05" d="M325.3 277.7l-68.1-68.1L47 512l280.8-161.2z"/>
                  <path fill="#EA4335" d="M486.7 234.3l-119.5-68.9-60.1 60.1 60.1 60.1 119.5-68.9c17.2-9.9 17.2-34.6 0-44.4z"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 hidden sm:block">Google Play에서 다운로드</span>
                  <span className="text-sm font-medium group-hover:text-[#34A853] transition-colors">고기야~놀자! 앱 설치하기</span>
                </div>
                {/* GET Button */}
                <span className="hidden sm:inline-block ml-2 px-4 py-1 bg-[#01875f] hover:bg-[#018756] text-white text-xs font-semibold rounded-full transition-colors">
                  설치
                </span>
              </a>
              <button
                onClick={() => setIsAppBannerVisible(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors ml-2"
                aria-label="배너 닫기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <header className={`fixed left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)] transition-all duration-300 ${isAppBannerVisible ? 'top-[44px] sm:top-[52px]' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              {/* Fish Icon SVG */}
              <svg
                viewBox="0 0 40 40"
                className="w-9 h-9 md:w-10 md:h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#f0001e" }} />
                    <stop offset="100%" style={{ stopColor: "#ff4d4d" }} />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="19" fill="url(#logoGradient)" />
                <ellipse cx="20" cy="20" rx="11" ry="7" fill="white" />
                <path d="M9 20 L3 14 L5 20 L3 26 Z" fill="white" />
                <circle cx="25" cy="18.5" r="2.5" fill="#1a1a1a" />
                <circle cx="25.8" cy="17.8" r="0.8" fill="white" />
                <path d="M18 13 Q20 9 22 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M30 20.5 Q32 20 30 19.5" stroke="#1a1a1a" strokeWidth="0.8" strokeLinecap="round" fill="none" />
              </svg>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold gradient-text leading-tight">
                  고기야~놀자!
                </span>
                <span className="text-[10px] md:text-xs text-[var(--muted-foreground)] hidden sm:block">
                  열대어 전문 쇼핑몰
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* SNS Links - Desktop only */}
              <div className="hidden lg:flex items-center gap-1">
                <a
                  href="https://www.instagram.com/fish_busan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/fishbusan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCZM6x7FN3k1pguU3DbGl3jg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="검색"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>

              {/* Cart Button */}
              <button
                className="w-10 h-10 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-110 relative"
                aria-label="장바구니"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary)] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] flex items-center justify-center transition-all duration-300"
                aria-label="메뉴"
              >
                {isMobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-[var(--border)] animate-slide-down">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)] rounded-lg font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
