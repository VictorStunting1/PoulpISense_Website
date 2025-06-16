<template>
  <div class="alerts-page" :class="{ 'dark-mode': isDarkMode }">
    <!-- Header -->
    <AppHeader 
      @toggle-theme="onThemeChanged"
      @open-documentation="openDocumentation"
    />

    <main class="alerts-main">
      <div class="alerts-container">
        <!-- En-tête de page -->
        <div class="page-header">
          <div class="header-content">
            <div class="header-left">
              <h1 class="page-title">
                <i class="fas fa-exclamation-triangle"></i>
                Alertes et Seuils
              </h1>
              <p class="page-subtitle">Gérez vos alertes et configurez vos seuils de surveillance</p>
            </div>
            <div class="header-actions">
              <button @click="refreshData" class="refresh-btn" :disabled="loading">
                <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>

        <!-- Statistiques rapides -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-bell text-red-500"></i>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ unreadAlertsCount }}</span>
              <span class="stat-label">Alertes non lues</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-history text-blue-500"></i>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ totalAlertsCount }}</span>
              <span class="stat-label">Total alertes</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-sliders-h text-green-500"></i>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ thresholdsCount }}</span>
              <span class="stat-label">Seuils configurés</span>
            </div>
          </div>
        </div>

        <!-- Onglets de navigation -->
        <div class="tabs-container">
          <div class="tabs">
            <button 
              @click="activeTab = 'alerts'" 
              :class="['tab', { active: activeTab === 'alerts' }]"
            >
              <i class="fas fa-bell"></i>
              Alertes récentes
            </button>
            <button 
              @click="activeTab = 'thresholds'" 
              :class="['tab', { active: activeTab === 'thresholds' }]"
            >
              <i class="fas fa-sliders-h"></i>
              Seuils d'alerte
            </button>
            <button 
              @click="activeTab = 'history'" 
              :class="['tab', { active: activeTab === 'history' }]"
            >
              <i class="fas fa-history"></i>
              Historique
            </button>
          </div>
        </div>

        <!-- Contenu des onglets -->
        <div class="tab-content">
          <!-- Onglet Alertes récentes -->
          <div v-if="activeTab === 'alerts'" class="alerts-section">
            <!-- Filtres et actions -->
            <div class="filters-section">
              <div class="filters-left">
                <select v-model="selectedDeviceFilter" class="device-filter">
                  <option value="">Tous les appareils</option>
                  <option v-for="device in userDevices" :key="device.id" :value="device.id">
                    {{ device.nom }}
                  </option>
                </select>
                <select v-model="statusFilter" class="status-filter">
                  <option value="">Tous les statuts</option>
                  <option value="unread">Non lues</option>
                  <option value="read">Lues</option>
                </select>
              </div>
              <div class="filters-right">
                <button @click="markAllAsRead" class="action-btn secondary">
                  <i class="fas fa-check-double"></i>
                  Tout marquer comme lu
                </button>
              </div>
            </div>

            <!-- Liste des alertes -->
            <div v-if="loading" class="loading-container">
              <div class="loading-spinner"></div>
              <p>Chargement des alertes...</p>
            </div>

            <div v-else-if="filteredAlerts.length === 0" class="empty-state">
              <i class="fas fa-bell-slash"></i>
              <h3>Aucune alerte trouvée</h3>
              <p>Aucune alerte ne correspond à vos critères de filtrage.</p>
            </div>

            <div v-else class="alerts-list">
              <div 
                v-for="alert in paginatedAlerts" 
                :key="alert.id"
                :class="['alert-item', { 'unread': !alert.isRead }]"
                @click="toggleAlertRead(alert)"
              >
                <div class="alert-header">
                  <div class="alert-type">
                    <i :class="getAlertIcon(alert.type)"></i>
                    <span class="type-text">{{ alert.type }}</span>
                  </div>
                  <div class="alert-meta">
                    <span class="alert-device">{{ getDeviceName(alert.measurementId) }}</span>
                    <span class="alert-date">{{ formatDate(alert.date) }}</span>
                  </div>
                </div>
                <div class="alert-message">
                  {{ alert.message }}
                </div>
                <div v-if="alert.recommandations && alert.recommandations.length > 0" class="alert-recommendations">
                  <h4>Recommandations :</h4>
                  <ul>
                    <li v-for="rec in alert.recommandations" :key="rec.id">
                      {{ rec.message }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="pagination-btn"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <span class="pagination-info">
                Page {{ currentPage }} sur {{ totalPages }}
              </span>
              <button 
                @click="currentPage++" 
                :disabled="currentPage === totalPages"
                class="pagination-btn"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <!-- Onglet Seuils d'alerte -->
          <div v-if="activeTab === 'thresholds'" class="thresholds-section">
            <!-- Bouton pour créer un nouveau seuil -->
            <div class="section-header">
              <h2>Configuration des seuils</h2>
              <button @click="showCreateThreshold = true" class="action-btn primary">
                <i class="fas fa-plus"></i>
                Nouveau seuil
              </button>
            </div>

            <!-- Liste des seuils par appareil -->
            <div v-if="loading" class="loading-container">
              <div class="loading-spinner"></div>
              <p>Chargement des seuils...</p>
            </div>

            <div v-else class="thresholds-list">
              <div v-for="device in userDevices" :key="device.id" class="device-thresholds">
                <div class="device-header">
                  <h3>{{ device.nom }}</h3>
                  <span class="device-location">{{ device.localisation?.description }}</span>
                </div>
                
                <div class="thresholds-grid">
                  <!-- Température -->
                  <div class="threshold-card">
                    <div class="threshold-header">
                      <div class="threshold-type">
                        <i class="fas fa-thermometer-half text-red-500"></i>
                        <span>Température</span>
                      </div>
                      <button 
                        @click="createThreshold(device.id, 'temperature')"
                        v-if="!getThreshold(device.id, 'temperature')"
                        class="add-threshold-btn"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div v-if="getThreshold(device.id, 'temperature')" class="threshold-config">
                      <div class="threshold-values">
                        <span class="min-value">Min: {{ getThreshold(device.id, 'temperature').minValue }}°C</span>
                        <span class="max-value">Max: {{ getThreshold(device.id, 'temperature').maxValue }}°C</span>
                      </div>
                      <div class="threshold-actions">
                        <button 
                          @click="toggleThreshold(getThreshold(device.id, 'temperature'))"
                          :class="['toggle-btn', { active: getThreshold(device.id, 'temperature').isActive }]"
                        >
                          {{ getThreshold(device.id, 'temperature').isActive ? 'Actif' : 'Inactif' }}
                        </button>
                        <button 
                          @click="editThreshold(getThreshold(device.id, 'temperature'))"
                          class="edit-btn"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                      </div>
                    </div>
                    <div v-else class="no-threshold">
                      <span>Aucun seuil configuré</span>
                    </div>
                  </div>

                  <!-- pH -->
                  <div class="threshold-card">
                    <div class="threshold-header">
                      <div class="threshold-type">
                        <i class="fas fa-flask text-blue-500"></i>
                        <span>pH</span>
                      </div>
                      <button 
                        @click="createThreshold(device.id, 'ph')"
                        v-if="!getThreshold(device.id, 'ph')"
                        class="add-threshold-btn"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div v-if="getThreshold(device.id, 'ph')" class="threshold-config">
                      <div class="threshold-values">
                        <span class="min-value">Min: {{ getThreshold(device.id, 'ph').minValue }}</span>
                        <span class="max-value">Max: {{ getThreshold(device.id, 'ph').maxValue }}</span>
                      </div>
                      <div class="threshold-actions">
                        <button 
                          @click="toggleThreshold(getThreshold(device.id, 'ph'))"
                          :class="['toggle-btn', { active: getThreshold(device.id, 'ph').isActive }]"
                        >
                          {{ getThreshold(device.id, 'ph').isActive ? 'Actif' : 'Inactif' }}
                        </button>
                        <button 
                          @click="editThreshold(getThreshold(device.id, 'ph'))"
                          class="edit-btn"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                      </div>
                    </div>
                    <div v-else class="no-threshold">
                      <span>Aucun seuil configuré</span>
                    </div>
                  </div>

                  <!-- Turbidité -->
                  <div class="threshold-card">
                    <div class="threshold-header">
                      <div class="threshold-type">
                        <i class="fas fa-eye text-yellow-500"></i>
                        <span>Turbidité</span>
                      </div>
                      <button 
                        @click="createThreshold(device.id, 'turbidity')"
                        v-if="!getThreshold(device.id, 'turbidity')"
                        class="add-threshold-btn"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div v-if="getThreshold(device.id, 'turbidity')" class="threshold-config">
                      <div class="threshold-values">
                        <span class="min-value">Min: {{ getThreshold(device.id, 'turbidity').minValue }} NTU</span>
                        <span class="max-value">Max: {{ getThreshold(device.id, 'turbidity').maxValue }} NTU</span>
                      </div>
                      <div class="threshold-actions">
                        <button 
                          @click="toggleThreshold(getThreshold(device.id, 'turbidity'))"
                          :class="['toggle-btn', { active: getThreshold(device.id, 'turbidity').isActive }]"
                        >
                          {{ getThreshold(device.id, 'turbidity').isActive ? 'Actif' : 'Inactif' }}
                        </button>
                        <button 
                          @click="editThreshold(getThreshold(device.id, 'turbidity'))"
                          class="edit-btn"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                      </div>
                    </div>
                    <div v-else class="no-threshold">
                      <span>Aucun seuil configuré</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Onglet Historique -->
          <div v-if="activeTab === 'history'" class="history-section">
            <div class="section-header">
              <h2>Historique des alertes</h2>
              <div class="history-filters">
                <select v-model="historyPeriod" class="period-filter">
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="3months">3 derniers mois</option>
                  <option value="year">Cette année</option>
                </select>
              </div>
            </div>

            <!-- Graphique d'historique -->
            <div class="history-chart">
              <canvas ref="historyChart"></canvas>
            </div>

            <!-- Statistiques d'historique -->
            <div class="history-stats">
              <div class="stat-item">
                <span class="stat-label">Alertes par jour (moyenne)</span>
                <span class="stat-value">{{ avgAlertsPerDay }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Type d'alerte le plus fréquent</span>
                <span class="stat-value">{{ mostFrequentAlertType }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Appareil avec le plus d'alertes</span>
                <span class="stat-value">{{ deviceWithMostAlerts }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modales -->
    <!-- Modal pour créer/éditer un seuil -->
    <div v-if="showCreateThreshold" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingThreshold ? 'Modifier' : 'Créer' }} un seuil d'alerte</h3>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="saveThreshold" class="threshold-form">
          <div class="form-group">
            <label>Appareil</label>
            <select v-model="thresholdForm.deviceId" required>
              <option value="">Sélectionner un appareil</option>
              <option v-for="device in userDevices" :key="device.id" :value="device.id">
                {{ device.nom }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Paramètre</label>
            <select v-model="thresholdForm.parameterType" required>
              <option value="temperature">Température</option>
              <option value="ph">pH</option>
              <option value="turbidity">Turbidité</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Valeur minimale</label>
              <input v-model.number="thresholdForm.minValue" type="number" step="0.1">
            </div>
            <div class="form-group">
              <label>Valeur maximale</label>
              <input v-model.number="thresholdForm.maxValue" type="number" step="0.1">
            </div>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="thresholdForm.isActive" type="checkbox">
              <span class="checkmark"></span>
              Seuil actif
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="cancel-btn">Annuler</button>
            <button type="submit" class="save-btn">
              {{ editingThreshold ? 'Modifier' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Documentation Modal -->
    <DocumentationModal 
      v-if="showDocumentation" 
      @close="closeDocumentation" 
    />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import DocumentationModal from '../components/DocumentationModal.vue'
import Chart from 'chart.js/auto'
import { API_CONFIG, API_ENDPOINTS } from '../config/api.js'

const router = useRouter()

// État réactif
const userDevices = ref([])
const alerts = ref([])
const thresholds = ref([])
const loading = ref(false)
const activeTab = ref('alerts')
const selectedDeviceFilter = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showDocumentation = ref(false)
const isDarkMode = ref(false)

// Variables pour les seuils
const showCreateThreshold = ref(false)
const editingThreshold = ref(null)
const thresholdForm = ref({
  deviceId: '',
  parameterType: '',
  minValue: null,
  maxValue: null,
  isActive: true
})

// Variables pour l'historique
const historyPeriod = ref('week')
const historyChart = ref(null)
const chartInstance = ref(null)

// Variables pour stocker les mesures (nécessaires pour lier alertes et appareils)
const measurements = ref([])

// Utilisateur connecté - UTILISER LA MÊME LOGIQUE QUE DASHBOARD
const userEmail = computed(() => {
  return localStorage.getItem('userEmail')
})

// Supprimer currentUser ref et le remplacer par une fonction
const currentUser = ref(null)

// Statistiques calculées
const unreadAlertsCount = computed(() => {
  return alerts.value.filter(alert => !alert.isRead).length
})

const totalAlertsCount = computed(() => {
  return alerts.value.length
})

const thresholdsCount = computed(() => {
  return thresholds.value.filter(threshold => threshold.isActive).length
})

// Filtrage des alertes
const filteredAlerts = computed(() => {
  let filtered = alerts.value

  if (selectedDeviceFilter.value) {
    filtered = filtered.filter(alert => {
      const measurement = getMeasurementById(alert.measurementId)
      return measurement && measurement.deviceId == selectedDeviceFilter.value
    })
  }

  if (statusFilter.value === 'unread') {
    filtered = filtered.filter(alert => !alert.isRead)
  } else if (statusFilter.value === 'read') {
    filtered = filtered.filter(alert => alert.isRead)
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredAlerts.value.length / itemsPerPage.value)
})

const paginatedAlerts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredAlerts.value.slice(start, end)
})

// Statistiques d'historique - UTILISANT LES VRAIES DONNÉES DE LA PÉRIODE
const filteredHistoryAlerts = computed(() => {
  if (alerts.value.length === 0) return []
  
  const now = new Date()
  let startDate
  
  switch (historyPeriod.value) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    case '3months':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      break
    case 'year':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      break
  }
  
  return alerts.value.filter(alert => {
    const alertDate = new Date(alert.date)
    return alertDate >= startDate && alertDate <= now
  })
})

const avgAlertsPerDay = computed(() => {
  const periodAlerts = filteredHistoryAlerts.value
  if (periodAlerts.length === 0) return 0
  
  const days = historyPeriod.value === 'week' ? 7 : 
               historyPeriod.value === 'month' ? 30 : 
               historyPeriod.value === '3months' ? 90 : 365
  return Math.round(periodAlerts.length / days * 10) / 10
})

const mostFrequentAlertType = computed(() => {
  const periodAlerts = filteredHistoryAlerts.value
  if (periodAlerts.length === 0) return 'Aucun'
  
  const types = {}
  periodAlerts.forEach(alert => {
    types[alert.type] = (types[alert.type] || 0) + 1
  })
  const entries = Object.entries(types)
  if (entries.length === 0) return 'Aucun'
  return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0]
})

const deviceWithMostAlerts = computed(() => {
  const periodAlerts = filteredHistoryAlerts.value
  if (periodAlerts.length === 0) return 'Aucun'
  
  const deviceCounts = {}
  periodAlerts.forEach(alert => {
    const deviceName = getDeviceName(alert.measurementId)
    deviceCounts[deviceName] = (deviceCounts[deviceName] || 0) + 1
  })
  const entries = Object.entries(deviceCounts)
  if (entries.length === 0) return 'Aucun'
  return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0]
})

