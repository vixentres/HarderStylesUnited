/* assets/js/api.js */

// Configuration
const API_URL = 'https://script.google.com/macros/s/DEPLOY_ID/exec'; // Replace with real URL later
const MOCK_MODE = true; // Set to false when backend is ready

export const api = {
    /**
     * Generic POST request structure for GAS Web App
     * @param {string} action - The action name (e.g., 'LOGIN', 'GET_EVENT')
     * @param {object} payload - The data object
     */
    request: async (action, payload = {}) => {
        console.log(`[API] Request: ${action}`, payload);

        if (MOCK_MODE) {
            return mockResponse(action, payload);
        }

        try {
            // "no-cors" mode is often required for GAS Web Apps, but limits response reading.
            // Using standard POST with redirect following usually works if formatted correctly.
            // For simple string/json echo, we use formatted body.
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ action, data: payload })
            });
            return await response.json();
        } catch (error) {
            console.error('[API] Error:', error);
            return { status: 'error', message: error.message };
        }
    }
};

/**
 * Mock Responses for Development
 */
const mockResponse = async (action, payload) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    switch (action) {
        case 'LOGIN':
            return {
                status: 'success',
                data: {
                    user: {
                        id: 'CLI-MOCK',
                        name: 'Usuario Mock',
                        role: payload.email.includes('admin') ? 'ADMIN' : 'CLIENT'
                    }
                }
            };
        case 'GET_EVENT':
            return {
                status: 'success',
                data: {
                    event: { name: 'Evento Mock 2025', price: 15000 },
                    orders: [
                        { id: 'REG-001', status: 'PARCIAL', total: 30000, balance: 10000 }
                    ]
                }
            };
        default:
            return { status: 'success', data: {} };
    }
};
