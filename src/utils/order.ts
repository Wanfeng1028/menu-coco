import type { CartItem, OrderForm, OrderRecord } from '@/types/order'
import { formatDateTime, getMealTimeLabel, getSpicyLabel, getDeliveryLabel, getMoodLabel } from './time'

export function generateOrderId(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `COCO-${year}${month}${day}-${hours}${minutes}${seconds}`
}

export function createOrderRecord(cart: CartItem[], form: OrderForm, emailSent = true): OrderRecord {
  return {
    id: generateOrderId(),
    cartItems: cart.map(item => ({ ...item })),
    form: { ...form },
    submittedAt: formatDateTime(),
    status: 'sent',
    emailSent
  }
}

export function formatOrderSummary(record: OrderRecord): string {
  const lines: string[] = []
  lines.push('【Coco 宝宝点餐】')
  lines.push(`订单编号：${record.id}`)
  lines.push(`宝宝昵称：${record.form.nickname || 'Coco'}`)
  lines.push('')
  lines.push('今日想吃：')
  record.cartItems.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.emoji} ${item.name} × ${item.quantity}`)
  })
  lines.push('')
  lines.push(`希望时间：${getMealTimeLabel(record.form.mealTime, record.form.customMealTime)}`)
  lines.push(`辣度：${getSpicyLabel(record.form.spicyLevel)}`)
  lines.push(`获取方式：${getDeliveryLabel(record.form.deliveryType)}`)
  lines.push(`心情：${getMoodLabel(record.form.mood)}`)
  if (record.form.note) {
    lines.push(`备注：${record.form.note}`)
  }
  lines.push('')
  lines.push(`提交时间：${record.submittedAt}`)
  return lines.join('\n')
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      return true
    } catch {
      return false
    }
  }
}

export function restoreCartFromRecord(record: OrderRecord): CartItem[] {
  return record.cartItems.map(item => ({ ...item }))
}

export function restoreFormFromRecord(record: OrderRecord): OrderForm {
  return { ...record.form }
}
