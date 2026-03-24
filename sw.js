// sw.js - Cikli i Jetës dhe Menaxhimi i Njoftimeve
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Dëgjuesi i mesazheve nga aplikacioni
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SEND_PUSH') {
        const options = {
            body: event.data.body,
            icon: 'https://img.icons8.com/ios-filled/512/6366f1/bill.png',
            badge: 'https://img.icons8.com/ios-filled/100/6366f1/bill.png',
            vibrate: [100, 50, 100],
            data: { url: '/' },
            actions: [
                { action: 'open', title: 'Hap FaturaIME' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification('FATURAIME ELITE', options)
        );
    }
});

// Hap aplikacionin kur klikohet njoftimi
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('/');
        })
    );
});