// Fonctions utilitaires
const onThemeChanged = (newTheme) => {
  isDarkMode.value = newTheme === 'dark'
  // Sauvegarder la préférence utilisateur
  localStorage.setItem('theme', newTheme === 'dark' ? 'dark' : 'light')
}

const openDocumentation = () => {
  showDocumentation.value = true
}

const closeDocumentation = () => {
  showDocumentation.value = false
}

// Fonctions pour récupérer les données - REPRENDRE LA LOGIQUE DE DASHBOARD
async function fetchUserDevices() {
  const email = userEmail.value
  if (!email) {
    router.push('/login')
    return
  }

  try {
    loading.value = true
    console.log('Récupération des appareils pour:', email)
    const res = await axios.get(`${API_CONFIG.BASE_URL}/api/devices/user/${encodeURIComponent(email)}`)
    userDevices.value = res.data
    console.log('Appareils récupérés:', userDevices.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des appareils utilisateur :', error)
  } finally {
    loading.value = false
  }
}

async function fetchCurrentUser() {
  try {
    const email = userEmail.value
    if (!email) return
    
    const response = await axios.get(`${API_CONFIG.BASE_URL}/api/users/by-email/${email}`)
    currentUser.value = response.data
    console.log('Utilisateur récupéré:', currentUser.value)
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error)
  }
}

