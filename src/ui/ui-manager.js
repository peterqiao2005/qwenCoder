/**
 * UI 管理器
 * 管理所有 UI 面板的显示和隐藏
 */
class UIManager {
    constructor(game) {
        this.game = game;
        this.currentPanel = 'main-menu';
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // 主菜单按钮
        const btnStart = document.getElementById('btn-start');
        const btnEditor = document.getElementById('btn-editor');
        const btnSettings = document.getElementById('btn-settings');
        
        if (btnStart) {
            btnStart.addEventListener('click', () => {
                this.startGame();
            });
        }
        
        if (btnEditor) {
            btnEditor.addEventListener('click', () => {
                this.openScriptEditor();
            });
        }
        
        if (btnSettings) {
            btnSettings.addEventListener('click', () => {
                alert('设置功能开发中...');
            });
        }
        
        // 对话框按钮
        const dialogNext = document.getElementById('dialog-next');
        if (dialogNext) {
            dialogNext.addEventListener('click', () => {
                if (this.game.dialogueSystem) {
                    this.game.dialogueSystem.nextLine();
                }
            });
        }
        
        // 脚本编辑器按钮
        const btnCloseEditor = document.getElementById('btn-close-editor');
        const btnAddNpc = document.getElementById('btn-add-npc');
        const npcForm = document.getElementById('npc-form');
        const btnSaveNpc = document.getElementById('btn-save-npc');
        const btnDeleteNpc = document.getElementById('btn-delete-npc');
        
        if (btnCloseEditor) {
            btnCloseEditor.addEventListener('click', () => {
                this.closeScriptEditor();
            });
        }
        
        if (btnAddNpc) {
            btnAddNpc.addEventListener('click', () => {
                this.addNewNPC();
            });
        }
        
        if (npcForm) {
            npcForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveNPC();
            });
        }
        
        if (btnDeleteNpc) {
            btnDeleteNpc.addEventListener('click', () => {
                this.deleteSelectedNPC();
            });
        }
        
        // 键盘快捷键
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.game.dialogueSystem.isActive) {
                this.game.dialogueSystem.nextLine();
            }
        });
    }
    
    showMainMenu() {
        this.hideAllPanels();
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) {
            mainMenu.classList.remove('hidden');
        }
        this.currentPanel = 'main-menu';
        this.game.state = 'MENU';
    }
    
    showGameUI() {
        this.hideAllPanels();
        const gameUI = document.getElementById('game-ui');
        if (gameUI) {
            gameUI.classList.remove('hidden');
        }
        this.currentPanel = 'game-ui';
    }
    
    openScriptEditor() {
        this.hideAllPanels();
        const editor = document.getElementById('script-editor');
        if (editor) {
            editor.classList.remove('hidden');
        }
        this.currentPanel = 'editor';
        this.game.state = 'EDITOR';
        
        // 加载 NPC 列表
        if (this.game.scriptEditor) {
            this.game.scriptEditor.loadNPCList();
        }
    }
    
    closeScriptEditor() {
        const editor = document.getElementById('script-editor');
        if (editor) {
            editor.classList.add('hidden');
        }
        
        if (this.game.state === 'EDITOR') {
            this.game.state = 'PLAYING';
            this.showGameUI();
        }
    }
    
    hideAllPanels() {
        const panels = document.querySelectorAll('.ui-panel');
        panels.forEach(panel => {
            panel.classList.add('hidden');
        });
    }
    
    startGame() {
        this.game.startGame();
    }
    
    updatePlayerStats(player) {
        if (!player) return;
        
        const hpDisplay = document.getElementById('hp-display');
        const levelDisplay = document.getElementById('level-display');
        const expDisplay = document.getElementById('exp-display');
        
        if (hpDisplay) {
            hpDisplay.textContent = `HP: ${player.hp}/${player.maxHp}`;
        }
        
        if (levelDisplay) {
            levelDisplay.textContent = `LV: ${player.level}`;
        }
        
        if (expDisplay) {
            expDisplay.textContent = `EXP: ${player.exp}/${player.maxExp}`;
        }
    }
    
    addNewNPC() {
        if (this.game.scriptEditor) {
            this.game.scriptEditor.createNewNPC();
        }
    }
    
    saveNPC() {
        if (this.game.scriptEditor) {
            this.game.scriptEditor.saveCurrentNPC();
        }
    }
    
    deleteSelectedNPC() {
        if (this.game.scriptEditor) {
            this.game.scriptEditor.deleteCurrentNPC();
        }
    }
    
    selectNPCInList(id) {
        if (this.game.scriptEditor) {
            this.game.scriptEditor.selectNPC(id);
        }
    }
}
