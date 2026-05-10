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
        description: { zh: '持球人传球给右肘区后，借左肘区掩护向左切入', en: 'Handler passes to right elbow, then cuts left off left elbow screen' },
        duration: 2000,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 75 }, { x: 35, y: 55 }, { x: 20, y: 35 }] },
        ],
        passes: [{ from: 'p1', to: 'p3' }],
        screens: [{ screenerId: 'p2', targetId: 'p1' }],
      },
      {
        stepNumber: 2,
        description: { zh: '左肘区外弹接应，右底角向上填补', en: 'Left big pops out, corner wing fills up' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 35, y: 50 }, { x: 15, y: 65 }] },
          { positionId: 'p4', path: [{ x: 85, y: 40 }, { x: 80, y: 50 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '右肘区传球给切入者或外弹者', en: 'Right big reads and passes to cutter or popper' },
        duration: 1200,
        movements: [],
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
  {
    id: '4v4-pick-and-pop',
    name: { zh: '挡拆外弹', en: 'Pick & Pop' },
    description: {
      zh: '掩护人做完掩护后外弹到三分线投篮，拉开内线空间',
      en: 'Screener pops to the three-point line after screening, stretching the defense',
    },
    mode: '4v4',
    complexity: 'medium',
    requirements: [
      { role: 'ball_handler', tags: ['pnr_ball_handler', 'playmaker'], priority: 'required' },
      { role: 'screener', tags: ['three_point_shooter', 'mid_range'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 75, description: { zh: '持球人 — 弧顶', en: 'Handler — top of key' } },
      { id: 'p2', role: 'screener', initialX: 50, initialY: 55, description: { zh: '掩护人 — 高位', en: 'Screener — high post' } },
      { id: 'p3', role: 'spacer', initialX: 85, initialY: 40, description: { zh: '右侧底角', en: 'Right corner' } },
      { id: 'p4', role: 'spacer', initialX: 15, initialY: 50, description: { zh: '弱侧45度', en: 'Weak side wing' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '掩护人上提到弧顶做掩护', en: 'Screener comes up to set screen at the top' },
        duration: 1500,
        movements: [
          { positionId: 'p2', path: [{ x: 50, y: 55 }, { x: 50, y: 68 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p2', targetId: 'p1' }],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人借掩护向右突破，掩护人外弹到左侧三分线', en: 'Handler drives right, screener pops to left three-point area' },
        duration: 1800,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 75 }, { x: 65, y: 55 }, { x: 65, y: 35 }] },
          { positionId: 'p2', path: [{ x: 50, y: 68 }, { x: 35, y: 65 }, { x: 25, y: 70 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '持球人传球给外弹到三分线的掩护人投篮', en: 'Handler kicks out to popped screener for three' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
    ],
  },
  {
    id: '4v4-flex',
    name: { zh: 'Flex战术', en: 'Flex Offense' },
    description: {
      zh: '通过底线交叉掩护和下掩护的轮转创造近筐得分机会',
      en: 'Baseline cross-screens and down-screens create scoring near the basket',
    },
    mode: '4v4',
    complexity: 'medium',
    requirements: [
      { role: 'cutter', tags: ['cutter', 'mid_range'], priority: 'preferred' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 30, initialY: 70, description: { zh: '持球人 — 左侧45度', en: 'Handler — left wing' } },
      { id: 'p2', role: 'cutter', initialX: 85, initialY: 25, description: { zh: '底线切入者 — 右底角', en: 'Cutter — right corner baseline' } },
      { id: 'p3', role: 'screener', initialX: 50, initialY: 25, description: { zh: '底线掩护人 — 罚球区', en: 'Baseline screener — lane' } },
      { id: 'p4', role: 'high_post', initialX: 65, initialY: 55, description: { zh: '高位策应 — 右肘区', en: 'High post — right elbow' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '底线掩护人为右底角球员做横掩护，切入者沿底线切入篮下', en: 'Baseline screener sets cross-screen; cutter cuts along baseline to basket' },
        duration: 1800,
        movements: [
          { positionId: 'p2', path: [{ x: 85, y: 25 }, { x: 65, y: 20 }, { x: 45, y: 15 }] },
        ],
        passes: [],
        screens: [{ screenerId: 'p3', targetId: 'p2' }],
      },
      {
        stepNumber: 2,
        description: { zh: '持球人传球给切入到篮下的队友', en: 'Handler passes to cutter at the basket' },
        duration: 1200,
        movements: [
          { positionId: 'p4', path: [{ x: 65, y: 55 }, { x: 55, y: 45 }] },
        ],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '如果底线切入没有机会，高位下掩护，掩护人上提接球', en: 'If baseline cut is denied, high post down-screens for screener to pop' },
        duration: 1500,
        movements: [
          { positionId: 'p3', path: [{ x: 50, y: 25 }, { x: 55, y: 40 }, { x: 60, y: 60 }] },
        ],
        passes: [{ from: 'p1', to: 'p3' }],
        screens: [{ screenerId: 'p4', targetId: 'p3' }],
      },
    ],
  },
  {
    id: '4v4-swing',
    name: { zh: '传导转移', en: 'Swing Offense' },
    description: {
      zh: '通过快速传球转移球，利用防守轮转的时间差找到空位',
      en: 'Rapid ball movement exploits defensive rotations to find the open man',
    },
    mode: '4v4',
    complexity: 'simple',
    requirements: [
      { role: 'passer', tags: ['passer', 'playmaker'], priority: 'preferred' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 50, initialY: 75, description: { zh: '持球人 — 弧顶', en: 'Handler — top' } },
      { id: 'p2', role: 'wing_right', initialX: 80, initialY: 55, description: { zh: '右侧45度', en: 'Right wing' } },
      { id: 'p3', role: 'wing_left', initialX: 20, initialY: 55, description: { zh: '左侧45度', en: 'Left wing' } },
      { id: 'p4', role: 'corner', initialX: 15, initialY: 30, description: { zh: '左侧底角', en: 'Left corner' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '弧顶传球到右侧45度，然后向左移动', en: 'Top passes to right wing, then moves left' },
        duration: 1200,
        movements: [
          { positionId: 'p1', path: [{ x: 50, y: 75 }, { x: 35, y: 70 }] },
        ],
        passes: [{ from: 'p1', to: 'p2' }],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '右侧快速转移到弧顶再到左侧', en: 'Ball swings from right wing to top to left wing' },
        duration: 1500,
        movements: [
          { positionId: 'p4', path: [{ x: 15, y: 30 }, { x: 15, y: 40 }] },
        ],
        passes: [{ from: 'p2', to: 'p1' }, { from: 'p1', to: 'p3' }],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '左侧接球后传底角或自己攻击防守还没轮转到位的空档', en: 'Left wing attacks the gap or hits the corner before defense rotates' },
        duration: 1500,
        movements: [
          { positionId: 'p3', path: [{ x: 20, y: 55 }, { x: 25, y: 40 }] },
        ],
        passes: [{ from: 'p3', to: 'p4' }],
        screens: [],
      },
    ],
  },
  {
    id: '4v4-backdoor',
    name: { zh: '后门切入', en: 'Backdoor Cut' },
    description: {
      zh: '强侧吸引防守注意力，弱侧球员反跑切入篮下得分',
      en: 'Strong side draws defensive attention while weak side player cuts backdoor for a score',
    },
    mode: '4v4',
    complexity: 'medium',
    requirements: [
      { role: 'cutter', tags: ['cutter', 'fast'], priority: 'required' },
    ],
    positions: [
      { id: 'p1', role: 'ball_handler', initialX: 35, initialY: 70, description: { zh: '持球人 — 左侧持球', en: 'Handler — left side' } },
      { id: 'p2', role: 'wing', initialX: 15, initialY: 45, description: { zh: '强侧45度', en: 'Strong side wing' } },
      { id: 'p3', role: 'cutter', initialX: 75, initialY: 55, description: { zh: '弱侧切入者', en: 'Weak side cutter' } },
      { id: 'p4', role: 'spacer', initialX: 85, initialY: 30, description: { zh: '弱侧底角', en: 'Weak side corner' } },
    ],
    steps: [
      {
        stepNumber: 1,
        description: { zh: '持球人向强侧运球，吸引防守注意力', en: 'Handler dribbles to strong side, drawing defensive attention' },
        duration: 1500,
        movements: [
          { positionId: 'p1', path: [{ x: 35, y: 70 }, { x: 25, y: 60 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 2,
        description: { zh: '弱侧切入者假装外切后突然反跑向篮下', en: 'Weak side cutter fakes out then cuts backdoor to the basket' },
        duration: 1800,
        movements: [
          { positionId: 'p3', path: [{ x: 75, y: 55 }, { x: 70, y: 65 }, { x: 60, y: 40 }, { x: 55, y: 15 }] },
        ],
        passes: [],
        screens: [],
      },
      {
        stepNumber: 3,
        description: { zh: '持球人送出长传到篮下的切入者', en: 'Handler delivers skip pass to cutter at the rim' },
        duration: 1200,
        movements: [],
        passes: [{ from: 'p1', to: 'p3' }],
        screens: [],
      },
    ],
  },
];
