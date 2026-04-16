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
        
        // 肖像图片映射
        this.portraitImages = {
            'sakura': 'assets/images/portrait-female-1.svg',
            'yuki': 'assets/images/portrait-female-2.svg',
            'luna': 'assets/images/portrait-female-3.svg',
            'akane': 'assets/images/portrait-female-4.svg',
            'takeshi': 'assets/images/portrait-male-1.svg',
            'kenji': 'assets/images/portrait-male-2.svg'
        };
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
        const dialogName = document.getElementById('dialog-name');
        
        if (dialogBox && this.currentNPC) {
            // 设置肖像图片
            if (dialogPortrait) {
                const portraitSrc = this.getPortraitForNPC(this.currentNPC);
                if (portraitSrc) {
                    dialogPortrait.innerHTML = `<img src="${portraitSrc}" alt="${this.currentNPC.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`;
                } else {
                    // 如果没有图片，使用渐变色背景
                    dialogPortrait.style.background = this.currentNPC.gender === 'female' 
                        ? 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)'
                        : 'linear-gradient(135deg, #87CEFA 0%, #4682B4 100%)';
                    dialogPortrait.innerHTML = '';
                }
            }
            
            // 设置角色名称
            if (dialogName) {
                dialogName.textContent = this.currentNPC.name;
            }
            
            dialogBox.classList.remove('hidden');
            dialogText.textContent = '...';
        }
    }
    
    getPortraitForNPC(npc) {
        // 根据 NPC ID 或名称查找肖像
        if (npc.portrait) {
            return npc.portrait;
        }
        
        // 尝试通过名称匹配（确保 id 是字符串）
        const npcId = String(npc.id || '');
        const npcName = String(npc.name || '');
        
        for (const [key, value] of Object.entries(this.portraitImages)) {
            if (npcId.toLowerCase().includes(key) || npcName.toLowerCase().includes(key)) {
                return value;
            }
        }
        
        // 默认返回基于性别的肖像
        if (npc.gender === 'female') {
            const femalePortraits = ['assets/images/portrait-female-1.svg', 'assets/images/portrait-female-2.svg', 'assets/images/portrait-female-3.svg', 'assets/images/portrait-female-4.svg'];
            return femalePortraits[Math.floor(Math.random() * femalePortraits.length)];
        } else {
            const malePortraits = ['assets/images/portrait-male-1.svg', 'assets/images/portrait-male-2.svg'];
            return malePortraits[Math.floor(Math.random() * malePortraits.length)];
        }
    }
    
    updateDialogueUI() {
        const dialogText = document.getElementById('dialog-text');
        if (dialogText && this.currentNPC) {
            dialogText.textContent = this.displayedText;
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
