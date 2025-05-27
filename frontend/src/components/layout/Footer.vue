<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <img class="h-6 w-auto" src="@/assets/logo.svg" alt="StockSmart" />
          <p class="ml-2 text-sm text-gray-500">
            &copy; {{ currentYear }} StockSmart. All rights reserved.
          </p>
        </div>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Terms</span>
            <span class="text-sm">Terms of Service</span>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Privacy</span>
            <span class="text-sm">Privacy Policy</span>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Contact</span>
            <span class="text-sm">Contact</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>