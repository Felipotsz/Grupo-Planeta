(function () {
    'use strict';

    // Aplica o tema inicial
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateToggleIcons(savedTheme);
        console.log('Tema inicial aplicado:', savedTheme);
    }

    // Atualiza os ícones dentro dos sliders
    function updateToggleIcons(theme) {
        const sliders = document.querySelectorAll('.toggle-slider i');
        sliders.forEach(icon => {
            if (theme === 'dark') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        });
    }

    // Toggle do tema
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcons(newTheme);

        console.log('Tema alterado para:', newTheme);
    }

    // Inicializa os botões de tema
    function initThemeButtons() {
        const themeToggles = document.querySelectorAll('.theme-toggle');

        themeToggles.forEach(button => {
            button.removeEventListener('click', toggleTheme);
            button.addEventListener('click', toggleTheme);
        });
    }

    // Inicialização
    function initialize() {
        initTheme();
        initThemeButtons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();