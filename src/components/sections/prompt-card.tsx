"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sendGTMEvent } from "@next/third-parties/google";
import { prompts, categories } from "@/data/prompts";

interface PromptCardProps {
  slug: string;
}

export function PromptCard({ slug }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const prompt = prompts.find((p) => p.id === slug);

  const handleCopy = useCallback(async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt.content);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt.content;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    sendGTMEvent({
      event: "prompt_copy",
      prompt_id: prompt.id,
      prompt_title: prompt.title,
    });
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  if (!prompt) return null;

  const category = categories.find((c) => c.id === prompt.category);
  const CategoryIcon = category?.icon;

  return (
    <Card className="my-8 border-primary/20 bg-primary/[0.02]">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            {CategoryIcon && (
              <Badge variant="outline" className="gap-1 text-xs">
                <CategoryIcon className="h-3 w-3" />
                {category?.label}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              Prompt IA
            </Badge>
          </div>
          <p className="font-semibold">{prompt.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {prompt.description}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" className="gap-1.5" onClick={handleCopy}>
            {copied ? (
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
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <a
              href={prompt.downloadFile}
              download
              // Lien à icône seule : sans nom accessible, ni lecteur d'écran ni agent IA
              // ne peut savoir ce qu'il télécharge (audit « Links must have discernible text »).
              aria-label={`Télécharger le prompt « ${prompt.title} » au format Markdown`}
              onClick={() =>
                sendGTMEvent({
                  event: "prompt_download",
                  prompt_id: prompt.id,
                  prompt_title: prompt.title,
                })
              }
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link
              href={`/prompts#${prompt.id}`}
              // « Voir » seul ne dit pas où l'on va : hors contexte (liste de liens d'un
              // lecteur d'écran, plan de navigation d'un agent), le libellé doit se suffire.
              aria-label={`Voir le prompt « ${prompt.title} » dans la bibliothèque`}
            >
              Voir
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
