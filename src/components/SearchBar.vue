<template>
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      :value="modelValue"
      class="search-input"
      type="text"
      placeholder="搜索想吃的，比如可乐鸡翅、奶茶、烤肉～"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      class="search-clear"
      @click="$emit('update:modelValue', '')"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  background: $white;
  border-radius: $radius-full;
  padding: $spacing-sm $spacing-lg;
  box-shadow: $shadow-sm;
  margin-bottom: $spacing-lg;
  border: 1px solid $gray-100;
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: $pink-300;
    box-shadow: 0 0 0 3px rgba(255, 126, 179, 0.1);
  }
}

.search-icon {
  font-size: $font-lg;
  margin-right: $spacing-sm;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  font-size: $font-sm;
  color: $text-primary;
  
  &::placeholder {
    color: $text-hint;
  }
}

.search-clear {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: $gray-200;
  color: $gray-600;
  font-size: $font-xs;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: $spacing-sm;
  transition: all 0.2s ease;
  
  &:active {
    background: $gray-300;
    transform: scale(0.9);
  }
}
</style>
