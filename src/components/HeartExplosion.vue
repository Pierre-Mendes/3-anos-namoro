<template>
  <div v-if="active" class="explosion-overlay">
    <div class="explosion-center">
      <span
        v-for="particle in particles"
        :key="particle"
        class="particle"
        :style="{ '--i': particle }"
      >
        ♥
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  active: boolean;
}

defineProps<Props>();

const particles = Array.from({ length: 18 }, (_, i) => i);
</script>

<style scoped>
.explosion-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 20;
}

.explosion-center {
  position: relative;
  width: 0;
  height: 0;
}

.particle {
  --i: 0;
  position: absolute;
  left: 0;
  top: 0;
  color: #ff4d6d;
  text-shadow: 0 0 10px rgba(255, 77, 109, 0.7);
  font-size: 1.4rem;
  transform-origin: center;
  animation: burst 900ms ease-out forwards;
}

@keyframes burst {
  0% {
    transform: rotate(calc(var(--i) * 20deg)) translate3d(0, 0, 0) scale(0.4);
    opacity: 1;
  }
  70% {
    transform: rotate(calc(var(--i) * 20deg)) translate3d(0, -90px, 0) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: rotate(calc(var(--i) * 20deg)) translate3d(0, -120px, 0) scale(0.4);
    opacity: 0;
  }
}
</style>

