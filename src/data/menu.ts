import type { MenuItem, CategoryTab } from '@/types/order'

export const categories: CategoryTab[] = [
  { key: 'all', label: '全部' },
  { key: 'home', label: '家常菜' },
  { key: 'bbq', label: '烧烤' },
  { key: 'staple', label: '主食' },
  { key: 'drink', label: '饮料' },
  { key: 'special', label: '隐藏彩蛋' }
]

export const menuItems: MenuItem[] = [
  // 家常菜
  {
    id: 'cola-chicken-wings',
    name: '可乐鸡翅',
    category: 'home',
    categoryName: '家常菜',
    description: '甜甜咸咸，适合被投喂的一天',
    emoji: '🍗'
  },
  {
    id: 'shrimp',
    name: '虾',
    category: 'home',
    categoryName: '家常菜',
    description: '鲜嫩弹牙，补充满满蛋白质',
    emoji: '🦐'
  },
  {
    id: 'egg-yolk-pumpkin',
    name: '蛋黄南瓜',
    category: 'home',
    categoryName: '家常菜',
    description: '外酥里糯，一口一个满足',
    emoji: '🎃'
  },
  {
    id: 'shredded-potato',
    name: '土豆丝',
    category: 'home',
    categoryName: '家常菜',
    description: '酸辣开胃，永远的经典',
    emoji: '🥔'
  },
  {
    id: 'shredded-beef',
    name: '牛肉丝',
    category: 'home',
    categoryName: '家常菜',
    description: '嫩滑多汁，大口吃肉的快乐',
    emoji: '🥩'
  },
  {
    id: 'corn-kernel',
    name: '玉米粒',
    category: 'home',
    categoryName: '家常菜',
    description: '甜甜脆脆，小零食也能当菜吃',
    emoji: '🌽'
  },

  // 烧烤
  {
    id: 'grilled-chicken-strip',
    name: '烤鸡柳',
    category: 'bbq',
    categoryName: '烧烤',
    description: '外焦里嫩，追剧必备',
    emoji: '🍖'
  },
  {
    id: 'grilled-beef',
    name: '烤牛肉',
    category: 'bbq',
    categoryName: '烧烤',
    description: '炭火香气，一口入魂',
    emoji: '🥩'
  },
  {
    id: 'grilled-lamb',
    name: '烤羊肉',
    category: 'bbq',
    categoryName: '烧烤',
    description: '孜然飘香，冬日暖胃',
    emoji: '🐑'
  },
  {
    id: 'skewers',
    name: '烤串',
    category: 'bbq',
    categoryName: '烧烤',
    description: '万物皆可串，快乐加倍',
    emoji: '🍢'
  },

  // 主食
  {
    id: 'rice',
    name: '米饭',
    category: 'staple',
    categoryName: '主食',
    description: '干饭人干饭魂，白米饭也是主角',
    emoji: '🍚'
  },
  {
    id: 'fried-rice',
    name: '炒饭',
    category: 'staple',
    categoryName: '主食',
    description: '粒粒分明，锅气十足',
    emoji: '🍳'
  },
  {
    id: 'noodles',
    name: '面条',
    category: 'staple',
    categoryName: '主食',
    description: '嗦一口面条，烦恼全跑掉',
    emoji: '🍜'
  },
  {
    id: 'dumplings',
    name: '饺子',
    category: 'staple',
    categoryName: '主食',
    description: '皮薄馅大，幸福的味道',
    emoji: '🥟'
  },

  // 饮料
  {
    id: 'milk-tea',
    name: '奶茶',
    category: 'drink',
    categoryName: '饮料',
    description: '快乐水，今日份的小确幸',
    emoji: '🧋'
  },
  {
    id: 'cola',
    name: '可乐',
    category: 'drink',
    categoryName: '饮料',
    description: '冰冰凉凉，吨吨吨',
    emoji: '🥤'
  },
  {
    id: 'fruit-tea',
    name: '果茶',
    category: 'drink',
    categoryName: '饮料',
    description: '清新解腻，维C满满',
    emoji: '🍹'
  },
  {
    id: 'yogurt',
    name: '酸奶',
    category: 'drink',
    categoryName: '饮料',
    description: '饭后来一杯，肠胃笑嘻嘻',
    emoji: '🥛'
  },

  // 隐藏彩蛋
  {
    id: 'dont-know-what-to-eat',
    name: '不知道吃什么',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '没关系，小鸡毛来安排',
    emoji: '🤷‍♀️'
  },
  {
    id: 'want-to-be-coaxed',
    name: '今天想被哄',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '收到！马上安排哄哄套餐',
    emoji: '🥺'
  },
  {
    id: 'whatever-but-delicious',
    name: '随便但要好吃',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '经典难题，交给我来解决',
    emoji: '😋'
  },
  {
    id: 'want-meat',
    name: '想吃肉肉',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '肉食动物的快乐，安排！',
    emoji: '🤤'
  },
  {
    id: 'want-spicy',
    name: '想吃辣的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '无辣不欢，今天要过瘾',
    emoji: '🌶️'
  },
  {
    id: 'want-sweet',
    name: '想吃甜的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '甜蜜暴击，今日份糖分拉满',
    emoji: '🍰'
  }
]