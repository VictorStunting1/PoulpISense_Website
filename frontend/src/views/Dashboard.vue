<template>
  <div>
    <h2>Dashboard</h2>
    <div v-for="device in devices" :key="device.id">
      <DeviceCard :device="device" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import DeviceCard from '../components/DeviceCard.vue'

const devices = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/devices')
  devices.value = res.data
})
</script>
