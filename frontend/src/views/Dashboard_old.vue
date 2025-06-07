<template>
  <div>
    <h2>Dashboard</h2>

    <pre>{{ JSON.stringify(devicesData, null, 2) }}</pre>

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


    <div v-for="device in devicesData" :key="device.deviceId" class="device-chart card">
      <h3>{{ device.nom }}</h3>
      <DeviceChart :measurements="device.measurements" />
      <h4>Total mesures : {{ device.measurements.length }}</h4>
    </div>
    
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
  const devices = ref([])


  /*
  //Mesurements :
  const res = await axios.get('http://ssssirhcwan.ddns.net:42000/api/measurements')
  const measurements = res.data?.$values || []
  const devicesMap = new Map()

  for (const m of measurements) {
    const device = m.device
    if (!device || !device.id) continue

    if (!devicesMap.has(device.id)) {
      devicesMap.set(device.id, {
        deviceId: device.id,
        nom: device.nom,
        measurements: []
      })
    }

    // On ajoute la mesure
    devicesMap.get(device.id).measurements.push({
      timestamp: m.timestamp,
      temperature: m.temperature,
      ph: m.ph,
      turbidity: m.turbidity
    })
  }

  // Convertir la Map en tableau
  const devicesData = Array.from(devicesMap.values())

  // (Optionnel) trier les mesures par date
  for (const d of devicesData) {
    d.measurements.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  }
*/


  //Reste du code

  function logout() {
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  
  const devicesData = ref([])
  
  onMounted(async () => {
    if (!localStorage.getItem('userEmail')) {
      router.push('/login')
      return
    }

    try {
      // Appels parallèles
      const [resDevices, resMeasures] = await Promise.all([
        axios.get('http://ssssirhcwan.ddns.net:42000/api/devices'),
        axios.get('http://ssssirhcwan.ddns.net:40000/measurements')
      ])
      
      const devicesList = resDevices.data?.$values || resDevices.data || []
      const measurements = resMeasures.data?.$values || resMeasures.data || []

      console.log('measurements', measurements)

      const devicesMap = new Map()
       for (const device of devicesList) {
        devicesMap.set(device.id, {
          deviceId: device.id,
          nom: device.nom,
          description: device.description,
          dateInstallation: device.dateInstallation,
          localisation: device.localisation?.description || 'Non renseignée',
          measurements: []
        })
      }


      // 2. Associer toutes les mesures au bon device
      for (const m of measurements) {
        let deviceId = m.device?.id ?? m.deviceId ?? m.device_id
        //if (!deviceId) continue
        //const device = m.device

        if (!deviceId) continue
        if (!devicesMap.has(deviceId)) continue

        /*
        if (!m.device || !m.device.id) {
          console.warn('Impossible de trouver l\'id du device pour la mesure:', m)
          continue;
        }
        if (!devicesMap.has(deviceId)) {
          console.warn('Device non trouvé dans devicesMap pour id:', deviceId, m);
          continue;
        }
        */
        //if (!device || !device.id) continue
        //if (!devicesMap.has(device.id)) continue

        devicesMap.get(device.id).measurements.push({
          timestamp: m.timestamp,
          temperature: m.temperature,
          ph: m.ph,
          turbidity: m.turbidity
        })
      }

      /*
      for (const m of measurements) {
        const device = m.device
        if (!device || !device.id) continue

        if (!devicesMap.has(device.id)) {
          devicesMap.set(device.id, {
            deviceId: device.id,
            nom: device.nom,
            measurements: []
          })
        }
        devicesMap.get(device.id).measurements.push({
          timestamp: m.timestamp,
          temperature: m.temperature,
          ph: m.ph,
          turbidity: m.turbidity
        })
      }
      */

      

      // 3. Générer la liste finale
      const list = Array.from(devicesMap.values())
      for (const d of list) {
        d.measurements.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      }
      devicesData.value = list


      /*
      // Trier mesures
      for (const d of devicesMap.values()) {
        d.measurements.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      }

      devicesData.value = Array.from(devicesMap.values())
        */      
    } catch (error) {
      console.error('Erreur récupération mesures:', error)
    }


    

    /*
    const res = await axios.get('http://ssssirhcwan.ddns.net:42000/api/devices')
    devices.value = res.data.$values || res.data
    */


    /*
    // Récupération des devices simples
    const resDevices = await axios.get('http://ssssirhcwan.ddns.net:42000/api/devices')
    devices.value = resDevices.data.$values || resDevices.data

    // Récupération des mesures
    //const resMeasures = await axios.get('http://ssssirhcwan.ddns.net:42000/api/measurements')
    const resMeasures = await axios.get('http://ssssirhcwan.ddns.net:40000/measurements')
    const measurements = resMeasures.data?.$values || []
    const devicesMap = new Map()

    for (const m of measurements) {
      const device = m.device
      if (!device || !device.id) continue

      if (!devicesMap.has(device.id)) {
        devicesMap.set(device.id, {
          deviceId: device.id,
          nom: device.nom,
          measurements: []
        })
      }

      devicesMap.get(device.id).measurements.push({
        timestamp: m.timestamp,
        temperature: m.temperature,
        ph: m.ph,
        turbidity: m.turbidity
      })
    }

    const list = Array.from(devicesMap.values())

    for (const d of list) {
      d.measurements.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    }

    devicesData.value = list
    */
  })
</script>
