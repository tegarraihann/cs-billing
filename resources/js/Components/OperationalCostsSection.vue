<template>
  <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 border-l-4 border-l-red-500">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-red-800">Biaya Operasional (Internal Only)</h3>
        <p class="text-sm text-red-600">Biaya ini tidak akan ditampilkan di invoice customer dan akan mengurangi profit</p>
      </div>
      <button
        type="button"
        @click="addOperationalCost"
        class="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah Biaya Operasional
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="operationalCosts.length === 0" class="text-gray-500 text-center py-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
      <div class="flex flex-col items-center">
        <svg class="w-12 h-12 text-red-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-600">Belum ada biaya operasional</p>
        <p class="text-sm text-red-500">Contoh: Kirim dokumen, biaya kawalan, parkir, dll</p>
      </div>
    </div>

    <!-- Operational Costs List -->
    <div class="space-y-4">
      <div
        v-for="(cost, index) in operationalCosts"
        :key="'opex-' + index"
        class="border border-red-200 rounded-lg p-4 bg-red-50"
      >
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-medium text-red-800">Biaya Operasional {{ index + 1 }}</h4>
          <button
            type="button"
            @click="removeOperationalCost(index)"
            class="text-red-600 hover:text-red-800"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Template Selection (Primary Method) -->
        <div class="template-selection mb-4">
          <label class="block text-sm font-medium text-red-700 mb-2">
            Pilih Template Biaya (Recommended)
          </label>
          <select
            v-model="cost.template_id"
            @change="selectTemplate(index)"
            class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">-- Pilih Jenis Biaya --</option>
            <optgroup v-for="category in categorizedTemplates" :key="category.id" :label="category.name">
              <option v-for="template in category.templates" :key="template.id" :value="template.id">
                {{ template.name }}
                <span v-if="template.typical_amount_min > 0">
                  ({{ formatCurrency(template.typical_amount_min) }} - {{ formatCurrency(template.typical_amount_max) }})
                </span>
              </option>
            </optgroup>
          </select>
        </div>

        <!-- Manual Input (Alternative) -->
        <div class="manual-input" v-if="!cost.template_id">
          <div class="flex items-center mb-2">
            <span class="text-sm text-gray-600">Atau tulis manual:</span>
            <button
              type="button"
              @click="toggleManualMode(index)"
              class="ml-2 text-xs text-blue-600 underline"
            >
              {{ cost.manual_mode ? 'Tutup Manual' : 'Input Manual' }}
            </button>
          </div>

          <div v-if="cost.manual_mode" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-red-700 mb-1">Deskripsi</label>
              <input
                v-model="cost.description"
                @input="checkKeywords(index)"
                type="text"
                placeholder="Contoh: Parkir mall 2 jam"
                class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <!-- Keyword suggestion -->
              <div v-if="cost.suggested_category" class="mt-1 text-xs text-green-600">
                Terdeteksi: {{ cost.suggested_category }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-red-700 mb-1">Kategori</label>
              <select
                v-model="cost.category_id"
                class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Pilih Kategori</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Amount Input -->
        <div class="amount-section grid grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-red-700 mb-1">Jumlah (Rp)</label>
            <input
              v-model="cost.rate"
              @input="calculateOperationalAmount(index)"
              type="number"
              step="1000"
              min="0"
              class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="0"
              required
            />
            <!-- Amount guidance from template -->
            <div v-if="cost.selected_template && cost.selected_template.typical_amount_min > 0"
                 class="mt-1 text-xs text-gray-500">
              Umumnya: {{ formatCurrency(cost.selected_template.typical_amount_min) }} - {{ formatCurrency(cost.selected_template.typical_amount_max) }}
            </div>
            <!-- Amount warning -->
            <div v-if="cost.amount_warning" class="mt-1 text-xs text-orange-600">
              {{ cost.amount_warning }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-red-700 mb-1">Total</label>
            <input
              type="text"
              :value="formatCurrency(cost.amount || 0)"
              class="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-100 text-red-800"
              readonly
            />
          </div>
        </div>

        <!-- Preview hasil -->
        <div v-if="cost.description || cost.selected_template"
             class="preview-section mt-3 p-2 bg-blue-50 rounded border-l-4 border-l-blue-400">
          <div class="text-xs text-gray-600">
            <strong>Preview:</strong> {{ getPreviewText(cost) }}
            → Kategori: <span class="text-blue-600">{{ getCategoryName(cost) }}</span>
            <span v-if="cost.categorization_method" class="ml-2 text-purple-600">
              ({{ getCategorizationMethodText(cost.categorization_method) }})
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Operational Costs Summary -->
    <div v-if="operationalCosts.length > 0" class="mt-4 pt-4 border-t border-red-200">
      <div class="flex justify-between items-center text-sm">
        <span class="font-medium text-red-700">Total Biaya Operasional:</span>
        <span class="font-bold text-red-800">{{ formatCurrency(calculateOperationalTotal()) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'OperationalCostsSection',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const operationalCosts = ref(props.modelValue)
    const categorizedTemplates = ref([])
    const isLoading = ref(false)

    // Load templates on mount
    onMounted(async () => {
      await loadTemplates()
    })

    const loadTemplates = async () => {
      try {
        isLoading.value = true
        const response = await axios.get('/admin-keuangan/api/expense-templates/by-category')
        if (response.data.success) {
          categorizedTemplates.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to load templates:', error)
      } finally {
        isLoading.value = false
      }
    }

    const addOperationalCost = () => {
      const newCost = {
        description: '',
        quantity: 1,
        unit: 'pcs',
        rate: 0,
        currency: 'IDR',
        amount: 0,
        item_type: 'operational_cost',
        include_in_customer_invoice: false,
        is_hidden_from_customer: true,
        template_id: null,
        category_id: null,
        selected_template: null,
        manual_mode: false,
        suggested_category: null,
        categorization_method: 'manual',
        amount_warning: null
      }

      operationalCosts.value.push(newCost)
      emit('update:modelValue', operationalCosts.value)
    }

    const removeOperationalCost = (index) => {
      operationalCosts.value.splice(index, 1)
      emit('update:modelValue', operationalCosts.value)
    }

    const selectTemplate = (costIndex) => {
      const cost = operationalCosts.value[costIndex]
      const template = findTemplateById(cost.template_id)

      if (template) {
        cost.selected_template = template
        cost.description = template.name
        cost.category_id = template.category_id
        cost.manual_mode = false
        cost.categorization_method = 'template'

        // Auto-suggest amount if empty
        if (!cost.rate && template.typical_amount_min > 0) {
          cost.rate = template.typical_amount_min
        }

        // Check amount warning
        if (cost.rate > 0 && !isInAmountRange(template, cost.rate)) {
          cost.amount_warning = `Amount outside typical range (${formatCurrency(template.typical_amount_min)} - ${formatCurrency(template.typical_amount_max)})`
        } else {
          cost.amount_warning = null
        }

        calculateOperationalAmount(costIndex)
      }

      emit('update:modelValue', operationalCosts.value)
    }

    const toggleManualMode = (costIndex) => {
      operationalCosts.value[costIndex].manual_mode = !operationalCosts.value[costIndex].manual_mode
      emit('update:modelValue', operationalCosts.value)
    }

    const checkKeywords = async (costIndex) => {
      const cost = operationalCosts.value[costIndex]

      if (cost.description.length > 3) {
        try {
          const response = await axios.post('/admin-keuangan/api/expense-templates/check-keywords', {
            description: cost.description
          })

          if (response.data.success && response.data.data.found) {
            const result = response.data.data
            cost.suggested_category = result.category_name
            cost.category_id = result.category_id
            cost.categorization_method = 'keyword'
          }
        } catch (error) {
          // Silent fail - not critical
          console.warn('Keyword check failed:', error)
        }
      }

      emit('update:modelValue', operationalCosts.value)
    }

    const calculateOperationalAmount = (index) => {
      const cost = operationalCosts.value[index]
      cost.quantity = 1 // Always 1 for operational costs
      cost.amount = parseFloat(cost.rate || 0)

      // Check amount warning if template is selected
      if (cost.selected_template && cost.rate > 0) {
        if (!isInAmountRange(cost.selected_template, cost.rate)) {
          cost.amount_warning = `Amount outside typical range (${formatCurrency(cost.selected_template.typical_amount_min)} - ${formatCurrency(cost.selected_template.typical_amount_max)})`
        } else {
          cost.amount_warning = null
        }
      }

      emit('update:modelValue', operationalCosts.value)
    }

    const calculateOperationalTotal = () => {
      return operationalCosts.value.reduce((total, cost) => {
        return total + (parseFloat(cost.amount || 0))
      }, 0)
    }

    // Helper functions
    const findTemplateById = (templateId) => {
      for (let category of categorizedTemplates.value) {
        const template = category.templates.find(t => t.id === templateId)
        if (template) return template
      }
      return null
    }

    const getCategoryName = (cost) => {
      if (cost.selected_template) {
        return cost.selected_template.category_name || 'Unknown'
      }
      const category = props.categories.find(c => c.id === cost.category_id)
      return category ? category.name : 'Belum dipilih'
    }

    const getPreviewText = (cost) => {
      if (cost.selected_template) {
        return cost.selected_template.name
      }
      return cost.description || 'Belum ada deskripsi'
    }

    const getCategorizationMethodText = (method) => {
      switch (method) {
        case 'template': return 'Template'
        case 'keyword': return 'Keyword Match'
        case 'manual': return 'Manual'
        default: return 'Unknown'
      }
    }

    const isInAmountRange = (template, amount) => {
      if (!template.typical_amount_min || !template.typical_amount_max) return true
      return amount >= template.typical_amount_min && amount <= template.typical_amount_max
    }

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0)
    }

    return {
      operationalCosts,
      categorizedTemplates,
      isLoading,
      addOperationalCost,
      removeOperationalCost,
      selectTemplate,
      toggleManualMode,
      checkKeywords,
      calculateOperationalAmount,
      calculateOperationalTotal,
      getCategoryName,
      getPreviewText,
      getCategorizationMethodText,
      formatCurrency
    }
  }
}
</script>