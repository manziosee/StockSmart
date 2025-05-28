<template>
    <AppLayout>
        <div class="mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Add New Product</h1>
            <p class="mt-1 text-sm text-gray-500">
                Create a new product in your inventory
            </p>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
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
                        <label class="form-label">Initial Stock Quantity</label>
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
                    <button type="submit" class="btn btn-primary" :disabled="loading">
                        {{ loading ? 'Creating...' : 'Create Product' }}
                    </button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../../components/layout/AppLayout.vue'

const router = useRouter()
const loading = ref(false)

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

const handleSubmit = async () => {
    try {
        loading.value = true
        // Implement create product logic here
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
        router.push('/products')
    } catch (error) {
        console.error('Error creating product:', error)
    } finally {
        loading.value = false
    }
}
</script>