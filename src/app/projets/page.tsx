import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/page-metadata";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { modules, techStack } from "@/data/modules";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";

const META_TITLE = "Nos Projets & Réalisations IA";
const META_DESCRIPTION =
  "Découvrez les projets IA développés par augmenter.PRO : 10 modules pour veille automatisée, email intelligent, transcription vocale et plus.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: {
    canonical: "https://augmenter.pro/projets",
  },
  openGraph: pageOpenGraph({ title: META_TITLE, description: META_DESCRIPTION, path: "/projets" }),
};

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  ia: "IA & LLM",
  voice: "Voice & Audio",
  realtime: "Realtime & Collab",
  auth: "Auth & Security",
};

export default function ProjetsPage() {
  return (
    <div className="pt-16">
      <section className="relative isolate overflow-hidden py-20">
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 text-xs font-semibold uppercase tracking-wider"
            >
              Portfolio
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Nos <span className="gradient-text">projets</span> IA
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              10 modules développés pour automatiser le quotidien des
              professionnels — veille, emails, documents, réseaux sociaux.
              100&nbsp;% open source, privacy-first.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <Card
                key={mod.id}
                className="border-border/50 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                      {mod.letter}
                    </div>
                    <mod.icon className="h-5 w-5 text-primary/70" />
                  </div>
                  <h2 className="mt-3 text-sm font-semibold">{mod.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {mod.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {mod.techs.map((tech) => (
                      <Badge
                        key={tech.name}
                        variant="outline"
                        className="text-[10px]"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stack technique
            </h2>
            <p className="mt-3 text-muted-foreground">
              Technologies open source utilisées dans nos projets.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(
              Object.entries(techStack) as [
                string,
                { name: string; icon: string; description: string }[],
              ][]
            ).map(([key, techs]) => (
              <div
                key={key}
                className="rounded-xl border border-border/50 bg-card p-5"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {categoryLabels[key]}
                </h3>
                <div className="space-y-3">
                  {techs.map((tech) => (
                    <div key={tech.name} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-base">
                        {tech.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{tech.name}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {tech.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Un projet en tête&nbsp;?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Discutons de vos besoins en automatisation et IA.
          </p>
          <Button asChild size="lg" className="mt-6 gap-2">
            <Link href="/contact">
              Prendre rendez-vous
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
