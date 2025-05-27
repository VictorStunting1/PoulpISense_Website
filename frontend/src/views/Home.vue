<template>
  <div class="home-container">
    <!-- Arrière-plan animé -->
    <div class="background-animation">
      <div class="layer-1"></div>
      <div class="layer-2"></div>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="floating-dots">
        <div class="dot" v-for="i in 12" :key="i"></div>
      </div>
    </div>

    <!-- Navigation -->
    <nav ref="navbar" class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-brand" @click="$router.push('/')">
        <img src="@/assets/logo2.png" alt="PoulpISense" class="nav-logo">
        <span class="nav-title">PoulpISense</span>
      </div>
      
      <div class="nav-actions">
        <router-link to="/login" class="nav-link highlight">
          <i class="fas fa-sign-in-alt"></i>
          <span>Connexion</span>
        </router-link>
      </div>
      
      <!-- Menu mobile toggle -->
      <div class="nav-mobile-toggle" :class="{ active: mobileMenuOpen }" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <!-- Menu mobile dropdown -->
      <div class="nav-mobile-menu" :class="{ active: mobileMenuOpen }">
        <router-link to="/login" class="nav-link" @click="mobileMenuOpen = false">
          <i class="fas fa-sign-in-alt"></i>
          <span>Connexion</span>
        </router-link>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="main-content">
      <div class="hero-section">
        <div class="hero-text">
          <h1 class="hero-title">
            Surveillez vos <span class="highlight">capteurs IoT</span>
            <br>en temps réel
          </h1>
          <p class="hero-subtitle">
            PoulpISense vous offre une plateforme complète pour monitorer, analyser et 
            gérer tous vos appareils IoT depuis une interface moderne et intuitive.
          </p>
          
          <div class="hero-features">
            <div class="feature">
              <i class="fas fa-chart-line"></i>
              <span>Analyse en temps réel</span>
            </div>
            <div class="feature">
              <i class="fas fa-shield-alt"></i>
              <span>Sécurisé et fiable</span>
            </div>
            <div class="feature">
              <i class="fas fa-mobile-alt"></i>
              <span>Interface responsive</span>
            </div>
          </div>

          <div class="hero-actions">
            <button class="btn-secondary" @click="scrollToFeatures">
              <i class="fas fa-info-circle"></i>
              En savoir plus
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="dashboard-preview">
            <div class="preview-header">
              <div class="preview-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="preview-title">Tableau de bord</span>
            </div>
            <div class="preview-content">
              <div class="metric-cards">
                <div class="metric-card temp">
                  <i class="fas fa-temperature-high"></i>
                  <span class="value">24.5°C</span>
                  <span class="label">Température</span>
                </div>
                <div class="metric-card ph">
                  <i class="fas fa-flask"></i>
                  <span class="value">7.2</span>
                  <span class="label">pH</span>
                </div>
                <div class="metric-card turbidity">
                  <i class="fas fa-water"></i>
                  <span class="value">315</span>
                  <span class="label">Turbidité</span>
                </div>
              </div>
              <div class="chart-area">
                <div class="chart-line"></div>
                <div class="chart-points">
                  <div class="point" v-for="i in 8" :key="i"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

            <!-- Section fonctionnalités améliorée -->
      <section ref="featuresSection" class="features-section">
        <div class="features-background">
          <div class="features-wave"></div>
          <div class="features-particles">
            <div class="feature-particle" v-for="i in 15" :key="i"></div>
          </div>
        </div>
        
        <div class="container">
          <!-- En-tête de section amélioré -->
          <div class="features-header">
            <span class="features-badge">Fonctionnalités</span>
            <h2 class="section-title">
              Pourquoi choisir 
              <span class="highlight-text">PoulpISense</span> ?
            </h2>
            <p class="section-subtitle">
              Découvrez comment notre plateforme révolutionne la surveillance IoT avec des outils puissants et une interface intuitive.
            </p>
          </div>

          <!-- Grille de fonctionnalités -->
          <div class="features-grid">
            <!-- Carte 1 - App Mobile -->
            <div class="feature-card" data-feature="mobile">
              <div class="feature-card-inner">
                <div class="feature-header">
                  <div class="feature-icon mobile">
                    <i class="fas fa-mobile-alt"></i>
                    <div class="icon-bg"></div>
                  </div>
                  <div class="feature-badge">Mobile</div>
                </div>
                <div class="feature-content">
                  <h3>Application mobile</h3>
                  <p>Surveillez vos capteurs où que vous soyez avec notre application mobile native iOS et Android.</p>
                  <ul class="feature-benefits">
                    <li><i class="fas fa-check"></i> Notifications push</li>
                    <li><i class="fas fa-check"></i> Gestion des appareils</li>
                    <li><i class="fas fa-check"></i> Interface tactile et inuitive</li>
                  </ul>
                </div>
           
                <div class="feature-decoration">
                  <div class="decoration-circle"></div>
                  <div class="decoration-line"></div>
                </div>
              </div>
            </div>

            <!-- Carte 2 - Alertes -->
            <div class="feature-card featured" data-feature="alerts">
              <div class="feature-card-inner">
                <div class="feature-header">
                  <div class="feature-icon alerts">
                    <i class="fas fa-bell"></i>
                    <div class="icon-bg"></div>
                  </div>
                  <div class="feature-badge premium">Alertes</div>
                </div>
                <div class="feature-content">
                  <h3>Alertes</h3>
                  <p>Recevez des notifications instantanées en cas de valeurs anormales.</p>
                  <ul class="feature-benefits">
                    <li><i class="fas fa-check"></i> Personnalisation par appareil</li>
                    <li><i class="fas fa-check"></i> Personnalisation des seuils</li>
                    <li><i class="fas fa-check"></i> Personnalisation par lieu</li>
                  </ul>
                </div>
           
                <div class="feature-decoration">
                  <div class="decoration-circle"></div>
                  <div class="decoration-line"></div>
                </div>
              </div>
            </div>

            <!-- Carte 3 - Historique -->
            <div class="feature-card" data-feature="history">
              <div class="feature-card-inner">
                <div class="feature-header">
                  <div class="feature-icon history">
                    <i class="fas fa-history"></i>
                    <div class="icon-bg"></div>
                  </div>
                  <div class="feature-badge">Analytics</div>
                </div>
                <div class="feature-content">
                  <h3>Historique complet</h3>
                  <p>Accédez à l'historique complet de vos mesures avec des graphiques détaillés.</p>
                  <ul class="feature-benefits">
                    <li><i class="fas fa-check"></i> Stockage illimité</li>
                    <li><i class="fas fa-check"></i> Export de données</li>
                    <li><i class="fas fa-check"></i> Historique personnalisable</li>
                  </ul>
                </div>
           
                <div class="feature-decoration">
                  <div class="decoration-circle"></div>
                  <div class="decoration-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

        <!-- Footer amélioré -->
    <footer class="footer">
      <div class="footer-background">
        <div class="footer-wave"></div>
        <div class="footer-particles">
          <div class="particle" v-for="i in 20" :key="i"></div>
        </div>
      </div>
      
      <div class="container">
        <div class="footer-main">
          <!-- Section Brand -->
          <div class="footer-section brand-section">
            <div class="footer-brand">
              <img src="@/assets/logo2.png" alt="PoulpISense" class="footer-logo">
              <span class="footer-brand-text">PoulpISense</span>
            </div>
            <p class="footer-description">
              Votre plateforme IoT de confiance pour surveiller et analyser vos capteurs en temps réel.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link" aria-label="GitHub">
                <i class="fab fa-github"></i>
              </a>
              <a href="#" class="social-link" aria-label="Email">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <!-- Section Navigation -->
          <div class="footer-section">
            <h4 class="footer-title">Navigation</h4>
            <ul class="footer-links">
              <li><router-link to="/" class="footer-link">Accueil</router-link></li>
              <li><router-link to="/dashboard" class="footer-link">Dashboard</router-link></li>
              <li><a href="#features" class="footer-link">Fonctionnalités</a></li>
              <li><a href="#pricing" class="footer-link">Tarifs</a></li>
            </ul>
          </div>

          <!-- Section Support -->
          <div class="footer-section">
            <h4 class="footer-title">Support</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Centre d'aide</a></li>
              <li><a href="#" class="footer-link">Documentation</a></li>
              <li><a href="#" class="footer-link">API</a></li>
              <li><a href="#" class="footer-link">Contact</a></li>
            </ul>
          </div>

          <!-- Section Contact -->
          <div class="footer-section">
            <h4 class="footer-title">Nous contacter</h4>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>contact@poulpisense.com</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>+33 1 23 45 67 89</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>Nevers, France</span>
              </div>
            </div>
          </div>

          <!-- Section Newsletter -->
          <div class="footer-section newsletter-section">
            <h4 class="footer-title">Newsletter</h4>
            <p class="newsletter-description">
              Restez informé des dernières nouveautés et mises à jour.
            </p>
            <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
              <div class="input-group">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  class="newsletter-input"
                  v-model="newsletterEmail"
                  required
                >
                <button type="submit" class="newsletter-btn">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="footer-divider"></div>

        <!-- Section Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <div class="footer-bottom-left">
              <p>&copy; 2025 PoulpISense. Tous droits réservés.</p>
              <div class="footer-badges">
                <span class="badge">
                  <i class="fas fa-shield-alt"></i>
                  Sécurisé
                </span>
                <span class="badge">
                  <i class="fas fa-bolt"></i>
                  Temps réel
                </span>
              </div>
            </div>
            <div class="footer-bottom-right">
              <div class="footer-legal">
                <a href="#" class="legal-link">Conditions d'utilisation</a>
                <a href="#" class="legal-link">Politique de confidentialité</a>
                <a href="#" class="legal-link">Cookies</a>
              </div>
              <button class="back-to-top" @click="scrollToTop" aria-label="Retour en haut">
                <i class="fas fa-chevron-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navbar = ref(null)
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const featuresSection = ref(null)
const newsletterEmail = ref('')

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    alert(`Merci pour votre inscription avec l'email: ${newsletterEmail.value}`)
    newsletterEmail.value = ''
  }
}

