import type { Metadata } from "next";
import React from "react";
import ParallaxHeader from "@/components/parallaxHeader";
import { Reveal, MotionCard } from "@/components/anim";
import {
  Network,
  Wifi,
  Route,
  Server,
  ShieldCheck,
  Cloud,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Network Services | Embuscon",
  description:
    "Network Consulting and Transformation, SD-WAN, SASE/Zero Trust, Wireless (Wi-Fi 6/6E), Campus & LAN Switching, Structured/Fiber Cabling, SDN, Cloud & Data Center Networking, and Network Operations.",
};

interface Service {
  title: string;
  icon: React.ElementType;
  blurb: string;
  bullets: string[];
}

const services: Service[] = [
  {
    title: "Network Consulting & Transformation",
    icon: Network,
    blurb:
      "Assess, modernize, and standardize enterprise networks across WAN, campus, wireless, and cloud—with governance and operability built in.",
    bullets: [
      "Current-state assessment (performance, availability, security posture)",
      "Target architecture & roadmap aligned to Zero Trust and multi-cloud",
      "BoM planning, rollout runbooks, and migration readiness",
      "Operational model: monitoring, incident/problem workflows",
    ],
  },
  {
    title: "Campus & LAN Switching",
    icon: Server,
    blurb:
      "Reliable and secure campus connectivity with scalable switching architecture and standardized configurations.",
    bullets: [
      "Campus switching design and deployment (access/distribution/core)",
      "Network segmentation and baseline security hardening",
      "Performance tuning and standard operating procedures",
      "Lifecycle support including upgrades and expansions",
    ],
  },
  {
    title: "SD-WAN Transformation (SASE / Zero Trust patterns)",
    icon: Route,
    blurb:
      "Modernize WAN connectivity using SD-WAN to improve application performance, resilience, and cost efficiency—ready for SASE and policy-driven security.",
    bullets: [
      "Transport independence (MPLS, broadband, 4G/5G) with dynamic path selection",
      "Application-aware routing and failover for critical workloads",
      "Service chaining for security controls and traffic segmentation",
      "Centralized policy and observability for ongoing operations",
    ],
  },
  {
    title: "Cloud & Data Center Networking",
    icon: Cloud,
    blurb:
      "Network readiness for cloud migration and data center connectivity—ensuring performance, security, and operational visibility.",
    bullets: [
      "Cloud migration network readiness (routing, security, connectivity)",
      "Data center build/connectivity design patterns",
      "Hybrid connectivity planning and traffic controls",
      "Runbooks for rollout, cutover, and steady-state operations",
    ],
  },
  {
    title: "Wireless Networks (Wi-Fi 6 / 6E)",
    icon: Wifi,
    blurb:
      "End-to-end wireless design, deployment, and optimization for high-density workplaces and modern collaboration requirements.",
    bullets: [
      "Site surveys, coverage planning, and performance optimization",
      "Rogue AP detection, tuning, and interference mitigation",
      "Capacity planning for dense device environments",
      "Managed operations and continuous improvements",
    ],
  },
  {
    title: "Network Security (Segmentation + IAM alignment)",
    icon: ShieldCheck,
    blurb:
      "Security-first network foundations aligned to Zero Trust—covering segmentation, access governance, and policy standardization.",
    bullets: [
      "Segmentation and security baseline across users/apps/workloads",
      "Identity & Access Management (IAM) alignment for network access",
      "Policy standardization and access governance support",
      "Operational security: monitoring, audit readiness, controls",
    ],
  },
  
];

export default function NetworkServicesPage() {
  return (
    <div className="container-px max-w-6xl mx-auto py-12 space-y-12">
      {/* Parallax header */}
      <ParallaxHeader
        title="Network Services"
        subtitle="Secure, scalable connectivity across WAN, campus, wireless, and cloud—built for modern operations and Zero Trust."
        imageSrc="/images/services-hero.jpg" // reuse for now
        heightClass="h-[34vh] md:h-[42vh] lg:h-[50vh]"
        className="mb-6"
      />

      {/* Intro */}
      <Reveal>
        <header>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-primary">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            Network Services
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Modern networks that are secure, observable, and easy to operate
          </h1>
          <p className="mt-3 max-w-3xl text-neutral-700 dark:text-neutral-300">
            Embuscon helps enterprises modernize WAN, wireless, and campus networks with
            SD-WAN, SASE-ready patterns, structured foundations, and disciplined operations—so
            connectivity becomes an enabler, not a bottleneck.
          </p>
        </header>
      </Reveal>

      {/* At-a-glance */}
      <Reveal className="grid sm:grid-cols-3 gap-3">
        {[
          { t: "Security-first", d: "Zero Trust patterns, segmentation, and policy discipline." },
          { t: "Performance + resilience", d: "Application-aware routing, uptime, and failover readiness." },
          { t: "Operable by design", d: "Runbooks, monitoring, and NOC-ready handover." },
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
        <h2 className="text-xl md:text-2xl font-semibold">How we deliver</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {[
            {
              t: "Assess",
              d: "Current-state baseline across WAN/wireless/campus: performance, coverage, risk, and constraints.",
            },
            {
              t: "Design",
              d: "Target architecture, BoM, rollout plan, and migration runbooks aligned to security and operations.",
            },
            {
              t: "Implement",
              d: "Deploy, migrate, and validate with structured cutover, testing, and stabilization.",
            },
            {
              t: "Operate",
              d: "Monitoring, incident/problem workflows, RMA/field support, and documentation for steady state.",
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
          <h3 className="text-xl font-semibold">Ready to modernize your network foundation?</h3>
          <p className="opacity-90 mt-2">
            Share your current environment and objectives—we’ll propose a secure, scalable roadmap
            aligned to performance, resilience, and Zero Trust.
          </p>
          <a href="/contact" className="mt-6 inline-flex items-center gap-2 btn-primary rounded-xl">
            Schedule a Consultation →
          </a>
        </MotionCard>
      </Reveal>
    </div>
  );
}
