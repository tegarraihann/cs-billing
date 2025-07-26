<template>
    <footer class="bg-gradient-to-br from-gray-800 via-gray-900 to-sage-800 text-white">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
                <!-- Company Info -->
                <div class="lg:col-span-1">
                    <!-- Company Logo -->
                    <div class="mb-6">
                        <Logo
                            size="large"
                            :show-text="false"
                            :show-tagline="false"
                        />
                    </div>

                    <p class="text-gray-300 mb-8 leading-relaxed">
                        Solusi logistik terpercaya untuk ekspor-impor, trucking inland, transfer uang internasional,
                        dan asuransi barang kiriman dengan standar profesional tinggi sejak 2015.
                    </p>

                    <div class="flex items-center space-x-2 mb-6">
                        <div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            <span class="text-sm text-sage-200">Online 24/7</span>
                        </div>
                        <div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full">
                            <svg class="w-3 h-3 text-sage-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                            </svg>
                            <span class="text-sm text-sage-200">ISO Certified</span>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="flex space-x-4">
                        <a v-for="social in socialMedia" :key="social.name" :href="social.url" target="_blank"
                            class="w-12 h-12 bg-white/10 hover:bg-sage-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            :class="social.hoverColor">
                            <div v-html="social.icon" class="w-5 h-5 text-gray-300 group-hover:text-white"></div>
                        </a>
                    </div>
                </div>

                <!-- Services -->
                <div>
                    <h3 class="text-xl font-bold mb-8 text-white">Layanan Kami</h3>
                    <ul class="space-y-4">
                        <li v-for="service in services" :key="service.name">
                            <a :href="service.link" @click="scrollToSection(service.link)"
                                class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer">
                                <svg class="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                                </svg>
                                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ service.name }}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-xl font-bold mb-8 text-white">Menu Cepat</h3>
                    <ul class="space-y-4">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.url" @click="scrollToSection(link.url)"
                                class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer">
                                <svg class="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                                </svg>
                                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ link.name }}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="text-xl font-bold mb-8 text-white">Hubungi Kami</h3>
                    <div class="space-y-6">
                        <div v-for="contact in contactInfo" :key="contact.type" class="group">
                            <div class="flex items-start">
                                <div class="w-12 h-12 bg-sage-600/20 rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-sage-600 transition-colors duration-300">
                                    <div v-html="contact.icon" class="w-5 h-5 text-sage-300 group-hover:text-white"></div>
                                </div>
                                <div>
                                    <div class="text-sm text-sage-300 mb-1 font-medium">{{ contact.type }}</div>
                                    <div class="text-white font-semibold mb-1">{{ contact.value }}</div>
                                    <div v-if="contact.secondary" class="text-sm text-gray-400">{{ contact.secondary }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Newsletter Section -->
        <div class="border-t border-gray-700/50 bg-gradient-to-r from-gray-800 to-sage-800/20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 class="text-2xl font-bold text-white mb-4">
                            Dapatkan Update Terbaru
                        </h3>
                        <p class="text-gray-300 leading-relaxed">
                            Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang layanan, tips logistik, dan penawaran khusus.
                        </p>
                    </div>
                    <div>
                        <form @submit.prevent="subscribeNewsletter" class="flex gap-4">
                            <input
                                v-model="newsletterEmail"
                                type="email"
                                placeholder="Masukkan email Anda"
                                class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent backdrop-blur-sm"
                                required
                            />
                            <button
                                type="submit"
                                class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Footer -->
        <div class="border-t border-gray-700/50 bg-gray-900/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <p class="text-gray-400 text-sm">
                            © {{ currentYear }} Eshaka Wijaya Logistics. All rights reserved.
                        </p>
                        <div class="flex space-x-6">
                            <a v-for="legal in legalLinks" :key="legal.name" :href="legal.url"
                                class="text-gray-400 hover:text-sage-300 text-sm transition-colors duration-300">
                                {{ legal.name }}
                            </a>
                        </div>
                    </div>

                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-400">Certified by:</span>
                            <div v-for="cert in certifications" :key="cert.name"
                                class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full">
                                <div v-html="cert.icon" class="w-4 h-4 text-sage-300 mr-2"></div>
                                <span class="text-xs text-sage-200 font-medium">{{ cert.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Back to Top Button -->
        <button @click="scrollToTop" v-show="showBackToTop"
            class="fixed bottom-8 right-8 w-14 h-14 bg-sage-600 hover:bg-sage-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
            aria-label="Back to top">
            <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
        </button>
    </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Logo from '@/Components/Logo.vue'

const newsletterEmail = ref('')
const showBackToTop = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const services = [
    { name: 'Export & Import Services', link: '#services' },
    { name: 'Trucking Inland Transportation', link: '#services' },
    { name: 'International Money Transfer', link: '#services' },
    { name: 'Cargo Insurance Coverage', link: '#services' },
    { name: 'Warehousing & Storage', link: '#services' },
    { name: 'Custom Clearance', link: '#services' },
    { name: 'Supply Chain Consulting', link: '#services' },
    { name: 'Documentation Services', link: '#services' }
]

const quickLinks = [
    { name: 'Beranda', url: '#home' },
    { name: 'Tentang Kami', url: '#about' },
    { name: 'Layanan', url: '#services' },
    { name: 'Kontak', url: '#contact' },
    { name: 'FAQ', url: '/faq' },
    { name: 'Blog & News', url: '/blog' },
    { name: 'Karir', url: '/career' },
    { name: 'Partnership', url: '/partnership' }
]

const contactInfo = [
    {
        type: 'Kantor Pusat',
        value: 'Jakarta Selatan',
        secondary: 'Jl. Jend. Sudirman Kav. 52-53',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>'
    },
    {
        type: 'Customer Service',
        value: '+62 21 2555-0123',
        secondary: 'Available 24/7',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>'
    },
    {
        type: 'Email Support',
        value: 'info@eshaka-wijaya.com',
        secondary: 'Response dalam 24 jam',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>'
    }
]

const socialMedia = [
    {
        name: 'WhatsApp',
        url: '#',
        hoverColor: 'hover:bg-green-600',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>'
    },
    {
        name: 'LinkedIn',
        url: '#',
        hoverColor: 'hover:bg-blue-700',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/></svg>'
    },
    {
        name: 'Instagram',
        url: '#',
        hoverColor: 'hover:bg-pink-600',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm-2 4h4a4 4 0 014 4v4a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4zm4 1.5H8A2.5 2.5 0 005.5 8v4A2.5 2.5 0 008 14.5h4a2.5 2.5 0 002.5-2.5V8A2.5 2.5 0 0012 5.5zM10 7a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm3.5-2.5a.5.5 0 11-1 0 .5.5 0 011 0z"/></svg>'
    },
    {
        name: 'Email',
        url: 'mailto:info@eshaka-wijaya.com',
        hoverColor: 'hover:bg-sage-600',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>'
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
        name: 'Licensed',
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
        console.log('Newsletter subscription:', newsletterEmail.value)
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

<style scoped>
/* Custom Sage Colors */
.text-sage-200 { color: #E8ECE5; }
.text-sage-300 { color: #D4DDD0; }
.text-sage-400 { color: #BFD0B8; }
.bg-sage-600 { background-color: #8DB580; }
.bg-sage-700 { background-color: #7BA169; }
.bg-sage-800 { background-color: #6B8F5E; }
.hover\:bg-sage-600:hover { background-color: #8DB580; }
.hover\:bg-sage-700:hover { background-color: #7BA169; }
.hover\:text-sage-300:hover { color: #D4DDD0; }
.hover\:text-sage-400:hover { color: #BFD0B8; }
.focus\:ring-sage-500:focus { --tw-ring-opacity: 1; --tw-ring-color: rgb(141 181 128 / var(--tw-ring-opacity)); }
.to-sage-800 { --tw-gradient-to: #6B8F5E; }
</style>
