import type { MetadataRoute } from "next";

const SITE_URL = "https://sportech.com.sa";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/refund-policy`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];
}
