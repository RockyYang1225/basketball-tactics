import { useState, useCallback, useEffect } from 'react';
import { useI18n } from './i18n/context';
import type { Team, GameMode, Player, TacticResult } from './types';
import { createDefaultPlayer, getPlayerCountForMode } from './types';
import { loadTeams, saveTeams } from './utils/storage';
import { matchTactics } from './engine/tacticsEngine';
import { TopBar } from './components/TopBar';
import { ModeSelector } from './components/ModeSelector';
import { PlayerInput } from './components/PlayerInput';
import { TacticsList } from './components/TacticsList';
import './App.css';

function createTeam(mode: GameMode): Team {
  const count = getPlayerCountForMode(mode);
  return {
    id: crypto.randomUUID(),
    name: '',
    mode,
    players: Array.from({ length: count }, () => createDefaultPlayer(crypto.randomUUID())),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export default function App() {
  const { t } = useI18n();
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = loadTeams();
    return saved.length > 0 ? saved : [createTeam('5v5')];
  });
  const [activeTeamId, setActiveTeamId] = useState<string>(teams[0].id);
  const [results, setResults] = useState<TacticResult[]>([]);

  const activeTeam = teams.find(tm => tm.id === activeTeamId) ?? teams[0];

  useEffect(() => {
    saveTeams(teams);
  }, [teams]);

  const updateTeam = useCallback((patch: Partial<Team>) => {
    setTeams(prev =>
      prev.map(tm =>
        tm.id === activeTeamId ? { ...tm, ...patch, updatedAt: Date.now() } : tm
      )
    );
  }, [activeTeamId]);

  function handleModeChange(mode: GameMode) {
    const count = getPlayerCountForMode(mode);
    const currentPlayers = activeTeam.players;
    let players: Player[];
    if (currentPlayers.length >= count) {
      players = currentPlayers.slice(0, count);
    } else {
      players = [
        ...currentPlayers,
        ...Array.from({ length: count - currentPlayers.length }, () =>
          createDefaultPlayer(crypto.randomUUID())
        ),
      ];
    }
    updateTeam({ mode, players });
    setResults([]);
  }

  function handleGenerate() {
    const hasName = activeTeam.players.some(p => p.name.trim() !== '');
    if (!hasName) return;
    const matched = matchTactics(activeTeam.players, activeTeam.mode);
    setResults(matched);
  }

  function handleNewTeam() {
    const team = createTeam('5v5');
    setTeams(prev => [...prev, team]);
    setActiveTeamId(team.id);
    setResults([]);
  }

  function handleDeleteTeam(id: string) {
    setTeams(prev => {
      const next = prev.filter(tm => tm.id !== id);
      if (next.length === 0) {
        const t = createTeam('5v5');
        next.push(t);
      }
      if (id === activeTeamId) {
        setActiveTeamId(next[0].id);
      }
      return next;
    });
    setResults([]);
  }

  function handleImportTeam(team: Team) {
    setTeams(prev => [...prev, team]);
    setActiveTeamId(team.id);
    setResults([]);
  }

  return (
    <div className="app-container">
      <TopBar
        teams={teams}
        activeTeamId={activeTeamId}
        onSelectTeam={id => { setActiveTeamId(id); setResults([]); }}
        onNewTeam={handleNewTeam}
        onDeleteTeam={handleDeleteTeam}
        onImportTeam={handleImportTeam}
      />

      <div className="app-body">
        <div className="input-section">
          <div className="section-header">
            <ModeSelector mode={activeTeam.mode} onChange={handleModeChange} />
            <input
              className="team-name-input"
              placeholder={t.app.title}
              value={activeTeam.name}
              onChange={e => updateTeam({ name: e.target.value })}
            />
          </div>
          <PlayerInput
            players={activeTeam.players}
            onChange={players => updateTeam({ players })}
          />
          <button className="generate-btn" onClick={handleGenerate}>
            {t.tactics.generate}
          </button>
        </div>

        {results.length > 0 && (
          <div className="results-section">
            <TacticsList results={results} />
          </div>
        )}
      </div>
    </div>
  );
}
