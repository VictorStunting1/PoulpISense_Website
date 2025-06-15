<template>
  <div class="register-page">
    <!-- Bouton retour homepage -->
    <button class="back-to-home" @click="goToHome" title="Retour à l'accueil">
      <i class="fas fa-arrow-left"></i>
      <span>Accueil</span>
    </button>

    <div class="register-background">
      <div class="gradient-overlay"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
    
    <div class="register-container">
      <div class="register-card" v-motion-slide-visible-once-bottom>
        <!-- Logo et titre centré -->
        <div class="register-header">
          <div class="logo" @click="goToHome">
            <img src="/src/assets/logo3.png" alt="PoulpISence Logo" class="logo-image" />
          </div>
          <h1>PoulpISence</h1>
          <p>Créez votre compte pour commencer</p>
        </div>

        <form @submit.prevent="register" class="register-form">
          <!-- Champ Prénom -->
          <div class="form-group">
            <div class="input-wrapper" :class="{ 'focused': firstNameFocused, 'error': firstNameError, 'filled': firstName }">
              <label class="floating-label">Prénom</label>
              <div class="input-container">
                <i class="fas fa-user input-icon"></i>
                <input
                  v-model="firstName"
                  type="text"
                  required
                  class="form-input"
                  @focus="firstNameFocused = true"
                  @blur="firstNameFocused = false; validateFirstName()"
                  @input="clearFirstNameError"
                >
                <div class="input-border"></div>
              </div>
            </div>
            <transition name="error-slide">
              <div v-if="firstNameError" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ firstNameError }}
              </div>
            </transition>
          </div>

          <!-- Champ Nom -->
          <div class="form-group">
            <div class="input-wrapper" :class="{ 'focused': lastNameFocused, 'error': lastNameError, 'filled': lastName }">
              <label class="floating-label">Nom</label>
              <div class="input-container">
                <i class="fas fa-user-tag input-icon"></i>
                <input
                  v-model="lastName"
                  type="text"
                  required
                  class="form-input"
                  @focus="lastNameFocused = true"
                  @blur="lastNameFocused = false; validateLastName()"
                  @input="clearLastNameError"
                >
                <div class="input-border"></div>
              </div>
            </div>
            <transition name="error-slide">
              <div v-if="lastNameError" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ lastNameError }}
              </div>
            </transition>
          </div>

          <!-- Champ Email -->
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

          <!-- Champ Mot de passe -->
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

          <!-- Champ Confirmation mot de passe -->
          <div class="form-group">
            <div class="input-wrapper" :class="{ 'focused': confirmPasswordFocused, 'error': confirmPasswordError, 'filled': confirmPassword }">
              <label class="floating-label">Confirmer le mot de passe</label>
              <div class="input-container">
                <i class="fas fa-check-circle input-icon"></i>
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="form-input"
                  @focus="confirmPasswordFocused = true"
                  @blur="confirmPasswordFocused = false; validateConfirmPassword()"
                  @input="clearConfirmPasswordError"
                >
                <button
                  type="button"
                  class="password-toggle"
                  @click="toggleConfirmPassword"
                  :class="{ 'active': showConfirmPassword }"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
                <div class="input-border"></div>
              </div>
            </div>
            <transition name="error-slide">
              <div v-if="confirmPasswordError" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ confirmPasswordError }}
              </div>
            </transition>
          </div>

          <!-- Indicateur de force du mot de passe -->
          <div v-if="password" class="password-strength">
            <div class="strength-label">Force du mot de passe :</div>
            <div class="strength-bar">
              <div 
                class="strength-fill" 
                :class="passwordStrengthClass"
                :style="{ width: passwordStrengthWidth + '%' }"
              ></div>
            </div>
            <div class="strength-text" :class="passwordStrengthClass">
              {{ passwordStrengthText }}
            </div>
          </div>

          <!-- Conditions d'utilisation -->
          <div class="form-group">
            <label class="checkbox-wrapper">
              <input 
                type="checkbox" 
                v-model="acceptTerms" 
                class="checkbox-input"
                @change="validateTerms"
              >
              <span class="checkmark">
                <i class="fas fa-check"></i>
              </span>
              <span class="checkbox-text">
                J'accepte les 
                <a href="#" class="terms-link" @click.prevent="showTerms = true">conditions d'utilisation</a>
                et la 
                <a href="#" class="terms-link" @click.prevent="showPrivacy = true">politique de confidentialité</a>
              </span>
            </label>
            <transition name="error-slide">
              <div v-if="termsError" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ termsError }}
              </div>
            </transition>
          </div>

          <!-- Bouton d'inscription -->
          <button 
            type="submit" 
            class="register-button"
            :disabled="loading || !isFormValid"
            :class="{ 'loading': loading, 'success': messageType === 'success' }"
          >
            <div class="button-content">
              <span v-if="loading" class="button-spinner"></span>
              <i v-else-if="messageType === 'success'" class="fas fa-check"></i>
              <i v-else class="fas fa-user-plus"></i>
              <span class="button-text">
                {{ loading ? 'Création...' : messageType === 'success' ? 'Compte créé !' : 'Créer mon compte' }}
              </span>
            </div>
            <div class="button-ripple"></div>
          </button>

          <!-- Message de statut -->
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
        <div class="register-footer">
          <p>Vous avez déjà un compte ?</p>
          <router-link to="/login" class="login-link">
            <span>Se connecter</span>
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Modal Conditions d'utilisation -->
    <div v-if="showTerms" class="modal-overlay" @click="showTerms = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Conditions d'utilisation</h3>
          <button @click="showTerms = false" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>En utilisant PoulpISense, vous acceptez nos conditions d'utilisation...</p>
          <!-- Ajoutez ici le contenu complet des conditions -->
        </div>
      </div>
    </div>

    <!-- Modal Politique de confidentialité -->
    <div v-if="showPrivacy" class="modal-overlay" @click="showPrivacy = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Politique de confidentialité</h3>
          <button @click="showPrivacy = false" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Votre vie privée est importante pour nous. Cette politique explique...</p>
          <!-- Ajoutez ici le contenu complet de la politique -->
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

