// ===== CONFIGURAÇÃO DAS MARCAS =====
const BRANDS = [
    {
        id: 14,
        name: 'Bosch',
        logo: 'https://blog.coremma.com.br/wp-content/uploads/2023/02/bosch-ferramentas-produtos-empresa-linha-bosch12v-bosch18v-01-1.png',
        alt: 'Bosch - Tecnologia em ferramentas',
        url: '#'
    },
    {
        id: 13,
        name: 'Dormer',
        logo: 'https://cdn.worldvectorlogo.com/logos/dormer.svg',
        alt: 'Dormer - Soluções em ferramentas',
        url: '#'
    },
    {
        id: 12,
        name: 'Stanley',
        logo: 'https://blog.coremma.com.br/wp-content/uploads/2023/10/stanley-ferramentas.png',
        alt: 'Stanley - Ferramentas manuais',
        url: '#'
    },
    {
        id: 11,
        name: 'Lupus',
        logo: 'https://expopostos.com.br/wp-content/uploads/2020/07/Lupus.png',
        alt: 'Lupus - Soluções práticas',
        url: '#'
    },
    {
        id: 10,
        name: 'Boxer',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmxClCA9yl6MKJHT9xmUeDS2aYMG_JyEfVQg&s',
        alt: 'Boxer - Tecnologia em Soldas',
        url: '#'
    },
    {
        id: 9,
        name: 'DeWalt',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJP5CRYVLdFq0HlevhoFOD_M4Fd3YEMehww&s',
        alt: 'DeWalt - Performance profissional',
        url: '#'
    },
    {
        id: 8,
        name: 'CMB',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5yLkjW-A_reMORKCj0GcVIjIUyHDlj1bbww&s',
        alt: 'CMB - Organizadores Industriais e Corporativos',
        url: '#'
    },
    {
        id: 7,
        name: 'Black & Decker',
        logo: 'https://gkpb.com.br/wp-content/uploads/2014/02/black_decker_logo_detail.png',
        alt: 'Black & Decker - Ferramentas Elétricas Portáteis',
        url: '#'
    },
    {
        id: 6,
        name: 'CARBOGRAFITE',
        logo: 'https://yt3.googleusercontent.com/bJVfBSGH2TtUnq1wnqixovyFdG3Xsymlhk6hln6uR2wCO56MMB54uYP4GvEy0GxigVGxGyoj_A=s900-c-k-c0x00ffffff-no-rj',
        alt: 'Carbografite - Ferramentas de alta qualidade',
        url: '#'
    },
    {
        id: 5,
        name: 'Scheider Eletric',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNJ_Qtp9vnIDiagTH4fOcQ4xygm85rvmLZg&s',
        alt: 'Scheider Eletric - Soluções em eletricidade',
        url: '#'
    },
    {
        id: 4,
        name: 'GEDORE',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSca2ODsBSfc5MrEJ-tYBNCFjRQbYMn1FUhuA&s',
        alt: 'GEDORE - Estrutura para Máximo Desempenho',
        url: '#'
    },
    {
        id: 3,
        name: 'Tramontina',
        logo: 'https://prd-assets-portal.tramontina.com/xlarge_Nova_Marca_Tramontina_342cabb7e7.png',
        alt: 'Tramontina - Corte Rápido e Preciso',
        url: '#'
    },
    {
        id: 2,
        name: 'CSM',
        logo: 'https://supertecmt.com.br/wp-content/uploads/2024/08/CSM.jpg',
        alt: 'CSM - Máquinas e Equipamentos para Construção',
        url: '#'
    },
    {
        id: 1,
        name: 'Trapp',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcvguQW-Ik-0yqjdoOiPwA_slpev2zbZsqCA&s',
        alt: 'Trapp - Tecnologia e Equipamentos de Alta Qualidade',
        url: '#'
    }
];

