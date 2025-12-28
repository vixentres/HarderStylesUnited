/* assets/js/app.js */
import { router } from './router.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('App Initialized');

        // Expose navigation to global scope for HTML onclick events
        window.app = {
            nav: (screenId) => router.navigate(screenId)
        };

        // Bind Logic
        const loginBtn = document.getElementById('btn-login-action');
        if (loginBtn) {
            loginBtn.addEventListener('click', async () => {
                const emailInput = document.getElementById('login-email');
                const email = emailInput.value;
                if (!email) return alert("Ingresa tu correo");

                loginBtn.textContent = "Cargando...";
                loginBtn.disabled = true;

                // Call Real API via api.js
                // It will use the URL configured and MOCK_MODE = false
                const res = await import('./api.js').then(m => m.api.request('LOGIN', { email }));

                loginBtn.textContent = "Ingresar";
                loginBtn.disabled = false;

                if (res.status === 'success') {
                    if (res.data.status === 'NEW_USER') {
                        // Simple Prompt for V1 Registration
                        const name = prompt("Usuario nuevo. Ingresa tu Nombre:");
                        const phone = prompt("Ingresa tu Teléfono:");
                        if (name && phone) {
                            const regRes = await import('./api.js').then(m => m.api.request('REGISTER_CLIENT', { name, email, phone }));
                            if (regRes.status === 'success') {
                                alert("Bienvenido " + regRes.data.user.name);
                                router.navigate('home');
                            } else {
                                alert("Error registro: " + regRes.message);
                            }
                        }
                    } else if (res.data.user) {
                        alert("Hola de nuevo " + res.data.user.name);
                        router.navigate('home');
                    }
                } else {
                    alert("Error: " + res.message);
                }
            });
        }
    }
}

// Start App
new App();
