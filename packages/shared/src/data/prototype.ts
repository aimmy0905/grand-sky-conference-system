export interface PrototypeItem {
  title: string
  subtitle?: string
  meta?: string
  badge?: string
  action?: string
  hint?: string
  tone?: 'gold' | 'navy' | 'success' | 'danger' | 'warning' | 'neutral'
}

export interface PrototypeField {
  label: string
  value?: string
  placeholder?: string
  type?: string
  tag?: string
}

export interface PrototypeSection {
  type: 'hero' | 'stats' | 'cards' | 'list' | 'form' | 'timeline' | 'qr' | 'notice' | 'table' | 'calendar' | 'chart'
  title?: string
  description?: string
  tag?: string
  tone?: 'gold' | 'navy' | 'success' | 'danger' | 'warning' | 'neutral'
  text?: string
  items?: PrototypeItem[]
  fields?: PrototypeField[]
  columns?: string[]
  rows?: string[][]
  code?: string
  footer?: string
}

export interface PrototypePage {
  slug: string
  title: string
  summary: string
  screenTitle: string
  group: string
  layout: 'mobile' | 'admin'
  bottomNav?: Array<{ label: string, active?: boolean }>
  sections: PrototypeSection[]
  checkpoints: string[]
  flow: string[]
}

export interface PrototypeGroup {
  title: string
  pages: PrototypePage[]
}

export interface PrototypeSystem {
  id: 'attendee' | 'verifier' | 'sales' | 'admin'
  name: string
  shortName: string
  platform: string
  viewport: string
  businessPageCount: number
  description: string
  highlights: string[]
  groups: PrototypeGroup[]
}

const hotels = ['深圳格兰云天酒店', '北京格兰云天酒店']
const departments = ['会议销售部', '宴会服务部', '客户关系部']

const hero = (title: string, description: string, tag?: string): PrototypeSection => ({
  type: 'hero',
  title,
  description,
  tag,
})

const notice = (
  text: string,
  tone: PrototypeSection['tone'] = 'navy',
): PrototypeSection => ({
  type: 'notice',
  text,
  tone,
})

const stats = (items: PrototypeItem[]): PrototypeSection => ({
  type: 'stats',
  items,
})

const cards = (title: string, items: PrototypeItem[]): PrototypeSection => ({
  type: 'cards',
  title,
  items,
})

const list = (title: string, items: PrototypeItem[]): PrototypeSection => ({
  type: 'list',
  title,
  items,
})

const form = (title: string, fields: PrototypeField[], text?: string): PrototypeSection => ({
  type: 'form',
  title,
  fields,
  text,
})

const timeline = (title: string, items: PrototypeItem[]): PrototypeSection => ({
  type: 'timeline',
  title,
  items,
})

const qr = (title: string, description: string, code: string, footer: string): PrototypeSection => ({
  type: 'qr',
  title,
  description,
  code,
  footer,
})

const table = (title: string, columns: string[], rows: string[][]): PrototypeSection => ({
  type: 'table',
  title,
  columns,
  rows,
})

const chart = (title: string, items: PrototypeItem[]): PrototypeSection => ({
  type: 'chart',
  title,
  items,
})

const calendar = (title: string, items: PrototypeItem[]): PrototypeSection => ({
  type: 'calendar',
  title,
  items,
})

const page = (config: PrototypePage): PrototypePage => config

function buildLoginPages(systemName: string, subtitle: string, withSelector: boolean): PrototypePage[] {
  const pages = [
    page({
      slug: 'wechat-login',
      title: '微信授权登录',
      summary: '品牌展示、授权按钮与协议说明',
      screenTitle: systemName,
      group: '登录流程',
      layout: 'mobile',
      sections: [
        hero(systemName, subtitle, '登录入口'),
        cards('授权说明', [
          { title: '微信授权登录', subtitle: '获取头像、昵称后进入身份验证', badge: '主按钮', action: '立即授权', tone: 'gold' },
          { title: '协议说明', subtitle: '登录即同意《用户服务协议》《隐私政策》', badge: '文字按钮', action: '查看协议' },
        ]),
        notice('原型阶段仅模拟微信授权与失败提示，不接真实开放平台能力。', 'warning'),
      ],
      checkpoints: ['使用品牌金主按钮', '协议入口需可单独点击', '授权失败需有 3s 错误提示'],
      flow: ['微信授权登录', '未绑定手机号进入绑定页', '已绑定则进入身份验证页'],
    }),
    page({
      slug: 'bind-phone',
      title: '手机号绑定',
      summary: '手机号 + 验证码完成身份验证',
      screenTitle: '绑定手机号',
      group: '登录流程',
      layout: 'mobile',
      sections: [
        hero('手机号绑定', '完成微信身份与系统账号映射'),
        form('绑定表单', [
          { label: '手机号', value: '13800138000', type: 'number', tag: 'fa-phone' },
          { label: '验证码', value: '864219', type: 'number', tag: 'fa-shield-halved' },
        ], '获取验证码按钮在手机号合法后激活，提交后按角色跳转。'),
        cards('交互状态', [
          { title: '获取验证码', subtitle: '60 秒倒计时与禁用态', badge: '次按钮', action: '60s 后重新获取' },
          { title: '绑定并登录', subtitle: '校验成功后写入已绑定状态', badge: '主按钮', action: '提交' },
        ]),
      ],
      checkpoints: ['手机号仅允许 11 位数字', '验证码 6 位数字', '错误态显示红色提示语'],
      flow: ['输入手机号', '发送验证码', '填写验证码并登录'],
    }),
    page({
      slug: 'bound-login',
      title: '已绑定手机号登录',
      summary: '展示已绑定信息并支持一键登录',
      screenTitle: systemName,
      group: '登录流程',
      layout: 'mobile',
      sections: [
        hero(systemName, '读取本地绑定信息后直接完成身份验证'),
        list('账号信息', [
          { title: '微信昵称', subtitle: '格兰会议用户', meta: '已绑定：138****1234', action: '切换账号' },
        ]),
        notice('无权限用户需提示“您无此系统使用权限，请联系管理员开通”。', 'danger'),
      ],
      checkpoints: ['账号信息卡片需展示头像与脱敏手机号', '切换账号清除当前状态', '一键登录失败需明确提示原因'],
      flow: ['读取本地绑定信息', '点击直接登录', withSelector ? '进入酒店/部门选择弹窗' : '进入业务首页'],
    }),
  ]

  if (withSelector) {
    pages.push(page({
      slug: 'hotel-selector',
      title: '酒店 / 部门选择',
      summary: '核销端与会务端的组织归属选择弹窗',
      screenTitle: '选择所属组织',
      group: '登录流程',
      layout: 'mobile',
      sections: [
        hero('组织选择', '根据后台配置完成所属酒店与部门确认', '弹窗'),
        form('组织信息', [
          { label: '所属酒店', value: hotels[0], type: 'select' },
          { label: '所属部门', value: departments[0], type: 'select' },
        ], '核销端仅需要选择所属酒店，会务端需要同时选择部门。'),
        notice('选择结果需长期缓存，下次登录优先复用。', 'success'),
      ],
      checkpoints: ['弹窗需带遮罩与滑入动画', '未选完时确认按钮禁用', '酒店选择后再加载部门'],
      flow: ['完成身份验证', '选择酒店 / 部门', '进入对应业务首页'],
    }))
  }

  return pages
}

