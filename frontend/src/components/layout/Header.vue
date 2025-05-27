<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div class="flex items-center lg:hidden">
        <button
          type="button"
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
          @click="$emit('toggleSidebar')"
        >
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div class="flex-1 flex justify-center lg:justify-end">
        <div class="w-full max-w-md lg:max-w-xs">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
      
      <div class="flex items-center">
        <div class="relative" ref="profileDropdownRef">
          <button
            type="button"
            class="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            @click="isProfileDropdownOpen = !isProfileDropdownOpen"
          >
            <span class="sr-only">Open user menu</span>
            <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              {{ userInitials }}
            </div>
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isProfileDropdownOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div class="px-4 py-2 text-sm text-gray-700 border-b">
                <p class="font-medium">{{ authStore.user?.name }}</p>
                <p class="text-gray-500">{{ authStore.user?.email }}</p>
              </div>
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                @click="isProfileDropdownOpen = false"
              >
                Your Profile
              </router-link>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                @click="handleLogout"
              >
                Sign out
              </a>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['toggleSidebar'])
const authStore = useAuthStore()
const isProfileDropdownOpen = ref(false)
const profileDropdownRef = ref<HTMLElement | null>(null)

const userInitials = computed(() => {
  const name = authStore.user?.name || ''
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
})

const handleLogout = () => {
  authStore.logout()
  isProfileDropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target as Node)) {
    isProfileDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>