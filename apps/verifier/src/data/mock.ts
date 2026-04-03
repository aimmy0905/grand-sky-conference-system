export const verifierUser = {
  nickname: '王小华',
  name: '王小华',
  mobile: '138****5678',
  avatarText: '王',
  role: '餐饮核销岗',
  hotel: '深圳格兰云天酒店',
  shift: '早餐 + 午餐',
};

export const hotelOptions = [
  '深圳格兰云天酒店',
  '北京格兰云天酒店',
  '上海格兰云天酒店',
];

export type VerifyRecord = {
  id: string
  attendeeName: string
  meetingName: string
  couponType: '早餐券' | '午餐券' | '晚餐券'
  verifyTime: string
  status: '核销成功' | '核销失败'
  reason?: string
}

export const verifyRecords: VerifyRecord[] = [
  {
    id: 'vr1',
    attendeeName: '张三',
    meetingName: '2026格兰云天合作伙伴会议',
    couponType: '午餐券',
    verifyTime: '2026-06-01 11:42',
    status: '核销成功',
  },
  {
    id: 'vr2',
    attendeeName: '李四',
    meetingName: '2026格兰云天合作伙伴会议',
    couponType: '早餐券',
    verifyTime: '2026-06-01 06:20',
    status: '核销失败',
    reason: '当前时段不可核销该餐券',
  },
  {
    id: 'vr3',
    attendeeName: '陈晨',
    meetingName: '华南区酒店经营复盘会',
    couponType: '晚餐券',
    verifyTime: '2026-05-20 18:03',
    status: '核销失败',
    reason: '该餐券已核销，不可重复操作',
  },
  {
    id: 'vr4',
    attendeeName: '赵敏',
    meetingName: '华南区酒店经营复盘会',
    couponType: '午餐券',
    verifyTime: '2026-05-20 11:51',
    status: '核销成功',
  },
];

export const dateRanges = ['今天', '最近7天', '最近30天'];
export const couponTypes = ['全部', '早餐券', '午餐券', '晚餐券'] as const;

export const scanResults = {
  success: {
    title: '核销成功',
    message: '午餐券 核销成功',
    meetingName: '2026格兰云天合作伙伴会议',
    subMessage: '参会人：张三',
    tone: 'success' as const,
  },
  invalidTime: {
    title: '核销失败',
    message: '当前时段不可核销该餐券',
    meetingName: '',
    subMessage: '请核对餐券时段后重试',
    tone: 'danger' as const,
  },
  repeated: {
    title: '核销失败',
    message: '该餐券已核销，不可重复操作',
    meetingName: '',
    subMessage: '可在后台手动补录异常说明',
    tone: 'danger' as const,
  },
};
