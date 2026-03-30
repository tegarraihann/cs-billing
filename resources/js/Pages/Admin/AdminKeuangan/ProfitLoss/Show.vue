<template>
  <AdminKeuanganLayout>
    <Head :title="period.period_name" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <Link
              :href="route('admin-keuangan.profit-loss.index', returnQuery)"
              class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
            >
              <ArrowLeft class="w-4 h-4 mr-2" />
              Back to Income Statements
            </Link>
            <h1 class="text-2xl font-bold text-gray-900">{{ period.period_name }}</h1>
            <p class="mt-1 text-sm text-gray-600 flex items-center gap-2 flex-wrap">
              <span>{{ formatDate(period.start_date) }} - {{ formatDate(period.end_date) }}</span>
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
              v-if="period.status !== 'closed'"
              @click="openAdjustmentModal"
              class="inline-flex items-center px-3 py-2 border border-sage-600 text-sm leading-4 font-medium rounded-md text-white bg-sage-700 hover:bg-sage-900"
            >
              <PlusCircle class="w-4 h-4 mr-2" />
              Add Adjustment
            </button>
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
              Sync Latest Data
            </button>
            <Link
              v-if="period.status !== 'closed'"
              :href="route('admin-keuangan.profit-loss.edit', {
                profitLoss: period.id,
                ...returnQuery
              })"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            >
              <Edit class="w-4 h-4 mr-2" />
              Edit Period
            </Link>
            <button
              v-if="period.status !== 'closed'"
              @click="finalizePeriod"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              <CheckCircle class="w-4 h-4 mr-2" />
              Close Period
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
          <SectionCard title="REVENUE" :total="reportData.revenues.total" tone="text-green-700">
            <CollapsibleSummaryRow
              v-if="totalRevenuesMain > 0"
              title="Main Revenue"
              :amount="totalRevenuesMain"
              :entries="revenuesMain"
            />
            <CollapsibleSummaryRow
              v-if="otherIncome.bunga_mandiri.total > 0"
              title="Other Income - Mandiri Bank Interest"
              :amount="otherIncome.bunga_mandiri.total"
              :entries="otherIncome.bunga_mandiri.entries"
            />
            <CollapsibleSummaryRow
              v-if="otherIncome.bunga_bca.total > 0"
              title="Other Income - BCA Bank Interest"
              :amount="otherIncome.bunga_bca.total"
              :entries="otherIncome.bunga_bca.entries"
            />
            <CollapsibleSummaryRow
              v-if="otherIncome.lainnya.total > 0"
              title="Other Income - Other"
              :amount="otherIncome.lainnya.total"
              :entries="otherIncome.lainnya.entries"
            />
          </SectionCard>

          <SectionCard title="EXPENSES" :total="expensesTotal" tone="text-red-700">
            <CollapsibleSummaryRow
              v-if="totalExpensesSalary > 0"
              title="Salary Expense"
              :amount="totalExpensesSalary"
              :entries="expensesSalary"
            />
            <div v-if="operationalGrouped.length" class="space-y-2">
              <div class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Operational Expenses</div>
              <div class="space-y-1">
                <CollapsibleSummaryRow
                  v-for="cat in operationalGrouped"
                  :key="cat.category_name"
                  :title="cat.category_name"
                  :amount="cat.total"
                  :entries="cat.entries"
                />
              </div>
            </div>
            <CollapsibleSummaryRow v-if="totalExpensesAdmin > 0" title="Administrative Expenses" :amount="totalExpensesAdmin" :entries="expensesAdmin" />
            <CollapsibleSummaryRow v-if="totalExpensesConsumption > 0" title="Consumption Expense" :amount="totalExpensesConsumption" :entries="expensesConsumption" />
            <CollapsibleSummaryRow v-if="totalExpensesOutside > 0" title="Outside Assignments Expense" :amount="totalExpensesOutside" :entries="expensesOutside" />
            <CollapsibleSummaryRow v-if="totalExpensesPrepaid > 0" title="Prepaid Rent Expense" :amount="totalExpensesPrepaid" :entries="expensesPrepaid" />
            <CollapsibleSummaryRow v-if="totalExpensesTax > 0" title="Tax Expenses" :amount="totalExpensesTax" :entries="expensesTax" />
            <CollapsibleSummaryRow v-if="totalExpensesOther > 0" title="Other Expenses" :amount="totalExpensesOther" :entries="expensesOther" />
          </SectionCard>

          <SectionCard
            v-if="reportData.net_profit !== undefined"
            title="NET PROFIT / LOSS"
            :total="reportData.net_profit"
            :tone="reportData.net_profit >= 0 ? 'text-green-700' : 'text-red-700'"
          />
        </div>
      </div>
    </div>

    <!-- Adjustment Modal -->
    <div
      v-if="showAdjustmentModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-xl max-h-[90vh] flex flex-col">
        <div class="px-6 pt-6 text-lg font-semibold text-gray-900">Add Income Statement Adjustment</div>
        <div class="px-6 py-4 grid grid-cols-1 gap-4 overflow-y-auto flex-1">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Account</label>
            <SearchableSelect
              v-model="adjustmentForm.account_id"
              :options="accountOptions"
              label-field="label"
              sub-label-field="subLabel"
              value-field="value"
              :search-fields="['label', 'subLabel']"
              placeholder="Select Account"
              input-class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input v-model="adjustmentForm.amount" type="number" min="0" step="0.01" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input v-model="adjustmentForm.description" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Transaction Date</label>
            <input v-model="adjustmentForm.transaction_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bank (Optional)</label>
            <SearchableSelect
              v-model="adjustmentForm.bank_account_id"
              :options="bankOptions"
              label-field="label"
              sub-label-field="subLabel"
              value-field="value"
              :search-fields="['label', 'subLabel']"
              placeholder="Select Bank"
              input-class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
          </div>
          <div v-if="adjustmentForm.bank_account_id">
            <label class="block text-sm font-medium text-gray-700 mb-1">Bank Transaction Type</label>
            <select v-model="adjustmentForm.bank_transaction_type" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500">
              <option value="">Select Type</option>
              <option value="credit">Credit (In)</option>
              <option value="debit">Debit (Out)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea v-model="adjustmentForm.notes" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"></textarea>
          </div>
        </div>
        <div class="px-6 pb-6 pt-3 border-t border-gray-100 flex justify-end gap-2">
          <button @click="closeAdjustmentModal" class="px-4 py-2 text-sm border rounded-md">Cancel</button>
          <button @click="submitAdjustment" class="px-4 py-2 text-sm bg-sage-600 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>

    <AlertDialog
      :show="alertDialog.show"
      :type="alertDialog.type"
      :message="alertDialog.message"
      @close="alertDialog.show = false"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { ArrowLeft, CheckCircle, ChevronDown, Download, Edit, RefreshCw, PlusCircle } from 'lucide-vue-next'
