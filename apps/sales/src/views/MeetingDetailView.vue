<template>
  <div class="app-page">
    <AppHeader title="会议详情" back />

    <main class="app-page__body">
      <section class="card hero-card">
        <div class="hero-top">
          <span class="status-chip" :class="statusTone">{{ meeting?.status }}</span>
          <small>会议编号：{{ meeting?.id }}</small>
        </div>
        <h1>{{ meeting?.name }}</h1>
        <p>{{ meeting?.hotel }} · {{ meeting?.room }}</p>
        <strong>{{ meeting?.startTime }} - {{ meeting?.endTime }}</strong>
        <div class="hero-stats">
          <span>参会人数 {{ participantList.length }}</span>
          <span>会议通知 {{ noticeList.length }}</span>
          <span>会议资料 {{ materialList.length }}</span>
        </div>
      </section>

      <section class="state-tip" :class="stateTipTone">
        <strong>{{ stateTipTitle }}</strong>
        <p>{{ stateTipDescription }}</p>
      </section>

      <section v-if="canPublishOrUpload || canManageParticipants" class="card operation-card">
        <button
          v-if="canPublishOrUpload"
          type="button"
          title="上传会议资料"
          @click="openMaterialPanelFn"
        >
          <span class="action-icon"><AppIcon name="material" :size="15" /></span>
          <span>资料上传</span>
        </button>
        <button
          v-if="canPublishOrUpload"
          type="button"
          title="发布会议通知"
          @click="openNoticePanelFn"
        >
          <span class="action-icon"><AppIcon name="send" :size="15" /></span>
          <span>发布通知</span>
        </button>
        <button
          v-if="canManageParticipants"
          type="button"
          title="录入参会人员"
          @click="openParticipantPanelFn"
        >
          <span class="action-icon"><AppIcon name="user" :size="15" /></span>
          <span>录入人员</span>
        </button>
      </section>
      <p v-if="canPublishOrUpload || canManageParticipants" class="operation-note">{{ operationNote }}</p>

      <section class="card">
        <div class="section-head">
          <h3>会议资料</h3>
          <span>{{ materialList.length }} 份</span>
        </div>
        <div class="category-tabs">
          <button
            v-for="category in materialCategories"
            :key="category"
            type="button"
            :class="{ active: activeMaterialCategory === category }"
            @click="activeMaterialCategory = category"
          >
            {{ category }}
          </button>
        </div>
        <article v-for="item in filteredMaterials" :key="item.id" class="row-item">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.category }} · {{ item.size }} · {{ item.updatedAt }}</p>
          </div>
          <div class="row-actions">
            <button type="button" class="link-btn">预览</button>
            <button v-if="canFullyEdit" type="button" class="delete-btn" @click="askDelete('material', item.id)">删除</button>
          </div>
        </article>
        <p v-if="!filteredMaterials.length" class="empty-text">当前分类暂无资料</p>
      </section>

      <section class="card">
        <div class="section-head">
          <h3>会议通知</h3>
          <span>{{ noticeList.length }} 条</span>
        </div>
        <article v-for="item in noticeList" :key="item.id" class="row-item notice-row">
          <div>
            <strong>{{ item.type === 'receipt' ? '回执通知' : '普通通知' }}：{{ item.title }}</strong>
            <p>{{ item.time }} · {{ item.content }}</p>
            <p v-if="item.type === 'receipt'" class="receipt-meta">搜集项：{{ item.collectFields.join('、') }}</p>
          </div>
          <div class="row-actions">
            <button v-if="canFullyEdit" type="button" class="delete-btn" @click="askDelete('notice', item.id)">删除</button>
          </div>
        </article>
        <p v-if="!noticeList.length" class="empty-text">当前暂无会议通知</p>
      </section>

      <section class="card">
        <div class="section-head">
          <h3>签到名单</h3>
          <span>已签到 {{ signedParticipants.length }} 人 / 未签到 {{ unsignedParticipants.length }} 人</span>
        </div>

        <div class="sign-tabs">
          <button type="button" :class="{ active: activeSignTab === 'signed' }" @click="activeSignTab = 'signed'">
            已签到
          </button>
          <button type="button" :class="{ active: activeSignTab === 'unsigned' }" @click="activeSignTab = 'unsigned'">
            未签到
          </button>
        </div>

        <article v-for="item in activeSignList" :key="`sign-${item.id}`" class="row-item">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.mobile }}</p>
            <p>{{ item.signStatus }}<template v-if="item.signTime"> · {{ item.signTime }}</template></p>
          </div>
        </article>
        <p v-if="!activeSignList.length" class="empty-text">
          当前暂无{{ activeSignTab === 'signed' ? '已签到' : '未签到' }}人员
        </p>
      </section>

      <section class="card">
        <div class="section-head">
          <h3>回执统计</h3>
          <span>已填写 {{ receiptStats.submitted }} 人</span>
        </div>
        <article class="pending-alert" :class="{ active: receiptStats.pending > 0 }">
          <strong>未填写回执人数预警</strong>
          <p>当前仍有 {{ receiptStats.pending }} 人未填写回执，请及时提醒。</p>
        </article>
        <div class="receipt-stats">
          <article>
            <small>需住宿人数</small>
            <strong>{{ receiptStats.requiredStay }}</strong>
          </article>
          <article>
            <small>需就餐人数</small>
            <strong>{{ receiptStats.requiredMeal }}</strong>
          </article>
        </div>
        <div class="distribution-box">
          <h4>到达日期分布</h4>
          <div class="pie-layout">
            <div class="pie-chart pie-chart--arrival" :style="arrivalPieStyle">
              <span>{{ arrivalTotal }}人</span>
            </div>
            <div class="pie-legend">
              <div v-for="item in arrivalLegend" :key="item.date" class="pie-legend__item">
                <i :style="{ background: item.color }"></i>
                <span>{{ item.date }}</span>
                <strong>{{ item.count }} 人</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="distribution-box">
          <h4>离开日期分布</h4>
          <div class="pie-layout">
            <div class="pie-chart pie-chart--departure" :style="departurePieStyle">
              <span>{{ departureTotal }}人</span>
            </div>
            <div class="pie-legend">
              <div v-for="item in departureLegend" :key="item.date" class="pie-legend__item">
                <i :style="{ background: item.color }"></i>
                <span>{{ item.date }}</span>
                <strong>{{ item.count }} 人</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="section-head">
          <h3>参会人员</h3>
          <span>{{ participantList.length }} 人</span>
        </div>
        <article v-for="item in participantList" :key="item.id" class="row-item">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.mobile }}</p>
          </div>
          <div class="row-actions">
            <button v-if="canManageParticipants" type="button" class="delete-btn" @click="askDelete('participant', item.id)">删除</button>
          </div>
        </article>
      </section>
    </main>

    <Transition name="fade-up">
      <div v-if="openMaterialPanel" class="sheet-mask" @click.self="openMaterialPanel = false">
        <section class="sheet-panel">
          <h3>上传会议资料</h3>
          <label>
            <span>资料分类</span>
            <select v-model="materialForm.category">
              <option v-for="category in materialCategories.filter((item) => item !== '全部')" :key="category" :value="category">{{ category }}</option>
            </select>
          </label>
          <label>
            <span>资料名称</span>
            <input v-model="materialForm.name" type="text" placeholder="请输入文件名，如 会议手册.pdf" />
          </label>
          <label>
            <span>文件大小</span>
            <input v-model="materialForm.size" type="text" placeholder="如 2.1MB（演示）" />
          </label>
          <button type="button" class="sheet-btn" :disabled="!canPublishOrUpload || !materialForm.name.trim()" @click="submitMaterial">确认上传</button>
        </section>
      </div>
    </Transition>

    <Transition name="fade-up">
      <div v-if="openNoticePanel" class="sheet-mask" @click.self="openNoticePanel = false">
        <section class="sheet-panel">
          <h3>发布会议通知</h3>
          <div class="type-tabs">
            <button type="button" :class="{ active: noticeForm.type === 'normal' }" @click="setNoticeType('normal')">普通消息</button>
            <button type="button" :class="{ active: noticeForm.type === 'receipt' }" @click="setNoticeType('receipt')">回执消息</button>
          </div>
          <label>
            <span>通知标题</span>
            <input v-model="noticeForm.title" type="text" placeholder="请输入通知标题" />
          </label>
          <label>
            <span>通知内容</span>
            <textarea v-model="noticeForm.content" placeholder="请输入通知内容"></textarea>
          </label>
          <label v-if="noticeForm.type === 'receipt'">
            <span>回执模板</span>
            <select v-model="noticeForm.template">
              <option v-for="item in receiptTemplates" :key="item" :value="item">{{ item }}</option>
            </select>
          </label>
          <div v-if="noticeForm.type === 'receipt'" class="collect-fields">
            <small>回执搜集信息：</small>
            <span v-for="item in sharedReceiptCollectFields" :key="item">{{ item }}</span>
          </div>
          <button type="button" class="sheet-btn" :disabled="!canPublishOrUpload || !noticeForm.title.trim() || !noticeForm.content.trim()" @click="submitNotice">
            确认发布
          </button>
        </section>
      </div>
    </Transition>

    <Transition name="fade-up">
      <div v-if="openParticipantPanel" class="sheet-mask" @click.self="openParticipantPanel = false">
        <section class="sheet-panel">
          <h3>录入参会人员</h3>
          <label>
            <span>姓名</span>
            <input v-model="participantForm.name" type="text" placeholder="请输入姓名" />
          </label>
          <label>
            <span>手机号</span>
            <input v-model="participantForm.mobile" type="text" maxlength="11" placeholder="请输入11位手机号" />
          </label>
          <button type="button" class="sheet-btn" :disabled="!canManageParticipants || !participantValid" @click="submitParticipant">确认录入</button>
        </section>
      </div>
    </Transition>

    <AppDialog
      v-model:open="deleteOpen"
      title="确认删除"
      description="删除后不可恢复，确认继续吗？"
      confirm-text="确认删除"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppDialog from '../components/AppDialog.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import {
  materials,
  meetings,
  messageDraftDefaults,
  messageRecords,
  participants,
  receiptArrivalDistribution,
  receiptDepartureDistribution,
  receiptCollectFields,
  receiptStats,
  receiptTemplates,
} from '../data/mock';

