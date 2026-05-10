import type { Point, GameMode, DefenseType } from '../types';
import type { PlayerAnimState } from './animationController';
import type { ScreenAction } from '../types';

const BASKET: Point = { x: 50, y: 10 };

const ZONE_23: Record<GameMode, Point[]> = {
  '5v5': [
    { x: 35, y: 55 }, { x: 65, y: 55 },
    { x: 20, y: 25 }, { x: 50, y: 20 }, { x: 80, y: 25 },
  ],
  '4v4': [
    { x: 35, y: 55 }, { x: 65, y: 55 },
    { x: 30, y: 25 }, { x: 70, y: 25 },
  ],
  '3v3': [
    { x: 50, y: 55 },
    { x: 30, y: 25 }, { x: 70, y: 25 },
  ],
};

const ZONE_32: Record<GameMode, Point[]> = {
  '5v5': [
    { x: 30, y: 55 }, { x: 50, y: 50 }, { x: 70, y: 55 },
    { x: 35, y: 25 }, { x: 65, y: 25 },
  ],
  '4v4': [
    { x: 30, y: 55 }, { x: 50, y: 50 }, { x: 70, y: 55 },
    { x: 50, y: 25 },
  ],
  '3v3': [
    { x: 35, y: 55 }, { x: 65, y: 55 },
    { x: 50, y: 25 },
  ],
};

function guardPosition(player: Point): Point {
  const dx = BASKET.x - player.x;
  const dy = BASKET.y - player.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  return {
    x: player.x + (dx / dist) * 12,
    y: player.y + (dy / dist) * 12,
  };
}

export interface DefenseState {
  stuckAt: Map<number, Point>;
}

export function createDefenseState(): DefenseState {
  return { stuckAt: new Map() };
}

export function applyScreen(state: DefenseState, screens: ScreenAction[], offensePlayers: PlayerAnimState[], currentDefPositions: Point[]): DefenseState {
  const stuckAt = new Map(state.stuckAt);

  for (const screen of screens) {
    const targetIdx = offensePlayers.findIndex(p => p.positionId === screen.targetId);
    if (targetIdx < 0) continue;
    if (stuckAt.has(targetIdx)) continue;
    stuckAt.set(targetIdx, { ...currentDefPositions[targetIdx] });
  }

  return { stuckAt };
}

export function getDefenderPositions(
  type: DefenseType,
  mode: GameMode,
  offensePlayers: PlayerAnimState[],
  defState: DefenseState
): Point[] {
  if (type === 'none') return [];

  if (type === 'man') {
    return offensePlayers.map((p, idx) => {
      if (defState.stuckAt.has(idx)) {
        return defState.stuckAt.get(idx)!;
      }
      return guardPosition(p);
    });
  }

  if (type === 'zone23') return ZONE_23[mode] ?? [];
  if (type === 'zone32') return ZONE_32[mode] ?? [];

  return [];
}
