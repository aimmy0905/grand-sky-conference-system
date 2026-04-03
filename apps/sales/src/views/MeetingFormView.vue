<template>
  <div class="app-page">
    <AppHeader :title="isEdit ? '编辑会议' : '新建会议'" back />

    <main class="app-page__body">
      <section class="stepper card">
        <button
          v-for="step in steps"
          :key="step.value"
          type="button"
          class="step-item"
          :class="{ active: currentStep === step.value, done: step.value < currentStep }"
          @click="goStep(step.value)"
        >
          <span>{{ step.value }}</span>
          <small>{{ step.label }}</small>
        </button>
      </section>

      <section v-if="currentStep === 1" class="card">
        <label class="field">
          <span>会议名称</span>
          <input v-model="form.name" type="text" placeholder="请输入会议名称" />
        </label>
        <label class="field">
          <span>开始时间</span>
          <input v-model="form.startTime" type="text" placeholder="2026-06-01 09:00" />
        </label>
        <label class="field">
          <span>结束时间</span>
          <input v-model="form.endTime" type="text" placeholder="2026-06-01 12:00" />
        </label>
        <label class="field">
          <span>酒店</span>
          <select v-model="form.hotel">
            <option disabled value="">请选择酒店</option>
            <option v-for="hotel in hotelOptions" :key="hotel" :value="hotel">{{ hotel }}</option>
          </select>
        </label>
        <label class="field">
          <span>会议室</span>
          <select v-model="form.room" :disabled="!form.hotel">
            <option disabled value="">请选择会议室</option>
            <option v-for="room in roomOptions" :key="room" :value="room">{{ room }}</option>
          </select>
        </label>
        <label class="field">
          <span>会议简介</span>
          <textarea v-model="form.summary" placeholder="请输入会议简介"></textarea>
        </label>
      </section>

      <section v-if="currentStep === 2" class="card">
        <div class="section-head">
          <h3>上传会议资料</h3>
          <span>{{ materialList.length }} 份</span>
        </div>
        <label class="field">
          <span>资料分类</span>
          <select v-model="materialForm.category">
            <option v-for="item in materialCategories" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
        <label class="field">
          <span>资料名称</span>
          <input v-model="materialForm.name" type="text" placeholder="请输入文件名，如 会议手册.pdf" />
        </label>
        <label class="field">
          <span>文件大小</span>
          <input v-model="materialForm.size" type="text" placeholder="如 2.1MB（演示）" />
        </label>
        <button type="button" class="secondary-btn" :disabled="!materialForm.name.trim()" @click="addMaterial">添加资料</button>

        <article v-for="item in materialList" :key="item.id" class="row-item">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.category }} · {{ item.size }}</p>
          </div>
          <button type="button" class="danger-btn" @click="removeMaterial(item.id)">删除</button>
        </article>
      </section>

      <section v-if="currentStep === 3" class="card">
        <div class="section-head">
          <h3>录入参会人员</h3>
          <span>{{ participantList.length }} 人</span>
        </div>
        <label class="field">
          <span>姓名</span>
          <input v-model="participantForm.name" type="text" placeholder="请输入姓名" />
        </label>
        <label class="field">
          <span>手机号</span>
          <input v-model="participantForm.mobile" type="text" maxlength="11" placeholder="请输入11位手机号" />
        </label>
        <button type="button" class="secondary-btn" :disabled="!participantValid" @click="addParticipant">添加参会人员</button>

        <article v-for="item in participantList" :key="item.id" class="row-item">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.mobile }}</p>
          </div>
          <button type="button" class="danger-btn" @click="removeParticipant(item.id)">删除</button>
        </article>
      </section>

      <section v-if="currentStep === 4" class="card">
        <div class="section-head">
          <h3>发送通知消息</h3>
          <span>{{ noticeList.length }} 条</span>
        </div>

        <div class="tabs">
          <button type="button" :class="{ active: noticeForm.type === 'normal' }" @click="setNoticeType('normal')">普通消息</button>
          <button type="button" :class="{ active: noticeForm.type === 'receipt' }" @click="setNoticeType('receipt')">回执消息</button>
        </div>
        <label class="field">
          <span>通知标题</span>
          <input v-model="noticeForm.title" type="text" placeholder="请输入通知标题" />
        </label>
        <label class="field">
          <span>通知内容</span>
          <textarea v-model="noticeForm.content" placeholder="请输入通知内容"></textarea>
        </label>
        <label v-if="noticeForm.type === 'receipt'" class="field">
          <span>回执模板</span>
          <select v-model="noticeForm.template">
            <option v-for="item in receiptTemplates" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
        <div v-if="noticeForm.type === 'receipt'" class="collect-fields">
          <small>回执搜集信息：</small>
          <span v-for="item in sharedReceiptCollectFields" :key="item">{{ item }}</span>
        </div>
        <button type="button" class="secondary-btn" :disabled="!noticeForm.title.trim() || !noticeForm.content.trim()" @click="addNotice">
          添加通知
        </button>

        <article v-for="item in noticeList" :key="item.id" class="row-item">
          <div>
            <strong>{{ item.type === 'receipt' ? '回执消息' : '普通消息' }}：{{ item.title }}</strong>
            <p>{{ item.content }}</p>
          </div>
          <button type="button" class="danger-btn" @click="removeNotice(item.id)">删除</button>
        </article>
      </section>

      <div class="footer-actions">
        <button type="button" class="secondary-btn" :disabled="currentStep === 1" @click="currentStep -= 1">上一步</button>
        <button v-if="currentStep < 4" type="button" class="primary-btn" :disabled="currentStep === 1 && !basicValid" @click="currentStep += 1">下一步</button>
        <button v-else type="button" class="primary-btn" :disabled="!basicValid" @click="router.push('/meetings')">
          {{ isEdit ? '保存修改' : '创建会议' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import {
  hotelOptions,
  materials,
  meetingRoomOptions,
  meetings,
  messageDraftDefaults,
  participants,
  receiptCollectFields,
  receiptTemplates,
} from '../data/mock';

const materialCategories = ['议程', '会议文件', '座位图'];

const route = useRoute();
const router = useRouter();
const meetingId = computed(() => String(route.query.id ?? ''));
const activeMeeting = computed(() => meetings.find((item) => item.id === meetingId.value));
const isEdit = computed(() => Boolean(activeMeeting.value));
const currentStep = ref(1);
const steps = [
  { value: 1, label: '基础信息' },
  { value: 2, label: '会议资料' },
  { value: 3, label: '参会人员' },
  { value: 4, label: '通知消息' },
];

const form = reactive({
  name: activeMeeting.value?.name ?? '',
  startTime: activeMeeting.value?.startTime ?? '',
  endTime: activeMeeting.value?.endTime ?? '',
  hotel: activeMeeting.value?.hotel ?? '',
  room: activeMeeting.value?.room ?? '',
  summary: '围绕会议议程、签到和回执管理进行统一组织。',
});

const roomOptions = computed(() => meetingRoomOptions[form.hotel] ?? []);
watch(() => form.hotel, () => {
  if (!roomOptions.value.includes(form.room)) {
    form.room = roomOptions.value[0] ?? '';
  }
}, { immediate: true });

const basicValid = computed(() => Boolean(
  form.name.trim()
  && form.startTime.trim()
  && form.endTime.trim()
  && form.hotel.trim()
  && form.room.trim(),
));

const materialList = ref(
  materials.filter((item) => item.meetingId === meetingId.value).map((item) => ({ ...item })),
);
const materialForm = reactive({
  category: '会议文件',
  name: '',
  size: '',
});
const addMaterial = () => {
  if (!materialForm.name.trim()) return;
  materialList.value.unshift({
    id: `material-${Date.now()}`,
    meetingId: meetingId.value || 'draft',
    category: materialForm.category,
    name: materialForm.name.trim(),
    size: materialForm.size.trim() || '1.0MB',
    updatedAt: '刚刚',
  });
  materialForm.name = '';
  materialForm.size = '';
};
const removeMaterial = (id: string) => {
  materialList.value = materialList.value.filter((item) => item.id !== id);
};

const participantList = ref(
  participants.filter((item) => item.meetingId === meetingId.value).map((item) => ({ ...item })),
);
const participantForm = reactive({
  name: '',
  mobile: '',
});
const participantValid = computed(() => Boolean(
  participantForm.name.trim() && /^1\d{10}$/.test(participantForm.mobile.trim()),
));
const addParticipant = () => {
  if (!participantValid.value) return;
  participantList.value.unshift({
    id: `participant-${Date.now()}`,
    meetingId: meetingId.value || 'draft',
    name: participantForm.name.trim(),
    mobile: participantForm.mobile.trim(),
  });
  participantForm.name = '';
  participantForm.mobile = '';
};
const removeParticipant = (id: string) => {
  participantList.value = participantList.value.filter((item) => item.id !== id);
};

const sharedReceiptCollectFields = computed(() => receiptCollectFields);
const noticeList = ref<Array<{ id: string; type: 'normal' | 'receipt'; title: string; content: string }>>([]);
const noticeForm = reactive({
  type: 'normal' as 'normal' | 'receipt',
  title: '会议签到提醒',
  content: messageDraftDefaults.normal,
  template: receiptTemplates[0],
});
const setNoticeType = (type: 'normal' | 'receipt') => {
  noticeForm.type = type;
  if (type === 'normal') {
    noticeForm.title = '会议签到提醒';
    noticeForm.content = messageDraftDefaults.normal;
  } else {
    noticeForm.title = '请填写参会回执';
    noticeForm.content = messageDraftDefaults.receipt;
  }
};
const addNotice = () => {
  if (!noticeForm.title.trim() || !noticeForm.content.trim()) return;
  noticeList.value.unshift({
    id: `notice-${Date.now()}`,
    type: noticeForm.type,
    title: noticeForm.title.trim(),
    content: noticeForm.content.trim(),
  });
};
const removeNotice = (id: string) => {
  noticeList.value = noticeList.value.filter((item) => item.id !== id);
};

const goStep = (step: number) => {
  if (step < 1 || step > 4) return;
  if (step > 1 && !basicValid.value) return;
  currentStep.value = step;
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
}

.card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
  padding: 1rem;
}

.stepper {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
  margin-bottom: 0.9rem;
}

.step-item {
  border: none;
  border-radius: 12px;
  min-height: 58px;
  padding: 0.35rem 0.2rem;
  background: #eef2f5;
  color: var(--text-muted);
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 0.18rem;
}

.step-item span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: white;
  font-size: 0.72rem;
}