type DetailNotice = {
  id: string
  type: 'normal' | 'receipt'
  title: string
  content: string
  time: string
  collectFields: string[]
}

type ParticipantItem = {
  id: string
  name: string
  mobile: string
  meetingId: string
  signStatus?: '已签到' | '未签到'
  signTime?: string
}

const route = useRoute();
const meetingId = computed(() => String(route.params.id ?? ''));
const meeting = computed(() => meetings.find((item) => item.id === meetingId.value));
const isPendingMeeting = computed(() => meeting.value?.status === '待开始');
const isRunningMeeting = computed(() => meeting.value?.status === '进行中');
const canPublishOrUpload = computed(() => isPendingMeeting.value || isRunningMeeting.value);
const canManageParticipants = computed(() => isPendingMeeting.value);
const canFullyEdit = computed(() => isPendingMeeting.value);
const stateTipTone = computed(() => {
  if (isPendingMeeting.value) return 'pending';
  if (isRunningMeeting.value) return 'running';
  return 'finished';
});
const stateTipTitle = computed(() => {
  if (isPendingMeeting.value) return '当前阶段：会前可编辑';
  if (isRunningMeeting.value) return '当前阶段：会议进行中';
  return '当前阶段：会议已结束';
});
const stateTipDescription = computed(() => {
  if (isPendingMeeting.value) return '可编辑会议信息、参会人员、会议资料与通知内容。';
  if (isRunningMeeting.value) return '仅可发布通知与上传资料，参会人员与基础信息不可编辑。';
  return '会议已结束，当前页面仅支持查看，不可再编辑会议内容。';
});
const operationNote = computed(() => {
  if (isPendingMeeting.value) return '会前：全部入口可用。';
  if (isRunningMeeting.value) return '进行中：仅“资料上传”和“发布通知”可用。';
  return '已结束：操作入口已禁用，仅可查看数据。';
});
const statusTone = computed(() => {
  if (meeting.value?.status === '待开始') return 'pending';
  if (meeting.value?.status === '进行中') return 'running';
  return 'finished';
});

