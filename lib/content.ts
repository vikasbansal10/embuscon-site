import siteJson from "@/content/site.json";
import homeJson from "@/content/home.json";
import aboutJson from "@/content/about.json";
import servicesJson from "@/content/services.json";

import {
  siteSchema,
  homeSchema,
  aboutSchema,
  servicesSchema,
  type SiteContent,
  type HomeContent,
  type AboutContent,
  type ServicesContent
} from "@/types/schemas";

export const siteContent: SiteContent = siteSchema.parse(siteJson);
export const homeContent: HomeContent = homeSchema.parse(homeJson);
export const aboutContent: AboutContent = aboutSchema.parse(aboutJson);
export const servicesContent: ServicesContent = servicesSchema.parse(servicesJson);
