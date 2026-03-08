<template>
  <div v-if="permission === 'denied'" class="notice">
    <p>Você pode ativar as notificações do navegador nas configurações para receber os lembretes dos desafios. 💌</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

type Permission = NotificationPermission | 'unsupported';

const permission = ref<Permission>('default');

const DAILY_MESSAGES = [
  '💜 O desafio de hoje está esperando por você',
  '❤️ Não esqueça de descobrir a palavra secreta de hoje',
  '✨ Faltam poucos dias para desbloquear a surpresa'
];

const getNextEightPmDelay = () => {
  const now = new Date();
  const target = new Date();
  target.setHours(20, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return target.getTime() - now.getTime();
};

const scheduleDailyNotification = async () => {
  if (!('serviceWorker' in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.ready;
    const sendNotification = () => {
      const message = DAILY_MESSAGES[Math.floor(Math.random() * DAILY_MESSAGES.length)];
      registration.showNotification('Nosso Amor - Desafio de hoje', {
        body: message,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [80, 40, 80],
        tag: 'daily-challenge'
      });
    };

    const delay = getNextEightPmDelay();
    window.setTimeout(() => {
      sendNotification();
      const dayMs = 24 * 60 * 60 * 1000;
      window.setInterval(sendNotification, dayMs);
    }, delay);
  } catch (e) {
    console.error('Erro ao agendar notificações', e);
  }
};

onMounted(async () => {
  if (!('Notification' in window)) {
    permission.value = 'unsupported';
    return;
  }

  const askedBefore = localStorage.getItem('nosso-amor-notifications-asked');
  if (!askedBefore && Notification.permission === 'default') {
    const result = await Notification.requestPermission();
    permission.value = result;
    localStorage.setItem('nosso-amor-notifications-asked', 'true');
  } else {
    permission.value = Notification.permission;
  }

  if (permission.value === 'granted') {
    scheduleDailyNotification();
  }
});
</script>

<style scoped>
.notice {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0.4rem;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
}

.notice p {
  max-width: 420px;
  margin: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  font-size: 0.75rem;
  color: #7c3356;
  pointer-events: auto;
}
</style>

