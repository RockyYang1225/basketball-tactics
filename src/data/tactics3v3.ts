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
        description: { zh: '持球人传球到罚球线策应点后，向策应点切入', en: 'Handler passes to post at FT line, then cuts toward post' },
        duration: 1800,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 70 }, { x: 55, y: 55 }, { x: 55, y: 45 }] },
        ],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '策应点手递手传球给切入的持球人', en: 'Post delivers hand-off to cutting handler' },
        duration: 1200,
        movements: [],
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
  {
    id: '3v3-give-and-go',
    name: { zh: '传切配合', en: 'Give & Go' },
    description: {
      zh: '传球后立刻空切篮下接回传上篮，最基本的二人配合',
      en: 'Pass and immediately cut to the basket for a return pass — the most fundamental two-man play',
    },
    mode: '3v3',
    complexity: 'simple',
    requirements: [
      { role: 'ball_handler', tags: ['cutter', 'slasher'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 70, description: { zh: '持球人 — 弧顶持球', en: 'Handler — top of key' } },
      { id: 'p2', role: 'receiver', initialX: 70, initialY: 55, description: { zh: '接应人 — 右侧45度', en: 'Receiver — right wing' } },
      { id: 'p3', role: 'spacer', initialX: 15, initialY: 35, description: { zh: '底角拉开空间', en: 'Corner spacer' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '持球人传球到右侧45度后立刻向篮下空切', en: 'Handler passes to right wing then immediately cuts to basket' },
        duration: 1800,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 70 }, { x: 55, y: 45 }, { x: 50, y: 15 }] },
        ],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '接应人回传给篮下的空切者', en: 'Receiver delivers return pass to cutter at rim' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p2', to: 'p1' }],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '空切者接球上篮，底角队友准备抢篮板', en: 'Cutter finishes at rim, corner spacer crashes boards' },
        duration: 1500,
        movements: [
          { positionId: 'p3', path: [{ x: 15, y: 35 }, { x: 30, y: 20 }] },
        ],
        passes: [],
        screens: [],
      },
    ],
  },
  {
    id: '3v3-off-ball-screen',
    name: { zh: '无球掩护', en: 'Off-ball Screen' },
    description: {
      zh: '为无球射手做掩护，帮助其摆脱防守跑出空位投篮',
      en: 'Screen for an off-ball shooter to free them for an open shot',
    },
    mode: '3v3',
    complexity: 'medium',
    requirements: [
      { role: 'shooter', tags: ['three_point_shooter', 'mid_range'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 70, description: { zh: '持球人 — 弧顶控球', en: 'Handler — top of key' } },
      { id: 'p2', role: 'shooter', initialX: 85, initialY: 35, description: { zh: '射手 — 右侧底角', en: 'Shooter — right corner' } },
      { id: 'p3', role: 'screener', initialX: 65, initialY: 40, description: { zh: '掩护人 — 右侧腰位', en: 'Screener — right block' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '掩护人移动到射手防守人位置做掩护', en: 'Screener moves to set screen on shooter\'s defender' },
        duration: 1500,
        movements: [
          { positionId: 'p3', path: [{ x: 65, y: 40 }, { x: 80, y: 38 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p3', targetId: 'p2' }],
      },
      {
        stepNumber: 2,
        description: { zh: '射手借掩护绕出到45度接球位置', en: 'Shooter curls off screen to the wing' },
        duration: 1800,
        movements: [
          { positionId: 'p2', path: [{ x: 85, y: 35 }, { x: 75, y: 45 }, { x: 70, y: 55 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '持球人传给跑出空位的射手投篮', en: 'Handler passes to open shooter for the shot' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
    ],
  },
  {
    id: '3v3-pick-and-pop',
    name: { zh: '挡拆外弹', en: 'Pick & Pop' },
    description: {
      zh: '掩护后外弹投篮，适合有中远距离投射能力的大个子',
      en: 'Screener pops out for a jumper after screening — ideal for stretch bigs',
    },
    mode: '3v3',
    complexity: 'simple',
    requirements: [
      { role: 'ball_handler', tags: ['pnr_ball_handler', 'slasher'], priority: 'required' },
      { role: 'screener', tags: ['three_point_shooter', 'mid_range'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 70, description: { zh: '持球人 — 弧顶持球', en: 'Handler — top of key' } },
      { id: 'p2', role: 'screener', initialX: 50, initialY: 55, description: { zh: '掩护人 — 高位', en: 'Screener — high post' } },
      { id: 'p3', role: 'spacer', initialX: 15, initialY: 35, description: { zh: '底角拉开空间', en: 'Corner spacer' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '掩护人上提做掩护', en: 'Screener comes up to set screen' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 50, y: 55 }, { x: 50, y: 65 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p2', targetId: 'p1' }],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人借掩护突破，掩护人外弹到三分线', en: 'Handler drives off screen, screener pops to three-point line' },
        duration: 1800,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 70 }, { x: 65, y: 50 }, { x: 60, y: 30 }] },
          { positionId: 'p2', path: [{ x: 50, y: 65 }, { x: 35, y: 65 }, { x: 25, y: 70 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '持球人分球给外弹的掩护人投篮', en: 'Handler kicks out to popped screener for the shot' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
    ],
  },
  {
    id: '3v3-post-up',
    name: { zh: '低位背打', en: 'Post-up' },
    description: {
      zh: '利用身体优势在低位要位背身进攻',
      en: 'Use size advantage to score from the low post with back-to-basket moves',
    },
    mode: '3v3',
    complexity: 'simple',
    requirements: [
      { role: 'post', tags: ['post_scorer', 'strong'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 70, description: { zh: '持球人 — 弧顶持球', en: 'Handler — top of key' } },
      { id: 'p2', role: 'post', initialX: 65, initialY: 35, description: { zh: '内线 — 右侧腰位要位', en: 'Post — right block sealing' } },
      { id: 'p3', role: 'spacer', initialX: 15, initialY: 55, description: { zh: '弱侧拉开', en: 'Weak side spacer' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '内线球员在低位卡住位置要球', en: 'Post player seals defender and calls for the ball' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 65, y: 35 }, { x: 65, y: 28 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人传球到低位', en: 'Handler delivers entry pass to the post' },
        duration: 1200,
        movements: [
          { positionId: 'p3', path: [{ x: 15, y: 55 }, { x: 15, y: 45 }] },
        ],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '内线球员背身转身进攻篮筐', en: 'Post player goes to work — drop step or turnaround' },
        duration: 2000,
        movements: [
          { positionId: 'p2', path: [{ x: 65, y: 28 }, { x: 55, y: 18 }, { x: 50, y: 10 }] },
        ],
        passes: [],
        screens: [],
      },
    ],
  },
  {
    id: '3v3-backdoor',
    name: { zh: '后门切入', en: 'Backdoor Cut' },
    description: {
      zh: '假装外切后突然反跑篮下，利用防守人的过度紧逼',
      en: 'Fake a move outside then cut backdoor to exploit an overplaying defender',
    },
    mode: '3v3',
    complexity: 'medium',
    requirements: [
      { role: 'cutter', tags: ['cutter', 'fast'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 70, description: { zh: '持球人 — 弧顶持球', en: 'Handler — top of key' } },
      { id: 'p2', role: 'cutter', initialX: 75, initialY: 55, description: { zh: '切入者 — 右侧45度', en: 'Cutter — right wing' } },
      { id: 'p3', role: 'spacer', initialX: 15, initialY: 40, description: { zh: '弱侧底角拉开', en: 'Weak side corner spacer' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '切入者先向外移动，假装要到弧顶接球', en: 'Cutter fakes toward the top as if to receive the ball' },
        duration: 1200,
        movements: [
          { positionId: 'p2', path: [{ x: 75, y: 55 }, { x: 70, y: 65 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '切入者突然反跑向篮下空切', en: 'Cutter plants and cuts backdoor to the basket' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 70, y: 65 }, { x: 65, y: 40 }, { x: 55, y: 15 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '持球人送出高吊球到篮下', en: 'Handler lobs pass to the cutter at the rim' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
    ],
  },
];