// Nouvelle fonction pour les démos de fonctionnalités
const showFeatureDemo = (feature) => {
  switch (feature) {
    case 'dashboard':
      alert('Démo du Dashboard - Redirection vers la page de démonstration')
      break
    case 'alerts':
      alert('Démo des Alertes - Simulation d\'une alerte en temps réel')
      break
    case 'history':
      alert('Démo de l\'Historique - Affichage des données historiques')
      break
    case 'security':
      alert('Informations Sécurité - Détails sur nos mesures de sécurité')
      break
    case 'api':
      alert('Documentation API - Redirection vers la documentation')
      break
    case 'mobile':
      alert('Téléchargement Mobile - Liens vers App Store et Google Play')
      break
    default:
      console.log('Feature demo:', feature)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Animation au scroll pour les cartes (optionnel)
  const observeFeatures = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, { threshold: 0.1 })
    
    if (featuresSection.value) {
      observer.observe(featuresSection.value)
    }
  }
  
  observeFeatures()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Variables CSS */
:root {
  --primary-color: #1976d2;
  --primary-dark: #0d47a1;
  --accent-color: #00bcd4;
  --accent-light: #4dd0e1;
  --gradient-primary: linear-gradient(135deg, #1976d2, #00bcd4);
  --gradient-secondary: linear-gradient(135deg, #00bcd4, #4dd0e1);
  --text-primary: #212121;
  --text-secondary: #546e7a;
  --text-light: #90a4ae;
  --background: #f8faff;
  --surface: #ffffff;
  --border-light: #e1f5fe;
}

/* Reset et base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  width: 100%;
  background: var(--background);
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  width: 100%;
}


/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(25, 118, 210, 0.08);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Effet lors du scroll */
.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 12px 5%;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-brand:hover {
  transform: scale(1.02);
}


.nav-logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(25, 118, 210, 0.2));
  transition: all 0.3s ease;
}

