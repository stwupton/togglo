import 'babel-polyfill';
import { version } from '../package.json';

const resourcesToCache = [
  '/index.html',
  '/dist/app.bundle.js',
  '/img/icon192.png',
  '/img/icon512.png',
  '/manifest.json',
];

async function initCache() {
  const cache = await caches.open(version);
  return cache.addAll(resourcesToCache);
}

async function clearOldCache() {
  const cacheIds = await caches.keys();
  return Promise.all(cacheIds.map(cacheId => {
    if (cacheId != version) {
      return caches.delete(cacheId);
    }
  }));
}

async function handleRequest(request) {
  const cache = await caches.open(version);
  const url = new URL(request.url);

  let response = await cache.match(request);

  if (!response) {
    if (
      url.origin == self.location.origin && 
      request.method.toLowerCase() == 'get' && 
      request.destination == 'document'
    ) {
      response = cache.match('/index.html');
    }
  }

  if (!response) {
    const isUserImage = 
      url.origin.match(/.+\.googleusercontent\.com/) != null && 
      request.destination == 'image';

    if (isUserImage) {
      response = await self.fetch(request);
      cache.put(request.clone(), response.clone());
    }
  }

  return response || self.fetch(request);
}

self.addEventListener('install', event => {
  event.waitUntil(initCache());
});

self.addEventListener('activate', event => {
  self.clients.claim();
  event.waitUntil(clearOldCache());
});

self.addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

