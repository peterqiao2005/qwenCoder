/**
 * 脚本编辑器
 * 提供 UI 界面编辑 NPC 和对话脚本
 */
class ScriptEditor {
    constructor(game) {
        this.game = game;
        this.selectedNPCId = null;
        this.currentEditingNPC = null;
        
        // 性别比例统计
        this.genderRatio = {
            female: 0.8, // 80% 女性
            male: 0.2    // 20% 男性
        };
    }
    
    loadNPCList() {
        const listContainer = document.getElementById('npc-list-items');
        if (!listContainer) return;
        
        listContainer.innerHTML = '';
        
        const npcs = this.game.npcData || [];
        
        npcs.forEach(npc => {
            const li = document.createElement('li');
            li.textContent = `${npc.name} (${npc.gender === 'female' ? '♀' : '♂'})`;
            li.dataset.id = npc.id;
            
            // 添加性别标识颜色
            if (npc.gender === 'female') {
                li.style.borderLeft = '3px solid #FF69B4';
            } else {
                li.style.borderLeft = '3px solid #87CEFA';
            }
            
            li.addEventListener('click', () => {
                this.selectNPC(npc.id);
            });
            
            listContainer.appendChild(li);
        });
        
        this.updateGenderStats();
    }
    
    selectNPC(id) {
        // 取消之前的选择
        const previous = document.querySelector('#npc-list-items li.active');
        if (previous) {
            previous.classList.remove('active');
        }
        
        // 选择新的 NPC
        const selected = document.querySelector(`#npc-list-items li[data-id="${id}"]`);
        if (selected) {
            selected.classList.add('active');
        }
        
        this.selectedNPCId = id;
        
        // 加载 NPC 数据到表单
        const npc = this.game.getNPC(id);
        if (npc) {
            this.currentEditingNPC = npc;
            this.loadNPCToForm(npc);
        }
    }
    
    loadNPCToForm(npc) {
        const form = document.getElementById('npc-form');
        if (!form) return;
        
        document.getElementById('npc-name').value = npc.name || '';
        document.getElementById('npc-gender').value = npc.gender || 'female';
        document.getElementById('npc-age-group').value = npc.ageGroup || 'young';
        document.getElementById('npc-role').value = npc.role || 'villager';
        
        // 对话内容
        const dialogueText = Array.isArray(npc.dialogue) 
            ? npc.dialogue.join('\n') 
            : (npc.dialogue || '');
        document.getElementById('npc-dialogue').value = dialogueText;
        
        // 任务信息
        const questText = npc.quests && npc.quests.length > 0
            ? JSON.stringify(npc.quests, null, 2)
            : '';
        document.getElementById('npc-quests').value = questText;
    }
    
    createNewNPC() {
        const defaultConfig = {
            name: '新角色',
            gender: 'female', // 默认女性，符合 80% 比例
            ageGroup: 'young',
            role: 'villager',
            dialogue: ['你好！很高兴见到你！'],
            quests: []
        };
        
        const npc = this.game.addNPC(defaultConfig);
        this.loadNPCList();
        this.selectNPC(npc.id);
    }
    
    saveCurrentNPC() {
        if (!this.selectedNPCId) {
            alert('请先选择一个 NPC！');
            return;
        }
        
        const name = document.getElementById('npc-name').value.trim();
        const gender = document.getElementById('npc-gender').value;
        const ageGroup = document.getElementById('npc-age-group').value;
        const role = document.getElementById('npc-role').value;
        
        // 处理对话内容（按行分割）
        const dialogueText = document.getElementById('npc-dialogue').value.trim();
        const dialogue = dialogueText.split('\n').filter(line => line.trim() !== '');
        
        // 处理任务信息
        const questText = document.getElementById('npc-quests').value.trim();
        let quests = [];
        if (questText) {
            try {
                quests = JSON.parse(questText);
            } catch (e) {
                console.warn('任务 JSON 格式错误，将使用空数组');
            }
        }
        
        const updates = {
            name,
            gender,
            ageGroup,
            role,
            dialogue,
            quests
        };
        
        this.game.updateNPC(this.selectedNPCId, updates);
        
        // 重新加载列表
        this.loadNPCList();
        this.selectNPC(this.selectedNPCId);
        
        // 保存到本地存储
        this.game.saveScript();
        
        alert('NPC 已保存！');
    }
    
    deleteCurrentNPC() {
        if (!this.selectedNPCId) {
            alert('请先选择一个 NPC！');
            return;
        }
        
        if (confirm('确定要删除这个 NPC 吗？')) {
            this.game.deleteNPC(this.selectedNPCId);
            this.selectedNPCId = null;
            this.currentEditingNPC = null;
            
            // 清空表单
            document.getElementById('npc-form').reset();
            
            // 重新加载列表
            this.loadNPCList();
            
            // 保存到本地存储
            this.game.saveScript();
        }
    }
    
    updateGenderStats() {
        const npcs = this.game.npcData || [];
        const femaleCount = npcs.filter(n => n.gender === 'female').length;
        const maleCount = npcs.filter(n => n.gender === 'male').length;
        const total = npcs.length;
        
        if (total > 0) {
            const femalePercent = Math.round((femaleCount / total) * 100);
            const malePercent = Math.round((maleCount / total) * 100);
            
            console.log(`NPC 性别比例：女性 ${femalePercent}% (${femaleCount}人), 男性 ${malePercent}% (${maleCount}人)`);
            
            // 可以在这里添加可视化显示
        }
    }
    
    validateGenderRatio() {
        const npcs = this.game.npcData || [];
        const femaleCount = npcs.filter(n => n.gender === 'female').length;
        const total = npcs.length;
        
        if (total === 0) return true;
        
        const femaleRatio = femaleCount / total;
        
        // 检查是否符合 80% 女性的要求（允许±10% 的误差）
        return femaleRatio >= 0.7 && femaleRatio <= 0.9;
    }
    
    exportScript() {
        const scriptData = {
            npcs: this.game.npcData,
            metadata: {
                exportDate: new Date().toISOString(),
                version: '1.0.0',
                genderRatio: this.genderRatio
            }
        };
        
        const jsonStr = JSON.stringify(scriptData, null, 2);
        
        // 创建下载链接
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rpg_script_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('脚本已导出');
    }
    
    importScript(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.npcs && Array.isArray(data.npcs)) {
                    // 清除现有 NPC
                    this.game.npcData = [];
                    this.game.npcs = [];
                    
                    // 导入新 NPC
                    data.npcs.forEach(npcConfig => {
                        this.game.addNPC(npcConfig);
                    });
                    
                    this.loadNPCList();
                    this.game.saveScript();
                    
                    alert(`成功导入${data.npcs.length}个 NPC！`);
                }
            } catch (error) {
                alert('导入失败：文件格式错误');
                console.error(error);
            }
        };
        reader.readAsText(file);
    }
}

// 挂载到 game 实例
if (typeof Game !== 'undefined') {
    const originalInit = Game.prototype.init;
    Game.prototype.init = function() {
        this.scriptEditor = new ScriptEditor(this);
        originalInit.call(this);
    };
}
