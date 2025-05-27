<script setup>
import { ref, onMounted, watch } from 'vue'
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

const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Température dans le temps' }
  }
}

const measurements = ref([])

async function fetchMeasurements() {
  try {
    const response = await fetch('http://ssssirhcwan.ddns.net:40000/measurements')
    const data = await response.json()
    measurements.value = data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}

watch(measurements, (newMeasures) => {
  if (!newMeasures || newMeasures.length === 0) {
    chartData.value = { labels: [], datasets: [] }
    return
  }

  const sorted = [...newMeasures].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  chartData.value.labels = sorted.map(m => new Date(m.timestamp).toLocaleString())
  chartData.value.datasets = [
    {
      label: 'Température (°C)',
      data: sorted.map(m => m.temperature),
      borderColor: '#3e95cd',
      backgroundColor: 'rgba(62, 149, 205, 0.4)',
      fill: true,
      tension: 0.3,
      pointRadius: 2,
    }
  ]
}, { immediate: true })

onMounted(() => {
  fetchMeasurements()
})
</script>

<template>
  <div style="height: 400px;">
    <Line :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>
