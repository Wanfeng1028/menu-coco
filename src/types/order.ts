export type MenuCategory =
  | 'home'
  | 'meat'
  | 'bbq'
  | 'staple'
  | 'snack'
  | 'drink'
  | 'dessert'
  | 'light'
  | 'soup'
  | 'breakfast'
  | 'special'

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'lateNight' | 'anytime'

export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  categoryName: string
  description: string
  emoji: string
  tags?: string[]
  loveValue?: number
  isPopular?: boolean
  isRecommended?: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface OrderForm {
  nickname: string
  mealType: MealType
  mealTime: string
  customMealTime?: string
  scheduleType: 'now' | 'later' | 'oneHour' | 'specific'
  scheduledDate: string
  scheduledTime: string
  spicyLevel: string
  deliveryType: string
  mood: string
  note: string
}

export interface CategoryTab {
  key: MenuCategory | 'all'
  label: string
}

export interface OrderRecord {
  id: string
  cartItems: CartItem[]
  form: OrderForm
  submittedAt: string
  status: 'sent'
  emailSent: boolean
  mealType: MealType
  scheduleType: 'now' | 'later' | 'specific'
  scheduledDate: string
  scheduledTime: string
  resolvedScheduledTime: string
}

export type AppView = 'menu' | 'order' | 'success' | 'history'
