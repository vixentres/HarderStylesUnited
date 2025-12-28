/* assets/js/router.js */
export const router = {
    init: () => {
        // Initial route check could go here
    },
    
    navigate: (screenId) => {
        console.log(`Navigating to: ${screenId}`);
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(el => {
            el.classList.remove('active');
        });
        
        // Show target screen
        const target = document.getElementById(`screen-${screenId}`);
        if (target) {
            target.classList.add('active');
        } else {
            console.error(`Screen not found: ${screenId}`);
        }
    }
};
