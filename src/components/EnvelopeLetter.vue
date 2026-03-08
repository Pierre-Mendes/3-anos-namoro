<template>
  <div class="envelope-wrapper">
    <div class="hint">Toque no envelope para abrir a cartinha ✨</div>

    <button class="envelope" type="button" @click="toggleOpen">
      <div class="envelope-back"></div>

      <div class="envelope-flap" :class="{ open: isOpen }"></div>

      <div class="heart-seal">💌</div>
    </button>

    <!-- Corações -->
    <div v-if="showHearts" class="hearts">
      <span v-for="n in 12" :key="n">💜</span>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-letter" @click.stop>

        <button class="close-btn" @click="closeModal">
          Fechar 💜
        </button>

        <p class="modal-text">
          {{ visibleText }}
        </p>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

interface Props {
  text: string
}

const props = defineProps<Props>()

const isOpen = ref(false)
const showModal = ref(false)
const showHearts = ref(false)

const visibleText = ref('')

let typingInterval: number | null = null

const startTyping = () => {
  if (typingInterval !== null) {
    window.clearInterval(typingInterval)
  }

  visibleText.value = ''

  let index = 0

  typingInterval = window.setInterval(() => {

    if (index >= props.text.length) {
      window.clearInterval(typingInterval!)
      return
    }

    visibleText.value += props.text[index]
    index++

  }, 35)
}

const toggleOpen = () => {
  if (isOpen.value) return

  isOpen.value = true
  showHearts.value = true

  setTimeout(() => {
    showModal.value = true
  }, 700)

  setTimeout(() => {
    showHearts.value = false
  }, 2000)
}

const closeModal = () => {
  showModal.value = false
  isOpen.value = false
}

watch(isOpen, (open) => {
  if (open) {
    startTyping()
  }
})

onBeforeUnmount(() => {
  if (typingInterval !== null) {
    window.clearInterval(typingInterval)
  }
})
</script>

<style scoped>
.envelope-wrapper {
  margin-top: 1.2rem;
  text-align: center;
  position: relative;
}

.hint {
  font-size: 0.85rem;
  color: #7c3356;
  margin-bottom: 0.5rem;
}

/* ENVELOPE */

.envelope {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 180px;
  margin: 0 auto;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s;
}

.envelope:hover {
  transform: scale(1.05);
}

.envelope-back {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ffe5ec, #ffd1dc);
  border-radius: 0.75rem;
  box-shadow: 0 18px 40px rgba(179, 24, 92, 0.28);
}

/* TAMPA */

.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(135deg, #ff8fab, #ff4d6d);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transform: rotateX(0deg);
  transition: transform 0.7s ease;
}

.envelope-flap.open {
  transform: rotateX(-160deg);
}

/* SELO */

.heart-seal {
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  font-size: 1.4rem;
  text-shadow: 0 0 10px rgba(255, 77, 109, 0.7);
}

/* CORAÇÕES */

.hearts {
  position: absolute;
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
  pointer-events: none;
}

.hearts span {
  position: absolute;
  font-size: 18px;
  animation: floatHeart 2s ease-out forwards;
}

.hearts span:nth-child(1) {
  left: -60px;
  animation-delay: 0s
}

.hearts span:nth-child(2) {
  left: -40px;
  animation-delay: .2s
}

.hearts span:nth-child(3) {
  left: -20px;
  animation-delay: .4s
}

.hearts span:nth-child(4) {
  left: 0px;
  animation-delay: .1s
}

.hearts span:nth-child(5) {
  left: 20px;
  animation-delay: .3s
}

.hearts span:nth-child(6) {
  left: 40px;
  animation-delay: .5s
}

.hearts span:nth-child(7) {
  left: 60px;
  animation-delay: .2s
}

.hearts span:nth-child(8) {
  left: -10px;
  animation-delay: .6s
}

.hearts span:nth-child(9) {
  left: 10px;
  animation-delay: .7s
}

.hearts span:nth-child(10) {
  left: -30px;
  animation-delay: .5s
}

.hearts span:nth-child(11) {
  left: 30px;
  animation-delay: .4s
}

.hearts span:nth-child(12) {
  left: 50px;
  animation-delay: .6s
}

@keyframes floatHeart {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 1;
  }

  100% {
    transform: translateY(-120px) scale(1.2);
    opacity: 0;
  }
}

/* MODAL */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

/* CARTA */

.modal-letter {
  background: #fffafc;
  width: 100%;
  max-width: 420px;
  max-height: 80vh;
  border-radius: 16px;
  padding: 2rem 1.5rem 1.5rem;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: letterAppear .35s ease;
  position: relative;
}

.modal-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #4a1430;
  white-space: pre-line;
}

/* BOTÃO FECHAR */

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff8fab;
  border: none;
  color: white;
  font-size: 0.8rem;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.close-btn:hover {
  background: #ff4d6d;
}

/* SCROLL */

.modal-letter::-webkit-scrollbar {
  width: 6px;
}

.modal-letter::-webkit-scrollbar-thumb {
  background: #ff8fab;
  border-radius: 10px;
}

/* ANIMAÇÃO */

@keyframes letterAppear {
  from {
    transform: scale(.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>