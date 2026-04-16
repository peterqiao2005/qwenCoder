/**
 * Demo 脚本 - 展示游戏功能
 * 包含任务系统和战斗系统的示例
 */

// 等待游戏初始化后执行
function initDemoScript() {
    if (!game) {
        setTimeout(initDemoScript, 100);
        return;
    }
    
    console.log('Demo 脚本加载...');
    
    // 添加演示任务
    addDemoQuests();
    
    // 添加演示敌人
    addDemoEnemies();
    
    console.log('Demo 脚本初始化完成！');
}

// 添加演示任务
function addDemoQuests() {
    if (!game.quest) return;
    
    // 任务 1: 收集樱花花瓣
    const quest1 = game.quest.createQuest({
        id: 'demo_quest_1',
        name: '收集樱花花瓣',
        description: '为樱子收集 5 片樱花花瓣制作项链。',
        giver: 'sakura_001',
        conditions: [
            { type: 'collect', target: 5, current: 0, item: '樱花花瓣' }
        ],
        rewards: { exp: 300, gold: 150, items: ['樱花项链'] }
    });
    game.quest.addQuest(quest1);
    
    // 任务 2: 讨伐史莱姆
    const quest2 = game.quest.createQuest({
        id: 'demo_quest_2',
        name: '讨伐史莱姆',
        description: '消灭森林里的 3 只史莱姆。',
        giver: 'yuki_006',
        conditions: [
            { type: 'kill', target: 3, current: 0, enemy: '史莱姆' }
        ],
        rewards: { exp: 500, gold: 200 }
    });
    game.quest.addQuest(quest2);
    
    // 任务 3: 送达信件
    const quest3 = game.quest.createQuest({
        id: 'demo_quest_3',
        name: '送达信件',
        description: '将美咲的信交给由依。',
        giver: 'yuki_002',
        conditions: [
            { type: 'talk', talked: false, target: 'akane_004' }
        ],
        rewards: { exp: 100, gold: 50 }
    });
    game.quest.addQuest(quest3);
    
    console.log('添加了 3 个演示任务');
}

// 添加演示敌人
function addDemoEnemies() {
    // 定义敌人类型
    game.enemyTypes = {
        'slime': {
            name: '史莱姆',
            hp: 50,
            maxHp: 50,
            attack: 10,
            defense: 2,
            expReward: 50,
            goldReward: 20,
            sprite: '💧'
        },
        'wolf': {
            name: '森林狼',
            hp: 80,
            maxHp: 80,
            attack: 15,
            defense: 5,
            expReward: 100,
            goldReward: 50,
            sprite: '🐺'
        },
        'goblin': {
            name: '哥布林',
            hp: 60,
            maxHp: 60,
            attack: 12,
            defense: 3,
            expReward: 70,
            goldReward: 30,
            sprite: '👺'
        }
    };
    
    console.log('定义了敌人类型：史莱姆、森林狼、哥布林');
}

// 模拟遭遇战斗
function triggerRandomEncounter() {
    if (!game.combat || !game.enemyTypes) return;
    
    const enemyTypes = Object.keys(game.enemyTypes);
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyTemplate = game.enemyTypes[randomType];
    
    // 创建敌人实例
    const enemy = {
        ...enemyTemplate,
        id: Date.now(),
        x: game.player.x + 100,
        y: game.player.y,
        attackCooldown: 0,
        attackRange: 80,
        attackSpeed: 1500
    };
    
    // 开始战斗
    game.combat.startCombat([enemy]);
    
    if (game.combatUI) {
        game.combatUI.show([enemy]);
    }
    
    console.log(`遭遇了${enemy.name}！`);
}

// 测试函数：触发教学对话
function triggerTutorialDialogue() {
    if (!game.npcs || game.npcs.length === 0) return;
    
    const tutorialNPC = game.npcs[0]; // 第一个 NPC
    if (tutorialNPC) {
        game.dialogueSystem.startDialogue(tutorialNPC);
    }
}

// 自动启动 demo 脚本
initDemoScript();

// 在控制台暴露一些调试函数
window.debugFunctions = {
    triggerEncounter: triggerRandomEncounter,
    triggerDialogue: triggerTutorialDialogue,
    showQuests: () => { if (game.questUI) game.questUI.show(); }
};

console.log('调试函数已加载，可在控制台使用 debugFunctions.triggerEncounter() 等');