.nav-brand:hover .nav-logo {
  transform: rotate(5deg);
  filter: drop-shadow(0 4px 12px rgba(25, 118, 210, 0.3));
}

.nav-title {
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #1976d2; /* Fallback */
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.25);
  color: var(--primary-color);
  border: 1px solid rgba(25, 118, 210, 0.3);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(25, 118, 210, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

.nav-mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-mobile-toggle:hover {
  background: rgba(25, 118, 210, 0.1);
}

.nav-mobile-toggle span {
  width: 24px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-mobile-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-mobile-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav-mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: all 0.3s ease;
}


.nav-mobile-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-mobile-menu .nav-link {
  display: flex;
  justify-content: center;
  margin: 16px;
  padding: 16px 24px;
  border-radius: 12px;
  background: rgba(25, 118, 210, 0.05);
}


/* Contenu principal */
.main-content {
  position: relative;
  z-index: 1;
  flex: 1; /* Occupe l'espace restant */
  display: flex;
  flex-direction: column;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 80px 5%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 120px); /* Hauteur moins la navbar */
  width: 100%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.highlight {
  color: #1976d2;
  font-weight: 800;
  position: relative;
  text-shadow: 0 1px 3px rgba(25, 118, 210, 0.2);
  
  /* Effet de fond subtil */
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(0, 188, 212, 0.1));
  padding: 2px 6px;
  border-radius: 4px;
  
  /* Animation hover */
  transition: all 0.3s ease;
}

