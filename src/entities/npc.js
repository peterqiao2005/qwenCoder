/**
 * NPC类
 * 非玩家角色，支持对话、任务等功能
 */
class NPC extends Entity {
    constructor(x, y, config = {}) {
        super(x, y, 35);
        
        // 基础信息
        this.id = config.id || Date.now();
        this.name = config.name || 'NPC';
        this.gender = config.gender || 'female'; // female, male
        this.ageGroup = config.ageGroup || 'young'; // young, young-adult, adult, elder
        this.role = config.role || 'villager'; // quest-giver, merchant, companion, villager
        
        // 对话和任务
        this.dialogue = config.dialogue || this.getDefaultDialogue();
        this.quests = config.quests || [];
        this.currentQuest = null;
        
        // 行为
        this.speed = 50; // NPC移动较慢
        this.wanderRange = 100; // 巡逻范围
        this.wanderTimer = 0;
        this.homeX = x;
        this.homeY = y;
        
        // 状态
        this.isInteractive = true;
        this.relationship = 0; // 好感度
    }
    
    getDefaultDialogue() {
        const dialogues = {
            'quest-giver': [
                '你好呀！我有个重要的任务需要你的帮助。',
                '最近村里发生了一些奇怪的事情...',
                '你看起来很可靠呢！'
            ],
            'merchant': [
                '欢迎光临！看看有什么需要的吗？',
                '今天的商品都很不错哦！',
                '买得多可以给你打折呢~'
            ],
            'companion': [
                '我可以和你一起冒险吗？',
                '一个人旅行太寂寞了...',
                '我会努力帮上忙的！'
            ],
            'villager': [
                '今天天气真好呢！',
                '你也是外来者吗？欢迎来到这里！',
                '最近的日子过得很平静呢。'
            ]
        };
        
        return dialogues[this.role] || ['你好！'];
    }
    
    update(deltaTime, game) {
        // 简单的巡逻AI
        this.wanderTimer -= deltaTime;
        
        if (this.wanderTimer <= 0) {
            this.startWandering();
            this.wanderTimer = 2000 + Math.random() * 3000; // 2-5秒改变一次方向
        }
        
        super.update(deltaTime, game);
        
        // 限制在出生点附近
        const dx = this.x - this.homeX;
        const dy = this.y - this.homeY;
        const distanceFromHome = Math.sqrt(dx * dx + dy * dy);
        
        if (distanceFromHome > this.wanderRange) {
            // 返回家园
            this.targetX = this.homeX;
            this.targetY = this.homeY;
            this.isMoving = true;
            this.direction = Math.atan2(-dy, -dx);
        }
    }
    
    startWandering() {
        // 随机选择一个方向
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * this.wanderRange;
        
        this.targetX = this.homeX + Math.cos(angle) * distance;
        this.targetY = this.homeY + Math.sin(angle) * distance;
        this.isMoving = true;
        this.direction = angle;
    }
    
    interact(player) {
        if (!this.isInteractive) {
            console.log(`${this.name}现在无法互动`);
            return false;
        }
        
        console.log(`${this.name}: ${this.getRandomDialogue()}`);
        return true;
    }
    
    getRandomDialogue() {
        if (Array.isArray(this.dialogue)) {
            return this.dialogue[Math.floor(Math.random() * this.dialogue.length)];
        }
        return this.dialogue;
    }
    
    addQuest(quest) {
        this.quests.push(quest);
    }
    
    giveQuest(player) {
        if (this.quests.length === 0) {
            return null;
        }
        
        // 返回第一个未完成的任务
        for (const quest of this.quests) {
            if (!quest.completed) {
                return quest;
            }
        }
        
        return null;
    }
    
    increaseRelationship(amount) {
        this.relationship = Math.min(100, this.relationship + amount);
        console.log(`${this.name}的好感度提升了${amount}点，当前：${this.relationship}`);
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            gender: this.gender,
            ageGroup: this.ageGroup,
            role: this.role,
            dialogue: this.dialogue,
            quests: this.quests,
            relationship: this.relationship
        };
    }
}
