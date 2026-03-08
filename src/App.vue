<template>
  <div class="app-root">
    <FloatingHearts />
    <NotificationManager />

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import FloatingHearts from './components/FloatingHearts.vue'
import NotificationManager from './components/NotificationManager.vue'

import { onMounted } from "vue"
import { requestNotificationPermission } from "./utils/notifications"
import { useSpecialNotifications } from "./composables/useSpecialNotifications"

onMounted(async () => {
  await requestNotificationPermission()
  useSpecialNotifications()
})
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  background: radial-gradient(circle at top, #ffb3c6 0, #ffe5ec 40%, #fff 100%);
  color: #4a1430;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow-x: hidden;
}

.app-main {
  position: relative;
  z-index: 1;
  padding: 1.5rem 1rem 3.5rem;
  max-width: 480px;
  margin: 0 auto;
}
</style>