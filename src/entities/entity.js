/**
 * 基础实体类
 * 所有游戏实体的基类
 */
class Entity {
    constructor(x, y, size = 30) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = 200; // 像素/秒
        this.isMoving = false;
        this.direction = 0; // 弧度
        this.targetX = x;
        this.targetY = y;
    }
    
    update(deltaTime, game) {
        if (this.isMoving) {
            this.move(deltaTime);
        }
    }
    
    move(deltaTime) {
        const dt = deltaTime / 1000; // 转换为秒
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
            this.isMoving = false;
            return;
        }
        
        // 计算移动向量
        const moveX = (dx / distance) * this.speed * dt;
        const moveY = (dy / distance) * this.speed * dt;
        
        this.x += moveX;
        this.y += moveY;
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
    }
    
    getBounds() {
        return {
            left: this.x - this.size / 2,
            right: this.x + this.size / 2,
            top: this.y - this.size / 2,
            bottom: this.y + this.size / 2
        };
    }
    
    collidesWith(other) {
        const a = this.getBounds();
        const b = other.getBounds();
        
        return !(
            a.right < b.left ||
            a.left > b.right ||
            a.bottom < b.top ||
            a.top > b.bottom
        );
    }
}
