importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const config = {
  apiKey: 'AIzaSyBalg2rFYhQNypa9WmDio7zayYJTVlgVns',
  databaseURL: 'https://coop-chick-default-rtdb.asia-southeast1.firebasedatabase.app/',
  authDomain: 'coop-chick.firebaseapp.com',
  projectId: 'coop-chick',
  storageBucket: 'coop-chick.appspot.com',
  messagingSenderId: '903260437227',
  appId: '1:903260437227:web:029da3853098c8cdbf9cae'
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/favicon/icon-512x512.png',
    data: {
      clickAction: payload.data.actionLink
    }
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  var redirectUrl = event.notification.data.clickAction;
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: 'window'
      })
      .then(function (clientList) {
        console.log(clientList);
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(redirectUrl);
        }
      })
  );
});
