const cacheName = "pwa-test";
const filesToCache = ["/", "index.html", "styles.css", "app.js"];

// Install service worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Intercept fetch requests
self.addEventListener("fetch", (ev) => {
  ev.respondWith(
    (async function () {
      console.log(`Request onderschept met data: `);
      console.dir(ev.request);

      if (ev.request.url.indexOf("bgg") > -1) {
        let oudRequest = ev.request;
        let nieuweURL = oudRequest.url.replace("edwalter", "stinow");

        let nieuwRequest = new Request(nieuweURL, {
          method: oudRequest.method,
          headers: oudRequest.headers,
          mode: oudRequest.mode,
          credentials: oudRequest.credentials,
        });

        return fetch(nieuwRequest);
      } else {
        return fetch(ev.request);
      }
    })()
  );
});
