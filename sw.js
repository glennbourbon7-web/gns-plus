/* Lets browsers offer "Install" for this site. Nothing is cached: every page and video still loads fresh.
   Page loads skip the browser's saved copy so new shows and ads appear right after an update.
   On activation it also deletes anything an older version may have saved, so no one is stuck on an old GNS+. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).catch(() => {}).then(() => self.clients.claim())
));
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request, { cache: "no-store" }).catch(() => fetch(event.request)));
  }
});
