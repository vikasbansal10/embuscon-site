export const metadata = {
  title: "About — Embuscon",
};
import ParallaxHeader from "@/components/parallaxHeader";
import { Reveal, MotionCard } from "@/components/anim";

export default function AboutPage() {
  return (
    <div className="container-px max-w-6xl mx-auto py-12 space-y-12">
       {/* New Parallax header */}
      <ParallaxHeader
        title="About Embuscon"
        subtitle="Engineering-led consulting across modernization, data, and responsible AI."
        imageSrc="/images/about-hero.jpg"        // put this file in /public/images/
        heightClass="h-[36vh] md:h-[44vh] lg:h-[52vh]"
        className="mb-6"
      />
      {/* Who we are */}
      <Reveal className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-500">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            Who we are
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
            Outcome-driven, safely delivered
          </h2>
        </div>
        <MotionCard className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-6 shadow-sm">
          <p className="text-neutral-700 dark:text-neutral-300">
            Embuscon is an engineering-led consultancy that modernizes legacy systems, harness data, and deploys responsible AI — pairing product thinking with hands-on delivery for fast, safe results.
          </p>
        </MotionCard>
      </Reveal>

      {/* What we do */}
      <Reveal>
        <h3 className="text-xl md:text-2xl font-semibold">What we do</h3>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-3xl">
          We partner across Legacy Modernization & Cloud Migration, Program & Delivery Management,
          Agentic AI MVPs, Advisory & GTM, Software Development & Testing,
          and Contract & Legal Consulting. From platform builds and integrations
          to guardrailed AI agents, we deliver outcomes you can measure.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Data Platform Modernization",
            "Program & Delivery Management",
            "Agentic AI MVPs",
            "Advisory & GTM",
            "Software Development & Testing",
            "Contract & Legal Consulting",
          ].map((p, i) => (
            <MotionCard key={p} delay={i * 0.05}>
              <span className="px-3 py-1 rounded-full text-xs border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/50 transition-transform will-change-transform">
                {p}
              </span>
            </MotionCard>
          ))}
        </div>
      </Reveal>

      {/* How we work */}
      <Reveal>
        <h3 className="text-xl md:text-2xl font-semibold">How we work</h3>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { t: "Small senior pods", d: "Hands-on builders with clear ownership." },
            { t: "Clear SLAs & roadmaps", d: "Transparent plans, measurable outcomes." },
            { t: "Co-design & automation", d: "We co-design with your teams, automate the boring, and leave playbooks—not black boxes." },
          ].map((v, i) => (
            <MotionCard
              key={v.t}
              delay={i * 0.07}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/50"
            >
              <p className="font-semibold">{v.t}</p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{v.d}</p>
            </MotionCard>
          ))}
        </div>
      </Reveal>

      {/* Mission & Vision */}
      <Reveal className="grid lg:grid-cols-3 gap-6">
        <MotionCard className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/50">
          <p className="text-xs uppercase tracking-wider text-cyan-500">Mission</p>
          <p className="mt-2 text-lg font-semibold">AI with Purpose.</p>
        </MotionCard>

        <MotionCard className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/50">
          <p className="text-xs uppercase tracking-wider text-cyan-500">Vision</p>
          <div className="mt-3 grid sm:grid-cols-3 gap-4">
            {[
              { t: "Ethical AI", d: "Guardrails, evaluation, and accountability." },
              { t: "Responsive Consulting", d: "Lean pods that adapt as goals evolve." },
              { t: "Client Value", d: "Outcomes you can see, measure, and own." },
            ].map((v, i) => (
              <MotionCard key={v.t} delay={i * 0.06} className="">
                <p className="font-semibold">{v.t}</p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{v.d}</p>
              </MotionCard>
            ))}
          </div>
        </MotionCard>
      </Reveal>

      {/* Values */}
      <Reveal>
        <h3 className="text-xl md:text-2xl font-semibold">Values</h3>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "People First", d: "Respect, wellbeing, and growth." },
            { t: "Client Intimacy", d: "Deep context; long-term partnerships." },
            { t: "Knowledge Sharing", d: "Playbooks, docs, handovers." },
            { t: "Ethical Work", d: "Do the right thing, even when unseen." },
          ].map((v, i) => (
            <MotionCard
              key={v.t}
              delay={i * 0.05}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/60 dark:bg-neutral-900/50 hover:shadow transition-shadow"
            >
              <p className="text-sm font-semibold">{v.t}</p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{v.d}</p>
            </MotionCard>
          ))}
        </div>
      </Reveal>

      {/* Impact */}
      <Reveal>
        <h3 className="text-xl md:text-2xl font-semibold">Impact in numbers (typical targets)</h3>
        <ul className="mt-4 list-disc pl-5 space-y-2 marker:text-cyan-400 text-neutral-700 dark:text-neutral-300">
          <li><span className="font-semibold">↑ Release frequency</span> with CI/CD &amp; IaC</li>
          <li><span className="font-semibold">↓ Cloud spend</span> via FinOps baselines</li>
          <li><span className="font-semibold">↓ Data defects</span> with quality gates &amp; lineage</li>
          <li><span className="font-semibold">Faster AI time-to-value</span> with evaluation &amp; guardrails</li>
        </ul>
      </Reveal>

      {/* Closing CTA */}
      <Reveal className="mt-14 mb-8 text-center">
        <p className="text-lg md:text-xl font-medium">Let’s build something reliable.</p>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Have a challenge in mind? Start an RFP or say hello via{" "}
          <a href="/contact" className="underline hover:no-underline">Contact Us</a>
          —we’ll return with a lightweight plan and options.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 btn-primary rounded-xl transition-transform will-change-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Contact Us →
        </a>
      </Reveal>
    </div>
  );
}
