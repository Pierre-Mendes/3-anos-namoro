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

    <!-- BOTÕES DOS DESAFIOS -->
    <div class="challenge-list">
      <button v-for="challenge in availableChallenges" :key="challenge.dateKey" class="challenge-btn" :class="{
        locked: !challenge.unlocked,
        active: challenge.index === currentChallengeIndex
      }" @click="openChallenge(challenge.index)">
        Dia {{ challenge.index + 1 }}
      </button>
    </div>

    <LoveTimeline :items="timelineItems" @select="openChallenge" />
    <ChallengeCard :key="selectedChallenge.dateKey" :challenge="selectedChallenge"
      :is-available="selectedChallenge.unlocked" @correct="onCorrect" @next="goNext" />

    <transition name="fade-up">
      <div v-if="discoveredWords.length" class="words-card">
        <p class="label">Palavras já descobertas</p>

        <p class="words">
          <span v-for="word in discoveredWords" :key="word" class="word">
            {{ word }}
          </span>
        </p>

        <p class="tip">
          Guarde essas palavras. Elas serão importantes no final.
        </p>
      </div>
    </transition>

    <button v-if="canOpenFinal" class="final-btn" type="button" @click="goToFinal">
      Revelar frase secreta 💜
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import ChallengeCard from "../components/ChallengeCard.vue"
import LoveTimeline from "../components/LoveTimeline.vue"
import { challenges } from "../data/challenges"

const router = useRouter()

const discoveredWords = ref<string[]>([])
const currentChallengeIndex = ref(0)

const goNext = () => {
  const next = currentChallengeIndex.value + 1

  if (next < challenges.length) {
    currentChallengeIndex.value = next
  }
}

const timelineItems = computed(() => {
  const now = new Date()

  return challenges.map((challenge, index) => {
    const challengeDate = new Date(challenge.dateKey + "T00:00:00")

    const unlocked = now >= challengeDate

    const done = discoveredWords.value.includes(
      challenge.passwordWord
    )

    return {
      ...challenge,
      index,
      unlocked,
      done
    }
  })
})

const availableChallenges = computed(() => {
  const now = new Date()

  return challenges.map((challenge, index) => {
    const challengeDate = new Date(challenge.dateKey + "T00:00:00")

    const dayUnlocked = now >= challengeDate

    const previousSolved =
      index === 0 ||
      discoveredWords.value.includes(challenges[index - 1].passwordWord)

    return {
      ...challenge,
      unlocked: dayUnlocked && previousSolved,
      index
    }
  })
})

const selectedChallenge = computed(() => {
  return availableChallenges.value[currentChallengeIndex.value]
})

const openChallenge = (index: number) => {
  const challenge = availableChallenges.value[index]

  if (!challenge.unlocked) return

  currentChallengeIndex.value = index
}

const canOpenFinal = computed(() => {
  return discoveredWords.value.length === challenges.length
})

const onCorrect = (word: string) => {
  if (!discoveredWords.value.includes(word)) {
    discoveredWords.value.push(word)

    localStorage.setItem(
      "nosso-amor-words",
      JSON.stringify(discoveredWords.value)
    )
  }
}

const goHome = () => {
  router.push({ name: "home" })
}

const goToFinal = () => {
  router.push({ name: "final" })
}

onMounted(() => {
  const saved = localStorage.getItem("nosso-amor-words")

  if (saved) {
    try {
      const parsed = JSON.parse(saved) as string[]

      discoveredWords.value = parsed
    } catch {
      discoveredWords.value = []
    }
  }
})
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

.challenge-list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 12px;
}

.challenge-btn {
  border: none;
  padding: 6px 12px;
  border-radius: 999px;
  background: #ffe5ec;
  font-size: 0.8rem;
  cursor: pointer;
}

.challenge-btn.active {
  background: #ff4d6d;
  color: white;
}

.challenge-btn.locked {
  opacity: 0.4;
  cursor: not-allowed;
}

.words-card {
  margin-top: 1.1rem;
  padding: 0.8rem 0.9rem;
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 14px 30px rgba(178, 24, 92, 0.3);
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
}
</style>