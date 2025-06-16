<script setup>
import { ref, computed, watch } from 'vue'
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
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  zoomPlugin
)

// Props avec ajout du mode sombre
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

// Refs pour contrôler le graphique
const chartRef = ref(null)
const isZoomed = ref(false)

// Fonctions de zoom
const resetZoom = () => {
  if (chartRef.value?.chart) {
    chartRef.value.chart.resetZoom()
    isZoomed.value = false
  }
}

const onZoomComplete = () => {
  isZoomed.value = true
}

// Options du graphique avec couleurs améliorées
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
        color: props.isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
        borderColor: props.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
        lineWidth: 1
      },
      ticks: {
        color: props.isDarkMode ? '#e2e8f0' : '#4a5568',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: '500'
        }
      },
      title: {
        display: true,
        text: 'Temps',
        color: props.isDarkMode ? '#f7fafc' : '#2d3748',
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
        color: props.isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
        borderColor: props.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
        lineWidth: 1
      },
      ticks: {
        color: props.isDarkMode ? '#e2e8f0' : '#4a5568',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: '500'
        }
      },
      title: {
        display: true,
        text: 'Valeurs',
        color: props.isDarkMode ? '#f7fafc' : '#2d3748',
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
        color: props.isDarkMode ? '#f7fafc' : '#2d3748',
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
      color: props.isDarkMode ? '#f7fafc' : '#2d3748',
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
      backgroundColor: props.isDarkMode ? 'rgba(26, 32, 44, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      titleColor: props.isDarkMode ? '#f7fafc' : '#2d3748',
      bodyColor: props.isDarkMode ? '#e2e8f0' : '#4a5568',
      borderColor: props.isDarkMode ? 'rgba(129, 140, 248, 0.5)' : 'rgba(99, 102, 241, 0.3)',
      borderWidth: 2,
      cornerRadius: 12,
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
    },
    zoom: {
      limits: {
        x: { min: 'original', max: 'original' },
        y: { min: 'original', max: 'original' }
      },
      pan: {
        enabled: true,
        mode: 'x',
        modifierKey: 'ctrl'
      },
      zoom: {
        wheel: {
          enabled: true,
          speed: 0.1
        },
        pinch: {
          enabled: true
        },
        mode: 'x',
        onZoomComplete: onZoomComplete
      }
    }
  }
}))

// Données enrichies avec couleurs améliorées
const enhancedChartData = computed(() => {
  if (!props.data || !props.data.datasets) return { datasets: [], labels: [] }
  
  // Couleurs avec meilleur contraste
  const colors = {
    temperature: {
      border: '#dc2626', // Rouge plus foncé
      background: 'rgba(220, 38, 38, 0.1)'
    },
    ph: {
      border: '#2563eb', // Bleu plus foncé
      background: 'rgba(37, 99, 235, 0.1)'
    },
    turbidity: {
      border: '#059669', // Vert plus foncé
      background: 'rgba(5, 150, 105, 0.1)'
    }
  }

  // Mode sombre - couleurs plus vives
  if (props.isDarkMode) {
    colors.temperature.border = '#f87171'
    colors.temperature.background = 'rgba(248, 113, 113, 0.2)'
    colors.ph.border = '#60a5fa'
    colors.ph.background = 'rgba(96, 165, 250, 0.2)'
    colors.turbidity.border = '#34d399'
    colors.turbidity.background = 'rgba(52, 211, 153, 0.2)'
  }

  return {
    ...props.data,
    datasets: props.data.datasets.map((dataset, index) => {
      // Déterminer le type de donnée
      let colorConfig = colors.temperature // Par défaut
      
      if (dataset.label.toLowerCase().includes('ph')) {
        colorConfig = colors.ph
      } else if (dataset.label.toLowerCase().includes('turb')) {
        colorConfig = colors.turbidity
      }

      return {
        ...dataset,
        borderColor: colorConfig.border,
        backgroundColor: colorConfig.background,
        pointBackgroundColor: colorConfig.border,
        pointBorderColor: props.isDarkMode ? '#1a202c' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }
    })
  }
})

// Watcher pour mettre à jour le graphique lors du changement de thème
watch(() => props.isDarkMode, () => {
  if (chartRef.value?.chart) {
    chartRef.value.chart.update()
  }
})
</script>

<template>
  <div class="chart-container" :class="{ 'dark-mode': isDarkMode }">
    <!-- Contrôles de zoom -->
    <div class="zoom-controls" v-if="isZoomed">
      <button @click="resetZoom" class="reset-zoom-btn">
        <i class="fas fa-search-minus"></i>
        Réinitialiser le zoom
      </button>
    </div>
    
    <!-- Instructions de zoom -->
    <div class="zoom-instructions">
      <div class="instruction-item">
        <i class="fas fa-mouse"></i>
        <span>Molette pour zoomer</span>
      </div>
      <div class="instruction-item">
        <i class="fas fa-hand-paper"></i>
        <span>Ctrl + glisser pour déplacer</span>
      </div>
      <div class="instruction-item mobile-only">
        <i class="fas fa-expand-arrows-alt"></i>
        <span>Pincer pour zoomer</span>
      </div>
    </div>
    
    <!-- Graphique -->
    <div class="chart-wrapper">
      <Line 
        ref="chartRef"
        :data="enhancedChartData" 
        :options="chartOptions" 
      />
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.chart-container.dark-mode {
  background: rgba(26, 32, 44, 0.9);
  border-color: rgba(129, 140, 248, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
}

.zoom-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.reset-zoom-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.reset-zoom-btn:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
}

.chart-container.dark-mode .reset-zoom-btn {
  background: #f87171;
  color: #1a202c;
  box-shadow: 0 4px 12px rgba(248, 113, 113, 0.3);
}

.chart-container.dark-mode .reset-zoom-btn:hover {
  background: #fca5a5;
  box-shadow: 0 6px 16px rgba(248, 113, 113, 0.4);
}

.zoom-instructions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(99, 102, 241, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.chart-container.dark-mode .zoom-instructions {
  background: rgba(129, 140, 248, 0.15);
  border-color: rgba(129, 140, 248, 0.3);
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: #4a5568;
  font-weight: 500;
}

.chart-container.dark-mode .instruction-item {
  color: #e2e8f0;
}

.instruction-item i {
  color: #6366f1;
  font-size: 1rem;
}

.chart-container.dark-mode .instruction-item i {
  color: #818cf8;
}

.mobile-only {
  display: none;
}

.chart-wrapper {
  height: 400px;
  position: relative;
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
}

.chart-container.dark-mode .chart-wrapper {
  background: rgba(45, 55, 72, 0.5);
  backdrop-filter: blur(10px);
}

/* Hover effects */
.chart-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.chart-container.dark-mode:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

/* Animation pour le bouton de reset */
.reset-zoom-btn {
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .chart-container {
    padding: 1rem;
  }
  
  .zoom-controls {
    position: static;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .zoom-instructions {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .mobile-only {
    display: flex;
  }
  
  .instruction-item {
    justify-content: center;
  }
  
  .chart-wrapper {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .zoom-instructions {
    gap: 0.5rem;
  }
  
  .instruction-item {
    font-size: 0.75rem;
  }
  
  .reset-zoom-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
}
</style>