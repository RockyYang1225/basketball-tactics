import { useRef, useEffect, useState, useCallback } from 'react';
import { useI18n } from '../i18n/context';
import type { TacticResult, CourtStyle, DefenseType } from '../types';
import { AnimationController, type AnimationState, type PlayerAnimState } from '../animation/animationController';
import { drawCourt, drawPlayers, drawMovementTrail, drawPassLine, drawScreenBlock, drawDefenders } from '../animation/courtRenderer';
import { getDefenderPositions, createDefenseState, applyScreen, type DefenseState } from '../animation/defensePositions';
import './CourtCanvas.css';

interface Props {
  result: TacticResult;
}

export function CourtCanvas({ result }: Props) {
  const { lang, t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AnimationController | null>(null);
  const styleRef = useRef<CourtStyle>('board');
  const resultRef = useRef(result);
  resultRef.current = result;

  const [animState, setAnimState] = useState<AnimationState>({
    isPlaying: false, currentStep: 0, stepProgress: 0, speed: 1, totalSteps: result.tactic.steps.length,
  });
  const [style, setStyle] = useState<CourtStyle>('board');
  const [defense, setDefense] = useState<DefenseType>('man');
  const defenseRef = useRef<DefenseType>('man');
  const defStateRef = useRef<DefenseState>(createDefenseState());
  const lastStepRef = useRef<number>(-1);
  styleRef.current = style;
  defenseRef.current = defense;

  const paintCanvas = useCallback((aState: AnimationState, pStates: PlayerAnimState[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    if (w === 0 || h === 0) { ctx.restore(); return; }
    const opts = { style: styleRef.current, width: w, height: h, isHalfCourt: true };

    drawCourt(ctx, opts);

    const tactic = resultRef.current.tactic;
    const step = tactic.steps[aState.currentStep];
    const activeScreens = step?.screens ?? [];

    if (aState.currentStep !== lastStepRef.current) {
      if (aState.currentStep === 0) {
        defStateRef.current = createDefenseState();
      }
      lastStepRef.current = aState.currentStep;
    }

    let frameDefState = defStateRef.current;
    if (activeScreens.length > 0 && aState.stepProgress > 0.25) {
      const currentDefPos = getDefenderPositions(defenseRef.current, tactic.mode, pStates, defStateRef.current);
      for (const screen of activeScreens) {
        const targetIdx = pStates.findIndex(p => p.positionId === screen.targetId);
        const screenerIdx = pStates.findIndex(p => p.positionId === screen.screenerId);
        if (targetIdx < 0 || screenerIdx < 0) continue;
        if (defStateRef.current.stuckAt.has(targetIdx)) continue;
        const screener = pStates[screenerIdx];
        const def = currentDefPos[targetIdx];
        if (!def) continue;
        const dx = def.x - screener.x;
        const dy = def.y - screener.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 12) {
          frameDefState = applyScreen(defStateRef.current, activeScreens, pStates, currentDefPos);
          defStateRef.current = frameDefState;
          break;
        }
      }
    }

    const defPositions = getDefenderPositions(defenseRef.current, tactic.mode, pStates, frameDefState);
    if (defPositions.length > 0) {
      drawDefenders(ctx, defPositions, opts);
    }

    if (step) {
      for (const mov of step.movements) {
        drawMovementTrail(ctx, mov.path, opts);
      }
      for (const scr of step.screens) {
        const screener = pStates.find(p => p.positionId === scr.screenerId);
        const targetIdx = pStates.findIndex(p => p.positionId === scr.targetId);
        if (screener && frameDefState.stuckAt.has(targetIdx)) {
          const stuckPos = frameDefState.stuckAt.get(targetIdx)!;
          drawScreenBlock(ctx, { x: screener.x, y: screener.y }, stuckPos, opts);
        }
      }
      for (const pass of step.passes) {
        const fromP = pStates.find(p => p.positionId === pass.from);
        const toP = pStates.find(p => p.positionId === pass.to);
        if (fromP && toP) {
          drawPassLine(ctx, { x: fromP.x, y: fromP.y }, { x: toP.x, y: toP.y }, aState.stepProgress, opts);
        }
      }
    }

    drawPlayers(ctx, pStates, opts);
    ctx.restore();
  }, []);

  const prevStateRef = useRef({ currentStep: 0, isPlaying: false });
  const onControllerChange = useCallback((aState: AnimationState, pStates: PlayerAnimState[]) => {
    const prev = prevStateRef.current;
    if (prev.currentStep !== aState.currentStep || prev.isPlaying !== aState.isPlaying) {
      prevStateRef.current = { currentStep: aState.currentStep, isPlaying: aState.isPlaying };
      setAnimState(aState);
    }
    paintCanvas(aState, pStates);
  }, [paintCanvas]);

  useEffect(() => {
    const ctrl = new AnimationController(result, onControllerChange);
    controllerRef.current = ctrl;
    prevStateRef.current = { currentStep: 0, isPlaying: false };
    defStateRef.current = createDefenseState();
    lastStepRef.current = -1;
    const state = ctrl.getState();
    const players = ctrl.getPlayers();
    setAnimState(state);
    paintCanvas(state, players);
    return () => { ctrl.destroy(); controllerRef.current = null; };
  }, [result, onControllerChange, paintCanvas]);

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
      const ctrl = controllerRef.current;
      if (ctrl) paintCanvas(ctrl.getState(), ctrl.getPlayers());
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(container);
    return () => obs.disconnect();
  }, [paintCanvas]);

  useEffect(() => {
    const ctrl = controllerRef.current;
    if (ctrl) paintCanvas(ctrl.getState(), ctrl.getPlayers());
  }, [style, defense, paintCanvas]);

  const step = result.tactic.steps[animState.currentStep];

  return (
    <div className="court-canvas-wrapper">
      <div ref={containerRef} className="court-container">
        <canvas ref={canvasRef} />
      </div>
      <div className="court-controls">
        <button onClick={() => controllerRef.current?.prevStep()} disabled={animState.currentStep === 0}>
          {t.animation.prev}
        </button>
        <button onClick={() => {
          const c = controllerRef.current;
          if (!c) return;
          c.getState().isPlaying ? c.pause() : c.play();
        }}>
          {animState.isPlaying ? t.animation.pause : t.animation.play}
        </button>
        <button onClick={() => controllerRef.current?.nextStep()} disabled={animState.currentStep >= animState.totalSteps - 1}>
          {t.animation.next}
        </button>
        <span className="step-indicator">
          {`${animState.currentStep + 1} / ${animState.totalSteps}`}
        </span>
        <select
          className="speed-select"
          value={animState.speed}
          onChange={e => controllerRef.current?.setSpeed(Number(e.target.value))}
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
        <select
          className="style-select"
          value={defense}
          onChange={e => setDefense(e.target.value as DefenseType)}
        >
          <option value="none">{t.animation.defNone}</option>
          <option value="man">{t.animation.defMan}</option>
          <option value="zone23">{t.animation.defZone23}</option>
          <option value="zone32">{t.animation.defZone32}</option>
        </select>
      </div>
      {step && (
        <p className="step-description">{step.description[lang]}</p>
      )}
    </div>
  );
}
