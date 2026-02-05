export const metadata = {
  title: "About — Embuscon",
  description:
    "Engineering-led consulting across modernization, data, and responsible AI. Outcome-driven delivery with small senior pods.",
};
import Link from "next/link";
import ParallaxHeader from "@/components/parallaxHeader";
import { Reveal, MotionCard } from "@/components/anim";
import { aboutContent } from "@/lib/content";

export default function AboutPage() {
  const { parallax, whoWeAre, whatWeDo, howWeWork, missionVision, values, impact, closing } =
    aboutContent;

  const [closingBodyBefore, closingBodyAfter] = closing.body.split("Contact Us");

  return (
    <main className="container-px max-w-6xl mx-auto py-12 space-y-12">
      <section aria-label="About Embuscon header">
        <ParallaxHeader
          title={parallax.title}
          subtitle={parallax.subtitle}
          imageSrc={parallax.imageSrc}
          heightClass={parallax.heightClass ?? "h-[36vh] md:h-[44vh] lg:h-[52vh]"}
          className="mb-6"
        />
      </section>

      <section aria-labelledby="who-we-are" className="grid lg:grid-cols-3 gap-8 items-start">
        <Reveal className="contents">
          <div className="lg:col-span-1">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-500">
              <span className="h-2 w-2 rounded-full bg-cyan-500" aria-hidden />
              {whoWeAre.kicker}
            </span>
            <h2 id="who-we-are" className="mt-2 text-2xl md:text-3xl font-semibold">
              {whoWeAre.title}
            </h2>
          </div>
          <MotionCard className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-6 shadow-sm">
            <p className="text-neutral-700 dark:text-neutral-300">{whoWeAre.body}</p>
          </MotionCard>
        </Reveal>
      </section>

      <section aria-labelledby="what-we-do">
        <Reveal>
          <h2 id="what-we-do" className="text-xl md:text-2xl font-semibold">
            {whatWeDo.title}
          </h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-3xl">{whatWeDo.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {whatWeDo.pills.map((p, i) => (
              <MotionCard key={p} delay={i * 0.05}>
                <span className="px-3 py-1 rounded-full text-xs border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/50 transition-transform will-change-transform">
                  {p}
                </span>
              </MotionCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="how-we-work">
        <Reveal>
          <h2 id="how-we-work" className="text-xl md:text-2xl font-semibold">
            How we work
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {howWeWork.map((v, i) => (
              <MotionCard
                key={v.title}
                delay={i * 0.07}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/50"
              >
                <p className="font-semibold">{v.title}</p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{v.desc}</p>
              </MotionCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="mission-vision">
        <Reveal className="grid lg:grid-cols-3 gap-6">
          <MotionCard className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/50">
            <p className="text-xs uppercase tracking-wider text-cyan-500">
              {missionVision.mission.kicker}
            </p>
            <p className="mt-2 text-lg font-semibold">{missionVision.mission.title}</p>
          </MotionCard>
          <MotionCard className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/50">
            <p className="text-xs uppercase tracking-wider text-cyan-500">
              {missionVision.vision.kicker}
            </p>
            <div className="mt-3 grid sm:grid-cols-3 gap-4">
              {missionVision.vision.items.map((v, i) => (
                <MotionCard key={v.title} delay={i * 0.06} className="">
                  <p className="font-semibold">{v.title}</p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{v.desc}</p>
                </MotionCard>
              ))}
            </div>
          </MotionCard>
        </Reveal>
      </section>

      <section aria-labelledby="values">
        <Reveal>
          <h2 id="values" className="text-xl md:text-2xl font-semibold">
            Values
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <MotionCard
                key={v.title}
                delay={i * 0.05}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/60 dark:bg-neutral-900/50 hover:shadow transition-shadow"
              >
                <p className="text-sm font-semibold">{v.title}</p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{v.desc}</p>
              </MotionCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="impact">
        <Reveal>
          <h2 id="impact" className="text-xl md:text-2xl font-semibold">
            {impact.title}
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 marker:text-cyan-400 text-neutral-700 dark:text-neutral-300">
            {impact.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="closing-cta" className="mt-14 mb-8 text-center">
        <Reveal>
          <p id="closing-cta" className="text-lg md:text-xl font-medium">
            {closing.headline}
          </p>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            {closingBodyBefore}
            <Link href={closing.cta.href} className="underline hover:no-underline">
              Contact Us
            </Link>
            {closingBodyAfter}
          </p>
          <Link
            href={closing.cta.href}
            className="mt-6 inline-flex items-center gap-2 btn-primary rounded-xl transition-transform will-change-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            {closing.cta.label}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