async function fetchAlerts() {
  try {
    loading.value = true
    console.log('Début récupération des alertes...')
    
    // Récupérer toutes les alertes
    const alertsResponse = await axios.get(`${API_CONFIG.BASE_URL}/api/alerts`)
    console.log('Réponse alertes brute:', alertsResponse.data)
    
    // Gérer le format $values de l'API .NET
    const allAlerts = alertsResponse.data.$values || alertsResponse.data || []
    console.log('Toutes les alertes récupérées:', allAlerts.length)
    
    // Récupérer toutes les mesures pour faire le lien
    const measurementsResponse = await axios.get(`${API_CONFIG.BASE_URL}/api/measurements`)
    console.log('Réponse mesures brute:', measurementsResponse.data)
    
    // Gérer le format $values pour les mesures aussi
    measurements.value = measurementsResponse.data.$values || measurementsResponse.data || []
    console.log('Mesures récupérées:', measurements.value.length)
    
    // Si on n'a pas d'appareils, on ne peut pas filtrer
    if (userDevices.value.length === 0) {
      console.warn('Aucun appareil utilisateur trouvé pour filtrer les alertes')
      alerts.value = []
      return
    }
    
    // Filtrer les alertes pour les appareils de l'utilisateur
    const userDeviceIds = userDevices.value.map(device => device.id)
    console.log('IDs des appareils utilisateur:', userDeviceIds)
    
    alerts.value = allAlerts.filter(alert => {
      const measurement = measurements.value.find(m => m.id === alert.measurementId)
      return measurement && userDeviceIds.includes(measurement.deviceId)
    })
    
    console.log('Alertes filtrées pour l\'utilisateur:', alerts.value.length)
  } catch (error) {
    console.error('Erreur lors de la récupération des alertes:', error)
    // Ajouter plus de détails sur l'erreur
    if (error.response) {
      console.error('Réponse d\'erreur:', error.response.status, error.response.data)
    }
  } finally {
    loading.value = false
  }
}

