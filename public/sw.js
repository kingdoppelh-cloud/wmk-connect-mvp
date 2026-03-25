self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Minimaler Fetch-Handler, um die PWA-Installations-Anforderungen (A2HS) in Chrome zu erfüllen.
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'WMK Connect Update';
    const options = {
        body: data.body || 'Es gibt Neuigkeiten in deiner Nähe!',
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
