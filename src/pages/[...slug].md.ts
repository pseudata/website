import { getCollection, type CollectionEntry } from "astro:content";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";
import fs from "node:fs";
import path from "node:path";

export async function getStaticPaths() {
  const docs = await getCollection("docs");
  return docs.map((entry) => {
    let slug = entry.id.replace(/\.(md|mdx)$/, "");
    if (slug.endsWith("/index")) slug = slug.replace(/\/index$/, "");
    else if (slug === "index") slug = "index";
    return { params: { slug }, props: { entry } };
  });
}

interface Props {
  entry: CollectionEntry<"docs">;
}

export async function GET({ props, params }: { props: Props; params: { slug: string } }) {
  const { entry } = props;
  if (!entry || !entry.body) return new Response("Not Found", { status: 404 });

  const currentSlug = params.slug || "index";
  const currentParts = currentSlug.split("/").filter(Boolean);
  const currentDir = currentParts.slice(0, -1).join("/");
  const depth = currentSlug === "index" ? 0 : currentParts.length;
  const backstep = depth > 1 ? "../".repeat(depth - 1) : "./";

  let body = entry.body;

  // --- START MODIFICATION ---
  // Expand PolyglotExample components and README imports before standard processing
  body = processPolyglotExamples(body);
  // --- END MODIFICATION ---

  const rawImports: Record<string, string> = {};

  // 1. Find all raw imports and map the variable name to the file content
  const importRegex = /^import\s+(\w+)\s+from\s+['"](.+?)\?raw['"];?/gm;
  let match;
  while ((match = importRegex.exec(body)) !== null) {
    const [_, varName, importPath] = match;

    const absolutePath = path.resolve(importPath.replace("@examples", "src/examples"));

    try {
      if (fs.existsSync(absolutePath)) {
        rawImports[varName] = fs.readFileSync(absolutePath, "utf-8");
      }
    } catch (e) {
      console.error(`Failed to read raw import: ${absolutePath}`);
    }
  }

  // 2. Clean up ALL import statements
  body = body.replace(/^import\s+.*\s+from\s+['"].*['"];?\s*$/gm, "");

  // 3. Substitute <Code code={varName} lang="xyz" /> with actual code fences
  body = body.replace(/<Code\s+code={(\w+)}\s+lang=["'](.+?)["'][^>]*\/>/g, (_, varName, lang) => {
    const codeContent = rawImports[varName] || `// Source for ${varName} not found`;
    return `\`\`\`${lang}\n${codeContent.trim()}\n\`\`\``;
  });
  // -----------------------------------

  // Standard preprocessing
  body = body.replace(/^[^\S\r\n]*<\/?(?:Grid|CardGrid|Tabs|Steps)[^>]*>/gm, "");

  const asideMap: Record<string, string> = {
    note: "NOTE",
    tip: "TIP",
    caution: "CAUTION",
    warning: "WARNING",
    danger: "CAUTION",
  };
  body = body.replace(/^[^\S\r\n]*:::(note|tip|caution|warning|danger)([\s\S]*?):::/gm, (_, t, c) => {
    const lines = c
      .trim()
      .split("\n")
      .map((l: string) => `> ${l}`)
      .join("\n");
    return `> [!${asideMap[t] || "NOTE"}]\n${lines}`;
  });

  const transformToNestedList = (_: string, label: string, content: string) => {
    const indentedContent = content
      .split("\n")
      .map((l: string) => (l.trim() ? `    ${l}` : l))
      .join("\n");
    return `* **${label}**:\n${indentedContent}`;
  };
  body = body.replace(/<TabItem\s+label=["'](.+?)["'][^>]*>([\s\S]*?)<\/TabItem>/g, transformToNestedList);
  body = body.replace(/<Card\s+title=["'](.+?)["'][^>]*>([\s\S]*?)<\/Card>/g, transformToNestedList);

  const processor = remark()
    .use(remarkMdx)
    .use(() => (tree) => {
      visit(tree, ["link", "image"], (node: any) => {
        const url = node.url || "";
        if (!url.startsWith("http") && !url.startsWith("#") && !url.startsWith("mailto:")) {
          const [p, h] = url.split("#");
          let tp = p.replace(/^\//, "");
          if (node.type === "link" && !tp.endsWith(".md")) {
            tp = tp.replace(/\/$/, "");
            if (tp === "") tp = "index";
            tp += ".md";
          }
          const targetParts = tp.split("/").filter(Boolean);
          const targetDir = targetParts.slice(0, -1).join("/");
          const isSameDir = currentDir === targetDir;
          node.url = (isSameDir ? `./${targetParts.pop()}` : `${backstep}${tp}`) + (h ? "#" + h : "");
        }
      });
    })
    .use(remarkStringify, { bullet: "*", fence: "`", fences: true, rule: "-" });

  const result = await processor.process(body);
  let finalContent = String(result)
    .replace(/^(\s*)\\---/gm, "$1---")
    .trim();
  let blockquote = "";
  const description = entry.data.description?.trim() || "";

  if (!finalContent.includes(description)) {
    blockquote = `> ${description}\n\n`;
  }

  return new Response(`# ${entry.data.title}\n\n${blockquote}${finalContent}`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `inline; filename="${currentSlug}.md"`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}

/**
 * Processes <PolyglotExample> tags and README imports for the .md output.
 */
function processPolyglotExamples(content: string): string {
  // 1. Handle <PolyglotExample id="..." />
  content = content.replace(/<PolyglotExample\s+id=["']([^"']+)["']\s*\/?>/g, (_match, id) => {
    const basePath = path.join("src/examples", id);
    const languages = [
      { label: "Go", file: "main.go", lang: "go" },
      { label: "Java", file: "Main.java", lang: "java" },
      { label: "Python", file: "main.py", lang: "python" },
      { label: "TypeScript", file: "main.ts", lang: "typescript" },
    ];

    // Initialize with the Source header
    let output = "**Source Codes**\n\n";

    for (const lang of languages) {
      const filePath = path.join(basePath, lang.file);
      if (fs.existsSync(filePath)) {
        try {
          const code = fs.readFileSync(filePath, "utf-8").trim();

          // Create the fenced code block
          const fencedBlock = `\`\`\`${lang.lang}\n${code}\n\`\`\``;

          // Indent every line of the fenced block by 4 spaces to make it a list item child
          const indentedBlock = fencedBlock
            .split("\n")
            .map((line) => "    " + line)
            .join("\n");

          output += `* **${lang.label}**:\n\n${indentedBlock}\n\n`;
        } catch (e) {
          console.error(`Error reading ${filePath}:`, e);
        }
      }
    }
    return output;
  });

  // 2. Handle README imports and injection SAFELY
  const readmeReplacements = new Map<string, string>();
  const importRegex = /^import\s+(\w+)\s+from\s+['"]((?:@examples|.*\/examples)\/([^\/]+)\/README\.md)['"];?/gm;

  content = content.replace(importRegex, (_fullMatch, variable, _fullPath, id) => {
    const readmePath = path.join("src/examples", id, "README.md");

    if (fs.existsSync(readmePath)) {
      try {
        let text = fs.readFileSync(readmePath, "utf-8");
        // Strip the first H1 (# Title)
        text = text.replace(/^#\s+.+$/m, "");
        readmeReplacements.set(variable, text);
      } catch (e) {
        console.error(`Error reading README for ${id}:`, e);
      }
    }
    return "";
  });

  for (const [variable, text] of readmeReplacements) {
    const tagRegex = new RegExp(`<${variable}\\s*\\/?>`, "g");
    content = content.replace(tagRegex, text);
  }

  return content;
}
