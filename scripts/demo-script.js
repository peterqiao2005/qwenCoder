/**
 * Demo 脚本 - 展示游戏功能
 * 包含任务系统和战斗系统的示例
 * 为特定 NPC 绑定交互逻辑
 */

// 等待游戏初始化后执行
function initDemoScript() {
    if (!game) {
        setTimeout(initDemoScript, 100);
        return;
    }
    
    console.log('Demo 脚本加载...');
    
    // 添加演示敌人类型
    addDemoEnemies();
    
    // 为 NPC 绑定交互逻辑
    bindNPCLogic();
    
    console.log('Demo 脚本初始化完成！');
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

// 为 NPC 绑定交互逻辑
function bindNPCLogic() {
    if (!game.npcManager || !game.npcManager.npcs) return;
    
    const npcList = game.npcManager.npcs;
    
    npcList.forEach(npc => {
        // 根据名字覆盖特定的交互逻辑
        if (npc.name === "Takeshi" || npc.name.includes("健")) {
            // --- 铁匠：战斗教学 ---
            npc.onInteract = function(gameInstance) {
                const hasMet = gameInstance.variables['met_blacksmith'];
                
                if (!hasMet) {
                    gameInstance.variables['met_blacksmith'] = true;
                    // 先显示对话
                    gameInstance.dialogueSystem.startDialogue(this);
                    // 延迟触发战斗
                    setTimeout(() => {
                        if (gameInstance.dialogueSystem) {
                            gameInstance.dialogueSystem.closeDialogue();
                        }
                        if (gameInstance.combatSystem) {
                            gameInstance.combatSystem.startCombat('slime');
                        }
                    }, 2000);
                } else {
                    // 已经打过，只显示普通对话
                    gameInstance.dialogueSystem.startDialogue(this);
                }
            };

        } else if (npc.name === "Reina" || npc.name.includes("玲奈") || npc.name.includes("猎人")) {
            // --- 猎人：任务发布与完成 ---
            npc.onInteract = function(gameInstance) {
                const questId = 'quest_hunt_slimes';
                const quest = gameInstance.questManager.getQuest(questId);
                
                // 状态机逻辑
                if (!quest) {
                    // 没有任务 -> 发布任务
                    gameInstance.questManager.addQuest({
                        id: questId,
                        title: "史莱姆讨伐战",
                        description: "帮助猎人玲奈打败 3 只史莱姆。",
                        type: "kill",
                        target: "slime",
                        goal: 3,
                        progress: 0,
                        reward: { exp: 200, gold: 50 },
                        onComplete: () => {
                            alert("任务完成！获得 200 经验值和 50 金币。");
                            gameInstance.variables['reina_quest_status'] = 'completed';
                        }
                    });
                    gameInstance.variables['reina_quest_status'] = 'accepted';
                    console.log('接受了任务：史莱姆讨伐战');
                } else if (quest.completed && !quest.claimed) {
                    // 任务完成但未领取奖励
                    gameInstance.questManager.completeQuest(questId);
                    gameInstance.variables['reina_quest_status'] = 'completed';
                    console.log('完成任务：史莱姆讨伐战');
                }
                
                // 显示对话
                gameInstance.dialogueSystem.startDialogue(this);
            };

        } else if (npc.name === "Jiro" || npc.name.includes("次郎") || npc.name.includes("村长")) {
            // --- 村长：收集任务 (模拟) ---
            npc.onInteract = function(gameInstance) {
                const questId = 'quest_sakura_water';
                const quest = gameInstance.questManager.getQuest(questId);
                const status = gameInstance.variables['jiro_quest_status'];

                if (!quest && !status) {
                    // 发布任务
                    gameInstance.questManager.addQuest({
                        id: questId,
                        title: "寻找生命之水",
                        description: "为村长寻找恢复樱花树的生命之水。",
                        type: "collect",
                        target: "holy_water",
                        goal: 1,
                        progress: 0,
                        reward: { exp: 500, gold: 200 },
                        onComplete: () => {
                            alert("任务完成！获得 500 经验值和 200 金币。");
                            gameInstance.variables['jiro_quest_status'] = 'completed';
                        }
                    });
                    gameInstance.variables['jiro_quest_status'] = 'accepted';
                    console.log('接受了任务：寻找生命之水');
                    
                    // 为了演示，自动完成任务
                    setTimeout(() => {
                         gameInstance.questManager.completeQuest(questId);
                         gameInstance.variables['jiro_quest_status'] = 'completed';
                         if (gameInstance.dialogueSystem) {
                             gameInstance.dialogueSystem.closeDialogue();
                         }
                         setTimeout(() => {
                             gameInstance.dialogueSystem.startDialogue(this);
                         }, 500);
                    }, 2000);

                } else if (status === 'completed') {
                    // 已完成
                    console.log('任务已完成');
                }
                
                gameInstance.dialogueSystem.startDialogue(this);
            };
        } else {
            // --- 其他 NPC：通用逻辑 ---
            npc.onInteract = function(gameInstance) {
                gameInstance.dialogueSystem.startDialogue(this);
            };
        }
    });
    
    console.log('已为 ' + npcList.length + ' 个 NPC 绑定交互逻辑');
}

// 模拟遭遇战斗
function triggerRandomEncounter() {
    if (!game.combatSystem || !game.enemyTypes) {
        console.error('战斗系统未就绪');
        return;
    }
    
    const enemyTypes = Object.keys(game.enemyTypes);
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyTemplate = game.enemyTypes[randomType];
    
    // 开始战斗
    game.combatSystem.startCombat(randomType);
    
    console.log(`遭遇了${enemyTemplate.name}！`);
}

// 测试函数：触发教学对话
function triggerTutorialDialogue() {
    if (!game.npcManager || game.npcManager.npcs.length === 0) return;
    
    const tutorialNPC = game.npcManager.npcs[0];
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
    showQuests: () => { if (game.questUI) game.questUI.show(); },
    killAllEnemies: () => {
        const q = game.questManager ? game.questManager.getQuest('quest_hunt_slimes') : null;
        if(q && !q.completed) {
            q.progress = q.goal;
            if (game.questManager.updateQuestProgress) {
                game.questManager.updateQuestProgress('quest_hunt_slimes', q.goal);
            }
            console.log("模拟完成了史莱姆任务");
        }
    },
    resetQuests: () => {
        if (game.questManager) {
            game.questManager.quests = {};
        }
        if (game.variables) {
            game.variables = {};
        }
        console.log("任务进度已重置");
    }
};

console.log('调试函数已加载，可在控制台使用 debugFunctions.triggerEncounter() 等');
