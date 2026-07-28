import type { MetadataRoute } from "next";
import { SITE } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url,                    lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE.url}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE.url}/case-studies`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/resources`,     lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
