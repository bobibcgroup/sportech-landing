"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useContactModal } from "@/lib/contact-modal-context";
import { useLanguage } from "@/lib/language-context";

type Status = "idle" | "submitting" | "success" | "error";

const COPY = {
  en: {
    title: "Book a demo",
    sub: "Tell us who you are. We reply within 24 hours.",
    name: "Your name",
    club: "Club or organization",
    email: "Work email",
    submit: "Request demo",
    submitting: "Sending…",
    successTitle: "Request received.",
    successBody: "Our partnerships team will contact you within 24 hours.",
    errorFallback: "Something went wrong. Please try again or email",
    close: "Close",
  },
  ar: {
    title: "احجز عرضاً تجريبياً",
    sub: "عرّفنا بنفسك، وسنرد خلال ٢٤ ساعة.",
    name: "الاسم",
    club: "النادي أو المؤسسة",
    email: "البريد الإلكتروني للعمل",
    submit: "اطلب العرض",
    submitting: "جارٍ الإرسال…",
    successTitle: "تم استلام طلبك.",
    successBody: "سيتواصل معك فريق الشراكات خلال ٢٤ ساعة.",
    errorFallback: "حدث خطأ. حاول مرة أخرى أو راسلنا على",
    close: "إغلاق",
  },
} as const;

const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#ffffff",
};

export function ContactModal() {
  const { isOpen, close } = useContactModal();
  const { lang } = useLanguage();
  const tx = COPY[lang];

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 80);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  // Reset for the next open after the exit animation finishes
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
    }, 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      club: String(data.get("club") ?? ""),
      email: String(data.get("email") ?? ""),
      company_website: String(data.get("company_website") ?? ""),
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: { ok: boolean; error?: string } = await res.json();

      if (json.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(json.error ?? "");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative w-full max-w-md rounded-2xl border p-8"
            style={{
              background: "rgba(14,14,14,0.97)",
              borderColor: "rgba(var(--color-primary-rgb),0.18)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label={tx.close}
              className="absolute top-4 end-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/10 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <X size={16} />
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{ background: "rgba(var(--color-primary-rgb),0.12)", border: "1px solid rgba(var(--color-primary-rgb),0.35)" }}
                >
                  <Check size={22} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3 id="contact-modal-title" className="text-on-dark font-bold text-xl mb-2 tracking-tight">
                  {tx.successTitle}
                </h3>
                <p className="text-body-text text-sm leading-relaxed">{tx.successBody}</p>
              </div>
            ) : (
              <>
                <h3 id="contact-modal-title" className="text-on-dark font-bold text-2xl tracking-tight mb-1.5">
                  {tx.title}
                </h3>
                <p className="text-body-text text-sm mb-7">{tx.sub}</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute opacity-0 pointer-events-none h-0 w-0"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lead-name" className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {tx.name}
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      maxLength={200}
                      autoComplete="name"
                      className="h-11 rounded-lg px-4 text-sm outline-none transition-colors duration-200 focus:border-[var(--color-primary)]"
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lead-club" className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {tx.club}
                    </label>
                    <input
                      id="lead-club"
                      name="club"
                      type="text"
                      required
                      maxLength={200}
                      autoComplete="organization"
                      className="h-11 rounded-lg px-4 text-sm outline-none transition-colors duration-200 focus:border-[var(--color-primary)]"
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lead-email" className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {tx.email}
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      className="h-11 rounded-lg px-4 text-sm outline-none transition-colors duration-200 focus:border-[var(--color-primary)]"
                      style={INPUT_STYLE}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm leading-relaxed" style={{ color: "#f87171" }} role="alert">
                      {errorMsg || tx.errorFallback}{" "}
                      {!errorMsg && (
                        <a href="mailto:contact@sportech.com.sa" className="underline" style={{ color: "#fca5a5" }}>
                          contact@sportech.com.sa
                        </a>
                      )}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 h-12 rounded-lg bg-primary text-on-primary text-sm font-bold transition-colors duration-200 hover:bg-primary-active disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "submitting" ? tx.submitting : tx.submit}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
