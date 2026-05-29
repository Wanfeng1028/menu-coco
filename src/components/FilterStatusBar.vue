<template>
  <Transition name="filter-bar">
    <div v-if="hasAnyFilter" class="filter-status-bar">
      <div class="filter-chips">
        <span v-if="mealTypeLabel" class="filter-chip meal-chip">
          {{ mealTypeLabel }}
          <button class="chip-close" @click="$emit('clearMealType')">×</button>
        </span>
        <span v-if="categoryLabel" class="filter-chip category-chip">
          {{ categoryLabel }}
          <button class="chip-close" @click="$emit('clearCategory')">×</button>
        </span>
        <span v-if="searchKeyword" class="filter-chip search-chip">
          🔍 {{ searchKeyword }}
          <button class="chip-close" @click="$emit('clearSearch')">×</button>
        </span>
      </div>
      <button class="clear-all-btn" @click="$emit('clearAll')">
        不挑啦
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  mealTypeLabel: string
  categoryLabel: string
  searchKeyword: string
  hasAnyFilter: boolean
}>()

defineEmits<{
  clearMealType: []
  clearCategory: []
  clearSearch: []
  clearAll: []
}>()
</script>

<style lang="scss" scoped>
.filter-status-bar {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  padding: $spacing-sm 0;
}

.filter-chips {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-full;
  font-size: $font-xs;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.meal-chip {
  background: $pink-50;
  color: $pink-500;
  border: 1px solid $pink-200;
}

.category-chip {
  background: #fff3e0;
  color: #e65100;
  border: 1px solid #ffe0b2;
}

.search-chip {
  background: $gray-100;
  color: $text-secondary;
  border: 1px solid $gray-200;
}

.chip-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  color: inherit;
  font-size: 12px;
  line-height: 1;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:active {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(0.9);
  }
}

.clear-all-btn {
  flex-shrink: 0;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-full;
  background: $white;
  color: $pink-500;
  font-size: $font-xs;
  font-weight: 600;
  border: 1px solid $pink-200;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:active {
    background: $pink-50;
    transform: scale(0.95);
  }
}

.filter-bar-enter-active {
  transition: all 0.3s ease;
}

.filter-bar-leave-active {
  transition: all 0.2s ease;
}

.filter-bar-enter-from,
.filter-bar-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
  margin-bottom: 0;
  padding: 0;
}
</style>
