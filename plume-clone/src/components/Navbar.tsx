import React, { useState, useEffect } from "react";

interface NavbarProps {
  onStartWriting: () => void;
}

export default function Navbar({ onStartWriting }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      id="mainNav"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 transition-all duration-300 ${
        scrolled
          ? "bg-brand-bg/95 backdrop-blur-md shadow-sm border-b border-brand-border/60"
          : "bg-transparent"
      }`}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`font-display text-2xl md:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
          scrolled ? "text-brand-text" : "text-white"
        }`}
      >
        Plume<sup className="text-xs font-semibold ml-0.5">®</sup>
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {[
          { label: "Workspace", id: "workspace" },
          { label: "Features", id: "features" },
          { label: "How it works", id: "how-it-works" },
          { label: "Use cases", id: "use-cases" },
          { label: "Pricing", id: "pricing" },
        ].map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-brand-accent ${
                scrolled ? "text-brand-text" : "text-white/90"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <button
          onClick={onStartWriting}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer whitespace-nowrap shadow-sm ${
            scrolled
              ? "bg-brand-accent text-white hover:bg-brand-accent-hover"
              : "bg-white text-brand-text hover:bg-white/95"
          }`}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
