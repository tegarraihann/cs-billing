<template>
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <!-- Background Image with Stronger Overlay -->
        <div class="absolute inset-0">
            <img src="/images/background-hero.jpg"
                 alt="Hero Background"
                 class="w-full h-full object-cover"
                 loading="lazy">
            <!-- Darker overlay for better text contrast -->
            <div class="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-sage-900/80"></div>
        </div>

        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-20">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>

        <!-- Enhanced Floating Elements with Parallax -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="floating-element absolute top-20 left-10 w-64 h-64 bg-sage-400/20 rounded-full blur-3xl"></div>
            <div class="floating-element absolute bottom-20 right-10 w-96 h-96 bg-sage-500/15 rounded-full blur-3xl" style="animation-delay: 1s;"></div>
            <div class="floating-element absolute top-1/2 left-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl" style="animation-delay: 2s;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Content -->
                <div class="text-center lg:text-left">
                    <!-- Enhanced Trust Badge -->
                    <div class="inline-flex items-center px-8 py-4 mb-10 bg-white backdrop-blur-md rounded-full shadow-2xl animate-fade-in-down border border-sage-200">
                        <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse shadow-lg shadow-green-500/50"></div>
                        <span class="text-base font-bold text-gray-800">Terpercaya sejak 2015</span>
                        <svg class="w-5 h-5 ml-3 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <!-- Enhanced Heading with Better Contrast -->
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight">
                        <span class="text-white drop-shadow-lg">Eshaka Wijaya</span>
                        <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 drop-shadow-lg animate-gradient">
                            Global Logistics
                        </span>
                    </h1>

                    <p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up leading-relaxed drop-shadow" style="animation-delay: 0.2s;">
                        Solusi terpercaya untuk kebutuhan ekspor-impor dan logistik internasional Anda dengan layanan profesional dan berpengalaman.
                    </p>

                    <!-- Enhanced CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up" style="animation-delay: 0.4s;">
                        <button @click="scrollToContact"
                            class="group relative bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <span class="relative z-10">Konsultasi Gratis</span>
                        </button>
                        <button @click="scrollToServices"
                            class="group bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Lihat Layanan
                        </button>
                    </div>

                    <!-- Enhanced Trust Statistics -->
                    <!-- <div class="grid grid-cols-3 gap-4 animate-fade-in-up" style="animation-delay: 0.6s;">
                        <div class="text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                            <div class="text-2xl md:text-3xl font-bold text-sage-700 mb-1">500+</div>
                            <div class="text-gray-600 text-xs font-medium uppercase tracking-wide">Klien Aktif</div>
                        </div>
                        <div class="text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5" style="animation-delay: 0.1s;">
                            <div class="text-2xl md:text-3xl font-bold text-sage-700 mb-1">50+</div>
                            <div class="text-gray-600 text-xs font-medium uppercase tracking-wide">Negara</div>
                        </div>
                        <div class="text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5" style="animation-delay: 0.2s;">
                            <div class="text-2xl md:text-3xl font-bold text-sage-700 mb-1">99%</div>
                            <div class="text-gray-600 text-xs font-medium uppercase tracking-wide">Kepuasan</div>
                        </div>
                    </div> -->
                </div>

                <!-- Visual Content with Service Cards -->
                <!-- <div class="relative lg:ml-8 animate-fade-in" style="animation-delay: 0.8s;">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group">
                            <div class="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-sage-200 transition-colors">
                                <svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-2">Export/Import</h3>
                            <p class="text-gray-600">Layanan ekspor impor terpercaya</p>
                        </div>

                        <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                            <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-amber-200 transition-colors">
                                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">Tracking</h3>
                            <p class="text-sm text-gray-600">Pantau kiriman real-time</p>
                        </div>

                        <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">Transfer Uang</h3>
                            <p class="text-sm text-gray-600">Transfer ke seluruh dunia</p>
                        </div>

                        <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">Asuransi</h3>
                            <p class="text-sm text-gray-600">Proteksi barang kiriman</p>
                        </div>
                    </div>
                </div> -->
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
</script>

<style scoped>
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
    0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
    }
    33% {
        transform: translateY(-30px) translateX(10px) scale(1.05);
    }
    66% {
        transform: translateY(20px) translateX(-10px) scale(0.95);
    }
}

@keyframes gradient {
    0%, 100% {
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
    animation: float 20s ease-in-out infinite;
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
}

/* Parallax scrolling effect */
.parallax {
    transform: translateZ(-1px) scale(2);
}

/* Custom Sage Colors */
.text-sage-600 { color: #8DB580; }
.text-sage-700 { color: #7BA169; }
.bg-sage-50 { background-color: #F4F6F3; }
.bg-sage-100 { background-color: #E8ECE5; }
.bg-sage-200 { background-color: #D4DDD0; }
.bg-sage-300 { background-color: #BFD0B8; }
.bg-sage-400 { background-color: #A5C49A; }
.bg-sage-500 { background-color: #8DB580; }
.bg-sage-600 { background-color: #8DB580; }
.bg-sage-700 { background-color: #7BA169; }
.bg-sage-900 { background-color: #5a7d52; }

/* Hover effects */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}
</style>
