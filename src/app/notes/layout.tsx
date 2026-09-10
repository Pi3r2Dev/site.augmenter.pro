/**
 * Layout des notes unlisted : retire Header et Footer globaux. Une note est
 * un document à coller dans un formulaire, pas une page du site vitrine —
 * le chrome commercial (diagnostic, nav, CTA devis) diluerait l'argument.
 * Même technique que `/approche` et `/accueil-narrative`.
 */
export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > header[class*="fixed"][class*="top-0"],
        body > footer { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
