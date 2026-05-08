import type { TacticDefinition } from '../types';

export const tactics3v3: TacticDefinition[] = [
  {
    id: '3v3-pnr',
    name: { zh: '挡拆配合', en: 'Pick & Roll' },
    description: {
      zh: '持球人借助掩护突破或分球，最经典的篮球配合',
      en: 'Ball handler uses a screen to drive or pass — the most classic play',
    },
    mode: '3v3',
    complexity: 'simple',
    requirements: [
      { role: 'ball_handler', tags: ['pnr_ball_handler', 'slasher', 'playmaker'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 70, description: { zh: '持球人 — 弧顶持球发起挡拆', en: 'Handler — initiates PnR from top' } },
      { id: 'p2', role: 'screener', initialX: 50, initialY: 55, description: { zh: '掩护人 — 上提挡拆后下顺', en: 'Screener — sets screen then rolls' } },
      { id: 'p3', role: 'spacer', initialX: 85, initialY: 40, description: { zh: '射手 — 底角拉开空间', en: 'Spacer — stays in corner for spacing' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '掩护人上提到弧顶为持球人做掩护', en: 'Screener comes up to set screen for handler' },
        duration: 1500,
        movements: [{ positionId: 'p2', path: [{ x: 50, y: 55 }, { x: 50, y: 65 }] }],
        passes: [],
        screens: [{ screenerId: 'p2', targetId: 'p1' }],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人借掩护向右突破，掩护人下顺篮下', en: 'Handler drives right off screen, screener rolls to basket' },
        duration: 2000,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 70 }, { x: 65, y: 50 }, { x: 60, y: 30 }] },
          { positionId: 'p2', path: [{ x: 50, y: 65 }, { x: 45, y: 40 }, { x: 45, y: 15 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '持球人可选择上篮、传球给下顺的掩护人、或分球到底角射手', en: 'Handler can finish, pass to roller, or kick out to corner' },
        duration: 1500,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
    ],
  },
  {
    id: '3v3-handoff',
    name: { zh: '手递手', en: 'Hand-off' },
    description: {
      zh: '通过手递手传球制造错位或投篮机会',
      en: 'Create mismatches or shooting opportunities with a hand-off',
    },
    mode: '3v3',
    complexity: 'simple',
    requirements: [
      { role: 'shooter', tags: ['three_point_shooter', 'mid_range'], priority: 'preferred' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 70, description: { zh: '持球人 — 传球后切入接手递手', en: 'Handler — passes then cuts for hand-off' } },
      { id: 'p2', role: 'post', initialX: 50, initialY: 45, description: { zh: '策应点 — 罚球线接球做手递手', en: 'Post — receives at FT line for hand-off' } },
      { id: 'p3', role: 'spacer', initialX: 15, initialY: 40, description: { zh: '底角 — 拉开空间', en: 'Spacer — corner spacing' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '持球人传球到罚球线策应点', en: 'Handler passes to post at free throw line' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人向策应点切入，接手递手传球', en: 'Handler cuts toward post for hand-off' },
        duration: 1500,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 70 }, { x: 55, y: 55 }, { x: 55, y: 45 }] },
        ],
        passes: [{ from: 'p2', to: 'p1' }],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '接球人借掩护突破或投篮，策应点顺下', en: 'Receiver drives or shoots, post rolls to basket' },
        duration: 2000,
        movements: [
          { positionId: 'p1', path: [{ x: 55, y: 45 }, { x: 65, y: 30 }] },
          { positionId: 'p2', path: [{ x: 50, y: 45 }, { x: 45, y: 15 }] },
        ],
        passes: [],
        screens: [],
      },
    ],
  },
  {
    id: '3v3-iso',
    name: { zh: '单打战术', en: 'Isolation' },
    description: {
      zh: '为强点球员清空一侧，制造单打机会',
      en: 'Clear out one side for the key player to go one-on-one',
    },
    mode: '3v3',
    complexity: 'simple',
    requirements: [
      { role: 'scorer', tags: ['slasher', 'post_scorer', 'mid_range'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'scorer', initialX: 50, initialY: 65, description: { zh: '单打手 — 弧顶一对一', en: 'Scorer — ISO from top' } },
      { id: 'p2', role: 'spacer', initialX: 15, initialY: 35, description: { zh: '左底角拉开', en: 'Left corner spacer' } },
      { id: 'p3', role: 'spacer', initialX: 85, initialY: 35, description: { zh: '右底角拉开', en: 'Right corner spacer' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '两名队友拉开到底角，为单打手清空空间', en: 'Teammates spread to corners, clearing space for scorer' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 15, y: 35 }, { x: 10, y: 25 }] },
          { positionId: 'p3', path: [{ x: 85, y: 35 }, { x: 90, y: 25 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '单打手发起进攻，突破或投篮', en: 'Scorer attacks — drive or shoot' },
        duration: 2000,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 65 }, { x: 50, y: 40 }, { x: 50, y: 15 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '如遇协防，分球到空位底角射手', en: 'If help comes, kick out to open corner' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p3' }],
        screens: [],
      },
    ],
  },
];
