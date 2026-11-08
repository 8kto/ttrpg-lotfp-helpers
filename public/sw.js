// The app no longer uses a service worker. Browsers that installed the old
// next-pwa worker fetch this file on update, so it removes itself and the caches.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()

      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((client) => client.navigate(client.url))
    })(),
  )
})
