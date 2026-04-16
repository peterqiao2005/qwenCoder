/**
 * 游戏主入口
 * 初始化并启动游戏
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 樱花剑士 - 日式卡通 A-RPG ===');
    console.log('版本：1.0.0 Demo');
    console.log('正在初始化游戏...');
    
    try {
        // 创建游戏实例
        game = new Game();
        
        console.log('游戏初始化完成！');
        console.log('');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('操作说明:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('• WASD / 方向键 - 移动角色');
        console.log('• 鼠标点击 - 移动到目标位置');
        console.log('• E 键 - 与 NPC 互动/对话');
        console.log('• ESC - 打开/关闭菜单');
        console.log('• 空格键 - 继续对话');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        console.log('NPC 性别比例：80% 女性，20% 男性');
        console.log('当前 NPC 数量：10 人（8 女 2 男）');
        console.log('');
        console.log('点击"脚本编辑器"按钮可以编辑 NPC 数据');
        console.log('所有修改会自动保存到浏览器本地存储');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // 运行 Demo 脚本
        if (typeof DemoScript !== 'undefined') {
            setTimeout(() => {
                DemoScript.run(game);
            }, 1000);
        }
        
    } catch (error) {
        console.error('游戏初始化失败:', error);
        alert('游戏初始化失败，请查看控制台错误信息');
    }
});

// 页面关闭前保存数据
window.addEventListener('beforeunload', function() {
    if (game && typeof game.saveScript === 'function') {
        game.saveScript();
    }
});

// 全局错误处理
window.addEventListener('error', function(event) {
    console.error('全局错误:', event.message);
    console.error('文件:', event.filename, '行:', event.lineno);
});
