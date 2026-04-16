# 樱花剑士 - 日式卡通风格 A-RPG 游戏框架

## 🎮 项目简介

这是一款日式卡通风格的动作角色扮演游戏（A-RPG）框架，采用纯 JavaScript 开发，无需任何外部依赖。游戏特色为 NPC 角色中 80% 为少女和年轻女性，20% 为男性。

## ✨ 核心特性

- **日式卡通风格画面**：清新可爱的视觉设计，粉色调为主
- **NPC 性别比例**：80% 女性（少女/年轻女性），20% 男性
- **完整的 A-RPG 系统**：
  - 玩家移动与战斗
  - NPC 对话系统（打字机效果）
  - 任务系统
  - 战斗系统
  - 经验值与升级
- **可视化脚本编辑器**：通过 UI 界面编辑 NPC 数据
- **数据持久化**：自动保存到浏览器本地存储
- **响应式设计**：支持桌面和移动端

## 📁 项目结构

```
/workspace
├── index.html              # 主页面
├── src/
│   ├── main.js            # 游戏入口
│   ├── core/
│   │   ├── game.js        # 游戏核心管理器
│   │   ├── renderer.js    # 渲染系统
│   │   └── input.js       # 输入系统
│   ├── entities/
│   │   ├── entity.js      # 基础实体类
│   │   ├── player.js      # 玩家类
│   │   └── npc.js         # NPC 类
│   ├── systems/
│   │   ├── dialogue.js    # 对话系统
│   │   ├── quest.js       # 任务系统
│   │   └── combat.js      # 战斗系统
│   ├── ui/
│   │   ├── styles.css     # 样式文件
│   │   ├── ui-manager.js  # UI 管理器
│   │   └── script-editor.js # 脚本编辑器
│   └── data/
│       └── npc-data.js    # NPC 数据配置
└── scripts/
    └── demo-script.js     # Demo 脚本
```

## 🚀 快速开始

### 方法一：直接打开
直接用浏览器打开 `index.html` 文件即可运行游戏。

### 方法二：使用本地服务器
```bash
# 使用 Python
cd /workspace
python -m http.server 8000

# 或使用 Node.js
npx serve /workspace
```

然后访问 `http://localhost:8000`

## 🎯 操作说明

| 按键 | 功能 |
|------|------|
| WASD / 方向键 | 移动角色 |
| 鼠标点击 | 移动到目标位置 |
| E 键 | 与 NPC 互动/对话 |
| ESC | 打开/关闭菜单 |
| 空格键 | 继续对话 |

## 🛠️ 脚本编辑器

点击主菜单的"脚本编辑器"按钮可以：

1. **查看 NPC 列表**：显示所有 NPC，带有性别标识
2. **添加新 NPC**：创建新的角色
3. **编辑 NPC**：
   - 名称
   - 性别（女性/男性）
   - 年龄组（少女/年轻女性/成年/长者）
   - 角色类型（任务发布者/商人/同伴/村民）
   - 对话内容
   - 相关任务
4. **删除 NPC**：移除不需要的角色
5. **保存/加载**：数据自动保存到浏览器

## 📊 NPC 性别比例

游戏严格遵守 80% 女性、20% 男性的比例：

- **女性角色类型**：
  - 少女（young）
  - 年轻女性（young-adult）
  
- **男性角色类型**：
  - 成年男性（adult）

默认包含 10 个 NPC：
- 8 名女性（樱子、美咲、千夏、由依、诗织、绫乃、优奈、遥）
- 2 名男性（健太、大辅）

## 🔧 扩展开发

### 添加新 NPC

在 `src/data/npc-data.js` 中添加：

```javascript
{
    id: 11,
    name: '新角色',
    gender: 'female',  // 或 'male'
    ageGroup: 'young',
    role: 'villager',
    dialogue: ['你好！'],
    quests: []
}
```

### 创建新任务

```javascript
{
    id: 'quest_003',
    name: '任务名称',
    description: '任务描述',
    conditions: [
        { type: 'kill', target: 5, current: 0 }
    ],
    rewards: { exp: 100, gold: 50 }
}
```

### 修改样式

编辑 `src/ui/styles.css` 来自定义外观。

## 💾 数据保存

游戏会自动将 NPC 数据保存到浏览器的 LocalStorage：
- 键名：`rpg_npc_data`
- 格式：JSON

可以通过脚本编辑器的导出功能备份数据。

## 🌟 后续开发建议

1. **美术资源**：替换 Canvas 绘图为精美 sprite
2. **地图系统**：添加多场景切换
3. **商店系统**：完善商人功能
4. **更多任务类型**：支线任务、日常任务
5. **成就系统**：记录和奖励
6. **音效音乐**：添加背景音乐和音效

## 📝 技术栈

- **语言**：HTML5 + CSS3 + JavaScript (ES6+)
- **渲染**：Canvas 2D API
- **存储**：LocalStorage
- **架构**：组件化设计

## 📄 License

MIT License

---

**享受你的日式 RPG 创作之旅！** 🌸⚔️
