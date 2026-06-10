/**
 * Génère le SVG de la scène « PME épanouie » (blueprint isométrique).
 *
 * Port fidèle du prototype handoff `scene-epanoui-or.js`. Le tracé reste piloté
 * par φ (nombre d'or) et l'angle d'or (137,5°) — proportions mascotte, distances
 * bureau↔étagère, hauteurs caméras, longueurs de câbles, phyllotaxie du feuillage.
 *
 * Différences avec le prototype : fonction exportée typée (plus de
 * `window.EPANOUI_OR`), constantes de projection importées d'`iso.ts` (source
 * unique), et CSS runtime ciblant directement la classe stable
 * `.heroAugmenteScene` (plus de réécriture `.scene ` côté React).
 */

import { ISO } from "./lib/iso";
import type { SceneMarkup } from "./types";

type ClassTriplet = { top?: string; right?: string; front?: string };
type Pt = [string, string];

export function buildScene(): SceneMarkup {
  const GA = 137.507; // angle d'or
  const F = { a: 5, b: 8, c: 13, d: 21, e: 34, f: 55, g: 89 }; // échelle Fibonacci

  const BX = 72,
    BY = -17,
    BW = 3,
    BD = F.c,
    BH = F.f; // étagère A (droite)
  const B2X = -12,
    B2Y = -9,
    B2H = F.e; // étagère B (gauche, au fond)
  const MX = 94,
    MY = -9; // mât caméras

  const { OX, OY, COS, SIN, ZH } = ISO;
  const P = (x: number, y: number, z = 0): Pt => [
    (OX + (x - y) * COS).toFixed(1),
    (OY + (x + y) * SIN - z * ZH).toFixed(1),
  ];
  const pts = (a: ReadonlyArray<Pt>): string => a.map((p) => p.join(",")).join(" ");

  function box(
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    h: number,
    cls: ClassTriplet = {},
  ): string {
    const t = cls.top || "ft",
      r = cls.right || "fr",
      f = cls.front || "ff";
    const T = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
    const R = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
    const Fr = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
    return `<polygon class="${r}" points="${pts(R)}"/><polygon class="${f}" points="${pts(Fr)}"/><polygon class="${t}" points="${pts(T)}"/>`;
  }
  const wood = (x: number, y: number, z: number, w: number, d: number, h: number) =>
    box(x, y, z, w, d, h, { top: "wt", right: "wr", front: "wf" });
  const kraft = (x: number, y: number, z: number, w: number, d: number, h: number) =>
    box(x, y, z, w, d, h, { top: "kt", right: "kr", front: "kf" });
  const amber = (x: number, y: number, z: number, w: number, d: number, h: number) =>
    box(x, y, z, w, d, h, { top: "at", right: "ar", front: "af" });
  const dark = (x: number, y: number, z: number, w: number, d: number, h: number) =>
    box(x, y, z, w, d, h, { top: "dt", right: "dr", front: "df" });
  function shadow(x: number, y: number, w: number, d: number, cls?: string): string {
    const A = P(x, y, 0),
      B = P(x + w, y, 0),
      C = P(x + w, y + d, 0),
      D = P(x, y + d, 0);
    return `<polygon class="shadow${cls ? " " + cls : ""}" points="${pts([A, B, C, D])}"/>`;
  }

  // ---- feuillage en PHYLLOTAXIE (angle d'or) : buisson dense, naturel ----
  function bush(cx: number, cy: number, n: number, scale: number, cls?: string | null): string {
    let s = cls === null ? "" : `<g class="${cls || "sway"}">`;
    for (let i = 0; i < n; i++) {
      const a = ((i * GA) % 150) - 75;
      const sc = scale * (0.5 + 0.5 * ((i * 0.618) % 1));
      const leaf = i % 2 ? "leaf" : "leaf-d";
      s += `<path class="${leaf}" transform="translate(${cx},${cy}) rotate(${a.toFixed(1)}) scale(${sc.toFixed(2)})" d="M0,0 C -4,-9 -3,-20 0,-29 C 3,-20 4,-9 0,0 Z"/>`;
    }
    s += cls === null ? "" : `</g>`;
    return s;
  }
  function pottedBush(
    x: number,
    y: number,
    potW: number,
    potH: number,
    n: number,
    scale: number,
  ): string {
    const top = P(x + potW / 2, y + potW / 2, potH);
    return (
      box(x, y, 0, potW, potW, potH, { top: "pot", right: "pot-d", front: "pot-t" }) +
      bush(+top[0], +top[1], n, scale)
    );
  }

  let g = "";

  /* ===== ombres (taguées par étape pour apparaître AVEC leur objet) ===== */
  g += `<g class="shadows">`;
  g += shadow(-2, -2, F.e + 4, F.d + 4); // bureau (toujours)
  g += shadow(-12, 28, F.c, F.b + 6); // personnage (toujours)
  g += shadow(-24, 36, F.c, F.c, "shadow-s1"); // grosse plante gauche (ét.1)
  g += shadow(BX - F.c - 1, BY - 1, F.c + 4, F.d, "shadow-s2"); // étagère (ét.2)
  g += shadow(38, 10, F.c, F.b + 2, "shadow-s2"); // robot (ét.2)
  g += shadow(MX - 3, MY - 2, F.a, F.d + 8, "shadow-s2"); // mât (ét.2)
  g += shadow(46, 30, F.b, F.b, "shadow-s3"); // plante droite (ét.3)
  g += `</g>`;
  g += `<!--NETSLOT-->`; // les câbles réseau passent ICI (derrière les éléments)

  /* ===== ÉTAGÈRE BOIS (reculée) — dessin bas→haut pour une occlusion correcte ===== */
  g += `<g class="shelf">`;
  g += wood(BX, BY, 0, BW, BD, BH); // montant droit (arrière)
  g += wood(BX - F.c, BY, 0, BW, BD, BH); // montant gauche
  [0, F.d, F.e + F.a].forEach((tz, row) => {
    g += wood(BX - F.c, BY, tz, F.c + BW, BD, 2.4); // tablette du niveau
    const cols = row === 2 ? 1 : 2;
    for (let i = 0; i < cols; i++) {
      const cl: ClassTriplet =
        (row + i) % 3 === 0
          ? { top: "vt", right: "vr", front: "vf" }
          : (row + i) % 3 === 1
            ? { top: "at", right: "ar", front: "af" }
            : { top: "kt", right: "kr", front: "kf" };
      g += box(BX - F.c + 1 + i * 6, BY + 3, tz + 2.4, F.a, F.b, F.b, cl);
    }
  });
  g += `</g>`;

  /* ===== 2e ÉTAGÈRE (gauche, au fond) — destination de la navette drone ===== */
  g += `<g class="shelf2">`;
  g += wood(B2X, B2Y, 0, BW, F.c, B2H);
  g += wood(B2X - F.b, B2Y, 0, BW, F.c, B2H);
  [0, F.d].forEach((zz) => (g += wood(B2X - F.b, B2Y, zz, F.b + BW, F.c, 2.4)));
  g += box(B2X - F.b + 1, B2Y + 2, 3, F.a, F.a, F.a, { top: "kt", right: "kr", front: "kf" });
  g += `</g>`;

  /* ===== MÂT + CAMÉRAS (hauteurs = divisions φ du mât) + vigne ===== */
  g += `<g class="cams">`;
  g += dark(MX, MY, 0, 3, 3, F.f);
  function camera(z: number): string {
    const arm = P(MX + 1.5, MY + 1.5, z),
      armEnd = P(MX - F.a, MY + 1.5, z);
    let s = `<g class="cam">`;
    s += `<line class="bracket" x1="${arm[0]}" y1="${arm[1]}" x2="${armEnd[0]}" y2="${armEnd[1]}"/>`;
    s += dark(MX - F.b - 3, MY, z - 2, F.a, 4, 4);
    const lens = P(MX - F.b - 3, MY + 2, z);
    s += `<circle class="lens" cx="${lens[0]}" cy="${lens[1]}" r="3.2"/>`;
    s += `<circle class="lens-i" cx="${lens[0]}" cy="${lens[1]}" r="1.3"/>`;
    s += `<polygon class="scan-cone" points="${lens[0]},${lens[1]} ${P(36, 4, z - 18)[0]},${P(36, 4, z - 18)[1]} ${P(36, 26, z - 18)[0]},${P(36, 26, z - 18)[1]}"/>`;
    s += `</g>`;
    return s;
  }
  g += camera(F.e);
  g += camera(F.d);
  g += `</g>`;

  /* ===== SERVEUR IA (au fond, à droite du bureau) + câble animé ===== */
  const sX = 27,
    sY = -19,
    sW = 5.5,
    sD = 5.5,
    sH = 17;
  g += `<g class="power">`;
  g += `<ellipse class="shadow" cx="${P(sX + sW / 2, sY + sD / 2, 0)[0]}" cy="${P(sX + sW / 2, sY + sD / 2, 0)[1]}" rx="17" ry="8"/>`;
  g += dark(sX, sY, 0, sW, sD, sH); // tour serveur (au fond, derrière le bureau)
  g += `<polygon class="ai-panel" points="${pts([P(sX + 0.7, sY + sD, 1.5), P(sX + sW - 0.7, sY + sD, 1.5), P(sX + sW - 0.7, sY + sD, sH - 1.5), P(sX + 0.7, sY + sD, sH - 1.5)])}"/>`;
  for (let k = 0; k < 6; k++) {
    const p = P(sX + 1.6, sY + sD, 3 + k * 2.3);
    g += `<circle class="ai-led" cx="${p[0]}" cy="${p[1]}" r="0.9" style="animation-delay:${(k * 0.37).toFixed(2)}s"/>`;
  }
  for (let k = 0; k < 6; k++) {
    const p = P(sX + 3.9, sY + sD, 3 + k * 2.3);
    g += `<circle class="ai-led2" cx="${p[0]}" cy="${p[1]}" r="0.9" style="animation-delay:${(k * 0.51).toFixed(2)}s"/>`;
  }
  const cap = P(sX + sW / 2, sY + sD / 2, sH);
  g += `<circle class="ai-cap" cx="${cap[0]}" cy="${cap[1]}" r="2.6"/>`;
  g += `</g>`;

  /* ===== BUREAU (34×21×21 : largeur:profondeur = φ) ===== */
  const DT = F.d;
  g += `<g class="desk">`;
  g += box(0, 0, 0, 4, F.d, DT, { top: "lt", right: "lr", front: "lf" });
  g += box(F.e - 4, 0, 0, 4, F.d, DT, { top: "lt", right: "lr", front: "lf" });
  g += box(-2, -2, DT, F.e + 4, F.d + 4, 3, { top: "lt", right: "lr", front: "lf" });
  g += wood(-2, -2, DT + 3, F.e + 4, F.d + 4, 1.4);
  g += `</g>`;

  /* ===== POSTE — bureau rangé : écran + clavier alignés + lampe ===== */
  const TOP = DT + 4.4;
  const CX = 17; // axe central écran ↔ clavier
  g += `<g class="setup">`;
  g += `<ellipse class="lamp-glow" cx="${P(CX + 1, 11, TOP)[0]}" cy="${P(CX + 1, 11, TOP)[1]}" rx="26" ry="14"/>`;
  g += dark(CX - 1.5, 4, TOP, 3, 3, 2); // socle
  g += dark(CX - 0.75, 4.75, TOP, 1.5, 1.5, 5); // pied
  g += dark(CX - 8, 3, TOP + 5, 16, 2, 11); // bezel
  g += `<polygon class="screen" points="${pts([P(CX - 7, 5, TOP + 6.5), P(CX + 7, 5, TOP + 6.5), P(CX + 7, 5, TOP + 15.5), P(CX - 7, 5, TOP + 15.5)])}"/>`;
  g += box(CX - 7, 12, TOP, 14, 5, 1, { top: "lt", right: "lr", front: "lf" }); // clavier
  g += box(CX + 9, 13, TOP, 3, 4, 1, { top: "lt", right: "lr", front: "lf" }); // souris
  g += dark(29, 3, TOP, 3, 3, 1); // base lampe
  const e2 = P(30.5, 4.5, TOP + 10),
    e3 = P(25, 10, TOP + 13),
    e1 = P(30.5, 4.5, TOP + 1);
  g += `<line class="lamp-arm" x1="${e1[0]}" y1="${e1[1]}" x2="${e2[0]}" y2="${e2[1]}"/>`;
  g += `<line class="lamp-arm" x1="${e2[0]}" y1="${e2[1]}" x2="${e3[0]}" y2="${e3[1]}"/>`;
  g += `<circle class="lamp-joint" cx="${e2[0]}" cy="${e2[1]}" r="1.7"/>`;
  g += `<circle class="lamp-head" cx="${e3[0]}" cy="${e3[1]}" r="3.2"/>`;
  g += `<circle class="lamp-bulb" cx="${e3[0]}" cy="${+e3[1] + 2}" r="1.2"/>`;
  g += box(2, 2, TOP, 3.4, 3.4, 3, { top: "pot", right: "pot-d", front: "pot-t" }); // succulente
  const dsk = P(3.7, 3.7, TOP + 3);
  g += `<g class="sway2">` + bush(+dsk[0], +dsk[1], 6, 0.42, null) + `</g>`;
  const eo = P(CX, 4, TOP + 16);
  const ex = +eo[0],
    ey = +eo[1];
  const scrEmo: Array<[string, number, number]> = [
    ["✉️", -15, 0],
    ["💰", -3, 1.3],
    ["📈", 9, 2.6],
    ["⚡", 3, 3.9],
  ];
  let se = `<g class="scr-emojis">`;
  scrEmo.forEach(([ch, ox, delay]) => {
    se += `<text class="scr-emoji" x="${(ex + ox).toFixed(0)}" y="${ey.toFixed(0)}" style="animation-delay:${delay}s">${ch}</text>`;
  });
  se += `</g>`;
  g += se;
  g += `</g>`;

  /* ===== VÉGÉTAL — pots ancrés harmonieusement (une plante de plus par chapitre) ===== */
  g += `<g class="plants">`;
  g += `<g class="plant-s1">` + pottedBush(-32, 41, F.b, F.b + 3, 13, 1.3) + `</g>`;
  g += `<g class="plant-s2">` + pottedBush(64, 20, F.a + 1, F.b, 10, 0.9) + `</g>`;
  let p3 = pottedBush(52, 48, F.a + 1, F.b, 10, 0.92);
  ([
    [-3, -3, F.f + 4, 9, 0.72],
    [30, -8, F.f + 9, 8, 0.66],
  ] as Array<[number, number, number, number, number]>).forEach(([hx, hy, hz, n, scp]) => {
    const h = P(hx, hy, hz);
    p3 += `<line class="ln" x1="${h[0]}" y1="${+h[1] - 30}" x2="${h[0]}" y2="${h[1]}"/>`;
    p3 += `<ellipse class="pot2" cx="${h[0]}" cy="${h[1]}" rx="7" ry="4"/>`;
    p3 += `<g class="sway"><g transform="translate(${h[0]},${+h[1] + 3}) scale(1,-1)">` + bush(0, 0, n, scp, null) + `</g></g>`;
  });
  g += `<g class="plant-s3">` + p3 + `</g>`;
  g += `</g>`;

  /* ===== MASCOTTE épanouie — expressions heureuses + emoji flottants ===== */
  {
    const b = P(-4, 30, 0);
    const cx = +b[0],
      cy = +b[1];
    let s = `<g class="mascot" transform="translate(${cx},${cy}) scale(1.18)"><g class="mascot-joy">`;
    s += `<rect class="leg" x="-9" y="-22" width="8" height="24" rx="4"/>`;
    s += `<rect class="leg2" x="3" y="-22" width="8" height="24" rx="4"/>`;
    s += `<ellipse class="shoe" cx="-5" cy="3" rx="7" ry="3.4"/>`;
    s += `<ellipse class="shoe" cx="9" cy="3" rx="7" ry="3.4"/>`;
    s += `<path class="body" d="M-22,-26 q-2,-30 21,-31 q23,1 21,31 q-21,13 -42,0 z"/>`;
    s += `<path class="collar" d="M-12,-50 q11,-6 23,0 q-11,5 -23,0 z"/>`;
    s += `<path class="arm armL" d="M-19,-52 q-16,10 -16,33"/>`;
    s += `<path class="arm armR" d="M19,-52 q17,9 17,34"/>`;
    s += `<circle class="skin" cx="-35" cy="-19" r="6"/>`;
    s += `<circle class="skin handR" cx="36" cy="-18" r="6"/>`;
    s += `<circle class="head" cx="0" cy="-76" r="23"/>`;
    s += `<path class="hair" d="M-23,-80 q2,-26 23,-25 q21,-1 23,25 q-8,-12 -23,-11 q-15,-1 -23,11 z"/>`;
    s += `<circle class="cheek" cx="-11" cy="-71" r="4"/>`;
    s += `<circle class="cheek" cx="11" cy="-71" r="4"/>`;
    s += `<g class="m-eyes">`;
    s += `<circle class="eye" cx="-8" cy="-78" r="2.6"/>`;
    s += `<circle class="eye" cx="8" cy="-78" r="2.6"/>`;
    s += `<circle class="spark" cx="-7" cy="-79" r=".9"/>`;
    s += `<circle class="spark" cx="9" cy="-79" r=".9"/>`;
    s += `</g>`;
    s += `<path class="smile" d="M-9,-70 q9,9 18,0"/>`;
    s += `</g></g>`;
    g += s;
    const hy = cy - 76 * 1.18,
      hx = cx;
    const emo: Array<[string, number, number]> = [
      ["😄", -24, 0],
      ["✨", 0, 1.2],
      ["💜", 22, 2.4],
    ];
    let em = `<g class="emojis">`;
    emo.forEach(([ch, ox, delay]) => {
      em += `<text class="emoji" x="${(hx + ox).toFixed(0)}" y="${(hy - 30).toFixed(0)}" style="animation-delay:${delay}s">${ch}</text>`;
    });
    em += `</g>`;
    g += em;
  }

  /* ===== ROBOT façon WALL·E (amber) — bras articulé, chenilles animées ===== */
  {
    const rx = 39,
      ry = 15;
    let s = `<g class="robot"><g class="robotMove">`;
    s += dark(rx, ry, 0, 10, 3.5, 5);
    s += dark(rx, ry + 6, 0, 10, 3.5, 5);
    s += `<line class="r-belt" x1="${P(rx, ry + 9.5, 1)[0]}" y1="${P(rx, ry + 9.5, 1)[1]}" x2="${P(rx + 10, ry + 9.5, 1)[0]}" y2="${P(rx + 10, ry + 9.5, 1)[1]}"/>`;
    s += `<line class="r-belt" x1="${P(rx + 10, ry, 2.6)[0]}" y1="${P(rx + 10, ry, 2.6)[1]}" x2="${P(rx + 10, ry + 9.5, 2.6)[0]}" y2="${P(rx + 10, ry + 9.5, 2.6)[1]}"/>`;
    s += amber(rx + 1, ry + 1, 5, 8, 7, 10);
    const hatch = [P(rx + 1, ry + 8, 6), P(rx + 9, ry + 8, 6), P(rx + 9, ry + 8, 13), P(rx + 1, ry + 8, 13)];
    s += `<polygon class="r-hatch" points="${pts(hatch)}"/>`;
    s += dark(rx + 3.6, ry + 3, 15, 1.8, 1.8, 3); // col
    const ht = P(rx + 4.2, ry + 3.8, 19);
    const hx = +ht[0],
      hy = +ht[1];
    s += `<g class="robotHead">`;
    s += `<line class="r-bar" x1="${hx - 11}" y1="${hy}" x2="${hx + 11}" y2="${hy - 2}"/>`;
    s += `<g class="r-eyeG"><circle class="r-eye" cx="${hx - 9}" cy="${hy}" r="6"/><circle class="r-iris" cx="${hx - 9}" cy="${hy}" r="2.4"/></g>`;
    s += `<g class="r-eyeG r-eyeG2"><circle class="r-eye" cx="${hx + 10}" cy="${hy - 2}" r="6"/><circle class="r-iris" cx="${hx + 10}" cy="${hy - 2}" r="2.4"/></g>`;
    s += `</g>`;
    const Sp = P(rx + 1, ry + 4, 9),
      Ep = P(rx - 3, ry + 3, 8),
      Cp = P(rx - 7, ry + 2, 7);
    s += `<g class="r-armrig">`;
    s += `<line class="r-arm" x1="${Sp[0]}" y1="${Sp[1]}" x2="${Ep[0]}" y2="${Ep[1]}"/>`;
    s += `<g class="r-forearm">`;
    s += `<line class="r-arm" x1="${Ep[0]}" y1="${Ep[1]}" x2="${Cp[0]}" y2="${Cp[1]}"/>`;
    s += `<circle class="r-joint" cx="${Ep[0]}" cy="${Ep[1]}" r="1.6"/>`;
    s += `<line class="r-arm" x1="${Cp[0]}" y1="${Cp[1]}" x2="${+Cp[0] - 3}" y2="${+Cp[1] - 3}"/>`;
    s += `<line class="r-arm" x1="${Cp[0]}" y1="${Cp[1]}" x2="${+Cp[0] - 3}" y2="${+Cp[1] + 2}"/>`;
    s += `<g class="robotLoad">` + kraft(rx - 9, ry + 0.5, 6, F.a, F.a, F.a) + `</g>`;
    s += `</g>`; // forearm
    s += `</g>`; // armrig
    s += `</g></g>`;
    g += s;
  }

  /* ===== DRONE + 2 COLIS NAVETTE — pick & place, boucle 24 s ===== */
  const d = P(BX - F.b, BY + 9, BH + 12);
  const dx = +d[0],
    dy = +d[1];
  const b2 = P(B2X - 3, B2Y + 6, B2H + 12);
  const fx = +b2[0] - dx,
    fy = +b2[1] - dy;
  {
    let s = `<g class="drone"><g class="droneTour"><g class="droneBank">`;
    s += `<ellipse class="drone-body" cx="${dx}" cy="${dy}" rx="15" ry="8"/>`;
    s += `<ellipse class="drone-top" cx="${dx}" cy="${dy - 3}" rx="10" ry="5.2"/>`;
    s += `<circle class="drone-eye" cx="${dx}" cy="${dy - 3}" r="2.2"/>`;
    ([
      [-20, -7],
      [20, -7],
      [-20, 7],
      [20, 7],
    ] as Array<[number, number]>).forEach(([ox, oy]) => {
      s += `<line class="ln" x1="${dx}" y1="${dy}" x2="${dx + ox}" y2="${dy + oy}"/>`;
      s += `<ellipse class="rotor" cx="${dx + ox}" cy="${dy + oy - 3}" rx="9" ry="2.6"/>`;
    });
    s += `</g></g></g>`;
    g += s;
  }
  const colis = (delay: string) =>
    `<g class="sbox" style="animation-delay:${delay}">` +
    box(B2X - F.b + 1, B2Y + 2, F.d + 3, F.a, F.b, F.b, { top: "kt", right: "kr", front: "kf" }) +
    `</g>`;
  g += colis("0s");
  const sB = P(B2X - F.b + 1, B2Y + 2, F.d + 3),
    sA = P(BX - F.c + 1 + 6, BY + 3, F.e + F.a + 2.4),
    cA = P(BX - F.b - 1, BY + 8, BH + 2);
  const cB = [+cA[0] + fx, +cA[1] + fy];
  const T = (px: number, py: number) =>
    `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`;
  const dCB = T(cB[0] - +sB[0], cB[1] - +sB[1]),
    dCA = T(+cA[0] - +sB[0], +cA[1] - +sB[1]),
    dSA = T(+sA[0] - +sB[0], +sA[1] - +sB[1]);
  const dTB = T(fx, fy),
    dTA = T(0, 0);
  const dSB = T(0, 0);
  const sceneCSS = `
    .heroAugmenteScene .droneTour{animation:tour 24s linear infinite;}
    @keyframes tour{0%,6%{transform:${dTB};}44%,56%{transform:${dTA};}94%,100%{transform:${dTB};}}
    .heroAugmenteScene .droneBank{transform-box:fill-box;transform-origin:center;animation:bnk 24s linear infinite;}
    @keyframes bnk{0%,6%{transform:rotate(-3.5deg);}44%,56%{transform:rotate(3.5deg);}94%,100%{transform:rotate(-3.5deg);}}
    .heroAugmenteScene .sbox{transform-box:fill-box;animation:shuttle 24s linear infinite;}
    @keyframes shuttle{
      0%,4%{transform:${dSB};}
      6%{transform:${dCB};}
      44%{transform:${dCA};}
      48%,54%{transform:${dSA};}
      56%{transform:${dCA};}
      94%{transform:${dCB};}
      96%,100%{transform:${dSB};}
    }`;

  /* ===== RÉSEAU EN ÉTOILE : hub central → CEO, nuage IA, nuage clients ===== */
  let NET = "";
  {
    const HUB = P(60, -14, 17);
    const dCEO = P(20, 22, 0);
    const nShA = P(BX - F.b, F.b, 0);
    const nMst = P(MX - 1, MY + 1, 0);
    const cloudA: [number, number] = [442, 116];
    const cloudB: [number, number] = [748, 138];
    const link = (a: Pt | [number, number], b: Pt | [number, number], bow = 0) => {
      const mx = (+a[0] + +b[0]) / 2,
        my = (+a[1] + +b[1]) / 2 - bow;
      const dd = `M${a[0]},${a[1]} Q${mx.toFixed(1)},${my.toFixed(1)} ${b[0]},${b[1]}`;
      return `<path class="wire-base" d="${dd}"/><path class="wire-live" d="${dd}"/>`;
    };
    const CLOUD =
      "M-44,15 q-17,0 -17,-13 q0,-12 14,-13 q2,-16 19,-16 q13,0 17,11 q8,-6 16,-1 q11,1 11,12 q12,1 12,13 q0,7 -10,7 Z";
    let net = `<g class="netlayer">`;
    [nShA, nMst].forEach((n) => (net += link(n, HUB, 8)));
    net += link(HUB, dCEO, 14);
    net += link(HUB, cloudA, 90);
    net += link(HUB, cloudB, 72);
    [nShA, nMst, dCEO].forEach((n) => (net += `<circle class="node" cx="${n[0]}" cy="${n[1]}" r="2.3"/>`));
    net += `<circle class="hub-ring" cx="${HUB[0]}" cy="${HUB[1]}" r="7"/>`;
    net += `<circle class="hub" cx="${HUB[0]}" cy="${HUB[1]}" r="3.6"/>`;
    let aiDots = "";
    ([
      [-15, -1],
      [0, 3],
      [15, -2],
    ] as Array<[number, number]>).forEach(([ddx, ddy], i) => {
      aiDots += `<circle class="cl-dot" cx="${ddx}" cy="${ddy}" r="2.3" style="animation-delay:${(i * 0.4).toFixed(1)}s"/>`;
    });
    net +=
      `<g class="cloud cloudIA" style="transform-origin:${cloudA[0]}px ${cloudA[1]}px"><g transform="translate(${cloudA[0]},${cloudA[1]})">` +
      `<path class="cloud-body" d="${CLOUD}"/>${aiDots}` +
      `<text class="cloud-label" y="-23">IA · automatisation</text></g></g>`;
    const cliIcons =
      `<circle class="cl-ic" cx="-13" cy="-1" r="4"/><path class="cl-ic-l" d="M-13,4 q-6,1 -6,8 M-13,4 q6,1 6,8"/>` +
      `<rect class="cl-ic2" x="6" y="-4" width="12" height="9" rx="1.5"/><path class="cl-ic-l" d="M6,-1 h12"/>`;
    net +=
      `<g class="cloud cloudCli" style="transform-origin:${cloudB[0]}px ${cloudB[1]}px"><g transform="translate(${cloudB[0]},${cloudB[1]})">` +
      `<path class="cloud-body" d="${CLOUD}"/>${cliIcons}` +
      `<text class="cloud-label" y="-23">Clients · Fournisseurs</text></g></g>`;
    net += `</g>`;
    NET = net;
  }

  const defs = `<defs>
    <linearGradient id="scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset=".55" stop-color="#c084fc"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
    <linearGradient id="cab" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7c3aed"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter>
  </defs>`;

  return {
    defs,
    inner: g.replace("<!--NETSLOT-->", NET),
    viewBox: "210 78 590 480",
    css: sceneCSS,
  };
}
