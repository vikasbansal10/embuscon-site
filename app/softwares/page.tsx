import type { Metadata } from "next";
import React from "react";
import ParallaxHeader from "@/components/parallaxHeader";
import { Reveal, MotionCard } from "@/components/anim";
import {
  Code2,
  LayoutGrid,
  Workflow,
  ShieldCheck,
  Layers,
  PlugZap,
  FileScan,
  Cloud,
  GaugeCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Softwares | Embuscon",
  description:
    "High-code and low-code application delivery: OutSystems, Appian, Mendix; enterprise integration & automation (iPaaS), document AI/IDP (LandingAI-style), QA, DevSecOps, and managed services.",
};

interface Service {
  title: string;
  icon: React.ElementType;
  blurb: string;
  bullets: string[];
}

const services: Service[] = [
  {
    title: "Application Engineering (High-Code)",
    icon: Code2,
    blurb:
      "Modern full-stack software engineering with clean architecture, scalable APIs, and enterprise-grade quality.",
    bullets: [
      "Web apps, portals, and internal enterprise tools",
      "API-first design, integration patterns, and microservices where needed",
      "Security, performance, resiliency, and observability baked in",
      "CI/CD, automated testing, and release governance",
    ],
  },
  {
    title: "Low-Code Platforms (OutSystems / Appian / Mendix)",
    icon: LayoutGrid,
    blurb:
      "Accelerate delivery using low-code—without sacrificing governance, maintainability, or enterprise controls.",
    bullets: [
      "Platform selection: fitment, licensing, and reference architecture",
      "Reusable component libraries, design systems, and guardrails",
      "Integration with IAM, ERP/CRM, and core enterprise systems",
      "Performance hardening, testing automation, and release controls",
    ],
  },
  {
    title: "Workflow Automation & BPM",
    icon: Workflow,
    blurb:
      "Digitize processes end-to-end using BPM and workflow engines—improving speed, compliance, and traceability.",
    bullets: [
      "Process discovery → blueprint → automation roadmap",
      "Approvals, SLA tracking, escalations, and audit trails",
      "Document + workflow orchestration (forms, e-sign, notifications)",
      "Operational dashboards for throughput and bottleneck visibility",
    ],
  },
  {
    title: "Enterprise Integration (iPaaS / UnifyApps-style)",
    icon: PlugZap,
    blurb:
      "Connect applications and data quickly using integration accelerators and managed connectors—reducing point-to-point sprawl.",
    bullets: [
      "Integration patterns: API gateway, event-driven, orchestration",
      "Prebuilt connectors and reusable integration templates",
      "Data sync, master data touchpoints, and error handling patterns",
      "Governance: versioning, access, monitoring, and cost controls",
    ],
  },
  {
    title: "Document AI / IDP Solutions (LandingAI-style)",
    icon: FileScan,
    blurb:
      "Automate document-heavy operations using intelligent document processing with structured outputs and validations.",
    bullets: [
      "Document classification, extraction, validation, and workflow handoff",
      "Human-in-the-loop review patterns for accuracy and compliance",
      "PII handling, redaction controls, and audit-ready evidence",
      "Integration into ERP/CRM, case management, and ticketing systems",
    ],
  },
  {
    title: "Cloud-Native Delivery & Modernization",
    icon: Cloud,
    blurb:
      "Modernize legacy apps toward cloud-native patterns—balancing cost, risk, and delivery speed.",
    bullets: [
      "Rehost / refactor / re-architect decisioning and roadmaps",
      "Containerization and platform engineering patterns",
      "Secrets management, network/security posture alignment",
      "Operational readiness: monitoring, alerting, and SRE practices",
    ],
  },
  {
    title: "Quality Engineering (QE) & Test Automation",
    icon: GaugeCircle,
    blurb:
      "Make quality continuous—test strategy, automation, and non-functional validation integrated into delivery.",
    bullets: [
      "Test strategy: unit/integration/e2e and test data management",
      "Automation frameworks and CI gating",
      "Security testing, performance testing, resiliency testing",
      "Defect analytics and quality dashboards",
    ],
  },
  {
    title: "App Security & Governance (DevSecOps)",
    icon: Layers,
    blurb:
      "Secure software delivery with policy-driven controls, review gates, and compliance-ready evidence.",
    bullets: [
      "Secure SDLC and code review guardrails",
      "Dependency scanning and supply chain security practices",
      "Environment governance, secrets, and access controls",
      "Audit trails, change control, and compliance mapping",
    ],
  },
];

