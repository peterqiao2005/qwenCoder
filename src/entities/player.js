/**
 * 玩家类
 * 继承自Entity，添加玩家特有属性
 */
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 40);
        
        // 玩家属性
        this.hp = 100;
        this.maxHp = 100;
        this.level = 1;
        this.exp = 0;
        this.maxExp = 100;
        this.attack = 10;
        this.defense = 5;
        
        // 状态
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.invincible = false;
        this.invincibleTimer = 0;
        
        // 装备
        this.weapon = 'sword';
        this.armor = 'cloth';
    }
    
    update(deltaTime, game) {
        super.update(deltaTime, game);
        
        // 键盘控制（WASD或方向键）
        if (game.input) {
            const input = game.input;
            let dx = 0;
            let dy = 0;
            
            if (input.isKeyDown('KeyW') || input.isKeyDown('ArrowUp')) dy = -1;
            if (input.isKeyDown('KeyS') || input.isKeyDown('ArrowDown')) dy = 1;
            if (input.isKeyDown('KeyA') || input.isKeyDown('ArrowLeft')) dx = -1;
            if (input.isKeyDown('KeyD') || input.isKeyDown('ArrowRight')) dx = 1;
            
            if (dx !== 0 || dy !== 0) {
                // 归一化向量
                const length = Math.sqrt(dx * dx + dy * dy);
                dx /= length;
                dy /= length;
                
                this.direction = Math.atan2(dy, dx);
                this.targetX = this.x + dx * this.speed * (deltaTime / 1000) * 5;
                this.targetY = this.y + dy * this.speed * (deltaTime / 1000) * 5;
                this.isMoving = true;
            }
        }
        
        // 攻击冷却
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }
        
        // 无敌时间
        if (this.invincible) {
            this.invincibleTimer -= deltaTime;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
        
        // 边界检查
        this.checkBounds(game.width, game.height);
    }
    
    checkBounds(width, height) {
        const margin = this.size;
        this.x = Math.max(margin, Math.min(width - margin, this.x));
        this.y = Math.max(margin, Math.min(height - margin, this.y));
        this.targetX = Math.max(margin, Math.min(width - margin, this.targetX));
        this.targetY = Math.max(margin, Math.min(height - margin, this.targetY));
    }
    
    attack(target) {
        if (this.attackCooldown > 0) return false;
        
        this.isAttacking = true;
        this.attackCooldown = 500; // 0.5秒冷却
        
        // 计算与目标的距离
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            // 命中目标
            const damage = this.calculateDamage();
            target.takeDamage(damage);
            
            setTimeout(() => {
                this.isAttacking = false;
            }, 200);
            
            return true;
        }
        
        setTimeout(() => {
            this.isAttacking = false;
        }, 200);
        
        return false;
    }
    
    calculateDamage() {
        // 基础伤害 + 武器加成
        let damage = this.attack;
        
        switch(this.weapon) {
            case 'sword': damage += 5; break;
            case 'axe': damage += 8; break;
            case 'spear': damage += 6; break;
        }
        
        // 等级加成
        damage += this.level * 2;
        
        return damage;
    }
    
    takeDamage(amount) {
        if (this.invincible) return;
        
        // 计算实际伤害（考虑防御）
        const actualDamage = Math.max(1, amount - this.defense);
        this.hp -= actualDamage;
        
        if (this.hp <= 0) {
            this.hp = 0;
            this.onDeath();
        } else {
            // 短暂无敌时间
            this.invincible = true;
            this.invincibleTimer = 1000; // 1秒
        }
    }
    
    gainExp(amount) {
        this.exp += amount;
        
        if (this.exp >= this.maxExp) {
            this.levelUp();
        }
    }
    
    levelUp() {
        this.level++;
        this.exp -= this.maxExp;
        this.maxExp = Math.floor(this.maxExp * 1.5);
        
        // 提升属性
        this.maxHp += 20;
        this.hp = this.maxHp;
        this.attack += 3;
        this.defense += 2;
        
        console.log(`升级！当前等级：${this.level}`);
    }
    
    onDeath() {
        console.log('玩家死亡');
        // 可以在这里添加复活逻辑或游戏结束处理
    }
    
    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }
}
