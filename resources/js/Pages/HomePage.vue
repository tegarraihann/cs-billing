<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navigation -->
        <NavBar />

        <!-- Hero Section -->
        <HeroSection />

        <!-- Services Section -->
        <ServicesSection />

        <!-- About Section -->
        <AboutSection />

        <!-- Partners Section -->
        <!-- <PartnersSection /> -->

        <!-- Contact Section -->
        <ContactSection />

        <!-- Footer -->
        <FooterSection />
    </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3'
import NavBar from '@/Components/homePage/Navbar.vue'
import HeroSection from '@/Components/HeroSection.vue'
import ServicesSection from '@/Components/ServicesSection.vue'
import AboutSection from '@/Components/AboutSection.vue'
// import PartnersSection from '@/Components/PartnersSection.vue'
import ContactSection from '@/Components/ContactSection.vue'
import FooterSection from '@/Components/FooterSection.vue'

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
})
</script>

<style>
/* Global Sage Color Variables */
:root {
    --sage-50: #F4F6F3;
    --sage-100: #E8ECE5;
    --sage-200: #D4DDD0;
    --sage-300: #BFD0B8;
    --sage-400: #A5C49A;
    --sage-500: #8DB580;
    --sage-600: #8DB580;
    --sage-700: #7BA169;
    --sage-800: #6B8F5E;
    --sage-900: #5A7D52;
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--sage-50);
}

::-webkit-scrollbar-thumb {
    background: var(--sage-400);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--sage-600);
}

/* Enhanced animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
    animation: slideUp 1s ease-out forwards;
}

/* Sage color utilities for existing components */
.text-sage-600 { color: var(--sage-600) !important; }
.text-sage-700 { color: var(--sage-700) !important; }
.bg-sage-50 { background-color: var(--sage-50) !important; }
.bg-sage-100 { background-color: var(--sage-100) !important; }
.bg-sage-600 { background-color: var(--sage-600) !important; }
.bg-sage-700 { background-color: var(--sage-700) !important; }
.border-sage-200 { border-color: var(--sage-200) !important; }
.hover\:bg-sage-700:hover { background-color: var(--sage-700) !important; }
.hover\:text-sage-700:hover { color: var(--sage-700) !important; }

/* Update existing blue colors to sage */
.text-blue-600 { color: var(--sage-600) !important; }
.text-blue-700 { color: var(--sage-700) !important; }
.bg-blue-600 { background-color: var(--sage-600) !important; }
.bg-blue-700 { background-color: var(--sage-700) !important; }
.hover\:bg-blue-700:hover { background-color: var(--sage-700) !important; }
.from-blue-600 { --tw-gradient-from: var(--sage-600) !important; }
.to-blue-700 { --tw-gradient-to: var(--sage-700) !important; }

/* Enhanced button styles */
.btn-sage {
    background: linear-gradient(135deg, var(--sage-600), var(--sage-700));
    color: white;
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 14px 0 rgba(141, 181, 128, 0.3);
}

.btn-sage:hover {
    background: linear-gradient(135deg, var(--sage-700), var(--sage-800));
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(141, 181, 128, 0.4);
}
</style>
