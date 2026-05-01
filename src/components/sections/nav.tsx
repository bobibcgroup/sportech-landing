"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = ["Platform", "Revenue", "Sports", "Partners", "Contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-hairline"
            : "border-b border-transparent"
        )}
        style={{
          background: scrolled
            ? "rgba(10,10,10,0.85)"
            : "transparent",
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
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-body-text hover:text-on-dark text-sm font-medium transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs font-medium text-muted">
              <button className="hover:text-on-dark transition-colors">EN</button>
              <span className="text-muted-soft">|</span>
              <button className="hover:text-on-dark transition-colors">عر</button>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 bg-primary text-on-primary text-sm font-semibold rounded-lg px-5 h-10 hover:bg-primary-active transition-colors duration-200 whitespace-nowrap"
            >
              Partner With Us →
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-on-dark p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-x-0 top-16 z-40 border-b border-hairline"
            style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-body-text hover:text-on-dark text-base font-medium transition-colors py-1"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1 bg-primary text-on-primary text-sm font-semibold rounded-lg px-5 h-10 hover:bg-primary-active transition-colors mt-2 w-full"
              >
                Partner With Us →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
