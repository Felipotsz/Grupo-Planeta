// produtos.js
(function() {
    'use strict';

    // ===== CONFIGURAÇÃO DOS PRODUTOS =====
    const PRODUCTS = [
        {
            id: 24,
            name: 'Multímetro Digital',
            brand: 'Scheider Electric',
            brandId: 5,
            price: 199.90,
            image: 'https://http2.mlstatic.com/D_Q_NP_817152-MLU71707193014_092023-O.webp',
            alt: 'Multímetro digital Schneider com display LCD e teste de continuidade',
            description: 'Multímetro digital com display LCD, teste de continuidade e diodos.',
            badge: null,
            url: '#'
        },
        {
            id: 23,
            name: 'Botina de Segurança',
            brand: 'Lupus',
            brandId: 11,
            price: 149.90,
            image: 'https://cdn.awsli.com.br/600x1000/1242/1242395/produto/302399861/botina-bota-de-seguranca-p-trabalho-bidensidade-marluvas-vulcaflex-10vb48_3183---i0wxgvqyqw.jpeg',
            alt: 'Botina de segurança Lupus em couro com bico de aço',
            description: 'Botina de segurança em couro com bico de aço, solado em PU e CA.',
            badge: null,
            url: '#'
        },
        {
            id: 22,
            name: 'Chave de Impacto',
            brand: 'DeWalt',
            brandId: 9,
            price: 999.90,
            image: 'https://static.felap.com.br/public/felap/imagens/produtos/chave-de-impacto-1-2-a-bateria-20v-max-xr-dewalt-64b59b8f97b30.jpg',
            alt: 'Chave de impacto DeWalt 20V com soquete 1/2"',
            description: 'Chave de impacto sem fio 20V com soquete 1/2" e torque de 600Nm.',
            badge: null,
            url: '#'
        },
        {
            id: 21,
            name: 'Tupia Router',
            brand: 'Bosch',
            brandId: 14,
            price: 799.90,
            image: 'https://http2.mlstatic.com/D_NQ_NP_935297-MLA100053870795_122025-O.webp',
            alt: 'Tupia router Bosch profissional 1400W com base ajustável',
            description: 'Tupia router 1400W com base ajustável, velocidade variável e guia paralela.',
            badge: 'Lançamento',
            url: '#'
        },
        {
            id: 20,
            name: 'Máscara Respiratória',
            brand: '3M',
            brandId: 15,
            price: 59.90,
            image: 'https://multimedia.3m.com/mws/media/1558222F/respirador-6800-6001.jpg',
            alt: 'Máscara respiratória 3M reutilizável com filtros PFF2',
            description: 'Máscara respiratória reutilizável com filtros PFF2 para proteção contra poeiras.',
            badge: null,
            url: '#'
        },
        {
            id: 19,
            name: 'Alicate Universal',
            brand: 'GEDORE',
            brandId: 4,
            price: 89.90,
            image: 'https://images.tcdn.com.br/img/img_prod/1022541/alicate_universal_10_x_isolado_gedore_14531_1_9d2c3048ec7672a00744a463f22c2029.jpg',
            description: 'Alicate universal 8" em aço forjado com cabos ergonômicos e antiderrapantes.',
            badge: null,
            url: '#'
        },
        {
            id: 18,
            name: 'Caixa de Ferramentas',
            brand: 'Tramontina',
            brandId: 3,
            price: 249.90,
            image: 'https://casadopicapau.vtexassets.com/arquivos/ids/166527/Kit-de-Ferramentas---60-pecas.png?v=638593249166370000',
            alt: 'Caixa de ferramentas Tramontina em aço com bandeja removível',
            description: 'Caixa de ferramentas em aço com bandeja removível e pintura eletrostática.',
            badge: null,
            url: '#'
        },
        {
            id: 17,
            name: 'Serra Tico-Tico',
            brand: 'Black & Decker',
            brandId: 7,
            price: 299.90,
            image: 'https://cdn.awsli.com.br/600x700/1552/1552057/produto/67728024/1c92d3a385.jpg',
            alt: 'Serra tico-tico Black & Decker 500W com velocidade variável',
            description: 'Serra tico-tico 500W com velocidade variável e sistema de sopro de pó.',
            badge: 'Oferta',
            url: '#'
        },
        {
            id: 16,
            name: 'Compressor de Ar',
            brand: 'CSM',
            brandId: 2,
            price: 1299.90,
            image: 'https://img.lojadomecanico.com.br/IMAGENS/46/448/157429/1611953242908.JPG',
            alt: 'Compressor de ar CSM 100 litros com motor 3HP',
            description: 'Compressor de ar 100L, motor 3HP 220V, bivolt automático.',
            badge: null,
            url: '#'
        },
        {
            id: 15,
            name: 'Cinto de Segurança',
            brand: 'CMB',
            brandId: 8,
            price: 189.90,
            image: 'https://safetytrab.com.br/wp-content/uploads/2021/11/Cinturao-Paraquedista-MULT-2013-MG-Cinto.jpg',
            alt: 'Cinto de segurança tipo paraquedista CMB com duplo talabarte',
            description: 'Cinto de segurança tipo paraquedista com duplo talabarte e CA aprovado.',
            badge: null,
            url: '#'
        },
        {
            id: 14,
            name: 'Nível Laser',
            brand: 'Bosch',
            brandId: 14,
            price: 459.90,
            image: 'https://www.ascomponentes.com.br/5312-thickbox_default/nivel-digital-laser-profissional-id-8569m.webp',
            alt: 'Nível laser Bosch profissional com linhas cruzadas',
            description: 'Nível laser com linhas cruzadas, autoadaptável e precisão de 0,3mm/m.',
            badge: 'Lançamento',
            url: '#'
        },
        {
            id: 13,
            name: 'Esmerilhadeira Angular',
            brand: 'DeWalt',
            brandId: 9,
            price: 549.90,
            image: 'https://lfmaquinaseferramentas.vtexassets.com/arquivos/ids/188306/esmerilhadeira-angular-dewalt-dcg413b-20v-brushless-01.jpg?v=637514152757200000',
            alt: 'Esmerilhadeira angular DeWalt 4-1/2" 850W',
            description: 'Esmerilhadeira angular 4-1/2" 850W com proteção contra sobrecarga.',
            badge: 'Oferta',
            url: '#'
        },
        {
            id: 12,
            name: 'Protetor Auricular',
            brand: '3M',
            brandId: 15,
            price: 35.90,
            image: 'https://multimedia.3m.com/mws/media/723503J/protetor-auricular-3m-h9a.jpg?width=506',
            alt: 'Protetor auricular 3M tipo concha com haste regulável',
            description: 'Protetor auricular tipo concha com haste regulável, NRR 21dB.',
            badge: null,
            url: '#'
        },
        {
            id: 11,
            name: 'Jogo de Chaves Allen',
            brand: 'GEDORE',
            brandId: 4,
            price: 129.90,
            image: 'https://cdn.awsli.com.br/800x800/767/767489/produto/102221681/177567-800-auto-g4gb554h6f.jpg',
            alt: 'Jogo de chaves Allen GEDORE com 15 peças',
            description: 'Jogo de chaves Allen com 15 peças, em aço cromo-vanádio.',
            badge: null,
            url: '#'
        },
        {
            id: 10,
            name: 'Martelete Perfurator',
            brand: 'Bosch',
            brandId: 14,
            price: 899.90,
            image: 'https://ferramentasgerais.vteximg.com.br/arquivos/ids/947940/Martelete-Perfurador-Rompedor-1150W-GBH-5-40-DCE-220V---Bosch---06112640E0---BOSCH.jpg?v=638918407499630000',
            alt: 'Martelete perfurador Bosch SDS plus 800W',
            description: 'Martelete perfurador 800W com sistema SDS plus, 3 funções.',
            badge: 'Lançamento',
            url: '#'
        },
        {
            id: 9,
            name: 'Luva de Segurança',
            brand: 'Lupus',
            brandId: 11,
            price: 29.90,
            image: 'https://m.media-amazon.com/images/I/61zIRpjaGPL._AC_UF1000,1000_QL80_.jpg',
            alt: 'Luva de segurança Lupus em raschel com reforço em couro',
            description: 'Luva de segurança em raschel com reforço em couro, CA aprovado.',
            badge: null,
            url: '#'
        },
        {
            id: 8,
            name: 'Trena Profissional',
            brand: 'Stanley',
            brandId: 12,
            price: 79.90,
            image: 'https://m.media-amazon.com/images/I/610CBQXwMxL._AC_UF894,1000_QL80_.jpg',
            alt: 'Trena profissional Stanley 5 metros com trava',
            description: 'Trena profissional 5m com trava, fita em aço carbono e durabilidade.',
            badge: null,
            url: '#'
        },
        {
            id: 7,
            name: 'Lixadeira Orbital',
            brand: 'Black & Decker',
            brandId: 7,
            price: 349.90,
            image: 'https://m.media-amazon.com/images/I/71aKYzwug2L.jpg',
            alt: 'Lixadeira orbital Black & Decker com coletor de pó',
            description: 'Lixadeira orbital 220W com sistema de coleta de pó e velocidade variável.',
            badge: 'Oferta',
            url: '#'
        },
        {
            id: 6,
            name: 'Óculos de Proteção',
            brand: '3M',
            brandId: 15,
            price: 45.90,
            image: 'https://images.tcdn.com.br/img/img_prod/1262471/oculos_de_protecao_3m_virtua_lente_incolor_c_a_15649_3147_1_62199cb1eb15ec13a748a769520d76a4.jpg',
            alt: 'Óculos de proteção 3M com lente incolor e antiembaçante',
            description: 'Óculos de segurança com lente incolor, antiembaçante e proteção UV.',
            badge: null,
            url: '#'
        },
        {
            id: 5,
            name: 'Serra Circular',
            brand: 'Bosch',
            brandId: 14,
            price: 1299.90,
            image: 'https://m.media-amazon.com/images/I/51C4XsNFLNL._AC_UF894,1000_QL80_.jpg',
            alt: 'Serra circular Bosch profissional com guia laser',
            description: 'Serra circular profissional 1800W com guia laser e corte de até 65mm.',
            badge: null,
            url: '#'
        },
        {
            id: 4,
            name: 'Parafusadeira sem Fio',
            brand: 'DeWalt',
            brandId: 9,
            price: 699.90,
            image: 'https://m.media-amazon.com/images/I/61v7kYlRr9L._AC_UF894,1000_QL80_.jpg',
            alt: 'Parafusadeira sem fio DeWalt 20V com bateria de lítio',
            description: 'Parafusadeira sem fio 20V, sistema XR, com 2 baterias de lítio e carregador.',
            badge: 'Lançamento',
            url: '#'
        },
        {
            id: 3,
            name: 'Capacete de Segurança',
            brand: '3M',
            brandId: 15,
            price: 89.90,
            image: 'https://multimedia.3m.com/mws/media/1448318J/capacete-3m-h700-ajuste-facil-branco.jpg?width=506',
            alt: 'Capacete de segurança 3M com jugular e aba frontal',
            description: 'Capacete com jugular e aba frontal, certificado CA para máxima proteção.',
            badge: 'Oferta',
            url: '#'
        },
        {
            id: 2,
            name: 'Kit de Ferramentas 100 peças',
            brand: 'Tramontina',
            brandId: 3,
            price: 899.90,
            image: 'https://m.media-amazon.com/images/I/91rtQLDQSzL._AC_UF350,350_QL80_.jpg',
            alt: 'Kit de ferramentas Tramontina com 100 peças em maleta organizadora',
            description: 'Kit completo com as principais ferramentas para uso doméstico e profissional.',
            badge: null,
            url: '#'
        },
        {
            id: 1,
            name: 'Furadeira Profissional',
            brand: 'Bosch',
            brandId: 14,
            price: 499.90,
            image: 'https://m.media-amazon.com/images/I/51oq83G5TIL._AC_UF894,1000_QL80_.jpg',
            alt: 'Furadeira de impacto Bosch profissional com mandril autoajustável',
            description: 'Furadeira de impacto profissional com mandril autoajustável e 850W de potência.',
            badge: 'Lançamento',
            url: '#'
        }
    ];

    // Cache de elementos DOM
    const DOM = {
        productsGrid: document.querySelector('.products-grid'),
        productsSection: document.querySelector('.featured-products')
    };

    // Configurações
    const CONFIG = {
        productsPerPage: 8,
        productsPerLoad: 18,
        animationThreshold: 0.1,
        showPrice: false // Configuração para controlar exibição do preço
    };

    // Estado dos produtos
    let productsState = {
        allProducts: [],
        displayedProducts: [],
        currentPage: 1,
        hasMoreProducts: true,
        isLoading: false
    };

    /**
     * Inicializa o sistema de produtos
     */
    function init() {
        console.log('🚀 Inicializando produtos.js...');
        
        // Ordena os produtos por ID decrescente (mais novos primeiro - igual às marcas)
        productsState.allProducts = sortProductsByNewestFirst(PRODUCTS);
        productsState.displayedProducts = getInitialProducts();
        
        renderProducts();
        setupLoadMoreButton();
        setupAnimations();
        
        logInit();
    }

    // ===== FUNÇÕES DE ORDENAÇÃO =====
    function sortProductsByNewestFirst(products) {
        return [...products].sort((a, b) => b.id - a.id);
    }

    function getInitialProducts() {
        return productsState.allProducts.slice(0, CONFIG.productsPerPage);
    }

    // ===== FUNÇÕES DE RENDERIZAÇÃO =====

    function renderProducts() {
        if (!DOM.productsGrid) return;

        // Limpa o grid mas mantém o botão "Ver Mais" se ele existir
        const loadMoreBtn = document.querySelector('.load-more-container');
        DOM.productsGrid.innerHTML = '';

        productsState.displayedProducts.forEach(product => {
            const productCard = createProductCard(product);
            DOM.productsGrid.appendChild(productCard);
        });

        // Reanexa o botão "Ver Mais" se necessário
        if (loadMoreBtn) {
            DOM.productsGrid.parentElement.appendChild(loadMoreBtn);
        }

        updateLoadMoreButtonState();
    }

    function createProductCard(product) {
        const article = document.createElement('article');
        article.className = 'product-card';
        article.tabIndex = 0;
        article.dataset.productId = product.id;
        article.setAttribute('aria-label', `${product.name} - ${product.brand}`);

        // Badge (se existir)
        if (product.badge) {
            const badge = document.createElement('span');
            badge.className = 'product-badge';
            badge.setAttribute('aria-label', product.badge);
            badge.textContent = product.badge;
            article.appendChild(badge);
        }

        // Imagem
        const imageDiv = document.createElement('div');
        imageDiv.className = 'product-image';
        imageDiv.innerHTML = `<img src="${product.image}" alt="${product.alt}" loading="lazy">`;
        article.appendChild(imageDiv);

        // Informações
        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';

        const title = document.createElement('h3');
        title.textContent = product.name;

        const brand = document.createElement('p');
        brand.className = 'product-brand';
        brand.textContent = product.brand;

        const description = document.createElement('p');
        description.className = 'product-description';
        description.textContent = product.description;

        // Preço (condicional)
        let priceDiv = null;
        if (CONFIG.showPrice) {
            priceDiv = document.createElement('div');
            priceDiv.className = 'product-price';

            const currentPrice = document.createElement('span');
            currentPrice.className = 'current-price';
            currentPrice.textContent = formatPrice(product.price);

            const priceSmall = document.createElement('small');
            priceSmall.textContent = 'à vista';

            priceDiv.appendChild(currentPrice);
            priceDiv.appendChild(priceSmall);
        }

        const btn = document.createElement('a');
        btn.href = product.url || '#';
        btn.className = 'product-btn';
        btn.setAttribute('aria-label', `Ver detalhes do ${product.name}`);
        btn.textContent = 'Ver detalhes';

        infoDiv.appendChild(title);
        infoDiv.appendChild(brand);
        infoDiv.appendChild(description);
        
        // Só adiciona o preço se estiver configurado para mostrar
        if (priceDiv) {
            infoDiv.appendChild(priceDiv);
        }
        
        infoDiv.appendChild(btn);

        article.appendChild(infoDiv);

        return article;
    }

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    // ===== FUNÇÕES DO BOTÃO "VER MAIS" =====

    function setupLoadMoreButton() {
        // Verifica se precisa mostrar o botão
        productsState.hasMoreProducts = productsState.displayedProducts.length < productsState.allProducts.length;
        
        if (!productsState.hasMoreProducts) return;

        // Remove botão existente se houver
        const existingBtn = document.querySelector('.load-more-container');
        if (existingBtn) {
            existingBtn.remove();
        }

        // Cria container do botão
        const container = document.createElement('div');
        container.className = 'load-more-container';

        const button = document.createElement('button');
        button.className = 'btn load-more-btn';
        button.id = 'loadMoreProducts';
        button.setAttribute('aria-label', 'Carregar mais produtos');
        button.innerHTML = `
            <span>Ver mais produtos</span>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
        `;

        // Contador de produtos
        const counter = document.createElement('div');
        counter.className = 'products-counter';
        updateProductsCounter(counter);

        container.appendChild(button);
        container.appendChild(counter);

        // Insere após o grid de produtos
        DOM.productsGrid.parentElement.appendChild(container);

        // Adiciona evento de clique
        button.addEventListener('click', loadMoreProducts);
    }

    function loadMoreProducts() {
        if (productsState.isLoading || !productsState.hasMoreProducts) return;

        productsState.isLoading = true;
        const button = document.querySelector('.load-more-btn');
        const counter = document.querySelector('.products-counter');

        // Adiciona estado de loading
        button.classList.add('loading');
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';

        // Simula um pequeno delay para melhor UX
        setTimeout(() => {
            const currentCount = productsState.displayedProducts.length;
            const nextProducts = productsState.allProducts.slice(
                currentCount,
                currentCount + CONFIG.productsPerLoad
            );

            if (nextProducts.length > 0) {
                // Adiciona novos produtos
                nextProducts.forEach(product => {
                    const productCard = createProductCard(product);
                    DOM.productsGrid.appendChild(productCard);
                });

                productsState.displayedProducts = [...productsState.displayedProducts, ...nextProducts];
                
                // Atualiza contador
                if (counter) {
                    updateProductsCounter(counter);
                }

                // Verifica se ainda há mais produtos
                productsState.hasMoreProducts = productsState.displayedProducts.length < productsState.allProducts.length;
                
                if (!productsState.hasMoreProducts) {
                    // Esconde o botão quando não há mais produtos
                    const container = document.querySelector('.load-more-container');
                    if (container) {
                        container.style.opacity = '0';
                        setTimeout(() => {
                            container.style.display = 'none';
                        }, 300);
                    }
                }
            } else {
                productsState.hasMoreProducts = false;
                const container = document.querySelector('.load-more-container');
                if (container) {
                    container.style.opacity = '0';
                    setTimeout(() => {
                        container.style.display = 'none';
                    }, 300);
                }
            }

            // Restaura o botão
            button.classList.remove('loading');
            button.innerHTML = originalContent;
            productsState.isLoading = false;

            // Dispara evento para reavaliar animações
            window.dispatchEvent(new Event('productsLoaded'));
        }, 500);
    }

    function updateProductsCounter(counterElement) {
        if (!counterElement) return;
        counterElement.textContent = `Mostrando ${productsState.displayedProducts.length} de ${productsState.allProducts.length} produtos`;
    }

    function updateLoadMoreButtonState() {
        const container = document.querySelector('.load-more-container');
        if (!container) return;

        productsState.hasMoreProducts = productsState.displayedProducts.length < productsState.allProducts.length;
        
        if (!productsState.hasMoreProducts) {
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.display = 'none';
            }, 300);
        }
    }

    // ===== FUNÇÕES DE ANIMAÇÃO =====

    function setupAnimations() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.willChange = 'opacity, transform';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.animationThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        productCards.forEach(card => observer.observe(card));

        // Observa novos produtos carregados
        window.addEventListener('productsLoaded', () => {
            const newCards = document.querySelectorAll('.product-card:not([style*="opacity: 1"])');
            newCards.forEach(card => observer.observe(card));
        });
    }

    // ===== UTILITÁRIOS =====

    function logInit() {
        console.log('✅ produtos.js inicializado com sucesso');
        console.log(`📊 Total de produtos: ${productsState.allProducts.length}`);
        console.log(`📋 Exibindo inicialmente: ${productsState.displayedProducts.length} produtos`);
        console.log(`🆕 Produto mais recente: ${productsState.allProducts[0]?.name} (ID: ${productsState.allProducts[0]?.id})`);
        console.log(`📦 Produto mais antigo: ${productsState.allProducts[productsState.allProducts.length-1]?.name} (ID: ${productsState.allProducts[productsState.allProducts.length-1]?.id})`);
        console.log(`💰 Exibição de preços: ${CONFIG.showPrice ? 'Ativada' : 'Desativada'}`);
    }

    // ===== API PÚBLICA =====
    window.addNewProduct = function(newProduct) {
        if (!newProduct.id) {
            console.error('❌ Novo produto precisa ter um ID');
            return;
        }

        // Adiciona o novo produto
        PRODUCTS.push(newProduct);
        
        // Reordena todos os produtos (do maior ID para o menor)
        productsState.allProducts = sortProductsByNewestFirst(PRODUCTS);
        
        // Reset para os primeiros produtos (agora incluindo o novo)
        productsState.displayedProducts = getInitialProducts();
        productsState.currentPage = 1;
        
        // Renderiza novamente
        renderProducts();
        
        // Reconfigura o botão "Ver Mais"
        setupLoadMoreButton();
        
        // Reaplica animações
        setupAnimations();
        
        console.log(`✅ Novo produto adicionado: ${newProduct.name} (ID: ${newProduct.id})`);
        console.log('📊 Nova ordem dos produtos (maior ID primeiro):', 
            productsState.allProducts.slice(0, 5).map(p => `${p.name} (ID: ${p.id})`).join(' → ') + '...');
    };

    // API para controlar a exibição de preços
    window.toggleProductPrices = function(show) {
        CONFIG.showPrice = show;
        
        // Re-renderiza todos os produtos com a nova configuração
        renderProducts();
        
        // Reaplica animações
        setupAnimations();
        
        console.log(`💰 Exibição de preços ${show ? 'ativada' : 'desativada'}`);
    };

    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();