'use client';

import { useEffect, useRef } from 'react';

/**
 * Globe 3D (canvas) : sphère en rotation, marqueurs de nations avec drapeaux,
 * arcs de mission et logo METAMORPHOO en orbite.
 * Aucune dépendance externe — dessin vectoriel temps réel.
 */

type Nation = {
  code: string;
  name: string;
  lat: number;
  lon: number;
  flag: string[]; // couleurs des bandes (de gauche à droite)
  vertical?: boolean;
};

const NATIONS: Nation[] = [
  { code: 'CD', name: 'RD Congo', lat: -1.68, lon: 29.22, flag: ['#0099FF', '#FFD100', '#E03A1E'] },
  { code: 'NG', name: 'Nigeria', lat: 9.08, lon: 8.68, flag: ['#008751', '#FFFFFF', '#008751'] },
  { code: 'KE', name: 'Kenya', lat: -0.02, lon: 37.91, flag: ['#000000', '#BB0000', '#006600'] },
  { code: 'ZA', name: 'Afrique du Sud', lat: -30.56, lon: 22.12, flag: ['#007A4D', '#FFB612', '#DE3831'] },
  { code: 'FR', name: 'France', lat: 46.6, lon: 2.35, flag: ['#0055A4', '#FFFFFF', '#EF4135'] },
  { code: 'ES', name: 'Espagne', lat: 40.4, lon: -3.7, flag: ['#AA151B', '#F1BF00', '#AA151B'] },
  { code: 'US', name: 'États-Unis', lat: 38.9, lon: -77.03, flag: ['#B31942', '#FFFFFF', '#0A3161'] },
  { code: 'BR', name: 'Brésil', lat: -15.78, lon: -47.93, flag: ['#009C3B', '#FFDF00', '#002776'] },
  { code: 'IN', name: 'Inde', lat: 20.59, lon: 78.96, flag: ['#FF9933', '#FFFFFF', '#138808'] },
  { code: 'ID', name: 'Indonésie', lat: -6.2, lon: 106.82, flag: ['#CE1126', '#FFFFFF'] },
];

const TILT = -0.38; // inclinaison de l'axe
const RADIUS = 1;

type Point3 = { x: number; y: number; z: number };

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function rotate(p: Point3, lon: number, lat: number): Point3 {
  // rotation autour de l'axe Y (longitude)
  const cl = Math.cos(lon);
  const sl = Math.sin(lon);
  let x = p.x * cl + p.z * sl;
  let z = -p.x * sl + p.z * cl;
  let y = p.y;
  // inclinaison (rotation autour de X)
  const ca = Math.cos(lat);
  const sa = Math.sin(lat);
  const y2 = y * ca - z * sa;
  const z2 = y * sa + z * ca;
  return { x, y: y2, z: z2 };
}

function latLonToVec(lat: number, lon: number): Point3 {
  const phi = toRad(lat);
  const theta = toRad(lon);
  return {
    x: RADIUS * Math.cos(phi) * Math.sin(theta),
    y: RADIUS * Math.sin(phi),
    z: RADIUS * Math.cos(phi) * Math.cos(theta),
  };
}

