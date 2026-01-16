# Pseudata Website

Official website and documentation for [Pseudata](https://pseudata.dev), the deterministic mock data generator for polyglot stacks.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) documentation theme.

## Quick Start

**Using Dev Container** - Sets up all required tools automatically:

1. Open this repository in VS Code
2. Click "Reopen in Container" when prompted (or use Command Palette: "Dev Containers: Reopen in Container")
3. Wait for the container to build (includes Node.js, npm, and all dependencies)
4. Run `npm run dev`
5. Visit http://localhost:4321 (automatically forwarded)

**Benefits:**
- Consistent development environment for all contributors
- All tools pre-installed
- Port forwarding configured automatically
- No local environment setup required

**Without Dev Container:**

```bash
npm install
npm run dev
```

Note: Requires Node.js 24.12.0+ installed locally.

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run astro` | Run Astro CLI commands |

## Project Structure

```
/
├── public/
│   ├── logo-light.svg          # Logo for light theme
│   ├── logo-dark.svg           # Logo for dark theme
│   ├── favicon.svg             # Site favicon
│   └── images/
│       └── consistency-diagram.svg  # Cross-language consistency visual
├── src/
│   ├── components/
│   │   └── Footer.astro        # Custom footer with Apache License
│   ├── content/
│   │   ├── config.ts           # Content collections config
│   │   └── docs/
│   │       ├── index.mdx       # Homepage (splash template)
│   │       ├── 404.mdx         # Custom 404 page
│   │       ├── guides/         # Getting started guides
│   │       │   └── get-started.mdx
│   │       ├── blog/           # Blog posts
│   │       │   └── introduction.mdx
│   │       └── reference/      # Technical documentation
│   │           └── concept.mdx
│   └── styles/
│       └── custom.css          # Steel blue brand theme
├── astro.config.mjs            # Astro & Starlight config
└── package.json
```

## Content Organization

The documentation is organized into three main sections:

- **Start Here** (`guides/`) - Quick start guide and tutorials
- **Reference** (`reference/`) - Technical documentation and architecture details
- **Blog** (`blog/`) - Articles and deep dives (ready for Medium/dev.to publication)

Key pages:
- **Homepage** - Splash template with hero, features, and code examples
- **Get Started** - Quick start with PCG32 explanation and installation
- **Introduction (Blog)** - Complete blog post with comparison table and roadmap
- **Concept** - Technical deep dive into concepts
- **404** - Custom error page with helpful navigation

## Custom Components

- **Footer.astro** - Extends Starlight default footer with Apache License 2.0 copyright
- **Consistency Diagram** - SVG visual showing cross-language data consistency
- **Comparison Table** - faker.js vs Pseudata feature comparison in blog post

## Branding

- **Primary Color:** Steel Blue (`#4682B4`)
- **Dark Theme:** `#7CB3D9` (lightened for visibility)
- **Light Theme:** `#4682B4` (original)

## Deployment

This site is deployed to [pseudata.dev](https://pseudata.dev).

## Key Features

- **Cross-language consistency** - Same seed = same data across all languages
- **Steel blue branding** - Custom theme with light/dark mode support
- **Multi-locale support** - Documentation for 15+ locales
- **Comparison table** - Visual faker.js vs Pseudata comparison
- **Code examples** - Tabbed examples in Go, Java, Python, TypeScript
- **Custom footer** - Apache License 2.0 with prev/next navigation
- **Accessibility** - Descriptive alt text, semantic HTML, screen reader friendly

## Adding Content

Add new pages to `src/content/docs/` following the existing structure. Starlight will auto-generate navigation based on the folder structure.

---

*© 2025 Pseudata Project. Open Source under Apache License 2.0.*
