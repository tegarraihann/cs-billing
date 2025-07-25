<template>
  <section id="contact" class="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">
          Hubungi Kami
        </h2>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          Tim profesional kami siap membantu kebutuhan logistik Anda 24/7
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 class="text-2xl font-bold text-white mb-6">Kirim Pesan</h3>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-blue-100 mb-2">Nama Lengkap</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-blue-100 mb-2">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-blue-100 mb-2">Perusahaan</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Nama perusahaan"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-blue-100 mb-2">Layanan</label>
                <select
                  v-model="form.service"
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="" class="text-gray-900">Pilih Layanan</option>
                  <option value="export-import" class="text-gray-900">Export & Import</option>
                  <option value="trucking" class="text-gray-900">Trucking Inland</option>
                  <option value="money-transfer" class="text-gray-900">Transfer Uang</option>
                  <option value="insurance" class="text-gray-900">Asuransi Barang</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-blue-100 mb-2">Pesan</label>
              <textarea
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Jelaskan kebutuhan Anda..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-8">
          <!-- Office Locations -->
          <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 class="text-2xl font-bold text-white mb-6">Kantor Kami</h3>

            <div class="space-y-6">
              <div
                v-for="office in offices"
                :key="office.id"
                class="flex items-start space-x-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-white mb-1">{{ office.name }}</h4>
                  <p class="text-blue-100 text-sm mb-2">{{ office.address }}</p>
                  <div class="flex flex-wrap gap-4 text-sm">
                    <span class="text-blue-200">{{ office.phone }}</span>
                    <span class="text-blue-200">{{ office.email }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Methods -->
          <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 class="text-2xl font-bold text-white mb-6">Kontak Langsung</h3>

            <div class="grid grid-cols-2 gap-4">
              <a
                v-for="contact in directContacts"
                :key="contact.id"
                :href="contact.link"
                target="_blank"
                class="flex items-center space-x-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                     :class="contact.bgColor">
                  <div v-html="contact.icon" class="w-5 h-5 text-white"></div>
                </div>
                <div>
                  <div class="text-white font-medium text-sm">{{ contact.name }}</div>
                  <div class="text-blue-200 text-xs">{{ contact.role }}</div>
                </div>
              </a>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 class="text-2xl font-bold text-white mb-6">Mengapa Pilih Kami?</h3>

            <div class="space-y-4">
              <div
                v-for="feature in quickFeatures"
                :key="feature.title"
                class="flex items-center space-x-3"
              >
                <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-white font-medium">{{ feature.title }}</div>
                  <div class="text-blue-200 text-sm">{{ feature.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <h3 class="text-2xl font-bold text-white mb-6 text-center">Lokasi Kantor Pusat</h3>
        <div class="bg-gray-300 rounded-2xl h-64 flex items-center justify-center">
          <p class="text-gray-600 text-lg">Google Maps Integration</p>
          <span class="text-sm text-gray-500 ml-2">(Implementasi dengan Google Maps API)</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  company: '',
  service: '',
  message: ''
})

const offices = [
  {
    id: 1,
    name: 'Kantor Pusat Jakarta',
    address: 'Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190',
    phone: '+62 21 2555-0123',
    email: 'jakarta@companyname.com'
  },
  {
    id: 2,
    name: 'Cabang Surabaya',
    address: 'Jl. Raya Darmo 68-70, Surabaya 60264',
    phone: '+62 31 8765-4321',
    email: 'surabaya@companyname.com'
  },
  {
    id: 3,
    name: 'Cabang Medan',
    address: 'Jl. Asia Baru No. 88, Medan 20214',
    phone: '+62 61 4567-8901',
    email: 'medan@companyname.com'
  }
]
</script>
