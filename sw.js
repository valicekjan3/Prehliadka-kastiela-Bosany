// Názov cache
const CACHE_NAME = 'kastiel-bosany-v1';

// Súbory na cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/manifest.json',
  '/assets/favicon.ico',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png'
];

// Inštalácia Service Workera
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivácia Service Workera
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - stratégia cache-first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - vrátime odpoveď z cache
        if (response) {
          return response;
        }
        
        // Cache miss - vyžiadame si odpoveď zo siete
        return fetch(event.request)
          .then(response => {
            // Kontrola, či je odpoveď platná
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Klonovanie odpovede, pretože telo odpovede môže byť použité iba raz
            const responseToCache = response.clone();
            
            // Uloženie odpovede do cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
      .catch(() => {
        // Ak zlyhá sieťové pripojenie a nemáme cache, vrátime offline stránku
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Synchronizácia na pozadí
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Funkcia pre synchronizáciu dát
async function syncData() {
  // Implementácia synchronizácie dát
  console.log('Synchronizácia dát na pozadí');
}

// Push notifikácie
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/assets/icon-192x192.png',
    badge: '/assets/badge.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Kliknutie na notifikáciu
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});