/**
 * Demo 脚本
 * 展示游戏基本功能和 NPC 互动
 */

// Demo 场景配置
const DemoScript = {
    title: '樱花剑士 - Demo',
    version: '1.0.0',
    description: '日式卡通风格 A-RPG 游戏演示',
    
    // 初始场景
    startScene: function(game) {
        console.log('=== 欢迎游玩樱花剑士 Demo ===');
        console.log('操作说明：');
        console.log('- WASD 或方向键：移动角色');
        console.log('- 鼠标点击：移动到目标位置');
        console.log('- E 键：与 NPC 互动');
        console.log('- ESC：打开/关闭菜单');
        console.log('- 空格键：继续对话');
        
        // 显示欢迎消息
        setTimeout(() => {
            alert('欢迎来到樱花剑士！\n\n这是一个日式卡通风格的 A-RPG 游戏。\n\n点击"开始游戏"按钮开始冒险！');
        }, 500);
    },
    
    // Demo 任务流程
    demoQuests: [
        {
            id: 'demo_001',
            name: '初见樱子',
            description: '与村口的少女樱子交谈',
            steps: [
                '找到站在村口的粉色头发少女',
                '按下 E 键与她对话',
                '听完她的请求'
            ],
            rewards: { exp: 50, gold: 20 }
        },
        {
            id: 'demo_002',
            name: '拜访商人',
            description: '去美咲的商店看看',
            steps: [
                '找到蓝色衣服的商人美咲',
                '与她对话了解商品信息'
            ],
            rewards: { exp: 30, gold: 10 }
        },
        {
            id: 'demo_003',
            name: '认识村民',
            description: '与至少 3 位村民交谈',
            steps: [
                '在村子里四处走走',
                '与遇到的村民对话',
                '了解村子的情况'
            ],
            rewards: { exp: 100, gold: 50 }
        }
    ],
    
    // Demo NPC 互动示例
    demoDialogues: {
        'sakurako_intro': [
            '你好呀！我是樱子。',
            '你是新来的冒险者吧？',
            '欢迎来到樱花村！',
            '这里是个和平的地方，但最近...',
            '算了，没什么。祝你旅途愉快！'
        ],
        'misaki_shop': [
            '欢迎光临！',
            '我这里有各种商品哦。',
            '虽然现在还不能买卖...',
            '但是以后一定会开放的！',
            '敬请期待~'
        ],
        'villager_greeting': [
            '今天天气真好呢！',
            '村子里的生活很平静。',
            '偶尔会有冒险者来访，真让人羡慕。',
            '你也想去冒险吗？'
        ]
    },
    
    // 运行 Demo
    run: function(game) {
        this.startScene(game);
        
        // 设置 Demo NPC
        if (game && game.npcData) {
            console.log(`加载了${game.npcData.length}个 NPC`);
            
            // 统计性别比例
            const femaleCount = game.npcData.filter(n => n.gender === 'female').length;
            const maleCount = game.npcData.filter(n => n.gender === 'male').length;
            const total = game.npcData.length;
            
            console.log('NPC 性别比例:');
            console.log(`- 女性：${femaleCount}人 (${Math.round(femaleCount/total*100)}%)`);
            console.log(`- 男性：${maleCount}人 (${Math.round(maleCount/total*100)}%)`);
        }
        
        console.log('=== Demo 准备就绪 ===');
    }
};

// 自动运行 Demo（当页面加载完成时）
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，准备启动游戏...');
    
    // 可以在这里添加额外的初始化逻辑
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemoScript;
}
