<template>
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <!-- Background Image with Stronger Overlay -->
        <div class="absolute inset-0">
            <img src="/images/bg.jpg" alt="Hero Background" class="w-full h-full object-cover"
                loading="eager" decoding="async" fetchpriority="high">
            <!-- Sophisticated Sage gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-black/85 via-primary-sage/60 via-secondary-sage/70 to-accent-sage/75"></div>
            <!-- Additional left gradient -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 via-black/20 to-transparent"></div>
        </div>

        <!-- Sage-themed Background Pattern -->
        <div class="absolute inset-0 opacity-15">
            <div class="absolute inset-0"
                style="background-image: radial-gradient(circle at 2px 2px, var(--pale-sage) 1px, transparent 0); background-size: 40px 40px;">
            </div>
        </div>

        <!-- Subtle Sage Decorative Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <!-- Geometric shapes with Sage colors -->
            <div class="absolute top-40 right-20 w-3 h-3 bg-secondary-sage/30 rotate-45 animate-pulse" style="animation-delay: 1s;"></div>
            <div class="absolute top-60 right-32 w-2 h-2 bg-accent-sage/40 rounded-full animate-pulse" style="animation-delay: 3s;"></div>
            <div class="absolute bottom-40 left-20 w-4 h-4 border border-light-sage/25 rotate-45 animate-pulse" style="animation-delay: 5s;"></div>
            <div class="absolute bottom-60 left-32 w-2 h-8 bg-pale-sage/20 rounded-full animate-pulse" style="animation-delay: 7s;"></div>
        </div>

        <!-- Enhanced Sage Floating Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="floating-element absolute top-20 left-10 w-64 h-64 bg-light-sage/20 rounded-full blur-3xl"></div>
            <div class="floating-element absolute bottom-20 right-10 w-80 h-80 bg-accent-sage/15 rounded-full blur-3xl"
                style="animation-delay: 2s;"></div>
            <div class="floating-element absolute top-1/3 right-1/4 w-48 h-48 bg-secondary-sage/12 rounded-full blur-2xl"
                style="animation-delay: 4s;"></div>
            <div class="floating-element absolute bottom-1/3 left-1/3 w-56 h-56 bg-pale-sage/18 rounded-full blur-3xl"
                style="animation-delay: 6s;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Content Left Side -->
                <div class="text-center lg:text-left">
                    <!-- Enhanced Trust Badge -->
                    <div
                        class="inline-flex items-center px-8 py-4 mb-10 bg-white/95 backdrop-blur-md rounded-full shadow-2xl animate-fade-in-down border border-primary-sage/20">
                        <div class="w-3 h-3 rounded-full mr-3 animate-pulse shadow-lg" style="background-color: #556B2F; box-shadow: 0 0 10px rgba(85, 107, 47, 0.6);">
                        </div>
                        <span class="text-base font-semibold text-primary-sage font-jost">Trusted for over 20 Years</span>
                        <!-- <svg class="w-5 h-5 ml-3 text-primary-sage" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z"
                                clip-rule="evenodd" />
                        </svg> -->
                    </div>

                    <!-- Enhanced Heading with Better Typography -->
                    <div class="mb-6 animate-fade-in-up">
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-none font-inter mb-2">
                            <span class="text-white drop-shadow-2xl tracking-tight whitespace-nowrap">PT ESHAKA WIJAYA</span>
                        </h1>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-inter">
                            <span class="text-transparent bg-clip-text gradient-logistics drop-shadow-lg animate-gradient">
                                LOGISTICS
                            </span>
                        </h2>
                    </div>

                    <p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up leading-relaxed drop-shadow font-jost"
                        style="animation-delay: 0.2s;">
                        Trusted solutions for your international export-import and logistics needs with professional and
                        experienced services.
                    </p>

                    <!-- Enhanced CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up"
                        style="animation-delay: 0.4s;">
                        <button @click="scrollToContact"
                            class="group relative btn-primary text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <span class="relative z-10">Free Consultation</span>
                        </button>
                        <button @click="scrollToServices"
                            class="group bg-white/90 backdrop-blur-sm text-dark-gray hover:bg-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Services
                        </button>
                    </div>
                </div>

                <!-- Logo Right Side -->
                <!-- <div class="hidden lg:flex justify-center lg:justify-center lg:-ml-16 animate-fade-in-up"
                    style="animation-delay: 0.1s;">
                    <HeroLogo size="xl" :enable-parallax="true" alt-text="PT Eshaka Wijaya Logistics Hero Logo" />
                </div> -->

            </div>
        </div>

        <!-- Sage-themed Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="w-8 h-12 border-2 border-pale-sage/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
                <div class="w-1.5 h-4 bg-secondary-sage rounded-full mt-2 animate-pulse"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import HeroLogo from '@/Components/HeroLogo.vue'