.highlight:hover {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.15), rgba(0, 188, 212, 0.15));
  transform: translateY(-1px);
}


.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 40px;
}

.hero-features {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-weight: 500;
}

.feature i {
  color: var(--accent-color);
  font-size: 1.1rem;
}

.hero-actions {
  display: flex;
  gap: 20px;
}

.btn-primary, .btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(25, 118, 210, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
}

/* Prévisualisation du dashboard */
.dashboard-preview {
  background: white;
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: transform 0.3s ease;
}

.dashboard-preview:hover {
  transform: perspective(1000px) rotateY(-2deg) rotateX(2deg);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f8faff;
  border-bottom: 1px solid #e1f5fe;
}

.preview-dots {
  display: flex;
  gap: 6px;
}

.preview-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.preview-dots .dot.red { background: #ff5f57; }
.preview-dots .dot.yellow { background: #ffbd2e; }
.preview-dots .dot.green { background: #28ca42; }

.preview-title {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.preview-content {
  padding: 24px;
}

.metric-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  color: white;
  font-size: 0.8rem;
}

.metric-card.temp { background: linear-gradient(135deg, #ff9800, #ff5722); }
.metric-card.ph { background: linear-gradient(135deg, #2196f3, #03a9f4); }
.metric-card.turbidity { background: linear-gradient(135deg, #4caf50, #8bc34a); }

.metric-card i {
  font-size: 1.2rem;
  margin-bottom: 6px;
}

.metric-card .value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.metric-card .label {
  font-size: 0.7rem;
  opacity: 0.9;
}

.chart-area {
  height: 80px;
  background: #f8faff;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.chart-line {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  animation: drawLine 2s ease-out 1s forwards;
}

.chart-points {
  display: flex;
  justify-content: space-around;
  align-items: end;
  height: 100%;
  padding: 10px;
}

.chart-points .point {
  width: 6px;
  height: 20px;
  background: var(--accent-color);
  border-radius: 3px;
  transform: scaleY(0);
  animation: growPoint 0.5s ease-out forwards;
}

.chart-points .point:nth-child(n) {
  animation-delay: calc(0.1s * var(--i, 1));
}

/* Section fonctionnalités */
.features-section {
  position: relative;
  padding: 120px 5% 100px;
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f8ff 100%);
  width: 100%;
  overflow: hidden;
}

.features-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.features-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(90deg, 
    rgba(25, 118, 210, 0.05) 0%, 
    rgba(0, 188, 212, 0.08) 50%, 
    rgba(25, 118, 210, 0.05) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  animation: featuresWave 12s ease-in-out infinite;
}

.features-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.feature-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, rgba(0, 188, 212, 0.6), rgba(0, 188, 212, 0.1));
  border-radius: 50%;
  animation: floatFeatureParticle 20s linear infinite;
}

.feature-particle:nth-child(odd) {
  background: radial-gradient(circle, rgba(25, 118, 210, 0.6), rgba(25, 118, 210, 0.1));
  animation-delay: -10s;
}

/* Container et layout */
.features-section .container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* En-tête de section */
.features-header {
  text-align: center;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 80px;
}

.features-badge {
  display: inline-block;
  background: var(--gradient-primary);
  color: rgb(103, 156, 255);
  padding: 8px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px #1976d24d;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 24px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}



.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
}

.feature-card {
  position: relative;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  border: 1px solid rgba(25, 118, 210, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
}

.feature-card:hover::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
  border-color: rgba(25, 118, 210, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.feature-card.featured::before {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.05), rgba(0, 188, 212, 0.05));
  border: 2px solid rgba(25, 118, 210, 0.2);
}

.feature-card.featured:hover::before {
  border-color: rgba(25, 118, 210, 0.3);
  box-shadow: 0 25px 70px rgba(25, 118, 210, 0.2);
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
}


/* Contenu des cartes */
.feature-card-inner {
  position: relative;
  z-index: 2;
  padding: 40px 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

/* Icônes */
.feature-icon {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  overflow: hidden;
  transition: all 0.4s ease;
}

.feature-icon.dashboard {
  background: linear-gradient(135deg, #1976d2, #1565c0);
}

.feature-icon.alerts {
  background: linear-gradient(135deg, #ff9800, #f57c00);
}

.feature-icon.history {
  background: linear-gradient(135deg, #4caf50, #388e3c);
}

.feature-icon.security {
  background: linear-gradient(135deg, #9c27b0, #7b1fa2);
}

.feature-icon.api {
  background: linear-gradient(135deg, #f44336, #d32f2f);
}

.feature-icon.mobile {
  background: linear-gradient(135deg, #00bcd4, #0097a7);
}

.icon-bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
  transform: scale(0);
  transition: transform 0.6s ease;
}

.feature-card:hover .icon-bg {
  transform: scale(1);
}

.feature-icon i {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon i {
  transform: scale(1.1) rotate(5deg);
}

.feature-badge {
  background: rgba(25, 118, 210, 0.1);
  color: var(--primary-color);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-badge.premium {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
}

.feature-content {
  flex: 1;
  margin-bottom: 24px;
}

.feature-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.feature-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Liste des avantages */
.feature-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.feature-benefits li i {
  color: #4caf50;
  font-size: 0.8rem;
  width: 16px;
}

/* Footer des cartes */
.feature-footer {
  margin-top: auto;
}

.feature-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  background: none;
  border: none;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}


.feature-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
}

.feature-btn:hover::after {
  width: 100%;
}

.feature-btn:hover {
  color: var(--primary-dark);
  transform: translateX(4px);
}

.feature-btn i {
  transition: transform 0.3s ease;
}

.feature-btn:hover i {
  transform: translateX(4px);
}

/* Décorations */
.feature-decoration {
  position: absolute;
  top: 20px;
  right: 20px;
  pointer-events: none;
  opacity: 0.1;
}

.decoration-circle {
  width: 60px;
  height: 60px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  position: relative;
}

.decoration-line {
  position: absolute;
  top: 50%;
  left: 120%;
  width: 40px;
  height: 2px;
  background: var(--accent-color);
  transform: translateY(-50%);
}

/* Section de comparaison */
.features-comparison {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px;
  border: 1px solid rgba(25, 118, 210, 0.1);
  text-align: center;
}

.features-comparison h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 40px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.comparison-item {
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
}

.comparison-icon {
  width: 56px;
  height: 56px;
  background: var(--gradient-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.comparison-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.comparison-content p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

/* Animations */
@keyframes featuresWave {
  0%, 100% { 
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  }
  50% { 
    clip-path: polygon(0 0, 100% 0, 100% 60%, 0 80%);
  }
}

@keyframes floatFeatureParticle {
  0% { 
    transform: translateY(100vh) translateX(0) rotate(0deg) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) translateX(0) rotate(0deg) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateY(10vh) translateX(30px) rotate(360deg) scale(1);
  }
  100% { 
    transform: translateY(0) translateX(0) rotate(360deg) scale(0);
    opacity: 0;
  }
}

/* Animation d'apparition en scroll */
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

.feature-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }
.feature-card:nth-child(6) { animation-delay: 0.6s; }

/* Responsive Design */
@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 80px 4% 60px;
  }
  
  .features-header {
    margin-bottom: 60px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }

  .feature-card-inner {
    padding: 32px 24px;
  }
  
  .feature-icon {
    width: 64px;
    height: 64px;
    font-size: 1.6rem;
  }
  
  .features-comparison {
    padding: 32px 24px;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .comparison-item {
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .features-section {
    padding: 60px 4% 40px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .feature-card-inner {
    padding: 24px 20px;
  }
  
  .features-comparison {
    padding: 24px 16px;
  }
}

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}


.footer {
  position: relative;
  background: linear-gradient(145deg, #0a1829 0%, #1a2332 50%, #0f1419 100%);
  color: #ffffff;
  overflow: hidden;
  margin-top: auto;
}

.footer-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.footer-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, 
    rgba(25, 118, 210, 0.1) 0%, 
    rgba(0, 188, 212, 0.15) 50%, 
    rgba(25, 118, 210, 0.1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
  animation: waveMove 8s ease-in-out infinite;
}

.footer-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.footer-particles .particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(0, 188, 212, 0.8), rgba(0, 188, 212, 0.2));
  border-radius: 50%;
  animation: floatFooter 15s linear infinite;
}
.footer-particles .particle:nth-child(odd) {
  animation-delay: -7s;
  background: radial-gradient(circle, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.2));
}

.footer .container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 5% 0;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 60px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Section Brand */
.brand-section {
  gap: 24px;
}




.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: 600;
}

.footer-brand span {
  color: #ffffff;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.footer-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 188, 212, 0.3));
  transition: all 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 6px 16px rgba(0, 188, 212, 0.5));
}

.footer-brand-text {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #00bcd4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #ffffff; /* Fallback */
}

.footer-description {
  color: #b0bec5;
  line-height: 1.6;
  font-size: 1rem;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 188, 212, 0.2);
  border-radius: 50%;
  color: #b0bec5;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: var(--gradient-primary);
  border-color: rgba(0, 188, 212, 0.5);
  color: white;
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
}

.social-link i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.social-link:hover i {
  transform: scale(1.2);
}

.footer-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  position: relative;
}


.footer-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: #b0bec5;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 16px;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 1px;
  background: #00bcd4;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
  padding-left: 20px;
  transform: translateX(4px);
}

.footer-link:hover::before {
  width: 12px;
  height: 2px;
}


.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #b0bec5;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-item:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.contact-item i {
  width: 18px;
  color: #00bcd4;
  font-size: 1rem;
}

.newsletter-section {
  background: rgba(255, 255, 255, 0.02);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(0, 188, 212, 0.1);
  backdrop-filter: blur(20px);
}

.newsletter-description {
  color: #b0bec5;
  font-size: 0.95rem;
  line-height: 1.5;
}

.newsletter-form {
  margin-top: 20px;
}

.input-group {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 188, 212, 0.2);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-group:focus-within {
  border-color: #00bcd4;
  box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 14px 16px;
  color: #ffffff;
  font-size: 0.95rem;
  outline: none;
}

.newsletter-input::placeholder {
  color: #78909c;
}

.newsletter-btn {
  background: var(--gradient-primary);
  border: none;
  padding: 14px 18px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-btn:hover {
  background: linear-gradient(135deg, #0d47a1, #006064);
  transform: scale(1.05);
}

.newsletter-btn i {
  font-size: 1rem;
}

/* Séparateur */
.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.3), transparent);
  margin: 40px 0;
}

/* Section Bottom */
.footer-bottom {
  padding-bottom: 40px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.footer-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-bottom-left p {
  color: #78909c;
  margin: 0;
  font-size: 0.9rem;
}

.footer-badges {
  display: flex;
  gap: 12px;
}


.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 188, 212, 0.1);
  color: #00bcd4;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(0, 188, 212, 0.2);
}

.footer-bottom-right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.legal-link {
  color: #78909c;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: #00bcd4;
}

.back-to-top {
  width: 48px;
  height: 48px;
  background: var(--gradient-primary);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
}

.back-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
}

.back-to-top i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.back-to-top:hover i {
  transform: translateY(-2px);
}

/* Animations */
@keyframes waveMove {
  0%, 100% { 
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
  }
  50% { 
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 60%);
  }
}

