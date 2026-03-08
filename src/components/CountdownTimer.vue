<template>
  <div class="countdown-card" aria-label="Contagem regressiva para o nosso aniversário de 3 anos">
    <p class="caption">Faltam</p>
    <div class="units">
      <div class="unit">
        <span class="value">{{ timeLeft.days }}</span>
        <span class="label">dias</span>
      </div>
      <div class="unit">
        <span class="value">{{ timeLeft.hours }}</span>
        <span class="label">horas</span>
      </div>
      <div class="unit">
        <span class="value">{{ timeLeft.minutes }}</span>
        <span class="label">min</span>
      </div>
    </div>
    <p class="footnote">para o nosso dia especial 💜</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from 'vue';

interface Props {
  targetDate: string;
}

const props = defineProps<Props>();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

const timeLeft = reactive<TimeLeft>({
  days: 0,
  hours: 0,
  minutes: 0
});

let intervalId: number | null = null;

const updateTime = () => {
  const now = new Date();
  const target = new Date(props.targetDate + 'T00:00:00');
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) {
    timeLeft.days = 0;
    timeLeft.hours = 0;
    timeLeft.minutes = 0;
    return;
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  timeLeft.days = Math.floor(totalMinutes / (60 * 24));
  const remainingMinutesAfterDays = totalMinutes - timeLeft.days * 24 * 60;
  timeLeft.hours = Math.floor(remainingMinutesAfterDays / 60);
  timeLeft.minutes = remainingMinutesAfterDays - timeLeft.hours * 60;
};

onMounted(() => {
  updateTime();
  intervalId = window.setInterval(updateTime, 1000 * 60);
});

onBeforeUnmount(() => {
  if (intervalId !== null) {
    window.clearInterval(intervalId);
  }
});
</script>

<style scoped>
.countdown-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1.25rem;
  padding: 1rem 1.2rem;
  box-shadow: 0 16px 40px rgba(255, 143, 171, 0.4);
  text-align: center;
  backdrop-filter: blur(10px);
}

.caption {
  margin: 0 0 0.4rem;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #b2185c;
}

.units {
  display: flex;
  justify-content: space-between;
  gap: 0.4rem;
}

.unit {
  flex: 1;
  background: linear-gradient(145deg, #fff0f5, #ffe5ec);
  border-radius: 1rem;
  padding: 0.5rem 0.3rem;
}

.value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #b2185c;
}

.label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #c75b8a;
}

.footnote {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: #5e2742;
}
</style>

