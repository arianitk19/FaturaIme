// sw.js
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim()); 
});

// Ky funksion aktivizon njoftimin real në sistemin operativ
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TRIGGER_REAL_PUSH') {
        const options = {
            body: event.data.body,
            icon: 'https://img.icons8.com/ios-filled/512/6366f1/bill.png',
            badge: 'https://img.icons8.com/ios-filled/100/6366f1/bill.png',
            vibrate: [200, 100, 200], // Dridhja reale e telefonit
            tag: 'faturaime-alert', // Parandalon njoftimet e përsëritura të panevojshme
            renotify: true,
            data: { url: window.location.origin },
            actions: [
                { action: 'open', title: 'Shiko Detajet' }
            ]
        };

        self.registration.showNotification('FATURAIME ELITE', options);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
