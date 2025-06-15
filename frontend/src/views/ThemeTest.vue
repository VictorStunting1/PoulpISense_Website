<template>
  <div class="theme-test" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <h1>Test de Détection Automatique du Thème</h1>
      
      <div class="status-card">
        <h2>État Actuel</h2>
        <div class="status-grid">
          <div class="status-item">
            <label>Thème système détecté :</label>
            <span :class="systemTheme === 'dark' ? 'dark-indicator' : 'light-indicator'">
              {{ systemTheme === 'dark' ? '🌙 Mode sombre' : '☀️ Mode clair' }}
            </span>
          </div>
          
          <div class="status-item">
            <label>Thème localStorage :</label>
            <span>{{ savedTheme || 'Non défini (utilise système)' }}</span>
          </div>
          
          <div class="status-item">
            <label>Thème appliqué :</label>
            <span :class="isDarkMode ? 'dark-indicator' : 'light-indicator'">
              {{ isDarkMode ? '🌙 Mode sombre' : '☀️ Mode clair' }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="actions-card">
        <h2>Actions de Test</h2>
        <div class="button-grid">
          <button @click="clearThemePreference" class="test-btn clear-btn">
            🗑️ Effacer préférence (utiliser système)
          </button>
          
          <button @click="setLightTheme" class="test-btn light-btn">
            ☀️ Forcer mode clair
          </button>
          
          <button @click="setDarkTheme" class="test-btn dark-btn">
            🌙 Forcer mode sombre
          </button>
          
          <button @click="refreshStatus" class="test-btn refresh-btn">
            🔄 Actualiser
          </button>
        </div>
      </div>
      
      <div class="info-card">
        <h2>Instructions</h2>
        <ul>
          <li>📱 <strong>Pour tester la détection système :</strong> Changez les préférences de votre OS (macOS: Préférences Système > Général > Apparence)</li>
          <li>🗑️ <strong>Cliquez sur "Effacer préférence"</strong> pour que l'app utilise le thème système</li>
          <li>🔄 <strong>Actualisez</strong> pour voir les changements après modification du thème système</li>
          <li>⚙️ <strong>Les boutons "Forcer"</strong> simulent un choix manuel de l'utilisateur</li>
        </ul>
      </div>
      
      <div class="visual-demo">
        <h2>Démonstration Visuelle</h2>
        <div class="demo-content">
          <div class="demo-card">
            <h3>Carte Exemple</h3>
            <p>Ce contenu change d'apparence selon le thème actuel.</p>
            <div class="demo-metrics">
              <div class="metric">
                <span class="metric-label">Température</span>
                <span class="metric-value">24.5°C</span>
              </div>
              <div class="metric">
                <span class="metric-label">pH</span>
                <span class="metric-value">7.2</span>
              </div>
              <div class="metric">
                <span class="metric-label">Turbidité</span>
                <span class="metric-value">315 NTU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// État réactif
const isDarkMode = ref(false)
const systemTheme = ref('light')
const savedTheme = ref(null)

// Fonction pour détecter les préférences système
const detectSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Actions de test
const clearThemePreference = () => {
  localStorage.removeItem('theme')
  refreshStatus()
  updateTheme()
}

const setLightTheme = () => {
  localStorage.setItem('theme', 'light')
  refreshStatus()
  updateTheme()
}

const setDarkTheme = () => {
  localStorage.setItem('theme', 'dark')
  refreshStatus()
  updateTheme()
}

const refreshStatus = () => {
  systemTheme.value = detectSystemTheme()
  savedTheme.value = localStorage.getItem('theme')
}

const updateTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved === null) {
    isDarkMode.value = systemTheme.value === 'dark'
  } else {
    isDarkMode.value = saved === 'dark'
  }
}

// Initialisation
onMounted(() => {
  refreshStatus()
  updateTheme()
  
  // Écouter les changements des préférences système
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleSystemThemeChange = (e) => {
    systemTheme.value = e.matches ? 'dark' : 'light'
    // Seulement si l'utilisateur n'a pas défini de préférence manuelle
    if (localStorage.getItem('theme') === null) {
      isDarkMode.value = e.matches
    }
  }
  
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})
</script>

<style scoped>
.theme-test {
  min-height: 100vh;
  padding: 2rem;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #2d3748);
  transition: all 0.3s ease;
}

.theme-test.dark-mode {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #a0aec0;
  --border-color: #4a5568;
  --card-bg: #2d3748;
}

.theme-test:not(.dark-mode) {
  --bg-primary: #ffffff;
  --bg-secondary: #f7fafc;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --border-color: #e2e8f0;
  --card-bg: #ffffff;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 800;
}

.status-card,
.actions-card,
.info-card,
.visual-demo {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.dark-mode .status-card,
.dark-mode .actions-card,
.dark-mode .info-card,
.dark-mode .visual-demo {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
}

.status-grid {
  display: grid;
  gap: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.status-item label {
  font-weight: 600;
  color: var(--text-primary);
}

.dark-indicator {
  color: #fbbf24;
  font-weight: 600;
}

.light-indicator {
  color: #3b82f6;
  font-weight: 600;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.test-btn {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.clear-btn {
  background: #ef4444;
  color: white;
}

.clear-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.light-btn {
  background: #3b82f6;
  color: white;
}

.light-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.dark-btn {
  background: #6b7280;
  color: white;
}

.dark-btn:hover {
  background: #4b5563;
  transform: translateY(-2px);
}

.refresh-btn {
  background: #10b981;
  color: white;
}

.refresh-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.info-card ul {
  list-style: none;
  padding: 0;
}

.info-card li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
  line-height: 1.6;
}

.info-card li:last-child {
  border-bottom: none;
}

.demo-content {
  display: grid;
  gap: 1.5rem;
}

.demo-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.demo-card h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.demo-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.demo-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.metric-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .theme-test {
    padding: 1rem;
  }
  
  .button-grid {
    grid-template-columns: 1fr;
  }
  
  .demo-metrics {
    grid-template-columns: 1fr;
  }
}
</style>
