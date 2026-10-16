"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactModal } from "@/lib/contact-modal-context";

const TICKER_FACTS = (
  <>
    <span>TIER 1 CLUB <b>SIGNED</b> — ACTIVATION Q4 2026</span>
    <span>PATENT GRANTED IN KSA — <b>PCT FILINGS UNDERWAY</b></span>
    <span>12 REVENUE ENGINES — <b>ONE PLATFORM</b></span>
    <span>$0 UPFRONT — <b>WE EARN WHEN YOU EARN</b></span>
    <span>PLAYER POV LATENCY <b>UNDER 3 SECONDS</b></span>
    <span>SAUDI TECH — <b>BUILT IN RIYADH</b></span>
    <span>FAN ENGAGEMENT MARKET <b>$19.8B BY 2033</b></span>
    <span>FOOTBALL FANS WORLDWIDE <b>5 BILLION+</b></span>
    <span>LIVE AND <b>PRODUCTION-READY</b></span>
  </>
);

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#eef1f6" strokeWidth="2">
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

const FAQ_ITEMS = [
  {
    q: "What does the platform cost the club?",
    a: "Nothing. We design, build, operate and fund the entire platform. Your club earns an agreed share of every transaction from day one of launch.",
  },
  {
    q: "How fast can we launch?",
    a: "A white-label app in your club's identity is typically live within weeks. Core revenue streams activate at launch, and the full set of twelve modules lands across your first year.",
  },
  {
    q: "Are match predictions a form of betting?",
    a: "No. Predictions are skill-based entertainment using platform points. No real money is staked, and the fan wallet is closed-loop, working like a loyalty program.",
  },
  {
    q: "Who operates payments, ticketing and support?",
    a: "Sportech runs the full stack end to end through a modular API architecture, integrated with regional payment and ticketing providers.",
  },
  {
    q: "Where is fan data stored?",
    a: "In-region, per market, and governed by the partnership agreement, with tiered identity verification built in.",
  },
  {
    q: "How is the revenue share structured?",
    a: "Per partnership. Full commercial terms are set out in the agreement.",
  },
];

