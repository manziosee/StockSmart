<template>
    <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
        <!-- Left side - Brand/Info -->
        <div
            class="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 flex-col justify-between">
            <div>
                <div class="flex items-center">
                    <img class="h-10 w-auto" src="@/assets/logo.svg" alt="StockSmart" />
                    <h1 class="ml-3 text-2xl font-bold">StockSmart</h1>
                </div>
                <div class="mt-16">
                    <h2 class="text-3xl font-bold mb-6">Start growing your business today</h2>
                    <p class="text-primary-100 text-lg mb-8">
                        Create your account and start managing your inventory, tracking sales, and gaining valuable
                        insights.
                    </p>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 bg-primary-500 rounded-md p-1">
                                <svg class="w-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-white font-medium">Simple setup process</h3>
                                <p class="text-primary-200 text-sm">Get started in minutes with our intuitive onboarding
                                    process.</p>
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
                                <h3 class="text-white font-medium">Free 14-day trial</h3>
                                <p class="text-primary-200 text-sm">Try all premium features free for 14 days. No credit
                                    card required.</p>
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
                                <h3 class="text-white font-medium">Cancel anytime</h3>
                                <p class="text-primary-200 text-sm">No long-term contracts. Cancel your subscription
                                    whenever you want.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-auto pt-8">
                <div class="flex items-center space-x-4">
                    <div class="flex -space-x-2">
                        <img class="h-10 w-10 rounded-full border-2 border-primary-600"
                            src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" />
                        <img class="h-10 w-10 rounded-full border-2 border-primary-600"
                            src="https://randomuser.me/api/portraits/men/43.jpg" alt="User" />
                        <img class="h-10 w-10 rounded-full border-2 border-primary-600"
                            src="https://randomuser.me/api/portraits/women/34.jpg" alt="User" />
                    </div>
                    <p class="text-sm text-primary-200">
                        Join <span class="text-white font-medium">2,500+</span> businesses already using StockSmart
                    </p>
                </div>
            </div>
        </div>

        <!-- Right side - Register Form -->
        <div class="w-full md:w-1/2 bg-white p-8 md:p-12 flex items-center justify-center">
            <div class="w-full max-w-md">
                <div class="md:hidden text-center mb-8">
                    <img class="h-10 w-auto mx-auto" src="@/assets/logo.svg" alt="StockSmart" />
                    <h1 class="mt-2 text-2xl font-bold text-gray-900">StockSmart</h1>
                </div>

                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Create your account</h2>
                    <p class="mt-2 text-sm text-gray-600">
                        Already have an account? <router-link to="/login"
                            class="text-primary-600 hover:text-primary-500 font-medium">
                            Sign in
                        </router-link>
                    </p>
                </div>

                <div v-if="authStore.error"
                    class="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md p-4 text-sm">
                    {{ authStore.error }}
                </div>

                <form class="space-y-6" @submit.prevent="handleRegister">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
                        <div class="mt-1">
                            <input id="name" v-model="name" name="name" type="text" required
                                class="form-control focus:ring-primary-500 focus:border-primary-500"
                                placeholder="John Smith" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                                class="form-control focus:ring-primary-500 focus:border-primary-500"
                                placeholder="you@example.com" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="password" v-model="password" name="password" type="password"
                                autocomplete="new-password" required
                                class="form-control focus:ring-primary-500 focus:border-primary-500"
                                placeholder="••••••••" />
                            <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
                        </div>
                    </div>

                    <div>
                        <label for="business-name" class="block text-sm font-medium text-gray-700">Business name
                            (optional)</label>
                        <div class="mt-1">
                            <input id="business-name" v-model="businessName" name="business-name" type="text"
                                class="form-control focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Your business name" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="terms" v-model="acceptedTerms" name="terms" type="checkbox" required
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="terms" class="text-gray-600">
                                    I agree to the <a href="#" class="text-primary-600 hover:text-primary-500">Terms of
                                        Service</a> and <a href="#"
                                        class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" :disabled="authStore.loading || !acceptedTerms"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out disabled:opacity-50">
                            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

                <div class="mt-8">
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
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4" />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853" />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05" />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335" />
                            </svg>
                        </button>
                        <button type="button"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const businessName = ref('');
const acceptedTerms = ref(false);

const handleRegister = async () => {
    await authStore.register({
        name: name.value,
        email: email.value,
        password: password.value,
        businessName: businessName.value || undefined
    });
};
</script>