<template>
  <Transition name="toast">
    <div v-if="visible" class="toast-wrapper">
      <div class="toast-message">
        <span class="toast-text">{{ message }}</span>
        <button v-if="undoable" class="toast-undo-btn" @click.stop="$emit('undo')">撤销</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps<{
  visible: boolean
  message: string
  undoable?: boolean
  duration?: number
}>()

const emit = defineEmits<{
  close: []
  undo: []
}>()

const timer = ref<ReturnType<typeof setTimeout> | null>(null)

function startTimer() {
  clearTimer()
  const ms = props.duration ?? 3000
  timer.value = setTimeout(() => {
    emit('close')
  }, ms)
}

function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

watch(() => props.visible, (v) => {
  if (v) startTimer()
  else clearTimer()
})
</script>

<style lang="scss" scoped>
.toast-wrapper {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 300;
  pointer-events: auto;
}

.toast-message {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  background: rgba(0, 0, 0, 0.78);
  color: $white;
  padding: $spacing-md $spacing-xl;
  border-radius: $radius-full;
  font-size: $font-sm;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(8px);
}

.toast-text {
  line-height: 1.4;
}

.toast-undo-btn {
  flex-shrink: 0;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-full;
  background: rgba(255, 255, 255, 0.2);
  color: $white;
  font-size: $font-xs;
  font-weight: 600;
  transition: all 0.15s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:active {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(0.95);
  }
}

.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-12px) scale(0.95);
}
</style>
