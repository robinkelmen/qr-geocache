// sw.js — makes the player work OFFLINE. Caches itself on first visit; after
// that, scanning a seed-QR plays with NO network (airplane mode / desert).
// The decoder is the "cell" installed once; the QR is the "gene".
const CACHE = "qrvideo-cell-1";
const ASSETS = ["./qr-video.html", "./jsQR.embed.js", "./manifest.json"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  // cache-first, ignore ?v= query so any seed URL serves the one cached player
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
