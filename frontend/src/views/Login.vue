<template>
  <div class="login-page">
    <div class="login-background">
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
      </div>
    <div class="login-container">
      
      <div class="login-card">
        <div class="login-header">
          <div class="logo" @click="goToHome">
            <img src="@/assets/logo2.png" alt="PoulpISense Logo" class="logo-image" />
          </div>
          <h1>PoulpISense</h1>
          <p>Connectez-vous à votre espace IoT</p>
        </div>

        <form @submit.prevent="login" class="login-form">
          <!-- Champ Email -->
          <div class="form-group">
            <div class="input-container">
              <i class="fas fa-envelope input-icon"></i>
              <input
                v-model="email"
                type="email"
                required
                placeholder="Votre adresse email"
                class="form-input"
                :class="{ 'input-error': emailError }"
                @blur="validateEmail"
                @input="clearEmailError"
              >
            </div>
            <div v-if="emailError" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              {{ emailError }}
            </div>
          </div>

          <!-- Champ Mot de passe -->
          <div class="form-group">
            <div class="input-container">
              <i class="fas fa-lock input-icon"></i>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Votre mot de passe"
                class="form-input"
                :class="{ 'input-error': passwordError }"
                @blur="validatePassword"
                @input="clearPasswordError"
              >
              <button
                type="button"
                class="password-toggle"
                @click="togglePassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div v-if="passwordError" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              {{ passwordError }}
            </div>
          </div>

          <!-- Options supplémentaires -->
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span class="checkmark"></span>
              Se souvenir de moi
            </label>
            <a href="#" class="forgot-password">Mot de passe oublié ?</a>
          </div>

          <!-- Bouton de connexion -->
          <button 
            type="submit" 
            class="login-button"
            :disabled="loading || !isFormValid"
            :class="{ 'loading': loading }"
          >
            <span v-if="loading" class="button-spinner"></span>
            <i v-else class="fas fa-sign-in-alt"></i>
            {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>

          <!-- Message de statut -->
          <transition name="message">
            <div v-if="message" class="status-message" :class="messageType">
              <i :class="messageIcon"></i>
              {{ message }}
            </div>
          </transition>
        </form>

        <!-- Pied de page -->
        <div class="login-footer">
          <p>Pas encore de compte ? 
            <router-link to="/register" class="register-link">S'inscrire</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['login-success'])

// États du formulaire
const email = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

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

// Fonction de connexion
const login = async () => {
  // Valider avant soumission
  validateEmail()
  validatePassword()
  
  if (!isFormValid.value) return

  loading.value = true
  message.value = ''
  
  try {
    const res = await axios.post('http://localhost:3001/api/users_password', {
      email: email.value,
      password: password.value
    })
    
    message.value = 'Connexion réussie ! Redirection...'
    messageType.value = 'success'
    
    // Stocker les informations de connexion
    localStorage.setItem('userEmail', email.value)
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
    }
    
    emit('login-success')
    
    // Délai pour montrer le message de succès
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
    
  } catch (err) {
    messageType.value = 'error'
    message.value = err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.'
    
    // Effacer le message après 5 secondes
    setTimeout(() => {
      message.value = ''
    }, 5000)
  }
  
  loading.value = false
}

// Charger les données sauvegardées au montage
const loadSavedData = () => {
  const savedRememberMe = localStorage.getItem('rememberMe')
  if (savedRememberMe === 'true') {
    rememberMe.value = true
    const savedEmail = localStorage.getItem('userEmail')
    if (savedEmail) {
      email.value = savedEmail
    }
  }
}

const goToHome = () => {
  router.push('/')
}

// Charger les données au montage du composant
loadSavedData()
</script>

<style scoped>
:root {
  --primary-color: #1976d2;
  --primary-dark: #0d47a1;
  --primary-light: #42a5f5;
  --accent-color: #00bcd4;
  --accent-light: #4dd0e1;
  --secondary-color: #3f51b5;
  --error-bg: #ffe6e6;         /* Fond erreur clair */
  --error-color: #b00020;      /* Texte erreur plus foncé pour le contraste */
  --success-bg: #e6f4ea;
  --success-color: #1b5e20;
  --warning-color: #ff9800;
  --text-primary: #212121;
  --text-secondary: #546e7a;
  --text-light: #607d8b;
  --background: #eceff1;
  --surface: #ffffff;
  --surface-dark: #f8faff;
  --border-color: #b0bec5;
  --border-focus: #1976d2;
  --btn-bg: #1976d2;
  --btn-bg-hover: #1565c0;
  --btn-text: #fff;
  --input-bg: #fff;
  --input-error-bg: #ffe6e6;
  --input-error-border: #b00020;
  --input-placeholder: #607d8b;
}

