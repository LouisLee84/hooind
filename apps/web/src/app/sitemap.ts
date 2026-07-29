import { calculatorCatalog } from "./calculators/calculator-catalog";
import { getSiteUrl } from "@/config/site";
import type { MetadataRoute } from "next";

const staticRoutes: {
  path: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/calculators", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const calculatorRoutes = calculatorCatalog
    .filter(({ available }) => available)
    .map(({ href }) => ({
      url: getSiteUrl(href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: getSiteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...calculatorRoutes,
  ];
}
