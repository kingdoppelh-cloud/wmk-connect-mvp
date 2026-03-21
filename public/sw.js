self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Minimaler Fetch-Handler, um die PWA-Installations-Anforderungen (A2HS) in Chrome zu erfüllen.
});
