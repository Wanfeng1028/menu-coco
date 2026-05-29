<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="success-overlay">
        <Transition name="scale">
          <div v-if="visible" class="success-modal">
            <div class="modal-emoji">🎉</div>
            <h2 class="modal-title">订单已经发送给男朋友啦～</h2>
            <p class="modal-subtitle">请等待投喂！</p>
            <div class="modal-actions">
              <button class="modal-btn secondary" @click="$emit('close')">
                好的～
              </button>
              <button class="modal-btn primary" @click="$emit('reorder')">
                再点一份
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

defineEmits<{
  close: []
  reorder: []
}>()
</script>

<style lang="scss" scoped>
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
}

.success-modal {
  background: $white;
  border-radius: $radius-xl;
  padding: $spacing-3xl $spacing-2xl;
  text-align: center;
  width: 100%;
  max-width: 320px;
}

.modal-emoji {
  font-size: 64px;
  margin-bottom: $spacing-lg;
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.modal-title {
  font-size: $font-xl;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.modal-subtitle {
  font-size: $font-base;
  color: $text-secondary;
  margin-bottom: $spacing-2xl;
}

.modal-actions {
  display: flex;
  gap: $spacing-md;
}

.modal-btn {
  flex: 1;
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
}
</style>