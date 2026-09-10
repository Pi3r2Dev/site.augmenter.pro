import { ARLEQUIN_NOTE_META, ARLEQUIN_NOTE_PATH } from "@/data/notes/arlequin";
import { unlistedPageMetadata } from "@/lib/page-metadata";
import { ArlequinNote } from "./note-view";

/**
 * Candidature spontanée Arlequin AI — Forward Deployed Engineer.
 * Unlisted : lisible par URL, noindex, hors sitemap / llms / nav.
 */
export const metadata = unlistedPageMetadata({
  title: ARLEQUIN_NOTE_META.title,
  description: ARLEQUIN_NOTE_META.description,
  path: ARLEQUIN_NOTE_PATH,
});

export default function ArlequinNotePage() {
  return <ArlequinNote />;
}
