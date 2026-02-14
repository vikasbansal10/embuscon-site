import type { Metadata } from "next";
import React from "react";
import ParallaxHeader from "@/components/parallaxHeader";
import { Reveal, MotionCard } from "@/components/anim";
import { ShieldCheck, Users, Target, Briefcase, Sparkles, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | Embuscon",
  description:
    "Join Embuscon. Build AI-first consulting and delivery capabilities across Artificial Intelligence, Network Services, and Software Engineering.",
};

interface Role {
  title: string;
  location: string;
  type: string; // Full-time / Contract / Part-time
  level: string; // Junior / Mid / Senior / Lead
  summary: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    title: "AI Solutions Architect (Agentic AI / LLM)",
    location: "Remote / India / GCC (as needed)",
    type: "Full-time / Contract",
    level: "Senior / Lead",
    summary:
      "Design enterprise AI solutions from strategy to production: LLM integration, RAG, agentic workflows, and governance.",
    bullets: [
      "Define target architectures for LLM apps, RAG, and orchestration patterns",
      "Build PoCs and MVPs with evaluation, guardrails, and observability",
      "Partner with engineering to productionize: LLMOps, monitoring, cost controls",
      "Work with clients to translate outcomes into delivery roadmaps",
    ],
  },
  {
    title: "Network Consultant (SD-WAN / SASE / Wireless)",
    location: "India (Delhi NCR preferred) / Remote",
    type: "Full-time / Contract",
    level: "Mid / Senior",
    summary:
      "Deliver secure, scalable networks across WAN, campus, and wireless with operable designs and strong documentation.",
    bullets: [
      "SD-WAN designs aligned to SASE/Zero Trust patterns",
      "Wireless planning, surveys, rollout and performance optimization",
      "Campus/LAN switching design, segmentation, and security baseline",
      "Runbooks, monitoring, and handover to operations teams",
    ],
  },
  {
    title: "Full-Stack Engineer (Next.js / TypeScript)",
    location: "Remote / India",
    type: "Full-time / Contract",
    level: "Mid / Senior",
    summary:
      "Build modern web applications with clean architecture, strong UI polish, and production-grade engineering practices.",
    bullets: [
      "Next.js (App Router), React, TypeScript, Tailwind",
      "API design, integration patterns, and data modeling",
      "Quality engineering: testing automation and CI/CD discipline",
      "Security and performance best practices in delivery",
    ],
  },
  {
    title: "Delivery / Program Manager (Tech Programs)",
    location: "India / GCC (as needed)",
    type: "Contract / Part-time",
    level: "Senior",
    summary:
      "Lead cross-functional delivery with clear governance, risk control, and measurable outcomes—especially for transformation programs.",
    bullets: [
      "Create delivery cadence: RAIDD, RACI, and executive readouts",
      "Manage dependencies, vendors, and stakeholder alignment",
      "Define acceptance criteria and quality gates",
      "Ensure value tracking and transparent reporting",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="container-px max-w-6xl mx-auto py-12 space-y-12">
      {/* Hero */}
      <ParallaxHeader
        title="Careers"
        subtitle="Join Embuscon to build AI-first consulting and delivery capabilities with enterprise-grade rigor."
        imageSrc="/images/services-hero.jpg" // reuse for now
        heightClass="h-[34vh] md:h-[42vh] lg:h-[50vh]"
        className="mb-6"
      />

      {/* Intro */}
      <Reveal>
        <header>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-primary">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            Careers at Embuscon
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Build with builders—ship outcomes, not slides
          </h1>
          <p className="mt-3 max-w-3xl text-neutral-700 dark:text-neutral-300">
            We’re assembling small, high-seniority pods across Artificial Intelligence, Network Services,
            and Software Engineering. If you like ownership, clarity, and measurable delivery—let’s talk.
          </p>
        </header>
      </Reveal>

      {/* Values / Why Embuscon */}
      <Reveal className="grid md:grid-cols-3 gap-3">
        {[
          { t: "Ownership", d: "Small teams, clear accountability, and end-to-end delivery." , icon: Target },
          { t: "Quality", d: "Security, governance, and operability built in from day one.", icon: ShieldCheck },
          { t: "Growth", d: "Work across modern stacks: AI, cloud, networks, and product delivery.", icon: Sparkles },
        ].map((x, i) => {
          const Icon = x.icon;
          return (
            <MotionCard
              key={x.t}
              delay={i * 0.06}
              className="rounded-xl border border-brand-border bg-brand-card p-4"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl border border-brand-border bg-brand-muted flex items-center justify-center">
                  <Icon className="h-4 w-4 opacity-80" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{x.t}</p>
                  <p className="text-sm opacity-80">{x.d}</p>
                </div>
              </div>
            </MotionCard>
          );
        })}
      </Reveal>

      {/* Open roles */}
      <Reveal>
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 opacity-80" />
          <h2 className="text-xl md:text-2xl font-semibold">Open roles</h2>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {roles.map((r, i) => (
            <MotionCard
              key={r.title}
              delay={i * 0.05}
              className="p-6 bg-white/70 dark:bg-neutral-900/60 rounded-2xl border border-brand-border"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {r.summary}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg border border-brand-border px-2 py-1 bg-brand-card">
                  {r.location}
                </span>
                <span className="rounded-lg border border-brand-border px-2 py-1 bg-brand-card">
                  {r.type}
                </span>
                <span className="rounded-lg border border-brand-border px-2 py-1 bg-brand-card">
                  {r.level}
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                {r.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 mt-0.5 opacity-70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2">
                <Users className="h-4 w-4 opacity-70" />
                <p className="text-sm opacity-90">
                  Apply via the contact form — mention the role title.
                </p>
              </div>
            </MotionCard>
          ))}
        </div>
      </Reveal>

      {/* How to apply */}
      <Reveal>
        <MotionCard className="p-8 rounded-2xl border border-brand-border bg-brand-card">
          <h3 className="text-xl font-semibold">How to apply</h3>
          <p className="opacity-90 mt-2 max-w-3xl mx-auto">
            Share your profile and a short note on what you’ve built and shipped. Include links to
            GitHub, portfolio, case studies, or deployments where relevant.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/contact" className="inline-flex items-center gap-2 btn-primary rounded-xl">
              <Mail className="h-4 w-4" />
              Apply via Contact →
            </a>
            <a href="/about" className="inline-flex items-center gap-2 btn-outline rounded-xl">
              Learn about Embuscon →
            </a>
          </div>

          <p className="mt-4 text-xs opacity-70 text-center">
            Tip: In the contact message, include: Role title • Location • Notice period • Links • Compensation expectation.
          </p>
        </MotionCard>
      </Reveal>
    </div>
  );
}
