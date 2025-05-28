<template>
    <AppLayout>
        <div class="mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Edit Product</h1>
            <p class="mt-1 text-sm text-gray-500">
                Update product information
            </p>
        </div>

        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
            {{ error }}
        </div>

        <div v-else class="bg-white rounded-lg shadow-sm p-6">
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Basic Information -->
                    <div>
                        <label class="form-label">Product Name</label>
                        <input v-model="product.name" type="text" required class="form-control"
                            placeholder="Enter product name" />
                    </div>

                    <div>
                        <label class="form-label">Category</label>
                        <select v-model="product.category" required class="form-control">
                            <option value="">Select category</option>
                            <option v-for="category in categories" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label">Price</label>
                        <input v-model.number="product.price" type="number" step="0.01" required class="form-control"
                            placeholder="0.00" />
                    </div>

                    <div>
                        <label class="form-label">Cost Price</label>
                        <input v-model.number="product.costPrice" type="number" step="0.01" required
                            class="form-control" placeholder="0.00" />
                    </div>

                    <div>
                        <label class="form-label">Stock Quantity</label>
                        <input v-model.number="product.quantity" type="number" required class="form-control"
                            placeholder="0" />
                    </div>

                    <div>
                        <label class="form-label">Minimum Stock Level</label>
                        <input v-model.number="product.minStockLevel" type="number" required class="form-control"
                            placeholder="5" />
                    </div>

                    <div>
                        <label class="form-label">Barcode</label>
                        <input v-model="product.barcode" type="text" class="form-control" placeholder="Enter barcode" />
                    </div>

                    <div>
                        <label class="form-label">Image URL</label>
                        <input v-model="product.imageUrl" type="url" class="form-control"
                            placeholder="https://example.com/image.jpg" />
                    </div>
                </div>

                <div>
                    <label class="form-label">Description</label>
                    <textarea v-model="product.description" rows="4" class="form-control"
                        placeholder="Enter product description"></textarea>
                </div>

                <div class="flex justify-end space-x-3">
                    <router-link to="/products" class="btn btn-secondary">
                        Cancel
                    </router-link>
                    <button type="submit" class="btn btn-primary" :disabled="saving">
                        {{ saving ? 'Saving...' : 'Save Changes' }}
                    </button>
                </div>
            </form>
        </div>
    </AppLayout>    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../../components/layout/AppLayout.vue'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const categories = ['Electronics', 'Clothing', 'Food', 'Books']

const product = ref({
    name: '',
    description: '',
    price: 0,
    costPrice: 0,
    category: '',
    quantity: 0,
    minStockLevel: 5,
    imageUrl: '',
    barcode: ''
})

const fetchProduct = async () => {
    try {
        loading.value = true
        // Implement fetch product logic here
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
        // Mock data
        product.value = {
            name: 'Sample Product',
            description: 'Sample description',
            price: 99.99,
            costPrice: 50.00,
            category: 'Electronics',
            quantity: 10,
            minStockLevel: 5,
            imageUrl: '',
            barcode: '123456789'
        }
    } catch (err: any) {
        error.value = err.message || 'Failed to load product'
    } finally {
        loading.value = false
    }
}

const handleSubmit = async () => {
    try {
        saving.value = true
        // Implement update product logic here
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
        router.push('/products')
    } catch (err: any) {
        error.value = err.message || 'Failed to update product'
    } finally {
        saving.value = false
    }
}

onMounted(() => {
    fetchProduct()
})
</script>