@keyframes floatFooter {
  0% { 
    transform: translateY(100vh) translateX(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) translateX(0) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateY(10vh) translateX(20px) scale(1);
  }
  100% { 
    transform: translateY(0) translateX(0) scale(0);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .footer-main {
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 40px;
  }
  
  .footer-section:nth-child(3) {
    display: none; /* Masquer la section support sur tablette */
  }
}

@media (max-width: 768px) {
  .footer .container {
    padding: 60px 4% 0;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .footer-section:nth-child(2),
  .footer-section:nth-child(3) {
    display: none; /* Masquer nav et support sur mobile */
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 12px;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .footer-badges {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .newsletter-section {
    padding: 24px 20px;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .newsletter-btn {
    border-radius: 0 0 12px 12px;
  }
  
  .footer-brand {
    justify-content: center;
  }
  
  .contact-info {
    align-items: center;
  }
}




.footer-links a {
  color: #b0bec5;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #00bcd4;
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-links a:hover::after {
  width: 100%;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #404040;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-bottom p {
  color: #90a4ae;
  margin: 0;
  font-size: 0.9rem;
}

/* Arrière-plan animé amélioré */
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Utiliser vw pour la largeur complète */
  height: 100vh; /* Utiliser vh pour la hauteur complète */
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* Gradient principal animé */
.background-animation::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg, 
    rgba(25, 118, 210, 0.08) 0%, 
    rgba(0, 188, 212, 0.03) 20%, 
    rgba(77, 208, 225, 0.08) 40%,
    rgba(25, 118, 210, 0.03) 60%,
    rgba(0, 188, 212, 0.08) 80%,
    rgba(77, 208, 225, 0.03) 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 25s ease infinite;
  opacity: 0.8;
}

/* Cercles flottants animés */
.background-animation::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(25, 118, 210, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 40%, rgba(0, 188, 212, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(77, 208, 225, 0.18) 0%, transparent 50%),
    radial-gradient(circle at 90% 10%, rgba(25, 118, 210, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 10% 90%, rgba(0, 188, 212, 0.14) 0%, transparent 50%);
  animation: floatingCircles 30s ease-in-out infinite;
}

/* Formes géométriques flottantes */
.wave {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: floatShape 20s ease-in-out infinite;
  filter: blur(2px);
}

.wave1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(25, 118, 210, 0.2) 0%, rgba(25, 118, 210, 0.05) 70%, transparent 100%);
  top: 10%;
  left: -10%;
  animation-delay: 0s;
}

.wave2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 188, 212, 0.15) 0%, rgba(0, 188, 212, 0.03) 70%, transparent 100%);
  top: 60%;
  right: -15%;
  animation-delay: 7s;
}

.wave3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(77, 208, 225, 0.25) 0%, rgba(77, 208, 225, 0.08) 70%, transparent 100%);
  bottom: 20%;
  left: 70%;
  animation-delay: 14s;
}

