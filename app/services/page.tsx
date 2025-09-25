// app/services/page.tsx
import type { Metadata } from "next";
import {
  Database,
  Boxes,
  Workflow,
  Cpu,
  Scale,
  FileText,
  ShieldCheck,
  GaugeCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Embuscon",
  description:
    "Data Platform Modernization, Agentic AI Prototypes, Program & Delivery Management, Advisory & GTM, Software Development & Testing, and Contract & Legal Consulting.",
};

type ServiceItem = {
  title: string;
  icon: React.ElementType;
  blurb: string;
  bullets: string[];
};

const services: ServiceItem[] = [
  {
    title: "Data Platform Modernization",
    icon: Database,
    blurb:
      "Azure-native Medallion architectures with governance-first foundations for reliable analytics and BI.",
    bullets: [
      "ADF + Databricks + Unity Catalog (Bronze–Silver–Gold)",
      "CDC ingestion, DQ rules, lineage, cost observability",
      "Power BI/Fabric dashboards (incl. mobile variants)",
      "Security/RBAC, environments (Dev/UAT/PreProd/Prod)",
    ],
  },
  {
    title: "Program & Delivery Management",
    icon: Boxes,
    blurb:
      "Outcome-led delivery with clear ownership, risk control, and stakeholder alignment across complex programs.",
    bullets: [
      "RAIDD logs, RACI, KPI frameworks",
      "Risk/Dependency management & governance cadences",
      "SOW/vendor orchestration, acceptance criteria",
      "Health reporting, exec readouts, value tracking",
    ],
  },
  {
    title: "Agentic AI Prototypes",
    icon: Cpu,
    blurb:
      "Rapid POCs using multi-agent patterns to validate business value with safety guardrails and evaluation.",
    bullets: [
      "CrewAI / AutoGen / LangChain orchestration",
      "Retrieval-augmented workflows, OCR pipelines",
      "Evaluation harness, guardrails & PII redaction",
      "Deployment patterns and cost controls",
    ],
  },
  {
    title: "Advisory & GTM",
    icon: Workflow,
    blurb:
      "Pragmatic roadmaps, competitive analysis, and packaging for market fit and accelerated adoption.",
    bullets: [
      "Tech strategy, cloud cost models, build-vs-buy",
      "Product positioning, pricing guidance",
      "Partner ecosystems and integrations",
      "Pilot plans & success measures",
    ],
  },
  {
    title: "Software Development & Testing",
    icon: GaugeCircle,
    blurb:
      "Modern engineering with automation and quality baked into every stage of delivery.",
    bullets: [
      "Full-stack builds, APIs, integration patterns",
      "CI/CD, infra-as-code, automated testing",
      "Non-functional: security, performance, resiliency",
      "DevEx enablement, golden paths, playbooks",
    ],
  },
  {
    title: "Contract & Legal Consulting",
    icon: FileText,
    blurb:
      "CLM workflows and negotiation playbooks that protect value while keeping velocity high.",
    bullets: [
      "Clause libraries, fallback positions, approvals",
      "Quality gates & acceptance frameworks",
      "Change control, audit readiness",
      "Risk mitigation & compliance mapping",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto container-px py-12 space-y-12">
      {/* Page header */}
      <header>
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-500">
          <span className="h-2 w-2 rounded-full bg-cyan-500" />
          Our Services
        </span>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          Consulting that ships measurable outcomes
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-700 dark:text-neutral-300">
          From modern data platforms and agentic AI to disciplined delivery and
          airtight contracts, Embuscon aligns technology execution with your
          business goals—safely and fast.
        </p>
      </header>

      {/* At-a-glance bar */}
      <section className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-brand-border bg-brand-card p-4">
          <p className="text-sm font-semibold">Governance-first</p>
          <p className="text-sm opacity-80">
            Security, lineage, cost controls from day one.
          </p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-card p-4">
          <p className="text-sm font-semibold">Senior pods</p>
          <p className="text-sm opacity-80">
            Small teams of builders with clear ownership.
          </p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-card p-4">
          <p className="text-sm font-semibold">Transparent KPIs</p>
          <p className="text-sm opacity-80">Cadences and readouts that stick.</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="grid md:grid-cols-2 gap-6">
        {services.map(({ title, blurb, bullets, icon: Icon }) => (
          <article
            key={title}
            className="card p-6 bg-white/70 dark:bg-neutral-900/60"
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
          </article>
        ))}
      </section>

      {/* How we engage */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">How we engage</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Discovery → Plan",
              d: "Lightweight discovery, options & trade-offs, 30-60-90 plan.",
            },
            {
              t: "Pilot → Scale",
              d: "Start small, measure impact, scale with guardrails.",
            },
            {
              t: "Run → Hand-off",
              d: "Operate with you, document, and hand over playbooks.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-brand-border bg-brand-card p-6"
            >
              <p className="font-semibold">{x.t}</p>
              <p className="mt-2 text-sm opacity-90">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="card p-8">
          <h3 className="text-xl font-semibold">Ready to discuss your use-case?</h3>
          <p className="opacity-90 mt-2">
            Share a business need—we’ll map best-fit options and a fast path to value.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 btn-primary rounded-xl"
          >
            Contact Us →
          </a>
        </div>
      </section>
    </div>
  );
}