export function V2Landing({ corporate = false }: { corporate?: boolean }) {
  const { open: openContactModal } = useContactModal();
  const rootRef = useRef<HTMLElement>(null);
  const openRef = useRef(openContactModal);
  openRef.current = openContactModal;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: Array<() => void> = [];
    const triggers: ScrollTrigger[] = [];
    const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    /* ---------- use-case channels ---------- */
    const CH = [
      {
        big: "$10M", cap: "gifted every day on TikTok Live.", src: "Ipsos x TikTok, 2025",
        proof: [["68%", "of TikTok users have tried live gifting"], ["1M+", "concurrent viewers on one football-fandom stream"], ["60K+", "US creators earn real income from gifts"]],
        model: "Fans gift during warm-ups, goals and trophy moments, inside the club app. The club keeps the majority share.",
      },
      {
        big: "727,700", cap: "paid subscriptions to one creator, in one month.", src: "Twitch / Resourcera, 2025",
        proof: [["$1.9B", "Twitch revenue in 2025, mostly subscriptions"], ["$593M", "Weverse direct fan-to-artist revenue, 2024"], ["2x+", "owned platforms out-earn social channels"]],
        model: "Club membership tiers with real perks. Recurring revenue that compounds season after season.",
      },
      {
        big: "$400M+", cap: "paid by fans for a say in club decisions.", src: "ScienceDirect, 2025",
        proof: [["$350M+", "spent by fans on fan tokens alone"], ["3.4M", "votes for a single NBA All-Star in one season"], ["71.8M", "career All-Star votes cast for LeBron James"]],
        model: "Fan votes on man of the match, kits and club moments. No crypto, no cash-out, pure belonging.",
      },
      {
        big: "68%", cap: "of live viewers join points-staked predictions.", src: "BetterStreams, 2023",
        proof: [["2x", "chat activity while a prediction window is open"], ["11.2M", "Fantasy Premier League managers, every match week"], ["245M", "fantasy sports users in a $31B market"]],
        model: "Match predictions staked with closed-loop club points. A loyalty mechanic; points never convert to cash.",
      },
    ];
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
    $$("#cases .ctab").forEach((t) => {
      t.addEventListener("click", () => {
        $$("#cases .ctab").forEach((x) => x.setAttribute("aria-selected", "false"));
        t.setAttribute("aria-selected", "true");
        renderCh(parseInt((t as HTMLElement).dataset.ch || "0", 10));
      });
    });
    renderCh(0);

    /* ---------- sport switcher ---------- */
    const SPORTS = [
      { n: "Football", f: "Live + Gifting", img: "/sportscreens/soccer.webp" },
      { n: "Basketball", f: "Predictions", img: "/sportscreens/basketball.webp" },
      { n: "Motorsport", f: "Player Cam POV", img: "/sportscreens/formula1.webp" },
      { n: "Esports", f: "Voice Rooms", img: "/sportscreens/esports.webp" },
      { n: "Cricket", f: "Memberships", img: "/sportscreens/cricket.webp" },
      { n: "Combat", f: "Smart Ticketing", img: "/sportscreens/martialarts.webp" },
      { n: "Tennis", f: "Loyalty & Rewards", img: "/sportscreens/tennis.webp" },
      { n: "NFL", f: "Club Store", img: "/sportscreens/nfl.webp" },
      { n: "Your Sport", f: "Any fanbase on earth", img: "" },
    ];
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
        spImg.alt = "Sportech " + SPORTS[i].n + " app screens";
      }
      spName.textContent = SPORTS[i].n;
      spFeat.textContent = SPORTS[i].f;
      if (!reduce) gsap.fromTo(isYours ? spYours : spImg, { opacity: 0.3 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    }
    $$("#rail .ctab").forEach((t) => {
      t.addEventListener("click", () => { spLock = true; showSport(parseInt((t as HTMLElement).dataset.sp || "0", 10)); });
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
      const t = setTimeout(() => openRef.current(), 650);
      cleanups.push(() => clearTimeout(t));
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
      if (live) live.textContent = "THEME: " + (names[c.toLowerCase()] || c.toUpperCase());
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
    const SPLIT = [
      { k: "Subscriptions", v: 9.0 }, { k: "Tickets", v: 6.6 }, { k: "Live Gifting", v: 6.0 },
      { k: "Merchandise", v: 3.6 }, { k: "Predictions", v: 1.8 }, { k: "Gift Cards", v: 1.5 },
      { k: "Voting", v: 0.9 }, { k: "Collectibles", v: 0.6 },
    ];
    const ARPU = 30; // annual, sums the split
    let fans = 1000000, rate = 0.08, shownTotal = 2400000;
    const elTotal = $("#simTotal"), elBadge = $("#simBadge"), streamsEl = $("#streams");
    const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
    if (streamsEl && streamsEl.children.length === 0) {
      SPLIT.forEach((s) => {
        const row = document.createElement("div");
        row.className = "strm";
        row.innerHTML = "<small>" + s.k + '</small><div><div class="bar" style="transform:scaleX(' + s.v / 9 + ')"></div></div><span class="v"></span>';
        streamsEl.appendChild(row);
      });
    }
    function render(animate: boolean) {
      const active = fans * rate, total = active * ARPU;
      if (elBadge) elBadge.textContent = fmt(active) + " active fans at $2.50 per month";
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
    const LADDER = [100000, 150000, 200000, 250000, 300000, 400000, 500000, 650000, 800000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000, 5000000, 6500000, 8000000, 10000000, 15000000, 20000000, 25000000, 30000000, 40000000, 50000000, 65000000, 80000000, 100000000];
    const fanSlider = $<HTMLInputElement>("#fanslider"), fanRead = $("#fanRead");
    const fmtFans = (n: number) => {
      if (n >= 1000000) { const m = n / 1000000; return (m % 1 ? m.toFixed(1) : m) + "M"; }
      return n / 1000 + "K";
    };
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
    const FEED: Array<[string, string, number, number]> = [
      ["Live Gifting", "Gift: goal celebration", 5, 250],
      ["Live Gifting", "Gift: warm-up stream", 5, 90],
      ["Memberships", "Gold tier renewal", 10, 30],
      ["Memberships", "New silver member", 5, 15],
      ["Predictions", "Match prediction entry", 2, 10],
      ["Player Cam", "POV match pass", 8, 15],
      ["Smart Ticketing", "Resale, Sec 104", 40, 420],
      ["Club Store", "Third kit drop", 60, 180],
      ["Voting", "Kit vote unlock", 2, 6],
    ];
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
        const t = setTimeout(() => {
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
        cleanups.push(() => clearTimeout(t));
      };
      feedLoop();
      cleanups.push(() => { feedAlive = false; });
    }

    /* ---------- camera feed switcher ---------- */
    const CAMM: Record<string, { type: string; src: string; alt: string }> = {
      pov: { type: "video", src: "/cinematic/player-pov.mp4", alt: "" },
      c1: { type: "img", src: "/camimages/cam01.jpeg", alt: "Sportech Player Camera hardware, view 1" },
      c2: { type: "img", src: "/camimages/cam02.jpeg", alt: "Sportech Player Camera hardware, view 2" },
      c3: { type: "img", src: "/camimages/cam03.jpeg", alt: "Sportech Player Camera hardware, view 3" },
    };
    const camView = $("#camView");
    $$(".cam-tab").forEach((t) => {
      t.addEventListener("click", () => {
        $$(".cam-tab").forEach((x) => x.setAttribute("aria-pressed", "false"));
        t.setAttribute("aria-pressed", "true");
        const m = CAMM[(t as HTMLElement).dataset.cam || "pov"];
        if (!camView) return;
        if (m.type === "video") {
          camView.innerHTML = '<video autoplay muted loop playsinline><source src="' + m.src + '" type="video/mp4"></video><span class="cam-live"><i></i>LIVE — SUB-3S</span>';
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

    cleanups.push(() => triggers.forEach((t) => t.kill()));
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const saudiSection = (
    <section className="saudi" id="saudi">
      <div className="wrap">
        <div className="kicker rv">Saudi Tech</div>
        <h2 className="h2 dh rv">BUILT IN RIYADH. <span className="volt">PLAYED EVERYWHERE.</span></h2>
        <p className="lede rv">Sportech is Saudi technology: engineered, patented and proven here.</p>
        <div className="st-strip rv">
          <div className="st-cell">
            <span className="st-tile st-blur">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="st-logo" src="/brand/sauditech.png" alt="National certification pending" />
            </span>
            <span className="t"><b>Ink drying</b><small>A national certification, days away</small></span>
          </div>
          <div className="st-cell"><span className="t"><b>KSA Patent</b><small>Granted · PCT filings underway</small></span></div>
          <div className="st-cell"><span className="t"><b>Vision 2030</b><small>Aligned</small></span></div>
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
          {TICKER_FACTS}
          {corporate && <span>NOW A SIMPLIFIED <b>JOINT-STOCK COMPANY</b></span>}
          {TICKER_FACTS}
          {corporate && <span>NOW A SIMPLIFIED <b>JOINT-STOCK COMPANY</b></span>}
        </div>
      </div>

      <nav className="nav">
        <div className="wrap">
          <div className="nav-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="wordmark" src="/brand/wordmark-white.png" alt="Sportech" />
            <div className="nav-links">
              {corporate && <a href="#company">Company</a>}
              <a href="#partners">Partners</a><a href="#cases">Proof</a><a href="#os">Platform</a><a href={corporate ? "#rail" : "#brand"}>Your Brand</a><a href="#sim">Simulator</a>
            </div>
            <button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={openContactModal}>Book a Demo</button>
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
              <span className="rv">YOUR CLUB&apos;S</span>
              <span className="ghost rv">REVENUE.</span>
              <span className="volt rv">{corporate ? "ENGINEERED." : "UNLOCKED."}</span>
            </h1>
            <p className="hero-sub rv">
              {corporate
                ? "Fans spend on their passion every day. Sportech builds the engine that brings it home to your club."
                : "Your fans already spend on their passion. Just not with you."}
            </p>
            <div className="hero-cta rv">
              <button className="btn btn-primary" onClick={openContactModal}>Book a Demo</button>
              <a className="btn btn-ghost" href="#sim">Run Your Numbers</a>
            </div>
            <div className="hero-model rv">
              <span><i />$0 upfront</span><span><i />Revenue share</span><span><i />Your brand</span><span><i />Live in weeks</span>
            </div>
          </div>
          <div className="feed-card rv">
            <div className="feed-head"><i />Live on your club app — Matchday</div>
            <div className="feed-rows" id="feedRows" />
            <div className="feed-total"><span>This match so far</span><b id="feedTotal">$12,418</b></div>
            <div className="feed-note">Illustrative simulation</div>
          </div>
        </div>
      </header>

      {corporate && (
        <section className="sec" id="company">
          <div className="wrap">
            <div className="kicker rv">The company</div>
            <h2 className="h2 dh rv">WE BUILD THE REVENUE <span className="volt">ENGINE OF SPORT.</span></h2>
            <p className="lede rv">Sportech is a Saudi technology company, now a simplified joint-stock company, that designs, builds, operates and funds fan revenue infrastructure for clubs and leagues. One platform, twelve income streams, under your brand.</p>
            <div className="cfacts">
              <div className="fact rv"><div className="big dh">2025</div><b>Founded</b><p>Saudi from day one.</p></div>
              <div className="fact rv"><div className="big dh">HQ</div><b>Riyadh, Saudi Arabia</b><p>Engineering, operations and leadership.</p></div>
              <div className="fact rv"><div className="big dh">JSC</div><b>Simplified joint-stock company</b><p>Incorporated for scale and governance.</p></div>
              <div className="fact rv"><div className="big dh">1+12</div><b>Patent granted · 12 modules</b><p>KSA patent granted, PCT filings underway.</p></div>
            </div>
          </div>
        </section>
      )}

      {!corporate && (
        <div className="proof">
          <div className="wrap">
            <div className="proof-item rv"><b>Tier 1 club signed</b><span>Activation live Q4 2026</span></div>
            <div className="proof-item rv"><b>Production-ready platform</b><span>Live today, not a prototype</span></div>
            <div className="proof-item rv"><b>Patented hardware</b><span>Granted KSA, PCT filings underway</span></div>
            <div className="proof-item rv"><b>Pipeline under NDA</b><span>Clubs and leagues, four markets</span></div>
          </div>
        </div>
      )}

      <section className="sec psec" id="partners">
        <div className="wrap">
          <div className="kicker rv">Traction</div>
          <h2 className="h2 dh rv">SIGNINGS, <span className="ghost">AS THEY</span> <span className="volt">HAPPEN.</span></h2>
          <div className="sboard rv">
            <div className="sboard-hd">
              <span className="l"><i />Signing board — live</span>
              <span className="r"><span data-count="3">3</span> SIGNED · 7 BY NOV 2026</span>
            </div>
            <div className="flap">
              <span className="no">01</span>
              <span><span className="blk" style={{ width: "min(150px, 34vw)" }} /><small>Tier 1 Football Club · Activation Q4</small></span>
              <span className="st">SIGNED</span>
            </div>
            <div className="flap">
              <span className="no">02</span>
              <span><span className="blk" style={{ width: "min(118px, 28vw)" }} /><small>Football Club</small></span>
              <span className="st">SIGNED</span>
            </div>
            <div className="flap">
              <span className="no">03</span>
              <span><span className="blk" style={{ width: "min(96px, 24vw)" }} /><small>Esports Organization</small></span>
              <span className="st">SIGNED</span>
            </div>
            <div className="flap nda">
              <span className="no">04</span>
              <span><span className="blk" /><small>Football League · Under NDA</small></span>
              <span className="st">INKING</span>
            </div>
            <div className="flap nda">
              <span className="no">05</span>
              <span><span className="blk" style={{ width: "min(128px, 30vw)" }} /><small>Media Platform · Under NDA</small></span>
              <span className="st">INKING</span>
            </div>
            <div className="flap nda">
              <span className="no">06</span>
              <span><span className="blk" style={{ width: "min(190px, 42vw)" }} /><small>Combat Sports · Under NDA</small></span>
              <span className="st">INKING</span>
            </div>
            <div className="flap nda">
              <span className="no">07</span>
              <span><span className="blk" style={{ width: "min(140px, 32vw)" }} /><small>Camel Racing · In talks</small></span>
              <span className="st">IN TALKS</span>
            </div>
            <button type="button" className="flap claim" id="claimRow">
              <span className="q">?</span>
              <span><b>YOUR CLUB</b><small>The next seat on this board is open</small></span>
              <span className="st">CLAIM YOUR SLOT</span>
            </button>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="kicker rv">The gap</div>
          <h2 className="h2 dh rv">THE WHISTLE ENDS THE MATCH. <span className="volt">NOT THE SPENDING.</span></h2>
          <div className="gapstats">
            <div className="gs rv"><span className="n dh"><em data-count="19.8" data-prefix="$" data-suffix="B">$19.8B</em></span><p>Fan engagement market by 2033. Up from $6.2B today.</p></div>
            <div className="gs rv"><span className="n dh" data-count="5" data-suffix="B+">5B+</span><p>Football fans worldwide. Cricket adds 2.5B more.</p></div>
            <div className="gs rv"><span className="n dh ghost">365D</span><p>Fans spend all year. Clubs earn on matchday.</p></div>
          </div>
          <p className="src rv">Market size: Growth Market Reports, 2025.</p>
        </div>
      </section>

      <section className="sec chan-scene" id="cases">
        <div className="wrap">
          <h2 className="h2 dh rv">FANS ALREADY PAY. <span className="ghost">SPORT JUST</span> <span className="volt">DOESN&apos;T COLLECT.</span></h2>
          <p className="lede rv">Four proven behaviors. None owned by clubs today. Switch channels.</p>
          <div className="chan-tabs rv" role="tablist" aria-label="Fan behavior">
            <button className="ctab" role="tab" aria-selected="true" data-ch="0">Gifting</button>
            <button className="ctab" role="tab" aria-selected="false" data-ch="1">Memberships</button>
            <button className="ctab" role="tab" aria-selected="false" data-ch="2">Voting</button>
            <button className="ctab" role="tab" aria-selected="false" data-ch="3">Predictions</button>
          </div>
          <div className="chan-panel rv" id="chanpanel">
            <div className="chan-stat">
              <div className="big dh" id="chBig">$10M</div>
              <p className="cap" id="chCap">gifted every day on TikTok Live.</p>
              <p className="srcline" id="chSrc">Ipsos x TikTok, 2025</p>
            </div>
            <div>
              <div className="chan-proof" id="chProof" />
              <div className="chan-model"><b>On Sportech</b><span id="chModel" /></div>
            </div>
          </div>
          <div className="anchor rv">
            <span className="ttl dh">AND SAUDI FANS OUT-SPEND THEM ALL</span>
            <div className="as"><b>$308</b><p>per-capita gaming spend in KSA, 3x the MENA average</p></div>
            <div className="as"><b>$125M</b><p>KSA games live-streaming market, 2025</p></div>
            <div className="as"><b>68%</b><p>of Saudi gamers attend live esports events</p></div>
          </div>
          <p className="fine rv">Third-party figures describe observed fan behavior on other platforms, cited per stat. They are market evidence, not Sportech projections.</p>
        </div>
      </section>

      {corporate && (
        <section className="sec" id="rail">
          <div className="wrap">
            <h2 className="h2 dh rv">ANY SPORT. <span className="ghost">ANY COLORS.</span> <span className="volt">ALL YOURS.</span></h2>
            <p className="lede rv">Examples, not limits: if it has fans, it runs on Sportech, under your badge. Pick a sport and a color. The whole page follows.</p>
            <div className="cfg rv">
              <div>
                <div className="ctl-lab">Sport</div>
                <div className="sport-tabs" role="tablist" aria-label="Sport">
                  <button className="ctab" role="tab" aria-selected="true" data-sp="0">Football</button>
                  <button className="ctab" role="tab" aria-selected="false" data-sp="1">Basketball</button>
                  <button className="ctab" role="tab" aria-selected="false" data-sp="2">Motorsport</button>
                  <button className="ctab" role="tab" aria-selected="false" data-sp="3">Esports</button>
                  <button className="ctab" role="tab" aria-selected="false" data-sp="4">Cricket</button>
                  <button className="ctab" role="tab" aria-selected="false" data-sp="5">Combat</button>
                  <button className="ctab" role="tab" aria-selected="false" data-sp="6">Tennis</button>
                  <button className="ctab" role="tab" aria-selected="false" data-sp="7">NFL</button>
                  <button className="ctab ctab-yours" role="tab" aria-selected="false" data-sp="8">+ Yours</button>
                </div>
              </div>
              <div>
                <div className="ctl-lab">Club color</div>
                <div className="swatches" role="group" aria-label="Club color">
                  <button className="sw" style={{ background: "#e8f840" }} data-c="#e8f840" aria-pressed="true" aria-label="Volt yellow" />
                  <button className="sw" style={{ background: "#2f6bff" }} data-c="#2f6bff" aria-pressed="false" aria-label="Royal blue" />
                  <button className="sw" style={{ background: "#e23a3a" }} data-c="#e23a3a" aria-pressed="false" aria-label="Crimson" />
                  <button className="sw" style={{ background: "#1fbf6b" }} data-c="#1fbf6b" aria-pressed="false" aria-label="Emerald" />
                  <button className="sw" style={{ background: "#a855f7" }} data-c="#a855f7" aria-pressed="false" aria-label="Violet" />
                  <label className="sw sw-custom" aria-label="Custom color"><input type="color" id="customc" defaultValue="#e8f840" /></label>
                </div>
                <p className="studio-live" id="livetag">THEME: VOLT</p>
              </div>
            </div>
            <div className="sport-stage rv" id="spStage">
              <div className="sport-view">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id="spImg" src="/sportscreens/soccer.webp" alt="Sportech football app screens" />
                <div className="sport-yours" id="spYours" hidden>
                  <div>
                    <p className="dh sy-big">YOUR SPORT <span className="volt">HERE.</span></p>
                    <p className="sy-sub">Leagues, federations, racing teams, esports orgs, creator collectives. If fans show up, revenue does too.</p>
                  </div>
                </div>
                <div className="tint" aria-hidden="true" />
              </div>
              <div className="sport-cap"><b id="spName">Football</b><span id="spFeat">Live + Gifting</span></div>
            </div>
            <p className="fine rv">Already have an app? We integrate into it. API first.</p>
          </div>
        </section>
      )}

      {!corporate && (
      <section className="sec" id="rail">
        <div className="wrap">
          <h2 className="h2 dh rv">ANY SPORT. <span className="ghost">ANY STAGE.</span> <span className="volt">ANY FANBASE.</span></h2>
          <p className="lede rv">One engine under your badge. These are examples, not limits: if it has fans, it runs on Sportech.</p>
          <div className="sport-tabs rv" role="tablist" aria-label="Sport">
            <button className="ctab" role="tab" aria-selected="true" data-sp="0">Football</button>
            <button className="ctab" role="tab" aria-selected="false" data-sp="1">Basketball</button>
            <button className="ctab" role="tab" aria-selected="false" data-sp="2">Motorsport</button>
            <button className="ctab" role="tab" aria-selected="false" data-sp="3">Esports</button>
            <button className="ctab" role="tab" aria-selected="false" data-sp="4">Cricket</button>
            <button className="ctab" role="tab" aria-selected="false" data-sp="5">Combat</button>
            <button className="ctab" role="tab" aria-selected="false" data-sp="6">Tennis</button>
            <button className="ctab" role="tab" aria-selected="false" data-sp="7">NFL</button>
            <button className="ctab ctab-yours" role="tab" aria-selected="false" data-sp="8">+ Yours</button>
          </div>
          <div className="sport-stage rv" id="spStage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="spImg" src="/sportscreens/soccer.webp" alt="Sportech football app screens" />
            <div className="sport-yours" id="spYours" hidden>
              <div>
                <p className="dh sy-big">YOUR SPORT <span className="volt">HERE.</span></p>
                <p className="sy-sub">Leagues, federations, racing teams, esports orgs, creator collectives. If fans show up, revenue does too.</p>
              </div>
            </div>
            <div className="sport-cap"><b id="spName">Football</b><span id="spFeat">Live + Gifting</span></div>
          </div>
        </div>
      </section>
      )}

      <section className="sec wall-scene" id="os">
        <div className="wrap">
          <div className="kicker rv">The Sportech OS</div>
          <h2 className="h2 dh rv">ONE PLATFORM. <span className="volt">TWELVE ENGINES.</span></h2>
          <div className="wall">
            <span className="tag rv">Player POV Camera <small>PATENTED</small></span>
            <span className="tag rv">Live Gifting</span>
            <span className="tag rv">Memberships</span>
            <span className="tag rv">Predictions <small>SKILL-BASED</small></span>
            <span className="tag rv">Voice Rooms</span>
            <span className="tag rv">Augmented Reality</span>
            <span className="tag rv">Voting</span>
            <span className="tag rv">Smart Ticketing</span>
            <span className="tag rv">Loyalty Coins <small>CLOSED-LOOP</small></span>
            <span className="tag rv">Club Store</span>
            <span className="tag rv">Player Stores</span>
            <span className="tag rv">Sponsor Activations</span>
          </div>
          <p className="wall-note rv">Predictions and competitions are entertainment only, with no betting. Shariah compliant. Club coins are closed-loop loyalty, never convertible to cash.</p>
          {corporate && (
            <div className="infra rv">
              <div className="inf"><b>White-label by design</b><p>Your badge, your colors, your store listing.</p></div>
              <div className="inf"><b>Automated operations</b><p>Content, payments and campaigns run themselves.</p></div>
              <div className="inf"><b>AI built in</b><p>Moderation, highlights, recommendations and insights.</p></div>
              <div className="inf"><b>Engage and monetize</b><p>Talk to your fans directly, and earn on every interaction.</p></div>
              <div className="inf"><b>Admin control apps</b><p>Your team sees, manages and approves everything.</p></div>
              <div className="inf"><b>Secure by default</b><p>Enterprise-grade auth, in-region data, full audit trail.</p></div>
            </div>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap cam-grid">
          <div>
            <div className="kicker rv">Patented technology</div>
            <h2 className="h2 dh rv">THE MATCH, FROM <span className="volt">THE JERSEY.</span></h2>
            <p className="lede rv">Fans pick their player and ride the game live, from a patented jersey camera the size of a coin. Switch the feed yourself.</p>
            <div className="cam-specs">
              <div className="spec rv"><div className="v dh">&lt;3S</div><small>Latency in live match conditions</small></div>
              <div className="spec rv"><div className="v dh">9MM</div><small>Total height, built to disappear</small></div>
              <div className="spec rv"><div className="v dh">50MM</div><small>Diameter, jersey mounted</small></div>
            </div>
          </div>
          <div className="cam-stage rv">
            <div className="cam-view" id="camView">
              <video autoPlay muted loop playsInline>
                <source src="/cinematic/player-pov.mp4" type="video/mp4" />
              </video>
              <span className="cam-live" id="camLive"><i />LIVE — SUB-3S</span>
            </div>
            <div className="cam-tabs" role="group" aria-label="Camera feed">
              <button className="cam-tab" data-cam="pov" aria-pressed="true">Player POV</button>
              <button className="cam-tab" data-cam="c1" aria-pressed="false">Hardware 01</button>
              <button className="cam-tab" data-cam="c2" aria-pressed="false">Hardware 02</button>
              <button className="cam-tab" data-cam="c3" aria-pressed="false">Hardware 03</button>
            </div>
          </div>
        </div>
      </section>

      {corporate && saudiSection}

      {!corporate && (
      <section className="sec chan-scene" id="brand" style={{ borderTop: 0 }}>
        <div className="wrap">
          <h2 className="h2 dh rv">YOUR BADGE. <span className="volt">YOUR COLORS.</span></h2>
          <p className="lede rv">White label means the whole experience answers to your brand. Pick a color. The entire page follows.</p>
          <div className="studio-grid">
            <div>
              <div className="ctl-lab rv">Club color</div>
              <div className="swatches rv" role="group" aria-label="Club color">
                <button className="sw" style={{ background: "#e8f840" }} data-c="#e8f840" aria-pressed="true" aria-label="Volt yellow" />
                <button className="sw" style={{ background: "#2f6bff" }} data-c="#2f6bff" aria-pressed="false" aria-label="Royal blue" />
                <button className="sw" style={{ background: "#e23a3a" }} data-c="#e23a3a" aria-pressed="false" aria-label="Crimson" />
                <button className="sw" style={{ background: "#1fbf6b" }} data-c="#1fbf6b" aria-pressed="false" aria-label="Emerald" />
                <button className="sw" style={{ background: "#a855f7" }} data-c="#a855f7" aria-pressed="false" aria-label="Violet" />
                <label className="sw sw-custom" aria-label="Custom color"><input type="color" id="customc" defaultValue="#e8f840" /></label>
              </div>
              <p className="studio-note rv">Already have an app? We integrate into it. API first.</p>
              <p className="studio-live rv" id="livetag">THEME: VOLT</p>
            </div>
            <div className="brand-panel rv" id="brandpanel">
              <div className="bar"><span className="crest" /><span className="nm">YOUR CLUB<small>Official fan app</small></span></div>
              <div className="scr">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sportscreens/soccer.webp" alt="Sportech app screens in club branding" loading="lazy" />
              </div>
              <div className="row"><span className="pill">Join Membership</span><span className="pill q">Match Center</span></div>
            </div>
          </div>
        </div>
      </section>
      )}

      {corporate && (
        <section className="sec" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="kicker rv">Commercial model</div>
            <h2 className="h2 dh rv">WE EARN <span className="volt">WHEN YOU EARN.</span></h2>
            <div className="model-grid">
              <div className="fact rv"><div className="big dh">$0</div><b>Upfront cost</b><p>No licence fee, no build cost, no integration bill.</p></div>
              <div className="fact rv"><div className="big dh">0</div><b>Operations on your side</b><p>Fully managed. Your team stays on sport.</p></div>
              <div className="fact rv"><div className="big dh">100%</div><b>Your brand</b><p>Your badge, your colors, your fans. We stay invisible.</p></div>
            </div>
          </div>
        </section>
      )}

      <section className="sec sim-scene" id="sim">
        <div className="wrap">
          <h2 className="h2 dh rv">RUN YOUR <span className="volt">NUMBERS.</span></h2>
          <p className="lede rv">Pick a fanbase and a scenario. The model is conservative on purpose.</p>
          <div className="console rv">
            <div>
              <div className="ctl-block">
                <div className="ctl-lab">Total fanbase</div>
                <div className="fan-read"><b id="fanRead">1M</b><span>fans</span></div>
                <input className="slider" type="range" id="fanslider" min="0" max="27" step="1" defaultValue="9" aria-label="Total fanbase" />
                <div className="fan-scale" aria-hidden="true"><span>100K</span><span>1M</span><span>10M</span><span>100M</span></div>
              </div>
              <div className="ctl-block">
                <div className="ctl-lab">Scenario</div>
                <div className="chipset" id="scnset">
                  <button className="cbtn" data-rate="0.08" aria-pressed="true">Conservative 8%</button>
                  <button className="cbtn" data-rate="0.15" aria-pressed="false">Base 15%</button>
                  <button className="cbtn" data-rate="0.25" aria-pressed="false">Upside 25%</button>
                </div>
              </div>
              <div className="streams" id="streams" />
            </div>
            <div className="sim-total">
              <div className="lab">Estimated annual revenue</div>
              <div className="big" id="simTotal">$2,400,000</div>
              <div className="per">per year, shared club and Sportech</div>
              <div className="sim-badge" id="simBadge">80,000 active fans at $2.50 per month</div>
            </div>
            <p className="sim-note">Illustrative, on stated assumptions. Base case benchmarked against Premier League club app engagement of 12 to 20%. Not a forecast.</p>
          </div>
        </div>
      </section>

      {!corporate && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="kicker rv">The model</div>
            <h2 className="h2 dh rv">WE EARN <span className="volt">WHEN YOU EARN.</span></h2>
            <div className="model-grid">
              <div className="fact rv"><div className="big dh">$0</div><b>Upfront cost</b><p>No licence fee, no build cost, no integration bill.</p></div>
              <div className="fact rv"><div className="big dh">0</div><b>Operations on your side</b><p>Fully managed. Your team stays on sport.</p></div>
              <div className="fact rv"><div className="big dh">100%</div><b>Your brand</b><p>Your badge, your colors, your fans. We stay invisible.</p></div>
            </div>
          </div>
        </section>
      )}

      <section className="sec" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="kicker rv">FAQ</div>
          <h2 className="h2 dh rv">EVERY CLUB <span className="volt">ASKS.</span></h2>
          <div className="faq">
            {FAQ_ITEMS.map((item) => (
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
            <div className="kicker rv">Announcements</div>
            <h2 className="h2 dh rv">ON THE <span className="volt">RECORD.</span></h2>
            <div className="anns rv">
              <div className="ann"><span className="ad">OCT 2026</span><span className="at">Partnership signed with a Tier 1 Saudi football club; activation Q4 2026</span><span className="ac">Partnership</span></div>
              <div className="ann"><span className="ad">AUG 2026</span><span className="at">Sportech completes conversion to a simplified joint-stock company</span><span className="ac">Corporate</span></div>
              <div className="ann"><span className="ad">MAR 2026</span><span className="at">Player POV Camera patent granted in Saudi Arabia; PCT filings underway</span><span className="ac">Technology</span></div>
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
          <h2 className="dh rv">TURN FANS INTO <span className="volt">REVENUE.</span></h2>
          <button className="btn btn-primary rv" style={{ padding: "18px 38px", fontSize: 16 }} onClick={openContactModal}>Book a Demo</button>
          <p className="rv">{corporate ? "A private walkthrough with your club's numbers, with our partnerships team." : "A private walkthrough with your club's numbers. No deck, a live product."}</p>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="ft-grid">
            <div className="ft-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/wordmark-white.png" alt="Sportech" style={{ height: 16, width: "auto" }} />
              <p>The fan revenue engine for sports clubs. Saudi Tech, built in Riyadh, designed for the world.</p>
              {corporate && (
                <p style={{ marginTop: 10 }}>Sportech is a simplified joint-stock company registered in Riyadh, Kingdom of Saudi Arabia. CR 1009177946.</p>
              )}
            </div>
            <div className="ft-col">
              <div className="ft-h">Platform</div>
              <ul>
                <li><a href="#cases">Proof</a></li>
                <li><a href="#os">The 12 engines</a></li>
                <li><a href="#sim">Revenue simulator</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="ft-col">
              <div className="ft-h">Contact</div>
              <ul>
                <li><a href="mailto:contact@sportech.com.sa">contact@sportech.com.sa</a></li>
                <li><a href="tel:+966114222225">+966 11 422 2225</a></li>
                <li><span>Riyadh, Saudi Arabia</span></li>
              </ul>
            </div>
            <div className="ft-col">
              <div className="ft-h">Follow</div>
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
            <span>&copy; 2026 Sportech. All rights reserved.</span>
            <div className="ft-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/refund-policy">Payment &amp; Refund Policy</a>
              <a href="/terms">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
