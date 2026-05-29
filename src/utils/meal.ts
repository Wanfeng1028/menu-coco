import type { MealType } from '@/types/order'

export function getCurrentMealType(): MealType {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 10) return 'breakfast'
  if (hour >= 10 && hour < 14) return 'lunch'
  if (hour >= 14 && hour < 17) return 'anytime'
  if (hour >= 17 && hour < 21) return 'dinner'
  return 'lateNight'
}

export function getMealTypeLabel(value: string): string {
  const map: Record<string, string> = {
    breakfast: '🌅 早安投喂',
    lunch: '☀️ 中午吃饱',
    dinner: '🌙 晚上好好吃',
    lateNight: '🌃 偷偷加餐',
    anytime: '👀 随时都行',
    afternoonTea: '🍰 下午茶'
  }
  return map[value] || '👀 随时都行'
}

export function getMealTypeEmoji(value: string): string {
  const map: Record<string, string> = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    lateNight: '🌃',
    anytime: '👀',
    afternoonTea: '🍰'
  }
  return map[value] || '👀'
}

export function getScheduleTypeLabel(value: string): string {
  const map: Record<string, string> = {
    now: '立刻马上就要！',
    later: '半小时后',
    oneHour: '一小时后',
    specific: '指定时间'
  }
  return map[value] || '立刻马上就要！'
}

export function formatScheduledTime(
  scheduleType: 'now' | 'later' | 'oneHour' | 'specific' | string,
  scheduledDate?: string,
  scheduledTime?: string
): string {
  if (scheduleType === 'now') {
    return '现在就想吃'
  }
  if (scheduleType === 'later') {
    return '半小时后'
  }
  if (scheduleType === 'oneHour') {
    return '一小时后'
  }
  if (scheduledDate && scheduledTime) {
    return `${scheduledDate} ${scheduledTime}`
  }
  if (scheduledDate) {
    return scheduledDate
  }
  return '预约时间'
}

export function resolveScheduledTime(
  scheduleType?: string,
  scheduledDate?: string,
  scheduledTime?: string
): Date {
  if (scheduleType === 'specific' && scheduledDate && scheduledTime) {
    return new Date(`${scheduledDate}T${scheduledTime}:00`)
  }
  if (scheduleType === 'later') {
    return new Date(Date.now() + 30 * 60 * 1000)
  }
  if (scheduleType === 'oneHour') {
    return new Date(Date.now() + 60 * 60 * 1000)
  }
  return new Date()
}

export function getCountdownText(targetTime: Date): string {
  const now = new Date()
  const diff = targetTime.getTime() - now.getTime()

  if (diff <= 0) {
    return '到投喂时间啦～'
  }

  const totalMinutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (hours > 0) {
    return `距离投喂还有 ${hours} 小时 ${minutes} 分钟`
  }
  if (minutes > 0) {
    return `距离投喂还有 ${minutes} 分钟 ${seconds} 秒`
  }
  return `距离投喂还有 ${seconds} 秒`
}
