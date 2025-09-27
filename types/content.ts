export interface CTA {
  label: string;
  href: string;
}

export interface ParallaxBlock {
  title: string;
  subtitle?: string;
  imageSrc: string;
  heightClass?: string;
}

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    buttons: { label: string; href: string; variant?: "primary" | "outline" }[];
  };
  highlights: { title: string; items: string[] };
  whatWeDo: { title: string; cards: { title: string; blurb: string }[] };
}

export interface AboutContent {
  parallax: ParallaxBlock;
  whoWeAre: { kicker: string; title: string; body: string };
  whatWeDo: { title: string; body: string; pills: string[] };
  howWeWork: { title: string; desc: string }[];
  missionVision: {
    mission: { kicker: string; title: string };
    vision: { kicker: string; items: { title: string; desc: string }[] };
  };
  values: { title: string; desc: string }[];
  impact: { title: string; items: string[] };
  closing: { headline: string; body: string; cta: CTA };
}

export interface ServiceItem {
  title: string;
  icon: string; // maps to lucide icon name
  blurb: string;
  bullets: string[];
}

export interface ServicesContent {
  parallax: ParallaxBlock;
  intro: { kicker: string; title: string; body: string };
  atAGlance: { title: string; desc: string }[];
  services: ServiceItem[];
  engage: { title: string; desc: string }[];
  cta: { title: string; desc: string; href: string; label: string };
}

export interface SiteContent {
  companyName: string;
  tagline: string;
  images: { hero: string; aboutHero: string; servicesHero: string };
  cta: { primary: CTA; secondary: CTA; contact: CTA };
  footer: { copyright: string };
}
