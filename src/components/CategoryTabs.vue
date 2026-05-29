<template>
  <div class="category-tabs">
    <div class="tabs-scroll">
      <button
        v-for="tab in categories"
        :key="tab.key"
        class="tab-item"
        :class="{ active: modelValue === tab.key }"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from '@/data/menu'
import type { MenuCategory } from '@/types/order'

defineProps<{
  modelValue: MenuCategory | 'all'
}>()

defineEmits<{
  'update:modelValue': [value: MenuCategory | 'all']
}>()
</script>

<style lang="scss" scoped>
.category-tabs {
  margin-bottom: $spacing-xl;
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
  padding: $spacing-sm $spacing-lg;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: 500;
  background: $white;
  color: $text-secondary;
  border: 1px solid $gray-200;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:active {
    transform: scale(0.96);
  }

  &.active {
    background: linear-gradient(135deg, $pink-400, $pink-500);
    color: $white;
    border-color: transparent;
    box-shadow: 0 2px 8px rgba(255, 94, 158, 0.3);
  }
}
</style>