const materialCategories = ['全部', '议程', '会议文件', '座位图'];
const activeMaterialCategory = ref('全部');

const materialList = ref(
  materials
    .filter((item) => item.meetingId === meetingId.value)
    .map((item) => ({ ...item })),
);

const participantList = ref<ParticipantItem[]>(
  participants
    .filter((item) => item.meetingId === meetingId.value)
    .map((item) => ({ ...item })),
);
const activeSignTab = ref<'signed' | 'unsigned'>('signed');
const signedParticipants = computed(() => participantList.value.filter((item) => item.signStatus === '已签到'));
const unsignedParticipants = computed(() => participantList.value.filter((item) => item.signStatus !== '已签到'));
const activeSignList = computed(() => (activeSignTab.value === 'signed' ? signedParticipants.value : unsignedParticipants.value));

const noticeList = ref<DetailNotice[]>([]);
noticeList.value = [
  ...messageRecords.normal
    .filter((item) => item.meetingName === meeting.value?.name)
    .map((item) => ({
      id: `detail-${item.id}`,
      type: 'normal' as const,
      title: item.title,
      content: item.content,
      time: item.sendTime,
      collectFields: [],
    })),
  ...messageRecords.receipt
    .filter((item) => item.meetingName === meeting.value?.name)
    .map((item) => ({
      id: `detail-${item.id}`,
      type: 'receipt' as const,
      title: item.title,
      content: item.content,
      time: item.sendTime,
      collectFields: item.collectFields,
    })),
];

