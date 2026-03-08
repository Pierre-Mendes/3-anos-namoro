<template>
	<button v-if="canInstall" class="install-btn" type="button" @click="install">
		<span class="icon">📲</span>
		<span>Instalar app</span>
	</button>
</template>

<script setup lang="ts">
import { useInstallPWA } from "/src/composables/useInstallPWA";

const { canInstall, install } = useInstallPWA();
</script>

<style scoped>
.install-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	width: 100%;
	margin-top: 0.8rem;
	border-radius: 999px;
	border: none;
	padding: 0.8rem 1rem;
	background: linear-gradient(135deg, #ff8fab, #ff4d6d);
	color: #fff;
	font-size: 0.98rem;
	font-weight: 600;
	box-shadow: 0 16px 32px rgba(255, 77, 109, 0.6);
	cursor: pointer;
	transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

.install-btn:active {
	transform: translateY(1px) scale(0.98);
	box-shadow: 0 10px 22px rgba(255, 77, 109, 0.5);
}

.icon {
	font-size: 1.2rem;
}
</style>