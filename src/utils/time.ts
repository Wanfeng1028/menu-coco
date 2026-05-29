export function formatDateTime(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function getMealTimeLabel(value: string, custom?: string): string {
  const map: Record<string, string> = {
    now: '现在',
    '30min': '半小时后',
    '7pm': '晚上7点',
    custom: custom || '自定义'
  }
  return map[value] || value
}

export function getSpicyLabel(value: string): string {
  const map: Record<string, string> = {
    none: '不辣',
    mild: '微辣',
    medium: '中辣',
    super: '超辣'
  }
  return map[value] || value
}

export function getDeliveryLabel(value: string): string {
  const map: Record<string, string> = {
    cook: '你做给我吃',
    buy: '你买给我吃',
    delivery: '你点外卖给我',
    note: '先记下来'
  }
  return map[value] || value
}

export function getMoodLabel(value: string): string {
  const map: Record<string, string> = {
    hungry: '饿了',
    happy: '开心',
    tired: '有点累',
    coax: '想被哄',
    whatever: '随便但要好吃'
  }
  return map[value] || value
}