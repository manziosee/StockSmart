<template>
    <AppLayout>
        <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900">Sales</h1>
                <p class="mt-1 text-sm text-gray-500">
                    View and manage all your sales transactions
                </p>
            </div>
            <div class="mt-4 md:mt-0">
                <router-link to="/sales/create" class="btn btn-primary flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Sale
                </router-link>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div>
                    <label class="form-label">Date Range</label>
                    <select v-model="filters.dateRange" class="form-control">
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>
                <div v-if="filters.dateRange === 'custom'" class="md:col-span-2 grid grid-cols-2 gap-2">
                    <div>
                        <label class="form-label">From</label>
                        <input type="date" v-model="filters.dateFrom" class="form-control" />
                    </div>
                    <div>
                        <label class="form-label">To</label>
                        <input type="date" v-model="filters.dateTo" class="form-control" />
                    </div>
                </div>
                <div>
                    <label class="form-label">Status</label>
                    <select v-model="filters.status" class="form-control">
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
                <div class="md:col-span-2">
                    <label class="form-label">Search</label>
                    <div class="relative">
                        <input type="text" v-model="filters.search"
                            placeholder="Search by invoice number, customer name..." class="form-control pl-10" />
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="flex items-end">
                    <button @click="applySalesFilters" class="btn btn-primary w-full">
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div class="bg-white overflow-hidden shadow-sm rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div
                                class="h-12 w-12 bg-primary-100 text-primary-600 rounded-md flex items-center justify-center">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                                <dd class="text-lg font-semibold text-gray-900">{{ formatCurrency(salesStats.totalSales)
                                    }}</dd>
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
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Profit</dt>
                                <dd class="text-lg font-semibold text-gray-900">{{
                                    formatCurrency(salesStats.totalProfit) }}</dd>
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
                                class="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                                <dd class="text-lg font-semibold text-gray-900">{{ salesStats.totalOrders }}</dd>
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
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
                                <dd class="text-lg font-semibold text-gray-900">{{
                                    formatCurrency(salesStats.averageOrderValue) }}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sales Table -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div v-if="loading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>

            <div v-else-if="sales.length === 0" class="py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No sales found</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by creating a new sale.</p>
                <div class="mt-6">
                    <router-link to="/sales/create"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Sale
                    </router-link>
                </div>
            </div>

            <div v-else>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sale #
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="sale in sales" :key="sale.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                                    <router-link :to="`/sales/${sale.id}`" class="hover:underline">
                                        #{{ sale.invoiceNumber }}
                                    </router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>{{ formatDate(sale.date) }}</div>
                                    <div class="text-xs text-gray-400">{{ formatTime(sale.date) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ sale.customer.name || 'Walk-in Customer' }}
                                    <div v-if="sale.customer.phone" class="text-xs text-gray-500">
                                        {{ sale.customer.phone }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ sale.itemCount }} {{ sale.itemCount === 1 ? 'item' : 'items' }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {{ formatCurrency(sale.total) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="{
                                        'bg-green-100 text-green-800': sale.status === 'paid',
                                        'bg-yellow-100 text-yellow-800': sale.status === 'pending',
                                        'bg-red-100 text-red-800': sale.status === 'refunded'
                                    }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                        {{ sale.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-2">
                                        <router-link :to="`/sales/${sale.id}`"
                                            class="text-primary-600 hover:text-primary-900" title="View">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </router-link>
                                        <button class="text-gray-600 hover:text-gray-900" title="Print Receipt"
                                            @click="printReceipt(sale.id)">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div class="flex-1 flex justify-between sm:hidden">
                        <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm text-gray-700">
                                Showing
                                <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                                to
                                <span class="font-medium">
                                    {{ Math.min(currentPage * pageSize, totalItems) }}
                                </span>
                                of
                                <span class="font-medium">{{ totalItems }}</span>
                                results
                            </p>
                        </div>
                        <div>
                            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination">
                                <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span class="sr-only">Previous</span>
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button v-for="page in paginationRange" :key="page" @click="changePage(page)" :class="[
                                    page === currentPage
                                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                                ]">
                                    {{ page }}
                                </button>

                                <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
                                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span class="sr-only">Next</span>
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AppLayout from '../../components/layout/AppLayout.vue';
import { formatCurrency } from '../../config';

const loading = ref(true);
type Sale = {
    id: string;
    invoiceNumber: string;
    date: string;
    customer: {
        name: string;
        phone: string;
    };
    itemCount: number;
    total: number;
    status: string;
};
const sales = ref<Sale[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const totalPages = ref(1);

const filters = ref({
    dateRange: 'week',
    dateFrom: '',
    dateTo: '',
    status: 'all',
    search: ''
});

const salesStats = ref({
    totalSales: 0,
    totalProfit: 0,
    totalOrders: 0,
    averageOrderValue: 0
});

// Pagination range calculation
const paginationRange = computed(() => {
    const range: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        range.push(i);
    }

    return range;
});

// Format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Format time
const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Change page
const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchSales();
};

// Apply filters
const applySalesFilters = () => {
    currentPage.value = 1;
    fetchSales();
};

// Print receipt
const printReceipt = (saleId: string) => {
    // Implement print functionality here
    console.log(`Printing receipt for sale ${saleId}`);
};

// Fetch sales data
const fetchSales = async () => {
    loading.value = true;
    try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        sales.value = [
            {
                id: '1',
                invoiceNumber: '1001',
                date: '2025-04-01T10:30:00',
                customer: {
                    name: 'John Doe',
                    phone: '+1 234-567-8900'
                },
                itemCount: 3,
                total: 299.99,
                status: 'paid'
            },
            {
                id: '2',
                invoiceNumber: '1002',
                date: '2025-04-01T14:45:00',
                customer: {
                    name: 'Jane Smith',
                    phone: '+1 345-678-9012'
                },
                itemCount: 2,
                total: 149.50,
                status: 'paid'
            },
            {
                id: '3',
                invoiceNumber: '1003',
                date: '2025-04-02T09:15:00',
                customer: {
                    name: 'Robert Johnson',
                    phone: '+1 456-789-0123'
                },
                itemCount: 1,
                total: 599.99,
                status: 'paid'
            },
            {
                id: '4',
                invoiceNumber: '1004',
                date: '2025-04-02T16:20:00',
                customer: {
                    name: 'Sarah Williams',
                    phone: '+1 567-890-1234'
                },
                itemCount: 4,
                total: 239.96,
                status: 'pending'
            },
            {
                id: '5',
                invoiceNumber: '1005',
                date: '2025-04-03T11:05:00',
                customer: {
                    name: 'Michael Brown',
                    phone: '+1 678-901-2345'
                },
                itemCount: 2,
                total: 89.98,
                status: 'paid'
            },
            {
                id: '6',
                invoiceNumber: '1006',
                date: '2025-04-03T15:30:00',
                customer: {
                    name: '',
                    phone: ''
                },
                itemCount: 1,
                total: 24.99,
                status: 'paid'
            },
            {
                id: '7',
                invoiceNumber: '1007',
                date: '2025-04-04T10:00:00',
                customer: {
                    name: 'Emily Davis',
                    phone: '+1 789-012-3456'
                },
                itemCount: 3,
                total: 349.97,
                status: 'refunded'
            }
        ];

        // Mock stats
        salesStats.value = {
            totalSales: 1654.38,
            totalProfit: 621.50,
            totalOrders: 7,
            averageOrderValue: 236.34
        };

        totalItems.value = 7;
        totalPages.value = Math.ceil(totalItems.value / pageSize.value);

    } catch (error) {
        console.error('Error fetching sales:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchSales();
});
</script>