<template>
    <section v-if="settings.company_name" id="home"
        class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <!-- Background Image with Stronger Overlay -->
        <div class="absolute inset-0">
            <div class="w-full h-full" :style="heroBackgroundStyle"></div>
            <!-- Sophisticated Sage gradient overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-br from-black/85 via-primary-sage/60 via-secondary-sage/70 to-accent-sage/75">
            </div>
            <!-- Additional left gradient -->
            <div
                class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 via-black/20 to-transparent">
            </div>
        </div>

        <!-- Sage-themed Background Pattern -->
        <div class="absolute inset-0 opacity-15">
            <div class="absolute inset-0" style="
          background-image: radial-gradient(
            circle at 2px 2px,
            var(--pale-sage) 1px,
            transparent 0
          );
          background-size: 40px 40px;
        "></div>
        </div>

        <!-- Subtle Sage Decorative Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <!-- Geometric shapes with Sage colors -->
            <div class="absolute top-40 right-20 w-3 h-3 bg-secondary-sage/30 rotate-45 animate-pulse"
                style="animation-delay: 1s"></div>
            <div class="absolute top-60 right-32 w-2 h-2 bg-accent-sage/40 rounded-full animate-pulse"
                style="animation-delay: 3s"></div>
            <div class="absolute bottom-40 left-20 w-4 h-4 border border-light-sage/25 rotate-45 animate-pulse"
                style="animation-delay: 5s"></div>
            <div class="absolute bottom-60 left-32 w-2 h-8 bg-pale-sage/20 rounded-full animate-pulse"
                style="animation-delay: 7s"></div>
        </div>

        <!-- Enhanced Sage Floating Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="floating-element absolute top-20 left-10 w-64 h-64 bg-light-sage/20 rounded-full blur-3xl">
            </div>
            <div class="floating-element absolute bottom-20 right-10 w-80 h-80 bg-accent-sage/15 rounded-full blur-3xl"
                style="animation-delay: 2s"></div>
            <div class="floating-element absolute top-1/3 right-1/4 w-48 h-48 bg-secondary-sage/12 rounded-full blur-2xl"
                style="animation-delay: 4s"></div>
            <div class="floating-element absolute bottom-1/3 left-1/3 w-56 h-56 bg-pale-sage/18 rounded-full blur-3xl"
                style="animation-delay: 6s"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Content Left Side -->
                <div class="text-center lg:text-left">
                    <!-- Enhanced Trust Badge -->
                    <div
                        class="inline-flex items-center px-8 py-4 mb-10 bg-white/95 backdrop-blur-md rounded-full shadow-2xl animate-fade-in-down border border-primary-sage/20">
                        <div class="w-3 h-3 rounded-full mr-3 animate-pulse shadow-lg" style="
                background-color: #556b2f;
                box-shadow: 0 0 10px rgba(85, 107, 47, 0.6);
              "></div>
                        <span class="text-base font-semibold text-primary-sage font-jost">{{ trustBadgeText }}</span>
                    </div>

                    <!-- Enhanced Heading with Better Typography -->
                    <div class="mb-6 animate-fade-in-up">
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-none font-inter mb-2">
                            <span class="text-white drop-shadow-2xl tracking-tight whitespace-nowrap">
                                {{ companyNameFirst }}
                            </span>
                        </h1>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-inter">
                            <span class="text-transparent bg-clip-text gradient-logistics drop-shadow-lg animate-gradient">
                                {{ companyNameLast }}
                            </span>
                        </h2>
                    </div>

                    <p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up leading-relaxed drop-shadow font-jost"
                        style="animation-delay: 0.2s">
                        {{ displayDescription }}
                    </p>

                    <!-- Enhanced CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up"
                        style="animation-delay: 0.4s">
                        <button @click="scrollToContact"
                            class="group relative btn-primary text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <span class="relative z-10">{{ primaryCtaText }}</span>
                        </button>
                        <button @click="scrollToServices"
                            class="group bg-white/90 backdrop-blur-sm text-dark-gray hover:bg-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            {{ secondaryCtaText }}
                        </button>
                    </div>
                </div>

            <!-- Right Side Logo -->
            <!-- <div class="flex justify-center">
                <div class="relative logo-parallax">
                    <img v-if="!imageError && logoSrc" :src="logoSrc" :alt="companyName + ' Logo'"
                        class="w-64 md:w-72 lg:w-80 object-contain drop-shadow-2xl animate-logo-float"
                        @error="handleImageError" />
                </div>
            </div> -->
            </div>
        </div>

        <!-- Sage-themed Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="w-8 h-12 border-2 border-pale-sage/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
                <div class="w-1.5 h-4 bg-secondary-sage rounded-full mt-2 animate-pulse"></div>
            </div>
        </div>

        <!-- Floating WhatsApp Button -->
        <div class="fixed bottom-6 right-6 z-50">
            <a v-if="settings.whatsapp_number" :href="whatsappUrl" target="_blank" class="btn-whatsapp"
                :aria-label="whatsappCsText">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-6 h-6 mr-2">
                    <path fill="white"
                        d="M16.04 2C8.29 2 2 8.29 2 16.04c0 2.83.74 5.53 2.15 7.91L2 30l6.26-2.06a14.07 14.07 0 007.78 2.27c7.75 0 14.04-6.29 14.04-14.04S23.79 2 16.04 2zm0 25.56c-2.54 0-5.02-.72-7.15-2.08l-.51-.32-3.71 1.21 1.21-3.62-.34-.55a11.54 11.54 0 01-1.79-6.16c0-6.38 5.19-11.56 11.56-11.56s11.56 5.18 11.56 11.56-5.19 11.56-11.56 11.56zm6.36-8.64c-.35-.18-2.05-1.01-2.37-1.12-.32-.12-.55-.18-.78.18-.23.35-.9 1.12-1.1 1.35-.2.23-.4.26-.75.09-.35-.18-1.47-.54-2.8-1.72-1.03-.92-1.72-2.06-1.93-2.41-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.62-.09-.18-.78-1.87-1.07-2.57-.28-.67-.56-.58-.78-.59h-.66c-.23 0-.58.09-.88.44-.3.35-1.16 1.13-1.16 2.75s1.19 3.19 1.35 3.41c.18.23 2.34 3.57 5.67 5 .79.34 1.41.54 1.89.69.79.25 1.51.21 2.08.13.63-.09 2.05-.84 2.34-1.64.29-.81.29-1.5.2-1.64-.09-.14-.32-.23-.67-.41z" />
                </svg>
                {{ whatsappCsText }}
            </a>
        </div>
    </section>
