<template>
  <div class="home-container" :class="{ 'dark-mode': isDarkMode }">
    <!-- Barre de progression du scroll -->
    <div class="scroll-progress-container">
        <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- Header -->
    <AppHeader @theme-changed="onThemeChanged" />

    <!-- Hero Section avec animations -->
    <section class="hero-section">


      <div class="hero-content">
        <!-- Animation d'entrée pour le logo -->
        <div class="logo-container" v-motion-slide-visible-once-bottom>
          <h1 class="main-title">PoulpISence</h1>
        </div>
        
        <!-- Textes avec animations décalées -->
        <p class="hero-subtitle" v-motion-slide-visible-once-bottom :delay="200">
          Votre solution IoT complète pour la surveillance environnementale
        </p>
        <p class="hero-description" v-motion-slide-visible-once-bottom :delay="400">
          Surveillez et analysez vos capteurs de température, pH et turbidité en temps réel avec notre plateforme intelligente et intuitive
        </p>
        
        <!-- Boutons avec animations -->
        <div class="cta-buttons" v-motion-slide-visible-once-bottom :delay="600">
          <router-link to="/dashboard" class="btn btn-primary">
            <i class="fas fa-chart-line"></i>
            <span>Tableau de Bord</span>
            <div class="btn-glow"></div>
          </router-link>
          <router-link to="/devices" class="btn btn-secondary">
            <i class="fas fa-robot"></i>
            <span>Gérer les Appareils</span>
            <div class="btn-glow"></div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section avec animations en scroll -->
    <section class="features-section" ref="featuresSection">
      <div class="container">
        <h2 class="section-title" v-motion-slide-visible-once-bottom>Fonctionnalités Principales</h2>
        <div class="features-grid">
          <div class="feature-card" v-motion-slide-visible-once-bottom :delay="100">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-thermometer-half"></i>
              </div>
              <div class="feature-badge">En temps réel</div>
            </div>
            <h3>Surveillance Temps Réel</h3>
            <p>Monitoring continu de la température, pH et turbidité avec alertes automatiques et notifications intelligentes</p>
            <div class="feature-footer">
              <span class="feature-stat">24/7</span>
              <span class="feature-label">Surveillance</span>
            </div>
          </div>
          
          <div class="feature-card" v-motion-slide-visible-once-bottom :delay="200">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-chart-bar"></i>
              </div>
              <div class="feature-badge">Analytics</div>
            </div>
            <h3>Analyses Avancées</h3>
            <p>Graphiques interactifs et historiques détaillés pour analyser les tendances et optimiser vos paramètres</p>
            <div class="feature-footer">
              <span class="feature-stat">∞</span>
              <span class="feature-label">Données</span>
            </div>
          </div>
          
          <div class="feature-card" v-motion-slide-visible-once-bottom :delay="300">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-bell"></i>
              </div>
              <div class="feature-badge">Smart</div>
            </div>
            <h3>Alertes Intelligentes</h3>
            <p>Seuils personnalisés et notifications en temps réel pour prévenir les problèmes avant qu'ils ne surviennent</p>
            <div class="feature-footer">
              <span class="feature-stat">
                <i class="fas fa-bolt"></i>
              </span>
              <span class="feature-label">Instantané</span>
            </div>
          </div>
          
          <div class="feature-card" v-motion-slide-visible-once-bottom :delay="400">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <div class="feature-badge">Mobile</div>
            </div>
            <h3>Gestion Simplifiée</h3>
            <p>Ajout d'appareils par QR Code et interface intuitive multiplateforme pour une expérience optimale</p>
            <div class="feature-footer">
              <span class="feature-stat">
                <i class="fas fa-mobile-alt"></i>
              </span>
              <span class="feature-label">Multi-OS</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section de démonstration -->
    <section class="demo-section">
      <div class="container">
        <div class="demo-content">
          <div class="demo-text" v-motion-slide-visible-once-left>
            <h2>Interface Moderne & Intuitive</h2>
            <p>Découvrez une expérience utilisateur repensée avec des visualisations en temps réel, des graphiques interactifs et une navigation fluide.</p>
            <div class="demo-features">
              <div class="demo-feature">
                <span class="demo-icon">
                  <i class="fas fa-sparkles"></i>
                </span>
                <span>Design moderne</span>
              </div>
              <div class="demo-feature">
                <span class="demo-icon">
                  <i class="fas fa-crosshairs"></i>
                </span>
                <span>Navigation intuitive</span>
              </div>
              <div class="demo-feature">
                <span class="demo-icon">
                  <i class="fas fa-mobile-alt"></i>
                </span>
                <span>Responsive design</span>
              </div>
            </div>
            <router-link to="/dashboard" class="demo-btn">
              <span>Voir la démo</span>
              <span class="demo-arrow">
                <i class="fas fa-arrow-right"></i>
              </span>
            </router-link>
          </div>
          <div class="demo-visual" v-motion-slide-visible-once-right>
            <div class="demo-dashboard">
              <div class="demo-header">
                <div class="demo-dot red"></div>
                <div class="demo-dot yellow"></div>
                <div class="demo-dot green"></div>
              </div>
              <div class="demo-content-area">
                <div class="demo-chart">
                  <div class="chart-bars">
                    <div class="bar" style="height: 60%"></div>
                    <div class="bar" style="height: 80%"></div>
                    <div class="bar" style="height: 45%"></div>
                    <div class="bar" style="height: 90%"></div>
                    <div class="bar" style="height: 70%"></div>
                  </div>
                </div>
                <div class="demo-stats">
                  <div class="demo-stat">
                    <div class="stat-value">24°C</div>
                    <div class="stat-label">Température</div>
                  </div>
                  <div class="demo-stat">
                    <div class="stat-value">7.2</div>
                    <div class="stat-label">pH</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter :isDarkMode="isDarkMode" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api.js'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

