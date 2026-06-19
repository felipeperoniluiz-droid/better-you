self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE') {
    var delay = e.data.delay;
    var title = e.data.title;
    var body  = e.data.body;
    if (delay > 0) {
      setTimeout(function() {
        self.registration.showNotification(title, {
          body: body,
          icon: 'https://felipeperoniluiz-droid.github.io/better-you/icon-192.png',
          vibrate: [200, 100, 200],
          tag: e.data.tag || 'better-you',
          requireInteraction: false
        });
      }, delay);
    }
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window'}).then(function(list) {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('https://felipeperoniluiz-droid.github.io/better-you/');
    })
  );
});