<template>
  <div class="empty-state">
    <div class="empty-emoji">{{ emoji }}</div>
    <p class="empty-text">{{ text }}</p>
    <p v-if="hint" class="empty-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  emoji?: string
  text?: string
  hint?: string
}>(), {
  emoji: '🥺',
  text: '宝宝还没有选菜哦～',
  hint: '先去挑一点想吃的吧'
})
</script>

<style lang="scss" scoped>
.empty-state {
  text-align: center;
  padding: $spacing-3xl $spacing-xl;
}

.empty-emoji {
  font-size: 48px;
  margin-bottom: $spacing-lg;
}

.empty-text {
  font-size: $font-lg;
  color: $text-secondary;
  margin-bottom: $spacing-sm;
}

.empty-hint {
  font-size: $font-sm;
  color: $text-hint;
}
</style>