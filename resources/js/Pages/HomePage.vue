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