import { computed, ref, defineComponent, h } from 'vue'
import SearchableSelect from '@/Components/SearchableSelect.vue'
import AlertDialog from '@/Components/AlertDialog.vue'

const props = defineProps({
  period: Object,
  reportData: Object,
  accounts: Object,
  bankAccounts: Array,
  returnQuery: {
    type: Object,
    default: () => ({}),
  },
})

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(value) || 0)
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
const getStatusText = (status) => (status === 'closed' ? 'Final' : 'Draft')
const getStatusBadge = (status) => (status === 'closed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')

const summaryCards = computed(() => [
  { title: 'Total Revenue', value: props.reportData?.revenues?.total || 0, tone: 'text-green-700' },
  { title: 'Total Expenses', value: props.reportData?.expenses?.total || 0, tone: 'text-red-700' },
  {
    title: 'Total Shipment Profit',
    value: props.reportData?.shipment_profit?.total_profit || 0,
    tone: props.reportData?.shipment_profit?.total_profit >= 0 ? 'text-green-700' : 'text-red-700',
    subtitle: props.reportData?.shipment_profit?.shipment_count
      ? `Shipments: ${props.reportData?.shipment_profit?.shipment_count} | Margin ${Number(props.reportData?.shipment_profit?.average_margin || 0).toFixed(2)}%`
      : 'Shipments: 0'
  },
  { title: 'Net Profit / Loss', value: props.reportData?.net_profit || 0, tone: props.reportData?.net_profit >= 0 ? 'text-green-700' : 'text-red-700' },
  { title: 'Status', value: '', tone: 'text-gray-500', subtitle: getStatusText(props.period.status) },
])

const revenuesMain = computed(() => props.reportData?.revenues?.main || [])
const totalRevenuesMain = computed(() => revenuesMain.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))
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
const expensesConsumption = computed(() => props.reportData?.expenses?.consumption || [])
const expensesOutside = computed(() => props.reportData?.expenses?.outside || [])
const expensesTax = computed(() => props.reportData?.expenses?.tax || [])
const expensesOther = computed(() => props.reportData?.expenses?.other || [])
const expensesPrepaid = computed(() => props.reportData?.expenses?.prepaid || [])

const totalExpensesSalary = computed(() => expensesSalary.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))
const totalExpensesAdmin = computed(() => expensesAdmin.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))
const totalExpensesConsumption = computed(() => expensesConsumption.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))
const totalExpensesOutside = computed(() => expensesOutside.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))
const totalExpensesTax = computed(() => expensesTax.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))
const totalExpensesOther = computed(() => expensesOther.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))
const totalExpensesPrepaid = computed(() => expensesPrepaid.value.reduce((sum, item) => sum + Number(item.amount || 0), 0))

const revenueAccounts = computed(() => props.accounts?.revenue || [])
const expenseAccounts = computed(() => props.accounts?.expense || [])
const bankAccounts = computed(() => props.bankAccounts || [])

