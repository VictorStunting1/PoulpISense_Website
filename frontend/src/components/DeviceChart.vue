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
    <!-- Header avec contrôles -->
    <div class="chart-header">
      <h3 class="chart-title">
        <i class="fas fa-chart-line"></i>
        Mesures par capteur
      </h3>
      
      <!-- Contrôles de zoom repositionnés -->
      <div class="header-controls">
        <div class="zoom-controls" v-if="isZoomed">
          <button @click="resetZoom" class="reset-zoom-btn">
            <span>Réinitialiser le zoom</span>
          </button>
        </div>
      </div>
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

/* Header du graphique */
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chart-container.dark-mode .chart-title {
  color: #f7fafc;
}

.chart-title i {
  color: #6366f1;
  font-size: 1.1rem;
}

.chart-container.dark-mode .chart-title i {
  color: #818cf8;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reset-zoom-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 12px rgba(220, 38, 38, 0.25),
    0 2px 4px rgba(220, 38, 38, 0.1);
  position: relative;
  overflow: hidden;
}

.reset-zoom-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.reset-zoom-btn:hover::before {
  left: 100%;
}

.reset-zoom-btn:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 8px 20px rgba(220, 38, 38, 0.35),
    0 4px 8px rgba(220, 38, 38, 0.2);
}

.reset-zoom-btn:active {
  transform: translateY(0) scale(0.98);
  transition: all 0.1s ease;
}

/* Mode sombre pour le bouton */
.chart-container.dark-mode .reset-zoom-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626) !important;
  color: #ffffff !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
  box-shadow: 
    0 4px 12px rgba(239, 68, 68, 0.4) !important,
    0 2px 4px rgba(239, 68, 68, 0.2) !important;
}

.chart-container.dark-mode .reset-zoom-btn::before {
  background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.2), transparent);
}

.chart-container.dark-mode .reset-zoom-btn:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
  border-color: rgba(239, 68, 68, 0.5) !important;
  box-shadow: 
    0 8px 20px rgba(239, 68, 68, 0.6) !important,
    0 4px 8px rgba(239, 68, 68, 0.3) !important;
}

.reset-zoom-btn i {
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.reset-zoom-btn:hover i {
  transform: rotate(-90deg) scale(1.1);
}

.reset-zoom-btn span {
  font-weight: 600;
  letter-spacing: 0.025em;
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
  transition: all 0.3s ease;
}

.chart-container.dark-mode .zoom-instructions {
  background: rgba(129, 140, 248, 0.15);
  border-color: rgba(129, 140, 248, 0.3);
}

/* État actif des instructions quand zoom actif */
.chart-container:has(.reset-zoom-btn) .zoom-instructions {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

.chart-container.dark-mode:has(.reset-zoom-btn) .zoom-instructions {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.4);
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: #4a5568;
  font-weight: 500;
  transition: color 0.3s ease;
}

.chart-container.dark-mode .instruction-item {
  color: #e2e8f0;
}

.instruction-item i {
  color: #6366f1;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.chart-container.dark-mode .instruction-item i {
  color: #818cf8;
}

/* Couleur verte quand zoom actif */
.chart-container:has(.reset-zoom-btn) .instruction-item i {
  color: #22c55e;
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
  transition: background-color 0.3s ease;
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
  animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Effet de pulsation subtile */
.reset-zoom-btn {
  animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
             pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 
      0 4px 12px rgba(220, 38, 38, 0.25),
      0 2px 4px rgba(220, 38, 38, 0.1);
  }
  50% {
    box-shadow: 
      0 4px 12px rgba(220, 38, 38, 0.35),
      0 2px 4px rgba(220, 38, 38, 0.15);
  }
}

.chart-container.dark-mode .reset-zoom-btn {
  animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
             pulseDark 2s infinite;
}

@keyframes pulseDark {
  0%, 100% {
    box-shadow: 
      0 4px 12px rgba(15, 23, 42, 0.4),
      0 2px 4px rgba(129, 140, 248, 0.1);
  }
  50% {
    box-shadow: 
      0 4px 12px rgba(15, 23, 42, 0.6),
      0 2px 4px rgba(129, 140, 248, 0.2);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .chart-container {
    padding: 1rem;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .header-controls {
    justify-content: center;
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
  
  .reset-zoom-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .zoom-instructions {
    gap: 0.5rem;
  }
  
  .instruction-item {
    font-size: 0.75rem;
  }
  
  .reset-zoom-btn span {
    display: none;
  }
  
  .reset-zoom-btn {
    padding: 0.75rem;
    min-width: 44px;
    justify-content: center;
  }
}

/* État focus pour l'accessibilité */
.reset-zoom-btn:focus {
  outline: none;
  ring: 2px;
  ring-color: rgba(99, 102, 241, 0.5);
  ring-offset: 2px;
}

.chart-container.dark-mode .reset-zoom-btn:focus {
  ring-color: rgba(129, 140, 248, 0.5);
}
</style>