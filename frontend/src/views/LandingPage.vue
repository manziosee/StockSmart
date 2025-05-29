<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <header class="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div class="container mx-auto px-4 py-16 md:py-24">
        <nav class="flex justify-between items-center mb-16">
          <div class="flex items-center">
            <img src="@/assets/logo.svg" alt="StockSmart" class="h-10 w-auto" />
            <span class="ml-3 text-2xl font-bold">StockSmart</span>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="#features" class="hover:text-primary-200 transition duration-150">Features</a>
            <a href="#benefits" class="hover:text-primary-200 transition duration-150">Benefits</a>
            <a href="#pricing" class="hover:text-primary-200 transition duration-150">Pricing</a>
          </div>
          <div class="space-x-4">
            <button @click="navigateTo('/login')"
              class="px-4 py-2 text-primary-700 bg-white rounded-md hover:bg-gray-100 transition duration-150">
              Login
            </button>
            <button @click="navigateTo('/register')"
              class="px-4 py-2 border border-white rounded-md hover:bg-primary-500 transition duration-150">
              Register
            </button>
          </div>
        </nav>

        <div class="md:flex items-center">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
              Smart Inventory & Sales Management Made Simple
            </h1>
            <p class="text-lg md:text-xl mb-8 text-primary-100">
              Take control of your inventory, streamline sales, and grow your business with our all-in-one solution.
            </p>
            <div class="space-x-4">
              <button @click="navigateTo('/register')"
                class="px-6 py-3 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition duration-150 font-medium">
                Get Started Free
              </button>
              <button @click="navigateTo('/login')"
                class="px-6 py-3 bg-white text-primary-700 rounded-md hover:bg-gray-100 transition duration-150 font-medium">
                Live Demo
              </button>
            </div>
          </div>
          <div class="md:w-1/2 md:pl-10">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="StockSmart Dashboard" class="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </header>

    <!-- Other Sections Omitted for Brevity -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// lucide-react icons are for React. In Vue, use `lucide-vue-next` or similar packages.
import { ChevronRight, LineChart, Package, Shield, Users, BarChart3, Bell } from 'lucide-vue-next'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
/* You can add some scoped styles if needed */
</style>