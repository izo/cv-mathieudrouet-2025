// Service Worker kill-switch.
// Le SW précédent mettait en cache des assets désormais obsolètes (anciens logos,
// liste STATIC_ASSETS figée). Ce fichier remplace ce SW : il vide tous les caches
// et se désinscrit, puis force les clients à se recharger.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) {
      client.navigate(client.url);
    }
  })());
});
