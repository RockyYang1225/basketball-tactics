import { useI18n } from '../i18n/context';
import type { GameMode } from '../types';
import './ModeSelector.css';

interface Props {
  mode: GameMode;
  onChange: (mode: GameMode) => void;
}

const modes: GameMode[] = ['3v3', '4v4', '5v5'];

export function ModeSelector({ mode, onChange }: Props) {
  const { t } = useI18n();
  return (
    <div className="mode-selector">
      <span className="mode-label">{t.mode.label}</span>
      <div className="mode-buttons">
        {modes.map(m => (
          <button
            key={m}
            className={`mode-btn ${m === mode ? 'active' : ''}`}
            onClick={() => onChange(m)}
          >
            {t.mode[m]}
          </button>
        ))}
      </div>
    </div>
  );
}
