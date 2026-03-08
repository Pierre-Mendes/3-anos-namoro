<template>
  <section class="card">
    <header class="card-header">
      <h2 class="title">Desafio do dia</h2>
      <p class="date-label">{{ formattedDate }}</p>
    </header>

    <p class="question">
      {{ challenge.question }}
    </p>

    <p v-if="!isAvailable" class="locked">
      Esse desafio só será liberado no dia
      <strong>{{ formattedDate }}</strong>. ✨ Volte mais tarde, meu amor. Eu te amo 💜💜💜
    </p>

    <div v-else class="options">
      <button v-for="option in challenge.options" :key="option" class="option-btn" type="button"
        :disabled="selectedAnswer !== null" @click="selectOption(option)">
        <span>{{ option }}</span>
      </button>
    </div>

    <!-- ERRO -->
    <div v-if="selectedAnswer && !isCorrect" class="feedback wrong">
      <p>Quase... tenta lembrar com carinho dessa memória. 💭</p>

      <button class="retry-btn" @click="resetAnswer">
        Tentar novamente 💜
      </button>
    </div>

    <!-- ACERTO -->
    <transition name="fade-up">
      <div v-if="isCorrect" class="feedback correct">
        <p>Você acertou! 💜</p>

        <p class="password">
          Palavra secreta de hoje:
          <strong>{{ challenge.passwordWord }}</strong>
        </p>

        <button class="next-btn" @click="$emit('next')">
          Próximo desafio →
        </button>
      </div>
    </transition>

    <transition name="fade-up">
      <EnvelopeLetter v-if="isCorrect" :text="challenge.letter" />
    </transition>

    <HeartExplosion :active="showExplosion" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Challenge } from '../data/challenges'
import HeartExplosion from './HeartExplosion.vue'
import EnvelopeLetter from './EnvelopeLetter.vue'

interface Props {
  challenge: Challenge
  isAvailable: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'correct', word: string): void
  (e: 'next'): void
}>()

const selectedAnswer = ref<string | null>(null)
const isCorrect = ref(false)
const showExplosion = ref(false)

watch(
  () => props.challenge,
  () => {
    selectedAnswer.value = null
    isCorrect.value = false
    showExplosion.value = false
  }
)

const formattedDate = computed(() => {
  const [year, month, day] = props.challenge.dateKey.split('-').map(Number)

  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  })
})

const selectOption = (option: string) => {
  if (selectedAnswer.value !== null) return

  selectedAnswer.value = option

  const correct = option === props.challenge.correctAnswer
  isCorrect.value = correct

  if (correct) {
    showExplosion.value = true
    emit('correct', props.challenge.passwordWord)
  }
}

const resetAnswer = () => {
  selectedAnswer.value = null
  isCorrect.value = false
}

watch(showExplosion, (val) => {
  if (val) {
    window.setTimeout(() => {
      showExplosion.value = false
    }, 950)
  }
})
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.4rem;
  padding: 1.3rem 1.1rem 1.6rem;
  box-shadow: 0 18px 50px rgba(178, 24, 92, 0.35);
}

.card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.title {
  margin: 0;
  font-size: 1.15rem;
  color: #b2185c;
}

.date-label {
  margin: 0;
  font-size: 0.8rem;
  color: #c75b8a;
}

.question {
  margin: 0.7rem 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #4a1430;
}

.options {
  display: grid;
  gap: 0.6rem;
}

.option-btn {
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 0.7rem 1rem;
  background: #fff0f5;
  color: #4a1430;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 10px 24px rgba(255, 143, 171, 0.4);
  cursor: pointer;
}

.option-btn:disabled {
  opacity: 0.8;
  cursor: default;
}

.feedback {
  margin-top: 0.8rem;
  font-size: 0.9rem;
}

.feedback.wrong {
  color: #b2185c;
}

.retry-btn {
  margin-top: 0.5rem;
  border: none;
  background: #ff8fab;
  color: white;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  cursor: pointer;
}

.retry-btn:hover {
  background: #ff4d6d;
}

.feedback.correct {
  background: linear-gradient(135deg, #ffe5ec, #fff0f5);
  border-radius: 1rem;
  padding: 0.6rem 0.7rem;
  color: #4a1430;
}

.password {
  margin: 0.1rem 0 0;
}

.locked {
  margin-top: 0.6rem;
  font-size: 0.9rem;
  color: #7c3356;
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
.next-btn {
  margin-top: 8px;
  border: none;
  background: #ff4d6d;
  color: white;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
}
</style>