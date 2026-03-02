// ===== UTILITÁRIOS GLOBAIS =====
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format number with Brazilian locale
    formatNumber(number) {
        return new Intl.NumberFormat('pt-BR').format(number);
    },

    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Safe query selector
    qs(selector, context = document) {
        return context.querySelector(selector);
    },

    qsa(selector, context = document) {
        return Array.from(context.querySelectorAll(selector));
    }
};

// ===== TOAST SYSTEM =====
const Toast = {
    container: null,

    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(this.container);
        }
    },

    show({ title, description, duration = 3000, type = 'info' }) {
        if (!this.container) this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: var(--surface);
            border-left: 4px solid ${type === 'success' ? 'var(--secondary)' : 'var(--primary)'};
            border-radius: 5px;
            padding: 12px 16px;
            box-shadow: 0 4px 12px var(--shadow);
            animation: slideInRight 0.3s ease;
            min-width: 250px;
        `;

        toast.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
            ${description ? `<div style="font-size: 0.9rem; color: var(--text-light);">${description}</div>` : ''}
        `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    },

    success(title, description) {
        this.show({ title, description, type: 'success' });
    },

    error(title, description) {
        this.show({ title, description, type: 'error' });
    },

    info(title, description) {
        this.show({ title, description, type: 'info' });
    }
};

// ===== ANIMATION MANAGER =====
const AnimationManager = {
    observers: new Map(),

    init() {
        this.setupScrollAnimations();
        this.setupCounters();
    },

    setupScrollAnimations() {
        const animatedElements = Utils.qsa('[data-animate]');
        
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate || 'fadeInUp';
                    const delay = parseInt(element.dataset.delay) || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animated');
                        element.style.animationName = animation;
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });

        animatedElements.forEach(el => observer.observe(el));
        this.observers.set('scroll', observer);
    },

    setupCounters() {
        const counters = Utils.qsa('.counter[data-target]');
        
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = parseInt(counter.dataset.duration) || 2000;
                    
                    if (!isNaN(target)) {
                        this.animateCounter(counter, 0, target, duration);
                    }
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
        this.observers.set('counters', observer);
    },

    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        window.requestAnimationFrame(step);
    },

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
};

// ===== MOBILE MENU MANAGER =====
const MobileMenuManager = {
    menuBtn: null,
    mainNav: null,
    mobileOverlay: null,
    body: null,
    isOpen: false,

    init() {
        this.menuBtn = Utils.qs('.mobile-menu-btn');
        this.mainNav = Utils.qs('#mainNav');
        this.mobileOverlay = Utils.qs('.mobile-overlay');
        this.body = document.body;
        
        if (!this.menuBtn || !this.mainNav) return;

        this.addEventListeners();
        this.handleResize();
    },

    addEventListeners() {
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.toggleMenu());
        }
        
        window.addEventListener('resize', Utils.debounce(() => this.handleResize(), 150));
        
        // Close menu when clicking on links
        this.mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 1023 && !link.closest('.dropdown')) {
                    this.toggleMenu();
                }
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.toggleMenu();
            }
        });
    },

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.mainNav.classList.toggle('active', this.isOpen);
        if (this.mobileOverlay) {
            this.mobileOverlay.classList.toggle('active', this.isOpen);
        }
        this.body.style.overflow = this.isOpen ? 'hidden' : '';
        this.menuBtn.setAttribute('aria-expanded', this.isOpen);
    },

    handleDropdowns() {
        if (window.innerWidth <= 1023) {
            const dropdowns = Utils.qsa('.nav-item.dropdown');
            
            dropdowns.forEach(item => {
                const link = item.querySelector('.nav-link');
                
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('active');
                        }
                    });
                    
                    item.classList.toggle('active');
                });
            });
        } else {
            Utils.qsa('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    },

    handleResize() {
        if (window.innerWidth > 1023) {
            if (this.isOpen) this.toggleMenu();
            this.body.style.overflow = '';
        } else {
            this.handleDropdowns();
        }
    }
};

// ===== NAVIGATION MANAGER =====
const NavigationManager = {
    init() {
        this.setActiveLink();
        this.setupScrollListener();
    },

    setActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = Utils.qsa('.nav-link:not(.dropdown-item)');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            link.classList.remove('active');
            
            if (link.closest('.dropdown-menu')) return;
            
            if ((href === 'index.html' || href === '/') && 
                (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '')) {
                link.classList.add('active');
            }
            else if (href && href !== '#' && href !== '/' && !href.startsWith('http')) {
                const hrefWithoutHtml = href.replace('.html', '');
                if (currentPath.includes(hrefWithoutHtml)) {
                    link.classList.add('active');
                }
            }
        });
    },

    setupScrollListener() {
        const header = Utils.qs('.header');
        if (!header) return;

        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100));
    }
};

