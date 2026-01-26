import { getCollection } from "astro:content";
import type { APIContext } from "astro"; //
import { isExcluded } from "../ai.config";

export async function GET({ site }: APIContext) {
  //
  const docs = await getCollection("docs");
  const baseUrl = site?.href.replace(/\/$/, "");

  const filteredDocs = docs.filter((doc) => !isExcluded(doc.id));

  const entries = filteredDocs
    .map((doc) => {
      /** * Replicate slug logic from src/pages/[...slug].md.ts
       * to ensure URLs match your raw markdown routes.
       */
      let slug = doc.id.replace(/\.(md|mdx)$/, "");
      if (slug.endsWith("/index")) {
        slug = slug.replace(/\/index$/, "");
      } else if (slug === "index") {
        slug = "index";
      }

      // Ensure the location points to the .md endpoint
      const loc = `${baseUrl}/${slug}.md`;

      const rawDate = (doc.data as any).date || doc.data.lastUpdated;
      const dateValue = rawDate instanceof Date ? rawDate : rawDate ? new Date(rawDate) : null;

      const lastmodTag = dateValue && !isNaN(dateValue.getTime()) ? `<lastmod>${dateValue.toISOString()}</lastmod>` : "";

      return `<url><loc>${loc}</loc>${lastmodTag}</url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;

  return new Response(xml.trim(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
