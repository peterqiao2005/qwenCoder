/**
 * 游戏入口文件
 * 初始化并启动游戏
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    console.log('日式卡通 A-RPG 游戏启动中...');
    
    // 创建游戏实例
    game = new Game();
    
    // 延迟初始化 UI 组件（确保 DOM 完全加载）
    setTimeout(() => {
        if (game && typeof CombatUI !== 'undefined') {
            game.combatUI = new CombatUI(game);
        }
        if (game && typeof QuestUI !== 'undefined') {
            game.questUI = new QuestUI(game);
        }
        
        // 绑定任务列表快捷键 (Q 键)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'q' || e.key === 'Q') {
                if (game.state === 'PLAYING' && game.questUI) {
                    game.questUI.show();
                }
            }
        });
        
        console.log('游戏系统初始化完成！');
        console.log('操作说明：');
        console.log('- WASD/方向键：移动');
        console.log('- 鼠标点击：移动到目标位置');
        console.log('- E 键：与 NPC 互动');
        console.log('- ESC：打开/关闭菜单');
        console.log('- 空格：继续对话');
        console.log('- Q 键：打开任务列表');
    }, 100);
});

// 全局错误处理
window.addEventListener('error', (e) => {
    console.error('游戏发生错误:', e.error);
});

console.log('游戏脚本加载完成');
