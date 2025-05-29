<template>
    <AppLayout>
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Create New Sale</h1>
        <p class="mt-1 text-sm text-gray-500">
          Record a new sales transaction
        </p>
      </div>
  
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-6">
          <!-- Customer Information -->
          <div class="mb-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label class="form-label">Customer Name</label>
                <input
                  v-model="sale.customer.name"
                  type="text"
                  class="form-control"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label class="form-label">Phone Number</label>
                <input
                  v-model="sale.customer.phone"
                  type="tel"
                  class="form-control"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>
  
          <!-- Products -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-900">Products</h2>
              <button
                type="button"
                class="btn btn-secondary"
                @click="addProduct"
              >
                Add Product
              </button>
            </div>
  
            <div class="space-y-4">
              <div
                v-for="(item, index) in sale.items"
                :key="index"
                class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div class="flex-1">
                  <select
                    v-model="item.productId"
                    class="form-control"
                    @change="updateProductDetails(index)"
                  >
                    <option value="">Select product</option>
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.id"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </div>
                <div class="w-32">
                  <input
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    class="form-control"
                    placeholder="Qty"
                    @input="calculateTotal"
                  />
                </div>
                <div class="w-32">
                  <input
                    v-model.number="item.price"
                    type="number"
                    step="0.01"
                    class="form-control"
                    placeholder="Price"
                    readonly
                  />
                </div>
                <div class="w-32">
                  <input
                    :value="formatCurrency(item.quantity * item.price)"
                    type="text"
                    class="form-control"
                    readonly
                  />
                </div>
                <button
                  type="button"
                  class="text-red-600 hover:text-red-800"
                  @click="removeProduct(index)"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
  
          <!-- Summary -->
          <div class="mb-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Summary</h2>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tax ({{ taxRate }}%)</span>
                  <span class="font-medium">{{ formatCurrency(taxAmount) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Discount</span>
                  <div class="flex items-center">
                    <input
                      v-model.number="sale.discount"
                      type="number"
                      min="0"
                      step="0.01"
                      class="form-control w-24"
                      @input="calculateTotal"
                    />
                  </div>
                </div>
                <div class="pt-2 border-t border-gray-200">
                  <div class="flex justify-between">
                    <span class="text-lg font-medium">Total</span>
                    <span class="text-lg font-bold">{{ formatCurrency(total) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Payment -->
          <div class="mb-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Payment</h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label class="form-label">Payment Method</label>
                <select v-model="sale.paymentMethod" class="form-control">
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>
              <div>
                <label class="form-label">Payment Status</label>
                <select v-model="sale.paymentStatus" class="form-control">
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
  
          <!-- Notes -->
          <div class="mb-8">
            <label class="form-label">Notes</label>
            <textarea
              v-model="sale.notes"
              rows="3"
              class="form-control"
              placeholder="Add any additional notes..."
            ></textarea>
          </div>
  
          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <router-link to="/sales" class="btn btn-secondary">
              Cancel
            </router-link>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Sale' }}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import AppLayout from '../../components/layout/AppLayout.vue'
  import { formatCurrency } from '../../config'

  const router = useRouter()
  const loading = ref(false)
  const taxRate = 10
  
  // Mock products data
  const products = ref([
    { id: 1, name: 'Product 1', price: 99.99 },
    { id: 2, name: 'Product 2', price: 149.99 },
    { id: 3, name: 'Product 3', price: 199.99 },
  ])
  
  const sale = ref({
    customer: {
      name: '',
      phone: ''
    },
    items: [] as Array<{
      productId: number
      quantity: number
      price: number
    }>,
    discount: 0,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    notes: ''
  })
  
  const subtotal = computed(() => {
    return sale.value.items.reduce((total, item) => {
      return total + (item.quantity * item.price)
    }, 0)
  })
  
  const taxAmount = computed(() => {
    return (subtotal.value * taxRate) / 100
  })
  
  const total = computed(() => {
    return subtotal.value + taxAmount.value - sale.value.discount
  })
  
  const addProduct = () => {
    sale.value.items.push({
      productId: 0,
      quantity: 1,
      price: 0
    })
  }
  
  const removeProduct = (index: number) => {
    sale.value.items.splice(index, 1)
    calculateTotal()
  }
  
  const updateProductDetails = (index: number) => {
    const item = sale.value.items[index]
    const product = products.value.find(p => p.id === item.productId)
    if (product) {
      item.price = product.price
      calculateTotal()
    }
  }
  
  const calculateTotal = () => {
    // Totals are computed automatically
  }
  
  const handleSubmit = async () => {
    try {
      loading.value = true
      // Implement create sale logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      router.push('/sales')
    } catch (error) {
      console.error('Error creating sale:', error)
    } finally {
      loading.value = false
    }
  }
  </script>