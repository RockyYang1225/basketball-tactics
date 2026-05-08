import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Team } from '../types';

function makeTeam(id: string, name: string): Team {
  return {
    id,
    name,
    mode: '5v5',
    players: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
  removeItem: vi.fn((key: string) => { delete store[key]; }),
  clear: vi.fn(() => { for (const k of Object.keys(store)) delete store[k]; }),
  get length() { return Object.keys(store).length; },
  key: vi.fn((_: number) => null),
};

Object.defineProperty(globalThis, 'localStorage', { value: mockLocalStorage, writable: true });

beforeEach(() => {
  for (const k of Object.keys(store)) delete store[k];
  vi.clearAllMocks();
});

// Must import AFTER setting up the mock
const { loadTeams, saveTeams, MAX_TEAMS } = await import('./storage');

describe('storage', () => {
  it('returns empty array when nothing saved', () => {
    expect(loadTeams()).toEqual([]);
  });

  it('saves and loads teams', () => {
    const teams = [makeTeam('1', 'Team A')];
    saveTeams(teams);
    expect(loadTeams()).toEqual(teams);
  });

  it('enforces max team limit', () => {
    const teams = Array.from({ length: 6 }, (_, i) => makeTeam(String(i), `T${i}`));
    saveTeams(teams);
    expect(loadTeams()).toHaveLength(MAX_TEAMS);
  });

  it('handles corrupted localStorage gracefully', () => {
    store['basketball-tactics-teams'] = 'not json';
    expect(loadTeams()).toEqual([]);
  });
});
