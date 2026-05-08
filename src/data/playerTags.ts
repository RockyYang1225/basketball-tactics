import type { OffensiveTag, SkillTag, PhysicalTag, Position } from '../types';

export interface TagInfo {
  key: string;
  zh: string;
  en: string;
}

export const positionTags: { key: Position; zh: string; en: string }[] = [
  { key: 'PG', zh: '控卫', en: 'PG' },
  { key: 'SG', zh: '分卫', en: 'SG' },
  { key: 'SF', zh: '小前', en: 'SF' },
  { key: 'PF', zh: '大前', en: 'PF' },
  { key: 'C', zh: '中锋', en: 'C' },
];

export const offensiveTags: { key: OffensiveTag; zh: string; en: string }[] = [
  { key: 'three_point_shooter', zh: '三分射手', en: 'Shooter' },
  { key: 'slasher', zh: '突破手', en: 'Slasher' },
  { key: 'post_scorer', zh: '背身单打', en: 'Post Scorer' },
  { key: 'mid_range', zh: '中距离', en: 'Mid-Range' },
  { key: 'pnr_ball_handler', zh: '挡拆持球人', en: 'PnR Handler' },
  { key: 'cutter', zh: '空切高手', en: 'Cutter' },
];

export const skillTags: { key: SkillTag; zh: string; en: string }[] = [
  { key: 'playmaker', zh: '组织能力强', en: 'Playmaker' },
  { key: 'rebounder', zh: '篮板好', en: 'Rebounder' },
  { key: 'defender', zh: '防守强', en: 'Defender' },
  { key: 'passer', zh: '传球好', en: 'Passer' },
  { key: 'fast_break', zh: '快攻好', en: 'Fast Break' },
];

export const physicalTags: { key: PhysicalTag; zh: string; en: string }[] = [
  { key: 'fast', zh: '速度快', en: 'Fast' },
  { key: 'strong', zh: '力量强', en: 'Strong' },
  { key: 'athletic', zh: '弹跳好', en: 'Athletic' },
  { key: 'high_stamina', zh: '体能好', en: 'Stamina' },
];

export const ratingLabels: { key: string; zh: string; en: string }[] = [
  { key: 'offense', zh: '进攻', en: 'Offense' },
  { key: 'defense', zh: '防守', en: 'Defense' },
  { key: 'speed', zh: '速度', en: 'Speed' },
  { key: 'height', zh: '身高', en: 'Height' },
];
