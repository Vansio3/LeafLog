// Define a cache name
const CACHE_NAME = 'leaflog-cache-v1';

// List the files to cache
// IMPORTANT: Update these URLs if you change CDN versions!
const urlsToCache = [
  '/LeafLog/', // Cache the root directory
  '/LeafLog/index.html', // Cache the main HTML file
  '/LeafLog/manifest.json', // Cache the manifest
  '/LeafLog/icons/icon-192x192.png', // Cache icons
  '/LeafLog/icons/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
  'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js',
  // Add Font Awesome font files for better offline icon support (optional but recommended)
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/webfonts/fa-solid-900.woff2',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/webfonts/fa-regular-400.woff2',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/webfonts/fa-brands-400.woff2'
  // Note: Map tiles themselves are NOT cached by this basic setup.
  // The map might appear blank offline unless more complex tile caching is implemented.
];

// Install event: Cache the files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        // Use addAll for atomic caching, but be careful with CDN fonts failing install
        // Using individual add requests might be more robust if some fonts fail
        return Promise.all(
            urlsToCache.map(url => {
                return cache.add(url).catch(err => {
                    console.warn(`Service Worker: Failed to cache ${url}`, err);
                    // Don't fail the entire install if a non-critical asset (like a specific font) fails
                });
            })
        );
        // Original simpler version (less robust to individual fetch failures):
        // return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installation complete, skipping waiting.');
        return self.skipWaiting(); // Activate immediately
      })
      .catch(error => {
        console.error('Service Worker: Caching failed during install', error);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('Service Worker: Activation complete, claiming clients.');
        return self.clients.claim(); // Take control of open pages immediately
    })
  );
});

// Fetch event: Serve cached content when offline or fetch from network
self.addEventListener('fetch', event => {
  // We only want to cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Strategy: Cache first, then network fallback
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If found in cache, return it
        if (cachedResponse) {
          // console.log('Service Worker: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // If not in cache, fetch from network
        // console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
              return networkResponse;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = networkResponse.clone();

            // Don't cache map tiles in this basic setup to avoid filling storage quickly
            // You might want to refine this check based on actual tile URLs if needed
            if (!event.request.url.includes('tile.openstreetmap.org')) {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    // console.log('Service Worker: Caching new resource:', event.request.url);
                    cache.put(event.request, responseToCache);
                  });
            }


            return networkResponse;
          }
        ).catch(error => {
            console.warn('Service Worker: Fetch failed; returning offline fallback or error page if available', error);
            // Optional: Return a basic offline fallback page here if desired
            // return caches.match('/offline.html');
        });
      })
  );
});