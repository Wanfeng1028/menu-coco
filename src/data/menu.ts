import type { MenuItem, CategoryTab } from '@/types/order'

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

export const menuItems: MenuItem[] = [
  // ========== 家常菜 home ==========
  {
    id: 'cola-chicken-wings',
    name: '可乐鸡翅',
    category: 'home',
    categoryName: '家常菜',
    description: '甜甜咸咸，适合被投喂的一天',
    emoji: '🍗',
    tags: ['招牌', '常点', '甜甜', '肉肉'],
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
    tags: ['常点', '下饭', '清爽'],
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
    tags: ['甜甜', '推荐'],
    loveValue: 3
  },
  {
    id: 'shredded-potato',
    name: '土豆丝',
    category: 'home',
    categoryName: '家常菜',
    description: '酸辣开胃，永远的经典',
    emoji: '🥔',
    tags: ['常点', '下饭', '热乎'],
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
    tags: ['肉肉', '下饭', '推荐'],
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
    tags: ['甜甜', '清爽'],
    loveValue: 2
  },
  {
    id: 'scrambled-eggs-tomato',
    name: '番茄炒蛋',
    category: 'home',
    categoryName: '家常菜',
    description: '酸酸甜甜，永远不会出错的家常味道',
    emoji: '🍅',
    tags: ['招牌', '常点', '下饭'],
    loveValue: 4,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'green-pepper-potato',
    name: '青椒土豆丝',
    category: 'home',
    categoryName: '家常菜',
    description: '脆脆爽爽，配米饭一绝',
    emoji: '🫑',
    tags: ['下饭', '清爽'],
    loveValue: 3
  },
  {
    id: 'dry-pot-cauliflower',
    name: '干锅花菜',
    category: 'home',
    categoryName: '家常菜',
    description: '焦香入味，越嚼越香',
    emoji: '🥦',
    tags: ['下饭', '热乎', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'di-san-xian',
    name: '地三鲜',
    category: 'home',
    categoryName: '家常菜',
    description: '茄子土豆青椒，东北经典三兄弟',
    emoji: '🍆',
    tags: ['下饭', '招牌'],
    loveValue: 4,
    isPopular: true
  },
  {
    id: 'mapo-tofu',
    name: '麻婆豆腐',
    category: 'home',
    categoryName: '家常菜',
    description: '麻辣鲜香，嫩滑到心里',
    emoji: '🫕',
    tags: ['辣辣', '下饭', '热乎'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'braised-eggplant',
    name: '红烧茄子',
    category: 'home',
    categoryName: '家常菜',
    description: '软软糯糯，酱汁拌饭超好吃',
    emoji: '🍆',
    tags: ['下饭', '热乎'],
    loveValue: 3
  },
  {
    id: 'yu-xiang-shredded-pork',
    name: '鱼香肉丝',
    category: 'home',
    categoryName: '家常菜',
    description: '没有鱼的鱼香，但有肉丝的快乐',
    emoji: '🥢',
    tags: ['招牌', '下饭', '肉肉'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'kung-pao-chicken',
    name: '宫保鸡丁',
    category: 'home',
    categoryName: '家常菜',
    description: '花生酥脆鸡肉嫩，经典川味',
    emoji: '🥜',
    tags: ['招牌', '肉肉', '辣辣'],
    loveValue: 5,
    isRecommended: true
  },
  {
    id: 'tomato-beef-brisket',
    name: '西红柿牛腩',
    category: 'home',
    categoryName: '家常菜',
    description: '酸甜汤汁配上软烂牛腩，暖胃又暖心',
    emoji: '🍅',
    tags: ['热乎', '肉肉', '推荐'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'garlic-broccoli',
    name: '蒜蓉西兰花',
    category: 'home',
    categoryName: '家常菜',
    description: '翠绿清爽，吃肉也要配点青菜',
    emoji: '🥦',
    tags: ['清爽', '健康'],
    loveValue: 2
  },
  {
    id: 'sour-spicy-cabbage',
    name: '酸辣白菜',
    category: 'home',
    categoryName: '家常菜',
    description: '酸辣开胃，简单又好吃',
    emoji: '🥬',
    tags: ['辣辣', '下饭', '清爽'],
    loveValue: 2
  },
  {
    id: 'mushroom-greens',
    name: '香菇青菜',
    category: 'home',
    categoryName: '家常菜',
    description: '鲜香可口，清淡也好吃',
    emoji: '🍄',
    tags: ['清爽', '健康'],
    loveValue: 2
  },

  // ========== 肉肉专区 meat ==========
  {
    id: 'braised-pork',
    name: '红烧肉',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '软糯香香，今天就是要吃点肉肉',
    emoji: '🥓',
    tags: ['招牌', '肉肉', '下饭'],
    loveValue: 6,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'sweet-sour-ribs',
    name: '糖醋排骨',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '酸甜可口，啃排骨的快乐谁懂',
    emoji: '🍖',
    tags: ['招牌', '甜甜', '肉肉'],
    loveValue: 6,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'garlic-ribs',
    name: '蒜香排骨',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '蒜香四溢，外酥里嫩',
    emoji: '🧄',
    tags: ['肉肉', '推荐'],
    loveValue: 5
  },
  {
    id: 'black-pepper-beef',
    name: '黑椒牛柳',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '黑椒香气扑鼻，牛肉嫩到飞起',
    emoji: '🥩',
    tags: ['肉肉', '推荐'],
    loveValue: 6,
    isRecommended: true
  },
  {
    id: 'stir-fry-beef',
    name: '小炒黄牛肉',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '大火快炒，肉香四溢',
    emoji: '🥘',
    tags: ['肉肉', '下饭', '辣辣'],
    loveValue: 5
  },
  {
    id: 'spicy-chicken',
    name: '辣子鸡',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '辣椒里找鸡肉，越吃越上头',
    emoji: '🌶️',
    tags: ['辣辣', '肉肉'],
    loveValue: 5
  },
  {
    id: 'braised-chicken',
    name: '黄焖鸡',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '汤汁浓郁，配米饭绝了',
    emoji: '🍗',
    tags: ['常点', '肉肉', '下饭'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'orleans-wings',
    name: '奥尔良鸡翅',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '甜辣入味，追剧必备小翅膀',
    emoji: '🍗',
    tags: ['常点', '肉肉'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'pan-fried-chicken-breast',
    name: '香煎鸡胸肉',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '低脂又好吃，健身也要好好吃饭',
    emoji: '🥩',
    tags: ['健康', '肉肉'],
    loveValue: 3
  },
  {
    id: 'cumin-lamb',
    name: '孜然羊肉',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '孜然飘香，大口吃肉的幸福',
    emoji: '🐑',
    tags: ['肉肉', '招牌'],
    loveValue: 6,
    isRecommended: true
  },
  {
    id: 'mei-cai-kou-rou',
    name: '梅菜扣肉',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '肥而不腻，梅菜的香气刚刚好',
    emoji: '🥢',
    tags: ['肉肉', '下饭'],
    loveValue: 5
  },
  {
    id: 'potato-beef-stew',
    name: '土豆炖牛腩',
    category: 'meat',
    categoryName: '肉肉专区',
    description: '土豆软糯牛腩烂，暖暖的一锅',
    emoji: '🥔',
    tags: ['热乎', '肉肉', '推荐'],
    loveValue: 6,
    isPopular: true
  },

  // ========== 烧烤 bbq ==========
  {
    id: 'grilled-chicken-strip',
    name: '烤鸡柳',
    category: 'bbq',
    categoryName: '烧烤',
    description: '外焦里嫩，追剧必备',
    emoji: '🍖',
    tags: ['常点', '肉肉'],
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
    tags: ['招牌', '肉肉', '推荐'],
    loveValue: 5,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'grilled-lamb',
    name: '烤羊肉',
    category: 'bbq',
    categoryName: '烧烤',
    description: '孜然飘香，冬日暖胃',
    emoji: '🐑',
    tags: ['肉肉', '热乎'],
    loveValue: 4
  },
  {
    id: 'skewers',
    name: '烤串',
    category: 'bbq',
    categoryName: '烧烤',
    description: '万物皆可串，快乐加倍',
    emoji: '🍢',
    tags: ['常点', '肉肉', '夜宵'],
    loveValue: 4,
    isPopular: true
  },
  {
    id: 'grilled-chicken-wings',
    name: '烤鸡翅',
    category: 'bbq',
    categoryName: '烧烤',
    description: '皮脆肉嫩，一口一个',
    emoji: '🍗',
    tags: ['常点', '肉肉'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'grilled-pork-belly',
    name: '烤五花肉',
    category: 'bbq',
    categoryName: '烧烤',
    description: '滋滋冒油，包生菜吃绝了',
    emoji: '🥓',
    tags: ['肉肉', '推荐'],
    loveValue: 5,
    isRecommended: true
  },
  {
    id: 'grilled-beef-skewer',
    name: '烤牛肉串',
    category: 'bbq',
    categoryName: '烧烤',
    description: '一串接一串，根本停不下来',
    emoji: '🍢',
    tags: ['肉肉', '招牌'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'grilled-lamb-skewer',
    name: '烤羊肉串',
    category: 'bbq',
    categoryName: '烧烤',
    description: '香喷喷的夜宵快乐，适合馋嘴时刻',
    emoji: '🍢',
    tags: ['肉肉', '夜宵'],
    loveValue: 5
  },
  {
    id: 'grilled-rice-cake',
    name: '烤年糕',
    category: 'bbq',
    categoryName: '烧烤',
    description: '外脆里糯，刷上酱汁超好吃',
    emoji: '🍡',
    tags: ['甜甜', '夜宵'],
    loveValue: 3
  },
  {
    id: 'grilled-corn',
    name: '烤玉米',
    category: 'bbq',
    categoryName: '烧烤',
    description: '甜甜糯糯，烧烤必点',
    emoji: '🌽',
    tags: ['甜甜', '清爽'],
    loveValue: 2
  },
  {
    id: 'grilled-potato-slice',
    name: '烤土豆片',
    category: 'bbq',
    categoryName: '烧烤',
    description: '薄薄脆脆，撒上辣椒面绝了',
    emoji: '🥔',
    tags: ['夜宵', '下饭'],
    loveValue: 2
  },
  {
    id: 'grilled-enoki',
    name: '烤金针菇',
    category: 'bbq',
    categoryName: '烧烤',
    description: '蒜蓉金针菇，鲜到眉毛掉',
    emoji: '🍄',
    tags: ['清爽', '推荐'],
    loveValue: 3
  },
  {
    id: 'grilled-eggplant',
    name: '烤茄子',
    category: 'bbq',
    categoryName: '烧烤',
    description: '蒜蓉烤茄子，软糯入味',
    emoji: '🍆',
    tags: ['下饭', '夜宵'],
    loveValue: 3
  },
  {
    id: 'grilled-sausage',
    name: '烤香肠',
    category: 'bbq',
    categoryName: '烧烤',
    description: '外皮焦脆，小时候的味道',
    emoji: '🌭',
    tags: ['常点', '夜宵'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'grilled-squid',
    name: '烤鱿鱼',
    category: 'bbq',
    categoryName: '烧烤',
    description: 'Q弹鲜香，街边小吃之王',
    emoji: '🦑',
    tags: ['招牌', '夜宵'],
    loveValue: 4,
    isRecommended: true
  },

  // ========== 主食 staple ==========
  {
    id: 'rice',
    name: '米饭',
    category: 'staple',
    categoryName: '主食',
    description: '干饭人干饭魂，白米饭也是主角',
    emoji: '🍚',
    tags: ['主食', '常点'],
    loveValue: 2,
    isPopular: true
  },
  {
    id: 'fried-rice',
    name: '炒饭',
    category: 'staple',
    categoryName: '主食',
    description: '粒粒分明，锅气十足',
    emoji: '🍳',
    tags: ['主食', '推荐'],
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
    tags: ['主食', '热乎'],
    loveValue: 3
  },
  {
    id: 'dumplings',
    name: '饺子',
    category: 'staple',
    categoryName: '主食',
    description: '皮薄馅大，幸福的味道',
    emoji: '🥟',
    tags: ['主食', '招牌'],
    loveValue: 4,
    isPopular: true
  },
  {
    id: 'plain-rice',
    name: '白米饭',
    category: 'staple',
    categoryName: '主食',
    description: '白白胖胖，配什么都好吃',
    emoji: '🍚',
    tags: ['主食'],
    loveValue: 1
  },
  {
    id: 'egg-fried-rice',
    name: '蛋炒饭',
    category: 'staple',
    categoryName: '主食',
    description: '简单朴素，但永远吃不腻',
    emoji: '🍳',
    tags: ['主食', '常点'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'yangzhou-fried-rice',
    name: '扬州炒饭',
    category: 'staple',
    categoryName: '主食',
    description: '料足饭香，经典中的经典',
    emoji: '🍳',
    tags: ['主食', '招牌', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'beef-fried-rice',
    name: '牛肉炒饭',
    category: 'staple',
    categoryName: '主食',
    description: '大块牛肉配上粒粒米饭，满足感拉满',
    emoji: '🥩',
    tags: ['主食', '肉肉'],
    loveValue: 4
  },
  {
    id: 'tomato-egg-noodles',
    name: '番茄鸡蛋面',
    category: 'staple',
    categoryName: '主食',
    description: '酸甜汤底，暖暖的一碗面',
    emoji: '🍅',
    tags: ['主食', '热乎'],
    loveValue: 3
  },
  {
    id: 'beef-noodles',
    name: '牛肉面',
    category: 'staple',
    categoryName: '主食',
    description: '大块牛肉配上劲道面条，嗦面的快乐',
    emoji: '🍜',
    tags: ['主食', '肉肉', '招牌'],
    loveValue: 5,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'zhajiang-noodles',
    name: '炸酱面',
    category: 'staple',
    categoryName: '主食',
    description: '浓郁酱香，拌一拌超好吃',
    emoji: '🍝',
    tags: ['主食', '下饭'],
    loveValue: 3
  },
  {
    id: 'sour-spicy-noodles',
    name: '酸辣粉',
    category: 'staple',
    categoryName: '主食',
    description: '酸酸辣辣，嗦粉的快乐',
    emoji: '🍜',
    tags: ['主食', '辣辣'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'wonton',
    name: '馄饨',
    category: 'staple',
    categoryName: '主食',
    description: '皮薄馅嫩，汤鲜味美',
    emoji: '🥟',
    tags: ['主食', '热乎'],
    loveValue: 3
  },
  {
    id: 'boiled-dumplings',
    name: '水饺',
    category: 'staple',
    categoryName: '主食',
    description: '热腾腾的饺子，蘸醋吃绝了',
    emoji: '🥟',
    tags: ['主食', '热乎', '常点'],
    loveValue: 4
  },
  {
    id: 'xiaolongbao',
    name: '小笼包',
    category: 'staple',
    categoryName: '主食',
    description: '轻轻提慢慢移，先开窗后喝汤',
    emoji: '🥟',
    tags: ['主食', '招牌', '推荐'],
    loveValue: 5,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'egg-pancake',
    name: '鸡蛋灌饼',
    category: 'staple',
    categoryName: '主食',
    description: '外酥里嫩，早餐的快乐',
    emoji: '🥞',
    tags: ['主食', '常点'],
    loveValue: 3
  },

  // ========== 小吃夜宵 snack ==========
  {
    id: 'fried-chicken-nuggets',
    name: '炸鸡块',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '外酥里嫩，蘸酱更好吃',
    emoji: '🍗',
    tags: ['常点', '肉肉'],
    loveValue: 4,
    isPopular: true
  },
  {
    id: 'french-fries',
    name: '薯条',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '脆脆的快乐，番茄酱绝配',
    emoji: '🍟',
    tags: ['常点', '推荐'],
    loveValue: 3,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'popcorn-chicken',
    name: '鸡米花',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '一口一个，追剧必备',
    emoji: '🍿',
    tags: ['肉肉', '夜宵'],
    loveValue: 3
  },
  {
    id: 'grab-cake',
    name: '手抓饼',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '层层酥脆，加什么都好吃',
    emoji: '🥞',
    tags: ['常点', '夜宵'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'takoyaki',
    name: '章鱼小丸子',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '外脆里嫩，木鱼花跳舞',
    emoji: '🐙',
    tags: ['招牌', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'wolf-tooth-potato',
    name: '狼牙土豆',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '香辣入味，街边小吃之王',
    emoji: '🥔',
    tags: ['辣辣', '夜宵'],
    loveValue: 3
  },
  {
    id: 'oden',
    name: '关东煮',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '热乎乎的汤，暖胃又暖心',
    emoji: '🍢',
    tags: ['热乎', '常点'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'fried-skewers',
    name: '炸串拼盘',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '万物皆可炸，快乐加倍',
    emoji: '🍢',
    tags: ['夜宵', '肉肉'],
    loveValue: 4
  },
  {
    id: 'ham-sausage',
    name: '火腿肠',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '童年回忆，炸一下更好吃',
    emoji: '🌭',
    tags: ['夜宵'],
    loveValue: 2
  },
  {
    id: 'malatang',
    name: '麻辣烫',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '想吃什么烫什么，自由搭配',
    emoji: '🫕',
    tags: ['热乎', '辣辣', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'luosifen',
    name: '螺蛳粉',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '闻着臭吃着香，上头的快乐',
    emoji: '🍜',
    tags: ['辣辣', '招牌'],
    loveValue: 4,
    isPopular: true
  },
  {
    id: 'fried-rice-cake',
    name: '炸年糕',
    category: 'snack',
    categoryName: '小吃夜宵',
    description: '外脆里糯，刷上甜辣酱',
    emoji: '🍡',
    tags: ['甜甜', '夜宵'],
    loveValue: 3
  },

  // ========== 饮料 drink ==========
  {
    id: 'milk-tea',
    name: '奶茶',
    category: 'drink',
    categoryName: '饮料',
    description: '快乐续命水，点了心情会变好',
    emoji: '🧋',
    tags: ['招牌', '甜甜', '饮料'],
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
    tags: ['常点', '饮料'],
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
    tags: ['清爽', '饮料'],
    loveValue: 3
  },
  {
    id: 'yogurt',
    name: '酸奶',
    category: 'drink',
    categoryName: '饮料',
    description: '饭后来一杯，肠胃笑嘻嘻',
    emoji: '🥛',
    tags: ['健康', '饮料'],
    loveValue: 2
  },
  {
    id: 'pearl-milk-tea',
    name: '珍珠奶茶',
    category: 'drink',
    categoryName: '饮料',
    description: 'QQ弹弹的珍珠，嚼着喝更快乐',
    emoji: '🧋',
    tags: ['招牌', '甜甜', '饮料'],
    loveValue: 5,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'taro-milk-tea',
    name: '芋泥奶茶',
    category: 'drink',
    categoryName: '饮料',
    description: '绵密芋泥配上奶茶，双倍快乐',
    emoji: '🧋',
    tags: ['甜甜', '饮料', '推荐'],
    loveValue: 5,
    isRecommended: true
  },
  {
    id: 'mango-pomelo-sago',
    name: '杨枝甘露',
    category: 'drink',
    categoryName: '饮料',
    description: '芒果西柚西米露，夏天的味道',
    emoji: '🥭',
    tags: ['甜甜', '饮料', '招牌'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'lemon-tea',
    name: '柠檬茶',
    category: 'drink',
    categoryName: '饮料',
    description: '酸酸甜甜，解腻神器',
    emoji: '🍋',
    tags: ['清爽', '饮料'],
    loveValue: 3
  },
  {
    id: 'iced-cola',
    name: '冰可乐',
    category: 'drink',
    categoryName: '饮料',
    description: '加冰的快乐，气泡在跳舞',
    emoji: '🥤',
    tags: ['常点', '饮料'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'orange-juice',
    name: '橙汁',
    category: 'drink',
    categoryName: '饮料',
    description: '鲜榨维C，活力满满',
    emoji: '🍊',
    tags: ['健康', '饮料'],
    loveValue: 2
  },
  {
    id: 'strawberry-yogurt',
    name: '草莓酸奶',
    category: 'drink',
    categoryName: '饮料',
    description: '草莓的甜配上酸奶的醇，完美',
    emoji: '🍓',
    tags: ['甜甜', '饮料', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'grape-bobo',
    name: '葡萄啵啵',
    category: 'drink',
    categoryName: '饮料',
    description: '葡萄果肉加上Q弹啵啵，好喝到转圈',
    emoji: '🍇',
    tags: ['甜甜', '饮料'],
    loveValue: 4
  },
  {
    id: 'peach-oolong',
    name: '蜜桃乌龙',
    category: 'drink',
    categoryName: '饮料',
    description: '蜜桃香气配上乌龙茶底，清新不腻',
    emoji: '🍑',
    tags: ['清爽', '饮料', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'hot-milk',
    name: '热牛奶',
    category: 'drink',
    categoryName: '饮料',
    description: '睡前一杯，晚安好梦',
    emoji: '🥛',
    tags: ['健康', '饮料', '热乎'],
    loveValue: 2
  },
  {
    id: 'iced-americano',
    name: '冰美式',
    category: 'drink',
    categoryName: '饮料',
    description: '打工人的续命水，苦中作乐',
    emoji: '☕',
    tags: ['饮料', '常点'],
    loveValue: 3
  },
  {
    id: 'multi-meat-grape',
    name: '多肉葡萄',
    category: 'drink',
    categoryName: '饮料',
    description: '满满的葡萄果肉，喝到就是赚到',
    emoji: '🍇',
    tags: ['甜甜', '饮料', '招牌'],
    loveValue: 5,
    isPopular: true
  },

  // ========== 甜品 dessert ==========
  {
    id: 'strawberry-cake',
    name: '草莓蛋糕',
    category: 'dessert',
    categoryName: '甜品',
    description: '甜甜的草莓配上奶油，恋爱的味道',
    emoji: '🍰',
    tags: ['甜甜', '推荐'],
    loveValue: 5,
    isRecommended: true
  },
  {
    id: 'tiramisu',
    name: '提拉米苏',
    category: 'dessert',
    categoryName: '甜品',
    description: '带我走，甜蜜的意大利浪漫',
    emoji: '🍰',
    tags: ['甜甜', '招牌'],
    loveValue: 5,
    isPopular: true
  },
  {
    id: 'mango-crepe',
    name: '芒果班戟',
    category: 'dessert',
    categoryName: '甜品',
    description: '薄薄的皮包着大块芒果，超满足',
    emoji: '🥭',
    tags: ['甜甜', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'egg-tart',
    name: '蛋挞',
    category: 'dessert',
    categoryName: '甜品',
    description: '酥酥脆脆，嫩滑香甜',
    emoji: '🥧',
    tags: ['甜甜', '常点'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'double-skin-milk',
    name: '双皮奶',
    category: 'dessert',
    categoryName: '甜品',
    description: '滑嫩如丝，甜到心里',
    emoji: '🍮',
    tags: ['甜甜', '招牌'],
    loveValue: 4
  },
  {
    id: 'pudding',
    name: '布丁',
    category: 'dessert',
    categoryName: '甜品',
    description: 'Q弹可爱，一口一个',
    emoji: '🍮',
    tags: ['甜甜'],
    loveValue: 3
  },
  {
    id: 'ice-cream',
    name: '冰淇淋',
    category: 'dessert',
    categoryName: '甜品',
    description: '凉凉甜甜，夏天的快乐',
    emoji: '🍦',
    tags: ['甜甜', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'red-bean-rice-ball',
    name: '红豆小丸子',
    category: 'dessert',
    categoryName: '甜品',
    description: '软糯小丸子配上甜蜜红豆',
    emoji: '🍡',
    tags: ['甜甜', '热乎'],
    loveValue: 3
  },
  {
    id: 'taro-grass-jelly',
    name: '芋圆烧仙草',
    category: 'dessert',
    categoryName: '甜品',
    description: 'QQ芋圆配上清凉仙草，夏日必备',
    emoji: '🍨',
    tags: ['甜甜', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'cream-puff',
    name: '奶油泡芙',
    category: 'dessert',
    categoryName: '甜品',
    description: '咬一口奶油爆浆，幸福感爆棚',
    emoji: '🥐',
    tags: ['甜甜'],
    loveValue: 3
  },

  // ========== 健康清淡 light ==========
  {
    id: 'vegetable-salad',
    name: '蔬菜沙拉',
    category: 'light',
    categoryName: '健康清淡',
    description: '清爽无负担，健康每一天',
    emoji: '🥗',
    tags: ['健康', '轻食', '清爽'],
    loveValue: 2
  },
  {
    id: 'chicken-breast-salad',
    name: '鸡胸肉沙拉',
    category: 'light',
    categoryName: '健康清淡',
    description: '低脂高蛋白，健身党的最爱',
    emoji: '🥗',
    tags: ['健康', '轻食', '肉肉'],
    loveValue: 3
  },
  {
    id: 'seaweed-egg-soup',
    name: '紫菜蛋花汤',
    category: 'light',
    categoryName: '健康清淡',
    description: '清淡鲜美，暖胃首选',
    emoji: '🥣',
    tags: ['热乎', '健康'],
    loveValue: 2
  },
  {
    id: 'corn-ribs-soup',
    name: '玉米排骨汤',
    category: 'light',
    categoryName: '健康清淡',
    description: '甜甜的玉米配上鲜美的排骨',
    emoji: '🌽',
    tags: ['热乎', '健康', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'tomato-tofu-soup',
    name: '番茄豆腐汤',
    category: 'light',
    categoryName: '健康清淡',
    description: '酸甜开胃，豆腐嫩滑',
    emoji: '🍅',
    tags: ['热乎', '健康'],
    loveValue: 2
  },
  {
    id: 'boiled-shrimp',
    name: '白灼虾',
    category: 'light',
    categoryName: '健康清淡',
    description: '原汁原味，蘸酱油就很鲜',
    emoji: '🦐',
    tags: ['健康', '清爽', '推荐'],
    loveValue: 4,
    isRecommended: true
  },
  {
    id: 'steamed-fish',
    name: '清蒸鱼',
    category: 'light',
    categoryName: '健康清淡',
    description: '鲜嫩可口，清淡也美味',
    emoji: '🐟',
    tags: ['健康', '清爽'],
    loveValue: 3
  },
  {
    id: 'steamed-egg',
    name: '蒸蛋',
    category: 'light',
    categoryName: '健康清淡',
    description: '滑嫩如布丁，入口即化',
    emoji: '🥚',
    tags: ['健康', '常点'],
    loveValue: 2
  },
  {
    id: 'pumpkin-porridge',
    name: '南瓜粥',
    category: 'light',
    categoryName: '健康清淡',
    description: '甜甜糯糯，养胃又好喝',
    emoji: '🎃',
    tags: ['健康', '甜甜', '热乎'],
    loveValue: 2
  },
  {
    id: 'millet-porridge',
    name: '小米粥',
    category: 'light',
    categoryName: '健康清淡',
    description: '暖暖的一碗，胃舒服了人也舒服了',
    emoji: '🥣',
    tags: ['健康', '热乎'],
    loveValue: 2
  },

  // ========== 隐藏彩蛋 special ==========
  {
    id: 'dont-know-what-to-eat',
    name: '不知道吃什么',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '没关系，小鸡毛来安排',
    emoji: '🤷‍♀️',
    tags: ['惊喜', '不知道吃啥'],
    loveValue: 3,
    isPopular: true
  },
  {
    id: 'want-to-be-coaxed',
    name: '今天想被哄',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '这不是菜，但男朋友必须收到信号',
    emoji: '🥺',
    tags: ['哄哄', '惊喜'],
    loveValue: 9,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'whatever-but-delicious',
    name: '随便但要好吃',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '经典难题，交给男朋友解决',
    emoji: '😋',
    tags: ['不知道吃啥', '惊喜'],
    loveValue: 5,
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'want-meat',
    name: '想吃肉肉',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '肉食动物的快乐，安排！',
    emoji: '🤤',
    tags: ['肉肉', '惊喜'],
    loveValue: 6
  },
  {
    id: 'want-spicy',
    name: '想吃辣的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '无辣不欢，今天要过瘾',
    emoji: '🌶️',
    tags: ['辣辣', '惊喜'],
    loveValue: 4
  },
  {
    id: 'want-sweet',
    name: '想吃甜的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '甜蜜暴击，今日份糖分拉满',
    emoji: '🍰',
    tags: ['甜甜', '惊喜'],
    loveValue: 5
  },
  {
    id: 'want-cold',
    name: '想喝冰冰的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '夏天就是要喝冰的，安排！',
    emoji: '🧊',
    tags: ['饮料', '惊喜'],
    loveValue: 3
  },
  {
    id: 'want-praise',
    name: '想要夸夸',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '不只是吃饭，还要听好听的话',
    emoji: '💕',
    tags: ['哄哄', '惊喜'],
    loveValue: 8
  },
  {
    id: 'no-decision-today',
    name: '今天不想做决定',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '选择困难症发作，男朋友来选',
    emoji: '😵‍💫',
    tags: ['不知道吃啥', '惊喜'],
    loveValue: 4,
    isPopular: true
  },
  {
    id: 'boyfriend-choice',
    name: '男朋友自由发挥',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '完全信任，你做什么我吃什么',
    emoji: '💝',
    tags: ['惊喜', '推荐'],
    loveValue: 7,
    isRecommended: true
  },
  {
    id: 'want-surprise',
    name: '要一个惊喜',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '不要告诉我吃什么，端上来就好',
    emoji: '🎁',
    tags: ['惊喜'],
    loveValue: 8
  },
  {
    id: 'want-your-favorite',
    name: '想吃你觉得好吃的',
    category: 'special',
    categoryName: '隐藏彩蛋',
    description: '你最爱的就是我最爱的',
    emoji: '🥰',
    tags: ['惊喜', '推荐'],
    loveValue: 9,
    isRecommended: true
  }
]
