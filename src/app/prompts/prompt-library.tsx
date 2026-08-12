"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Download,
  ArrowRight,
  LayoutGrid,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { sendGTMEvent } from "@next/third-parties/google";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import {
  prompts,
  categories,
  type PromptCategory,
  type Prompt,
} from "@/data/prompts";

const difficultyLabels: Record<Prompt["difficulty"], string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

const difficultyColors: Record<Prompt["difficulty"], string> = {
  debutant: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  intermediaire: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  avance: "bg-rose-500/10 text-rose-700 border-rose-500/20",
};

export function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    PromptCategory | "all"
  >("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Handle deep links like /prompts#claude-code-architecte — scroll to the card.
  // Les filtres démarrent déjà à "all"/"" → la carte ciblée est visible sans reset
  // (on évite ainsi un setState synchrone dans l'effet, signalé par le React Compiler).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    if (!prompts.some((p) => p.id === hash)) return;
    // Defer to next frame so the targeted card is in the DOM
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesCategory =
        activeCategory === "all" || prompt.category === activeCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, activeCategory]);

  const handleCopy = useCallback(async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      sendGTMEvent({ event: "prompt_copy", prompt_id: prompt.id, prompt_title: prompt.title });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = prompt.content;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  const handleDownload = useCallback((prompt: Prompt) => {
    sendGTMEvent({ event: "prompt_download", prompt_id: prompt.id, prompt_title: prompt.title });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden py-24">
        {/* Static radial fallback — visible during shader mount + when reduce-motion */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_80%,oklch(0.894_0.057_293_/_0.15),transparent_50%),radial-gradient(circle_at_70%_20%,oklch(0.828_0.189_84.429_/_0.08),transparent_50%)]" />
        {/* Three.js shader paint — same engine as the home & blog hero */}
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Ressources pour PME
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Prompts <span className="gradient-text">ChatGPT &amp; Claude</span>{" "}
              pour PME
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Copiez-collez ces prompts dans ChatGPT, Claude ou Gemini.
              Adaptez-les à votre entreprise en 2 minutes.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1 text-sm"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {prompts.length} prompts
              </Badge>
              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1 text-sm"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                {categories.length} catégories
              </Badge>
              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1 text-sm"
              >
                <Download className="h-3.5 w-3.5" />
                Téléchargement inclus
              </Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="sticky top-16 z-40 border-b border-border/40 bg-background/95 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un prompt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Tous
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prompt Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {filteredPrompts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                Aucun prompt trouvé pour cette recherche.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt, i) => {
                const category = categories.find(
                  (c) => c.id === prompt.category
                );
                const CategoryIcon = category?.icon;
                const isCopied = copiedId === prompt.id;

                return (
                  <motion.div
                    key={prompt.id}
                    id={prompt.id}
                    className="scroll-mt-48"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Card
                      className={`group relative h-full transition-all hover:shadow-lg ${
                        prompt.isHighlight
                          ? "border-primary shadow-md"
                          : "border-border/50 hover:border-primary/20"
                      }`}
                    >
                      {prompt.isHighlight && (
                        <Badge className="absolute -top-3 left-6">
                          Recommandé
                        </Badge>
                      )}

                      <CardContent className="flex h-full flex-col gap-4">
                        {/* Header badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          {CategoryIcon && (
                            <Badge
                              variant="outline"
                              className="gap-1 text-xs"
                            >
                              <CategoryIcon className="h-3 w-3" />
                              {category?.label}
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={`border text-xs ${difficultyColors[prompt.difficulty]}`}
                          >
                            {difficultyLabels[prompt.difficulty]}
                          </Badge>
                          <span className="ml-auto text-xs text-muted-foreground">
                            ~{prompt.estimatedTime}
                          </span>
                        </div>

                        {/* Title & description */}
                        <div>
                          <h3 className="font-semibold leading-tight">
                            {prompt.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {prompt.description}
                          </p>
                        </div>

                        {/* Expandable content */}
                        <div className="mt-auto">
                          <Accordion type="single" collapsible>
                            <AccordionItem
                              value="content"
                              className="border-none"
                            >
                              <AccordionTrigger className="py-2 text-sm text-primary hover:no-underline">
                                Voir le prompt complet
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="max-h-80 overflow-y-auto rounded-lg bg-muted/50 p-4">
                                  <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                                    {prompt.content}
                                  </pre>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                          {/* Action buttons */}
                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 gap-1.5"
                              onClick={() => handleCopy(prompt)}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="h-3.5 w-3.5" />
                                  Copié !
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copier
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5"
                              asChild
                            >
                              <a
                                href={prompt.downloadFile}
                                download
                                onClick={() => handleDownload(prompt)}
                              >
                                <Download className="h-3.5 w-3.5" />
                                .md
                              </a>
                            </Button>
                          </div>

                          {/* Related article link */}
                          {prompt.relatedArticles &&
                            prompt.relatedArticles.length > 0 && (
                              <Link
                                href={prompt.relatedArticles[0]}
                                className="mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                              >
                                Article associé
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
