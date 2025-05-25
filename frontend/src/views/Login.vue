<script setup>
import { ref } from 'vue'
import axios from 'axios'

import { defineEmits } from 'vue'
const emit = defineEmits(['login-success'])

const email = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  message.value = ''
  try {
    const res = await axios.post('http://localhost:3001/api/users', {
      email: email.value,
      password: password.value
    })
    message.value = 'Connexion réussie !'
    emit('login-success')
    // Ici tu peux stocker le token ou rediriger l’utilisateur
    // ex: localStorage.setItem('token', res.data.token)
  } catch (err) {
    message.value = err.response?.data?.message || 'Erreur de connexion'
  }
  loading.value = false
}
</script>

<template>
  <div class="form-module" style="max-width:400px;margin:40px auto;">
    <h2 style="text-align:center; color:#fff;">Connexion</h2>
    <form @submit.prevent="login">
      <div style="margin-bottom:15px;">
        <label style="color:#fff;">Email :</label>
        <input
          v-model="email"
          type="email"
          required
          style="width:100%;padding:8px;border-radius:5px;border:1px solid #1976d2;background:#1565c0;color:#fff;"
        >
      </div>
      <div style="margin-bottom:15px;">
        <label style="color:#fff;">Mot de passe :</label>
        <input
          v-model="password"
          type="password"
          required
          style="width:100%;padding:8px;border-radius:5px;border:1px solid #1976d2;background:#1565c0;color:#fff;"
        >
      </div>
      <button :disabled="loading">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>
    <div v-if="message" style="margin-top:15px;text-align:center;color:#fff;">{{ message }}</div>
  </div>
</template>