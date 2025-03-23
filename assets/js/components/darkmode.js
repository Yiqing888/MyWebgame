/**
 * 深色模式切换功能
 */
class DarkMode {
    constructor() {
        this.storageKey = 'tinygame-darkmode';
        this.darkModeClass = 'dark-mode';
        this.darkModeToggle = null;
        this.prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        this.init();
    }

    init() {
        this.createToggleButton();
        this.loadSavedTheme();
        this.addEventListeners();
    }

    createToggleButton() {
        // 创建深色模式开关
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'dark-mode-toggle fixed top-4 right-4 z-50';
        
        this.darkModeToggle = document.createElement('button');
        this.darkModeToggle.className = 'bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg text-apple-black dark:text-white transition-colors duration-300';
        this.darkModeToggle.setAttribute('aria-label', '切换深色/浅色模式');
        
        // 根据当前模式设置图标
        this.updateToggleIcon();
        
        toggleContainer.appendChild(this.darkModeToggle);
        document.body.appendChild(toggleContainer);
    }

    updateToggleIcon() {
        const isDark = document.body.classList.contains(this.darkModeClass);
        
        // 使用太阳/月亮图标表示当前模式
        if (isDark) {
            this.darkModeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            `;
        } else {
            this.darkModeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            `;
        }
    }

    loadSavedTheme() {
        // 检查本地存储的主题偏好
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme === 'dark') {
            this.enableDarkMode();
        } else if (savedTheme === 'light') {
            this.disableDarkMode();
        } else if (this.prefersDarkMode.matches) {
            // 如果用户系统偏好深色模式且没有保存的设置，启用深色模式
            this.enableDarkMode();
        }
    }

    addEventListeners() {
        // 监听切换按钮点击
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        
        // 监听系统主题变化
        this.prefersDarkMode.addEventListener('change', (e) => {
            if (!localStorage.getItem(this.storageKey)) {
                if (e.matches) {
                    this.enableDarkMode();
                } else {
                    this.disableDarkMode();
                }
            }
        });
    }

    toggleDarkMode() {
        if (document.body.classList.contains(this.darkModeClass)) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }

    enableDarkMode() {
        document.body.classList.add(this.darkModeClass);
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(this.storageKey, 'dark');
        this.updateToggleIcon();
    }

    disableDarkMode() {
        document.body.classList.remove(this.darkModeClass);
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(this.storageKey, 'light');
        this.updateToggleIcon();
    }
}

// 当DOM加载完成时初始化深色模式功能
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeManager = new DarkMode();
});
