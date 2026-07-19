import type { MetadataRoute } from "next";

const siteUrl = "https://messi-rouge.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-07-18T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/peer-model`,
      lastModified: new Date("2026-07-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
