export const attendeeProfile = {
  nickname: '张三',
  mobile: '138****1234',
  hotel: '深圳格兰云天酒店',
  role: '参会嘉宾',
}

export const meetings = [
  {
    id: 'm1',
    name: '2026格兰云天合作伙伴会议',
    hotel: '深圳格兰云天酒店',
    room: '国际宴会厅',
    date: '2026-06-01',
    time: '09:00 - 12:00',
    status: '待开始',
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
  { id: 'f1', name: '会议手册.pdf', category: '会议文件', size: '8.2MB' },
  { id: 'f2', name: '主论坛议程.pdf', category: '议程', size: '2.1MB' },
  { id: 'f3', name: '嘉宾座位图.png', category: '座位图', size: '1.3MB' },
]

export const coupons = [
  { id: 'c1', name: '早餐券', time: '07:00 - 10:00', status: '待开始' },
  { id: 'c2', name: '午餐券', time: '11:00 - 14:00', status: '可核销' },
  { id: 'c3', name: '晚餐券', time: '16:00 - 20:00', status: '可核销' },
]

export const messages = {
  normal: [
    {
      id: 'n1',
      title: '会议签到提醒',
      content: '请于 2026-06-01 08:30 后到国际宴会厅门口扫码签到。',
      time: '今天 10:12',
      unread: true,
    },
    {
      id: 'n2',
      title: '会场路线通知',
      content: '停车后请从大堂右侧电梯上三楼，会务人员会在电梯口引导。',
      time: '昨天 17:20',
      unread: false,
    },
  ],
  receipt: [
    {
      id: 'r1',
      title: '请填写参会回执',
      content: '请在 2026-05-30 18:00 前完成住宿、接送和餐饮需求填写。',
      time: '今天 09:00',
      unread: true,
      deadline: '2026-05-30 18:00',
    },
  ],
}

export const services = [
  { name: '订酒店', desc: '跳转格兰云天订房小程序' },
  { name: '逛商城', desc: '查看品牌商城和伴手礼' },
  { name: '一键连WiFi', desc: '快速连接酒店网络' },
  { name: '了解格兰云天', desc: '查看品牌介绍与酒店集团信息' },
  { name: '联系我们', desc: '酒店电话、官网与服务入口' },
]

export const nearbySpots = [
  { name: '云庭粤菜', type: '美食', distance: '500m' },
  { name: '莲花山公园', type: '游玩', distance: '2.1km' },
  { name: '福田高铁站', type: '交通', distance: '3.2km' },
]
