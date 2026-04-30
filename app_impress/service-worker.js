// Nome do cache
const CACHE_NAME = 'particle-flow-system-v1';

// Arquivos para fazer cache
const urlsToCache = [
  './',
  './index.html',
  './simple.html',
  './manifest.json'
];

// Instalar service worker
self.addEventListener('install', (event) => {
  // Realiza o cache dos arquivos estáticos
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta requisições e serve arquivos do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o cache se encontrado, senão faz a requisição normal
        return response || fetch(event.request);
      })
  );
});

// Atualiza o service worker e remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Limpando cache antigo', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
