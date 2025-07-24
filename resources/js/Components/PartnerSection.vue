<template>
    <section id="partners" class="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                    Mitra & Klien Terpercaya
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Dipercaya oleh perusahaan-perusahaan besar di Indonesia dan mancanegara
                </p>
            </div>

            <!-- Partners Categories -->
            <div class="mb-12">
                <div class="flex flex-wrap justify-center gap-4 mb-8">
                    <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id"
                        class="px-6 py-3 rounded-full font-semibold transition-all duration-300" :class="activeCategory === category.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'">
                        {{ category.name }}
                    </button>
                </div>
            </div>

            <!-- Partners Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                <div v-for="partner in filteredPartners" :key="partner.id"
                    class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:-translate-y-1">
                    <div class="text-center">
                        <div
                            class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div class="text-2xl font-bold text-gray-600">{{ partner.initials }}</div>
                        </div>
                        <h3 class="text-sm font-semibold text-gray-800 text-center">{{ partner.name }}</h3>
                        <p class="text-xs text-gray-500 mt-1">{{ partner.industry }}</p>
                    </div>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid md:grid-cols-4 gap-8 mb-16">
                <div v-for="stat in statistics" :key="stat.label"
                    class="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="text-4xl font-bold text-blue-600 mb-2">{{ stat.value }}</div>
                    <div class="text-gray-600 font-medium">{{ stat.label }}</div>
                    <div class="text-sm text-gray-500 mt-2">{{ stat.description }}</div>
                </div>
            </div>

            <!-- Testimonials -->
            <div class="bg-white rounded-3xl p-12 shadow-xl">
                <div class="text-center mb-12">
                    <h3 class="text-3xl font-bold text-gray-900 mb-4">
                        Testimoni Klien
                    </h3>
                    <p class="text-gray-600">Apa kata klien tentang layanan kami</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="testimonial in testimonials" :key="testimonial.id"
                        class="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                        <!-- Quote Icon -->
                        <div
                            class="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 4.414 7.707 6.707a1 1 0 01-1.414 0z" />
                            </svg>
                        </div>

                        <!-- Rating -->
                        <div class="flex mb-4">
                            <div v-for="n in 5" :key="n" class="w-5 h-5 text-yellow-400">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Testimonial Text -->
                        <blockquote class="text-gray-700 mb-6 italic">
                            "{{ testimonial.text }}"
                        </blockquote>

                        <!-- Client Info -->
                        <div class="flex items-center">
                            <div
                                class="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                                {{ testimonial.client.charAt(0) }}
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900">{{ testimonial.client }}</div>
                                <div class="text-sm text-gray-500">{{ testimonial.position }}, {{ testimonial.company }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="text-center mt-16">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                    Bergabunglah dengan Mitra Kami
                </h3>
                <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Dapatkan solusi logistik terpercaya untuk mendukung pertumbuhan bisnis Anda
                </p>
                <button
                    class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Hubungi Tim Sales
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'manufacturing', name: 'Manufaktur' },
    { id: 'retail', name: 'Retail' },
    { id: 'trading', name: 'Trading' },
    { id: 'fmcg', name: 'FMCG' },
    { id: 'automotive', name: 'Otomotif' }
]

const partners = [
    { id: 1, name: 'PT Astra International', initials: 'AI', industry: 'Otomotif', category: 'automotive' },
    { id: 2, name: 'PT Unilever Indonesia', initials: 'UI', industry: 'FMCG', category: 'fmcg' },
    { id: 3, name: 'PT Indofood Sukses', initials: 'IS', industry: 'Makanan', category: 'fmcg' },
    { id: 4, name: 'PT Matahari Dept Store', initials: 'MD', industry: 'Retail', category: 'retail' },
    { id: 5, name: 'PT Sinar Mas Group', initials: 'SM', industry: 'Konglomerat', category: 'manufacturing' },
    { id: 6, name: 'PT Gudang Garam', initials: 'GG', industry: 'Tembakau', category: 'manufacturing' },
    { id: 7, name: 'PT BCA', initials: 'BC', industry: 'Perbankan', category: 'trading' },
    { id: 8, name: 'PT Telkom Indonesia', initials: 'TI', industry: 'Telekomunikasi', category: 'trading' },
    { id: 9, name: 'PT Mayora Indah', initials: 'MI', industry: 'Makanan', category: 'fmcg' },
    { id: 10, name: 'PT Honda Motor', initials: 'HM', industry: 'Otomotif', category: 'automotive' },
    { id: 11, name: 'PT Samsung Electronics', initials: 'SE', industry: 'Elektronik', category: 'manufacturing' },
    { id: 12, name: 'PT Ace Hardware', initials: 'AH', industry: 'Retail', category: 'retail' }
]

const filteredPartners = computed(() => {
    if (activeCategory.value === 'all') {
        return partners
    }
    return partners.filter(partner => partner.category === activeCategory.value)
})

const statistics = [
    {
        value: '500+',
        label: 'Klien Aktif',
        description: 'Perusahaan yang mempercayai layanan kami'
    },
    {
        value: '50+',
        label: 'Negara Tujuan',
        description: 'Jangkauan ekspor impor internasional'
    },
    {
        value: '15+',
        label: 'Tahun Pengalaman',
        description: 'Melayani industri logistik Indonesia'
    },
    {
        value: '99.5%',
        label: 'Tingkat Kepuasan',
        description: 'Berdasarkan survey klien tahunan'
    }
]

const testimonials = [
    {
        id: 1,
        text: 'Layanan export-import yang sangat profesional. Tim LogisticPro selalu memberikan update yang jelas dan membantu menyelesaikan semua dokumentasi dengan tepat waktu.',
        client: 'Budi Santoso',
        position: 'General Manager',
        company: 'PT Indofood Sukses'
    },
    {
        id: 2,
        text: 'Trucking service yang reliable untuk distribusi produk kami ke seluruh Indonesia. Tracking system yang real-time sangat membantu monitoring pengiriman.',
        client: 'Sarah Wijaya',
        position: 'Logistics Director',
        company: 'PT Unilever Indonesia'
    },
    {
        id: 3,
        text: 'Transfer uang ke China untuk supplier payment sangat mudah dan cepat. Rate yang kompetitif dan proses yang transparan membuat kami nyaman menggunakan layanan ini.',
        client: 'Michael Chen',
        position: 'Procurement Manager',
        company: 'PT Samsung Electronics'
    }
]
</script>