const accountOptions = computed(() => {
  const revenue = (revenueAccounts.value || []).map((acc) => ({
    value: acc.id,
    label: `${acc.account_code} - ${acc.account_name}`,
    subLabel: 'Revenue',
  }))
  const expense = (expenseAccounts.value || []).map((acc) => ({
    value: acc.id,
    label: `${acc.account_code} - ${acc.account_name}`,
    subLabel: 'Expense',
  }))
  return [...revenue, ...expense]
})

const bankOptions = computed(() => {
  return (bankAccounts.value || []).map((bank) => ({
    value: bank.id,
    label: `${bank.bank_name} - ${bank.account_number}`,
    subLabel: bank.account_name || '',
  }))
})

const isExporting = ref(false)
const loading = ref(false)

const showAdjustmentModal = ref(false)
const alertDialog = ref({
  show: false,
  type: 'info',
  message: '',
})
const adjustmentForm = ref({
  account_id: '',
  amount: '',
  description: '',
  transaction_date: props.period?.start_date ?? new Date().toISOString().split('T')[0],
  notes: '',
  bank_account_id: '',
  bank_transaction_type: '',
})

const openAdjustmentModal = () => {
  adjustmentForm.value = {
    account_id: '',
    amount: '',
    description: '',
    transaction_date: props.period?.start_date ?? new Date().toISOString().split('T')[0],
    notes: '',
    bank_account_id: '',
    bank_transaction_type: '',
  }
  showAdjustmentModal.value = true
}

const closeAdjustmentModal = () => {
  showAdjustmentModal.value = false
}

const submitAdjustment = () => {
  router.post(route('admin-keuangan.profit-loss.entries.store', props.period.id), adjustmentForm.value, {
    preserveScroll: true,
    onSuccess: () => {
      showAdjustmentModal.value = false
      alertDialog.value = {
        show: true,
        type: 'success',
        message: 'Penyesuaian berhasil disimpan.',
      }
      router.reload({ preserveScroll: true })
    },
    onError: (errors) => {
      const message = errors?.error || 'Gagal menyimpan penyesuaian.'
      alertDialog.value = {
        show: true,
        type: 'error',
        message,
      }
    },
  })
}

const exportPdf = () => {
  if (isExporting.value) return
  isExporting.value = true
  window.location.href = route('admin-keuangan.profit-loss.export-pdf', { profitLoss: props.period.id })
  setTimeout(() => (isExporting.value = false), 1000)
}

const regenerateEntries = () => {
  if (loading.value) return
  loading.value = true
  router.post(route('admin-keuangan.profit-loss.regenerate', props.period.id), {}, {
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

const formatEntryDate = (value) => {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const resolveEntryLabel = (entry) => {
  return entry?.description
    || entry?.reference_number
    || entry?.account?.account_name
    || `Entry #${entry?.id ?? '-'}`
}

const resolveEntryMeta = (entry) => {
  const segments = []
  if (entry?.account?.account_code || entry?.account?.account_name) {
    segments.push([entry?.account?.account_code, entry?.account?.account_name].filter(Boolean).join(' - '))
  }
  if (entry?.transaction_date) {
    segments.push(formatEntryDate(entry.transaction_date))
  }
  if (entry?.entry_type === 'manual') {
    segments.push('Manual')
  }
  return segments.join(' | ')
}

const CollapsibleSummaryRow = defineComponent({
  name: 'CollapsibleSummaryRow',
  props: {
    title: String,
    amount: {
      type: [Number, String],
      default: 0,
    },
    entries: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const isOpen = ref(false)

    return () => {
      const details = (props.entries || []).map((entry) =>
        h('div', {
          class: 'flex items-start justify-between gap-3 px-3 py-2 border-t border-gray-100 first:border-t-0',
        }, [
          h('div', { class: 'min-w-0' }, [
            h('div', { class: 'text-sm text-gray-800 break-words' }, resolveEntryLabel(entry)),
            h('div', { class: 'mt-0.5 text-xs text-gray-500' }, resolveEntryMeta(entry)),
          ]),
          h('div', { class: 'text-sm font-semibold text-gray-700 whitespace-nowrap' }, formatCurrency(entry?.amount || 0)),
        ])
      )

      return h('div', { class: 'border border-gray-100 rounded overflow-hidden bg-white' }, [
        h('button', {
          type: 'button',
          class: 'w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors',
          onClick: () => {
            isOpen.value = !isOpen.value
          },
        }, [
          h('div', { class: 'flex items-center gap-2 min-w-0' }, [
            h(ChevronDown, {
              class: ['w-4 h-4 text-gray-500 transition-transform shrink-0', isOpen.value ? 'rotate-180' : ''],
            }),
            h('div', { class: 'text-sm font-semibold text-gray-800 text-left' }, props.title || 'Category'),
          ]),
          h('div', { class: 'text-sm font-bold text-gray-900 whitespace-nowrap' }, formatCurrency(props.amount)),
        ]),
        isOpen.value
          ? h('div', { class: 'bg-white' }, details.length
            ? details
            : [h('div', { class: 'px-3 py-2 text-sm text-gray-500 border-t border-gray-100' }, 'No breakdown available')])
          : null,
      ])
    }
  },
})
</script>
