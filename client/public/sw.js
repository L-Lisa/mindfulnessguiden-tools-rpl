const CACHE_NAME = 'mindfulness-v4';
const STATIC_CACHE_NAME = 'mindfulness-static-v4';
const DYNAMIC_CACHE_NAME = 'mindfulness-dynamic-v4';

// Static assets to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/exercises.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event - cache-first strategy with dynamic caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests and non-GET requests
  if (url.origin !== location.origin || request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          // Update cache in background for static assets
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(DYNAMIC_CACHE_NAME)
                  .then((cache) => cache.put(request, networkResponse));
              }
            })
            .catch(() => {
              // Network failed, ignore - we have cached version
            });
          
          return cachedResponse;
        }

        // No cache - fetch from network and cache
        return fetch(request)
          .then((networkResponse) => {
            // Check if valid response
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clone and cache the response
            const responseToCache = networkResponse.clone();
            
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.log('SW: Fetch failed, no cache available:', error);
            // Could return a custom offline page here
            throw error;
          });
      })
  );
});

// Activate event - FORCE DELETE ALL OLD CACHES (critical for Safari)
self.addEventListener('activate', (event) => {
  console.log('SW v3: Activating and clearing all old caches');
  const cacheWhitelist = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('SW v3: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('SW v3: Taking control of all pages');
      return self.clients.claim();
    })
  );
});
