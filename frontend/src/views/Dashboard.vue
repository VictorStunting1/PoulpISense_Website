<template>
  <div class="dashboard-page" :class="{ 'dark-mode': isDarkMode }">

    <!-- Ajouter le composant header au début -->
    <AppHeader :isDarkMode="isDarkMode" @theme-changed="onThemeChanged" />

    <!-- Barre de progression du scroll -->
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- Hero section avec sélecteur d'appareils -->
    <section class="device-selection-hero">
      <div class="hero-background">
        <div class="gradient-overlay"></div>
      </div>
      
      <div class="container">
        <div class="hero-content" v-motion-slide-visible-once-bottom>
          <h2 class="hero-title">Vos Appareils Connectés</h2>
          <p class="hero-description">Sélectionnez un appareil pour visualiser ses données en temps réel</p>
          
          <!-- Sélecteur d'appareils moderne -->
          <div v-if="userDevices.length > 0" class="device-grid">
            <div
              v-for="(device, index) in userDevices"
              :key="device.id"
              class="device-card"
              :class="{ 'selected': selectedDeviceId === device.id }"
              @click="selectDevice(device)"
              v-motion-slide-visible-once-bottom
              :delay="index * 100"
            >
              <div class="device-icon">
                <i class="fas fa-robot"></i>
              </div>
              <div class="device-info">
                <h3 class="device-name">{{ device.nom }}</h3>
                <p class="device-location">{{ device.localisation?.description || 'Localisation non définie' }}</p>
                <div class="device-metrics">
                  <span class="metric-item">
                    <i class="fas fa-thermometer-half"></i>
                    <span>Temp.</span>
                  </span>
                  <span class="metric-item">
                    <i class="fas fa-flask"></i>
                    <span>pH</span>
                  </span>
                  <span class="metric-item">
                    <i class="fas fa-water"></i>
                    <span>Turb.</span>
                  </span>
                </div>
              </div>
              <div class="device-selection-glow"></div>
            </div>
          </div>

          <!-- État vide -->
          <div v-else class="empty-devices" v-motion-slide-visible-once-bottom>
            <div class="empty-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h3>Aucun appareil trouvé</h3>
            <p>Vous n'avez pas encore d'appareils associés à votre compte.</p>
            <router-link to="/devices" class="add-device-btn">
              <i class="fas fa-plus"></i>
              <span>Ajouter un appareil</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Section des données -->
    <section v-if="selectedDevice" class="data-section">
      <div class="container">
        <!-- Carte d'information de l'appareil -->
        <div class="device-info-banner" v-motion-slide-visible-once-bottom>
          <div class="banner-background">
            <div class="banner-gradient"></div>
          </div>
          <div class="banner-content">
            <div class="device-header-info">
              <div class="device-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="device-details">
                <h2 class="device-title">{{ selectedDevice.nom }}</h2>
                <p class="device-description">{{ selectedDevice.description }}</p>
                <div class="device-meta">
                  <span class="meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ selectedDevice.localisation?.description || 'Localisation non définie' }}
                  </span>
                  <span class="meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    Installé le {{ formatDate(selectedDevice.dateInstallation) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Métriques en temps réel -->
        <div class="metrics-section" v-motion-slide-visible-once-bottom :delay="200">
          <h3 class="section-title">
            <i class="fas fa-tachometer-alt"></i>
            Données en Temps Réel
          </h3>
          
          <div class="metrics-grid">
            <div v-if="latestMeasurement" class="metric-card temperature-card">
              <div class="metric-header">
                <div class="metric-icon">
                  <i class="fas fa-thermometer-half"></i>
                </div>
                <div class="metric-trend positive">
                  <i class="fas fa-arrow-up"></i>
                </div>
              </div>
              <div class="metric-content">
                <div class="metric-value">{{ latestMeasurement.temperature }}°C</div>
                <div class="metric-label">Température</div>
                <div class="metric-info">Optimal: 20-25°C</div>
              </div>
              <div class="metric-chart">
                <div class="mini-chart">
                  <div class="chart-bar" style="height: 60%"></div>
                  <div class="chart-bar" style="height: 80%"></div>
                  <div class="chart-bar" style="height: 45%"></div>
                  <div class="chart-bar" style="height: 90%"></div>
                </div>
              </div>
            </div>

            <div v-if="latestMeasurement" class="metric-card ph-card">
              <div class="metric-header">
                <div class="metric-icon">
                  <i class="fas fa-flask"></i>
                </div>
                <div class="metric-trend neutral">
                  <i class="fas fa-minus"></i>
                </div>
              </div>
              <div class="metric-content">
                <div class="metric-value">{{ latestMeasurement.ph }}</div>
                <div class="metric-label">pH</div>
                <div class="metric-info">Optimal: 6.5-8.5</div>
              </div>
              <div class="metric-chart">
                <div class="mini-chart">
                  <div class="chart-bar" style="height: 70%"></div>
                  <div class="chart-bar" style="height: 75%"></div>
                  <div class="chart-bar" style="height: 72%"></div>
                  <div class="chart-bar" style="height: 78%"></div>
                </div>
              </div>
            </div>

            <div v-if="latestMeasurement" class="metric-card turbidity-card">
              <div class="metric-header">
                <div class="metric-icon">
                  <i class="fas fa-water"></i>
                </div>
                <div class="metric-trend negative">
                  <i class="fas fa-arrow-down"></i>
                </div>
              </div>
              <div class="metric-content">
                <div class="metric-value">{{ latestMeasurement.turbidity }}</div>
                <div class="metric-label">Turbidité</div>
                <div class="metric-info">Optimal: < 4 NTU</div>
              </div>
              <div class="metric-chart">
                <div class="mini-chart">
                  <div class="chart-bar" style="height: 40%"></div>
                  <div class="chart-bar" style="height: 35%"></div>
                  <div class="chart-bar" style="height: 30%"></div>
                  <div class="chart-bar" style="height: 25%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Graphique principal -->
        <div class="chart-section" v-motion-slide-visible-once-bottom :delay="400">
          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title-section">
                <h3 class="chart-title">
                  <i class="fas fa-chart-line"></i>
                  Historique des Mesures
                </h3>
                <p class="chart-subtitle">Évolution des paramètres sur {{ getTimeRangeLabel().toLowerCase() }}</p>
              </div>
              
              <div class="chart-controls">
                <div class="time-controls">
                  <button 
                    @click="setTimeRange('day')" 
                    :class="{ active: timeRange === 'day' }"
                    class="time-btn"
                  >
                    24h
                  </button>
                  <button 
                    @click="setTimeRange('week')" 
                    :class="{ active: timeRange === 'week' }"
                    class="time-btn"
                  >
                    7j
                  </button>
                  <button 
                    @click="setTimeRange('month')" 
                    :class="{ active: timeRange === 'month' }"
                    class="time-btn"
                  >
                    30j
                  </button>
                </div>
                
                <div class="export-controls">
                  <button 
                    @click="exportToPDF" 
                    class="export-btn pdf-btn"
                    :disabled="!filteredMeasurements.length"
                  >
                    <i class="fas fa-file-pdf"></i>
                    <span>PDF</span>
                  </button>
                  <button 
                    @click="exportToCSV" 
                    class="export-btn csv-btn"
                    :disabled="!filteredMeasurements.length"
                  >
                    <i class="fas fa-file-csv"></i>
                    <span>CSV</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="chart-content">
              <div v-if="loading" class="chart-loading">
                <div class="loading-spinner"></div>
                <p>Chargement des données...</p>
              </div>
              <div v-else-if="measurements.length === 0" class="chart-empty">
                <div class="empty-chart-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h4>Aucune donnée disponible</h4>
                <p>Cet appareil n'a pas encore généré de mesures</p>
              </div>
              <div v-else class="chart-wrapper">
                <DeviceChart :key="selectedDeviceId" :data="getChartData(filteredMeasurements)" />
              </div>
            </div>
          </div>
        </div>

        <!-- Tableau des dernières mesures -->
        <div class="table-section" v-motion-slide-visible-once-bottom :delay="600">
          <div class="table-card">
            <div class="table-header">
              <h3 class="table-title">
                <i class="fas fa-list-alt"></i>
                Dernières Mesures
              </h3>
              <div class="table-info">
                <span class="data-count">{{ sortedMeasurements.length }} mesures</span>
              </div>
            </div>
            
            <div class="table-content">
              <div v-if="sortedMeasurements.length === 0" class="table-empty">
                <i class="fas fa-table"></i>
                <p>Aucune mesure enregistrée</p>
              </div>
              <div v-else class="table-wrapper">
                <table class="modern-table">
                  <thead>
                    <tr>
                      <th>
                        <i class="fas fa-calendar"></i>
                        Date
                      </th>
                      <th>
                        <i class="fas fa-clock"></i>
                        Heure
                      </th>
                      <th>
                        <i class="fas fa-thermometer-half"></i>
                        Température
                      </th>
                      <th>
                        <i class="fas fa-flask"></i>
                        pH
                      </th>
                      <th>
                        <i class="fas fa-water"></i>
                        Turbidité
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(measure, index) in sortedMeasurements.slice(0, 10)" 
                      :key="index"
                      class="table-row"
                    >
                      <td class="date-cell">{{ formatDateOnly(measure.timestamp) }}</td>
                      <td class="time-cell">{{ formatTimeOnly(measure.timestamp) }}</td>
                      <td class="temp-cell">
                        <span class="value-badge temperature">{{ measure.temperature }}°C</span>
                      </td>
                      <td class="ph-cell">
                        <span class="value-badge ph">{{ measure.ph }}</span>
                      </td>
                      <td class="turbidity-cell">
                        <span class="value-badge turbidity">{{ measure.turbidity }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Message de sélection -->
    <section v-else-if="userDevices.length > 0" class="selection-message">
      <div class="container">
        <div class="selection-content" v-motion-slide-visible-once-bottom>
          <div class="selection-icon-wrapper">
            <i class="fas fa-hand-pointer selection-icon"></i>
            <div class="selection-pulse"></div>
          </div>
          <h3 class="selection-title">Sélectionnez un appareil</h3>
          <p class="selection-description">
            Choisissez l'un de vos appareils ci-dessus pour visualiser ses données en temps réel
          </p>
          <div class="selection-hint">
            <i class="fas fa-arrow-up"></i>
            <span>Cliquez sur une carte d'appareil</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Ajouter le composant footer à la fin, avant la fermeture du div principal -->
    <AppFooter :isDarkMode="isDarkMode" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import DeviceChart from '../components/DeviceChart.vue'
// Ajouter ces imports
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Papa from 'papaparse'
import { API_CONFIG, API_ENDPOINTS } from '../config/api.js'

const router = useRouter()

// État réactif
const userDevices = ref([]) 
const selectedDeviceId = ref(null) 
const selectedDevice = ref(null) 
const measurements = ref([]) 
const loading = ref(false) 
const timeRange = ref('week')
const scrollProgress = ref(0)
const isRefreshing = ref(false)
// Ajouter cette ligne
const isDarkMode = ref(false)

// Ajouter cette fonction
const onThemeChanged = (newTheme) => {
  isDarkMode.value = newTheme
}

// Supprimer ces fonctions (déjà dans AppHeader)
/*
const goToHome = () => {
  router.push('/')
}

function logout() {
  localStorage.removeItem('userEmail')
  localStorage.removeItem('rememberMe')
  router.push('/')
}
*/

// Fonctions utilitaires
const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const progress = (scrollTop / docHeight) * 100
  scrollProgress.value = Math.min(100, Math.max(0, progress))
}

