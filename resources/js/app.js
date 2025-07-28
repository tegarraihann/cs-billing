import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h } from "vue";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Setup CSRF token globally
const setupCSRF = () => {
    const token = document.querySelector('meta[name="csrf-token"]');
    if (token) {
        // Make CSRF token globally available
        window.Laravel = window.Laravel || {};
        window.Laravel.csrfToken = token.getAttribute("content");

        // Setup for axios if available
        if (window.axios) {
            window.axios.defaults.headers.common["X-CSRF-TOKEN"] =
                token.getAttribute("content");
            window.axios.defaults.headers.common["X-Requested-With"] =
                "XMLHttpRequest";
        }

        console.log("CSRF token loaded:", token.getAttribute("content"));
    } else {
        console.warn("CSRF token not found in meta tags");
    }
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        // Setup CSRF token when app initializes
        setupCSRF();

        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});

// Also setup CSRF when DOM is ready (fallback)
document.addEventListener("DOMContentLoaded", setupCSRF);
