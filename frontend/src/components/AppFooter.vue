<template>
  <footer class="app-footer" :class="{ 'dark-mode': isDarkMode }">
    <div class="footer-container">
      <!-- Section principale -->
      <div class="footer-main">
        <!-- Informations sur l'application -->
        <div class="footer-section">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-text">PoulpISence</span>
            </div>
            <p class="footer-description">
              Votre solution IoT complète pour la surveillance environnementale. 
              Surveillez vos capteurs en temps réel avec une interface moderne et intuitive.
            </p>
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
const lastUpdate = computed(() => 'Juin 2025')

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
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  overflow: hidden;
  margin-top: auto;
}

.app-footer.dark-mode {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

/* Container principal */
.footer-container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px 15px;
  z-index: 2;
}

/* Section principale */
.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Marque et logo */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.8rem;
  color: #94a3b8;
  animation: float 3s ease-in-out infinite;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.footer-description {
  color: #94a3b8;
  line-height: 1.5;
  font-size: 0.9rem;
  max-width: 400px;
}

/* Titres des sections */
.footer-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Liens */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
  cursor: pointer;
}

.footer-link:hover {
  color: white;
  transform: translateX(3px);
}

.link-icon {
  font-size: 0.9rem;
  width: 1rem;
  text-align: center;
}

/* Technologies */
.footer-tech {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.tech-title {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.tech-badges {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.tech-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: rgba(148, 163, 184, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-badge:hover {
  background: rgba(148, 163, 184, 0.15);
  color: white;
  transform: translateY(-1px);
}

.tech-icon {
  font-size: 0.9rem;
}

/* Copyright */
.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  font-size: 0.8rem;
  color: #64748b;
  text-align: center;
}

.footer-copyright p {
  margin: 0.2rem 0;
}

.version-info {
  opacity: 0.7;
  font-size: 0.75rem;
}

/* Effet de particules - simplifié */
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
  width: 1px;
  height: 1px;
  background: rgba(148, 163, 184, 0.3);
  border-radius: 50%;
  animation: particle-float infinite linear;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-container {
    padding: 30px 15px 10px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    padding-top: 1rem;
  }

  .tech-badges {
    gap: 1rem;
  }

  .tech-badge {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
}
</style>