const getDeviceStatus = (device) => {
  // Simuler le statut basé sur l'ID ou d'autres critères
  return Math.random() > 0.2 ? 'online' : 'offline'
}

// Fonction pour récupérer les appareils de l'utilisateur connecté
async function fetchUserDevices() {
  const userEmail = localStorage.getItem('userEmail')
  if (!userEmail) {
    router.push('/login')
    return
  }

  try {
    const res = await axios.get(`${API_CONFIG.BASE_URL}/api/devices/user/${encodeURIComponent(userEmail)}`)
    userDevices.value = res.data
    console.log('Appareils récupérés:', userDevices.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des appareils utilisateur :', error)
  }
}

function selectDevice(device) {
  console.log('🔄 Changement d\'appareil:', device.nom, 'ID:', device.id)
  
  measurements.value = []
  selectedDeviceId.value = device.id
  selectedDevice.value = device
  
  nextTick(() => {
    fetchDeviceMeasurements(device.id)
  })
}

// Fonction pour récupérer les mesures d'un appareil spécifique
async function fetchDeviceMeasurements(deviceId) {
  if (deviceId === null || deviceId === undefined) return;
  
  loading.value = true
  measurements.value = []
  
  try {
    console.log(`Récupération des mesures pour l'appareil ${deviceId}`)
    const res = await axios.get(`${API_CONFIG.BASE_URL}/api/measurements/device/${deviceId}`)
    const newMeasurements = res.data.$values || res.data
    
    measurements.value = [...newMeasurements]
    console.log(`${newMeasurements.length} mesures récupérées pour l'appareil ${deviceId}:`, measurements.value)
  } catch (error) {
    console.error(`Erreur lors de la récupération des mesures pour l'appareil ${deviceId}:`, error)
    measurements.value = []
  } finally {
    loading.value = false
  }
}

// Fonction d'actualisation
const refreshData = async () => {
  isRefreshing.value = true
  try {
    await fetchUserDevices()
    if (selectedDeviceId.value) {
      await fetchDeviceMeasurements(selectedDeviceId.value)
    }
  } finally {
    setTimeout(() => {
      isRefreshing.value = false
    }, 1000)
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
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'pH',
        data: sortedMeasurements.map(m => m.ph),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Turbidité',
        data: sortedMeasurements.map(m => m.turbidity),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      }
    ]
  }
}

