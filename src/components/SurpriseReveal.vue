<template>
  <section class="reveal-section">
    <div class="gift-wrapper">
      <button class="gift-box" type="button" @click="openBox" :class="{ open: isOpen }">
        <div class="lid"></div>
        <div class="box-body"></div>
        <div class="ribbon-vert"></div>
        <div class="ribbon-horiz"></div>
        <div class="sparkles">
          <span v-for="i in 6" :key="i" class="sparkle"></span>
        </div>
      </button>
    </div>

    <transition name="fade-up">
      <div v-if="isOpen" class="content">
        <p class="headline">Agora a última surpresa...</p>
        <div class="card">
          <p class="line">Hoje (Quinta-feira) e amanhã Sexta-feira</p>
          <p class="line strong">19:00h</p>
          <p class="line">A Maria Eduarda (Madu) vai te levar a um lugar especial...</p>
          <p class="line soft">(apenas confie em mim ❤️)</p>
          <div class="divider"></div>
          <p class="line">Na sexta compartilhe sua localização comigo via WhatsApp. Chegando em casa tome banho, se arrume e se prepare!</p>
          <p class="line">Eu vou te buscar na Sexta!</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const openBox = () => {
  isOpen.value = true;
};
</script>

<style scoped>
.reveal-section {
  margin-top: 2rem;
}

.gift-wrapper {
  display: flex;
  justify-content: center;
}

.gift-box {
  position: relative;
  width: 140px;
  height: 120px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  animation: gentle-bounce 2.2s ease-in-out infinite;
}

.box-body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 75%;
  background: linear-gradient(135deg, #ff8fab, #ff4d6d);
  border-radius: 0.6rem;
  box-shadow: 0 16px 34px rgba(178, 24, 92, 0.6);
}

.lid {
  position: absolute;
  left: -6%;
  right: -6%;
  top: 4px;
  height: 32px;
  background: linear-gradient(135deg, #ffe5ec, #ffd1dc);
  border-radius: 0.7rem;
  box-shadow: 0 6px 12px rgba(178, 24, 92, 0.3);
  transform-origin: center left;
  transition: transform 0.6s ease, top 0.6s ease;
}

.ribbon-vert,
.ribbon-horiz {
  position: absolute;
  background: #ffe066;
}

.ribbon-vert {
  width: 16px;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.ribbon-horiz {
  height: 16px;
  left: 0;
  right: 0;
  top: 26px;
}

.sparkles {
  position: absolute;
  inset: -16px;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #fff;
  opacity: 0;
  animation: sparkle-pop 1.6s ease-out infinite;
}

.sparkle:nth-child(1) {
  top: 0;
  left: 18%;
}
.sparkle:nth-child(2) {
  top: 8%;
  right: 14%;
  animation-delay: 0.2s;
}
.sparkle:nth-child(3) {
  bottom: 18%;
  left: 12%;
  animation-delay: 0.4s;
}
.sparkle:nth-child(4) {
  bottom: 22%;
  right: 18%;
  animation-delay: 0.6s;
}
.sparkle:nth-child(5) {
  top: 40%;
  left: -4%;
  animation-delay: 0.8s;
}
.sparkle:nth-child(6) {
  top: 36%;
  right: -4%;
  animation-delay: 1s;
}

.gift-box.open {
  animation: none;
}

.gift-box.open .lid {
  transform: rotate(-24deg) translateY(-26px);
  top: -22px;
}

.content {
  margin-top: 1rem;
  text-align: center;
}

.headline {
  margin: 0 0 0.6rem;
  font-weight: 600;
  color: #b2185c;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.3rem;
  padding: 0.9rem 1.1rem;
  box-shadow: 0 16px 38px rgba(178, 24, 92, 0.4);
}

.line {
  margin: 0.1rem 0;
  font-size: 0.95rem;
  color: #4a1430;
}

.line.strong {
  font-size: 1.2rem;
  font-weight: 700;
}

.line.soft {
  font-size: 0.85rem;
  color: #7c3356;
}

.divider {
  height: 1px;
  margin: 0.7rem 0;
  background: linear-gradient(90deg, transparent, #ff8fab, transparent);
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

@keyframes gentle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes sparkle-pop {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}
</style>

