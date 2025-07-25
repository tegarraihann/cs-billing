<template>
    <footer class="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                <!-- Company Info -->
                <div class="lg:col-span-1">
                    <div class="flex items-center mb-6">
                        <img class="h-10 w-auto mr-3" src="/images/logo.png" alt="Company logo" />
                        <div class="text-2xl font-bold">Company</div>
                    </div>
                    <p class="text-blue-100 mb-6 leading-relaxed">
                        Solusi logistik terpercaya untuk ekspor-impor, trucking inland, transfer uang internasional,
                        dan asuransi barang kiriman ke seluruh dunia.
                    </p>

                    <!-- Social Media -->
                    <div class="flex space-x-4">
                        <a v-for="social in socialMedia" :key="social.name" :href="social.url" target="_blank"
                            class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            :class="social.hoverColor">
                            <div v-html="social.icon" class="w-5 h-5"></div>
                        </a>
                    </div>
                </div>

                <!-- Services -->
                <div>
                    <h3 class="text-xl font-bold mb-6">Layanan Kami</h3>
                    <ul class="space-y-3">
                        <li v-for="service in services" :key="service.name">
                            <a :href="service.link"
                                class="text-blue-100 hover:text-white transition-colors duration-300 flex items-center group">
                                <svg class="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                                </svg>
                                {{ service.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-xl font-bold mb-6">Menu Cepat</h3>
                    <ul class="space-y-3">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.url" @click="scrollToSection(link.url)"
                                class="text-blue-100 hover:text-white transition-colors duration-300 flex items-center group cursor-pointer">
                                <svg class="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                                </svg>
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="text-xl font-bold mb-6">Hubungi Kami</h3>
                    <div class="space-y-4">
                        <div v-for="contact in contactInfo" :key="contact.type" class="flex items-start group">
                            <div
                                class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 mt-1 group-hover:scale-110 transition-transform duration-300">
                                <div v-html="contact.icon" class="w-5 h-5"></div>
                            </div>
                            <div>
                                <div class="text-sm text-blue-200 mb-1">{{ contact.type }}</div>
                                <div class="text-white font-medium">{{ contact.value }}</div>
                                <div v-if="contact.secondary" class="text-sm text-blue-100">{{ contact.secondary }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Back to Top Button -->
        <button @click="scrollToTop" v-show="showBackToTop"
            class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
            aria-label="Back to top">
            <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const newsletterEmail = ref('')
const showBackToTop = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const socialMedia = [
    {
        name: 'Facebook',
        url: '#',
        hoverColor: 'hover:bg-blue-600',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/></svg>'
    },
    {
        name: 'Instagram',
        url: '#',
        hoverColor: 'hover:bg-pink-600',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm-2 4h4a4 4 0 014 4v4a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4zm4 1.5H8A2.5 2.5 0 005.5 8v4A2.5 2.5 0 008 14.5h4a2.5 2.5 0 002.5-2.5V8A2.5 2.5 0 0012 5.5zM10 7a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm3.5-2.5a.5.5 0 11-1 0 .5.5 0 011 0z"/></svg>'
    },
    {
        name: 'LinkedIn',
        url: '#',
        hoverColor: 'hover:bg-blue-700',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/></svg>'
    },
    {
        name: 'WhatsApp',
        url: '#',
        hoverColor: 'hover:bg-green-600',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0010.05 0C4.495 0 .16 4.335.157 9.892c0 1.743.456 3.448 1.328 4.956L0 20l5.304-1.39a9.934 9.934 0 004.737 1.215h.005c5.505 0 9.847-4.336 9.847-9.892A9.824 9.824 0 0020.05 3.488"/></svg>'
    }
]

const services = [
    { name: 'Export & Import', link: '#services' },
    { name: 'Trucking Inland', link: '#services' },
    { name: 'Transfer Uang Internasional', link: '#services' },
    { name: 'Asuransi Barang Kiriman', link: '#services' },
    { name: 'Warehousing & Storage', link: '#services' },
    { name: 'Packaging Services', link: '#services' },
    { name: 'Customs Clearance', link: '#services' },
    { name: 'Trade Consulting', link: '#services' }
]

const quickLinks = [
    { name: 'Beranda', url: '#home' },
    { name: 'Tentang Kami', url: '#about' },
    { name: 'Layanan', url: '#services' },
    { name: 'Mitra', url: '#partners' },
    { name: 'Kontak', url: '#contact' },
    { name: 'FAQ', url: '#faq' },
    { name: 'Blog', url: '/blog' },
    { name: 'Karir', url: '/career' }
]

const contactInfo = [
    {
        type: 'Kantor Pusat',
        value: 'Jakarta Selatan',
        secondary: 'Jl. Jend. Sudirman Kav. 52-53',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>'
    },
    {
        type: 'Telepon',
        value: '+62 21 2555-0123',
        secondary: 'Senin - Jumat, 08:00 - 17:00',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>'
    },
    {
        type: 'Email',
        value: 'info@companyname.com',
        secondary: 'Respon dalam 24 jam',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>'
    },
    {
        type: 'WhatsApp',
        value: '+62 812-3456-7890',
        secondary: 'Customer Service 24/7',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0010.05 0C4.495 0 .16 4.335.157 9.892c0 1.743.456 3.448 1.328 4.956L0 20l5.304-1.39a9.934 9.934 0 004.737 1.215h.005c5.505 0 9.847-4.336 9.847-9.892A9.824 9.824 0 0020.05 3.488"/></svg>'
    }
]

const legalLinks = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Cookie Policy', url: '/cookies' }
]

const certifications = [
    {
        name: 'ISO 9001',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
    },
    {
        name: 'Verified',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
    }
]

const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
        const offsetTop = element.offsetTop - 80
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        })
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const subscribeNewsletter = () => {
    if (newsletterEmail.value) {
        // Handle newsletter subscription
        alert('Terima kasih telah berlangganan newsletter kami!')
        newsletterEmail.value = ''
    }
}

const handleScroll = () => {
    showBackToTop.value = window.scrollY > 400
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
