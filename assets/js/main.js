/**
 * 主JS文件
 * 整合所有组件功能
 */

// 初始化页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 高亮当前活动导航项
    highlightActiveNavItem();
    
    // 添加平滑滚动
    initSmoothScroll();
    
    // 初始化游戏容器动画
    initGameContainerAnimation();
});

/**
 * 高亮当前活动导航项
 */
function highlightActiveNavItem() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    // 处理导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 检查链接是否匹配当前路径或哈希
        if ((href === currentPath) || 
            (href.startsWith('#') && href === currentHash) ||
            (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    // 获取所有锚点链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 平滑滚动到目标元素
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度和一些额外空间
                    behavior: 'smooth'
                });
                
                // 更新URL哈希值，但不跳转
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * 初始化游戏容器动画
 */
function initGameContainerAnimation() {
    // 检查IntersectionObserver API是否可用
    if ('IntersectionObserver' in window) {
        const gameContainers = document.querySelectorAll('.game-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 元素进入视口，设置可见性
                    entry.target.style.opacity = '1';
                    // 停止观察此元素
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // 使用视口作为根
            threshold: 0.1 // 当10%的元素可见时触发
        });
        
        // 开始观察所有游戏容器
        gameContainers.forEach(container => {
            observer.observe(container);
        });
    } else {
        // 回退方案：立即显示所有游戏容器
        const gameContainers = document.querySelectorAll('.game-container');
        gameContainers.forEach(container => {
            container.style.opacity = '1';
        });
    }
}
