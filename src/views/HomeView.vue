<template>
  <section class="home">
    <header class="hero">
      <p class="tag">Surpresa 2 em 1: Dia da Mulher & 3 anos de namoro💜</p>
      <h1>Desafio dos 3 anos 💜</h1>
      <p class="subtitle">
        Um jeitinho diferente (ou nem tanto) de reviver a nossa história, durante esses 3 anos. E te homenagear pelo dia da mulher.
      </p>
    </header>

    <CountdownTimer :target-date="ANNIVERSARY_DATE" />

    <p class="info-text">
      Todos os dias um novo desafio será liberado. Cada resposta certa revela uma palavra secreta e uma surpresa só
      sua. E se você acertar todas as palavras secretas, você ganhará a surpresa final.
    </p>

    <div class="actions">
      <button class="primary" type="button" @click="goToChallenge">
        Começar desafio do dia
      </button>
      <button class="secondary" type="button" @click="goToContract">
        📜 Liberar Contrato
      </button>
      <InstallApp />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import CountdownTimer from '../components/CountdownTimer.vue';
import InstallApp from '../components/InstallApp.vue';
import { ANNIVERSARY_DATE } from '../data/challenges';

const router = useRouter();

const goToChallenge = () => {
  const STORAGE_KEY = 'nosso-amor-install-alert-shown';

  if (!localStorage.getItem(STORAGE_KEY)) {
    alert(
      'Dica importante 💜\n\nAntes de começar, vale a pena instalar o app na tela inicial.\nAssim ele pode te mandar notificações lembrando dos desafios de cada dia.'
    );
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  router.push({ name: 'challenge' });
};

const goToContract = () => {
  router.push({ name: 'contrato' });
};
</script>

<style scoped>
.home {
  text-align: left;
}

.hero {
  margin-bottom: 1.2rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #b2185c;
  margin-bottom: 0.4rem;
}

h1 {
  margin: 0;
  font-size: 1.7rem;
  color: #b2185c;
}

.subtitle {
  margin: 0.4rem 0 0;
  font-size: 0.96rem;
  color: #5e2742;
}

.info-text {
  margin: 1rem 0 0.4rem;
  font-size: 0.9rem;
  color: #7c3356;
}

.actions {
  margin-top: 1.2rem;
}

.primary {
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, #ff4d6d, #ff8fab);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 18px 40px rgba(255, 77, 109, 0.7);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.primary:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 10px 26px rgba(255, 77, 109, 0.6);
}

.secondary {
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 0.85rem 1rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #a2d2ff, #bde0fe);
  color: #023e8a;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 18px 40px rgba(162, 210, 255, 0.7);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.secondary:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 10px 26px rgba(162, 210, 255, 0.6);
}
</style>

