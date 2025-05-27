<template>
  <div>
    <!-- Mobile sidebar overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 lg:hidden"
      @click="$emit('close')"
    >
      <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
    </div>

    <!-- Mobile sidebar -->
    <div
      v-if="isOpen"
      class="fixed inset-y-0 left-0 flex flex-col z-40 max-w-xs w-full bg-white transform transition ease-in-out duration-300 lg:hidden"
    >
      <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div class="flex items-center">
          <img class="h-8 w-auto" src="@/assets/logo.svg" alt="StockSmart" />
          <span class="ml-2 text-xl font-semibold text-primary-700">StockSmart</span>
        </div>
        <button
          type="button"
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
          @click="$emit('close')"
        >
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto">
        <div class="px-2 py-4 space-y-1">
          <SidebarLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            :icon="item.icon"
            :text="item.name"
            :is-active="isActiveRoute(item.to)"
            @click="$emit('close')"
          />
        </div>
      </nav>
    </div>

    <!-- Desktop sidebar -->
    <div class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white">
      <div class="flex items-center h-16 px-4 border-b border-gray-200">
        <img class="h-8 w-auto" src="@/assets/logo.svg" alt="StockSmart" />
        <span class="ml-2 text-xl font-semibold text-primary-700">StockSmart</span>
      </div>
      <nav class="flex-1 overflow-y-auto">
        <div class="px-2 py-4 space-y-1">
          <SidebarLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            :icon="item.icon"
            :text="item.name"
            :is-active="isActiveRoute(item.to)"
          />
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SidebarLink from './SidebarLink.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const route = useRoute()
const authStore = useAuthStore()

const isActiveRoute = (path: string) => {
  return route.path.startsWith(path)
}

const navigationItems = computed(() => {
  const items = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: 'dashboard',
    },
    {
      name: 'Products',
      to: '/products',
      icon: 'products',
    },
    {
      name: 'Sales',
      to: '/sales',
      icon: 'sales',
    },
    {
      name: 'Reports',
      to: '/reports',
      icon: 'reports',
    },
  ]

  // Only show Users link for owner and admin roles
  if (['owner', 'admin'].includes(authStore.userRole)) {
    items.push({
      name: 'Users',
      to: '/users',
      icon: 'users',
    })
  }

  return items
})
</script>