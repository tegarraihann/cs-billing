<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 class="text-2xl font-bold text-sage-800 mb-2">
              Manajemen Data Pelanggan
            </h2>
            <p class="text-sage-600">
              Kelola data pelanggan dan informasi kontak
            </p>
          </div>
          <div class="mt-4 sm:mt-0 flex space-x-2">
            <a
              :href="exportPdfUrl"
              target="_blank"
              class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              Export PDF
            </a>
            <Link
              :href="route('admin-keuangan.customers.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Data Pelanggan
            </Link>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Search Input -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2"
              >Cari Data</label
            >
            <input
              v-model="form.search"
              type="text"
              placeholder="Cari nama perusahaan, PIC, email, marketing..."
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>

          <!-- Search Button -->
          <div class="flex items-end">
            <button
              @click="search"
              class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      <!-- Customers Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800">Daftar Data Pelanggan</h3>
          <p class="text-sm text-sage-600 mt-1">
            Total: {{ customers?.total || 0 }} data
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Customer Code
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Nama Perusahaan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Jenis Usaha
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  PIC Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  PIC Email
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Marketing
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Handler
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-sage-200">
              <tr
                v-for="customer in customers.data"
                :key="customer.id"
                class="hover:bg-sage-50 transition-colors"
              >
                <!-- Customer Code -->
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ customer.customer_code || '-' }}
                </td>

                <!-- Company Name -->
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ customer.company_name }}
                </td>

                <!-- Company Type -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.company_type }}
                </td>

                <!-- PIC Name -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.pic_name }}
                </td>

                <!-- PIC Email -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.pic_email }}
                </td>

                <!-- Marketing -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.marketing_name || '-' }}
                </td>

                <!-- Handler -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.handler?.name || '-' }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <Link
                      :href="route('admin-keuangan.customers.show', customer.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors"
                      title="Lihat Detail"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <Link
                      :href="route('admin-keuangan.customers.edit', customer.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <a
                      :href="`/admin-keuangan/customers/${customer.id}/pdf`"
                      class="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                      title="Cetak PDF"
                      target="_blank"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </a>
                    <button
                      @click="deleteCustomer(customer)"
                      class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors"
                      title="Hapus"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="!customers.data || customers.data.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg
                      class="w-12 h-12 text-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p class="text-lg font-medium mb-2">Tidak ada data</p>
                    <p class="text-sm text-gray-400">
                      Belum ada data pelanggan yang tersedia
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="customers.last_page > 1"
          class="px-6 py-4 border-t border-sage-200"
        >
          <Pagination :data="customers" />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog
      :show="showDeleteDialog"
      type="confirm"
      title="Konfirmasi Hapus Customer"
      :message="`Apakah Anda yakin ingin menghapus customer '${customerToDelete?.company_name}'? Tindakan ini tidak dapat dibatalkan.`"
      confirm-text="Ya, Hapus"
      cancel-text="Batal"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      @close="cancelDelete"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import { reactive, watch, ref, computed } from "vue";
import { router, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import AlertDialog from "@/Components/AlertDialog.vue";

const props = defineProps({
  customers: Object,
  filters: Object,
});

// Route helper definitions
const routes = {
  'admin-keuangan.customers.export.pdf': '/admin-keuangan/customers/export/pdf',
};

// Override global route function for this component
const route = (name, params) => {
  if (routes[name]) {
    return typeof routes[name] === 'function' ? routes[name](params) : routes[name];
  }
  return window.route ? window.route(name, params) : `#${name}`;
};

// Form data
const form = reactive({
  search: props.filters?.search || "",
});

// Computed property for export PDF URL
const exportPdfUrl = computed(() => {
  const baseUrl = route('admin-keuangan.customers.export.pdf');
  const params = new URLSearchParams();
  
  if (form.search) {
    params.append('search', form.search);
  }
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
});

const search = () => {
  const params = {};
  if (form.search) params.search = form.search;

  router.get(route("admin-keuangan.customers.index"), params, {
    preserveState: true,
    replace: true,
  });
};

// Delete dialog state
const showDeleteDialog = ref(false);
const customerToDelete = ref(null);

const deleteCustomer = (customer) => {
  customerToDelete.value = customer;
  showDeleteDialog.value = true;
};

const confirmDelete = () => {
  if (customerToDelete.value) {
    router.delete(route("admin-keuangan.customers.destroy", customerToDelete.value.id), {
      onSuccess: () => {
        // Refresh the page
        router.get(route("admin-keuangan.customers.index"), {
          search: form.search,
        }, {
          preserveState: true,
          replace: true,
        });
      },
      onError: (errors) => {
        alert('Terjadi kesalahan saat menghapus customer: ' + Object.values(errors).join(', '));
      }
    });
  }
  showDeleteDialog.value = false;
  customerToDelete.value = null;
};

const cancelDelete = () => {
  showDeleteDialog.value = false;
  customerToDelete.value = null;
};

// Watch for changes in search input and trigger search after a delay
watch(
  () => form.search,
  () => {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      search();
    }, 500);
  }
);
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-600 {
  color: #8db580;
}

.text-sage-700 {
  color: #7ba169;
}

.text-sage-800 {
  color: #6b8f5e;
}

.text-sage-500 {
  color: #9fb894;
}

.bg-sage-50 {
  background-color: #f4f6f3;
}

.bg-sage-600 {
  background-color: #8db580;
}

.bg-sage-700 {
  background-color: #7ba169;
}

.border-sage-200 {
  border-color: #d4ddd0;
}

.border-sage-300 {
  border-color: #c0cdb8;
}

.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}

.hover\:text-sage-900:hover {
  color: #5a7a4f;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}

.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
  border-color: #d4ddd0;
}
</style>