<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Login from './views/Login.vue'

const isLoggedIn = ref(false)
const devices = ref([])

const handleLoginSuccess = () => {
  isLoggedIn.value = true
  loadDevices()
}

async function loadDevices() {
  const res = await axios.get('http://localhost:3001/api/devices')
  devices.value = res.data.$values || res.data
}

onMounted(() => {
  // Optionnel : vérifier si déjà connecté (ex : token en localStorage)
})
</script>

<template>
  <div style="max-width:900px;margin:auto;">
    <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <template v-else>
      <h1 style="text-align:center; color:#1565c0;">Liste des appareils</h1>
      <div v-if="devices.length === 0" style="text-align:center; color:#1565c0;">Aucun appareil trouvé.</div>
      <div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">
        <div
          v-for="device in devices"
          :key="device.id"
          class="card"
          style="width:320px;margin-bottom:20px;"
        >
          <h2>{{ device.nom }}</h2>
          <p><strong>Description :</strong> {{ device.description }}</p>
          <p><strong>Date d'installation :</strong> {{ new Date(device.dateInstallation).toLocaleString('fr-FR') }}</p>
          <p><strong>Localisation :</strong> {{ device.localisation?.description || 'Non renseignée' }}</p>
          <p><strong>ID :</strong> {{ device.id }}</p>
          <p><strong>ID Localisation :</strong> {{ device.localisationId }}</p>
          <div v-if="device.localisation">
            <p><strong>Détails localisation :</strong></p>
            <ul>
              <li><strong>ID :</strong> {{ device.localisation.id }}</li>
              <li><strong>Description :</strong> {{ device.localisation.description }}</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>