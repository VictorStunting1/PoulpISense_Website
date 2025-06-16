<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

// Accepter les données du parent
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isDarkMode = computed(() => {
  // Détecter le mode sombre depuis le parent ou les classes CSS
  return document.querySelector('.dashboard-page')?.classList.contains('dark-mode') || false
})

// Modifier les options du graphique :
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      grid: {
        color: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderColor: isDarkMode.value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      },
      ticks: {
        color: isDarkMode.value ? '#ffffff' : '#666666',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: '500'
        }
      },
      title: {
        display: true,
        text: 'Temps',
        color: isDarkMode.value ? '#DFD8F7' : '#2d3748',
        font: {
          family: 'Inter, sans-serif',
          size: 14,
          weight: '600'
        }
      }
    },
    y: {
      display: true,
      grid: {
        color: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderColor: isDarkMode.value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      },
      ticks: {
        color: isDarkMode.value ? '#ffffff' : '#666666',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: '500'
        }
      },
      title: {
        display: true,
        text: 'Valeurs',
        color: isDarkMode.value ? '#DFD8F7' : '#2d3748',
        font: {
          family: 'Inter, sans-serif',
          size: 14,
          weight: '600'
        }
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: isDarkMode.value ? '#ffffff' : '#2d3748',
        font: {
          family: 'Inter, sans-serif',
          size: 13,
          weight: '600'
        },
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20
      }
    },
    title: {
      display: true,
      text: 'Mesures par capteur',
      color: isDarkMode.value ? '#DFD8F7' : '#2d3748',
      font: {
        family: 'Inter, sans-serif',
        size: 16,
        weight: '700'
      },
      padding: {
        top: 10,
        bottom: 30
      }
    },
    tooltip: {
      backgroundColor: isDarkMode.value ? 'rgba(26, 32, 44, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      titleColor: isDarkMode.value ? '#DFD8F7' : '#2d3748',
      bodyColor: isDarkMode.value ? '#ffffff' : '#4a5568',
      borderColor: isDarkMode.value ? 'rgba(172, 153, 234, 0.3)' : 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      titleFont: {
        family: 'Inter, sans-serif',
        size: 14,
        weight: '600'
      },
      bodyFont: {
        family: 'Inter, sans-serif',
        size: 13,
        weight: '500'
      }
    }
  }
}))
</script>

<template>
  <div style="height: 400px;">
    <Line :data="data" :options="chartOptions" />
  </div>
</template>