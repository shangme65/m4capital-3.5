export default async function sitemap() {
  // Static routes for sitemap
  const staticRoutes = ["", "/login", "/dashboard"].map((p) => ({
    url: `https://your-production-domain.com${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