const attendeePages: PrototypePage[] = [
  page({
    slug: 'home',
    title: '首页',
    summary: '展示会议列表、状态标签和底部导航',
    screenTitle: '格兰云天会议',
    group: '参会业务',
    layout: 'mobile',
    bottomNav: [
      { label: '首页', active: true },
      { label: '消息' },
      { label: '我的' },
    ],
    sections: [
      hero('2026格兰云天合作伙伴会议', '深圳格兰云天酒店 · 国际宴会厅 · 06-01 09:00', '待开始'),
      stats([
        { title: '参会会议', subtitle: '当前账号', meta: '3 场' },
        { title: '未读消息', subtitle: '普通 + 回执', meta: '2 条', tone: 'danger' },
      ]),
      cards('会议列表', [
        { title: '2026格兰云天合作伙伴会议', subtitle: '深圳格兰云天酒店 · 三楼宴会厅', meta: '2026-06-01 09:00-12:00', badge: '待开始', action: '查看详情', tone: 'gold' },
        { title: '华南区酒店经营复盘会', subtitle: '北京格兰云天酒店 · 云天厅', meta: '2026-05-20 14:00-17:30', badge: '已开始', action: '查看详情', tone: 'navy' },
      ]),
      notice('空状态需提供“暂无会议，请等待会务人员添加”提示。'),
    ],
    checkpoints: ['会议卡片需要时间倒序', '状态区分待开始 / 已开始', '消息入口支持未读红点'],
    flow: ['查看会议列表', '进入会议详情', '从底部导航切换消息 / 我的'],
  }),
  page({
    slug: 'meeting-detail',
    title: '会议详情',
    summary: '会议信息、资料、签到和餐券集中页',
    screenTitle: '会议详情',
    group: '参会业务',
    layout: 'mobile',
    bottomNav: [
      { label: '首页' },
      { label: '消息' },
      { label: '我的' },
    ],
    sections: [
      hero('2026格兰云天合作伙伴会议', '议程、资料、签到、餐券在同页收敛', '核心页'),
      timeline('会议信息', [
        { title: '09:00 - 09:30 开幕式', subtitle: '主持人：会务部', meta: '主舞台' },
        { title: '09:30 - 12:00 主题演讲', subtitle: 'A 组入座 1-10 排', meta: '国际宴会厅' },
      ]),
      cards('我的餐券', [
        { title: '午餐券', subtitle: '11:00 - 14:00 可核销', badge: '未使用', action: '生成二维码', tone: 'gold' },
        { title: '晚餐券', subtitle: '16:00 - 20:00 可核销', badge: '待开始', action: '查看规则' },
      ]),
      cards('会议资料', [
        { title: '会议手册.pdf', subtitle: '会议文件', meta: 'PDF · 8.2MB', action: '预览 / 下载' },
        { title: '座位图.png', subtitle: '座位图', meta: '图片 · 2.4MB', action: '预览 / 下载' },
      ]),
      notice('签到按钮在已签到后应禁用，并显示签到成功时间。', 'success'),
    ],
    checkpoints: ['资料按议程 / 文件 / 座位图分类', '餐券按早餐 / 午餐 / 晚餐切换', '签到按钮固定在显著位置'],
    flow: ['查看会议信息', '点击扫码签到', '预览资料或生成餐券二维码'],
  }),
  page({
    slug: 'message-center',
    title: '消息通知',
    summary: '普通消息与回执消息双标签管理',
    screenTitle: '消息通知',
    group: '参会业务',
    layout: 'mobile',
    bottomNav: [
      { label: '首页' },
      { label: '消息', active: true },
      { label: '我的' },
    ],
    sections: [
      hero('消息通知', '按普通消息 / 回执消息双标签组织内容', '未读 2'),
      list('普通消息', [
        { title: '会议时间调整提醒', subtitle: '签到时间提前至 08:30 开始', meta: '10:12', badge: '未读' },
        { title: '会场路线指引', subtitle: '停车场至宴会厅步行约 5 分钟', meta: '昨天', badge: '已读' },
      ]),
      list('回执消息', [
        { title: '请填写住宿与接送回执', subtitle: '截止时间 2026-05-30 18:00', meta: '回执模板：标准会议', action: '去填写', badge: '待处理', tone: 'gold' },
      ]),
      notice('截止前 24 小时和 1 小时需触发订阅消息提醒。', 'warning'),
    ],
    checkpoints: ['未读消息红点和数量需要明显', '回执消息进入填写页', '消息详情支持完整内容查看'],
    flow: ['查看消息列表', '区分普通 / 回执消息', '进入消息详情或填写回执'],
  }),
  page({
    slug: 'receipt-form',
    title: '回执填写',
    summary: '收集到达、离开、接送、住宿和餐饮需求',
    screenTitle: '填写回执',
    group: '参会业务',
    layout: 'mobile',
    sections: [
      hero('回执模板：标准会议出行', '提交后不可修改，请确认信息准确', '截止 05-30 18:00'),
      form('回执表单', [
        { label: '到达时间', value: '2026-05-31 20:30', type: 'datetime' },
        { label: '离开时间', value: '2026-06-02 14:00', type: 'datetime' },
        { label: '是否需要接送', value: '需要', type: 'radio' },
        { label: '是否需要住宿', value: '需要', type: 'radio' },
        { label: '是否需要餐饮', value: '需要', type: 'radio' },
      ], '提交后同步到会务端与后台的回执统计。'),
      notice('回执仅允许提交一次，截止后按钮需禁用。', 'danger'),
    ],
    checkpoints: ['表单必填项完整', '提交后二次确认', '截止前显著展示剩余时间'],
    flow: ['打开回执消息', '填写必填项', '提交并锁定页面'],
  }),
  page({
    slug: 'profile',
    title: '个人中心',
    summary: '个人信息、常用服务和会议记录入口',
    screenTitle: '我的',
    group: '参会业务',
    layout: 'mobile',
    bottomNav: [
      { label: '首页' },
      { label: '消息' },
      { label: '我的', active: true },
    ],
    sections: [
      hero('张三', '微信授权头像、姓名与手机号校验状态', 'VIP 参会人'),
      cards('快捷服务', [
        { title: '订酒店', subtitle: '跳转格兰云天订房小程序', action: '立即前往' },
        { title: '逛商城', subtitle: '跳转商城小程序', action: '立即前往' },
        { title: '一键连 WiFi', subtitle: '打开酒店网络连接入口', action: '去连接' },
      ]),
      list('个人设置', [
        { title: '修改姓名', subtitle: '需再次验证手机号', action: '去修改' },
        { title: '会议记录', subtitle: '查看待开始 / 已结束 / 全部会议', action: '查看记录' },
      ]),
    ],
    checkpoints: ['头像昵称来自微信授权', '姓名修改需走校验流程', '服务入口跳转清晰'],
    flow: ['查看个人信息', '进入服务入口', '切换到会议记录页面'],
  }),
  page({
    slug: 'material-preview',
    title: '资料预览',
    summary: '在线浏览 PPT / PDF / 图片等会议资料',
    screenTitle: '资料预览',
    group: '参会业务',
    layout: 'mobile',
    sections: [
      hero('会议手册.pdf', '在线预览 + 底部下载操作', 'PDF'),
      cards('预览工具栏', [
        { title: '页码定位', subtitle: '支持缩略图和当前页提示', action: '第 3 / 12 页' },
        { title: '下载到本地', subtitle: '文件保存到设备存储', action: '下载', tone: 'gold' },
      ]),
      notice('需兼容 PDF、PPT、Word、Excel、图片等常见资料类型的占位预览。'),
    ],
    checkpoints: ['顶部返回与文件名展示', '底部下载按钮固定', '预览区占满屏幕主体'],
    flow: ['从会议详情点击资料', '进入预览页', '下载或返回详情'],
  }),
  page({
    slug: 'meeting-records',
    title: '会议记录',
    summary: '按状态筛选历史会议、签到和核销记录',
    screenTitle: '会议记录',
    group: '参会业务',
    layout: 'mobile',
    sections: [
      hero('历史会议记录', '支持待开始 / 已结束 / 全部筛选', '全部'),
      list('会议列表', [
        { title: '华南区酒店经营复盘会', subtitle: '已签到 · 午餐券已核销', meta: '2026-05-20', action: '查看详情' },
        { title: '供应链协同会', subtitle: '未签到 · 无餐券', meta: '2026-04-18', action: '查看详情' },
      ]),
      notice('历史会议仍需可查看资料和签到状态，但不允许再次签到。'),
    ],
    checkpoints: ['筛选项固定置顶', '状态信息在卡片上可直接识别', '历史会议支持再次查看资料'],
    flow: ['进入个人中心', '切换筛选条件', '查看历史会议详情'],
  }),
  page({
    slug: 'service-hub',
    title: '关联功能入口',
    summary: '订房、商城、WiFi、品牌介绍和联系我们',
    screenTitle: '会议服务',
    group: '参会业务',
    layout: 'mobile',
    sections: [
      hero('品牌服务入口', '围绕住宿、购物和在店服务扩展参会体验'),
      cards('功能入口', [
        { title: '订酒店', subtitle: '直达格兰云天订房能力', action: '跳转小程序' },
        { title: '逛商城', subtitle: '购买伴手礼与周边商品', action: '跳转小程序' },
        { title: '了解格兰云天', subtitle: '品牌介绍与发展历程', action: '查看详情' },
        { title: '联系我们', subtitle: '查看电话与官网链接', action: '查看详情' },
      ]),
    ],
    checkpoints: ['入口保持统一卡片尺寸', '外跳转行为需给出提示', '品牌介绍页支持长图文展示'],
    flow: ['从个人中心进入', '选择服务入口', '跳转外部能力或品牌内容'],
  }),
  page({
    slug: 'nearby-info',
    title: '周边信息',
    summary: '推荐酒店周边的美食、游玩和交通信息',
    screenTitle: '周边信息',
    group: '参会业务',
    layout: 'mobile',
    sections: [
      hero('深圳格兰云天酒店周边', '基于酒店位置推荐美食 / 游玩 / 交通'),
      cards('推荐列表', [
        { title: '云庭粤菜', subtitle: '美食 · 距离 500m', meta: '招牌早茶与商务套餐', action: '查看详情' },
        { title: '莲花山公园', subtitle: '游玩 · 距离 2.1km', meta: '适合会后散步放松', action: '查看详情' },
        { title: '福田高铁站', subtitle: '交通 · 距离 3.2km', meta: '打车约 12 分钟', action: '导航前往' },
      ]),
    ],
    checkpoints: ['分类筛选固定在顶部', '卡片包含图片占位、距离、简介', '交通类支持导航动作'],
    flow: ['进入周边信息', '切换分类', '查看详情或导航'],
  }),
  page({
    slug: 'contact-us',
    title: '联系我们',
    summary: '展示总机电话、客服电话和官网入口',
    screenTitle: '联系我们',
    group: '参会业务',
    layout: 'mobile',
    sections: [
      hero('联系格兰云天', '在店支持、客服电话与官网链接汇总'),
      list('联系方式', [
        { title: '酒店总机', subtitle: '0755-8888 6666', action: '拨打电话' },
        { title: '会议客服', subtitle: '400-800-2026', action: '拨打电话' },
        { title: '官方网站', subtitle: 'www.grand-sky.com', action: '打开官网' },
      ]),
      notice('关于我们配置与联系方式需要和后台保持一致。', 'success'),
    ],
    checkpoints: ['电话可直接拨打', '官网链接可外跳', '支持展示品牌图文介绍'],
    flow: ['查看联系方式', '一键拨号或打开官网', '返回个人中心'],
  }),
]

