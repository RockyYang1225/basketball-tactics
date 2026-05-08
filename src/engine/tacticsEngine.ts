import type { Player, GameMode, TacticDefinition, TacticResult, PlayerTag } from '../types';
import { tactics3v3 } from '../data/tactics3v3';
import { tactics4v4 } from '../data/tactics4v4';
import { tactics5v5 } from '../data/tactics5v5';

const tacticsByMode: Record<GameMode, TacticDefinition[]> = {
  '3v3': tactics3v3,
  '4v4': tactics4v4,
  '5v5': tactics5v5,
};

function playerHasAnyTag(player: Player, tags: PlayerTag[]): boolean {
  const allTags: string[] = [
    ...player.offensiveTags,
    ...player.skillTags,
    ...player.physicalTags,
  ];
  return tags.some(t => allTags.includes(t));
}

function isRolePlayer(player: Player): boolean {
  return (
    player.offensiveTags.length === 0 &&
    player.skillTags.length === 0 &&
    player.physicalTags.length === 0 &&
    !player.position
  );
}

function scoreTactic(tactic: TacticDefinition, players: Player[]): number {
  let score = 50;
  const keyPlayers = players.filter(p => p.isKeyPlayer);
  const rolePlayerRatio = players.filter(isRolePlayer).length / players.length;

  for (const req of tactic.requirements) {
    const matched = keyPlayers.some(p => playerHasAnyTag(p, req.tags));
    if (req.priority === 'required') {
      score += matched ? 30 : -50;
    } else {
      score += matched ? 15 : 0;
    }
  }

  if (tactic.requirements.length === 0) {
    score += 10;
  }

  if (rolePlayerRatio > 0.6) {
    score += tactic.complexity === 'simple' ? 20 : tactic.complexity === 'complex' ? -10 : 0;
  }

  for (const pos of tactic.positions) {
    const hasFit = players.some(p => {
      if (pos.role === 'spacer' || pos.role === 'screener' || pos.role === 'screener1' || pos.role === 'screener2') return true;
      const req = tactic.requirements.find(r => r.role === pos.role);
      if (!req) return true;
      return playerHasAnyTag(p, req.tags);
    });
    if (hasFit) score += 10;
  }

  return score;
}

function assignPlayers(tactic: TacticDefinition, players: Player[]): Map<string, Player> {
  const assignments = new Map<string, Player>();
  const available = [...players];

  const corePositions = tactic.positions.filter(pos =>
    tactic.requirements.some(r => r.role === pos.role)
  );
  const auxPositions = tactic.positions.filter(pos =>
    !tactic.requirements.some(r => r.role === pos.role)
  );

  for (const pos of corePositions) {
    const req = tactic.requirements.find(r => r.role === pos.role);
    const bestIdx = available.reduce((best, player, idx) => {
      if (best === -1) return idx;
      const bestPlayer = available[best];
      const currentScore =
        (player.isKeyPlayer ? 100 : 0) +
        (req && playerHasAnyTag(player, req.tags) ? 50 : 0);
      const bestScore =
        (bestPlayer.isKeyPlayer ? 100 : 0) +
        (req && playerHasAnyTag(bestPlayer, req.tags) ? 50 : 0);
      return currentScore > bestScore ? idx : best;
    }, -1);

    if (bestIdx >= 0) {
      assignments.set(pos.id, available[bestIdx]);
      available.splice(bestIdx, 1);
    }
  }

  for (const pos of auxPositions) {
    if (available.length > 0) {
      assignments.set(pos.id, available.shift()!);
    }
  }

  return assignments;
}

export function matchTactics(players: Player[], mode: GameMode): TacticResult[] {
  const tactics = tacticsByMode[mode];
  const scored = tactics.map(tactic => ({
    tactic,
    score: scoreTactic(tactic, players),
    assignments: assignPlayers(tactic, players),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}