// États du formulaire
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const message = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showTerms = ref(false)
const showPrivacy = ref(false)

// États de focus pour les animations
const firstNameFocused = ref(false)
const lastNameFocused = ref(false)
const emailFocused = ref(false)
const passwordFocused = ref(false)
const confirmPasswordFocused = ref(false)

// États de validation
const firstNameError = ref('')
const lastNameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const termsError = ref('')

// Type de message (success, error)
const messageType = ref('error')

// Icône du message
const messageIcon = computed(() => {
  return messageType.value === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'
})

// Validation du formulaire
const isFormValid = computed(() => {
  return firstName.value && 
         lastName.value && 
         email.value && 
         password.value && 
         confirmPassword.value &&
         acceptTerms.value &&
         !firstNameError.value && 
         !lastNameError.value && 
         !emailError.value && 
         !passwordError.value && 
         !confirmPasswordError.value &&
         !termsError.value
})

// Force du mot de passe
const passwordStrength = computed(() => {
  if (!password.value) return 0
  
  let strength = 0
  if (password.value.length >= 8) strength += 25
  if (/[a-z]/.test(password.value)) strength += 25
  if (/[A-Z]/.test(password.value)) strength += 25
  if (/[0-9]/.test(password.value)) strength += 15
  if (/[^A-Za-z0-9]/.test(password.value)) strength += 10
  
  return Math.min(strength, 100)
})

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  if (strength < 30) return 'weak'
  if (strength < 60) return 'medium'
  if (strength < 80) return 'good'
  return 'strong'
})

const passwordStrengthWidth = computed(() => passwordStrength.value)

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength < 30) return 'Faible'
  if (strength < 60) return 'Moyen'
  if (strength < 80) return 'Bon'
  return 'Excellent'
})

// Fonctions de validation
const validateFirstName = () => {
  if (!firstName.value.trim()) {
    firstNameError.value = 'Le prénom est requis'
  } else if (firstName.value.trim().length < 2) {
    firstNameError.value = 'Le prénom doit contenir au moins 2 caractères'
  } else {
    firstNameError.value = ''
  }
}

const validateLastName = () => {
  if (!lastName.value.trim()) {
    lastNameError.value = 'Le nom est requis'
  } else if (lastName.value.trim().length < 2) {
    lastNameError.value = 'Le nom doit contenir au moins 2 caractères'
  } else {
    lastNameError.value = ''
  }
}

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
  } else if (password.value.length < 8) {
    passwordError.value = 'Le mot de passe doit contenir au moins 8 caractères'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
    passwordError.value = 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
  } else {
    passwordError.value = ''
  }
  
  // Revalider la confirmation si elle existe
  if (confirmPassword.value) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'La confirmation est requise'
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas'
  } else {
    confirmPasswordError.value = ''
  }
}

const validateTerms = () => {
  if (!acceptTerms.value) {
    termsError.value = 'Vous devez accepter les conditions d\'utilisation'
  } else {
    termsError.value = ''
  }
}

// Fonctions pour effacer les erreurs
const clearFirstNameError = () => {
  if (firstNameError.value) firstNameError.value = ''
}

const clearLastNameError = () => {
  if (lastNameError.value) lastNameError.value = ''
}

const clearEmailError = () => {
  if (emailError.value) emailError.value = ''
}

const clearPasswordError = () => {
  if (passwordError.value) passwordError.value = ''
}

const clearConfirmPasswordError = () => {
  if (confirmPasswordError.value) confirmPasswordError.value = ''
}