const verifierPages: PrototypePage[] = [
  page({
    slug: 'home',
    title: '核销首页',
    summary: '核销入口与记录入口集合页',
    screenTitle: '核销中心',
    group: '核销业务',
    layout: 'mobile',
    bottomNav: [
      { label: '首页', active: true },
      { label: '记录' },
    ],
    sections: [
      hero('核销中心', '突出扫码核销主操作，记录入口辅助', '今日 120 次'),
      cards('快捷入口', [
        { title: '扫码核销', subtitle: '打开摄像头识别参会餐券二维码', action: '立即扫码', tone: 'gold' },
        { title: '核销记录', subtitle: '按时间倒序查看操作结果', action: '查看记录' },
      ]),
      stats([
        { title: '今日核销', meta: '120 次' },
        { title: '异常核销', meta: '3 次', tone: 'warning' },
      ]),
    ],
    checkpoints: ['扫码按钮需要最大视觉权重', '记录入口支持明显跳转', '底部导航仅保留首页 / 记录'],
    flow: ['进入核销首页', '点击扫码核销', '返回查看核销记录'],
  }),
  page({
    slug: 'scanner',
    title: '扫码核销页',
    summary: '摄像头取景框与核销结果反馈',
    screenTitle: '扫码核销',
    group: '核销业务',
    layout: 'mobile',
    sections: [
      hero('扫码核销', '摄像头全屏 + 中央识别框 + 结果弹窗'),
      qr('餐券识别框', '请扫描参会人员餐券二维码', 'LUNCH-2026-001', '识别成功后弹出核销结果弹窗'),
      cards('核销反馈', [
        { title: '核销成功', subtitle: '午餐券 · 张三 · 11:42', badge: '成功', action: '确认', tone: 'success' },
        { title: '核销失败', subtitle: '当前时段不可核销该餐券', badge: '异常', action: '确认', tone: 'danger' },
      ]),
    ],
    checkpoints: ['扫码框居中展示', '结果弹窗区分成功 / 失败样式', '返回按钮悬浮于摄像头层'],
    flow: ['打开摄像头', '识别二维码', '展示核销结果'],
  }),
  page({
    slug: 'records',
    title: '核销记录',
    summary: '按时间、餐券类型和日期筛选核销结果',
    screenTitle: '核销记录',
    group: '核销业务',
    layout: 'mobile',
    bottomNav: [
      { label: '首页' },
      { label: '记录', active: true },
    ],
    sections: [
      hero('核销记录', '支持按日期范围与餐券类型筛选', '最近 7 天'),
      list('记录列表', [
        { title: '张三 · 午餐券', subtitle: '2026格兰云天合作伙伴会议', meta: '2026-06-01 11:42', badge: '核销成功', tone: 'success' },
        { title: '李四 · 早餐券', subtitle: '当前时段不可核销该餐券', meta: '2026-06-01 06:20', badge: '核销失败', tone: 'danger' },
      ]),
      notice('核销记录需按时间倒序展示，并保留异常原因。'),
    ],
    checkpoints: ['记录项展示人名 / 会议 / 餐券类型 / 状态', '支持筛选条件回显', '异常状态颜色与说明清晰'],
    flow: ['进入记录页', '设置筛选条件', '查看核销明细'],
  }),
  page({
    slug: 'profile',
    title: '个人中心',
    summary: '展示账号所属酒店、班次和快捷设置',
    screenTitle: '我的',
    group: '核销业务',
    layout: 'mobile',
    sections: [
      hero('王小华', `${hotels[0]} · 餐饮核销岗`, '在岗中'),
      list('账号信息', [
        { title: '所属酒店', subtitle: hotels[0] },
        { title: '手机号', subtitle: '138****5678' },
        { title: '今日班次', subtitle: '早餐 + 午餐', badge: '已排班' },
      ]),
      cards('快捷设置', [
        { title: '切换所属酒店', subtitle: '重新选择登录归属', action: '去切换' },
        { title: '帮助中心', subtitle: '查看核销异常说明', action: '查看帮助' },
      ]),
    ],
    checkpoints: ['展示登录归属信息', '支持切换酒店', '帮助入口覆盖常见异常处理'],
    flow: ['查看个人信息', '切换酒店或查看帮助', '返回首页继续核销'],
  }),
  page({
    slug: 'filter-modal',
    title: '筛选弹窗',
    summary: '核销记录页面的日期和餐券类型筛选弹窗',
    screenTitle: '筛选条件',
    group: '核销业务',
    layout: 'mobile',
    sections: [
      hero('筛选记录', '以底部弹窗形式承载筛选项', '弹层'),
      form('筛选项', [
        { label: '日期范围', value: '2026-06-01 至 2026-06-07', type: 'daterange' },
        { label: '餐券类型', value: '午餐券', type: 'select' },
      ], '点击确认后刷新核销记录列表。'),
      notice('筛选弹窗建议从底部上滑，支持重置与确认双操作。'),
    ],
    checkpoints: ['底部弹层动画清晰', '提供重置条件入口', '确认后关闭并刷新列表'],
    flow: ['从记录页点击筛选', '选择条件', '确认返回记录列表'],
  }),
]