// ===== VIDEO PLAYER =====
const VideoPlayer = {
    init() {
        const video = Utils.qs('.video-wrapper video');
        const wrapper = Utils.qs('.video-wrapper');

        if (!video || !wrapper) return;

        video.addEventListener('play', () => {
            wrapper.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            wrapper.classList.remove('playing');
        });

        video.addEventListener('ended', () => {
            wrapper.classList.remove('playing');
        });

        // Click on wrapper toggles play/pause
        wrapper.addEventListener('click', (e) => {
            if (e.target === video) return;
            
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Keyboard support
        wrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });

        // Set tabindex for keyboard navigation
        wrapper.setAttribute('tabindex', '0');
        wrapper.setAttribute('role', 'button');
        wrapper.setAttribute('aria-label', 'Reproduzir vídeo');
    }
};

// ===== INICIALIZAÇÃO DOS COMPONENTES DA PÁGINA INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando componentes da página...');
    
    // Inicializa componentes existentes
    if (typeof MobileMenuManager !== 'undefined') {
        MobileMenuManager.init();
        console.log('✓ MobileMenuManager inicializado');
    }
    
    if (typeof NavigationManager !== 'undefined') {
        NavigationManager.init();
        console.log('✓ NavigationManager inicializado');
    }
    
    if (typeof VideoPlayer !== 'undefined') {
        VideoPlayer.init();
        console.log('✓ VideoPlayer inicializado');
    }
    
    if (typeof AnimationManager !== 'undefined') {
        AnimationManager.init();
        console.log('✓ AnimationManager inicializado');
    }

    // Inicializa a galeria
    if (typeof Gallery !== 'undefined' && Gallery.init) {
        Gallery.init();
        console.log('✓ Gallery inicializado');
    }

    // Atualiza o ano no footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Função para inicializar o BrandsCarousel com retry
function initBrandsCarouselWithRetry(retries = 5) {
    if (typeof BrandsCarousel !== 'undefined' && BrandsCarousel) {
        try {
            // Garante que o container existe
            const container = document.getElementById('brandsCarousel');
            if (!container) {
                console.error('Container #brandsCarousel não encontrado no DOM');
                return;
            }
            
            console.log('✓ Inicializando BrandsCarousel...');
            BrandsCarousel.init();
            console.log('✓ BrandsCarousel inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar BrandsCarousel:', error);
        }
    } else if (retries > 0) {
        console.log(`⏳ Aguardando BrandsCarousel... (${retries} tentativas restantes)`);
        setTimeout(() => initBrandsCarouselWithRetry(retries - 1), 200);
    } else {
        console.error('❌ BrandsCarousel não encontrado após várias tentativas');
    }
}

// Garante que o Utils está disponível globalmente
window.Utils = Utils;

// Inicializa o carrossel de marcas após um pequeno delay para garantir que todos os recursos estejam carregados
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initBrandsCarouselWithRetry, 300);
    });
} else {
    setTimeout(initBrandsCarouselWithRetry, 300);
}