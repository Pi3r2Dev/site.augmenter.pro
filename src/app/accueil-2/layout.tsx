export default function Accueil2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body > header[class*="fixed"][class*="top-0"],
        body > footer { display: none !important; }
        body { overflow: hidden; }
      `}</style>
      {children}
    </>
  );
}
