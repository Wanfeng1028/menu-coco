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
    emoji: '🍗',
    tags: ['招牌', '常点', '甜甜的', '肉肉'],
    loveValue: 5,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'shrimp',
    name: '虾',
    category: 'home',
    categoryName: '家常菜',
    description: '鲜嫩弹牙，补充满满蛋白质',
    emoji: '🦐',
    tags: ['鲜嫩', '蛋白质', '肉肉'],
    loveValue: 4,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'egg-yolk-pumpkin',
    name: '蛋黄南瓜',
    category: 'home',
    categoryName: '家常菜',
    description: '外酥里糯，一口一个满足',
    emoji: '🎃',
    tags: ['酥脆', '小食', '甜甜的'],
    loveValue: 3
  },
  {
    id: 'shredded-potato',
    name: '土豆丝',
    category: 'home',
    categoryName: '家常菜',
    description: '酸辣开胃，永远的经典',
    emoji: '🥔',
    tags: ['开胃', '家常', '经典'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'shredded-beef',
    name: '牛肉丝',
    category: 'home',
    categoryName: '家常菜',
    description: '嫩滑多汁，大口吃肉的快乐',
    emoji: '🥩',
    tags: ['肉肉', '嫩滑', '满足'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'corn-kernel',
    name: '玉米粒',
    category: 'home',
    categoryName: '家常菜',
    description: '甜甜脆脆，小零食也能当菜吃',
    emoji: '🌽',
    tags: ['甜甜的', '小食', '健康'],
    loveValue: 2
  },

  // 烧烤
  {
    id: 'grilled-chicken-strip',
    name: '烤鸡柳',
    category: 'bbq',
    categoryName: '烧烤',
    description: '外焦里嫩，追剧必备',
    emoji: '🍖',
    tags: ['外焦里嫩', '追剧', '肉肉'],
    loveValue: 4,
    isPopular: true
  },
  {
    id: 'grilled-beef',
    name: '烤牛肉',
    category: 'bbq',
    categoryName: '烧烤',
    description: '炭火香气，一口入魂',
    emoji: '🥩',
    tags: ['炭火', '肉肉', '招牌'],
    loveValue: 5,
    isRecommended: true
  },
  {
    id: 'grilled-lamb',
    name: '烤羊肉',
    category: 'bbq',
    categoryName: '烧烤',
    description: '孜然飘香，冬日暖胃',
    emoji: '🐑',
    tags: ['孜然', '暖胃', '肉肉'],
    loveValue: 4
  },
  {
    id: 'skewers',
    name: '烤串',
    category: 'bbq',
    categoryName: '烧烤',
    description: '万物皆可串，快乐加倍',
    emoji: '🍢',
    tags: ['快乐', '分享', '肉肉'],
    loveValue: 4,
    isPopular: true
  },

  // 主食
  {
    id: 'rice',
    name: '米饭',
    category: 'staple',
    categoryName: '主食',
    description: '干饭人干饭魂，白米饭也是主角',
    emoji: '🍚',
    tags: ['经典', '百搭', '主食'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'fried-rice',
    name: '炒饭',
    category: 'staple',
    categoryName: '主食',
    description: '粒粒分明，锅气十足',
    emoji: '🍳',
    tags: ['锅气', '满足', '主食'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'noodles',
    name: '面条',
    category: 'staple',
    categoryName: '主食',
    description: '嗦一口面条，烦恼全跑掉',
    emoji: '🍜',
    tags: ['嗦面', '满足', '主食'],
    loveValue: 4
  },
  {
    id: 'dumplings',
    name: '饺子',
    category: 'staple',
    categoryName: '主食',
    description: '皮薄馅大，幸福的味道',
    emoji: '🥟',
    tags: ['幸福', '手工', '主食'],
    loveValue: 4
  },

  // 饮料
  {
    id: 'milk-tea',
    name: '奶茶',
    category: 'drink',
    categoryName: '饮料',
    description: '快乐水，今日份的小确幸',
    emoji: '🧋',
    tags: ['快乐水', '甜甜的', '招牌'],
    loveValue: 5,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'cola',
    name: '可乐',
    category: 'drink',
    categoryName: '饮料',
    description: '冰冰凉凉，吨吨吨',
    emoji: '🥤',
    tags: ['冰凉', '快乐水', '爽'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'fruit-tea',
    name: '果茶',
    category: 'drink',
    categoryName: '饮料',
    description: '清新解腻，维C满满',
    emoji: '🍹',
    tags: ['清新', '维C', '解腻'],
    loveValue: 3
  },
  {
    id: 'yogurt',
    name: '酸奶',
    category: 'drink',
    categoryName: '饮料',
    description: '饭后来一杯，肠胃笑嘻嘻',
    emoji: '🥛',
    tags: ['健康', '饭后', '肠胃'],
    loveValue: 2
  },

  // 隐藏彩蛋
  {
    id: 'dont-know-what-to-eat',
    name: '不知道吃什么',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '没关系，小鸡毛来安排',
    emoji: '🤷‍♀️',
    tags: ['彩蛋', '随机'],
    loveValue: 3
  },
  {
    id: 'want-to-be-coaxed',
    name: '今天想被哄',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '收到！马上安排哄哄套餐',
    emoji: '🥺',
    tags: ['彩蛋', '撒娇', '特殊'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'whatever-but-delicious',
    name: '随便但要好吃',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '经典难题，交给我来解决',
    emoji: '😋',
    tags: ['彩蛋', '经典难题'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'want-meat',
    name: '想吃肉肉',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '肉食动物的快乐，安排！',
    emoji: '🤤',
    tags: ['彩蛋', '肉肉'],
    loveValue: 4
  },
  {
    id: 'want-spicy',
    name: '想吃辣的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '无辣不欢，今天要过瘾',
    emoji: '🌶️',
    tags: ['彩蛋', '辣辣'],
    loveValue: 3
  },
  {
    id: 'want-sweet',
    name: '想吃甜的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '甜蜜暴击，今日份糖分拉满',
    emoji: '🍰',
    tags: ['彩蛋', '甜甜的'],
    loveValue: 4
  }
]