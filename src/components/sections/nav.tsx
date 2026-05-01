"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const tx = t[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleLang() {
    setLang(lang === "en" ? "ar" : "en");
  }

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-hairline" : "border-b border-transparent"
        )}
        style={{
          background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-on-dark font-bold text-lg tracking-tight leading-none select-none"
          >
            SPORTECH
          </a>

          {/* Desktop center nav */}
          <div className="hidden md:flex items-center gap-8">
            {tx.links.map((link) => (
              <a
                key={link.key}
                href={`#${link.key}`}
                className="text-body-text hover:text-on-dark text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 cursor-pointer select-none"
              aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              <span className={cn("transition-colors", lang === "en" ? "text-on-dark" : "text-muted hover:text-on-dark")}>
                EN
              </span>
              <span className="text-muted-soft" aria-hidden="true">|</span>
              <span className={cn("transition-colors", lang === "ar" ? "text-on-dark" : "text-muted hover:text-on-dark")}>
                عر
              </span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 bg-primary text-on-primary text-sm font-semibold rounded-lg px-5 h-10 hover:bg-primary-active transition-colors duration-200 whitespace-nowrap"
            >
              {tx.cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-on-dark p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            className="fixed inset-x-0 top-16 z-40 border-b border-hairline"
            style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {tx.links.map((link) => (
                <a
                  key={link.key}
                  href={`#${link.key}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-body-text hover:text-on-dark text-base font-medium transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile lang toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-body-text text-base font-medium py-1"
              >
                <span className={lang === "en" ? "text-primary" : "text-muted"}>EN</span>
                <span className="text-muted-soft">|</span>
                <span className={lang === "ar" ? "text-primary" : "text-muted"}>عر</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1 bg-primary text-on-primary text-sm font-semibold rounded-lg px-5 h-10 hover:bg-primary-active transition-colors mt-2 w-full"
              >
                {tx.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
