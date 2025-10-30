"use strict";

document.addEventListener('DOMContentLoaded', function() {

    // menu hamburguer
    
    const btnMobile = document.getElementById('btn-mobile');
    const navMenu = document.getElementById('nav-menu');

    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        // previne toque duplo em touchscreen

        navMenu.classList.toggle('active');
        const iconeBotao = btnMobile.querySelector('i');
        // atualiza o icone e o leitor de tela
        const menuAtivo = navMenu.classList.contains('active');

        if (menuAtivo) {
            btnMobile.setAttribute('aria-label', 'Fechar Menu');
            iconeBotao.classList.remove('fa-bars');
            iconeBotao.classList.add('fa-times');
        } else {
            btnMobile.setAttribute('aria-label', 'Abrir Menu');
            iconeBotao.classList.remove('fa-times');
            iconeBotao.classList.add('fa-bars');
        }
    }

    if (btnMobile) {
        btnMobile.addEventListener('click', toggleMenu);
        btnMobile.addEventListener('touchstart', toggleMenu);
    }

    // fechar menu ao clicar em um link
    
    if (navMenu) {
        const navLinks = navMenu.querySelectorAll('a');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // inicialização do AOS (Animate on Scroll)
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }

    // inicialização da biblioteca Typed.js (efeito de digitação)
    
    if (typeof Typed !== 'undefined' && document.getElementById('typed-text')) {
        var typed = new Typed('#typed-text', {
            strings: [
                "com o seu público.",
                "com resultados reais.",
                "com criatividade."
            ],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
        });
    }

    // botao voltar ao topo
    
    const btnTop = document.getElementById('btn-top');

    function checkScrollPosition() {
        if (window.scrollY > 300) {
            btnTop.classList.add('visible');
        } else {
            btnTop.classList.remove('visible');
        }
    }

    function scrollToTop(event) {
        event.preventDefault(); 
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (btnTop) {
        window.addEventListener('scroll', checkScrollPosition);
        btnTop.addEventListener('click', scrollToTop);
    }

    // pop-up de projetos
    
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-project]');
    const projectModals = document.querySelectorAll('.project-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    // Abre 
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            const targetModal = document.getElementById(`modal-${projectId}`);
            if (targetModal) {
                targetModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Impede scroll da página
            }
        });
    });

    // Função genérica para fechar QUALQUER um aberto
    function closeAllModals() {
        projectModals.forEach(modal => {
            modal.classList.remove('open');
        });
        document.body.style.overflow = ''; // Restaura scroll
    }

    // Fecha pelo botão X
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    // Fecha clicando fora dele
    projectModals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Se o clique foi no fundo escuro
                closeAllModals();
            }
        });
    });

    // Fecha o modal com a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });

}); 