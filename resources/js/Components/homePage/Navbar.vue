<template>
    <nav class="fixed w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-auto" src="/images/logo.png" alt="Logo" />
                    </div>
                    <div class="hidden md:block ml-4">
                        <div class="text-xl font-bold text-blue-900">
                            Logistic
                        </div>
                    </div>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a v-for="item in navigation" :key="item.name" :href="item.href"
                            @click="scrollToSection(item.href)"
                            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
                            :class="{ 'text-blue-600 font-semibold': activeSection === item.href }">
                            {{ item.name }}
                        </a>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="hidden md:block">
                    <button @click="scrollToSection('#contact')"
                        class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Hubungi Kami
                    </button>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div v-show="mobileMenuOpen" class="md:hidden bg-white border-t">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a v-for="item in navigation" :key="item.name" :href="item.href"
                    @click="scrollToSection(item.href); mobileMenuOpen = false"
                    class="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium cursor-pointer">
                    {{ item.name }}
                </a>
                <button @click="scrollToSection('#contact'); mobileMenuOpen = false"
                    class="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                    Hubungi Kami
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const activeSection = ref('#home')

const navigation = [
    { name: 'Beranda', href: '#home' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang', href: '#about' },
    { name: 'Mitra', href: '#partners' },
    { name: 'Kontak', href: '#contact' },
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

const handleScroll = () => {
    const sections = ['#home', '#services', '#about', '#partners', '#contact']
    const scrollPosition = window.scrollY + 100

    for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.querySelector(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
            activeSection.value = sections[i]
            break
        }
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
