import type { Metadata } from "next";
import React from "react";
import ParallaxHeader from "@/components/parallaxHeader";
import { Reveal, MotionCard } from "@/components/anim";
import {
  Brain,
  Cpu,
  Database,
  ShieldCheck,
  Workflow,
  Bot,
  Sparkles,
  GaugeCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Artificial Intelligence | Embuscon",
  description:
    "AI Strategy, Agentic AI, LLM Integration, Intelligent Automation, Data Foundations, Responsible AI Governance, and Enterprise AI Deployment.",
};

interface Service {
  title: string;
  icon: React.ElementType;
  blurb: string;
  bullets: string[];
}

const services: Service[] = [
  {
    title: "AI Strategy & Roadmap",
    icon: Brain,
    blurb:
      "Define enterprise AI strategy aligned to business outcomes, governance, and long-term scalability.",
    bullets: [
      "AI opportunity assessment & use-case prioritization",
      "AI maturity benchmarking & capability mapping",
      "Build vs buy decisions and ecosystem evaluation",
      "3–6–12 month execution roadmap",
    ],
  },
  {
    title: "Agentic AI & Multi-Agent Systems",
    icon: Bot,
    blurb:
      "Design and deploy multi-agent AI workflows to automate reasoning, orchestration, and enterprise tasks.",
    bullets: [
      "CrewAI / LangChain / AutoGen orchestration patterns",
      "Retrieval-augmented workflows (RAG)",
      "Task delegation & autonomous agent coordination",
      "Evaluation harness & guardrail frameworks",
    ],
  },
  {
    title: "Enterprise LLM Integration",
    icon: Cpu,
    blurb:
      "Integrate LLMs securely into enterprise systems with governance, monitoring, and cost controls.",
    bullets: [
      "Private LLM deployment patterns (cloud/on-prem)",
      "API integration with enterprise systems",
      "Prompt engineering frameworks & traceability",
      "Observability, logging, and cost management",
    ],
  },
  {
    title: "AI Data Foundations",
    icon: Database,
    blurb:
      "Build scalable data foundations required to power AI use-cases reliably and securely.",
    bullets: [
      "Structured & unstructured data ingestion pipelines",
      "Data quality validation & lineage tracking",
      "Vector databases & embeddings infrastructure",
      "Secure data governance & role-based access",
    ],
  },
  {
    title: "Responsible AI & Governance",
    icon: ShieldCheck,
    blurb:
      "Embed governance, compliance, and risk management into every AI deployment.",
    bullets: [
      "AI risk assessment & policy frameworks",
      "Bias monitoring & explainability mechanisms",
      "PII redaction & data protection controls",
      "Audit trails and regulatory readiness",
    ],
  },
  {
    title: "Intelligent Automation",
    icon: Workflow,
    blurb:
      "Combine AI with process automation to reduce manual effort and increase operational velocity.",
    bullets: [
      "Document intelligence & OCR workflows",
      "Decision automation & AI copilots",
      "Integration with ERP/CRM systems",
      "Operational dashboards & performance tracking",
    ],
  },
  {
    title: "AI Prototyping & MVP Delivery",
    icon: Sparkles,
    blurb:
      "Rapid validation of AI ideas through controlled MVP builds and measurable pilot programs.",
    bullets: [
      "Proof-of-concept builds in 4–8 weeks",
      "User feedback loops & iterative refinement",
      "Performance evaluation metrics",
      "Production-readiness roadmap",
    ],
  },
  {
    title: "AI Operations (LLMOps / MLOps)",
    icon: GaugeCircle,
    blurb:
      "Operationalize AI systems with monitoring, versioning, deployment pipelines, and continuous improvement.",
    bullets: [
      "Model lifecycle management",
      "Prompt/version tracking & rollback strategies",
      "Performance monitoring & drift detection",
      "Secure CI/CD pipelines for AI systems",
    ],
  },
];

export default function ArtificialIntelligencePage() {
  return (
    <div className="container-px max-w-6xl mx-auto py-12 space-y-12">
      {/* Hero */}
      <ParallaxHeader
        title="Artificial Intelligence"
        subtitle="Enterprise AI strategy, agentic systems, and responsible deployment—built for measurable business impact."
        imageSrc="/images/services-hero.jpg"
        heightClass="h-[34vh] md:h-[42vh] lg:h-[50vh]"
        className="mb-6"
      />

      {/* Intro */}
      <Reveal>
        <header>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-primary">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            Artificial Intelligence
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            AI systems designed for scale, security, and measurable value
          </h1>
          <p className="mt-3 max-w-3xl text-neutral-700 dark:text-neutral-300">
            Embuscon helps enterprises move beyond experimentation—designing,
            building, and operating AI systems that are governed, secure, and aligned to
            real business outcomes.
          </p>
        </header>
      </Reveal>

      {/* At-a-glance */}
      <Reveal className="grid sm:grid-cols-3 gap-3">
        {[
          { t: "Strategy-first", d: "AI aligned to measurable business KPIs." },
          { t: "Secure by design", d: "Governance, compliance, and observability embedded." },
          { t: "Production-ready", d: "From prototype to scalable enterprise deployment." },
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
        <h2 className="text-xl md:text-2xl font-semibold">How we deliver AI</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {[
            {
              t: "Assess",
              d: "Identify high-value use cases and readiness across data, tech, and governance.",
            },
            {
              t: "Design",
              d: "Architecture, model selection, guardrails, and integration strategy.",
            },
            {
              t: "Build",
              d: "Prototype, test, iterate, and validate with measurable KPIs.",
            },
            {
              t: "Operate",
              d: "Deploy with monitoring, versioning, and continuous optimization.",
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
          <h3 className="text-xl font-semibold">Ready to operationalize AI?</h3>
          <p className="opacity-90 mt-2">
            Let’s define a secure, scalable AI roadmap aligned to your enterprise priorities.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 btn-primary rounded-xl"
          >
            Start the Conversation →
          </a>
        </MotionCard>
      </Reveal>
    </div>
  );
}