// ===== CARROSSEL DE MARCAS =====
const BrandsCarousel = {
    container: null,
    track: null,
    prevArrow: null,
    nextArrow: null,
    indicatorsContainer: null,
    state: {
        currentIndex: 0,
        totalItems: BRANDS.length,
        itemsPerView: 5,
        isTransitioning: false,
        autoplayInterval: null,
        touchStartX: 0,
        touchEndX: 0
    },
    config: {
        autoplayInterval: 5000,
        transitionDuration: 500,
        itemsPerView: {
            desktop: 5,
            tablet: 3,
            mobile: 2,
            smallMobile: 1
        }
    },

    init() {
        console.log('🚀 Inicializando BrandsCarousel...');
        
        // Aguarda o DOM estar completamente carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    },

    initialize() {
        // Busca os elementos no DOM
        this.container = document.getElementById('brandsCarousel');
        this.prevArrow = document.querySelector('.prev-arrow');
        this.nextArrow = document.querySelector('.next-arrow');
        this.indicatorsContainer = document.getElementById('carouselIndicators');

        if (!this.container) {
            console.error('❌ Container #brandsCarousel não encontrado!');
            return;
        }

        console.log('✅ Container encontrado, renderizando marcas...');
        
        // Ordena as marcas
        const sortedBrands = this.sortBrandsByNewestFirst(BRANDS);
        
        // Renderiza as marcas
        this.render(sortedBrands);
        
        // Configura os event listeners
        this.setupEventListeners();
        
        // Atualiza items per view baseado no tamanho da tela
        this.updateItemsPerView();
        
        // Inicia o autoplay
        this.startAutoplay();
        
        console.log('✅ BrandsCarousel inicializado com sucesso!');
    },

    sortBrandsByNewestFirst(brands) {
        return [...brands].sort((a, b) => b.id - a.id);
    },

    render(brands) {
        if (!this.container) {
            console.error('Container do carrossel não encontrado');
            return;
        }

        // Limpa o container
        this.container.innerHTML = '';

        // Cria o track
        this.track = document.createElement('div');
        this.track.className = 'brands-track';
        this.track.id = 'brandsTrack';
        this.track.setAttribute('aria-live', 'polite');

        // Renderiza as marcas
        brands.forEach((brand) => {
            const brandItem = document.createElement('div');
            brandItem.className = 'brand-item';
            brandItem.tabIndex = 0;
            brandItem.setAttribute('role', 'figure');
            brandItem.setAttribute('aria-label', `Logo da ${brand.name}`);
            brandItem.dataset.brandId = brand.id;

            const img = document.createElement('img');
            img.src = brand.logo;
            img.alt = brand.alt;
            img.loading = 'lazy';
            
            // Tratamento de erro para imagens que não carregam
            img.onerror = function() {
                console.warn(`Imagem não carregou para a marca: ${brand.name}`);
                this.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.textContent = brand.name;
                fallback.style.cssText = 'font-size: 0.9rem; color: var(--primary); font-weight: 600;';
                brandItem.appendChild(fallback);
            };

            img.onload = function() {
                console.log(`✅ Imagem carregada: ${brand.name}`);
            };

            if (brand.url && brand.url !== '#') {
                const link = document.createElement('a');
                link.href = brand.url;
                link.setAttribute('aria-label', `Visitar site da ${brand.name}`);
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                link.appendChild(img);
                brandItem.appendChild(link);
            } else {
                brandItem.appendChild(img);
            }

            this.track.appendChild(brandItem);
        });

        this.container.appendChild(this.track);
        this.renderIndicators();
        
        // Força a atualização do transform após a renderização
        setTimeout(() => {
            this.updateTransform();
        }, 100);
    },

    renderIndicators() {
        if (!this.indicatorsContainer) return;

        const totalSlides = Math.ceil(BRANDS.length / this.state.itemsPerView);
        this.indicatorsContainer.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            indicator.dataset.index = i;

            indicator.addEventListener('click', () => {
                this.goToSlide(i);
            });

            this.indicatorsContainer.appendChild(indicator);
        }
    },

    setupEventListeners() {
        if (this.prevArrow) {
            this.prevArrow.addEventListener('click', () => {
                if (!this.state.isTransitioning) this.previousSlide();
            });
        }

        if (this.nextArrow) {
            this.nextArrow.addEventListener('click', () => {
                if (!this.state.isTransitioning) this.nextSlide();
            });
        }

        // Touch events
        if (this.container) {
            this.container.addEventListener('touchstart', (e) => {
                this.state.touchStartX = e.touches[0].clientX;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                if (!this.state.touchStartX) return;

                this.state.touchEndX = e.changedTouches[0].clientX;
                const diff = this.state.touchStartX - this.state.touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.previousSlide();
                    }
                }

                this.state.touchStartX = 0;
                this.state.touchEndX = 0;
            });

            // Mouse enter/leave for autoplay
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }

        // Resize handler
        window.addEventListener('resize', this.debounce(() => {
            const oldItemsPerView = this.state.itemsPerView;
            this.updateItemsPerView();

            if (oldItemsPerView !== this.state.itemsPerView) {
                this.renderIndicators();
                this.goToSlide(0);
            }
        }, 250));
    },

    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    updateItemsPerView() {
        const width = window.innerWidth;

        if (width <= 480) {
            this.state.itemsPerView = this.config.itemsPerView.smallMobile;
        } else if (width <= 768) {
            this.state.itemsPerView = this.config.itemsPerView.mobile;
        } else if (width <= 992) {
            this.state.itemsPerView = this.config.itemsPerView.tablet;
        } else {
            this.state.itemsPerView = this.config.itemsPerView.desktop;
        }

        this.updateTransform();
    },

    previousSlide() {
        const maxIndex = Math.max(0, Math.ceil(BRANDS.length / this.state.itemsPerView) - 1);
        const newIndex = this.state.currentIndex > 0 ? this.state.currentIndex - 1 : maxIndex;
        this.goToSlide(newIndex);
    },

    nextSlide() {
        const maxIndex = Math.max(0, Math.ceil(BRANDS.length / this.state.itemsPerView) - 1);
        const newIndex = this.state.currentIndex < maxIndex ? this.state.currentIndex + 1 : 0;
        this.goToSlide(newIndex);
    },

    goToSlide(index) {
        if (this.state.isTransitioning) return;

        const maxIndex = Math.max(0, Math.ceil(BRANDS.length / this.state.itemsPerView) - 1);
        const targetIndex = Math.min(maxIndex, Math.max(0, index));

        if (targetIndex === this.state.currentIndex) return;

        this.state.isTransitioning = true;
        this.state.currentIndex = targetIndex;

        this.updateIndicators();
        this.updateTransform();

        setTimeout(() => {
            this.state.isTransitioning = false;
        }, this.config.transitionDuration);
    },

    updateTransform() {
        if (!this.track) return;

        const translateX = -(this.state.currentIndex * 100);
        this.track.style.transform = `translateX(${translateX}%)`;
        this.track.setAttribute('aria-label', `Slide ${this.state.currentIndex + 1} de ${Math.ceil(BRANDS.length / this.state.itemsPerView)}`);
    },

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.state.currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    },

    startAutoplay() {
        if (this.state.autoplayInterval) return;
        this.state.autoplayInterval = setInterval(() => {
            if (!this.state.isTransitioning) this.nextSlide();
        }, this.config.autoplayInterval);
    },

    stopAutoplay() {
        if (this.state.autoplayInterval) {
            clearInterval(this.state.autoplayInterval);
            this.state.autoplayInterval = null;
        }
    },

    // Public API to add new brand
    addNewBrand(newBrand) {
        if (!newBrand.id) {
            console.error('Nova marca precisa ter um ID');
            return;
        }

        BRANDS.push(newBrand);
        const sortedBrands = this.sortBrandsByNewestFirst(BRANDS);
        this.state.totalItems = sortedBrands.length;
        
        this.render(sortedBrands);
        this.goToSlide(0);
    }
};

// Inicializa o carrossel quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.BrandsCarousel = BrandsCarousel;
        window.BRANDS = BRANDS;
        BrandsCarousel.init();
    });
} else {
    window.BrandsCarousel = BrandsCarousel;
    window.BRANDS = BRANDS;
    BrandsCarousel.init();
}