const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const scrollToServices = () => {
    const element = document.querySelector('#services')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

// Parallax is now handled by HeroLogo component
</script>

<style scoped>
/* Optimized font imports */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Jost:wght@400;500;600&family=Roboto:wght@700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

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
    --primary-sage: #556B2F;    /* Dark Olive Green - CTA buttons, primary actions */
    --secondary-sage: #6B7F5A;  /* Logo exact match - icons, badges, secondary elements */
    --accent-sage: #8A9B7A;     /* Medium Sage - hover states, borders */
    --light-sage: #A8B897;      /* Light Sage - background sections, cards */
    --pale-sage: #C5D1B7;       /* Very light sage - subtle backgrounds */

    /* Supporting Colors */
    --dark-gray: #2d3748;       /* Text headings */
    --medium-gray: #718096;     /* Body text */
    --light-gray: #f7fafc;      /* Light backgrounds */
    --white: #ffffff;           /* Clean backgrounds */
}

/* Custom Sage Color Classes */
.bg-primary-sage { background-color: var(--primary-sage); }
.bg-secondary-sage { background-color: var(--secondary-sage); }
.bg-accent-sage { background-color: var(--accent-sage); }
.bg-light-sage { background-color: var(--light-sage); }
.bg-pale-sage { background-color: var(--pale-sage); }
.bg-dark-gray { background-color: var(--dark-gray); }

.bg-sage-primary { background-color: var(--primary-sage); }
.bg-sage-secondary { background-color: var(--secondary-sage); }
.bg-sage-accent { background-color: var(--accent-sage); }
.bg-sage-light { background-color: var(--light-sage); }
.bg-sage-pale { background-color: var(--pale-sage); }

/* Fixed Gradient for LOGISTICS text */
.gradient-logistics {
    background: linear-gradient(to right, #A8B897, #8A9B7A, #A8B897);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
}

/* Fixed Button Styles */
.btn-primary {
    background-color: #556B2F;
}

.btn-primary:hover {
    background-color: #6B7F5A;
}

.text-primary-sage { color: var(--primary-sage); }
.text-secondary-sage { color: var(--secondary-sage); }
.text-accent-sage { color: var(--accent-sage); }
.text-light-sage { color: var(--light-sage); }
.text-pale-sage { color: var(--pale-sage); }
.text-dark-gray { color: var(--dark-gray); }

.border-primary-sage { border-color: var(--primary-sage); }
.border-secondary-sage { border-color: var(--secondary-sage); }
.border-accent-sage { border-color: var(--accent-sage); }
.border-light-sage { border-color: var(--light-sage); }
.border-pale-sage { border-color: var(--pale-sage); }

.shadow-secondary-sage\/50 { box-shadow: 0 10px 15px -3px rgb(107 127 90 / 0.5), 0 4px 6px -2px rgb(107 127 90 / 0.5); }

/* Add Montserrat font class */
.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-jost {
    font-family: 'jost', sans-serif;
}

.font-roboto {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}

.font-inter {
    font-family: 'Inter', sans-serif;
}
</style>