/* Mode sombre contrasté */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #181c23;
    --surface: #22272e;
    --surface-dark: #171b20;
    --text-primary: #fff;
    --text-secondary: #b0bec5;
    --text-light: #90a4ae;
    --border-color: #49505a;
    --border-focus: #4dd0e1;
    --btn-bg: #2196f3;
    --btn-bg-hover: #1565c0;
    --btn-text: #fff;
    --error-bg: #2a1313;
    --error-color: #ff6371;
    --success-bg: #213528;
    --success-color: #69f0ae;
    --input-bg: #23272f;
    --input-error-bg: #341b1b;
    --input-error-border: #ff6371;
    --input-placeholder: #b0bec5;
  }
}

.login-container {
  background: transparent;
}


.login-background {
  position: fixed;  /* FIXED, pas absolute ! */
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw; height: 100vh;
  pointer-events: none;  /* Pour que ça ne bloque jamais les clics */
  z-index: 0;
  overflow: hidden;
}


.wave {
  position: absolute;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}
.wave1 {
  width: 300px; height: 300px; top: -150px; left: -150px;
  background: #675fff45;
}
.wave2 {
  width: 400px; height: 400px; top: 50%; right: -200px;
  background: rgba(4, 110, 134, 0.313);
  animation-delay: 2s;
}
.wave3 {
  width: 200px; height: 200px; bottom: -100px; left: 50%;
  background: rgba(77, 208, 225, 0.17);
  animation-delay: 4s;
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
  50% { transform: translateY(-25px) rotate(180deg); opacity: 0.4; }
}

.login-card {
  background: var(--surface);
  border-radius: 24px;
  padding: 44px;
  width: 100%;
  max-width: 420px;
  box-shadow:
    0 20px 40px rgba(25, 118, 210, 0.17),
    0 8px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 1;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

/* En-tête */
.login-header {
  text-align: center;
  margin-bottom: 40px;
}
.logo {
  display: inline-flex; 
  align-items: center; 
  justify-content: center;
  width: 84px; 
  height: 84px;
  background: var(--accent-color);
  border-radius: 50%;
  margin-bottom: 22px;
  box-shadow: 0 8px 20px #675fff45;
  position: relative;
  overflow: hidden; /* Pour éviter que l'image dépasse du cercle */
}

.logo-image {
  width: 100px; /* Ajustez selon votre logo */
  height: 100px; /* Ajustez selon votre logo */
  object-fit: contain; /* Garde les proportions */
  /* Ou utilisez filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); pour une ombre */
}

.logo i { font-size: 2.6rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.15);}
.login-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #00bcd4, #1976d2);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.login-header p { color: var(--text-secondary); font-size: 1.08rem; font-weight: 500; margin: 0;}

/* Formulaire */
.login-form { margin-bottom: 30px; }
.form-group { margin-bottom: 22px; }
.input-container { position: relative; display: flex; align-items: center; }
.input-icon {
  position: absolute; left: 18px; color: var(--accent-color);
  font-size: 1.2rem; z-index: 2;
}
.form-input {
  width: 100%; padding: 16px 16px 16px 48px;
  border: 2px solid var(--border-color);
  border-radius: 14px;
  font-size: 1.08rem;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05) inset;
  box-sizing: border-box;
}
.form-input::placeholder { color: var(--input-placeholder); font-weight: 400; }
.form-input:focus {
  outline: none;
  border-color: var(--border-focus);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.11);
}
.form-input.input-error {
  border-color: var(--input-error-border);
  background: var(--input-error-bg);
  color: var(--error-color);
}

