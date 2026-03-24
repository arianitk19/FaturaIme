// sw.js - Sistemi i Mesazheve në Prapavijë
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TRIGGER_REAL_PUSH') {
        const options = {
            body: event.data.body,
            icon: 'https://img.icons8.com/ios-filled/512/6366f1/bill.png', // Ikona jote
            badge: 'https://img.icons8.com/ios-filled/100/6366f1/bill.png',
            vibrate: [200, 100, 200], // Dridhja fizike
            tag: event.data.tag || 'faturaime-notif',
            renotify: true,
            requireInteraction: true, // Qëndron në ekran derisa ta klikosh
            actions: [
                { action: 'open', title: 'Hap Aplikacionin' }
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
