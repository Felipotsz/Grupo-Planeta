// ===== GALERIA DE MOMENTOS GRUPO PLANETA FERRAMENTAS =====

const galleryData = {
    // Todos os momentos da galeria - Eventos e ações do Grupo Planeta Ferramentas
    moments: [
        {
            id: 12,
            title: 'Inauguração Nova Matriz',
            description: 'Inauguração da nova matriz do Grupo Planeta Ferramentas em Tatuí com presença de parceiros e clientes',
            image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/novidades/inauguracao-matriz'
        },
        {
            id: 11,
            title: 'Workshop de Ferramentas Industriais',
            description: 'Workshop exclusivo para clientes com demonstração das melhores ferramentas para indústria',
            image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/eventos/workshop-industrial'
        },
        {
            id: 10,
            title: 'Ação Social - Doação de Ferramentas',
            description: 'Campanha de doação de ferramentas para escolas profissionalizantes de Tatuí e região',
            image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/social/doacao-escolas'
        },
        {
            id: 9,
            title: 'Feira de Negócios do Sudoeste Paulista',
            description: 'Participação do Planeta Ferramentas na maior feira de negócios da região de Tatuí',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/eventos/feira-negocios'
        },
        {
            id: 8,
            title: 'Palestra Técnica - Bosch',
            description: 'Parceria com a Bosch para capacitação técnica de clientes e profissionais da região',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/eventos/palestra-bosch'
        },
        {
            id: 7,
            title: 'Aniversário de 18 Anos',
            description: 'Celebração dos 18 anos do Grupo Planeta Ferramentas com clientes, parceiros e colaboradores',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/institucional/18-anos'
        },
        {
            id: 6,
            title: 'Campanha de Natal dos Colaboradores',
            description: 'Confraternização de fim de ano com toda equipe do Grupo Planeta Ferramentas',
            image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/institucional/natal-colaboradores'
        },
        {
            id: 5,
            title: 'Visita Técnica à Makita',
            description: 'Equipe do Planeta Ferramentas visita fábrica da Makita para conhecer novidades em primeira mão',
            image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/parceiros/visita-makita'
        },
        {
            id: 4,
            title: 'Dia do Cliente Especial',
            description: 'Evento com descontos exclusivos e brindes para clientes do Planeta Ferramentas',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/promocoes/dia-cliente'
        },
        {
            id: 3,
            title: 'Treinamento de Equipe - Metabo',
            description: 'Capacitação da equipe com produtos Metabo para melhor atender nossos clientes',
            image: 'https://images.unsplash.com/photo-1552664688-cf412ec27db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/institucional/treinamento-metabo'
        },
        {
            id: 2,
            title: 'Ação do Dia do Trabalhador',
            description: 'Oferta especial e café da manhã para profissionais da construção civil em Tatuí',
            image: 'https://images.unsplash.com/photo-1556905200-0034a0e90f3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/promocoes/dia-trabalhador'
        },
        {
            id: 1,
            title: 'Entrega de Prêmio Fornecedor do Ano',
            description: 'Planeta Ferramentas recebe prêmio de melhor distribuidor da região pela Stanley Black&Decker',
            image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            link: 'https://planetaferramentas.com.br/institucional/premio-fornecedor-ano'
        }
    ],
    
    // Estatísticas da empresa (opcional - pode ser usado em outro lugar)
    stats: {
        years: 18,
        clients: 15000,
        brands: 50,
        employees: 45
    },
    
    // Marcas parceiras (opcional)
    partnerBrands: [
        'Bosch', 'Makita', 'Metabo', 'Stanley', 'Black&Decker', 'Dewalt',
        'Tramontina', 'Vonder', 'Gedore', 'Belzer', 'Irwin', 'Milwaukee'
    ]
};

// Função auxiliar para garantir que o array esteja sempre ordenado (do mais recente para o mais antigo)
function sortMomentsByRecent() {
    if (galleryData && galleryData.moments) {
        galleryData.moments.sort((a, b) => b.id - a.id);
    }
}

// Função para filtrar momentos por palavra-chave (útil para buscas)
function filterMoments(keyword) {
    if (!keyword || !galleryData || !galleryData.moments) return galleryData.moments;
    
    const searchTerm = keyword.toLowerCase();
    return galleryData.moments.filter(moment => 
        moment.title.toLowerCase().includes(searchTerm) || 
        moment.description.toLowerCase().includes(searchTerm)
    );
}

