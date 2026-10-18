"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactModal } from "@/lib/contact-modal-context";
import { useLanguage } from "@/lib/language-context";
import { V2_COPY } from "./copy";

const SPORT_IMGS = [
  "/sportscreens/soccer.webp",
  "/sportscreens/basketball.webp",
  "/sportscreens/formula1.webp",
  "/sportscreens/esports.webp",
  "/sportscreens/cricket.webp",
  "/sportscreens/martialarts.webp",
  "/sportscreens/tennis.webp",
  "/sportscreens/nfl.webp",
  "", // "+ Yours" card has no screenshot
];

/* revenue split weights; labels come from the copy dictionary */
const SPLIT_W = [9.0, 6.6, 6.0, 3.6, 1.8, 1.5, 0.9, 0.6];

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#eef1f6" strokeWidth="2">
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

export function V2Landing({ corporate = false }: { corporate?: boolean }) {
  const { open: openContactModal } = useContactModal();
  const { lang, setLang } = useLanguage();
  const t = V2_COPY[lang];
  const rootRef = useRef<HTMLElement>(null);
  const openRef = useRef(openContactModal);
  useEffect(() => {
    openRef.current = openContactModal;
  }, [openContactModal]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tt = V2_COPY[lang];

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: Array<() => void> = [];
    const triggers: ScrollTrigger[] = [];
    const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    /* ---------- use-case channels ---------- */
    const CH = tt.cases.channels;
    const chBig = $("#chBig"), chCap = $("#chCap"), chSrc = $("#chSrc"),
      chProof = $("#chProof"), chModel = $("#chModel"), panel = $("#chanpanel");
    function renderCh(i: number) {
      const c = CH[i];
      if (!chBig || !chCap || !chSrc || !chModel || !chProof || !panel) return;
      chBig.textContent = c.big; chCap.textContent = c.cap; chSrc.textContent = c.src; chModel.textContent = c.model;
      chBig.style.fontSize = c.big.length >= 7 ? "clamp(52px,6.6vw,112px)" : c.big.length >= 6 ? "clamp(58px,7.8vw,136px)" : "";
      chProof.innerHTML = c.proof.map((p) => '<div class="cpr"><b class="dh">' + p[0] + "</b><p>" + p[1] + "</p></div>").join("");
      if (!reduce) gsap.fromTo(panel, { opacity: 0.35, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
    }
    $$("#cases .ctab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$("#cases .ctab").forEach((x) => x.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        renderCh(parseInt((tab as HTMLElement).dataset.ch || "0", 10));
      });
    });
    renderCh(0);

    /* ---------- region pills on the anchor ---------- */
    const REGIONS = tt.cases.regions;
    const rgTitle = $("#rgTitle"), rgAnchor = $(".anchor");
    function renderRegion(i: number) {
      const rg = REGIONS[i];
      if (!rgTitle) return;
      rgTitle.textContent = rg.t;
      rg.s.forEach((pair, j) => {
        const b = $("#rgB" + j), p = $("#rgP" + j);
        if (b) b.textContent = pair[0];
        if (p) p.textContent = pair[1];
      });
      if (!reduce && rgAnchor) gsap.fromTo(rgAnchor, { opacity: 0.45, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
    $$(".anchor-tabs .cbtn").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".anchor-tabs .cbtn").forEach((x) => x.setAttribute("aria-pressed", "false"));
        tab.setAttribute("aria-pressed", "true");
        renderRegion(parseInt((tab as HTMLElement).dataset.rg || "0", 10));
      });
    });

    /* ---------- sport switcher ---------- */
    const SPORTS = tt.rail.sports.map((s, i) => ({ n: s.n, f: s.f, img: SPORT_IMGS[i] || "" }));
    SPORTS.forEach((s) => { if (s.img) { const im = new Image(); im.src = s.img; } });
    const spImg = $<HTMLImageElement>("#spImg"), spName = $("#spName"), spFeat = $("#spFeat"), spStage = $("#spStage"), spYours = $("#spYours");
    let spIdx = 0, spLock = false;
    function showSport(i: number) {
      spIdx = i;
      $$("#rail .ctab").forEach((x, j) => x.setAttribute("aria-selected", j === i ? "true" : "false"));
      if (!spImg || !spName || !spFeat || !spYours) return;
      const isYours = !SPORTS[i].img;
      spImg.hidden = isYours;
      spYours.hidden = !isYours;
      if (!isYours) {
        spImg.src = SPORTS[i].img;
        spImg.alt = "Sportech — " + SPORTS[i].n;
      }
      spName.textContent = SPORTS[i].n;
      spFeat.textContent = SPORTS[i].f;
      if (!reduce) gsap.fromTo(isYours ? spYours : spImg, { opacity: 0.3 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    }
    $$("#rail .ctab").forEach((tab) => {
      tab.addEventListener("click", () => { spLock = true; showSport(parseInt((tab as HTMLElement).dataset.sp || "0", 10)); });
    });
    if (!reduce) {
      const spTimer = setInterval(() => {
        if (spLock || !spStage) return;
        const r = spStage.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        showSport((spIdx + 1) % SPORTS.length);
      }, 3500);
      cleanups.push(() => clearInterval(spTimer));
    }

    /* ---------- money burst on module tags ---------- */
    const moneyBurst = (x: number, y: number) => {
      if (reduce) return;
      const accent = (getComputedStyle(root).getPropertyValue("--accent") || "#e8f840").trim();
      const colors = [accent, "#ffffff", "rgba(238,241,246,.85)", accent];
      const els: HTMLElement[] = [];
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 26; i++) {
        const c = document.createElement("i");
        c.className = "fx-conf";
        c.style.background = colors[i % colors.length];
        c.style.left = x + "px"; c.style.top = y + "px";
        c.style.width = 5 + Math.random() * 6 + "px";
        c.style.height = 8 + Math.random() * 9 + "px";
        frag.appendChild(c); els.push(c);
      }
      for (let i = 0; i < 12; i++) {
        const k = document.createElement("i");
        k.className = "fx-coin"; k.textContent = "$";
        k.style.left = x + "px"; k.style.top = y + "px";
        frag.appendChild(k); els.push(k);
      }
      document.body.appendChild(frag);
      els.forEach((el) => {
        const up = 90 + Math.random() * 170, dx = (Math.random() - 0.5) * 340,
          rot = (Math.random() - 0.5) * 720, d = 0.9 + Math.random() * 0.7;
        gsap.set(el, { xPercent: -50, yPercent: -50 });
        gsap.to(el, { x: dx, rotation: rot, duration: d, ease: "power1.out" });
        gsap.timeline({ onComplete: () => el.remove() })
          .to(el, { y: -up, duration: d * 0.38, ease: "power2.out" })
          .to(el, { y: 260 + Math.random() * 140, duration: d * 0.62, ease: "power1.in" })
          .to(el, { opacity: 0, duration: 0.25 }, "-=.22");
      });
    };
    $$(".wall .tag").forEach((tag) => {
      tag.addEventListener("click", (ev) => {
        const r = tag.getBoundingClientRect();
        const me = ev as MouseEvent;
        moneyBurst(me.clientX || r.left + r.width / 2, me.clientY || r.top + r.height / 2);
      });
    });

    /* ---------- signing board: replayable flap reveal + claim row ---------- */
    const psec = $(".psec");
    if (psec) {
      const pio = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) psec.classList.add("on"); else psec.classList.remove("on"); }),
        { threshold: 0.25 }
      );
      pio.observe(psec);
      cleanups.push(() => pio.disconnect());
    }
    const claim = $("#claimRow");
    claim?.addEventListener("click", (ev) => {
      const r = claim.getBoundingClientRect();
      const me = ev as MouseEvent;
      moneyBurst(me.clientX || r.left + r.width / 2, me.clientY || r.top + r.height / 2);
      const timer = setTimeout(() => openRef.current(), 650);
      cleanups.push(() => clearTimeout(timer));
    });

    /* ---------- FAQ accordion ---------- */
    $$(".fq").forEach((item) => {
      const btn = item.querySelector(".fq-q");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        $$(".fq.open").forEach((o) => {
          o.classList.remove("open");
          o.querySelector(".fq-q")?.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });

    /* ---------- global retheme ---------- */
    const names: Record<string, string> = {
      "#e8f840": "VOLT", "#2f6bff": "ROYAL", "#e23a3a": "CRIMSON", "#1fbf6b": "EMERALD", "#a855f7": "VIOLET",
    };
    const live = $("#livetag");
    function ink(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
      return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#0a0c04" : "#ffffff";
    }
    const retheme = (c: string) => {
      root.style.setProperty("--accent", c);
      root.style.setProperty("--accent-ink", ink(c));
      if (live) live.textContent = tt.rail.themePrefix + (names[c.toLowerCase()] || c.toUpperCase());
    };
    $$(".sw[data-c]").forEach((sw) => {
      sw.addEventListener("click", () => {
        $$(".sw[data-c]").forEach((x) => x.setAttribute("aria-pressed", "false"));
        sw.setAttribute("aria-pressed", "true");
        retheme((sw as HTMLElement).dataset.c || "#e8f840");
      });
    });
    const custom = $<HTMLInputElement>("#customc");
    custom?.addEventListener("input", () => {
      $$(".sw[data-c]").forEach((x) => x.setAttribute("aria-pressed", "false"));
      retheme(custom.value);
    });

    /* ---------- revenue simulator ---------- */
    const SPLIT = tt.sim.streams.map((k, i) => ({ k, v: SPLIT_W[i] }));
    const ARPU = 30; // annual, sums the split
    const LADDER = [100000, 150000, 200000, 250000, 300000, 400000, 500000, 650000, 800000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000, 5000000, 6500000, 8000000, 10000000, 15000000, 20000000, 25000000, 30000000, 40000000, 50000000, 65000000, 80000000, 100000000];
    const fanSlider = $<HTMLInputElement>("#fanslider"), fanRead = $("#fanRead");
    /* keep whatever the user had selected across language switches */
    let fans = LADDER[parseInt(fanSlider?.value || "9", 10)] || 1000000;
    const pressedRate = $<HTMLElement>('#scnset .cbtn[aria-pressed="true"]');
    let rate = parseFloat(pressedRate?.dataset.rate || "0.08"), shownTotal = 0;
    const elTotal = $("#simTotal"), elBadge = $("#simBadge"), streamsEl = $("#streams");
    const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
    if (streamsEl) {
      streamsEl.innerHTML = "";
      SPLIT.forEach((s) => {
        const row = document.createElement("div");
        row.className = "strm";
        row.innerHTML = "<small>" + s.k + '</small><div><div class="bar" style="transform:scaleX(' + s.v / 9 + ')"></div></div><span class="v"></span>';
        streamsEl.appendChild(row);
      });
    }
    function render(animate: boolean) {
      const active = fans * rate, total = active * ARPU;
      if (elBadge) elBadge.textContent = tt.sim.badge(fmt(active));
      streamsEl?.querySelectorAll(".strm").forEach((row, i) => {
        const v = row.querySelector(".v");
        if (v) v.textContent = "$" + fmt(active * SPLIT[i].v);
      });
      if (!elTotal) return;
      const totalStr = "$" + fmt(total);
      elTotal.style.fontSize = totalStr.length >= 12 ? "clamp(36px,4.4vw,68px)" : totalStr.length >= 11 ? "clamp(42px,5.2vw,84px)" : "clamp(48px,7vw,108px)";
      if (!animate || reduce) { elTotal.textContent = totalStr; shownTotal = total; return; }
      const o = { v: shownTotal };
      gsap.to(o, { v: total, duration: 0.9, ease: "power3.out", onUpdate: () => { elTotal.textContent = "$" + fmt(o.v); }, onComplete: () => { shownTotal = total; } });
    }
    const fmtFans = (n: number) => {
      if (n >= 1000000) { const m = n / 1000000; return (m % 1 ? m.toFixed(1) : m) + "M"; }
      return n / 1000 + "K";
    };
    if (fanRead) fanRead.textContent = fmtFans(fans);
    fanSlider?.addEventListener("input", () => {
      fans = LADDER[parseInt(fanSlider.value, 10)];
      if (fanRead) fanRead.textContent = fmtFans(fans);
      render(true);
    });
    $$("#scnset .cbtn").forEach((b) => {
      b.addEventListener("click", () => {
        $$("#scnset .cbtn").forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        rate = parseFloat((b as HTMLElement).dataset.rate || "0.08");
        render(true);
      });
    });
    render(false);

    /* ---------- hero live revenue feed ---------- */
    const FEED = tt.feed;
    const feedRows = $("#feedRows"), feedTotal = $("#feedTotal");
    let runTotal = 12418, lastFeedIdx = -1, feedAlive = true;
    function feedEvent() {
      let idx = Math.floor(Math.random() * FEED.length);
      if (idx === lastFeedIdx) idx = (idx + 1 + Math.floor(Math.random() * (FEED.length - 1))) % FEED.length;
      lastFeedIdx = idx;
      const e = FEED[idx];
      return { cat: e[0], lab: e[1], amt: e[2] + Math.round(Math.random() * (e[3] - e[2])) };
    }
    function pushFeedRow(ev: { cat: string; lab: string; amt: number }, animate: boolean) {
      if (!feedRows) return;
      const row = document.createElement("div");
      row.className = "frow";
      row.innerHTML = "<div><strong>" + ev.cat + "</strong><small>" + ev.lab + '</small></div><span class="amt">+$' + ev.amt + "</span>";
      feedRows.insertBefore(row, feedRows.firstChild);
      while (feedRows.children.length > 5) feedRows.removeChild(feedRows.lastChild as Node);
      if (animate && !reduce) gsap.from(row, { y: -16, opacity: 0, duration: 0.45, ease: "power2.out" });
    }
    if (feedRows) feedRows.innerHTML = "";
    for (let fi = 0; fi < 5; fi++) pushFeedRow(feedEvent(), false);
    if (feedTotal) feedTotal.textContent = "$" + fmt(runTotal);
    if (!reduce) {
      const feedLoop = () => {
        const timer = setTimeout(() => {
          if (!feedAlive || !feedRows || !feedTotal) return;
          const r = feedRows.getBoundingClientRect();
          if (!document.hidden && r.bottom > 0 && r.top < innerHeight) {
            const ev = feedEvent();
            pushFeedRow(ev, true);
            const old = runTotal;
            runTotal += ev.amt;
            const o = { v: old };
            gsap.to(o, { v: runTotal, duration: 0.5, ease: "power2.out", onUpdate: () => { feedTotal.textContent = "$" + fmt(o.v); } });
          }
          feedLoop();
        }, 900 + Math.random() * 1400);
        cleanups.push(() => clearTimeout(timer));
      };
      feedLoop();
      cleanups.push(() => { feedAlive = false; });
    }

    /* ---------- camera feed switcher ---------- */
    const CAMM: Record<string, { type: string; src: string; alt: string }> = {
      pov: { type: "video", src: "/cinematic/player-pov.mp4", alt: "" },
      c1: { type: "img", src: "/camimages/cam01.jpeg", alt: tt.camera.altHw + "1" },
      c2: { type: "img", src: "/camimages/cam02.jpeg", alt: tt.camera.altHw + "2" },
      c3: { type: "img", src: "/camimages/cam03.jpeg", alt: tt.camera.altHw + "3" },
    };
    const camView = $("#camView");
    $$(".cam-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".cam-tab").forEach((x) => x.setAttribute("aria-pressed", "false"));
        tab.setAttribute("aria-pressed", "true");
        const m = CAMM[(tab as HTMLElement).dataset.cam || "pov"];
        if (!camView) return;
        if (m.type === "video") {
          camView.innerHTML = '<video autoplay muted loop playsinline><source src="' + m.src + '" type="video/mp4"></video><span class="cam-live"><i></i>' + tt.camera.live + "</span>";
        } else {
          camView.innerHTML = '<img src="' + m.src + '" alt="' + m.alt + '" loading="lazy">';
        }
        if (!reduce) gsap.fromTo(camView, { opacity: 0.4 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      });
    });

    /* ---------- motion layer ---------- */
    if (reduce) return () => cleanups.forEach((fn) => fn());
    root.classList.add("js-anim");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -36px 0px" }
    );
    $$(".rv").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = (i % 6) * 0.05 + "s";
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    const fmtC = (n: number, d: number) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
    $$("[data-count]").forEach((el) => {
      const he = el as HTMLElement;
      const end = parseFloat(he.dataset.count || "0"), pre = he.dataset.prefix || "", suf = he.dataset.suffix || "";
      const dec = (String(he.dataset.count).split(".")[1] || "").length;
      const o = { v: 0 };
      triggers.push(
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => { he.textContent = pre + fmtC(o.v, dec) + suf; } }),
        })
      );
    });

    const heroMedia = $(".hero-media");
    if (heroMedia) {
      const tw = gsap.to(heroMedia, { scale: 1.08, ease: "none", scrollTrigger: { trigger: $(".hero"), start: "top top", end: "bottom top", scrub: true } });
      if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
    }

    if (matchMedia("(pointer:fine)").matches) {
      $$(".tag").forEach((card) => {
        card.addEventListener("pointermove", (ev) => {
          const pe = ev as PointerEvent;
          const r = card.getBoundingClientRect(), x = (pe.clientX - r.left) / r.width, y = (pe.clientY - r.top) / r.height;
          gsap.to(card, { rotateY: (x - 0.5) * 4, rotateX: (0.5 - y) * 4, transformPerspective: 700, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("pointerleave", () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" }));
      });
    }

    cleanups.push(() => triggers.forEach((trig) => trig.kill()));
    return () => cleanups.forEach((fn) => fn());
  }, [lang]);

  const tickerFacts = (
    <>
      {t.ticker.map((f, i) => (
        <span key={i}>{f[0]}<b>{f[1]}</b>{f[2]}</span>
      ))}
      {corporate && <span>{t.tickerJsc[0]}<b>{t.tickerJsc[1]}</b>{t.tickerJsc[2]}</span>}
    </>
  );

  const saudiSection = (
    <section className="saudi" id="saudi">
      <div className="wrap">
        <div className="kicker rv">{t.saudi.kicker}</div>
        <h2 className="h2 dh rv">{t.saudi.h2a}<span className="volt">{t.saudi.h2v}</span></h2>
        <p className="lede rv">{t.saudi.lede}</p>
        <div className="st-strip rv">
          <div className="st-cell">
            <span className="st-tile st-blur">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="st-logo" src="/brand/sauditech.png" alt={t.saudi.logoAlt} />
            </span>
            <span className="t"><b>{t.saudi.cells[0].b}</b><small>{t.saudi.cells[0].s}</small></span>
          </div>
          <div className="st-cell"><span className="t"><b>{t.saudi.cells[1].b}</b><small>{t.saudi.cells[1].s}</small></span></div>
          <div className="st-cell"><span className="t"><b>{t.saudi.cells[2].b}</b><small>{t.saudi.cells[2].s}</small></span></div>
        </div>
      </div>
    </section>
  );

  return (
    <main id="v2" ref={rootRef}>
      <div className="grain" aria-hidden="true" />

      <div className="ticker" aria-hidden="true">
        <span className="ticker-tag"><i />SPORTECH</span>
        <div className="ticker-track">
          {tickerFacts}
          {tickerFacts}
        </div>
      </div>

      <nav className="nav">
        <div className="wrap">
          <div className="nav-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="wordmark" src="/brand/wordmark-white.png" alt="Sportech" />
            <div className="nav-links">
              {corporate && <a href="#company">{t.nav.company}</a>}
              <a href="#partners">{t.nav.partners}</a><a href="#cases">{t.nav.proof}</a><a href="#os">{t.nav.platform}</a><a href={corporate ? "#rail" : "#brand"}>{t.nav.yourBrand}</a><a href="#sim">{t.nav.simulator}</a>
            </div>
            <button
              className="lang-btn"
              style={{ marginInlineStart: "auto" }}
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
            >
              {t.nav.langToggle}
            </button>
            <button className="btn btn-primary" onClick={openContactModal}>{t.nav.bookDemo}</button>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-media" aria-hidden="true">
          <video autoPlay muted loop playsInline poster="/cinematic/hero-bg-fallback.jpg">
            <source src="/cinematic/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="wrap">
          <div>
            <h1 className="dh">
              <span className="rv">{t.hero.h1a}</span>
              <span className="ghost rv">{t.hero.h1b}</span>
              <span className="volt rv">{corporate ? t.hero.h1c : t.hero.h1cAlt}</span>
            </h1>
            <p className="hero-sub rv">{corporate ? t.hero.sub : t.hero.subAlt}</p>
            <div className="hero-cta rv">
              <button className="btn btn-primary" onClick={openContactModal}>{t.nav.bookDemo}</button>
              <a className="btn btn-ghost" href="#sim">{t.hero.runNumbers}</a>
            </div>
            <div className="hero-model rv">
              {t.hero.model.map((m) => <span key={m}><i />{m}</span>)}
            </div>
          </div>
          <div className="feed-card rv">
            <div className="feed-head"><i />{t.hero.feedHead}</div>
            <div className="feed-rows" id="feedRows" />
            <div className="feed-total"><span>{t.hero.feedTotalLabel}</span><b id="feedTotal">$12,418</b></div>
            <div className="feed-note">{t.hero.feedNote}</div>
          </div>
        </div>
      </header>

      {corporate && (
        <section className="sec" id="company">
          <div className="wrap">
            <div className="kicker rv">{t.company.kicker}</div>
            <h2 className="h2 dh rv">{t.company.h2a}<span className="volt">{t.company.h2v}</span></h2>
            <p className="lede rv">{t.company.lede}</p>
            <div className="cfacts">
              {t.company.facts.map((f) => (
                <div className="fact rv" key={f.b}><div className="big dh">{f.big}</div><b>{f.b}</b><p>{f.p}</p></div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!corporate && (
        <div className="proof">
          <div className="wrap">
            {t.proofStrip.map((p) => (
              <div className="proof-item rv" key={p.b}><b>{p.b}</b><span>{p.s}</span></div>
            ))}
          </div>
        </div>
      )}

      <section className="sec psec" id="partners">
        <div className="wrap">
          <div className="kicker rv">{t.partners.kicker}</div>
          <h2 className="h2 dh rv">{t.partners.h2a}<span className="ghost">{t.partners.h2g}</span> <span className="volt">{t.partners.h2v}</span></h2>
          <div className="sboard rv">
            <div className="sboard-hd">
              <span className="l"><i />{t.partners.boardLive}</span>
              <span className="r"><span data-count="3">3</span>{t.partners.signedSuffix}</span>
            </div>
            {t.partners.rows.map((row, i) => {
              const widths = ["min(150px, 34vw)", "min(118px, 28vw)", "min(96px, 24vw)", "", "min(128px, 30vw)", "min(190px, 42vw)", "min(140px, 32vw)"];
              return (
                <div className={i >= 3 ? "flap nda" : "flap"} key={row.cat}>
                  <span className="no">{String(i + 1).padStart(2, "0")}</span>
                  <span><span className="blk" style={widths[i] ? { width: widths[i] } : undefined} /><small>{row.cat}</small></span>
                  <span className="st">{row.st}</span>
                </div>
              );
            })}
            <button type="button" className="flap claim" id="claimRow">
              <span className="q">?</span>
              <span><b>{t.partners.claimB}</b><small>{t.partners.claimS}</small></span>
              <span className="st">{t.partners.claimSt}</span>
            </button>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="kicker rv">{t.gap.kicker}</div>
          <h2 className="h2 dh rv">{t.gap.h2a}<span className="volt">{t.gap.h2v}</span></h2>
          <div className="gapstats">
            <div className="gs rv"><span className="n dh"><em data-count="19.8" data-prefix="$" data-suffix={t.gap.s1suffix}>$19.8{t.gap.s1suffix}</em></span><p>{t.gap.s1p}</p></div>
            <div className="gs rv"><span className="n dh" data-count="5" data-suffix={t.gap.s2suffix}>5{t.gap.s2suffix}</span><p>{t.gap.s2p}</p></div>
            <div className="gs rv"><span className="n dh ghost">{t.gap.s3big}</span><p>{t.gap.s3p}</p></div>
          </div>
          <p className="src rv">{t.gap.src}</p>
        </div>
      </section>

      <section className="sec chan-scene" id="cases">
        <div className="wrap">
          <h2 className="h2 dh rv">{t.cases.h2a}<span className="ghost">{t.cases.h2g}</span> <span className="volt">{t.cases.h2v}</span></h2>
          <p className="lede rv">{t.cases.lede}</p>
          <div className="chan-tabs rv" role="tablist" aria-label="Fan behavior">
            {t.cases.tabs.map((tab, i) => (
              <button className="ctab" role="tab" aria-selected={i === 0} data-ch={i} key={tab}>{tab}</button>
            ))}
          </div>
          <div className="chan-panel rv" id="chanpanel">
            <div className="chan-stat">
              <div className="big dh" id="chBig">{t.cases.channels[0].big}</div>
              <p className="cap" id="chCap">{t.cases.channels[0].cap}</p>
              <p className="srcline" id="chSrc">{t.cases.channels[0].src}</p>
            </div>
            <div>
              <div className="chan-proof" id="chProof" />
              <div className="chan-model"><b>{t.cases.onSportech}</b><span id="chModel" /></div>
            </div>
          </div>
          <div className="anchor rv">
            <div className="anchor-tabs" role="tablist" aria-label="Market">
              {t.cases.regionTabs.map((tab, i) => (
                <button className="cbtn" role="tab" aria-pressed={i === 0} data-rg={i} key={tab}>{tab}</button>
              ))}
            </div>
            <span className="ttl dh" id="rgTitle">{t.cases.regions[0].t}</span>
            {t.cases.regions[0].s.map((pair, j) => (
              <div className="as" key={j}><b id={"rgB" + j}>{pair[0]}</b><p id={"rgP" + j}>{pair[1]}</p></div>
            ))}
          </div>
          <p className="fine rv">{t.cases.fine}</p>
        </div>
      </section>

      {corporate && (
        <section className="sec" id="rail">
          <div className="wrap">
            <h2 className="h2 dh rv">{t.rail.h2a}<span className="ghost">{t.rail.h2g}</span> <span className="volt">{t.rail.h2v}</span></h2>
            <p className="lede rv">{t.rail.lede}</p>
            <div className="cfg rv">
              <div>
                <div className="ctl-lab">{t.rail.sportLabel}</div>
                <div className="sport-tabs" role="tablist" aria-label="Sport">
                  {t.rail.sports.map((s, i) => (
                    <button className={i === 8 ? "ctab ctab-yours" : "ctab"} role="tab" aria-selected={i === 0} data-sp={i} key={s.n}>{s.n}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="ctl-lab">{t.rail.colorLabel}</div>
                <div className="swatches" role="group" aria-label="Club color">
                  <button className="sw" style={{ background: "#e8f840" }} data-c="#e8f840" aria-pressed="true" aria-label="Volt yellow" />
                  <button className="sw" style={{ background: "#2f6bff" }} data-c="#2f6bff" aria-pressed="false" aria-label="Royal blue" />
                  <button className="sw" style={{ background: "#e23a3a" }} data-c="#e23a3a" aria-pressed="false" aria-label="Crimson" />
                  <button className="sw" style={{ background: "#1fbf6b" }} data-c="#1fbf6b" aria-pressed="false" aria-label="Emerald" />
                  <button className="sw" style={{ background: "#a855f7" }} data-c="#a855f7" aria-pressed="false" aria-label="Violet" />
                  <label className="sw sw-custom" aria-label="Custom color"><input type="color" id="customc" defaultValue="#e8f840" /></label>
                </div>
                <p className="studio-live" id="livetag">{t.rail.themePrefix}VOLT</p>
              </div>
            </div>
            <div className="sport-stage rv" id="spStage">
              <div className="sport-view">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id="spImg" src="/sportscreens/soccer.webp" alt={"Sportech — " + t.rail.sports[0].n} />
                <div className="sport-yours" id="spYours" hidden>
                  <div>
                    <p className="dh sy-big">{t.rail.yoursBig}<span className="volt">{t.rail.yoursVolt}</span></p>
                    <p className="sy-sub">{t.rail.yoursSub}</p>
                  </div>
                </div>
                <div className="tint" aria-hidden="true" />
              </div>
              <div className="sport-cap"><b id="spName">{t.rail.sports[0].n}</b><span id="spFeat">{t.rail.sports[0].f}</span></div>
            </div>
            <p className="fine rv">{t.rail.fine}</p>
          </div>
        </section>
      )}

      {!corporate && (
      <section className="sec" id="rail">
        <div className="wrap">
          <h2 className="h2 dh rv">{t.rail.h2a}<span className="ghost">{t.rail.h2gAlt}</span> <span className="volt">{t.rail.h2vAlt}</span></h2>
          <p className="lede rv">{t.rail.ledeAlt}</p>
          <div className="sport-tabs rv" role="tablist" aria-label="Sport">
            {t.rail.sports.map((s, i) => (
              <button className={i === 8 ? "ctab ctab-yours" : "ctab"} role="tab" aria-selected={i === 0} data-sp={i} key={s.n}>{s.n}</button>
            ))}
          </div>
          <div className="sport-stage rv" id="spStage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="spImg" src="/sportscreens/soccer.webp" alt={"Sportech — " + t.rail.sports[0].n} />
            <div className="sport-yours" id="spYours" hidden>
              <div>
                <p className="dh sy-big">{t.rail.yoursBig}<span className="volt">{t.rail.yoursVolt}</span></p>
                <p className="sy-sub">{t.rail.yoursSub}</p>
              </div>
            </div>
            <div className="sport-cap"><b id="spName">{t.rail.sports[0].n}</b><span id="spFeat">{t.rail.sports[0].f}</span></div>
          </div>
        </div>
      </section>
      )}

      <section className="sec wall-scene" id="os">
        <div className="wrap">
          <div className="kicker rv">{t.os.kicker}</div>
          <h2 className="h2 dh rv">{t.os.h2a}<span className="volt">{t.os.h2v}</span></h2>
          <div className="wall">
            {t.os.tags.map((tag) => (
              <span className="tag rv" key={tag.t}>{tag.t}{tag.s && <small>{tag.s}</small>}</span>
            ))}
          </div>
          <p className="wall-note rv">{t.os.note}</p>
          {corporate && (
            <div className="infra rv">
              {t.os.infra.map((inf) => (
                <div className="inf" key={inf.b}><b>{inf.b}</b><p>{inf.p}</p></div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap cam-grid">
          <div>
            <div className="kicker rv">{t.camera.kicker}</div>
            <h2 className="h2 dh rv">{t.camera.h2a}<span className="volt">{t.camera.h2v}</span></h2>
            <p className="lede rv">{t.camera.lede}</p>
            <div className="cam-specs">
              {t.camera.specs.map((sp) => (
                <div className="spec rv" key={sp.v}><div className="v dh">{sp.v}</div><small>{sp.s}</small></div>
              ))}
            </div>
          </div>
          <div className="cam-stage rv">
            <div className="cam-view" id="camView">
              <video autoPlay muted loop playsInline>
                <source src="/cinematic/player-pov.mp4" type="video/mp4" />
              </video>
              <span className="cam-live" id="camLive"><i />{t.camera.live}</span>
            </div>
            <div className="cam-tabs" role="group" aria-label="Camera feed">
              {t.camera.tabs.map((tab, i) => (
                <button className="cam-tab" data-cam={i === 0 ? "pov" : "c" + i} aria-pressed={i === 0} key={tab}>{tab}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {corporate && saudiSection}

      {!corporate && (
      <section className="sec chan-scene" id="brand" style={{ borderTop: 0 }}>
        <div className="wrap">
          <h2 className="h2 dh rv">{t.brand.h2a}<span className="volt">{t.brand.h2v}</span></h2>
          <p className="lede rv">{t.brand.lede}</p>
          <div className="studio-grid">
            <div>
              <div className="ctl-lab rv">{t.rail.colorLabel}</div>
              <div className="swatches rv" role="group" aria-label="Club color">
                <button className="sw" style={{ background: "#e8f840" }} data-c="#e8f840" aria-pressed="true" aria-label="Volt yellow" />
                <button className="sw" style={{ background: "#2f6bff" }} data-c="#2f6bff" aria-pressed="false" aria-label="Royal blue" />
                <button className="sw" style={{ background: "#e23a3a" }} data-c="#e23a3a" aria-pressed="false" aria-label="Crimson" />
                <button className="sw" style={{ background: "#1fbf6b" }} data-c="#1fbf6b" aria-pressed="false" aria-label="Emerald" />
                <button className="sw" style={{ background: "#a855f7" }} data-c="#a855f7" aria-pressed="false" aria-label="Violet" />
                <label className="sw sw-custom" aria-label="Custom color"><input type="color" id="customc" defaultValue="#e8f840" /></label>
              </div>
              <p className="studio-note rv">{t.rail.fine}</p>
              <p className="studio-live rv" id="livetag">{t.rail.themePrefix}VOLT</p>
            </div>
            <div className="brand-panel rv" id="brandpanel">
              <div className="bar"><span className="crest" /><span className="nm">{t.brand.panelName}<small>{t.brand.panelSub}</small></span></div>
              <div className="scr">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sportscreens/soccer.webp" alt="Sportech app screens in club branding" loading="lazy" />
              </div>
              <div className="row"><span className="pill">{t.brand.pill1}</span><span className="pill q">{t.brand.pill2}</span></div>
            </div>
          </div>
        </div>
      </section>
      )}

      {corporate && (
        <section className="sec" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="kicker rv">{t.model.kicker}</div>
            <h2 className="h2 dh rv">{t.model.h2a}<span className="volt">{t.model.h2v}</span></h2>
            <div className="model-grid">
              {t.model.facts.map((f) => (
                <div className="fact rv" key={f.b}><div className="big dh">{f.big}</div><b>{f.b}</b><p>{f.p}</p></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec sim-scene" id="sim">
        <div className="wrap">
          <h2 className="h2 dh rv">{t.sim.h2a}<span className="volt">{t.sim.h2v}</span></h2>
          <p className="lede rv">{t.sim.lede}</p>
          <div className="console rv">
            <div>
              <div className="ctl-block">
                <div className="ctl-lab">{t.sim.fanbaseLabel}</div>
                <div className="fan-read"><b id="fanRead">1M</b><span>{t.sim.fansWord}</span></div>
                <input className="slider" type="range" id="fanslider" min="0" max="27" step="1" defaultValue="9" aria-label={t.sim.fanbaseLabel} />
                <div className="fan-scale" aria-hidden="true"><span>100K</span><span>1M</span><span>10M</span><span>100M</span></div>
              </div>
              <div className="ctl-block">
                <div className="ctl-lab">{t.sim.scenarioLabel}</div>
                <div className="chipset" id="scnset">
                  <button className="cbtn" data-rate="0.08" aria-pressed="true">{t.sim.scenarios[0]}</button>
                  <button className="cbtn" data-rate="0.15" aria-pressed="false">{t.sim.scenarios[1]}</button>
                  <button className="cbtn" data-rate="0.25" aria-pressed="false">{t.sim.scenarios[2]}</button>
                </div>
              </div>
              <div className="streams" id="streams" />
            </div>
            <div className="sim-total">
              <div className="lab">{t.sim.totalLabel}</div>
              <div className="big" id="simTotal">$2,400,000</div>
              <div className="per">{t.sim.perLine}</div>
              <div className="sim-badge" id="simBadge">{t.sim.badge("80,000")}</div>
            </div>
            <p className="sim-note">{t.sim.note}</p>
          </div>
        </div>
      </section>

      {!corporate && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="kicker rv">{t.model.kickerAlt}</div>
            <h2 className="h2 dh rv">{t.model.h2a}<span className="volt">{t.model.h2v}</span></h2>
            <div className="model-grid">
              {t.model.facts.map((f) => (
                <div className="fact rv" key={f.b}><div className="big dh">{f.big}</div><b>{f.b}</b><p>{f.p}</p></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="kicker rv">{t.faq.kicker}</div>
          <h2 className="h2 dh rv">{t.faq.h2a}<span className="volt">{t.faq.h2v}</span></h2>
          <div className="faq">
            {t.faq.items.map((item) => (
              <div className="fq rv" key={item.q}>
                <button className="fq-q" aria-expanded="false">
                  {item.q}
                  <span className="fq-t"><PlusIcon /></span>
                </button>
                <div className="fq-a"><div><p>{item.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {corporate && (
        <section className="sec" id="news" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="kicker rv">{t.news.kicker}</div>
            <h2 className="h2 dh rv">{t.news.h2a}<span className="volt">{t.news.h2v}</span></h2>
            <div className="anns rv">
              {t.news.items.map((n) => (
                <div className="ann" key={n.t}><span className="ad">{n.d}</span><span className="at">{n.t}</span><span className="ac">{n.c}</span></div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!corporate && saudiSection}

      <section className="cta-scene" id="cta">
        <div className="bgimg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cinematic/crowd-silhouette.jpg" alt="" loading="lazy" />
        </div>
        <div className="wrap cta-inner">
          <h2 className="dh rv">{t.cta.h2a}<span className="volt">{t.cta.h2v}</span></h2>
          <button className="btn btn-primary rv" style={{ padding: "18px 38px", fontSize: 16 }} onClick={openContactModal}>{t.nav.bookDemo}</button>
          <p className="rv">{corporate ? t.cta.sub : t.cta.subAlt}</p>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="ft-grid">
            <div className="ft-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/wordmark-white.png" alt="Sportech" style={{ height: 16, width: "auto" }} />
              <p>{t.footer.brandP}</p>
              {corporate && (
                <p style={{ marginTop: 10 }}>{t.footer.legalLine}</p>
              )}
            </div>
            <div className="ft-col">
              <div className="ft-h">{t.footer.platformH}</div>
              <ul>
                <li><a href="#cases">{t.footer.links[0]}</a></li>
                <li><a href="#os">{t.footer.links[1]}</a></li>
                <li><a href="#sim">{t.footer.links[2]}</a></li>
                <li><a href="#faq">{t.footer.links[3]}</a></li>
              </ul>
            </div>
            <div className="ft-col">
              <div className="ft-h">{t.footer.contactH}</div>
              <ul>
                <li><a href="mailto:contact@sportech.com.sa">contact@sportech.com.sa</a></li>
                <li><a href="tel:+966114222225">+966 11 422 2225</a></li>
                <li><span>{t.footer.riyadh}</span></li>
              </ul>
            </div>
            <div className="ft-col">
              <div className="ft-h">{t.footer.followH}</div>
              <div className="ft-social">
                <a className="sbtn" href="https://x.com/SportechHQ" target="_blank" rel="noopener noreferrer" aria-label="Sportech on X">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 1.2h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.2h7.59l5.24 6.93L18.9 1.2Zm-1.29 19.44h2.04L6.49 3.29H4.3l13.31 17.35Z" /></svg>
                </a>
                <a className="sbtn" href="https://linkedin.com/company/sportechsa/" target="_blank" rel="noopener noreferrer" aria-label="Sportech on LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="ft-bar">
            <span>{t.footer.copyright}</span>
            <div className="ft-legal">
              <a href="/privacy">{t.footer.privacy}</a>
              <a href="/refund-policy">{t.footer.refund}</a>
              <a href="/terms">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
