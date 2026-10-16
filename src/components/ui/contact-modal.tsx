"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowLeft } from "lucide-react";
import { useContactModal } from "@/lib/contact-modal-context";
import { useLanguage } from "@/lib/language-context";

type Status = "idle" | "submitting" | "success" | "error";

const COPY = {
  en: {
    title: "Book a demo",
    sub: "Three quick steps. We reply within 24 hours.",
    steps: [
      { label: "Your name", hint: "Who are we talking to?" },
      { label: "Club or organization", hint: "Who do you represent?" },
      { label: "Work email", hint: "Where do we send the invite?" },
    ],
    next: "Next",
    back: "Back",
    submitting: "Sending…",
    successTitle: "You're in.",
    successBody: "Our partnerships team will contact you within 24 hours.",
    errorFallback: "Something went wrong. Please try again or email",
    required: "This one's required.",
    badEmail: "That email doesn't look right.",
    close: "Close",
  },
  ar: {
    title: "احجز عرضاً تجريبياً",
    sub: "ثلاث خطوات سريعة، وسنرد خلال ٢٤ ساعة.",
    steps: [
      { label: "الاسم", hint: "مع من نتحدث؟" },
      { label: "النادي أو المؤسسة", hint: "من تمثل؟" },
      { label: "البريد الإلكتروني للعمل", hint: "أين نرسل الدعوة؟" },
    ],
    next: "التالي",
    back: "رجوع",
    submitting: "جارٍ الإرسال…",
    successTitle: "تم!",
    successBody: "سيتواصل معك فريق الشراكات خلال ٢٤ ساعة.",
    errorFallback: "حدث خطأ. حاول مرة أخرى أو راسلنا على",
    required: "هذا الحقل مطلوب.",
    badEmail: "البريد الإلكتروني غير صحيح.",
    close: "إغلاق",
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#ffffff",
};

/* Dependency-free confetti + coin burst (gamified submit). */
function celebrate(x: number, y: number) {
  if (typeof window === "undefined") return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#faff69", "#ffffff", "rgba(255,255,255,0.85)", "#faff69"];
  type P = { el: HTMLElement; vx: number; vy: number; vr: number; r: number; life: number };
  const parts: P[] = [];
  for (let i = 0; i < 44; i++) {
    const coin = i % 4 === 0;
    const el = document.createElement("i");
    el.setAttribute("aria-hidden", "true");
    const s = el.style;
    s.position = "fixed";
    s.left = x + "px";
    s.top = y + "px";
    s.zIndex = "200";
    s.pointerEvents = "none";
    s.willChange = "transform";
    if (coin) {
      s.width = "22px";
      s.height = "22px";
      s.borderRadius = "50%";
      s.background = "radial-gradient(circle at 35% 30%, #ffe887, #e3b120 58%, #b8860b)";
      s.boxShadow = "inset 0 0 0 2px rgba(122,83,0,0.55)";
      s.color = "#6e4a00";
      s.font = "700 12px/22px system-ui, sans-serif";
      s.textAlign = "center";
      el.textContent = "$";
    } else {
      s.width = 5 + Math.random() * 6 + "px";
      s.height = 8 + Math.random() * 9 + "px";
      s.borderRadius = "2px";
      s.background = colors[i % colors.length];
    }
    document.body.appendChild(el);
    const ang = Math.random() * Math.PI * 2;
    const sp = 4 + Math.random() * 9;
    parts.push({
      el,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - 7,
      vr: (Math.random() - 0.5) * 24,
      r: 0,
      life: 70 + Math.random() * 40,
    });
  }
  let frame = 0;
  const tick = () => {
    frame++;
    let alive = false;
    for (const p of parts) {
      if (frame > p.life) {
        if (p.el.parentNode) p.el.remove();
        continue;
      }
      alive = true;
      p.vy += 0.42;
      p.vx *= 0.985;
      p.r += p.vr;
      const px = parseFloat(p.el.style.left) + p.vx;
      const py = parseFloat(p.el.style.top) + p.vy;
      p.el.style.left = px + "px";
      p.el.style.top = py + "px";
      p.el.style.transform = `translate(-50%,-50%) rotate(${p.r}deg)`;
      p.el.style.opacity = String(Math.max(0, 1 - (frame / p.life) ** 3));
    }
    if (alive) requestAnimationFrame(tick);
    else parts.forEach((p) => p.el.remove());
  };
  requestAnimationFrame(tick);
}

export function ContactModal() {
  const { isOpen, close } = useContactModal();
  const { lang } = useLanguage();
  const tx = COPY[lang];

  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", club: "", email: "" });
  const [fieldError, setFieldError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 90);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  // Reset for the next open after the exit animation finishes
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => {
      setStep(0);
      setValues({ name: "", club: "", email: "" });
      setFieldError("");
      setStatus("idle");
      setErrorMsg("");
    }, 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const submit = useCallback(
    async (finalValues: { name: string; club: string; email: string }) => {
      if (status === "submitting") return;
      setStatus("submitting");
      setErrorMsg("");
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...finalValues, company_website: "" }),
        });
        const json: { ok: boolean; error?: string } = await res.json();
        if (json.ok) {
          setStatus("success");
          const r = cardRef.current?.getBoundingClientRect();
          celebrate(r ? r.left + r.width / 2 : innerWidth / 2, r ? r.top + r.height / 2 : innerHeight / 2);
        } else {
          setStatus("error");
          setErrorMsg(json.error ?? "");
        }
      } catch {
        setStatus("error");
      }
    },
    [status]
  );

  function advance() {
    const keys = ["name", "club", "email"] as const;
    const key = keys[step];
    const val = values[key].trim();
    if (!val) {
      setFieldError(tx.required);
      inputRef.current?.focus();
      return;
    }
    if (key === "email" && !EMAIL_RE.test(val)) {
      setFieldError(tx.badEmail);
      inputRef.current?.focus();
      return;
    }
    setFieldError("");
    if (step < 2) {
      setStep(step + 1);
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      // Last step complete — auto-submit
      void submit({ name: values.name.trim(), club: values.club.trim(), email: val });
    }
  }

  const fieldKey = (["name", "club", "email"] as const)[step];
  const autoComplete = step === 0 ? "name" : step === 1 ? "organization" : "email";

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
            ref={cardRef}
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
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 16 }}
                  className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{ background: "rgba(var(--color-primary-rgb),0.12)", border: "1px solid rgba(var(--color-primary-rgb),0.35)" }}
                >
                  <Check size={22} style={{ color: "var(--color-primary)" }} />
                </motion.div>
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
                <p className="text-body-text text-sm mb-6">{tx.sub}</p>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-6" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        flex: i === step ? 2.2 : 1,
                        background: i <= step ? "var(--color-primary)" : "rgba(255,255,255,0.12)",
                      }}
                    />
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    advance();
                  }}
                  className="flex flex-col gap-4"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onAnimationComplete={() => inputRef.current?.focus()}
                      className="flex flex-col gap-1.5"
                    >
                      <label htmlFor="lead-field" className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {tx.steps[step].label}
                      </label>
                      <input
                        ref={inputRef}
                        id="lead-field"
                        name={fieldKey}
                        autoFocus
                        type={step === 2 ? "email" : "text"}
                        inputMode={step === 2 ? "email" : "text"}
                        value={values[fieldKey]}
                        onChange={(e) => {
                          setValues((v) => ({ ...v, [fieldKey]: e.target.value }));
                          if (fieldError) setFieldError("");
                        }}
                        maxLength={200}
                        autoComplete={autoComplete}
                        className="h-12 rounded-lg px-4 text-sm outline-none transition-colors duration-200 focus:border-[var(--color-primary)]"
                        style={INPUT_STYLE}
                      />
                      <p className="text-xs" style={{ color: fieldError ? "#f87171" : "rgba(255,255,255,0.4)" }} role={fieldError ? "alert" : undefined}>
                        {fieldError || tx.steps[step].hint}
                      </p>
                    </motion.div>
                  </AnimatePresence>

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

                  <div className="flex items-center gap-3 mt-1">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setFieldError("");
                          setStep(step - 1);
                          setTimeout(() => inputRef.current?.focus(), 60);
                        }}
                        className="h-12 px-4 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:bg-white/10 cursor-pointer"
                        style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        <ArrowLeft size={15} className={lang === "ar" ? "rotate-180" : undefined} />
                        {tx.back}
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex-1 h-12 rounded-lg bg-primary text-on-primary text-sm font-bold transition-colors duration-200 hover:bg-primary-active disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === "submitting" ? tx.submitting : tx.next}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