</template>


<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
    settings: { type: Object, required: true, default: () => ({}) },
});

const imageError = ref(false);

// Company Name sebagai Hero Title
const companyName = computed(
    () => props.settings.company_name || "PT ESHAKA WIJAYA LOGISTICS"
);

// Split nama perusahaan menjadi bagian awal dan kata terakhir
const companyNameFirst = computed(() => {
    const words = companyName.value.split(" ");
    return words.slice(0, -1).join(" ");
});

const companyNameLast = computed(() => {
    const words = companyName.value.split(" ");
    return words[words.length - 1];
});

// Company Description
const displayDescription = computed(
    () =>
        props.settings.company_description ||
        "Trusted solutions for your international export-import and logistics needs with professional and experienced services."
);

// Trust Badge Text
const trustBadgeText = computed(
    () => props.settings.trust_badge_text || "Trusted for over 20 Years"
);

// CTA Button Texts - STATIS, tidak dinamis
const primaryCtaText = "Free Consultation";
const secondaryCtaText = "Services";

// WhatsApp CS Text - STATIS, tidak dinamis
const whatsappCsText = "Hubungi CS";

const heroBackgroundStyle = computed(() => ({
    backgroundImage: `url('${props.settings.hero_background_image
            ? `/storage/${props.settings.hero_background_image}`
            : "/images/bg.jpg"
        }')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}));

const logoSrc = computed(() =>
    imageError.value
        ? null
        : props.settings.company_logo
            ? `/storage/${props.settings.company_logo}`
            : null
);

const whatsappUrl = computed(() =>
    props.settings.whatsapp_number
        ? `https://wa.me/${props.settings.whatsapp_number
        }?text=${encodeURIComponent(
            `Halo ${companyName.value}, saya tertarik dengan layanan ekspor Anda.`
        )}`
        : "#"
);

const handleImageError = () => {
    imageError.value = true;
};

const handleParallax = () => {
    const scrolled = window.pageYOffset;
    const logo = document.querySelector(".logo-parallax");
    if (logo && scrolled < window.innerHeight) {
        logo.style.transform = `translateY(${scrolled * -0.3}px)`;
    }
};

const scrollToNext = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() =>
    window.addEventListener("scroll", handleParallax, { passive: true })
);
onUnmounted(() => window.removeEventListener("scroll", handleParallax));
</script>

<style scoped>
/* Optimized font imports */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Jost:wght@400;500;600&family=Roboto:wght@700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap");

/* Enhanced Animations */
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-down {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes gradient {
    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

.animate-fade-in-up {
    animation: fade-in-up 1s ease-out forwards;
}

.animate-fade-in-down {
    animation: fade-in-down 1s ease-out forwards;
}

.floating-element {
    animation: float 12s ease-in-out infinite;
    will-change: transform;
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 4s ease infinite;
    will-change: background-position;
}

/* Sage Green Brand Palette CSS Variables */
:root {
    /* Primary Sage Green Palette */
    --primary-sage: #556b2f;
    /* Dark Olive Green - CTA buttons, primary actions */
    --secondary-sage: #6b7f5a;
    /* Logo exact match - icons, badges, secondary elements */
    --accent-sage: #8a9b7a;
    /* Medium Sage - hover states, borders */
    --light-sage: #a8b897;
    /* Light Sage - background sections, cards */
    --pale-sage: #c5d1b7;
    /* Very light sage - subtle backgrounds */

    /* Supporting Colors */
    --dark-gray: #2d3748;
    /* Text headings */
    --medium-gray: #718096;
    /* Body text */
    --light-gray: #f7fafc;
    /* Light backgrounds */
    --white: #ffffff;
    /* Clean backgrounds */
}

/* Custom Sage Color Classes */
.bg-primary-sage {
    background-color: var(--primary-sage);
}

.bg-secondary-sage {
    background-color: var(--secondary-sage);
}

.bg-accent-sage {
    background-color: var(--accent-sage);
}

.bg-light-sage {
    background-color: var(--light-sage);
}

.bg-pale-sage {
    background-color: var(--pale-sage);
}

.bg-dark-gray {
    background-color: var(--dark-gray);
}

.bg-sage-primary {
    background-color: var(--primary-sage);
}

.bg-sage-secondary {
    background-color: var(--secondary-sage);
}

.bg-sage-accent {
    background-color: var(--accent-sage);
}

.bg-sage-light {
    background-color: var(--light-sage);
}

.bg-sage-pale {
    background-color: var(--pale-sage);
}

/* Fixed Gradient for LOGISTICS text */
.gradient-logistics {
    background: linear-gradient(to right, #a8b897, #8a9b7a, #a8b897);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
}

/* Fixed Button Styles */
.btn-primary {
    background-color: #556b2f;
}

.btn-primary:hover {
    background-color: #6b7f5a;
}

.text-primary-sage {
    color: var(--primary-sage);
}

.text-secondary-sage {
    color: var(--secondary-sage);
}

.text-accent-sage {
    color: var(--accent-sage);
}

.text-light-sage {
    color: var(--light-sage);
}

.text-pale-sage {
    color: var(--pale-sage);
}

.text-dark-gray {
    color: var(--dark-gray);
}

.border-primary-sage {
    border-color: var(--primary-sage);
}

.border-secondary-sage {
    border-color: var(--secondary-sage);
}

.border-accent-sage {
    border-color: var(--accent-sage);
}

.border-light-sage {
    border-color: var(--light-sage);
}

.border-pale-sage {
    border-color: var(--pale-sage);
}

.shadow-secondary-sage\/50 {
    box-shadow: 0 10px 15px -3px rgb(107 127 90 / 0.5),
        0 4px 6px -2px rgb(107 127 90 / 0.5);
}

/* Add Montserrat font class */
.font-montserrat {
    font-family: "Montserrat", sans-serif;
}

.font-jost {
    font-family: "jost", sans-serif;
}

.font-roboto {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
}

.font-inter {
    font-family: "Inter", sans-serif;
}

.btn-whatsapp {
    @apply bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full font-semibold flex items-center shadow-lg transition-all duration-300 animate-pulse;
}

.fallback-logo {
    @apply w-64 h-64 flex items-center justify-center border border-white/20 rounded-lg text-white/80;
}

</style>