export default function SoftwaresPage() {
  return (
    <div className="container-px max-w-6xl mx-auto py-12 space-y-12">
      {/* Hero */}
      <ParallaxHeader
        title="Softwares"
        subtitle="High-code engineering, low-code acceleration, integration automation, and document AI—delivered with enterprise controls."
        imageSrc="/images/services-hero.jpg" // reuse for now
        heightClass="h-[34vh] md:h-[42vh] lg:h-[50vh]"
        className="mb-6"
      />

      {/* Intro */}
      <Reveal>
        <header>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-primary">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            Softwares
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Build and modernize applications—fast, secure, and maintainable
          </h1>
          <p className="mt-3 max-w-3xl text-neutral-700 dark:text-neutral-300">
            Embuscon delivers software solutions across high-code and low-code stacks, with strong
            governance, automation, and operational readiness. Whether you’re modernizing core apps
            or launching new digital products, we help you ship with confidence.
          </p>
        </header>
      </Reveal>

      {/* At-a-glance */}
      <Reveal className="grid sm:grid-cols-3 gap-3">
        {[
          { t: "High-code + Low-code", d: "Choose the right path per use case—speed with control." },
          { t: "Integration-ready", d: "APIs, events, and connectors that scale across the enterprise." },
          { t: "Quality + Security", d: "DevSecOps and QE baked into delivery, not bolted on." },
        ].map((x, i) => (
          <MotionCard
            key={x.t}
            delay={i * 0.06}
            className="rounded-xl border border-brand-border bg-brand-card p-4"
          >
            <p className="text-sm font-semibold">{x.t}</p>
            <p className="text-sm opacity-80">{x.d}</p>
          </MotionCard>
        ))}
      </Reveal>

      {/* Services grid */}
      <Reveal className="grid md:grid-cols-2 gap-6">
        {services.map(({ title, blurb, bullets, icon: Icon }, i) => (
          <MotionCard
            key={title}
            delay={i * 0.05}
            className="p-6 bg-white/70 dark:bg-neutral-900/60 rounded-2xl border border-brand-border"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl border border-brand-border bg-brand-muted flex items-center justify-center">
                <Icon className="h-5 w-5 opacity-80" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {blurb}
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 mt-0.5 opacity-70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </MotionCard>
        ))}
      </Reveal>

      {/* Delivery model */}
      <Reveal>
        <h2 className="text-xl md:text-2xl font-semibold">How we deliver software</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {[
            {
              t: "Discover",
              d: "Clarify the problem, users, constraints, and success metrics. Decide high-code vs low-code fit.",
            },
            {
              t: "Design",
              d: "Architecture, integration patterns, security controls, and delivery plan with clear ownership.",
            },
            {
              t: "Build",
              d: "Iterative delivery with automation, testing, and measurable milestones. Early demos and feedback loops.",
            },
            {
              t: "Operate",
              d: "Release governance, monitoring, incident handling, and playbooks for long-term maintainability.",
            },
          ].map((x, i) => (
            <MotionCard
              key={x.t}
              delay={i * 0.07}
              className="rounded-2xl border border-brand-border bg-brand-card p-6"
            >
              <p className="font-semibold">{x.t}</p>
              <p className="mt-2 text-sm opacity-90">{x.d}</p>
            </MotionCard>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="text-center">
        <MotionCard className="p-8 rounded-2xl border border-brand-border bg-brand-card">
          <h3 className="text-xl font-semibold">Need to ship software faster—without compromising controls?</h3>
          <p className="opacity-90 mt-2">
            Tell us your objectives. We’ll propose the best-fit approach across high-code, low-code,
            integration automation, and document AI.
          </p>
          <a href="/contact" className="mt-6 inline-flex items-center gap-2 btn-primary rounded-xl">
            Discuss Your Requirement →
          </a>
        </MotionCard>
      </Reveal>
    </div>
  );
}
