// Nome e versão do cache
const CACHE_NAME = 'generic-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './src/css/style.css',
  './src/js/main.js'
];

// Instala o service worker e faz cache dos recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e serve os recursos do cache quando possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache ou faz a requisição
        return response || fetch(event.request);
      })
  );
});

// Atualiza o service worker e remove os caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
