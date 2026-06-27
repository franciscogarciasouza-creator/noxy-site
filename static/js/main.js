document.addEventListener('DOMContentLoaded', function() {
        
    // ===== BOTÕES DE TEMA =====
    const themeDark = document.getElementById('themeDark');
    const themeLight = document.getElementById('themeLight');
    const htmlRoot = document.getElementById('htmlRoot');
    
    // Verifica preferência salva
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    function setTheme(theme) {
    if (theme === 'light') {
        htmlRoot.setAttribute('data-theme', 'light');
        themeDark.classList.remove('active');
        themeLight.classList.add('active');
        localStorage.setItem('theme', 'light');
    } else {
        htmlRoot.removeAttribute('data-theme');
        themeLight.classList.remove('active');
        themeDark.classList.add('active');
        localStorage.setItem('theme', 'dark');
    }
}
    
    // Aplica o tema salvo ao carregar
    setTheme(savedTheme);
    
    // Evento do botão escuro (lua)
    if (themeDark) {
        themeDark.addEventListener('click', function() {
            setTheme('dark');
        });
    }
    
    // Evento do botão claro (sol)
    if (themeLight) {
        themeLight.addEventListener('click', function() {
            setTheme('light');
        });
    }
    
    // ===== LOGO CLICÁVEL =====
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== FORMULÁRIO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            
            try {
                const response = await fetch('/enviar-contato', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.ok && result.sucesso) {
                    alert('✅ ' + result.sucesso);
                    contactForm.reset();
                } else {
                    alert('❌ ' + (result.erro || 'Erro ao enviar mensagem'));
                }
            } catch (error) {
                alert('❌ Erro de conexão. Tente novamente.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