// Fonctions d'export 
function exportToPDF() {
  if (!filteredMeasurements.value.length) {
    alert('Aucune donnée à exporter')
    return
  }

  try {
    const doc = new jsPDF()
    
    // En-tête du document
    doc.setFontSize(20)
    doc.text('Rapport de Mesures - ' + selectedDevice.value.nom, 20, 20)
    
    doc.setFontSize(12)
    doc.text('Période: ' + getTimeRangeLabel(), 20, 35)
    doc.text('Généré le: ' + new Date().toLocaleDateString('fr-FR'), 20, 45)
    
    // Préparation des données pour le tableau
    const tableData = filteredMeasurements.value.map(m => [
      formatDateOnly(m.timestamp),
      formatTimeOnly(m.timestamp),
      m.temperature + '°C',
      m.ph.toString(),
      m.turbidity.toString()
    ])
    
    // Génération du tableau
    autoTable(doc, {
      head: [['Date', 'Heure', 'Température', 'pH', 'Turbidité']],
      body: tableData,
      startY: 60,
      styles: {
        fontSize: 10,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [102, 126, 234],
        textColor: 255
      }
    })
    
    // Sauvegarde du fichier
    const fileName = `mesures_${selectedDevice.value.nom}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
    
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error)
    alert('Erreur lors de l\'export PDF')
  }
}

function exportToCSV() {
  if (!filteredMeasurements.value.length) {
    alert('Aucune donnée à exporter')
    return
  }

  try {
    // Préparation des données pour CSV
    const csvData = filteredMeasurements.value.map(m => ({
      Date: formatDateOnly(m.timestamp),
      Heure: formatTimeOnly(m.timestamp),
      'Température (°C)': m.temperature,
      'pH': m.ph,
      'Turbidité': m.turbidity,
      'Appareil': selectedDevice.value.nom,
      'Localisation': selectedDevice.value.localisation?.description || 'Non définie'
    }))
    
    // Conversion en CSV
    const csv = Papa.unparse(csvData, {
      delimiter: ';',
      header: true
    })
    
    // Création et téléchargement du fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      const fileName = `mesures_${selectedDevice.value.nom}_${new Date().toISOString().split('T')[0]}.csv`
      link.setAttribute('download', fileName)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    
  } catch (error) {
    console.error('Erreur lors de l\'export CSV:', error)
    alert('Erreur lors de l\'export CSV')
  }
}

function getTimeRangeLabel() {
  switch (timeRange.value) {
    case 'day': return 'Dernières 24 heures'
    case 'week': return 'Dernière semaine'
    case 'month': return 'Dernier mois'
    default: return 'Période inconnue'
  }
}

// Lifecycle hooks
onMounted(() => {
  fetchUserDevices()
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
})
</script>
<style scoped>
/* Variables CSS pour le thème */
.dashboard-page {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --border-color: rgba(226, 232, 240, 0.8);
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 8px 40px rgba(0, 0, 0, 0.12);
  --shadow-strong: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.dashboard-page.dark-mode {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #a0aec0;
  --border-color: rgba(74, 85, 104, 0.6);
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.3);
  --shadow-medium: 0 8px 40px rgba(0, 0, 0, 0.4);
  --shadow-strong: 0 20px 60px rgba(0, 0, 0, 0.5);
}

/* Base */
.dashboard-page {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

/* Barre de progression du scroll */
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1000;
}

.scroll-progress-bar {
  height: 100%;
  background: var(--primary-gradient);
  transition: width 0.1s ease;
  border-radius: 0 3px 3px 0;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

/* Header moderne */
.dashboard-header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
  transition: all 0.3s ease;
}

.dark-mode .dashboard-header {
  background: rgba(26, 32, 44, 0.95);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-section:hover {
  transform: translateY(-2px);
}

.header-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dashboard-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.brand-name {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-title {
  color: var(--text-secondary);
  font-weight: 500;
}

.dashboard-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.refresh-btn:hover {
  background: var(--accent-gradient);
  color: white;
  border-color: transparent;
}

.refresh-btn.loading i {
  animation: spin 1s linear infinite;
}

.logout-btn:hover {
  background: var(--secondary-gradient);
  color: white;
  border-color: transparent;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Hero section */
.device-selection-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: var(--primary-gradient);
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 0.9) 0%, 
    rgba(118, 75, 162, 0.8) 50%, 
    rgba(240, 147, 251, 0.7) 100%);
}

.floating-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: -2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 60%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
}

.hero-content {
  text-align: center;
  color: white;
  padding: 4rem 0;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-weight: 400;
}

/* Grille d'appareils */
.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.device-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.device-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.device-card.selected {
  background: rgba(255, 255, 255, 1);
  border-color: #667eea;
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
}

.device-status-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.device-status-indicator.online {
  background: #48bb78;
  box-shadow: 0 0 20px rgba(72, 187, 120, 0.5);
}

.device-status-indicator.offline {
  background: #f56565;
  box-shadow: 0 0 20px rgba(245, 101, 101, 0.5);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.device-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: var(--primary-gradient);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.device-info {
  text-align: center;
  color: var(--text-primary);
}

.device-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.device-location {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.device-metrics {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.metric-item i {
  font-size: 1.25rem;
  color: #667eea;
}

.device-selection-glow {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: var(--primary-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.device-card.selected .device-selection-glow {
  opacity: 0.1;
}

/* État vide */
.empty-devices {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}

.empty-devices h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.empty-devices p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.add-device-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.add-device-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Section des données */
.data-section {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.device-info-banner {
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
}

.dark-mode .device-info-banner {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.banner-background {
  position: absolute;
  inset: 0;
}

.banner-gradient {
  position: absolute;
  inset: 0;
  background: var(--primary-gradient);
  opacity: 0.05;
}

.banner-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.device-header-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.device-avatar {
  width: 80px;
  height: 80px;
  background: var(--primary-gradient);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.device-details h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.device-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.device-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.meta-item i {
  color: #667eea;
}

.device-status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.875rem;
}

.device-status-badge.online {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

.device-status-badge.online i {
  color: #48bb78;
  animation: pulse 2s infinite;
}

/* Métriques en temps réel */
.metrics-section {
  margin-bottom: 3rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.section-title i {
  color: #667eea;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.metric-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.dark-mode .metric-card {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.metric-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.temperature-card .metric-icon {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
}

.ph-card .metric-icon {
  background: linear-gradient(135deg, #4ecdc4, #6bcf7f);
}

.turbidity-card .metric-icon {
  background: linear-gradient(135deg, #45b7d1, #96c93d);
}

.metric-trend {
  padding: 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.metric-trend.positive {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
}

.metric-trend.negative {
  background: rgba(245, 101, 101, 0.1);
  color: #e53e3e;
}

.metric-trend.neutral {
  background: rgba(161, 161, 170, 0.1);
  color: #a1a1aa;
}

.metric-content {
  margin-bottom: 1.5rem;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.metric-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.metric-chart {
  height: 40px;
}

.mini-chart {
  display: flex;
  align-items: end;
  gap: 4px;
  height: 100%;
}

.chart-bar {
  flex: 1;
  background: var(--primary-gradient);
  border-radius: 2px 2px 0 0;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.metric-card:hover .chart-bar {
  opacity: 1;
}

/* Section graphique */
.chart-section {
  margin-bottom: 3rem;
}

.chart-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
}

.dark-mode .chart-card {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.chart-header {
  padding: 2rem 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.chart-title-section h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.chart-title-section h3 i {
  color: #667eea;
}

.chart-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

.chart-controls {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.time-controls {
  display: flex;
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 4px;
  border: 1px solid var(--border-color);
}

.time-btn {
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.time-btn.active {
  background: var(--primary-gradient);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.export-controls {
  display: flex;
  gap: 0.75rem;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.export-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.export-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pdf-btn:hover:not(:disabled) {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
}

.csv-btn:hover:not(:disabled) {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

.chart-content {
  padding: 2rem;
}

.chart-loading,
.chart-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--border-color);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

.empty-chart-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--text-secondary);
}

.chart-wrapper {
  min-height: 400px;
}

/* Section tableau */
.table-section {
  margin-bottom: 3rem;
}

.table-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
}

.dark-mode .table-card {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.table-header {
  padding: 2rem 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.table-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.table-title i {
  color: #667eea;
}

.table-info {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.data-count {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.table-content {
  padding: 0;
}

.table-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.table-empty i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.table-wrapper {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 700;
  padding: 1.5rem 1.25rem;
  text-align: left;
  border-bottom: 2px solid var(--border-color);
  font-size: 0.95rem;
}

.modern-table th i {
  margin-right: 0.5rem;
  color: #667eea;
}

.modern-table td {
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.table-row:hover {
  background: var(--bg-secondary);
}

.value-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
}

.value-badge.temperature {
  background: rgba(255, 107, 107, 0.1);
  color: #e53e3e;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.value-badge.ph {
  background: rgba(78, 205, 196, 0.1);
  color: #319795;
  border: 1px solid rgba(78, 205, 196, 0.3);
}

.value-badge.turbidity {
  background: rgba(69, 183, 209, 0.1);
  color: #3182ce;
  border: 1px solid rgba(69, 183, 209, 0.3);
}

.date-cell,
.time-cell {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
  font-size: 0.875rem;
}

/* Message de sélection */
.selection-message {
  padding: 6rem 0;
  background: var(--bg-secondary);
}

.selection-content {
  text-align: center;
  color: var(--text-secondary);
}

.selection-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.selection-icon {
  font-size: 4rem;
  color: var(--text-secondary);
  opacity: 0.6;
}

.selection-pulse {
  position: absolute;
  inset: -20px;
  border: 2px solid #667eea;
  border-radius: 50%;
  animation: pulse-ring 2s infinite;
  opacity: 0.3;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.selection-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.selection-description {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.selection-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #667eea;
  font-weight: 600;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Responsive */
@media (max-width: 1200px) {
  .container {
    padding: 0 1.5rem;
  }
  
  .device-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .logo-section {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .title-section {
    align-items: center;
  }
  
  .dashboard-title {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
  
  .device-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .device-card {
    padding: 1.5rem;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .chart-controls {
    justify-content: center;
  }
  
  .banner-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .device-header-info {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .device-meta {
    justify-content: center;
    gap: 1rem;
  }
  
  .action-btn span {
    display: none;
  }
  
  .action-btn {
    padding: 0.75rem;
    width: 44px;
    height: 44px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-content {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .device-card {
    padding: 1.25rem;
  }
  
  .device-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .device-name {
    font-size: 1.25rem;
  }
  
  .metric-card {
    padding: 1.5rem;
  }
  
  .metric-value {
    font-size: 2rem;
  }
  
  .chart-content {
    padding: 1rem;
  }
  
  .table-header {
    padding: 1.5rem 1rem 1rem;
  }
  
  .modern-table th,
  .modern-table td {
    padding: 1rem 0.75rem;
  }
  
  .time-controls {
    width: 100%;
  }
  
  .export-controls {
    width: 100%;
    justify-content: center;
  }
}
</style>