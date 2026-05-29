export type MenuCategory = 'home' | 'bbq' | 'staple' | 'drink' | 'special'

export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  categoryName: string
  description: string
  emoji: string
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