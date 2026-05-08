import { describe, it, expect } from 'vitest';
import { matchTactics } from './tacticsEngine';
import type { Player } from '../types';
import { createDefaultPlayer } from '../types';

function makePlayer(overrides: Partial<Player>): Player {
  return { ...createDefaultPlayer(crypto.randomUUID()), ...overrides };
}

describe('tacticsEngine', () => {
  it('returns 2-3 results for 3v3 with a key slasher', () => {
    const players: Player[] = [
      makePlayer({ name: 'Star', isKeyPlayer: true, offensiveTags: ['slasher'] }),
      makePlayer({ name: 'B' }),
      makePlayer({ name: 'C' }),
    ];
    const results = matchTactics(players, '3v3');
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results.length).toBeLessThanOrEqual(3);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
  });

  it('favors simple tactics when most players have no tags', () => {
    const players: Player[] = [
      makePlayer({ name: 'A', isKeyPlayer: true }),
      makePlayer({ name: 'B' }),
      makePlayer({ name: 'C' }),
      makePlayer({ name: 'D' }),
      makePlayer({ name: 'E' }),
    ];
    const results = matchTactics(players, '5v5');
    expect(results[0].tactic.complexity).toBe('simple');
  });

  it('assigns key players to core positions', () => {
    const star = makePlayer({ name: 'Star', isKeyPlayer: true, offensiveTags: ['pnr_ball_handler'] });
    const players = [star, makePlayer({ name: 'B' }), makePlayer({ name: 'C' })];
    const results = matchTactics(players, '3v3');
    const topResult = results[0];
    const starAssignment = [...topResult.assignments.entries()].find(([, p]) => p.id === star.id);
    expect(starAssignment).toBeDefined();
  });

  it('returns results even when no players have tags', () => {
    const players = [makePlayer({ name: 'A' }), makePlayer({ name: 'B' }), makePlayer({ name: 'C' })];
    const results = matchTactics(players, '3v3');
    expect(results.length).toBeGreaterThanOrEqual(2);
  });
});
