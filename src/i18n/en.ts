import type { Translations } from './zh';

const en: Translations = {
  app: { title: 'Basketball Tactics Generator' },
  topBar: {
    newTeam: 'New Team',
    deleteTeam: 'Delete Team',
    deleteConfirm: 'Delete this team?',
    maxTeams: 'Max 5 teams',
    exportTeam: 'Export',
    importTeam: 'Import',
  },
  mode: {
    label: 'Game Mode',
    '3v3': '3v3',
    '4v4': '4v4',
    '5v5': '5v5',
  },
  player: {
    name: 'Name',
    namePlaceholder: 'Enter player name',
    keyPlayer: 'Key Player',
    position: 'Position',
    offense: 'Offense',
    skills: 'Skills',
    physical: 'Physical',
    ratings: 'Ratings',
    expand: 'Expand',
    collapse: 'Collapse',
  },
  tactics: {
    generate: 'Generate Tactics',
    matchScore: 'Match',
    noResult: 'Please enter at least one player name',
    step: 'Step',
    rolePlayer: 'Role Player',
    keyPlayerLabel: 'Key Player',
  },
  animation: {
    play: 'Play',
    pause: 'Pause',
    prev: 'Prev',
    next: 'Next',
    speed: 'Speed',
    style: 'Style',
    board: 'Board',
    realistic: 'Realistic',
  },
  positions: {
    PG: 'PG', SG: 'SG', SF: 'SF', PF: 'PF', C: 'C',
  },
};

export default en;
