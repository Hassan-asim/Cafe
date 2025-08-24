const CACHE_NAME = 'kurtos-cafe-cache-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.jpg',
  '/Menu_Data.csv',
  '/src/assets/logo.jpg',
  '/src/assets/logo.png',
  '/src/assets/post 1.jpg',
  '/src/assets/post 2.jpg',
  '/src/assets/post 3.jpg',
  '/src/assets/post 4.jpg',
  '/src/assets/post 6.jpg'
];

const STATIC_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const API_CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Check if cache is still valid
        const cachedDate = response.headers.get('sw-cache-date');
        if (cachedDate) {
          const cacheAge = Date.now() - new Date(cachedDate).getTime();
          const maxAge = event.request.url.includes('api.') ? API_CACHE_DURATION : STATIC_CACHE_DURATION;
          
          if (cacheAge < maxAge) {
            return response;
          }
        } else {
          return response; // Static files cached during install
        }
      }

      // Fetch and cache new response
      return fetch(event.request).then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // Add timestamp header for cache validation
            const headers = new Headers(responseClone.headers);
            headers.set('sw-cache-date', new Date().toISOString());
            
            const newResponse = new Response(responseClone.body, {
              status: responseClone.status,
              statusText: responseClone.statusText,
              headers: headers
            });
            
            cache.put(event.request, newResponse);
          });
        }
        return response;
      }).catch(() => {
        // Return cached version if network fails
        return response || new Response('Offline', { status: 503 });
      });
    })
  );
});
