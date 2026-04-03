export const attendeeProfile = {
  nickname: '张三',
  name: '张明',
  mobile: '138****1234',
  hotel: '深圳格兰云天酒店',
  role: '参会嘉宾',
  avatarText: '张',
}

export const brandBanners = [
  {
    id: 'b1',
    title: '2026 格兰云天合作伙伴大会',
    subtitle: '品牌升级发布 · 数智会务新体验',
    tag: '品牌主会场',
    cta: '查看品牌介绍',
    to: '/brand-story',
  },
  {
    id: 'b2',
    title: '云端会务服务能力',
    subtitle: '会前提醒、扫码签到、餐券核销一体化',
    tag: '会务服务',
    cta: '了解服务权益',
    to: '/brand-story',
  },
  {
    id: 'b3',
    title: '深圳格兰云天酒店',
    subtitle: '国际宴会厅与高效接待保障',
    tag: '会议场地',
    cta: '查看酒店信息',
    to: '/contact-us',
  },
]

export const meetings = [
  {
    id: 'm1',
    name: '2026格兰云天合作伙伴会议',
    hotel: '深圳格兰云天酒店',
    room: '国际宴会厅',
    date: '2026-06-01',
    time: '09:00 - 12:00',
    status: '待开始',
    cover: '主论坛',
    agenda: [
      '09:00 - 09:30 开幕致辞',
      '09:30 - 10:30 酒店业务发布',
      '10:45 - 12:00 合作伙伴主题分享',
    ],
    group: 'A组 · 第1-10排',
    signStatus: '未签到',
  },
  {
    id: 'm2',
    name: '华南区酒店经营复盘会',
    hotel: '北京格兰云天酒店',
    room: '云天厅',
    date: '2026-05-20',
    time: '14:00 - 17:30',
    status: '已开始',
    cover: '复盘专场',
    agenda: [
      '14:00 - 15:00 经营复盘',
      '15:00 - 16:00 区域策略研讨',
      '16:00 - 17:30 行动计划确认',
    ],
    group: 'B组 · 第11-20排',
    signStatus: '已签到',
  },
]

export const materials = [
  {
    id: 'f1',
    name: '会议手册.pdf',
    category: '会议文件',
    size: '8.2MB',
    updatedAt: '今天 09:18',
    type: 'pdf',
    previewSummary: '包含会程总览、嘉宾名单、会场引导及注意事项。',
  },
  {
    id: 'f2',
    name: '主论坛议程.pdf',
    category: '议程',
    size: '2.1MB',
    updatedAt: '今天 08:52',
    type: 'pdf',
    previewSummary: '主论坛与分论坛时间安排，含签到与午休时段。',
  },
  {
    id: 'f3',
    name: '嘉宾座位图.png',
    category: '座位图',
    size: '1.3MB',
    updatedAt: '昨天 18:20',
    type: 'image',
    previewSummary: 'A/B/C 分区与排号，支持按姓名快速检索。',
  },
]

export const coupons = [
  { id: 'c1', name: '早餐券', time: '07:00 - 10:00', status: '待开始', verifyCode: 'BRKF-0928' },
  { id: 'c2', name: '午餐券', time: '11:00 - 14:00', status: '可核销', verifyCode: 'LUNCH-4621' },
  { id: 'c3', name: '晚餐券', time: '16:00 - 20:00', status: '可核销', verifyCode: 'DINE-7034' },
]

export const messages = {
  normal: [
    {
      id: 'n1',
      meetingTitle: '2026格兰云天合作伙伴会议',
      title: '会议签到提醒',
      content: '请于 2026-06-01 08:30 后到国际宴会厅门口扫码签到。',
      time: '今天 10:12',
      unread: true,
    },
    {
      id: 'n2',
      meetingTitle: '2026格兰云天合作伙伴会议',
      title: '会场路线通知',
      content: '停车后请从大堂右侧电梯上三楼，会务人员会在电梯口引导。',
      time: '昨天 17:20',
      unread: false,
    },
  ],
  receipt: [
    {
      id: 'r1',
      meetingTitle: '2026格兰云天合作伙伴会议',
      title: '请填写参会回执',
      content: '请在 2026-05-30 18:00 前完成住宿、接送和餐饮需求填写。',
      time: '今天 09:00',
      unread: true,
      deadline: '2026-05-30 18:00',
    },
  ],
}