.step-item small {
  font-size: 0.72rem;
}

.step-item.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.step-item.done {
  background: #e8f8ec;
  color: #2f6b44;
}

.field {
  display: grid;
  gap: 0.42rem;
}

.field + .field {
  margin-top: 0.9rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.82rem;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  border: 1px solid var(--surface-line);
  padding: 0 0.75rem;
  outline: none;
  background: white;
}

.field textarea {
  min-height: 84px;
  resize: none;
  padding: 0.6rem 0.75rem;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.section-head h3 {
  margin: 0;
  color: var(--text-default);
}

.section-head span {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.45rem;
}

.tabs button {
  border: none;
  min-height: 34px;
  border-radius: 999px;
  background: #eef2f5;
  color: var(--text-muted);
}

.tabs button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-weight: 700;
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

.row-item {
  margin-top: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--surface-line);
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
}

.row-item strong {
  color: var(--text-default);
}

.row-item p {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
}

.footer-actions {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.primary-btn,
.secondary-btn,
.danger-btn {
  border: none;
  border-radius: 10px;
  min-height: 42px;
}

.primary-btn {
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.secondary-btn {
  background: #eef2f5;
  color: var(--text-default);
}

.danger-btn {
  min-height: 30px;
  padding: 0 0.7rem;
  background: #fdeceb;
  color: #bf3e34;
  font-size: 0.76rem;
}

.primary-btn:disabled {
  background: #d8c0a0;
}
</style>
