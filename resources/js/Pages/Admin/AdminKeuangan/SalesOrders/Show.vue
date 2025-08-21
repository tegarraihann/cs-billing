<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-blue-800">
                Sales Order: {{ salesOrder.order_number }}
              </h2>
              <p class="text-blue-600">
                Review dan kelola sales order dari CS
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0 flex space-x-3">
            <button
              v-if="salesOrder.status === 'released'"
              @click="approveSalesOrder"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Setujui
            </button>
            <button
              v-if="salesOrder.status === 'released'"
              @click="showRejectModal = true"
              class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Tolak
            </button>
            <Link
              :href="route('admin-keuangan.sales-orders.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- SO Information -->
          <div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-200 bg-blue-50">
              <h3 class="text-lg font-semibold text-blue-800">Informasi Sales Order</h3>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ORDER NUMB</label>
                <p class="text-gray-900 font-semibold">{{ salesOrder.order_number }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CUSTOMER</label>
                <p class="text-gray-900">{{ salesOrder.customer }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SHIPPER</label>
                <p class="text-gray-900">{{ salesOrder.shipper || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">BL/AWB</label>
                <p class="text-gray-900">{{ salesOrder.bl_awb || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">LINER</label>
                <p class="text-gray-900">{{ salesOrder.liner || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">VESSEL</label>
                <p class="text-gray-900">{{ salesOrder.vessel || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ETA</label>
                <p class="text-gray-900">{{ salesOrder.eta ? formatDate(salesOrder.eta) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">AJU</label>
                <p class="text-gray-900">{{ salesOrder.aju || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SPPB DATE</label>
                <p class="text-gray-900">{{ salesOrder.sppb_date ? formatDate(salesOrder.sppb_date) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SHIPMENT TYPE</label>
                <p class="text-gray-900">{{ salesOrder.shipment_type || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">POL</label>
                <p class="text-gray-900">{{ salesOrder.pol || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">POD</label>
                <p class="text-gray-900">{{ salesOrder.pod || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GUDANG/UTC</label>
                <p class="text-gray-900">{{ salesOrder.gudang_utc || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">PARTY/LCL</label>
                <p class="text-gray-900">{{ salesOrder.party_lcl || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">PREPARED BY</label>
                <p class="text-gray-900">{{ salesOrder.prepared_by || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">EXCHANGE RATE</label>
                <p class="text-gray-900">{{ salesOrder.exchange_rate || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">JENIS BIAYA</label>
                <p class="text-gray-900">{{ salesOrder.jenis_biaya || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">BUYING</label>
                <p class="text-gray-900">{{ salesOrder.buying ? formatCurrency(salesOrder.buying) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SELLING</label>
                <p class="text-gray-900">{{ salesOrder.selling ? formatCurrency(salesOrder.selling) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">REVENUE</label>
                <p class="text-gray-900 font-semibold text-lg">{{ salesOrder.revenue ? formatCurrency(salesOrder.revenue) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">REMARKS</label>
                <p class="text-gray-900">{{ salesOrder.remarks || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GOODS</label>
                <p class="text-gray-900">{{ salesOrder.goods || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CONTAINER NO</label>
                <p class="text-gray-900">{{ salesOrder.container_no || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">INVOICE NUMB</label>
                <p class="text-gray-900">{{ salesOrder.invoice_number || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">INVOICE DATE</label>
                <p class="text-gray-900">{{ salesOrder.invoice_date ? formatDate(salesOrder.invoice_date) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">T.O.P</label>
                <p class="text-gray-900">{{ salesOrder.top || '-' }}</p>
              </div>
              
              <!-- New fields -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">COMMODITY</label>
                <p class="text-gray-900">{{ salesOrder.commodity || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">QTY</label>
                <p class="text-gray-900">{{ salesOrder.qty || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">NET WEIGHT</label>
                <p class="text-gray-900">{{ salesOrder.net_weight || '-' }} KG</p>
              </div>
            </div>
          </div>

          <!-- Voucher Management Section -->
          <div v-if="salesOrder.vouchers && salesOrder.vouchers.length > 0" 
               class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-200 bg-blue-50">
              <h3 class="text-lg font-semibold text-blue-800">Voucher Management</h3>
            </div>
            <div class="p-6">
              <div v-for="voucher in salesOrder.vouchers" :key="voucher.id" 
                   class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-semibold text-gray-900 flex items-center">
                      <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2"
                            :class="getVoucherTypeColor(voucher.type)">
                        {{ voucher.type === 'payment' ? 'Payment' : 'Receipt' }}
                      </span>
                      {{ voucher.voucher_no }}
                    </h4>
                    <p class="text-sm text-gray-600">{{ voucher.description }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">{{ formatCurrency(voucher.amount) }}</p>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          :class="getVoucherStatusColor(voucher.status)">
                      {{ getVoucherStatusLabel(voucher.status) }}
                    </span>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">Date:</span>
                    <span class="ml-1 text-gray-900">{{ formatDate(voucher.date) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Prepared by:</span>
                    <span class="ml-1 text-gray-900">{{ voucher.prepared_by || '-' }}</span>
                  </div>
                </div>

                <!-- Action buttons for vouchers -->
                <div v-if="voucher.status === 'released'" class="mt-3 flex space-x-2">
                  <button
                    @click="approveVoucher(voucher)"
                    class="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                  <button
                    @click="showVoucherRejectModalFn(voucher)"
                    class="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Status -->
          <div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-200 bg-blue-50">
              <h3 class="text-lg font-semibold text-blue-800">Status</h3>
            </div>
            <div class="p-6">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"
                :class="getStatusColor(salesOrder.status)"
              >
                {{ getStatusLabel(salesOrder.status || 'released') }}
              </span>
            </div>
          </div>

          <!-- Release Information -->
          <div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-200 bg-blue-50">
              <h3 class="text-lg font-semibold text-blue-800">Informasi Rilis</h3>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Dirilis Oleh</label>
                <p class="text-gray-900">{{ salesOrder.released_by?.name || 'Unknown' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
                <p class="text-gray-900">{{ formatDateTime(salesOrder.released_at) }}</p>
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-200 bg-blue-50">
              <h3 class="text-lg font-semibold text-blue-800">System Information</h3>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                <p class="text-gray-900">{{ salesOrder.creator?.name || 'Unknown' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <p class="text-gray-900">{{ formatDateTime(salesOrder.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold mb-4">Tolak Sales Order</h3>
        <p class="text-gray-600 mb-4">Berikan alasan penolakan:</p>
        <textarea
          v-model="rejectionReason"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          rows="4"
          placeholder="Masukkan alasan penolakan..."
        ></textarea>
        <div class="flex justify-end space-x-3 mt-4">
          <button
            @click="showRejectModal = false"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            @click="rejectSalesOrder"
            :disabled="!rejectionReason.trim()"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tolak
          </button>
        </div>
      </div>
    </div>

    <!-- Voucher Reject Modal -->
    <div v-if="showVoucherRejectModal && selectedVoucher" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold mb-4">Tolak Voucher</h3>
        <p class="text-gray-600 mb-2">Voucher: <strong>{{ selectedVoucher.voucher_no }}</strong></p>
        <p class="text-gray-600 mb-4">Berikan alasan penolakan:</p>
        <textarea
          v-model="voucherRejectionReason"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          rows="4"
          placeholder="Masukkan alasan penolakan voucher..."
        ></textarea>
        <div class="flex justify-end space-x-3 mt-4">
          <button
            @click="closeVoucherRejectModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            @click="rejectVoucher"
            :disabled="!voucherRejectionReason.trim()"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tolak Voucher
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from 'vue';
import { router, Link } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';

const props = defineProps({
  salesOrder: Object,
});

const showRejectModal = ref(false);
const rejectionReason = ref('');
const showVoucherRejectModal = ref(false);
const voucherRejectionReason = ref('');
const selectedVoucher = ref(null);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID');
};

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('id-ID');
};

const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusLabel = (status) => {
  const labels = {
    released: 'Dirilis',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  };
  return labels[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    released: 'bg-purple-100 text-purple-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const approveSalesOrder = () => {
  if (confirm('Apakah Anda yakin ingin menyetujui sales order ini?')) {
    router.post(route('admin-keuangan.sales-orders.approve', props.salesOrder.id), {}, {
      onSuccess: () => {
        router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
          preserveState: false,
          replace: true,
        });
      },
      onError: (errors) => {
        alert('Terjadi kesalahan: ' + Object.values(errors).join(', '));
      }
    });
  }
};

const rejectSalesOrder = () => {
  if (!rejectionReason.value.trim()) {
    alert('Alasan penolakan harus diisi');
    return;
  }

  router.post(route('admin-keuangan.sales-orders.reject', props.salesOrder.id), {
    rejection_reason: rejectionReason.value
  }, {
    onSuccess: () => {
      showRejectModal.value = false;
      rejectionReason.value = '';
      router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
        preserveState: false,
        replace: true,
      });
    },
    onError: (errors) => {
      alert('Terjadi kesalahan: ' + Object.values(errors).join(', '));
    }
  });
};

const getVoucherTypeColor = (type) => {
  const colors = {
    payment: 'bg-blue-100 text-blue-800',
    receipt: 'bg-green-100 text-green-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

const getVoucherStatusLabel = (status) => {
  const labels = {
    draft: 'Draft',
    released: 'Released',
    approved: 'Approved',
    rejected: 'Rejected'
  };
  return labels[status] || status;
};

const getVoucherStatusColor = (status) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    released: 'bg-purple-100 text-purple-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const approveVoucher = (voucher) => {
  if (confirm(`Apakah Anda yakin ingin menyetujui voucher ${voucher.voucher_no}?`)) {
    router.post(route('admin-keuangan.sales-orders.vouchers.approve', [props.salesOrder.id, voucher.id]), {}, {
      onSuccess: () => {
        router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
          preserveState: false,
          replace: true,
        });
      },
      onError: (errors) => {
        alert('Terjadi kesalahan: ' + Object.values(errors).join(', '));
      }
    });
  }
};

const showVoucherRejectModalFn = (voucher) => {
  selectedVoucher.value = voucher;
  showVoucherRejectModal.value = true;
  voucherRejectionReason.value = '';
};

const closeVoucherRejectModal = () => {
  showVoucherRejectModal.value = false;
  selectedVoucher.value = null;
  voucherRejectionReason.value = '';
};

const rejectVoucher = () => {
  if (!voucherRejectionReason.value.trim()) {
    alert('Alasan penolakan harus diisi');
    return;
  }

  router.post(route('admin-keuangan.sales-orders.vouchers.reject', [props.salesOrder.id, selectedVoucher.value.id]), {
    rejection_reason: voucherRejectionReason.value
  }, {
    onSuccess: () => {
      closeVoucherRejectModal();
      router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
        preserveState: false,
        replace: true,
      });
    },
    onError: (errors) => {
      alert('Terjadi kesalahan: ' + Object.values(errors).join(', '));
    }
  });
};
</script>

<style scoped>
.text-blue-600 {
  color: #2563eb;
}
.text-blue-700 {
  color: #1d4ed8;
}
.text-blue-800 {
  color: #1e40af;
}
.bg-blue-50 {
  background-color: #eff6ff;
}
.bg-blue-600 {
  background-color: #2563eb;
}
.bg-blue-700 {
  background-color: #1d4ed8;
}
.border-blue-200 {
  border-color: #bfdbfe;
}
.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}
</style>