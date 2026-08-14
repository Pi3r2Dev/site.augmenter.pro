/**
 * Filet de récupération des assets périmés — injecté inline dans `<head>` du root layout.
 *
 * Contexte (incident du 2026-08-14) : Hostinger ne conserve qu'une seule version de build. Quand
 * le CDN sert un HTML mis en cache avant un déploiement, ce HTML référence des chunks
 * `/_next/static/*` hashés qui viennent d'être supprimés → 404 rendu en `text/plain` → refus MIME
 * du navigateur → React ne s'hydrate pas → « Application error: a client-side exception has
 * occurred », page sans styles. La home est restée cassée ~35 h.
 *
 * `revalidate = 300` (root layout) + `expireTime = 300` (next.config.ts) ramènent le HTML à
 * `s-maxage=300` sans fenêtre stale, mais il subsiste 5 minutes pendant lesquelles le CDN sert
 * légitimement la version d'avant déploiement. Ce script est la protection déterministe côté
 * client : il détecte l'échec de chargement d'un asset `_next/static` et recharge la page avec un
 * paramètre de cache-bust, ce qui force le CDN Hostinger à repasser par l'origine
 * (`x-hcdn-cache-status: DYNAMIC`) et donc à servir le HTML du build courant.
 *
 * Deux détections complémentaires, parce que Next hisse ses feuilles de style et ses `<script
 * async>` tout en haut du `<head>`, avant le contenu du layout :
 * 1. `error` en phase de capture (les erreurs de chargement de ressources ne remontent pas) —
 *    couvre tout ce qui échoue après l'exécution de ce script, soit la quasi-totalité des cas,
 *    un échec réseau demandant au moins un aller-retour ;
 * 2. balayage `PerformanceResourceTiming.responseStatus` au `load` — rattrape le cas résiduel
 *    d'un asset hissé qui aurait échoué avant que le listener ne soit armé.
 *
 * Garde-fous :
 * - un seul rechargement par minute et par session → pas de boucle si le build est réellement
 *   cassé ou si l'origine elle-même sert des assets manquants ;
 * - abandon silencieux si `sessionStorage` est indisponible (même raison : ne jamais boucler) ;
 * - le paramètre est retiré de la barre d'adresse après récupération, pour ne pas exposer ni
 *   faire partager/indexer une URL paramétrée.
 */
export const ASSET_RECOVERY_SCRIPT = [
  '(function(){var K="__ap_asset_retry",P="_cb";',
  'function isAsset(u){return String(u||"").indexOf("/_next/static/")>-1}',
  "function recover(){var n=Date.now(),l=0;",
  'try{l=parseInt(sessionStorage.getItem(K)||"0",10)||0}catch(x){return}',
  "if(n-l<60000)return;",
  "try{sessionStorage.setItem(K,String(n))}catch(x){return}",
  "try{var a=new URL(location.href);a.searchParams.set(P,n.toString(36));location.replace(a.toString())}catch(x){}}",
  'window.addEventListener("error",function(e){var t=e.target;',
  'if(!t||(t.tagName!=="SCRIPT"&&t.tagName!=="LINK"))return;',
  "if(!isAsset(t.src||t.href))return;recover()},true);",
  'window.addEventListener("load",function(){try{var r=performance.getEntriesByType("resource");',
  "for(var i=0;i<r.length;i++){var e=r[i];",
  'if(isAsset(e.name)&&typeof e.responseStatus==="number"&&e.responseStatus>=400){recover();return}}}catch(x){}});',
  'if(location.search.indexOf(P+"=")>-1){window.addEventListener("load",function(){',
  'try{var a=new URL(location.href);a.searchParams.delete(P);history.replaceState(null,"",a.pathname+a.search+a.hash)}catch(x){}})}',
  "})();",
].join("");
