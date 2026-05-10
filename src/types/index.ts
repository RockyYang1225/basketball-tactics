export type GameMode = '3v3' | '4v4' | '5v5';

export type DefenseType = 'none' | 'man' | 'zone23' | 'zone32';

export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

export type OffensiveTag =
  | 'three_point_shooter'
  | 'slasher'
  | 'post_scorer'
  | 'mid_range'
  | 'pnr_ball_handler'
  | 'cutter';

export type SkillTag =
  | 'playmaker'
  | 'rebounder'
  | 'defender'
  | 'passer'
  | 'fast_break';

export type PhysicalTag =
  | 'fast'
  | 'strong'
  | 'athletic'
  | 'high_stamina';

export type PlayerTag = OffensiveTag | SkillTag | PhysicalTag;

export interface Player {
  id: string;
  name: string;
  isKeyPlayer: boolean;
  position?: Position;
  offensiveTags: OffensiveTag[];
  skillTags: SkillTag[];
  physicalTags: PhysicalTag[];
  ratings: {
    offense: number;
    defense: number;
    speed: number;
    height: number;
  };
}

export interface Team {
  id: string;
  name: string;
  mode: GameMode;
  players: Player[];
  createdAt: number;
  updatedAt: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface PlayerMovement {
  positionId: string;
  path: Point[];
}

export interface PassAction {
  from: string;
  to: string;
}

export interface ScreenAction {
  screenerId: string;
  targetId: string;
}

export interface TacticStep {
  stepNumber: number;
  description: { zh: string; en: string };
  duration: number;
  movements: PlayerMovement[];
  passes: PassAction[];
  screens: ScreenAction[];
}

export interface TacticPosition {
  id: string;
  role: string;
  initialX: number;
  initialY: number;
  description: { zh: string; en: string };
}

export interface TacticRequirement {
  role: string;
  tags: PlayerTag[];
  priority: 'required' | 'preferred';
}

export interface TacticDefinition {
  id: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  mode: GameMode;
  complexity: 'simple' | 'medium' | 'complex';
  requirements: TacticRequirement[];
  positions: TacticPosition[];
  steps: TacticStep[];
}

export interface TacticResult {
  tactic: TacticDefinition;
  score: number;
  assignments: Map<string, Player>;
}

export type CourtStyle = 'board' | 'realistic';

export type Language = 'zh' | 'en';

export function createDefaultPlayer(id: string): Player {
  return {
    id,
    name: '',
    isKeyPlayer: false,
    offensiveTags: [],
    skillTags: [],
    physicalTags: [],
    ratings: { offense: 3, defense: 3, speed: 3, height: 3 },
  };
}

export function getPlayerCountForMode(mode: GameMode): number {
  switch (mode) {
    case '3v3': return 3;
    case '4v4': return 4;
    case '5v5': return 5;
  }
}