/* Particules flottantes améliorées */
.floating-dots {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-dots .dot {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: floatParticle 25s linear infinite;
  filter: blur(0.5px);
}

/* Différentes tailles et couleurs pour les particules */
.floating-dots .dot:nth-child(4n+1) {
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(25, 118, 210, 0.8) 0%, rgba(25, 118, 210, 0.2) 100%);
  left: 10%;
  animation-delay: -5s;
}

.floating-dots .dot:nth-child(4n+2) {
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, rgba(0, 188, 212, 0.6) 0%, rgba(0, 188, 212, 0.1) 100%);
  left: 30%;
  animation-delay: -10s;
}

.floating-dots .dot:nth-child(4n+3) {
  width: 2px;
  height: 2px;
  background: radial-gradient(circle, rgba(77, 208, 225, 0.9) 0%, rgba(77, 208, 225, 0.3) 100%);
  left: 60%;
  animation-delay: -15s;
}

.floating-dots .dot:nth-child(4n) {
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(25, 118, 210, 0.7) 0%, rgba(25, 118, 210, 0.15) 100%);
  left: 80%;
  animation-delay: -20s;
}

/* Animations améliorées */
@keyframes gradientShift {
  0% { 
    background-position: 0% 50%; 
    transform: rotate(0deg) scale(1);
  }
  25% { 
    background-position: 100% 25%; 
    transform: rotate(90deg) scale(1.1);
  }
  50% { 
    background-position: 100% 100%; 
    transform: rotate(180deg) scale(1);
  }
  75% { 
    background-position: 0% 75%; 
    transform: rotate(270deg) scale(1.1);
  }
  100% { 
    background-position: 0% 50%; 
    transform: rotate(360deg) scale(1);
  }
}

