<template>
  <canvas ref="canvasRef" class="fireworks-canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'heart' | 'spark';
}

let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let animationId = 0;

const colors = ['#ff4d6d', '#ff8fab', '#c9184a', '#ffb3c6', '#fde2e4'];

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  const context = canvas.getContext('2d');
  if (context) {
    ctx = context;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
};

const spawnBurst = () => {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const centerX = rect.width * (0.3 + Math.random() * 0.4);
  const centerY = rect.height * (0.3 + Math.random() * 0.4);

  const count = 40;
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 1.3 + Math.random() * 1.4;
    
    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      life: 0,
      maxLife: 60 + Math.random() * 25,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() < 0.55 ? 'heart' : 'spark'
    });
  }
};

const drawHeart = (x: number, y: number, size: number, color: string) => {
  if (!ctx) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.beginPath();
  ctx.moveTo(0, 0.3);
  ctx.bezierCurveTo(-0.5, -0.2, -0.5, -0.9, 0, -0.6);
  ctx.bezierCurveTo(0.5, -0.9, 0.5, -0.2, 0, 0.3);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
};

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();

  ctx.clearRect(0, 0, rect.width, rect.height);

  if (Math.random() < 0.04) {
    spawnBurst();
  }

  particles.forEach((p) => {
    p.life += 1;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.03;
  });

  particles = particles.filter((p) => p.life < p.maxLife);

  particles.forEach((p) => {
    const alpha = 1 - p.life / p.maxLife;
    if (!ctx) return;
    if (p.type === 'heart') {
      drawHeart(p.x, p.y, 4 * alpha * 0.25, `${p.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
    } else {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5 + 1.5 * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

  animationId = window.requestAnimationFrame(animate);
};

onMounted(() => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  animationId = window.requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resizeCanvas);
});
</script>

<style scoped>
.fireworks-canvas {
  width: 100%;
  height: 260px;
  border-radius: 1.5rem;
  background: radial-gradient(circle at bottom, #ffb3c6, #3a0a33 60%);
  box-shadow: 0 18px 50px rgba(93, 18, 65, 0.7);
}
</style>

