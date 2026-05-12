import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import stadiumImg from "@/assets/goat-stadium.jpeg";
import moonImg from "@/assets/goat-moon.jpeg";
import logoImg from "@/assets/goat-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE LAST GOAT | Final Football Legends on Solana" },
      { name: "description", content: "The Final Era of Football Legends Lives Forever on Solana. A community-driven meme project celebrating Ronaldo, Messi, and the end of an era." },
      { property: "og:title", content: "THE LAST GOAT | Final Football Legends on Solana" },
      { property: "og:description", content: "The Final Era of Football Legends Lives Forever on Solana." },
      { property: "og:image", content: "/goat-logo.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "THE LAST GOAT",
          url: "https://thelastgoat.app",
          description: "Football-inspired Solana meme project celebrating Ronaldo & Messi's final era.",
        }),
      },
    ],
  }),
  component: Index,
});

const CONTRACT = "DSsHRuoBEYkbKHhMfG2Y8ZswEPjVQepHQWgGLTwJpump";
const BUY_URL = `http://pump.fun/coin/${CONTRACT}`;

/* --------------------------- Atmosphere --------------------------- */

function Particles({ count = 40, className = "" }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count });
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((_, i) => {
        const size = 1 + Math.random() * 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = 5 + Math.random() * 8;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/70 animate-float-particle"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              boxShadow: "0 0 10px oklch(0.82 0.15 85 / 0.8)",
            }}
          />
        );
      })}
    </div>
  );
}

function StadiumLights() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-gold/20 blur-[120px] animate-glow-pulse" />
      <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-glow/15 blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-cinematic-orange/10 blur-[140px]" />
    </div>
  );
}

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full bg-gold/10 blur-[100px] transition-transform duration-300 ease-out"
    />
  );
}

/* --------------------------- Loading screen --------------------------- */

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <StadiumLights />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-gold/30" />
          <div className="absolute -inset-4 rounded-full bg-gold/10 blur-2xl animate-glow-pulse" />
          <img src={logoImg} alt="THE LAST GOAT" width={140} height={140} className="relative h-32 w-32 object-contain drop-shadow-[0_0_30px_oklch(0.82_0.15_85/0.6)]" />
        </div>
        <div className="font-display text-2xl tracking-[0.3em] text-gold animate-stadium-pulse">LOADING LEGACY</div>
      </div>
    </div>
  );
}

/* --------------------------- Navbar --------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"],
    ["Tokenomics", "#tokenomics"],
    ["Roadmap", "#roadmap"],
    ["Token", "#token"],
    ["Gallery", "#gallery"],
    ["Community", "#community"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-gold/15 bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoImg} alt="The Last Goat" width={44} height={44} className="h-11 w-11 object-contain drop-shadow-[0_0_12px_oklch(0.82_0.15_85/0.6)]" />
          <span className="font-display text-xl tracking-[0.25em] text-gold hidden sm:inline">THE LAST GOAT</span>
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map(([l, h]) => (
            <li key={l}>
              <a href={h} className="font-body text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-gold">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex relative overflow-hidden rounded-full bg-gradient-gold px-5 py-2.5 font-display text-sm tracking-widest text-primary-foreground shadow-gold transition-transform hover:scale-105">
            <span className="relative z-10">CONNECT WALLET</span>
            <span className="absolute inset-0 animate-scan-light bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-gold" aria-label="Menu">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col gap-1 p-4">
            {links.map(([l, h]) => (
              <li key={l}>
                <a href={h} onClick={() => setOpen(false)} className="block px-4 py-3 font-display text-lg tracking-widest text-foreground hover:text-gold">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* --------------------------- Hero --------------------------- */

