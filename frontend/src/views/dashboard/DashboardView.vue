<template>
  <AppLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">
        Welcome back, {{ authStore.user?.name }}! Here's an overview of your business.
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Today's Sales"
        :value="formatCurrency(todayStats.sales)"
        icon="currency-dollar"
        color="primary"
      />
      <StatCard
        title="Products Sold"
        :value="todayStats.productsSold.toString()"
        icon="shopping-bag"
        color="success"
      />
      <StatCard
        title="Low Stock Items"
        :value="lowStockCount.toString()"
        icon="exclamation"
        color="warning"
        :to="'/products?lowStock=true'"
      />
      <StatCard
        title="Total Inventory"
        :value="totalProducts.toString()"
        icon="collection"
        color="info"
      />
    </div>

    <div class="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <!-- Sales Chart -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-medium text-gray-900">Sales Overview</h2>
          <div class="flex space-x-2">
            <button
              v-for="period in ['7D', '30D', '90D']"
              :key="period"
              :class="[
                selectedPeriod === period
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                'px-3 py-1 rounded-md text-sm font-medium'
              ]"
              @click="selectedPeriod = period"
            >
              {{ period }}
            </button>
          </div>
        </div>
        <div class="h-64">
          <SalesChart :data="salesChartData" />
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h2>
        <div class="space-y-4">
          <div
            v-for="(product, index) in topProducts"
            :key="index"
            class="flex items-center p-2 rounded-lg hover:bg-gray-50"
          >
            <div class="flex-shrink-0 h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
              {{ index + 1 }}
            </div>
            <div class="ml-4 flex-1">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                <p class="text-sm font-medium text-gray-500">{{ product.sold }} sold</p>
              </div>
              <div class="mt-1 flex items-center">
                <div class="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    class="h-2 bg-primary-500 rounded-full"
                    :style="{ width: `${(product.sold / topProducts[0].sold) * 100}%` }"
                  ></div>
                </div>
                <span class="ml-3 text-xs text-gray-500">{{ formatCurrency(product.revenue) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Low Stock Alerts -->
    <div class="mt-8 bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Low Stock Alerts</h2>
      </div>
      <div class="p-6">
        <div v-if="lowStockProducts.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-2 text-gray-500">No low stock alerts at the moment.</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="product in lowStockProducts"
            :key="product.id"
            class="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-lg"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-600">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                <p class="text-xs text-gray-500">
                  Only <span class="font-medium text-yellow-700">{{ product.quantity }}</span> left in stock
                </p>
              </div>
            </div>
            <router-link
              :to="`/products/${product.id}/edit`"
              class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Update Stock
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatCurrency } from '@/config'
import AppLayout from '@/components/layout/AppLayout.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import SalesChart from '@/components/dashboard/SalesChart.vue'

const authStore = useAuthStore()
const selectedPeriod = ref('7D')

// Mock data - in a real app, this would come from API
const todayStats = ref({
  sales: 1245.67,
  productsSold: 32,
  profit: 432.56,
})

const lowStockCount = ref(5)
const totalProducts = ref(124)

const salesChartData = ref([
  { date: '2023-04-01', sales: 1200 },
  { date: '2023-04-02', sales: 1800 },
  { date: '2023-04-03', sales: 1400 },
  { date: '2023-04-04', sales: 1600 },
  { date: '2023-04-05', sales: 2200 },
  { date: '2023-04-06', sales: 1900 },
  { date: '2023-04-07', sales: 2400 },
])

const topProducts = ref([
  { id: 1, name: 'Smartphone X', sold: 42, revenue: 12600 },
  { id: 2, name: 'Wireless Earbuds', sold: 38, revenue: 3800 },
  { id: 3, name: 'Smart Watch Pro', sold: 31, revenue: 7750 },
  { id: 4, name: 'Bluetooth Speaker', sold: 26, revenue: 2600 },
  { id: 5, name: 'USB-C Cable', sold: 24, revenue: 480 },
])

const lowStockProducts = ref([
  { id: 1, name: 'Smartphone X', quantity: 3, minStockLevel: 5 },
  { id: 2, name: 'Wireless Earbuds', quantity: 2, minStockLevel: 10 },
  { id: 3, name: 'Smart Watch Pro', quantity: 4, minStockLevel: 5 },
  { id: 4, name: 'Power Bank 10000mAh', quantity: 1, minStockLevel: 5 },
])

onMounted(() => {
  // In a real app, fetch data from API
  // fetchDashboardData()
})

// const fetchDashboardData = async () => {
//   try {
//     // Fetch data from API
//     // Update ref values
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error)
//   }
// }
</script>