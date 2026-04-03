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
  | 'message'
  | 'coupon'
  | 'profile'
  | 'scan'
  | 'qrcode'
  | 'wechat'
  | 'external'
  | 'arrow-right'
  | 'preview'
  | 'download'
  | 'service-hotel'
  | 'service-shop'
  | 'service-wifi'
  | 'service-brand'
  | 'service-contact';

withDefaults(defineProps<{
  name: IconName
  size?: number
}>(), {
  size: 18,
});

const iconPaths: Record<IconName, string[]> = {
  back: ['M14.5 5L9 12L14.5 19'],
  home: ['M4 10.5L12 4L20 10.5', 'M6.5 9.5V19H17.5V9.5', 'M10 19V13H14V19'],
  message: ['M4 6.5H20V17.5H4V6.5Z', 'M4.5 7L12 13L19.5 7'],
  coupon: ['M4 9V7H20V9', 'M4 15V17H20V15', 'M6.5 7V17', 'M17.5 7V17', 'M12 8.5V15.5'],
  profile: ['M12 12C14.2 12 16 10.2 16 8C16 5.8 14.2 4 12 4C9.8 4 8 5.8 8 8C8 10.2 9.8 12 12 12Z', 'M5 20C5.6 16.8 8.3 14.5 12 14.5C15.7 14.5 18.4 16.8 19 20'],
  scan: ['M7 4H4V7', 'M17 4H20V7', 'M4 17V20H7', 'M20 17V20H17', 'M8.5 12H15.5'],
  qrcode: ['M4 4H10V10H4V4Z', 'M14 4H20V10H14V4Z', 'M4 14H10V20H4V14Z', 'M14 14H17V17H14V14Z', 'M17 17H20V20H17V17Z'],
  wechat: ['M8.5 7C11 7 13 8.6 13 10.5C13 12.5 11 14 8.5 14C8 14 7.5 13.9 7.1 13.8L5 15L5.7 13.2C4.7 12.5 4 11.5 4 10.5C4 8.6 6 7 8.5 7Z', 'M15.5 9C17.9 9 20 10.5 20 12.5C20 14.6 17.9 16 15.5 16C15.1 16 14.7 16 14.3 15.9L12.5 17L13 15.5'],
  external: ['M10 6H6V18H18V14', 'M12 12L18 6', 'M14 6H18V10'],
  'arrow-right': ['M9 5L15 12L9 19'],
  preview: ['M2.5 12C4.7 8.4 8 6.5 12 6.5C16 6.5 19.3 8.4 21.5 12C19.3 15.6 16 17.5 12 17.5C8 17.5 4.7 15.6 2.5 12Z', 'M12 14.5C13.4 14.5 14.5 13.4 14.5 12C14.5 10.6 13.4 9.5 12 9.5C10.6 9.5 9.5 10.6 9.5 12C9.5 13.4 10.6 14.5 12 14.5Z'],
  download: ['M12 4V14', 'M8.5 10.5L12 14L15.5 10.5', 'M5 18.5H19'],
  'service-hotel': ['M5 20V6.5H19V20', 'M8 9H10', 'M14 9H16', 'M8 12.5H10', 'M14 12.5H16', 'M10.5 20V16H13.5V20'],
  'service-shop': ['M5 9H19L18 20H6L5 9Z', 'M8 9V7C8 5.9 8.9 5 10 5H14C15.1 5 16 5.9 16 7V9'],
  'service-wifi': ['M3.5 9.5C8.3 5.2 15.7 5.2 20.5 9.5', 'M6.5 12.5C9.4 10 14.6 10 17.5 12.5', 'M9.5 15.5C10.9 14.4 13.1 14.4 14.5 15.5', 'M12 19H12.01'],
  'service-brand': ['M5 19V6L12 3L19 6V19', 'M9 9H15', 'M9 12.5H15', 'M12 16V9'],
  'service-contact': ['M5.5 7.5C5.5 6.7 6.2 6 7 6H9.4L10.6 9.3L9.2 10.4C9.9 12 11.1 13.2 12.7 13.9L13.8 12.5L17.1 13.7V16.1C17.1 16.9 16.4 17.6 15.6 17.6H14.5C9.8 17.6 6 13.8 6 9.1V7.5H5.5Z'],
};
</script>

<style scoped lang="scss">
.app-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
