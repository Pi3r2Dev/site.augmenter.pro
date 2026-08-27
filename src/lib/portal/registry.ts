import type { EncryptedDoc } from "./content";

/**
 * Registre du portail client (/clients/<client>/<doc>).
 *
 * V1 : un code d'accès par client (variable d'env), un cookie signé par client,
 * des documents HTML autonomes chiffrés at rest (cf. scripts/portal-encrypt.mjs).
 * Ajouter un client = une entrée ici + une variable d'env. Rien d'autre.
 */

export interface PortalDoc {
  /** Titre de secours si le HTML n'a pas son propre <title>. */
  title: string;
  /**
   * Import différé du module chiffré : le contenu n'entre ni dans le bundle de
   * la page de login, ni dans une réponse tant que le cookie n'est pas vérifié.
   */
  load: () => Promise<{ doc: EncryptedDoc }>;
}

export interface PortalClient {
  /** Nom de la variable d'env qui porte le code d'accès du client. */
  passcodeEnv: string;
  /** Cookie de session, scopé sur /clients/<client>. */
  cookieName: string;
  /** Document ouvert juste après le login. */
  defaultDoc: string;
  docs: Record<string, PortalDoc>;
}

export const PORTAL_CLIENTS: Record<string, PortalClient> = {
  reva9: {
    passcodeEnv: "PORTAL_REVA9_PASSCODE",
    cookieName: "portal_reva9",
    defaultDoc: "point-etape-2026-08-27",
    docs: {
      "point-etape-2026-08-27": {
        title: "Point d'étape — 27 août 2026",
        load: () => import("@/content/portal/reva9/2026-08-27-point-etape"),
      },
    },
  },
};

const ID_RE = /^[a-z0-9-]{1,40}$/;

/** Résout un client depuis un segment d'URL ; null si inconnu ou malformé. */
export function getPortalClient(id: string): PortalClient | null {
  if (!ID_RE.test(id) || !Object.hasOwn(PORTAL_CLIENTS, id)) return null;
  return PORTAL_CLIENTS[id];
}

/** Résout un document d'un client ; null si inconnu ou malformé. */
export function getPortalDoc(client: PortalClient, id: string): PortalDoc | null {
  if (!ID_RE.test(id) || !Object.hasOwn(client.docs, id)) return null;
  return client.docs[id];
}
