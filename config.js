// config.js
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const mainLogo = document.getElementById('main-logo');
    const html = document.documentElement;

    function applyTheme(theme) {
        // CAMBIO CRÍTICO: Se aplica a documentElement para que Tailwind y CSS :root reaccionen
        html.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (mainLogo) mainLogo.src = 'logogestionitblanco.png';
        } else {
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (mainLogo) mainLogo.src = 'logogestionit.png';
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.onclick = () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        };
    }

    // Lógica del Globo Terráqueo
    const canvas = document.getElementById('globe-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let points = [];
        function initGlobe() {
            const size = window.innerWidth < 768 ? 600 : 950;
            canvas.width = size; canvas.height = size;
            const radius = size / 2.7;
            points = [];
            for (let i = 0; i < 480; i++) {
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos((Math.random() * 2) - 1);
                points.push({ x: radius * Math.sin(phi) * Math.cos(theta), y: radius * Math.sin(phi) * Math.sin(theta), z: radius * Math.cos(phi) });
            }
        }
        let angle = 0;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2; const centerY = canvas.height / 2;
            angle += 0.0015;
            points.forEach(p => {
                const x1 = p.x * Math.cos(angle) - p.z * Math.sin(angle);
                const z1 = p.z * Math.cos(angle) + p.x * Math.sin(angle);
                const scale = 500 / (500 - z1);
                const x2 = x1 * scale + centerX; const y2 = p.y * scale + centerY;
                if (z1 > -50) {
                    ctx.beginPath(); ctx.arc(x2, y2, 1.3 * scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 164, 228, ${0.45 * scale})`; ctx.fill();
                }
            });
            requestAnimationFrame(draw);
        }
        initGlobe(); draw();
        window.onresize = initGlobe;
    }

    const mobileBtn = document.getElementById('mobile-btn');
    if (mobileBtn) {
        mobileBtn.onclick = () => document.getElementById('mobile-menu').classList.toggle('hidden');
    }

    AOS.init({ duration: 1000, once: true });
});