// Import FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'

const router = useRouter()

// État du thème
const isDarkMode = ref(false)

const scrollProgress = ref(0)

// Données réactives
const totalDevices = ref(0)
const activeAlerts = ref(0)
const onlineDevices = ref(0)
const measurementsToday = ref(0)

// Valeurs animées pour les compteurs
const animatedDevices = ref(0)
const animatedAlerts = ref(0)
const animatedOnline = ref(0)
const animatedMeasurements = ref(0)

// Références pour les éléments DOM
const heroParticles = ref(null)
const featuresSection = ref(null)

// Fonctions
const navigateTo = (path) => {
  router.push(path)
}

const onThemeChanged = (darkMode) => {
  isDarkMode.value = darkMode
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
}

// Animation des compteurs
const animateCounter = (target, current, duration = 2000) => {
  const startTime = Date.now()
  const startValue = current.value
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Fonction d'easing pour une animation plus fluide
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    current.value = Math.round(startValue + (target - startValue) * easeOutQuart)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}

// Création des particules animées
const createParticles = () => {
  if (!heroParticles.value) return

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    particle.style.animationDelay = Math.random() * 20 + 's'
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's'
    heroParticles.value.appendChild(particle)
  }
}

const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const progress = (scrollTop / docHeight) * 100
  scrollProgress.value = Math.min(100, Math.max(0, progress))
}

