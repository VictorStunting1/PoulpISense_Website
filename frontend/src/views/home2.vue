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
            <p>Monitoring continu de la température, pH et turbidité avec alertes automatiques</p>
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
            <h2>Accédez à vos données partout, à tout moment</h2>
            <p>Notre solution multiplateforme vous permet de surveiller vos capteurs depuis n'importe où. Site web responsive et applications mobiles natives pour une expérience optimale sur tous vos appareils.</p>
            <div class="demo-features">
              <div class="demo-feature">
                <span class="demo-icon">
                  <i class="fas fa-desktop"></i>
                </span>
                <span>Interface web responsive</span>
              </div>
              <div class="demo-feature">
                <span class="demo-icon">
                  <i class="fas fa-mobile-alt"></i>
                </span>
                <span>Applications mobiles natives</span>
              </div>
              <div class="demo-feature">
                <span class="demo-icon">
                  <i class="fas fa-sync-alt"></i>
                </span>
                <span>Synchronisation temps réel</span>
              </div>
              <div class="demo-feature">
                <span class="demo-icon">
                  <i class="fas fa-cloud"></i>
                </span>
                <span>Accès cloud sécurisé</span>
              </div>
            </div>
            
            <!-- Boutons de téléchargement -->
            <div class="download-buttons">
              <a href="#" class="store-btn app-store">
                <div class="store-icon">
                  <i class="fab fa-apple"></i>
                </div>
                <div class="store-text">
                  <span class="store-label">Prochainement sur</span>
                  <span class="store-name">App Store</span>
                </div>
              </a>
              <a href="#" class="store-btn google-play">
                <div class="store-icon">
                  <i class="fab fa-google-play"></i>
                </div>
                <div class="store-text">
                  <span class="store-label">Prochainement sur</span>
                  <span class="store-name">Google Play</span>
                </div>
              </a>
            </div>
            
            <router-link to="/dashboard" class="demo-btn">
              <span>Découvrir l'interface web</span>
              <span class="demo-arrow">
                <i class="fas fa-arrow-right"></i>
              </span>
            </router-link>
          </div>
          
          <div class="demo-visual" v-motion-slide-visible-once-right>
            <div class="devices-showcase">
              <!-- Mockup Desktop -->
              <div class="desktop-mockup">
                <div class="desktop-screen">
                  <img src="@/assets/desktop_example.png" alt="Interface web PoulpISence" class="screen-image">
                </div>
                <div class="desktop-base"></div>
              </div>
              
              <!-- Mockup Mobile -->
              <div class="mobile-mockup">
                <div class="mobile-screen">
                  <img src="@/assets/mobile_example.jpeg" alt="Application mobile PoulpISence" class="screen-image">
                </div>
                <div class="mobile-button"></div>
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