export function GlobeCanvas({
  className = '',
  nationNames,
  ariaLabel,
}: {
  className?: string;
  nationNames?: string[];
  ariaLabel?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const names = nationNames ?? NATIONS.map((n) => n.name);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 0;

    // Logo vectoriel (SVG) dessiné sur le canvas
    const logoImg = new Image();
    logoImg.src = '/logo-mark.svg';

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      R = Math.min(width, height) * 0.34;
    };

    const project = (p: Point3) => ({
      x: cx + p.x * R,
      y: cy - p.y * R,
      z: p.z,
    });

    const drawFlag = (x: number, y: number, w: number, nation: Nation) => {
      const h = w * 0.66;
      const n = nation.flag.length;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = nation.flag[i];
        if (nation.vertical) {
          ctx.fillRect(x + (i * w) / n, y, w / n + 0.6, h);
        } else {
          ctx.fillRect(x, y + (i * h) / n, w, h / n + 0.6);
        }
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 0.7;
      ctx.strokeRect(x, y, w, h);
    };

    const frame = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      const lon = t * 0.16;
      const lat = TILT;

      // ---------- Halo ----------
      const halo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.7);
      halo.addColorStop(0, 'rgba(249,162,39,0.20)');
      halo.addColorStop(0.5, 'rgba(221,43,24,0.07)');
      halo.addColorStop(1, 'rgba(4,6,15,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.7, 0, Math.PI * 2);
      ctx.fill();

      // ---------- Sphère ----------
      const sphere = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      sphere.addColorStop(0, 'rgba(38,50,95,0.95)');
      sphere.addColorStop(0.55, 'rgba(11,16,38,0.95)');
      sphere.addColorStop(1, 'rgba(4,6,15,0.98)');
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // ---------- Points de la grille (effet "globe digital") ----------
      const step = 9;
      for (let la = -80; la <= 80; la += step) {
        for (let lo = -180; lo < 180; lo += step) {
          const v = rotate(latLonToVec(la, lo), lon, lat);
          if (v.z < 0) continue;
          const p = project(v);
          const depth = (v.z + 1) / 2;
          ctx.fillStyle = `rgba(255,203,138,${0.06 + depth * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.7 + depth * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ---------- Méridiens / parallèles ----------
      ctx.lineWidth = 0.8;
      for (let lo = 0; lo < 360; lo += 30) {
        ctx.strokeStyle = 'rgba(249,162,39,0.10)';
        ctx.beginPath();
        for (let la = -90; la <= 90; la += 4) {
          const v = rotate(latLonToVec(la, lo), lon, lat);
          if (v.z < -0.05) continue;
          const p = project(v);
          if (la === -90) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let la = -60; la <= 60; la += 30) {
        ctx.strokeStyle = 'rgba(249,162,39,0.08)';
        ctx.beginPath();
        for (let lo = -180; lo <= 180; lo += 4) {
          const v = rotate(latLonToVec(la, lo), lon, lat);
          if (v.z < -0.05) continue;
          const p = project(v);
          if (lo === -180) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // ---------- Liseré lumineux ----------
      ctx.strokeStyle = 'rgba(249,162,39,0.55)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // ---------- Marqueurs de nations ----------
      const projectedNations = NATIONS.map((n) => {
        const v = rotate(latLonToVec(n.lat, n.lon), lon, lat);
        return { nation: n, p: project(v), z: v.z };
      });

      // Arcs de mission depuis Goma
      const home = projectedNations[0];
      if (home.z > 0) {
        for (const target of projectedNations.slice(1)) {
          if (target.z <= 0) continue;
          const midX = (home.p.x + target.p.x) / 2;
          const midY = (home.p.y + target.p.y) / 2;
          const dx = midX - cx;
          const dy = midY - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const lift = R * 0.28;
          const cxp = midX + (dx / dist) * lift;
          const cyp = midY + (dy / dist) * lift;

          ctx.strokeStyle = 'rgba(46,211,155,0.30)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 5]);
          ctx.lineDashOffset = -t * 22;
          ctx.beginPath();
          ctx.moveTo(home.p.x, home.p.y);
          ctx.quadraticCurveTo(cxp, cyp, target.p.x, target.p.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      for (let ni = 0; ni < projectedNations.length; ni++) {
        const nation = projectedNations[ni].nation;
        const p = projectedNations[ni].p;
        const z = projectedNations[ni].z;
        const nationName = names[ni] ?? nation.name;
        const visible = z > -0.15;
        if (!visible) continue;
        const depth = (z + 1) / 2;
        const size = 15 + depth * 5;

        // point lumineux
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 0.9);
        glow.addColorStop(0, 'rgba(255,203,138,0.95)');
        glow.addColorStop(0.35, 'rgba(249,162,39,0.55)');
        glow.addColorStop(1, 'rgba(249,162,39,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.9, 0, Math.PI * 2);
        ctx.fill();

        if (z > 0.15) {
          drawFlag(p.x - size / 2, p.y - size * 1.15, size, nation);
          ctx.font = `600 ${Math.max(9, size * 0.42)}px Inter, system-ui, sans-serif`;
          ctx.fillStyle = 'rgba(247,243,234,0.85)';
          ctx.textAlign = 'center';
          ctx.fillText(nationName, p.x, p.y + size * 0.75);
        }
      }

      // ---------- Logo en orbite ----------
      const orbitR = R * 1.28;
      const angle = t * 0.55;
      const ox = cx + Math.cos(angle) * orbitR;
      const oy = cy + Math.sin(angle) * orbitR * 0.32 - R * 0.1;

      // anneau d'orbite
      ctx.strokeStyle = 'rgba(249,162,39,0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy - R * 0.1, orbitR, orbitR * 0.32, 0, 0, Math.PI * 2);
      ctx.stroke();

      const logoSize = R * 0.42;
      const logoGlow = ctx.createRadialGradient(ox, oy, 0, ox, oy, logoSize);
      logoGlow.addColorStop(0, 'rgba(255,203,138,0.75)');
      logoGlow.addColorStop(1, 'rgba(249,162,39,0)');
      ctx.fillStyle = logoGlow;
      ctx.beginPath();
      ctx.arc(ox, oy, logoSize, 0, Math.PI * 2);
      ctx.fill();

      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.drawImage(logoImg, ox - logoSize * 0.42, oy - logoSize * 0.42, logoSize * 0.84, logoSize * 0.84);
      } else {
        ctx.fillStyle = '#F9A227';
        ctx.beginPath();
        ctx.arc(ox, oy, logoSize * 0.22, 0, Math.PI * 2);
        ctx.fill();
      }

      // trainée
      for (let i = 1; i <= 8; i++) {
        const a = angle - i * 0.045;
        const tx = cx + Math.cos(a) * orbitR;
        const ty = cy + Math.sin(a) * orbitR * 0.32 - R * 0.1;
        ctx.fillStyle = `rgba(249,162,39,${0.16 - i * 0.018})`;
        ctx.beginPath();
        ctx.arc(tx, ty, logoSize * (0.16 - i * 0.014), 0, Math.PI * 2);
        ctx.fill();
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
      frame(2000);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [names]);

  return <canvas ref={canvasRef} className={className} aria-label={ariaLabel} role="img" />;
}

export default GlobeCanvas;