.password-toggle {
  position: absolute; right: 18px; background: transparent;
  border: none; color: var(--text-secondary);
  cursor: pointer; padding: 7px;
  border-radius: 7px; transition: color 0.2s;
}
.password-toggle:hover { color: var(--accent-color); background: #e3f2fd; }

.error-message {
  display: flex; align-items: center;
  margin-top: 8px; padding: 8px 13px;
  background: var(--error-bg);
  border-left: 4px solid var(--input-error-border);
  border-radius: 5px;
  color: var(--error-color);
  font-size: 0.96rem; font-weight: 500;
}
.error-message i { margin-right: 7px; font-size: 1rem; }

/* Options du formulaire */
.form-options {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 28px; font-size: 0.97rem;
}
.remember-me { display: flex; align-items: center; cursor: pointer; color: var(--text-secondary); font-weight: 500; }
.remember-me input { display: none; }
.checkmark {
  position: relative; width: 19px; height: 19px;
  border: 2px solid var(--border-color); border-radius: 6px;
  margin-right: 9px; background: var(--surface);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05) inset;
  transition: border-color 0.2s, background 0.2s;
}
.remember-me input:checked + .checkmark {
  background: var(--accent-color);
  border-color: var(--accent-color);
  box-shadow: 0 1px 3px rgba(0,188,212,0.13) inset;
}
.remember-me input:checked + .checkmark::after {
  content: '✓';
  position: absolute; top: 0; left: 4px; color: #fff;
  font-size: 13px; font-weight: bold;
}
.forgot-password {
  color: var(--primary-color); text-decoration: none; font-weight: 600;
  transition: color 0.2s, background 0.2s;
  padding: 3px 7px; border-radius: 6px;
}
.forgot-password:hover {
  color: var(--primary-dark);
  background: #e3f2fd;
  text-decoration: underline;
}

/* Bouton de connexion */
.login-button {
  width: 100%; padding: 16px;
  background: var(--btn-bg); color: var(--btn-text);
  border: none; border-radius: 13px;
  font-size: 1.13rem; font-weight: 600;
  cursor: pointer; transition: background 0.2s, box-shadow 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 11px;
  box-shadow: 0 6px 18px rgba(25, 118, 210, 0.19);
  position: relative; overflow: hidden;
}
.login-button:hover:not(:disabled) {
  background: var(--btn-bg-hover);
  box-shadow: 0 10px 28px rgba(25, 118, 210, 0.28);
}
.login-button:disabled {
  background: #b0bec5;
  color: #fff;
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner */
.button-spinner {
  width: 22px; height: 22px;
  border: 3px solid rgba(255,255,255,0.28);
  border-left-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Messages de statut */
.status-message {
  padding: 14px 17px;
  border-radius: 11px;
  margin-top: 23px;
  display: flex; align-items: center; gap: 10px;
  font-size: 0.97rem; font-weight: 500;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}
.status-message.success {
  background: var(--success-bg);
  color: var(--success-color);
  border-left: 4px solid var(--success-color);
}
.status-message.error {
  background: var(--error-bg);
  color: var(--error-color);
  border-left: 4px solid var(--input-error-border);
}

/* Animations */
.message-enter-active { transition: all 0.4s; }
.message-leave-active { transition: all 0.3s; }
.message-enter-from { opacity: 0; transform: translateY(-14px) scale(0.96);}
.message-leave-to { opacity: 0; transform: translateY(8px) scale(0.96);}

/* Footer */
.login-footer {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.97rem;
  padding: 19px 0 0 0;
  border-top: 1px solid #cfd8dc;
}
.register-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s, background 0.2s;
  padding: 3px 7px; border-radius: 6px;
}
.register-link:hover {
  color: var(--primary-dark);
  background: #e3f2fd;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 480px) {
  .login-card { margin: 14px; padding: 30px 13px; border-radius: 17px; }
  .login-header h1 { font-size: 1.65rem; }
  .logo { width: 62px; height: 62px; }
  .logo i { font-size: 2rem; }
  .form-options { flex-direction: column; gap: 13px; align-items: flex-start;}
  .form-input { padding: 13px 13px 13px 40px; font-size: 0.99rem;}
  .login-button { padding: 13px; font-size: 1rem;}
}

@media (prefers-reduced-motion: reduce) {
  .wave, .button-spinner { animation: none; }
  .login-button:hover:not(:disabled) { transform: none; }
  .form-input:focus { transform: none; }
}
</style>
