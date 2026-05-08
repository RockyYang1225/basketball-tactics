import type { CourtStyle, Point } from '../types';

interface RenderOptions {
  style: CourtStyle;
  width: number;
  height: number;
  isHalfCourt: boolean;
}

interface PlayerState {
  positionId: string;
  x: number;
  y: number;
  name: string;
  isKeyPlayer: boolean;
  hasBall: boolean;
}

function toCanvas(p: Point, opts: RenderOptions): { cx: number; cy: number } {
  return {
    cx: (p.x / 100) * opts.width,
    cy: (p.y / 100) * opts.height,
  };
}

export function drawCourt(ctx: CanvasRenderingContext2D, opts: RenderOptions) {
  const { width, height, style } = opts;
  ctx.clearRect(0, 0, width, height);

  if (style === 'realistic') {
    ctx.fillStyle = '#c8915a';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
  } else {
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1.5;
  }

  // Court boundary
  ctx.strokeRect(2, 2, width - 4, height - 4);

  const bx = width / 2;
  const by = (5 / 100) * height;

  // Basket
  ctx.beginPath();
  ctx.arc(bx, by, 4, 0, Math.PI * 2);
  ctx.fillStyle = style === 'realistic' ? '#ff6600' : '#333';
  ctx.fill();

  // Backboard
  ctx.beginPath();
  ctx.moveTo(bx - 15, by - 4);
  ctx.lineTo(bx + 15, by - 4);
  ctx.stroke();

  // Paint / key area (19ft wide, ~16ft deep)
  const paintW = (38 / 100) * width;
  const paintH = (25 / 100) * height;
  const paintX = bx - paintW / 2;
  ctx.strokeRect(paintX, 0, paintW, paintH);

  // Free throw circle
  ctx.beginPath();
  ctx.arc(bx, paintH, paintW / 2, 0, Math.PI);
  ctx.stroke();

  // Three-point line
  ctx.beginPath();
  const threeRadius = (42 / 100) * width;
  const cornerY = (12 / 100) * height;
  ctx.moveTo(bx - (44 / 100) * width, 0);
  ctx.lineTo(bx - (44 / 100) * width, cornerY);
  ctx.arc(bx, by, threeRadius, Math.PI + 0.3, -0.3);
  ctx.lineTo(bx + (44 / 100) * width, 0);
  ctx.stroke();

  // Half-court line (bottom)
  if (opts.isHalfCourt) {
    ctx.beginPath();
    ctx.moveTo(0, height - 2);
    ctx.lineTo(width, height - 2);
    ctx.stroke();
  }
}

export function drawPlayers(
  ctx: CanvasRenderingContext2D,
  players: PlayerState[],
  opts: RenderOptions
) {
  const radius = Math.max(14, opts.width * 0.035);

  for (const p of players) {
    const { cx, cy } = toCanvas({ x: p.x, y: p.y }, opts);

    // Glow for key players
    if (p.isKeyPlayer) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 193, 7, 0.35)';
      ctx.fill();
    }

    // Player circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = p.isKeyPlayer ? '#ffc107' : '#4a90d9';
    ctx.fill();
    ctx.strokeStyle = p.isKeyPlayer ? '#e6a800' : '#2c6fad';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Name initial
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${radius * 0.9}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.name.charAt(0) || '?', cx, cy);

    // Name label below
    ctx.fillStyle = opts.style === 'realistic' ? '#fff' : '#333';
    ctx.font = `${radius * 0.65}px sans-serif`;
    ctx.fillText(p.name, cx, cy + radius + 12);

    // Ball indicator
    if (p.hasBall) {
      ctx.beginPath();
      ctx.arc(cx + radius + 6, cy - radius + 2, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff6600';
      ctx.fill();
      ctx.strokeStyle = '#cc5500';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

export function drawPassLine(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  progress: number,
  opts: RenderOptions
) {
  const f = toCanvas(from, opts);
  const t = toCanvas(to, opts);

  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.moveTo(f.cx, f.cy);
  ctx.lineTo(t.cx, t.cy);
  ctx.strokeStyle = 'rgba(255, 102, 0, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Ball moving along pass
  const bx = f.cx + (t.cx - f.cx) * progress;
  const by = f.cy + (t.cy - f.cy) * progress;
  ctx.beginPath();
  ctx.arc(bx, by, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#ff6600';
  ctx.fill();
}

export function drawMovementTrail(
  ctx: CanvasRenderingContext2D,
  path: Point[],
  opts: RenderOptions
) {
  if (path.length < 2) return;
  ctx.beginPath();
  ctx.setLineDash([6, 4]);
  const start = toCanvas(path[0], opts);
  ctx.moveTo(start.cx, start.cy);
  for (let i = 1; i < path.length; i++) {
    const p = toCanvas(path[i], opts);
    ctx.lineTo(p.cx, p.cy);
  }
  ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow at end
  const last = toCanvas(path[path.length - 1], opts);
  const prev = toCanvas(path[path.length - 2], opts);
  const angle = Math.atan2(last.cy - prev.cy, last.cx - prev.cx);
  const arrowLen = 8;
  ctx.beginPath();
  ctx.moveTo(last.cx, last.cy);
  ctx.lineTo(last.cx - arrowLen * Math.cos(angle - 0.4), last.cy - arrowLen * Math.sin(angle - 0.4));
  ctx.moveTo(last.cx, last.cy);
  ctx.lineTo(last.cx - arrowLen * Math.cos(angle + 0.4), last.cy - arrowLen * Math.sin(angle + 0.4));
  ctx.strokeStyle = 'rgba(100, 100, 100, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export function drawScreenSymbol(
  ctx: CanvasRenderingContext2D,
  pos: Point,
  opts: RenderOptions
) {
  const { cx, cy } = toCanvas(pos, opts);
  ctx.beginPath();
  ctx.moveTo(cx - 10, cy);
  ctx.lineTo(cx + 10, cy);
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 3;
  ctx.stroke();
}
