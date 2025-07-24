<template>
    <section id="about" class="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                    Tentang LogisticPro
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Berpengalaman lebih dari 15 tahun dalam industri logistik Indonesia, kami hadir sebagai mitra
                    terpercaya untuk solusi perdagangan internasional
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
                <!-- Content -->
                <div>
                    <div
                        class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                        Sertifikat Resmi
                    </div>

                    <h3 class="text-3xl font-bold text-gray-900 mb-6">
                        Mitra Logistik Terpercaya
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Sejak 2015
                        </span>
                    </h3>

                    <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                        LogisticPro didirikan dengan visi menjadi perusahaan logistik terdepan di Indonesia. Kami
                        menyediakan layanan ekspor-impor, trucking inland, transfer uang internasional, dan asuransi
                        barang dengan standar kualitas internasional.
                    </p>

                    <!-- Key Points -->
                    <div class="space-y-4 mb-8">
                        <div v-for="point in keyPoints" :key="point.title" class="flex items-start">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ point.title }}</h4>
                                <p class="text-gray-600">{{ point.description }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Button -->
                    <button @click="scrollToContact"
                        class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Konsultasi Sekarang
                    </button>
                </div>

                <!-- Visual Content -->
                <div class="relative">
                    <!-- Main Card -->
                    <div class="bg-white rounded-3xl p-8 shadow-2xl">
                        <!-- Company Stats -->
                        <div class="grid grid-cols-2 gap-6 mb-8">
                            <div v-for="stat in companyStats" :key="stat.label"
                                class="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                                <div class="text-3xl font-bold text-blue-600 mb-2">{{ stat.value }}</div>
                                <div class="text-gray-600 font-medium text-sm">{{ stat.label }}</div>
                            </div>
                        </div>

                        <!-- Achievement Badges -->
                        <div class="space-y-4">
                            <div v-for="achievement in achievements" :key="achievement.title"
                                class="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                <div
                                    class="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                                    <div v-html="achievement.icon" class="w-6 h-6 text-white"></div>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900">{{ achievement.title }}</h4>
                                    <p class="text-sm text-gray-600">{{ achievement.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Elements -->
                    <div
                        class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse">
                    </div>
                    <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse"
                        style="animation-delay: 1s;"></div>
                </div>
            </div>

            <!-- Vision & Mission -->
            <div class="grid md:grid-cols-2 gap-12 mb-20">
                <!-- Vision -->
                <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div
                        class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Menjadi perusahaan logistik terdepan di Indonesia yang menghubungkan bisnis lokal dengan pasar
                        global,
                        memberikan solusi terpadu yang efisien, inovatif, dan berkelanjutan untuk mendukung pertumbuhan
                        ekonomi nasional.
                    </p>
                </div>

                <!-- Mission -->
                <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div
                        class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                            <path
                                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h3>
                    <ul class="space-y-3 text-gray-600">
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            Menyediakan layanan logistik berkualitas tinggi dengan teknologi terdepan
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            Membangun jaringan distribusi yang reliable dan efisien
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            Mengembangkan SDM profesional dengan komitmen pelayanan prima
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Team Section -->
            <div class="bg-white rounded-3xl p-12 shadow-xl">
                <div class="text-center mb-12">
                    <h3 class="text-3xl font-bold text-gray-900 mb-4">
                        Tim Leadership
                    </h3>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        Dipimpin oleh para profesional berpengalaman di industri logistik dan perdagangan internasional
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="leader in teamLeaders" :key="leader.name"
                        class="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
                        <!-- Photo Placeholder -->
                        <div
                            class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div class="text-4xl font-bold text-blue-600">{{ leader.initial }}</div>
                        </div>

                        <h4 class="text-xl font-bold text-gray-900 mb-2">{{ leader.name }}</h4>
                        <p class="text-blue-600 font-semibold mb-3">{{ leader.position }}</p>
                        <p class="text-gray-600 text-sm leading-relaxed">{{ leader.description }}</p>

                        <!-- Expertise Tags -->
                        <div class="flex flex-wrap justify-center gap-2 mt-4">
                            <span v-for="skill in leader.skills" :key="skill"
                                class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>
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

const keyPoints = [
    {
        title: 'Pengalaman 15+ Tahun',
        description: 'Melayani ekspor-impor dan logistik dengan track record yang terpercaya'
    },
    {
        title: 'Jaringan Global',
        description: 'Kemitraan dengan 50+ negara untuk memfasilitasi perdagangan internasional'
    },
    {
        title: 'Teknologi Modern',
        description: 'Sistem tracking real-time dan digitalisasi proses untuk efisiensi maksimal'
    },
    {
        title: 'Tim Profesional',
        description: 'Didukung oleh experts bersertifikat internasional di bidang logistik'
    }
]

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

const teamLeaders = [
    {
        name: 'Budi Hartono',
        position: 'CEO & Founder',
        initial: 'BH',
        description: 'Berpengalaman 20+ tahun di industri logistik internasional dengan spesialisasi ekspor-impor Asia Pasifik.',
        skills: ['Strategic Planning', 'International Trade', 'Business Development']
    },
    {
        name: 'Sarah Wijaya',
        position: 'COO',
        initial: 'SW',
        description: 'Expert dalam operasional logistik dan supply chain management dengan sertifikasi internasional.',
        skills: ['Operations Management', 'Supply Chain', 'Process Optimization']
    },
    {
        name: 'Michael Chen',
        position: 'Head of International',
        initial: 'MC',
        description: 'Specialist hubungan internasional dengan fokus pasar China dan Asia Tenggara.',
        skills: ['International Relations', 'China Market', 'Trade Finance']
    }
]
</script>
