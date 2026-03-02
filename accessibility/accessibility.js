/* ===== SISTEMA DE ACESSIBILIDADE ===== */
class AccessibilityManager {
    constructor() {
        this.config = {
            fontSizes: ['small', 'normal', 'large', 'xlarge', 'xxlarge'],
            currentFontSize: 'normal',
            highContrast: false,
            visionMode: 'normal',
            reducedMotion: false,
            highlightLinks: false,
            enhancedFocus: false
        };

        // Opções de modos de visão disponíveis
        this.visionModes = [
            { id: 'normal', label: 'Visão Normal', icon: 'fa-eye' },
            { id: 'deuteranopia', label: 'Deuteranopia (verde)', icon: 'fa-eye' },
            { id: 'protanopia', label: 'Protanopia (vermelho)', icon: 'fa-eye' },
            { id: 'tritanopia', label: 'Tritanopia (azul)', icon: 'fa-eye' },
            { id: 'achromatopsia', label: 'Acromatopsia (P&B)', icon: 'fa-adjust' }
        ];

        this.init();
    }

    init() {
        this.loadSettings();
        this.setupElements();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.announceReady();
    }

    /* Carrega configurações salvas */
    loadSettings() {
        try {
            const saved = localStorage.getItem('lions-accessibility-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.config = { ...this.config, ...settings };
                this.applySettings();
            }
        } catch (error) {
            console.warn('Não foi possível carregar as configurações:', error);
        }
    }

    /* Salva configurações */
    saveSettings() {
        try {
            localStorage.setItem('lions-accessibility-settings', JSON.stringify(this.config));
            this.showStatus('Configurações salvas');
        } catch (error) {
            console.warn('Não foi possível salvar as configurações:', error);
        }
    }

    /* Aplica todas as configurações */
    applySettings() {
        this.applyFontSize();
        this.applyContrast();
        this.applyVision();
        this.applyMotion();
        this.applyFocus();
        this.applyLinks();
        this.updateButtonStates();
    }

    /* Configura elementos DOM */
    setupElements() {
        this.elements = {
            toggle: document.getElementById('accessibility-toggle'),
            panel: document.getElementById('accessibility-panel'),
            closePanel: document.getElementById('close-panel'),
            overlay: document.getElementById('panel-overlay'),

            // Controles de fonte
            decreaseFont: document.getElementById('decrease-font'),
            increaseFont: document.getElementById('increase-font'),
            resetFont: document.getElementById('reset-font'),
            currentFontSize: document.getElementById('current-font-size'),

            // Controles de contraste
            toggleContrast: document.getElementById('toggle-contrast'),

            // Controles de visão
            colorblindMode: document.getElementById('colorblind-mode'),
            reducedMotion: document.getElementById('reduced-motion'),

            // Controles de leitura
            highlightLinks: document.getElementById('highlight-links'),

            // Controles de navegação
            focusHelper: document.getElementById('focus-helper'),

            // Controles de ajuda
            keyboardShortcuts: document.getElementById('keyboard-shortcuts'),
            resetAll: document.getElementById('reset-all'),

            // Modais
            shortcutsModal: document.getElementById('shortcuts-modal'),
            closeShortcuts: document.getElementById('close-shortcuts'),

            // Status
            statusMessage: document.getElementById('status-message')
        };
        
        // Verificar se todos os elementos foram encontrados
        this.validateElements();
    }
    
    /* Valida se os elementos principais existem */
    validateElements() {
        const requiredElements = ['toggle', 'panel', 'overlay'];
        requiredElements.forEach(el => {
            if (!this.elements[el]) {
                console.warn(`Elemento ${el} não encontrado no DOM`);
            }
        });
    }

