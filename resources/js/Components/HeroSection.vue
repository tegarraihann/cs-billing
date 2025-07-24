<template>
    <section id="home"
        class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: url('#')"></div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute inset-0">
            <div class="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-bounce"
                style="animation-delay: 0s;"></div>
            <div class="floating-element absolute top-40 right-20 w-16 h-16 bg-indigo-400 rounded-full opacity-20 animate-bounce"
                style="animation-delay: 1s;"></div>
            <div class="floating-element absolute bottom-40 left-20 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce"
                style="animation-delay: 2s;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Content -->
                <div class="text-center lg:text-left">
                    <div
                        class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-fade-in">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Terpercaya sejak 2015
                    </div>

                    <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
                        Solusi Logistik
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                            Terpercaya
                        </span>
                    </h1>

                    <p class="text-xl text-blue-100 mb-8 leading-relaxed animate-slide-up"
                        style="animation-delay: 0.2s;">
                        Melayani ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang kiriman
                        ke seluruh Indonesia dan mancanegara dengan layanan profesional.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up"
                        style="animation-delay: 0.4s;">
                        <button @click="scrollToContact"
                            class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1">
                            Konsultasi Gratis
                        </button>
                        <button @click="scrollToServices"
                            class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                            Lihat Layanan
                        </button>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-8 mt-12 animate-fade-in" style="animation-delay: 0.6s;">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-white">500+</div>
                            <div class="text-blue-200 text-sm">Klien Aktif</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-white">50+</div>
                            <div class="text-blue-200 text-sm">Negara Tujuan</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-white">99%</div>
                            <div class="text-blue-200 text-sm">Kepuasan Klien</div>
                        </div>
                    </div>
                </div>

                <!-- Hero Image/Illustration -->
                <div class="relative lg:ml-8 animate-fade-in" style="animation-delay: 0.8s;">
                    <div class="relative">
                        <!-- Main Container -->
                        <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                            <!-- Logistics Illustration -->
                            <div class="grid grid-cols-2 gap-6">
                                <!-- Export/Import -->
                                <div class="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 text-white">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                    </svg>
                                    <h3 class="font-semibold mb-2">Export/Import</h3>
                                    <p class="text-sm opacity-90">Layanan ekspor impor terpercaya</p>
                                </div>

                                <!-- Trucking -->
                                <div class="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl p-6 text-white">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path
                                            d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z" />
                                    </svg>
                                    <h3 class="font-semibold mb-2">Trucking</h3>
                                    <p class="text-sm opacity-90">Pengiriman darat seluruh Indonesia</p>
                                </div>

                                <!-- Money Transfer -->
                                <div class="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-6 text-white">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                    <h3 class="font-semibold mb-2">Transfer Uang</h3>
                                    <p class="text-sm opacity-90">Transfer ke seluruh dunia</p>
                                </div>

                                <!-- Insurance -->
                                <div class="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                    </svg>
                                    <h3 class="font-semibold mb-2">Asuransi</h3>
                                    <p class="text-sm opacity-90">Proteksi barang kiriman</p>
                                </div>
                            </div>
                        </div>

                        <!-- Floating badges -->
                        <div
                            class="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                            24/7 Service
                        </div>
                        <div
                            class="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                            Trusted
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slide-up {
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
    animation: fade-in 1s ease-out forwards;
}

.animate-slide-up {
    animation: slide-up 1s ease-out forwards;
}
</style>
