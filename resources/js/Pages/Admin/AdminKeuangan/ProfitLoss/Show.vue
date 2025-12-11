<template>
  <AdminKeuanganLayout>
    <Head :title="period.period_name" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <Link
              :href="route('admin-keuangan.profit-loss.index')"
              class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
            >
              <ArrowLeft class="w-4 h-4 mr-2" />
              Kembali ke Laporan Laba Rugi
            </Link>
            <h1 class="text-2xl font-bold text-gray-900">{{ period.period_name }}</h1>
            <p class="mt-1 text-sm text-gray-600 flex items-center gap-2 flex-wrap">
              <span>{{ formatDate(period.start_date) }} f6 {{ formatDate(period.end_date) }}</span>
              <span
                :class="getStatusBadge(period.status)"
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              >
                {{ getStatusText(period.status) }}
              </span>
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              @click="exportPdf"
              :disabled="isExporting"
              :class="[
                'inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md transition-colors',
                isExporting
                  ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                  : 'text-white bg-red-600 hover:bg-red-700 border-red-600'
              ]"
            >
              <Download class="w-4 h-4 mr-2" />
              {{ isExporting ? 'Exporting...' : 'Export PDF' }}
            </button>
            <button
              v-if="period.status !== 'closed'"
              @click="regenerateEntries"
              :disabled="loading"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            >
              <RefreshCw class="w-4 h-4 mr-2" />
              Sinkron Data Terbaru
            </button>
            <Link
              v-if="period.status !== 'closed'"
              :href="route('admin-keuangan.profit-loss.edit', period.id)"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            >
              <Edit class="w-4 h-4 mr-2" />
              Edit Periode
            </Link>
            <button
              v-if="period.status !== 'closed'"
              @click="finalizePeriod"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              <CheckCircle class="w-4 h-4 mr-2" />
              Tutup Periode
            </button>
          </div>
        </div>

        <!-- Summary cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="card in summaryCards" :key="card.title" class="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">{{ card.title }}</div>
            <div :class="card.tone" class="mt-2 text-lg font-bold">{{ formatCurrency(card.value) }}</div>
            <div v-if="card.subtitle" class="text-xs text-gray-500 mt-1">{{ card.subtitle }}</div>
          </div>
        </div>

        <!-- Structured sections -->
        <div class="space-y-6">
          <SectionCard title="PENDAPATAN" :total="reportData.revenues.total" tone="text-green-700">
            <CategoryBlock v-if="revenuesMain.length" title="Pendapatan Utama" :items="revenuesMain" />

            <CategoryBlock
              v-if="otherIncome.bunga_mandiri.total > 0"
              title="Pendapatan Lain-lain - Bunga Bank Mandiri"
              :items="otherIncome.bunga_mandiri.entries"
            />
            <CategoryBlock
              v-if="otherIncome.bunga_bca.total > 0"
              title="Pendapatan Lain-lain - Bunga Bank BCA"
              :items="otherIncome.bunga_bca.entries"
            />
            <CategoryBlock
              v-if="otherIncome.lainnya.total > 0"
              title="Pendapatan Lain-lain - Lainnya"
              :items="otherIncome.lainnya.entries"
            />
          </SectionCard>

          <SectionCard title="BEBAN" :total="expensesTotal" tone="text-red-700">
            <CategoryBlock v-if="expensesSalary.length" title="Beban Gaji" :items="expensesSalary" />
            <div v-if="operationalGrouped.length" class="space-y-4">
              <div class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Beban Operasional</div>
              <CategoryBlock
                v-for="cat in operationalGrouped"
                :key="cat.category_name"
                :title="cat.category_name"
                :items="cat.entries"
              />
            </div>
            <CategoryBlock v-if="expensesAdmin.length" title="Beban Administrasi" :items="expensesAdmin" />
            <CategoryBlock v-if="expensesOther.length" title="Beban Lain-lain" :items="expensesOther" />
          </SectionCard>

          <SectionCard
            v-if="reportData.net_profit !== undefined"
            title="LABA / RUGI BERSIH"
            :total="reportData.net_profit"
            :tone="reportData.net_profit >= 0 ? 'text-green-700' : 'text-red-700'"
          />
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { ArrowLeft, CheckCircle, ChevronDown, Download, Edit, RefreshCw } from 'lucide-vue-next'
import { computed, ref, defineComponent, h } from 'vue'

