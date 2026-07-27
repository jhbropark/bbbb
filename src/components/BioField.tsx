import { useEffect, useRef } from 'react';

interface Props {
  seed?: number;
  className?: string;
  /** Base tint families rotate with the seed. */
  scheme?: 'blue' | 'teal' | 'navy' | 'silver';
}

const SCHEMES: Record<NonNullable<Props['scheme']>, string[][]> = {
  blue: [
    ['#cfe0f2', '#8fb6e6', '#3f74c4'],
    ['#e3edf8', '#a9c6ec', '#5b8fd6'],
  ],
  teal: [
    ['#d0ecec', '#8fd0cf', '#3f9c98'],
    ['#e2f2f0', '#a6dad6', '#4fb0a8'],
  ],
  navy: [
    ['#9fb6d2', '#4f6f9c', '#0f2038'],
    ['#b8c8dd', '#5a7aa4', '#132a46'],
  ],
  silver: [
    ['#e6eaef', '#c0c9d3', '#8b97a3'],
    ['#eef1f5', '#ccd4dd', '#9aa6b2'],
  ],
};

/**
 * Static procedural "bio" texture: soft organic radial layers, fine particles
 * and a grain wash. Drawn once per size — no rAF — so many can render cheaply.
 * A slow CSS drift (see .biofield in globals.css) gives it subtle life.
 */
export function BioField({ seed = 0, className, scheme = 'blue' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Deterministic PRNG from the seed.
    let s = (seed + 1) * 9301;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    const palettes = SCHEMES[scheme];
    const palette = palettes[seed % palettes.length];

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Base wash.
      ctx.fillStyle = palette[0];
      ctx.fillRect(0, 0, w, h);

      // Organic soft blobs.
      const blobs = 7;
      for (let i = 0; i < blobs; i++) {
        const cx = rnd() * w;
        const cy = rnd() * h;
        const r = (0.25 + rnd() * 0.5) * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const c = palette[1 + (i % 2)];
        g.addColorStop(0, hexA(c, 0.5));
        g.addColorStop(0.6, hexA(c, 0.14));
        g.addColorStop(1, hexA(c, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Fine particles (cells / molecules).
      const count = Math.round((w * h) / 5200);
      for (let i = 0; i < count; i++) {
        const x = rnd() * w;
        const y = rnd() * h;
        const pr = rnd() * 2.2 + 0.4;
        ctx.beginPath();
        ctx.arc(x, y, pr, 0, Math.PI * 2);
        ctx.fillStyle = hexA(palette[2], 0.12 + rnd() * 0.22);
        ctx.fill();
      }

      // Grain wash.
      const grain = Math.round((w * h) / 900);
      for (let i = 0; i < grain; i++) {
        const x = rnd() * w;
        const y = rnd() * h;
        ctx.fillStyle = `rgba(255,255,255,${(rnd() * 0.05).toFixed(3)})`;
        ctx.fillRect(x, y, 1, 1);
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [seed, scheme]);

  return <canvas ref={canvasRef} className={`biofield${className ? ' ' + className : ''}`} aria-hidden="true" />;
}

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
