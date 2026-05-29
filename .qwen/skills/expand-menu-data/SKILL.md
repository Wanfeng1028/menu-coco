---
name: expand-menu-data
description: Expand Vue ordering app menu data with new categories, items, and smart recommendation logic
source: auto-skill
extracted_at: '2026-05-29T11:57:31.450Z'
---

## When to use

When expanding a Vue 3 + TypeScript ordering/food app with new menu categories and items, while maintaining existing functionality (cart, search, recommendations, email submission).

## Procedure

### 1. Update TypeScript type definition

Edit `src/types/order.ts` to add new category values:

```typescript
export type MenuCategory =
  | 'home'      // 家常菜
  | 'meat'      // 肉肉专区
  | 'bbq'       // 烧烤
  | 'staple'    // 主食
  | 'snack'     // 小吃夜宵
  | 'drink'     // 饮料
  | 'dessert'   // 甜品
  | 'light'     // 健康清淡
  | 'special'   // 隐藏彩蛋
```

**Important:** `MenuItem.category` should NOT include `'all'` — `'all'` is only for filter tabs.

### 2. Update categories array

Edit `src/data/menu.ts` to add new category tabs:

```typescript
export const categories: CategoryTab[] = [
  { key: 'all', label: '全部' },
  { key: 'home', label: '家常菜' },
  { key: 'meat', label: '肉肉专区' },
  { key: 'bbq', label: '烧烤' },
  { key: 'staple', label: '主食' },
  { key: 'snack', label: '小吃夜宵' },
  { key: 'drink', label: '饮料' },
  { key: 'dessert', label: '甜品' },
  { key: 'light', label: '健康清淡' },
  { key: 'special', label: '隐藏彩蛋' }
]
```

### 3. Add menu items with consistent structure

Each item should follow this pattern:

```typescript
{
  id: 'kebab-case-unique-id',      // Must be unique
  name: '中文菜名',
  category: 'home',                 // Must match MenuCategory type
  categoryName: '家常菜',           // Chinese display name
  description: '可爱风格描述',       // Keep the app's tone
  emoji: '🍗',                      // Relevant emoji
  tags: ['招牌', '常点', '肉肉'],   // 2-4 tags for search
  loveValue: 5,                     // 1-9, decorative
  isPopular: true,                  // 15-25 items should be true
  isRecommended: true               // 12-20 items should be true
}
```

**loveValue rules:**
- Normal dishes: 2-4
- Meat dishes: 4-7
- Drinks/desserts: 2-5
- Special/hidden: 1-9

### 4. Optimize random recommendation logic

Update `generateRecommendations()` in `App.vue` for smarter picks:

```typescript
function generateRecommendations() {
  const count = Math.floor(Math.random() * 3) + 2 // 2-4 items
  const nonSpecial = menuItems.filter(item => item.category !== 'special')
  const specialItems = menuItems.filter(item => item.category === 'special')

  // Category pools
  const stapleOrHome = nonSpecial.filter(i => i.category === 'staple' || i.category === 'home')
  const meatOrBbq = nonSpecial.filter(i => i.category === 'meat' || i.category === 'bbq')
  const drinks = nonSpecial.filter(i => i.category === 'drink')
  const desserts = nonSpecial.filter(i => i.category === 'dessert')

  const pick = (arr: MenuItem[]) => arr[Math.floor(Math.random() * arr.length)]
  const selected: MenuItem[] = []
  const usedIds = new Set<string>()

  const addUnique = (item: MenuItem | undefined) => {
    if (item && !usedIds.has(item.id) && selected.length < count) {
      selected.push(item)
      usedIds.add(item.id)
    }
  }

  // 1. Always include staple or home dish
  addUnique(pick(stapleOrHome))

  // 2. Usually include meat or BBQ
  if (Math.random() > 0.3) addUnique(pick(meatOrBbq))

  // 3. Fill with other categories
  const pool = nonSpecial.filter(i => !usedIds.has(i.id)).sort(() => Math.random() - 0.5)
  for (const item of pool) {
    if (selected.length >= count) break
    addUnique(item)
  }

  // 4. Maybe add drink or dessert
  if (selected.length < count && Math.random() > 0.4) {
    addUnique(pick(Math.random() > 0.5 ? drinks : desserts))
  }

  // 5. Rarely include special/hidden
  if (selected.length < count && Math.random() > 0.7 && specialItems.length > 0) {
    addUnique(pick(specialItems))
  }

  recommendations.value = selected
}
```

### 5. Update quick action handlers

Update `handleQuickAction()` for new categories:

```typescript
case 'arrange':
  // Smart random: 1 staple + 1 meat + optional drink/dessert
  const arrangePick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
  const arrangeStapleHome = nonSpecial.filter(i => i.category === 'staple' || i.category === 'home')
  const arrangeMeatBbq = nonSpecial.filter(i => i.category === 'meat' || i.category === 'bbq')

  addUnique(arrangePick(arrangeStapleHome))
  addUnique(arrangePick(arrangeMeatBbq))
  if (Math.random() > 0.5) addUnique(arrangePick(drinks))
  if (Math.random() > 0.5) addUnique(arrangePick(desserts))
  break
```

### 6. Verify search compatibility

Ensure search logic includes all new fields:

```typescript
const filteredMenuItems = computed(() => {
  if (!searchQuery.value) return menuItems
  const query = searchQuery.value.toLowerCase()
  return menuItems.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.categoryName.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.tags?.some(tag => tag.toLowerCase().includes(query))
  )
})
```

### 7. Run build verification

```bash
npm run build
```

## Key points

- Keep all existing items when expanding (don't delete)
- Each item must have a unique `id` in kebab-case
- `tags` array enables flexible search (2-4 tags per item)
- `isPopular` and `isRecommended` control favorites section display
- Random recommendation should balance categories (not all drinks)
- "随便安排" should include 1 staple + 1 meat + optional extras
- Always verify `npm run build` passes after changes
- Preserve existing localStorage and EmailJS integration

## Verification checklist

- [ ] All original items preserved
- [ ] New categories have Chinese labels
- [ ] Each item has description, emoji, tags, loveValue
- [ ] Search works across name, category, description, tags
- [ ] Random recommendations include variety
- [ ] Quick actions work with new categories
- [ ] `npm run build` passes
