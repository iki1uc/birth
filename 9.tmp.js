// ANIME · MATRIX 9x9 · RICHTIGER CODEX
// 81.js — TMP + HDF in einem. Wenn weg, dann weg sagen. Am Ende ECO + FUNKTION.

// ── ORTE ──
const TMP = "/iki1uc/TMP/";
const HDF = "/iki1uc/HDF/";

const HOME = TMP;  // /iki1uc/TMP/
const ORT  = HDF;  // /iki1uc/HDF/
const USE  = HDF;
const USER = TMP;

// ── LAGE ──
const LAGE = "ANIME";
const ROOM = "NO1.room";
const UROOM = "raw";
const ROOMC = "anchor";

// ── MATRIX ──
const MATRIX = { rows: 9, cols: 9, slots: 81 };
const VECTOR_SLOT = "anime-01";

// ── SLOT ──
// i = 0..80 → Reihe 1..9, Spalte 1..9
// i=0 → Reihe 1, Spalte 1 = anime-01
// i=30 → Reihe 4, Spalte 4 = HOME 40
export function respoSlot(i) {
  const row = Math.floor(i / 9) + 1;
  const col = (i % 9) + 1;
  const isHome = (row === 4 && col === 4);
  const isAnchor = (i === 0);

  return {
    i,
    row,
    col,
    id: isAnchor ? "anime-01" : `anime-${String(i + 1).padStart(2, "0")}`,
    isHome,      // Reihe 4, Spalte 4 = HOME 40
    isAnchor,    // Reihe 1, Spalte 1 = Anker
    value: Math.sin(i),
    pulse: Math.sin(Date.now() / 120),
    drift: Math.cos(Date.now() / 240),
    angle: (Date.now() / 10) % 360,
    lage: LAGE,
    room: ROOM,
    home: HOME,
    ort: ORT
  };
}

// ── SCAN 9x9 ──
export function scan9hoch9() {
  let ready = 0;
  let errors = 0;
  const slots = [];

  for (let i = 0; i < 81; i++) {
    const s = respoSlot(i);
    slots.push(s);

    const ok =
      Number.isFinite(s.value) &&
      Number.isFinite(s.pulse) &&
      Number.isFinite(s.drift) &&
      Number.isFinite(s.angle) &&
      Math.abs(s.value) <= 0.95 &&
      Math.abs(s.pulse) <= 0.95 &&
      Math.abs(s.drift) <= 0.95 &&
      s.angle >= 0 && s.angle < 360;

    if (ok) ready++;
    else errors++;
  }

  let state = "WEG";
  if (ready === 81) state = "FULL READY";
  else if (ready >= 70) state = "PARTIAL";
  else if (ready > 0) state = "LOW";
  else state = "EMPTY";

  return { ready, errors, state, total: 81, slots };
}

// ── ROM LADEN ──
export async function loadROM() {
  try {
    const r = await fetch("./81.rom");
    if (!r.ok) return null;
    const txt = await r.text();
    const rom = {};
    txt.split("\n").forEach(line => {
      const [k, v] = line.split(":").map(s => s.trim());
      if (k && v !== undefined) rom[k] = v;
    });
    return rom;
  } catch {
    return null;
  }
}

// ── MATRIX ZEICHNEN (für index.html) ──
// Gibt einen String zurück, den du in <pre> stecken kannst
export function drawMatrix(scan) {
  let out = "    1  2  3  4  5  6  7  8  9\n";
  out += "      ┌───────────────────────────┐\n";
  for (let r = 1; r <= 9; r++) {
    let line = `    ${r} │ `;
    for (let c = 1; c <= 9; c++) {
      const i = (r - 1) * 9 + (c - 1);
      const s = scan.slots[i];
      // ● = Anker, H = HOME, ■ = ready, · = error
      if (s.isAnchor) line += "●  ";
      else if (s.isHome) line += "H  ";
      else line += "·  ";
    }
    line += "│";
    if (r === 1) line += "  ← anime-01 ist hier";
    if (r === 4) line += "  ← Reihe 4, Spalte 4 = HOME 40";
    out += line + "\n";
  }
  out += "      └───────────────────────────┘\n";
  return out;
}

// ── HAUPTLAUF ──
(async () => {
  const rom = await loadROM();
  if (!rom) {
    console.log("WEG: 81.rom weg");
    return;
  }

  const scan = scan9hoch9();

  console.log("ANIME · 81-STATION");
  console.log(`READY: ${scan.ready}/${scan.total}`);
  if (scan.errors > 0) console.log(`ERRORS: ${scan.errors}`);
  console.log(`STATE: ${scan.state}`);
  console.log(`ROM STATE: ${rom.STATE || "rdy"}`);
  console.log(drawMatrix(scan));

  // am ende - immer
  console.log("ECO: MATRIX 9x9 - anime-01 - rdy");
  console.log("FUNKTION: respoSlot + scan9hoch9 + loadROM");
})();
