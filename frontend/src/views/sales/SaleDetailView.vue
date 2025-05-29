<template>
    <AppLayout>
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center">
                    <router-link to="/sales" class="mr-2 text-primary-600 hover:text-primary-700">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </router-link>
                    <h1 class="text-2xl font-semibold text-gray-900">Sale Details</h1>
                </div>
                <p class="mt-1 text-sm text-gray-500">
                    Invoice #{{ sale.invoiceNumber }}
                </p>
            </div>
            <div class="mt-4 sm:mt-0 flex space-x-3">
                <button @click="printReceipt" class="btn btn-secondary flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Receipt
                </button>
                <button @click="sendReceipt" class="btn btn-secondary flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Receipt
                </button>
            </div>
        </div>

        <div v-if="loading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else class="bg-white shadow-sm rounded-lg overflow-hidden">
            <!-- Sale Header -->
            <div class="p-6 border-b border-gray-200">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Sale Info -->
                    <div>
                        <h3 class="text-sm font-medium text-gray-500 mb-1">Sale Information</h3>
                        <p class="text-gray-900">
                            <span class="font-medium">Date:</span> {{ formatDate(sale.date) }}
                        </p>
                        <p class="text-gray-900">
                            <span class="font-medium">Time:</span> {{ formatTime(sale.date) }}
                        </p>
                        <p class="text-gray-900">
                            <span class="font-medium">Invoice:</span> #{{ sale.invoiceNumber }}
                        </p>
                        <p class="text-gray-900">
                            <span class="font-medium">Status:</span>
                            <span :class="{
                                'text-green-600': sale.status === 'paid',
                                'text-yellow-600': sale.status === 'pending',
                                'text-red-600': sale.status === 'refunded'
                            }">
                                {{ sale.status }}
                            </span>
                        </p>
                    </div>

                    <!-- Customer Info -->
                    <div>
                        <h3 class="text-sm font-medium text-gray-500 mb-1">Customer</h3>
                        <p class="text-gray-900 font-medium">{{ sale.customer.name || 'Walk-in Customer' }}</p>
                        <p v-if="sale.customer.phone" class="text-gray-600">{{ sale.customer.phone }}</p>
                        <p v-if="sale.customer.email" class="text-gray-600">{{ sale.customer.email }}</p>
                        <p v-if="sale.customer.address" class="text-gray-600">{{ sale.customer.address }}</p>
                    </div>

                    <!-- Payment Info -->
                    <div>
                        <h3 class="text-sm font-medium text-gray-500 mb-1">Payment Details</h3>
                        <p class="text-gray-900">
                            <span class="font-medium">Method:</span> {{ sale.paymentMethod }}
                        </p>
                        <p v-if="sale.paymentReference" class="text-gray-900">
                            <span class="font-medium">Reference:</span> {{ sale.paymentReference }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Sale Items -->
            <div class="px-6 py-4">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Items</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Item
                                </th>
                                <th scope="col"
                                    class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th scope="col"
                                    class="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Unit Price
                                </th>
                                <th scope="col"
                                    class="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(item, index) in sale.items" :key="index">
                                <td class="px-3 py-4 text-sm text-gray-900">
                                    <div class="font-medium">{{ item.name }}</div>
                                    <div v-if="item.sku" class="text-xs text-gray-500">SKU: {{ item.sku }}</div>
                                </td>
                                <td class="px-3 py-4 text-sm text-gray-500 text-center">
                                    {{ item.quantity }}
                                </td>
                                <td class="px-3 py-4 text-sm text-gray-900 text-right">
                                    {{ formatCurrency(item.price) }}
                                </td>
                                <td class="px-3 py-4 text-sm text-gray-900 text-right">
                                    {{ formatCurrency(item.quantity * item.price) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Summary -->
                <div class="mt-6 border-t border-gray-200 pt-4">
                    <div class="flex justify-end">
                        <div class="w-full sm:w-1/2 md:w-1/3">
                            <div class="flex justify-between py-2">
                                <span class="text-gray-600">Subtotal</span>
                                <span class="text-gray-900">{{ formatCurrency(sale.subtotal) }}</span>
                            </div>
                            <div class="flex justify-between py-2 border-t border-gray-100">
                                <span class="text-gray-600">Tax ({{ sale.taxRate }}%)</span>
                                <span class="text-gray-900">{{ formatCurrency(sale.taxAmount) }}</span>
                            </div>
                            <div v-if="sale.discount > 0" class="flex justify-between py-2 border-t border-gray-100">
                                <span class="text-gray-600">Discount</span>
                                <span class="text-gray-900">-{{ formatCurrency(sale.discount) }}</span>
                            </div>
                            <div class="flex justify-between py-2 border-t border-gray-100 font-medium">
                                <span class="text-gray-900">Total</span>
                                <span class="text-gray-900">{{ formatCurrency(sale.total) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notes -->
            <div v-if="sale.notes" class="px-6 py-4 border-t border-gray-200">
                <h3 class="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                <p class="text-gray-700">{{ sale.notes }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="space-x-3 mb-3 sm:mb-0">
                        <button v-if="sale.status === 'pending'" @click="markAsPaid" class="btn btn-success">
                            Mark as Paid
                        </button>
                        <button v-if="sale.status === 'paid'" @click="showRefundModal = true" class="btn btn-danger">
                            Refund
                        </button>
                    </div>
                    <div class="space-x-3">
                        <router-link to="/sales" class="btn btn-secondary">
                            Back to Sales
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Refund Modal -->
        <div v-if="showRefundModal" class="fixed inset-0 overflow-y-auto z-50">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Refund Sale</h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Are you sure you want to refund this sale? This action cannot be undone.
                                    </p>
                                    <div class="mt-4">
                                        <label for="refund-reason"
                                            class="block text-sm font-medium text-gray-700">Reason for Refund</label>
                                        <textarea id="refund-reason" v-model="refundReason" rows="3"
                                            class="form-control mt-1"
                                            placeholder="Enter reason for refund..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="processRefund"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Refund
                        </button>
                        <button @click="showRefundModal = false"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '../../components/layout/AppLayout.vue';
import { formatCurrency } from '../../config';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const showRefundModal = ref(false);
const refundReason = ref('');

// Mock sale data structure
const sale = ref({
    id: '',
    invoiceNumber: '',
    date: '',
    status: '',
    customer: {
        name: '',
        phone: '',
        email: '',
        address: ''
    },
    items: [] as Array<{
        name: string;
        sku: string;
        quantity: number;
        price: number;
    }>,
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    total: 0,
    paymentMethod: '',
    paymentReference: '',
    notes: ''
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

// Print receipt
const printReceipt = () => {
    // Implement print functionality here
    console.log('Printing receipt');
    alert('Printing receipt...');
};

// Send receipt
const sendReceipt = () => {
    // Implement email sending functionality here
    console.log('Sending receipt');
    alert('Sending receipt via email...');
};

// Mark as paid
const markAsPaid = async () => {
    try {
        // Implement update status functionality here
        await new Promise(resolve => setTimeout(resolve, 500));
        sale.value.status = 'paid';
        alert('Sale marked as paid successfully');
    } catch (error) {
        console.error('Error updating sale status:', error);
        alert('Failed to update sale status');
    }
};

// Process refund
const processRefund = async () => {
    try {
        // Implement refund functionality here
        await new Promise(resolve => setTimeout(resolve, 500));
        sale.value.status = 'refunded';
        showRefundModal.value = false;
        alert('Sale refunded successfully');
    } catch (error) {
        console.error('Error refunding sale:', error);
        alert('Failed to refund sale');
    }
};

// Fetch sale data
const fetchSale = async () => {
    loading.value = true;
    const saleId = route.params.id;

    try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        sale.value = {
            id: saleId as string,
            invoiceNumber: '1001',
            date: '2025-04-01T10:30:00',
            status: 'paid',
            customer: {
                name: 'John Doe',
                phone: '+1 234-567-8900',
                email: 'john@example.com',
                address: '123 Main St, Anytown, CA 12345'
            },
            items: [
                {
                    name: 'Smartphone X',
                    sku: 'SMX-001',
                    quantity: 1,
                    price: 599.99
                },
                {
                    name: 'Phone Case',
                    sku: 'AC-C100',
                    quantity: 1,
                    price: 24.99
                },
                {
                    name: 'Screen Protector',
                    sku: 'AC-SP100',
                    quantity: 2,
                    price: 12.99
                }
            ],
            subtotal: 650.96,
            taxRate: 8.25,
            taxAmount: 53.70,
            discount: 10.00,
            total: 694.66,
            paymentMethod: 'Credit Card',
            paymentReference: 'TXID-12345',
            notes: 'Customer requested gift wrapping for the smartphone.'
        };

    } catch (error) {
        console.error('Error fetching sale:', error);
        alert('Failed to load sale details');
        router.push('/sales');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchSale();
});
</script>