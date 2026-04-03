export const hotelOptions = [
  '深圳格兰云天酒店',
  '北京格兰云天酒店',
  '上海格兰云天酒店',
];

export const departmentOptions = [
  '会议销售部',
  '宴会服务部',
  '客户关系部',
];

export const meetingRoomOptions: Record<string, string[]> = {
  深圳格兰云天酒店: ['国际宴会厅', '云天厅', '悦享会议室'],
  北京格兰云天酒店: ['天际会议室', '紫云厅', '星河厅'],
  上海格兰云天酒店: ['黄浦厅', '申江厅', '外滩厅'],
};

export const salesProfile = {
  name: '刘安琪',
  mobile: '139****1088',
  avatarText: '刘',
  hotel: '深圳格兰云天酒店',
  department: '会议销售部',
  role: '会务销售',
};

export type MeetingStatus = '待开始' | '进行中' | '已结束';

export type SalesMeeting = {
  id: string
  name: string
  hotel: string
  room: string
  startTime: string
  endTime: string
  status: MeetingStatus
  participantCount: number
  signRate: string
}

export const meetings: SalesMeeting[] = [
  {
    id: 'sm-001',
    name: '2026格兰云天合作伙伴会议',
    hotel: '深圳格兰云天酒店',
    room: '国际宴会厅',
    startTime: '2026-06-01 09:00',
    endTime: '2026-06-01 12:00',
    status: '待开始',
    participantCount: 128,
    signRate: '0%',
  },
  {
    id: 'sm-002',
    name: '华南区酒店经营复盘会',
    hotel: '深圳格兰云天酒店',
    room: '云天厅',
    startTime: '2026-05-20 14:00',
    endTime: '2026-05-20 17:30',
    status: '进行中',
    participantCount: 86,
    signRate: '82%',
  },
  {
    id: 'sm-003',
    name: '数字营销专场闭门会',
    hotel: '北京格兰云天酒店',
    room: '天际会议室',
    startTime: '2026-04-16 10:00',
    endTime: '2026-04-16 16:00',
    status: '已结束',
    participantCount: 54,
    signRate: '96%',
  },
];

export const participants = [
  { id: 'p1', name: '张三', mobile: '138****1234', meetingId: 'sm-001' },
  { id: 'p2', name: '李四', mobile: '139****1231', meetingId: 'sm-001' },
  { id: 'p3', name: '陈晨', mobile: '136****1288', meetingId: 'sm-001' },
];

export const materials = [
  { id: 'm1', category: '议程', name: '主论坛议程.pdf', size: '2.1MB', updatedAt: '今天 10:22', meetingId: 'sm-001' },
  { id: 'm2', category: '会议文件', name: '会议手册.pdf', size: '8.2MB', updatedAt: '今天 09:40', meetingId: 'sm-001' },
  { id: 'm3', category: '座位图', name: '宴会厅座位图.png', size: '1.6MB', updatedAt: '昨天 18:16', meetingId: 'sm-001' },
];

export const messageRecords = {
  normal: [
    {
      id: 'n1',
      meetingName: '2026格兰云天合作伙伴会议',
      sendTime: '今天 11:20',
      title: '会议签到提醒',
      content: '请于 08:30 后进入会场扫码签到。',
      receiverCount: 128,
      readCount: 76,
    },
  ],
  receipt: [
    {
      id: 'r1',
      meetingName: '2026格兰云天合作伙伴会议',
      sendTime: '昨天 16:30',
      title: '请填写参会回执',
      content: '请在 2026-05-30 18:00 前提交住宿、接送和餐饮需求。',
      receiverCount: 128,
      readCount: 98,
      deadline: '2026-05-30 18:00',
      template: '标准会议回执模板',
      collectFields: ['到达时间', '离开时间', '是否接送', '是否住宿', '是否餐饮'],
    },
  ],
};

export const receiptStats = {
  requiredPickup: 32,
  requiredStay: 46,
  requiredMeal: 78,
  submitted: 103,
  pending: 25,
};

export const receiptArrivalDistribution = [
  { date: '2026-04-05', count: 3 },
  { date: '2026-04-06', count: 12 },
  { date: '2026-04-07', count: 18 },
  { date: '2026-04-08', count: 9 },
];

export const receiptDepartureDistribution = [
  { date: '2026-04-05', count: 2 },
  { date: '2026-04-06', count: 8 },
  { date: '2026-04-07', count: 14 },
  { date: '2026-04-08', count: 8 },
];

export const receiptDetails = [
  { name: '张三', mobile: '138****1234', pickup: '是', stay: '否', meal: '是', status: '已填写' },
  { name: '李四', mobile: '139****1231', pickup: '否', stay: '是', meal: '是', status: '已填写' },
  { name: '王武', mobile: '136****2333', pickup: '是', stay: '是', meal: '否', status: '未填写' },
];

export const signStats = {
  total: 128,
  signed: 76,
  unsigned: 52,
};

export const couponStats = [
  { type: '早餐券', verified: 58 },
  { type: '午餐券', verified: 71 },
  { type: '晚餐券', verified: 45 },
];

export const verifyRecords = [
  { name: '张三', couponType: '午餐券', verifyTime: '今天 11:42', status: '核销成功' },
  { name: '陈晨', couponType: '早餐券', verifyTime: '今天 09:10', status: '核销成功' },
  { name: '赵敏', couponType: '晚餐券', verifyTime: '昨天 19:25', status: '核销失败' },
];

export const receiptTemplates = [
  '标准会议回执模板',
  '高层闭门会回执模板',
  '客户接待会回执模板',
];

export const receiptCollectFields = ['到达时间', '离开时间', '是否接送', '是否住宿', '是否餐饮'];

export const messageDraftDefaults = {
  normal: '请各位参会嘉宾留意会议安排，提前到场签到。',
  receipt: '请于截止时间前提交接送、住宿与餐饮需求信息。',
};

export const roomAvailability = [
  {
    id: 'room-sz-1',
    hotel: '深圳格兰云天酒店',
    roomName: '国际宴会厅',
    capacity: 300,
    schedule: [
      { date: '2026-04-03', status: '可用' },
      { date: '2026-04-04', status: '不可用' },
      { date: '2026-04-05', status: '可用' },
    ],
  },
  {
    id: 'room-sz-2',
    hotel: '深圳格兰云天酒店',
    roomName: '云天厅',
    capacity: 180,
    schedule: [
      { date: '2026-04-03', status: '不可用' },
      { date: '2026-04-04', status: '可用' },
      { date: '2026-04-05', status: '可用' },
    ],
  },
  {
    id: 'room-bj-1',
    hotel: '北京格兰云天酒店',
    roomName: '天际会议室',
    capacity: 120,
    schedule: [
      { date: '2026-04-03', status: '可用' },
      { date: '2026-04-04', status: '可用' },
      { date: '2026-04-05', status: '不可用' },
    ],
  },
  {
    id: 'room-sh-1',
    hotel: '上海格兰云天酒店',
    roomName: '黄浦厅',
    capacity: 220,
    schedule: [
      { date: '2026-04-03', status: '可用' },
      { date: '2026-04-04', status: '不可用' },
      { date: '2026-04-05', status: '不可用' },
    ],
  },
];
