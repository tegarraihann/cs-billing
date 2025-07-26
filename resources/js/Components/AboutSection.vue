<template>
    <section id="about" class="py-24 bg-gradient-to-br from-gray-50 to-sage-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-20">
                <div
                    class="inline-flex items-center px-4 py-2 bg-white border border-sage-200 text-sage-700 rounded-full text-sm font-semibold mb-6">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Sertifikat Resmi & Terpercaya
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Tentang Eshaka Wijaya Logistics
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Berpengalaman lebih dari 15 tahun dalam industri logistik Indonesia, kami hadir sebagai mitra
                    terpercaya untuk solusi perdagangan internasional yang efisien dan profesional.
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center mb-24">
                <!-- Content -->
                <div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-6">
                        Mitra Logistik Terpercaya
                        <span class="text-sage-600">Sejak 2015</span>
                    </h3>

                    <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                        Eshaka Wijaya Logistics didirikan dengan visi menjadi perusahaan logistik terdepan di Indonesia.
                        Kami menyediakan layanan ekspor-impor, trucking inland, transfer uang internasional, dan
                        asuransi barang dengan standar kualitas internasional yang terpercaya.
                    </p>

                    <!-- Key Points -->
                    <div class="space-y-6 mb-10">
                        <div v-for="point in keyPoints" :key="point.title" class="flex items-start group">
                            <div
                                class="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2">{{ point.title }}</h4>
                                <p class="text-gray-600 leading-relaxed">{{ point.description }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Button -->
                    <button @click="scrollToContact"
                        class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Konsultasi Sekarang
                    </button>
                </div>

                <!-- Statistics & Achievements -->
                <div class="relative">
                    <!-- Main Card -->
                    <div class="bg-white rounded-3xl p-8 shadow-xl border border-sage-100">
                        <!-- Company Stats -->
                        <div class="grid grid-cols-2 gap-6 mb-8">
                            <div v-for="stat in companyStats" :key="stat.label"
                                class="text-center p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300">
                                <div class="text-3xl font-bold text-sage-700 mb-2">{{ stat.value }}</div>
                                <div class="text-gray-600 font-medium text-sm">{{ stat.label }}</div>
                            </div>
                        </div>

                        <!-- Achievement Badges -->
                        <div class="space-y-4">
                            <div v-for="achievement in achievements" :key="achievement.title"
                                class="flex items-center p-4 bg-sage-50 rounded-xl border border-sage-100 hover:bg-sage-100 transition-colors duration-300">
                                <div class="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center mr-4">
                                    <div v-html="achievement.icon" class="w-6 h-6 text-white"></div>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">{{ achievement.title }}</h4>
                                    <p class="text-sm text-gray-600">{{ achievement.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Elements -->
                    <div class="absolute -top-6 -right-6 w-24 h-24 bg-sage-200 rounded-full opacity-30"></div>
                    <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-sage-300 rounded-full opacity-20"></div>
                </div>
            </div>

            <!-- Vision & Mission -->
            <div class="grid md:grid-cols-2 gap-12 mb-24">
                <!-- Vision -->
                <div
                    class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300">
                    <div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Visi Kami</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Menjadi perusahaan logistik terdepan di Indonesia yang menghubungkan bisnis lokal dengan pasar
                        global, memberikan solusi terpadu yang efisien, inovatif, dan berkelanjutan untuk mendukung pertumbuhan
                        ekonomi nasional.
                    </p>
                </div>

                <!-- Mission -->
                <div
                    class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300">
                    <div class="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                            <path
                                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h3>
                    <div class="space-y-3 text-gray-600">
                        <div class="flex items-start">
                            <svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            Menyediakan layanan logistik berkualitas tinggi dengan teknologi terdepan
                        </div>
                        <div class="flex items-start">
                            <svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            Membangun jaringan distribusi yang reliable dan efisien
                        </div>
                        <div class="flex items-start">
                            <svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            Mengembangkan SDM profesional dengan komitmen pelayanan prima
                        </div>
                    </div>
                </div>
            </div>

            <!-- Team Section -->
            <div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-sage-100">
                <div class="text-center mb-8">
                    <h3 class="text-3xl font-bold text-gray-800 mb-4">
                        Tim Profesional Kami
                    </h3>
                    <p class="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Dipimpin oleh para profesional berpengalaman di industri logistik dan perdagangan internasional
                        dengan komitmen tinggi terhadap kepuasan pelanggan. Tim kami yang solid dan berpengalaman siap memberikan
                        pelayanan terbaik untuk kebutuhan logistik Anda.
                    </p>
                </div>

                <!-- Team Photo Component -->
                <div class="flex justify-center mb-12">
                    <Team
                        size="xl"
                        layout="vertical"
                        :show-text="false"
                        :show-overlay="true"
                        :show-stats="true"
                        team-title="Tim Expert Logistics"
                        team-description="Profesional berpengalaman dengan dedikasi tinggi dalam melayani kebutuhan logistik internasional Anda."
                    />
                </div>

                <!-- Team Highlights -->
                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="highlight in teamHighlights" :key="highlight.title"
                        class="text-center p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300">
                        <div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <div v-html="highlight.icon" class="w-8 h-8 text-white"></div>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-3">{{ highlight.title }}</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">{{ highlight.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Team from './Team.vue'

const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const companyStats = [
    { value: '15+', label: 'Tahun Pengalaman' },
    { value: '500+', label: 'Klien Aktif' },
    { value: '50+', label: 'Negara Tujuan' },
    { value: '99.5%', label: 'Success Rate' }
]

const achievements = [
    {
        title: 'ISO 9001:2015 Certified',
        description: 'Sertifikat manajemen kualitas internasional',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
    },
    {
        title: 'Forwarder License',
        description: 'Lisensi resmi freight forwarder dari Kemenhub',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
    },
    {
        title: 'Best Service Award',
        description: 'Penghargaan pelayanan terbaik 2023',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
    }
]

const keyPoints = [
    {
        title: 'Pengalaman 15+ Tahun',
        description: 'Melayani ekspor-impor dan logistik dengan track record yang terpercaya dan profesional'
    },
    {
        title: 'Jaringan Global',
        description: 'Kemitraan dengan 50+ negara untuk memfasilitasi perdagangan internasional yang efisien'
    },
    {
        title: 'Teknologi Modern',
        description: 'Sistem tracking real-time dan digitalisasi proses untuk efisiensi maksimal dan transparansi'
    },
    {
        title: 'Tim Profesional',
        description: 'Didukung oleh experts bersertifikat internasional di bidang logistik dan perdagangan'
    }
]

const teamHighlights = [
    {
        title: 'Expert Leadership',
        description: 'Tim manajemen dengan pengalaman 20+ tahun di industri logistik internasional',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>'
    },
    {
        title: 'Certified Professionals',
        description: 'Seluruh tim memiliki sertifikasi internasional dan update knowledge secara berkala',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
    },
    {
        title: '24/7 Support',
        description: 'Tim customer service yang siap membantu Anda kapan saja dengan respon time terbaik',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"/></svg>'
    }
]
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-600 {
    color: #8DB580;
}

.text-sage-700 {
    color: #7BA169;
}

.bg-sage-50 {
    background-color: #F4F6F3;
}

.bg-sage-100 {
    background-color: #E8ECE5;
}

.bg-sage-200 {
    background-color: #D4DDD0;
}

.bg-sage-300 {
    background-color: #BFD0B8;
}

.bg-sage-600 {
    background-color: #8DB580;
}

.bg-sage-700 {
    background-color: #7BA169;
}

.border-sage-100 {
    border-color: #E8ECE5;
}

.border-sage-200 {
    border-color: #D4DDD0;
}

.hover\:bg-sage-100:hover {
    background-color: #E8ECE5;
}

.hover\:bg-sage-700:hover {
    background-color: #7BA169;
}

.from-sage-100 {
    --tw-gradient-from: #E8ECE5;
}

.to-sage-200 {
    --tw-gradient-to: #D4DDD0;
}
</style>
