import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCookieSecret, verifyPortalToken } from "@/lib/portal/auth";
import { getPortalClient } from "@/lib/portal/registry";
import { PORTAL_ROBOTS } from "@/lib/seo-policy";

/**
 * Écran code d'accès du portail client. Page classique du site (Header/Footer
 * globaux), noindex/nofollow, hors sitemap, hors llms.txt, sans aucun lien
 * entrant. Formulaire HTML natif : fonctionne sans JavaScript.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Espace client",
  description: "Accès réservé aux documents remis à nos clients.",
  robots: PORTAL_ROBOTS,
};

const ERRORS: Record<string, string> = {
  code: "Ce code n'ouvre aucun espace. Vérifie-le et réessaie.",
  rate: "Trop de tentatives. Réessaie dans un quart d'heure.",
  config: "L'espace n'est pas disponible pour le moment. Écris-nous : vite@augmenter.pro.",
};

interface Props {
  params: Promise<{ client: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PortalLoginPage({ params, searchParams }: Props) {
  const { client: clientId } = await params;
  const client = getPortalClient(clientId);
  if (!client) notFound();

  const secret = getCookieSecret();
  const token = (await cookies()).get(client.cookieName)?.value;
  if (secret && verifyPortalToken(token, clientId, secret)) {
    redirect(`/clients/${clientId}/${client.defaultDoc}`);
  }

  const { err } = await searchParams;
  const message = typeof err === "string" ? ERRORS[err] : undefined;

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Espace client
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Ouvre ton espace
          </h1>
          <p className="mt-4 text-muted-foreground">
            Saisis le code d&apos;accès que Pierre t&apos;a transmis. Ce document
            t&apos;est réservé : il n&apos;est ni indexé, ni partagé.
          </p>

          <form method="post" action="/api/portal/login" className="mt-8 space-y-4">
            <input type="hidden" name="client" value={clientId} />
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium">
                Code d&apos;accès
              </label>
              <input
                id="code"
                name="code"
                type="password"
                required
                autoFocus
                autoComplete="one-time-code"
                spellCheck={false}
                maxLength={200}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>
            {message ? (
              <p role="alert" className="text-sm text-destructive">
                {message}
              </p>
            ) : null}
            <Button type="submit" size="lg" className="w-full">
              Ouvrir
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Le code reste valable 30 jours sur cet appareil.
          </p>
        </div>
      </section>
    </div>
  );
}
