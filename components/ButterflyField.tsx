'use client';

import { useEffect, useRef } from 'react';

/**
 * Champ de papillons animés — toile de fond présente sur toutes les pages.
 * Dessin vectoriel sur <canvas> : battement d'ailes, dérive, particules de
 * lumière. Léger (aucune image, aucune dépendance) et respectueux de
 * `prefers-reduced-motion`.
 */

type Butterfly = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  phase: number;
  flap: number;
  rot: number;
  alpha: number;
  hue: number; // 0 = or, 1 = émeraude, 2 = violet
};

type Spore = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  alpha: number;
  hue: number;
};

const PALETTE: Array<[number, number, number]> = [
  [245, 185, 66], // or
  [46, 211, 155], // émeraude
  [158, 134, 255], // violet
];

function rgba([r, g, b]: [number, number, number], a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function drawWing(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  rotation: number,
  fill: string | CanvasGradient,
) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

export function ButterflyField({ density = 14 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let butterflies: Butterfly[] = [];
    let spores: Spore[] = [];
    let raf = 0;
    let running = true;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const createButterfly = (initial: boolean): Butterfly => ({
      x: rand(0, width),
      y: initial ? rand(0, height) : height + 80,
      size: rand(14, 40),
      speedY: rand(-0.34, -0.08),
      speedX: rand(-0.16, 0.16),
      phase: rand(0, Math.PI * 2),
      flap: rand(0.09, 0.2),
      rot: rand(-0.35, 0.35),
      alpha: rand(0.35, 0.85),
      hue: Math.floor(rand(0, PALETTE.length)),
    });

    const createSpore = (initial: boolean): Spore => ({
      x: rand(0, width),
      y: initial ? rand(0, height) : height + 10,
      r: rand(0.6, 2.1),
      vy: rand(-0.32, -0.05),
      vx: rand(-0.08, 0.08),
      alpha: rand(0.15, 0.6),
      hue: Math.floor(rand(0, PALETTE.length)),
    });

    const build = () => {
      const count = Math.max(6, Math.round((width * height) / 90000) + density);
      butterflies = Array.from({ length: count }, () => createButterfly(true));
      spores = Array.from({ length: Math.round(count * 3.2) }, () => createSpore(true));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const drawButterfly = (b: Butterfly, t: number) => {
      const flap = 0.28 + 0.72 * Math.abs(Math.sin(t * b.flap + b.phase));
      const color = PALETTE[b.hue];
      const s = b.size;

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = b.alpha;

      // halo lumineux
      const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.6);
      halo.addColorStop(0, rgba(color, 0.16));
      halo.addColorStop(1, rgba(color, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, s * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // ailes (battement = écrasement horizontal)
      ctx.save();
      ctx.scale(flap, 1);
      const grad = ctx.createLinearGradient(-s, 0, s, 0);
      grad.addColorStop(0, rgba(color, 0.95));
      grad.addColorStop(0.5, rgba(color, 0.55));
      grad.addColorStop(1, rgba(color, 0.95));

      drawWing(ctx, -s * 0.52, -s * 0.22, s * 0.6, s * 0.42, -0.35, grad);
      drawWing(ctx, s * 0.52, -s * 0.22, s * 0.6, s * 0.42, 0.35, grad);
      drawWing(ctx, -s * 0.42, s * 0.28, s * 0.42, s * 0.3, 0.4, grad);
      drawWing(ctx, s * 0.42, s * 0.28, s * 0.42, s * 0.3, -0.4, grad);
      ctx.restore();

      // corps
      ctx.strokeStyle = rgba([255, 240, 210], 0.85);
      ctx.lineWidth = Math.max(1, s * 0.075);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.42);
      ctx.lineTo(0, s * 0.5);
      ctx.stroke();

      // antennes
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.42);
      ctx.quadraticCurveTo(-s * 0.28, -s * 0.75, -s * 0.42, -s * 0.7);
      ctx.moveTo(0, -s * 0.42);
      ctx.quadraticCurveTo(s * 0.28, -s * 0.75, s * 0.42, -s * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const drawSpore = (p: Spore) => {
      const color = PALETTE[p.hue];
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = rgba(color, 1);
      ctx.shadowBlur = 8;
      ctx.shadowColor = rgba(color, 0.9);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const frame = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const p of spores) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t + p.y * 0.01) * 0.12;
        if (p.y < -12) Object.assign(p, createSpore(false));
        drawSpore(p);
      }

      for (const b of butterflies) {
        b.y += b.speedY;
        b.x += b.speedX + Math.sin(t * 0.5 + b.phase) * 0.35;
        if (b.y < -120) Object.assign(b, createButterfly(false));
        if (b.x < -140) b.x = width + 120;
        if (b.x > width + 140) b.x = -120;
        drawButterfly(b, t);
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    if (reduceMotion) {
      // Un seul rendu statique, sans animation
      const t = 1.2;
      ctx.clearRect(0, 0, width, height);
      for (const p of spores) drawSpore(p);
      for (const b of butterflies) drawButterfly(b, t);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-[0.55]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(4,6,15,0.55)_100%)]" />
    </div>
  );
}

export default ButterflyField;
