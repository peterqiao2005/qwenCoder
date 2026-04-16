/**
 * 战斗系统
 * 管理玩家与敌人的战斗
 */
class CombatSystem {
    constructor(game) {
        this.game = game;
        this.inCombat = false;
        this.currentEnemies = [];
        this.combatLog = [];
    }
    
    startCombat(enemies) {
        if (!enemies || enemies.length === 0) return;
        
        this.inCombat = true;
        this.currentEnemies = Array.isArray(enemies) ? enemies : [enemies];
        
        console.log('进入战斗！');
        this.logCombat('战斗开始！');
    }
    
    endCombat() {
        this.inCombat = false;
        this.currentEnemies = [];
        
        console.log('战斗结束！');
        this.logCombat('战斗结束！');
    }
    
    playerAttack(target) {
        const player = this.game.player;
        if (!player) return false;
        
        const hit = player.attack(target);
        
        if (hit) {
            const damage = player.calculateDamage();
            this.logCombat(`玩家攻击${target.name}，造成${damage}点伤害`);
            
            // 检查敌人是否死亡
            if (target.hp <= 0) {
                this.enemyDefeated(target);
            }
        }
        
        return hit;
    }
    
    enemyAttack(enemy, target) {
        if (!enemy || !target) return;
        
        const damage = enemy.calculateDamage();
        target.takeDamage(damage);
        
        this.logCombat(`${enemy.name}攻击玩家，造成${damage}点伤害`);
        
        // 检查玩家是否死亡
        if (target.hp <= 0) {
            this.playerDefeated();
        }
    }
    
    enemyDefeated(enemy) {
        console.log(`${enemy.name}被击败了！`);
        this.logCombat(`${enemy.name}被击败！`);
        
        // 给予经验值
        if (this.game.player) {
            this.game.player.gainExp(enemy.expReward || 50);
        }
        
        // 从战斗中移除
        const index = this.currentEnemies.indexOf(enemy);
        if (index !== -1) {
            this.currentEnemies.splice(index, 1);
        }
        
        // 检查是否所有敌人都被击败
        if (this.currentEnemies.length === 0) {
            this.victory();
        }
    }
    
    playerDefeated() {
        console.log('玩家被击败了！');
        this.logCombat('玩家被击败！');
        this.endCombat();
        
        // 可以在这里添加游戏结束或复活逻辑
    }
    
    victory() {
        console.log('胜利！');
        this.logCombat('战斗胜利！');
        this.endCombat();
        
        // 掉落物品等逻辑可以在这里添加
    }
    
    logCombat(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.combatLog.push(`[${timestamp}] ${message}`);
        
        // 保持日志长度
        if (this.combatLog.length > 50) {
            this.combatLog.shift();
        }
        
        console.log(message);
    }
    
    getCombatLog() {
        return this.combatLog;
    }
    
    update(deltaTime) {
        if (!this.inCombat) return;
        
        // 敌人 AI 逻辑
        for (const enemy of this.currentEnemies) {
            if (enemy.hp > 0 && this.game.player && this.game.player.hp > 0) {
                this.enemyAI(enemy, deltaTime);
            }
        }
    }
    
    enemyAI(enemy, deltaTime) {
        const player = this.game.player;
        if (!player) return;
        
        // 计算与玩家的距离
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 如果玩家在攻击范围内
        if (distance < enemy.attackRange || 80) {
            // 攻击冷却检查
            if (enemy.attackCooldown <= 0) {
                this.enemyAttack(enemy, player);
                enemy.attackCooldown = enemy.attackSpeed || 1500;
            }
        } else {
            // 向玩家移动
            enemy.direction = Math.atan2(dy, dx);
            enemy.targetX = player.x;
            enemy.targetY = player.y;
            enemy.isMoving = true;
        }
        
        // 减少攻击冷却
        if (enemy.attackCooldown > 0) {
            enemy.attackCooldown -= deltaTime;
        }
    }
    
    flee() {
        if (!this.inCombat) return false;
        
        // 逃跑成功率计算
        const successRate = 0.7; // 70% 基础成功率
        
        if (Math.random() < successRate) {
            console.log('逃跑成功！');
            this.logCombat('逃跑成功！');
            this.endCombat();
            return true;
        } else {
            console.log('逃跑失败！');
            this.logCombat('逃跑失败！');
            return false;
        }
    }
}
