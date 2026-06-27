// Archive de la home narrative (récit 6 chapitres) — conservée re-parcourable
// après le retour de la home bento sur `/` (2026-06). Layout qui strip le
// Header/Footer global pour que le NavFixed de la narrative soit l'unique
// chrome. Même approche que src/app/approche/layout.tsx.

export default function AccueilNarrativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
