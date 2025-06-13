// auth.js - Sistema de autenticação completo

// Função para fazer login
function fazerLogin(email, password) {
    // Verifica se o usuário existe no localStorage
    const userData = JSON.parse(localStorage.getItem(email));
    
    if (userData && userData.senha === password) {
        // Salva no localStorage que o usuário está logado
        localStorage.setItem('usuarioLogado', JSON.stringify({
            email: email,
            nome: userData.nome,
            tipoUsuario: userData.tipoUsuario
        }));
        
        // Atualiza a interface
        atualizarHeader();
        atualizarLinks();
        return true;
    }
    return false;
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    atualizarHeader();
    atualizarLinks();
    window.location.href = 'index.html';
}

// Função para obter dados do usuário logado
function getUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
}

// Função para atualizar a interface do cabeçalho
function atualizarHeader() {
    const usuarioLogado = getUsuarioLogado();
    const userActions = document.querySelector('.user-actions');
    
    if (!userActions) return;
    
    if (usuarioLogado) {
        userActions.innerHTML = `
            <div class="user-logged">
                <span class="user-name">${usuarioLogado.nome.split(' ')[0]}</span>
                <button onclick="fazerLogout()" class="btn-logout">
                    <i class="fas fa-sign-out-alt"></i> Sair
                </button>
            </div>
        `;
    } else {
        userActions.innerHTML = `
            <a href="login.html" class="btn-login">Entrar</a>
            <a href="cadastro.html" class="btn-register">Cadastrar</a>
        `;
    }
}

// Função para atualizar links de login/cadastro
function atualizarLinks() {
    const usuarioLogado = getUsuarioLogado();
    // Seleciona todos os links relevantes
    const links = document.querySelectorAll('a[href="login.html"], a[href="cadastro.html"]');
    // Seleciona todos os cards de serviço com onclick para cadastro.html
    const serviceCards = document.querySelectorAll('.service-card[onclick*="cadastro.html"]');

    if (usuarioLogado) {
        links.forEach(link => {
            if (!link.closest('.user-actions')) {
                link.href = 'servicos.html';
                if (link.classList.contains('btn-hero') || 
                    link.classList.contains('btn-secondary') || 
                    link.classList.contains('btn-primary')) {
                    link.textContent = 'Acessar Serviços';
                    const icon = link.querySelector('i');
                    if (icon) icon.remove();
                }
            }
        });
        // Atualiza o onclick dos cards para servicos.html
        serviceCards.forEach(card => {
            card.setAttribute('onclick', "location.href='servicos.html'");
        });
    } else {
        // Garante que cards voltem para cadastro.html se deslogar
        serviceCards.forEach(card => {
            card.setAttribute('onclick', "location.href='cadastro.html'");
        });
    }
}

// Verificação ao carregar a página
function verificarAutenticacao() {
    const usuarioLogado = getUsuarioLogado();
    
    // Protege páginas que requerem login
    if (window.location.pathname.includes('servicos.html') && !usuarioLogado) {
        window.location.href = 'index.html';
        return false;
    }
    
    // Atualiza a interface
    atualizarHeader();
    atualizarLinks();
    return !!usuarioLogado;
}

// Inicialização
document.addEventListener('DOMContentLoaded', verificarAutenticacao);