<template>
  <div class="alerts-page" :class="{ 'dark-mode': isDarkMode }">
    <!-- Header -->
    <AppHeader 
      @theme-changed="onThemeChanged"
      @open-documentation="openDocumentation"
    />
    <div class="scroll-progress-container">
        <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

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
              <button @click="createThreshold()" class="action-btn primary">
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
                        <button 
                          @click="deleteThreshold(getThreshold(device.id, 'temperature'))"
                          class="delete-btn"
                        >
                          <i class="fas fa-trash"></i>
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
                        <button 
                          @click="deleteThreshold(getThreshold(device.id, 'ph'))"
                          class="delete-btn"
                        >
                          <i class="fas fa-trash"></i>
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
                        <button 
                          @click="deleteThreshold(getThreshold(device.id, 'turbidity'))"
                          class="delete-btn"
                        >
                          <i class="fas fa-trash"></i>
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
          <!-- Message informatif si pré-rempli -->
          <div v-if="thresholdForm.deviceId && thresholdForm.parameterType" class="prefilled-info">
            <i class="fas fa-info-circle"></i>
            Appareil et paramètre pré-sélectionnés depuis la configuration
          </div>
          
          <div class="form-group">
            <label>Appareil</label>
            <select 
              v-model="thresholdForm.deviceId" 
              :class="{ 'prefilled': isFieldLocked('device'), 'locked': isFieldLocked('device') }"
              :disabled="isFieldLocked('device')"
              required
            >
              <option value="">Sélectionner un appareil</option>
              <option v-for="device in userDevices" :key="device.id" :value="device.id">
                {{ device.nom }}
              </option>
            </select>
            <div v-if="isFieldLocked('device')" class="field-lock-info device-locked">
              <i class="fas fa-lock"></i>
              <span>Appareil verrouillé pour cette configuration</span>
            </div>
          </div>
          <div class="form-group">
            <label>Paramètre</label>
            <select 
              v-model="thresholdForm.parameterType" 
              :class="{ 'prefilled': isFieldLocked('parameter'), 'locked': isFieldLocked('parameter') }"
              :disabled="isFieldLocked('parameter')"
              required
            >
              <option value="">Sélectionner un paramètre</option>
              <option value="temperature">Température</option>
              <option value="ph">pH</option>
              <option value="turbidity">Turbidité</option>
            </select>
            <div v-if="isFieldLocked('parameter')" class="field-lock-info parameter-locked">
              <i class="fas fa-lock"></i>
              <span>Paramètre verrouillé pour cette configuration</span>
            </div>
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

    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteConfirmation" class="modal-overlay" @click="closeDeleteConfirmation">
      <div class="modal-content delete-modal" @click.stop>
        <div class="modal-header delete-header">
          <div class="delete-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Confirmer la suppression</h3>
          <button @click="closeDeleteConfirmation" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="delete-content">
          <p class="delete-message">
            Êtes-vous sûr de vouloir supprimer ce seuil d'alerte ?
          </p>
          <div v-if="thresholdToDelete" class="threshold-details">
            <div class="detail-item">
              <span class="detail-label">Paramètre :</span>
              <span class="detail-value">{{ thresholdToDelete.parameterType === 'temperature' ? 'Température' : thresholdToDelete.parameterType === 'ph' ? 'pH' : 'Turbidité' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Valeurs :</span>
              <span class="detail-value">
                {{ thresholdToDelete.minValue }} - {{ thresholdToDelete.maxValue }}
                {{ thresholdToDelete.parameterType === 'temperature' ? '°C' : thresholdToDelete.parameterType === 'turbidity' ? 'NTU' : '' }}
              </span>
            </div>
          </div>
          <p class="warning-text">
            <i class="fas fa-info-circle"></i>
            Cette action est irréversible et supprimera définitivement ce seuil d'alerte.
          </p>
        </div>
        <div class="modal-actions delete-actions">
          <button @click="closeDeleteConfirmation" class="cancel-btn">
            <i class="fas fa-times"></i>
            Annuler
          </button>
          <button @click="confirmDeleteThreshold" class="delete-confirm-btn">
            <i class="fas fa-trash"></i>
            Supprimer
          </button>
        </div>
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
const scrollProgress = ref(0)

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

// Variables pour la modal de suppression
const showDeleteConfirmation = ref(false)
const thresholdToDelete = ref(null)

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

// Fonction pour détecter les préférences système
const detectSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Fonctions utilitaires
const onThemeChanged = (newTheme) => {
  isDarkMode.value = newTheme
  // Sauvegarder la préférence utilisateur
  localStorage.setItem('theme', newTheme ? 'dark' : 'light')
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

function createThreshold(deviceId = '', parameterType = '') {
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

// Fonction pour déterminer si un champ doit être verrouillé
function isFieldLocked(fieldType) {
  if (fieldType === 'device') {
    // Le champ appareil est verrouillé si :
    // 1. On est en mode édition OU
    // 2. On a pré-rempli l'appareil via le bouton "+"
    return editingThreshold.value !== null || thresholdForm.value.deviceId !== ''
  }
  
  if (fieldType === 'parameter') {
    // Le champ paramètre est verrouillé si :
    // 1. On est en mode édition OU
    // 2. On a pré-rempli le paramètre via le bouton "+"
    return editingThreshold.value !== null || thresholdForm.value.parameterType !== ''
  }
  
  return false
}

async function saveThreshold() {
  try {
    if (!currentUser.value?.id) {
      console.error('ID utilisateur requis pour créer un seuil')
      return
    }
    
    // Nettoyer les données - enlever les métadonnées .NET et les références circulaires
    const cleanData = {
      deviceId: thresholdForm.value.deviceId,
      userId: currentUser.value.id,
      parameterType: thresholdForm.value.parameterType,
      minValue: thresholdForm.value.minValue,
      maxValue: thresholdForm.value.maxValue,
      isActive: thresholdForm.value.isActive
    }
    
    console.log('Données nettoyées à envoyer:', cleanData)
    
    if (editingThreshold.value) {
      const response = await axios.put(`${API_CONFIG.BASE_URL}/api/alert-thresholds/${editingThreshold.value.id}`, cleanData)
      // Mettre à jour le seuil dans la liste
      const index = thresholds.value.findIndex(t => t.id === editingThreshold.value.id)
      if (index !== -1) {
        thresholds.value[index] = { ...thresholds.value[index], ...cleanData }
      }
      console.log('Seuil mis à jour avec succès')
    } else {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/api/alert-thresholds`, cleanData)
      thresholds.value.push(response.data)
      console.log('Seuil créé avec succès')
    }
    
    closeModal()
    // Rafraîchir les seuils pour avoir les données à jour
    await fetchThresholds()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du seuil:', error)
    if (error.response) {
      console.error('Détails de l\'erreur:', error.response.status, error.response.data)
    }
    alert('Erreur lors de la sauvegarde du seuil. Vérifiez la console pour plus de détails.')
  }
}

async function deleteThreshold(threshold) {
  thresholdToDelete.value = threshold
  showDeleteConfirmation.value = true
}

async function confirmDeleteThreshold() {
  if (!thresholdToDelete.value) return
  
  try {
    await axios.delete(`${API_CONFIG.BASE_URL}/api/alert-thresholds/${thresholdToDelete.value.id}`)
    // Retirer le seuil de la liste
    const index = thresholds.value.findIndex(t => t.id === thresholdToDelete.value.id)
    if (index !== -1) {
      thresholds.value.splice(index, 1)
    }
    closeDeleteConfirmation()
  } catch (error) {
    console.error('Erreur lors de la suppression du seuil:', error)
    alert('Erreur lors de la suppression du seuil. Vérifiez la console pour plus de détails.')
  }
}

function closeDeleteConfirmation() {
  showDeleteConfirmation.value = false
  thresholdToDelete.value = null
}

async function toggleThreshold(threshold) {
  try {
    await axios.patch(`${API_CONFIG.BASE_URL}/api/alert-thresholds/${threshold.id}/toggle`)
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
  
  // Couleurs adaptées au thème
  const primaryColor = isDarkMode.value ? '#ac99ea' : '#667eea'
  const backgroundColor = isDarkMode.value ? 'rgba(172, 153, 234, 0.1)' : 'rgba(99, 102, 241, 0.1)'
  const gridColor = isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  const textColor = isDarkMode.value ? '#f7fafc' : '#2d3748'
  
  // Données basées sur les vraies alertes
  const chartData = {
    labels,
    datasets: [{
      label: 'Nombre d\'alertes',
      data,
      borderColor: primaryColor,
      backgroundColor: backgroundColor,
      tension: 0.3,
      fill: true,
      pointBackgroundColor: primaryColor,
      pointBorderColor: isDarkMode.value ? '#1a202c' : '#fff',
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
          labels: {
            color: textColor
          }
        },
        title: {
          display: true,
          text: `Évolution des alertes - ${getPeriodLabel()}`,
          color: textColor
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: isDarkMode.value ? 'rgba(26, 32, 44, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: primaryColor,
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: textColor,
            callback: function(value) {
              return Number.isInteger(value) ? value : ''
            }
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
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
  // Initialiser le thème selon les préférences système ou localStorage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === null) {
    isDarkMode.value = detectSystemTheme()
  } else {
    isDarkMode.value = savedTheme === 'dark'
  }
  
  // Écouter les changements des préférences système
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleSystemThemeChange = (e) => {
    // Seulement si l'utilisateur n'a pas défini de préférence manuelle
    if (localStorage.getItem('theme') === null) {
      isDarkMode.value = e.matches
    }
  }
  
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  
  const email = userEmail.value
  if (!email) {
    console.log('Utilisateur non connecté, redirection vers login')
    router.push('/login')
    return
  }
  
  console.log('Utilisateur connecté:', email)
  await refreshData()

  window.addEventListener('scroll', updateScrollProgress, { passive: true })
})

// Ajouter cette fonction :
const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const progress = (scrollTop / docHeight) * 100
  scrollProgress.value = Math.min(100, Math.max(0, progress))
}
</script>

<style scoped>
/* === VARIABLES CSS ET THÈME === */
.alerts-page {
  min-height: 100vh;
  position: relative;
  color: var(--text-primary);
  transition: all 0.3s ease;
  overflow-x: hidden;
  
  /* Mode clair par défaut */
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --bg-primary: rgba(255, 255, 255, 0.9);
  --bg-secondary: rgba(247, 250, 252, 0.9);
  --border-color: rgba(226, 232, 240, 0.8);
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.1);
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --danger-gradient: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  --warning-gradient: linear-gradient(135deg, #feca57 0%, #ff9ff3 100%);
  --success-gradient: linear-gradient(135deg, #5f27cd 0%, #00d2d3 100%);
  
  /* Fond dégradé identique à Dashboard.vue */
  background: var(--primary-gradient);
}

.alerts-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 0.9) 0%, 
    rgba(118, 75, 162, 0.8) 50%, 
    rgba(240, 147, 251, 0.7) 100%);
  backdrop-filter: blur(10px);
  z-index: -1;
}

/* Mode sombre */
.alerts-page.dark-mode {
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --bg-primary: rgba(30, 41, 59, 0.9);
  --bg-secondary: rgba(51, 65, 85, 0.9);
  --border-color: rgba(71, 85, 105, 0.6);
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.2);
  --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.3);
  
  /* Fond sombre */
  background: linear-gradient(135deg, #190649 0%, #2B0B98 50%, #0d0225 100%);
}

.alerts-page.dark-mode::before {
  background: linear-gradient(135deg, 
    rgba(25, 6, 73, 0.95) 0%, 
    rgba(43, 11, 152, 0.9) 50%, 
    rgba(13, 2, 37, 0.85) 100%);
}

/* === LAYOUT GÉNÉRAL === */
.alerts-main {
  padding: 6rem 0 2rem 0; 
  min-height: calc(100vh - 140px);
  position: relative;
  z-index: 1;
}

.alerts-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* === EN-TÊTE DE PAGE === */
.page-header {
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
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
  background: var(--primary-gradient);
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
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin: 0;
}

.refresh-btn {
  background: var(--primary-gradient);
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

/* Mode sombre pour le bouton refresh - avec spécificité élevée */
.alerts-page.dark-mode .refresh-btn {
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.8), rgba(223, 216, 247, 0.6)) !important;
  color: #f7fafc !important;
  border: 1px solid rgba(172, 153, 234, 0.4) !important;
}

.alerts-page.dark-mode .refresh-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.9), rgba(223, 216, 247, 0.7)) !important;
  box-shadow: 0 8px 25px rgba(172, 153, 234, 0.5) !important;
  transform: translateY(-2px);
}

.alerts-page.dark-mode .refresh-btn:disabled {
  background: rgba(172, 153, 234, 0.3) !important;
  opacity: 0.5;
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
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
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

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

/* === ONGLETS === */
.tabs-container {
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
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
  color: var(--text-secondary);
}

.tab:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #667eea;
}

.tab.active {
  background: var(--primary-gradient);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Mode sombre pour les onglets - avec spécificité élevée */
.alerts-page.dark-mode .tab {
  color: #9ca3af !important;
  background: rgba(45, 55, 72, 0.5) !important;
}

.alerts-page.dark-mode .tab:hover {
  background: rgba(172, 153, 234, 0.15) !important;
  color: #DFD8F7 !important;
}

.alerts-page.dark-mode .tab.active {
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.8), rgba(223, 216, 247, 0.6)) !important;
  color: #f7fafc !important;
  box-shadow: 0 4px 15px rgba(172, 153, 234, 0.4) !important;
}

/* === CONTENU DES ONGLETS === */
.tab-content {
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
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

/* Mode sombre pour les filtres - avec spécificité élevée */
.alerts-page.dark-mode .device-filter,
.alerts-page.dark-mode .status-filter,
.alerts-page.dark-mode .period-filter {
  background: rgba(45, 55, 72, 0.9) !important;
  color: #e2e8f0 !important;
  border: 2px solid rgba(172, 153, 234, 0.3) !important;
}

.alerts-page.dark-mode .device-filter:focus,
.alerts-page.dark-mode .status-filter:focus,
.alerts-page.dark-mode .period-filter:focus {
  border-color: #ac99ea !important;
  background: rgba(45, 55, 72, 0.95) !important;
  box-shadow: 0 0 0 3px rgba(172, 153, 234, 0.2) !important;
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

/* Mode sombre pour les boutons d'action - avec spécificité élevée */
.alerts-page.dark-mode .action-btn.primary {
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.8), rgba(223, 216, 247, 0.6)) !important;
  color: #f7fafc !important;
  border: 2px solid rgba(172, 153, 234, 0.4) !important;
  box-shadow: 0 4px 15px rgba(172, 153, 234, 0.3) !important;
}

.alerts-page.dark-mode .action-btn.secondary {
  background: rgba(45, 55, 72, 0.8) !important;
  color: #e2e8f0 !important;
  border: 2px solid rgba(172, 153, 234, 0.3) !important;
}

.alerts-page.dark-mode .action-btn.secondary:hover {
  background: rgba(172, 153, 234, 0.2) !important;
  border-color: rgba(172, 153, 234, 0.5) !important;
  color: #f7fafc !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(172, 153, 234, 0.3) !important;
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

.delete-btn {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
}

.delete-btn:hover {
  background: #ef4444;
  border-color: #ef4444;
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

/* Message informatif pour les champs pré-remplis */
.prefilled-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  color: #1d4ed8;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.prefilled-info i {
  color:
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

/* Styles pour les champs pré-remplis */
.form-group select.prefilled {
  background: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.3);
  color: #1d4ed8;
  font-weight: 500;
}

.form-group select.prefilled:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
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

/* === AMÉLIORATION DU CONTRASTE === */
/* Mode clair - amélioration des couleurs */
.alerts-page:not(.dark-mode) .alert-item {
  background: #ffffff;
  color: #1a202c;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.alerts-page:not(.dark-mode) .alert-item.unread {
  border-left: 4px solid #ef4444;
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.08) 0%, #ffffff 10%);
}

.alerts-page:not(.dark-mode) .alert-message {
  color: #2d3748;
  font-weight: 500;
}

.alerts-page:not(.dark-mode) .alert-device {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.alerts-page:not(.dark-mode) .tab-content {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(160, 174, 192, 0.2);
}

.alerts-page:not(.dark-mode) .device-filter,
.alerts-page:not(.dark-mode) .status-filter,
.alerts-page:not(.dark-mode) .period-filter {
   background: #ffffff;
  color: #2d3748;
  border: 2px solid #e2e8f0;
}

.alerts-page:not(.dark-mode) .device-filter:focus,
.alerts-page:not(.dark-mode) .status-filter:focus,
.alerts-page:not(.dark-mode) .period-filter:focus {
  border-color: #667eea;
  background: #ffffff;
}

/* Mode sombre - amélioration des couleurs */
.alerts-page.dark-mode .alert-item {
  background: rgba(45, 55, 72, 0.9);
  color: #f7fafc;
  border: 2px solid rgba(172, 153, 234, 0.3);
}

.alerts-page.dark-mode .alert-item.unread {
  border-left: 4px solid #fc8181;
  background: linear-gradient(90deg, rgba(252, 129, 129, 0.15) 0%, rgba(45, 55, 72, 0.9) 15%);
}

.alerts-page.dark-mode .alert-message {
  color: #e2e8f0;
  font-weight: 400;
}

.alerts-page.dark-mode .alert-device {
  background: rgba(172, 153, 234, 0.2);
  color: #DFD8F7;
  border: 1px solid rgba(172, 153, 234, 0.4);
}

.alerts-page.dark-mode .device-filter,
.alerts-page.dark-mode .status-filter,
.alerts-page.dark-mode .period-filter {
  background: rgba(45, 55, 72, 0.9);
  color: #e2e8f0;
  border: 2px solid rgba(172, 153, 234, 0.3);
}

.alerts-page.dark-mode .device-filter:focus,
.alerts-page.dark-mode .status-filter:focus,
.alerts-page.dark-mode .period-filter:focus {
  border-color: #ac99ea;
  background: rgba(45, 55, 72, 0.95);
}

.alerts-page.dark-mode .threshold-card,
.alerts-page.dark-mode .device-thresholds {
  background: rgba(45, 55, 72, 0.9);
  border: 2px solid rgba(172, 153, 234, 0.3);
  color: #f7fafc;
}

.alerts-page.dark-mode .threshold-type {
  color: #e2e8f0;
}

.alerts-page.dark-mode .device-header h3 {
  color: #f7fafc;
}

.alerts-page.dark-mode .device-location {
  background: rgba(172, 153, 234, 0.2);
  color: #DFD8F7;
}

.alerts-page.dark-mode .section-header h2 {
  color: #f7fafc;
}

.alerts-page.dark-mode .history-chart,
.alerts-page.dark-mode .stat-item {
  background: rgba(45, 55, 72, 0.9);
  border: 2px solid rgba(172, 153, 234, 0.3);
  color: #f7fafc;
}

.alerts-page.dark-mode .stat-item .stat-value {
  color: #f7fafc;
}

.alerts-page.dark-mode .stat-item .stat-label {
  color: #e2e8f0;
}

.alerts-page.dark-mode .modal-content {
  background: rgba(26, 32, 44, 0.95);
  color: #f7fafc;
}

.alerts-page.dark-mode .modal-header h3 {
  color: #f7fafc;
}

.alerts-page.dark-mode .form-group label {
  color: #e2e8f0;
}

.alerts-page.dark-mode .form-group input,
.alerts-page.dark-mode .form-group select {
  background: rgba(45, 55, 72, 0.9);
  border: 2px solid rgba(172, 153, 234, 0.3);
  color: #f7fafc;
}

.alerts-page.dark-mode .form-group input:focus,
.alerts-page.dark-mode .form-group select:focus {
  border-color: #ac99ea;
  background: rgba(45, 55, 72, 0.95);
}

/* Styles en mode sombre pour les champs pré-remplis */
.alerts-page.dark-mode .prefilled-info {
  background: rgba(172, 153, 234, 0.15) !important;
  border-color: rgba(172, 153, 234, 0.3) !important;
  color: #DFD8F7 !important;
}

.alerts-page.dark-mode .prefilled-info i {
  color: #ac99ea !important;
}

.alerts-page.dark-mode .form-group select.prefilled {
  background: rgba(172, 153, 234, 0.1) !important;
  border-color: rgba(172, 153, 234, 0.4) !important;
  color: #DFD8F7 !important;
}

.alerts-page.dark-mode .form-group select.prefilled:focus {
  border-color: #ac99ea !important;
  box-shadow: 0 0 0 3px rgba(172, 153, 234, 0.3) !important;
}

.alerts-page.dark-mode .checkmark {
  color: #e2e8f0;
}

.alerts-page.dark-mode .cancel-btn {
  background: rgba(172, 153, 234, 0.2) !important;
  border: 2px solid rgba(172, 153, 234, 0.3) !important;
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .cancel-btn:hover {
  background: rgba(172, 153, 234, 0.3) !important;
  border-color: rgba(172, 153, 234, 0.5) !important;
  color: #f7fafc !important;
}

/* === STYLES MANQUANTS EN MODE SOMBRE === */

/* Boutons de pagination */
.alerts-page.dark-mode .pagination-btn {
  background: rgba(45, 55, 72, 0.9) !important;
  border: 2px solid rgba(172, 153, 234, 0.3) !important;
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .pagination-btn:hover:not(:disabled) {
  border-color: rgba(172, 153, 234, 0.6) !important;
  background: rgba(172, 153, 234, 0.2) !important;
  color: #f7fafc !important;
}

.alerts-page.dark-mode .pagination-btn:disabled {
  background: rgba(45, 55, 72, 0.5) !important;
  border-color: rgba(172, 153, 234, 0.2) !important;
  color: #6b7280 !important;
}

.alerts-page.dark-mode .pagination-info {
  color: #e2e8f0 !important;
}

/* Boutons toggle pour les seuils */
.alerts-page.dark-mode .toggle-btn {
  background: rgba(45, 55, 72, 0.9) !important;
  border: 2px solid rgba(172, 153, 234, 0.3) !important;
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .toggle-btn.active {
  background: rgba(52, 211, 153, 0.6) !important;
  border-color: rgba(52, 211, 153, 0.8) !important;
  color: #f7fafc !important;
}

.alerts-page.dark-mode .toggle-btn:not(.active):hover {
  background: rgba(172, 153, 234, 0.3) !important;
  border-color: rgba(172, 153, 234, 0.5) !important;
}

/* Boutons d'édition */
.alerts-page.dark-mode .edit-btn {
  background: rgba(45, 55, 72, 0.8) !important;
  border-color: rgba(172, 153, 234, 0.3) !important;
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .edit-btn:hover {
  background: rgba(172, 153, 234, 0.6) !important;
  border-color: rgba(172, 153, 234, 0.8) !important;
  color: #f7fafc !important;
}

/* Boutons d'ajout de seuil */
.alerts-page.dark-mode .add-threshold-btn {
  background: rgba(45, 55, 72, 0.9) !important;
  border: 2px solid rgba(172, 153, 234, 0.3) !important;
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .add-threshold-btn:hover {
  background: rgba(172, 153, 234, 0.3) !important;
  border-color: rgba(172, 153, 234, 0.6) !important;
  color: #f7fafc !important;
}

/* Boutons de fermeture modal */
.alerts-page.dark-mode .close-btn {
  color: #e2e8f0 !important;
  background: rgba(45, 55, 72, 0.5) !important;
}

.alerts-page.dark-mode .close-btn:hover {
  background: rgba(172, 153, 234, 0.3) !important;
  color: #f7fafc !important;
}

/* Boutons save pour modales */
.alerts-page.dark-mode .save-btn {
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.8), rgba(223, 216, 247, 0.6)) !important;
  color: #f7fafc !important;
  border: none !important;
}

.alerts-page.dark-mode .save-btn:hover {
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.9), rgba(223, 216, 247, 0.7)) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(172, 153, 234, 0.4) !important;
}

/* Checkboxes personnalisées */
.alerts-page.dark-mode .checkbox-label {
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .checkbox-label input[type="checkbox"] {
  background: rgba(45, 55, 72, 0.9) !important;
  border: 2px solid rgba(172, 153, 234, 0.3) !important;
}

.alerts-page.dark-mode .checkbox-label input[type="checkbox"]:checked {
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.8), rgba(223, 216, 247, 0.6)) !important;
  border-color: rgba(172, 153, 234, 0.6) !important;
}

/* Icônes de flèches dans la pagination */
.alerts-page.dark-mode .pagination-btn i {
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .pagination-btn:hover:not(:disabled) i {
  color: #f7fafc !important;
}

/* États vides */
.alerts-page.dark-mode .empty-state {
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .empty-state i {
  color: #ac99ea !important;
}

.alerts-page.dark-mode .empty-state h3 {
  color: #f7fafc !important;
}

/* Loading containers */
.alerts-page.dark-mode .loading-container {
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .loading-spinner {
  border-color: rgba(172, 153, 234, 0.2) !important;
  border-top-color: #ac99ea !important;
}

/* État "no threshold" */
.alerts-page.dark-mode .no-threshold {
  color: #9ca3af !important;
}

/* Valeurs de seuils */
.alerts-page.dark-mode .min-value,
.alerts-page.dark-mode .max-value {
  background: rgba(172, 153, 234, 0.2) !important;
  color: #DFD8F7 !important;
}

/* Types d'alertes */
.alerts-page.dark-mode .alert-type i.fas.fa-exclamation-triangle {
  color: #fbbf24 !important;
}

.alerts-page.dark-mode .alert-type i.fas.fa-thermometer-half {
  color: #f87171 !important;
}

.alerts-page.dark-mode .alert-type i.fas.fa-flask {
  color: #60a5fa !important;
}

.alerts-page.dark-mode .alert-type i.fas.fa-water {
  color: #34d399 !important;
}

/* Boutons d'export et d'actions dans les en-têtes */
.alerts-page.dark-mode .header-actions .refresh-btn:disabled {
  background: rgba(45, 55, 72, 0.5) !important;
  color: #6b7280 !important;
  border-color: rgba(172, 153, 234, 0.2) !important;
}

/* Styles de mode sombre pour les boutons d'action des seuils */
.alerts-page.dark-mode .edit-btn {
  background: rgba(45, 55, 72, 0.8) !important;
  border-color: rgba(172, 153, 234, 0.3) !important;
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .edit-btn:hover {
  background: rgba(172, 153, 234, 0.6) !important;
  border-color: rgba(172, 153, 234, 0.8) !important;
  color: #f7fafc !important;
}

.alerts-page.dark-mode .delete-btn {
  background: rgba(45, 55, 72, 0.8) !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
  color: #f87171 !important;
}

.alerts-page.dark-mode .delete-btn:hover {
  background: rgba(239, 68, 68, 0.6) !important;
  border-color: rgba(239, 68, 68, 0.8) !important;
  color: #f7fafc !important;
}

.alerts-page.dark-mode .toggle-btn {
  background: rgba(45, 55, 72, 0.8) !important;
  border-color: rgba(172, 153, 234, 0.3) !important;
  color: #e2e8f0 !important;
}

.alerts-page.dark-mode .toggle-btn.active {
  background: rgba(52, 211, 153, 0.6) !important;
  border-color: rgba(52, 211, 153, 0.8) !important;
  color: #f7fafc !important;
}

.alerts-page.dark-mode .toggle-btn:not(.active):hover {
  background: rgba(172, 153, 234, 0.3) !important;
  border-color: rgba(172, 153, 234, 0.5) !important;
}

/* === MODAL DE SUPPRESSION === */
.delete-modal {
  max-width: 500px;
  border-radius: 16px;
  overflow: hidden;
}

.delete-header {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #fca5a5;
}

.delete-icon {
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #dc2626;
}

.delete-header h3 {
  flex: 1;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.delete-content {
  padding: 2rem;
}

.delete-message {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.threshold-details {
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  padding: 1rem;
  margin: 1.5rem 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-weight: 600;
  color: var(--text-secondary);
}

.detail-value {
  font-weight: 700;
  color: var(--text-primary);
  text-transform: capitalize;
}

.warning-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d97706;
  font-size: 0.9rem;
  margin: 1.5rem 0 0 0;
  padding: 1rem;
  background: rgba(251, 146, 60, 0.1);
  border: 1px solid rgba(251, 146, 60, 0.2);
  border-radius: 8px;
}

.delete-actions {
  padding: 1.5rem 2rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.delete-confirm-btn {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
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

.delete-confirm-btn:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
}

/* Mode sombre pour la modal de suppression */
.alerts-page.dark-mode .delete-header {
  background: linear-gradient(135deg, rgba(254, 226, 226, 0.1), rgba(254, 202, 202, 0.15));
  color: #fca5a5;
  border-bottom-color: rgba(248, 113, 113, 0.3);
}

.alerts-page.dark-mode .delete-icon {
  background: rgba(248, 113, 113, 0.2);
  color: #f87171;
}

.alerts-page.dark-mode .threshold-details {
  background: rgba(172, 153, 234, 0.1);
  border-color: rgba(172, 153, 234, 0.2);
}

.alerts-page.dark-mode .warning-text {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.alerts-page.dark-mode .delete-actions {
  background: rgba(51, 65, 85, 0.9);
  border-top-color: rgba(74, 85, 104, 0.6);
}

.alerts-page.dark-mode .delete-modal .delete-confirm-btn {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.8), rgba(185, 28, 28, 0.9)) !important;
  border: 1px solid rgba(248, 113, 113, 0.4) !important;
  color: #f7fafc !important;
}

.alerts-page.dark-mode .delete-modal .delete-confirm-btn:hover {
  background: linear-gradient(135deg, rgba(185, 28, 28, 0.9), rgba(153, 27, 27, 0.95)) !important;
  box-shadow: 0 8px 25px rgba(248, 113, 113, 0.4) !important;
  transform: translateY(-2px);
  color: #ffffff !important;
}

/* === NOUVEAUX STYLES PROPOSÉS === */
/* Styles pour les informations de verrouillage des champs */
.field-lock-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #92400e;
  transition: all 0.3s ease;
}

.field-lock-info i {
  color: #f59e0b;
  font-size: 0.9rem;
  opacity: 0.8;
}

.field-lock-info span {
  color: #92400e;
  font-weight: 500;
}

/* Animation subtile */
.field-lock-info {
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

/* Effet hover pour une meilleure interactivité */
.field-lock-info:hover {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%);
  border-color: rgba(251, 191, 36, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.2);
}

.field-lock-info:hover i {
  opacity: 1;
  transform: scale(1.1);
}

/* Mode sombre pour les informations de verrouillage */
.alerts-page.dark-mode .field-lock-info {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%) !important;
  border: 1px solid rgba(251, 191, 36, 0.4) !important;
  color: #fbbf24 !important;
}

.alerts-page.dark-mode .field-lock-info i {
  color: #fcd34d !important;
}

.alerts-page.dark-mode .field-lock-info span {
  color: #fbbf24 !important;
}

.alerts-page.dark-mode .field-lock-info:hover {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%) !important;
  border-color: rgba(251, 191, 36, 0.5) !important;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3) !important;
}

/* Amélioration responsive */
@media (max-width: 768px) {
  .field-lock-info {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    gap: 0.4rem;
  }
  
  .field-lock-info i {
    font-size: 0.8rem;
  }
}

/* Variante pour différents états de verrouillage */
.field-lock-info.device-locked {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
  border-color: rgba(59, 130, 246, 0.3);
  color: #1d4ed8;
}

.field-lock-info.device-locked i {
  color: #3b82f6;
}

.field-lock-info.device-locked span {
  color: #1d4ed8;
}

.field-lock-info.parameter-locked {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
  border-color: rgba(168, 85, 247, 0.3);
  color: #7c3aed;
}

.field-lock-info.parameter-locked i {
  color: #a855f7;
}

.field-lock-info.parameter-locked span {
  color: #7c3aed;
}

/* Mode sombre pour les variantes */
.alerts-page.dark-mode .field-lock-info.device-locked {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%) !important;
  border-color: rgba(59, 130, 246, 0.4) !important;
  color: #60a5fa !important;
}

.alerts-page.dark-mode .field-lock-info.device-locked i {
  color: #93c5fd !important;
}

.alerts-page.dark-mode .field-lock-info.device-locked span {
  color: #60a5fa !important;
}

.alerts-page.dark-mode .field-lock-info.parameter-locked {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%) !important;
  border-color: rgba(168, 85, 247, 0.4) !important;
  color: #c084fc !important;
}

.alerts-page.dark-mode .field-lock-info.parameter-locked i {
  color: #d8b4fe !important;
}

.alerts-page.dark-mode .field-lock-info.parameter-locked span {
  color: #c084fc !important;
}
</style>