import { useState } from 'react';
import { useI18n } from '../i18n/context';
import type { TacticResult } from '../types';
import { CourtCanvas } from './CourtCanvas';
import './TacticsList.css';

interface Props {
  results: TacticResult[];
}

export function TacticsList({ results }: Props) {
  const { lang, t } = useI18n();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (results.length === 0) return null;

  return (
    <div className="tactics-list">
      {results.map(result => {
        const expanded = expandedId === result.tactic.id;
        const maxScore = results[0].score;
        const pct = maxScore > 0 ? Math.round((result.score / maxScore) * 100) : 0;
        return (
          <div key={result.tactic.id} className="tactic-panel">
            <button
              className={`tactic-header ${expanded ? 'expanded' : ''}`}
              onClick={() => setExpandedId(expanded ? null : result.tactic.id)}
            >
              <span className="tactic-arrow">{expanded ? '▾' : '▸'}</span>
              <span className="tactic-name">{result.tactic.name[lang]}</span>
              <span className="tactic-desc">{result.tactic.description[lang]}</span>
              <span className="tactic-score">{t.tactics.matchScore} {pct}%</span>
            </button>
            {expanded && (
              <div className="tactic-body">
                <div className="tactic-positions">
                  {result.tactic.positions.map(pos => {
                    const player = result.assignments.get(pos.id);
                    return (
                      <div key={pos.id} className="position-row">
                        <span className={`position-player ${player?.isKeyPlayer ? 'key' : ''}`}>
                          {player?.name || '—'}
                        </span>
                        <span className="position-role">{pos.description[lang]}</span>
                      </div>
                    );
                  })}
                </div>
                <CourtCanvas result={result} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
