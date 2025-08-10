<template>
    <nav class="fixed w-full bg-white/90 backdrop-blur-md shadow-lg border-b border-pale-sage/30 z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <div class="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300"
                     @click="scrollToSection('#home')">
                    <Logo
                        size="medium"
                        variant="default"
                        :show-text="false"
                        :show-tagline="false"
                    />
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a v-for="item in navigation" :key="item.name" :href="item.href"
                            @click="scrollToSection(item.href)"
                            class="navbar-link px-6 py-3 text-base font-medium transition-all duration-300 cursor-pointer relative group font-inter"
                            :class="{ 'active-link': activeSection === item.href }">
                            {{ item.name }}
                            <span
                                class="underline-effect transition-all duration-300"
                                :class="{ 'w-full': activeSection === item.href }"
                            ></span>
                        </a>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="hidden md:block">
                    <button @click="scrollToSection('#contact')"
                        class="cta-button text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Contact Us
                    </button>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="mobile-menu-btn focus:outline-none p-2">
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
        <div v-show="mobileMenuOpen" class="md:hidden bg-white border-t border-pale-sage">
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
                    class="mobile-nav-link block px-4 py-3 text-base font-medium cursor-pointer rounded-lg transition-colors duration-200">
                    {{ item.name }}
                </a>
                <button @click="scrollToSection('#contact'); mobileMenuOpen = false"
                    class="mobile-cta-button w-full mt-4 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300">
                    Contact Us
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
    { name: 'Home', href: '#home' },
    { name: 'Service', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
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

    // Default ke home jika di bagian paling atas
    if (window.scrollY < 100) {
        activeSection.value = '#home'
        return
    }

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
    // Set initial active section
    handleScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Import Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Sage Green Brand Palette */
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

.text-primary-sage { color: var(--primary-sage); }
.text-secondary-sage { color: var(--secondary-sage); }
.text-dark-gray { color: var(--dark-gray); }

.border-pale-sage { border-color: var(--pale-sage); }

/* Font Inter class */
.font-inter {
    font-family: 'Inter', sans-serif;
}

/* Navbar Specific Styles with Fixed Colors */
.navbar-link {
    color: #2d3748 !important;
    position: relative;
    letter-spacing: -0.01em;
    font-weight: 500;
}

.navbar-link:hover {
    color: #556B2F !important;
    font-weight: 600;
}

.active-link {
    color: #556B2F !important;
    font-weight: 600;
}

.underline-effect {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #556B2F, #6B7F5A);
    transition: width 0.3s ease;
    border-radius: 2px;
}

.group:hover .underline-effect {
    width: 100%;
}

.active-link .underline-effect {
    width: 100%;
}

.cta-button {
    background-color: #556B2F !important;
}

.cta-button:hover {
    background-color: #6B7F5A !important;
}

.mobile-menu-btn {
    color: #2d3748;
}

.mobile-menu-btn:hover,
.mobile-menu-btn:focus {
    color: #556B2F !important;
}

.mobile-nav-link {
    color: #2d3748;
}

.mobile-nav-link:hover {
    color: #556B2F !important;
    background-color: #C5D1B7;
}

.mobile-cta-button {
    background-color: #556B2F;
}

.mobile-cta-button:hover {
    background-color: #6B7F5A;
}
</style>
