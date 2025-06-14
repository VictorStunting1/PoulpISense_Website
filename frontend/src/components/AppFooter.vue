<template>
  <footer class="app-footer" :class="{ 'dark-mode': isDarkMode }">
    <!-- Vague décorative -->
    <div class="wave-decoration">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
      </svg>
    </div>

    <div class="footer-container">
      <!-- Section principale -->
      <div class="footer-main">
        <!-- Informations sur l'application -->
        <div class="footer-section">
          <div class="footer-brand">
            <div class="footer-logo">
              <i class="fas fa-octopus-deploy logo-icon"></i>
              <span class="logo-text">PoulpISence</span>
            </div>
            <p class="footer-description">
              Votre solution IoT complète pour la surveillance environnementale. 
              Surveillez vos capteurs en temps réel avec une interface moderne et intuitive.
            </p>
            <div class="footer-stats">
              <div class="stat-item">
                <i class="fas fa-broadcast-tower stat-icon"></i>
                <span class="stat-text">IoT Monitoring</span>
              </div>
              <div class="stat-item">
                <i class="fas fa-shield-alt stat-icon"></i>
                <span class="stat-text">Sécurisé</span>
              </div>
              <div class="stat-item">
                <i class="fas fa-mobile-alt stat-icon"></i>
                <span class="stat-text">Multi-plateforme</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation rapide -->
        <div class="footer-section">
          <h3 class="footer-title">Navigation</h3>
          <div class="footer-links">
            <router-link to="/home" class="footer-link">
              <i class="fas fa-home link-icon"></i>
              <span>Accueil</span>
            </router-link>
            <router-link to="/dashboard" class="footer-link">
              <i class="fas fa-chart-line link-icon"></i>
              <span>Tableau de bord</span>
            </router-link>
            <router-link to="/devices" class="footer-link">
              <i class="fas fa-microchip link-icon"></i>
              <span>Appareils</span>
            </router-link>
            <router-link to="/alerts" class="footer-link">
              <i class="fas fa-bell link-icon"></i>
              <span>Alertes</span>
            </router-link>
          </div>
        </div>

        <!-- Fonctionnalités -->
        <div class="footer-section">
          <h3 class="footer-title">Fonctionnalités</h3>
          <div class="footer-links">
            <div class="footer-link">
              <i class="fas fa-thermometer-half link-icon"></i>
              <span>Surveillance Température</span>
            </div>
            <div class="footer-link">
              <i class="fas fa-flask link-icon"></i>
              <span>Mesure du pH</span>
            </div>
            <div class="footer-link">
              <i class="fas fa-tint link-icon"></i>
              <span>Analyse Turbidité</span>
            </div>
            <div class="footer-link">
              <i class="fas fa-chart-area link-icon"></i>
              <span>Graphiques en Temps Réel</span>
            </div>
          </div>
        </div>

        <!-- Contact et support -->
        <div class="footer-section">
          <h3 class="footer-title">Support</h3>
          <div class="footer-links">
            <div class="footer-link">
              <i class="fas fa-book link-icon"></i>
              <span>Documentation</span>
            </div>
            <div class="footer-link">
              <i class="fas fa-question-circle link-icon"></i>
              <span>FAQ</span>
            </div>
            <div class="footer-link">
              <i class="fas fa-comments link-icon"></i>
              <span>Support Technique</span>
            </div>
            <div class="footer-link">
              <i class="fas fa-envelope link-icon"></i>
              <span>Nous Contacter</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Technologies utilisées -->
      <div class="footer-tech">
        <h4 class="tech-title">Propulsé par</h4>
        <div class="tech-badges">
          <div class="tech-badge">
            <i class="fab fa-vuejs tech-icon"></i>
            <span>Vue.js 3</span>
          </div>
          <div class="tech-badge">
            <i class="fas fa-code tech-icon"></i>
            <span>.NET MAUI</span>
          </div>
          <div class="tech-badge">
            <i class="fas fa-database tech-icon"></i>
            <span>PostgreSQL</span>
          </div>
          <div class="tech-badge">
            <i class="fas fa-server tech-icon"></i>
            <span>ASP.NET Core</span>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} PoulpISence. Tous droits réservés.</p>
          <p class="version-info">Version 1.0.0 • Dernière mise à jour: {{ lastUpdate }}</p>
        </div>
        <div class="footer-social">
          <div class="social-link">
            <i class="fas fa-heart social-icon"></i>
            <span>Fait avec passion</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Effet de particules -->
    <div class="particles" ref="particlesContainer"></div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
defineProps({
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

// Computed
const currentYear = computed(() => new Date().getFullYear())
const lastUpdate = computed(() => 'Décembre 2024')

// Effet de particules
const particlesContainer = ref(null)

onMounted(() => {
  createParticles()
})

const createParticles = () => {
  if (!particlesContainer.value) return

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.animationDelay = Math.random() * 20 + 's'
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
    particlesContainer.value.appendChild(particle)
  }
}
</script>

<style scoped>
.app-footer {
  position: relative;
  background: linear-gradient(135deg, #512BD4 0%, #2B0B98 100%);
  color: white;
  overflow: hidden;
  margin-top: auto;
}

.app-footer.dark-mode {
  background: linear-gradient(135deg, #2B0B98 0%, #190649 100%);
}

/* Vague décorative */
.wave-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 120px;
  transform: rotate(180deg);
}

.wave-decoration svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 120px;
}

.shape-fill {
  fill: #ac99ea;
}

.app-footer.dark-mode .shape-fill {
  fill: #512BD4;
}

/* Container principal */
.footer-container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 20px 20px;
  z-index: 2;
}

/* Section principale */
.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Marque et logo */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  font-size: 2.5rem;
  color: #DFD8F7;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.logo-text {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(45deg, #DFD8F7, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: #DFD8F7;
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ac99ea;
  font-size: 0.9rem;
}

.stat-icon {
  font-size: 1rem;
  width: 1.2rem;
  text-align: center;
}

/* Titres des sections */
.footer-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  position: relative;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #DFD8F7, #ac99ea);
  border-radius: 1px;
}

/* Liens */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #DFD8F7;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
  cursor: pointer;
}

.footer-link:hover {
  color: #ac99ea;
  transform: translateX(5px);
}

.link-icon {
  font-size: 1rem;
  width: 1.2rem;
  text-align: center;
}

/* Technologies */
.footer-tech {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tech-title {
  color: #DFD8F7;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.tech-badges {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.tech-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-badge:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.tech-icon {
  font-size: 1rem;
}

/* Copyright */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  font-size: 0.85rem;
  color: #DFD8F7;
}

.footer-copyright p {
  margin: 0.25rem 0;
}

.version-info {
  opacity: 0.7;
  font-size: 0.8rem;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ac99ea;
}

.social-icon {
  font-size: 1rem;
  animation: heartbeat 2s infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  10%, 30% { transform: scale(0.9); }
  20%, 40%, 60%, 80% { transform: scale(1); }
  50%, 70% { transform: scale(1.1); }
}

/* Effet de particules */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.particles :deep(.particle) {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: particle-float infinite linear;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
  }

  .tech-badges {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 100px 15px 15px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .tech-badges {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .tech-badge {
    justify-content: center;
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 80px 10px 10px;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .logo-icon {
    font-size: 2rem;
  }

  .footer-description {
    font-size: 0.9rem;
  }

  .tech-badges {
    flex-direction: column;
    align-items: center;
  }

  .wave-decoration {
    height: 80px;
  }

  .wave-decoration svg {
    height: 80px;
  }
}
</style>