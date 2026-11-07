// ANIME · 81-STATION · RICHTIGER CODEX
// Kein Müll. Wenn weg, dann weg sagen. Am Ende ECO + FUNKTION.

export function respoSlot(i) {
  return {
    value: Math.sin(i),
    pulse: Math.sin(Date.now() / 120),
    drift: Math.cos(Date.now() / 240),
    angle: (Date.now() / 10) % 360
  };
}

export function scan9hoch9() {
  let ready = 0;
  let errors = 0;

  for (let i = 0; i < 81; i++) {
    const s = respoSlot(i);

    // RICHTIG: eng prüfen, sonst ist es immer 81
    // value, pulse, drift müssen wirklich in der Mitte sein
    // NaN ist immer Fehler
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

  // STATE: richtig benennen
  let state = "WEG";
  if (ready === 81) state = "FULL READY";
  else if (ready >= 70) state = "PARTIAL";
  else if (ready > 0) state = "LOW";
  else state = "EMPTY";

  return { ready, errors, state, total: 81 };
}

// ROM laden - wenn weg, dann weg sagen
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

// HAUPTLAUF
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

  // am ende - immer
  console.log("ECO: 81.scan läuft - " + scan.state);
  console.log("FUNKTION: respoSlot + scan9hoch9 + loadROM");
})();