const filteredMaterials = computed(() => (
  activeMaterialCategory.value === '全部'
    ? materialList.value
    : materialList.value.filter((item) => item.category === activeMaterialCategory.value)
));

const openMaterialPanel = ref(false);
const openNoticePanel = ref(false);
const openParticipantPanel = ref(false);
const openMaterialPanelFn = () => {
  if (!canPublishOrUpload.value) return;
  openMaterialPanel.value = true;
};
const openNoticePanelFn = () => {
  if (!canPublishOrUpload.value) return;
  openNoticePanel.value = true;
};
const openParticipantPanelFn = () => {
  if (!canManageParticipants.value) return;
  openParticipantPanel.value = true;
};

const materialForm = reactive({
  category: '会议文件',
  name: '',
  size: '',
});

const noticeForm = reactive({
  type: 'normal' as 'normal' | 'receipt',
  title: '会议签到提醒',
  content: messageDraftDefaults.normal,
  template: receiptTemplates[0],
});

const participantForm = reactive({
  name: '',
  mobile: '',
});

const participantValid = computed(() => Boolean(
  participantForm.name.trim()
  && /^1\d{10}$/.test(participantForm.mobile.trim()),
));

const sharedReceiptCollectFields = computed(() => receiptCollectFields);
const arrivalColors = ['#4f7fb2', '#6e96c1', '#8badd0', '#a9c3df'];
const departureColors = ['#5b8e4a', '#77a766', '#92bf83', '#aecfa2'];

const arrivalTotal = computed(() => receiptArrivalDistribution.reduce((sum, item) => sum + item.count, 0));
const departureTotal = computed(() => receiptDepartureDistribution.reduce((sum, item) => sum + item.count, 0));

const buildPie = (items: Array<{ count: number }>, colors: string[], total: number) => {
  if (!total) return 'conic-gradient(#e8eef5 0 100%)';
  let offset = 0;
  const segments = items.map((item, index) => {
    const percent = (item.count / total) * 100;
    const start = offset;
    const end = offset + percent;
    offset = end;
    return `${colors[index % colors.length]} ${start}% ${end}%`;
  });
  return `conic-gradient(${segments.join(',')})`;
};

const arrivalPieStyle = computed(() => ({
  background: buildPie(receiptArrivalDistribution, arrivalColors, arrivalTotal.value),
}));

const departurePieStyle = computed(() => ({
  background: buildPie(receiptDepartureDistribution, departureColors, departureTotal.value),
}));

const arrivalLegend = computed(() => receiptArrivalDistribution.map((item, index) => ({
  ...item,
  color: arrivalColors[index % arrivalColors.length],
})));

const departureLegend = computed(() => receiptDepartureDistribution.map((item, index) => ({
  ...item,
  color: departureColors[index % departureColors.length],
})));

const setNoticeType = (type: 'normal' | 'receipt') => {
  noticeForm.type = type;
  if (type === 'normal') {
    noticeForm.title = '会议签到提醒';
    noticeForm.content = messageDraftDefaults.normal;
    return;
  }
  noticeForm.title = '请填写参会回执';
  noticeForm.content = messageDraftDefaults.receipt;
};

const submitMaterial = () => {
  if (!canPublishOrUpload.value) return;
  if (!materialForm.name.trim()) return;
  materialList.value.unshift({
    id: `material-${Date.now()}`,
    category: materialForm.category,
    name: materialForm.name.trim(),
    size: materialForm.size.trim() || '1.0MB',
    updatedAt: '刚刚',
    meetingId: meetingId.value,
  });
  materialForm.name = '';
  materialForm.size = '';
  openMaterialPanel.value = false;
};

