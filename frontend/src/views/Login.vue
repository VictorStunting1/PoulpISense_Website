<template>
  <div class="login-page">
    <!-- Bouton retour homepage -->
    <button class="back-to-home" @click="goToHome" title="Retour à l'accueil">
      <i class="fas fa-arrow-left"></i>
      <span>Accueil</span>
    </button>

    <div class="login-background">
      <div class="gradient-overlay"></div>
    </div>
    
    <div class="login-container">
      <div class="login-card" v-motion-slide-visible-once-bottom>
        <!-- Logo et titre centré -->
        <div class="login-header">
          <div class="logo" @click="goToHome">
            <img src="/src/assets/logo3.png" alt="PoulpISence Logo" class="logo-image" />
          </div>
          <h1>PoulpISence</h1>
          <p>Connectez-vous pour accéder à vos données</p>
        </div>

        <form @submit.prevent="login" class="login-form">
          <!-- Champ Email modernisé -->
          <div class="form-group">
            <div class="input-wrapper" :class="{ 'focused': emailFocused, 'error': emailError, 'filled': email }">
              <label class="floating-label">Adresse email</label>
              <div class="input-container">
                <i class="fas fa-envelope input-icon"></i>
                <input
                  v-model="email"
                  type="email"
                  required
                  class="form-input"
                  @focus="emailFocused = true"
                  @blur="emailFocused = false; validateEmail()"
                  @input="clearEmailError"
                >
                <div class="input-border"></div>
              </div>
            </div>
            <transition name="error-slide">
              <div v-if="emailError" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ emailError }}
              </div>
            </transition>
          </div>

          <!-- Champ Mot de passe modernisé -->
          <div class="form-group">
            <div class="input-wrapper" :class="{ 'focused': passwordFocused, 'error': passwordError, 'filled': password }">
              <label class="floating-label">Mot de passe</label>
              <div class="input-container">
                <i class="fas fa-lock input-icon"></i>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="form-input"
                  @focus="passwordFocused = true"
                  @blur="passwordFocused = false; validatePassword()"
                  @input="clearPasswordError"
                >
                <button
                  type="button"
                  class="password-toggle"
                  @click="togglePassword"
                  :class="{ 'active': showPassword }"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
                <div class="input-border"></div>
              </div>
            </div>
            <transition name="error-slide">
              <div v-if="passwordError" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ passwordError }}
              </div>
            </transition>
          </div>

          <!-- Bouton de connexion amélioré -->
          <button 
            type="submit" 
            class="login-button"
            :disabled="loading || !isFormValid"
            :class="{ 'loading': loading, 'success': messageType === 'success' }"
          >
            <div class="button-content">
              <span v-if="loading" class="button-spinner"></span>
              <i v-else-if="messageType === 'success'" class="fas fa-check"></i>
              <i v-else class="fas fa-sign-in-alt"></i>
              <span class="button-text">
                {{ loading ? 'Connexion...' : messageType === 'success' ? 'Connecté !' : 'Se connecter' }}
              </span>
            </div>
            <div class="button-ripple"></div>
          </button>

          <!-- Message de statut amélioré -->
          <transition name="message-fade">
            <div v-if="message" class="status-message" :class="messageType">
              <div class="message-icon">
                <i :class="messageIcon"></i>
              </div>
              <div class="message-content">
                <span class="message-text">{{ message }}</span>
                <div v-if="messageType === 'success'" class="progress-bar"></div>
              </div>
            </div>
          </transition>
        </form>

        <!-- Pied de page -->
        <div class="login-footer">
          <p>Vous n'avez pas de compte ?</p>
          <router-link to="/register" class="register-link">
            <span>Créer un compte</span>
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_CONFIG, API_ENDPOINTS } from '../config/api.js'

const router = useRouter()
const emit = defineEmits(['login-success'])

// États du formulaire
const email = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)
const showPassword = ref(false)

// États de focus pour les animations
const emailFocused = ref(false)
const passwordFocused = ref(false)

// États de validation
const emailError = ref('')
const passwordError = ref('')

// Type de message (success, error)
const messageType = ref('error')

// Icône du message
const messageIcon = computed(() => {
  return messageType.value === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'
})

// Validation du formulaire
const isFormValid = computed(() => {
  return email.value && password.value && !emailError.value && !passwordError.value
})

// Fonctions de validation
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'L\'email est requis'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Format d\'email invalide'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Le mot de passe est requis'
  } else {
    passwordError.value = ''
  }
}

const clearEmailError = () => {
  if (emailError.value) emailError.value = ''
}

const clearPasswordError = () => {
  if (passwordError.value) passwordError.value = ''
}

// Basculer la visibilité du mot de passe
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Fonction de connexion (modifiée)
const login = async () => {
  validateEmail()
  validatePassword()
  
  if (!isFormValid.value) return

  loading.value = true
  message.value = ''
  
  try {
    const res = await axios.post(API_ENDPOINTS.USERS_PASSWORD, {
      email: email.value,
      password: password.value
    })
    
    message.value = 'Connexion réussie ! Redirection...'
    messageType.value = 'success'
    
    localStorage.setItem('userEmail', email.value)
    emit('login-success')
    
    // Rediriger vers la page précédente ou l'accueil
    const returnTo = router.currentRoute.value.query.returnTo
    if (returnTo && returnTo !== '/login') {
      router.push(returnTo)
    } else {
      router.push('/')
    }
    
  } catch (err) {
    messageType.value = 'error'
    message.value = err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.'
    
    setTimeout(() => {
      message.value = ''
    }, 5000)
  }
  
  loading.value = false
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  overflow: hidden;
}

