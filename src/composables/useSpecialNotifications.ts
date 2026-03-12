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

    // Checking for relationship contract notifications
    const checkContractStatus = () => {
        const isSigned = localStorage.getItem("contractSigned") === "true";
        if (isSigned) return;
        
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-CA"); // YYYY-MM-DD locally
        
        // Target date for "today" from context (let's use the local current date strings)
        // Ensure that around 20h we send the notification
        const alreadySent20h = alreadySent("contractNotif20h");
        if (!alreadySent20h && now.getHours() >= 20) {
            sendNotification(
                "📜 Seu contrato está disponível!",
                "Você tem um contrato de renovação para assinar. Acesse agora!",
            );
            markSent("contractNotif20h");
        }

        // Target for "next day" (tomorrow)
        // We will store the day we sent the first notification and check if day changed
        const startDay = localStorage.getItem("contractAlertStartDay");
        if (!startDay) {
            localStorage.setItem("contractAlertStartDay", dateStr);
        } else if (startDay !== dateStr) {
            // It's a new day!
            const alreadySentTomorrow = alreadySent("contractNotifTomorrow");
            if (!alreadySentTomorrow) {
                sendNotification(
                    "⚠️ Assinatura Pendente!",
                    "O dia virou e o contrato de renovação ainda não foi assinado! Assine para validar os próximos anos de amor 💜",
                );
                markSent("contractNotifTomorrow");
            }
        }
    };

    // Run immediately
    checkContractStatus();
    
    // Also run every minute while app is open
    setInterval(checkContractStatus, 60 * 1000);
}
