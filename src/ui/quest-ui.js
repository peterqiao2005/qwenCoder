/**
 * 任务 UI 管理器
 * 处理任务界面的显示和交互
 */
class QuestUI {
    constructor(game) {
        this.game = game;
        this.questList = document.getElementById('quest-list');
        this.questItems = document.getElementById('quest-items');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const closeBtn = document.getElementById('btn-close-quests');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
    }
    
    show() {
        if (!this.questList) return;
        
        this.renderQuests();
        this.questList.classList.remove('hidden');
    }
    
    hide() {
        if (this.questList) {
            this.questList.classList.add('hidden');
        }
    }
    
    renderQuests() {
        if (!this.questItems || !this.game.quest) return;
        
        this.questItems.innerHTML = '';
        
        const activeQuests = this.game.quest.getActiveQuests();
        
        if (activeQuests.length === 0) {
            this.questItems.innerHTML = '<li style="text-align:center;color:#999;">暂无进行中的任务</li>';
            return;
        }
        
        activeQuests.forEach(quest => {
            const li = document.createElement('li');
            
            let progressText = '';
            if (quest.conditions && quest.conditions.length > 0) {
                const condition = quest.conditions[0];
                progressText = `进度：${condition.current || 0}/${condition.target}`;
            }
            
            li.innerHTML = `
                <div class="quest-name">${quest.name}</div>
                <div class="quest-desc">${quest.description}</div>
                <div class="quest-progress">${progressText}</div>
            `;
            
            li.addEventListener('click', () => {
                this.showQuestDetails(quest);
            });
            
            this.questItems.appendChild(li);
        });
    }
    
    showQuestDetails(quest) {
        alert(`${quest.name}\n\n${quest.description}\n\n奖励：经验 ${quest.rewards?.exp || 0}，金币 ${quest.rewards?.gold || 0}`);
    }
    
    update() {
        if (!this.questList.classList.contains('hidden')) {
            this.renderQuests();
        }
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestUI;
}