/* Mode sombre pour Features Section */
.dark-mode .features-section {
  background: linear-gradient(135deg, #190649 0%, #2B0B98 100%);
  color: #DFD8F7;
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

.dark-mode .features-section::before {
  background: linear-gradient(90deg, transparent, #ac99ea, transparent);
}

.features-section .section-title {
  color: #2B0B98;
}

.dark-mode .features-section .section-title {
  color: #DFD8F7;
  background: linear-gradient(135deg, #ffffff, #DFD8F7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

/* Mode sombre pour les cartes de fonctionnalités */
.dark-mode .feature-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
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

.dark-mode .feature-card::before {
  background: linear-gradient(90deg, #ac99ea, #DFD8F7);
}

.feature-card:hover::before {
  transform: translateX(0);
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 80px rgba(43, 11, 152, 0.2);
}

.dark-mode .feature-card:hover {
  box-shadow: 0 30px 80px rgba(172, 153, 234, 0.3);
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

.dark-mode .feature-icon {
  color: #ac99ea;
  filter: drop-shadow(0 4px 8px rgba(172, 153, 234, 0.3));
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

.dark-mode .feature-badge {
  background: linear-gradient(135deg, #ac99ea, #DFD8F7);
  color: #2B0B98;
}

.feature-card h3 {
  font-size: clamp(1.3rem, 2.5vw, 1.5rem);
  margin-bottom: 20px;
  color: #512BD4;
  font-weight: 700;
  line-height: 1.3;
}

.dark-mode .feature-card h3 {
  color: #DFD8F7;
}

.feature-card p {
  color: #6E6E6E;
  line-height: 1.7;
  font-size: clamp(0.95rem, 1.8vw, 1rem);
  margin-bottom: 25px;
}

.dark-mode .feature-card p {
  color: #ac99ea;
}

.feature-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(81, 43, 212, 0.1);
}

.dark-mode .feature-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-stat {
  font-size: 1.5rem;
  font-weight: 700;
  color: #512BD4;
}

.dark-mode .feature-stat {
  color: #ac99ea;
}

.feature-stat i {
  font-size: 1.5rem;
}

.feature-label {
  font-size: 0.85rem;
  color: #ac99ea;
  font-weight: 500;
}

.dark-mode .feature-label {
  color: #DFD8F7;
}

/* Section de démonstration */
.demo-section {
  width: 100%;
  padding: 120px 20px;
  background: linear-gradient(135deg, #2B0B98 0%, #512BD4 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

/* Mode sombre pour Demo Section */
.dark-mode .demo-section {
  background: linear-gradient(135deg, #0d0225 0%, #190649 100%);
}

.demo-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 40%, rgba(172, 153, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(223, 216, 247, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.dark-mode .demo-section::before {
  background: radial-gradient(circle at 30% 40%, rgba(172, 153, 234, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(223, 216, 247, 0.05) 0%, transparent 50%);
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.demo-text h2 {
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  margin-bottom: 30px;
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(135deg, #ffffff, #DFD8F7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark-mode .demo-text h2 {
  background: linear-gradient(135deg, #DFD8F7, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-text p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #DFD8F7;
  margin-bottom: 40px;
}

.dark-mode .demo-text p {
  color: #ac99ea;
}

.demo-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.demo-feature {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1rem;
  color: #ac99ea;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.dark-mode .demo-feature {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #DFD8F7;
}

.demo-feature:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.dark-mode .demo-feature:hover {
  background: rgba(255, 255, 255, 0.08);
}

.demo-icon {
  font-size: 1.4rem;
  color: #DFD8F7;
  min-width: 24px;
}

.dark-mode .demo-icon {
  color: #ac99ea;
}

.demo-icon i {
  font-size: 1.4rem;
}

/* Boutons de téléchargement */
.download-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.store-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  min-width: 200px;
}

.dark-mode .store-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.store-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.store-btn:hover::before {
  left: 100%;
}

.store-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
}

.dark-mode .store-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 25px rgba(172, 153, 234, 0.2);
}

.store-icon {
  font-size: 2rem;
  color: #DFD8F7;
}

.dark-mode .store-icon {
  color: #ac99ea;
}

.store-icon i {
  font-size: 2rem;
}

.store-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.store-label {
  font-size: 0.85rem;
  color: #ac99ea;
  margin-bottom: 2px;
}

.dark-mode .store-label {
  color: #DFD8F7;
}

.store-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.dark-mode .store-name {
  color: #ac99ea;
}

.app-store .store-icon {
  color: #DFD8F7;
}

.dark-mode .app-store .store-icon {
  color: #ac99ea;
}

.google-play .store-icon {
  color: #DFD8F7;
}

.dark-mode .google-play .store-icon {
  color: #ac99ea;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 35px;
  background: linear-gradient(135deg, #ac99ea, #DFD8F7);
  color: #2B0B98;
  text-decoration: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  width: fit-content;
  box-shadow: 0 8px 25px rgba(172, 153, 234, 0.3);
}

.dark-mode .demo-btn {
  background: linear-gradient(135deg, #DFD8F7, #ffffff);
  color: #190649;
  box-shadow: 0 8px 25px rgba(223, 216, 247, 0.3);
}

.demo-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(172, 153, 234, 0.4);
  background: linear-gradient(135deg, #DFD8F7, #ffffff);
}

.dark-mode .demo-btn:hover {
  background: linear-gradient(135deg, #ffffff, #DFD8F7);
  box-shadow: 0 15px 40px rgba(223, 216, 247, 0.5);
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

/* Vitrine des appareils - Ultra simplifiée, images seulement */
.demo-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.devices-showcase {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  max-width: 700px;
  width: 100%;
}

/* Desktop - juste l'image */
.desktop-mockup {
  flex: 1;
  max-width: 450px;
  transition: transform 0.3s ease;
}

.desktop-mockup:hover {
  transform: scale(1.02);
}

.desktop-screen {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
}

.desktop-base {
  display: none; /* Supprimé */
}

/* Mobile - juste l'image */
.mobile-mockup {
  flex: 0 0 200px;
  transition: transform 0.3s ease;
}

.mobile-mockup:hover {
  transform: scale(1.02);
}

.mobile-screen {
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
}

.mobile-button {
  display: none; /* Supprimé */
}

/* Images */
.screen-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: inherit;
  transition: opacity 0.3s ease;
}

/* Animation flottante légère */
@keyframes gentleFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.desktop-mockup {
  animation: gentleFloat 4s ease-in-out infinite;
}

.mobile-mockup {
  animation: gentleFloat 3s ease-in-out infinite;
  animation-delay: 0.5s;
}

/* Responsive */
@media (max-width: 1024px) {
  .demo-content {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .devices-showcase {
    gap: 30px;
  }
  
  .mobile-mockup {
    flex: 0 0 180px;
  }
}

@media (max-width: 768px) {
  .devices-showcase {
    flex-direction: column;
    gap: 40px;
    max-width: 350px;
  }
  
  .desktop-mockup {
    order: 2;
    max-width: 350px;
  }
  
  .mobile-mockup {
    order: 1;
    flex: 0 0 160px;
  }
}

@media (max-width: 480px) {
  .devices-showcase {
    max-width: 280px;
  }
  
  .desktop-mockup {
    max-width: 280px;
  }
  
  .mobile-mockup {
    flex: 0 0 140px;
  }
}

/* Mode sombre - juste les ombres */
.dark-mode .desktop-screen {
  box-shadow: 0 15px 50px rgba(255, 255, 255, 0.1);
}

.dark-mode .mobile-screen {
  box-shadow: 0 15px 50px rgba(255, 255, 255, 0.1);
}

/* Scroll progress */
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