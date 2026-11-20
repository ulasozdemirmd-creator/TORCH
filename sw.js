/* Konjenital Enfeksiyon Tanı Asistanı – service worker
   Yeni sürüm yayınlarken YALNIZCA aşağıdaki VERSION değerini değiştirin
   (index.html içindeki APP_VERSION ile aynı olmalı). */
const VERSION = '1.1.0';
const CACHE = 'konjenital-tani-' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  // Yeni sürüm, kullanıcı "Şimdi yenile" diyene kadar bekler (açık hasta verisi kaybolmasın).
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('konjenital-tani-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

// Önce önbellek: uygulama internetsiz tam çalışır. Güncellemeler sw.js değişince gelir.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then(r => r || fetch(req)));
    return;
  }
  event.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req)));
});
