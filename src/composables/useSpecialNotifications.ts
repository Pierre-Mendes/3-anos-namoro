import { sendNotification } from "/src/utils/notifications";

export function useSpecialNotifications() {
    const today = new Date();

    const specialDate = new Date("2026-06-12");

    const diffDays = Math.ceil(
        (specialDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    const alreadySent = (key: string) => localStorage.getItem(key) === "true";

    const markSent = (key: string) => localStorage.setItem(key, "true");

    if (!alreadySent("dailyNotification")) {
        sendNotification(
            "💜 O desafio de hoje está disponível",
            "Abra o aplicativo para descobrir.",
        );

        markSent("dailyNotification");
    }

    if (diffDays === 2 && !alreadySent("twoDaysNotification")) {
        sendNotification(
            "✨ Faltam 2 dias para descobrir a surpresa",
            "Algo especial está chegando.",
        );

        markSent("twoDaysNotification");
    }

    if (diffDays === 0 && !alreadySent("finalNotification")) {
        sendNotification(
            "❤️ Hoje você vai descobrir tudo",
            "Abra o aplicativo agora.",
        );

        markSent("finalNotification");
    }
}
