<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    
    <div class="lg:pl-64 flex flex-col">
      <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <main class="flex-1 p-4 sm:p-6 md:p-8">
        <slot></slot>
      </main>
      
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Footer from './Footer.vue'

const sidebarOpen = ref(false)
</script>