const salesPages: PrototypePage[] = [
  page({
    slug: 'home',
    title: '会务首页',
    summary: '六宫格功能入口和底部导航',
    screenTitle: '会务中心',
    group: '会务业务',
    layout: 'mobile',
    bottomNav: [
      { label: '首页', active: true },
      { label: '会议' },
      { label: '消息' },
      { label: '我的' },
    ],
    sections: [
      hero('会务中心', '围绕会议管理、资料、消息和数据进行业务操作', '今日 2 场'),
      cards('功能入口', [
        { title: '会议管理', subtitle: '创建、编辑、删除会议', action: '进入模块', tone: 'gold' },
        { title: '资料管理', subtitle: '上传议程 / 文件 / 座位图', action: '进入模块' },
        { title: '消息通知', subtitle: '发送普通消息与回执消息', action: '进入模块' },
        { title: '回执统计', subtitle: '查看接送 / 住宿 / 餐饮需求', action: '进入模块' },
      ]),
      stats([
        { title: '有效会议', meta: '4 场' },
        { title: '待发送消息', meta: '1 条', tone: 'warning' },
      ]),
    ],
    checkpoints: ['入口采用 2 x 3 网格布局', '会议管理和消息入口优先级更高', '底部导航对应首页 / 会议 / 消息 / 我的'],
    flow: ['查看功能入口', '进入会议或消息模块', '返回首页切换其他功能'],
  }),
  page({
    slug: 'meeting-management',
    title: '会议管理',
    summary: '会议列表、状态筛选与编辑入口',
    screenTitle: '会议管理',
    group: '会务业务',
    layout: 'mobile',
    sections: [
      hero('会议管理', '创建、编辑、删除待开始会议', '待开始 2'),
      list('会议列表', [
        { title: '2026格兰云天合作伙伴会议', subtitle: '深圳格兰云天酒店 · 三楼宴会厅', meta: '06-01 09:00 - 12:00', badge: '待开始', action: '编辑', tone: 'gold' },
        { title: '大客户签约会', subtitle: '北京格兰云天酒店 · 云天厅', meta: '05-20 14:00 - 17:00', badge: '已开始', action: '查看' },
      ]),
      notice('仅待开始且未添加参会人的会议可删除，删除前需二次确认。', 'danger'),
    ],
    checkpoints: ['支持按状态与酒店筛选', '待开始会议展示编辑 / 删除入口', '已开始会议仅支持查看'],
    flow: ['查看会议列表', '进入创建或编辑', '对会议进行维护'],
  }),
  page({
    slug: 'create-meeting',
    title: '创建会议',
    summary: '录入会议基本信息并生成唯一标识',
    screenTitle: '创建会议',
    group: '会务业务',
    layout: 'mobile',
    sections: [
      hero('创建会议', '名称、时间、酒店、会议室和简介为核心字段'),
      form('会议表单', [
        { label: '会议名称', value: '2026格兰云天合作伙伴会议', type: 'text' },
        { label: '开始时间', value: '2026-06-01 09:00', type: 'datetime' },
        { label: '结束时间', value: '2026-06-01 12:00', type: 'datetime' },
        { label: '所属酒店', value: hotels[0], type: 'select' },
        { label: '会议室', value: '国际宴会厅', type: 'select' },
      ], '保存后生成会议唯一标识，状态默认为待开始。'),
      notice('会议室需根据酒店联动过滤。', 'success'),
    ],
    checkpoints: ['开始 / 结束时间必须校验', '酒店与会议室联动', '保存成功后回到会议详情'],
    flow: ['填写会议基础信息', '提交创建', '跳转会议管理或详情页'],
  }),
  page({
    slug: 'attendee-management',
    title: '参会人员管理',
    summary: '手动添加与删除参会人员',
    screenTitle: '参会人员',
    group: '会务业务',
    layout: 'mobile',
    sections: [
      hero('参会人员管理', '仅支持手动录入姓名和手机号'),
      form('新增参会人', [
        { label: '姓名', value: '张三', type: 'text' },
        { label: '手机号', value: '13800138000', type: 'number' },
      ], '提交后人员进入当前会议参会名单。'),
      list('参会人列表', [
        { title: '张三', subtitle: '138****8000', action: '删除' },
        { title: '李四', subtitle: '139****2666', action: '删除' },
      ]),
    ],
    checkpoints: ['不支持批量导入', '删除需二次确认', '酒店字段一旦有关联人员不可修改'],
    flow: ['输入姓名与手机号', '添加到名单', '按需删除个别人'],
  }),
  page({
    slug: 'material-management',
    title: '资料管理',
    summary: '按议程 / 会议文件 / 座位图分类上传资料',
    screenTitle: '资料管理',
    group: '会务业务',
    layout: 'mobile',
    sections: [
      hero('资料管理', '上传会议资料并支持覆盖更新版本'),
      cards('资料分类', [
        { title: '议程', subtitle: '会议节奏与发言安排', action: '上传文件' },
        { title: '会议文件', subtitle: 'PPT / PDF / Word / Excel', action: '上传文件' },
        { title: '座位图', subtitle: '图片或 PDF 格式', action: '上传文件' },
      ]),
      list('已上传资料', [
        { title: '会议议程.pdf', subtitle: '上传于 2026-05-28 10:20', action: '预览 / 删除' },
        { title: '嘉宾座位图.png', subtitle: '上传于 2026-05-29 09:45', action: '预览 / 删除' },
      ]),
    ],
    checkpoints: ['单文件限制 200MB', '仅待开始会议支持删除', '资料按上传时间倒序'],
    flow: ['选择会议', '上传对应分类资料', '预览或覆盖上传'],
  }),
  page({
    slug: 'message-send',
    title: '消息发送',
    summary: '支持普通消息与回执消息两类发送',
    screenTitle: '消息发送',
    group: '会务业务',
    layout: 'mobile',
    sections: [
      hero('消息发送', '普通消息负责通知，回执消息负责收集需求'),
      form('发送配置', [
        { label: '目标会议', value: '2026格兰云天合作伙伴会议', type: 'select' },
        { label: '消息类型', value: '回执消息', type: 'segmented' },
        { label: '回执模板', value: '标准会议回执', type: 'select' },
        { label: '截止时间', value: '2026-05-30 18:00', type: 'datetime' },
      ], '普通消息支持文本编辑和草稿保存，回执消息需绑定模板和截止时间。'),
      notice('回执截止时间必须晚于当前时间且早于会议开始时间。', 'warning'),
    ],
    checkpoints: ['普通消息上限 500 字', '支持草稿保存', '发送后需要展示接收人数'],
    flow: ['选择会议', '编辑消息内容', '发送并记录到消息历史'],
  }),
  page({
    slug: 'receipt-stats',
    title: '回执统计',
    summary: '汇总接送、住宿、餐饮需求并查看明细',
    screenTitle: '回执统计',
    group: '会务业务',
    layout: 'mobile',
    sections: [
      hero('回执统计', '围绕住宿、接送、餐饮和到离时间做聚合'),
      stats([
        { title: '需接送', meta: '16 人', tone: 'gold' },
        { title: '需住宿', meta: '24 人', tone: 'navy' },
        { title: '需餐饮', meta: '31 人', tone: 'success' },
      ]),
      list('人员明细', [
        { title: '张三', subtitle: '到达 05-31 20:30 · 需要接送', badge: '已填写' },
        { title: '李四', subtitle: '离开 06-02 14:00 · 需要住宿', badge: '已填写' },
      ]),
    ],
    checkpoints: ['支持按已填写 / 未填写筛选', '明细区分不同需求类型', '统计数据可同步给后台'],
    flow: ['选择会议', '查看汇总数据', '切换明细分类'],
  }),
  page({
    slug: 'data-view',
    title: '数据查看',
    summary: '查看签到率、核销量和消息阅读情况',
    screenTitle: '数据查看',
    group: '会务业务',
    layout: 'mobile',
    sections: [
      hero('数据查看', '汇总签到、核销和消息触达效果', '实时同步'),
      stats([
        { title: '签到率', meta: '95%' },
        { title: '总核销量', meta: '120 次' },
        { title: '回执完成率', meta: '90%' },
      ]),
      list('重点明细', [
        { title: '未签到人员', subtitle: '共 3 人，支持快速提醒', action: '查看名单' },
        { title: '核销明细', subtitle: '按早餐 / 午餐 / 晚餐分类查看', action: '查看详情' },
      ]),
    ],
    checkpoints: ['数据需区分汇总和明细', '未签到名单支持快速触达', '核销数据要按餐券类型展示'],
    flow: ['进入数据查看', '查看汇总指标', '进入细分列表'],
  }),
]

