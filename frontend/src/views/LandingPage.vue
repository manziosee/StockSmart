<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <header class="relative overflow-hidden">
      <nav class="relative z-10 bg-white/90 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <img src="@/assets/logo.svg" alt="StockSmart" class="h-8 w-auto" />
              <span class="ml-2 text-xl font-semibold text-primary-700">StockSmart</span>
            </div>
            <div class="flex items-center space-x-4">
              <router-link 
                to="/login" 
                class="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Login
              </router-link>
              <router-link 
                to="/register" 
                class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Get Started
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <div class="relative pt-16 pb-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Smart Inventory &</span>
                <span class="block text-primary-600">Sales Management</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Transform your business with our powerful inventory and sales management system. 
                Track stock, manage sales, and grow your business with ease.
              </p>
              <div class="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <router-link 
                  to="/register" 
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Start Free Trial
                </router-link>
              </div>
            </div>
            <div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div class="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <img
                  class="w-full"
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Dashboard preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">
            Everything you need to manage your business
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            Powerful features to help you take control of your inventory and sales
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Feature 1 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900">Inventory Management</h3>
            <p class="mt-2 text-gray-500">
              Track stock levels, set alerts, and manage product information with ease.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900">Sales Tracking</h3>
            <p class="mt-2 text-gray-500">
              Record sales, generate receipts, and monitor your business performance.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900">Analytics & Reports</h3>
            <p class="mt-2 text-gray-500">
              Get insights with detailed reports and visual analytics of your business.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              Terms
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              Privacy
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              Contact
            </a>
          </div>
          <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2025 StockSmart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Component logic here if needed
</script>