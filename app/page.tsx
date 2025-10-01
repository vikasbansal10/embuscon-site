// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO with background image */}
      <section className="relative">
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{ backgroundImage: "url(/bg/hero.jpg)" }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-black/40" aria-hidden />

        <div className="max-w-6xl mx-auto container-px py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Empowering Business thru Consulting
              </h1>
              <p className="mt-4 text-lg text-white/90">
                We help enterprises modernize data platforms, build agentic AI, and deliver programs with precision.
              </p>
              <div className="mt-8 flex gap-3">
                <Link href="/contact" className="btn-primary rounded-xl">Start a Conversation</Link>
                <Link href="/services" className="btn-outline rounded-xl">Explore Services</Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white shadow-soft border border-brand-border p-6 text-neutral-900">
              <h3 className="font-semibold mb-2">Quick Highlights</h3>
              <ul className="space-y-2 opacity-90 text-sm">
                <li>• Data Modernization with Azure Fabric</li>
                <li>• Agentic AI MVPs (CrewAI / AutoGen / LangChain) with governance-first approach</li>
                <li>• Delivery management for BFSI, Telecom, Travel/Hospitality</li>
                <li>• Contract & Legal consulting for large programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-brand-muted">
        <div className="max-w-6xl mx-auto container-px py-12">
          <h2 className="text-2xl font-semibold mb-6">What We Do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Data Platform Modernization", blurb: "IaC-Terraform, Medallion Architecture, Governance, Lineage, RBAC, DRR KPIs." },
              { title: "Agentic AI", blurb: "Multi-agent workflows, retrieval, OCR pipelines, evaluation & safety guardrails." },
              { title: "Program & Delivery", blurb: "RACI, RAIDD, KPIs, stakeholder comms, outcome-driven execution." },
              { title: "Legal & Contract", blurb: "CLM workflows, playbooks, contract review accelerators." },
            ].map((s) => (
              <article key={s.title} className="card p-6 bg-white/70 dark:bg-neutral-900/60">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{s.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
