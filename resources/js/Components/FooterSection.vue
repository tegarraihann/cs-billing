<template>
    <footer class="bg-gray-800 text-white" role="contentinfo" aria-labelledby="footer-heading">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
            <h2 id="footer-heading" class="sr-only">Footer</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
                <!-- Company Info -->
                <div class="md:col-span-2 lg:col-span-1" role="complementary" aria-labelledby="company-info-heading">
                    <!-- Company Logo -->
                    <div class="mb-6">
                        <h3 id="company-info-heading" class="sr-only">Company Information</h3>
                        <Logo size="large" :show-text="false" :show-tagline="false" />
                    </div>

                    <p class="text-gray-300 mb-6 md:mb-8 leading-relaxed font-jost text-sm md:text-base">
                        Reliable logistics solutions for export-import, inland trucking, international money transfer,
                        and shipment insurance with high professional standards since 2004.
                    </p>

                    <div class="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                        <div class="flex items-center px-3 py-1.5 bg-sage-600/20 rounded-full">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            <span class="text-xs md:text-sm text-sage-200 font-jost font-medium">Online 24/7</span>
                        </div>
                        <div class="flex items-center px-3 py-1.5 bg-sage-600/20 rounded-full">
                            <svg class="w-3 h-3 text-sage-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span class="text-xs md:text-sm text-sage-200 font-jost font-medium">ISO Certified</span>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="flex flex-wrap gap-3 md:gap-4" role="list" aria-label="Social media links">
                        <a v-for="social in socialMedia" :key="social.name" :href="social.url" target="_blank"
                            class="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-sage-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            :class="social.hoverColor"
                            :aria-label="`Follow us on ${social.name}`"
                            role="listitem"
                            rel="noopener noreferrer">
                            <div v-html="social.icon" class="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-white"></div>
                        </a>
                    </div>
                </div>

                <!-- Services -->
                <div role="navigation" aria-labelledby="services-heading">
                    <h3 id="services-heading" class="text-lg md:text-xl font-bold mb-6 md:mb-8 text-white font-montserrat">Our Services</h3>
                    <ul class="space-y-3 md:space-y-4" role="list">
                        <li v-for="service in services" :key="service.name">
                            <a :href="service.link" @click="scrollToSection(service.link)"
                                class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer"
                                :aria-label="`Navigate to ${service.name} section`">
                                <svg class="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 mt-1 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
                                </svg>
                                <span class="group-hover:translate-x-1 transition-transform duration-300 font-jost text-sm md:text-base">{{
                                    service.name }}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Quick Links -->
                <div role="navigation" aria-labelledby="quick-links-heading">
                    <h3 id="quick-links-heading" class="text-lg md:text-xl font-bold mb-6 md:mb-8 text-white font-montserrat">Quick Menu</h3>
                    <ul class="space-y-3 md:space-y-4" role="list">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.url" @click="scrollToSection(link.url)"
                                class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer"
                                :aria-label="`Navigate to ${link.name} page`">
                                <svg class="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 mt-1 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
                                </svg>
                                <span class="group-hover:translate-x-1 transition-transform duration-300 font-jost text-sm md:text-base">{{ link.name
                                    }}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div role="complementary" aria-labelledby="contact-info-heading">
                    <h3 id="contact-info-heading" class="text-lg md:text-xl font-bold mb-6 md:mb-8 text-white font-montserrat">Contact Us</h3>
                    <div class="space-y-4 md:space-y-6" role="list">
                        <div v-for="contact in contactInfo" :key="contact.type" class="group hover:bg-white/5 p-3 rounded-xl transition-colors duration-300" role="listitem">
                            <div class="flex items-start">
                                <div
                                    class="w-10 h-10 md:w-12 md:h-12 bg-sage-600/20 rounded-xl flex items-center justify-center mr-3 md:mr-4 mt-1 group-hover:bg-sage-600 transition-colors duration-300 flex-shrink-0">
                                    <div v-html="contact.icon" class="w-4 h-4 md:w-5 md:h-5 text-sage-300 group-hover:text-white">
                                    </div>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <div class="text-xs md:text-sm text-sage-300 mb-1 font-medium font-jost">{{ contact.type }}</div>
                                    <div class="text-sm md:text-base text-white font-semibold mb-1 font-jost break-words">{{ contact.value }}</div>
                                    <div v-if="contact.secondary" class="text-xs md:text-sm text-gray-400 font-jost">{{ contact.secondary }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Bottom Footer -->
        <div class="border-t border-gray-700/50 bg-gray-900/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
                    <div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 text-center md:text-left">
                        <p class="text-gray-400 text-xs md:text-sm font-jost">
                            © {{ currentYear }} Eshaka Wijaya Logistics. All rights reserved.
                        </p>
                        <div class="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
                            <a v-for="legal in legalLinks" :key="legal.name" :href="legal.url"
                                class="text-gray-400 hover:text-sage-300 text-xs md:text-sm transition-colors duration-300 font-jost">
                                {{ legal.name }}
                            </a>
                        </div>
                    </div>

                    <div class="flex items-center justify-center lg:justify-end">
                        <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                            <span class="text-xs md:text-sm text-gray-400 font-jost">Certified by:</span>
                            <div class="flex flex-wrap justify-center gap-2">
                                <div v-for="cert in certifications" :key="cert.name"
                                    class="flex items-center px-3 py-1.5 bg-sage-600/20 rounded-full">
                                    <div v-html="cert.icon" class="w-3 h-3 md:w-4 md:h-4 text-sage-300 mr-1.5 md:mr-2"></div>
                                    <span class="text-xs text-sage-200 font-medium font-jost">{{ cert.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Back to Top Button -->
        <button @click="scrollToTop" v-show="showBackToTop"
            class="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-sage-600 hover:bg-sage-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
            aria-label="Scroll back to top of page"
            type="button">
            <svg class="w-5 h-5 md:w-6 md:h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Logo from '@/Components/Logo.vue'

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
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Services', url: '#services' },
    { name: 'Contact', url: '#contact' },
    { name: 'FAQ', url: '/faq' },
    { name: 'Blog & News', url: '/blog' },
    { name: 'Career', url: '/career' },
    { name: 'Partnership', url: '/partnership' }
]

const contactInfo = [
    {
        type: 'Jakarta Head Office',
        value: 'Ruko Aerohub Citra 8 No.C7-10',
        secondary: 'Pegadungan, Kec.Kalideres, Jakarta Barat 11830',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
    },
    {
        type: 'Customer Service',
        value: '(021) 23095467',
        secondary: 'Available 24/7',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>'
    },
    {
        type: 'Email Support',
        value: 'eshakawijayalogistics@ewilog.com',
        secondary: 'Response within 24 hours',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
    }
]

const socialMedia = [
    {
        name: 'WhatsApp',
        url: 'https://wa.me/62895334850224',
        hoverColor: 'hover:bg-green-600',
        icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.53 3.488"/></svg>'
    },
    {
        name: 'TikTok',
        url: 'https://tiktok.com/@ewilog_eshakawijaya',
        hoverColor: 'hover:bg-gray-900',
        icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.525 3.9a4.8 4.8 0 0 1 4.8 4.8v3.54a4.8 4.8 0 0 1-2.4.654V9.9a2.4 2.4 0 0 0-2.4-2.4c-1.324 0-2.4 1.076-2.4 2.4v7.2c0 1.324-1.076 2.4-2.4 2.4S4.8 18.624 4.8 17.1s1.076-2.4 2.4-2.4a2.4 2.4 0 0 1 1.2.324V12.9a4.8 4.8 0 0 0-1.2-.156 4.8 4.8 0 0 0-4.8 4.8C2.4 19.868 4.332 21.8 6.756 21.8s4.8-1.932 4.8-4.244V9.9a4.8 4.8 0 0 0 2.4 2.4v-2.6a2.4 2.4 0 0 1-1.431-6.8z"/></svg>'
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/eshakawijayalogistic',
        hoverColor: 'hover:bg-pink-600',
        icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.683.269 3.953.504a5.906 5.906 0 00-2.126 1.384A5.909 5.909 0 00.503 3.953C.268 4.683.127 5.526.072 6.756.016 7.99 0 8.396 0 12.017c0 3.624.016 4.031.072 5.264.055 1.23.196 2.073.431 2.803a5.906 5.906 0 001.384 2.126 5.907 5.907 0 002.126 1.384c.73.235 1.573.376 2.803.431 1.233.056 1.639.072 5.264.072 3.624 0 4.031-.016 5.264-.072 1.23-.055 2.073-.196 2.803-.431a5.902 5.902 0 002.126-1.384 5.907 5.907 0 001.384-2.126c.235-.73.376-1.573.431-2.803.056-1.233.072-1.639.072-5.264 0-3.621-.016-4.027-.072-5.264-.055-1.23-.196-2.073-.431-2.803a5.908 5.908 0 00-1.384-2.126A5.907 5.907 0 0018.696.503C17.966.268 17.123.127 15.893.072 14.66.016 14.254 0 10.63 0h1.387zm0 2.165c3.549 0 3.959.014 5.36.069 1.294.059 1.996.274 2.462.456.619.24 1.061.526 1.527.992.466.466.752.908.992 1.527.182.466.397 1.168.456 2.462.055 1.401.069 1.811.069 5.36 0 3.549-.014 3.959-.069 5.36-.059 1.294-.274 1.996-.456 2.462-.24.619-.526 1.061-.992 1.527-.466.466-.908.752-1.527.992-.466.182-1.168.397-2.462.456-1.401.055-1.811.069-5.36.069-3.549 0-3.959-.014-5.36-.069-1.294-.059-1.996-.274-2.462-.456-.619-.24-1.061-.526-1.527-.992-.466-.466-.752-.908-.992-1.527-.182-.466-.397-1.168-.456-2.462-.055-1.401-.069-1.811-.069-5.36 0-3.549.014-3.959.069-5.36.059-1.294.274-1.996.456-2.462.24-.619.526-1.061.992-1.527.466-.466.908-.752 1.527-.992.466-.182 1.168-.397 2.462-.456 1.401-.055 1.811-.069 5.36-.069zm0 3.678c-3.405 0-6.162 2.757-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12.017 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.44 1.44-1.44.793-.001 1.44.645 1.44 1.44z"/></svg>'
    },
    {
        name: 'Email',
        url: 'mailto:eshakawijayalogistics@ewilog.com',
        hoverColor: 'hover:bg-sage-600',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
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
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
        name: 'Licensed',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    }
]

// These functions are now defined in the enhanced scroll handler above


// Optimized scroll handler with throttling
let scrollTimeout = null

const handleScroll = () => {
    if (scrollTimeout) return

    scrollTimeout = setTimeout(() => {
        showBackToTop.value = window.scrollY > 300
        scrollTimeout = null
    }, 100) // Throttle to improve performance
}

// Enhanced scroll to top with smooth animation
const scrollToTop = () => {
    const scrollToTopSmooth = () => {
        const currentScroll = window.scrollY
        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollToTopSmooth)
            window.scrollTo(0, currentScroll - (currentScroll / 8))
        }
    }

    // Fallback to native smooth scroll if available
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    } else {
        scrollToTopSmooth()
    }
}

