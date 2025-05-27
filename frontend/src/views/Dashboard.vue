<template>
  <div>
    <h2>Dashboard</h2>
    

    <pre>{{ JSON.stringify(devicesData, null, 2) }}</pre>

    <div v-for="device in devicesData" :key="device.deviceId" class="device-chart card">
      <h3>{{ device.nom }}</h3>
      <DeviceChart :data="getChartData(device.measurements)" />
      <h4>Total mesures : {{ device.measurements.length }}</h4>
    </div>
    <!--
    <div v-for="device in devicesData" :key="device.deviceId">
      <h3>{{ device.nom }}</h3>
      <ul>
        <li v-for="m in device.measurements" :key="m.id">
          {{ m.timestamp }} - Temp: {{ m.temperature }}°C, pH: {{ m.ph }}, Turbidité: {{ m.turbidity }}
        </li>
      </ul>
    </div>
    -->

    <!--
    <DeviceChart
      v-for="device in devicesData"
      :key="device.deviceId"
      :device="device"
    />
    -->


    <!--
    <div v-for="device in devicesData" :key="device.deviceId" class="device-chart">
      <h3>{{ device.nom }}</h3>
      <DeviceChart :measurements="device.measurements" />
    </div>
    -->

    <!--
    <div v-for="device in devicesData" :key="device.deviceId" class="device-chart card">
      <h3>{{ device.nom }}</h3>
      <DeviceChart :measurements="device.measurements" />
      <h4>Total mesures : {{ device.measurements.length }}</h4>
    </div>
    -->


    <!--
    
    <button @click="logout" style="position:absolute;top:20px;right:20px;">
      Déconnexion
    </button>

    <h3>Appareils liés à l'utilisateur</h3>
    
    <h3>Liste de tous les appareils</h3>
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
      </div>
    </div>
    -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import DeviceCard from '../components/DeviceCard.vue'
import DeviceChart from '../components/DeviceChart.vue'

const router = useRouter()
const devicesData = ref([])

function logout() {
  localStorage.removeItem('userEmail')
  router.push('/login')
}

function getChartData(measurements) {
  if (!measurements || !measurements.length) {
    return {
      labels: [],
      datasets: []
    }
  }
  return {
    labels: measurements.map(m => new Date(m.timestamp).toLocaleString('fr-FR')),
    datasets: [
      {
        label: 'Température (°C)',
        data: measurements.map(m => m.temperature),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'pH',
        data: measurements.map(m => m.ph),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Turbidité',
        data: measurements.map(m => m.turbidity),
        borderColor: 'green',
        fill: false,
      }
    ]
  }
}

onMounted(async () => {
  if (!localStorage.getItem('userEmail')) {
    router.push('/login')
    return
  }

  try {
    // On récupère les devices ET les mesures
    const [resDevices, resMeasures] = await Promise.all([
      axios.get('http://localhost:3001/api/devices'),
      axios.get('http://ssssirhcwan.ddns.net:40000/measurements')
    ])
    
    const devicesList = resDevices.data?.$values || resDevices.data || []
    const measurements = resMeasures.data?.$values || resMeasures.data || []

    console.log('Mesures:', measurements)

    // On prépare la liste des devices avec un tableau vide de mesures
    const result = devicesList.map(device => ({
      deviceId: device.id,
      nom: device.nom,
      description: device.description,
      dateInstallation: device.dateInstallation,
      localisation: device.localisation?.description || 'Non renseignée',
      measurements: []
    }))

    for (const d of result) {
      console.log(d.nom, d.measurements.length)
    }

    // On associe chaque mesure à son device par le nom (clé la plus fiable ici)
    for (const m of measurements) {
      const deviceNom = m.device?.nom
      if (!deviceNom) continue
      const device = result.find(d => d.nom === deviceNom)
      if (!device) continue
      device.measurements.push({
        id: m.id,
        timestamp: m.timestamp,
        temperature: m.temperature,
        ph: m.ph,
        turbidity: m.turbidity
      })
    }

    devicesData.value = result
  } catch (error) {
    console.error('Erreur récupération mesures:', error)
  }
})
</script>