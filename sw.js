// sw.js - Sistemi i Mesazheve ELITE
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TRIGGER_REAL_PUSH') {
        const options = {
            body: event.data.body,
            icon: 'https://img.icons8.com/ios-filled/512/6366f1/bill.png',
            badge: 'https://img.icons8.com/ios-filled/100/6366f1/bill.png',
            vibrate: [200, 100, 200],
            tag: event.data.tag || 'faturaime-notif',
            renotify: true,
            requireInteraction: true,
            data: { url: self.location.origin },
            actions: [
                { action: 'open', title: 'Hap FaturaIME' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(event.data.title || 'FATURAIME ELITE', options)
        );
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('/');
        })
    );
});
