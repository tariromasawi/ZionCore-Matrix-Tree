const KEY = "ZIONCORE_LIVING_TREE_V1";
const LOCKS = [
  ["Entanglement", "Shared roots", "A Bell pair (|00\u27e9 + |11\u27e9) / \u221a2 is two lights that answer together. Here it is the root web, not a circuit around a skull."],
  ["Topology", "Knotted bark", "A M\u00f6bius twist and a winding of 2 pi n. A cut does not throw the shape away."],
  ["Observer", "The open gate", "Looking chooses which bud opens. Your attention is the only collapse this page performs."]
];
const CODEX = [
  ["Field", "One field = entanglement \u00d7 topology \u00d7 observer. Received fragment: unified = Vent Utop Uobs (4brain)."],
  ["Bell", "(|00\u27e9 + |11\u27e9) / \u221a2"],
  ["Holography", "AdS/CFT sketch: Zgrav = Zboundary. S = A / 4G\u210f"],
  ["Fractal", "Weierstrass W(x) = \u03a3 a\u207f cos(b\u207f \u03c0 x). D = lim log N(\u03b5) / log(1/\u03b5)"],
  ["Key bound", "Sheet bound, not a live exchange: H(A:B) \u2265 1 \u2212 h(\u03b4)"],
  ["Maxwell", "\u2207 \u00b7 E = \u03c1 / \u03b5\u2080.  \u222e B \u00b7 dl = \u03bc\u2080 Ienc"],
  ["M\u00f6bius", "One side, one edge. Winding \u222e d\u03b8 = 2\u03c0n. Received scrap kept, not obeyed: \u201c= 5\u201d, \u201cA \u2212 dr = 2mn\u201d."],
  ["Shannon", "H = \u2212 \u03a3 p\u1d62 log p\u1d62.  I(X;Y) = H(X) \u2212 H(X|Y)"],
  ["Uncertainty", "\u0394x \u0394p \u2265 \u210f/2"],
  ["Integration", "\u03a6 > \u03a6\u2080. A glyph threshold, not a medical score."],
  ["Spin", "v = r\u03c9, a = \u03c9\u00b2r, L = I\u03c9. Drawn extreme. The tree does not spin matter."],
  ["Scale marks", "9\u00d710\u00b2\u00b2 miles per nanometer, and 9,000,000,000 trillion miles per nanosecond. Ceremonial. Past light. Not a flight plan."],
  ["Protocol", "Fractal \u00b7 topological \u00b7 mnemonic. The mnemonic is a leaf you choose to keep here."],
  ["Green web", "Roots drawn toward plant-lights. Kinship in the picture, not a qubit in every leaf on earth."],
  ["Unread seal", "\u041e\u0421\u041e \u041a\u041e\u0414\u0410\u0422\u0410\u0422\u0415 \u041f\u0410\u0421\u041a \u00b7 MET EN DPI CONC MONT DIG"]
];
function clamp(n) { return Math.max(0, Math.min(100, Math.round(n * 10) / 10)); }
function empty() {
  const now = new Date().toISOString();
  return { born: now, seen: now, growth: 12, health: 86, waves: 0, leaves: [] };
}
function awaken(tree) {
  const then = Date.parse(tree.seen);
  const gap = Number.isFinite(then) ? Math.max(0, (Date.now() - then) / 36e5) : 0;
  const wilt = gap > 8 ? Math.min(40, (gap - 8) * 1.5) : 0;
  return { ...tree, seen: new Date().toISOString(), growth: clamp(tree.growth + Math.min(8, gap * 0.35)), health: clamp(tree.health - wilt + Math.min(18, 6 + gap)) };
}
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return awaken(raw ? { ...empty(), ...JSON.parse(raw) } : empty());
  } catch (e) { return empty(); }
}
let tree = load();
let wave = 0;
let spin = 0;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
function save() { localStorage.setItem(KEY, JSON.stringify(tree)); }
function renderMeters() {
  document.getElementById("m-growth").textContent = String(Math.round(tree.growth));
  document.getElementById("m-health").textContent = String(Math.round(tree.health));
  document.getElementById("m-waves").textContent = String(tree.waves);
  const box = document.getElementById("leaves");
  box.replaceChildren();
  tree.leaves.forEach((text) => {
    const li = document.createElement("li");
    li.className = "leaf";
    li.textContent = text;
    box.appendChild(li);
  });
}
function branch(depth, len, angle) {
  if (depth === 0 || len < 3) return;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -len); ctx.stroke();
  ctx.translate(0, -len);
  ctx.save(); ctx.rotate(angle); branch(depth - 1, len * 0.7, angle); ctx.restore();
  ctx.save(); ctx.rotate(-angle * 0.86); branch(depth - 1, len * 0.66, angle); ctx.restore();
  if (depth > 2) { ctx.save(); ctx.rotate(angle * 0.2); branch(depth - 2, len * 0.5, angle); ctx.restore(); }
}
function paint() {
  const dpr = Math.min(devicePixelRatio || 1, 1.75);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== Math.floor(w * dpr)) { canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const health = tree.health / 100, growth = tree.growth / 100;
  const green = "rgba(61,255,122," + (0.35 + health * 0.6) + ")";
  const amber = "rgba(226,177,90," + (0.25 + (1 - health) * 0.55) + ")";
  const cx = w * 0.5, ground = h * 0.78;
  for (let i = 0; i < 96; i++) {
    const ang = i * 2.399 + spin * 0.15;
    const rad = 18 + (i / 96) * Math.min(w, h) * 0.46;
    const x = cx + Math.cos(ang) * rad * 0.85;
    const y = ground * 0.55 + Math.sin(ang) * rad * 0.42;
    const lit = wave > 0 && rad < wave;
    ctx.fillStyle = lit ? "rgba(61,255,122,0.9)" : "rgba(134,164,132,0.35)";
    ctx.fillRect(x, y, lit ? 3 : 1.6, lit ? 3 : 1.6);
  }
  if (wave > 0) {
    ctx.beginPath(); ctx.arc(cx, ground - 40, wave, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(61,255,122,0.45)"; ctx.lineWidth = 2; ctx.stroke();
    wave += 4.2; if (wave > Math.max(w, h)) wave = 0;
  }
  [[78, green, 0.4], [108, amber, -0.28], [138, "rgba(215,245,200,0.45)", 0.18]].forEach((ring, i) => {
    ctx.beginPath();
    ctx.ellipse(cx, ground - 70, ring[0] + growth * (20 + i * 4), (ring[0] + growth * 18) * 0.38, spin * ring[2] + i, 0, Math.PI * 2);
    ctx.strokeStyle = ring[1]; ctx.lineWidth = 1.25; ctx.stroke();
  });
  ctx.save(); ctx.translate(cx, ground); ctx.strokeStyle = health > 0.45 ? green : amber; ctx.lineWidth = 1.6;
  branch(3 + Math.round(growth * 3), 28 + growth * 36, 0.42); ctx.restore();
  ctx.strokeStyle = "rgba(61,255,122,0.35)";
  for (let i = 0; i < 7; i++) {
    const x = cx - 90 + i * 30;
    ctx.beginPath(); ctx.moveTo(cx, ground); ctx.quadraticCurveTo(x, ground + 10, x + (i - 3) * 8, ground + 28); ctx.stroke();
  }
  if (!reduce) spin += 0.008;
  requestAnimationFrame(paint);
}
function side() {
  const aside = document.getElementById("side");
  LOCKS.forEach((lock) => {
    const art = document.createElement("article");
    art.className = "card";
    art.innerHTML = "<p class='kicker'></p><h3></h3><p></p>";
    art.querySelector(".kicker").textContent = lock[0];
    art.querySelector("h3").textContent = lock[1];
    art.querySelector("p:last-child").textContent = lock[2];
    aside.appendChild(art);
  });
  const codex = document.createElement("article");
  codex.className = "codex";
  const ul = document.createElement("ul");
  CODEX.forEach((row) => {
    const li = document.createElement("li");
    const b = document.createElement("b");
    b.textContent = row[0] + ". ";
    li.append(b, document.createTextNode(row[1]));
    ul.appendChild(li);
  });
  codex.appendChild(ul); aside.appendChild(codex);
}
document.getElementById("wave-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("leaf");
  const note = input.value.trim().slice(0, 140);
  tree = { ...tree, seen: new Date().toISOString(), growth: clamp(tree.growth + 3), health: 100, waves: tree.waves + 1, leaves: note ? [note, ...tree.leaves].slice(0, 7) : tree.leaves };
  input.value = ""; wave = 8; save(); renderMeters();
});
setInterval(() => {
  tree = { ...tree, seen: new Date().toISOString(), growth: clamp(tree.growth + 0.35), health: clamp(tree.health + (tree.health < 100 ? 0.9 : 0)) };
  save(); renderMeters();
}, 4000);
side(); renderMeters(); save(); paint();
