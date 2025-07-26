<template>
    <section id="services" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-20">
                <div class="inline-flex items-center px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-semibold mb-6">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Layanan Profesional
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Solusi Logistik Terlengkap
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Dengan pengalaman lebih dari 15 tahun, kami menyediakan layanan logistik berkualitas tinggi
                    dengan standar internasional dan teknologi terdepan.
                </p>
            </div>

            <!-- Main Services Grid -->
            <div class="grid lg:grid-cols-2 gap-12 mb-20">
                <!-- Featured Service -->
                <div class="lg:row-span-2 bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-8 border border-sage-200 hover:shadow-xl transition-all duration-500 group">
                    <div class="flex items-center mb-6">
                        <div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                        </div>
                        <div class="bg-sage-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Unggulan
                        </div>
                    </div>

                    <h3 class="text-3xl font-bold text-gray-800 mb-4 group-hover:text-sage-700 transition-colors">
                        Export & Import
                    </h3>
                    <p class="text-gray-600 mb-8 leading-relaxed text-lg">
                        Layanan ekspor impor lengkap dengan handling dokumen, customs clearance, dan koordinasi
                        dengan berbagai pihak terkait. Didukung dengan jaringan global dan pengalaman lebih dari 15 tahun.
                    </p>

                    <div class="space-y-4 mb-8">
                        <div v-for="feature in exportImportFeatures" :key="feature" class="flex items-start">
                            <div class="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                </svg>
                            </div>
                            <span class="text-gray-700 font-medium">{{ feature }}</span>
                        </div>
                    </div>

                    <button class="w-full bg-sage-600 hover:bg-sage-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105">
                        Konsultasi Export Import
                    </button>
                </div>

                <!-- Other Services -->
                <div class="space-y-6">
                    <div v-for="service in otherServices" :key="service.title"
                         class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-sage-200 hover:shadow-lg transition-all duration-300 group">
                        <div class="flex items-start">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                                 :class="service.iconBg">
                                <div v-html="service.icon" class="w-6 h-6 text-white"></div>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-sage-700 transition-colors">
                                    {{ service.title }}
                                </h4>
                                <p class="text-gray-600 mb-4 leading-relaxed">
                                    {{ service.description }}
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in service.tags" :key="tag"
                                          class="px-3 py-1 bg-sage-50 text-sage-700 rounded-full text-sm font-medium">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Process Section -->
            <div class="bg-gradient-to-r from-sage-50 to-gray-50 rounded-3xl p-12 mb-20">
                <div class="text-center mb-12">
                    <h3 class="text-3xl font-bold text-gray-800 mb-4">
                        Proses Kerja Kami
                    </h3>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        Sistem kerja yang tersistem dan transparan untuk memastikan kepuasan dan kepercayaan pelanggan
                    </p>
                </div>

                <div class="grid md:grid-cols-4 gap-8">
                    <div v-for="(step, index) in processSteps" :key="index" class="text-center group">
                        <!-- Step Number -->
                        <div class="relative mb-6">
                            <div class="w-16 h-16 bg-sage-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                                {{ index + 1 }}
                            </div>
                            <!-- Connector Line -->
                            <div v-if="index < processSteps.length - 1"
                                 class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-sage-200 transform -translate-y-0.5">
                            </div>
                        </div>

                        <h4 class="text-lg font-bold text-gray-800 mb-3">
                            {{ step.title }}
                        </h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            {{ step.description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Additional Services -->
            <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-12">
                    Layanan Pendukung
                </h3>
                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="addon in additionalServices" :key="addon.title"
                         class="bg-white rounded-xl p-6 border border-gray-100 hover:border-sage-200 hover:shadow-md transition-all duration-300 group">
                        <div class="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sage-200 transition-colors duration-300">
                            <div v-html="addon.icon" class="w-6 h-6 text-sage-600"></div>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-3">{{ addon.title }}</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">{{ addon.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const exportImportFeatures = [
    'Customs Clearance & Documentation',
    'Door-to-Door Delivery Service',
    'Real-time Shipment Tracking',
    'Expert Consultation & Support',
    'Competitive Pricing & Fast Processing'
]

const otherServices = [
    {
        title: 'Trucking Inland',
        description: 'Pengiriman darat ke seluruh wilayah Indonesia dengan armada terawat dan sistem tracking real-time.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"/></svg>',
        iconBg: 'bg-gray-500',
        tags: ['Nasional', 'Tracking', 'Asuransi']
    },
    {
        title: 'Transfer Uang Internasional',
        description: 'Layanan transfer uang ke seluruh dunia dengan kurs kompetitif dan proses cepat, khususnya ke China.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>',
        iconBg: 'bg-sage-500',
        tags: ['Global', 'Cepat', 'Aman']
    },
    {
        title: 'Asuransi Barang',
        description: 'Proteksi lengkap untuk barang kiriman dengan coverage komprehensif dan claim process yang mudah.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>',
        iconBg: 'bg-gray-400',
        tags: ['Proteksi', 'Claim Mudah', '24/7']
    }
]

const processSteps = [
    {
        title: 'Konsultasi',
        description: 'Diskusi mendalam tentang kebutuhan spesifik dan solusi terbaik untuk bisnis Anda'
    },
    {
        title: 'Penawaran',
        description: 'Quotation transparan dengan breakdown biaya yang jelas dan kompetitif'
    },
    {
        title: 'Eksekusi',
        description: 'Pelaksanaan layanan sesuai SOP dengan monitoring ketat dan timeline yang tepat'
    },
    {
        title: 'Pelaporan',
        description: 'Update progress real-time dan dokumentasi lengkap untuk setiap tahapan proses'
    }
]

const additionalServices = [
    {
        title: 'Warehousing',
        description: 'Fasilitas gudang modern dengan sistem inventory management yang terintegrasi',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/></svg>'
    },
    {
        title: 'Packaging',
        description: 'Layanan pengemasan profesional sesuai standar internasional untuk berbagai jenis barang',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/></svg>'
    },
    {
        title: 'Consulting',
        description: 'Konsultasi perdagangan internasional, regulasi kepabeanan, dan strategi supply chain',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
    }
]
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-600 { color: #8DB580; }
.text-sage-700 { color: #7BA169; }
.bg-sage-50 { background-color: #F4F6F3; }
.bg-sage-100 { background-color: #E8ECE5; }
.bg-sage-200 { background-color: #D4DDD0; }
.bg-sage-500 { background-color: #8DB580; }
.bg-sage-600 { background-color: #8DB580; }
.bg-sage-700 { background-color: #7BA169; }
.border-sage-200 { border-color: #D4DDD0; }
.hover\:border-sage-200:hover { border-color: #D4DDD0; }
.hover\:bg-sage-200:hover { background-color: #D4DDD0; }
.hover\:bg-sage-700:hover { background-color: #7BA169; }
.hover\:text-sage-700:hover { color: #7BA169; }
.from-sage-50 { --tw-gradient-from: #F4F6F3; }
.to-sage-100 { --tw-gradient-to: #E8ECE5; }
</style>
