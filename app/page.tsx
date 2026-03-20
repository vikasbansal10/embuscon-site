// app/page.tsx
import Link from "next/link";
import { HeroTypewriter } from "@/components/HeroTypewriter";
import { MotionCard } from "@/components/anim";

/* ─── Tech logo strip data ───────────────────────────────── */
const TECH_LOGOS = [
  { name: "Microsoft Azure",  abbr: "Azure",       color: "#0078D4" },
  { name: "LangChain",        abbr: "LangChain",   color: "#1C7B4B" },
  { name: "CrewAI",           abbr: "CrewAI",      color: "#3ABFBF" },
  { name: "AutoGen",          abbr: "AutoGen",     color: "#7B61FF" },
  { name: "OutSystems",       abbr: "OutSystems",  color: "#E2202F" },
  { name: "Appian",           abbr: "Appian",      color: "#0066CC" },
  { name: "Mendix",           abbr: "Mendix",      color: "#0F3050" },
  { name: "Cisco",            abbr: "Cisco",       color: "#049FD9" },
  { name: "Palo Alto",        abbr: "Palo Alto",   color: "#FA582D" },
  { name: "OpenAI",           abbr: "OpenAI",      color: "#10A37F" },
];

/* ─── Bento service cards data ───────────────────────────── */
const SERVICES = [
  {
    title: "Enterprise AI & Agentic Systems",
    blurb:
      "Governed, multi-agent AI — from data foundations to production-ready automation. CrewAI · LangChain · AutoGen · LLMOps.",
    tags: ["Agentic AI", "LLMOps", "RAG", "Responsible AI"],
    href: "/ai",
    featured: true,
  },
  {
    title: "Secure Hybrid Cloud & Network",
    blurb:
      "Zero Trust, SD-WAN, Wi-Fi 6E, and AI-ready infrastructure across cloud, on-prem, and edge.",
    tags: ["SD-WAN", "SASE", "Zero Trust"],
    href: "/networks",
    featured: false,
  },
  {
    title: "Data & Digital Core Modernization",
    blurb:
      "Azure-native medallion architectures and federated governance for AI-ready decision ecosystems.",
    tags: ["Azure", "Medallion", "Governance"],
    href: "/services",
    featured: false,
  },
  {
    title: "Enterprise Software & Platform Engineering",
    blurb:
      "Cloud-native, microservices-based platforms built with DevSecOps — high-code, low-code, or hybrid.",
    tags: ["DevSecOps", "Low-Code", "iPaaS"],
    href: "/softwares",
    featured: false,
  },
];

