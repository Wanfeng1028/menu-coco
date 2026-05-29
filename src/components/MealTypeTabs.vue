<template>
  <div class="meal-type-tabs">
    <div class="tabs-scroll">
      <button
        v-for="tab in mealTabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: modelValue === tab.key }"
        @click="handleTabClick(tab.key)"
      >
        <span class="tab-emoji">{{ tab.emoji }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MealType } from '@/types/order'

const props = defineProps<{
  modelValue: MealType | 'all'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: MealType | 'all']
}>()

function handleTabClick(key: MealType | 'all') {
  if (key !== 'all' && props.modelValue === key) {
    emit('update:modelValue', 'all')
  } else {
    emit('update:modelValue', key)
  }
}

const mealTabs = [
  { key: 'all' as const, label: '都想看看', emoji: '👀' },
  { key: 'breakfast' as const, label: '早安投喂', emoji: '🌅' },
  { key: 'lunch' as const, label: '中午吃饱', emoji: '☀️' },
  { key: 'dinner' as const, label: '晚上好好吃', emoji: '🌙' },
  { key: 'lateNight' as const, label: '偷偷加餐', emoji: '🌃' }
]
</script>

<style lang="scss" scoped>
.meal-type-tabs {
  margin-bottom: $spacing-lg;
}

.tabs-scroll {
  display: flex;
  gap: $spacing-sm;
  overflow-x: auto;
  padding: $spacing-xs 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: 500;
  background: $white;
  color: $text-secondary;
  border: 1.5px solid $gray-200;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background: linear-gradient(135deg, #ffd4e8, #ffe8f0);
    color: $pink-500;
    border-color: $pink-300;
    box-shadow: 0 2px 12px rgba(255, 94, 158, 0.2);
  }
}

.tab-emoji {
  font-size: $font-base;
  line-height: 1;
}

.tab-label {
  line-height: 1;
}
</style>
