<template>
  <div class="quick-actions">
    <div
      v-for="action in actions"
      :key="action.key"
      class="action-item"
      @click="$emit('action', action.key)"
    >
      <span class="action-icon">{{ action.icon }}</span>
      <span class="action-label">{{ action.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  action: [key: string]
}>()

const actions = [
  { key: 'recommend', icon: '⭐', label: '今日推荐' },
  { key: 'meat', icon: '🥩', label: '想吃肉肉' },
  { key: 'drink', icon: '🧋', label: '想喝饮料' },
  { key: 'random', icon: '🎲', label: '不知道吃啥' },
  { key: 'coax', icon: '🥺', label: '想被哄' },
  { key: 'arrange', icon: '💝', label: '随便安排' }
]
</script>

<style lang="scss" scoped>
.quick-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-2xl;
}

.action-item {
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
}

.action-icon {
  font-size: 28px;
}

.action-label {
  font-size: $font-xs;
  font-weight: 500;
  color: $text-primary;
}
</style>
