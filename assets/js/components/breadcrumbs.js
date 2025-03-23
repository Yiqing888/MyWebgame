/**
 * 面包屑导航组件 
 * 用于显示当前页面在网站层次结构中的位置
 */

function initBreadcrumbs() {
  // 获取当前页面路径
  const path = window.location.pathname;
  
  // 忽略首页的面包屑
  if (path === '/' || path === '/index.html') {
    return;
  }
  
  // 创建面包屑容器
  const breadcrumbsContainer = document.getElementById('breadcrumbs-container');
  if (!breadcrumbsContainer) return;
  
  // 解析路径创建面包屑
  const pathSegments = path.split('/').filter(segment => segment && segment !== 'index.html');
  
  // 创建面包屑HTML
  let breadcrumbsHTML = `
    <nav aria-label="面包屑导航" class="py-3 px-4 bg-white rounded-lg shadow-sm mb-4">
      <ol class="flex flex-wrap items-center text-sm text-gray-600">
        <li class="flex items-center">
          <a href="/" class="hover:text-apple-darkblue transition-colors duration-300">首页</a>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
  `;
  
  // 添加路径段
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // 格式化显示名称
    let displayName = segment.replace('.html', '').replace(/-/g, ' ');
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    
    if (index === pathSegments.length - 1) {
      // 最后一项是当前页面
      breadcrumbsHTML += `<li class="font-medium text-apple-darkblue">${displayName}</li>`;
    } else {
      breadcrumbsHTML += `
        <li class="flex items-center">
          <a href="${currentPath}" class="hover:text-apple-darkblue transition-colors duration-300">${displayName}</a>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
      `;
    }
  });
  
  breadcrumbsHTML += `</ol></nav>`;
  
  // 添加到页面
  breadcrumbsContainer.innerHTML = breadcrumbsHTML;
}

// 页面加载完成后初始化面包屑
document.addEventListener('DOMContentLoaded', initBreadcrumbs); 