.login-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%,
    #8e44ad 50%,
    #9b59b6 75%,
    #e74c3c 100%);
  z-index: 0;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
    rgba(102, 126, 234, 0.8) 0%,
    rgba(118, 75, 162, 0.8) 25%,
    rgba(142, 68, 173, 0.8) 50%,
    rgba(155, 89, 182, 0.8) 75%,
    rgba(231, 76, 60, 0.8) 100%);
}

/* Formes flottantes */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 48px 36px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
}

/* En-tête modernisée */
.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;  /* Réduit de 88px à 64px */
  height: 64px; /* Réduit de 88px à 64px */
  background: transparent;
  border-radius: 16px; /* Réduit de 22px à 16px */
  margin-bottom: 20px; /* Réduit de 24px à 20px */
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: none;
  position: relative;
}

.logo::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6, #e74c3c);
  border-radius: 18px; /* Ajusté pour correspondre */
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.logo-image {
  width: 88px;  /* Ajusté pour la nouvelle taille */
  height: 88px; /* Ajusté pour la nouvelle taille */
  object-fit: contain;
}

.login-header h1 {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-header p {
  color: #7f8c8d;
  font-size: 16px;
  margin: 0;
  font-weight: 400;
}

/* Formulaire modernisé */
.login-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 28px;
}

/* Champs avec labels flottants */
.input-wrapper {
  position: relative;
  transition: all 0.3s ease;
}

.floating-label {
  position: absolute;
  left: 48px;
  top: 18px;
  font-size: 16px;
  color: #adb5bd;
  transition: all 0.3s ease;
  pointer-events: none;
  font-weight: 500;
  z-index: 2;
}

.input-wrapper.focused .floating-label,
.input-wrapper.filled .floating-label {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: #9b59b6;
  background: rgba(255, 255, 255, 0.95);
  padding: 0 8px;
  border-radius: 6px;
  font-weight: 600;
}

.input-wrapper.error .floating-label {
  color: #e74c3c;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #9b59b6;
  font-size: 18px;
  z-index: 2;
  transition: all 0.3s ease;
}

.input-wrapper.focused .input-icon {
  color: #8e44ad;
  transform: translateY(-50%) scale(1.1);
}

.input-wrapper.error .input-icon {
  color: #e74c3c;
}

.form-input {
  width: 100%;
  padding: 20px 20px 20px 56px;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  font-size: 16px;
  background: #f8f9fa;
  color: #2c3e50;
  transition: all 0.4s ease;
  box-sizing: border-box;
  position: relative;
}

.form-input:focus {
  outline: none;
  border-color: transparent;
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(155, 89, 182, 0.15);
}

.input-wrapper.error .form-input {
  border-color: #e74c3c;
  background: #fdf2f2;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

/* Bordure animée */
.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  transition: all 0.4s ease;
  border-radius: 1px;
}

.input-wrapper.focused .input-border {
  left: 0;
  width: 100%;
}

/* Bouton mot de passe */
.password-toggle {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 2;
}

.password-toggle:hover,
.password-toggle.active {
  color: #9b59b6;
  background: rgba(155, 89, 182, 0.1);
  transform: translateY(-50%) scale(1.1);
}

/* Messages d'erreur améliorés */
.error-message {
  margin-top: 8px;
  color: #e74c3c;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border-left: 3px solid #e74c3c;
}

.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Bouton de connexion ultra-moderne */
.login-button {
  width: 100%;
  padding: 0;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  height: 56px;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px;
  position: relative;
  z-index: 2;
}

.button-ripple {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.login-button:hover:not(:disabled) .button-ripple {
  transform: translateX(0);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(155, 89, 182, 0.4);
}

.login-button.success {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.login-button:disabled {
  background: #adb5bd;
  cursor: not-allowed;
  transform: none;
}

/* Spinner amélioré */
.button-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-left-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Messages de statut ultra-améliorés */
.status-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 12px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.status-message.success {
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background: linear-gradient(135deg, #f8d7da, #f5c6cb);
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message-icon {
  font-size: 18px;
  animation: messageIcon 0.5s ease;
}

.message-content {
  flex: 1;
}

.progress-bar {
  height: 2px;
  background: #27ae60;
  margin-top: 8px;
  border-radius: 1px;
  animation: progress 1.5s ease;
}

@keyframes messageIcon {
  0% { transform: scale(0) rotate(180deg); }
  100% { transform: scale(1) rotate(0deg); }
}

@keyframes progress {
  0% { width: 0; }
  100% { width: 100%; }
}

.message-fade-enter-active {
  transition: all 0.4s ease;
}

.message-fade-leave-active {
  transition: all 0.4s ease;
}

.message-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

/* Footer modernisé */
.login-footer {
  text-align: center;
  color: #6c757d;
  font-size: 14px;
}

.login-footer p {
  margin: 0 0 12px 0;
}

.register-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #9b59b6;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.register-link:hover {
  color: #8e44ad;
  background: rgba(155, 89, 182, 0.1);
  transform: translateX(3px);
}

/* Bouton retour homepage */
.back-to-home {
  position: fixed;
  top: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  text-decoration: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.back-to-home:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.back-to-home:active {
  transform: translateY(0);
}

.back-to-home i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.back-to-home:hover i {
  transform: translateX(-2px);
}

/* Version mobile plus compacte */
@media (max-width: 768px) {
  .back-to-home {
    top: 20px;
    left: 20px;
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .back-to-home span {
    display: none; /* Masquer le texte sur mobile */
  }
  
  .back-to-home {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    justify-content: center;
  }
}

/* Version encore plus compacte pour très petits écrans */
@media (max-width: 480px) {
  .back-to-home {
    top: 16px;
    left: 16px;
    width: 40px;
    height: 40px;
    padding: 0;
  }
}
</style>