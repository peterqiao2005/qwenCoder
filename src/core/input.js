/**
 * 输入系统
 * 处理键盘、鼠标和触摸输入
 */
class Input {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.mouse = { x: 0, y: 0, leftDown: false, rightDown: false };
        
        this.initListeners();
    }
    
    initListeners() {
        // 键盘事件
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            // ESC键打开/关闭菜单
            if (e.code === 'Escape') {
                this.handleEscape();
            }
            
            // E键与NPC互动
            if (e.code === 'KeyE' && this.game.state === 'PLAYING') {
                this.tryInteract();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // 鼠标事件
        this.game.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.game.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this.mouse.leftDown = true;
                // 左键点击移动
                if (this.game.state === 'PLAYING' && this.game.player) {
                    this.moveToClick(e.clientX, e.clientY);
                }
            } else if (e.button === 2) {
                this.mouse.rightDown = true;
            }
        });
        
        this.game.canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.mouse.leftDown = false;
            } else if (e.button === 2) {
                this.mouse.rightDown = false;
            }
        });
        
        // 阻止右键菜单
        this.game.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // 触摸事件（移动端支持）
        this.game.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY;
            this.mouse.leftDown = true;
            
            if (this.game.state === 'PLAYING' && this.game.player) {
                this.moveToClick(touch.clientX, touch.clientY);
            }
        });
        
        this.game.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.mouse.leftDown = false;
        });
    }
    
    moveToClick(x, y) {
        const player = this.game.player;
        if (!player) return;
        
        // 计算目标方向
        const dx = x - player.x;
        const dy = y - player.y;
        player.targetX = x;
        player.targetY = y;
        player.direction = Math.atan2(dy, dx);
        player.isMoving = true;
    }
    
    tryInteract() {
        const player = this.game.player;
        if (!player) return;
        
        const interactRange = 100;
        
        // 查找范围内的NPC
        for (const npc of this.game.npcs) {
            const dx = npc.x - player.x;
            const dy = npc.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < interactRange) {
                // 开始对话
                this.game.dialogueSystem.startDialogue(npc);
                break;
            }
        }
    }
    
    handleEscape() {
        switch (this.game.state) {
            case 'PLAYING':
                // 暂停游戏或关闭对话框
                if (this.game.dialogueSystem.isActive) {
                    this.game.dialogueSystem.endDialogue();
                } else {
                    this.game.state = 'PAUSED';
                    this.game.uiManager.showMainMenu();
                }
                break;
            case 'PAUSED':
                // 继续游戏
                this.game.state = 'PLAYING';
                this.game.uiManager.hideAllPanels();
                break;
            case 'EDITOR':
                // 关闭编辑器
                this.game.state = 'PLAYING';
                this.game.uiManager.hideAllPanels();
                break;
        }
    }
    
    isKeyDown(code) {
        return this.keys[code] === true;
    }
    
    update() {
        // 可以在这里添加输入缓冲或其他逻辑
    }
}
