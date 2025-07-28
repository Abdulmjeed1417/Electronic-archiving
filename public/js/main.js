document.addEventListener('DOMContentLoaded', () => {
    const fontSizeSelect = document.getElementById('font-size');
    const languageSelect = document.getElementById('language');
    const themeSelect = document.getElementById('theme');
    const body = document.body;

    // Load saved settings
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        body.style.fontSize = savedFontSize;
        fontSizeSelect.value = savedFontSize;
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        themeSelect.value = savedTheme;
    }

    // Font size change
    fontSizeSelect.addEventListener('change', () => {
        const fontSize = fontSizeSelect.value;
        body.style.fontSize = fontSize;
        localStorage.setItem('fontSize', fontSize);
    });

    // Theme change
    themeSelect.addEventListener('change', () => {
        const theme = themeSelect.value;
        body.classList.toggle('dark-mode', theme === 'dark');
        localStorage.setItem('theme', theme);
    });

    // Language change (basic example, full implementation would be more complex)
    languageSelect.addEventListener('change', () => {
        const lang = languageSelect.value;
        if (lang === 'en') {
            document.documentElement.dir = 'ltr';
            // Here you would typically reload the page with the new language
            // or use a library to translate the content dynamically.
        } else {
            document.documentElement.dir = 'rtl';
        }
    });

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful login
                console.log('Login successful');
            } else {
                // Handle login error
                console.error(data.error);
            }
        });
    }
});
