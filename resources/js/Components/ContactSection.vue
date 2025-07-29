<template>
  <section id="contact" class="py-24 bg-sage-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-semibold mb-6">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          Hubungi Tim Profesional Kami
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Mari Diskusikan Kebutuhan Anda
        </h2>
        <p class="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Tim ahli kami siap membantu memberikan solusi logistik terbaik untuk bisnis Anda dengan layanan 24/7
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <!-- Contact Form -->
        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
          <h3 class="text-2xl font-bold text-white mb-6 md:mb-8">Kirim Pesan Anda</h3>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block text-sm font-semibold text-white/90 mb-3">Nama Lengkap *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-white/90 mb-3">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                  placeholder="contoh@email.com"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block text-sm font-semibold text-white/90 mb-3">Nomor Telepon *</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                  placeholder="+62 8xx xxxx xxxx"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-white/90 mb-3">Layanan yang Diminati</label>
                <select
                  v-model="form.service"
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                >
                  <option value="" class="text-gray-900">Pilih layanan</option>
                  <option value="export-import" class="text-gray-900">Export/Import</option>
                  <option value="trucking" class="text-gray-900">Trucking Inland</option>
                  <option value="money-transfer" class="text-gray-900">Transfer Uang</option>
                  <option value="insurance" class="text-gray-900">Asuransi Barang</option>
                  <option value="warehousing" class="text-gray-900">Warehousing</option>
                  <option value="consulting" class="text-gray-900">Consulting</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-white/90 mb-3">Pesan Anda *</label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm resize-none"
                placeholder="Jelaskan kebutuhan spesifik Anda..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-white text-sage-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Kirim Pesan</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sage-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </span>
            </button>
          </form>
        </div>

        <!-- Contact Information & Map -->
        <div class="space-y-8">
          <!-- Contact Info Cards -->
          <div class="grid gap-6">
            <div v-for="office in offices" :key="office.id" class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h4 class="text-lg font-bold text-white mb-4">{{ office.name }}</h4>
              <div class="space-y-3">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-white/80 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                  <span class="text-white/90 text-sm leading-relaxed">{{ office.address }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-white/80 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span class="text-white font-medium text-sm">{{ office.phone }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-white/80 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span class="text-white font-medium text-sm break-all">{{ office.email }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Why Choose Us -->
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h4 class="text-xl font-bold text-white mb-6">Mengapa Memilih Kami?</h4>
            <div class="space-y-4">
              <div v-for="reason in whyChooseUs" :key="reason.title" class="flex items-start group">
                <div class="w-2 h-2 bg-white rounded-full mt-2 mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h5 class="font-semibold text-white text-sm mb-1">{{ reason.title }}</h5>
                  <p class="text-white/80 text-xs leading-relaxed">{{ reason.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Reset form after successful submission
    Object.keys(form).forEach(key => form[key] = '')

    // You can add success notification here
    alert('Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.')

  } catch (error) {
    // Handle error
    alert('Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

const offices = [
  {
    id: 1,
    name: 'Kantor Pusat Jakarta',
    address: 'Ruko Aerohub, Citra 8, C7-10, Jakarta, Indonesia 11830',
    phone: '+62 21 2555-5555',
    email: 'ewilog@example.com'
  },
//   {
//     id: 2,
//     name: 'Cabang Surabaya',
//     address: 'Jl. Raya Darmo 68-70, Darmo, Surabaya 60264',
//     phone: '+62 31 8765-4321',
//     email: 'surabaya@eshakawijaya.com'
//   },
//   {
//     id: 3,
//     name: 'Cabang Medan',
//     address: 'Jl. Asia Baru No. 88, Sei Agul, Medan 20214',
//     phone: '+62 61 4567-8901',
//     email: 'medan@eshakawijaya.com'
//   }
]

const whyChooseUs = [
  {
    title: 'Pengalaman Terpercaya',
    description: '15+ tahun melayani ekspor-impor dengan track record sempurna dan kepuasan klien tinggi'
  },
  {
    title: 'Jaringan Global',
    description: 'Kemitraan dengan 50+ negara dan akses ke semua pelabuhan utama dunia'
  },
  {
    title: 'Teknologi Modern',
    description: 'Sistem tracking real-time dan digitalisasi proses untuk transparansi maksimal'
  },
  {
    title: 'Tim Profesional',
    description: 'Didukung experts bersertifikat dengan responsiveness 24/7 untuk kepuasan Anda'
  },
  {
    title: 'Harga Kompetitif',
    description: 'Penawaran terbaik dengan kualitas premium tanpa kompromi pada service excellence'
  }
]
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-500 { color: #8DB580; }
.bg-sage-500 { background-color: #8DB580; }
.placeholder-white\/60::placeholder { color: rgba(255, 255, 255, 0.6); }

/* Additional responsive utilities */
@media (max-width: 768px) {
  .break-all {
    word-break: break-all;
  }
}
</style>
