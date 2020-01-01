class ServiceWorkerManager {
  async init() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.bundle.js');
      } catch (e) {
        console.warn(`Failed to register service worker. Error: ${e}`);
      }
    }
  }
}

export default new ServiceWorkerManager();