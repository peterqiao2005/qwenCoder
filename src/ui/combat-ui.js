/**
 * 战斗 UI 管理器
 * 处理战斗界面的显示和交互
 */
class CombatUI {
    constructor(game) {
        this.game = game;
        this.combatUI = document.getElementById('combat-ui');
        this.enemiesContainer = document.getElementById('combat-enemies');
        this.combatLog = document.getElementById('combat-log');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const attackBtn = document.getElementById('btn-attack');
        const skillBtn = document.getElementById('btn-skill');
        const fleeBtn = document.getElementById('btn-flee');
        
        if (attackBtn) {
            attackBtn.addEventListener('click', () => this.playerAttack());
        }
        
        if (skillBtn) {
            skillBtn.addEventListener('click', () => this.playerUseSkill());
        }
        
        if (fleeBtn) {
            fleeBtn.addEventListener('click', () => this.playerFlee());
        }
    }
    
    show(enemies) {
        if (!this.combatUI) return;
        
        this.combatUI.classList.remove('hidden');
        this.renderEnemies(enemies);
        this.log('战斗开始！');
    }
    
    hide() {
        if (this.combatUI) {
            this.combatUI.classList.add('hidden');
        }
    }
    
    renderEnemies(enemies) {
        if (!this.enemiesContainer) return;
        
        this.enemiesContainer.innerHTML = '';
        
        enemies.forEach((enemy, index) => {
            const enemyDiv = document.createElement('div');
            enemyDiv.className = 'enemy-display';
            
            const hpPercent = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
            
            enemyDiv.innerHTML = `
                <div class="enemy-sprite">👾</div>
                <div class="enemy-name">${enemy.name}</div>
                <div class="enemy-hp">
                    <div class="enemy-hp-bar" style="width: ${hpPercent}%"></div>
                </div>
                <div class="enemy-hp-text">${enemy.hp}/${enemy.maxHp}</div>
            `;
            
            this.enemiesContainer.appendChild(enemyDiv);
        });
    }
    
    updateEnemyHP(enemyIndex, currentHP, maxHP) {
        const enemyDisplays = this.enemiesContainer.querySelectorAll('.enemy-display');
        if (enemyDisplays[enemyIndex]) {
            const hpBar = enemyDisplays[enemyIndex].querySelector('.enemy-hp-bar');
            const hpText = enemyDisplays[enemyIndex].querySelector('.enemy-hp-text');
            
            if (hpBar && hpText) {
                const hpPercent = Math.max(0, (currentHP / maxHP) * 100);
                hpBar.style.width = `${hpPercent}%`;
                hpText.textContent = `${currentHP}/${maxHP}`;
            }
        }
    }
    
    removeEnemy(enemyIndex) {
        const enemyDisplays = this.enemiesContainer.querySelectorAll('.enemy-display');
        if (enemyDisplays[enemyIndex]) {
            enemyDisplays[enemyIndex].style.opacity = '0';
            enemyDisplays[enemyIndex].style.transform = 'scale(0.8)';
            setTimeout(() => {
                enemyDisplays[enemyIndex].remove();
            }, 300);
        }
    }
    
    log(message) {
        if (!this.combatLog) return;
        
        const p = document.createElement('p');
        p.textContent = message;
        this.combatLog.appendChild(p);
        this.combatLog.scrollTop = this.combatLog.scrollHeight;
        
        // 限制日志数量
        while (this.combatLog.children.length > 20) {
            this.combatLog.removeChild(this.combatLog.firstChild);
        }
    }
    
    clearLog() {
        if (this.combatLog) {
            this.combatLog.innerHTML = '';
        }
    }
    
    playerAttack() {
        if (this.game.combat && this.game.combat.inCombat) {
            const target = this.game.combat.currentEnemies[0];
            if (target) {
                this.game.combat.playerAttack(target);
            }
        }
    }
    
    playerUseSkill() {
        this.log('技能尚未实现...');
    }
    
    playerFlee() {
        if (this.game.combat) {
            const success = this.game.combat.flee();
            if (success) {
                this.hide();
            } else {
                this.log('逃跑失败！');
            }
        }
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CombatUI;
}
