import { ref, onMounted, onBeforeUnmount } from "vue";

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function useInstallPWA() {
	const canInstall = ref(false);
	let deferredPrompt: BeforeInstallPromptEvent | null = null;

	const beforeInstallHandler = (event: Event) => {
		event.preventDefault();
		deferredPrompt = event as BeforeInstallPromptEvent;
		canInstall.value = true;
	};

	const install = async () => {
		if (!deferredPrompt) return;

		await deferredPrompt.prompt();

		try {
			await deferredPrompt.userChoice;
		} finally {
			deferredPrompt = null;
			canInstall.value = false;
		}
	};

	onMounted(() => {
		window.addEventListener("beforeinstallprompt", beforeInstallHandler);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
	});

	return {
		canInstall,
		install,
	};
}
