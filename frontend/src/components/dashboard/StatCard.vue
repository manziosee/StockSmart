<template>
  <div
    class="bg-white overflow-hidden shadow rounded-lg"
    :class="{ 'cursor-pointer hover:shadow-md transition-shadow': to }"
    @click="navigateTo"
  >
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div
            class="h-12 w-12 rounded-md flex items-center justify-center"
            :class="`bg-${colorClass}-100 text-${colorClass}-600`"
          >
            <component :is="iconComponent" class="h-6 w-6" />
          </div>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ title }}
            </dt>
            <dd>
              <div class="text-lg font-semibold text-gray-900">
                {{ value }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div
      v-if="change !== undefined"
      class="bg-gray-50 px-5 py-3"
      :class="changeIsPositive ? 'text-green-600' : 'text-red-600'"
    >
      <div class="text-sm flex items-center">
        <svg
          v-if="changeIsPositive"
          class="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        <svg
          v-else
          class="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
        <span>{{ Math.abs(change) }}% from last period</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  value: string
  icon: string
  color: string
  change?: number
  to?: string
}>()

const router = useRouter()

const colorClass = computed(() => {
  const colorMap: Record<string, string> = {
    primary: 'primary',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    info: 'blue',
  }
  return colorMap[props.color] || 'gray'
})

const iconComponent = computed(() => {
  const icons: Record<string, any> = {
    'currency-dollar': defineComponent({
      render: () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        }),
      ]),
    }),
    'shopping-bag': defineComponent({
      render: () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
        }),
      ]),
    }),
    'exclamation': defineComponent({
      render: () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        }),
      ]),
    }),
    'collection': defineComponent({
      render: () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        }),
      ]),
    }),
  }
  
  return icons[props.icon] || null
})

const changeIsPositive = computed(() => {
  return props.change !== undefined && props.change >= 0
})

const navigateTo = () => {
  if (props.to) {
    router.push(props.to)
  }
}
</script>