        // Controle do dark mode
        const darkModeBtn = document.getElementById('dark-mode-btn');
        darkModeBtn.addEventListener('click', toggleDarkMode);

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
                darkModeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
                localStorage.removeItem('darkMode');
            }
        }
                localStorage.removeItem('darkMode');
        

        // Verifica preferência salva
        if (localStorage.getItem('darkMode') === 'ativado') {
            document.body.classList.add('dark-mode');
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }

        // Controle de tamanho da fonte
        const fontIncrease = document.getElementById('font-increase');
        const fontDecrease = document.getElementById('font-decrease');
        const fontReset = document.getElementById('font-reset');
        let fontSize = 16;
        fontIncrease.addEventListener('click', function() {
            if (fontSize < 24) {
                fontSize += 2;
                document.documentElement.style.fontSize = fontSize + 'px';
                localStorage.setItem('fontSize', fontSize);
            }

        fontDecrease.addEventListener('click', function() {
            if (fontSize > 12) {
                fontSize -= 2;
                document.documentElement.style.fontSize = fontSize + 'px';
                localStorage.setItem('fontSize', fontSize);
            }
        });

        fontReset.addEventListener('click', function() {
            fontSize = 16;
            document.documentElement.style.fontSize = fontSize + 'px';
            localStorage.setItem('fontSize', fontSize);
        });
        });

        // Verifica tamanho salvo
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            fontSize = parseInt(savedFontSize);
            document.documentElement.style.fontSize = fontSize + 'px';
        }

        // Navegação entre seções
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.services-nav a');
            const sections = document.querySelectorAll('.section');
            
            sections[0].style.display = 'block';
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    navLinks.forEach(l => l.classList.remove('active'));
                    navLinks.forEach(l => l.removeAttribute('aria-current'));
                    this.classList.add('active');
                    this.setAttribute('aria-current', 'page');
                    
                    sections.forEach(section => {
                        section.style.display = 'none';
                    });
                    
                    const target = this.getAttribute('href');
                    document.querySelector(target).style.display = 'block';
                    document.querySelector(target + ' h1').focus();
                });
            });

            // Recuperar nome do usuário se existir
            const savedUsername = localStorage.getItem('username');
            if (savedUsername) {
                document.getElementById('username').textContent = savedUsername;
            }
        });

// Função do Google Maps
function initMap() {
    // ===== CONFIGURAÇÃO INICIAL DO MAPA =====
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -22.9068, lng: -43.5632 }, // Centro em Campo Grande
        zoom: 12,
        mapTypeId: "hybrid",
        fullscreenControl: true,
        streetViewControl: false
    });

    // ===== PONTOS DE COLETA =====
    const pontos = [
        // ---- CAMPO GRANDE ----
        {
            position: { lat: -22.9068, lng: -43.5632 },
            title: "Ecoponto Campo Grande (oficial)",
            type: "ecoponto",
            info: "Endereço: Rua São Francisco Xavier, 200"
        },
        {
            position: { lat: -22.9123, lng: -43.5587 },
            title: "Descarte irregular em Campo Grande",
            type: "descarte_irregular",
            info: "Terreno baldio com acúmulo de lixo"
        },
        
        // ---- BANGU ----
        {
            position: { lat: -22.8836, lng: -43.4731 },
            title: "Lixão próximo à Estrada do Camboatá",
            type: "lixao",
            info: "Área com descarte irregular"
        },
        {
            position: { lat: -22.8852, lng: -43.4705 },
            title: "Ecoponto Bangu (oficial)",
            type: "ecoponto",
            info: "Endereço: Av. Santa Cruz, 3000"
        },
        
        // ---- PADRE MIGUEL ----
        {
            position: { lat: -22.8764, lng: -43.4618 },
            title: "Descarte irregular em Padre Miguel",
            type: "descarte_irregular",
            info: "Estrada do Pedregoso"
        },
        {
            position: { lat: -22.8705, lng: -43.4562 },
            title: "Ecoponto Padre Miguel (oficial)",
            type: "ecoponto",
            info: "Endereço: Rua Belchior da Fonseca, 500"
        }
    ];

    // ===== ADICIONAR MARCADORES DE PONTOS =====
    // Defina os ícones para cada tipo de ponto
    const icons = {
        ecoponto: { url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" },
        lixao: { url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" },
        descarte_irregular: { url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" }
    };

    pontos.forEach(ponto => {
        const marker = new google.maps.Marker({
            position: ponto.position,
            map: map,
            title: ponto.title,
            icon: icons[ponto.type].url
        });

        // Janela de informações ao clicar
        const infowindow = new google.maps.InfoWindow({
            content: `<strong>${ponto.title}</strong><br>${ponto.info}`
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    });

    // ===== LEGENDA DO MAPA =====
    const legend = document.createElement("div");
    legend.innerHTML = `
        <div style="background: white; padding: 10px; border: 1px solid #ccc;">
            <h4 style="margin-top: 0;">Legenda:</h4>
            <div><img src="${icons.ecoponto.url}" width="20"> Ecoponto Oficial</div>
            <div><img src="${icons.lixao.url}" width="20"> Lixão</div>
            <div><img src="${icons.descarte_irregular.url}" width="20"> Descarte Irregular</div>
        </div>
    `;
    legend.style.position = "absolute";
    legend.style.bottom = "30px";
    legend.style.left = "10px";
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
}


