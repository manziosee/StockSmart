<template>
  <div class="min-h-screen flex">
    <!-- Left side - Brand/Info -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 flex-col justify-between">
      <div>
        <div class="flex items-center">
          <img class="h-10 w-auto" src="@/assets/logo.svg" alt="StockSmart" />
          <h1 class="ml-3 text-2xl font-bold">StockSmart</h1>
        </div>
        <div class="mt-16">
          <h2 class="text-3xl font-bold mb-6">Welcome back!</h2>
          <p class="text-primary-100 text-lg mb-8">
            Log in to your account to manage your inventory, track sales, and grow your business.
          </p>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="ml-3 text-primary-100">Real-time inventory tracking</p>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="ml-3 text-primary-100">Smart sales analytics</p>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="ml-3 text-primary-100">Automated stock alerts</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-auto">
        <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg" alt="Team working" class="rounded-lg shadow-lg opacity-90 mb-6" />
        <p class="text-sm text-primary-200">
          "StockSmart has transformed how we manage our inventory. It's intuitive and powerful."
        </p>
        <div class="mt-2 flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8 rounded-full" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" alt="User" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-white">Sarah Johnson</p>
            <p class="text-xs text-primary-300">CEO, TechRetail Inc.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Or
            <router-link to="/register" class="text-primary-600 hover:text-primary-500 font-medium">
              create a new account
            </router-link>
          </p>
        </div>

        <div v-if="authStore.error" class="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md p-4 text-sm">
          {{ authStore.error }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1 relative">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              <span class="flex justify-between items-center">
                Password
                <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </span>
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg
                v-if="authStore.loading"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              @click="loginWithGmail"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Gmail" class="h-5 w-5 mr-2" />
              Gmail
            </button>
            <button
  type="button"
  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
  @click="loginWithOutlook"
>
  <img src=".../../../../assets/outlook.svg" alt="Outlook" class="h-5 w-5 mr-2" />
  Outlook
</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  await authStore.login({
    email: email.value,
    password: password.value
  })
}

// Dummy handlers for social login
const loginWithGmail = () => {
  // Implement Gmail OAuth logic here
  alert('Gmail login not implemented')
}
const loginWithOutlook = () => {
  // Implement Outlook OAuth logic here
  alert('Outlook login not implemented')
}
</script>