const submitNotice = () => {
  if (!canPublishOrUpload.value) return;
  if (!noticeForm.title.trim() || !noticeForm.content.trim()) return;
  noticeList.value.unshift({
    id: `notice-${Date.now()}`,
    type: noticeForm.type,
    title: noticeForm.title.trim(),
    content: noticeForm.content.trim(),
    time: '刚刚',
    collectFields: noticeForm.type === 'receipt' ? [...receiptCollectFields] : [],
  });
  openNoticePanel.value = false;
};

const submitParticipant = () => {
  if (!canManageParticipants.value) return;
  if (!participantValid.value) return;
  participantList.value.unshift({
    id: `participant-${Date.now()}`,
    name: participantForm.name.trim(),
    mobile: participantForm.mobile.trim(),
    meetingId: meetingId.value,
    signStatus: '未签到',
    signTime: '',
  });
  participantForm.name = '';
  participantForm.mobile = '';
  openParticipantPanel.value = false;
};

const deleteOpen = ref(false);
const deletePayload = ref<{ type: 'material' | 'notice' | 'participant'; id: string } | null>(null);

const askDelete = (type: 'material' | 'notice' | 'participant', id: string) => {
  if (!canFullyEdit.value) return;
  deletePayload.value = { type, id };
  deleteOpen.value = true;
};

const confirmDelete = () => {
  if (!deletePayload.value) return;
  const { type, id } = deletePayload.value;
  if (type === 'material') {
    materialList.value = materialList.value.filter((item) => item.id !== id);
  }
  if (type === 'notice') {
    noticeList.value = noticeList.value.filter((item) => item.id !== id);
  }
  if (type === 'participant') {
    participantList.value = participantList.value.filter((item) => item.id !== id);
  }
  deleteOpen.value = false;
  deletePayload.value = null;
};
</script>

<style scoped lang="scss">
.app-page {
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: white;
}

.app-page__body {
  padding: 1rem;
  min-height: calc(100vh - 64px);
  background: var(--surface-page);
  display: grid;
  gap: 0.9rem;
}

.card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
  padding: 1rem;
}

.hero-card {
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.2), white);
  border: 1px solid rgba(200, 169, 126, 0.18);
}

.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.hero-top small {
  color: var(--text-light);
  font-size: 0.76rem;
}

.status-chip {
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  padding: 0 0.62rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
}

.status-chip.pending {
  color: var(--brand-gold-dark);
  background: var(--surface-soft);
}

.status-chip.running {
  color: #2b5588;
  background: #eaf2ff;
}

.status-chip.finished {
  color: var(--text-muted);
  background: #eef2f5;
}

.hero-card h1 {
  margin: 0.52rem 0 0.45rem;
  color: var(--text-default);
  font-size: 1.55rem;
  line-height: 1.35;
}

.hero-card p,
.hero-card strong {
  display: block;
  color: var(--text-muted);
}

.hero-card strong {
  margin-top: 0.1rem;
}

