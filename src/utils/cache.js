// Cache utility for faster website reloads
class CacheManager {
  constructor() {
    this.cacheName = 'kurtos-cafe-v1';
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Cache a response with expiry
  async cacheResponse(request, response) {
    const cache = await caches.open(this.cacheName);
    const headers = new Headers(response.headers);
    headers.set('x-cache-timestamp', Date.now().toString());
    
    const cachedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
    
    await cache.put(request, cachedResponse);
  }

  // Get cached response if not expired
  async getCachedResponse(request) {
    const cache = await caches.open(this.cacheName);
    const response = await cache.match(request);
    
    if (response) {
      const timestamp = response.headers.get('x-cache-timestamp');
      if (timestamp && (Date.now() - parseInt(timestamp)) < this.cacheExpiry) {
        return response;
      }
    }
    
    return null;
  }

  // Cache static assets
  async cacheStaticAssets() {
    const staticAssets = [
      '/',
      '/index.html',
      '/src/assets/logo.jpg',
      '/src/assets/logo.png',
      '/Menu_Data.csv'
    ];

    const cache = await caches.open(this.cacheName);
    
    for (const asset of staticAssets) {
      try {
        const response = await fetch(asset);
        if (response.ok) {
          await cache.put(asset, response);
        }
      } catch (error) {
        console.log(`Failed to cache ${asset}:`, error);
      }
    }
  }

  // Clear expired cache entries
  async clearExpiredCache() {
    const cache = await caches.open(this.cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const timestamp = response.headers.get('x-cache-timestamp');
        if (timestamp && (Date.now() - parseInt(timestamp)) > this.cacheExpiry) {
          await cache.delete(request);
        }
      }
    }
  }

  // Preload critical resources
  async preloadCriticalResources() {
    const criticalResources = [
      '/src/assets/logo.jpg',
      '/src/assets/post 1.jpg',
      '/src/assets/post 2.jpg',
      '/src/assets/post 3.jpg'
    ];

    for (const resource of criticalResources) {
      try {
        const response = await fetch(resource);
        if (response.ok) {
          await this.cacheResponse(new Request(resource), response);
        }
      } catch (error) {
        console.log(`Failed to preload ${resource}:`, error);
      }
    }
  }
}

// Create and export cache manager instance
export const cacheManager = new CacheManager();

// Initialize caching when the module loads
if (typeof window !== 'undefined') {
  // Cache static assets on page load
  cacheManager.cacheStaticAssets();
  
  // Preload critical resources
  cacheManager.preloadCriticalResources();
  
  // Clear expired cache every hour
  setInterval(() => {
    cacheManager.clearExpiredCache();
  }, 60 * 60 * 1000);
}