function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={stadiumImg} alt="Ronaldo and Messi walking together in the stadium" className="absolute inset-0 h-full w-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.05_0.01_60/0.85)_100%)]" />
      </div>
      <StadiumLights />
      <Particles count={50} />

      {/* fog */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-background/50 px-5 py-2 backdrop-blur-md animate-rise">
          <span className="h-2 w-2 rounded-full bg-emerald-glow animate-stadium-pulse" />
          <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Live on Solana · Fair Launch</span>
        </div>

        <h1 className="font-display text-[18vw] sm:text-[15vw] md:text-[11rem] lg:text-[14rem] leading-[0.85] tracking-[0.02em] animate-rise">
          <span className="block text-gradient-gold text-glow-gold">THE LAST</span>
          <span className="block text-gradient-gold text-glow-gold -mt-2 sm:-mt-4">GOAT</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground animate-rise" style={{ animationDelay: "0.2s" }}>
          The Final Era of Football Legends Lives <span className="text-gold">Forever</span> on Solana.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-rise" style={{ animationDelay: "0.35s" }}>
          <a href="#token" className="group relative overflow-hidden rounded-full bg-gradient-gold px-8 py-4 font-display text-lg tracking-[0.2em] text-primary-foreground shadow-gold transition-transform hover:scale-[1.04]">
            <span className="relative z-10">BUY $GOAT</span>
            <span className="absolute inset-0 animate-scan-light bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </a>
          <a href="#community" className="rounded-full border border-gold/40 bg-background/30 px-8 py-4 font-display text-lg tracking-[0.2em] text-gold backdrop-blur-md transition-all hover:border-gold hover:bg-gold/10">
            JOIN COMMUNITY
          </a>
        </div>

        {/* Live stats */}
        <div className="mt-16 grid w-full max-w-5xl grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 animate-rise" style={{ animationDelay: "0.5s" }}>
          {[
            ["Holders", "12,847"],
            ["Market Cap", "$4.2M"],
            ["Supply", "1B"],
            ["Community", "38K+"],
          ].map(([label, value]) => (
            <div key={label} className="glass-gold rounded-2xl px-4 py-5 text-left">
              <div className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
              <div className="mt-1 font-display text-3xl sm:text-4xl text-gradient-gold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll the Legacy</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-gold/60 to-transparent animate-stadium-pulse" />
      </div>
    </section>
  );
}

/* --------------------------- Marquee --------------------------- */

function LegacyMarquee() {
  const items = ["LEGENDS NEVER RETIRE", "★", "RONALDO × MESSI", "★", "FINAL ERA", "★", "BUILT ON SOLANA", "★", "THE LAST GOAT", "★"];
  return (
    <div className="relative border-y border-gold/15 bg-background/60 py-6 overflow-hidden">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} className="font-display text-3xl tracking-[0.3em] text-gold/70">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- About --------------------------- */

function About() {
  return (
    <section id="about" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <img src={moonImg} alt="Ronaldo and Messi sitting together facing Earth from the moon" className="absolute inset-0 h-full w-full object-cover opacity-50 animate-drift-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </div>
      <Particles count={60} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="font-body text-xs uppercase tracking-[0.3em] text-emerald-glow">Chapter 01 · The Story</span>
          <h2 className="mt-4 font-display text-6xl md:text-7xl leading-none text-gradient-gold text-glow-gold">
            END OF AN<br/>ERA.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            <span className="text-foreground font-semibold">THE LAST GOAT</span> is a community-driven crypto project inspired by the final World Cup era of football legends Cristiano Ronaldo and Lionel Messi.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Built for football fans and meme culture, THE LAST GOAT celebrates legacy, rivalry, and the end of an iconic generation on the world's biggest stage.
          </p>

          <div className="mt-10 relative inline-block">
            <div className="absolute -inset-4 bg-gold/15 blur-2xl animate-glow-pulse" />
            <blockquote className="relative font-display text-4xl md:text-5xl tracking-wide text-gradient-gold">
              "Legends Never Retire."
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { t: "Legacy", d: "Two decades of greatness, immortalized on-chain." },
            { t: "Rivalry", d: "The greatest sporting duel ever told." },
            { t: "Brotherhood", d: "Respect transcends every scoreboard." },
            { t: "Forever", d: "Their story belongs to the world — and to you." },
          ].map((c) => (
            <div key={c.t} className="glass-gold group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-gold hover:-translate-y-1">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
              </div>
              <div className="relative">
                <div className="font-display text-3xl text-gold">{c.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Tokenomics --------------------------- */

function Tokenomics() {
  const cards = [
    { title: "Total Supply", value: "1,000,000,000", note: "$GOAT minted forever" },
    { title: "Fair Launch", value: "100%", note: "No presale. No insiders." },
    { title: "Liquidity", value: "Locked", note: "Forever burned" },
    { title: "Community", value: "Driven", note: "By the fans, for the fans" },
    { title: "Network", value: "Solana", note: "Lightning fast & cheap" },
    { title: "Energy", value: "Meme", note: "Pure cinematic chaos" },
  ];
  return (
    <section id="tokenomics" className="relative overflow-hidden py-32">
      <StadiumLights />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-emerald-glow">Chapter 02 · The Rules</span>
          <h2 className="mt-4 font-display text-6xl md:text-7xl text-gradient-gold text-glow-gold">TOKENOMICS</h2>
          <p className="mt-4 text-muted-foreground">Six pillars. One legendary launch.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.title} className="group relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-background to-secondary p-8 transition-all hover:border-gold hover:shadow-gold hover:-translate-y-2">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="absolute inset-0 animate-scan-light bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              </div>
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">{c.title}</div>
                  <div className="mt-2 font-display text-4xl md:text-5xl text-gradient-gold">{c.value}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
                </div>
                <div className="font-display text-5xl text-gold/15">0{i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Roadmap (bracket) --------------------------- */

function Roadmap() {
  const phases = [
    { p: "PHASE 01", t: "Group Stage", items: ["Launch on Solana", "Viral memes", "Community building", "Social growth"] },
    { p: "PHASE 02", t: "Knockout Round", items: ["Influencer campaigns", "Football collaborations", "Trending push", "Marketing expansion"] },
    { p: "PHASE 03", t: "The Final", items: ["NFT collectibles", "Community events", "Global expansion", "Legendary status"] },
  ];
  return (
    <section id="roadmap" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-stadium" />
      <Particles count={30} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-emerald-glow">Chapter 03 · The Tournament</span>
          <h2 className="mt-4 font-display text-6xl md:text-7xl text-gradient-gold text-glow-gold">THE BRACKET</h2>
        </div>

        <div className="relative mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* connector lines */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />
          {phases.map((ph, i) => (
            <div key={ph.p} className="group relative">
              <div className="glass-gold relative overflow-hidden rounded-3xl p-8 transition-transform hover:-translate-y-2">
                <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-background/60 font-display text-xl text-gold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{ph.p}</div>
                      <div className="font-display text-2xl text-gold">{ph.t}</div>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {ph.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-glow shadow-emerald flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* trophy icon for finale */}
              {i === 2 && (
                <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 text-5xl drop-shadow-[0_0_20px_oklch(0.82_0.15_85/0.6)]">🏆</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Token / Contract --------------------------- */

function TokenSection() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <section id="token" className="relative overflow-hidden py-32">
      <StadiumLights />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <span className="font-body text-xs uppercase tracking-[0.3em] text-emerald-glow">Chapter 04 · The Contract</span>
        <h2 className="mt-4 font-display text-6xl md:text-7xl text-gradient-gold text-glow-gold">$GOAT TOKEN</h2>
        <p className="mt-4 text-muted-foreground">Verified contract. Open liquidity. Pure legacy.</p>

        <div className="mt-12 relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold via-emerald-glow to-gold opacity-60 blur-md animate-glow-pulse" />
          <div className="relative flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-gold/40 bg-background/80 p-3 backdrop-blur-xl">
            <code className="flex-1 truncate text-left font-mono text-sm md:text-base text-gold px-4">{CONTRACT}</code>
            <button onClick={copy} className="rounded-xl bg-gradient-gold px-5 py-3 font-display text-sm tracking-widest text-primary-foreground shadow-gold transition-transform hover:scale-105">
              {copied ? "COPIED ✓" : "COPY"}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            ["Pump.fun", BUY_URL],
            ["Solscan", `https://solscan.io/token/${CONTRACT}`],
            ["Jupiter", `https://jup.ag/swap/SOL-${CONTRACT}`],
          ].map(([n, h]) => (
            <a key={n} href={h} target="_blank" rel="noopener noreferrer"
              className="group rounded-full border border-gold/30 bg-background/50 px-6 py-3 font-display text-sm tracking-widest text-gold backdrop-blur-md transition-all hover:border-gold hover:bg-gold/10 hover:shadow-gold">
              {n} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Gallery --------------------------- */

function Gallery() {
  const items = [
    { src: stadiumImg, alt: "Ronaldo and Messi walking", span: "md:col-span-2 md:row-span-2" },
    { src: moonImg, alt: "Ronaldo and Messi on the moon", span: "md:col-span-2" },
    { src: logoImg, alt: "The Last Goat logo", span: "" },
    { src: stadiumImg, alt: "Stadium walk", span: "" },
    { src: moonImg, alt: "Moon scene", span: "md:col-span-2" },
  ];
  return (
    <section id="gallery" className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-emerald-glow">Chapter 05 · The Frames</span>
          <h2 className="mt-4 font-display text-6xl md:text-7xl text-gradient-gold text-glow-gold">CINEMATIC GALLERY</h2>
        </div>

        <div className="mt-16 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[220px]">
          {items.map((it, i) => (
            <figure key={i} className={`group relative overflow-hidden rounded-2xl border border-gold/20 ${it.span}`}>
              <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 ring-0 ring-gold/0 group-hover:ring-2 group-hover:ring-gold/60 group-hover:shadow-gold transition-all rounded-2xl" />
              <figcaption className="absolute bottom-3 left-4 font-display text-sm tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                {it.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Community --------------------------- */

function Community() {
  return (
    <section id="community" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-stadium" />
      <StadiumLights />
      <Particles count={40} />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <span className="font-body text-xs uppercase tracking-[0.3em] text-emerald-glow">Chapter 06 · The Crowd</span>
        <h2 className="mt-4 font-display text-6xl md:text-7xl text-gradient-gold text-glow-gold">JOIN THE LEGACY</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">38,000+ believers. One global stadium. Step inside.</p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { name: "Twitter / X", handle: "@TheLastGoatSol", count: "24.5K", url: "https://x.com/TheLastGoatSol", icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8"><path d="M18.244 2H21l-6.52 7.45L22 22h-6.78l-4.93-6.56L4.6 22H1.84l6.96-7.95L1.5 2h6.96l4.46 5.96L18.244 2zm-2.38 18h1.5L7.4 4H5.84l10.024 16z"/></svg>
            ) },
            { name: "Telegram", handle: "@TheLastGoatSoL", count: "13.8K", url: "https://t.me/TheLastGoatSoL", icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
            ) },
          ].map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className="glass-gold group relative overflow-hidden rounded-3xl p-8 text-left transition-all hover:-translate-y-2 hover:shadow-gold">
              <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/30 transition-colors" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <span className="absolute inset-0 animate-scan-light bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              </span>
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 text-gold">{s.icon}<span className="font-display text-2xl">{s.name}</span></div>
                  <div className="mt-2 font-body text-sm text-muted-foreground">{s.handle}</div>
                  <div className="mt-6 font-display text-5xl text-gradient-gold">{s.count}</div>
                  <div className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">Members</div>
                </div>
                <div className="text-gold text-3xl group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Footer --------------------------- */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-background py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-gold/15 blur-3xl animate-glow-pulse" />
        <div className="absolute -top-32 right-1/4 h-64 w-64 rounded-full bg-emerald-glow/10 blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="The Last Goat" width={48} height={48} className="h-12 w-12 object-contain" />
          <div>
            <div className="font-display text-xl tracking-[0.2em] text-gold">THE LAST GOAT</div>
            <div className="font-body text-xs text-muted-foreground">Built on Solana</div>
          </div>
        </div>
        <ul className="flex flex-wrap justify-center gap-6">
          {[["About","#about"],["Tokenomics","#tokenomics"],["Roadmap","#roadmap"],["Token","#token"],["Community","#community"]].map(([l,h]) => (
            <li key={l}><a href={h} className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors">{l}</a></li>
          ))}
        </ul>
        <div className="flex gap-3">
          <a href="https://x.com/TheLastGoatSol" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-all">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M18.244 2H21l-6.52 7.45L22 22h-6.78l-4.93-6.56L4.6 22H1.84l6.96-7.95L1.5 2h6.96l4.46 5.96L18.244 2z"/></svg>
          </a>
          <a href="https://t.me/TheLastGoatSoL" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-all">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
          </a>
        </div>
      </div>
      <div className="relative mx-auto mt-8 max-w-7xl px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} · THE LAST GOAT · Built on Solana
        </p>
      </div>
    </footer>
  );
}

/* --------------------------- Floating BUY --------------------------- */

function FloatingBuy() {
  return (
    <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 group">
      <span className="absolute -inset-2 rounded-full bg-gold/40 blur-xl animate-glow-pulse" />
      <span className="relative flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-4 font-display text-sm tracking-[0.2em] text-primary-foreground shadow-gold transition-transform group-hover:scale-110">
        BUY $GOAT
        <span className="text-lg">⚽</span>
      </span>
    </a>
  );
}

/* --------------------------- Page --------------------------- */

function Index() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <LoadingScreen done={loaded} />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <LegacyMarquee />
        <About />
        <Tokenomics />
        <Roadmap />
        <TokenSection />
        <Gallery />
        <Community />
      </main>
      <Footer />
      <FloatingBuy />
    </div>
  );
}
