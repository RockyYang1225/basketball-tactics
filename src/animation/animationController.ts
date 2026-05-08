import type { TacticResult, Point } from '../types';

export interface AnimationState {
  isPlaying: boolean;
  currentStep: number;
  stepProgress: number;
  speed: number;
  totalSteps: number;
}

export interface PlayerAnimState {
  positionId: string;
  x: number;
  y: number;
  name: string;
  isKeyPlayer: boolean;
  hasBall: boolean;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolatePath(path: Point[], t: number): Point {
  if (path.length === 0) return { x: 0, y: 0 };
  if (path.length === 1) return path[0];
  const totalSegments = path.length - 1;
  const segFloat = t * totalSegments;
  const seg = Math.min(Math.floor(segFloat), totalSegments - 1);
  const segT = segFloat - seg;
  return {
    x: lerp(path[seg].x, path[seg + 1].x, segT),
    y: lerp(path[seg].y, path[seg + 1].y, segT),
  };
}

export class AnimationController {
  private result: TacticResult;
  private state: AnimationState;
  private playerPositions: Map<string, Point>;
  private ballCarrier: string;
  private animFrameId: number | null = null;
  private lastTimestamp: number = 0;
  private stepElapsed: number = 0;
  private onChange: (state: AnimationState, players: PlayerAnimState[]) => void;

  constructor(
    result: TacticResult,
    onChange: (state: AnimationState, players: PlayerAnimState[]) => void
  ) {
    this.result = result;
    this.onChange = onChange;
    this.playerPositions = new Map();
    this.ballCarrier = result.tactic.positions[0]?.id ?? '';
    this.state = {
      isPlaying: false,
      currentStep: 0,
      stepProgress: 0,
      speed: 1,
      totalSteps: result.tactic.steps.length,
    };
    this.initPositions();
  }

  private initPositions() {
    for (const pos of this.result.tactic.positions) {
      this.playerPositions.set(pos.id, { x: pos.initialX, y: pos.initialY });
    }
    this.ballCarrier = this.result.tactic.positions[0]?.id ?? '';
  }

  getState(): AnimationState {
    return { ...this.state };
  }

  getPlayers(): PlayerAnimState[] {
    return this.result.tactic.positions.map(pos => {
      const p = this.playerPositions.get(pos.id) ?? { x: pos.initialX, y: pos.initialY };
      const player = this.result.assignments.get(pos.id);
      return {
        positionId: pos.id,
        x: p.x,
        y: p.y,
        name: player?.name ?? pos.role,
        isKeyPlayer: player?.isKeyPlayer ?? false,
        hasBall: pos.id === this.ballCarrier,
      };
    });
  }

  play() {
    if (this.state.isPlaying) return;
    this.state.isPlaying = true;
    this.lastTimestamp = performance.now();
    this.tick(this.lastTimestamp);
  }

  pause() {
    this.state.isPlaying = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.emitChange();
  }

  goToStep(step: number) {
    if (step < 0 || step >= this.state.totalSteps) return;

    this.initPositions();
    for (let i = 0; i < step; i++) {
      this.applyStepEnd(i);
    }

    this.state.currentStep = step;
    this.state.stepProgress = 0;
    this.stepElapsed = 0;
    this.emitChange();
  }

  nextStep() {
    if (this.state.currentStep < this.state.totalSteps - 1) {
      this.applyStepEnd(this.state.currentStep);
      this.state.currentStep++;
      this.state.stepProgress = 0;
      this.stepElapsed = 0;
      this.emitChange();
    }
  }

  prevStep() {
    if (this.state.currentStep > 0) {
      this.goToStep(this.state.currentStep - 1);
    }
  }

  setSpeed(speed: number) {
    this.state.speed = speed;
  }

  reset() {
    this.pause();
    this.initPositions();
    this.state.currentStep = 0;
    this.state.stepProgress = 0;
    this.stepElapsed = 0;
    this.emitChange();
  }

  destroy() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  private applyStepEnd(stepIdx: number) {
    const step = this.result.tactic.steps[stepIdx];
    if (!step) return;

    for (const mov of step.movements) {
      if (mov.path.length > 0) {
        this.playerPositions.set(mov.positionId, mov.path[mov.path.length - 1]);
      }
    }
    if (step.passes.length > 0) {
      this.ballCarrier = step.passes[step.passes.length - 1].to;
    }
  }

  private tick = (now: number) => {
    if (!this.state.isPlaying) return;

    const delta = (now - this.lastTimestamp) * this.state.speed;
    this.lastTimestamp = now;
    const step = this.result.tactic.steps[this.state.currentStep];

    if (step) {
      this.stepElapsed += delta;
      const progress = Math.min(this.stepElapsed / step.duration, 1);
      this.state.stepProgress = progress;

      for (const mov of step.movements) {
        const pos = interpolatePath(mov.path, progress);
        this.playerPositions.set(mov.positionId, pos);
      }

      if (step.passes.length > 0 && progress > 0.5) {
        this.ballCarrier = step.passes[step.passes.length - 1].to;
      }

      this.emitChange();

      if (progress >= 1) {
        this.applyStepEnd(this.state.currentStep);
        if (this.state.currentStep < this.state.totalSteps - 1) {
          this.state.currentStep++;
          this.state.stepProgress = 0;
          this.stepElapsed = 0;
          // Brief pause between steps
          setTimeout(() => {
            if (this.state.isPlaying) {
              this.lastTimestamp = performance.now();
              this.animFrameId = requestAnimationFrame(this.tick);
            }
          }, 500 / this.state.speed);
          return;
        } else {
          this.state.isPlaying = false;
          this.emitChange();
          return;
        }
      }
    }

    this.animFrameId = requestAnimationFrame(this.tick);
  };

  private emitChange() {
    this.onChange(this.getState(), this.getPlayers());
  }
}
