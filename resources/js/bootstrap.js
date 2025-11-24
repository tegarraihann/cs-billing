import axios from 'axios';
import { router } from '@inertiajs/vue3';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Read the freshest CSRF token (cookie > meta) and keep meta/window copies in sync.
 */
const refreshCsrfToken = () => {
    const cookieToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const csrfToken = cookieToken ? decodeURIComponent(cookieToken) : metaToken || '';

    if (csrfToken) {
        // Keep a global reference for legacy usages
        window.Laravel = { ...(window.Laravel || {}), csrfToken };

        // Ensure the meta tag always carries the latest token
        const meta = document.querySelector('meta[name="csrf-token"]');
        if (meta && meta.getAttribute('content') !== csrfToken) {
            meta.setAttribute('content', csrfToken);
        }
    }

    return csrfToken;
};

// Expose helper for other scripts
window.refreshCsrfToken = refreshCsrfToken;

// Attach latest token to every axios request
axios.interceptors.request.use((config) => {
    const csrfToken = refreshCsrfToken();

    if (csrfToken) {
        config.headers = {
            ...config.headers,
            'X-CSRF-TOKEN': csrfToken,
            'X-XSRF-TOKEN': csrfToken,
        };
    }

    return config;
});

// Ensure every non-GET Inertia visit carries the current token
router.on('before', (event) => {
    const method = event.detail.visit.method?.toLowerCase();
    if (method === 'get') return;

    const csrfToken = refreshCsrfToken();
    if (csrfToken) {
        event.detail.visit.headers = {
            ...event.detail.visit.headers,
            'X-CSRF-TOKEN': csrfToken,
            'X-XSRF-TOKEN': csrfToken,
        };
    }
});

// Keep tokens fresh after navigations
const syncCsrfAfterVisit = () => refreshCsrfToken();
router.on('finish', syncCsrfAfterVisit);
router.on('success', syncCsrfAfterVisit);

// Handle CSRF token mismatch errors globally
router.on('error', (event) => {
    if (event.detail.response && event.detail.response.status === 419) {
        console.error('CSRF token mismatch detected');
        refreshCsrfToken();

        if (confirm('Your session has expired. Would you like to refresh the page?')) {
            window.location.reload();
        }
    }
});