    /* Configura listeners de eventos */
    setupEventListeners() {
        if (!this.elements.toggle) return;

        // Toggle do painel
        this.elements.toggle.addEventListener('click', () => this.togglePanel());
        this.elements.toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.togglePanel();
            }
        });

        // Fechar painel
        if (this.elements.closePanel) {
            this.elements.closePanel.addEventListener('click', () => this.closePanel());
        }
        if (this.elements.overlay) {
            this.elements.overlay.addEventListener('click', () => this.closePanel());
        }

        // Controles de fonte
        if (this.elements.decreaseFont) {
            this.elements.decreaseFont.addEventListener('click', () => this.changeFontSize(-1));
        }
        if (this.elements.increaseFont) {
            this.elements.increaseFont.addEventListener('click', () => this.changeFontSize(1));
        }
        if (this.elements.resetFont) {
            this.elements.resetFont.addEventListener('click', () => this.resetFontSize());
        }

        // Controles de contraste
        if (this.elements.toggleContrast) {
            this.elements.toggleContrast.addEventListener('click', () => this.toggleContrast());
        }

        // Controles de visão
        if (this.elements.colorblindMode) {
            this.elements.colorblindMode.addEventListener('click', () => this.toggleVisionMode());
        }
        if (this.elements.reducedMotion) {
            this.elements.reducedMotion.addEventListener('click', () => this.toggleReducedMotion());
        }

        // Controles de leitura
        if (this.elements.highlightLinks) {
            this.elements.highlightLinks.addEventListener('click', () => this.toggleHighlightLinks());
        }

        // Controles de navegação
        if (this.elements.focusHelper) {
            this.elements.focusHelper.addEventListener('click', () => this.toggleEnhancedFocus());
        }

        // Controles de ajuda
        if (this.elements.keyboardShortcuts) {
            this.elements.keyboardShortcuts.addEventListener('click', () => this.showShortcutsModal());
        }
        if (this.elements.resetAll) {
            this.elements.resetAll.addEventListener('click', () => this.resetAllSettings());
        }

        // Modal
        if (this.elements.closeShortcuts) {
            this.elements.closeShortcuts.addEventListener('click', () => this.closeShortcutsModal());
        }

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.elements.panel && this.elements.panel.getAttribute('aria-hidden') === 'false') {
                    this.closePanel();
                }
                if (this.elements.shortcutsModal && this.elements.shortcutsModal.getAttribute('aria-hidden') === 'false') {
                    this.closeShortcutsModal();
                }
            }
        });

        // Salvar antes de sair
        window.addEventListener('beforeunload', () => this.saveSettings());
    }

    /* Configura atalhos de teclado */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + A: Abrir/fechar painel
            if (e.altKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                this.togglePanel();
            }

            // Alt + +: Aumentar fonte
            if (e.altKey && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                this.changeFontSize(1);
            }

            // Alt + -: Diminuir fonte
            if (e.altKey && e.key === '-') {
                e.preventDefault();
                this.changeFontSize(-1);
            }

            // Alt + C: Alternar contraste
            if (e.altKey && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                this.toggleContrast();
            }

            // Alt + V: Alternar modo de visão
            if (e.altKey && e.key.toLowerCase() === 'v') {
                e.preventDefault();
                this.toggleVisionMode();
            }

            // Alt + R: Reduzir animações
            if (e.altKey && e.key.toLowerCase() === 'r') {
                e.preventDefault();
                this.toggleReducedMotion();
            }
            
            // Alt + F: Foco aumentado
            if (e.altKey && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                this.toggleEnhancedFocus();
            }
        });
    }

    /* Alterna o painel de acessibilidade */
    togglePanel() {
        if (!this.elements.panel || !this.elements.overlay || !this.elements.toggle) return;

        const isHidden = this.elements.panel.getAttribute('aria-hidden') === 'true';

        this.elements.panel.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
        this.elements.overlay.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
        this.elements.toggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');

        if (!isHidden) {
            document.body.style.overflow = 'hidden';
            this.announceToScreenReader('Painel de acessibilidade aberto');
            this.showStatus('Painel aberto');
        } else {
            document.body.style.overflow = '';
            this.announceToScreenReader('Painel de acessibilidade fechado');
        }
    }

    closePanel() {
        if (!this.elements.panel || !this.elements.overlay || !this.elements.toggle) return;

        this.elements.panel.setAttribute('aria-hidden', 'true');
        this.elements.overlay.setAttribute('aria-hidden', 'true');
        this.elements.toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        this.elements.toggle.focus();
    }

    /* Controle de tamanho da fonte */
    changeFontSize(direction) {
        const currentIndex = this.config.fontSizes.indexOf(this.config.currentFontSize);
        let newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < this.config.fontSizes.length) {
            this.config.currentFontSize = this.config.fontSizes[newIndex];
            this.applyFontSize();
            this.saveSettings();

            const message = `Tamanho da fonte ajustado para ${this.getFontSizeLabel()}`;
            this.announceToScreenReader(message);
            this.showStatus(message);
        } else {
            // Feedback quando não pode aumentar/diminuir mais
            const message = direction > 0 ? 'Tamanho máximo atingido' : 'Tamanho mínimo atingido';
            this.showStatus(message);
        }
    }

    resetFontSize() {
        this.config.currentFontSize = 'normal';
        this.applyFontSize();
        this.saveSettings();
        this.announceToScreenReader('Tamanho da fonte restaurado para o padrão');
        this.showStatus('Fonte restaurada');
    }

    applyFontSize() {
        document.body.setAttribute('data-accessibility-fontsize', this.config.currentFontSize);
        if (this.elements.currentFontSize) {
            this.elements.currentFontSize.textContent = this.getFontSizeLabel();
        }
        
        // Aplicar tamanho de fonte via CSS também
        const root = document.documentElement;
        const fontSizeMap = {
            'small': '14px',
            'normal': '16px',
            'large': '18px',
            'xlarge': '20px',
            'xxlarge': '24px'
        };
        root.style.fontSize = fontSizeMap[this.config.currentFontSize] || '16px';
    }

    getFontSizeLabel() {
        const labels = {
            'small': '85%',
            'normal': '100%',
            'large': '115%',
            'xlarge': '130%',
            'xxlarge': '150%'
        };
        return labels[this.config.currentFontSize] || '100%';
    }

    /* Controle de contraste */
    toggleContrast() {
        this.config.highContrast = !this.config.highContrast;
        this.applyContrast();
        this.saveSettings();

        const message = this.config.highContrast ?
            'Alto contraste ativado' : 'Alto contraste desativado';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyContrast() {
        document.body.setAttribute('data-accessibility-contrast',
            this.config.highContrast ? 'high' : 'normal');
    }

    /* Alterna entre modos de visão */
    toggleVisionMode() {
        const currentMode = this.config.visionMode || 'normal';
        let nextMode = 'normal';

        // Ciclar entre os modos disponíveis
        switch (currentMode) {
            case 'normal':
                nextMode = 'deuteranopia';
                break;
            case 'deuteranopia':
                nextMode = 'protanopia';
                break;
            case 'protanopia':
                nextMode = 'tritanopia';
                break;
            case 'tritanopia':
                nextMode = 'achromatopsia';
                break;
            case 'achromatopsia':
                nextMode = 'normal';
                break;
            default:
                nextMode = 'normal';
        }

        this.config.visionMode = nextMode;
        this.applyVision();
        this.saveSettings();

        const modeLabel = this.visionModes.find(m => m.id === nextMode).label;
        this.announceToScreenReader(`Modo ${modeLabel} ativado`);
        this.showStatus(`Visão: ${modeLabel}`);
        this.updateButtonStates();
    }

    /* Aplica o modo de visão selecionado */
    applyVision() {
        const mode = this.config.visionMode || 'normal';

        // Remover atributos e estilos anteriores
        document.body.removeAttribute('data-accessibility-vision');
        document.documentElement.style.filter = 'none';
        
        // Remover filtros SVG
        this.removeColorBlindFilters();

        if (mode !== 'normal') {
            document.body.setAttribute('data-accessibility-vision', mode);

            // Para modo acromatopsia, aplicar filtro CSS simples (mais compatível)
            if (mode === 'achromatopsia') {
                document.documentElement.style.filter = 'grayscale(100%)';
            } else {
                // Para outros modos, usar filtros SVG
                this.applyColorBlindFilter(mode);
            }
        }
    }

    /* Remove filtros SVG */
    removeColorBlindFilters() {
        const filters = document.getElementById('colorblind-filters');
        if (filters) {
            filters.remove();
        }
    }

    /* Aplica filtros específicos para tipos de daltonismo */
    applyColorBlindFilter(mode) {
        // Criar filtros SVG
        this.createColorBlindFilters();

        // Aplicar filtro apropriado
        switch (mode) {
            case 'deuteranopia':
                document.documentElement.style.filter = 'url(#deuteranopia)';
                break;
            case 'protanopia':
                document.documentElement.style.filter = 'url(#protanopia)';
                break;
            case 'tritanopia':
                document.documentElement.style.filter = 'url(#tritanopia)';
                break;
        }
    }

    /* Cria filtros SVG para correção de daltonismo */
    createColorBlindFilters() {
        // Verificar se já existe
        if (document.getElementById('colorblind-filters')) return;

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("id", "colorblind-filters");
        svg.setAttribute("style", "position: absolute; width: 0; height: 0;");

        // Filtro para Deuteranopia
        const deuteranopiaFilter = document.createElementNS(svgNS, "filter");
        deuteranopiaFilter.setAttribute("id", "deuteranopia");
        deuteranopiaFilter.innerHTML = '<feColorMatrix type="matrix" values="0.43 0.72 -0.15 0 0 0.34 0.57 0.09 0 0 -0.02 0.03 0.99 0 0 0 0 0 1 0"/>';
        svg.appendChild(deuteranopiaFilter);

        // Filtro para Protanopia
        const protanopiaFilter = document.createElementNS(svgNS, "filter");
        protanopiaFilter.setAttribute("id", "protanopia");
        protanopiaFilter.innerHTML = '<feColorMatrix type="matrix" values="0.2 0.99 -0.19 0 0 0.16 0.79 0.05 0 0 0.01 0.01 0.98 0 0 0 0 0 1 0"/>';
        svg.appendChild(protanopiaFilter);

        // Filtro para Tritanopia
        const tritanopiaFilter = document.createElementNS(svgNS, "filter");
        tritanopiaFilter.setAttribute("id", "tritanopia");
        tritanopiaFilter.innerHTML = '<feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.43 0.57 0 0 0 0.57 0.43 0 0 0 0 0 1 0"/>';
        svg.appendChild(tritanopiaFilter);

        document.body.appendChild(svg);
    }

    /* Controle de redução de animação */
    toggleReducedMotion() {
        this.config.reducedMotion = !this.config.reducedMotion;
        this.applyMotion();
        this.saveSettings();

        const message = this.config.reducedMotion ?
            'Animações reduzidas' : 'Animações restauradas';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyMotion() {
        document.body.setAttribute('data-accessibility-motion',
            this.config.reducedMotion ? 'reduced' : 'normal');
    }

    /* Controle de destaque de links */
    toggleHighlightLinks() {
        this.config.highlightLinks = !this.config.highlightLinks;
        this.applyLinks();
        this.saveSettings();

        const message = this.config.highlightLinks ?
            'Links destacados' : 'Links normais';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyLinks() {
        document.body.setAttribute('data-accessibility-highlight-links',
            this.config.highlightLinks.toString());
    }

    /* Controle de foco aumentado */
    toggleEnhancedFocus() {
        this.config.enhancedFocus = !this.config.enhancedFocus;
        this.applyFocus();
        this.saveSettings();

        const message = this.config.enhancedFocus ?
            'Foco aumentado ativado' : 'Foco aumentado desativado';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyFocus() {
        document.body.setAttribute('data-accessibility-focus',
            this.config.enhancedFocus ? 'enhanced' : 'normal');
        
        // Aplicar estilo de foco aumentado
        if (this.config.enhancedFocus) {
            const style = document.createElement('style');
            style.id = 'enhanced-focus-styles';
            style.textContent = `
                *:focus-visible {
                    outline: 4px solid #FFD700 !important;
                    outline-offset: 4px !important;
                    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.3) !important;
                    transition: outline 0.2s ease !important;
                }
            `;
            
            // Remover estilo anterior se existir
            const existingStyle = document.getElementById('enhanced-focus-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            document.head.appendChild(style);
        } else {
            const existingStyle = document.getElementById('enhanced-focus-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
        }
    }

    /* Atualiza estados dos botões */
    updateButtonStates() {
        if (this.elements.toggleContrast) {
            this.elements.toggleContrast.setAttribute('aria-pressed', this.config.highContrast);
            this.elements.toggleContrast.innerHTML = `<i class="fas fa-adjust" aria-hidden="true"></i><span>${this.config.highContrast ? 'Contraste Normal' : 'Alto Contraste'}</span>`;
        }
        
        if (this.elements.colorblindMode) {
            const currentMode = this.config.visionMode || 'normal';
            const modeLabel = this.visionModes.find(m => m.id === currentMode).label;
            
            // Atualizar texto e ícone do botão
            const iconMap = {
                'normal': 'fa-eye',
                'deuteranopia': 'fa-eye',
                'protanopia': 'fa-eye',
                'tritanopia': 'fa-eye',
                'achromatopsia': 'fa-adjust'
            };
            
            const icon = iconMap[currentMode] || 'fa-eye';
            
            this.elements.colorblindMode.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i><span>${modeLabel}</span>`;
            this.elements.colorblindMode.setAttribute('aria-pressed', currentMode !== 'normal');
        }
        
        if (this.elements.reducedMotion) {
            this.elements.reducedMotion.setAttribute('aria-pressed', this.config.reducedMotion);
            this.elements.reducedMotion.innerHTML = `<i class="fas fa-solid fa-walking" aria-hidden="true"></i><span>${this.config.reducedMotion ? 'Animações Normais' : 'Reduzir Animações'}</span>`;
        }
        
        if (this.elements.highlightLinks) {
            this.elements.highlightLinks.setAttribute('aria-pressed', this.config.highlightLinks);
            this.elements.highlightLinks.innerHTML = `<i class="fas fa-link" aria-hidden="true"></i><span>${this.config.highlightLinks ? 'Links Normais' : 'Destacar Links'}</span>`;
        }
        
        if (this.elements.focusHelper) {
            this.elements.focusHelper.setAttribute('aria-pressed', this.config.enhancedFocus);
            this.elements.focusHelper.innerHTML = `<i class="fas fa-regular fa-square" aria-hidden="true"></i><span>${this.config.enhancedFocus ? 'Foco Normal' : 'Foco Aumentado'}</span>`;
        }
    }

    /* Modal de atalhos */
    showShortcutsModal() {
        if (!this.elements.shortcutsModal) return;

        this.elements.shortcutsModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (this.elements.closeShortcuts) {
            this.elements.closeShortcuts.focus();
        }

        this.announceToScreenReader('Modal de atalhos de teclado aberto');
    }

    closeShortcutsModal() {
        if (!this.elements.shortcutsModal) return;

        this.elements.shortcutsModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (this.elements.keyboardShortcuts) {
            this.elements.keyboardShortcuts.focus();
        }
    }

    /* Reset total */
    resetAllSettings() {
        // Reset sem confirmação
        this.config = {
            fontSizes: ['small', 'normal', 'large', 'xlarge', 'xxlarge'],
            currentFontSize: 'normal',
            highContrast: false,
            visionMode: 'normal',
            reducedMotion: false,
            highlightLinks: false,
            enhancedFocus: false
        };

        this.applySettings();
        this.saveSettings();
        localStorage.removeItem('lions-accessibility-settings');

        this.announceToScreenReader('Configurações restauradas para o padrão');
        this.showStatus('Configurações restauradas');
    }

    /* Utilitários de acessibilidade */
    announceToScreenReader(message) {
        let announcer = document.getElementById('sr-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'sr-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
    }

    showStatus(message) {
        if (this.elements.statusMessage) {
            this.elements.statusMessage.textContent = message;

            setTimeout(() => {
                this.elements.statusMessage.textContent = 'Pronto';
            }, 3000);
        }
    }

    announceReady() {
        setTimeout(() => {
            this.announceToScreenReader('Sistema de acessibilidade carregado. Pressione Alt + A para abrir o painel.');
        }, 1000);
    }
}

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.AccessibilityManager = new AccessibilityManager();
});

// Exportação para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}