const props = defineProps({
  period: Object,
  reportData: Object,
})

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(value) || 0)
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
const getStatusText = (status) => (status === 'closed' ? 'Final' : 'Draft')
const getStatusBadge = (status) => (status === 'closed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')

const summaryCards = computed(() => [
  { title: 'Total Pendapatan', value: props.reportData?.revenues?.total || 0, tone: 'text-green-700' },
  { title: 'Total Beban', value: props.reportData?.expenses?.total || 0, tone: 'text-red-700' },
  { title: 'Laba/Rugi Bersih', value: props.reportData?.net_profit || 0, tone: props.reportData?.net_profit >= 0 ? 'text-green-700' : 'text-red-700' },
  { title: 'Status', value: '', tone: 'text-gray-500', subtitle: getStatusText(props.period.status) },
])

const revenuesMain = computed(() => props.reportData?.revenues?.main || [])
const otherIncome = computed(() => {
  const oi = props.reportData?.revenues?.other_income_breakdown || {}
  return {
    bunga_mandiri: oi.bunga_mandiri || { total: 0, entries: [] },
    bunga_bca: oi.bunga_bca || { total: 0, entries: [] },
    lainnya: oi.lainnya || { total: 0, entries: [] },
  }
})

const expensesTotal = computed(() => props.reportData?.expenses?.total || 0)
const operationalGrouped = computed(() => props.reportData?.expenses?.operational?.grouped || [])
const expensesSalary = computed(() => props.reportData?.expenses?.salary || [])
const expensesAdmin = computed(() => props.reportData?.expenses?.admin || [])
const expensesOther = computed(() => props.reportData?.expenses?.other || [])

const isExporting = ref(false)
const loading = ref(false)

const exportPdf = () => {
  if (isExporting.value) return
  isExporting.value = true
  window.location.href = route('admin-keuangan.profit-loss.export', { profitLoss: props.period.id })
  setTimeout(() => (isExporting.value = false), 1000)
}

const regenerateEntries = () => {
  if (loading.value) return
  loading.value = true
  router.post(route('admin-keuangan.profit-loss.recalculate', props.period.id), {}, {
    preserveScroll: true,
    onFinish: () => (loading.value = false),
  })
}

const finalizePeriod = () => {
  if (loading.value) return
  loading.value = true
  router.post(route('admin-keuangan.profit-loss.finalize', props.period.id), {}, {
    onFinish: () => (loading.value = false),
  })
}

const SectionCard = defineComponent({
  name: 'SectionCard',
  props: {
    title: String,
    total: {
      type: [Number, String],
      default: 0,
    },
    tone: {
      type: String,
      default: 'text-gray-900',
    },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'bg-white shadow rounded-lg overflow-hidden' }, [
        h('div', { class: 'px-4 py-3 border-b border-gray-200 flex justify-between items-center' }, [
          h('h3', { class: 'text-sm font-semibold text-gray-900' }, props.title),
          h('div', { class: `text-sm font-bold ${props.tone}` }, formatCurrency(props.total)),
        ]),
        h('div', { class: 'p-4 space-y-4' }, slots.default ? slots.default() : null),
      ])
  },
})

const CategoryBlock = defineComponent({
  name: 'CategoryBlock',
  props: {
    title: String,
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return () =>
      h('div', { class: 'space-y-2' }, [
        h('div', { class: 'text-xs font-semibold text-gray-600 uppercase tracking-wide' }, props.title),
        h('div', { class: 'border border-gray-100 rounded overflow-hidden' }, [
          h('table', { class: 'min-w-full text-sm' }, [
            h('thead', { class: 'bg-gray-50' }, [
              h('tr', [
                h('th', { class: 'px-3 py-2 text-left font-semibold text-gray-700' }, 'Keterangan'),
                h('th', { class: 'px-3 py-2 text-right font-semibold text-gray-700' }, 'Nominal'),
              ]),
            ]),
            h(
              'tbody',
              { class: 'divide-y divide-gray-100' },
              props.items.map((item) =>
                h('tr', { key: item.id }, [
                  h('td', { class: 'px-3 py-2 text-gray-900' }, item.account?.account_name || item.description || 'Item'),
                  h('td', { class: 'px-3 py-2 text-right font-semibold text-gray-900' }, formatCurrency(item.amount)),
                ])
              )
            ),
          ]),
        ]),
      ])
  },
})
</script>
