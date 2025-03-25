/**
 * 搜索功能组件
 * 用于实现游戏搜索功能
 */

// 游戏数据示例（实际应用中应从API或数据文件加载）
let gamesList = [];

// 加载游戏数据
async function loadGameData() {
  try {
    const response = await fetch('data/games.json');
    if (!response.ok) {
      throw new Error('无法加载游戏数据');
    }
    gamesList = await response.json();
  } catch (error) {
    console.error('加载游戏数据失败:', error);
    // 使用默认数据
    gamesList = [
      { 
        id: 1, 
        title: 'Multitask Challenge', 
        category: '益智类', 
        description: '同时操控多个任务，测试你的大脑极限！这款游戏会让你体验真正的多任务挑战。',
        url: 'pages/games/detail/multitask.html',
        thumbnail: 'https://placehold.co/600x400/651fff/ffffff?text=Multitask+Game'
      }
    ];
  }
}

// 搜索游戏
function searchGames(query) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  query = query.toLowerCase().trim();
  
  return gamesList.filter(game => {
    return (
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query) ||
      game.category.toLowerCase().includes(query)
    );
  });
}

// 渲染搜索结果
function renderSearchResults(results, container) {
  if (!container) return;
  
  if (results.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-gray-500">
        未找到相关游戏，请尝试其他关键词
      </div>
    `;
    return;
  }
  
  let resultsHTML = '';
  
  results.forEach(game => {
    resultsHTML += `
      <a href="${game.url}" class="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200">
        <img src="${game.thumbnail}" alt="${game.title}" class="w-16 h-16 object-cover rounded-lg mr-3">
        <div>
          <h4 class="font-semibold text-apple-black">${game.title}</h4>
          <div class="flex items-center mt-1">
            <span class="badge bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">${game.category}</span>
          </div>
        </div>
      </a>
    `;
  });
  
  container.innerHTML = resultsHTML;
}

// 初始化搜索功能
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');
  const searchOverlay = document.getElementById('search-overlay');
  
  if (!searchInput || !searchResults) return;
  
  // 加载游戏数据
  loadGameData();
  
  // 搜索输入框事件
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    const results = searchGames(query);
    
    // 显示或隐藏搜索结果容器
    if (query.trim() !== '') {
      searchResults.classList.remove('hidden');
      if (searchOverlay) searchOverlay.classList.remove('hidden');
      renderSearchResults(results, searchResults);
    } else {
      searchResults.classList.add('hidden');
      if (searchOverlay) searchOverlay.classList.add('hidden');
    }
  });
  
  // 搜索按钮点击事件
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value;
      if (query.trim() !== '') {
        const results = searchGames(query);
        searchResults.classList.remove('hidden');
        if (searchOverlay) searchOverlay.classList.remove('hidden');
        renderSearchResults(results, searchResults);
      }
    });
  }
  
  // 点击其他区域关闭搜索结果
  document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && 
        !searchResults.contains(event.target) && 
        !searchButton?.contains(event.target)) {
      searchResults.classList.add('hidden');
      if (searchOverlay) searchOverlay.classList.add('hidden');
    }
  });
  
  // 按下ESC键关闭搜索结果
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      searchResults.classList.add('hidden');
      if (searchOverlay) searchOverlay.classList.add('hidden');
    }
  });
}

// 页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', initSearch); 