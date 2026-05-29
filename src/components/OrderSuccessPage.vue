<template>
  <div class="success-page">
    <div class="success-header">
      <span class="success-emoji">💌</span>
      <h1 class="success-title">订单已经发送给男朋友啦～</h1>
      <p class="success-subtitle">请等待投喂！</p>
    </div>

    <div class="status-card">
      <div class="status-row">
        <span class="status-label">订单编号</span>
        <span class="status-value mono">{{ order.id }}</span>
      </div>
      <div class="status-row">
        <span class="status-label">当前状态</span>
        <span class="status-value sent">✅ 已发送</span>
      </div>
      <div class="status-row">
        <span class="status-label">发送方式</span>
        <span class="status-value">📧 邮件提醒</span>
      </div>
      <div class="status-row">
        <span class="status-label">提交时间</span>
        <span class="status-value">{{ order.submittedAt }}</span>
      </div>
    </div>

    <div class="detail-card">
      <h3 class="card-title">📋 订单详情</h3>
      <div class="detail-nickname">
        宝宝昵称：{{ order.form.nickname || 'Coco' }}
      </div>
      <div class="detail-items">
        <div
          v-for="item in order.cartItems"
          :key="item.id"
          class="detail-item"
        >
          <span class="item-emoji">{{ item.emoji }}</span>
          <span class="item-name">{{ item.name }}</span>
          <span class="item-qty">× {{ item.quantity }}</span>
        </div>
      </div>
      <div class="detail-info">
        <div class="info-row">
          <span class="info-label">希望时间</span>
          <span class="info-value">{{ getMealTimeLabel(order.form.mealTime, order.form.customMealTime) }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">辣度</span>
          <span class="info-value">{{ getSpicyLabel(order.form.spicyLevel) }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">获取方式</span>
          <span class="info-value">{{ getDeliveryLabel(order.form.deliveryType) }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">心情</span>
          <span class="info-value">{{ getMoodLabel(order.form.mood) }}</span>
        </div>
        <div v-if="order.form.note" class="info-row">
          <span class="info-label">备注</span>
          <span class="info-value">{{ order.form.note }}</span>
        </div>
      </div>
    </div>

    <div class="timeline-card">
      <h3 class="card-title">🚀 投喂进度</h3>
      <div class="timeline">
        <div class="timeline-step completed">
          <div class="step-dot">✅</div>
          <div class="step-line"></div>
          <span class="step-label">宝宝已下单</span>
        </div>
        <div class="timeline-step completed">
          <div class="step-dot">✅</div>
          <div class="step-line"></div>
          <span class="step-label">邮件已发送</span>
        </div>
        <div class="timeline-step pending">
          <div class="step-dot">⏳</div>
          <div class="step-line"></div>
          <span class="step-label">男朋友查看中</span>
        </div>
        <div class="timeline-step pending">
          <div class="step-dot">⏳</div>
          <span class="step-label">等待投喂</span>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <button class="action-btn primary" @click="$emit('copyOrder')">
        📋 复制订单
      </button>
      <button class="action-btn primary" @click="$emit('reorder')">
        🔄 再来一单
      </button>
      <button class="action-btn secondary" @click="$emit('modifyOrder')">
        ✏️ 修改订单
      </button>
      <button class="action-btn secondary" @click="$emit('viewHistory')">
        📜 查看历史
      </button>
      <button class="action-btn text" @click="$emit('goHome')">
        🏠 回到首页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderRecord } from '@/types/order'
import { getMealTimeLabel, getSpicyLabel, getDeliveryLabel, getMoodLabel } from '@/utils/time'

defineProps<{
  order: OrderRecord
}>()

defineEmits<{
  copyOrder: []
  reorder: []
  modifyOrder: []
  viewHistory: []
  goHome: []
}>()
</script>

<style lang="scss" scoped>
.success-page {
  padding-bottom: calc(#{$spacing-2xl} + env(safe-area-inset-bottom, 0px));
}

.success-header {
  text-align: center;
  padding: $spacing-2xl 0 $spacing-xl;
}

.success-emoji {
  font-size: 72px;
  display: block;
  margin-bottom: $spacing-lg;
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.success-title {
  font-size: $font-xl;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.success-subtitle {
  font-size: $font-base;
  color: $text-secondary;
}

.status-card,
.detail-card,
.timeline-card {
  background: $white;
  border-radius: $radius-xl;
  padding: $spacing-xl;
  box-shadow: $shadow-card;
  margin-bottom: $spacing-lg;
}

.card-title {
  font-size: $font-base;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-lg;
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-sm 0;

  &:not(:last-child) {
    border-bottom: 1px solid $gray-100;
  }
}

.status-label {
  font-size: $font-sm;
  color: $text-hint;
}

.status-value {
  font-size: $font-sm;
  font-weight: 500;
  color: $text-primary;

  &.mono {
    font-family: monospace;
    color: $pink-500;
  }

  &.sent {
    color: $success;
  }
}

.detail-nickname {
  font-size: $font-sm;
  color: $pink-500;
  font-weight: 500;
  margin-bottom: $spacing-lg;
  padding: $spacing-sm $spacing-md;
  background: $pink-50;
  border-radius: $radius-md;
}

.detail-items {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background: $pink-50;
  border-radius: $radius-md;
}

.item-emoji {
  font-size: 20px;
  flex-shrink: 0;
}

.item-name {
  flex: 1;
  font-size: $font-sm;
  color: $text-primary;
}

.item-qty {
  font-size: $font-sm;
  color: $pink-500;
  font-weight: 600;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.info-row {
  display: flex;
  align-items: baseline;
  gap: $spacing-md;
}

.info-label {
  flex-shrink: 0;
  width: 64px;
  font-size: $font-xs;
  color: $text-hint;
}

.info-value {
  font-size: $font-sm;
  color: $text-primary;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-step {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  position: relative;
  min-height: 48px;

  &.completed .step-dot {
    color: $pink-500;
  }

  &.pending .step-dot {
    color: $gray-300;
  }

  &.completed .step-label {
    color: $text-primary;
    font-weight: 500;
  }

  &.pending .step-label {
    color: $text-hint;
  }
}

.step-dot {
  flex-shrink: 0;
  width: 24px;
  text-align: center;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.step-line {
  position: absolute;
  left: 11px;
  top: 24px;
  width: 2px;
  height: calc(100% - 12px);
  background: $gray-200;
}

.timeline-step.completed .step-line {
  background: $pink-300;
}

.timeline-step:last-child .step-line {
  display: none;
}

.step-label {
  font-size: $font-sm;
  padding-top: 2px;
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;
  margin-top: $spacing-lg;
}

.action-btn {
  padding: $spacing-md $spacing-lg;
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

  &.text {
    grid-column: 1 / -1;
    background: none;
    color: $text-hint;
    font-size: $font-xs;
    padding: $spacing-sm;
  }
}
</style>