// Basculer la visibilité des mots de passe
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// Fonction d'inscription
const register = async () => {
  // Valider tous les champs
  validateFirstName()
  validateLastName()
  validateEmail()
  validatePassword()
  validateConfirmPassword()
  validateTerms()
  
  if (!isFormValid.value) return

  loading.value = true
  message.value = ''
  
  try {
    // Ici vous devrez adapter l'endpoint selon votre API
    const res = await axios.post(API_ENDPOINTS.REGISTER || `${API_CONFIG.BASE_URL}/api/register`, {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value,
      password: password.value
    })
    
    message.value = 'Compte créé avec succès ! Redirection vers la connexion...'
    messageType.value = 'success'
    
    // Rediriger vers la page de connexion après 2 secondes
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    
  } catch (err) {
    messageType.value = 'error'
    if (err.response?.status === 409) {
      message.value = 'Cette adresse email est déjà utilisée.'
    } else {
      message.value = err.response?.data?.message || 'Erreur lors de la création du compte. Veuillez réessayer.'
    }
    
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
/* Reprise des styles de login avec adaptations pour register */
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  overflow: hidden;
}

.register-background {
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

.register-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
}

.register-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  max-height: 90vh;
  overflow-y: auto;
}

.register-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
}

/* En-tête */
.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: transparent;
  border-radius: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: none;
  position: relative;
}

.logo-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.register-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.register-header p {
  color: #7f8c8d;
  font-size: 15px;
  margin: 0;
  font-weight: 400;
}

/* Formulaire */
.register-form {
  margin-bottom: 28px;
}

.form-group {
  margin-bottom: 24px;
}

/* Champs avec labels flottants - reprise du style login */
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

/* Indicateur de force du mot de passe */
.password-strength {
  margin-top: 12px;
  padding: 12px;
  background: rgba(155, 89, 182, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(155, 89, 182, 0.1);
}

.strength-label {
  font-size: 13px;
  color: #6c757d;
  margin-bottom: 8px;
  font-weight: 500;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.strength-fill.weak {
  background: linear-gradient(90deg, #e74c3c, #c0392b);
}

.strength-fill.medium {
  background: linear-gradient(90deg, #f39c12, #e67e22);
}

.strength-fill.good {
  background: linear-gradient(90deg, #3498db, #2980b9);
}

.strength-fill.strong {
  background: linear-gradient(90deg, #27ae60, #229954);
}

.strength-text {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.strength-text.weak {
  color: #e74c3c;
}

.strength-text.medium {
  color: #f39c12;
}

.strength-text.good {
  color: #3498db;
}

.strength-text.strong {
  color: #27ae60;
}

/* Checkbox personnalisée */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
}

.checkbox-input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkmark i {
  color: white;
  font-size: 12px;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkmark {
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  border-color: #9b59b6;
}

.checkbox-input:checked + .checkmark i {
  opacity: 1;
  transform: scale(1);
}

.checkbox-text {
  color: #6c757d;
}

.terms-link {
  color: #9b59b6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: #8e44ad;
  text-decoration: underline;
}

/* Messages d'erreur */
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

/* Bouton d'inscription */
.register-button {
  width: 100%;
  padding: 0;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
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

.register-button:hover:not(:disabled) .button-ripple {
  transform: translateX(0);
}

.register-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(39, 174, 96, 0.4);
}

.register-button.success {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.register-button:disabled {
  background: #adb5bd;
  cursor: not-allowed;
  transform: none;
}

/* Spinner */
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

/* Messages de statut */
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

/* Footer */
.register-footer {
  text-align: center;
  color: #6c757d;
  font-size: 14px;
}

.register-footer p {
  margin: 0 0 12px 0;
}

.login-link {
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

.login-link:hover {
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

.back-to-home i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.back-to-home:hover i {
  transform: translateX(-2px);
}

/* Modals pour conditions */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  color: white;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-body {
  padding: 2rem;
  max-height: calc(80vh - 120px);
  overflow-y: auto;
  line-height: 1.6;
  color: #4a5568;
}

/* Responsive */
@media (max-width: 768px) {
  .register-container {
    max-width: 100%;
    padding: 0 10px;
  }
  
  .register-card {
    padding: 32px 24px;
    margin: 10px 0;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .back-to-home span {
    display: none;
  }
  
  .back-to-home {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    justify-content: center;
    top: 20px;
    left: 20px;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 24px 20px;
    border-radius: 16px;
  }
  
  .register-header h1 {
    font-size: 24px;
  }
  
  .form-input {
    padding: 18px 18px 18px 50px;
    font-size: 16px; /* Éviter le zoom sur iOS */
  }
  
  .modal-content {
    margin: 1rem;
    max-width: calc(100% - 2rem);
  }
  
  .modal-header {
    padding: 1rem 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}
</style>