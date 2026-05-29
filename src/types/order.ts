export type MenuCategory =
  | 'home'
  | 'meat'
  | 'bbq'
  | 'staple'
  | 'snack'
  | 'drink'
  | 'dessert'
  | 'light'
  | 'special'

export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  categoryName: string
  description: string
  emoji: string
  // 新增字段
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
  mealTime: string
  customMealTime?: string
  spicyLevel: string
  deliveryType: string
  mood: string
  note: string
}

export interface CategoryTab {
  key: MenuCategory | 'all'
  label: string
}