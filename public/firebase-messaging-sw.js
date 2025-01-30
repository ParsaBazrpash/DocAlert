importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-messaging-compat.js');

firebase.initializeApp({
  // Your firebase config object
  apiKey: "AIzaSyCyc01bbitmMx-l8irDQUNhHzIa8aIHJz8",
  authDomain: "doc-alert-33cbe.firebaseapp.com",
  projectId: "doc-alert-33cbe",
  storageBucket: "doc-alert-33cbe.firebasestorage.app",
  messagingSenderId: "907448347215",
  appId: "1:907448347215:web:b665da62211203d38f983a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon.png'
  });
});