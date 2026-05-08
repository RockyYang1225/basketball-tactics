const zh = {
  app: { title: '篮球战术生成器' },
  topBar: {
    newTeam: '新建球队',
    deleteTeam: '删除球队',
    deleteConfirm: '确定要删除这个球队吗？',
    maxTeams: '最多保存5个球队',
    exportTeam: '导出',
    importTeam: '导入',
  },
  mode: {
    label: '比赛模式',
    '3v3': '3v3',
    '4v4': '4v4',
    '5v5': '5v5',
  },
  player: {
    name: '姓名',
    namePlaceholder: '输入球员姓名',
    keyPlayer: '强点',
    position: '位置',
    offense: '进攻特点',
    skills: '综合技能',
    physical: '身体素质',
    ratings: '数值微调',
    expand: '展开详情',
    collapse: '收起',
  },
  tactics: {
    generate: '生成战术',
    matchScore: '匹配度',
    noResult: '请先输入至少一个球员姓名',
    step: '步骤',
    rolePlayer: '角色球员',
    keyPlayerLabel: '核心球员',
  },
  animation: {
    play: '播放',
    pause: '暂停',
    prev: '上一步',
    next: '下一步',
    speed: '速度',
    style: '风格',
    board: '战术板',
    realistic: '拟物化',
  },
  positions: {
    PG: '控卫', SG: '分卫', SF: '小前', PF: '大前', C: '中锋',
  },
};

export default zh;
export type Translations = typeof zh;