const adminPages: PrototypePage[] = [
  page({
    slug: 'dashboard',
    title: '工作台首页',
    summary: '经营总览、趋势图与待办提醒',
    screenTitle: '工作台',
    group: '工作台',
    layout: 'admin',
    sections: [
      hero('工作台首页', '展示有效会议、今日签到、核销与待办提醒', 'PC'),
      stats([
        { title: '有效会议', meta: '8 场' },
        { title: '今日签到', meta: '356 人' },
        { title: '今日核销', meta: '120 次' },
        { title: '未填回执', meta: '18 人', tone: 'warning' },
      ]),
      chart('近 7 日趋势', [
        { title: '签到人数', meta: '356', hint: 'Mon', tone: 'gold' },
        { title: '核销次数', meta: '120', hint: 'Tue', tone: 'navy' },
        { title: '消息发送', meta: '24', hint: 'Wed', tone: 'success' },
      ]),
      list('待办提醒', [
        { title: '未来 24 小时内将开始的会议', subtitle: '2026格兰云天合作伙伴会议 · 09:00 开始', action: '查看会议' },
        { title: '未来 24 小时内将截止的回执', subtitle: '标准会议回执 · 截止 05-30 18:00', action: '查看回执' },
      ]),
    ],
    checkpoints: ['工作台首屏应突出经营指标', '趋势区支持多维切换', '待办提醒要能直接跳转'],
    flow: ['登录后台', '查看总览', '通过快捷入口进入业务模块'],
  }),
  page({
    slug: 'admin-users',
    title: '管理员管理',
    summary: '超级管理员维护管理员账号',
    screenTitle: '管理员管理',
    group: '权限管理',
    layout: 'admin',
    sections: [
      hero('管理员管理', '新增、编辑、删除和重置密码仅超级管理员可操作'),
      table('管理员列表', ['账号', '姓名', '手机号', '角色', '状态'], [
        ['super_admin', '王总', '138****0001', '超级管理员', '启用'],
        ['ops_admin', '李主管', '138****0002', '超级管理员', '启用'],
      ]),
      notice('新增管理员需录入账号、密码、姓名、手机号和角色。'),
    ],
    checkpoints: ['只有超级管理员可见', '重置密码应有短信验证说明', '支持关键字查询'],
    flow: ['进入权限管理', '查看管理员列表', '新增或编辑账号'],
  }),
  page({
    slug: 'roles',
    title: '角色管理',
    summary: '预设角色与自定义权限勾选',
    screenTitle: '角色管理',
    group: '权限管理',
    layout: 'admin',
    sections: [
      hero('角色管理', '支持预设角色与自定义角色维护'),
      table('角色列表', ['角色名称', '权限范围', '关联人数', '状态'], [
        ['超级管理员', '全量权限', '2', '启用'],
        ['会务销售', '会议 / 资料 / 消息 / 数据', '14', '启用'],
        ['核销人员', '扫码核销 / 记录查看', '26', '启用'],
      ]),
      cards('权限颗粒度', [
        { title: '会议管理权限', subtitle: '创建、编辑、删除会议', badge: '模块权限' },
        { title: '仅查看数据权限', subtitle: '查看统计但不可导出', badge: '只读权限' },
      ]),
    ],
    checkpoints: ['已关联用户的角色不可删除', '权限项支持多选勾选', '列表中可见使用人数'],
    flow: ['查看角色列表', '进入新增 / 编辑', '勾选权限后保存'],
  }),
  page({
    slug: 'employees',
    title: '员工管理',
    summary: '维护核销人员和会务销售账号',
    screenTitle: '员工管理',
    group: '权限管理',
    layout: 'admin',
    sections: [
      hero('员工管理', '员工账号供核销端和会务端登录使用'),
      table('员工列表', ['姓名', '手机号', '所属酒店', '关联角色', '状态'], [
        ['王小华', '138****5678', hotels[0], '核销人员', '启用'],
        ['陈晓敏', '139****7788', hotels[1], '会务销售', '禁用'],
      ]),
      notice('支持启用 / 禁用账号，禁用后对应小程序端不可登录。', 'warning'),
    ],
    checkpoints: ['新增员工需指定酒店和角色', '状态切换有二次确认', '支持搜索和筛选'],
    flow: ['查看员工列表', '新增或编辑员工', '启用 / 禁用账号'],
  }),
  page({
    slug: 'hotels',
    title: '酒店管理',
    summary: '配置酒店名称、地址、电话和图片',
    screenTitle: '酒店管理',
    group: '基础配置',
    layout: 'admin',
    sections: [
      hero('酒店管理', '为会议创建和参会端展示提供酒店基础数据'),
      table('酒店列表', ['酒店名称', '地址', '联系电话', '关联会议数', '状态'], [
        [hotels[0], '深圳市福田区示例路 88 号', '0755-88886666', '12', '启用'],
        [hotels[1], '北京市朝阳区示例路 18 号', '010-66558899', '8', '启用'],
      ]),
      notice('已关联会议的酒店不可删除。', 'danger'),
    ],
    checkpoints: ['支持酒店图片上传', '关联会议数可见', '删除受会议关联约束'],
    flow: ['进入酒店管理', '新增或编辑酒店', '同步给会议与周边信息模块'],
  }),
  page({
    slug: 'meeting-rooms',
    title: '会议室管理',
    summary: '按酒店维护会议室容量、设施和图片',
    screenTitle: '会议室管理',
    group: '基础配置',
    layout: 'admin',
    sections: [
      hero('会议室管理', '会议室数据为会务端创建会议提供可选项'),
      table('会议室列表', ['会议室', '所属酒店', '容量', '设施', '状态'], [
        ['国际宴会厅', hotels[0], '300', '投影 / 音响 / 麦克风', '启用'],
        ['云天厅', hotels[1], '120', '投影 / 白板', '启用'],
      ]),
      notice('已关联会议的会议室不可删除，需要先更换关联会议的会议室。'),
    ],
    checkpoints: ['酒店筛选必备', '设施支持多选', '图片上传数量限制需提示'],
    flow: ['查看会议室列表', '新增会议室', '维护设施和容量'],
  }),
  page({
    slug: 'room-usage',
    title: '会议室使用情况',
    summary: '日历化查看会议室可用与占用状态',
    screenTitle: '会议室使用情况',
    group: '基础配置',
    layout: 'admin',
    sections: [
      hero('会议室使用情况', '按酒店和日期范围查看会议室排期'),
      calendar('可用性日历', [
        { title: '06-01', subtitle: '国际宴会厅', meta: '不可用 · 09:00-12:00', tone: 'danger' },
        { title: '06-02', subtitle: '国际宴会厅', meta: '可用', tone: 'success' },
        { title: '06-03', subtitle: '云天厅', meta: '不可用 · 14:00-17:00', tone: 'danger' },
      ]),
      notice('点击不可用日期需要弹窗展示会议名称、时间、会务人员姓名和电话。'),
    ],
    checkpoints: ['支持酒店 + 日期筛选', '占用和可用色彩对比明显', '点击占用项有详情弹窗'],
    flow: ['选择酒店', '查看日历占用情况', '点击不可用日期看详情'],
  }),
  page({
    slug: 'receipt-templates',
    title: '回执模板管理',
    summary: '维护标准化回执表单',
    screenTitle: '回执模板管理',
    group: '基础配置',
    layout: 'admin',
    sections: [
      hero('回执模板管理', '模板供会务端发送回执消息时选择'),
      table('模板列表', ['模板名称', '描述', '使用次数', '状态'], [
        ['标准会议回执', '固定收集到离店、接送、住宿、餐饮', '24', '启用'],
        ['VIP 嘉宾回执', '增加特殊需求与同行人数', '6', '启用'],
      ]),
      cards('可选收集项', [
        { title: '同行人数', subtitle: '自定义数字项', badge: '可选项' },
        { title: '特殊需求', subtitle: '文本说明项', badge: '可选项' },
      ]),
    ],
    checkpoints: ['固定项默认存在', '已使用模板不可删除', '模板状态支持启用 / 禁用'],
    flow: ['维护模板列表', '新增或编辑模板', '供会务端消息发送调用'],
  }),
  page({
    slug: 'surroundings',
    title: '周边信息管理',
    summary: '配置美食、游玩和交通推荐',
    screenTitle: '周边信息管理',
    group: '基础配置',
    layout: 'admin',
    sections: [
      hero('周边信息管理', '配置后同步到参会端“周边信息”模块'),
      table('周边列表', ['名称', '分类', '所属酒店', '距离', '状态'], [
        ['云庭粤菜', '美食', hotels[0], '500m', '启用'],
        ['莲花山公园', '游玩', hotels[0], '2.1km', '启用'],
        ['福田高铁站', '交通', hotels[0], '3.2km', '启用'],
      ]),
    ],
    checkpoints: ['支持按酒店和分类过滤', '图片最多 3 张', '同步关系需要在说明中明确'],
    flow: ['录入周边信息', '上传图片', '同步到参会端展示'],
  }),
  page({
    slug: 'meetings',
    title: '会议管理',
    summary: '后台版会议管理与会务端保持一致并支持导出',
    screenTitle: '会议管理',
    group: '会议管理',
    layout: 'admin',
    sections: [
      hero('会议管理', '支持多条件筛选和批量导出会议列表'),
      table('会议列表', ['会议名称', '酒店', '会议室', '时间', '状态', '创建人'], [
        ['2026格兰云天合作伙伴会议', hotels[0], '国际宴会厅', '06-01 09:00-12:00', '待开始', '陈晓敏'],
        ['大客户签约会', hotels[1], '云天厅', '05-20 14:00-17:00', '已开始', '赵丽'],
      ]),
      notice('后台额外支持批量导出会议列表和批量导入参会人员。', 'success'),
    ],
    checkpoints: ['多条件筛选完整', '导出按钮明显', '会议详情页可进入参会人和资料管理'],
    flow: ['筛选会议', '查看或编辑会议', '导出会议数据'],
  }),
  page({
    slug: 'attendee-records',
    title: '参会人员管理',
    summary: '支持手动维护和批量导入参会人员',
    screenTitle: '参会人员管理',
    group: '会议管理',
    layout: 'admin',
    sections: [
      hero('参会人员管理', '比会务端多出批量导入和导出能力'),
      table('人员列表', ['姓名', '手机号', '会议名称', '签到状态', '餐券状态'], [
        ['张三', '138****8000', '2026格兰云天合作伙伴会议', '已签到', '午餐券未核销'],
        ['李四', '139****2666', '2026格兰云天合作伙伴会议', '未签到', '无餐券'],
      ]),
      cards('批量操作', [
        { title: '下载 Excel 模板', subtitle: '字段：姓名、手机号', action: '下载模板' },
        { title: '导入参会人员', subtitle: '上传模板并校验结果', action: '上传文件' },
      ]),
    ],
    checkpoints: ['支持批量导入 / 导出', '手机号脱敏显示', '错误导入结果需可回看'],
    flow: ['下载模板', '上传导入', '查看参会人员列表'],
  }),
  page({
    slug: 'data-view',
    title: '数据查看',
    summary: '签到、核销、回执三类明细与导出',
    screenTitle: '数据查看',
    group: '数据中心',
    layout: 'admin',
    sections: [
      hero('数据查看', '支持会议、日期范围与关键字筛选后导出'),
      table('核销数据', ['核销人', '核销时间', '设备', '参会人', '会议名称', '餐券类型', '状态'], [
        ['王小华', '2026-06-01 11:42', 'SCAN-01', '张三', '2026格兰云天合作伙伴会议', '午餐券', '成功'],
        ['王小华', '2026-06-01 06:20', 'SCAN-01', '李四', '2026格兰云天合作伙伴会议', '早餐券', '失败'],
      ]),
      notice('当前页导出按钮需要导出正在筛选的数据集。', 'success'),
    ],
    checkpoints: ['顶部筛选栏固定', '标签页切换签到 / 核销 / 回执', '导出说明清晰'],
    flow: ['选择数据类型', '设置筛选条件', '导出或查看明细'],
  }),
  page({
    slug: 'visualization',
    title: '数据可视化',
    summary: '展示签到、核销和回执的趋势与分布图',
    screenTitle: '数据可视化',
    group: '数据中心',
    layout: 'admin',
    sections: [
      hero('数据可视化', '图形化查看会议运营表现与业务分布'),
      chart('图表面板', [
        { title: '签到率', meta: '95%', hint: '饼图', tone: 'gold' },
        { title: '核销量', meta: '120 次', hint: '柱状图', tone: 'navy' },
        { title: '回执完成率', meta: '90%', hint: '折线图', tone: 'success' },
      ]),
      cards('分析视角', [
        { title: '酒店维度', subtitle: '对比不同酒店的签到和核销表现', action: '切换视角' },
        { title: '会议维度', subtitle: '查看单场会议的运营闭环', action: '切换视角' },
      ]),
    ],
    checkpoints: ['图表配色遵循品牌规范', '支持按酒店 / 会议切换', '鼠标悬停展示指标说明'],
    flow: ['进入数据可视化', '切换分析视角', '查看图表趋势'],
  }),
]

