<template>
  <div>
    <h2>Connexion</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Mot de passe" type="password" />
    <button @click="login">Se connecter</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3001/api/login', {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
  } catch (err) {
    error.value = "Login invalide"
  }
}
</script>
