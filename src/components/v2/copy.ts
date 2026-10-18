/* Sportech landing V2 — bilingual copy dictionary.
   Every visible string on the landing page lives here, EN and AR.
   Numbers, currency figures and source citations stay identical across
   languages. Compliance language (skill-based predictions, closed-loop
   coins, illustrative revenue, no partner names) must survive translation. */

export type Lang = "en" | "ar";

/* [before-bold, bold, after-bold] */
type TickerFact = [string, string, string];

const en = {
  ticker: [
    ["TIER 1 CLUB ", "SIGNED", " — ACTIVATION Q4 2026"],
    ["PATENT GRANTED IN KSA — ", "PCT FILINGS UNDERWAY", ""],
    ["12 REVENUE ENGINES — ", "ONE PLATFORM", ""],
    ["$0 UPFRONT — ", "WE EARN WHEN YOU EARN", ""],
    ["PLAYER POV LATENCY ", "UNDER 3 SECONDS", ""],
    ["SAUDI TECH — ", "BUILT IN RIYADH", ""],
    ["FAN ENGAGEMENT MARKET ", "$19.8B BY 2033", ""],
    ["FOOTBALL FANS WORLDWIDE ", "5 BILLION+", ""],
    ["LIVE AND ", "PRODUCTION-READY", ""],
  ] as TickerFact[],
  tickerJsc: ["NOW A SIMPLIFIED ", "JOINT-STOCK COMPANY", ""] as TickerFact,

  nav: {
    company: "Company",
    partners: "Partners",
    proof: "Proof",
    platform: "Platform",
    yourBrand: "Your Brand",
    simulator: "Simulator",
    bookDemo: "Book a Demo",
    langToggle: "العربية",
  },

  hero: {
    h1a: "YOUR CLUB'S",
    h1b: "REVENUE.",
    h1c: "ENGINEERED.",
    h1cAlt: "UNLOCKED.",
    sub: "Fans spend on their passion every day. Sportech builds the engine that brings it home to your club.",
    subAlt: "Your fans already spend on their passion. Just not with you.",
    runNumbers: "Run Your Numbers",
    model: ["$0 upfront", "Revenue share", "Your brand", "Live in weeks"],
    feedHead: "Live on your club app — Matchday",
    feedTotalLabel: "This match so far",
    feedNote: "Illustrative simulation",
  },

  /* [category, event label, min amount, max amount] */
  feed: [
    ["Live Gifting", "Gift: goal celebration", 5, 250],
    ["Live Gifting", "Gift: warm-up stream", 5, 90],
    ["Memberships", "Gold tier renewal", 10, 30],
    ["Memberships", "New silver member", 5, 15],
    ["Predictions", "Match prediction entry", 2, 10],
    ["Player Cam", "POV match pass", 8, 15],
    ["Smart Ticketing", "Resale, Sec 104", 40, 420],
    ["Club Store", "Third kit drop", 60, 180],
    ["Voting", "Kit vote unlock", 2, 6],
  ] as Array<[string, string, number, number]>,

  company: {
    kicker: "The company",
    h2a: "WE BUILD THE REVENUE ",
    h2v: "ENGINE OF SPORT.",
    lede: "Sportech is a Saudi technology company, now a simplified joint-stock company, that designs, builds, operates and funds fan revenue infrastructure for clubs and leagues. One platform, twelve income streams, under your brand.",
    facts: [
      { big: "2025", b: "Founded", p: "Saudi from day one." },
      { big: "HQ", b: "Riyadh, Saudi Arabia", p: "Engineering, operations and leadership." },
      { big: "JSC", b: "Simplified joint-stock company", p: "Incorporated for scale and governance." },
      { big: "1+12", b: "Patent granted · 12 modules", p: "KSA patent granted, PCT filings underway." },
    ],
  },

  proofStrip: [
    { b: "Tier 1 club signed", s: "Activation live Q4 2026" },
    { b: "Production-ready platform", s: "Live today, not a prototype" },
    { b: "Patented hardware", s: "Granted KSA, PCT filings underway" },
    { b: "Pipeline under NDA", s: "Clubs and leagues, four markets" },
  ],

  partners: {
    kicker: "Traction",
    h2a: "SIGNINGS, ",
    h2g: "AS THEY",
    h2v: "HAPPEN.",
    boardLive: "Signing board — live",
    signedSuffix: " SIGNED · 7 BY NOV 2026",
    rows: [
      { cat: "Tier 1 Football Club · Activation Q4", st: "SIGNED" },
      { cat: "Football Club", st: "SIGNED" },
      { cat: "Esports Organization", st: "SIGNED" },
      { cat: "Football League · Under NDA", st: "INKING" },
      { cat: "Media Platform · Under NDA", st: "INKING" },
      { cat: "Combat Sports · Under NDA", st: "INKING" },
      { cat: "Camel Racing · In talks", st: "IN TALKS" },
    ],
    claimB: "YOUR CLUB",
    claimS: "The next seat on this board is open",
    claimSt: "CLAIM YOUR SLOT",
  },

  gap: {
    kicker: "The gap",
    h2a: "THE WHISTLE ENDS THE MATCH. ",
    h2v: "NOT THE SPENDING.",
    s1suffix: "B",
    s1p: "Fan engagement market by 2033. Up from $6.2B today.",
    s2suffix: "B+",
    s2p: "Football fans worldwide. Cricket adds 2.5B more.",
    s3big: "365D",
    s3p: "Fans spend all year. Clubs earn on matchday.",
    src: "Market size: Growth Market Reports, 2025.",
  },

  cases: {
    h2a: "FANS ALREADY PAY. ",
    h2g: "SPORT JUST",
    h2v: "DOESN'T COLLECT.",
    lede: "Four proven behaviors. None owned by clubs today. Switch channels.",
    tabs: ["Gifting", "Memberships", "Voting", "Predictions"],
    onSportech: "On Sportech",
    channels: [
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
    ],
    regionTabs: ["KSA", "USA", "UK & Europe", "Korea", "India & Pakistan", "Worldwide"],
    regions: [
      { t: "AND SAUDI FANS OUT-SPEND THEM ALL", s: [["$308", "per-capita gaming spend in KSA, 3x the MENA average"], ["$125M", "KSA games live-streaming market, 2025"], ["68%", "of Saudi gamers attend live esports events"]] },
      { t: "AMERICA VOTES, PLAYS AND PAYS", s: [["3.4M", "fan votes for a single NBA All-Star in one season"], ["71.8M", "career All-Star votes cast for LeBron James"], ["60K+", "US creators earn real income from live gifts"]] },
      { t: "EUROPE PAYS TO PLAY A PART", s: [["11.2M", "Fantasy Premier League managers, every match week"], ["12-20%", "of Premier League club-app users pay to engage"], ["$400M+", "club revenue from fan tokens, led by Europe's elite clubs"]] },
      { t: "KOREA WROTE THE PLAYBOOK", s: [["$593M", "Weverse direct fan-to-artist revenue, 2024"], ["$1,200", "yearly spend of a K-pop superfan, versus about $120 for Spotify"], ["2x+", "owned fan platforms out-earn social channels"]] },
      { t: "CRICKET IS ITS OWN ECONOMY", s: [["2.5B+", "cricket fans worldwide, the overwhelming majority in South Asia"], ["1B+", "viewers reached by a single IPL season, TV and digital"], ["200M+", "registered players on India's biggest fantasy cricket platform"]] },
      { t: "EVERYWHERE, FANS ARE PAYING", s: [["$10M", "gifted per day on TikTok Live"], ["245M", "fantasy sports players in a $31B market"], ["68%", "of TikTok users have tried live gifting"]] },
    ],
    fine: "Third-party figures describe observed fan behavior on other platforms, cited per stat. They are market evidence, not Sportech projections.",
  },

  rail: {
    h2a: "ANY SPORT. ",
    h2g: "ANY COLORS.",
    h2v: "ALL YOURS.",
    h2gAlt: "ANY STAGE.",
    h2vAlt: "ANY FANBASE.",
    lede: "Examples, not limits: if it has fans, it runs on Sportech, under your badge. Pick a sport and a color. The whole page follows.",
    ledeAlt: "One engine under your badge. These are examples, not limits: if it has fans, it runs on Sportech.",
    sportLabel: "Sport",
    colorLabel: "Club color",
    themePrefix: "THEME: ",
    sports: [
      { n: "Football", f: "Live + Gifting" },
      { n: "Basketball", f: "Predictions" },
      { n: "Motorsport", f: "Player Cam POV" },
      { n: "Esports", f: "Voice Rooms" },
      { n: "Cricket", f: "Memberships" },
      { n: "Combat", f: "Smart Ticketing" },
      { n: "Tennis", f: "Loyalty & Rewards" },
      { n: "NFL", f: "Club Store" },
      { n: "+ Yours", f: "Any fanbase on earth" },
    ],
    yoursTab: "+ Yours",
    yoursBig: "YOUR SPORT ",
    yoursVolt: "HERE.",
    yoursSub: "Leagues, federations, racing teams, esports orgs, creator collectives. If fans show up, revenue does too.",
    fine: "Already have an app? We integrate into it. API first.",
  },

  brand: {
    h2a: "YOUR BADGE. ",
    h2v: "YOUR COLORS.",
    lede: "White label means the whole experience answers to your brand. Pick a color. The entire page follows.",
    panelName: "YOUR CLUB",
    panelSub: "Official fan app",
    pill1: "Join Membership",
    pill2: "Match Center",
  },

  os: {
    kicker: "The Sportech OS",
    h2a: "ONE PLATFORM. ",
    h2v: "TWELVE ENGINES.",
    tags: [
      { t: "Player POV Camera", s: "PATENTED" },
      { t: "Live Gifting", s: "" },
      { t: "Memberships", s: "" },
      { t: "Predictions", s: "SKILL-BASED" },
      { t: "Voice Rooms", s: "" },
      { t: "Augmented Reality", s: "" },
      { t: "Voting", s: "" },
      { t: "Smart Ticketing", s: "" },
      { t: "Loyalty Coins", s: "CLOSED-LOOP" },
      { t: "Club Store", s: "" },
      { t: "Player Stores", s: "" },
      { t: "Sponsor Activations", s: "" },
    ],
    note: "Predictions and competitions are entertainment only, with no betting. Shariah compliant. Club coins are closed-loop loyalty, never convertible to cash.",
    infra: [
      { b: "White-label by design", p: "Your badge, your colors, your store listing." },
      { b: "Automated operations", p: "Content, payments and campaigns run themselves." },
      { b: "AI built in", p: "Moderation, highlights, recommendations and insights." },
      { b: "Engage and monetize", p: "Talk to your fans directly, and earn on every interaction." },
      { b: "Admin control apps", p: "Your team sees, manages and approves everything." },
      { b: "Secure by default", p: "Enterprise-grade auth, in-region data, full audit trail." },
    ],
  },

  camera: {
    kicker: "Patented technology",
    h2a: "THE MATCH, FROM ",
    h2v: "THE JERSEY.",
    lede: "Fans pick their player and ride the game live, from a patented jersey camera the size of a coin. Switch the feed yourself.",
    specs: [
      { v: "<3S", s: "Latency in live match conditions" },
      { v: "9MM", s: "Total height, built to disappear" },
      { v: "50MM", s: "Diameter, jersey mounted" },
    ],
    live: "LIVE — SUB-3S",
    tabs: ["Player POV", "Hardware 01", "Hardware 02", "Hardware 03"],
    altHw: "Sportech Player Camera hardware, view ",
  },

  saudi: {
    kicker: "Saudi Tech",
    h2a: "BUILT IN RIYADH. ",
    h2v: "PLAYED EVERYWHERE.",
    lede: "Sportech is Saudi technology: engineered, patented and proven here.",
    logoAlt: "National certification pending",
    cells: [
      { b: "Ink drying", s: "A national certification, days away" },
      { b: "KSA Patent", s: "Granted · PCT filings underway" },
      { b: "Vision 2030", s: "Aligned" },
    ],
  },

  model: {
    kicker: "Commercial model",
    kickerAlt: "The model",
    h2a: "WE EARN ",
    h2v: "WHEN YOU EARN.",
    facts: [
      { big: "$0", b: "Upfront cost", p: "No licence fee, no build cost, no integration bill." },
      { big: "0", b: "Operations on your side", p: "Fully managed. Your team stays on sport." },
      { big: "100%", b: "Your brand", p: "Your badge, your colors, your fans. We stay invisible." },
    ],
  },

  sim: {
    h2a: "RUN YOUR ",
    h2v: "NUMBERS.",
    lede: "Pick a fanbase and a scenario. The model is conservative on purpose.",
    fanbaseLabel: "Total fanbase",
    fansWord: "fans",
    scenarioLabel: "Scenario",
    scenarios: ["Conservative 8%", "Base 15%", "Upside 25%"],
    streams: ["Subscriptions", "Tickets", "Live Gifting", "Merchandise", "Predictions", "Gift Cards", "Voting", "Collectibles"],
    totalLabel: "Estimated annual revenue",
    perLine: "per year, shared club and Sportech",
    badge: (n: string) => n + " active fans at $2.50 per month",
    note: "Illustrative, on stated assumptions. Base case benchmarked against Premier League club app engagement of 12 to 20%. Not a forecast.",
  },

  faq: {
    kicker: "FAQ",
    h2a: "EVERY CLUB ",
    h2v: "ASKS.",
    items: [
      { q: "What does the platform cost the club?", a: "Nothing. We design, build, operate and fund the entire platform. Your club earns an agreed share of every transaction from day one of launch." },
      { q: "How fast can we launch?", a: "A white-label app in your club's identity is typically live within weeks. Core revenue streams activate at launch, and the full set of twelve modules lands across your first year." },
      { q: "Are match predictions a form of betting?", a: "No. Predictions are skill-based entertainment using platform points. No real money is staked, and the fan wallet is closed-loop, working like a loyalty program." },
      { q: "Who operates payments, ticketing and support?", a: "Sportech runs the full stack end to end through a modular API architecture, integrated with regional payment and ticketing providers." },
      { q: "Where is fan data stored?", a: "In-region, per market, and governed by the partnership agreement, with tiered identity verification built in." },
      { q: "How is the revenue share structured?", a: "Per partnership. Full commercial terms are set out in the agreement." },
    ],
  },

  news: {
    kicker: "Announcements",
    h2a: "ON THE ",
    h2v: "RECORD.",
    items: [
      { d: "OCT 2026", t: "Partnership signed with a Tier 1 Saudi football club; activation Q4 2026", c: "Partnership" },
      { d: "AUG 2026", t: "Sportech completes conversion to a simplified joint-stock company", c: "Corporate" },
      { d: "MAR 2026", t: "Player POV Camera patent granted in Saudi Arabia; PCT filings underway", c: "Technology" },
    ],
  },

  cta: {
    h2a: "TURN FANS INTO ",
    h2v: "REVENUE.",
    sub: "A private walkthrough with your club's numbers, with our partnerships team.",
    subAlt: "A private walkthrough with your club's numbers. No deck, a live product.",
  },

  footer: {
    brandP: "The fan revenue engine for sports clubs. Saudi Tech, built in Riyadh, designed for the world.",
    legalLine: "Sportech is a simplified joint-stock company registered in Riyadh, Kingdom of Saudi Arabia. CR 1009177946.",
    platformH: "Platform",
    links: ["Proof", "The 12 engines", "Revenue simulator", "FAQ"],
    contactH: "Contact",
    riyadh: "Riyadh, Saudi Arabia",
    followH: "Follow",
    copyright: "© 2026 Sportech. All rights reserved.",
    privacy: "Privacy Policy",
    refund: "Payment & Refund Policy",
    terms: "Terms of Use",
  },
};

