import axios from 'axios';
window.axios = axios;

// Set default headers
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Setup CSRF token from meta tag
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Setup Inertia CSRF handling
import { router } from '@inertiajs/vue3';

// Set global interceptor for all Inertia requests
router.on('before', (event) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (csrfToken && event.detail.visit.method !== 'get') {
        // Add CSRF token to headers for non-GET requests
        event.detail.visit.headers = {
            'X-CSRF-TOKEN': csrfToken,
            ...event.detail.visit.headers
        };
    }
});

// Handle CSRF token mismatch errors globally
router.on('error', (event) => {
    // Check if it's a CSRF error (419)
    if (event.detail.response && event.detail.response.status === 419) {
        console.error('CSRF token mismatch detected');

        // Try to refresh the page to get a new CSRF token
        if (confirm('Your session has expired. Would you like to refresh the page?')) {
            window.location.reload();
        }
    }
});
