// config.js - Gestión IT Centralizada
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const mainLogo = document.getElementById('main-logo');
    const html = document.documentElement;

    // 1. FUNCIÓN MAESTRA DE TEMA
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        
        // Intercambio de Logos
        if (mainLogo) {
            mainLogo.src = (theme === 'dark') ? 'logogestionitblanco.png' : 'logogestionit.png';
        }

        // Cambio de Ícono del Botón
        if (themeIcon) {
            themeIcon.className = (theme === 'dark') ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Persistencia
        localStorage.setItem('theme', theme);
    }

    // Carga inicial sincronizada con la memoria del navegador
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Evento del Botón (si existe en la página actual)
    if (themeBtn) {
        themeBtn.onclick = () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
            applyTheme(newTheme);
        };
    }

    // 2. LÓGICA DEL GLOBO TERRÁQUEO (Solo se activa si existe el canvas)
    const canvas = document.getElementById('globe-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let points = [];
        let angle = 0;

        function initGlobe() {
            const size = window.innerWidth < 768 ? 600 : 950;
            canvas.width = size; canvas.height = size;
            const radius = size / 2.7;
            points = [];
            for (let i = 0; i < 480; i++) {
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos((Math.random() * 2) - 1);
                points.push({
                    x: radius * Math.sin(phi) * Math.cos(theta),
                    y: radius * Math.sin(phi) * Math.sin(theta),
                    z: radius * Math.cos(phi)
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            angle += 0.0015;
            points.forEach(p => {
                const x1 = p.x * Math.cos(angle) - p.z * Math.sin(angle);
                const z1 = p.z * Math.cos(angle) + p.x * Math.sin(angle);
                const scale = 500 / (500 - z1);
                const x2 = x1 * scale + centerX;
                const y2 = p.y * scale + centerY;
                if (z1 > -50) {
                    ctx.beginPath();
                    ctx.arc(x2, y2, 1.3 * scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 164, 228, ${0.45 * scale})`;
                    ctx.fill();
                }
            });
            requestAnimationFrame(draw);
        }

        initGlobe();
        draw();
        window.onresize = initGlobe;
    }

    // 3. MENÚ MÓVIL (Universal)
    const mobileBtn = document.getElementById('mobile-btn');
    if (mobileBtn) {
        mobileBtn.onclick = () => {
            const nav = document.querySelector('nav');
            if (nav) nav.classList.toggle('hidden');
        };
    }
});
