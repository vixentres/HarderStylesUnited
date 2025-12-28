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

        // Bind Logic (Mock)
        const loginBtn = document.getElementById('btn-login-action');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                // Mock Login -> Go Home
                router.navigate('home');
            });
        }
    }
}

// Start App
new App();
