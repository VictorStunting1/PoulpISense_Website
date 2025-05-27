<template>
  <div class="chart-card">
    <h3>{{ device.nom }}</h3>
    <LineChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({
  device: Object
})

const chartData = computed(() => {
  const labels = props.device.measurements.map(m => new Date(m.timestamp).toLocaleString('fr-FR'))

  return {
    labels,
    datasets: [
      {
        label: 'Température (°C)',
        data: props.device.measurements.map(m => m.temperature),
        borderColor: 'red',
        fill: false
      },
      {
        label: 'pH',
        data: props.device.measurements.map(m => m.ph),
        borderColor: 'green',
        fill: false
      },
      {
        label: 'Turbidité',
        data: props.device.measurements.map(m => m.turbidity),
        borderColor: 'blue',
        fill: false
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Mesures du dispositif' }
  }
}

console.log('Rendering chart for', props.device.nom)
</script>
