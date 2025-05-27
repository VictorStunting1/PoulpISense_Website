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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Mesures par capteur' }
  }
}
</script>

<template>
  <div style="height: 400px;">
    <Line :data="data" :options="chartOptions" />
  </div>
</template>