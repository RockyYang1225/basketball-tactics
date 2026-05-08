import { useRef } from 'react';
import { useI18n } from '../i18n/context';
import type { Team } from '../types';
import { MAX_TEAMS, exportTeamAsJson, importTeamFromJson } from '../utils/storage';
import './TopBar.css';

interface Props {
  teams: Team[];
  activeTeamId: string | null;
  onSelectTeam: (id: string) => void;
  onNewTeam: () => void;
  onDeleteTeam: (id: string) => void;
  onImportTeam: (team: Team) => void;
}

export function TopBar({ teams, activeTeamId, onSelectTeam, onNewTeam, onDeleteTeam, onImportTeam }: Props) {
  const { lang, t, setLang } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeTeam = teams.find(tm => tm.id === activeTeamId);

  function handleExport() {
    if (!activeTeam) return;
    const json = exportTeamAsJson(activeTeam);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTeam.name || 'team'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const team = importTeamFromJson(reader.result as string);
      if (team) {
        onImportTeam({ ...team, id: crypto.randomUUID() });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="top-bar">
      <h1 className="app-title">{t.app.title}</h1>
      <div className="top-bar-controls">
        <select
          className="team-select"
          value={activeTeamId ?? ''}
          onChange={e => onSelectTeam(e.target.value)}
        >
          {teams.map(tm => (
            <option key={tm.id} value={tm.id}>{tm.name || `Team ${teams.indexOf(tm) + 1}`}</option>
          ))}
        </select>
        <button
          className="top-btn"
          onClick={onNewTeam}
          disabled={teams.length >= MAX_TEAMS}
          title={teams.length >= MAX_TEAMS ? t.topBar.maxTeams : undefined}
        >
          {t.topBar.newTeam}
        </button>
        {activeTeamId && (
          <>
            <button className="top-btn danger" onClick={() => {
              if (confirm(t.topBar.deleteConfirm)) onDeleteTeam(activeTeamId);
            }}>
              {t.topBar.deleteTeam}
            </button>
            <button className="top-btn" onClick={handleExport}>{t.topBar.exportTeam}</button>
          </>
        )}
        <button className="top-btn" onClick={() => fileInputRef.current?.click()}>
          {t.topBar.importTeam}
        </button>
        <input ref={fileInputRef} type="file" accept=".json" hidden onChange={handleImport} />
        <button className="lang-btn" onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}>
          {lang === 'zh' ? 'EN' : '中文'}
        </button>
      </div>
    </div>
  );
}
