<template>
  <header class="app-header" :class="{ 'dark-mode': isDarkMode }">
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo et titre -->
        <div class="nav-brand">
          <div class="brand-icon"><i class="fas fa-octopus-deploy"></i></div>
          <router-link to="/" class="brand-text">PoulpISence</router-link>
        </div>

        <!-- Menu de navigation -->
        <div class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
          <router-link to="/home" class="nav-link" @click="closeMobileMenu">
            <i class="fas fa-home nav-icon"></i>
            <span>Accueil</span>
          </router-link>
          
          <router-link to="/dashboard" class="nav-link" @click="closeMobileMenu">
            <i class="fas fa-chart-line nav-icon"></i>
            <span>Tableau de bord</span>
          </router-link>
          
          <router-link to="/devices" class="nav-link" @click="closeMobileMenu">
            <i class="fas fa-robot nav-icon"></i>
            <span>Appareils</span>
          </router-link>
          
          <router-link to="/alerts" class="nav-link" @click="closeMobileMenu">
            <i class="fas fa-bell nav-icon"></i>
            <span>Alertes</span>
          </router-link>
          
          <router-link to="/settings" class="nav-link" @click="closeMobileMenu">
            <i class="fas fa-cog nav-icon"></i>
            <span>Paramètres</span>
          </router-link>
        </div>

        <!-- Actions de droite -->
        <div class="nav-actions">
          <!-- Bouton de thème -->
          <button class="theme-toggle" @click="toggleTheme" :title="isDarkMode ? 'Mode clair' : 'Mode sombre'">
            <div class="theme-icon">
              <i v-if="isDarkMode" class="fas fa-sun"></i>
              <i v-else class="fas fa-moon"></i>
            </div>
          </button>

          <!-- Bouton de connexion -->
          <router-link to="/login" class="login-btn">
            <i class="fas fa-user login-icon"></i>
            <span>Connexion</span>
          </router-link>

          <!-- Menu mobile hamburger -->
          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
            <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
            <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Props/Emits
const emit = defineEmits(['theme-changed'])

// État réactif
const isDarkMode = ref(false)
const isMobileMenuOpen = ref(false)

// Fonctions
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  emit('theme-changed', isDarkMode.value)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Chargement du thème au montage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDarkMode.value = savedTheme === 'dark'
  emit('theme-changed', isDarkMode.value)
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(81, 43, 212, 0.1);
  transition: all 0.3s ease;
}

.app-header.dark-mode {
  background: rgba(31, 31, 31, 0.95);
  border-bottom-color: rgba(172, 153, 234, 0.2);
}

.navbar {
  width: 100%;
  height: 70px;
}

.nav-container {
  max-width: 1400px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo et marque */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  font-size: 2rem;
  color: #512BD4;
  animation: pulse 2s infinite;
}

.dark-mode .brand-icon {
  color: #ac99ea;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.brand-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #512BD4;
  text-decoration: none;
  background: linear-gradient(45deg, #512BD4, #ac99ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.dark-mode .brand-text {
  background: linear-gradient(45deg, #ac99ea, #DFD8F7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Menu de navigation */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: #6E6E6E;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(81, 43, 212, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: #512BD4;
  background: rgba(81, 43, 212, 0.05);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  color: #512BD4;
  background: linear-gradient(135deg, rgba(81, 43, 212, 0.1), rgba(172, 153, 234, 0.1));
  box-shadow: 0 2px 10px rgba(81, 43, 212, 0.2);
}

.dark-mode .nav-link {
  color: #DFD8F7;
}

.dark-mode .nav-link:hover {
  color: #ac99ea;
  background: rgba(172, 153, 234, 0.1);
}

.dark-mode .nav-link.router-link-active {
  color: #ac99ea;
  background: linear-gradient(135deg, rgba(172, 153, 234, 0.2), rgba(223, 216, 247, 0.1));
}

.nav-icon {
  font-size: 1.2rem;
}

/* Actions de droite */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Bouton de thème */
.theme-toggle {
  position: relative;
  width: 50px;
  height: 28px;
  background: linear-gradient(135deg, #512BD4, #ac99ea);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.theme-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(81, 43, 212, 0.3);
}

.theme-icon {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
  color: #512BD4;
}

.dark-mode .theme-icon {
  transform: translateX(22px);
  background: #1f1f1f;
  color: #ac99ea;
}

/* Bouton de connexion */
.login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #512BD4, #ac99ea);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(81, 43, 212, 0.2);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(81, 43, 212, 0.3);
}

.login-icon {
  font-size: 1.1rem;
}

/* Menu mobile */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: #512BD4;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.dark-mode .hamburger-line {
  background: #ac99ea;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav-menu {
    gap: 1.5rem;
  }
  
  .nav-link span {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    gap: 0;
    padding: 20px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(81, 43, 212, 0.1);
  }

  .dark-mode .nav-menu {
    background: rgba(31, 31, 31, 0.98);
    border-bottom-color: rgba(172, 153, 234, 0.2);
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 5px;
  }

  .login-btn span {
    display: none;
  }

  .nav-container {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .brand-text {
    font-size: 1.5rem;
  }

  .brand-icon {
    font-size: 1.5rem;
  }

  .nav-container {
    padding: 0 10px;
  }

  .theme-toggle {
    width: 45px;
    height: 25px;
  }

  .theme-icon {
    width: 21px;
    height: 21px;
  }

  .dark-mode .theme-icon {
    transform: translateX(20px);
  }
}
</style>