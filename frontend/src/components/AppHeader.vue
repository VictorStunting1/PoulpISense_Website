<template>
  <header class="app-header" :class="{ 'dark-mode': isDarkMode }">
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo et titre -->
        <div class="nav-brand">
            <div class="brand-logo">
                <img :src="logoUrl" alt="PoulpISence Logo" class="logo-image">
            </div>
            <router-link to="/" class="brand-text">PoulpISence</router-link>
        </div>

        <!-- Menu de navigation -->
        <div class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">
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

            <!-- Bouton de connexion/déconnexion -->
            <router-link v-if="!isLoggedIn" to="/login" class="login-btn">
                <i class="fas fa-user login-icon"></i>
                <span>Connexion</span>
            </router-link>
            
            <button v-else @click="logout" class="login-btn logout-btn">
                <i class="fas fa-sign-out-alt login-icon"></i>
                <span>Déconnexion</span>
            </button>

            <!-- Menu mobile hamburger -->
            <button class="mobile-menu-toggle" :class="{ 'active': isMobileMenuOpen }" @click="toggleMobileMenu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
            </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import logoUrl from '@/assets/logo3.png'

const router = useRouter()

// Props/Emits
const emit = defineEmits(['theme-changed'])

// État réactif
const isDarkMode = ref(false)
const isMobileMenuOpen = ref(false)

// Computed pour vérifier si l'utilisateur est connecté
const isLoggedIn = computed(() => {
  return localStorage.getItem('userEmail') !== null
})

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

const logout = () => {
  localStorage.removeItem('userEmail')
  localStorage.removeItem('rememberMe')
  router.push('/')
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
  background: linear-gradient(135deg, 
    rgba(74, 144, 226, 0.95) 0%, 
    rgba(142, 108, 239, 0.95) 30%, 
    rgba(184, 86, 196, 0.95) 70%, 
    rgba(236, 72, 153, 0.95) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(142, 108, 239, 0.1);
}

.app-header.dark-mode {
  background: linear-gradient(135deg, 
    rgba(31, 31, 31, 0.95) 0%, 
    rgba(59, 39, 123, 0.95) 30%, 
    rgba(89, 47, 142, 0.95) 70%, 
    rgba(119, 55, 161, 0.95) 100%);
  border-bottom-color: rgba(172, 153, 234, 0.3);
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

.brand-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(142, 108, 239, 0.3);
}

.brand-logo:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(142, 108, 239, 0.4);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.brand-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.brand-text:hover {
  transform: translateY(-1px);
  text-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.dark-mode .brand-text {
  color: #DFD8F7;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
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
  color: rgba(255, 255, 255, 0.8);
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.nav-link.router-link-active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark-mode .nav-link {
  color: rgba(223, 216, 247, 0.9);
}

.dark-mode .nav-link:hover {
  color: #DFD8F7;
  background: rgba(223, 216, 247, 0.1);
}

.dark-mode .nav-link.router-link-active {
  color: #DFD8F7;
  background: rgba(223, 216, 247, 0.15);
  border: 1px solid rgba(223, 216, 247, 0.2);
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
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.theme-toggle:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark-mode .theme-icon {
  transform: translateX(22px);
  background: #ff8c00;
  color: #ffef76;
}

/* Bouton de connexion */
.login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.login-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
  color: white;
}

.dark-mode .login-btn {
  background: rgba(223, 216, 247, 0.15);
  border-color: rgba(223, 216, 247, 0.3);
  color: #DFD8F7;
}

.dark-mode .login-btn:hover {
  background: rgba(223, 216, 247, 0.2);
  color: #DFD8F7;
}

.login-icon {
  font-size: 1.1rem;
}

/* Bouton de déconnexion avec le même style que connexion mais en rose */
.logout-btn {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.2) 100%) !important;
    border-color: rgba(236, 72, 153, 0.4) !important;
    cursor: pointer;
    color: white !important; 
}

.logout-btn:hover {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(219, 39, 119, 0.3) 100%) !important;
    box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3) !important;
    transform: translateY(-2px);
    color: white !important;
}

.dark-mode .logout-btn {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.15) 100%) !important;
    border-color: rgba(236, 72, 153, 0.3) !important;
    color: white !important;
}

.dark-mode .logout-btn:hover {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(219, 39, 119, 0.25) 100%) !important;
    box-shadow: 0 4px 20px rgba(236, 72, 153, 0.2) !important;
    color: white !important;
}

/* Menu mobile */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  width: 44px;
  height: 44px;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.hamburger-line {
  width: 22px;
  height: 3px;
  background: #1a1a1a;
  transition: all 0.3s ease;
  border-radius: 2px;
  margin: 0 auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dark-mode .hamburger-line {
  background: #1a1a1a;
}

.dark-mode .mobile-menu-toggle {
  background: rgba(223, 216, 247, 0.15);
  border-color: rgba(223, 216, 247, 0.3);
}

.dark-mode .mobile-menu-toggle:hover {
  background: rgba(223, 216, 247, 0.25);
}

/* Animation de la croix */
.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
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
    background: linear-gradient(135deg, 
      rgba(74, 144, 226, 0.98) 0%, 
      rgba(142, 108, 239, 0.98) 50%, 
      rgba(236, 72, 153, 0.98) 100%);
    backdrop-filter: blur(20px);
    flex-direction: column;
    gap: 0;
    padding: 20px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .dark-mode .nav-menu {
    background: linear-gradient(135deg, 
      rgba(31, 31, 31, 0.98) 0%, 
      rgba(59, 39, 123, 0.98) 50%, 
      rgba(119, 55, 161, 0.98) 100%);
    border-bottom-color: rgba(172, 153, 234, 0.3);
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