export default function HomePage() {
  // Duplicate logos for seamless marquee loop
  const marqueeItems = [...TECH_LOGOS, ...TECH_LOGOS];

  // Destructure to avoid TS strict index-access "possibly undefined" errors
  const [aiService, networkService, dataService, softwareService] = SERVICES as [
    typeof SERVICES[number],
    typeof SERVICES[number],
    typeof SERVICES[number],
    typeof SERVICES[number],
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-neutral-950">
        {/* Aurora blobs */}
        <div className="aurora-1 absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-brand-primary/25 blur-[130px] pointer-events-none" aria-hidden />
        <div className="aurora-2 absolute -top-20 right-0 w-[550px] h-[550px] rounded-full bg-teal-400/15 blur-[110px] pointer-events-none" aria-hidden />
        <div className="aurora-3 absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" aria-hidden />

        <div className="relative z-10 max-w-6xl mx-auto container-px py-20 sm:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left — headline + CTAs */}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                AI-First Consulting
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Empowering Business<br />
                <span className="text-white/50">to </span>
                <HeroTypewriter />
              </h1>

              <p className="mt-5 text-base text-white/65 max-w-lg leading-relaxed">
                Engineering-led consultancy helping enterprises modernize platforms,
                govern AI, and ship outcomes that last.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="mailto:contactus@embuscon.com" className="btn-primary rounded-xl">
                  Start a Conversation
                </Link>
                <Link
                  href="/services"
                  className="btn rounded-xl border border-white/20 text-white hover:bg-white/10"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Right — glass highlights card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-white shadow-soft">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                What sets us apart
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "AI-Ready Digital Infrastructure",       sub: "Governed, observable, enterprise-grade" },
                  { label: "Industry-Led Transformation",           sub: "Senior pods · Clear SLAs · Measurable KPIs" },
                  { label: "Agentic AI with Governance by Design",  sub: "CrewAI · LangChain · AutoGen · Responsible AI" },
                  { label: "Enterprise Data Modernization",         sub: "Azure-native medallion · Federated governance" },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white/90">{item.label}</p>
                      <p className="text-xs text-white/45 mt-0.5">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY LOGO STRIP ────────────────────────────── */}
      <section className="border-y border-brand-border bg-brand-bg py-5 overflow-hidden">
        <p className="text-center text-[11px] uppercase tracking-widest text-brand-fg/30 mb-4">
          Technologies &amp; Platforms we work with
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track gap-8 px-4">
            {marqueeItems.map((logo, i) => (
              <span
                key={`${logo.abbr}-${i}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-card text-sm font-medium text-brand-fg/50 hover:text-brand-fg hover:border-brand-primary/40 transition-colors duration-200 whitespace-nowrap cursor-default select-none"
              >
                {/* Coloured dot as logo stand-in */}
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: logo.color }}
                />
                {logo.abbr}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID — What We Do ──────────────────────────── */}
      <section className="bg-brand-muted">
        <div className="max-w-6xl mx-auto container-px py-14">
          <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
          <p className="text-sm text-brand-fg/55 mb-8">
            Four practice areas — one integrated delivery model.
          </p>

          {/*
            Bento layout (lg, 3-col grid):
              Row 1: [AI — col-span-2] [Network — col-span-1]
              Row 2: [Data — col-span-1] [Software — col-span-2]
          */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Card 1 — Featured: AI (col-span-2) */}
            <MotionCard
              delay={0}
              className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-brand-primary/30 bg-brand-card p-7 flex flex-col justify-between min-h-[220px] group"
            >
              {/* Subtle gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative">
                <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-brand-primary mb-3">
                  Featured Practice
                </span>
                <h3 className="text-xl font-bold">{aiService.title}</h3>
                <p className="mt-2 text-sm text-brand-fg/60 max-w-md leading-relaxed">
                  {aiService.blurb}
                </p>
              </div>

              <div className="relative mt-5 flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {aiService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-brand-primary/15 text-brand-primary font-medium border border-brand-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={aiService.href}
                  className="text-xs font-medium text-brand-primary hover:underline underline-offset-4 whitespace-nowrap flex-shrink-0"
                >
                  Learn more →
                </Link>
              </div>
            </MotionCard>

            {/* Card 2 — Network (col-span-1) */}
            <MotionCard
              delay={0.08}
              className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-6 flex flex-col justify-between min-h-[220px] group hover:border-brand-primary/30 transition-colors duration-300"
            >
              <div>
                <h3 className="text-base font-bold">{networkService.title}</h3>
                <p className="mt-2 text-sm text-brand-fg/55 leading-relaxed">
                  {networkService.blurb}
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {networkService.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-brand-muted text-brand-fg/50 border border-brand-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={networkService.href} className="text-xs font-medium text-brand-primary hover:underline underline-offset-4 whitespace-nowrap flex-shrink-0">
                  Learn more →
                </Link>
              </div>
            </MotionCard>

            {/* Card 3 — Data (col-span-1) */}
            <MotionCard
              delay={0.14}
              className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-6 flex flex-col justify-between min-h-[200px] group hover:border-brand-primary/30 transition-colors duration-300"
            >
              <div>
                <h3 className="text-base font-bold">{dataService.title}</h3>
                <p className="mt-2 text-sm text-brand-fg/55 leading-relaxed">
                  {dataService.blurb}
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {dataService.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-brand-muted text-brand-fg/50 border border-brand-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={dataService.href} className="text-xs font-medium text-brand-primary hover:underline underline-offset-4 whitespace-nowrap flex-shrink-0">
                  Learn more →
                </Link>
              </div>
            </MotionCard>

            {/* Card 4 — Software (col-span-2) */}
            <MotionCard
              delay={0.2}
              className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-6 flex flex-col justify-between min-h-[200px] group hover:border-brand-primary/30 transition-colors duration-300"
            >
              <div>
                <h3 className="text-base font-bold">{softwareService.title}</h3>
                <p className="mt-2 text-sm text-brand-fg/55 leading-relaxed max-w-xl">
                  {softwareService.blurb}
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {softwareService.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-brand-muted text-brand-fg/50 border border-brand-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={softwareService.href} className="text-xs font-medium text-brand-primary hover:underline underline-offset-4 whitespace-nowrap flex-shrink-0">
                  Learn more →
                </Link>
              </div>
            </MotionCard>

          </div>
        </div>
      </section>
    </>
  );
}
