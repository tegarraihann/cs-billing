<template>
    <section id="services" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                    Layanan Kami
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Solusi logistik lengkap untuk kebutuhan bisnis Anda dengan standar internasional dan pelayanan
                    terpercaya
                </p>
            </div>

            <!-- Services Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div v-for="(service, index) in services" :key="index"
                    class="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                    :class="service.featured ? 'lg:col-span-2 lg:row-span-2' : ''">
                    <!-- Icon -->
                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        :class="service.iconBg">
                        <div v-html="service.icon" class="w-8 h-8 text-white"></div>
                    </div>

                    <!-- Content -->
                    <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {{ service.title }}
                    </h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">
                        {{ service.description }}
                    </p>

                    <!-- Features -->
                    <ul class="space-y-2 mb-6">
                        <li v-for="feature in service.features" :key="feature" class="flex items-start">
                            <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            <span class="text-sm text-gray-700">{{ feature }}</span>
                        </li>
                    </ul>

                    <!-- CTA -->
                    <button
                        class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform group-hover:scale-105">
                        Pelajari Lebih Lanjut
                    </button>

                    <!-- Featured Badge -->
                    <div v-if="service.featured"
                        class="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        Unggulan
                    </div>
                </div>
            </div>

            <!-- Process Section -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
                <div class="text-center mb-12">
                    <h3 class="text-3xl font-bold text-gray-900 mb-4">
                        Proses Kerja Kami
                    </h3>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        Sistem kerja yang tersistem dan transparan untuk memastikan kepuasan pelanggan
                    </p>
                </div>

                <div class="grid md:grid-cols-4 gap-8">
                    <div v-for="(step, index) in processSteps" :key="index" class="text-center group">
                        <!-- Step Number -->
                        <div
                            class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            {{ index + 1 }}
                        </div>

                        <!-- Arrow (except last item) -->
                        <div v-if="index < processSteps.length - 1"
                            class="hidden md:block absolute top-8 left-1/2 transform translate-x-8 w-24 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400">
                        </div>

                        <h4 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ step.title }}
                        </h4>
                        <p class="text-gray-600 text-sm">
                            {{ step.description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Additional Services -->
            <div class="mt-16">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">
                    Layanan Tambahan
                </h3>
                <div class="grid md:grid-cols-3 gap-6">
                    <div v-for="addon in additionalServices" :key="addon.title"
                        class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                        <div class="flex items-center mb-4">
                            <div v-html="addon.icon" class="w-8 h-8 text-blue-600 mr-3"></div>
                            <h4 class="text-lg font-semibold text-gray-900">{{ addon.title }}</h4>
                        </div>
                        <p class="text-gray-600 text-sm">{{ addon.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const services = [
    {
        title: 'Export & Import',
        description: 'Layanan ekspor impor lengkap dengan handling dokumen, customs clearance, dan koordinasi dengan berbagai pihak terkait.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>',
        iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
        features: [
            'Customs clearance',
            'Dokumentasi lengkap',
            'Koordinasi port authority',
            'Real-time tracking'
        ],
        featured: true
    },
    {
        title: 'Trucking Inland',
        description: 'Pengiriman darat ke seluruh wilayah Indonesia dengan armada yang terawat dan sistem tracking real-time.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"/></svg>',
        iconBg: 'bg-gradient-to-r from-green-500 to-green-600',
        features: [
            'Armada terawat',
            'Tracking real-time',
            'Jangkauan nasional',
            'Asuransi tersedia'
        ]
    },
    {
        title: 'Transfer Uang',
        description: 'Layanan transfer uang internasional khususnya ke China dengan kurs kompetitif dan proses cepat aman.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>',
        iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600',
        features: [
            'Transfer ke seluruh dunia',
            'Kurs kompetitif',
            'Proses cepat & aman',
            'Fokus China market'
        ]
    },
    {
        title: 'Asuransi Barang',
        description: 'Proteksi lengkap untuk barang kiriman Anda dengan coverage yang komprehensif dan claim process yang mudah.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>',
        iconBg: 'bg-gradient-to-r from-red-500 to-red-600',
        features: [
            'Coverage komprehensif',
            'Claim mudah & cepat',
            'Premi kompetitif',
            'Support 24/7'
        ]
    }
]

const processSteps = [
    {
        title: 'Konsultasi',
        description: 'Diskusi kebutuhan dan solusi terbaik untuk Anda'
    },
    {
        title: 'Quotation',
        description: 'Penawaran harga transparan dan kompetitif'
    },
    {
        title: 'Eksekusi',
        description: 'Pelaksanaan layanan sesuai SOP dan timeline'
    },
    {
        title: 'Monitoring',
        description: 'Tracking dan update progress secara real-time'
    }
]

const additionalServices = [
    {
        title: 'Warehousing',
        description: 'Fasilitas gudang modern dengan sistem inventory management',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/></svg>'
    },
    {
        title: 'Packaging',
        description: 'Layanan pengemasan profesional untuk berbagai jenis barang',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/></svg>'
    },
    {
        title: 'Consulting',
        description: 'Konsultasi perdagangan internasional dan regulasi kepabeanan',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
    }
]
</script>
