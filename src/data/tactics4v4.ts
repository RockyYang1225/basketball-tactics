import type { TacticDefinition } from '../types';

export const tactics4v4: TacticDefinition[] = [
  {
    id: '4v4-horns',
    name: { zh: '牛角战术', en: 'Horns Set' },
    description: {
      zh: '两名大个子站在两侧肘区，形成牛角站位，变化丰富',
      en: 'Two bigs at the elbows create multiple action options',
    },
    mode: '4v4',
    complexity: 'medium',
    requirements: [
      { role: 'ball_handler', tags: ['pnr_ball_handler', 'playmaker'], priority: 'required' },
      { role: 'big', tags: ['post_scorer', 'mid_range'], priority: 'preferred' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 75, description: { zh: '控球 — 弧顶发起', en: 'Handler — top of key' } },
      { id: 'p2', role: 'big_left', initialX: 35, initialY: 50, description: { zh: '左肘区大个子', en: 'Left elbow big' } },
      { id: 'p3', role: 'big_right', initialX: 65, initialY: 50, description: { zh: '右肘区大个子', en: 'Right elbow big' } },
      { id: 'p4', role: 'wing', initialX: 85, initialY: 40, description: { zh: '右侧底角', en: 'Right corner wing' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '持球人传球给右肘区', en: 'Handler passes to right elbow' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p3' }],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人借左肘区掩护向左切入', en: 'Handler cuts left using left elbow screen' },
        duration: 1800,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 75 }, { x: 35, y: 55 }, { x: 20, y: 35 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p2', targetId: 'p1' }],
      },
      {
        stepNumber: 3,
        description: { zh: '左肘区外弹接应，右肘区可传给切入者或外弹者', en: 'Left big pops out; right big reads and passes to cutter or popper' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 35, y: 50 }, { x: 15, y: 65 }] },
        ],
        passes: [{ from: 'p3', to: 'p1' }],
        screens: [],
      },
    ],
  },
  {
    id: '4v4-double-screen',
    name: { zh: '双掩护', en: 'Double Screen' },
    description: {
      zh: '两人做连续掩护，帮射手跑出空位',
      en: 'Two consecutive screens free up the shooter',
    },
    mode: '4v4',
    complexity: 'medium',
    requirements: [
      { role: 'shooter', tags: ['three_point_shooter', 'mid_range'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 75, description: { zh: '控球 — 弧顶持球', en: 'Handler at top' } },
      { id: 'p2', role: 'shooter', initialX: 15, initialY: 25, description: { zh: '射手 — 左侧底线起跑', en: 'Shooter — starts baseline left' } },
      { id: 'p3', role: 'screener1', initialX: 50, initialY: 40, description: { zh: '第一掩护人 — 罚球线', en: 'Screener 1 — FT line' } },
      { id: 'p4', role: 'screener2', initialX: 65, initialY: 40, description: { zh: '第二掩护人 — 右肘区', en: 'Screener 2 — right elbow' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '射手从底线开始跑动，绕过第一道掩护', en: 'Shooter runs from baseline, uses first screen' },
        duration: 1800,
        movements: [
          { positionId: 'p2', path: [{ x: 15, y: 25 }, { x: 35, y: 30 }, { x: 50, y: 40 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p3', targetId: 'p2' }],
      },
      {
        stepNumber: 2,
        description: { zh: '射手继续绕过第二道掩护，跑向右侧45度', en: 'Shooter curls around second screen to right wing' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 50, y: 40 }, { x: 65, y: 40 }, { x: 75, y: 55 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p4', targetId: 'p2' }],
      },
      {
        stepNumber: 3,
        description: { zh: '控球传给跑出空位的射手投篮', en: 'Handler passes to open shooter for the shot' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
    ],
  },
  {
    id: '4v4-drive-kick',
    name: { zh: '突分战术', en: 'Drive & Kick' },
    description: {
      zh: '强点突破吸引防守后分球到空位队友',
      en: 'Key player drives to collapse defense, then kicks out to open teammates',
    },
    mode: '4v4',
    complexity: 'simple',
    requirements: [
      { role: 'driver', tags: ['slasher', 'pnr_ball_handler'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'driver', initialX: 50, initialY: 70, description: { zh: '突破手 — 弧顶持球突破', en: 'Driver — attacks from top' } },
      { id: 'p2', role: 'spacer', initialX: 15, initialY: 50, description: { zh: '左侧45度拉开', en: 'Left wing spacer' } },
      { id: 'p3', role: 'spacer', initialX: 85, initialY: 50, description: { zh: '右侧45度拉开', en: 'Right wing spacer' } },
      { id: 'p4', role: 'spacer', initialX: 85, initialY: 25, description: { zh: '右底角拉开', en: 'Right corner spacer' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '突破手从弧顶向右侧突破', en: 'Driver attacks right from the top' },
        duration: 1800,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 70 }, { x: 60, y: 50 }, { x: 60, y: 25 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '防守收缩，队友向空位移动', en: 'Defense collapses, teammates relocate to open spots' },
        duration: 1500,
        movements: [
          { positionId: 'p3', path: [{ x: 85, y: 50 }, { x: 80, y: 60 }] },
          { positionId: 'p2', path: [{ x: 15, y: 50 }, { x: 20, y: 60 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '突破手分球到空位队友投篮', en: 'Driver kicks out to open teammate for shot' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p3' }],
        screens: [],
      },
    ],
  },
];
