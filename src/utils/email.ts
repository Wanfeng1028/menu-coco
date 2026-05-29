import emailjs from '@emailjs/browser'
import type { CartItem, OrderForm } from '@/types/order'
import { formatDateTime, getMealTimeLabel, getSpicyLabel, getDeliveryLabel, getMoodLabel } from './time'
import { getMealTypeLabel, getScheduleTypeLabel } from './meal'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function isEmailConfigured(): boolean {
  return !!(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)
}

export async function sendOrderEmail(
  cart: CartItem[],
  form: OrderForm
): Promise<boolean> {
  if (!isEmailConfigured()) {
    throw new Error('邮件配置还没有设置好，宝宝先截图发给我也可以～')
  }

  const menuList = cart
    .map((item, index) => `${index + 1}. ${item.name} × ${item.quantity}`)
    .join('\n')

  const templateParams = {
    to_name: '小鸡毛',
    from_name: form.nickname || 'Coco',
    menu_list: menuList,
    meal_type: getMealTypeLabel(form.mealType || ''),
    schedule_type: getScheduleTypeLabel(form.scheduleType || 'now'),
    scheduled_time: form.scheduleType === 'specific' && form.scheduledDate
      ? `${form.scheduledDate} ${form.scheduledTime || ''}`
      : '',
    meal_time: getMealTimeLabel(form.mealTime, form.customMealTime),
    spicy_level: getSpicyLabel(form.spicyLevel),
    delivery_type: getDeliveryLabel(form.deliveryType),
    mood: getMoodLabel(form.mood),
    note: form.note || '无',
    order_time: formatDateTime(),
    subject: `【宝宝点餐提醒】${form.nickname || 'Coco'}提交了今日菜单`
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY
    })
    return true
  } catch (error) {
    console.error('Email send failed:', error)
    throw new Error('发送失败了，宝宝先截图发给我也可以～')
  }
}