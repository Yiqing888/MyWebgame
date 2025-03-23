/**
 * 返回顶部按钮组件
 * 用于页面滚动到一定高度时显示返回顶部按钮
 */

function initBackToTop() {
  // 创建返回顶部按钮元素
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.className = 'fixed bottom-5 right-5 bg-apple-darkblue text-white p-3 rounded-full shadow-lg opacity-0 transition-all duration-300 transform translate-y-10 hover:bg-blue-700 focus:outline-none z-50';
  backToTopButton.setAttribute('aria-label', '返回顶部');
  backToTopButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  `;
  
  // 添加到页面
  document.body.appendChild(backToTopButton);
  
  // 页面滚动事件监听
  function checkScrollPosition() {
    // 当页面滚动超过300px时显示按钮
    if (window.scrollY > 300) {
      backToTopButton.classList.remove('opacity-0', 'translate-y-10');
      backToTopButton.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopButton.classList.remove('opacity-100', 'translate-y-0');
      backToTopButton.classList.add('opacity-0', 'translate-y-10');
    }
  }
  
  // 点击返回顶部按钮
  backToTopButton.addEventListener('click', () => {
    // 平滑滚动到顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 监听滚动事件
  window.addEventListener('scroll', checkScrollPosition);
  
  // 初始检查
  checkScrollPosition();
}

// 页面加载完成后初始化返回顶部按钮
document.addEventListener('DOMContentLoaded', initBackToTop); 