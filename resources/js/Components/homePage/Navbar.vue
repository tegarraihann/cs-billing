<template>
    <nav class="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <div class="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300"
                     @click="scrollToSection('#home')">
                    <Logo
                        size="medium"
                        variant="default"
                        :show-tagline="false"
                    />
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a v-for="item in navigation" :key="item.name" :href="item.href"
                            @click="scrollToSection(item.href)"
                            class="text-gray-700 hover:text-sage-700 px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer relative group"
                            :class="{ 'text-sage-700 font-semibold': activeSection === item.href }">
                            {{ item.name }}
                            <span
                                class="absolute bottom-0 left-0 w-0 h-0.5 bg-sage-600 transition-all duration-300 group-hover:w-full"
                                :class="{ 'w-full': activeSection === item.href }"
                            ></span>
                        </a>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="hidden md:block">
                    <button @click="scrollToSection('#contact')"
                        class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Konsultasi Gratis
                    </button>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="text-gray-700 hover:text-sage-700 focus:outline-none focus:text-sage-700 p-2">
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
        <div v-show="mobileMenuOpen" class="md:hidden bg-white border-t border-sage-100">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <!-- Mobile Logo -->
                <!-- <div class="flex justify-center py-4">
                    <Logo
                        size="small"
                        variant="default"
                        :show-tagline="true"
                    />
                </div> -->

                <a v-for="item in navigation" :key="item.name" :href="item.href"
                    @click="scrollToSection(item.href); mobileMenuOpen = false"
                    class="text-gray-700 hover:text-sage-700 block px-4 py-3 text-base font-medium cursor-pointer rounded-lg hover:bg-sage-50 transition-colors duration-200">
                    {{ item.name }}
                </a>
                <button @click="scrollToSection('#contact'); mobileMenuOpen = false"
                    class="w-full mt-4 bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300">
                    Konsultasi Gratis
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Logo from '@/Components/Logo.vue'

const mobileMenuOpen = ref(false)
const activeSection = ref('#home')

const navigation = [
    { name: 'Beranda', href: '#home' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang', href: '#about' },
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
    const sections = ['#home', '#services', '#about', '#contact']
    const scrollPosition = window.scrollY + 120

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

<style scoped>
/* Custom Sage Colors */
.text-sage-600 { color: #8DB580; }
.text-sage-700 { color: #7BA169; }
.bg-sage-50 { background-color: #F4F6F3; }
.bg-sage-100 { background-color: #E8ECE5; }
.bg-sage-600 { background-color: #8DB580; }
.bg-sage-700 { background-color: #7BA169; }
.border-sage-100 { border-color: #E8ECE5; }
.hover\:bg-sage-50:hover { background-color: #F4F6F3; }
.hover\:bg-sage-700:hover { background-color: #7BA169; }
.hover\:text-sage-700:hover { color: #7BA169; }
</style>
