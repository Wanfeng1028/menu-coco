# 🍽️ Coco 宝宝专属点餐站

一个可爱的前端点餐小网页，让她打开就能选菜、填备注、提交订单，你会收到邮件提醒。

## ✨ 功能清单

1. **可爱首页** - 欢迎卡片、服务提示、搜索框
2. **快捷入口** - 今日推荐、想吃肉肉、想喝饮料、不知道吃啥、想被哄、随便安排
3. **丰富菜单** - 120+ 道菜品，12 个分类（家常菜、肉肉专区、烧烤、主食、小吃夜宵、饮料、甜品、健康清淡、汤粥、早餐、隐藏彩蛋）
4. **搜索功能** - 支持菜名、分类、描述、标签搜索
5. **购物车** - 加减数量、清空、localStorage 持久化
6. **随机推荐** - 智能搭配推荐，换一组、一键加入
7. **猜你喜欢** - 基于热门和推荐展示
8. **订单表单** - 昵称、吃饭时间、辣度、获取方式、心情、备注
9. **EmailJS 邮件通知** - 发送给男朋友
10. **订单完成页** - 订单详情、投喂进度、复制订单
11. **订单失败页** - 友好错误提示、重试、复制
12. **订单历史** - 本地保存、查看详情、再来一单、清空历史
13. **移动端优先** - 桌面端居中手机容器（max-width 480px）
14. **餐次分类** - 早安投喂、中午吃饱、晚上好好吃、偷偷加餐，根据当前时间自动默认选择
15. **定时点餐** - 预约投喂时间，支持现在就想吃、半小时后、一小时后、指定时间

## 🍳 餐次分类

支持早餐、午餐、晚餐、夜宵四个餐次筛选：
- 🌅 早安投喂
- ☀️ 中午吃饱
- 🌙 晚上好好吃
- 🌃 偷偷加餐

根据当前时间自动默认选择餐次。

## ⏰ 定时点餐

支持预约投喂时间：
- 现在就想吃
- 半小时后
- 一小时后
- 指定时间

### 当前版本定时规则
- 订单提交后邮件**立即发送**
- 邮件里包含预约投喂时间
- 成功页显示倒计时
- ⚠️ 浏览器关闭后不会继续执行前端倒计时

### 后续升级方案
如需真正的定时提醒，需要：
- Vercel Function + Vercel Cron
- 数据库存储订单
- 到点再发邮件 / GitHub Issue / 微信提醒

## 🛠️ 技术栈

- Vite + Vue 3 + TypeScript
- SCSS (variables + global styles)
- EmailJS (@emailjs/browser)
- localStorage
- 移动端优先响应式设计

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 📦 打包构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

## 📧 EmailJS 配置

1. 注册 [EmailJS](https://www.emailjs.com/)
2. 创建 Email Service 和 Email Template
3. 复制 `.env.example` 为 `.env`
4. 填入你的 EmailJS 配置：

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Email Template 变量

| 变量 | 说明 |
|------|------|
| `{{to_name}}` | 收件人 |
| `{{from_name}}` | 宝宝昵称 |
| `{{menu_list}}` | 菜品列表 |
| `{{meal_time}}` | 吃饭时间 |
| `{{spicy_level}}` | 辣度 |
| `{{delivery_type}}` | 获取方式 |
| `{{mood}}` | 心情 |
| `{{note}}` | 备注 |
| `{{order_time}}` | 下单时间 |
| `{{subject}}` | 邮件主题 |

## 🍜 如何新增菜品

编辑 `src/data/menu.ts`，在对应分类数组中添加：

```typescript
{
  id: 'unique-id',
  name: '菜品名称',
  category: 'home',        // 分类 key
  categoryName: '家常菜',  // 分类显示名
  description: '可爱的描述',
  emoji: '🍕',
  tags: ['标签1', '标签2'],
  loveValue: 5,            // 1-9
  isPopular: true,         // 可选
  isRecommended: true      // 可选
}
```

**可用分类：** home, meat, bbq, staple, snack, drink, dessert, light, soup, breakfast, special

## 🚢 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 如果使用了 EmailJS，在 Vercel Dashboard → Settings → Environment Variables 添加环境变量
4. 每次 push 自动部署

### 其他平台

`npm run build` 后将 `dist/` 目录部署到任何静态托管服务。

## 📝 如何提交代码

```bash
# 添加所有更改
git add .

# 提交
git commit -m "feat: 描述你的改动"

# 推送到远端
git push origin main
```

## 📁 项目结构

```
src/
├── components/          # Vue 组件
│   ├── AppHeader.vue
│   ├── WelcomeCard.vue
│   ├── TopTipBar.vue
│   ├── ShopStatusCard.vue
│   ├── SearchBar.vue
│   ├── QuickActions.vue
│   ├── BenefitCards.vue
│   ├── FavoriteSection.vue
│   ├── CategoryTabs.vue
│   ├── MenuCard.vue
│   ├── ShopMenuLayout.vue
│   ├── StickyCartBar.vue
│   ├── CartPanel.vue
│   ├── OrderForm.vue
│   ├── RandomRecommend.vue
│   ├── SuccessModal.vue
│   ├── OrderSuccessPage.vue
│   ├── OrderFailCard.vue
│   └── OrderHistory.vue
├── data/
│   └── menu.ts          # 菜单数据（120+ 道菜）
├── styles/
│   ├── variables.scss   # SCSS 变量
│   └── global.scss      # 全局样式
├── types/
│   └── order.ts         # TypeScript 类型定义
├── utils/
│   ├── email.ts         # EmailJS 邮件发送
│   ├── storage.ts       # localStorage 存储
│   ├── order.ts         # 订单工具函数
│   └── time.ts          # 时间工具函数
├── App.vue              # 根组件
└── main.ts              # 入口文件
```

## License

MIT