export const services = [
  {
    name: '订酒店',
    desc: '跳转格兰云天订房小程序',
    to: '',
    icon: '酒',
    externalMiniProgram: true,
    externalAppName: '格兰云天订房',
  },
  {
    name: '逛商城',
    desc: '查看品牌商城和伴手礼',
    to: '',
    icon: '购',
    externalMiniProgram: true,
    externalAppName: '格兰云天商城',
  },
  {
    name: '一键连WiFi',
    desc: '快速连接酒店网络',
    to: '',
    icon: '网',
    externalMiniProgram: true,
    externalAppName: '格兰云天WiFi助手',
  },
  {
    name: '了解格兰云天',
    desc: '查看品牌介绍与酒店集团信息',
    to: '/brand-story',
    icon: '品',
    externalMiniProgram: false,
    externalAppName: '',
  },
  {
    name: '联系我们',
    desc: '酒店电话、官网与服务入口',
    to: '/contact-us',
    icon: '联',
    externalMiniProgram: false,
    externalAppName: '',
  },
]

export const nearbySpots = [
  {
    name: '云庭粤菜',
    type: '美食',
    distance: '500m',
    address: '福田区福华路 188 号',
    summary: '商务宴请口碑餐厅，支持包房预订。',
    image: '美食',
  },
  {
    name: '莲花山公园',
    type: '游玩',
    distance: '2.1km',
    address: '福田区红荔路 6030 号',
    summary: '城市绿地，适合会后放松散步。',
    image: '游玩',
  },
  {
    name: '福田高铁站',
    type: '交通',
    distance: '3.2km',
    address: '福田区深南大道',
    summary: '高铁与地铁换乘枢纽，出行便捷。',
    image: '交通',
  },
]

export const meetingRecords = [
  {
    id: 'mr1',
    meetingName: '2026格兰云天合作伙伴会议',
    date: '2026-06-01',
    status: '待开始',
    signStatus: '未签到',
    couponStatus: '未核销',
  },
  {
    id: 'mr2',
    meetingName: '华南区酒店经营复盘会',
    date: '2026-05-20',
    status: '已结束',
    signStatus: '已签到',
    couponStatus: '午餐已核销',
  },
  {
    id: 'mr3',
    meetingName: '数字营销专场闭门会',
    date: '2026-04-16',
    status: '已结束',
    signStatus: '已签到',
    couponStatus: '晚餐已核销',
  },
]

export const contactCards = [
  {
    id: 'cc1',
    title: '酒店前台',
    detail: '0755-8888 6677',
    actionText: '拨打电话',
  },
  {
    id: 'cc2',
    title: '会务客服',
    detail: '0755-8888 9911',
    actionText: '联系会务',
  },
  {
    id: 'cc3',
    title: '集团官网',
    detail: 'www.glyhotel.com',
    actionText: '打开官网',
  },
]

export const faqList = [
  {
    id: 'q1',
    question: '扫码签到失败怎么办？',
    answer: '请确认摄像头权限已开启，且在会议签到有效时间内重试；仍失败可联系会务台人工登记。',
  },
  {
    id: 'q2',
    question: '为什么餐券二维码无法核销？',
    answer: '可能因未到核销时段、餐券已被使用或当前活动不匹配，请先核对餐券时间与状态。',
  },
  {
    id: 'q3',
    question: '回执提交后还能修改吗？',
    answer: '回执提交后默认不可修改；如确需调整，请在截止前联系会务人员协助处理。',
  },
]
