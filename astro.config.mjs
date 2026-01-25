import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import path from "path";
import { remarkStripH1 } from "./scripts/remark-strip-h1.mjs";

export default defineConfig({
  site: "https://pseudata.dev",
  server: {
    host: true,
  },
  integrations: [
    starlight({
      title: "Pseudata",
      editLink: {
        baseUrl: "https://github.com/pseudata/website/edit/main/",
      },
      lastUpdated: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      plugins: [
        starlightLlmsTxt({
          pageSeparator: "\n\n------\n\n",
          exclude: ["contributing/**", "benchmarks/**", "glossary/**"],
          customSets: [
            {
              label: "Guides",
              description: "step-by-step guides to using my project",
              paths: ["guides/**"],
            },
            {
              label: "Examples",
              description: "practical examples demonstrating features",
              paths: ["examples/**"],
            },
            {
              label: "Reference",
              description: "reference documentation for my project",
              paths: ["reference/**"],
            },
            {
              label: "Advanced",
              description: "advanced topics and deep dives",
              paths: ["advanced/**"],
            },
            {
              label: "Contributing",
              description: "guidelines for contributing to the project",
              paths: ["contributing/**"],
            },
            {
              label: "Glossary",
              description: "glossary of terms and definitions",
              paths: ["glossary/**"],
            },
            {
              label: "Blog",
              description: "latest news and articles",
              paths: ["blog/**"],
            },
          ],
        }),
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
            integrity: "sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV",
            crossorigin: "anonymous",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "application/rss+xml",
            title: "Pseudata Blog",
            href: "/rss.xml",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "text/plain",
            title: "LLM Information",
            href: "/llms.txt",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/logo-light.svg",
            type: "image/svg+xml",
            media: "(prefers-color-scheme: light)",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/logo-dark.svg",
            type: "image/svg+xml",
            media: "(prefers-color-scheme: dark)",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "manifest",
            href: "/manifest.json",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#4682B4",
            media: "(prefers-color-scheme: light)",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#7CB3D9",
            media: "(prefers-color-scheme: dark)",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:site_name",
            content: "Pseudata",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:type",
            content: "website",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://pseudata.dev/social-preview.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: "https://pseudata.dev/social-preview.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:card",
            content: "summary_large_image",
          },
        },
      ],
      logo: {
        light: "./public/logo-light.svg",
        dark: "./public/logo-dark.svg",
        replacesTitle: false,
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        Head: "./src/components/CustomHead.astro",
        Footer: "./src/components/Footer.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pseudata/pseudata",
        },
      ],
      sidebar: [
        {
          label: "Start Here",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Examples",
          collapsed: true,
          items: [
            "examples",
            {
              label: "Generator",
              collapsed: true,
              items: [
                "examples/generator-basic",
                "examples/generator-advance",
                "examples/generator-sequence",
                "examples/generator-streams",
                "examples/generator-seedfrom",
              ],
            },
            {
              label: "IDs",
              collapsed: true,
              items: ["examples/pseudoid-encode", "examples/pseudoid-decode"],
            },
            { label: "Primitives", collapsed: true, items: ["examples/primitives-basic"] },
          ],
        },
        {
          label: "Advanced",
          collapsed: true,
          autogenerate: { directory: "advanced" },
        },
        {
          label: "Benchmarks",
          link: "/benchmarks",
        },
        {
          label: "Contributing",
          collapsed: true,
          autogenerate: { directory: "contributing" },
        },
        {
          label: "Glossary",
          link: "/glossary",
        },
        {
          label: "Blog",
          collapsed: true,
          autogenerate: { directory: "blog" },
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkStripH1],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    resolve: {
      alias: {
        "@examples": path.resolve("./src/examples"),
      },
    },
  },
});
