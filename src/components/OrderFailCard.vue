<template>
  <div class="fail-card">
    <div class="fail-header">
      <span class="fail-emoji">💌</span>
      <h2 class="fail-title">
        {{ isConfigError ? '邮件配置还没有设置好～' : '发送失败了，宝宝先截图发给我也可以～' }}
      </h2>
      <p class="fail-subtitle">
        {{ isConfigError
          ? 'EmailJS 还没有配置好，但订单没有丢哦～'
          : '订单没有丢，可以复制订单内容或重新发送～'
        }}
      </p>
    </div>

    <div v-if="errorMessage" class="fail-detail">
      <span class="detail-icon">💡</span>
      <span class="detail-text">{{ errorMessage }}</span>
    </div>

    <div class="fail-actions">
      <button v-if="!isConfigError" class="fail-btn primary" @click="$emit('retry')">
        🔄 重新发送
      </button>
      <button v-if="hasOrder" class="fail-btn secondary" @click="$emit('copyOrder')">
        📋 复制订单
      </button>
      <button class="fail-btn secondary" @click="$emit('goBack')">
        ← 返回修改
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  errorMessage: string
  hasOrder: boolean
}>()

defineEmits<{
  retry: []
  copyOrder: []
  goBack: []
}>()

const isConfigError = computed(() =>
  props.errorMessage.includes('配置') || props.errorMessage.includes('设置')
)
</script>

<style lang="scss" scoped>
.fail-card {
  background: $white;
  border-radius: $radius-xl;
  padding: $spacing-2xl;
  box-shadow: $shadow-card;
  text-align: center;
}

.fail-header {
  margin-bottom: $spacing-xl;
}

.fail-emoji {
  font-size: 56px;
  display: block;
  margin-bottom: $spacing-lg;
}

.fail-title {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-sm;
  line-height: 1.4;
}

.fail-subtitle {
  font-size: $font-sm;
  color: $text-secondary;
  line-height: 1.5;
}

.fail-detail {
  background: $pink-50;
  border-radius: $radius-md;
  padding: $spacing-md;
  margin-bottom: $spacing-xl;
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  text-align: left;
}

.detail-icon {
  flex-shrink: 0;
  font-size: 16px;
}

.detail-text {
  font-size: $font-xs;
  color: $text-secondary;
  line-height: 1.5;
  word-break: break-all;
}

.fail-actions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.fail-btn {
  width: 100%;
  padding: $spacing-md $spacing-xl;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: 500;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.96);
  }

  &.primary {
    background: linear-gradient(135deg, $pink-400, $pink-500);
    color: $white;
    box-shadow: 0 4px 12px rgba(255, 94, 158, 0.3);
  }

  &.secondary {
    background: $gray-100;
    color: $text-secondary;
  }
}
</style>
