<template>
  <div class="h-full">
    <Line 
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  data: Array<{ date: string; sales: number }>
}>()

const chartData = computed(() => {
  return {
    labels: props.data.map(item => {
      const date = new Date(item.date)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(15, 82, 186, 0.1)',
        borderColor: '#0F52BA',
        borderWidth: 2,
        pointBackgroundColor: '#0F52BA',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0F52BA',
        data: props.data.map(item => item.sales),
        fill: 'start',
        tension: 0.4
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(15, 82, 186, 0.9)',
      titleFont: {
        size: 14,
        style: 'bold'
      },
      bodyFont: {
        size: 13,
        style: 'normal'
      },
      padding: 10,
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          return `$${context.parsed.y.toLocaleString()}`
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        callback: function(value: any) {
          return `$${value.toLocaleString()}`
        }
      }
    }
  }
}
</script>