export type V2Copy = typeof en;

const ar: V2Copy = {
  ticker: [
    ["نادٍ من الدرجة الأولى ", "وقّع", " — التفعيل في الربع الرابع 2026"],
    ["براءة اختراع ممنوحة في السعودية — ", "وطلبات PCT جارية", ""],
    ["12 محرك إيرادات — ", "منصة واحدة", ""],
    ["$0 مقدماً — ", "نربح عندما تربح", ""],
    ["بث اللاعب المباشر ", "بأقل من 3 ثوانٍ", ""],
    ["تقنية سعودية — ", "صُنعت في الرياض", ""],
    ["سوق تفاعل الجماهير ", "$19.8 مليار بحلول 2033", ""],
    ["مشجعو كرة القدم حول العالم ", "أكثر من 5 مليارات", ""],
    ["مباشر و", "جاهز للإنتاج", ""],
  ],
  tickerJsc: ["الآن ", "شركة مساهمة مبسطة", ""],

  nav: {
    company: "الشركة",
    partners: "الشركاء",
    proof: "الإثباتات",
    platform: "المنصة",
    yourBrand: "علامتك",
    simulator: "المحاكي",
    bookDemo: "احجز عرضاً",
    langToggle: "English",
  },

  hero: {
    h1a: "إيرادات",
    h1b: "ناديك.",
    h1c: "مُهندَسة.",
    h1cAlt: "مُحرَّرة.",
    sub: "جماهيرك تنفق على شغفها كل يوم. وسبورتك تبني المحرّك الذي يعيد هذا الإنفاق إلى ناديك.",
    subAlt: "جماهيرك تنفق على شغفها بالفعل. لكن ليس معك.",
    runNumbers: "احسب أرقامك",
    model: ["$0 مقدماً", "مشاركة في الإيرادات", "بعلامتك التجارية", "إطلاق خلال أسابيع"],
    feedHead: "مباشر على تطبيق ناديك — يوم المباراة",
    feedTotalLabel: "هذه المباراة حتى الآن",
    feedNote: "محاكاة توضيحية",
  },

  feed: [
    ["الإهداء المباشر", "هدية: احتفال بهدف", 5, 250],
    ["الإهداء المباشر", "هدية: بث الإحماء", 5, 90],
    ["العضويات", "تجديد الفئة الذهبية", 10, 30],
    ["العضويات", "عضو فضي جديد", 5, 15],
    ["التوقعات", "مشاركة توقع مباراة", 2, 10],
    ["كاميرا اللاعب", "باقة بث المباراة POV", 8, 15],
    ["التذاكر الذكية", "إعادة بيع، قطاع 104", 40, 420],
    ["متجر النادي", "إصدار الطقم الثالث", 60, 180],
    ["التصويت", "فتح تصويت الطقم", 2, 6],
  ],

  company: {
    kicker: "الشركة",
    h2a: "نبني محرّك ",
    h2v: "إيرادات الرياضة.",
    lede: "سبورتك شركة تقنية سعودية، أصبحت اليوم شركة مساهمة مبسطة، تصمّم وتبني وتشغّل وتموّل البنية التحتية لإيرادات الجماهير للأندية والدوريات. منصة واحدة، واثنا عشر مصدر دخل، بعلامتك التجارية.",
    facts: [
      { big: "2025", b: "التأسيس", p: "سعودية منذ اليوم الأول." },
      { big: "المقر", b: "الرياض، السعودية", p: "الهندسة والعمليات والقيادة." },
      { big: "JSC", b: "شركة مساهمة مبسطة", p: "تأسست للنمو والحوكمة." },
      { big: "1+12", b: "براءة اختراع · 12 وحدة", p: "براءة ممنوحة في السعودية، وطلبات PCT جارية." },
    ],
  },

  proofStrip: [
    { b: "نادٍ من الدرجة الأولى وقّع", s: "التفعيل في الربع الرابع 2026" },
    { b: "منصة جاهزة للإنتاج", s: "حيّة اليوم، ليست نموذجاً أولياً" },
    { b: "عتاد مسجل ببراءة اختراع", s: "ممنوحة في السعودية، وطلبات PCT جارية" },
    { b: "خط شراكات تحت السرية", s: "أندية ودوريات، في أربعة أسواق" },
  ],

  partners: {
    kicker: "الزخم",
    h2a: "التوقيعات، ",
    h2g: "لحظة",
    h2v: "بلحظة.",
    boardLive: "لوحة التوقيعات — مباشر",
    signedSuffix: " موقّعة · 7 بحلول نوفمبر 2026",
    rows: [
      { cat: "نادي كرة قدم من الدرجة الأولى · التفعيل في الربع الرابع", st: "موقّع" },
      { cat: "نادي كرة قدم", st: "موقّع" },
      { cat: "منظمة رياضات إلكترونية", st: "موقّع" },
      { cat: "دوري كرة قدم · تحت اتفاقية سرية", st: "قيد التوقيع" },
      { cat: "منصة إعلامية · تحت اتفاقية سرية", st: "قيد التوقيع" },
      { cat: "رياضات قتالية · تحت اتفاقية سرية", st: "قيد التوقيع" },
      { cat: "سباقات الهجن · محادثات جارية", st: "محادثات" },
    ],
    claimB: "ناديك",
    claimS: "المقعد التالي على هذه اللوحة شاغر",
    claimSt: "احجز مقعدك",
  },

  gap: {
    kicker: "الفجوة",
    h2a: "صافرة النهاية توقف المباراة. ",
    h2v: "لا الإنفاق.",
    s1suffix: " مليار",
    s1p: "حجم سوق تفاعل الجماهير بحلول 2033، صعوداً من $6.2 مليار اليوم.",
    s2suffix: " مليارات+",
    s2p: "مشجع كرة قدم حول العالم. والكريكيت يضيف 2.5 مليار آخرين.",
    s3big: "365 يوم",
    s3p: "الجماهير تنفق طوال العام. والأندية تربح يوم المباراة فقط.",
    src: "حجم السوق: Growth Market Reports، 2025.",
  },

  cases: {
    h2a: "الجماهير تدفع بالفعل. ",
    h2g: "لكن الرياضة",
    h2v: "لا تحصّل.",
    lede: "أربعة سلوكيات مثبتة، لا يملك الأندية أياً منها اليوم. بدّل القنوات.",
    tabs: ["الإهداء", "العضويات", "التصويت", "التوقعات"],
    onSportech: "على سبورتك",
    channels: [
      {
        big: "$10M", cap: "تُهدى يومياً على تيك توك لايف.", src: "Ipsos x TikTok, 2025",
        proof: [["68%", "من مستخدمي تيك توك جرّبوا الإهداء المباشر"], ["1M+", "مشاهد متزامن في بث واحد لجماهير كرة القدم"], ["60K+", "صانع محتوى أمريكي يحقق دخلاً حقيقياً من الهدايا"]],
        model: "الجماهير تُهدي أثناء الإحماء والأهداف ولحظات التتويج، داخل تطبيق النادي. والنادي يحتفظ بالحصة الأكبر.",
      },
      {
        big: "727,700", cap: "اشتراك مدفوع لصانع محتوى واحد، في شهر واحد.", src: "Twitch / Resourcera, 2025",
        proof: [["$1.9B", "إيرادات تويتش في 2025، معظمها اشتراكات"], ["$593M", "إيرادات Weverse المباشرة من المعجبين للفنانين، 2024"], ["2x+", "المنصات المملوكة تتفوق في الدخل على قنوات التواصل"]],
        model: "فئات عضوية للنادي بمزايا حقيقية. دخل متكرر يتراكم موسماً بعد موسم.",
      },
      {
        big: "$400M+", cap: "دفعتها الجماهير مقابل رأي في قرارات الأندية.", src: "ScienceDirect, 2025",
        proof: [["$350M+", "أنفقتها الجماهير على رموز المشجعين وحدها"], ["3.4M", "صوت للاعب واحد في مباراة كل النجوم في موسم واحد"], ["71.8M", "صوتاً جمعها ليبرون جيمس في مسيرته"]],
        model: "تصويت الجماهير على رجل المباراة والأطقم ولحظات النادي. بلا عملات رقمية، بلا سحب نقدي، انتماء خالص.",
      },
      {
        big: "68%", cap: "من مشاهدي البث المباشر يشاركون في توقعات بالنقاط.", src: "BetterStreams, 2023",
        proof: [["2x", "نشاط المحادثة أثناء فتح نافذة التوقعات"], ["11.2M", "مدير فانتازي في الدوري الإنجليزي كل جولة"], ["245M", "مستخدم فانتازي رياضي في سوق بحجم $31 مليار"]],
        model: "توقعات المباريات بنقاط النادي المغلقة. آلية ولاء، والنقاط لا تتحول إلى نقود أبداً.",
      },
    ],
    regionTabs: ["السعودية", "أمريكا", "بريطانيا وأوروبا", "كوريا", "الهند وباكستان", "العالم"],
    regions: [
      { t: "والجمهور السعودي ينفق أكثر منهم جميعاً", s: [["$308", "إنفاق الفرد على الألعاب في السعودية، 3 أضعاف متوسط المنطقة"], ["$125M", "سوق البث المباشر للألعاب في السعودية، 2025"], ["68%", "من اللاعبين السعوديين يحضرون فعاليات الرياضات الإلكترونية"]] },
      { t: "أمريكا تصوّت وتلعب وتدفع", s: [["3.4M", "صوت للاعب واحد في مباراة كل النجوم في موسم واحد"], ["71.8M", "صوتاً جمعها ليبرون جيمس في مسيرته"], ["60K+", "صانع محتوى أمريكي يحقق دخلاً من الهدايا المباشرة"]] },
      { t: "أوروبا تدفع لتشارك", s: [["11.2M", "مدير فانتازي في الدوري الإنجليزي كل جولة"], ["12-20%", "من مستخدمي تطبيقات أندية البريميرليغ يدفعون للمشاركة"], ["$400M+", "إيرادات أندية من رموز المشجعين، تقودها أندية أوروبا الكبرى"]] },
      { t: "كوريا كتبت قواعد اللعبة", s: [["$593M", "إيرادات Weverse المباشرة من المعجبين للفنانين، 2024"], ["$1,200", "إنفاق المعجب الشغوف بالكيبوب سنوياً، مقابل نحو $120 لسبوتيفاي"], ["2x+", "منصات المعجبين المملوكة تتفوق على قنوات التواصل"]] },
      { t: "الكريكيت اقتصاد قائم بذاته", s: [["2.5B+", "مشجع كريكيت حول العالم، غالبيتهم الساحقة في جنوب آسيا"], ["1B+", "مشاهد وصل إليهم موسم واحد من الدوري الهندي الممتاز، تلفزيوناً ورقمياً"], ["200M+", "لاعب مسجل في أكبر منصة فانتازي كريكيت في الهند"]] },
      { t: "في كل مكان، الجماهير تدفع", s: [["$10M", "تُهدى يومياً على تيك توك لايف"], ["245M", "لاعب فانتازي رياضي في سوق بحجم $31 مليار"], ["68%", "من مستخدمي تيك توك جرّبوا الإهداء المباشر"]] },
    ],
    fine: "الأرقام الواردة من أطراف ثالثة تصف سلوكاً جماهيرياً مرصوداً على منصات أخرى، مع ذكر المصدر لكل رقم. وهي أدلة سوقية، لا توقعات من سبورتك.",
  },

  rail: {
    h2a: "أي رياضة. ",
    h2g: "أي ألوان.",
    h2v: "كلها لك.",
    h2gAlt: "أي مستوى.",
    h2vAlt: "أي جمهور.",
    lede: "أمثلة، لا حدود: إن كان له جمهور، فهو يعمل على سبورتك، بشعارك. اختر رياضة ولوناً، والصفحة كلها تتبعك.",
    ledeAlt: "محرك واحد تحت شعارك. هذه أمثلة، لا حدود: إن كان له جمهور، فهو يعمل على سبورتك.",
    sportLabel: "الرياضة",
    colorLabel: "لون النادي",
    themePrefix: "اللون: ",
    sports: [
      { n: "كرة القدم", f: "بث مباشر + إهداء" },
      { n: "كرة السلة", f: "التوقعات" },
      { n: "رياضة المحركات", f: "كاميرا اللاعب POV" },
      { n: "الرياضات الإلكترونية", f: "الغرف الصوتية" },
      { n: "الكريكيت", f: "العضويات" },
      { n: "الرياضات القتالية", f: "التذاكر الذكية" },
      { n: "التنس", f: "الولاء والمكافآت" },
      { n: "كرة القدم الأمريكية", f: "متجر النادي" },
      { n: "+ رياضتك", f: "أي جمهور على وجه الأرض" },
    ],
    yoursTab: "+ رياضتك",
    yoursBig: "رياضتك ",
    yoursVolt: "هنا.",
    yoursSub: "دوريات، اتحادات، فرق سباقات، منظمات رياضات إلكترونية، مجتمعات صنّاع محتوى. أينما حضر الجمهور، حضر الدخل.",
    fine: "لديك تطبيق بالفعل؟ نتكامل معه. API أولاً.",
  },

  brand: {
    h2a: "شعارك. ",
    h2v: "ألوانك.",
    lede: "العلامة البيضاء تعني أن التجربة كلها تتبع هويتك. اختر لوناً، والصفحة بأكملها تتبعك.",
    panelName: "ناديك",
    panelSub: "تطبيق الجماهير الرسمي",
    pill1: "انضم للعضوية",
    pill2: "مركز المباراة",
  },

  os: {
    kicker: "نظام سبورتك",
    h2a: "منصة واحدة. ",
    h2v: "اثنا عشر محركاً.",
    tags: [
      { t: "كاميرا اللاعب POV", s: "براءة اختراع" },
      { t: "الإهداء المباشر", s: "" },
      { t: "العضويات", s: "" },
      { t: "التوقعات", s: "قائمة على المهارة" },
      { t: "الغرف الصوتية", s: "" },
      { t: "الواقع المعزز", s: "" },
      { t: "التصويت", s: "" },
      { t: "التذاكر الذكية", s: "" },
      { t: "عملات الولاء", s: "نظام مغلق" },
      { t: "متجر النادي", s: "" },
      { t: "متاجر اللاعبين", s: "" },
      { t: "تفعيلات الرعاة", s: "" },
    ],
    note: "التوقعات والمسابقات للترفيه فقط، من دون أي مراهنات، ومتوافقة مع الشريعة. وعملات النادي ولاء بنظام مغلق لا تتحول إلى نقود أبداً.",
    infra: [
      { b: "علامة بيضاء بالتصميم", p: "شعارك وألوانك وإدراجك في المتاجر." },
      { b: "عمليات مؤتمتة", p: "المحتوى والمدفوعات والحملات تدير نفسها." },
      { b: "ذكاء اصطناعي مدمج", p: "إشراف وملخصات وتوصيات وتحليلات." },
      { b: "تفاعل وتحقيق دخل", p: "خاطب جماهيرك مباشرة، واربح من كل تفاعل." },
      { b: "تطبيقات تحكم إدارية", p: "فريقك يرى ويدير ويعتمد كل شيء." },
      { b: "آمن افتراضياً", p: "مصادقة بمستوى المؤسسات، بيانات داخل المنطقة، وسجل تدقيق كامل." },
    ],
  },

  camera: {
    kicker: "تقنية مسجلة ببراءة اختراع",
    h2a: "المباراة، من ",
    h2v: "القميص.",
    lede: "الجمهور يختار لاعبه ويعيش المباراة مباشرة، من كاميرا قميص مسجلة ببراءة اختراع بحجم عملة معدنية. بدّل البث بنفسك.",
    specs: [
      { v: "<3S", s: "زمن الاستجابة في ظروف المباراة المباشرة" },
      { v: "9MM", s: "الارتفاع الكلي، صُممت لتختفي" },
      { v: "50MM", s: "القطر، مثبتة على القميص" },
    ],
    live: "مباشر — أقل من 3 ثوانٍ",
    tabs: ["كاميرا اللاعب", "العتاد 01", "العتاد 02", "العتاد 03"],
    altHw: "عتاد كاميرا اللاعب من سبورتك، لقطة ",
  },

  saudi: {
    kicker: "تقنية سعودية",
    h2a: "صُنعت في الرياض. ",
    h2v: "تُلعب في كل مكان.",
    lede: "سبورتك تقنية سعودية: هُندست وسُجلت وأثبتت نفسها هنا.",
    logoAlt: "اعتماد وطني قيد الإصدار",
    cells: [
      { b: "الحبر يجف", s: "اعتماد وطني، على بعد أيام" },
      { b: "براءة اختراع سعودية", s: "ممنوحة · طلبات PCT جارية" },
      { b: "رؤية 2030", s: "متوافقة" },
    ],
  },

  model: {
    kicker: "النموذج التجاري",
    kickerAlt: "النموذج",
    h2a: "نربح ",
    h2v: "عندما تربح.",
    facts: [
      { big: "$0", b: "تكلفة مقدمة", p: "لا رسوم ترخيص، ولا تكلفة تطوير، ولا فاتورة تكامل." },
      { big: "0", b: "عمليات على عاتقك", p: "إدارة كاملة من طرفنا. وفريقك يبقى مركزاً على الرياضة." },
      { big: "100%", b: "علامتك التجارية", p: "شعارك وألوانك وجماهيرك. ونحن نبقى خلف الستار." },
    ],
  },

  sim: {
    h2a: "احسب ",
    h2v: "أرقامك.",
    lede: "اختر حجم الجمهور وسيناريو. النموذج متحفظ عمداً.",
    fanbaseLabel: "إجمالي الجمهور",
    fansWord: "مشجع",
    scenarioLabel: "السيناريو",
    scenarios: ["متحفظ 8%", "أساسي 15%", "متفائل 25%"],
    streams: ["الاشتراكات", "التذاكر", "الإهداء المباشر", "المنتجات", "التوقعات", "بطاقات الهدايا", "التصويت", "المقتنيات"],
    totalLabel: "الإيراد السنوي التقديري",
    perLine: "سنوياً، يتقاسمه النادي وسبورتك",
    badge: (n: string) => n + " مشجع نشط بواقع $2.50 شهرياً",
    note: "أرقام توضيحية وفق الافتراضات المذكورة. الحالة الأساسية مقارنة بتفاعل تطبيقات أندية الدوري الإنجليزي بين 12 و20%. ليست توقعات مالية.",
  },

  faq: {
    kicker: "الأسئلة الشائعة",
    h2a: "كل نادٍ ",
    h2v: "يسأل.",
    items: [
      { q: "كم تكلف المنصة النادي؟", a: "لا شيء. نحن نصمم ونبني ونشغّل ونموّل المنصة بالكامل. وناديك يكسب حصة متفقاً عليها من كل عملية منذ اليوم الأول للإطلاق." },
      { q: "ما سرعة الإطلاق؟", a: "تطبيق بهوية ناديك يكون جاهزاً عادة خلال أسابيع. مصادر الدخل الأساسية تنطلق مع الإطلاق، وتكتمل الوحدات الاثنتا عشرة خلال سنتك الأولى." },
      { q: "هل توقعات المباريات شكل من المراهنة؟", a: "لا. التوقعات ترفيه قائم على المهارة بنقاط المنصة. لا تُراهن أي أموال حقيقية، ومحفظة المشجع نظام مغلق يعمل كبرنامج ولاء." },
      { q: "من يشغّل المدفوعات والتذاكر والدعم؟", a: "سبورتك تدير المنظومة كاملة من طرف إلى طرف عبر بنية API معيارية، متكاملة مع مزودي الدفع والتذاكر الإقليميين." },
      { q: "أين تُخزَّن بيانات الجماهير؟", a: "داخل المنطقة، في كل سوق، وتحكمها اتفاقية الشراكة، مع تحقق هوية متدرج مدمج." },
      { q: "كيف تُهيكل حصة الإيرادات؟", a: "لكل شراكة على حدة. وتُحدد الشروط التجارية الكاملة في الاتفاقية." },
    ],
  },

  news: {
    kicker: "الإعلانات",
    h2a: "على السجل ",
    h2v: "الرسمي.",
    items: [
      { d: "أكتوبر 2026", t: "توقيع شراكة مع نادي كرة قدم سعودي من الدرجة الأولى؛ التفعيل في الربع الرابع 2026", c: "شراكة" },
      { d: "أغسطس 2026", t: "سبورتك تكمل التحول إلى شركة مساهمة مبسطة", c: "مؤسسي" },
      { d: "مارس 2026", t: "منح براءة اختراع كاميرا اللاعب POV في السعودية؛ وطلبات PCT جارية", c: "تقنية" },
    ],
  },

  cta: {
    h2a: "حوّل الجماهير إلى ",
    h2v: "إيرادات.",
    sub: "جولة خاصة بأرقام ناديك، مع فريق الشراكات لدينا.",
    subAlt: "جولة خاصة بأرقام ناديك. لا عروض تقديمية، منتج حي.",
  },

  footer: {
    brandP: "محرك إيرادات الجماهير لأندية الرياضة. تقنية سعودية، صُنعت في الرياض، وصُممت للعالم.",
    legalLine: "سبورتك شركة مساهمة مبسطة مسجلة في الرياض، المملكة العربية السعودية. سجل تجاري 1009177946.",
    platformH: "المنصة",
    links: ["الإثباتات", "المحركات الاثنا عشر", "محاكي الإيرادات", "الأسئلة الشائعة"],
    contactH: "تواصل",
    riyadh: "الرياض، المملكة العربية السعودية",
    followH: "تابعنا",
    copyright: "© 2026 سبورتك. جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    refund: "سياسة الدفع والاسترداد",
    terms: "شروط الاستخدام",
  },
};

export const V2_COPY: Record<Lang, V2Copy> = { en, ar };