const attendeeGroups: PrototypeGroup[] = [
  { title: '登录流程', pages: buildLoginPages('格兰云天会议', '便捷参会，高效管理', false) },
  { title: '参会业务', pages: attendeePages },
]

const verifierGroups: PrototypeGroup[] = [
  { title: '登录流程', pages: buildLoginPages('格兰云天核销系统', '专业会议管理工具', true) },
  { title: '核销业务', pages: verifierPages },
]

const salesGroups: PrototypeGroup[] = [
  { title: '登录流程', pages: buildLoginPages('格兰云天会务系统', '专业会议管理工具', true) },
  { title: '会务业务', pages: salesPages },
]

const adminGroups: PrototypeGroup[] = [
  { title: '工作台', pages: [adminPages[0]] },
  { title: '权限管理', pages: adminPages.slice(1, 4) },
  { title: '基础配置', pages: adminPages.slice(4, 9) },
  { title: '会议管理', pages: adminPages.slice(9, 11) },
  { title: '数据中心', pages: adminPages.slice(11, 13) },
]

export const prototypeSystems: Record<string, PrototypeSystem> = {
  attendee: {
    id: 'attendee',
    name: '参会人员端小程序',
    shortName: '参会端',
    platform: '微信小程序原型',
    viewport: '375 x 812',
    businessPageCount: 10,
    description: '围绕会议查看、签到、资料浏览、餐券展示、回执填写和个人服务构建参会体验。',
    highlights: ['会议详情集中页', '消息与回执双通道', '个人中心联动品牌服务'],
    groups: attendeeGroups,
  },
  verifier: {
    id: 'verifier',
    name: '核销人员小程序',
    shortName: '核销端',
    platform: '微信小程序原型',
    viewport: '375 x 812',
    businessPageCount: 5,
    description: '突出扫码核销主链路，同时保留核销记录、异常处理和所属酒店切换能力。',
    highlights: ['扫码核销全屏体验', '核销记录筛选', '酒店归属选择'],
    groups: verifierGroups,
  },
  sales: {
    id: 'sales',
    name: '会务销售人员小程序',
    shortName: '会务端',
    platform: '微信小程序原型',
    viewport: '390 x 844',
    businessPageCount: 8,
    description: '覆盖会议创建、资料上传、消息通知、参会人管理和回执统计等会务核心流程。',
    highlights: ['会务首页功能网格', '创建会议与资料管理', '回执统计与数据查看'],
    groups: salesGroups,
  },
  admin: {
    id: 'admin',
    name: 'Web 管理后台',
    shortName: '管理后台',
    platform: 'PC Web 原型',
    viewport: '1440 x 960',
    businessPageCount: 12,
    description: '面向管理员的权限、基础配置、会议与数据中心，支撑全生命周期后台管理。',
    highlights: ['工作台经营总览', '权限与基础配置', '数据中心明细与可视化'],
    groups: adminGroups,
  },
}

export const systemOrder: Array<PrototypeSystem['id']> = ['attendee', 'verifier', 'sales', 'admin']

export function getSystemById(systemId: string) {
  return prototypeSystems[systemId]
}