async function fetchThresholds() {
  try {
    if (!currentUser.value?.id) {
      console.warn('ID utilisateur non disponible pour les seuils')
      return
    }
    
    const response = await axios.get(`${API_CONFIG.BASE_URL}/api/alert-thresholds/user/${currentUser.value.id}`)
    thresholds.value = response.data || []
    console.log('Seuils récupérés:', thresholds.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des seuils:', error)
  }
}

// Fonctions d'action - MODIFIER L'ORDRE D'APPEL
async function refreshData() {
  // D'abord récupérer les appareils comme dans Dashboard
  await fetchUserDevices()
  // Puis récupérer l'utilisateur complet pour les seuils
  await fetchCurrentUser()
  // Ensuite les alertes (qui dépendent des appareils)
  await fetchAlerts()
  // Enfin les seuils (qui dépendent de l'utilisateur complet)
  await fetchThresholds()
}

async function toggleAlertRead(alert) {
  try {
    const endpoint = alert.isRead ? 'mark-unread' : 'mark-read'
    await axios.put(`/api/alerts/${alert.id}/${endpoint}`)
    alert.isRead = !alert.isRead
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'alerte:', error)
  }
}

async function markAllAsRead() {
  try {
    const unreadAlerts = alerts.value.filter(alert => !alert.isRead)
    for (const alert of unreadAlerts) {
      await axios.put(`/api/alerts/${alert.id}/mark-read`)
      alert.isRead = true
    }
  } catch (error) {
    console.error('Erreur lors du marquage des alertes:', error)
  }
}

