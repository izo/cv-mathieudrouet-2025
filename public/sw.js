// Service Worker for Performance Optimization
const CACHE_NAME = 'cv-mathieu-drouet-v1';
const STATIC_CACHE_NAME = 'cv-static-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/profile.jpg',
  '/favicon.svg',
  '/logos/actual.png',
  '/logos/bookr.png', 
  '/logos/fluidra.png',
  '/logos/ge-healtcare.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip dev resources and source maps
  if (event.request.url.includes('/src/') || event.request.url.includes('.ts') || event.request.url.includes('.map')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            
            // Cache static assets
            if (shouldCache(event.request)) {
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache));
            }

            return response;
          })
          .catch((error) => {
            console.log('Fetch failed for:', event.request.url, error);
            // Return a basic response for failed requests
            return new Response('Resource not available', { status: 404 });
          });
      })
  );
});

// Helper function to determine if request should be cached
function shouldCache(request) {
  const url = new URL(request.url);
  
  // Cache images, fonts, and static assets
  return (
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff2?|ttf|otf|eot)$/) ||
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/logos/')
  );
}

// Message handler for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});