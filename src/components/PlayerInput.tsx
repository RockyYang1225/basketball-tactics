import { useState } from 'react';
import { useI18n } from '../i18n/context';
import type { Player, OffensiveTag, SkillTag, PhysicalTag, Position } from '../types';
import { offensiveTags, skillTags, physicalTags, positionTags, ratingLabels } from '../data/playerTags';
import './PlayerInput.css';

interface Props {
  players: Player[];
  onChange: (players: Player[]) => void;
}

export function PlayerInput({ players, onChange }: Props) {
  const { lang, t } = useI18n();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function updatePlayer(id: string, patch: Partial<Player>) {
    onChange(players.map(p => (p.id === id ? { ...p, ...patch } : p)));
  }

  function toggleTag<T extends string>(current: T[], tag: T): T[] {
    return current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
  }

  return (
    <div className="player-input-list">
      {players.map((player, idx) => {
        const expanded = expandedId === player.id;
        return (
          <div key={player.id} className={`player-card ${player.isKeyPlayer ? 'key-player' : ''}`}>
            <div className="player-card-header">
              <span className="player-number">#{idx + 1}</span>
              <input
                className="player-name-input"
                placeholder={t.player.namePlaceholder}
                value={player.name}
                onChange={e => updatePlayer(player.id, { name: e.target.value })}
              />
              <label className="key-toggle">
                <input
                  type="checkbox"
                  checked={player.isKeyPlayer}
                  onChange={e => updatePlayer(player.id, { isKeyPlayer: e.target.checked })}
                />
                <span className="key-toggle-label">{t.player.keyPlayer}</span>
              </label>
              <button
                className="expand-btn"
                onClick={() => setExpandedId(expanded ? null : player.id)}
              >
                {expanded ? t.player.collapse : t.player.expand}
              </button>
            </div>

            {expanded && (
              <div className="player-card-details">
                <div className="tag-section">
                  <div className="tag-section-title">{t.player.position}</div>
                  <div className="tag-chips">
                    {positionTags.map(pt => (
                      <button
                        key={pt.key}
                        className={`chip ${player.position === pt.key ? 'active' : ''}`}
                        onClick={() =>
                          updatePlayer(player.id, {
                            position: player.position === pt.key ? undefined : (pt.key as Position),
                          })
                        }
                      >
                        {pt[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tag-section">
                  <div className="tag-section-title">{t.player.offense}</div>
                  <div className="tag-chips">
                    {offensiveTags.map(tag => (
                      <button
                        key={tag.key}
                        className={`chip ${player.offensiveTags.includes(tag.key) ? 'active' : ''}`}
                        onClick={() =>
                          updatePlayer(player.id, {
                            offensiveTags: toggleTag(player.offensiveTags, tag.key as OffensiveTag),
                          })
                        }
                      >
                        {tag[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tag-section">
                  <div className="tag-section-title">{t.player.skills}</div>
                  <div className="tag-chips">
                    {skillTags.map(tag => (
                      <button
                        key={tag.key}
                        className={`chip ${player.skillTags.includes(tag.key) ? 'active' : ''}`}
                        onClick={() =>
                          updatePlayer(player.id, {
                            skillTags: toggleTag(player.skillTags, tag.key as SkillTag),
                          })
                        }
                      >
                        {tag[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tag-section">
                  <div className="tag-section-title">{t.player.physical}</div>
                  <div className="tag-chips">
                    {physicalTags.map(tag => (
                      <button
                        key={tag.key}
                        className={`chip ${player.physicalTags.includes(tag.key) ? 'active' : ''}`}
                        onClick={() =>
                          updatePlayer(player.id, {
                            physicalTags: toggleTag(player.physicalTags, tag.key as PhysicalTag),
                          })
                        }
                      >
                        {tag[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tag-section">
                  <div className="tag-section-title">{t.player.ratings}</div>
                  <div className="ratings-grid">
                    {ratingLabels.map(r => (
                      <div key={r.key} className="rating-row">
                        <span className="rating-label">{r[lang]}</span>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          value={player.ratings[r.key as keyof Player['ratings']]}
                          onChange={e =>
                            updatePlayer(player.id, {
                              ratings: { ...player.ratings, [r.key]: Number(e.target.value) },
                            })
                          }
                        />
                        <span className="rating-value">
                          {player.ratings[r.key as keyof Player['ratings']]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