// Fonctions pour les seuils
function getThreshold(deviceId, parameterType) {
  return thresholds.value.find(t => 
    t.deviceId === deviceId && t.parameterType === parameterType
  )
}

function createThreshold(deviceId, parameterType) {
  thresholdForm.value = {
    deviceId: deviceId,
    parameterType: parameterType,
    minValue: null,
    maxValue: null,
    isActive: true
  }
  editingThreshold.value = null
  showCreateThreshold.value = true
}

function editThreshold(threshold) {
  thresholdForm.value = { ...threshold }
  editingThreshold.value = threshold
  showCreateThreshold.value = true
}

async function saveThreshold() {
  try {
    if (!currentUser.value?.id) {
      console.error('ID utilisateur requis pour créer un seuil')
      return
    }
    
    const data = {
      ...thresholdForm.value,
      userId: currentUser.value.id
    }
    
    if (editingThreshold.value) {
      await axios.put(`/api/alert-thresholds/${editingThreshold.value.id}`, data)
      const index = thresholds.value.findIndex(t => t.id === editingThreshold.value.id)
      if (index !== -1) {
        thresholds.value[index] = { ...editingThreshold.value, ...data }
      }
    } else {
      const response = await axios.post('/api/alert-thresholds', data)
      thresholds.value.push(response.data)
    }
    
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du seuil:', error)
  }
}

