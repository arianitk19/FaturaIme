// sw.js - Motori i Njoftimeve ELITE

self.addEventListener('install', (event) => {
    // Forcon instalimin e menjëhershëm pa pritur mbylljen e tab-eve të vjetra
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    // Merr kontrollin e faqes menjëherë pas aktivizimit
    event.waitUntil(self.clients.claim()); 
});

// Dëgjuesi i mesazheve nga index.html
self.addEventListener('message', (event) => {
    // Sigurohemi që tipi i mesazhit përputhet me atë që dërgojmë nga JS kryesor
    if (event.data && event.data.type === 'TRIGGER_REAL_PUSH') {
        const options = {
            body: event.data.body,
            icon: 'https://img.icons8.com/ios-filled/512/6366f1/bill.png',
            badge: 'https://img.icons8.com/ios-filled/100/6366f1/bill.png',
            vibrate: [200, 100, 200], // Dridhje reale
            tag: 'faturaime-alert',
            renotify: true,
            // KORRIGJIM: Përdorim self në vend të window
            data: { url: self.location.origin }, 
            actions: [
                { action: 'open', title: 'Hap Panelin' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification('FATURAIME ELITE', options)
        );
    }
});

// Menaxhimi i klikimit mbi njoftim
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Mbyll njoftimin pas klikimit

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            // Nëse faqja është e hapur, fokusoje atë
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // Nëse nuk është e hapur, hape një dritare të re
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