@keyframes floatingCircles {
  0%, 100% { 
    transform: translateX(0) translateY(0) scale(1);
    opacity: 0.8;
  }
  25% { 
    transform: translateX(20px) translateY(-15px) scale(1.1);
    opacity: 0.6;
  }
  50% { 
    transform: translateX(-10px) translateY(-25px) scale(0.9);
    opacity: 1;
  }
  75% { 
    transform: translateX(-25px) translateY(10px) scale(1.05);
    opacity: 0.7;
  }
}

@keyframes floatShape {
  0% { 
    transform: translateY(0px) translateX(0px) rotate(0deg) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(-20px) translateX(10px) rotate(36deg) scale(1);
  }
  50% { 
    transform: translateY(-60px) translateX(-20px) rotate(180deg) scale(1.2);
    opacity: 0.8;
  }
  90% {
    opacity: 1;
    transform: translateY(-40px) translateX(30px) rotate(324deg) scale(1);
  }
  100% { 
    transform: translateY(0px) translateX(0px) rotate(360deg) scale(0);
    opacity: 0;
  }
}

@keyframes floatParticle {
  0% { 
    transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0);
    opacity: 0;
  }
  5% {
    opacity: 1;
    transform: translateY(95vh) translateX(0px) rotate(0deg) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(50vh) translateX(20px) rotate(180deg) scale(1.1);
  }
  95% {
    opacity: 1;
    transform: translateY(5vh) translateX(-10px) rotate(350deg) scale(1);
  }
  100% { 
    transform: translateY(-5vh) translateX(0px) rotate(360deg) scale(0);
    opacity: 0;
  }
}

