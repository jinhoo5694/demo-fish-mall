"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[116px] sm:pt-[132px]">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[#1a0005] dark:from-[#1a0005] dark:via-[var(--primary-dark)] dark:to-black" />

      {/* Animated bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 60 + 20 + "px",
              height: Math.random() * 60 + 20 + "px",
              left: Math.random() * 100 + "%",
              bottom: -100 + "px",
              animation: `bubble ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Fish decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute text-6xl md:text-8xl opacity-20 animate-pulse" style={{ top: "20%", left: "10%" }}>
          🐠
        </span>
        <span className="absolute text-4xl md:text-6xl opacity-20 animate-pulse" style={{ top: "60%", right: "15%", animationDelay: "0.5s" }}>
          🐟
        </span>
        <span className="absolute text-5xl md:text-7xl opacity-20 animate-pulse" style={{ top: "40%", right: "25%", animationDelay: "1s" }}>
          🐡
        </span>
        <span className="absolute text-3xl md:text-5xl opacity-20 animate-pulse" style={{ bottom: "25%", left: "20%", animationDelay: "1.5s" }}>
          🦐
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span
            className="inline-block text-sm font-medium rounded-full border border-white/30"
            style={{ padding: "12px 24px", marginBottom: "32px", backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            🎉 전 상품 10~20% 적립 이벤트 진행 중!
          </span>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
            style={{ marginBottom: "32px", lineHeight: "1.3" }}
          >
            열대어의 세계에
            <br />
            <span style={{
              background: "linear-gradient(to right, #fde047, #fdba74, #fca5a5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              오신 것을 환영합니다
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ color: "rgba(255,255,255,0.8)", marginBottom: "48px", lineHeight: "1.8" }}
          >
            구피, 테트라, 시클리드 등 다양한 열대어와 수조, 수초까지
            <br className="hidden md:block" />
            모든 것을 한 곳에서 만나보세요.
          </p>

          <div
            className={`flex flex-col sm:flex-row justify-center transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ gap: "16px" }}
          >
            <a
              href="#products"
              className="inline-block font-bold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                padding: "16px 32px",
                backgroundColor: "#ffffff",
                color: "#dc2626",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
            >
              상품 둘러보기
            </a>
            <a
              href="https://fish.appsweb.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                padding: "16px 32px",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                border: "2px solid #ffffff"
              }}
            >
              공식 사이트 방문
            </a>
          </div>

          {/* Scroll indicator - moved below buttons */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ marginTop: "48px" }}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-sm text-white/60">스크롤하여 더보기</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white/60"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bubble animation keyframes */}
      <style jsx>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
