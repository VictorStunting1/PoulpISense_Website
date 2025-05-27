<template>
  <div class="dashboard-container">
    <header>
      <h1 class="dashboard-title">
        <i class="fas fa-tachometer-alt"></i> Tableau de bord
      </h1>
    </header>

    <div class="device-icon-selector" v-if="userDevices.length > 0">
          <button
            v-for="device in userDevices"
            :key="device.id"
            class="device-icon-btn"
            :class="{ selected: selectedDeviceId === device.id }"
            @click="selectDevice(device)"
            :aria-label="device.nom"
          >
            <span class="device-icon-circle">
              <i class="fas fa-robot"></i>
            </span>
            <span class="device-icon-name">{{ device.nom }}</span>
          </button>
        </div>

    <div v-if="!userDevices.length" class="no-devices">
      <div class="empty-state">
        <i class="fas fa-sensor-triangle-exclamation empty-icon"></i>
        <h3>Aucun appareil disponible</h3>
        <p>Vous n'avez pas encore d'appareils associés à votre compte.</p>
      </div>
    </div>

    <div v-else-if="!selectedDevice" class="loading-container">
      <div class="empty-state">
        <i class="fas fa-mouse-pointer empty-icon"></i>
        <h3>Veuillez sélectionner un appareil</h3>
        <p>Choisissez un appareil ci-dessus pour afficher ses données.</p>
      </div>
    </div>

    <div v-else class="dashboard-content">
      <!-- Carte d'informations de l'appareil -->
      <div class="device-info-card">
        <div class="device-header">
          <h2>{{ selectedDevice.nom }}</h2>
          <span class="device-status online">
            <i class="fas fa-circle"></i> En ligne
          </span>
        </div>
        <div class="device-body">
          <div class="info-row">
            <div class="info-label">
              <i class="fas fa-info-circle"></i> Description
            </div>
            <div class="info-value">{{ selectedDevice.description }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">
              <i class="fas fa-map-marker-alt"></i> Localisation
            </div>
            <div class="info-value">{{ selectedDevice.localisation?.description || 'Non définie' }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">
              <i class="fas fa-calendar-alt"></i> Installation
            </div>
            <div class="info-value">{{ formatDate(selectedDevice.dateInstallation) }}</div>
          </div>
        </div>
      </div>

      <!-- Cartes de données en temps réel -->
      <div class="metrics-cards">
        <div v-if="latestMeasurement" class="metric-card temperature">
          <div class="metric-icon">
            <i class="fas fa-temperature-high"></i>
          </div>
          <div class="metric-data">
            <div class="metric-value">{{ latestMeasurement.temperature }}°C</div>
            <div class="metric-label">Température</div>
          </div>
        </div>

        <div v-if="latestMeasurement" class="metric-card ph">
          <div class="metric-icon">
            <i class="fas fa-flask"></i>
          </div>
          <div class="metric-data">
            <div class="metric-value">{{ latestMeasurement.ph }}</div>
            <div class="metric-label">pH</div>
          </div>
        </div>

        <div v-if="latestMeasurement" class="metric-card turbidity">
          <div class="metric-icon">
            <i class="fas fa-water"></i>
          </div>
          <div class="metric-data">
            <div class="metric-value">{{ latestMeasurement.turbidity }}</div>
            <div class="metric-label">Turbidité</div>
          </div>
        </div>
      </div>

      <!-- Graphique principal -->
      <div class="chart-container">
        <div class="chart-header">
          <h3>Historique des mesures</h3>
          <div class="chart-controls">
            <button @click="setTimeRange('day')" :class="{ active: timeRange === 'day' }">Jour</button>
            <button @click="setTimeRange('week')" :class="{ active: timeRange === 'week' }">Semaine</button>
            <button @click="setTimeRange('month')" :class="{ active: timeRange === 'month' }">Mois</button>
          </div>
        </div>
        
        <div v-if="loading" class="loading-chart">
          <div class="spinner"></div>
          <p>Chargement des mesures...</p>
        </div>
        <div v-else-if="measurements.length === 0" class="no-data">
          <i class="fas fa-chart-line empty-icon"></i>
          <p>Aucune donnée disponible pour cet appareil</p>
        </div>
        <div v-else class="chart-wrapper">
          <DeviceChart :key="selectedDeviceId" :data="getChartData(filteredMeasurements)" />
        </div>
      </div>

      <!-- Dernières mesures (tableau) -->
      <div class="latest-data-container">
        <h3>Dernières mesures</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Heure</th>
                <th>Température (°C)</th>
                <th>pH</th>
                <th>Turbidité</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(measure, index) in sortedMeasurements.slice(0, 5)" :key="index">
                <td>{{ formatDateOnly(measure.timestamp) }}</td>
                <td>{{ formatTimeOnly(measure.timestamp) }}</td>
                <td>{{ measure.temperature }}</td>
                <td>{{ measure.ph }}</td>
                <td>{{ measure.turbidity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import DeviceChart from '../components/DeviceChart.vue'

const router = useRouter()
const userDevices = ref([]) 
const selectedDeviceId = ref(null) 
const selectedDevice = ref(null) 
const measurements = ref([]) 
const loading = ref(false) 
const timeRange = ref('week') // 'day', 'week', 'month'

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
    

  } catch (error) {
    console.error('Erreur lors de la récupération des appareils utilisateur :', error)
  }
}

function selectDevice(device) {
  selectedDeviceId.value = device.id
  selectedDevice.value = device
  fetchDeviceMeasurements(device.id)
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

// Fonctions de formatage de date
function formatDate(dateString) {
  if (!dateString) return 'Non disponible'
  return new Date(dateString).toLocaleDateString('fr-FR', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  })
}

function formatDateOnly(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

function formatTimeOnly(dateString) {
  return new Date(dateString).toLocaleTimeString('fr-FR', { 
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fonction appelée lorsque l'utilisateur change d'appareil
async function onDeviceChange() {
  console.log('Appareil sélectionné:', selectedDeviceId.value)
  selectedDevice.value = userDevices.value.find(device => device.id === selectedDeviceId.value)
  
  if (selectedDevice.value) {
    await fetchDeviceMeasurements(selectedDeviceId.value)
  }
}

// Changer la plage de temps pour le graphique
function setTimeRange(range) {
  timeRange.value = range
}

// Obtenir les mesures filtrées selon la plage de temps sélectionnée
const filteredMeasurements = computed(() => {
  if (!measurements.value.length) return []
  
  const now = new Date()
  let cutoffDate = new Date()
  
  switch (timeRange.value) {
    case 'day':
      cutoffDate.setDate(now.getDate() - 1)
      break
    case 'week':
      cutoffDate.setDate(now.getDate() - 7)
      break
    case 'month':
      cutoffDate.setMonth(now.getMonth() - 1)
      break
    default:
      cutoffDate.setDate(now.getDate() - 7)
  }
  
  return measurements.value.filter(m => new Date(m.timestamp) >= cutoffDate)
})

// Tri des mesures par date (les plus récentes d'abord)
const sortedMeasurements = computed(() => {
  if (!measurements.value.length) return []
  return [...measurements.value].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )
})

// Obtenir la dernière mesure pour affichage en temps réel
const latestMeasurement = computed(() => {
  if (!sortedMeasurements.value.length) return null
  return sortedMeasurements.value[0]
})

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
    labels: sortedMeasurements.map(m => {
      const date = new Date(m.timestamp)
      return timeRange.value === 'day' 
        ? date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' })
    }),
    datasets: [
      {
        label: 'Température (°C)',
        data: sortedMeasurements.map(m => m.temperature),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4,
      },
      {
        label: 'pH',
        data: sortedMeasurements.map(m => m.ph),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4,
      },
      {
        label: 'Turbidité',
        data: sortedMeasurements.map(m => m.turbidity),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4,
      }
    ]
  }
}

onMounted(() => {
  fetchUserDevices()
})
</script>

<style scoped>
/* Styles généraux */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-title {
  font-size: 2.2rem;
  color: #1565c0;
  margin: 0;
  font-weight: 600;
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

/* Sélecteur d'appareil */
.device-selector-container {
  display: flex;
  align-items: center;
}

.device-label {
  margin-right: 10px;
  font-weight: 500;
}

.custom-select {
  position: relative;
  min-width: 200px;
}

.select-styled {
  appearance: none;
  width: 100%;
  padding: 10px 35px 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

.select-styled:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
}

.select-arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
}

/* Carte d'informations de l'appareil */
.device-info-card {
  grid-column: 1 / span 4;
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.device-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.device-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

.device-status {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.device-status.online i {
  color: #4CAF50;
  margin-right: 5px;
  font-size: 0.8rem;
}

.device-body {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.info-row {
  width: 33.333%;
  padding: 10px 20px;
}

.info-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.info-label i {
  margin-right: 8px;
  font-size: 1rem;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 500;
}

/* Cartes de métriques */
.metrics-cards {
  grid-column: 1 / span 4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.metric-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-5px);
}

.metric-card.temperature {
  background: linear-gradient(135deg, #ff9800, #ff5722);
}

.metric-card.ph {
  background: linear-gradient(135deg, #2196f3, #03a9f4);
}

.metric-card.turbidity {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
}

.metric-icon {
  font-size: 2.5rem;
  margin-right: 20px;
  opacity: 0.8;
}

.metric-data {
  flex-grow: 1;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 1rem;
  opacity: 0.8;
}

/* Conteneur du graphique */
.chart-container {
  grid-column: 1 / span 4;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  margin: 0;
  font-weight: 500;
}

.chart-controls button {
  background: none;
  border: 1px solid #ddd;
  padding: 5px 15px;
  margin-left: 5px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.chart-controls button.active {
  background-color: #1565c0;
  color: white;
  border-color: #1565c0;
}

.chart-wrapper {
  height: 350px;
}

/* Tableau des dernières données */
.latest-data-container {
  grid-column: 1 / span 4;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.latest-data-container h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 500;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f8f8;
  font-weight: 500;
  color: #666;
}

.data-table tbody tr:hover {
  background-color: #f5f5f5;
}

/* États vides et chargement */
.loading-container, .no-devices, .loading-chart, .no-data {
  grid-column: 1 / span 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #1565c0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.empty-icon {
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
}

.empty-state h3 {
  margin-bottom: 10px;
}

.empty-state p {
  color: #666;
}

.device-icon-selector {
  display: flex;
  gap: 22px;
  margin: 30px 0 25px 0;
}

.device-icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  transition: transform 0.15s;
  padding: 0;
}

.device-icon-btn:focus .device-icon-circle,
.device-icon-btn:hover .device-icon-circle {
  box-shadow: 0 4px 18px rgba(33,150,243,0.18), 0 0 0 3px #1976d2;
}

.device-icon-btn:focus .device-icon-name,
.device-icon-btn:hover .device-icon-name {
  color: white;
}

.device-icon-btn.selected .device-icon-circle {
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  color: #fff;
  box-shadow: 0 4px 18px rgba(33,150,243,0.30), 0 0 0 4px #1976d2;
  transform: scale(1.1);
}

.device-icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e3f2fd 40%, #bbdefb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.1rem;
  color: #1976d2;
  margin-bottom: 7px;
  box-shadow: 0 2px 10px rgba(21,101,192,0.10);
  transition: box-shadow 0.18s, background 0.18s, color 0.18s, transform 0.18s;
}

.device-icon-btn.selected .device-icon-name {
  color: #1976d2;
  font-weight: 700;
  text-shadow: 0 1px 6px rgba(21,101,192,0.08);
}

.device-icon-name {
  font-size: 1rem;
  color: #444;
  margin-top: 2px;
  text-align: center;
  word-break: break-all;
  font-weight: 500;
  letter-spacing: 0.02em;
}

@media (max-width: 700px) {
  .device-icon-selector {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .device-icon-circle {
    width: 48px;
    height: 48px;
    font-size: 1.3rem;
  }
  .device-icon-name {
    font-size: 0.9rem;
  }
}


@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsivité */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .device-selector-container {
    width: 100%;
    margin-top: 15px;
  }

  .custom-select {
    width: 100%;
  }

  .info-row {
    width: 100%;
  }

  .metrics-cards {
    grid-template-columns: 1fr;
  }
}
</style>