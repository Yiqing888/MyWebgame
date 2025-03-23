/**
 * 滚动动画效果脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-slide-up');
    const backToTopButton = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        // 处理动画元素
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
            } else {
                element.style.opacity = '0';
            }
        });
        
        // 为进入视口的区域添加动画类
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('animate-fade-in');
            }
        });
        
        // 处理返回顶部按钮
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        }
    }
    
    // 返回顶部按钮点击事件
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查
});
