/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA_YuEKS9uoQ5DVd_vLdxZ5WcDqhH2DZtY",
  authDomain: "learning-management-syst-a527d.firebaseapp.com",
  projectId: "learning-management-syst-a527d",
  storageBucket: "learning-management-syst-a527d.appspot.com",
  messagingSenderId: "553831538028",
  appId: "1:553831538028:web:3b9a62bfcbb3c6b2cf6749",

  vapidKey:
    "BL4seloY_pB8k4DxPJQibdZsnTJaOy-3CiLD0tH7qh3G06348yfycoRG6Talhwlc8CvYZugQiRvuk-Z0FLxmfJI",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle =
    payload.notification?.title || "Background Message Title";
  const notificationOptions = {
    body: payload.notification?.body || "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
