import type { TacticDefinition } from '../types';

export const tactics5v5: TacticDefinition[] = [
  {
    id: '5v5-horns',
    name: { zh: '牛角战术', en: 'Horns Set' },
    description: {
      zh: '经典5人牛角站位，双肘区大个子提供多种战术选择',
      en: 'Classic 5-man horns with bigs at both elbows for multiple options',
    },
    mode: '5v5',
    complexity: 'medium',
    requirements: [
      { role: 'ball_handler', tags: ['pnr_ball_handler', 'playmaker'], priority: 'required' },
      { role: 'big', tags: ['post_scorer', 'mid_range', 'passer'], priority: 'preferred' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 75, description: { zh: '控球 — 弧顶', en: 'Handler — top' } },
      { id: 'p2', role: 'big_left', initialX: 35, initialY: 50, description: { zh: '左肘区', en: 'Left elbow' } },
      { id: 'p3', role: 'big_right', initialX: 65, initialY: 50, description: { zh: '右肘区', en: 'Right elbow' } },
      { id: 'p4', role: 'wing_left', initialX: 15, initialY: 40, description: { zh: '左侧底角', en: 'Left corner' } },
      { id: 'p5', role: 'wing_right', initialX: 85, initialY: 40, description: { zh: '右侧底角', en: 'Right corner' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '控球传给右肘区，然后借左肘区掩护切入', en: 'Handler passes right elbow, cuts off left elbow screen' },
        duration: 1800,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 75 }, { x: 35, y: 55 }, { x: 20, y: 35 }] },
        ],
        passes: [{ from: 'p1', to: 'p3' }],
        screens: [{ screenerId: 'p2', targetId: 'p1' }],
      },
      {
        stepNumber: 2,
        description: { zh: '左肘区外弹，左底角填补，右肘区持球读防守', en: 'Left big pops, corner fills, right big reads defense' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 35, y: 50 }, { x: 15, y: 65 }] },
          { positionId: 'p4', path: [{ x: 15, y: 40 }, { x: 25, y: 50 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '右肘区传球给切入者或外弹的大个子', en: 'Right elbow passes to cutter or popped big' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p3', to: 'p1' }],
        screens: [],
      },
    ],
  },
  {
    id: '5v5-pnr-wing',
    name: { zh: '侧翼挡拆', en: 'Wing Pick & Roll' },
    description: {
      zh: '在侧翼发起挡拆，弱侧拉开空间',
      en: 'PnR initiated on the wing with weak side spacing',
    },
    mode: '5v5',
    complexity: 'simple',
    requirements: [
      { role: 'ball_handler', tags: ['pnr_ball_handler', 'slasher'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 70, initialY: 65, description: { zh: '右侧45度持球', en: 'Right wing handler' } },
      { id: 'p2', role: 'screener', initialX: 65, initialY: 50, description: { zh: '掩护人 — 右侧高位', en: 'Screener — right high post' } },
      { id: 'p3', role: 'spacer', initialX: 85, initialY: 25, description: { zh: '右底角', en: 'Right corner' } },
      { id: 'p4', role: 'spacer', initialX: 15, initialY: 55, description: { zh: '弱侧45度', en: 'Weak side wing' } },
      { id: 'p5', role: 'spacer', initialX: 15, initialY: 25, description: { zh: '弱侧底角', en: 'Weak side corner' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '掩护人上提到侧翼做掩护', en: 'Screener comes up to set wing screen' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 65, y: 50 }, { x: 68, y: 60 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p2', targetId: 'p1' }],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人借掩护突破，掩护人下顺', en: 'Handler drives off screen, screener rolls' },
        duration: 2000,
        movements: [
          { positionId: 'p1', path: [{ x: 70, y: 65 }, { x: 60, y: 45 }, { x: 55, y: 25 }] },
          { positionId: 'p2', path: [{ x: 68, y: 60 }, { x: 55, y: 40 }, { x: 50, y: 15 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '持球人攻筐或分球到弱侧空位', en: 'Handler finishes or kicks to weak side' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p4' }],
        screens: [],
      },
    ],
  },
  {
    id: '5v5-floppy',
    name: { zh: 'Floppy战术', en: 'Floppy Action' },
    description: {
      zh: '射手从底线两侧绕掩护跑出接球投篮',
      en: 'Shooters run off screens from the baseline for catch-and-shoot',
    },
    mode: '5v5',
    complexity: 'medium',
    requirements: [
      { role: 'shooter', tags: ['three_point_shooter', 'mid_range', 'cutter'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 75, description: { zh: '控球 — 弧顶持球', en: 'Handler — top of key' } },
      { id: 'p2', role: 'shooter', initialX: 50, initialY: 15, description: { zh: '射手 — 篮下起跑', en: 'Shooter — starts under basket' } },
      { id: 'p3', role: 'spacer', initialX: 15, initialY: 55, description: { zh: '弱侧45度', en: 'Weak side wing' } },
      { id: 'p4', role: 'screener_left', initialX: 35, initialY: 30, description: { zh: '左侧掩护人', en: 'Left screener' } },
      { id: 'p5', role: 'screener_right', initialX: 65, initialY: 30, description: { zh: '右侧掩护人', en: 'Right screener' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '射手从篮下选择绕左侧或右侧掩护跑出', en: 'Shooter chooses to run off left or right screen' },
        duration: 2000,
        movements: [
          { positionId: 'p2', path: [{ x: 50, y: 15 }, { x: 35, y: 25 }, { x: 25, y: 50 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p4', targetId: 'p2' }],
      },
      {
        stepNumber: 2,
        description: { zh: '控球传给跑出空位的射手', en: 'Handler delivers pass to open shooter' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '射手接球投篮，掩护人顺下争抢篮板', en: 'Shooter catches and shoots, screeners roll for rebound' },
        duration: 1500,
        movements: [
          { positionId: 'p4', path: [{ x: 35, y: 30 }, { x: 40, y: 15 }] },
          { positionId: 'p5', path: [{ x: 65, y: 30 }, { x: 60, y: 15 }] },
        ],
        passes: [],
        screens: [],
      },
    ],
  },
  {
    id: '5v5-motion',
    name: { zh: '传切配合', en: 'Motion Offense' },
    description: {
      zh: '全队通过传球和无球跑动制造机会，适合没有超级强点的均衡阵容',
      en: 'Team creates chances through passing and off-ball movement — great for balanced rosters',
    },
    mode: '5v5',
    complexity: 'simple',
    requirements: [],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 75, description: { zh: '弧顶持球', en: 'Top handler' } },
      { id: 'p2', role: 'wing_right', initialX: 75, initialY: 55, description: { zh: '右侧45度', en: 'Right wing' } },
      { id: 'p3', role: 'wing_left', initialX: 25, initialY: 55, description: { zh: '左侧45度', en: 'Left wing' } },
      { id: 'p4', role: 'post', initialX: 65, initialY: 30, description: { zh: '右侧腰位', en: 'Right block' } },
      { id: 'p5', role: 'post', initialX: 35, initialY: 30, description: { zh: '左侧腰位', en: 'Left block' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '弧顶传球到右侧45度后，向传球方向空切', en: 'Top passes to right wing then cuts toward the ball' },
        duration: 1500,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 75 }, { x: 65, y: 55 }, { x: 65, y: 30 }] },
        ],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '右侧腰位上提填补弧顶，左侧45度准备接应', en: 'Right post fills to top, left wing prepares to receive' },
        duration: 1500,
        movements: [
          { positionId: 'p4', path: [{ x: 65, y: 30 }, { x: 50, y: 55 }, { x: 50, y: 75 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '右侧可以传给空切者，或回传弧顶重新组织', en: 'Wing passes to cutter under basket or swings to top' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p2', to: 'p1' }],
        screens: [],
      },
    ],
  },
];
