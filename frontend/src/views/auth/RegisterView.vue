<template>
    <div class="min-h-screen flex">
        <!-- Left side - Brand/Info -->
        <div
            class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 flex-col justify-between">
            <div>
                <div class="flex items-center">
                    <img class="h-10 w-auto" src="@/assets/logo.svg" alt="StockSmart" />
                    <h1 class="ml-3 text-2xl font-bold">StockSmart</h1>
                </div>
                <div class="mt-16">
                    <h2 class="text-3xl font-bold mb-6">Start growing your business today</h2>
                    <p class="text-primary-100 text-lg mb-8">
                        Join thousands of businesses using StockSmart to manage their inventory and boost sales.
                    </p>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 bg-primary-500 rounded-md p-1">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-white font-medium">Free 14-day trial</h3>
                                <p class="text-primary-200 text-sm">No credit card required</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="flex-shrink-0 bg-primary-500 rounded-md p-1">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-white font-medium">Easy setup</h3>
                                <p class="text-primary-200 text-sm">Get started in minutes</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="flex-shrink-0 bg-primary-500 rounded-md p-1">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-white font-medium">24/7 Support</h3>
                                <p class="text-primary-200 text-sm">We're here to help you succeed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-auto">
                <div class="flex items-center space-x-4">
                    <div class="flex -space-x-2">
                        <img class="h-10 w-10 rounded-full border-2 border-primary-600"
                            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="User" />
                        <img class="h-10 w-10 rounded-full border-2 border-primary-600"
                            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" alt="User" />
                        <img class="h-10 w-10 rounded-full border-2 border-primary-600"
                            src="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg" alt="User" />
                    </div>
                    <p class="text-sm text-primary-200">
                        Join <span class="text-white font-medium">2,500+</span> businesses already using StockSmart
                    </p>
                </div>
            </div>
        </div>

        <!-- Right side - Register Form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div class="w-full max-w-md">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
                    <p class="mt-2 text-sm text-gray-600">
                        Already have an account?
                        <router-link to="/login" class="text-primary-600 hover:text-primary-500 font-medium">
                            Sign in
                        </router-link>
                    </p>
                </div>

                <div v-if="authStore.error"
                    class="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md p-4 text-sm">
                    {{ authStore.error }}
                </div>

                <form @submit.prevent="handleRegister" class="space-y-6">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
                        <div class="mt-1">
                            <input id="name" v-model="name" type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder="John Smith" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" v-model="email" type="email" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder="you@example.com" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1 relative">
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder="••••••••" />
                            <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                @click="showPassword = !showPassword">
                                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                    </div>

                    <div>
                        <label for="business-name" class="block text-sm font-medium text-gray-700">Business name</label>
                        <div class="mt-1">
                            <input id="business-name" v-model="businessName" type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder="Your business name" />
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input id="terms" v-model="acceptedTerms" name="terms" type="checkbox" required
                            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label for="terms" class="ml-2 block text-sm text-gray-900">
                            I agree to the
                            <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
                            and
                            <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                        </label>
                    </div>

                    <div>
                        <button type="submit" :disabled="authStore.loading || !acceptedTerms"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
                            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ authStore.loading ? 'Creating account...' : 'Create account' }}
                        </button>
                    </div>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-2 gap-3">
                        <button type="button"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                class="h-5 w-5" />
                        </button>
                        <button type="button"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const businessName = ref('')
  const acceptedTerms = ref(false)
  const showPassword = ref(false)
  
  const handleRegister = async () => {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      business: businessName.value || undefined
    })
  }
  </script>