/* Effet de parallaxe subtil pour les éléments */
@keyframes parallaxFloat {
  0%, 100% { 
    transform: translateY(0px) translateX(0px);
  }
  50% { 
    transform: translateY(-10px) translateX(5px);
  }
}

/* Vagues géométriques supplémentaires */
.wave::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  border: 1px solid rgba(25, 118, 210, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 8s ease-out infinite;
}

.wave::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  border: 1px solid rgba(0, 188, 212, 0.08);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 8s ease-out infinite;
  animation-delay: 2s;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

/* Effet de profondeur avec plusieurs couches */
.background-animation .layer-1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at top left, rgba(25, 118, 210, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(0, 188, 212, 0.08) 0%, transparent 50%);
  animation: layerMove1 40s ease-in-out infinite;
}

.background-animation .layer-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(77, 208, 225, 0.06) 0%, transparent 70%);
  animation: layerMove2 35s ease-in-out infinite reverse;
}

@keyframes layerMove1 {
  0%, 100% { transform: translateX(0) translateY(0) scale(1); }
  50% { transform: translateX(30px) translateY(-20px) scale(1.05); }
}

@keyframes layerMove2 {
  0%, 100% { transform: translateX(0) translateY(0) scale(1); }
  50% { transform: translateX(-20px) translateY(30px) scale(0.95); }
}

/* Responsive pour les animations */
@media (max-width: 768px) {
  .wave1, .wave2, .wave3 {
    animation-duration: 15s; /* Plus rapide sur mobile */
  }
  
  .floating-dots .dot {
    animation-duration: 20s;
  }
  
  .background-animation::before {
    animation-duration: 20s;
  }
}

/* Optimisation pour les préférences d'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .background-animation::before,
  .background-animation::after,
  .wave,
  .floating-dots .dot,
  .wave::before,
  .wave::after {
    animation: none;
  }
  
  .background-animation {
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(0, 188, 212, 0.08) 100%);
  }
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-dot {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}

@keyframes drawLine {
  to { transform: scaleX(1); }
}

@keyframes growPoint {
  to { transform: scaleY(1); }
}


/* Responsive - Version plein écran */
@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
    min-height: calc(100vh - 100px);
    padding: 60px 5%;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .dashboard-preview {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 15px 4%;
  }

  .hero-section {
    padding: 40px 4%;
    min-height: calc(100vh - 80px);
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-features {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .metric-cards {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .features-section {
    padding: 60px 4%;
    min-height: 50vh;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .footer {
    padding: 40px 4% 20px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 4%;
    min-height: calc(100vh - 70px);
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .nav-title {
    font-size: 1.2rem;
  }

  .navbar {
    padding: 12px 4%;
  }
}

/* Optimisations performances */
@media (prefers-reduced-motion: reduce) {
  .wave,
  .floating-dots .dot,
  .chart-line,
  .chart-points .point {
    animation: none;
  }

  .dashboard-preview:hover {
    transform: none;
  }
}
</style>