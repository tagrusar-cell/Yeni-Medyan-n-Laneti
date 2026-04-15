document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // Başlangıç Temasını Belirle
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Tüm tema değiştirme butonlarını yakala (header ve modal içindekiler)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('#themeToggle') || e.target.closest('.modal-theme-btn');
        if (target) {
            const currentTheme = root.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }
    });

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        
        // Tüm güneş/ay ikonlarını güncelle
        const sunIcons = document.querySelectorAll('#sunIcon, .sun-icon-mini');
        const moonIcons = document.querySelectorAll('#moonIcon, .moon-icon-mini');
        
        if (theme === 'dark') {
            sunIcons.forEach(icon => icon.style.display = 'none');
            moonIcons.forEach(icon => icon.style.display = 'block');
        } else {
            sunIcons.forEach(icon => icon.style.display = 'block');
            moonIcons.forEach(icon => icon.style.display = 'none');
        }
    }
});
