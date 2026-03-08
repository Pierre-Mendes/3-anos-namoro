export async function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.log("Navegador não suporta notificações");
        return false;
    }

    const permission = await Notification.requestPermission();

    return permission === "granted";
}

export async function sendNotification(title: string, body: string) {
    if (Notification.permission !== "granted") return;

    const registration = await navigator.serviceWorker.getRegistration();

    registration?.showNotification(title, {
        body,
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        vibrate: [200, 100, 200],
        tag: "nosso-amor",
    });
}
