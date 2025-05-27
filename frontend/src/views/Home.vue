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
    <nav class="navbar">
      <div class="nav-brand">
        <img src="@/assets/logo2.png" alt="PoulpISense" class="nav-logo">
        <span class="nav-title">PoulpISense</span>
      </div>
      <div class="nav-actions">
        <router-link to="/login" class="nav-link">Connexion</router-link>
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
            <router-link to="/login" class="btn-primary">
              <i class="fas fa-sign-in-alt"></i>
              Se connecter
            </router-link>
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

      <!-- Section fonctionnalités -->
      <section ref="featuresSection" class="features-section">
        <div class="container">
          <h2 class="section-title">Pourquoi choisir PoulpISense ?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-tachometer-alt"></i>
              </div>
              <h3>Dashboard intuitif</h3>
              <p>Visualisez toutes vos données de capteurs dans une interface claire et moderne.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-bell"></i>
              </div>
              <h3>Alertes intelligentes</h3>
              <p>Recevez des notifications instantanées en cas de valeurs anormales.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-history"></i>
              </div>
              <h3>Historique complet</h3>
              <p>Accédez à l'historique complet de vos mesures avec des graphiques détaillés.</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="@/assets/logo2.png" alt="PoulpISense" class="footer-logo">
            <span>PoulpISense</span>
          </div>
          <div class="footer-links">
            <a href="#">À propos</a>
            <a href="#">Contact</a>
            <a href="#">Support</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 PoulpISense. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const featuresSection = ref(null)

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' })
}
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
  background: var(--background);
  position: relative;
  overflow-x: hidden;
}


/* Navigation */
.navbar {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: var(--primary-color);
  color: white;
}

/* Contenu principal */
.main-content {
  position: relative;
  z-index: 1;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 80px 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.highlight {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  padding: 100px 5%;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.feature-card {
  text-align: center;
  padding: 40px 30px;
  border-radius: 16px;
  background: var(--surface);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
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

/* Footer */
.footer {
  background: var(--text-primary);
  color: white;
  padding: 60px 5% 30px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: 600;
}

.footer-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.footer-links {
  display: flex;
  gap: 30px;
}

.footer-links a {
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--accent-color);
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #37474f;
  color: var(--text-light);
}

/* Arrière-plan animé amélioré */
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

/* Responsive */
@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
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
    padding: 60px 4%;
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
    padding: 80px 4%;
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
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .nav-title {
    font-size: 1.2rem;
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