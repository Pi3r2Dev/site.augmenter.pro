"use client";

import { useEffect } from "react";

interface ReadingRailProps {
  /** id du conteneur du corps d'article à scanner. */
  bodyId?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

interface MemoEntry {
  el: HTMLElement;
  chip: HTMLElement;
  collected: boolean;
}

function slugify(input: string, used: Set<string>): string {
  const base =
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section";
  let slug = base;
  let i = 2;
  while (used.has(slug)) slug = `${base}-${i++}`;
  used.add(slug);
  return slug;
}

/**
 * Orchestrateur client de l'expérience de lecture : barre de progression,
 * « fil de mémoire » (collecte FLIP au scroll + retour au scroll inverse),
 * scroll-spy et table des matières (rail desktop + accordéon mobile).
 *
 * Construit tout en impératif après montage (corps d'article = JSX statique SSR).
 * Points de montage fournis par ArticleLayout : #reading-rail-mount, #toc-mobile-mount.
 */
export function ReadingRail({
  bodyId = "article-body",
  ctaHref = "/contact",
  ctaLabel = "Diagnostic",
}: ReadingRailProps) {
  useEffect(() => {
    const body = document.getElementById(bodyId);
    if (!body) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const created: HTMLElement[] = [];

    // ── Barre de progression ──────────────────────────────────────────────
    const progress = document.createElement("div");
    progress.className = "reading-progress";
    const fill = document.createElement("div");
    fill.className = "reading-progress__fill";
    progress.appendChild(fill);
    document.body.appendChild(progress);
    created.push(progress);

    // ── Bandeau « fil de mémoire » ────────────────────────────────────────
    const memobar = document.createElement("div");
    memobar.className = "memobar";
    const label = document.createElement("span");
    label.className = "memobar__label";
    const cnt = document.createElement("span");
    cnt.className = "memobar__count";
    cnt.textContent = "0";
    label.append("Mémo ", cnt);
    const lane = document.createElement("div");
    lane.className = "memolane";
    const cta = document.createElement("a");
    cta.className = "memobar__cta";
    cta.href = ctaHref;
    cta.textContent = ctaLabel;
    memobar.append(label, lane, cta);
    // Appendu plus bas uniquement si l'article contient des mémos.

    // ── Scan des titres → ancres + TOC ────────────────────────────────────
    const used = new Set<string>();
    const heads = Array.from(body.querySelectorAll<HTMLElement>("h2"));
    heads.forEach((h) => {
      if (!h.id) h.id = slugify(h.textContent ?? "", used);
    });

    const railMount = document.getElementById("reading-rail-mount");
    const tocMobileMount = document.getElementById("toc-mobile-mount");
    const tocLinks: HTMLAnchorElement[] = [];

    function buildTocList(): HTMLOListElement {
      const ol = document.createElement("ol");
      heads.forEach((h, i) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${h.id}`;
        a.dataset.target = h.id;
        const num = document.createElement("span");
        num.className = "toc__num";
        num.textContent = String(i + 1).padStart(2, "0");
        const txt = document.createElement("span");
        txt.textContent = h.textContent ?? "";
        a.append(num, txt);
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const y =
            window.scrollY + h.getBoundingClientRect().top - 88;
          window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
        });
        tocLinks.push(a);
        li.appendChild(a);
        ol.appendChild(li);
      });
      return ol;
    }

    if (heads.length && railMount) {
      const nav = document.createElement("nav");
      nav.className = "reading-rail";
      nav.setAttribute("aria-label", "Sommaire");
      const title = document.createElement("p");
      title.className = "reading-rail__title";
      title.textContent = "Sommaire";
      nav.append(title, buildTocList());
      railMount.appendChild(nav);
    }
    if (heads.length && tocMobileMount) {
      const details = document.createElement("details");
      details.className = "toc-mobile";
      const summary = document.createElement("summary");
      summary.textContent = "Sommaire";
      details.append(summary, buildTocList());
      tocMobileMount.appendChild(details);
    }

    // ── Fil de mémoire : registre + animation FLIP ────────────────────────
    const memos: MemoEntry[] = Array.from(
      body.querySelectorAll<HTMLElement>("[data-memo]"),
    ).map((el) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.type = el.dataset.type ?? "idea";
      chip.title = "Revenir à ce passage";
      const dot = document.createElement("span");
      dot.className = "chip__dot";
      if (el.dataset.type === "link") dot.textContent = "↗";
      chip.append(dot, document.createTextNode(el.dataset.memo ?? ""));
      chip.style.display = "none";
      lane.appendChild(chip);
      return { el, chip, collected: false };
    });

    const hasMemos = memos.length > 0;
    if (hasMemos) {
      document.body.appendChild(memobar);
      created.push(memobar);
    }

    const updateCount = () =>
      (cnt.textContent = String(memos.filter((m) => m.collected).length));

    function fly(
      from: DOMRect,
      to: DOMRect,
      html: string,
      type: string,
      onEnd?: () => void,
    ) {
      if (reduce) {
        onEnd?.();
        return;
      }
      const flyer = document.createElement("span");
      flyer.className = "chip chip--flyer";
      flyer.dataset.type = type;
      flyer.innerHTML = html;
      flyer.style.left = `${from.left}px`;
      flyer.style.top = `${from.top}px`;
      document.body.appendChild(flyer);
      const dx = to.left - from.left;
      const dy = to.top - from.top;
      const anim = flyer.animate(
        [
          { transform: "translate(0,0) scale(1.06)", opacity: 0.35 },
          { transform: `translate(${dx}px,${dy}px) scale(1)`, opacity: 1 },
        ],
        { duration: 440, easing: "cubic-bezier(.22,1,.36,1)" },
      );
      anim.onfinish = () => {
        flyer.remove();
        onEnd?.();
      };
    }

    function lift(m: MemoEntry) {
      m.collected = true;
      m.el.classList.add("memo--collected");
      updateCount();
      const from = m.el.getBoundingClientRect();
      m.chip.style.display = "inline-flex";
      m.chip.style.visibility = "hidden";
      const to = m.chip.getBoundingClientRect();
      fly(from, to, m.chip.innerHTML, m.el.dataset.type ?? "idea", () => {
        m.chip.style.visibility = "visible";
        if (window.innerWidth < 1080)
          lane.scrollTo({ left: lane.scrollWidth, behavior: reduce ? "auto" : "smooth" });
      });
    }

    function drop(m: MemoEntry) {
      m.collected = false;
      m.el.classList.remove("memo--collected");
      updateCount();
      const from = m.chip.getBoundingClientRect();
      m.chip.style.display = "none";
      const to = m.el.getBoundingClientRect();
      fly(from, to, m.chip.innerHTML, m.el.dataset.type ?? "idea");
    }

    memos.forEach((m) =>
      m.chip.addEventListener("click", () => {
        const y = window.scrollY + m.el.getBoundingClientRect().top - 150;
        window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
        if (!reduce)
          m.el.animate(
            [
              { boxShadow: "0 0 0 7px oklch(0.828 0.189 84.4 / .5)" },
              { boxShadow: "0 0 0 0 transparent" },
            ],
            { duration: 1100, easing: "ease-out" },
          );
      }),
    );

    // ── Boucle scroll (rAF throttlé) ──────────────────────────────────────
    const THRESHOLD = 120;
    let ticking = false;
    function onScroll() {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      fill.style.width = `${max > 0 ? (root.scrollTop / max) * 100 : 0}%`;

      let activeId = heads[0]?.id;
      for (const h of heads) if (h.getBoundingClientRect().top < 160) activeId = h.id;
      tocLinks.forEach((a) =>
        a.classList.toggle("active", a.dataset.target === activeId),
      );

      if (hasMemos) {
        memobar.classList.toggle("memobar--show", root.scrollTop > 480);
        for (const m of memos) {
          const top = m.el.getBoundingClientRect().top;
          if (top < THRESHOLD && !m.collected) lift(m);
          else if (top >= THRESHOLD && m.collected) drop(m);
        }
      }
      ticking = false;
    }
    const onScrollThrottled = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(onScroll);
    };
    document.addEventListener("scroll", onScrollThrottled, { passive: true });
    onScroll();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      document.removeEventListener("scroll", onScrollThrottled);
      created.forEach((n) => n.remove());
      railMount?.replaceChildren();
      tocMobileMount?.replaceChildren();
    };
  }, [bodyId, ctaHref, ctaLabel]);

  return null;
}
