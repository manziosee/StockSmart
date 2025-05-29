<template>
    <AppLayout>
        <div class="mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Reports</h1>
            <p class="mt-1 text-sm text-gray-500">
                View and analyze your business performance
            </p>
        </div>

        <!-- Report Filters -->
        <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                    <label class="form-label">Report Type</label>
                    <select v-model="filters.type" class="form-control">
                        <option value="sales">Sales Report</option>
                        <option value="inventory">Inventory Report</option>
                        <option value="profit">Profit & Loss</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Date Range</label>
                    <select v-model="filters.dateRange" class="form-control">
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button class="btn btn-primary w-full" @click="generateReport">
                        Generate Report
                    </button>
                </div>
            </div>
        </div>

        <!-- Report Content -->
        <div class="space-y-6">
            <!-- Summary Cards -->
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div class="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="h-12 w-12 bg-primary-100 text-primary-600 rounded-md flex items-center justify-center">
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">
                                        Total Sales
                                    </dt>
                                    <dd class="text-lg font-semibold text-gray-900">
                                        {{ formatCurrency(summary.totalSales) }}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="h-12 w-12 bg-green-100 text-green-600 rounded-md flex items-center justify-center">
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">
                                        Gross Profit
                                    </dt>
                                    <dd class="text-lg font-semibold text-gray-900">
                                        {{ formatCurrency(summary.grossProfit) }}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="h-12 w-12 bg-yellow-100 text-yellow-600 rounded-md flex items-center justify-center">
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">
                                        Total Orders
                                    </dt>
                                    <dd class="text-lg font-semibold text-gray-900">
                                        {{ summary.totalOrders }}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="h-12 w-12 bg-red-100 text-red-600 rounded-md flex items-center justify-center">
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">
                                        Average Order Value
                                    </dt>
                                    <dd class="text-lg font-semibold text-gray-900">
                                        {{ formatCurrency(summary.averageOrderValue) }}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sales Chart -->
            <div class="bg-white shadow-sm rounded-lg p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Sales Trend</h2>
                <div class="h-80">
                    <SalesChart :data="chartData" />
                </div>
            </div>

            <!-- Top Products Table -->
            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-medium text-gray-900">Top Selling Products</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th
                                    class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Units Sold
                                </th>
                                <th
                                    class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Revenue
                                </th>
                                <th
                                    class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profit
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="product in topProducts" :key="product.id">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ product.name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                    {{ product.unitsSold }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {{ formatCurrency(product.revenue) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {{ formatCurrency(product.profit) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Export Options -->
            <div class="flex justify-end space-x-3">
                <button class="btn btn-secondary" @click="exportPDF">
                    Export as PDF
                </button>
                <button class="btn btn-secondary" @click="exportCSV">
                    Export as CSV
                </button>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '../../components/layout/AppLayout.vue'
import SalesChart from '../../components/dashboard/SalesChart.vue'
import { formatCurrency } from '../../config'

const filters = ref({
    type: 'sales',
    dateRange: 'week'
})

// Mock data
const summary = ref({
    totalSales: 25678.90,
    grossProfit: 8234.56,
    totalOrders: 142,
    averageOrderValue: 180.84
})

const chartData = ref([
    { date: '2025-03-09', sales: 1200 },
    { date: '2025-03-10', sales: 1800 },
    { date: '2025-03-11', sales: 1400 },
    { date: '2025-03-12', sales: 1600 },
    { date: '2025-03-13', sales: 2200 },
    { date: '2025-03-14', sales: 1900 },
    { date: '2025-03-15', sales: 2400 }
])

const topProducts = ref([
    {
        id: 1,
        name: 'Product 1',
        unitsSold: 45,
        revenue: 4499.55,
        profit: 1349.87
    },
    {
        id: 2,
        name: 'Product 2',
        unitsSold: 38,
        revenue: 5699.62,
        profit: 1709.89
    },
    {
        id: 3,
        name: 'Product 3',
        unitsSold: 31,
        revenue: 6199.69,
        profit: 1859.91
    }
])

const generateReport = async () => {
    // Implement report generation logic here
    console.log('Generating report with filters:', filters.value)
}

const exportPDF = () => {
    // Implement PDF export logic here
    console.log('Exporting as PDF')
}

const exportCSV = () => {
    // Implement CSV export logic here
    console.log('Exporting as CSV')
}
</script>