const CACHE_NAME = 'uca-contacts-v1';
const URLs_TO_CACHE = [
  '/index.html',
  '/manifest.json',
  '/Logo192.png',
  '/Logo.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLs_TO_CACHE)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
