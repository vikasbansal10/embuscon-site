// lib/blog.ts

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  author?: string;
  date: string;          // e.g. "2025-11-16"
  tags?: string[];
  coverImageUrl?: string;
  content: string;       // plain text / simple markdown for now
};

const posts: BlogPost[] = [
  {
    slug: "agentic-control-automation-architecture-layers",
    title: "Agentic Control Automation Architecture",
    subtitle: "The 7 Layers of Financial Autonomy in BFSI",
    author: "Embuscon Team",
    date: "2025-11-11",
    tags: ["BFSI", "Agentic AI", "RiskControls","ResponsibleAI","MachineAccountability"],
    coverImageUrl: "/images/blog/agentic-control-automation.png",
    content: `
Most banks have automated controls.
Few have automated judgment.
At Embuscon, we call the next evolution Agentic Control Automation — where intelligent agents don’t just execute workflows, they govern, reason, and assure compliance across the financial ecosystem.
This model builds seven foundational layers of financial autonomy 👇
1️⃣ Data Layer — Transactional Truth
    Clean, labeled financial data defines the integrity of every autonomous control.
2️⃣ Model Layer — Predictive & Risk Models
    Credit, AML, and fraud models — where LLMs meet quant logic.
3️⃣ Memory Layer — Case History & Evidence
    Every exception teaches the next control — building institutional memory.
4️⃣ Tooling Layer — Control Execution
    Appian, Xceptor, Finacle, SAP, Calypso — where logic meets enterprise.
5️⃣ Orchestration Layer — Multi-Agent Collaboration
    LangGraph, CrewAI, AutoGen — coordinating end-to-end validations.
6️⃣ Governance Layer — Control Assurance & Ethics
    Embedded SOX, Basel, PSD2, and RBI guardrails — compliance by design.
7️⃣ Application Layer — Cognitive Control Dashboards
    CRO copilots that turn anomalies into insights — not incidents.
⚙️ From RPA → to Reasoning. From Control Automation → to Control Autonomy.
 The future of BFSI isn’t just about automation — it’s about machine accountability.
    `,
  },
 
   {
    slug: "agentic-control-automation-application",
    title: "From Control Automation to Control Autonomy - The Agentic AI Leap in BFSI",
    subtitle: "How Agentic AI will reshape compliance and risk operations",
    author: "Embuscon Team",
    date: "2025-11-09",
    tags: ["BFSI", "Agentic AI", "Controls"],
    coverImageUrl: "/images/blog/control-autonomy-cover.png",
    content: `
For over a decade, BFSI institutions have invested in control automation — workflow tools, RPA, BPM platforms (Appian, Xceptor, Pega) — to digitize risk and compliance operations.
Yet, 80% of control backlogs remain unresolved — not due to lack of automation, but due to lack of context and autonomy.
💡 Real-World BFSI Impact
 ✅ Anomaly Detection Agents – autonomously flag suspicious transactions before thresholds breach.
 ✅ KYC/AML Compliance Agents – read documents, validate patterns, and escalate only exceptions.
 ✅ Predictive Control Agents – detect control fatigue early, auto-suggest remediation.
 ✅ Governance Agents – ensure every model and workflow aligns with audit and regulatory traceability.
🏦 Why It Matters
Legacy BFSI controls were reactive.
 Agentic AI makes them proactive — learning from data, adapting to risk, and minimizing manual oversight.
Control Centers of the future won’t just execute — they’ll reason, decide, and self-govern within guardrails.
    `,
  },
 

];


export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
