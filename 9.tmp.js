        1  2  3  4  5  6  7  8  9
      ┌───────────────────────────┐
    1 │ ●  ·  ·  ·  ·  ·  ·  ·  · │  ← anime-01 ist hier
    2 │ ·  ·  ·  ·  ·  ·  ·  ·  · │
    3 │ ·  ·  ·  ·  ·  ·  ·  ·  · │
    4 │ ·  ·  ·  ·  ·  ·  ·  ·  · │  ← Reihe 4, Spalte 4 = HOME 40
    5 │ ·  ·  ·  ·  ·  ·  ·  ·  · │
    6 │ ·  ·  ·  ·  ·  ·  ·  ·  · │
    7 │ ·  ·  ·  ·  ·  ·  ·  ·  · │
    8 │ ·  ·  ·  ·  ·  ·  ·  ·  · │
    9 │ ·  ·  ·  ·  ·  ·  ·  ·  · │
      └───────────────────────────┘
// ANIME · MATRIX 9x9 · RICHTIGER CODEX

const TMP = "/iki1uc/TMP/";
const HDF = "/iki1uc/HDF/";

const HOME = TMP;  // /iki1uc/TMP/
const ORT  = HDF;  // /iki1uc/HDF/
const USE  = HDF;
const USER = TMP;

const LAGE = "ANIME";
const ROOM = "NO1.room";
const UROOM = "raw";
const ROOMC = "anchor";

const MATRIX = { rows: 9, cols: 9, slots: 81 };
const VECTOR_SLOT = "anime-01";

export function respoSlot(i) {
  return {
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

// ... scan9hoch9 wie eben, 9x9 = 81
// am ende - immer
// ECO: MATRIX 9x9 - anime-01 - rdy
// FUNKTION: respoSlot + scan9hoch9
