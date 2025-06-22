<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_CONFIG, API_ENDPOINTS } from './config/api.js'

import { useRouter } from 'vue-router'
const router = useRouter()


//import Login from './views/Login.vue'

//const isLoggedIn = ref(false)
const devices = ref([])
const selectedDevice = ref(null)

const handleLoginSuccess = () => {
  isLoggedIn.value = true
  loadDevices()
}

/*
async function loadDevices() {
  const email = localStorage.getItem('userEmail')
  if (!email) return
  const res = await axios.get(`${API_CONFIG.BASE_URL}/api/devices/user/${encodeURIComponent(email)}`)
  devices.value = res.data.$values || res.data
}
*/


async function loadDevices() {
  const res = await axios.get(API_ENDPOINTS.DEVICES)
  devices.value = res.data.$values || res.data
}

function logout() {
  localStorage.removeItem('userEmail')
  // Si tu stockes un token, retire-le aussi ici
  router.push('/login')
}

onMounted(() => {
  loadDevices()
  // Optionnel : vérifier si déjà connecté (ex : token en localStorage)
})

function showDeviceDetails(device) {
  selectedDevice.value = device
}

function closeDetails() {
  selectedDevice.value = null
}

</script>

<template>
  <router-view />
</template>
<!--
<template>
  <div style="max-width:900px;margin:auto;">
    <h1 style="text-align:center; color:#1565c0;">Liste des appareils</h1>
    <div v-if="devices.length === 0" style="text-align:center; color:#1565c0;">Aucun appareil trouvé.</div>
    <div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">
      <div
        v-for="device in devices"
        :key="device.id"
        class="card"
        style="width:320px;margin-bottom:20px;cursor:pointer;"
        @click="showDeviceDetails(device)"
      >
        <h2>{{ device.nom }}</h2>
        <p><strong>Description :</strong> {{ device.description }}</p>
        <p><strong>Date d'installation :</strong> {{ new Date(device.dateInstallation).toLocaleString('fr-FR') }}</p>
        <p><strong>Localisation :</strong> {{ device.localisation?.description || 'Non renseignée' }}</p>
      </div>
    </div>
-->

  <!-- Détails de l'appareil sélectionné -->
     
<!--  
    <div v-if="selectedDevice" class="card" style="max-width:500px;margin:40px auto;">
      <button @click="closeDetails" style="float:right;">Fermer</button>
      <h2>Détails de l'appareil</h2>
      <p><strong>Nom :</strong> {{ selectedDevice.nom }}</p>
      <p><strong>Description :</strong> {{ selectedDevice.description }}</p>
      <p><strong>Date d'installation :</strong> {{ new Date(selectedDevice.dateInstallation).toLocaleString('fr-FR') }}</p>
      <p><strong>Localisation :</strong> {{ selectedDevice.localisation?.description || 'Non renseignée' }}</p>
      <p><strong>ID :</strong> {{ selectedDevice.id }}</p>
      <p><strong>ID Localisation :</strong> {{ selectedDevice.localisationId }}</p>
      <div v-if="selectedDevice.localisation">
        <p><strong>Détails localisation :</strong></p>
        <ul>
          <li><strong>ID :</strong> {{ selectedDevice.localisation.id }}</li>
          <li><strong>Description :</strong> {{ selectedDevice.localisation.description }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
-->

<!--
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

-->