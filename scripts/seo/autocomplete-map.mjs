// Carte de la demande FR par outil : suggestions Google (sans clé), graine + a..z + modificateurs.
const SEEDS = {
  odoo: ["intégrateur odoo", "consultant odoo", "odoo pme", "odoo ia", "odoo claude", "odoo mcp", "odoo agent ia", "migration odoo", "odoo sur mesure", "odoo prix"],
  claude: ["claude code entreprise", "claude pme", "claude cowork", "claude mcp", "claude code consultant", "claude code formation"],
  agents: ["agent ia entreprise", "agent ia pme", "automatisation ia pme", "n8n pme", "n8n consultant", "intégration ia entreprise"],
  erp: ["erp pme", "erp ia", "optimisation erp", "crm ia pme", "logiciel sur mesure pme", "développement sur mesure pme"],
  local: ["audit informatique pme", "audit informatique yvelines", "consultant ia yvelines", "consultant informatique 78", "formation ia pme"],
};
const MODS = ["", " prix", " tarif", " pme", " france", " avis", " exemple", " freelance", " comment", " pourquoi"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function sug(q) {
  const u = `https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&gl=fr&q=${encodeURIComponent(q)}`;
  try { const j = await (await fetch(u)).json(); return j[1] || []; } catch { return []; }
}
const out = {};
for (const [cluster, seeds] of Object.entries(SEEDS)) {
  const set = new Map();
  for (const s of seeds) {
    for (const m of MODS) for (const x of await sug(s + m)) set.set(x, (set.get(x) || 0) + 1);
    for (const l of LETTERS) for (const x of await sug(`${s} ${l}`)) set.set(x, (set.get(x) || 0) + 1);
    await sleep(120);
  }
  out[cluster] = set;
  console.log(`\n## ${cluster} — ${set.size} suggestions distinctes`);
  const rows = [...set].sort((a, b) => b[1] - a[1]);
  console.log(rows.slice(0, 60).map(([q, n]) => `${q} (${n})`).join(" · "));
  // intentions
  const intent = { prix: 0, emploi: 0, horsFrance: 0, technique: 0 };
  for (const [q] of set) {
    if (/prix|tarif|co[uû]t|combien|abonnement|licence/.test(q)) intent.prix++;
    if (/salaire|emploi|recrut|job|offre|alternance|stage/.test(q)) intent.emploi++;
    if (/belgique|suisse|maroc|tunisie|alg[ée]rie|luxembourg|canada|qu[ée]bec/.test(q)) intent.horsFrance++;
    if (/github|pypi|api|python|docker|json|xml|rpc|module|développeur|developpeur/.test(q)) intent.technique++;
  }
  console.log(`intentions → prix ${intent.prix} · emploi ${intent.emploi} · hors France ${intent.horsFrance} · technique ${intent.technique}`);
}
