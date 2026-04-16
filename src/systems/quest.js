/**
 * 任务系统
 * 管理游戏中的任务逻辑
 */
class QuestSystem {
    constructor(game) {
        this.game = game;
        this.activeQuests = [];
        this.completedQuests = [];
        this.availableQuests = [];
    }
    
    addQuest(quest) {
        this.availableQuests.push(quest);
    }
    
    acceptQuest(questId) {
        const questIndex = this.availableQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return false;
        
        const quest = this.availableQuests[questIndex];
        quest.status = 'active';
        quest.acceptedAt = Date.now();
        
        this.activeQuests.push(quest);
        this.availableQuests.splice(questIndex, 1);
        
        console.log(`接受任务：${quest.name}`);
        return true;
    }
    
    completeQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return false;
        
        const quest = this.activeQuests[questIndex];
        
        // 检查完成条件
        if (!this.checkCompletionConditions(quest)) {
            console.log('任务条件未满足');
            return false;
        }
        
        quest.status = 'completed';
        quest.completedAt = Date.now();
        
        this.completedQuests.push(quest);
        this.activeQuests.splice(questIndex, 1);
        
        // 给予奖励
        this.giveRewards(quest);
        
        console.log(`完成任务：${quest.name}`);
        return true;
    }
    
    checkCompletionConditions(quest) {
        if (!quest.conditions || quest.conditions.length === 0) {
            return true;
        }
        
        for (const condition of quest.conditions) {
            if (!this.checkCondition(condition)) {
                return false;
            }
        }
        
        return true;
    }
    
    checkCondition(condition) {
        switch (condition.type) {
            case 'kill':
                // 检查击杀数
                return (condition.current || 0) >= condition.target;
            
            case 'collect':
                // 检查收集物品
                return (condition.current || 0) >= condition.target;
            
            case 'talk':
                // 检查对话 NPC
                return condition.talked === true;
            
            case 'reach':
                // 检查到达地点
                return condition.reached === true;
            
            default:
                return true;
        }
    }
    
    giveRewards(quest) {
        const player = this.game.player;
        if (!player) return;
        
        if (quest.rewards) {
            if (quest.rewards.exp) {
                player.gainExp(quest.rewards.exp);
                console.log(`获得经验值：${quest.rewards.exp}`);
            }
            
            if (quest.rewards.gold) {
                // 添加金币逻辑
                console.log(`获得金币：${quest.rewards.gold}`);
            }
            
            if (quest.rewards.items) {
                // 添加物品逻辑
                console.log(`获得物品：${quest.rewards.items.join(', ')}`);
            }
        }
    }
    
    updateQuestProgress(questId, conditionType, amount) {
        const quest = this.activeQuests.find(q => q.id === questId);
        if (!quest || !quest.conditions) return;
        
        for (const condition of quest.conditions) {
            if (condition.type === conditionType) {
                condition.current = (condition.current || 0) + amount;
                
                // 检查是否可以完成
                if (this.checkCompletionConditions(quest)) {
                    console.log(`任务"${quest.name}"可以完成了！`);
                }
            }
        }
    }
    
    getActiveQuests() {
        return this.activeQuests;
    }
    
    getCompletedQuests() {
        return this.completedQuests;
    }
    
    getAvailableQuests() {
        return this.availableQuests;
    }
    
    // 创建新任务
    createQuest(config) {
        const quest = {
            id: config.id || Date.now(),
            name: config.name || '新任务',
            description: config.description || '',
            giver: config.giver || null,
            status: 'available',
            conditions: config.conditions || [],
            rewards: config.rewards || { exp: 100, gold: 50 },
            acceptedAt: null,
            completedAt: null
        };
        
        return quest;
    }
}
