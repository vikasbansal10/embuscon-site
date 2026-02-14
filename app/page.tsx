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
                <li>• AI-Ready Digital Infrastructure</li>
                <li>• Industry-Led Transformation Delivery</li>
                <li>• Agentic AI Systems with Governance by Design</li>
                <li>• Enterprise Data Modernization</li>
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
              { title: "Enterprise AI & Agentic Systems", blurb: "Designing and deploying governed AI solutions — from data foundations to multi-agent enterprise automation." },
              { title: "Secure Hybrid Cloud & Network Architecture", blurb: " Engineering scalable, resilient, and AI-ready infrastructure across cloud, on-prem, and edge environments." },
              { title: "Data & Digital Core Modernization", blurb: "Modernizing data platforms, analytics, and enterprise systems to enable AI-ready decision ecosystems." },
              { title: "Enterprise Software & Platform Engineering", blurb: "Building cloud-native, microservices-based enterprise platforms with DevSecOps and lifecycle governance." },
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
