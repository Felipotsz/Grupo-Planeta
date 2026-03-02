// ===== GLOBAL VARIABLES =====
const toastContainer = document.getElementById('toast-container');

// Controle do menu mobile
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    // Verificar se os elementos existem
    if (!menuToggle || !mainNav) {
        console.error('Elementos do menu não encontrados');
        return;
    }

    // Criar overlay para menu mobile
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);

    // Abrir/fechar menu
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    function toggleMenu() {
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Mudar ícone do menu
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            closeAllDropdowns();
        }
    }

    // Fechar menu ao clicar no overlay
    menuOverlay.addEventListener('click', function () {
        closeMenu();
    });

    function closeMenu() {
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        closeAllDropdowns();
    }

    function closeAllDropdowns() {
        const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown-menu');
            const icon = item.querySelector('.dropdown-icon');
            if (dropdown) dropdown.classList.remove('active');
            item.classList.remove('active');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
    }

    // Fechar menu ao clicar em um link (exceto dropdowns no mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parentDropdown = this.closest('.dropdown');
            
            // Se for mobile e for um dropdown, não fechar o menu
            if (window.innerWidth <= 992 && parentDropdown) {
                e.preventDefault();
                return;
            }
            
            // Se não for mobile ou não for dropdown, pode fechar o menu
            if (!parentDropdown || window.innerWidth > 992) {
                closeMenu();
            }
        });
    });

    // Controle do dropdown no mobile
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        const icon = item.querySelector('.dropdown-icon');

        if (!link || !dropdown || !icon) return;

        link.addEventListener('click', function (e) {
            // Só ativar no mobile
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();

                // Verificar se este dropdown já está ativo
                const isActive = dropdown.classList.contains('active');

                // Fechar outros dropdowns
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDropdown = otherItem.querySelector('.dropdown-menu');
                        const otherIcon = otherItem.querySelector('.dropdown-icon');
                        if (otherDropdown) otherDropdown.classList.remove('active');
                        otherItem.classList.remove('active');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Alternar estado do dropdown atual
                if (!isActive) {
                    dropdown.classList.add('active');
                    item.classList.add('active');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    dropdown.classList.remove('active');
                    item.classList.remove('active');
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Fechar dropdown ao clicar em um item do dropdown
        const dropdownLinks = item.querySelectorAll('.dropdown-item');
        dropdownLinks.forEach(dropdownLink => {
            dropdownLink.addEventListener('click', function () {
                if (window.innerWidth <= 992) {
                    // Pequeno delay para mostrar o feedback visual
                    setTimeout(() => {
                        closeMenu();
                    }, 150);
                }
            });
        });
    });

    // Fechar menu ao redimensionar a janela (se voltar para desktop)
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            closeMenu();
            // Resetar estilos dos dropdowns
            dropdownItems.forEach(item => {
                const icon = item.querySelector('.dropdown-icon');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.removeProperty('transform');
                }
            });
        }
    });

    // Atualizar o ano no footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ===== SCROLL MANAGER =====
const ScrollManager = {
    init() {
        this.header = document.querySelector('.header');
        
        if (this.header) {
            window.addEventListener('scroll', () => this.handleScroll());
            this.handleScroll();
        }
    },

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 10) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
};

// ===== INITIALIZE ALL GLOBAL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    ScrollManager.init();
    console.log('Global modules initialized');
});