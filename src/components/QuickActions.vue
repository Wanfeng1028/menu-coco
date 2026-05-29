<template>
  <div class="quick-actions">
    <div
      v-for="action in actions"
      :key="action.key"
      class="action-item"
      :class="{
        active: action.mealType && action.mealType === currentMealType,
        'action-flash': flashKey === action.key
      }"
      @click="handleAction(action)"
    >
      <span v-if="action.mealType && action.mealType === currentMealType" class="check-mark">✓</span>
      <span class="action-icon">{{ action.icon }}</span>
      <span class="action-label">{{ action.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MealType } from '@/types/order'

defineProps<{
  currentMealType?: MealType | 'all'
}>()

const emit = defineEmits<{
  action: [key: string]
  'update:mealType': [value: MealType]
  'scroll-to-order': []
  'random-add': []
}>()

interface QuickAction {
  key: string
  icon: string
  label: string
  mealType?: MealType
  type: 'meal' | 'scroll' | 'random'
}

const actions: QuickAction[] = [
  { key: 'breakfast', icon: '🌅', label: '早餐安排', mealType: 'breakfast', type: 'meal' },
  { key: 'lunch', icon: '☀️', label: '午餐吃饱', mealType: 'lunch', type: 'meal' },
  { key: 'dinner', icon: '🌙', label: '晚餐好好吃', mealType: 'dinner', type: 'meal' },
  { key: 'lateNight', icon: '🌃', label: '夜宵快乐', mealType: 'lateNight', type: 'meal' },
  { key: 'scroll-to-order', icon: '📋', label: '准点投喂', type: 'scroll' },
  { key: 'random-add', icon: '🎲', label: '随便安排', type: 'random' }
]

const flashKey = ref<string | null>(null)

function handleAction(action: QuickAction) {
  if (action.type === 'meal' && action.mealType) {
    emit('update:mealType', action.mealType)
  } else if (action.type === 'scroll') {
    flashKey.value = action.key
    setTimeout(() => { flashKey.value = null }, 800)
    emit('scroll-to-order')
  } else if (action.type === 'random') {
    flashKey.value = action.key
    setTimeout(() => { flashKey.value = null }, 800)
    emit('random-add')
  }
}
</script>

<style lang="scss" scoped>
.quick-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-2xl;
}

.action-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-lg $spacing-sm;
  background: $white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  transition: all 0.2s ease;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
    box-shadow: $shadow-md;
  }

  &.active {
    background: linear-gradient(135deg, #ffd4e8, #ffe8f0);
    box-shadow: 0 2px 12px rgba(255, 94, 158, 0.25);
    border: 1.5px solid $pink-300;

    .action-label {
      color: $pink-500;
      font-weight: 600;
    }

    .action-icon {
      transform: scale(1.05);
    }
  }

  &.action-flash {
    animation: actionFlash 0.8s ease;
  }
}

.check-mark {
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 12px;
  color: $pink-500;
  font-weight: 700;
  line-height: 1;
}

.action-icon {
  font-size: 28px;
  transition: transform 0.2s ease;
}

.action-label {
  font-size: $font-xs;
  font-weight: 500;
  color: $text-primary;
}

@keyframes actionFlash {
  0% {
    background: $pink-100;
    transform: scale(0.93);
  }
  40% {
    background: #ffe8f0;
  }
  100% {
    background: $white;
    transform: scale(1);
  }
}
</style>
