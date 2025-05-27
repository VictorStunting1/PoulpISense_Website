<template>
  <div>
    <h2>Dashboard</h2>

    <!-- Sélecteur d'appareil -->
    <div>
      <label for="device-selector">Sélectionnez un appareil :</label>
      <select id="device-selector" v-model="selectedDeviceId" @change="onDeviceChange">
        <option v-for="device in userDevices" :key="device.deviceId" :value="device.deviceId">
          {{ device.nom }}
        </option>
      </select>
    </div>

    <!-- Affichage des données de l'appareil sélectionné -->
    <div v-if="selectedDevice">
      <h3>Appareil sélectionné : {{ selectedDevice.nom }}</h3>
      <DeviceChart :data="getChartData(selectedDevice.measurements)" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import DeviceChart from '../components/DeviceChart.vue'

const router = useRouter()
const userDevices = ref([]) // Liste des appareils de l'utilisateur
const selectedDeviceId = ref(null) // ID de l'appareil sélectionné
const selectedDevice = ref(null) // Détails de l'appareil sélectionné

// Fonction pour récupérer les appareils de l'utilisateur connecté
async function fetchUserDevices() {
  const userEmail = localStorage.getItem('userEmail')
  if (!userEmail) {
    router.push('/login')
    return
  }

  try {
    const res = await axios.get(`http://localhost:3001/api/devices/user/${encodeURIComponent(userEmail)}`)
    userDevices.value = res.data
    if (userDevices.value.length > 0) {
      selectedDeviceId.value = userDevices.value[0].deviceId // Sélectionne le premier appareil par défaut
      selectedDevice.value = userDevices.value[0]
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des appareils utilisateur :', error)
  }
}

// Fonction appelée lorsque l'utilisateur change d'appareil
function onDeviceChange() {
  selectedDevice.value = userDevices.value.find(device => device.deviceId === selectedDeviceId.value)
}

// Génère les données pour le graphique
function getChartData(measurements) {
  if (!measurements || !measurements.length) {
    return {
      labels: [],
      datasets: []
    }
  }
  return {
    labels: measurements.map(m => new Date(m.timestamp).toLocaleString('fr-FR')),
    datasets: [
      {
        label: 'Température (°C)',
        data: measurements.map(m => m.temperature),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'pH',
        data: measurements.map(m => m.ph),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Turbidité',
        data: measurements.map(m => m.turbidity),
        borderColor: 'green',
        fill: false,
      }
    ]
  }
}

onMounted(() => {
  fetchUserDevices()
})
</script>