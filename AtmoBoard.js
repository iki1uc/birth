// ================================================================
// ATMOSPHERIC BOARD · ANIME EDITION · iki1uc birth v2
// Dynamische Slot-Anzahl + stabilisierte Partikel + Geo-Matrix Fix
// + WASSER zurück + EFFEKT zurück
// ================================================================
class AtmoBoard {
  constructor(canvas, boardSize = 9) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.boardSize = boardSize;
    this.totalSlots = boardSize * boardSize; // 81
    this.cellSize = canvas.width / boardSize;

    this.particles = [];
    this.lines = [];
    this.slots = [];
    this.waves = []; // WASSER
    this.mood = 'anime';
    this.running = true;

    this.initSlots();
    this.initLines();
  }

  initSlots() {
    this.slots = [];
    for (let i = 0; i < this.totalSlots; i++) {
      this.slots.push({ value: Math.sin(i * 0.2), pulse: 0, drift: 0, angle: 0 });
    }
  }

  updateSlots(time) {
    for (let i = 0; i < this.totalSlots; i++) {
      const s = this.slots[i];
      s.value = Math.sin(i * 0.2 + time * 0.001);
      s.pulse = Math.sin(time / 120 + i * 0.1);
      s.drift = Math.cos(time / 240 + i * 0.05);
      s.angle = (time / 10 + i * 4) % 360;
    }
  }

  initLines() {
    this.lines = [];
    for (let i = 0; i < 20; i++) {
      const start = { x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height };
      const end = { x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height };
      this.lines.push({
        start, end,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.005,
        width: 0.5 + Math.random() * 2,
        color: `rgba(100,220,255,${0.05 + Math.random() * 0.15})`
      });
    }
  }

  // ── WASSER: Wellen, die sich ausbreiten ──
  addWave(x, y) {
    this.waves.push({ x, y, r: 0, life: 1 });
  }

  updateWater() {
    // alle paar Frames eine neue Welle in der Mitte (HOME 40)
    if (Math.random() > 0.97) {
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      this.addWave(cx + (Math.random() - 0.5) * 40, cy + (Math.random() - 0.5) * 40);
    }
    this.waves = this.waves.filter(w => w.life > 0);
    for (const w of this.waves) {
      w.r += 2.5;
      w.life -= 0.02;
    }
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cs = this.cellSize;
    const t = Date.now();

    this.updateSlots(t);
    this.updateWater();

    // Hintergrund - Wasser-Dunkel
    const pulseGlow = 0.1 + 0.05 * Math.sin(t / 500);
    ctx.fillStyle = `rgba(0,10,30,${pulseGlow + 0.08})`;
    ctx.fillRect(0, 0, w, h);

    // Geo-Lines
    for (const line of this.lines) {
      line.progress = (line.progress + line.speed) % 1;
      const p = line.progress;
      const x1 = line.start.x + (line.end.x - line.start.x) * p;
      const y1 = line.start.y + (line.end.y - line.start.y) * p;
      const x2 = line.start.x + (line.end.x - line.start.x) * ((p + 0.2) % 1);
      const y2 = line.start.y + (line.end.y - line.start.y) * ((p + 0.2) % 1);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.stroke();
    }

    // Anime-Slots 9x9
    for (let r = 0; r < this.boardSize; r++) {
      for (let c = 0; c < this.boardSize; c++) {
        const idx = r * this.boardSize + c;
        const slot = this.slots[idx];
        const x = c * cs;
        const y = r * cs;
        const val = slot.value * 0.5 + 0.5;
        const pulse = slot.pulse * 0.3 + 0.7;
        const rCol = Math.floor(80 + val * 120 + pulse * 40);
        const gCol = Math.floor(100 + slot.drift * 30 + pulse * 20);
        const bCol = Math.floor(200 + val * 30 + slot.drift * 20);
        ctx.fillStyle = `rgba(${rCol},${gCol},${bCol},0.15)`;
        ctx.fillRect(x, y, cs, cs);
        const borderPulse = 0.5 + 0.5 * Math.sin(t / 300 + idx * 0.1);
        ctx.strokeStyle = `rgba(${rCol + 50},${gCol + 50},${bCol + 50},${0.1 + 0.1 * borderPulse})`;
        ctx.lineWidth = 0.5 + borderPulse * 0.5;
        ctx.strokeRect(x, y, cs, cs);
        const angleRad = slot.angle * Math.PI / 180;
        const dotX = x + cs / 2 + Math.cos(angleRad) * cs * 0.3;
        const dotY = y + cs / 2 + Math.sin(angleRad) * cs * 0.3;
        ctx.fillStyle = `rgba(255,255,255,${0.1 + 0.1 * borderPulse})`;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 1.5 + borderPulse, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ── WASSER zeichnen ──
    for (const wave of this.waves) {
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100,220,255,${0.4 * wave.life})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // zweiter Ring, kleiner
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.r * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180,240,255,${0.25 * wave.life})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // ── EFFEKT: Partikel (Hard-Cap 120) ──
    if (Math.random() > 0.93 && this.particles.length < 120) {
      const idx = Math.floor(Math.random() * this.totalSlots);
      const slot = this.slots[idx];
      const r = Math.floor(idx / this.boardSize);
      const c = idx % this.boardSize;
      const x = c * cs + cs / 2;
      const y = r * cs + cs / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed + slot.drift * 0.5,
        vy: Math.sin(angle) * speed + slot.drift * 0.5,
        life: 1,
        size: 1 + Math.random() * 3,
        color: `rgba(${120 + slot.value * 80},${180 + slot.pulse * 60},255,${0.3 + 0.3 * slot.pulse})`
      });
    }

    this.particles = this.particles.filter(p => p.life > 0);
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.015;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.running) requestAnimationFrame(() => this.draw());
  }

  start() { this.running = true; this.draw(); }
  stop() { this.running = false; }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.cellSize = width / this.boardSize;
    this.initLines();
  }
}

// am ende - immer
console.log("ECO: AtmoBoard läuft - 9x9 - WASSER + EFFEKT zurück");
console.log("FUNKTION: Slots + Lines + Waves + Partikel");
