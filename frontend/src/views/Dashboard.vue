<template>
  <div>
    <h2>Dashboard</h2>

    <!-- Sélecteur d'appareil -->
    <div>
      <label for="device-selector">Sélectionnez un appareil :</label>
      <select id="device-selector" v-model="selectedDeviceId" @change="onDeviceChange">
        <option v-for="device in userDevices" :key="device.id" :value="device.id">
          {{ device.nom }}
        </option>
      </select>
    </div>

    <!-- Affichage des données de l'appareil sélectionné -->
    <div v-if="selectedDevice" class="device-details">
      <h3>Appareil sélectionné : {{ selectedDevice.nom }}</h3>
      <p>{{ selectedDevice.description }}</p>
      <p>Localisation : {{ selectedDevice.localisation?.description }}</p>
      
      <div v-if="loading" class="loading">Chargement des mesures...</div>
      <div v-else-if="measurements.length === 0" class="no-data">Aucune mesure disponible pour cet appareil</div>
      <div v-else>
        <h4>Mesures ({{ measurements.length }})</h4>
        <!-- La clé :key force la recréation du composant quand selectedDeviceId change -->
        <DeviceChart :key="selectedDeviceId" :data="getChartData(measurements)" />
      </div>
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
const measurements = ref([]) // Mesures de l'appareil sélectionné
const loading = ref(false) // Indicateur de chargement

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
    console.log('Appareils récupérés:', userDevices.value)
    
    if (userDevices.value.length > 0) {
      selectedDeviceId.value = userDevices.value[0].id // Utiliser id plutôt que deviceId
      selectedDevice.value = userDevices.value[0]
      await fetchDeviceMeasurements(selectedDeviceId.value) // Charger les mesures du premier appareil
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des appareils utilisateur :', error)
  }
}

// Fonction pour récupérer les mesures d'un appareil spécifique
async function fetchDeviceMeasurements(deviceId) {
  if (!deviceId) return
  
  loading.value = true
  measurements.value = []
  
  try {
    const BASE_API_URL = "http://localhost:3001/api"
    const res = await axios.get(`${BASE_API_URL}/measurements/device/${deviceId}`)
    measurements.value = res.data.$values || res.data
    console.log(`Mesures récupérées pour l'appareil ${deviceId}:`, measurements.value)
  } catch (error) {
    console.error(`Erreur lors de la récupération des mesures pour l'appareil ${deviceId}:`, error)
  } finally {
    loading.value = false
  }
}

// Fonction appelée lorsque l'utilisateur change d'appareil
async function onDeviceChange() {
  console.log('Appareil sélectionné:', selectedDeviceId.value)
  selectedDevice.value = userDevices.value.find(device => device.id === selectedDeviceId.value)
  
  if (selectedDevice.value) {
    await fetchDeviceMeasurements(selectedDeviceId.value)
  }
}

// Génère les données pour le graphique
function getChartData(measurements) {
  if (!measurements || !measurements.length) {
    return {
      labels: [],
      datasets: []
    }
  }
  
  const sortedMeasurements = [...measurements].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  )
  
  return {
    labels: sortedMeasurements.map(m => new Date(m.timestamp).toLocaleString('fr-FR')),
    datasets: [
      {
        label: 'Température (°C)',
        data: sortedMeasurements.map(m => m.temperature),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'pH',
        data: sortedMeasurements.map(m => m.ph),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Turbidité',
        data: sortedMeasurements.map(m => m.turbidity),
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

<style scoped>
.device-details {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #1565c0;
  color: white;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #e0e0e0;
  font-style: italic;
}
</style>