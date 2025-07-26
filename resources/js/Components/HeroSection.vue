<template>
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-sage-50 to-sage-100 pt-20">
        <!-- Subtle Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #8DB580 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>

        <!-- Floating Geometric Elements -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute top-32 left-20 w-32 h-32 bg-sage-200 rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute top-1/3 right-16 w-24 h-24 bg-sage-300 rounded-full opacity-15 animate-pulse" style="animation-delay: 1s;"></div>
            <div class="absolute bottom-1/4 left-16 w-20 h-20 bg-sage-400 rounded-full opacity-10 animate-pulse" style="animation-delay: 2s;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Content -->
                <div class="text-center lg:text-left">
                    <!-- Trust Badge -->
                    <div class="inline-flex items-center px-6 py-3 mb-8 bg-white/80 backdrop-blur-sm rounded-full shadow-md animate-fade-in">
                        <div class="w-3 h-3 bg-sage-500 rounded-full mr-3 animate-pulse"></div>
                        <span class="text-sm font-semibold text-gray-700">Terpercaya sejak 2015</span>
                        <svg class="w-4 h-4 ml-2 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                        </svg>
                    </div>

                    <!-- Main Headline -->
                    <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 animate-slide-up">
                        <span class="text-gray-800">Solusi Logistik</span>
                        <br>
                        <span class="text-sage-600">Terpercaya</span>
                    </h1>

                    <!-- Subtitle -->
                    <p class="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-up" style="animation-delay: 0.2s;">
                        Melayani ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang kiriman dengan standar profesional internasional.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16 animate-slide-up" style="animation-delay: 0.4s;">
                        <button @click="scrollToContact"
                            class="bg-sage-600 hover:bg-sage-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Konsultasi Gratis
                        </button>
                        <button @click="scrollToServices"
                            class="border-2 border-sage-600 text-sage-700 hover:bg-sage-600 hover:text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                            Lihat Layanan
                        </button>
                    </div>

                    <!-- Trust Statistics -->
                    <div class="grid grid-cols-3 gap-8 animate-fade-in" style="animation-delay: 0.6s;">
                        <div class="text-center">
                            <div class="text-3xl md:text-4xl font-bold text-sage-700 mb-2">500+</div>
                            <div class="text-gray-600 text-sm font-medium">Klien Aktif</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl md:text-4xl font-bold text-sage-700 mb-2">50+</div>
                            <div class="text-gray-600 text-sm font-medium">Negara Tujuan</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl md:text-4xl font-bold text-sage-700 mb-2">99%</div>
                            <div class="text-gray-600 text-sm font-medium">Kepuasan Klien</div>
                        </div>
                    </div>
                </div>

                <!-- Visual Content -->
                <div class="relative lg:ml-8 animate-fade-in" style="animation-delay: 0.8s;">
                    <div class="relative">
                        <!-- Main Visual Container -->
                        <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-sage-100">
                            <!-- Service Grid -->
                            <div class="grid grid-cols-2 gap-6">
                                <!-- Export/Import -->
                                <div class="bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                    </svg>
                                    <h3 class="font-semibold mb-2">Export/Import</h3>
                                    <p class="text-sm opacity-90">Layanan ekspor impor terpercaya</p>
                                </div>

                                <!-- Trucking -->
                                <div class="bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"/>
                                    </svg>
                                    <h3 class="font-semibold mb-2">Trucking</h3>
                                    <p class="text-sm opacity-90">Pengiriman darat seluruh Indonesia</p>
                                </div>

                                <!-- Money Transfer -->
                                <div class="bg-gradient-to-br from-sage-400 to-sage-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                                    </svg>
                                    <h3 class="font-semibold mb-2">Transfer Uang</h3>
                                    <p class="text-sm opacity-90">Transfer ke seluruh dunia</p>
                                </div>

                                <!-- Insurance -->
                                <div class="bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                                    <svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                                    </svg>
                                    <h3 class="font-semibold mb-2">Asuransi</h3>
                                    <p class="text-sm opacity-90">Proteksi barang kiriman</p>
                                </div>
                            </div>

                            <!-- Trust Indicators -->
                            <div class="mt-8 pt-6 border-t border-sage-100">
                                <div class="flex items-center justify-between text-sm text-gray-600">
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 text-sage-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                                        </svg>
                                        <span>24/7 Service</span>
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 text-sage-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                                        </svg>
                                        <span>ISO Certified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Badge -->
                        <div class="absolute -top-4 -right-4 bg-sage-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                            Trusted Partner
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="w-6 h-10 border-2 border-sage-400 rounded-full flex justify-center">
                <div class="w-1 h-3 bg-sage-400 rounded-full mt-2 animate-pulse"></div>
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
.bg-sage-700 { color: #7BA169; }
.border-sage-100 { border-color: #E8ECE5; }
.border-sage-400 { border-color: #A5C49A; }
.border-sage-600 { border-color: #8DB580; }
.hover\:bg-sage-700:hover { background-color: #7BA169; }
.hover\:bg-sage-600:hover { background-color: #8DB580; }
.from-sage-400 { --tw-gradient-from: #A5C49A; }
.from-sage-500 { --tw-gradient-from: #8DB580; }
.to-sage-500 { --tw-gradient-to: #8DB580; }
.to-sage-600 { --tw-gradient-to: #8DB580; }

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
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
