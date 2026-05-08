import { useRef, useEffect, useState, useCallback } from 'react';
import { useI18n } from '../i18n/context';
import type { TacticResult, CourtStyle } from '../types';
import { AnimationController, type AnimationState, type PlayerAnimState } from '../animation/animationController';
import { drawCourt, drawPlayers, drawMovementTrail, drawPassLine, drawScreenSymbol } from '../animation/courtRenderer';
import './CourtCanvas.css';

interface Props {
  result: TacticResult;
}

export function CourtCanvas({ result }: Props) {
  const { lang, t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AnimationController | null>(null);
  const [animState, setAnimState] = useState<AnimationState>({
    isPlaying: false, currentStep: 0, stepProgress: 0, speed: 1, totalSteps: result.tactic.steps.length,
  });
  const [players, setPlayers] = useState<PlayerAnimState[]>([]);
  const [style, setStyle] = useState<CourtStyle>('board');

  const render = useCallback((aState: AnimationState, pStates: PlayerAnimState[]) => {
    setAnimState(aState);
    setPlayers(pStates);
  }, []);

  useEffect(() => {
    const ctrl = new AnimationController(result, render);
    controllerRef.current = ctrl;
    render(ctrl.getState(), ctrl.getPlayers());
    return () => ctrl.destroy();
  }, [result, render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const w = container.clientWidth;
      const h = Math.round(w * 0.75);
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    const opts = { style, width: w, height: h, isHalfCourt: true };

    drawCourt(ctx, opts);

    const step = result.tactic.steps[animState.currentStep];
    if (step) {
      for (const mov of step.movements) {
        drawMovementTrail(ctx, mov.path, opts);
      }
      for (const scr of step.screens) {
        const screener = players.find(p => p.positionId === scr.screenerId);
        if (screener) drawScreenSymbol(ctx, { x: screener.x, y: screener.y }, opts);
      }
      for (const pass of step.passes) {
        const fromP = players.find(p => p.positionId === pass.from);
        const toP = players.find(p => p.positionId === pass.to);
        if (fromP && toP) {
          drawPassLine(ctx, { x: fromP.x, y: fromP.y }, { x: toP.x, y: toP.y }, animState.stepProgress, opts);
        }
      }
    }

    drawPlayers(ctx, players, opts);
    ctx.restore();
  }, [players, animState, style, result]);

  const ctrl = controllerRef.current;
  const step = result.tactic.steps[animState.currentStep];

  return (
    <div className="court-canvas-wrapper">
      <div ref={containerRef} className="court-container">
        <canvas ref={canvasRef} />
      </div>
      <div className="court-controls">
        <button onClick={() => ctrl?.prevStep()} disabled={animState.currentStep === 0}>
          {t.animation.prev}
        </button>
        <button onClick={() => animState.isPlaying ? ctrl?.pause() : ctrl?.play()}>
          {animState.isPlaying ? t.animation.pause : t.animation.play}
        </button>
        <button onClick={() => ctrl?.nextStep()} disabled={animState.currentStep >= animState.totalSteps - 1}>
          {t.animation.next}
        </button>
        <span className="step-indicator">
          {t.animation.prev && `${animState.currentStep + 1} / ${animState.totalSteps}`}
        </span>
        <select
          className="speed-select"
          value={animState.speed}
          onChange={e => ctrl?.setSpeed(Number(e.target.value))}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
        </select>
        <select
          className="style-select"
          value={style}
          onChange={e => setStyle(e.target.value as CourtStyle)}
        >
          <option value="board">{t.animation.board}</option>
          <option value="realistic">{t.animation.realistic}</option>
        </select>
      </div>
      {step && (
        <p className="step-description">{step.description[lang]}</p>
      )}
    </div>
  );
}
