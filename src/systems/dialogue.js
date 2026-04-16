/**
 * 对话系统
 * 管理 NPC 与玩家的对话交互
 */
class DialogueSystem {
    constructor(game) {
        this.game = game;
        this.isActive = false;
        this.currentNPC = null;
        this.dialogueLines = [];
        this.currentLineIndex = 0;
        this.typewriterTimer = 0;
        this.displayedText = '';
        this.isTyping = false;
    }
    
    startDialogue(npc) {
        if (!npc) return;
        
        this.currentNPC = npc;
        this.isActive = true;
        
        // 获取对话内容
        if (Array.isArray(npc.dialogue)) {
            this.dialogueLines = [...npc.dialogue];
        } else {
            this.dialogueLines = [npc.dialogue];
        }
        
        this.currentLineIndex = 0;
        this.showCurrentLine();
        
        // 显示对话框 UI
        this.showDialogueUI();
        
        console.log(`开始与${npc.name}对话`);
    }
    
    showCurrentLine() {
        if (this.currentLineIndex >= this.dialogueLines.length) {
            this.endDialogue();
            return;
        }
        
        const line = this.dialogueLines[this.currentLineIndex];
        this.startTypewriter(line);
    }
    
    startTypewriter(text) {
        this.displayedText = '';
        this.isTyping = true;
        this.typewriterTimer = 0;
        this.fullText = text;
        this.charIndex = 0;
    }
    
    update(deltaTime) {
        if (!this.isActive || !this.isTyping) return;
        
        this.typewriterTimer += deltaTime;
        
        // 打字机效果：每 50ms 显示一个字符
        if (this.typewriterTimer >= 50 && this.charIndex < this.fullText.length) {
            this.displayedText += this.fullText[this.charIndex];
            this.charIndex++;
            this.typewriterTimer = 0;
            
            // 更新 UI
            this.updateDialogueUI();
        }
        
        // 如果已经打完所有字
        if (this.charIndex >= this.fullText.length) {
            this.isTyping = false;
        }
    }
    
    nextLine() {
        if (this.isTyping) {
            // 如果正在打字，立即显示全部文字
            this.displayedText = this.fullText;
            this.isTyping = false;
            this.charIndex = this.fullText.length;
            this.updateDialogueUI();
            return;
        }
        
        this.currentLineIndex++;
        this.showCurrentLine();
    }
    
    endDialogue() {
        this.isActive = false;
        this.currentNPC = null;
        this.dialogueLines = [];
        this.currentLineIndex = 0;
        this.displayedText = '';
        this.hideDialogueUI();
        
        console.log('对话结束');
    }
    
    showDialogueUI() {
        const dialogBox = document.getElementById('dialog-box');
        const dialogPortrait = document.getElementById('dialog-portrait');
        const dialogText = document.getElementById('dialog-text');
        
        if (dialogBox && this.currentNPC) {
            // 设置肖像颜色（根据性别）
            dialogPortrait.style.background = this.currentNPC.gender === 'female' 
                ? 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)'
                : 'linear-gradient(135deg, #87CEFA 0%, #4682B4 100%)';
            
            dialogBox.classList.remove('hidden');
            dialogText.textContent = '...';
        }
    }
    
    updateDialogueUI() {
        const dialogText = document.getElementById('dialog-text');
        if (dialogText && this.currentNPC) {
            dialogText.textContent = `${this.currentNPC.name}: ${this.displayedText}`;
        }
    }
    
    hideDialogueUI() {
        const dialogBox = document.getElementById('dialog-box');
        if (dialogBox) {
            dialogBox.classList.add('hidden');
        }
    }
    
    addDialogueLine(line) {
        this.dialogueLines.push(line);
    }
    
    setDialogue(lines) {
        if (Array.isArray(lines)) {
            this.dialogueLines = lines;
        } else {
            this.dialogueLines = [lines];
        }
        this.currentLineIndex = 0;
    }
}