// Effet de parallaxe au scroll
const handleScroll = () => {
  const scrollY = window.scrollY
  const shapes = document.querySelectorAll('.shape')
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1
    shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`
  })
  
  // Ajouter l'appel à updateScrollProgress
  updateScrollProgress()
}

// Intersection Observer pour les animations
const setupIntersectionObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        
        // Déclencher l'animation des compteurs si c'est la section stats
        if (entry.target.classList.contains('stats-section')) {
          setTimeout(() => {
            animateCounter(totalDevices.value, animatedDevices, 1500)
            animateCounter(activeAlerts.value, animatedAlerts, 1800)
            animateCounter(onlineDevices.value, animatedOnline, 2000)
            animateCounter(measurementsToday.value, animatedMeasurements, 2200)
          }, 200)
        }
      }
    })
  }, observerOptions)

  // Observer les sections principales
  const sections = document.querySelectorAll('section')
  sections.forEach(section => observer.observe(section))
  
  return observer
}

// Chargement des statistiques
const loadStats = async () => {
  try {
    const devicesResponse = await axios.get(API_ENDPOINTS.DEVICES)
    const devices = devicesResponse.data.$values || devicesResponse.data
    totalDevices.value = devices.length
    
    // Simuler des données réalistes
    onlineDevices.value = Math.floor(devices.length * 0.85)
    activeAlerts.value = Math.floor(Math.random() * 5)
    measurementsToday.value = devices.length * Math.floor(Math.random() * 50 + 100)
    
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
    // Valeurs de démonstration
    totalDevices.value = 12
    activeAlerts.value = 2
    onlineDevices.value = 10
    measurementsToday.value = 1847
  }
}

// Lifecycle hooks
let observer = null

onMounted(async () => {
  await loadStats()
  createParticles()
  
  // Ajouter les event listeners
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Setup intersection observer
  setTimeout(() => {
    observer = setupIntersectionObserver()
  }, 100)
  
  // Animation d'entrée initiale
  setTimeout(() => {
    document.querySelector('.hero-content')?.classList.add('hero-loaded')
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Import FontAwesome dans le composant */
@import '@fortawesome/fontawesome-free/css/all.css';

/* Reset pour s'assurer que la page occupe tout l'écran */
.home-container {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #512BD4 0%, #ac99ea 100%);
  color: white;
  overflow-x: hidden;
  position: relative;
}

.home-container.dark-mode {
  background: linear-gradient(135deg, #2B0B98 0%, #190649 100%);
}

/* Variables CSS pour les animations */
:root {
  --primary: #512BD4;
  --primary-light: #ac99ea;
  --secondary: #DFD8F7;
  --tertiary: #2B0B98;
  --animation-speed: 0.6s;
}

/* Hero Section avec effets avancés */
.hero-section {
  width: 100%;
  min-height: 100vh;
  padding: 80px 20px 60px;
  text-align: center;
  background: linear-gradient(135deg, #512BD4 0%, #2B0B98 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dark-mode .hero-section {
  background: linear-gradient(135deg, #2B0B98 0%, #190649 100%);
}

/* Particules animées */
.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.hero-particles :deep(.particle) {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particle-float infinite linear;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
}

@keyframes particle-float {
  from {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Formes géométriques décoratives */
.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.shape {
  position: absolute;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(172, 153, 234, 0.2));
  border-radius: 20px;
  backdrop-filter: blur(10px);
  animation: shape-float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  right: 10%;
  animation-delay: 1s;
}

@keyframes shape-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Contenu héro */
.hero-content {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 3;
  position: relative;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.logo-icon {
  font-size: 5rem;
  animation: logo-pulse 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
  color: #DFD8F7;
}

.logo-icon i {
  font-size: 5rem;
}

@keyframes logo-pulse {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
  }
}

.main-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, 
    #4a90e2 0%, 
    #8e6cef 30%, 
    #b856c4 70%, 
    #ec4899 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-subtitle {
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin: 30px 0;
  color: #DFD8F7;
  font-weight: 500;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
  line-height: 1.4;
}

.hero-description {
  font-size: clamp(1.1rem, 2.5vw, 1.2rem);
  margin: 30px 0 50px;
  color: #ac99ea;
  line-height: 1.7;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

/* Boutons Call-to-Action améliorés */
.cta-buttons {
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 700;
  font-size: clamp(1rem, 2.2vw, 1.1rem);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  min-width: 220px;
  text-align: center;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.btn i {
  font-size: 1.2rem;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  border-radius: inherit;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn:hover .btn-glow {
  opacity: 0.6;
}

.btn-primary {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  color: #512BD4;
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.25);
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 40px rgba(255, 255, 255, 0.4);
  background: linear-gradient(135deg, #ffffff, #ffffff);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 40px rgba(255, 255, 255, 0.2);
}

/* Indicateur de scroll */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.arrow-down {
  font-size: 1.5rem;
  animation: bounce-arrow 1.5s ease-in-out infinite;
}

.arrow-down i {
  font-size: 1.5rem;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes bounce-arrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* Sections communes */
.container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 60px;
  color: white;
  font-weight: 800;
  position: relative;
  line-height: 1.2;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #DFD8F7, #ac99ea);
  border-radius: 2px;
}

/* Features Section améliorée */
.features-section {
  width: 100%;
  padding: 100px 20px;
  background: linear-gradient(135deg, #ac99ea 0%, #DFD8F7 100%);
  color: #2B0B98;
  position: relative;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #512BD4, transparent);
}

.features-section .section-title {
  color: #2B0B98;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1300px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 40px 30px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(43, 11, 152, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(81, 43, 212, 0.1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #512BD4, #ac99ea);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.feature-card:hover::before {
  transform: translateX(0);
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 80px rgba(43, 11, 152, 0.2);
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.feature-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 8px rgba(81, 43, 212, 0.2));
  color: #512BD4;
}

.feature-icon i {
  font-size: 3.5rem;
}

.feature-badge {
  background: linear-gradient(135deg, #512BD4, #ac99ea);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-card h3 {
  font-size: clamp(1.3rem, 2.5vw, 1.5rem);
  margin-bottom: 20px;
  color: #512BD4;
  font-weight: 700;
  line-height: 1.3;
}

.feature-card p {
  color: #6E6E6E;
  line-height: 1.7;
  font-size: clamp(0.95rem, 1.8vw, 1rem);
  margin-bottom: 25px;
}

.feature-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(81, 43, 212, 0.1);
}

.feature-stat {
  font-size: 1.5rem;
  font-weight: 700;
  color: #512BD4;
}

.feature-stat i {
  font-size: 1.5rem;
}

.feature-label {
  font-size: 0.85rem;
  color: #ac99ea;
  font-weight: 500;
}

/* Section de démonstration */
.demo-section {
  width: 100%;
  padding: 100px 20px;
  background: linear-gradient(135deg, #2B0B98 0%, #512BD4 100%);
  color: white;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
}

.demo-text h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 25px;
  font-weight: 700;
  line-height: 1.2;
}

.demo-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #DFD8F7;
  margin-bottom: 35px;
}

.demo-features {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
}

.demo-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  color: #ac99ea;
}

.demo-icon {
  font-size: 1.2rem;
  color: #DFD8F7;
}

.demo-icon i {
  font-size: 1.2rem;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #ac99ea, #DFD8F7);
  color: #2B0B98;
  text-decoration: none;
  border-radius: 16px;
  font-weight: 700;
  transition: all 0.3s ease;
  width: fit-content;
}

.demo-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(172, 153, 234, 0.3);
}

.demo-arrow {
  transition: transform 0.3s ease;
}

.demo-btn:hover .demo-arrow {
  transform: translateX(5px);
}

.demo-arrow i {
  font-size: 1rem;
}

/* Mockup dashboard */
.demo-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-dashboard {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.demo-header {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.demo-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.demo-dot.red { background: #ff5f56; }
.demo-dot.yellow { background: #ffbd2e; }
.demo-dot.green { background: #27ca3f; }

.demo-content-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-chart {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.chart-bars {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  height: 80px;
}

.bar {
  width: 20px;
  background: linear-gradient(to top, #ac99ea, #DFD8F7);
  border-radius: 4px 4px 0 0;
  animation: bar-grow 2s ease-out;
}

@keyframes bar-grow {
  from { height: 0; }
  to { height: var(--height, 50%); }
}

.demo-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.demo-stat {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 12px;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.85rem;
  color: #DFD8F7;
}

/* Stats Section avec effets visuels */
.stats-section {
  width: 100%;
  padding: 100px 20px;
  background: linear-gradient(135deg, #512BD4 0%, #2B0B98 100%);
  position: relative;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(172, 153, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(223, 216, 247, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 50px 30px;
  border-radius: 24px;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.stat-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(172, 153, 234, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-background {
  opacity: 1;
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 80px rgba(255, 255, 255, 0.1);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #DFD8F7, #ac99ea);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3));
  color: #DFD8F7;
}

.stat-icon i {
  font-size: 3rem;
}

.stat-value {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: white;
  margin-bottom: 15px;
  line-height: 1;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
}

.stat-label {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  color: #DFD8F7;
  margin-bottom: 20px;
  font-weight: 500;
}

.stat-trend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.stat-trend.positive {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.stat-trend.warning {
  background: rgba(255, 152, 0, 0.2);
  color: #FF9800;
}

.trend-icon {
  font-size: 1rem;
}

.trend-icon i {
  font-size: 1rem;
}

.text-success {
  color: #4CAF50 !important;
}

/* Actions Section */
.actions-section {
  width: 100%;
  padding: 100px 20px;
  background: linear-gradient(135deg, #DFD8F7 0%, #ac99ea 100%);
  color: #2B0B98;
}

.actions-section .section-title {
  color: #2B0B98;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.action-card {
  background: white;
  padding: 50px 40px;
  border-radius: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 20px 60px rgba(43, 11, 152, 0.1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.action-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, rgba(81, 43, 212, 0.05), rgba(172, 153, 234, 0.05));
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.action-card:hover::before {
  transform: translateY(0);
}

.action-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 80px rgba(43, 11, 152, 0.2);
  border-color: #512BD4;
}

.action-icon {
  font-size: 4rem;
  margin-bottom: 25px;
  filter: drop-shadow(0 4px 8px rgba(81, 43, 212, 0.2));
  position: relative;
  z-index: 2;
  color: #512BD4;
}

.action-icon i {
  font-size: 4rem;
}

.action-card h3 {
  font-size: clamp(1.3rem, 2.5vw, 1.5rem);
  margin-bottom: 20px;
  color: #512BD4;
  font-weight: 700;
  position: relative;
  z-index: 2;
}

.action-card p {
  color: #6E6E6E;
  line-height: 1.7;
  font-size: clamp(0.95rem, 1.8vw, 1rem);
  position: relative;
  z-index: 2;
}

/* Animations d'entrée */
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Classes d'animation */
.animate-in {
  animation: slideInFromBottom 0.8s ease-out;
}

/* Responsive Design complet */

/* Tablettes */
@media (max-width: 1024px) {
  .hero-section {
    min-height: 90vh;
    padding: 70px 15px 50px;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .demo-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .features-grid,
  .stats-grid,
  .actions-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }
  
  .shape {
    display: none; /* Masquer les formes sur tablette */
  }
}

/* Mobiles */
@media (max-width: 768px) {
  .hero-section {
    min-height: 100vh;
    padding: 60px 15px 40px;
  }
  
  .logo-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .logo-icon {
    font-size: 3.5rem;
  }
  
  .logo-icon i {
    font-size: 3.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .btn {
    width: 100%;
    max-width: 320px;
    min-width: auto;
  }
  
  .features-grid,
  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .feature-card,
  .stat-card,
  .action-card {
    margin: 0 10px;
  }
  
  .stats-section,
  .features-section,
  .actions-section,
  .demo-section {
    padding: 80px 15px;
  }
  
  .scroll-indicator {
    bottom: 20px;
  }
  
  .demo-content {
    gap: 30px;
  }
  
  .demo-dashboard {
    max-width: 300px;
  }
}

/* Petits mobiles */
@media (max-width: 480px) {
  .hero-section {
    padding: 50px 10px 30px;
    min-height: 100vh;
  }
  
  .logo-icon {
    font-size: 2.5rem;
  }
  
  .logo-icon i {
    font-size: 2.5rem;
  }
  
  .hero-content {
    padding: 0 10px;
  }
  
  .container {
    padding: 0 10px;
  }
  
  .feature-card,
  .stat-card,
  .action-card {
    padding: 30px 20px;
    margin: 0 5px;
  }
  
  .stats-section,
  .features-section,
  .actions-section,
  .demo-section {
    padding: 60px 10px;
  }
  
  .cta-buttons {
    gap: 15px;
  }
  
  .btn {
    padding: 14px 28px;
    font-size: 1rem;
  }
  
  .demo-dashboard {
    max-width: 250px;
    padding: 15px;
  }
  
  .chart-bars {
    gap: 4px;
  }
  
  .bar {
    width: 15px;
  }
}

/* Extra large screens */
@media (min-width: 1400px) {
  .hero-section {
    padding: 120px 20px 100px;
  }
  
  .container {
    max-width: 1600px;
  }
  
  .features-grid,
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .actions-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mode paysage mobiles */
@media (max-height: 500px) and (orientation: landscape) {
  .hero-section {
    min-height: auto;
    padding: 30px 20px;
  }
  
  .logo-container {
    margin-bottom: 20px;
  }
  
  .hero-subtitle,
  .hero-description {
    margin: 10px 0;
  }
  
  .cta-buttons {
    margin-top: 20px;
  }
  
  .scroll-indicator {
    display: none;
  }
}

/* Animation de chargement de la page */
.hero-content.hero-loaded {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Améliorations pour l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Focus states pour l'accessibilité */
.btn:focus,
.action-card:focus {
  outline: 3px solid #ac99ea;
  outline-offset: 2px;
}

/* Amélioration des contrastes pour le mode sombre */
.dark-mode .feature-card,
.dark-mode .action-card {
  background: rgba(255, 255, 255, 0.95);
}

.dark-mode .demo-section {
  background: linear-gradient(135deg, #190649 0%, #2B0B98 100%);
}

.dark-mode .stats-section {
  background: linear-gradient(135deg, #2B0B98 0%, #190649 100%);
}

.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 9999;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #512BD4, #764dfb, #ab95f4);
  background-size: 200% 100%;
  animation: gradient-flow 3s ease-in-out infinite;
  transition: width 0.1s ease-out;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 20px rgba(81, 43, 212, 0.8);
}

.home-container:not(.dark-mode) .scroll-progress-container {
  background: rgba(43, 11, 152, 0.15);
  border-bottom: 1px solid rgba(81, 43, 212, 0.2);
}

.home-container:not(.dark-mode) .scroll-progress-bar {
  box-shadow: 0 0 25px rgba(81, 43, 212, 0.9),
              0 2px 8px rgba(81, 43, 212, 0.4);
}


@keyframes gradient-flow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Mode sombre */
.dark-mode .scroll-progress-container {
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(172, 153, 234, 0.2);
}

.dark-mode .scroll-progress-bar {
  box-shadow: 0 0 20px rgba(172, 153, 234, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .scroll-progress-container {
    height: 3px;
  }
}

</style>