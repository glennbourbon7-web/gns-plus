/* Lets browsers offer "Install" for this site. Nothing is cached: every page and video still loads fresh.
   Page loads skip the browser's saved copy so new shows and ads appear right after an update. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request, { cache: "no-store" }).catch(() => fetch(event.request)));
  }
});
