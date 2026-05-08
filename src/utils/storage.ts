import type { Team } from '../types';

const STORAGE_KEY = 'basketball-tactics-teams';
export const MAX_TEAMS = 5;

export function loadTeams(): Team[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveTeams(teams: Team[]): void {
  const clamped = teams.slice(0, MAX_TEAMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clamped));
}

export function exportTeamAsJson(team: Team): string {
  return JSON.stringify(team, null, 2);
}

export function importTeamFromJson(json: string): Team | null {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.id || !parsed.name || !parsed.mode || !Array.isArray(parsed.players)) {
      return null;
    }
    return parsed as Team;
  } catch {
    return null;
  }
}
