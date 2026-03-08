<template>
  <div class="hearts-container" aria-hidden="true">
    <span
      v-for="heart in hearts"
      :key="heart.id"
      class="heart"
      :style="{
        left: heart.left,
        animationDuration: heart.duration,
        animationDelay: heart.delay,
        opacity: heart.opacity
      }"
    >
      ♥
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface HeartParticle {
  id: number;
  left: string;
  duration: string;
  delay: string;
  opacity: string;
}

const hearts = computed<HeartParticle[]>(() =>
  Array.from({ length: 18 }).map((_, index) => {
    const left = `${Math.random() * 100}%`;
    const duration = `${8 + Math.random() * 6}s`;
    const delay = `${-Math.random() * 10}s`;
    const opacity = (0.4 + Math.random() * 0.6).toFixed(2);
    return {
      id: index,
      left,
      duration,
      delay,
      opacity
    };
  })
);
</script>

<style scoped>
.hearts-container {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.heart {
  position: absolute;
  bottom: -40px;
  font-size: 1.4rem;
  color: #ff4d6d;
  text-shadow: 0 0 8px rgba(255, 77, 109, 0.6);
  animation-name: float-up;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes float-up {
  0% {
    transform: translate3d(0, 0, 0) scale(0.9) rotate(0deg);
  }
  50% {
    transform: translate3d(15px, -50vh, 0) scale(1.1) rotate(8deg);
  }
  100% {
    transform: translate3d(-10px, -110vh, 0) scale(0.9) rotate(-8deg);
  }
}
</style>

