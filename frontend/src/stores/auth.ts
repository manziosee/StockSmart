import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_URL } from '../config'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  role?: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role || '')

  // Initialize auth state from localStorage
  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }

  // Login user
  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)
      
      const { token: newToken, user: userData } = response.data
      
      // Save to store
      token.value = newToken
      user.value = userData
      
      // Save to localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Set Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      // Redirect to dashboard or requested page
      const redirectPath = router.currentRoute.value.query.redirect as string || '/dashboard'
      router.push(redirectPath)
      
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  // Register user
  const register = async (data: RegisterData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data)
      
      const { token: newToken, user: userData } = response.data
      
      // Save to store
      token.value = newToken
      user.value = userData
      
      // Save to localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Set Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      // Redirect to dashboard
      router.push('/dashboard')
      
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  // Logout user
  const logout = () => {
    // Clear store
    token.value = null
    user.value = null
    
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Clear Authorization header
    delete axios.defaults.headers.common['Authorization']
    
    // Redirect to login
    router.push('/login')
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    userRole,
    initAuth,
    login,
    register,
    logout
  }
})