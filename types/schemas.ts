import { z } from "zod";

export const cta = z.object({ label: z.string(), href: z.string() });

export const siteSchema = z.object({
  companyName: z.string(),
  tagline: z.string(),
  images: z.object({
    hero: z.string(),
    aboutHero: z.string(),
    servicesHero: z.string()
  }),
  cta: z.object({ primary: cta, secondary: cta, contact: cta }),
  footer: z.object({ copyright: z.string() })
});
export type SiteContent = z.infer<typeof siteSchema>;

export const homeSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    backgroundImage: z.string(),
    buttons: z.array(z.object({
      label: z.string(),
      href: z.string(),
      variant: z.enum(["primary", "outline"]).optional()
    }))
  }),
  highlights: z.object({ title: z.string(), items: z.array(z.string()) }),
  whatWeDo: z.object({
    title: z.string(),
    cards: z.array(z.object({ title: z.string(), blurb: z.string() }))
  })
});
export type HomeContent = z.infer<typeof homeSchema>;

export const aboutSchema = z.object({
  parallax: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    imageSrc: z.string(),
    heightClass: z.string().optional()
  }),
  whoWeAre: z.object({ kicker: z.string(), title: z.string(), body: z.string() }),
  whatWeDo: z.object({
    title: z.string(),
    body: z.string(),
    pills: z.array(z.string())
  }),
  howWeWork: z.array(z.object({ title: z.string(), desc: z.string() })),
  missionVision: z.object({
    mission: z.object({ kicker: z.string(), title: z.string() }),
    vision: z.object({
      kicker: z.string(),
      items: z.array(z.object({ title: z.string(), desc: z.string() }))
    })
  }),
  values: z.array(z.object({ title: z.string(), desc: z.string() })),
  impact: z.object({ title: z.string(), items: z.array(z.string()) }),
  closing: z.object({
    headline: z.string(),
    body: z.string(),
    cta: cta
  })
});
export type AboutContent = z.infer<typeof aboutSchema>;

export const servicesSchema = z.object({
  parallax: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    imageSrc: z.string(),
    heightClass: z.string().optional()
  }),
  intro: z.object({ kicker: z.string(), title: z.string(), body: z.string() }),
  atAGlance: z.array(z.object({ title: z.string(), desc: z.string() })),
  services: z.array(z.object({
    title: z.string(),
    icon: z.string(),
    blurb: z.string(),
    bullets: z.array(z.string())
  })),
  engage: z.array(z.object({ title: z.string(), desc: z.string() })),
  cta: z.object({ title: z.string(), desc: z.string(), href: z.string(), label: z.string() })
});
export type ServicesContent = z.infer<typeof servicesSchema>;
