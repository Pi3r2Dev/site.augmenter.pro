/**
 * Juge du maillage du cluster Claude / Odoo / MCP.
 *
 * Dégât réel évité : sans liens internes nets et stables, Google hésite sur la
 * page à positionner pour « claude code odoo » / « serveur mcp odoo » (la
 * landing, le workflow technique et le pilier se partagent les impressions et
 * aucun ne passe en page 1) ; et un article sans lien entrant éditorial n'est
 * pas recrawlé — il reste « Détectée, non indexée » et ne rapporte aucun devis.
 *
 * Le juge lit la source JSX (pas le rendu) : il prouve qu'un lien est écrit
 * dans la page, pas qu'il est visible ni que la phrase est juste.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ARTICLES } from "../data/resources";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const appDir = join(root, "src/app");

export interface InternalLink {
  href: string;
  texteAncre: string;
}

const ENTITIES: Record<string, string> = {
  apos: "'",
  quot: '"',
  amp: "&",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  laquo: "«",
  raquo: "»",
  eacute: "é",
  egrave: "è",
  ecirc: "ê",
  agrave: "à",
  acirc: "â",
  ccedil: "ç",
  ocirc: "ô",
  ucirc: "û",
  icirc: "î",
  hellip: "…",
  mdash: "—",
  ndash: "–",
};

function cleanAnchorText(raw: string): string {
  return raw
    .replace(/\{\s*["'`]\s*["'`]\s*\}/g, " ") // {" "}
    .replace(/<[^>]*>/g, " ") // balises imbriquées (icônes, <em>…)
    .replace(/\{[^{}]*\}/g, " ") // autres expressions JSX
    .replace(/&(\w+);/g, (m, name: string) => ENTITIES[name] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

/** Fin de la balise ouvrante : premier `>` hors accolades et hors chaîne. */
function endOfOpeningTag(src: string, from: number): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = from; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === quote && src[i - 1] !== "\\") quote = null;
    } else if (c === '"' || c === "'" || c === "`") {
      quote = c;
    } else if (c === "{") {
      depth++;
    } else if (c === "}") {
      depth--;
    } else if (c === ">" && depth === 0) {
      return i;
    }
  }
  return -1;
}

/** Liens internes (`href` qui commence par `/`) des `<Link>` et `<a>` d'une source TSX. */
export function extractInternalLinks(src: string): InternalLink[] {
  const links: InternalLink[] = [];
  const openRe = /<(Link|a)(?=[\s>])/g;
  let m: RegExpExecArray | null;
  while ((m = openRe.exec(src))) {
    const tag = m[1];
    const end = endOfOpeningTag(src, m.index + m[0].length);
    if (end < 0) break;
    const attrs = src.slice(m.index + m[0].length, end);
    const hrefMatch = attrs.match(/\bhref=(?:"([^"]*)"|\{\s*["'`]([^"'`]*)["'`]\s*\})/);
    const href = hrefMatch?.[1] ?? hrefMatch?.[2];
    if (attrs.trimEnd().endsWith("/")) {
      openRe.lastIndex = end + 1;
      if (href?.startsWith("/")) links.push({ href, texteAncre: "" });
      continue;
    }
    const close = src.indexOf(`</${tag}>`, end);
    if (close < 0) break;
    openRe.lastIndex = close;
    if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
    links.push({ href, texteAncre: cleanAnchorText(src.slice(end + 1, close)) });
  }
  return links;
}

function tsxFilesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return tsxFilesUnder(path);
    return entry.endsWith(".tsx") ? [path] : [];
  });
}

/** Liens internes de toute une route (`src/app/<route>/` et ses sous-fichiers). */
export function routeLinks(route: string): InternalLink[] {
  const dir = join(appDir, route);
  if (!existsSync(dir)) throw new Error(`route introuvable : src/app/${route}`);
  return tsxFilesUnder(dir).flatMap((file) =>
    extractInternalLinks(readFileSync(file, "utf8")),
  );
}

