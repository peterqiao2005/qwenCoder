/**
 * 游戏核心管理器
 * 负责游戏循环、状态管理和系统协调
 */
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        this.state = 'MENU'; // MENU, PLAYING, PAUSED, EDITOR
        this.lastTime = 0;
        this.deltaTime = 0;
        
        // 游戏实体
        this.player = null;
        this.npcs = [];
        this.enemies = [];
        this.items = [];
        
        // 系统
        this.renderer = null;
        this.input = null;
        this.uiManager = null;
        this.dialogueSystem = null;
        this.questSystem = null;
        this.combatSystem = null;
        
        // NPC数据管理
        this.npcData = [];
        
        this.init();
    }
    
    init() {
        // 初始化各系统
        this.renderer = new Renderer(this);
        this.input = new Input(this);
        this.uiManager = new UIManager(this);
        this.dialogueSystem = new DialogueSystem(this);
        this.questSystem = new QuestSystem(this);
        this.combatSystem = new CombatSystem(this);
        
        // 加载NPC数据
        this.loadNPCData();
        
        // 设置窗口大小监听
        window.addEventListener('resize', () => this.onResize());
        
        // 启动游戏循环
        this.gameLoop(0);
    }
    
    loadNPCData() {
        // 从数据文件加载NPC
        if (typeof NPCData !== 'undefined') {
            this.npcData = [...NPCData];
        }
    }
    
    startGame() {
        this.state = 'PLAYING';
        
        // 创建玩家
        this.player = new Player(this.width / 2, this.height / 2);
        
        // 根据NPC数据生成NPC（80%女性，20%男性）
        this.generateNPCs();
        
        // 隐藏主菜单，显示游戏UI
        this.uiManager.showGameUI();
        
        console.log('游戏开始！');
    }
    
    generateNPCs() {
        // Demo: 生成10个NPC，8个女性，2个男性
        const npcConfigs = [
            { name: '樱子', gender: 'female', ageGroup: 'young', role: 'quest-giver' },
            { name: '美咲', gender: 'female', ageGroup: 'young-adult', role: 'merchant' },
            { name: '千夏', gender: 'female', ageGroup: 'young', role: 'villager' },
            { name: '由依', gender: 'female', ageGroup: 'young-adult', role: 'companion' },
            { name: '诗织', gender: 'female', ageGroup: 'young', role: 'villager' },
            { name: '绫乃', gender: 'female', ageGroup: 'young-adult', role: 'quest-giver' },
            { name: '优奈', gender: 'female', ageGroup: 'young', role: 'merchant' },
            { name: '遥', gender: 'female', ageGroup: 'young-adult', role: 'villager' },
            { name: '健太', gender: 'male', ageGroup: 'adult', role: 'merchant' },
            { name: '大辅', gender: 'male', ageGroup: 'adult', role: 'villager' }
        ];
        
        npcConfigs.forEach((config, index) => {
            const x = 100 + Math.random() * (this.width - 200);
            const y = 100 + Math.random() * (this.height - 200);
            const npc = new NPC(x, y, config);
            this.npcs.push(npc);
        });
        
        console.log(`生成了${this.npcs.length}个NPC`);
    }
    
    gameLoop(timestamp) {
        // 计算时间增量
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        // 清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        if (this.state === 'PLAYING') {
            this.update(this.deltaTime);
            this.render();
        }
        
        // 继续游戏循环
        requestAnimationFrame((ts) => this.gameLoop(ts));
    }
    
    update(deltaTime) {
        // 更新玩家
        if (this.player) {
            this.player.update(deltaTime, this);
        }
        
        // 更新NPC
        this.npcs.forEach(npc => npc.update(deltaTime, this));
        
        // 更新敌人
        this.enemies.forEach(enemy => enemy.update(deltaTime, this));
        
        // 更新对话系统
        if (this.dialogueSystem) {
            this.dialogueSystem.update(deltaTime);
        }
    }
    
    render() {
        // 渲染场景
        this.renderer.renderBackground();
        
        // 渲染NPC
        this.npcs.forEach(npc => this.renderer.renderNPC(npc));
        
        // 渲染玩家
        if (this.player) {
            this.renderer.renderPlayer(this.player);
        }
        
        // 渲染敌人
        this.enemies.forEach(enemy => this.renderer.renderEnemy(enemy));
        
        // 渲染物品
        this.items.forEach(item => this.renderer.renderItem(item));
    }
    
    onResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
    
    // NPC编辑器相关方法
    addNPC(npcConfig) {
        const id = Date.now();
        const npc = new NPC(
            this.width / 2,
            this.height / 2,
            { ...npcConfig, id }
        );
        this.npcs.push(npc);
        this.npcData.push({ ...npcConfig, id });
        return npc;
    }
    
    updateNPC(id, updates) {
        const npcIndex = this.npcs.findIndex(n => n.id === id);
        if (npcIndex !== -1) {
            Object.assign(this.npcs[npcIndex], updates);
        }
        
        const dataIndex = this.npcData.findIndex(n => n.id === id);
        if (dataIndex !== -1) {
            Object.assign(this.npcData[dataIndex], updates);
        }
    }
    
    deleteNPC(id) {
        this.npcs = this.npcs.filter(n => n.id !== id);
        this.npcData = this.npcData.filter(n => n.id !== id);
    }
    
    getNPC(id) {
        return this.npcs.find(n => n.id === id);
    }
    
    saveScript() {
        // 保存脚本到本地存储
        localStorage.setItem('rpg_npc_data', JSON.stringify(this.npcData));
        console.log('脚本已保存');
    }
    
    loadScript() {
        // 从本地存储加载脚本
        const saved = localStorage.getItem('rpg_npc_data');
        if (saved) {
            this.npcData = JSON.parse(saved);
            console.log('脚本已加载');
        }
    }
}

// 全局游戏实例
let game = null;
