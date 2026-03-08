<template>
  <section class="view">
    <header class="header">
      <button class="back-btn" type="button" @click="goHome">
        ←
      </button>
      <div class="header-text">
        <p class="eyebrow">Dia de desafio</p>
        <h2>Vamos testar a nossa memória?</h2>
      </div>
    </header>

    <p class="hint">
      Lembre com carinho dos nossos momentos. Cada acerto revela uma palavra da frase secreta.
    </p>

    <ChallengeCard
      v-if="todayChallenge"
      :challenge="todayChallenge"
      :is-available="isTodayAvailable"
      @correct="onCorrect"
    />

    <p v-else class="no-challenge">
      Os desafios começam no dia
      <strong>08/03/2026</strong>. Prometo que a espera vai valer a pena. 💖
    </p>

    <transition name="fade-up">
      <div v-if="discoveredWords.length" class="words-card">
        <p class="label">Palavras já descobertas</p>
        <p class="words">
          <span v-for="word in discoveredWords" :key="word" class="word">
            {{ word }}
          </span>
        </p>
        <p class="tip">Guarde essas palavras. Elas serão importantes no final.</p>
      </div>
    </transition>

    <button v-if="canOpenFinal" class="final-btn" type="button" @click="goToFinal">
      Revelar frase secreta 💜
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ChallengeCard from '../components/ChallengeCard.vue';
import { challenges } from '../data/challenges';

const DEV_MODE = import.meta.env.DEV || new URLSearchParams(window.location.search).get('dev') === 'true'

const router = useRouter();
const discoveredWords = ref<string[]>([]);

const todayKey = computed(() => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
});

const todayChallenge = computed(() => {
  if (DEV_MODE) {
    return challenges.find(c => c.dateKey === todayKey.value) || challenges[0]
  }

  return challenges.find((c) => c.dateKey === todayKey.value)
})

const isTodayAvailable = computed(() => {
  if (DEV_MODE) return true

  if (!todayChallenge.value) return false

  const now = new Date()
  const challengeDate = new Date(todayChallenge.value.dateKey + 'T00:00:00')

  return now.getTime() >= challengeDate.getTime()
})

const onCorrect = (word: string) => {
  if (!discoveredWords.value.includes(word)) {
    discoveredWords.value.push(word);
    localStorage.setItem('nosso-amor-words', JSON.stringify(discoveredWords.value));
  }
};

const goHome = () => {
  router.push({ name: 'home' });
};

const goToFinal = () => {
  router.push({ name: 'final' });
};

const canOpenFinal = computed(() => {
  if (DEV) return true

  return discoveredWords.value.length === challenges.length
})

onMounted(() => {
  const saved = localStorage.getItem('nosso-amor-words');
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as string[];
      discoveredWords.value = parsed;
    } catch {
      discoveredWords.value = [];
    }
  }
});
</script>

<style scoped>
.view {
  text-align: left;
}

.header {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}

.back-btn {
  border-radius: 999px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 22px rgba(178, 24, 92, 0.3);
  font-size: 1.1rem;
  cursor: pointer;
}

.eyebrow {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c75b8a;
}

h2 {
  margin: 0.1rem 0 0;
  font-size: 1.3rem;
  color: #b2185c;
}

.hint {
  margin: 0 0 0.9rem;
  font-size: 0.88rem;
  color: #7c3356;
}

.no-challenge {
  margin-top: 1rem;
  font-size: 0.92rem;
  color: #7c3356;
}

.words-card {
  margin-top: 1.1rem;
  padding: 0.8rem 0.9rem;
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 14px 30px rgba(178, 24, 92, 0.3);
}

.label {
  margin: 0 0 0.4rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #c75b8a;
}

.words {
  margin: 0 0 0.3rem;
}

.word {
  display: inline-block;
  margin-right: 0.35rem;
  margin-bottom: 0.2rem;
  padding: 0.24rem 0.6rem;
  border-radius: 999px;
  background: #ffe5ec;
  font-size: 0.85rem;
  font-weight: 600;
  color: #b2185c;
}

.tip {
  margin: 0;
  font-size: 0.78rem;
  color: #7c3356;
}

.final-btn {
  width: 100%;
  margin-top: 1.2rem;
  border-radius: 999px;
  border: none;
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #c9184a, #ff4d6d);
  color: #fff;
  font-size: 0.96rem;
  font-weight: 600;
  box-shadow: 0 16px 36px rgba(201, 24, 74, 0.65);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.final-btn:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 10px 24px rgba(201, 24, 74, 0.6);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