async function toggleThreshold(threshold) {
  try {
    await axios.patch(`/api/alert-thresholds/${threshold.id}/toggle`)
    threshold.isActive = !threshold.isActive
  } catch (error) {
    console.error('Erreur lors de la modification du seuil:', error)
  }
}

function closeModal() {
  showCreateThreshold.value = false
  editingThreshold.value = null
  thresholdForm.value = {
    deviceId: '',
    parameterType: '',
    minValue: null,
    maxValue: null,
    isActive: true
  }
}

// Fonctions utilitaires pour l'affichage - CORRIGÉES
function getDeviceName(measurementId) {
  const measurement = measurements.value.find(m => m.id === measurementId)
  if (!measurement) return 'Appareil inconnu'
  
  const device = userDevices.value.find(d => d.id === measurement.deviceId)
  return device ? device.nom : 'Appareil inconnu'
}

function getMeasurementById(measurementId) {
  return measurements.value.find(m => m.id === measurementId)
}

function formatDate(date) {
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getAlertIcon(alertType) {
  switch (alertType?.toLowerCase()) {
    case 'seuil dépassé':
    case 'threshold exceeded':
      return 'fas fa-exclamation-triangle text-orange-500'
    case 'température élevée':
    case 'high temperature':
      return 'fas fa-thermometer-full text-red-500'
    case 'température basse':
    case 'low temperature':
      return 'fas fa-thermometer-empty text-blue-500'
    case 'ph anormal':
    case 'abnormal ph':
      return 'fas fa-flask text-yellow-500'
    case 'turbidité élevée':
    case 'high turbidity':
      return 'fas fa-eye-slash text-gray-500'
    case 'capteur défaillant':
    case 'sensor failure':
      return 'fas fa-times-circle text-red-500'
    case 'maintenance requise':
    case 'maintenance required':
      return 'fas fa-wrench text-orange-500'
    default:
      return 'fas fa-bell text-yellow-500'
  }
}

// Fonction pour traiter les données d'historique selon la période
function getHistoryData() {
  if (alerts.value.length === 0) {
    return { labels: [], data: [] }
  }

  const now = new Date()
  const period = historyPeriod.value
  let startDate, labels, dateFormat

  // Définir la période et le format selon la sélection
  switch (period) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
      dateFormat = 'dayOfWeek'
      break
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      labels = []
      // Générer les labels pour les 30 derniers jours
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
        labels.push(date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }))
      }
      dateFormat = 'day'
      break
    case '3months':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      labels = []
      // Générer les labels pour les 12 dernières semaines
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000)
        labels.push(`S${12 - i}`)
      }
      dateFormat = 'week'
      break
    case 'year':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
      dateFormat = 'month'
      break
  }

  // Filtrer les alertes dans la période
  const filteredAlerts = alerts.value.filter(alert => {
    const alertDate = new Date(alert.date)
    return alertDate >= startDate && alertDate <= now
  })

  // Compter les alertes par période
  const counts = new Array(labels.length).fill(0)

  filteredAlerts.forEach(alert => {
    const alertDate = new Date(alert.date)
    let index

    switch (dateFormat) {
      case 'dayOfWeek':
        // 0 = Dimanche, 1 = Lundi, etc. Ajuster pour que Lundi = 0
        index = (alertDate.getDay() + 6) % 7
        break
      case 'day':
        const daysDiff = Math.floor((now.getTime() - alertDate.getTime()) / (24 * 60 * 60 * 1000))
        index = Math.max(0, labels.length - 1 - daysDiff)
        break
      case 'week':
        const weeksDiff = Math.floor((now.getTime() - alertDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
        index = Math.max(0, labels.length - 1 - weeksDiff)
        break
      case 'month':
        index = alertDate.getMonth()
        break
    }

    if (index >= 0 && index < counts.length) {
      counts[index]++
    }
  })

  return { labels, data: counts }
}

// Fonction pour créer le graphique d'historique
function createHistoryChart() {
  if (!historyChart.value) return
  
  const ctx = historyChart.value.getContext('2d')
  const { labels, data } = getHistoryData()
  
  // Données basées sur les vraies alertes
  const chartData = {
    labels,
    datasets: [{
      label: 'Nombre d\'alertes',
      data,
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.3,
      fill: true,
      pointBackgroundColor: 'rgb(99, 102, 241)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  }
  
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
  
  chartInstance.value = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Évolution des alertes - ${getPeriodLabel()}`
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: function(value) {
              return Number.isInteger(value) ? value : ''
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  })
}

// Fonction utilitaire pour obtenir le label de la période
function getPeriodLabel() {
  switch (historyPeriod.value) {
    case 'week': return 'Cette semaine'
    case 'month': return 'Ce mois'
    case '3months': return '3 derniers mois'
    case 'year': return 'Cette année'
    default: return ''
  }
}

// Watchers
watch(activeTab, (newTab) => {
  if (newTab === 'history') {
    nextTick(() => {
      createHistoryChart()
    })
  }
})

watch(historyPeriod, () => {
  if (activeTab.value === 'history') {
    createHistoryChart()
  }
})

// Watcher pour mettre à jour le graphique quand les alertes changent
watch(alerts, () => {
  if (activeTab.value === 'history') {
    nextTick(() => {
      createHistoryChart()
    })
  }
}, { deep: true })

// Lifecycle - REPRENDRE LA LOGIQUE DE DASHBOARD
onMounted(async () => {
  const email = userEmail.value
  if (!email) {
    console.log('Utilisateur non connecté, redirection vers login')
    router.push('/login')
    return
  }
  
  console.log('Utilisateur connecté:', email)
  await refreshData()
})
</script>

<style scoped>
/* === LAYOUT GÉNÉRAL === */
.alerts-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.alerts-main {
  padding: 2rem 0;
  min-height: calc(100vh - 140px);
}

.alerts-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* === EN-TÊTE DE PAGE === */
.page-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left h1.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title i {
  color: #f59e0b;
  font-size: 2rem;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}

.refresh-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* === STATISTIQUES === */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: rgba(99, 102, 241, 0.1);
}

.stat-icon i.text-red-500 {
  color: #ef4444;
}

.stat-icon i.text-blue-500 {
  color: #3b82f6;
}

.stat-icon i.text-green-500 {
  color: #10b981;
}

.stat-content {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  display: block;
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

/* === ONGLETS === */
.tabs-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tabs {
  display: flex;
  gap: 0.5rem;
}

.tab {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6b7280;
}

.tab:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #667eea;
}

.tab.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* === CONTENU DES ONGLETS === */
.tab-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* === SECTION ALERTES === */
.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.filters-left {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.device-filter,
.status-filter,
.period-filter {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.device-filter:focus,
.status-filter:focus,
.period-filter:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.action-btn.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* === LISTE DES ALERTES === */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #d1d5db;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #374151;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-item {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.alert-item:hover {
  border-color: #667eea;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.alert-item.unread {
  border-left: 4px solid #ef4444;
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.05) 0%, white 10%);
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.alert-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.alert-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.alert-device {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.alert-message {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.alert-recommendations {
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.alert-recommendations h4 {
  margin: 0 0 0.5rem 0;
  color: #0369a1;
  font-size: 0.9rem;
  font-weight: 600;
}

.alert-recommendations ul {
  margin: 0;
  padding-left: 1rem;
}

.alert-recommendations li {
  color: #374151;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

/* === PAGINATION === */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #6b7280;
  font-weight: 500;
}

/* === SECTION SEUILS === */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.thresholds-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.device-thresholds {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
}

.device-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.device-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.device-location {
  color: #6b7280;
  font-size: 0.9rem;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.thresholds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.threshold-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.threshold-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.threshold-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.threshold-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.threshold-type i.text-red-500 {
  color: #ef4444;
}

.threshold-type i.text-blue-500 {
  color: #3b82f6;
}

.threshold-type i.text-yellow-500 {
  color: #f59e0b;
}

.add-threshold-btn {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
}

.add-threshold-btn:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.threshold-config {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.threshold-values {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
}

.min-value,
.max-value {
  background: #f0f9ff;
  padding: 0.5rem;
  border-radius: 6px;
  color: #0369a1;
  font-weight: 500;
  flex: 1;
  text-align: center;
}

.threshold-actions {
  display: flex;
  gap: 0.5rem;
}

.toggle-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.toggle-btn.active {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.toggle-btn:not(.active) {
  color: #6b7280;
}

.edit-btn {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
}

.edit-btn:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.no-threshold {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 1rem;
}

/* === SECTION HISTORIQUE === */
.history-filters {
  display: flex;
  gap: 1rem;
}

.history-chart {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  border: 2px solid #e5e7eb;
  height: 400px;
  position: relative;
}

.history-chart canvas {
  height: 100% !important;
  width: 100% !important;
}

.history-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-item {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.stat-item .stat-label {
  display: block;
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-item .stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

/* === MODALES === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6b7280;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.threshold-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  margin-bottom: 0 !important;
}

.checkbox-label input[type="checkbox"] {
  width: auto !important;
  margin: 0;
}

.checkmark {
  font-weight: 500;
  color: #374151;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-btn {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  color: #374151;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

.save-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .alerts-container {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .page-title {
    font-size: 2rem !important;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    flex-direction: column;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters-left {
    flex-direction: column;
  }
  
  .thresholds-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 1rem;
    max-width: none;
  }
  
  .threshold-form {
    padding: 1.5rem;
  }
  
  .modal-header {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .alerts-main {
    padding: 1rem 0;
  }
  
  .page-header {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.75rem !important;
    flex-direction: column;
    gap: 0.5rem !important;
  }
  
  .tab-content {
    padding: 1rem;
  }
  
  .alert-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .alert-meta {
    justify-content: space-between;
  }
  
  .threshold-values {
    flex-direction: column;
  }
  
  .threshold-actions {
    flex-direction: column;
  }
}

/* === CLASSES UTILITAIRES === */
.text-red-500 { color: #ef4444; }
.text-blue-500 { color: #3b82f6; }
.text-green-500 { color: #10b981; }
.text-yellow-500 { color: #f59e0b; }
.text-gray-500 { color: #6b7280; }
.text-orange-500 { color: #f97316; }

/* === ANIMATIONS === */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-item {
  animation: fadeIn 0.3s ease-out;
}

.stat-card {
  animation: fadeIn 0.3s ease-out;
}

.threshold-card {
  animation: fadeIn 0.3s ease-out;
}

/* === THÈME SOMBRE (OPTIONNEL) === */
@media (prefers-color-scheme: dark) {
  .alerts-page {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }
  
  .page-header,
  .tab-content,
  .stat-card {
    background: rgba(30, 41, 59, 0.95);
    color: #f1f5f9;
    border-color: rgba(71, 85, 105, 0.3);
  }
  
  .page-subtitle,
  .stat-label {
    color: #94a3b8;
  }
  
  .alert-item,
  .threshold-card,
  .device-thresholds {
    background: rgba(51, 65, 85, 0.8);
    border-color: rgba(71, 85, 105, 0.5);
    color: #f1f5f9;
  }
  
  .alert-message {
    color: #e2e8f0;
  }
  
  .modal-content {
    background: #1e293b;
    color: #f1f5f9;
  }
}
</style>