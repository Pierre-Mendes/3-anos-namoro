import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// Registra o service worker apenas em build de produção,
// para não interferir no ambiente de desenvolvimento do Vite.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .catch((err) => console.error('SW registration failed', err));
  });
}

const app = createApp(App);
app.use(router);
app.mount('#app');

