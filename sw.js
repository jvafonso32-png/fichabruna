// Service Worker - Ficha Bruna (Network-First para garantir atualizações imediatas no iPhone)
const CACHE_NAME = 'fichabruna-v3-weedverso';
const PRECACHE_ASSETS = [
  './',
  'manifest.json',
  'icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'reload' });
            if (res.ok) await cache.put(url, res);
          } catch (e) {
            try { await cache.add(url); } catch (err) {}
          }
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  // Ignora chamadas de API externas
  if (event.request.url.includes('/objects/') || event.request.method !== 'GET') {
    return;
  }

  // Navegacao: Rede primeiro, com fallback seguro para cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = (await caches.match('./')) || (await caches.match('index.html'));
          if (cached) return cached;
          return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
        })
    );
    return;
  }

  // Recursos estáticos: Cache primeiro com atualização em segundo plano
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((netRes) => {
          if (netRes && netRes.status === 200) {
            caches.open(CACHE_NAME).then((c) => c.put(event.request, netRes));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
