<template>
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <!-- Background Image with Stronger Overlay -->
        <div class="absolute inset-0">
            <img src="/images/background-hero.jpg" alt="Hero Background" class="w-full h-full object-cover"
                loading="eager" decoding="async" fetchpriority="high">
            <!-- Darker overlay for better text contrast -->
            <div class="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-sage-900/80"></div>
        </div>

        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-20">
            <div class="absolute inset-0"
                style="background-image: radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0); background-size: 40px 40px;">
            </div>
        </div>

        <!-- Optimized Floating Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="floating-element absolute top-20 left-10 w-64 h-64 bg-sage-400/15 rounded-full blur-3xl"></div>
            <div class="floating-element absolute bottom-20 right-10 w-80 h-80 bg-sage-500/10 rounded-full blur-3xl"
                style="animation-delay: 2s;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Content Left Side -->
                <div class="text-center lg:text-left">
                    <!-- Enhanced Trust Badge -->
                    <div
                        class="inline-flex items-center px-8 py-4 mb-10 bg-white backdrop-blur-md rounded-full shadow-2xl animate-fade-in-down border border-sage-200">
                        <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse shadow-lg shadow-green-500/50">
                        </div>
                        <span class="text-base font-semibold text-gray-800 font-jost">Trusted for over 20 Years</span>
                        <svg class="w-5 h-5 ml-3 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>

                    <!-- Enhanced Heading with Better Contrast -->
                    <h1
                        class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight font-montserrat">
                        <span class="text-white drop-shadow-lg">PT ESHAKA WIJAYA </span>
                        <br>
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 drop-shadow-lg animate-gradient">
                            LOGISTICS
                        </span>
                    </h1>

                    <p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up leading-relaxed drop-shadow font-jost"
                        style="animation-delay: 0.2s;">
                        Trusted solutions for your international export-import and logistics needs with professional and
                        experienced services.
                    </p>

                    <!-- Enhanced CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up"
                        style="animation-delay: 0.4s;">
                        <button @click="scrollToContact"
                            class="group relative bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <span class="relative z-10">Free Consultation</span>
                        </button>
                        <button @click="scrollToServices"
                            class="group bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Services
                        </button>
                    </div>
                </div>

                <!-- Logo Right Side -->
                <div class="hidden lg:flex justify-center lg:justify-center lg:-ml-16 animate-fade-in-up"
                    style="animation-delay: 0.1s;">
                    <HeroLogo size="xl" :enable-parallax="true" alt-text="PT Eshaka Wijaya Logistics Hero Logo" />
                </div>

            </div>
        </div>

        <!-- Enhanced Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
                <div class="w-1.5 h-4 bg-white rounded-full mt-2 animate-pulse"></div>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Jost:wght@400;500;600&display=swap');

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



/* Custom Sage Colors - only used ones */
.bg-sage-400 {
    background-color: #A5C49A;
}

.bg-sage-500 {
    background-color: #8DB580;
}

.bg-sage-600 {
    background-color: #8DB580;
}

.bg-sage-900 {
    background-color: #5a7d52;
}

/* Add Montserrat font class */
.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-jost {
    font-family: 'jost', sans-serif;
}
</style>
