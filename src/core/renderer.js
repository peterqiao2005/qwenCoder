/**
 * 渲染系统
 * 负责所有游戏图形的渲染
 */
class Renderer {
    constructor(game) {
        this.game = game;
        this.ctx = game.ctx;
        
        // 日式卡通风格配色
        this.colors = {
            sky: ['#87CEEB', '#B0E0E6'],
            grass: ['#98FB98', '#90EE90'],
            player: '#FF69B4',
            npc_female: '#FFB6C1',
            npc_male: '#87CEFA',
            enemy: '#FF6B6B',
            item: '#FFD700'
        };
    }
    
    renderBackground() {
        const ctx = this.ctx;
        const width = this.game.width;
        const height = this.game.height;
        
        // 绘制天空渐变
        const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
        skyGradient.addColorStop(0, this.colors.sky[0]);
        skyGradient.addColorStop(1, this.colors.sky[1]);
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, width, height * 0.7);
        
        // 绘制草地渐变
        const grassGradient = ctx.createLinearGradient(0, height * 0.7, 0, height);
        grassGradient.addColorStop(0, this.colors.grass[0]);
        grassGradient.addColorStop(1, this.colors.grass[1]);
        ctx.fillStyle = grassGradient;
        ctx.fillRect(0, height * 0.7, width, height * 0.3);
        
        // 绘制一些装饰性云朵
        this.renderCloud(100, 50, 60);
        this.renderCloud(300, 80, 40);
        this.renderCloud(600, 40, 70);
        this.renderCloud(900, 100, 50);
        
        // 绘制一些树木装饰
        this.renderTree(150, height * 0.75, 40);
        this.renderTree(width - 200, height * 0.75, 50);
        this.renderTree(width / 2, height * 0.75, 45);
    }
    
    renderCloud(x, y, size) {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.7, 0, Math.PI * 2);
        ctx.arc(x + size * 1.5, y, size * 0.9, 0, Math.PI * 2);
        ctx.arc(x + size * 0.5, y + size * 0.3, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }
    
    renderTree(x, y, size) {
        const ctx = this.ctx;
        
        // 树干
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - size * 0.1, y, size * 0.2, size * 0.8);
        
        // 树叶（圆形日式风格）
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(x, y - size * 0.3, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#32CD32';
        ctx.beginPath();
        ctx.arc(x - size * 0.2, y - size * 0.4, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#32CD32';
        ctx.beginPath();
        ctx.arc(x + size * 0.2, y - size * 0.4, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    renderPlayer(player) {
        const ctx = this.ctx;
        const x = player.x;
        const y = player.y;
        const size = player.size;
        
        // 绘制玩家角色（日式卡通风格）
        ctx.save();
        ctx.translate(x, y);
        
        // 身体
        ctx.fillStyle = this.colors.player;
        ctx.beginPath();
        ctx.ellipse(0, 10, size * 0.6, size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // 头部
        ctx.fillStyle = '#FFE4C4';
        ctx.beginPath();
        ctx.arc(0, -size * 0.5, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // 头发（粉色）
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.arc(0, -size * 0.6, size * 0.55, Math.PI, Math.PI * 2);
        ctx.fill();
        
        // 眼睛
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-size * 0.2, -size * 0.5, size * 0.08, 0, Math.PI * 2);
        ctx.arc(size * 0.2, -size * 0.5, size * 0.08, 0, Math.PI * 2);
        ctx.fill();
        
        // 方向指示器
        if (player.direction) {
            ctx.strokeStyle = 'rgba(255, 105, 180, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(
                Math.cos(player.direction) * size * 1.5,
                Math.sin(player.direction) * size * 1.5
            );
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    renderNPC(npc) {
        const ctx = this.ctx;
        const x = npc.x;
        const y = npc.y;
        const size = npc.size;
        
        ctx.save();
        ctx.translate(x, y);
        
        // 根据性别选择颜色
        const color = npc.gender === 'female' ? this.colors.npc_female : this.colors.npc_male;
        
        // 身体
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(0, 10, size * 0.6, size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // 头部
        ctx.fillStyle = '#FFE4C4';
        ctx.beginPath();
        ctx.arc(0, -size * 0.5, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // 头发
        ctx.fillStyle = npc.gender === 'female' ? '#FFB6C1' : '#8B4513';
        if (npc.gender === 'female') {
            // 女性长发
            ctx.beginPath();
            ctx.arc(0, -size * 0.6, size * 0.55, Math.PI, Math.PI * 2);
            ctx.fill();
            // 两侧头发
            ctx.beginPath();
            ctx.ellipse(-size * 0.4, -size * 0.3, size * 0.15, size * 0.4, 0.2, 0, Math.PI * 2);
            ctx.ellipse(size * 0.4, -size * 0.3, size * 0.15, size * 0.4, -0.2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // 男性短发
            ctx.beginPath();
            ctx.arc(0, -size * 0.6, size * 0.5, Math.PI, Math.PI * 2);
            ctx.fill();
        }
        
        // 眼睛
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-size * 0.2, -size * 0.5, size * 0.08, 0, Math.PI * 2);
        ctx.arc(size * 0.2, -size * 0.5, size * 0.08, 0, Math.PI * 2);
        ctx.fill();
        
        // 名称标签
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.font = '14px Microsoft YaHei';
        ctx.textAlign = 'center';
        const nameText = npc.name || 'NPC';
        ctx.strokeText(nameText, 0, -size * 1.5);
        ctx.fillText(nameText, 0, -size * 1.5);
        
        // 角色类型图标
        this.renderRoleIcon(npc.role, 0, size * 1.2);
        
        ctx.restore();
    }
    
    renderRoleIcon(role, x, y) {
        const ctx = this.ctx;
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let icon = '?';
        switch(role) {
            case 'quest-giver': icon = '!'; break;
            case 'merchant': icon = '$'; break;
            case 'companion': icon = '♥'; break;
            case 'villager': icon = '★'; break;
        }
        
        ctx.fillText(icon, x, y);
    }
    
    renderEnemy(enemy) {
        const ctx = this.ctx;
        const x = enemy.x;
        const y = enemy.y;
        const size = enemy.size;
        
        ctx.save();
        ctx.translate(x, y);
        
        // 敌人身体（红色调）
        ctx.fillStyle = this.colors.enemy;
        ctx.beginPath();
        ctx.ellipse(0, 10, size * 0.7, size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // 愤怒的眼睛
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(-size * 0.25, -size * 0.4, size * 0.1, 0, Math.PI * 2);
        ctx.arc(size * 0.25, -size * 0.4, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-size * 0.25, -size * 0.4, size * 0.05, 0, Math.PI * 2);
        ctx.arc(size * 0.25, -size * 0.4, size * 0.05, 0, Math.PI * 2);
        ctx.fill();
        
        // 血条
        if (enemy.hp < enemy.maxHp) {
            ctx.fillStyle = '#333';
            ctx.fillRect(-size * 0.5, -size * 1.2, size, 6);
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(-size * 0.5, -size * 1.2, size * (enemy.hp / enemy.maxHp), 6);
        }
        
        ctx.restore();
    }
    
    renderItem(item) {
        const ctx = this.ctx;
        const x = item.x;
        const y = item.y;
        const size = item.size;
        
        ctx.save();
        ctx.translate(x, y);
        
        // 发光效果
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // 物品本体
        ctx.fillStyle = this.colors.item;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}
