<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const devices = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/devices')
  devices.value = res.data.$values || res.data
})
</script>

<template>
  <div style="max-width:900px;margin:auto;">
    <h1 style="text-align:center; color:#1565c0;">Liste des appareils</h1>
    <div v-if="devices.length === 0" style="text-align:center; color:#1565c0;">Aucun appareil trouvé.</div>
    <div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">
      <div
        v-for="device in devices"
        :key="device.id"
        style="border:1px solid #1976d2;border-radius:10px;padding:20px;width:320px;box-shadow:0 2px 8px #1976d233;background:#fff;">
        <h2 style="margin-top:0; color:#1976d2;">{{ device.nom }}</h2>
        <p style="color:#1976d2;"><strong>Description :</strong> {{ device.description }}</p>
        <p style="color:#1976d2;"><strong>Date d'installation :</strong> {{ new Date(device.dateInstallation).toLocaleString('fr-FR') }}</p>
        <p style="color:#1976d2;"><strong>Localisation :</strong> {{ device.localisation?.description || 'Non renseignée' }}</p>
        <p style="color:#1976d2;"><strong>ID :</strong> {{ device.id }}</p>
        <p style="color:#1976d2;"><strong>ID Localisation :</strong> {{ device.localisationId }}</p>
        <div v-if="device.localisation">
          <p style="color:#1976d2;"><strong>Détails localisation :</strong></p>
          <ul>
            <li style="color:#1976d2;"><strong>ID :</strong> {{ device.localisation.id }}</li>
            <li style="color:#1976d2;"><strong>Description :</strong> {{ device.localisation.description }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>