// Função para pegar momentos aleatórios (útil para destacar)
function getRandomMoments(count = 3) {
    if (!galleryData || !galleryData.moments) return [];
    
    const shuffled = [...galleryData.moments].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Chamar a função para garantir ordenação
sortMomentsByRecent();

// ===== GALERIA SLIDER =====
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('gallerySlider');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    // Renderizar os slides com os dados do galleryData
    function renderGallery() {
        if (!galleryData || !galleryData.moments || galleryData.moments.length === 0) return;
        
        let slidesHTML = '';
        galleryData.moments.forEach(moment => {
            slidesHTML += `
                <div class="gallery-slide" tabindex="0" role="group" aria-label="${moment.title}">
                    <img src="${moment.image}" alt="${moment.title}" loading="lazy">
                    <div class="gallery-caption">
                        <h4>${moment.title}</h4>
                        <p>${moment.description}</p>
                    </div>
                    <a href="${moment.link}" class="gallery-link" target="_blank" rel="noopener noreferrer" aria-label="Ver mais sobre ${moment.title}"></a>
                </div>
            `;
        });
        
        slider.innerHTML = slidesHTML;
    }
    
    renderGallery();
    
    const slides = slider.children;
    const totalSlides = slides.length;
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let slideWidth = 0;
    let gap = 24; // mesmo valor do gap no CSS
    
    // Criar container para os dots se não existir
    let dotsContainer = document.querySelector('.gallery-dots');
    if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'gallery-dots';
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
            gallerySection.appendChild(dotsContainer);
        }
    }
    
    // Criar dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot';
            dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    const dots = document.querySelectorAll('.gallery-dot');
    
    function getSlidesPerView() {
        if (window.innerWidth <= 767) return 1;
        if (window.innerWidth <= 1023) return 2;
        return 3;
    }
    
    function updateSlideWidth() {
        if (slides.length > 0 && slider.parentElement) {
            const containerWidth = slider.parentElement.offsetWidth;
            slidesPerView = getSlidesPerView();
            slideWidth = (containerWidth - (gap * (slidesPerView - 1))) / slidesPerView;
            
            // Aplicar largura aos slides
            Array.from(slides).forEach(slide => {
                slide.style.flex = `0 0 ${slideWidth}px`;
            });
        }
    }
    
    function updateSlider() {
        if (slides.length === 0) return;
        
        slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        currentIndex = Math.min(currentIndex, maxIndex);
        
        const translateX = currentIndex * (slideWidth + gap);
        slider.style.transform = `translateX(-${translateX}px)`;
        
        // Update buttons
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update ARIA
        slider.setAttribute('aria-posinset', currentIndex + 1);
        slider.setAttribute('aria-setsize', totalSlides);
    }
    
    function goToSlide(index) {
        slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        currentIndex = Math.min(Math.max(0, index), maxIndex);
        updateSlider();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Touch events para mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let isHorizontalSwipe = false;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isHorizontalSwipe = false;
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isHorizontalSwipe) {
            const touchX = e.changedTouches[0].screenX;
            const touchY = e.changedTouches[0].screenY;
            const diffX = Math.abs(touchX - touchStartX);
            const diffY = Math.abs(touchY - touchStartY);
            
            // Se o movimento horizontal for maior que o vertical, é um swipe horizontal
            if (diffX > diffY && diffX > 10) {
                isHorizontalSwipe = true;
                e.preventDefault(); // Previne scroll apenas quando for swipe horizontal
            }
        }
    }, { passive: false });
    
    slider.addEventListener('touchend', (e) => {
        if (!isHorizontalSwipe) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        
        if (Math.abs(diffX) > 50) { // 50px threshold
            if (diffX > 0 && nextBtn && !nextBtn.disabled) {
                goToSlide(currentIndex + 1);
            } else if (diffX < 0 && prevBtn && !prevBtn.disabled) {
                goToSlide(currentIndex - 1);
            }
        }
    }, { passive: true });
    
    // Resize event com debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlideWidth();
            updateSlider();
        }, 150);
    });
    
    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (prevBtn) prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (nextBtn) nextBtn.click();
        }
    });
    
    // Inicialização
    setTimeout(() => {
        updateSlideWidth();
        updateSlider();
    }, 100);
    
    // Observer para quando as imagens carregarem
    const images = slider.querySelectorAll('img');
    let imagesLoaded = 0;
    
    images.forEach(img => {
        // Adicionar classe para loading
        img.classList.add('gallery-image-loading');
        
        if (img.complete) {
            imagesLoaded++;
            img.classList.remove('gallery-image-loading');
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                img.classList.remove('gallery-image-loading');
                img.classList.add('loaded');
                
                if (imagesLoaded === images.length) {
                    updateSlideWidth();
                    updateSlider();
                }
            });
            
            img.addEventListener('error', () => {
                imagesLoaded++;
                // Usar imagem fallback em caso de erro
                img.src = 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                img.classList.remove('gallery-image-loading');
                img.classList.add('loaded', 'error');
            });
        }
    });
    
    if (imagesLoaded === images.length) {
        updateSlideWidth();
        updateSlider();
    }
});

// ===== FUNÇÕES ADICIONAIS PARA INTEGRAÇÃO =====

// Função para atualizar estatísticas no HTML (se houver)
function updateCompanyStats() {
    const statElements = {
        years: document.getElementById('stat-years'),
        clients: document.getElementById('stat-clients'),
        brands: document.getElementById('stat-brands'),
        employees: document.getElementById('stat-employees')
    };
    
    if (statElements.years) statElements.years.textContent = galleryData.stats.years + '+';
    if (statElements.clients) statElements.clients.textContent = galleryData.stats.clients.toLocaleString('pt-BR') + '+';
    if (statElements.brands) statElements.brands.textContent = galleryData.stats.brands + '+';
    if (statElements.employees) statElements.employees.textContent = galleryData.stats.employees;
}

// Chamar updateStats quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    updateCompanyStats();
});

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { galleryData, filterMoments, getRandomMoments };
}