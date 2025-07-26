<template>
  <section id="contact" class="py-24 bg-gradient-to-br from-sage-600 via-sage-700 to-gray-700">
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
        <p class="text-xl text-sage-100 max-w-3xl mx-auto leading-relaxed">
          Tim ahli kami siap membantu memberikan solusi logistik terbaik untuk bisnis Anda dengan layanan 24/7
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Contact Form -->
        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 class="text-2xl font-bold text-white mb-8">Kirim Pesan Anda</h3>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-sage-100 mb-3">Nama Lengkap *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-sage-100 mb-3">Email Address *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="email@perusahaan.com"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-sage-100 mb-3">Nama Perusahaan</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="PT. Nama Perusahaan"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-sage-100 mb-3">Layanan yang Diminati</label>
                <select
                  v-model="form.service"
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="" class="text-gray-900">Pilih Layanan</option>
                  <option value="export-import" class="text-gray-900">Export & Import</option>
                  <option value="trucking" class="text-gray-900">Trucking Inland</option>
                  <option value="money-transfer" class="text-gray-900">Transfer Uang Internasional</option>
                  <option value="insurance" class="text-gray-900">Asuransi Barang Kiriman</option>
                  <option value="consultation" class="text-gray-900">Konsultasi Umum</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-sage-100 mb-3">Pesan & Kebutuhan *</label>
              <textarea
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder="Jelaskan kebutuhan logistik Anda secara detail..."
              ></textarea>
            </div>

            <!-- Submit Options -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                :disabled="!isFormValid"
                class="flex-1 bg-white text-sage-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-sage-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Kirim via Email
              </button>

              <button
                type="button"
                @click="sendViaWhatsApp"
                :disabled="!isFormValid || whatsAppLoading"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                <svg v-if="whatsAppLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                Kirim via WhatsApp
              </button>
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Quick Contact Methods -->
          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-8">Kontak Langsung</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                v-for="contact in quickContacts"
                :key="contact.id"
                @click="handleQuickContact(contact)"
                class="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group text-left w-full"
              >
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                     :class="contact.bgColor">
                  <div v-html="contact.icon" class="w-7 h-7 text-white"></div>
                </div>
                <div>
                  <div class="text-white font-bold text-lg">{{ contact.name }}</div>
                  <div class="text-sage-100 text-sm">{{ contact.role }}</div>
                  <div class="text-sage-200 text-xs">{{ contact.description }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Office Locations -->
          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-8">Kantor Kami</h3>

            <div class="space-y-6">
              <div
                v-for="office in offices"
                :key="office.id"
                class="flex items-start space-x-4 p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">{{ office.name }}</h4>
                  <p class="text-sage-100 text-sm mb-3 leading-relaxed">{{ office.address }}</p>
                  <div class="flex flex-col sm:flex-row gap-4 text-sm">
                    <a :href="`tel:${office.phone}`" class="text-sage-200 hover:text-white transition-colors flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      {{ office.phone }}
                    </a>
                    <a :href="`mailto:${office.email}`" class="text-sage-200 hover:text-white transition-colors flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      {{ office.email }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Why Choose Us -->
          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-8">Mengapa Pilih Eshaka Wijaya Logistics?</h3>

            <div class="space-y-6">
              <div
                v-for="feature in whyChooseUs"
                :key="feature.title"
                class="flex items-start space-x-4"
              >
                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-white font-bold text-lg mb-1">{{ feature.title }}</h4>
                  <p class="text-sage-100 text-sm leading-relaxed">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="mt-20 bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
        <h3 class="text-2xl font-bold text-white mb-8 text-center">Lokasi Kantor Pusat</h3>
        <div class="bg-white/20 rounded-2xl h-64 flex items-center justify-center backdrop-blur-sm">
          <div class="text-center">
            <svg class="w-16 h-16 text-white/60 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
            <p class="text-white/80 text-lg mb-4">Peta Interaktif Kantor Pusat</p>
            <button
              @click="openGoogleMaps"
              class="bg-white text-sage-700 px-6 py-3 rounded-xl font-semibold hover:bg-sage-50 transition-colors duration-300"
            >
              Lihat di Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const whatsAppLoading = ref(false)

const form = ref({
  name: '',
  email: '',
  company: '',
  service: '',
  message: ''
})

const isFormValid = computed(() => {
  return form.value.name && form.value.email && form.value.message
})

// WhatsApp Integration Functions (Built-in)
const companyWhatsApp = {
  main: '6285226204424',  // Ganti dengan nomor WA perusahaan
  cs: '6285226204424',
  finance: '6281234567892',
  sales: '6281234567893'
}

const openWhatsApp = (type = 'main', message = '') => {
  const phoneNumber = companyWhatsApp[type] || companyWhatsApp.main
  const encodedMessage = encodeURIComponent(message || 'Halo, saya tertarik dengan layanan Eshaka Wijaya Logistics. Bisakah Anda membantu saya?')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}

const submitForm = () => {
  if (isFormValid.value) {
    // Handle email submission
    console.log('Form submitted:', form.value)
    alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.')

    // Reset form after submission
    form.value = { name: '', email: '', company: '', service: '', message: '' }
  }
}

const sendViaWhatsApp = () => {
  if (isFormValid.value) {
    whatsAppLoading.value = true

    const message = `
Halo, saya ingin menghubungi Eshaka Wijaya Logistics:

Nama: ${form.value.name}
Email: ${form.value.email}
Perusahaan: ${form.value.company || 'Tidak disebutkan'}
Layanan: ${form.value.service || 'Konsultasi umum'}

Pesan:
${form.value.message}

Terima kasih!
    `.trim()

    setTimeout(() => {
      openWhatsApp('cs', message)
      whatsAppLoading.value = false

      // Reset form after sending
      form.value = { name: '', email: '', company: '', service: '', message: '' }
    }, 500)
  }
}

const handleQuickContact = (contact) => {
  openWhatsApp(contact.type)
}

const openGoogleMaps = () => {
  const address = 'Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan'
  const encodedAddress = encodeURIComponent(address)
  window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank')
}

const quickContacts = [
  {
    id: 1,
    name: 'Customer Service',
    role: 'Bantuan Umum',
    description: 'Konsultasi & informasi layanan',
    type: 'cs',
    bgColor: 'bg-white/20',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/></svg>'
  },
  {
    id: 2,
    name: 'Sales Team',
    role: 'Penawaran & Quotation',
    description: 'Diskusi harga & paket layanan',
    type: 'sales',
    bgColor: 'bg-white/20',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>'
  },
  {
    id: 3,
    name: 'Technical Support',
    role: 'Dukungan Teknis',
    description: 'Bantuan tracking & dokumentasi',
    type: 'cs',
    bgColor: 'bg-white/20',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
  },
  {
    id: 4,
    name: 'Emergency Line',
    role: 'Layanan Darurat',
    description: 'Support 24/7 untuk urgent case',
    type: 'main',
    bgColor: 'bg-red-500/80',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>'
  }
]

const offices = [
  {
    id: 1,
    name: 'Kantor Pusat Jakarta',
    address: 'Jl. Jend. Sudirman Kav. 52-53, Senayan, Jakarta Selatan 12190',
    phone: '+62 21 2555-0123',
    email: 'jakarta@eshakawijaya.com'
  },
  {
    id: 2,
    name: 'Cabang Surabaya',
    address: 'Jl. Raya Darmo 68-70, Darmo, Surabaya 60264',
    phone: '+62 31 8765-4321',
    email: 'surabaya@eshakawijaya.com'
  },
  {
    id: 3,
    name: 'Cabang Medan',
    address: 'Jl. Asia Baru No. 88, Sei Agul, Medan 20214',
    phone: '+62 61 4567-8901',
    email: 'medan@eshakawijaya.com'
  }
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
.text-sage-100 { color: #F4F6F3; }
.text-sage-200 { color: #E8ECE5; }
.text-sage-600 { color: #8DB580; }
.text-sage-700 { color: #7BA169; }
.bg-sage-50 { background-color: #F4F6F3; }
.bg-sage-600 { background-color: #8DB580; }
.bg-sage-700 { background-color: #7BA169; }
.placeholder-sage-200::placeholder { color: #E8ECE5; }
.from-sage-600 { --tw-gradient-from: #8DB580; }
.via-sage-700 { --tw-gradient-stops: var(--tw-gradient-from), #7BA169, var(--tw-gradient-to, rgba(123, 161, 105, 0)); }
</style>
