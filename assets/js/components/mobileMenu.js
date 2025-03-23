/**
 * 移动端菜单组件
 * 用于响应式导航菜单的交互逻辑
 */

function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileMenuButton || !mobileMenu) return;
  
  // 点击按钮时切换菜单显示状态
  mobileMenuButton.addEventListener('click', () => {
    // 切换菜单显示/隐藏
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      
      // 添加动画效果
      mobileMenu.classList.add('animate-fade-in');
      
      // 更新按钮图标为关闭图标
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    } else {
      // 添加动画效果
      mobileMenu.classList.add('animate-fade-out');
      
      // 动画结束后隐藏菜单
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-fade-out');
      }, 300);
      
      // 更新按钮图标为菜单图标
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });
  
  // 点击菜单外部自动关闭菜单
  document.addEventListener('click', (event) => {
    if (!mobileMenuButton.contains(event.target) && 
        !mobileMenu.contains(event.target) && 
        !mobileMenu.classList.contains('hidden')) {
      
      // 添加动画效果
      mobileMenu.classList.add('animate-fade-out');
      
      // 动画结束后隐藏菜单
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-fade-out');
      }, 300);
      
      // 更新按钮图标为菜单图标
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });
  
  // 为移动菜单中的链接添加点击事件，点击后自动关闭菜单
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // 添加动画效果
      mobileMenu.classList.add('animate-fade-out');
      
      // 动画结束后隐藏菜单
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-fade-out');
      }, 300);
      
      // 更新按钮图标为菜单图标
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    });
  });
}

// 页面加载完成后初始化移动端菜单
document.addEventListener('DOMContentLoaded', initMobileMenu);