// Enhanced scroll to section with offset
const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
        const offsetTop = element.offsetTop - 80
        const startPosition = window.scrollY
        const distance = offsetTop - startPosition
        const duration = 800
        let start = null

        const animation = (currentTime) => {
            if (start === null) start = currentTime
            const timeElapsed = currentTime - start
            const progress = Math.min(timeElapsed / duration, 1)

            // Easing function
            const ease = progress * (2 - progress)

            window.scrollTo(0, startPosition + (distance * ease))

            if (timeElapsed < duration) {
                requestAnimationFrame(animation)
            }
        }

        requestAnimationFrame(animation)
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (scrollTimeout) {
        clearTimeout(scrollTimeout)
    }
})
</script>

<style scoped>
/* Optimized font imports - consolidated for performance */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Jost:wght@400;500;600&display=swap');

/* Font families */
.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-jost {
    font-family: 'Jost', sans-serif;
}
/* Optimized Custom Sage Colors - only used classes */
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

/* Screen reader only content */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Performance optimizations */
.transition-all,
.transition-colors,
.transition-transform {
    will-change: transform, background-color, color, box-shadow;
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    .transition-all,
    .transition-colors,
    .transition-transform {
        transition: none;
    }

    .animate-pulse {
        animation: none;
    }

    .hover\:scale-110:hover,
    .hover\:-translate-y-0\.5:hover {
        transform: none;
    }
}
</style>
