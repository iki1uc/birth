// ============================================================
// RAWATOR · LEBENSGEBER · 81-HOLOGRAMM · ANIME · SHUFFLE
// ============================================================

import { Atom } from './atom.js';
import { Molecule } from './molecule.js';
import { RAWATOR_81 } from './rawator-81.js';
import { BEAM_KERNEL } from './beam.js';
import { RAWATOR_START } from './rawator.js';

export const RAWATOR_LIFE = {
    name: 'RAWATOR · Lebensgeber',
    status: 'initialisiert',
    vital: 0,
    co2: 0,
    wasser: 0,
    sauerstoff: 0,
    hologramm: [],
    anime: [],
    shuffle: [],
    messgerät: {},
    editor: {},

    // ─── INIT ──────────────────────────────────────────────────
    init() {
        this.log('🧬 RAWATOR · Lebensgeber wird aktiviert...');

        // 1. Moleküle laden
        const universe = this.getMolecules();
        this.co2 = universe.co2;
        this.wasser = universe.water;
        this.sauerstoff = universe.oxygen;
        this.vital = (this.co2.vital + this.wasser.vital + this.sauerstoff.vital) / 3;

        // 2. 81-Hologramm-Raster laden
        this.hologramm = RAWATOR_81();

        // 3. Beam-Kernel aktivieren
        BEAM_KERNEL().then(() => {
            this.log('🌐 BEAM KERNEL aktiv');
            RAWATOR_START();
        });

        // 4. Shuffle Dancer initialisieren
        this.shuffle = this.initShuffle();

        // 5. Anime-Frames generieren
        this.anime = this.initAnime();

        // 6. Messgerät einrichten
        this.messgerät = this.initMessgeraet();

        // 7. Editor einrichten
        this.editor = this.initEditor();

        this.status = 'lebendig';
        this.log('✅ RAWATOR · LEBENDIG · 81-HOLOGRAMM BEREIT');
        return this.status;
    },

    // ─── MOLEKÜLE ─────────────────────────────────────────────
    getMolecules() {
        return {
            water: Molecule.H2O(),
            oxygen: Molecule.O2(),
            co2: Molecule.CO2()
        };
    },

    // ─── SHUFFLE DANCER ───────────────────────────────────────
    initShuffle() {
        const moves = ['↻', '↺', '↑', '↓', '←', '→', '↗', '↘', '↖', '↙'];
        const sequence = [];
        for (let i = 0; i < 81; i++) {
            sequence.push({
                step: i + 1,
                move: moves[i % moves.length],
                frame: this.hologramm[i]?.id || `RAW-${i+1}`,
                vital: this.vital * (0.8 + Math.random() * 0.4)
            });
        }
        return sequence;
    },

    // ─── ANIME ──────────────────────────────────────────────────
    initAnime() {
        const frames = [];
        for (let i = 0; i < 81; i++) {
            const holo = this.hologramm[i] || { id: `RAW-${i+1}`, neutral: true };
            frames.push({
                id: `ANIME-${i+1}`,
                frame: holo.id,
                vital: this.vital * (0.7 + Math.random() * 0.6),
                shuffle: this.shuffle[i]?.move || '●',
                co2: this.co2.vital * (0.5 + Math.random() * 0.5),
                wasser: this.wasser.vital * (0.5 + Math.random() * 0.5),
                sauerstoff: this.sauerstoff.vital * (0.5 + Math.random() * 0.5)
            });
        }
        return frames;
    },

    // ─── UNIVERSALMESSGERÄT ──────────────────────────────────
    initMessgeraet() {
        return {
            vital: this.vital,
            co2: this.co2,
            wasser: this.wasser,
            sauerstoff: this.sauerstoff,
            hologramm: this.hologramm.length,
            anime: this.anime.length,
            shuffle: this.shuffle.length,
            status: this.status
        };
    },

    // ─── UNIVERSAL EDITOR ──────────────────────────────────────
    initEditor() {
        return {
            edit: (id, newValue) => {
                const target = this.anime.find(a => a.id === id);
                if (target) {
                    target.vital = newValue;
                    this.log(`✏️ EDIT: ${id} → vital ${newValue.toFixed(2)}`);
                    return target;
                }
                return null;
            },
            shuffle: (step, newMove) => {
                const target = this.shuffle.find(s => s.step === step);
                if (target) {
                    target.move = newMove;
                    this.log(`🔄 SHUFFLE: Step ${step} → ${newMove}`);
                    return target;
                }
                return null;
            },
            reset: () => {
                this.anime = this.initAnime();
                this.shuffle = this.initShuffle();
                this.log('⟲ EDITOR RESET');
                return true;
            }
        };
    },

    // ─── HOLOGRAMM-BEWEIS ──────────────────────────────────────
    hologramProof() {
        const proof = {
            title: '🌀 81-HOLOGRAMM-BEWEIS',
            total: 81,
            lebendig: this.anime.filter(a => a.vital > 0.5).length,
            shuffleCount: this.shuffle.length,
            co2: this.co2,
            wasser: this.wasser,
            sauerstoff: this.sauerstoff,
            vital: this.vital,
            frames: this.anime.slice(0, 9) // erste 9 als Beispiel
        };
        this.log('🌀 HOLOGRAMM-BEWEIS erstellt');
        return proof;
    },

    // ─── LOG ──────────────────────────────────────────────────
    log(msg) {
        const zeit = new Date().toISOString();
        console.log(`[RAWATOR·LIFE] ${msg}`);
    },

    // ─── STATUS ──────────────────────────────────────────────
    status() {
        return {
            name: this.name,
            status: this.status,
            vital: this.vital,
            co2: this.co2,
            wasser: this.wasser,
            sauerstoff: this.sauerstoff,
            hologramm: this.hologramm.length,
            anime: this.anime.length,
            shuffle: this.shuffle.length
        };
    }
};

// ─── AUTO-INIT ──────────────────────────────────────────────────
RAWATOR_LIFE.init();

export { RAWATOR_LIFE };