.hero-stats {
  margin-top: 0.78rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.hero-stats span {
  min-height: 26px;
  display: inline-flex;
  align-items: center;
  padding: 0 0.62rem;
  border-radius: 999px;
  font-size: 0.74rem;
  color: #254467;
  background: #edf5ff;
}

.state-tip {
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
}

.state-tip strong {
  display: block;
  font-size: 0.9rem;
}

.state-tip p {
  margin: 0.28rem 0 0;
  font-size: 0.82rem;
  line-height: 1.55;
}

.state-tip.pending {
  background: #f5f0e8;
  color: #876740;
}

.state-tip.running {
  background: #eaf2ff;
  color: #2b5588;
}

.state-tip.finished {
  background: #edf1f5;
  color: #5f6c79;
}

.operation-card {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
}

.operation-card button {
  width: 100%;
  min-height: 86px;
  border: none;
  border-radius: 14px;
  background: #f5f7fa;
  color: var(--text-default);
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 0.35rem;
  font-size: 0.8rem;
}

.operation-note {
  margin: -0.35rem 0 0;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.action-icon {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: var(--brand-gold-dark);
  background: var(--surface-soft);
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-head h3 {
  margin: 0;
  color: var(--text-default);
}

.section-head span {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.sign-tabs {
  margin-top: 0.7rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
}

.sign-tabs button {
  border: none;
  min-height: 34px;
  border-radius: 999px;
  background: #eef2f5;
  color: var(--text-muted);
}

.sign-tabs button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.category-tabs {
  margin-top: 0.7rem;
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.category-tabs button {
  border: none;
  min-height: 30px;
  border-radius: 999px;
  padding: 0 0.65rem;
  background: #eef2f5;
  color: var(--text-muted);
}

.category-tabs button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}

.row-item {
  margin-top: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--surface-line);
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  align-items: flex-start;
}

.row-item strong {
  color: var(--text-default);
}

.row-item p {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  line-height: 1.6;
}

.row-actions {
  display: flex;
  gap: 0.35rem;
}

.notice-row .receipt-meta {
  color: #355c87;
}

.link-btn,
.delete-btn {
  border: none;
  min-height: 30px;
  border-radius: 8px;
  padding: 0 0.72rem;
  font-size: 0.76rem;
}

.link-btn {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}

.delete-btn {
  background: #fdeceb;
  color: #bf3e34;
}


.empty-text {
  margin: 0.75rem 0 0;
  color: var(--text-light);
  font-size: 0.82rem;
}

.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 35;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.sheet-panel {
  width: min(100%, 320px);
  border-radius: 16px;
  background: white;
  padding: 1.2rem;
}

.sheet-panel h3 {
  margin: 0;
  text-align: center;
  color: var(--text-default);
}

.sheet-panel label {
  display: grid;
  gap: 0.45rem;
  margin-top: 0.8rem;
}

.sheet-panel span {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.sheet-panel input,
.sheet-panel textarea,
.sheet-panel select {
  width: 100%;
  min-height: 42px;
  border: 1px solid var(--surface-line);
  border-radius: 10px;
  padding: 0 0.7rem;
  outline: none;
}

.sheet-panel textarea {
  min-height: 82px;
  resize: none;
  padding: 0.6rem 0.7rem;
}

.type-tabs {
  margin-top: 0.8rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.45rem;
}

.type-tabs button {
  border: none;
  min-height: 34px;
  border-radius: 999px;
  background: #eef2f5;
  color: var(--text-muted);
}

.type-tabs button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}

.collect-fields {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.collect-fields small {
  color: var(--text-muted);
}

.collect-fields span {
  padding: 0.12rem 0.52rem;
  border-radius: 999px;
  background: #eef6ff;
  color: #355c87;
  font-size: 0.75rem;
}

.receipt-stats {
  margin-top: 0.6rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.receipt-stats article {
  padding: 0.72rem;
  border-radius: 12px;
  background: #f6f9fc;
}

.receipt-stats small {
  color: var(--text-muted);
}

.receipt-stats strong {
  display: block;
  margin-top: 0.25rem;
  color: #1e4568;
  font-size: 1.2rem;
}

.pending-alert {
  margin-top: 0.68rem;
  padding: 0.72rem;
  border-radius: 12px;
  border: 1px solid #f3d2cf;
  background: #fff5f4;
}

.pending-alert strong {
  color: #a33e37;
}

.pending-alert p {
  margin: 0.32rem 0 0;
  color: #b1544c;
  font-size: 0.82rem;
}

.pending-alert.active {
  animation: pulse-alert 1.8s ease-in-out infinite;
}

.distribution-box {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--surface-line);
}

.distribution-box h4 {
  margin: 0;
  color: var(--text-default);
}

.pie-layout {
  margin-top: 0.55rem;
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.pie-chart {
  width: 114px;
  height: 114px;
  border-radius: 50%;
  position: relative;
  flex: 0 0 114px;
}

.pie-chart::after {
  content: '';
  position: absolute;
  inset: 22px;
  border-radius: 50%;
  background: white;
}

.pie-chart span {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1;
  color: #2c4d73;
  font-weight: 700;
  font-size: 0.82rem;
}

.pie-legend {
  flex: 1;
  min-width: 0;
}

.pie-legend__item {
  display: grid;
  grid-template-columns: 10px 1fr auto;
  align-items: center;
  gap: 0.5rem;
}

.pie-legend__item + .pie-legend__item {
  margin-top: 0.45rem;
}

.pie-legend__item i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.pie-legend__item span {
  color: var(--text-muted);
  font-size: 0.78rem;
}

.pie-legend__item strong {
  color: #2c4d73;
  font-size: 0.8rem;
}

.sheet-btn {
  margin-top: 0.9rem;
  width: 100%;
  min-height: 42px;
  border: none;
  border-radius: 10px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.sheet-btn:disabled {
  background: #d8c0a0;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.2s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
}

@keyframes pulse-alert {
  0%,
  100% { box-shadow: 0 0 0 0 rgba(210, 81, 72, 0.08); }
  50% { box-shadow: 0 0 0 6px rgba(210, 81, 72, 0.02); }
}
</style>