/** Routes `blog/<slug>` qui ont une `page.tsx`. */
export function blogRoutes(): string[] {
  const dir = join(appDir, "blog");
  return readdirSync(dir)
    .filter((entry) => existsSync(join(dir, entry, "page.tsx")))
    .map((slug) => `blog/${slug}`);
}

/**
 * Route propriétaire d'un fichier : le dossier le plus proche (lui compris)
 * qui a une `page.tsx`. Un composant de `approche/narrative/` compte pour
 * `approche`, pas pour une route à part ; `null` hors de toute page.
 */
function ownerRoute(file: string): string | null {
  let dir = dirname(file);
  while (dir.startsWith(appDir)) {
    if (existsSync(join(dir, "page.tsx"))) {
      return relative(appDir, dir).split(sep).join("/");
    }
    if (dir === appDir) break;
    dir = dirname(dir);
  }
  return null;
}

/** Routes distinctes de `src/app` qui lient `href` en dur, la route cible exclue. */
export function sourceRoutes(href: string): string[] {
  const self = href.replace(/^\//, "");
  const routes = new Set<string>();
  for (const file of tsxFilesUnder(appDir)) {
    const owner = ownerRoute(file);
    if (owner === null || owner === self) continue;
    const hit = extractInternalLinks(readFileSync(file, "utf8")).some(
      (l) => l.href === href || l.href.startsWith(`${href}#`),
    );
    if (hit) routes.add(owner);
  }
  return [...routes].sort();
}

function linksTo(route: string, href: string): InternalLink[] {
  return routeLinks(route).filter(
    (l) => l.href === href || l.href.startsWith(`${href}#`),
  );
}

/** Les 8 articles de l'essaim MCP / Odoo 20 (2026-10-14). */
const ESSAIM = [
  "cout-agent-ia-odoo",
  "odoo-20-serveur-mcp-agents",
  "agent-ia-qui-ne-touche-pas-aux-prix",
  "petit-modele-bien-outille",
  "ia-enrichir-catalogue-sans-perdre-la-main",
  "odoo-online-ce-que-vous-ne-pouvez-pas-installer",
  "logiciel-construit-par-agents-dix-semaines",
  "claude-code-odoo-workflow",
] as const;

describe("juge du maillage — extracteur", () => {
  it("lit href et ancre nettoyée (balises, {\" \"}, entités, attributs multi-lignes)", () => {
    const src = `
      <p>Voir{" "}<Link
        href="/serveur-mcp-odoo"
        className={cn("a", x > 1 && "b")}
      >notre <em>serveur</em>{" "}MCP pour l&apos;ERP</Link> et
      <a href="https://exemple.fr">externe</a> puis <a href={"/contact"}>contact</a></p>`;
    expect(extractInternalLinks(src)).toEqual([
      { href: "/serveur-mcp-odoo", texteAncre: "notre serveur MCP pour l'ERP" },
      { href: "/contact", texteAncre: "contact" },
    ]);
  });

  it("garde-fou anti-vacuum : ≥ 30 routes blog et ≥ 3 liens internes sur /serveur-mcp-odoo", () => {
    expect(blogRoutes().length).toBeGreaterThanOrEqual(30);
    expect(routeLinks("serveur-mcp-odoo").length).toBeGreaterThanOrEqual(3);
  });
});

describe("maillage du cluster — landing /serveur-mcp-odoo", () => {
  it.each(ESSAIM)("blog/%s lie /serveur-mcp-odoo", (slug) => {
    expect(linksTo(`blog/${slug}`, "/serveur-mcp-odoo").length).toBeGreaterThan(0);
  });
});

describe("maillage du cluster — workflow technique Claude Code + Odoo", () => {
  it.each([
    "atelier-claude-code-dirigeant",
    "blog/configurer-odoo-ia-claude-cowork",
    "blog/prompt-audit-projet-claude-fable",
    "integration-mcp",
    "blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer",
  ])("%s lie /blog/claude-code-odoo-workflow", (route) => {
    expect(linksTo(route, "/blog/claude-code-odoo-workflow").length).toBeGreaterThan(0);
  });
});

describe("maillage du cluster — page forte blog/claude-code-prompt-architecture (MA-1)", () => {
  const route = "blog/claude-code-prompt-architecture";

  it("lie le workflow technique avec l'ancre canonique", () => {
    const anchors = linksTo(route, "/blog/claude-code-odoo-workflow").map((l) => l.texteAncre);
    expect(anchors.some((a) => a.includes("workflow technique Claude Code + Odoo"))).toBe(true);
  });

  it("lie la landing /serveur-mcp-odoo avec l'ancre canonique", () => {
    const anchors = linksTo(route, "/serveur-mcp-odoo").map((l) => l.texteAncre);
    expect(anchors.some((a) => a.includes("serveur MCP pour Odoo"))).toBe(true);
  });
});

describe("maillage du cluster — blog/agent-ia-dirigeant-pme (MA-2)", () => {
  const route = "blog/agent-ia-dirigeant-pme";

  it("lie la landing /serveur-mcp-odoo avec l'ancre canonique", () => {
    const anchors = linksTo(route, "/serveur-mcp-odoo").map((l) => l.texteAncre);
    expect(anchors.some((a) => a.includes("serveur MCP pour Odoo"))).toBe(true);
  });

  it.each(["/blog/cout-agent-ia-odoo", "/blog/agent-ia-qui-ne-touche-pas-aux-prix"])(
    "lie %s",
    (href) => {
      expect(linksTo(route, href).length).toBeGreaterThan(0);
    },
  );
});

describe("maillage du cluster — pilier MCP historique → landing (MA-3)", () => {
  it.each([
    "blog/serveur-mcp-guide-pratique-pme",
    "blog/serveur-mcp-integration-crm-erp",
    "blog/serveur-mcp-heberge-pme",
  ])("%s lie /serveur-mcp-odoo avec l'ancre canonique", (route) => {
    const anchors = linksTo(route, "/serveur-mcp-odoo").map((l) => l.texteAncre);
    expect(anchors.some((a) => a.includes("serveur MCP pour Odoo"))).toBe(true);
  });

  it("blog/serveur-mcp-integration-crm-erp lie /blog/odoo-20-serveur-mcp-agents", () => {
    expect(
      linksTo("blog/serveur-mcp-integration-crm-erp", "/blog/odoo-20-serveur-mcp-agents").length,
    ).toBeGreaterThan(0);
  });
});

describe("maillage du cluster — orphelins de l'essaim (MA-4)", () => {
  it.each([
    ["blog/claude-code-odoo-workflow", "/blog/logiciel-construit-par-agents-dix-semaines"],
    ["ia-souveraine-pme", "/blog/petit-modele-bien-outille"],
    ["ia-souveraine-pme", "/blog/cout-agent-ia-odoo"],
  ])("%s lie %s", (route, href) => {
    expect(linksTo(route, href).length).toBeGreaterThan(0);
  });
});

describe("maillage du cluster — entrants du catalogue (MA-4b)", () => {
  it.each(["blog/odoo-20-serveur-mcp-agents", "blog/logiciel-construit-par-agents-dix-semaines"])(
    "%s lie /blog/ia-enrichir-catalogue-sans-perdre-la-main",
    (route) => {
      expect(
        linksTo(route, "/blog/ia-enrichir-catalogue-sans-perdre-la-main").length,
      ).toBeGreaterThan(0);
    },
  );
});

describe("maillage du cluster — entrants de l'essaim (MA-4c)", () => {
  it("blog/claude-code-prompt-architecture lie /blog/logiciel-construit-par-agents-dix-semaines", () => {
    expect(
      linksTo(
        "blog/claude-code-prompt-architecture",
        "/blog/logiciel-construit-par-agents-dix-semaines",
      ).length,
    ).toBeGreaterThan(0);
  });

  it("garde-fou anti-vacuum : le walk voit les routes et compte les entrants connus", () => {
    // /serveur-mcp-odoo est lié par les 8 articles de l'essaim (bloc landing ci-dessus).
    expect(sourceRoutes("/serveur-mcp-odoo").length).toBeGreaterThanOrEqual(ESSAIM.length);
    expect(sourceRoutes("/blog/claude-code-odoo-workflow")).toContain("integration-mcp");
  });

  it.each(ESSAIM)("blog/%s a au moins 3 routes sources éditoriales", (slug) => {
    expect(sourceRoutes(`/blog/${slug}`).length).toBeGreaterThanOrEqual(3);
  });
});

describe("maillage du cluster — réciproques commerciales (MA-5)", () => {
  it.each([
    ["serveur-mcp-odoo", "/blog/configurer-odoo-ia-claude-cowork"],
    ["serveur-mcp-odoo", "/atelier-claude-code-dirigeant"],
    ["atelier-claude-code-dirigeant", "/serveur-mcp-odoo"],
  ])("%s lie %s", (route, href) => {
    expect(linksTo(route, href).length).toBeGreaterThan(0);
  });
});

describe("llms-full.txt — index des articles du catalog (MA-6)", () => {
  // Un article absent de l'index n'existe pas pour un LLM qui ingère le
  // fichier en une requête : il ne sera ni cité ni recommandé.
  const llmsFull = readFileSync(join(root, "public/llms-full.txt"), "utf8");
  const start = llmsFull.indexOf("## Index");
  const end = llmsFull.slice(start).search(/\r?\n---\r?\n/);
  const index = llmsFull.slice(start, start + end);

  it("garde-fou anti-vacuum : le catalog et l'index sont lus", () => {
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(0);
    // L'index s'arrête au premier séparateur, avant les sections de contenu.
    expect(index).not.toContain("\n## https://");
    expect(ARTICLES.length).toBeGreaterThanOrEqual(30);
    expect(index.match(/^- \[/gm)?.length ?? 0).toBeGreaterThanOrEqual(30);
  });

  it.each(ARTICLES.map((a) => a.slug))("l'index liste /blog/%s", (slug) => {
    expect(index).toContain(`](https://augmenter.pro/blog/${slug})`);
  });
});

/** Toutes les ancres de `src/app` qui lient `href` en dur, avec leur route. */
function anchorsTo(href: string): { route: string; texteAncre: string }[] {
  return tsxFilesUnder(appDir).flatMap((file) => {
    const route = ownerRoute(file) ?? relative(appDir, file);
    return extractInternalLinks(readFileSync(file, "utf8"))
      .filter((l) => l.href === href || l.href.startsWith(`${href}#`))
      .map((l) => ({ route, texteAncre: l.texteAncre }));
  });
}

describe("maillage du cluster — ancres canoniques (MA-8)", () => {
  // Une ancre « MCP » ou « page intégration MCP » ne dit ni à Google ni au
  // lecteur ce qu'il trouvera derrière : le lien ne pèse pas sur la requête
  // de la page cible, et la cible se dilue entre libellés concurrents.
  const workflow = anchorsTo("/blog/claude-code-odoo-workflow");
  const integration = anchorsTo("/integration-mcp");

  it("garde-fou anti-vacuum : le walk voit les ancres connues", () => {
    expect(workflow.length).toBeGreaterThanOrEqual(6);
    expect(integration.length).toBeGreaterThanOrEqual(8);
  });

  it("toutes les ancres vers le workflow portent « workflow technique Claude Code + Odoo »", () => {
    const off = workflow.filter((a) => !a.texteAncre.includes("workflow technique Claude Code + Odoo"));
    expect(off).toEqual([]);
  });

  it("aucune ancre vers /integration-mcp n'est réduite à « MCP »", () => {
    const maigre = /^(?:(?:le|la|du|page)\s+)*(?:protocole\s+)?MCP$/i;
    expect(integration.filter((a) => maigre.test(a.texteAncre.trim()))).toEqual([]);
  });

  it.each([
    "blog/agent-ia-dirigeant-pme",
    "blog/automatiser-emails-reseaux-sociaux-ia",
    "blog/claude-code-odoo-workflow",
  ])("%s lie /integration-mcp avec l'ancre « intégration MCP pour PME »", (route) => {
    const anchors = linksTo(route, "/integration-mcp").map((l) => l.texteAncre);
    expect(anchors.some((a) => /intégration MCP pour (?:les )?PME/i.test(a))).toBe(true);
  });
});
