<template>
  <svg
    class="app-icon"
    :style="{ width: `${size}px`, height: `${size}px` }"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      v-for="(segment, index) in iconPaths[name]"
      :key="`${name}-${index}`"
      :d="segment"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
type IconName =
  | 'back'
  | 'home'
  | 'meeting'
  | 'message'
  | 'profile'
  | 'calendar'
  | 'material'
  | 'send'
  | 'receipt'
  | 'chart'
  | 'user'
  | 'wechat'
  | 'phone'
  | 'qrcode'
  | 'arrow-right'
  | 'hotel'
  | 'department'
  | 'logout'
  | 'delete'
  | 'plus'
  | 'search'
  | 'filter';

withDefaults(defineProps<{
  name: IconName
  size?: number
}>(), {
  size: 18,
});

const iconPaths: Record<IconName, string[]> = {
  back: ['M14.5 5L9 12L14.5 19'],
  home: ['M4 10.5L12 4L20 10.5', 'M6.5 9.5V19H17.5V9.5', 'M10 19V13H14V19'],
  meeting: ['M7 4V7', 'M17 4V7', 'M4 9H20', 'M5 6.5H19V20H5V6.5Z', 'M9 13H11', 'M13 13H15', 'M9 16.5H15'],
  message: ['M4 6.5H20V17.5H4V6.5Z', 'M4.5 7L12 13L19.5 7'],
  profile: ['M12 12C14.2 12 16 10.2 16 8C16 5.8 14.2 4 12 4C9.8 4 8 5.8 8 8C8 10.2 9.8 12 12 12Z', 'M5 20C5.6 16.8 8.3 14.5 12 14.5C15.7 14.5 18.4 16.8 19 20'],
  calendar: ['M7 4V7', 'M17 4V7', 'M4 9H20', 'M5 6.5H19V20H5V6.5Z'],
  material: ['M6 4H14L18 8V20H6V4Z', 'M14 4V8H18', 'M9 12H15', 'M9 15.5H15'],
  send: ['M21 3L10 14', 'M21 3L14 21L10 14L3 10L21 3'],
  receipt: ['M6 4H18V20H6V4Z', 'M9 8.5H15', 'M9 12H15', 'M9 15.5H13', 'M15.5 15.3L17.1 16.8L19.5 13.8'],
  chart: ['M5 19.5H19', 'M8 17V11', 'M12 17V8', 'M16 17V13'],
  user: ['M12 12C14.2 12 16 10.2 16 8C16 5.8 14.2 4 12 4C9.8 4 8 5.8 8 8C8 10.2 9.8 12 12 12Z', 'M5 20C5.6 16.8 8.3 14.5 12 14.5C15.7 14.5 18.4 16.8 19 20'],
  wechat: ['M8.5 7C11 7 13 8.6 13 10.5C13 12.5 11 14 8.5 14C8 14 7.5 13.9 7.1 13.8L5 15L5.7 13.2C4.7 12.5 4 11.5 4 10.5C4 8.6 6 7 8.5 7Z', 'M15.5 9C17.9 9 20 10.5 20 12.5C20 14.6 17.9 16 15.5 16C15.1 16 14.7 16 14.3 15.9L12.5 17L13 15.5'],
  phone: ['M5.5 7.5C5.5 6.7 6.2 6 7 6H9.4L10.6 9.3L9.2 10.4C9.9 12 11.1 13.2 12.7 13.9L13.8 12.5L17.1 13.7V16.1C17.1 16.9 16.4 17.6 15.6 17.6H14.5C9.8 17.6 6 13.8 6 9.1V7.5H5.5Z'],
  qrcode: ['M4 4H10V10H4V4Z', 'M14 4H20V10H14V4Z', 'M4 14H10V20H4V14Z', 'M14 14H17V17H14V14Z', 'M17 17H20V20H17V17Z'],
  'arrow-right': ['M9 5L15 12L9 19'],
  hotel: ['M5 20V6.5H19V20', 'M8 9H10', 'M14 9H16', 'M8 12.5H10', 'M14 12.5H16', 'M10.5 20V16H13.5V20'],
  department: ['M4 8H20', 'M6.5 8V18', 'M17.5 8V18', 'M9 11.5H15', 'M9 15H15', 'M4 18H20', 'M8 5.5H16'],
  logout: ['M10 5H5V19H10', 'M14 8L19 12L14 16', 'M19 12H8'],
  delete: ['M5 7H19', 'M9 7V5H15V7', 'M8 7L8.8 19H15.2L16 7', 'M11 10V16', 'M13 10V16'],
  plus: ['M12 5V19', 'M5 12H19'],
  search: ['M11 5.5C14 5.5 16.5 8 16.5 11C16.5 14 14 16.5 11 16.5C8 16.5 5.5 14 5.5 11C5.5 8 8 5.5 11 5.5Z', 'M15.5 15.5L19 19'],
  filter: ['M4 6H20', 'M7 12H17', 'M10 18H14'],
};
</script>

<style scoped lang="scss">
.app-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
