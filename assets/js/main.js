/**
 * 主脚本文件
 * 导入所有其他JavaScript模块
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('TinyGame网站脚本已加载');
    
    // 导入各个模块
    // 注意：在生产环境中，这些模块应该通过构建工具进行管理
    const darkModeScript = document.createElement('script');
    darkModeScript.src = 'assets/js/components/darkmode.js';
    document.body.appendChild(darkModeScript);
    
    // 添加动画效果处理
    initializeAnimations();
    
    // 设置游戏模块的懒加载
    setupGameLazyLoading();
});

/**
 * 初始化动画效果
 */
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-slide-up');
    
    // 使用Intersection Observer检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // 观察所有动画元素
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 设置游戏模块的懒加载
 */
function setupGameLazyLoading() {
    // 只有当游戏区域滚动到视图中时才加载iframe内容
    const gameContainers = document.querySelectorAll('.game-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                
                // 查找容器内的iframe，如果有的话
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                }
            }
        });
    }, { threshold: 0.1 });
    
    gameContainers.forEach(container => {
        observer.observe(container);
    });
}
