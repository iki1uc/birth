// #SCAN · NEU · LOAD ALLE 6 · SYNC TRUE · STATE READY
// 81 = 9 × 9
//  9 = 3 × 3
//  3 = 1 × 3

// ── ROOM ──
const ROOM = {
  NAME: "ANIME",
  CORE: "NO1.room",
  FRAME: 81,
  SUBFRAME: 9,
  STATE: "OPEN"
};

// ── SCAN ──
// Lädt alle 6. Wenn eine weg ist, sagt er WEG und macht nicht weiter.
async function loadOne(name, path) {
  try {
    const r = await fetch(path);
    if (!r.ok) {
      console.log(`WEG: ${name} weg`);
      return null;
    }
    const txt = await r.text();
    console.log(`LOAD: ${name}`);
    return txt;
  } catch {
    console.log(`WEG: ${name} weg`);
    return null;
  }
}

async function scanAll() {
  console.log("#SCAN");

  const rom   = await loadOne("81.rom", "./81.rom");
  const scan  = await loadOne("81.scan", "./81.scan");
  const tmp   = await loadOne("81.tmp", "./81.tmp");
  const video = await loadOne("81.video", "./81.video");
  const subtmp= await loadOne("9.tmp", "./9.tmp");
  const op    = await loadOne("TMP.tmp", "./TMP.tmp");

  // Wenn eine weg ist, ist SYNC FALSE
  const allDa = [rom, scan, tmp, video, subtmp, op].every(x => x !== null);

  if (!allDa) {
    console.log("SYNC: FALSE");
    console.log("STATE: PARTIAL — eine Datei weg");
    console.log("ECO: SCAN PARTIAL - eine fehlt");
    console.log("FUNKTION: LOAD + SYNC");
    return { sync: false, state: "PARTIAL" };
  }

  // Alle da → SYNC TRUE → READY
  console.log("SYNC: TRUE");
  console.log("STATE: READY");
  console.log("ECO: SCAN READY - alle 6 da - ROOM " + ROOM.NAME + " - " + ROOM.STATE);
  console.log("FUNKTION: LOAD 6 + SYNC + SCAN");

  return { sync: true, state: "READY", rom, scan, tmp, video, subtmp, op };
}

// Start
scanAll();
#SCAN
LOAD: 81.rom
LOAD: 81.scan
LOAD: 81.tmp
LOAD: 81.video
LOAD: 9.tmp
LOAD: TMP.tmp
SYNC: TRUE
STATE: READY
ECO: SCAN READY - alle 6 da - ROOM ANIME - OPEN
FUNKTION: LOAD 6 + SYNC + SCAN
