<template>
  <AppLayout>
    <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Products</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage your product inventory
        </p>
      </div>
      <div class="mt-4 md:mt-0">
        <router-link to="/products/create" class="btn btn-primary flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </router-link>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label class="form-label">Category</label>
          <select v-model="filters.category" class="form-control">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label class="form-label">Stock Status</label>
          <select v-model="filters.stockStatus" class="form-control">
            <option value="">All</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="form-label">Search</label>
          <div class="relative">
            <input type="text" v-model="filters.search" placeholder="Search by name, SKU, or barcode..."
              class="form-control pl-10" />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button @click="applyFilters" class="btn btn-primary">
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <div class="bg-white overflow-hidden shadow-sm rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 bg-primary-100 text-primary-600 rounded-md flex items-center justify-center">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                <dd class="text-lg font-semibold text-gray-900">{{ productStats.totalProducts }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow-sm rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 bg-green-100 text-green-600 rounded-md flex items-center justify-center">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">In Stock</dt>
                <dd class="text-lg font-semibold text-gray-900">{{ productStats.inStock }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow-sm rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 bg-yellow-100 text-yellow-600 rounded-md flex items-center justify-center">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Low Stock</dt>
                <dd class="text-lg font-semibold text-gray-900">{{ productStats.lowStock }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow-sm rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 bg-red-100 text-red-600 rounded-md flex items-center justify-center">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Out of Stock</dt>
                <dd class="text-lg font-semibold text-gray-900">{{ productStats.outOfStock }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white shadow-sm rounded-lg overflow-hidden">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="products.length === 0" class="py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
        <div class="mt-6">
          <router-link to="/products/create"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </router-link>
        </div>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name"
                        class="h-10 w-10 rounded-md object-cover" />
                      <div v-else
                        class="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">SKU: {{ product.sku }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.category }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {{ formatCurrency(product.price) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div :class="{
                    'text-green-800 bg-green-100': product.quantity > product.minStockLevel,
                    'text-yellow-800 bg-yellow-100': product.quantity > 0 && product.quantity <= product.minStockLevel,
                    'text-red-800 bg-red-100': product.quantity === 0
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full py-1">
                    {{ product.quantity }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-3">
                    <router-link :to="`/products/${product.id}/edit`" class="text-primary-600 hover:text-primary-900"
                      title="Edit">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </router-link>
                    <button @click="deleteProduct(product.id)" class="text-red-600 hover:text-red-900" title="Delete">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 overflow-y-auto z-50">
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
                <h3 class="text-lg leading-6 font-medium text-gray-900">Delete Product</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this product? This action cannot be undone and all data associated
                    with this product will be permanently removed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="confirmDeleteProduct"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Delete
            </button>
            <button @click="cancelDelete"
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
import { ref, computed, onMounted } from 'vue';
import AppLayout from '../../components/layout/AppLayout.vue';
import { formatCurrency } from '../../config';

const loading = ref(true);
interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  quantity: number;
  minStockLevel: number;
  imageUrl: string;
}

const products = ref<Product[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const totalPages = ref(1);
const showDeleteModal = ref(false);
import type { Ref } from 'vue';
const productToDelete: Ref<string | null> = ref(null);

const categories = ['Electronics', 'Clothing', 'Food', 'Books'];

const filters = ref({
  category: '',
  stockStatus: '',
  search: ''
});

const productStats = ref({
  totalProducts: 0,
  inStock: 0,
  lowStock: 0,
  outOfStock: 0
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

// Change page
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchProducts();
};

// Apply filters
const applyFilters = () => {
  currentPage.value = 1;
  fetchProducts();
};

// Delete product
const deleteProduct = (id: string) => {
  productToDelete.value = id;
  showDeleteModal.value = true;
};

// Confirm delete product
const confirmDeleteProduct = async () => {
  try {
    // Implement delete functionality here
    console.log(`Deleting product ${productToDelete.value}`);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter out the deleted product
    products.value = products.value.filter(product => product.id !== productToDelete.value);

    // Update product stats
    productStats.value.totalProducts -= 1;

    showDeleteModal.value = false;
    productToDelete.value = null;

    // Refresh data if needed
    fetchProducts();

  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product');
  }
};

// Cancel delete
const cancelDelete = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

// Fetch products data
const fetchProducts = async () => {
  loading.value = true;
  try {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data
    products.value = [
      {
        id: '1',
        name: 'Smartphone X',
        sku: 'SMX-001',
        category: 'Electronics',
        price: 599.99,
        costPrice: 399.99,
        quantity: 25,
        minStockLevel: 5,
        imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '2',
        name: 'Laptop Pro',
        sku: 'LP-001',
        category: 'Electronics',
        price: 1299.99,
        costPrice: 899.99,
        quantity: 12,
        minStockLevel: 3,
        imageUrl: 'https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '3',
        name: 'Wireless Headphones',
        sku: 'WH-100',
        category: 'Electronics',
        price: 149.99,
        costPrice: 89.99,
        quantity: 4,
        minStockLevel: 5,
        imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '4',
        name: 'Smart Watch',
        sku: 'SW-200',
        category: 'Electronics',
        price: 249.99,
        costPrice: 149.99,
        quantity: 8,
        minStockLevel: 5,
        imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '5',
        name: 'Bluetooth Speaker',
        sku: 'BS-300',
        category: 'Electronics',
        price: 99.99,
        costPrice: 59.99,
        quantity: 0,
        minStockLevel: 10,
        imageUrl: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '6',
        name: 'T-Shirt Classic',
        sku: 'TS-100',
        category: 'Clothing',
        price: 19.99,
        costPrice: 8.99,
        quantity: 50,
        minStockLevel: 15,
        imageUrl: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '7',
        name: 'Jeans Slim Fit',
        sku: 'JN-200',
        category: 'Clothing',
        price: 49.99,
        costPrice: 24.99,
        quantity: 3,
        minStockLevel: 5,
        imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ];

    // Mock stats
    productStats.value = {
      totalProducts: 7,
      inStock: 5,
      lowStock: 1,
      outOfStock: 1
    };

    totalItems.value = 7;
    totalPages.value = Math.ceil(totalItems.value / pageSize.value);

  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>